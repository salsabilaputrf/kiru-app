import * as productService from '../services/ProductService.js';
import { CustomError } from '../middleware/ErrorHandler.js';

export async function GetAllProductsController(req, res, next) {
    try {
        const response = await productService.GetAllProductsService(req.query);

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

export async function DeleteProductController(req, res, next) {
    try {
        const { id } = req.params;
        const response = await productService.DeleteProductService(id);

        return res.status(200).json(response);

    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors: error.errors || null
            });
        }
        
        next(error);
    }
}

export async function CreateProductController(req, res, next) {
    try {
        const response = await productService.CreateProductService(req.body);

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

export async function UpdateProductController(req, res, next) {
    try {
        const { id } = req.params;
        const response = await productService.UpdateProductService(id, req.body);

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