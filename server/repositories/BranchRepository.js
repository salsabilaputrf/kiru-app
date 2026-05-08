import { AppDataSource } from '../configs/db.js';
import { Branch } from '../models/entities/BranchEntity.js';

const getRepo = (manager) => (manager ? manager.getRepository(Branch) : AppDataSource.getRepository(Branch));

export async function FindBranchByNameRepository(name, manager = null) {
    return await getRepo(manager).findOne({
        where: { name: name }, 
        select: ['id'] 
    });
}

export async function GetBranchesRepository(manager = null) {
        const repository = getRepo(manager);
        
        const query = repository.createQueryBuilder("branch")
            .where("branch.isActive = :status", { status: true })
            .orderBy("branch.name", "ASC");

        const data = await query.getMany();
        
        return data;
   
}

export async function FindBranchByIdRepository(id, manager = null) {
    return await getRepo(manager).findOne({
        where: { id }
    });
}