import dotenv from 'dotenv';
dotenv.config();

export  const appConfig = {
	name: process.env.APP_NAME,
	port: parseInt(process.env.APP_PORT),
	env: process.env.APP_ENV,
	isDev: process.env.APP_ENV,
};

export  const jwtConfig = {
	secret: process.env.JWT_SECRET,
	expiresIn: process.env.JWT_EXPIRES_IN,
	refreshSecret: process.env.JWT_REFRESH_SECRET,
	refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
};

export  const bcryptConfig = {
	saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
};

export default { appConfig, jwtConfig, bcryptConfig };