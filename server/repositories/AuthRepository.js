import { AppDataSource } from '../configs/Db.js';
import { User } from '../models/entities/UserEntity.js';

const getRepo = (manager) => (manager ? manager.getRepository(User) : AppDataSource.getRepository(User));

export async function FindUserForAuthRepository(username, manager = null) {
    const query = getRepo(manager)
        .createQueryBuilder('user')
        .select([
            'user.id',
            'user.name',
            'user.username',
            'user.email',
            'user.password',
            'user.status',
            'user.lastLoginAt',
            'user.createdAt'
        ])
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.branch', 'branch')
        .where('user.username = :username', { username });

    return await query.getOne();
}
 
export async function UpdateLastLoginRepository(username, manager = null) {
    return await getRepo(manager).update(
        { username: username },
        { lastLoginAt: new Date() } 
    );
}