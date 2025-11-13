# 🔍 Troubleshooting - Estoque Não Diminui

## ✅ Verificações Realizadas

### 1. Verificar se a coluna está correta
No Supabase SQL Editor:
```sql
-- Ver a estrutura da tabela produtos
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'produtos'
ORDER BY ordinal_position;
```

### 2. Verificar permissões RLS (Row Level Security)
Se o estoque não está diminuindo, pode ser RLS bloqueando:
```sql
-- Ver políticas RLS
SELECT * FROM pg_policies 
WHERE tablename = 'produtos';

-- Desabilitar RLS temporariamente para teste
ALTER TABLE produtos DISABLE ROW LEVEL SECURITY;

-- Reabilitar depois
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
```

### 3. Verificar dados antes e depois
```sql
-- Antes da venda
SELECT produto_id, nome, estoque FROM produtos ORDER BY produto_id;

-- Depois de finalizar uma venda
SELECT produto_id, nome, estoque FROM produtos ORDER BY produto_id;
```

### 4. Verificar logs no Console do Browser (F12)
Quando finalizar uma compra, procure por:
- `"Atualizando estoque de...:"` - mostra a mudança esperada
- `"Estoque atualizado com sucesso:"` - confirma atualização no banco

## 🧪 Passos para Debugar

1. Abra o **Console (F12)** do navegador
2. Finalize uma compra
3. Procure por logs com a palavra "estoque"
4. Se ver erro, compartilhe o erro completo

## 🔧 Possíveis Problemas

| Problema | Solução |
|----------|---------|
| Coluna não existe | Adicionar coluna `estoque` na tabela `produtos` |
| RLS bloqueando | Desabilitar RLS ou adicionar política de permissão |
| Tipo de dado errado | `estoque` deve ser `INTEGER` ou `NUMERIC` |
| Foreign Key quebrada | Verificar se `produto_id` é PK na tabela `produtos` |

## 📝 SQL para Adicionar Coluna (se precisar)

```sql
ALTER TABLE produtos 
ADD COLUMN estoque INTEGER DEFAULT 0;

-- Ou se já existe e está NULL
UPDATE produtos SET estoque = 5;
```

## ✅ Fluxo que Deveria Funcionar

1. ✅ Adiciona produto ao carrinho (estoque do carrinho = estoque.produto)
2. ✅ Vai para /carrinho
3. ✅ Clica "Finalizar Compra"
4. ✅ salesService busca estoque atual do banco
5. ✅ Calcula novo estoque = estoque - quantidade
6. ✅ UPDATE na tabela produtos
7. ✅ Volta para /produtos
8. ✅ Produtos recarregam COM O NOVO ESTOQUE ✅

Se não funcionar até o passo 8, há problema no banco ou RLS.
