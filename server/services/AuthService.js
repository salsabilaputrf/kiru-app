import { FindUserForAuthDomain, UpdateLastLoginDomain } from '../domains/AuthDomain.js';
import { comparePassword } from '../utils/Hash.js';
import { generateTokenPair } from '../utils/jwt.js'; 
import { LoginSchema } from '../models/Schemas/AuthSchema.js';
import { CustomError } from '../middleware/ErrorHandler.js'

export async function LoginService(payload) {
    let user;
    try {
        const { error, value } = LoginSchema.validate(payload, { 
            abortEarly: false,
            stripUnknown: true 
        });

        if (error) {
            const errorMessages = error.details.map(d => d.message.replace(/"/g, '')).join(', ');
            throw new CustomError(`Validasi gagal : ${errorMessages}`, 400); 
        }
	
        user = await FindUserForAuthDomain(value.username);

        if (!user) {
            throw new CustomError('Username atau password salah', 401);
        }

        if (user.status !== 'active') {
            throw new CustomError('Akun anda ditangguhkan atau tidak aktif', 403);
        }

        const isMatchPassword = await comparePassword(value.password, user.password);
        if (!isMatchPassword) {
            throw new CustomError('Username atau password salah', 401);
        }

        await UpdateLastLoginDomain(user.username);

        const tokens = generateTokenPair({ 
            id: user.id, 
            roleId: user.role?.id, 
            branchId: user.branch?.id
        });
        
         
        return {
            success: true,
			message: 'Login berhasil',
			data: {
                ...tokens,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role?.role_name,
                    branch_id: user.branch?.id,
                    branch: user.branch?.name,
                    branchLocation: user.branch?.location,
                    status: user.status,
                    lastLogin: user.lastLoginAt,
                    joinDate: user.createdAt
                }
            },
            
            
        };

    } catch (error) {
        if (error instanceof CustomError) {
            throw error; 
        }
        throw new CustomError(error.message || 'Terjadi kesalahan pada server', error.statusCode || 500);
    }
}
