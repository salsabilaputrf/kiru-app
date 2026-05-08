import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { User } from '../models/entities/UserEntity.js';
import { Role } from '../models/entities/RoleEntity.js';
import { Branch } from '../models/entities/BranchEntity.js';
import { Category } from '../models/entities/CategoryEntity.js';
import { Product } from '../models/entities/ProductEntity.js';
import { ProductUnit } from '../models/entities/ProductUnitEntity.js';
import { Stock } from '../models/entities/StockEntity.js';
import { Transaction } from '../models/entities/TransactionEntity.js';
import { TransactionItem } from '../models/entities/TransactionItemEntity.js';

export const AppDataSource = new DataSource({
  	type:		'mysql',
	host:		process.env.DB_HOST,
	port:		parseInt(process.env.DB_PORT),
	username:	process.env.DB_USER,
	password:	process.env.DB_PASSWORD,
	database:	process.env.DB_NAME,

	entities: [User, Role, Branch, Category, Product, ProductUnit, Stock, Transaction, TransactionItem],

	synchronize: false,

	logging: process.env.APP_ENV === 'development',

	extra:	{
		connectionLimit: 15, 
		idleTimeout: 30000, 
		connectTimeout: 2000,
		waitForConnections: true,
		queueLimit: 0,
	},
	
	timezone: '+07:00',
});

export async function initDatabase(){
	await AppDataSource.initialize();
	console.log('Database (TypeORM) connected')
}