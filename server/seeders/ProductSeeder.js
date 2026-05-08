import 'dotenv/config';
import { fileURLToPath } from 'url';
import { AppDataSource } from '../configs/db.js';
import { Category }       from '../models/entities/CategoryEntity.js';
import { Product }         from '../models/entities/ProductEntity.js';
import { ProductUnit } from '../models/entities/ProductUnitEntity.js';
import { Stock }             from '../models/entities/StockEntity.js';


export const seedProducts = async (dataSource, branchIds) => { 
    const categoryRepo = dataSource.getRepository(Category);
    const productRepo  = dataSource.getRepository(Product);
    const unitRepo     = dataSource.getRepository(ProductUnit);
    const stockRepo    = dataSource.getRepository(Stock);

    console.log('--- Seeding Categories ---');
    const categoriesData = [
        { name: 'Minuman' },
        { name: 'Makanan Ringan' },
        { name: 'Alat Tulis' },
    ];

    const categoryMap = {};
    for (const c of categoriesData) {
        let cat = await categoryRepo.findOneBy({ name: c.name });
        if (!cat) cat = await categoryRepo.save(categoryRepo.create(c));
        categoryMap[c.name] = cat;
    }

    console.log('--- Seeding 15 Products with Multiple Units ---');
    const productsList = [
        // MINUMAN
        {
            name: 'Kopi Susu Gula Aren', cat: 'Minuman', price: 15000,
            units: [
                { unit_name: 'Cup',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
            ]
        },
        {
            name: 'Teh Manis Dingin', cat: 'Minuman', price: 5000,
            units: [
                { unit_name: 'Cup',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
            ]
        },
        {
            name: 'Susu UHT Cokelat', cat: 'Minuman', price: 7000,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Karton',  multiplier: 24, is_base_unit: false },
            ]
        },
        {
            name: 'Air Mineral 600ml', cat: 'Minuman', price: 3500,
            units: [
                { unit_name: 'Botol',   multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Dus',     multiplier: 24, is_base_unit: false },
            ]
        },
        {
            name: 'Jus Jeruk Segar', cat: 'Minuman', price: 12000,
            units: [
                { unit_name: 'Cup',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
            ]
        },

        // MAKANAN RINGAN
        {
            name: 'Keripik Singkong Pedas', cat: 'Makanan Ringan', price: 10000,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Dus',     multiplier: 20, is_base_unit: false },
            ]
        },
        {
            name: 'Biskuit Cokelat', cat: 'Makanan Ringan', price: 8500,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Karton',  multiplier: 48, is_base_unit: false },
            ]
        },
        {
            name: 'Kacang Atom', cat: 'Makanan Ringan', price: 6000,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
            ]
        },
        {
            name: 'Roti Bakar Keju', cat: 'Makanan Ringan', price: 15000,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
            ]
        },
        {
            name: 'Permen Mint Box', cat: 'Makanan Ringan', price: 5000,
            units: [
                { unit_name: 'Box',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
                { unit_name: 'Gross',   multiplier: 144, is_base_unit: false },
            ]
        },

        // ALAT TULIS
        {
            name: 'Pulpen Gel Hitam', cat: 'Alat Tulis', price: 4500,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
                { unit_name: 'Gross',   multiplier: 144, is_base_unit: false },
            ]
        },
        {
            name: 'Buku Tulis A5', cat: 'Alat Tulis', price: 7000,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Pak',     multiplier: 10, is_base_unit: false },
            ]
        },
        {
            name: 'Pensil 2B', cat: 'Alat Tulis', price: 2500,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
                { unit_name: 'Gross',   multiplier: 144, is_base_unit: false },
            ]
        },
        {
            name: 'Penghapus Putih', cat: 'Alat Tulis', price: 2000,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
            ]
        },
        {
            name: 'Penggaris 30cm', cat: 'Alat Tulis', price: 5000,
            units: [
                { unit_name: 'Pcs',     multiplier: 1,  is_base_unit: true  },
                { unit_name: 'Lusin',   multiplier: 12, is_base_unit: false },
            ]
        },
    ];

    for (const pData of productsList) {
        let product = await productRepo.findOneBy({ product_name: pData.name });

        if (!product) {
            product = await productRepo.save(productRepo.create({
                product_name: pData.name,
                categories: [categoryMap[pData.cat]],
            }));

            for (const u of pData.units) {
                await unitRepo.save(unitRepo.create({
                    product_id:     product.id,
                    unit_name:      u.unit_name,
                    multiplier:     u.multiplier,
                    is_base_unit:   u.is_base_unit,
                    purchase_price: pData.price * u.multiplier * 0.8, 
                    selling_price:  pData.price * u.multiplier,       
                }));
            }
        }

        for (const bId of branchIds) { 
            const stockExists = await stockRepo.findOneBy({
                branch_id:  bId,
                product_id: product.id,
            });

            if (!stockExists) {
                await stockRepo.save(stockRepo.create({
                    branch_id:  bId,
                    product_id: product.id,
                    quantity:   Math.floor(Math.random() * 50) + 10, 
                }));
            }
        }
    }

    console.log(`✔ ${productsList.length} products seeded across ${branchIds.length} branches.`);
};


const runStandalone = async () => {
    try {
        await AppDataSource.initialize();

        const branchRepo = AppDataSource.getRepository('Branch');

        const [branchA, branchB] = await Promise.all([
            branchRepo.findOneBy({ name: 'Branch A' }),
            branchRepo.findOneBy({ name: 'Branch B' }),
        ]);

        if (!branchA) throw new Error('Branch A tidak ditemukan.');
        if (!branchB) throw new Error('Branch B tidak ditemukan.');

        await seedProducts(AppDataSource, [branchA.id, branchB.id]); 

        console.log('Seeding Product Berhasil!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding Product Gagal:', error.message);
        process.exit(1);
    }
};

const isMain = fileURLToPath(import.meta.url) === process.argv[1];

if (isMain) {
    runStandalone();
}