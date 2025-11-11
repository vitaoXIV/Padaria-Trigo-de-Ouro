import { useState, useEffect } from "react";
import { finalizarVenda } from "../services/salesService";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    setCarrinho(JSON.parse(localStorage.getItem("carrinho")) || []);
  }, []);

  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  async function handleFinalizar() {
    await finalizarVenda(carrinho);
    alert("Venda finalizada ✅");
    localStorage.removeItem("carrinho");
    setCarrinho([]);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>

      {carrinho.length === 0 && <p>Seu carrinho está vazio.</p>}

      {carrinho.map(item => (
        <div key={item.produto_id} className="border p-3 rounded mb-2 flex justify-between">
          <span>{item.nome} x {item.quantidade}</span>
          <span>R$ {(item.preco * item.quantidade).toFixed(2)}</span>
        </div>
      ))}

      {carrinho.length > 0 && (
        <>
          <p className="text-xl font-bold mt-4">Total: R$ {total.toFixed(2)}</p>
          <button
            onClick={handleFinalizar}
            className="mt-4 w-full py-2 bg-green-600 text-white rounded"
          >
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
}
