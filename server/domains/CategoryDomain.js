import * as categoryRepo from '../repositories/CategoryRepository.js';

export async function GetCategoriesDomain(manager) {
    
    return await categoryRepo.FindAllCategoriesRepository(manager);
}

export async function FindAllCategoriesDomain(manager) {
   
    return await categoryRepo.FindAllCategoriesRepository(manager);
}

export async function FindCategoryByIdDomain(id, manager) {
    return await categoryRepo.FindCategoryByIdRepository(id, manager);
}

export async function FindCategoryByNameDomain(name, manager) {
    return await categoryRepo.FindCategoryByNameRepository(name, manager);
}

export async function CreateCategoryDomain(categoryData, manager) {
    return await categoryRepo.CreateCategoryRepository(categoryData, manager);
}

export async function UpdateCategoryDomain(id, categoryData, manager) {
    return await categoryRepo.UpdateCategoryRepository(id, categoryData, manager);
}

export async function DeleteCategoryDomain(id, manager) {
    return await categoryRepo.DeleteCategoryRepository(id, manager);
}