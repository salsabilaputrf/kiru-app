//  BRANCHES 
export const branchesData = [
    { name: 'Branch A', location: 'Jakarta',   is_active: true },
    { name: 'Branch B', location: 'Bandung',   is_active: true },
    { name: 'Branch C', location: 'Tangerang', is_active: true },
];

//  ROLES 
export const rolesData = [
    { role_name: 'owner', rules: 'all_access'       },
    { role_name: 'admin', rules: 'limited_manage'   },
    { role_name: 'kasir', rules: 'transaction_only' },
];

//  USERS (10) 
export const usersData = [
    {
        name: 'Super Admin',
        username: 'owner12345',
        email: process.env.SUPER_ADMIN_EMAIL,
        password: process.env.SUPER_ADMIN_PASSWORD,
        status: 'active',
        roleName: 'owner',
        branchName: 'Branch A',
    },
    {
        name: 'Salsabila Putri Fathiyah',
        username: 'salsabila',
        email: 'salsabila@pos.id',
        password: 'Kasir@1234',
        status: 'active',
        roleName: 'kasir',
        branchName: 'Branch A',
    },
    {
        name: 'Arhjt Kurniawan',
        username: 'arhjt',
        email: 'arhjt@pos.id',
        password: 'Kasir@1234',
        status: 'active',
        roleName: 'kasir',
        branchName: 'Branch B',
    },
    {
        name: 'Budi Santoso',
        username: 'budi.santoso',
        email: 'budi@pos.id',
        password: 'Admin@1234',
        status: 'active',
        roleName: 'admin',
        branchName: 'Branch A',
    },
    {
        name: 'Dewi Rahayu',
        username: 'dewi.rahayu',
        email: 'dewi@pos.id',
        password: 'Kasir@1234',
        status: 'active',
        roleName: 'kasir',
        branchName: 'Branch A',
    },
    {
        name: 'Eko Prasetyo',
        username: 'eko.prasetyo',
        email: 'eko@pos.id',
        password: 'Kasir@1234',
        status: 'active',
        roleName: 'kasir',
        branchName: 'Branch B',
    },
    {
        name: 'Fitri Handayani',
        username: 'fitri.handayani',
        email: 'fitri@pos.id',
        password: 'Admin@1234',
        status: 'active',
        roleName: 'admin',
        branchName: 'Branch B',
    },
    {
        name: 'Galuh Permata',
        username: 'galuh.permata',
        email: 'galuh@pos.id',
        password: 'Kasir@1234',
        status: 'active',
        roleName: 'kasir',
        branchName: 'Branch C',
    },
    {
        name: 'Hendra Wijaya',
        username: 'hendra.wijaya',
        email: 'hendra@pos.id',
        password: 'Kasir@1234',
        status: 'inactive', 
        roleName: 'kasir',
        branchName: 'Branch C',
    },
    {
        name: 'Indah Lestari',
        username: 'indah.lestari',
        email: 'indah@pos.id',
        password: 'Admin@1234',
        status: 'active',
        roleName: 'admin',
        branchName: 'Branch C',
    },
];

//  CATEGORIES
export const categoriesData = [
    { name: 'Minuman'       },
    { name: 'Makanan Ringan'},
    { name: 'Alat Tulis'   },
    { name: 'Perlengkapan' },
    { name: 'Elektronik'   },
];

//  PRODUCTS (50) 

export const productsData = [

    //  MINUMAN (10) 
    {
        name: 'Kopi Susu Gula Aren', cat: 'Minuman', price: 15000,
        units: [
            { unit_name: 'Cup',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Teh Manis Dingin', cat: 'Minuman', price: 5000,
        units: [
            { unit_name: 'Cup',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Susu UHT Cokelat', cat: 'Minuman', price: 7000,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Karton', multiplier: 24, is_base_unit: false },
        ],
    },
    {
        name: 'Air Mineral 600ml', cat: 'Minuman', price: 3500,
        units: [
            { unit_name: 'Botol',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Dus',    multiplier: 24, is_base_unit: false },
        ],
    },
    {
        name: 'Jus Jeruk Segar', cat: 'Minuman', price: 12000,
        units: [
            { unit_name: 'Cup',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Es Kopi Americano', cat: 'Minuman', price: 18000,
        units: [
            { unit_name: 'Cup',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Minuman Soda Lemon', cat: 'Minuman', price: 10000,
        units: [
            { unit_name: 'Botol',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Dus',    multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Matcha Latte', cat: 'Minuman', price: 22000,
        units: [
            { unit_name: 'Cup',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Coklat Panas', cat: 'Minuman', price: 13000,
        units: [
            { unit_name: 'Cup',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Infused Water Rasa Buah', cat: 'Minuman', price: 8000,
        units: [
            { unit_name: 'Botol',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Dus',    multiplier: 12, is_base_unit: false },
        ],
    },

    // MAKANAN RINGAN (10) 
    {
        name: 'Keripik Singkong Pedas', cat: 'Makanan Ringan', price: 10000,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Dus',    multiplier: 20, is_base_unit: false },
        ],
    },
    {
        name: 'Biskuit Cokelat', cat: 'Makanan Ringan', price: 8500,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Karton', multiplier: 48, is_base_unit: false },
        ],
    },
    {
        name: 'Kacang Atom', cat: 'Makanan Ringan', price: 6000,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Roti Bakar Keju', cat: 'Makanan Ringan', price: 15000,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Permen Mint Box', cat: 'Makanan Ringan', price: 5000,
        units: [
            { unit_name: 'Box',    multiplier: 1,   is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12,  is_base_unit: false },
            { unit_name: 'Gross',  multiplier: 144, is_base_unit: false },
        ],
    },
    {
        name: 'Wafer Stik Vanilla', cat: 'Makanan Ringan', price: 7000,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Karton', multiplier: 24, is_base_unit: false },
        ],
    },
    {
        name: 'Chiki Spiral Keju', cat: 'Makanan Ringan', price: 5500,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Dus',    multiplier: 40, is_base_unit: false },
        ],
    },
    {
        name: 'Mie Goreng Instan', cat: 'Makanan Ringan', price: 3500,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Dus',    multiplier: 40, is_base_unit: false },
        ],
    },
    {
        name: 'Coklat Batang Susu', cat: 'Makanan Ringan', price: 12000,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',  multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Popcorn Karamel', cat: 'Makanan Ringan', price: 9000,
        units: [
            { unit_name: 'Pcs',    multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Karton', multiplier: 24, is_base_unit: false },
        ],
    },

    // ALAT TULIS (15)
    {
        name: 'Pulpen Gel Hitam', cat: 'Alat Tulis', price: 4500,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,   is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12,  is_base_unit: false },
            { unit_name: 'Gross', multiplier: 144, is_base_unit: false },
        ],
    },
    {
        name: 'Buku Tulis A5', cat: 'Alat Tulis', price: 7000,
        units: [
            { unit_name: 'Pcs', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Pak', multiplier: 10, is_base_unit: false },
        ],
    },
    {
        name: 'Pensil 2B', cat: 'Alat Tulis', price: 2500,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,   is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12,  is_base_unit: false },
            { unit_name: 'Gross', multiplier: 144, is_base_unit: false },
        ],
    },
    {
        name: 'Penghapus Putih', cat: 'Alat Tulis', price: 2000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Penggaris 30cm', cat: 'Alat Tulis', price: 5000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Spidol Boardmarker Hitam', cat: 'Alat Tulis', price: 8000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Correction Pen', cat: 'Alat Tulis', price: 7000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Stapler Kecil', cat: 'Alat Tulis', price: 20000,
        units: [
            { unit_name: 'Pcs',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Isi Stapler No.10', cat: 'Alat Tulis', price: 3500,
        units: [
            { unit_name: 'Box',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Klip Kertas Besar', cat: 'Alat Tulis', price: 8000,
        units: [
            { unit_name: 'Box',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Buku Tulis 58 Lembar', cat: 'Alat Tulis', price: 7000,
        units: [
            { unit_name: 'Pcs', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Pak', multiplier: 10, is_base_unit: false },
        ],
    },
    {
        name: 'Stabilo Boss Kuning', cat: 'Alat Tulis', price: 9000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Map Plastik Bening', cat: 'Alat Tulis', price: 4000,
        units: [
            { unit_name: 'Pcs', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Pak', multiplier: 10, is_base_unit: false },
        ],
    },
    {
        name: 'Kertas A4 70gr (1 Rim)', cat: 'Alat Tulis', price: 50000,
        units: [
            { unit_name: 'Rim',   multiplier: 1, is_base_unit: true  },
            { unit_name: 'Karton',multiplier: 5, is_base_unit: false },
        ],
    },
    {
        name: 'Amplop Putih', cat: 'Alat Tulis', price: 12000,
        units: [
            { unit_name: 'Pack', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',multiplier: 12, is_base_unit: false },
        ],
    },

    // PERLENGKAPAN (8)
    {
        name: 'Gunting Medium', cat: 'Perlengkapan', price: 14000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Cutter Besar', cat: 'Perlengkapan', price: 10000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Double Tape 1cm x 10m', cat: 'Perlengkapan', price: 7000,
        units: [
            { unit_name: 'Roll',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Selotip Bening 2cm x 50m', cat: 'Perlengkapan', price: 9500,
        units: [
            { unit_name: 'Roll',  multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Penjepit Binder A4', cat: 'Perlengkapan', price: 25000,
        units: [
            { unit_name: 'Pcs',   multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin', multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Ordner Tebal 7cm', cat: 'Perlengkapan', price: 35000,
        units: [
            { unit_name: 'Pcs', multiplier: 1, is_base_unit: true },
        ],
    },
    {
        name: 'Label Stiker A4', cat: 'Perlengkapan', price: 18000,
        units: [
            { unit_name: 'Pack', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',multiplier: 12, is_base_unit: false },
        ],
    },
    {
        name: 'Post-it 3x3 (1 Pack)', cat: 'Perlengkapan', price: 16000,
        units: [
            { unit_name: 'Pack', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Lusin',multiplier: 12, is_base_unit: false },
        ],
    },

    //  ELEKTRONIK (7) 
    {
        name: 'Mouse Pad Polos', cat: 'Elektronik', price: 18000,
        units: [
            { unit_name: 'Pcs', multiplier: 1, is_base_unit: true },
        ],
    },
    {
        name: 'Kabel USB A-to-B 1m', cat: 'Elektronik', price: 20000,
        units: [
            { unit_name: 'Pcs', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Pak', multiplier: 10, is_base_unit: false },
        ],
    },
    {
        name: 'USB Hub 4 Port', cat: 'Elektronik', price: 45000,
        units: [
            { unit_name: 'Pcs', multiplier: 1, is_base_unit: true },
        ],
    },
    {
        name: 'Mouse Wireless', cat: 'Elektronik', price: 130000,
        units: [
            { unit_name: 'Pcs', multiplier: 1, is_base_unit: true },
        ],
    },
    {
        name: 'Keyboard Wireless', cat: 'Elektronik', price: 185000,
        units: [
            { unit_name: 'Pcs', multiplier: 1, is_base_unit: true },
        ],
    },
    {
        name: 'Lampu LED 5W', cat: 'Elektronik', price: 20000,
        units: [
            { unit_name: 'Pcs', multiplier: 1,  is_base_unit: true  },
            { unit_name: 'Pak', multiplier: 10, is_base_unit: false },
        ],
    },
    {
        name: 'Stop Kontak 3 Lubang', cat: 'Elektronik', price: 30000,
        units: [
            { unit_name: 'Pcs', multiplier: 1, is_base_unit: true },
        ],
    },
];

//  TRANSACTIONS (50) 
export const transactionsData = [

    // Mei 2026 
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2026-05-08T03:31:00Z',
        items: [
            { productName: 'Mouse Wireless',    unitName: 'Pcs', quantity: 1 },
            { productName: 'Keyboard Wireless', unitName: 'Pcs', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-05-07T00:25:00Z',
        items: [
            { productName: 'Pensil 2B',      unitName: 'Pcs',  quantity: 2 },
            { productName: 'Penghapus Putih',unitName: 'Pcs',  quantity: 1 },
            { productName: 'Isi Stapler No.10',unitName:'Box', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-05-07T00:18:00Z',
        items: [
            { productName: 'Buku Tulis 58 Lembar', unitName: 'Pcs', quantity: 1 },
            { productName: 'Correction Pen',       unitName: 'Pcs', quantity: 1 },
            { productName: 'Spidol Boardmarker Hitam', unitName: 'Pcs', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-05-07T00:06:00Z',
        items: [
            { productName: 'Penggaris 30cm', unitName: 'Pcs', quantity: 1 },
            { productName: 'Pensil 2B',      unitName: 'Pcs', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-05-07T00:05:00Z',
        items: [
            { productName: 'Pulpen Gel Hitam', unitName: 'Pcs', quantity: 1 },
            { productName: 'Penghapus Putih',  unitName: 'Pcs', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2026-05-06T08:15:00Z',
        items: [
            { productName: 'Kertas A4 70gr (1 Rim)', unitName: 'Rim', quantity: 2 },
            { productName: 'Amplop Putih',           unitName: 'Pack', quantity: 3 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2026-05-06T09:30:00Z',
        items: [
            { productName: 'Keripik Singkong Pedas', unitName: 'Pcs', quantity: 5 },
            { productName: 'Biskuit Cokelat',        unitName: 'Pcs', quantity: 3 },
            { productName: 'Permen Mint Box',        unitName: 'Box', quantity: 4 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-05-05T11:00:00Z',
        items: [
            { productName: 'Kopi Susu Gula Aren',  unitName: 'Cup', quantity: 3 },
            { productName: 'Teh Manis Dingin',     unitName: 'Cup', quantity: 4 },
            { productName: 'Air Mineral 600ml',    unitName: 'Botol', quantity: 6 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2026-05-05T13:45:00Z',
        items: [
            { productName: 'Map Plastik Bening', unitName: 'Pcs', quantity: 5 },
            { productName: 'Post-it 3x3 (1 Pack)', unitName: 'Pack', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-05-04T10:20:00Z',
        items: [
            { productName: 'Mouse Pad Polos',  unitName: 'Pcs', quantity: 1 },
            { productName: 'Kabel USB A-to-B 1m', unitName: 'Pcs', quantity: 1 },
            { productName: 'USB Hub 4 Port',   unitName: 'Pcs', quantity: 1 },
        ],
    },

    // April 2026
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-04-30T14:00:00Z',
        items: [
            { productName: 'Air Mineral 600ml', unitName: 'Botol', quantity: 6 },
            { productName: 'Teh Manis Dingin',  unitName: 'Cup',   quantity: 3 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2026-04-29T09:10:00Z',
        items: [
            { productName: 'Buku Tulis 58 Lembar', unitName: 'Pcs',  quantity: 3 },
            { productName: 'Stapler Kecil',        unitName: 'Pcs',  quantity: 1 },
            { productName: 'Isi Stapler No.10',    unitName: 'Box',  quantity: 2 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2026-04-28T15:30:00Z',
        items: [
            { productName: 'Mie Goreng Instan',     unitName: 'Pcs', quantity: 5 },
            { productName: 'Keripik Singkong Pedas',unitName: 'Pcs', quantity: 3 },
            { productName: 'Popcorn Karamel',       unitName: 'Pcs', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-04-27T11:00:00Z',
        items: [
            { productName: 'Lampu LED 5W',       unitName: 'Pcs', quantity: 4 },
            { productName: 'Stop Kontak 3 Lubang',unitName: 'Pcs', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-04-26T16:45:00Z',
        items: [
            { productName: 'Spidol Boardmarker Hitam', unitName: 'Pcs', quantity: 3 },
            { productName: 'Stabilo Boss Kuning',      unitName: 'Pcs', quantity: 3 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2026-04-25T08:50:00Z',
        items: [
            { productName: 'Matcha Latte',     unitName: 'Cup', quantity: 4 },
            { productName: 'Es Kopi Americano',unitName: 'Cup', quantity: 3 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2026-04-24T10:15:00Z',
        items: [
            { productName: 'Kertas A4 70gr (1 Rim)', unitName: 'Rim', quantity: 3 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-04-23T14:30:00Z',
        items: [
            { productName: 'Penjepit Binder A4',unitName: 'Pcs',  quantity: 2 },
            { productName: 'Ordner Tebal 7cm',  unitName: 'Pcs',  quantity: 1 },
            { productName: 'Label Stiker A4',   unitName: 'Pack', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-04-22T09:00:00Z',
        items: [
            { productName: 'Amplop Putih',      unitName: 'Pack', quantity: 5 },
            { productName: 'Map Plastik Bening',unitName: 'Pcs',  quantity: 10 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2026-04-21T11:30:00Z',
        items: [
            { productName: 'Wafer Stik Vanilla', unitName: 'Pcs', quantity: 6 },
            { productName: 'Coklat Batang Susu', unitName: 'Pcs', quantity: 4 },
            { productName: 'Kacang Atom',        unitName: 'Pcs', quantity: 5 },
        ],
    },

    // Maret 2026
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-03-31T15:00:00Z',
        items: [
            { productName: 'Kertas A4 70gr (1 Rim)', unitName: 'Rim', quantity: 5 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2026-03-28T10:00:00Z',
        items: [
            { productName: 'Gunting Medium',     unitName: 'Pcs', quantity: 3 },
            { productName: 'Cutter Besar',       unitName: 'Pcs', quantity: 3 },
            { productName: 'Double Tape 1cm x 10m', unitName: 'Roll', quantity: 5 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-03-25T13:45:00Z',
        items: [
            { productName: 'Lampu LED 5W',        unitName: 'Pcs', quantity: 5 },
            { productName: 'Kabel USB A-to-B 1m', unitName: 'Pcs', quantity: 5 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2026-03-22T09:30:00Z',
        items: [
            { productName: 'Pensil 2B',        unitName: 'Lusin', quantity: 2 },
            { productName: 'Pulpen Gel Hitam', unitName: 'Lusin', quantity: 1 },
            { productName: 'Penggaris 30cm',   unitName: 'Pcs',   quantity: 5 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2026-03-20T16:00:00Z',
        items: [
            { productName: 'Chiki Spiral Keju',  unitName: 'Pcs', quantity: 8 },
            { productName: 'Biskuit Cokelat',    unitName: 'Pcs', quantity: 6 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-03-18T11:15:00Z',
        items: [
            { productName: 'Klip Kertas Besar',     unitName: 'Box', quantity: 4 },
            { productName: 'Selotip Bening 2cm x 50m', unitName: 'Roll', quantity: 4 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-03-15T14:20:00Z',
        items: [
            { productName: 'Mouse Wireless',    unitName: 'Pcs', quantity: 1 },
            { productName: 'Mouse Pad Polos',   unitName: 'Pcs', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2026-03-12T08:45:00Z',
        items: [
            { productName: 'Matcha Latte',     unitName: 'Cup', quantity: 3 },
            { productName: 'Coklat Panas',     unitName: 'Cup', quantity: 3 },
            { productName: 'Jus Jeruk Segar',  unitName: 'Cup', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2026-03-10T10:00:00Z',
        items: [
            { productName: 'Kertas A4 70gr (1 Rim)', unitName: 'Rim', quantity: 3 },
            { productName: 'Amplop Putih',           unitName: 'Pack', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-03-05T15:30:00Z',
        items: [
            { productName: 'Air Mineral 600ml',unitName: 'Botol', quantity: 12 },
            { productName: 'Kopi Susu Gula Aren', unitName: 'Cup', quantity: 4 },
        ],
    },

    // Februari 2026
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2026-02-28T09:00:00Z',
        items: [
            { productName: 'Keyboard Wireless', unitName: 'Pcs', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-02-25T11:30:00Z',
        items: [
            { productName: 'Stop Kontak 3 Lubang', unitName: 'Pcs', quantity: 3 },
            { productName: 'Lampu LED 5W',         unitName: 'Pcs', quantity: 5 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-02-22T14:00:00Z',
        items: [
            { productName: 'Stapler Kecil',    unitName: 'Pcs', quantity: 5 },
            { productName: 'Isi Stapler No.10',unitName: 'Box', quantity: 10 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2026-02-20T10:15:00Z',
        items: [
            { productName: 'Keripik Singkong Pedas', unitName: 'Pcs', quantity: 10 },
            { productName: 'Chiki Spiral Keju',      unitName: 'Pcs', quantity: 10 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2026-02-18T16:45:00Z',
        items: [
            { productName: 'Correction Pen',           unitName: 'Pcs', quantity: 5 },
            { productName: 'Spidol Boardmarker Hitam', unitName: 'Pcs', quantity: 4 },
            { productName: 'Stabilo Boss Kuning',      unitName: 'Pcs', quantity: 4 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-02-15T09:30:00Z',
        items: [
            { productName: 'Penjepit Binder A4',unitName: 'Pcs', quantity: 3 },
            { productName: 'Ordner Tebal 7cm',  unitName: 'Pcs', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-02-12T13:00:00Z',
        items: [
            { productName: 'Mouse Pad Polos', unitName: 'Pcs', quantity: 3 },
            { productName: 'USB Hub 4 Port',  unitName: 'Pcs', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2026-02-10T08:00:00Z',
        items: [
            { productName: 'Es Kopi Americano', unitName: 'Cup', quantity: 5 },
            { productName: 'Matcha Latte',      unitName: 'Cup', quantity: 4 },
            { productName: 'Susu UHT Cokelat',  unitName: 'Pcs', quantity: 6 },
        ],
    },

    // Januari 2026
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-01-31T15:00:00Z',
        items: [
            { productName: 'Kertas A4 70gr (1 Rim)', unitName: 'Rim',  quantity: 10 },
            { productName: 'Amplop Putih',           unitName: 'Lusin',quantity: 1  },
        ],
    },
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2026-01-28T11:00:00Z',
        items: [
            { productName: 'Mouse Wireless',     unitName: 'Pcs', quantity: 2 },
            { productName: 'Kabel USB A-to-B 1m',unitName: 'Pcs', quantity: 3 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-01-25T14:00:00Z',
        items: [
            { productName: 'Kopi Susu Gula Aren', unitName: 'Cup', quantity: 5 },
            { productName: 'Jus Jeruk Segar',     unitName: 'Cup', quantity: 5 },
            { productName: 'Matcha Latte',        unitName: 'Cup', quantity: 3 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2026-01-22T10:30:00Z',
        items: [
            { productName: 'Teh Manis Dingin',  unitName: 'Cup',   quantity: 12 },
            { productName: 'Air Mineral 600ml', unitName: 'Botol', quantity: 12 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2026-01-20T09:15:00Z',
        items: [
            { productName: 'Wafer Stik Vanilla', unitName: 'Pcs', quantity: 8 },
            { productName: 'Popcorn Karamel',    unitName: 'Pcs', quantity: 6 },
            { productName: 'Coklat Batang Susu', unitName: 'Pcs', quantity: 5 },
        ],
    },
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2026-01-18T16:00:00Z',
        items: [
            { productName: 'Map Plastik Bening', unitName: 'Pcs',  quantity: 20 },
            { productName: 'Amplop Putih',       unitName: 'Pack', quantity: 10 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2026-01-15T11:30:00Z',
        items: [
            { productName: 'Lampu LED 5W',        unitName: 'Pcs', quantity: 3 },
            { productName: 'Stop Kontak 3 Lubang',unitName: 'Pcs', quantity: 2 },
        ],
    },

    // Desember 2025
    {
        branchName: 'Branch A', userName: 'salsabila',
        transaction_date: '2025-12-31T17:00:00Z',
        items: [
            { productName: 'Buku Tulis 58 Lembar', unitName: 'Pak', quantity: 3 },
            { productName: 'Stapler Kecil',        unitName: 'Pcs', quantity: 5 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'arhjt',
        transaction_date: '2025-12-28T10:00:00Z',
        items: [
            { productName: 'Keyboard Wireless', unitName: 'Pcs', quantity: 3 },
            { productName: 'Mouse Wireless',    unitName: 'Pcs', quantity: 2 },
        ],
    },
    {
        branchName: 'Branch C', userName: 'galuh.permata',
        transaction_date: '2025-12-20T14:30:00Z',
        items: [
            { productName: 'Selotip Bening 2cm x 50m', unitName: 'Roll', quantity: 10 },
            { productName: 'Double Tape 1cm x 10m',    unitName: 'Roll', quantity: 10 },
            { productName: 'Klip Kertas Besar',        unitName: 'Box',  quantity: 5  },
        ],
    },
    {
        branchName: 'Branch A', userName: 'dewi.rahayu',
        transaction_date: '2025-12-15T09:00:00Z',
        items: [
            { productName: 'Pulpen Gel Hitam', unitName: 'Lusin', quantity: 2 },
            { productName: 'Pensil 2B',        unitName: 'Lusin', quantity: 2 },
            { productName: 'Penghapus Putih',  unitName: 'Lusin', quantity: 1 },
        ],
    },
    {
        branchName: 'Branch B', userName: 'eko.prasetyo',
        transaction_date: '2025-12-10T15:45:00Z',
        items: [
            { productName: 'Mie Goreng Instan',     unitName: 'Pcs', quantity: 10 },
            { productName: 'Keripik Singkong Pedas',unitName: 'Pcs', quantity: 10 },
            { productName: 'Biskuit Cokelat',       unitName: 'Pcs', quantity: 10 },
        ],
    },
];