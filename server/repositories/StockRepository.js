import { AppDataSource } from '../configs/Db.js';
import { Product } from '../models/entities/ProductEntity.js';
import { Stock } from '../models/entities/StockEntity.js';


const getRepo = (manager) => (manager ? manager.getRepository(Stock) : AppDataSource.getRepository(Stock));
const getProductRepo = (manager) => (manager ? manager.getRepository(Product) : AppDataSource.getRepository(Product));

export async function FindStockByProductAndBranchRepository(productId, branchId, manager = null) {
    return await getRepo(manager).findOne({
        where: { 
            product_id: productId, 
            branch_id: branchId 
        }
    });
}

export async function FindAllStocksByProductRepository(productId, manager = null) {
    return await getRepo(manager).find({
        where: { product_id: productId },
        relations: ['branch'], 
    });
}

export async function IncrementStockRepository(productId, branchId, qty, manager = null) {
    return await getRepo(manager).increment(
        { product_id: productId, branch_id: branchId },
        "quantity", 
        qty
    );
}

export async function DecrementStockRepository(productId, branchId, qty, manager = null) {
    return await getRepo(manager).decrement(
        { 
            product_id: productId, 
            branch_id: branchId 
        },
        "quantity",
        qty
    );
}

export async function CreateStockRepository({ productId, branchId, qty }, manager = null) {
    const stockRepo = getRepo(manager);
    const newStock = stockRepo.create({
        product_id: productId,
        branch_id: branchId,
        quantity: qty
    });
    
    return await stockRepo.save(newStock);
}

export async function UpsertStockRepository({ productId, branchId, qty }, manager = null) {
    const existing = await FindStockByProductAndBranchRepository(productId, branchId, manager);

    if (existing) {
        await IncrementStockRepository(productId, branchId, qty, manager);
        return existing.id;
    }

    const created = await CreateStockRepository({ productId, branchId, qty }, manager);
    return created.id;
}

export async function DeleteStockByProductIdRepository(productId, manager = null) {
    return await getRepo(manager).delete({
        product_id: productId
    });
}
