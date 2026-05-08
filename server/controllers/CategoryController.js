import { GetAllCategoriesService, CreateCategoryService, UpdateCategoryService, DeleteCategoryService } from "../services/CategoryService.js";
import { CustomError } from "../middleware/ErrorHandler.js";

export async function GetAllCategoriesController(req, res, next) {
    try {
        const response = await GetAllCategoriesService();

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

export async function CreateCategoryController(req, res, next) {
    try {
        const { name } = req.body;

        const response = await CreateCategoryService({ name });

        return res.status(201).json(response);

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

export async function UpdateCategoryController(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const response = await UpdateCategoryService(id, { name });

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

export async function DeleteCategoryController(req, res, next) {
    try {
        const { id } = req.params;

        const response = await DeleteCategoryService(id);

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