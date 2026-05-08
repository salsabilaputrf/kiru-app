import { verifyAccessToken } from '../utils/jwt.js';
import { GetUserByIdDomain } from '../domains/UserDomain.js';

export const authenticate = async (req, res, next) => {
	try {
		const header = req.headers.authorization;
	
		if (!header?.startsWith('Bearer ')) {
			return res.status(401).json({ 
				success: false, 
				message: 'Token tidak ditemukan' 
			});
		}
	
		const token = header.split(' ')[1];
		const decoded = verifyAccessToken(token);

		const user = await GetUserByIdDomain(decoded.id);
		if (!user) {
			return res.status(401).json({ 
				success: false, 
				message: 'User tidak ditemukan' 
			});
		}

		if (user.status !== 'active') {
			return res.status(403).json({ 
				success: false, 
				message: `Akun ${user.status}` 
			});
		}

		req.user = user;
		next();
		
	} catch (err) {
		console.log(err)
		const message = err.name === 'TokenExpiredError' 
			? 'Token kedaluwarsa' 
			: 'Token tidak valid';
			
		return res.status(401).json({ success: false, message });
	}
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role?.role_name)) {
    return res.status(403).json({ success: false, message: 'Akses ditolak' });
  }
  next();
};