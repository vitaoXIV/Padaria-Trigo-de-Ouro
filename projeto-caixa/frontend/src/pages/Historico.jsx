import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function Historico() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroData, setFiltroData] = useState("todos");

  useEffect(() => {
    buscarVendas();
  }, []);

  async function buscarVendas() {
    setLoading(true);
    try {
      console.log("Buscando vendas...");
      
      // Buscar todas as vendas
      const { data: vendas, error: errorVendas } = await supabase
        .from("vendas")
        .select("*")
        .order("data", { ascending: false });

      if (errorVendas) throw errorVendas;

      console.log("Todas as vendas:", vendas);

      // Buscar todos os itens de venda com produtos
      const { data: itens, error: errorItens } = await supabase
        .from("vendas_itens")
        .select("*, produtos(produto_id, nome)");

      if (errorItens) throw errorItens;

      console.log("Todos os itens com produtos:", itens);

      // Fazer o join manualmente no React
      const vendasComItens = vendas.map(venda => ({
        ...venda,
        vendas_itens: itens.filter(item => item.venda_id === venda.venda_id)
      }));

      console.log("Vendas com itens (join manual):", vendasComItens);
      setVendas(vendasComItens);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      alert("❌ Erro ao carregar histórico: " + error.message);
    }
    setLoading(false);
  }

  function filtrarVendas() {
    if (filtroData === "todos") return vendas;
    
    console.log("Filtrando por data:", filtroData);
    console.log("Total de vendas:", vendas.length);
    
    const resultado = vendas.filter(venda => {
      // Pegar a data da venda (que está em ISO 8601 UTC como "2025-11-12T13:08:05.146")
      const dataVenda = new Date(venda.data);
      
      // Extrair apenas a data (YYYY-MM-DD) sem a hora
      const dataVendaString = dataVenda.toISOString().split("T")[0];
      
      // Comparar strings: filtroData é "2025-11-12" e dataVendaString é "2025-11-12"
      const match = dataVendaString === filtroData;
      
      console.log("Venda #" + venda.venda_id, "Data original:", venda.data, "Data convertida:", dataVendaString, "Filtro:", filtroData, "Match:", match);
      
      return match;
    });
    
    console.log("Vendas filtradas:", resultado.length);
    return resultado;
  }

  function formatarData(data) {
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
  }

  function formatarHora(data) {
    const d = new Date(data);
    return d.toLocaleTimeString("pt-BR");
  }

  const vendasFiltradas = filtrarVendas();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#111111] dark:to-[#0a0a0a] text-gray-800 dark:text-gray-200 transition-colors duration-500 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#B8942D]">
            📊 Histórico de Vendas
          </h1>
          <button
            onClick={() => buscarVendas()}
            className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8942D] text-white font-semibold rounded-lg transition"
          >
            🔄 Recarregar
          </button>
        </div>

        {/* Filtro de data */}
        <div className="mb-8 bg-white dark:bg-[#1E1E1E] p-4 rounded-lg shadow-md border-l-4 border-[#D4AF37]">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Filtrar por data:
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              value={filtroData === "todos" ? "" : filtroData}
              onChange={(e) => setFiltroData(e.target.value || "todos")}
              className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-white"
            />
            <button
              onClick={() => setFiltroData("todos")}
              className="px-6 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 rounded-lg font-semibold transition"
            >
              Limpar Filtro
            </button>
          </div>
        </div>

        {/* Lista de vendas */}
        {loading ? (
          <div className="text-center text-[#D4AF37] animate-pulse">
            Carregando histórico de vendas...
          </div>
        ) : vendasFiltradas.length === 0 ? (
          <div className="bg-white dark:bg-[#1E1E1E] p-8 rounded-lg text-center border-2 border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              Nenhuma venda encontrada para o período selecionado.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {vendasFiltradas.map((venda) => (
              <div
                key={venda.venda_id}
                className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-[#D4AF37]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      Venda #{venda.venda_id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatarData(venda.data)} às {formatarHora(venda.data)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#D4AF37]">
                      R$ {parseFloat(venda.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Itens da venda */}
                <div className="bg-gray-50 dark:bg-[#2A2A2A] p-4 rounded-lg">
                  <p className="font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Itens ({venda.vendas_itens?.length || 0}):
                  </p>
                  <ul className="space-y-2">
                    {venda.vendas_itens?.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span>
                          {item.quantidade}x - {item.produtos?.nome || "Produto desconhecido"} (R$ {parseFloat(item.preco_unitario).toFixed(2)})
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

