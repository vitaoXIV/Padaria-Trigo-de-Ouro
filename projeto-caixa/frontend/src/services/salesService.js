import { supabase } from "../supabaseClient";

export async function finalizarVenda(carrinho) {
  // carrinho = [{ produto_id, nome, preco, quantidade }]

  const total = carrinho.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  // 1. Registrar a venda
  const { data: venda, error: vendaError } = await supabase
    .from("vendas")
    .insert([
      {
        data: new Date(),
        total: total
      }
    ])
    .select()
    .single();

  if (vendaError) throw vendaError;

  // 2. Registrar itens
  const itensParaInserir = carrinho.map(item => ({
    venda_id: venda.venda_id,
    produto_id: item.produto_id,
    quantidade: item.quantidade,
    preco_unitario: item.preco
  }));

  const { error: itensError } = await supabase
    .from("vendas_itens")
    .insert(itensParaInserir);

  if (itensError) throw itensError;

  // 3. Atualizar estoque
  for (const item of carrinho) {
    await supabase
      .from("produtos")
      .update({ estoque: item.estoque - item.quantidade })
      .eq("produto_id", item.produto_id);
  }

  return venda;
}
