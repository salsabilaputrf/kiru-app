import { AppDataSource } from '../configs/Db.js';
import { AddStockSchema } from '../models/schemas/StockSchema.js';
import { CustomError } from '../middleware/ErrorHandler.js';
import { FindProductByIdDomain } from '../domains/ProductDomain.js';
import { FindStockByProductAndBranchDomain, UpsertStockDomain } from '../domains/StockDomain.js';
import { FindBranchByIdDomain } from '../domains/BranchDomain.js';

export async function AddStockService(payload) {
    const { error, value } = AddStockSchema.validate(payload, { 
        abortEarly: false, 
        stripUnknown: true 
    });

    if (error) {
        const errorMessages = error.details.map(d => d.message.replace(/"/g, '')).join(', ');
        throw new CustomError(`Validasi gagal: ${errorMessages}`, 400);
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();

        const product = await FindProductByIdDomain(value.productId, queryRunner.manager);
        if (!product) {
            throw new CustomError('Produk tidak ditemukan', 404);
        }

        const branch = await FindBranchByIdDomain(value.branchId, queryRunner.manager);

        if (!branch) {
            throw new CustomError(`Cabang dengan ID '${value.branchId}' tidak ditemukan`, 404);
        }

        const branchName = branch.branch_name;


        await UpsertStockDomain(
            { productId: value.productId, branchId: value.branchId, qty: value.qty }, 
            queryRunner.manager
        );


        const updatedStock = await FindStockByProductAndBranchDomain(
            value.productId, 
            value.branchId, 
            queryRunner.manager
        );

        await queryRunner.commitTransaction();

        return {
            success: true,
            message: 'Stok berhasil diperbarui',
            
        };

    } catch (error) {

        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw new CustomError(error.message, error.statusCode || 500);
    } finally {

        await queryRunner.release();
    }
}