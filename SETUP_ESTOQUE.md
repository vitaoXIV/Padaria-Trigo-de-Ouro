# 📦 Setup de Estoque - Padaria Trigo de Ouro

## Para adicionar estoque aos produtos via Supabase:

### Opção 1: Via Interface Supabase (Recomendado)

1. Acesse **https://app.supabase.com**
2. Selecione seu projeto
3. Vá para **SQL Editor**
4. Copie e execute um dos scripts abaixo:

#### Script 1: Adicionar estoque aleatório (0-3 unidades)
```sql
UPDATE produtos 
SET estoque = FLOOR(RANDOM() * 4) 
WHERE estoque IS NULL OR estoque = 0;
```

#### Script 2: Adicionar estoque específico
```sql
UPDATE produtos 
SET estoque = 2;
```

#### Script 3: Verificar estoque atual
```sql
SELECT produtos_id, nome, preco, estoque 
FROM produtos 
ORDER BY produtos_id;
```

### Opção 2: Inserir dados de teste

Se a tabela `produtos` está vazia, use:

```sql
INSERT INTO produtos (nome, preco, estoque) VALUES
('Pão Francês', 5.50, 10),
('Bolo de Chocolate', 25.00, 3),
('Croissant', 8.50, 5),
('Broa', 6.00, 2),
('Biscoito de Polvilho', 12.00, 8),
('Doce de Leite', 15.00, 0),
('Pão de Queijo', 7.00, 4);
```

## 🔍 Verificando a implementação:

### No Frontend (Produtos.jsx):
- ✅ Cards mostram estoque com ✅ ou ❌
- ✅ Botão "Adicionar" desabilitado quando estoque = 0
- ✅ Alerta "Erro, sem produtos disponíveis no estoque" ao tentar adicionar

### No Carrinho (Carrinho.jsx):
- ✅ Botão + desabilitado quando quantidade = estoque
- ✅ Mostra "Estoque total: X" para cada item
- ✅ Validação de estoque máximo na quantidade

### No Checkout (salesService.js):
- ✅ Valida estoque antes de processar venda
- ✅ Decrementa estoque após venda bem-sucedida
- ✅ Mostra erro se estoque foi reduzido por outro usuário

### No Histórico (Historico.jsx):
- ✅ Novo design moderno com gradientes
- ✅ Filtro de data funcional
- ✅ Cards estilizados mostrando vendas

## 🧪 Testando o sistema:

1. **Produto com estoque**:
   - Vá para /produtos
   - Card deve mostrar "✅ Em estoque: X"
   - Botão "Adicionar" deve estar ativo
   - Clique e adicione ao carrinho
   - Em /carrinho, teste aumentar quantidade até o máximo

2. **Produto sem estoque**:
   - Card deve mostrar "❌ Sem estoque"
   - Botão deve ser cinza e desabilitado
   - Ao tentar clicar, mostra alerta

3. **Finalizar venda**:
   - Adicione alguns produtos ao carrinho
   - Clique "Finalizar Compra"
   - Estoque deve diminuir no banco de dados
   - Histórico deve registrar a venda

## 📊 Estrutura de dados esperada:

### Tabela `produtos`
```
produtos_id | nome                 | preco  | estoque
1           | Pão Francês          | 5.50   | 10
2           | Bolo de Chocolate    | 25.00  | 3
3           | Croissant            | 8.50   | 0
...
```

### Tabela `vendas`
```
venda_id | data                   | total
1        | 2024-01-15 14:30:00   | 45.50
...
```

### Tabela `vendas_itens`
```
venda_item_id | venda_id | produto_id | quantidade | preco_unitario
1             | 1        | 1          | 2          | 5.50
2             | 1        | 2          | 1          | 25.00
...
```
