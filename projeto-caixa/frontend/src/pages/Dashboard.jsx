import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Dashboard() {
  const [totalHoje, setTotalHoje] = useState(0);
  const [vendasHoje, setVendasHoje] = useState([]);

  useEffect(() => {
    async function load() {
      const hoje = new Date().toISOString().split("T")[0];

      const { data } = await supabase
        .from("vendas")
        .select("*")
        .gte("data", hoje);

      setVendasHoje(data);
      setTotalHoje(data.reduce((sum, v) => sum + v.total, 0));
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard 📈</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-sm text-gray-600">Faturamento Hoje</h2>
          <p className="text-2xl font-bold">R$ {totalHoje.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-sm text-gray-600">Vendas Hoje</h2>
          <p className="text-2xl font-bold">{vendasHoje.length}</p>
        </div>
      </div>
    </div>
  );
}
