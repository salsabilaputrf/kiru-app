import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import mainRoutes from './routes/MainRoutes.js';
import { rateLimiter } from './middleware/RateLimiter.js';
import { AppDataSource } from "./configs/db.js";

const app = express();
const PORT = parseInt(process.env.APP_PORT);
const HOST = (process.env.APP_HOST);

await AppDataSource.initialize();
console.log("Database Connected!");

app.use(cors({
	origin: process.env.CORS_ORIGIN,
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(rateLimiter(300, 15 * 60 * 1000)); // 200 req / 15 min
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', mainRoutes); 

app.listen(PORT, HOST, (error) => {
	if (!error) {
		console.log(`Server Kiru App berjalan di mode: ${process.env.APP_ENV}`);
		console.log(`URL: http://${HOST}:${PORT}/api/v1`);
	} else {
		console.log("Error occurred, server can't start", error);
	}
});