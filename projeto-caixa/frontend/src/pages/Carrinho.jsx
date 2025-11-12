import { useState, useEffect } from "react";
import { finalizarVenda } from "../services/salesService";
import { Link, useNavigate } from "react-router-dom";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCarrinho(JSON.parse(localStorage.getItem("carrinho")) || []);
  }, []);

  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  function removerDoCarrinho(produtoId) {
    const novoCarrinho = carrinho.filter(item => item.produto_id !== produtoId);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  function aumentarQuantidade(produtoId) {
    const novoCarrinho = carrinho.map(item => {
      if (item.produto_id === produtoId) {
        // Validar se há estoque disponível
        if (item.quantidade >= item.estoque) {
          alert(`⚠️ Estoque máximo atingido (${item.estoque} unidades)`);
          return item;
        }
        return { ...item, quantidade: item.quantidade + 1 };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  function diminuirQuantidade(produtoId) {
    const novoCarrinho = carrinho.map(item =>
      item.produto_id === produtoId && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  async function handleFinalizar() {
    if (carrinho.length === 0) {
      alert("❌ Carrinho vazio!");
      return;
    }

    console.log("Carrinho antes de finalizar:", carrinho);

    setLoading(true);
    try {
      const venda = await finalizarVenda(carrinho);
      alert(`✅ Venda #${venda.venda_id} finalizada com sucesso!\nTotal: R$ ${venda.total.toFixed(2)}`);
      localStorage.removeItem("carrinho");
      setCarrinho([]);
      
      // Aguarda 1 segundo e depois navega para produtos
      setTimeout(() => {
        navigate("/produtos");
      }, 1000);
    } catch (error) {
      console.error("Erro ao finalizar venda:", error);
      alert(`❌ Erro ao finalizar venda:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#111111] dark:to-[#0a0a0a] text-gray-800 dark:text-gray-200 transition-colors duration-500">
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8942D]">🛒 Carrinho</h1>

        {carrinho.length === 0 ? (
          <div className="bg-white dark:bg-[#1E1E1E] p-8 rounded-lg text-center border-2 border-gray-200 dark:border-gray-700">
            <p className="text-lg mb-4">Seu carrinho está vazio.</p>
            <Link
              to="/produtos"
              className="inline-block px-6 py-2 bg-[#D4AF37] hover:bg-[#B8942D] text-white font-semibold rounded-lg transition"
            >
              Voltar aos Produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {carrinho.map(item => (
                <div
                  key={item.produto_id}
                  className="bg-white dark:bg-[#1E1E1E] p-4 rounded-lg flex justify-between items-center shadow-md hover:shadow-lg transition border-l-4 border-[#D4AF37]"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#D4AF37]">{item.nome}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      R$ {parseFloat(item.preco).toFixed(2)} cada
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Estoque total: {item.estoque}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-white dark:bg-[#2A2A2A] p-2 rounded">
                      <button
                        onClick={() => diminuirQuantidade(item.produto_id)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantidade}</span>
                      <button
                        onClick={() => aumentarQuantidade(item.produto_id)}
                        disabled={item.quantidade >= item.estoque}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </p>
                    </div>

                    <button
                      onClick={() => removerDoCarrinho(item.produto_id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-semibold"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-md border-t-4 border-[#D4AF37]">
              <div className="flex justify-between items-center mb-6">
                <p className="text-2xl font-bold text-[#D4AF37]">Total:</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-[#D4AF37]">
                  R$ {total.toFixed(2)}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleFinalizar}
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8942D] hover:from-[#B8942D] hover:to-[#9d7a24] text-white font-bold rounded-lg transition transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processando..." : "Finalizar Compra"}
                </button>
                <Link
                  to="/produtos"
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-lg transition text-center"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
