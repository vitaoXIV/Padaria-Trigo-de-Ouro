import Produtos from "./pages/Produtos";

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/produtos" element={<Produtos />} /> {/* Nova rota */}
</Routes>



import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
