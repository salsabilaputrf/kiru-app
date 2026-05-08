import * as productRepo from '../repositories/ProductRepository.js';

export async function GetAllProductsDomain({ limit, offset }, manager) {
    return await productRepo.GetAllProductsRepository({ limit, offset }, manager);
}

export async function FindAllProductsWithDetailsDomain(manager) {
    return await productRepo.FindAllProductsWithDetailsRepository(manager);
}

export async function FindProductByIdDomain(id, manager) {
    return await productRepo.FindProductByIdRepository(id, manager);
}

export async function FindProductWithDetailsDomain(id, manager) {
    return await productRepo.FindProductWithDetailsRepository(id, manager);
}

export async function CreateProductDomain(data, manager) {
    return await productRepo.CreateProductRepository(data, manager);
}

export async function UpdateProductDomain(id, data, manager) {
    return await productRepo.UpdateProductRepository(id, data, manager);
}

export async function DeleteProductDomain(id, manager) {
    return await productRepo.DeleteProductRepository(id, manager);
}

export async function InsertProductUnitDomain(data, manager) {
    return await productRepo.InsertProductUnitRepository(data, manager);
}

export async function DeleteUnitsByProductIdDomain(productId, manager) {
    return await productRepo.DeleteUnitsByProductIdRepository(productId, manager);
}

export async function SyncProductCategoriesDomain(productId, categoryIds, manager) {
    return await productRepo.SyncProductCategoriesRepository(productId, categoryIds, manager);
}