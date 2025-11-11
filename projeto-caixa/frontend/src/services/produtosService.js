import { supabase } from '../supabaseClient';

// Lista produtos
export async function getProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*');

  if (error) throw error;
  return data;
}

// Atualizar estoque após venda
export async function atualizarEstoque(id, novoEstoque) {
  const { data, error } = await supabase
    .from('produtos')
    .update({ estoque: novoEstoque })
    .eq('produtos_id', id);

  if (error) throw error;
  return data;
}
