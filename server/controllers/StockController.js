import * as stockService from '../services/StockService.js';
import { CustomError } from '../middleware/ErrorHandler.js';

export async function AddStockController(req, res, next) {
    try {
        const response = await stockService.AddStockService(req.body);

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