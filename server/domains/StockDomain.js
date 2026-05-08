import * as stockRepo from '../repositories/StockRepository.js';

export async function FindStockByProductAndBranchDomain(productId, branchId, manager) {
    return await stockRepo.FindStockByProductAndBranchRepository(productId, branchId, manager);
}

export async function FindAllStocksByProductDomain(productId, manager) {
    return await stockRepo.FindAllStocksByProductRepository(productId, manager);
}

export async function IncrementStockDomain(productId, branchId, qty, manager) {
    return await stockRepo.IncrementStockRepository(productId, branchId, qty, manager);
}

export async function DecrementStockDomain(productId, branchId, qty, manager) {
    return await stockRepo.DecrementStockRepository(productId, branchId, qty, manager);
}

export async function CreateStockDomain(stockData, manager) {
    return await stockRepo.CreateStockRepository(stockData, manager);
}

export async function UpsertStockDomain(stockData, manager) {
    return await stockRepo.UpsertStockRepository(stockData, manager);
}

export async function DeleteStockByProductDomain(productId, manager = null) {
    return await stockRepo.DeleteStockByProductIdRepository(productId, manager);
}

export async function SyncStockDomain(productId, branchId, quantity, manager = null) {
    return await stockRepo.SyncStockRepository(productId, branchId, quantity, manager);
}