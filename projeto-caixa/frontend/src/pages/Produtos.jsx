import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase.from("produtos").select("*");

      if (error) {
        console.error("Erro ao buscar produtos:", error);
      } else {
        setProdutos(data);
      }
    }

    carregarProdutos();
  }, []);

  function adicionarAoCarrinho(item) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${item.nome} foi adicionado ao carrinho ✅`);
  }

  return (
    <div className="p-8 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Produtos 🍞</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg shadow-md flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              Preço: <strong>R$ {produto.preco}</strong>
            </p>

            <button
              onClick={() => adicionarAoCarrinho(produto)}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
            >
              Adicionar ao Carrinho 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
