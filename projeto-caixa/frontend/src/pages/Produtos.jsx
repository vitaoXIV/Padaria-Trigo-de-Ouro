import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase.js";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    buscarProdutos();

    // Recarregar quando a página fica visível (após voltar do carrinho)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("📱 Página ficou visível, recarregando produtos...");
        buscarProdutos();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Configurar real-time subscription para mudanças na tabela de produtos
    console.log("🔄 Configurando real-time subscription...");
    const subscription = supabase
      .channel("produtos-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "produtos"
        },
        (payload) => {
          console.log("🔔 Mudança detectada nos produtos:", payload);
          buscarProdutos();
        }
      )
      .subscribe((status) => {
        console.log("📡 Status da subscription:", status);
      });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      subscription.unsubscribe();
    };
  }, [location]);

  async function buscarProdutos() {
    try {
      setLoading(true);
      console.log("📥 Buscando produtos...");
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .order("produto_id");
      
      if (error) {
        console.error("❌ Erro ao buscar produtos:", error);
      } else {
        console.log("✅ Produtos carregados:", data?.length || 0);
        if (data && data.length > 0) {
          data.forEach(p => {
            console.log(`   📦 ${p.nome} - Estoque: ${p.estoque}`);
          });
        }
        setProdutos(data);
      }
    } catch (err) {
      console.error("❌ Erro geral ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  }

  function adicionarAoCarrinho(produto) {
    console.log("🛒 Adicionando ao carrinho:", produto.nome);
    
    // Verificar se há estoque
    if (produto.estoque <= 0) {
      alert("❌ Erro, sem produtos disponíveis no estoque");
      return;
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Verificar se o produto já está no carrinho
    const produtoExistente = carrinho.find(item => item.produto_id === produto.produto_id);
    
    if (produtoExistente) {
      // Se existe, aumenta a quantidade (máximo = estoque disponível)
      if (produtoExistente.quantidade < produto.estoque) {
        produtoExistente.quantidade += 1;
        console.log(`✏️ Quantidade aumentada para ${produtoExistente.quantidade}`);
      } else {
        alert(`⚠️ Estoque máximo atingido (${produto.estoque} unidades)`);
        return;
      }
    } else {
      // Se não existe, adiciona ao carrinho
      carrinho.push({
        ...produto,
        quantidade: 1
      });
      console.log(`✅ Produto adicionado ao carrinho`);
    }
    
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${produto.nome} adicionado ao carrinho! ✅`);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] text-gray-800 dark:text-gray-200 transition-colors duration-500">
      {/* Cabeçalho */}
      <header className="p-6 shadow-md bg-[#F7F7F7] dark:bg-[#1A1A1A] flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#D4AF37]">Padaria Trigo de Ouro</h1>
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className="bg-[#D4AF37] hover:bg-[#B8942D] text-white px-4 py-2 rounded-lg transition-all"
        >
          Alternar Tema
        </button>
      </header>

      {/* Conteúdo */}
      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Nossos Produtos
        </h2>

        {loading ? (
          <div className="text-center text-[#D4AF37] animate-pulse">
            Carregando produtos...
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {produtos.map((produto) => (
                <motion.div
                  key={produto.produto_id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all ${
                    produto.estoque > 0
                      ? "bg-[#F7F7F7] dark:bg-[#1E1E1E]"
                      : "bg-red-100 dark:bg-red-900/30 opacity-75"
                  }`}
                >
                  <div>
                    <h3 className="text-xl font-bold text-[#D4AF37] mb-2">
                      {produto.nome}
                    </h3>
                    <div className="mb-4">
                      {produto.estoque > 0 ? (
                        <p className="text-green-600 dark:text-green-400 font-semibold">
                          ✅ Em estoque: {produto.estoque}
                        </p>
                      ) : (
                        <p className="text-red-600 dark:text-red-400 font-bold">
                          ❌ Sem estoque
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-auto">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      R$ {parseFloat(produto.preco).toFixed(2)}
                    </p>
                    <button 
                      onClick={() => adicionarAoCarrinho(produto)}
                      disabled={produto.estoque <= 0}
                      className={`mt-4 w-full py-2 rounded-lg transition-all font-semibold ${
                        produto.estoque > 0
                          ? "bg-[#D4AF37] hover:bg-[#B8942D] text-white cursor-pointer"
                          : "bg-gray-400 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {produto.estoque > 0 ? "Adicionar" : "Sem estoque"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
