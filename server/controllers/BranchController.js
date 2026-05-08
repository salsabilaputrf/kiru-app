import { GetAllBranchesService } from "../services/BranchService.js";
import { CustomError } from "../middleware/ErrorHandler.js";

export async function GetAllBranchesController(req, res, next) {
    try {
        const response = await GetAllBranchesService();

        return res.status(200).json(response);

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors
            });
        }
        next(error);
    }
}