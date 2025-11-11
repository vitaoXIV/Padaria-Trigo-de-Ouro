import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="font-bold text-xl">🍞 Padaria Manager</h1>
        <div className="flex gap-4">
          <Link to="/" className="hover:text-blue-600">Produtos</Link>
          <Link to="/carrinho" className="hover:text-blue-600">Carrinho</Link>
          <Link to="/historico" className="hover:text-blue-600">Histórico</Link>
          <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        </div>
      </nav>

      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
