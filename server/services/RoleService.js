import { GetRolesDomain } from "../domains/RoleDomain.js";
import {CustomError} from "../middleware/ErrorHandler.js";

export async function GetAllRolesService(){
    try {
        const roles = await GetRolesDomain();
   
        return { 
            success: true,
            message: 'Berhasil mengambil data roles',
            data: {
                roles: roles
            }, 
        };
    }catch (error) {
		
        throw new CustomError("Gagal mengambil data roles: " + error.message, error.statusCode || 500);
        next(error);
    } 
};