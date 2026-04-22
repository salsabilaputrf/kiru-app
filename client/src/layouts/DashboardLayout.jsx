import { motion } from 'framer-motion';

export default function DashboardLayout({ children, title }) {
  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-100 p-8 flex flex-col">
        <h1 className="text-2xl font-black text-[#6D5DD3] mb-12 tracking-tighter">KIRU.</h1>
        <nav className="flex-1 space-y-3 font-semibold">
          <div className="text-[#6D5DD3] bg-purple-50 px-5 py-4 rounded-2xl">Dashboard</div>
          <div className="text-gray-400 px-5 py-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all">Transaksi</div>
          <div className="text-gray-400 px-5 py-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all">Stok Barang</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="h-24 bg-white border-b border-gray-50 flex items-center justify-between px-12">
          <h2 className="font-bold text-gray-800 text-xl tracking-tight uppercase">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 leading-none">Admin Salsabila</p>
              <span className="text-[10px] text-green-500 font-bold">Online</span>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-[#6D5DD3] font-bold text-lg border-2 border-white shadow-sm">
              S
            </div>
          </div>
        </header>

        <motion.main 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 p-12 overflow-y-auto"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}