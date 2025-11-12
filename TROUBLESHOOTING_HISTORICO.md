# 🔍 Troubleshooting - Histórico de Vendas Não Aparece

## Passos para Debugar:

### 1. **Verificar se as tabelas existem no Supabase**

Acesse: https://app.supabase.com → seu projeto → SQL Editor

Execute:
```sql
-- Verificar estrutura de vendas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema='public'
AND table_name IN ('vendas', 'vendas_itens', 'produtos');
```

### 2. **Verificar dados nas tabelas**

```sql
-- Ver se há vendas registradas
SELECT * FROM vendas ORDER BY data DESC;

-- Ver se há itens de venda
SELECT * FROM vendas_itens;

-- Ver relacionamento
SELECT 
  v.venda_id,
  v.data,
  v.total,
  vi.venda_item_id,
  vi.produto_id,
  vi.quantidade
FROM vendas v
LEFT JOIN vendas_itens vi ON v.venda_id = vi.venda_id
ORDER BY v.data DESC;
```

### 3. **Testar a query exata do React**

No SQL Editor:
```sql
SELECT 
  venda_id,
  data,
  total,
  vendas_itens(quantidade, preco_unitario, produto_id)
FROM vendas
ORDER BY data DESC;
```

Se der erro de sintaxe, tente:
```sql
SELECT 
  v.venda_id,
  v.data,
  v.total,
  COALESCE(json_agg(json_build_object(
    'quantidade', vi.quantidade,
    'preco_unitario', vi.preco_unitario,
    'produto_id', vi.produto_id
  )), '[]') as vendas_itens
FROM vendas v
LEFT JOIN vendas_itens vi ON v.venda_id = vi.venda_id
GROUP BY v.venda_id, v.data, v.total
ORDER BY v.data DESC;
```

### 4. **Usar a página de Debug**

1. Acesse: `localhost:5173/debug-sales`
2. Abra F12 → Console
3. Veja o JSON retornado
4. Procure por erros de relacionamento

### 5. **Se ainda não aparecer**

Possíveis causas:
- ❌ Relacionamento Foreign Key não está configurado
- ❌ Permissões RLS no Supabase estão bloqueando leitura
- ❌ Nomes de colunas estão diferentes (ex: `venda_item_id` vs `id`)

**Solução para RLS:**
```sql
-- Desabilitar RLS temporariamente para teste
ALTER TABLE vendas DISABLE ROW LEVEL SECURITY;
ALTER TABLE vendas_itens DISABLE ROW LEVEL SECURITY;
```

Depois reabilitar:
```sql
ALTER TABLE vendas ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendas_itens ENABLE ROW LEVEL SECURITY;
```

## ✅ Próximos Passos

1. Acesse `/debug-sales`
2. Verifique o console (F12)
3. Copie os dados do JSON e compartilhe comigo
4. Vou corrigir a query com base no que encontrar
