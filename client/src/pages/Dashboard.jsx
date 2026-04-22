import DashboardLayout from '../layouts/DashboardLayout';

export default function DashboardPage() {
  return (
    <DashboardLayout title="Overview">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Penjualan Hari Ini</p>
          <h3 className="text-3xl font-black text-gray-800">Rp 2.450.000</h3>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Barang Terjual</p>
          <h3 className="text-3xl font-black text-[#6D5DD3]">142 Pcs</h3>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-sm font-bold text-gray-400 mb-2 uppercase tracking-widest">Stok Menipis</p>
          <h3 className="text-3xl font-black text-red-500">5 Produk</h3>
        </div>
      </div>
    </DashboardLayout>
  );
}