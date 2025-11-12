import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import Historico from "./pages/Historico";
import DebugSales from "./pages/DebugSales";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-500">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/debug-sales" element={<DebugSales />} />
      </Routes>
    </div>
  );
}
