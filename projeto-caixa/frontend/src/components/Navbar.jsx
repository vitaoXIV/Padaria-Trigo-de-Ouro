import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { FaHome, FaBox, FaShoppingCart, FaHistory, FaMoon, FaSun } from "react-icons/fa";

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
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          <FaHome size={20} /> Home
        </Link>
        <Link 
          to="/produtos" 
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          <FaBox size={20} /> Produtos
        </Link>
        <Link 
          to="/carrinho" 
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          <FaShoppingCart size={20} /> Carrinho
        </Link>
        <Link 
          to="/historico" 
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition"
        >
          <FaHistory size={20} /> Histórico
        </Link>

        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#B8942D] text-white font-semibold transition cursor-pointer flex items-center gap-2"
          title={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
        >
          {theme === "light" ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
    </nav>
  );
}
