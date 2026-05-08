import { CustomError } from "../middleware/ErrorHandler.js";
import * as userRepo from "../repositories/UserRepository.js";

export async function IsEmailExistDomain(email, manager = null) {
    const exist = await userRepo.IsEmailExistRepository(email, manager)
    if (exist) {
        throw new CustomError('Email sudah digunakan', 409);
    }
    return exist;
}

export async function IsUsernameExistDomain(email, manager = null) {
    const exist = await userRepo.IsUsernameExistRepository(email, manager)
    if (exist) {
        throw new CustomError('Username sudah digunakan', 409);
    }
    return exist;
}

export async function InsertUserDomain(userData, manager = null) {
    return await userRepo.InsertUserRepository(userData, manager);
}

export async function GetUserByIdDomain(id, manager = null) {
    return await userRepo.GetUserByIdRepository(id, manager);
}

export async function GetUserByEmailDomain(email, columns, manager = null) {
   
    return await userRepo.GetUserByEmailRepository(email, columns, manager);
}

export async function UpdateUserDomain(id, updateData, manager = null) {
    return await userRepo.UpdateUserRepository(id, updateData, manager);
}

export async function ChangePasswordDomain(id, hashedNewPassword, manager = null) {
    return await userRepo.ChangePasswordRepository(id, hashedNewPassword, manager);
}

export async function GetAllUsersDomain({ limit, offset }, manager = null) {
    return await userRepo.GetAllUsersRepository(
        { 
            limit, 
            offset
        }, 
        manager
    );
}