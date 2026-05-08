import { CustomError } from '../middleware/ErrorHandler.js';
import * as authRepo from '../repositories/AuthRepository.js';

export async function FindUserForAuthDomain(username, manager) {
	return await authRepo.FindUserForAuthRepository(username, manager);
}

export async function UpdateLastLoginDomain(username, manager) {
	const result = await authRepo.UpdateLastLoginRepository(username, manager);

    if (!result) {
        throw new CustomError('Gagal memperbarui data login terakhir', 500);
    }

	return result;
}