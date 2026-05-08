import { AppDataSource }              from '../configs/Db.js';
import { CustomError }        from '../middleware/ErrorHandler.js';
import { getPagination, paginationMeta } from '../utils/pagination.js';
import { CreateTransactionSchema }    from '../models/schemas/TransactionSchema.js';
import {
    TransactionDetailResponse,
    TransactionListResponse,
} from '../models/responses/TransactionResponse.js';
import * as transactionDomain from '../domains/TransactionDomain.js';
import { DecrementStockDomain, FindStockByProductAndBranchDomain, SyncStockDomain } from '../domains/StockDomain.js';

export async function GetAllTransactionsService(query) {
    const { page, limit, offset } = getPagination(query);

    const branch_id = query.branch_id ?? null;

    const { rows, total } = await transactionDomain.GetAllTransactionsDomain({
        limit,
        offset,
        branch_id,
    });

    const pagination = paginationMeta(total, page, limit);

    return {
        success: true,
        message: 'Data transaksi berhasil diambil',
        data:    TransactionListResponse(rows, pagination),
    };
}

export async function GetTransactionByIdService(id) {
    const trx = await transactionDomain.FindTransactionByIdDomain(id);

    if (!trx) throw new CustomError('Transaksi tidak ditemukan', 404);

    return {
        success: true,
        message: 'Detail transaksi berhasil diambil',
        data: TransactionDetailResponse(trx),
    };
}

export async function CreateTransactionService(body, reqUser) {

    const user_id = reqUser.id;
    const branch_id = reqUser.branch?.id;

    if (!branch_id) {
        throw new CustomError('User tidak memiliki cabang yang valid', 403);
    }


    const { error, value } = CreateTransactionSchema.validate(
        { ...body, branch_id },  
        { abortEarly: false, stripUnknown: true }
    );
  
    if (error) {
        const messages = error.details.map((d) => d.message.replace(/"/g, '')).join(', ');
        throw new CustomError(`Validasi gagal: ${messages}`, 400);
    }

    let subtotal = 0;
    for(const item of value.items){
        subtotal += item.quantity * item.unit_price;
    }

    if (value.cash_amount < subtotal) {
        throw new CustomError(
            `Uang tunai tidak mencukupi. Kurang: Rp ${(subtotal - value.cash_amount).toLocaleString('id-ID')}`,
            422
        );
    }

    for (const item of value.items) {
        const stock = await FindStockByProductAndBranchDomain(
            item.product_id,
            branch_id  
        );
 
        if (!stock) {
            throw new CustomError(
                `Stok produk tidak ditemukan di cabang ini (product_id: ${item.product_id})`,
                404
            );
        }

        const needed = item.quantity * item.multiplier;  
        if (Number(stock.quantity) < needed) {
            throw new CustomError(
                `Stok tidak mencukupi untuk produk ${item.product_id}. ` +
                `Dibutuhkan: ${needed}, tersedia: ${stock.quantity}`,
                422
            );
        }
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();


        const trx = await transactionDomain.CreateTransactionDomain(
            {
                branch_id,
                user_id,
                transaction_date: new Date(),
            },
            queryRunner.manager
        );

        const itemPayloads = value.items.map((item) => ({
            transaction_id:  trx.id,
            product_id:      item.product_id,
            product_unit_id: item.product_unit_id,
            quantity:        item.quantity,
            unit_price:      item.unit_price,
        }));

        await transactionDomain.CreateTransactionItemsDomain(itemPayloads, queryRunner.manager);
     
        
        for (const item of value.items) {
            const baseQtyToDecrement = item.quantity * item.multiplier;
 
            await DecrementStockDomain(
                item.product_id,
                branch_id,            
                baseQtyToDecrement,   
                queryRunner.manager
            );
        }
        await queryRunner.commitTransaction();
        const result = await transactionDomain.FindTransactionByIdDomain(trx.id);
        return {
            success: true,
            message: 'Transaksi berhasil disimpan',
  
            data: TransactionDetailResponse(result, value.cash_amount),
        };

    } catch (err) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw new CustomError(
            err.message || 'Gagal menyimpan transaksi',
            err.statusCode || 500
        );
    } finally {
        await queryRunner.release();
    }
}

export async function DeleteTransactionService(id) {
    const existing = await transactionDomain.FindTransactionByIdDomain(id);

    if (!existing) throw new CustomError('Transaksi tidak ditemukan', 404);

    await transactionDomain.DeleteTransactionDomain(id);

    return {
        success: true,
        message: 'Transaksi berhasil dihapus',
        data:    null,
    };
}
