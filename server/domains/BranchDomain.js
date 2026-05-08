import * as branchRepo from '../repositories/BranchRepository.js';

export async function FindBranchByNameDomain(name, manager) {
    return await branchRepo.FindBranchByNameRepository(name, manager); 
}

export async function GetBranchesDomain(manager) {
    return await branchRepo.GetBranchesRepository(manager); 
}

export async function FindBranchByIdDomain(id, manager) {
    return await branchRepo.FindBranchByIdRepository(id, manager);
}