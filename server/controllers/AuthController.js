import { LoginResponse } from '../models/responses/AuthResponse.js';
import { LoginService } from '../services/AuthService.js';

export async function LoginController(req, res, next){
	try {
		const response = await LoginService(req.body);
 
		return res.status(200).json(response);
 
	} catch (error) {
		return res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
		next(error); 
	}
};
 