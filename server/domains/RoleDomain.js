import * as roleRepo from '../repositories/RoleRepository.js';

export async function FindRoleByNameDomain(name, manager) {
    return await roleRepo.FindRoleByNameRepository(name, manager);
}

export async function GetRolesDomain(manager) {
    return await roleRepo.GetRolesRepository(manager);
}