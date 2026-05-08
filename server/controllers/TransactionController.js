import { CustomError }        from '../middleware/ErrorHandler.js';
import * as transactionService from '../services/TransactionService.js';

export async function GetAllTransactionsController(req, res, next) {
    try {
        const response = await transactionService.GetAllTransactionsService(req.query);
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors:  error.errors || null,
            });
        }
        next(error);
    }
}

export async function GetTransactionByIdController(req, res, next) {
    try {
        const { id }   = req.params;
        const response = await transactionService.GetTransactionByIdService(id);
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors:  error.errors || null,
            });
        }
        next(error);
    }
}

export async function CreateTransactionController(req, res, next) {
    try {
        const response = await transactionService.CreateTransactionService(req.body, req.user);
        return res.status(201).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors:  error.errors || null,
            });
        }
        next(error);
    }
}

export async function DeleteTransactionController(req, res, next) {
    try {
        const { id }   = req.params;
        const response = await transactionService.DeleteTransactionService(id);
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                errors:  error.errors || null,
            });
        }
        next(error);
    }
}
