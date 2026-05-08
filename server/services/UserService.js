import { hashPassword } from '../utils/hash.js';
import { getPagination, paginationMeta } from '../utils/pagination.js';
import * as userDomain from '../domains/UserDomain.js';
import { CreateUserSchema, UpdateUserSchema, ChangePasswordSchema } from '../models/schemas/UserSchema.js';
import { AppDataSource } from '../configs/Db.js';
import { FindRoleByNameDomain } from '../domains/RoleDomain.js';
import { FindBranchByNameDomain } from '../domains/BranchDomain.js'
import { CustomError } from '../middleware/ErrorHandler.js';
import { UserListResponse } from '../models/responses/UserResponse.js';
import { comparePassword } from '../utils/hash.js';
import { FindUserForAuthDomain } from '../domains/AuthDomain.js';

export async function CreateUserService(payload){
    const { error, value } = CreateUserSchema.validate(payload, { 
        abortEarly: false,
        stripUnknown: true
    });
    

    if (error) {
        const errorMessages = error.details.map(d => d.message.replace(/"/g, '')).join(', ');
        throw new CustomError(`Validasi gagal : ${errorMessages}` , 400);
    }
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    

	try {
        await queryRunner.startTransaction();

		await userDomain.IsEmailExistDomain(value.email, queryRunner.manager);

        await userDomain.IsUsernameExistDomain(value.username, queryRunner.manager);

        const hashedPassword = await hashPassword(value.password);

        const role = await FindRoleByNameDomain(value.role);

        if (!role) {
            throw new CustomError(`Role dengan nama '${name}' tidak ditemukan`, 404);
        }

        const branch = await FindBranchByNameDomain(value.branch);

        if (!branch) {
            throw new CustomError(`Cabang '${name}' tidak terdaftar dalam sistem`), 404;
        }
 
        const savedUser = await userDomain.InsertUserDomain({
            name: value.name,
            email: value.email,
            password: hashedPassword,
            username: value.username,
            roleId: role?.id,
            branchId: branch?.id,           
            status: value.status
        }, queryRunner.manager);

		await queryRunner.commitTransaction();
        const response = {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
            role: value.role,
            status: savedUser.status,
            createdAt: savedUser.createdAt
        }
        return { 
            success: true,
            message: 'User berhasil dibuat',
            data: {
                user: response
            }, 
        };
        
	} catch (error) {
		if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw new CustomError(error.message, error.statusCode || 500);
        next(error);
    } finally {
        await queryRunner.release();
    }
};

export async function UpdateUserService(id, updateData) {
    const { error, value } = UpdateUserSchema.validate(updateData, { 
        abortEarly: false,  
        stripUnknown: true 
    });

    if (error) {
        const errorMessages = error.details.map(d => d.message.replace(/"/g, '')).join(', ');
        throw new CustomError(`Validasi update gagal : ${errorMessages}`, 400);
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    
    try {
        await queryRunner.startTransaction();
        
        const userExists = await userDomain.FindUserByIdDomain(id, queryRunner.manager);
        if (!userExists) {
            throw new CustomError("User tidak ditemukan", 404);
        }
      
        let storeData = { ...value };
        
        if (value.email && value.email !== userExists.email) {
           
            const emailTaken = await userDomain.FindUserByEmailDomain(value.email,['id', 'email'], queryRunner.manager);
            if (emailTaken) {
                throw new CustomError("Email sudah terdaftar oleh pengguna lain", 409);
            }   
        }

        if (value.username && value.username !== userExists.username) {
            const usernameTaken = await FindUserForAuthDomain(value.username, queryRunner.manager);
            if (usernameTaken) {
                throw new CustomError("Username sudah terdaftar oleh pengguna lain", 409);
            }
    
        }

        if(value.password){
            const hashedNewPassword = await hashPassword(value.password);
            storeData.password = hashedNewPassword;
        }

        if(value.role && value.role !== userExists.role?.role_name){
            const role = await FindRoleByNameDomain(value.role);

            if (!role) {
                throw new CustomError(`Role dengan nama '${value.role}' tidak ditemukan`, 404);
            }
            storeData.role_id = role.id;
        }

        if(value.branch && value.branch !== userExists.branch?.name){
            const branch = await FindBranchByNameDomain(value.branch);

            if (!branch) {
                throw new CustomError(`Cabang '${value.branch}' tidak terdaftar dalam sistem`), 404;
            }
            storeData.branch_id = branch.id;
        }

        delete storeData.role;
        delete storeData.branch;
        
        const updatedUser = await userDomain.UpdateUserDomain(userExists.id, storeData, queryRunner.manager);

        await queryRunner.commitTransaction();
        
        return {
            success: true,
            message: "Data user berhasil di update",
            data: {
                user: updatedUser
            }         
        }
    } catch (error) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw new CustomError(error.message, error.statusCode || 500);
        next(error);

    } finally {
        await queryRunner.release();
    }
}

export async function ChangePasswordService(id, passwordData) {
    const { error, value } = ChangePasswordSchema.validate(passwordData, { 
        abortEarly: false,  
        stripUnknown: true 
    });

    if (error) {
        const errorMessages = error.details.map(d => d.message.replace(/"/g, '')).join(', ');
        throw new CustomError(`Validasi gagal: ${errorMessages}`, 400);
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    try {
        await queryRunner.startTransaction();

        const userExists = await userDomain.FindUserByIdDomain(id, queryRunner.manager);
        
        if (!userExists) {
            throw new CustomError("User tidak ditemukan", 404);
        }

        const isMatch = await comparePassword(value.oldPassword, userExists.password);
        if (!isMatch) {
            throw new CustomError("Password lama yang Anda masukkan salah", 401);
        }

        const hashedNewPassword = await hashPassword(value.newPassword);

        await userDomain.ChangePasswordDomain(
            id, 
            hashedNewPassword, 
            queryRunner.manager
        );

        await queryRunner.commitTransaction();

        return {
            success: true,
            message: "Password berhasil diperbarui pada " + new Date().toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false 
            }),
        };

    } catch (error) {
        if (queryRunner.isTransactionActive) {
            await queryRunner.rollbackTransaction();
        }
        throw new CustomError(error.message, error.statusCode || 500);
    } finally {
        await queryRunner.release();
    }
}

export async function GetAllUsersService(query) {
    const { page, limit, offset } = getPagination(query);

    const { rows, total } = await userDomain.GetAllUsersDomain({ 
        limit, 
        offset, 
    });

    const pagination = paginationMeta(total, page, limit);

    const response = UserListResponse(rows, pagination ) 
    return {
        success: true,
        message: 'Data user berhasil diambil',
        data: response
    }
            
}