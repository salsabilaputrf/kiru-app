import { AppDataSource } from '../configs/db.js';
import { Product } from '../models/entities/ProductEntity.js';
import { ProductUnit } from '../models/entities/ProductUnitEntity.js';

const getProductRepo = (manager) => (manager ? manager.getRepository(Product) : AppDataSource.getRepository(Product));
const getUnitRepo = (manager) => (manager ? manager.getRepository(ProductUnit) : AppDataSource.getRepository(ProductUnit));

export async function GetAllProductsRepository({ limit, offset }, manager = null) {
    const qb = getProductRepo(manager).createQueryBuilder('product')
        .leftJoinAndSelect("product.categories", "category")
        .leftJoinAndSelect("product.units", "unit")

        .leftJoinAndSelect("product.stocks", "stock")
   
        .leftJoinAndSelect("stock.branch", "branch") 
        .skip(offset)
        .take(limit)
        .orderBy("product.created_at", "DESC");
    
    const [rows, total] = await qb.getManyAndCount();

    return { rows, total };
}

export async function FindAllProductsWithDetailsRepository(manager = null) {
    return await getProductRepo(manager).find({
        relations: ['units', 'categories', 'stocks', 'stocks.branch'],
        order: { created_at: 'DESC' }
    });
}

export async function FindProductByIdRepository(id, manager = null) {
    return await getProductRepo(manager).findOne({
        where: { id }
    });
}

export async function FindProductWithDetailsRepository(id, manager = null) {
    return await getProductRepo(manager).findOne({
        where: { id },
        relations: ['units', 'categories']
    });
}

export async function CreateProductRepository({ name }, manager = null) {
    const repo = getProductRepo(manager);
    const product = repo.create({
        product_name: name
    });
    return await repo.save(product);
}

export async function UpdateProductRepository(id, { name }, manager = null) {
    return await getProductRepo(manager).update(
        { id },
        { 
            product_name: name, 
            updated_at: new Date() 
        }
    );
}

export async function DeleteProductRepository(id, manager = null) {
    return await getProductRepo(manager).delete({ id });
}

export async function InsertProductUnitRepository(data, manager = null) {
    const repo = getUnitRepo(manager);
    const unit = repo.create({
        product_id:     data.productId,
        unit_name:      data.unitName,
        multiplier:     data.multiplier,
        is_base_unit:   data.isBaseUnit,
        purchase_price: data.purchasePrice,
        selling_price:  data.sellingPrice
    });
    return await repo.save(unit);
}

export async function DeleteUnitsByProductIdRepository(productId, manager = null) {
    return await getUnitRepo(manager).delete({ product_id: productId });
}

export async function SyncProductCategoriesRepository(productId, categoryIds, manager = null) {
    const repo = getProductRepo(manager);
    const product = await repo.findOne({
        where: { id: productId },
        relations: ['categories']
    });

    if (product) {
        product.categories = categoryIds.map(id => ({ id }));
        console.log(product)
        return await repo.save(product);
    }
    throw new Error("Produk tidak ditemukan untuk sinkronisasi category");
}