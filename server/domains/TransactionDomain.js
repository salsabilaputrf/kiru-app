import * as transactionRepo from '../repositories/TransactionRepository.js';

export async function GetAllTransactionsDomain({ limit, offset, branch_id }, manager) {
    return await transactionRepo.GetAllTransactionsRepository({ limit, offset, branch_id }, manager);
}

export async function FindTransactionByIdDomain(id, manager) {
    return await transactionRepo.FindTransactionByIdRepository(id, manager);
}

export async function CreateTransactionDomain({ branch_id, user_id, transaction_date }, manager) {
    return await transactionRepo.CreateTransactionRepository({ branch_id, user_id, transaction_date }, manager);
}

export async function CreateTransactionItemsDomain(items, manager) {
    return await transactionRepo.CreateTransactionItemsRepository(items, manager);
}

export async function DeleteTransactionDomain(id, manager) {
    return await transactionRepo.DeleteTransactionRepository(id, manager);
}