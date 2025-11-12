import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full px-6 py-4 bg-[#F7F7F7] dark:bg-[#1A1A1A] border-b border-gray-200 dark:border-gray-800 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-[#D4AF37] hover:text-[#B8942D] transition">
        Padaria Trigo de Ouro
      </Link>

      <div className="flex gap-6 items-center">
        <Link 
          to="/" 
          className="text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          Home
        </Link>
        <Link 
          to="/login" 
          className="text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          Login
        </Link>
        <Link 
          to="/produtos" 
          className="text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          Produtos
        </Link>
        <Link 
          to="/carrinho" 
          className="text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          🛒 Carrinho
        </Link>
        <Link 
          to="/historico" 
          className="text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          📊 Histórico
        </Link>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#B8942D] text-white font-semibold transition cursor-pointer"
          title={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
