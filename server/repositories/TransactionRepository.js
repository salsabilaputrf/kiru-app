import { AppDataSource }   from '../configs/Db.js';
import { Transaction }     from '../models/entities/TransactionEntity.js';
import { TransactionItem } from '../models/entities/TransactionItemEntity.js';

const getTrxRepo  = (manager) => (manager ? manager.getRepository(Transaction)     : AppDataSource.getRepository(Transaction));
const getItemRepo = (manager) => (manager ? manager.getRepository(TransactionItem) : AppDataSource.getRepository(TransactionItem));

export async function GetAllTransactionsRepository({ limit, offset, branch_id }, manager = null) {
    const qb = getTrxRepo(manager)
        .createQueryBuilder('trx')
        .leftJoinAndSelect('trx.branch', 'branch')
        .leftJoinAndSelect('trx.user',   'user')
        .leftJoinAndSelect('trx.items',  'item')
        .leftJoinAndSelect('item.product',      'product')
        .leftJoinAndSelect('item.product_unit', 'product_unit')
        .orderBy('trx.transaction_date', 'DESC')
        .skip(offset)
        .take(limit);

    if (branch_id) {
        qb.where('trx.branch_id = :branch_id', { branch_id });
    }

    const [rows, total] = await qb.getManyAndCount();
    return { rows, total };
}

export async function FindTransactionByIdRepository(id, manager = null) {
    return await getTrxRepo(manager).findOne({
        where: { id },
        relations: [
            'branch',
            'user',
            'items',
            'items.product',
            'items.unit',
        ],
    });
}

export async function CreateTransactionRepository({ branch_id, user_id, transaction_date }, manager = null) {
    const repo = getTrxRepo(manager);
    const trx  = repo.create({
        branch_id,
        user_id,
        transaction_date: transaction_date ?? new Date(),
    });
    return await repo.save(trx);
}

export async function CreateTransactionItemsRepository(items, manager = null) {
    const repo     = getItemRepo(manager);
    const entities = items.map((item) => repo.create({
        transaction_id:  item.transaction_id,
        product_id:      item.product_id,
        product_unit_id: item.product_unit_id,
        quantity:        item.quantity,
        unit_price:      item.unit_price,
    }));
    return await repo.save(entities);
}

export async function DeleteTransactionRepository(id, manager = null) {
    return await getTrxRepo(manager).delete(id);
}