import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#111111] dark:to-[#0a0a0a] text-gray-800 dark:text-gray-200 transition-colors duration-500">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-[#1A1A1A] dark:to-[#1A1A1A]">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8942D]">
          Padaria Trigo de Ouro 🍞
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
          Faça pedidos, veja histórico de vendas e controle seu caixa com praticidade.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <Link
            to="/produtos"
            className="px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8942D] hover:from-[#B8942D] hover:to-[#9d7a24] text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Ver Produtos
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white dark:bg-[#2A2A2A] border-2 border-[#D4AF37] hover:bg-gray-100 dark:hover:bg-[#3A3A3A] text-[#D4AF37] dark:text-[#D4AF37] font-semibold rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Fazer Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-[#D4AF37]">
          Recursos Principais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#D4AF37]">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-[#D4AF37]">
              Faça Pedidos
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Crie e gerencie seus pedidos de forma rápida e eficiente.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#D4AF37]">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-[#D4AF37]">
              Histórico de Vendas
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Acompanhe todo o histórico de vendas em um só lugar.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#D4AF37]">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-[#D4AF37]">
              Controle de Caixa
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie seu caixa com praticidade e segurança.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-[#1A1A1A] dark:to-[#0a0a0a] text-gray-900 dark:text-white py-12 px-6 text-center border-t-4 border-[#D4AF37]">
        <h2 className="text-2xl font-bold mb-4 text-[#D4AF37]">Pronto para começar?</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Acesse seus produtos e comece a gerenciar seu caixa hoje mesmo!</p>
        <Link
          to="/produtos"
          className="inline-block px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8942D] hover:from-[#B8942D] hover:to-[#9d7a24] text-white font-semibold rounded-lg transition duration-300 shadow-lg transform hover:scale-105"
        >
          Ir para Produtos
        </Link>
      </div>
    </div>
  );
}
