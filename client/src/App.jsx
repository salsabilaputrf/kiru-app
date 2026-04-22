import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router> {/* <-- Ini pembungkus wajibnya */}
      <main className="antialiased text-slate-900">
        <Routes>
          {/* Definisikan rute halaman login kamu di sini */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
          {/* Contoh rute lain jika nanti ada */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </main>
    </Router>
  );
}

export default App;