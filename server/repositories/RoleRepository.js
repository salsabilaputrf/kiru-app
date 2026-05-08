import { AppDataSource } from '../configs/Db.js';
import { Role } from '../models/entities/RoleEntity.js';

const getRepo = (manager) => (manager ? manager.getRepository(Role) : AppDataSource.getRepository(Role));

export async function FindRoleByNameRepository(name, manager = null) {
    return await getRepo(manager).findOne({
        where: { role_name: name }, 
        select: ['id'] 
    });
}

export async function GetRolesRepository(manager = null) {
    const repository = getRepo(manager);

    const query = repository.createQueryBuilder("role")
        .orderBy("role.role_name", "ASC");

    const data = await query.getMany();

    return data;
}