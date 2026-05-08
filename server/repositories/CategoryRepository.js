import { AppDataSource } from '../configs/db.js';
import { Category } from '../models/entities/CategoryEntity.js';

const getRepo = (manager) => (manager ? manager.getRepository(Category) : AppDataSource.getRepository(Category));

export async function GetCategoriesRepository(manager = null) {
        const repository = getRepo(manager);

        const query = repository.createQueryBuilder("category")
            .orderBy("category.name", "ASC");

        const data = await query.getMany();
 
        return data;
   
}

export async function FindAllCategoriesRepository(manager = null) {
     
    const rawData = await getRepo(manager).createQueryBuilder('category')
    .leftJoin('product_category_rel', 'pc', 'pc.category_id = category.id')
    .select([
        'category.id AS id',
        'category.name AS name',
        'category.created_at AS created_at'
    ])
    .addSelect('COUNT(pc.product_id)', 'product_count')
    .groupBy('category.id')
    .orderBy('category.name', 'ASC')
    .getRawMany();

    return rawData.map(item => ({
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        product_count: parseInt(item.product_count || 0)
    }));
}

export async function FindCategoryByIdRepository(id, manager = null) {
    return await getRepo(manager).findOne({
        where: { id }
    });
}

export async function FindCategoryByNameRepository(name, manager = null) {
    return await getRepo(manager).findOne({
        where: { name}
    });
}

export async function CreateCategoryRepository({ name }, manager = null) {
    const repo = getRepo(manager);
    const newCategory = repo.create({ name });
    return await repo.save(newCategory);
}

export async function UpdateCategoryRepository(id, { name }, manager = null) {
    return await getRepo(manager).update(
        { id },
        { 
            name, 
            updated_at: new Date() 
        }
    );
}

export async function DeleteCategoryRepository(id, manager = null) {
    const repo = getRepo(manager);
    return await repo.delete(id);
}