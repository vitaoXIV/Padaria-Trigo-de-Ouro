import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Historico() {
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    async function load() {
      const { data: v } = await supabase
        .from("vendas")
        .select(`
          venda_id,
          data,
          total,
          vendas_itens (
            quantidade,
            preco_unitario,
            produtos ( nome )
          )
        `)
        .order("data", { ascending: false });

      setVendas(v);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Histórico de Vendas</h1>

      {vendas.map(venda => (
        <div key={venda.venda_id} className="bg-white p-4 rounded shadow mb-4">
          <p><strong>ID:</strong> {venda.venda_id}</p>
          <p><strong>Data:</strong> {new Date(venda.data).toLocaleString()}</p>
          <p><strong>Total:</strong> R$ {venda.total}</p>

          <ul className="mt-2 border-t pt-2">
            {venda.vendas_itens.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.produtos.nome} x {item.quantidade}</span>
                <span>R$ {(item.preco_unitario * item.quantidade).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

