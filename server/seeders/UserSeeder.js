import 'dotenv/config'; 
import { AppDataSource } from '../configs/Db.js';
import { User } from '../models/entities/UserEntity.js';
import { Role } from '../models/entities/RoleEntity.js';     // Pastikan Entity ini ada
import { Branch } from '../models/entities/BranchEntity.js'; // Pastikan Entity ini ada
import { hashPassword } from '../utils/hash.js';

const seedDatabase = async () => {
	console.log('\n--- Starting Full Seeder ---\n');

	try {
		if (!AppDataSource.isInitialized) {
			await AppDataSource.initialize();
		}

		const branchRepo = AppDataSource.getRepository(Branch);
		const roleRepo = AppDataSource.getRepository(Role);
		const userRepo = AppDataSource.getRepository(User);

		// SEED BRANCHES
		console.log('Seeding Branches...');
		const branchesData = [
			{ name: 'Branch A', location: 'Jakarta', is_active: true },
			{ name: 'Branch B', location: 'Bandung', is_active: true }
		];

		for (const b of branchesData) {
			const exists = await branchRepo.findOneBy({ name: b.name });
			if (!exists) await branchRepo.save(branchRepo.create(b));
		}
		const branchA = await branchRepo.findOneBy({ name: 'Branch A' });

		// SEED ROLES
		console.log('Seeding Roles...');
		const rolesData = [
			{ role_name: 'owner', rules: 'all_access' },
			{ role_name: 'admin', rules: 'limited_manage' },
			{ role_name: 'kasir', rules: 'transaction_only' }
		];

		for (const r of rolesData) {
			const exists = await roleRepo.findOneBy({ role_name: r.role_name });
			if (!exists) await roleRepo.save(roleRepo.create(r));
		}
		const ownerRole = await roleRepo.findOneBy({ role_name: 'owner' });

		// SEED OWNER USER
		console.log('Seeding Owner User...');
		const ownerEmail = process.env.SUPER_ADMIN_EMAIL;
		
		const existingOwner = await userRepo.findOneBy({ email: ownerEmail });
		if (existingOwner) {
			console.log('Owner already exists.');
		} else {
			const hashedPassword = await hashPassword(process.env.SUPER_ADMIN_PASSWORD);
		

			const newOwner = userRepo.create({
				name: process.env.SUPER_ADMIN_NAME,
				username: 'superadmin123',
				email: ownerEmail,
				password: hashedPassword,
				status: 'active',
				role: { id: ownerRole.id },
				branch: { id: branchA.id }
			});

			await userRepo.save(newOwner);
			console.log('Success: All data seeded!');
		}

		await AppDataSource.destroy();
		process.exit(0);

	} catch (error) {
		console.error('Seeder failed:', error.message);
		if (AppDataSource.isInitialized) await AppDataSource.destroy();
		process.exit(1);
	}
};

seedDatabase();