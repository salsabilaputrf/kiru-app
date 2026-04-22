import { Link } from "react-router-dom"; // Import Link
import AuthLayout from "../layouts/AuthLayout";
import { InputField } from "../components/InputField";
import { Button } from "../components/Button";
import logoKiru from "../assets/logo-kiru.png"; // Import asset lebih aman

const Login = () => {
  return (
    <AuthLayout>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          {/* Menggunakan Link untuk navigasi ke home/root */}
          <Link to="/">
            <img src={logoKiru} alt="Logo Kiru" className="w-8 h-auto rounded-xl" />
          </Link>
          <h1 className="text-2xl font-bold text-kiru-text-main">Kiru App</h1>
        </div>
        
        {/* Status Koneksi dengan variabel tema */}
        <div className="bg-kiru-secondary text-kiru-online px-3 py-1 rounded-md flex items-center gap-2 text-sm font-semibold">
          Koneksi : <span className="flex items-center gap-1">● Online</span>
        </div>
      </div>

      {/* Form Section */}
      <div className="border border-gray-100 rounded-kiru p-6">
        <InputField 
          label="Username" 
          type="text" 
          placeholder="Masukkan Username" 
        />
        <InputField 
          label="Password" 
          type="password" 
          placeholder="Masukkan Password" 
        />
        <div className="mt-6">
          <Button>Login</Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;