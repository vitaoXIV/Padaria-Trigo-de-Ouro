import { supabase } from "../lib/supabase";

export async function finalizarVenda(carrinho) {
  // carrinho = [{ produto_id, nome, preco, quantidade, estoque }]

  if (!carrinho || carrinho.length === 0) {
    throw new Error("Carrinho vazio");
  }

  console.log("Carrinho recebido:", carrinho);

  // Validar e normalizar que todos os itens têm o ID do produto
  const carrinhoNormalizado = carrinho.map(item => {
    const id = item.produto_id || item.id || item.produtos_id;
    if (!id) {
      console.error("Item inválido, sem ID:", item);
      throw new Error(`Item inválido no carrinho: ${item.nome || "desconhecido"}`);
    }
    return {
      ...item,
      produto_id: id
    };
  });

  console.log("Carrinho normalizado:", carrinhoNormalizado);

  // 1. Validar estoque disponível antes de processar
  for (const item of carrinhoNormalizado) {
    const { data: produto, error } = await supabase
      .from("produtos")
      .select("estoque")
      .eq("produto_id", item.produto_id)
      .single();

    if (error || !produto) {
      console.error(`Erro ao buscar produto ${item.produto_id}:`, error);
      throw new Error(`Produto ${item.nome} não encontrado`);
    }

    if (produto.estoque < item.quantidade) {
      throw new Error(
        `Estoque insuficiente para ${item.nome}. Disponível: ${produto.estoque}, Solicitado: ${item.quantidade}`
      );
    }
  }

  const total = carrinhoNormalizado.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  // 2. Registrar a venda
  const agora = new Date().toISOString();
  console.log("Data da venda:", agora);

  const { data: venda, error: vendaError } = await supabase
    .from("vendas")
    .insert([
      {
        data: agora,
        total: total
      }
    ])
    .select()
    .single();

  if (vendaError) {
    console.error("Erro ao criar venda:", vendaError);
    throw vendaError;
  }

  console.log("Venda criada:", venda);

  // 3. Registrar itens
  const itensParaInserir = carrinhoNormalizado.map(item => ({
    venda_id: venda.venda_id,
    produto_id: item.produto_id,
    quantidade: item.quantidade,
    preco_unitario: item.preco
  }));

  console.log("Itens a inserir:", itensParaInserir);

  const { error: itensError } = await supabase
    .from("vendas_itens")
    .insert(itensParaInserir);

  if (itensError) {
    console.error("Erro ao inserir itens:", itensError);
    throw itensError;
  }

  // 4. Atualizar estoque (decrementar pela quantidade vendida)
  const errosEstoque = [];
  
  for (const item of carrinhoNormalizado) {
    // Buscar o estoque atual do banco (pode ter mudado)
    const { data: produtoAtual, error: fetchError } = await supabase
      .from("produtos")
      .select("estoque")
      .eq("produto_id", item.produto_id)
      .single();

    if (fetchError || !produtoAtual) {
      const erro = `Erro ao buscar estoque atual de ${item.nome}: ${fetchError?.message || "Produto não encontrado"}`;
      console.error(erro);
      errosEstoque.push(erro);
      continue;
    }

    console.log(`Produto ${item.nome} - Estoque no banco: ${produtoAtual.estoque}`);

    // Calcular novo estoque baseado no valor atual do banco
    const novoEstoque = Math.max(0, produtoAtual.estoque - item.quantidade);

    console.log(`🔄 Atualizando estoque de ${item.nome}: ${produtoAtual.estoque} → ${novoEstoque}`);

    const { data: updateData, error: updateError } = await supabase
      .from("produtos")
      .update({ estoque: novoEstoque })
      .eq("produto_id", item.produto_id)
      .select("produto_id, estoque");

    if (updateError) {
      const erro = `Erro ao atualizar estoque de ${item.nome}: ${updateError.message}`;
      console.error(erro);
      errosEstoque.push(erro);
    } else {
      console.log(`✅ Estoque atualizado! Nova resposta:`, updateData);
    }
  }

  if (errosEstoque.length > 0) {
    console.warn("⚠️ Alguns estoques não foram atualizados:", errosEstoque);
  }

  console.log("✅ Venda finalizada com sucesso!");
  return venda;
}
