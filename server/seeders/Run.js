import 'dotenv/config';
import { AppDataSource }  from '../configs/Db.js';
import { hashPassword }   from '../utils/hash.js';

// Entities 
import { Branch }        from '../models/entities/BranchEntity.js';
import { Role }          from '../models/entities/RoleEntity.js';
import { User }          from '../models/entities/UserEntity.js';
import { Category }      from '../models/entities/CategoryEntity.js';
import { Product }       from '../models/entities/ProductEntity.js';
import { ProductUnit }   from '../models/entities/ProductUnitEntity.js';
import { Stock }         from '../models/entities/StockEntity.js';
import { Transaction }   from '../models/entities/TransactionEntity.js';
import { TransactionItem } from '../models/entities/TransactionItemEntity.js';

// Raw Data
import {
    branchesData,
    rolesData,
    usersData,
    categoriesData,
    productsData,
    transactionsData,
} from './Data.js';

async function upsert(repo, where, data) {
    let entity = await repo.findOneBy(where);
    if (!entity) entity = await repo.save(repo.create(data));
    return entity;
}

//  1. SEED BRANCHES
async function seedBranches(ds) {
    console.log('\n[1/5] Seeding Branches...');
    const repo = ds.getRepository(Branch);
    const map  = {};

    for (const b of branchesData) {
        const entity = await upsert(repo, { name: b.name }, b);
        map[b.name]  = entity;
    }

    console.log(`     ✔ ${branchesData.length} branches seeded.`);
    return map; 
}

//  2. SEED ROLES
async function seedRoles(ds) {
    console.log('\n[2/5] Seeding Roles...');
    const repo = ds.getRepository(Role);
    const map  = {};

    for (const r of rolesData) {
        const entity   = await upsert(repo, { role_name: r.role_name }, r);
        map[r.role_name] = entity;
    }

    console.log(`     ✔ ${rolesData.length} roles seeded.`);
    return map; 
}

//  3. SEED USERS (10)
async function seedUsers(ds, branchMap, roleMap) {
    console.log('\n[3/5] Seeding Users (10)...');
    const repo    = ds.getRepository(User);
    const userMap = {};
    let   created = 0;

    for (const u of usersData) {
        const exists = await repo.findOneBy({ email: u.email });

        if (!exists) {
            const hashed = await hashPassword(u.password);

            const newUser = repo.create({
                name:     u.name,
                username: u.username,
                email:    u.email,
                password: hashed,
                status:   u.status,
                role:     { id: roleMap[u.roleName].id },
                branch:   u.branchName ? { id: branchMap[u.branchName].id } : null,
            });

            const saved      = await repo.save(newUser);
            userMap[u.username] = saved;
            created++;
        } else {
            userMap[u.username] = exists;
        }
    }

    console.log(`     ✔ ${created} users created (${usersData.length - created} already exist).`);
    return userMap; 
}

//  4. SEED PRODUCTS (50) + Units + Stock
async function seedProducts(ds, branchMap) {
    console.log('\n[4/5] Seeding Categories + Products (50) + Units + Stock...');

    const categoryRepo = ds.getRepository(Category);
    const productRepo  = ds.getRepository(Product);
    const unitRepo     = ds.getRepository(ProductUnit);
    const stockRepo    = ds.getRepository(Stock);

    // Categories 
    const catMap = {};
    for (const c of categoriesData) {
        const entity    = await upsert(categoryRepo, { name: c.name }, c);
        catMap[c.name]  = entity;
    }

    // Products + Units + Stock 
    const productUnitMap = {}; 
    let   createdProds   = 0;
    const branchIds      = Object.values(branchMap).map(b => b.id);

    for (const pData of productsData) {
        let product = await productRepo.findOneBy({ product_name: pData.name });

        if (!product) {
            product = await productRepo.save(
                productRepo.create({
                    product_name: pData.name,
                    categories:   [catMap[pData.cat]],
                })
            );
            createdProds++;
        }

        // ProductUnits
        for (const u of pData.units) {
            const key         = `${pData.name}|${u.unit_name}`;
            let   unitEntity  = await unitRepo.findOneBy({
                product_id: product.id,
                unit_name:  u.unit_name,
            });

            if (!unitEntity) {
                unitEntity = await unitRepo.save(
                    unitRepo.create({
                        product_id:     product.id,
                        unit_name:      u.unit_name,
                        multiplier:     u.multiplier,
                        is_base_unit:   u.is_base_unit,
                        purchase_price: pData.price * u.multiplier * 0.8,
                        selling_price:  pData.price * u.multiplier,
                    })
                );
            }

            productUnitMap[key] = unitEntity;
        }

        // Stock per branch
        for (const bId of branchIds) {
            const stockExists = await stockRepo.findOneBy({
                branch_id:  bId,
                product_id: product.id,
            });

            if (!stockExists) {
                await stockRepo.save(
                    stockRepo.create({
                        branch_id:  bId,
                        product_id: product.id,
                        quantity:   Math.floor(Math.random() * 91) + 10, 
                    })
                );
            }
        }
    }

    console.log(`     ✔ ${createdProds} products created (${productsData.length - createdProds} already exist).`);
    console.log(`     ✔ Stock seeded across ${branchIds.length} branches.`);
    return productUnitMap; 
}

//  5. SEED TRANSACTIONS (50) + TransactionItems
async function seedTransactions(ds, branchMap, userMap, productUnitMap) {
    console.log('\n[5/5] Seeding Transactions (50) + Items...');

    const transRepo = ds.getRepository(Transaction);
    const itemRepo  = ds.getRepository(TransactionItem);

    const productRepo = ds.getRepository(Product);
    const allProducts = await productRepo.find();
    const productIdMap = {}; 
    for (const p of allProducts) productIdMap[p.product_name] = p.id;

    let created = 0;
    let skipped = 0;

    for (const txData of transactionsData) {
        const branch = branchMap[txData.branchName];
        const user   = userMap[txData.userName];

        if (!branch) { console.warn(`     Branch tidak ditemukan: ${txData.branchName}`); skipped++; continue; }
        if (!user)   { console.warn(`     User tidak ditemukan: ${txData.userName}`);     skipped++; continue; }


        const resolvedItems = [];
        let   valid         = true;

        for (const item of txData.items) {
            const unitKey  = `${item.productName}|${item.unitName}`;
            const unit     = productUnitMap[unitKey];
            const productId = productIdMap[item.productName];

            if (!unit || !productId) {
                console.warn(`     Unit tidak ditemukan: ${unitKey}`);
                valid = false;
                break;
            }

            resolvedItems.push({
                product_id:      productId,
                product_unit_id: unit.id,
                quantity:        item.quantity,
                unit_price:      unit.selling_price,
            });
        }

        if (!valid) { skipped++; continue; }

        // Insert transaction
        const tx = await transRepo.save(
            transRepo.create({
                branch_id:        branch.id,
                user_id:          user.id,
                transaction_date: new Date(txData.transaction_date),
            })
        );

        // Insert items
        for (const ri of resolvedItems) {
            await itemRepo.save(
                itemRepo.create({
                    transaction_id:  tx.id,
                    product_id:      ri.product_id,
                    product_unit_id: ri.product_unit_id,
                    quantity:        ri.quantity,
                    unit_price:      ri.unit_price,
                })
            );
        }

        created++;
    }

    console.log(`     ✔ ${created} transactions created, ${skipped} skipped.`);
}

const run = async () => {
    console.log('\n╔══════════════════════════════════════╗');
    console.log('║       MASTER SEEDER — POS App        ║');
    console.log('╚══════════════════════════════════════╝');

    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('\n  ✔ Database connected.');
        }

        const branchMap      = await seedBranches(ds);
        const roleMap        = await seedRoles(ds);
        const userMap        = await seedUsers(ds, branchMap, roleMap);
        const productUnitMap = await seedProducts(ds, branchMap);
        await seedTransactions(ds, branchMap, userMap, productUnitMap);

        console.log('\n╔══════════════════════════════════════╗');
        console.log('║          SEEDING SELESAI! ✓          ║');
        console.log('╚══════════════════════════════════════╝\n');

        await AppDataSource.destroy();
        process.exit(0);

    } catch (err) {
        console.error('\n  ✘ Seeder gagal:', err.message);
        console.error(err.stack);
        if (AppDataSource.isInitialized) await AppDataSource.destroy();
        process.exit(1);
    }
};
const ds = AppDataSource;

run();