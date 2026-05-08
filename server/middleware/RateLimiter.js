const store = new Map();
 
export const rateLimiter = (max = 100, windowMs = 15 * 60 * 1000) =>
	(req, res, next) => {
		const key = req.ip ?? 'unknown';
		const now = Date.now();
		const rec = store.get(key);
 
		if (!rec || now > rec.resetAt) {
			store.set(key, { count: 1, resetAt: now + windowMs });
			return next();
		}
 
		rec.count++;
		if (rec.count > max) {
			return res.status(429).json({
				success: false,
				message: 'Terlalu banyak permintaan, coba lagi nanti.',
				retryAfter: Math.ceil((rec.resetAt - now) / 1000),
			});
		}
		next();
	};
 
export const authLimiter = rateLimiter(20, 15 * 60 * 1000);