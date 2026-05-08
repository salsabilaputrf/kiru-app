import { UserListResponse, UserResponse } from '../models/responses/UserResponse.js';
import * as userService from '../services/UserService.js';
import { CustomError } from '../middleware/ErrorHandler.js';

export async function CreateUserController(req, res, next) {
    try {
        const response = await userService.CreateUserService(req.body);

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

export async function UpdateUserController(req, res, next) {
    try {
        const { id } = req.params; 
        const updateData = req.body;

        const response = await userService.UpdateUserService(id, updateData);

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

export async function ChangePasswordController(req, res, next) {
    try {
        const userId = req.user.id; 
        const { oldPassword, newPassword } = req.body;

        const response = await userService.ChangePasswordService(userId, { oldPassword, newPassword });

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

export async function GetAllUsersController(req, res, next) {
    try {
        const response = await userService.GetAllUsersService(req.query);

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