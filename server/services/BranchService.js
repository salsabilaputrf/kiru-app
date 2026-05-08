import { GetBranchesDomain } from "../domains/BranchDomain.js";
import {CustomError} from "../middleware/ErrorHandler.js";

export async function GetAllBranchesService(){
    try {
        const branches = await GetBranchesDomain();
        return { 
            success: true,
            message: 'Berhasil mengambil data branches',
            data: {
                branches: branches
            }, 
        };
    }catch (error) {
        
        throw new CustomError("Gagal mengambil data branches: " + error.message, error.statusCode || 500);
        next(error);
    } 
};