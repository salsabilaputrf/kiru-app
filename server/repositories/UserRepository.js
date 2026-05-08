import { AppDataSource } from '../configs/db.js';
import { User } from '../models/entities/UserEntity.js';

const getRepo = (manager) => (manager ? manager.getRepository(User) : AppDataSource.getRepository(User));

export async function IsEmailExistRepository(email, manager = null) {
    const count = await getRepo(manager).countBy({email});
    return count > 0;
}

export async function IsUsernameExistRepository(username, manager = null) {
    const count = await getRepo(manager).countBy({username});
    return count > 0;
}

export async function InsertUserRepository(userData, manager = null) {
    const userRepository = getRepo(manager);
    return await userRepository.save({
        name: userData.name,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        status: userData.status,
        role_id: userData.roleId,   
        branch_id: userData.branchId
    });
}

export async function GetUserByIdRepository(id, manager = null) {
    const repository = getRepo(manager);
    
    const result = await repository.createQueryBuilder("user")
        .leftJoin("user.role", "role")
        .leftJoin("user.branch", "branch")
        .select([
            "user.id",
            "user.name",
            "user.username",
            "user.email",
            "user.password",
            "user.status",
            "role.id",
            "role.role_name", 
            "branch.id",
            "branch.name"    
        ])
        .where("user.id = :id", { id })
        .getOne();
        console.log(result);
        return result;
}

export async function GetUserByEmailRepository(email, columns, manager = null) {
    return getRepo(manager).findOne({
        where: { email },
        select: columns 
    });
}

export async function UpdateUserRepository(id, updateData, manager = null) {
    const qb = getRepo(manager);

    await qb.createQueryBuilder()
        .update(User)
        .set(updateData)
        .where("id = :id", { id })
        .execute();

    const result = await qb.createQueryBuilder("user") 
        .select([
            "user.id",
            "user.name",
            "user.username",
            "user.email",
            "user.status",
            "user.updatedAt"
        ])
        .where("user.id = :id", { id })
        .getOne();

    return result;
}

export async function ChangePasswordRepository(id, hashedNewPassword, manager = null) {
    const qb = getRepo(manager); 

    return await qb.createQueryBuilder()
        .update(User)
        .set({ password: hashedNewPassword }) 
        .where("id = :id", { id })
        .execute();
}

export async function GetAllUsersRepository({ limit, offset }, manager = null) {
    const qb = getRepo(manager).createQueryBuilder('user')
        .select([
            'user.id',
            'user.name',
            'user.email',
            'user.username',
            'user.status',
            'user.lastLoginAt',
            'user.createdAt',
        ])
        .leftJoin('user.role', 'role')
        .addSelect(['role.id', 'role.role_name'])
        .leftJoin('user.branch', 'branch') 
        .addSelect(['branch.id', 'branch.name'])
        .orderBy('user.createdAt', 'DESC')
        .skip(offset)
        .take(limit);

    
    const [rows, total] = await qb.getManyAndCount();

    return { rows, total };
}