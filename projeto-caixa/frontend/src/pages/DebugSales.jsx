import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

export default function DebugSales() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    async function debug() {
      try {
        // Teste 1: Buscar vendas
        console.log("\n=== TESTE 1: Buscando vendas ===");
        const { data: vendas, error: err1 } = await supabase
          .from("vendas")
          .select("*")
          .order("data", { ascending: false });
        console.log("Vendas:", vendas);
        console.log("Erro:", err1);

        // Teste 2: Buscar vendas_itens com produtos
        console.log("\n=== TESTE 2: Buscando vendas_itens com produtos ===");
        const { data: itens, error: err2 } = await supabase
          .from("vendas_itens")
          .select("*, produtos(produto_id, nome)");
        console.log("Itens com produtos:", itens);
        console.log("Erro:", err2);

        // Teste 3: Join manual
        console.log("\n=== TESTE 3: Fazendo join manual ===");
        let vendascompletas = [];
        if (vendas && itens) {
          vendascompletas = vendas.map(venda => ({
            ...venda,
            vendas_itens: itens.filter(item => item.venda_id === venda.venda_id)
          }));
        }
        console.log("Vendas com itens (join manual):", vendascompletas);

        setData({
          vendas,
          itens,
          vendascompletas,
          erros: { err1, err2 }
        });
      } catch (e) {
        console.error("Erro geral:", e);
        setError(e.message);
      }
    }

    debug();
  }, []);

  return (
    <div className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Debug - Vendas</h1>
      
      {error && <div className="bg-red-600 p-4 mb-6">Erro: {error}</div>}

      <div className="mb-6">
        <p className="text-gray-300 mb-2">
          <strong>Vendas:</strong> {data.vendas?.length || 0}
        </p>
        <p className="text-gray-300 mb-2">
          <strong>Itens:</strong> {data.itens?.length || 0}
        </p>
        <p className="text-gray-300">
          <strong>Vendas com Itens:</strong> {data.vendascompletas?.length || 0}
        </p>
      </div>

      <pre className="bg-gray-800 p-4 rounded overflow-auto max-h-screen">
        {JSON.stringify(data, null, 2)}
      </pre>

      <p className="mt-6 text-gray-400">
        Abra o console do navegador (F12) para ver logs detalhados
      </p>
    </div>
  );
}
