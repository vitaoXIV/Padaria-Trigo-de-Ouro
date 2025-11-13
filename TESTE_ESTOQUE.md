# 🧪 Teste de Estoque - Guia Prático

## ✅ O que foi corrigido

### 1. **salesService.js**
- Removeu o `continue` que pulava a atualização de estoque
- Melhorou a coleta de erros (agora mostra todos os problemas)
- Adicionou emojis para rastrear cada etapa no console
- Validação mais rigorosa: todos os estoques devem ser atualizados

### 2. **Produtos.jsx**
- Substituiu polling (5 segundos) com **Real-time Subscription**
- Agora detecta mudanças no Supabase automaticamente
- Também recarrega ao ficar visível (voltar do carrinho)
- Emojis nos logs para rastreamento visual

---

## 🧪 Teste Passo a Passo

### Preparar
1. Abra o navegador e vá para **http://localhost:5173**
2. Abra o **Console (F12)** → aba "Console"

### Teste 1: Verificar Real-time Subscription
1. No Console, procure por:
   ```
   🔄 Configurando real-time subscription...
   📡 Status da subscription: ...
   ```
   ✅ Se vir isso, a subscription está ativa

### Teste 2: Comprar um Produto
1. Clique em **Adicionar** em qualquer produto
   - Deve ver no console: `🛒 Adicionando ao carrinho: [Nome do Produto]`

2. Vá para **Carrinho**
3. Clique em **Finalizar Compra**

### Teste 3: Verificar Logs de Estoque
No Console durante a compra, procure por:

```
🛒 Adicionando ao carrinho: Pão Francês
📥 Buscando produtos...
✅ Produtos carregados: 5
   📦 Pão Francês - Estoque: 10
...

✅ Estoque atualizado! Nova resposta: [...]
✅ Venda finalizada com sucesso!
```

### Teste 4: Verificar se o Estoque Diminuiu
1. Volta para **Produtos**
   - Deve ver no console: `🔔 Mudança detectada nos produtos:` (real-time!)
   
2. Procure pela linha:
   ```
   📦 Pão Francês - Estoque: 9
   ```
   ✅ Se mudou de 10 para 9, funcionou!

---

## 📊 Verificação no Supabase

Se quiser confirmar no banco:

1. Vá para **Supabase Dashboard**
2. Clique em **SQL Editor**
3. Execute:
   ```sql
   SELECT produto_id, nome, estoque FROM produtos ORDER BY produto_id;
   ```
4. Confirme se o `estoque` diminuiu

---

## ⚠️ Se não funcionar

### Logs esperados vs reais

| Se vê... | Significa... | Ação |
|----------|-------------|------|
| `✅ Estoque atualizado!` | Banco atualizou | ✅ OK |
| `❌ Erro ao atualizar estoque:` | Falha na atualização | Veja o erro |
| Nada sobre estoque | Código não chegou lá | Verifique `finalizarVenda` |

### Checklist de Debug

- [ ] Abra Console (F12)
- [ ] Finalize uma compra
- [ ] Procure por `🔄 Atualizando estoque de`
- [ ] Se não achar, procure por `❌ Erro ao`
- [ ] Se achar erro, compartilhe o erro completo
- [ ] Volte para Produtos
- [ ] Procure por `🔔 Mudança detectada`
- [ ] Verifique se o número de estoque mudou

---

## 🔧 Testes Avançados

### Teste de Múltiplos Produtos
1. Adicione 2 produtos diferentes ao carrinho
2. Finalize a compra
3. No console, deve ver 2 `✅ Estoque atualizado!` (um para cada)

### Teste de Quantidade
1. Adicione Pão Francês (estoque: 10)
2. Aumente a quantidade para 3
3. Finalize
4. No Supabase, o estoque deve ser 7 (10 - 3)

### Teste de Sem Estoque
1. Se um produto tiver estoque = 0
2. Ao clicar em "Adicionar", deve aparecer alert: `❌ Erro, sem produtos disponíveis no estoque`
3. Não permite adicionar ao carrinho

---

## 📝 Logs a Rastrear

```javascript
// Início da compra
🛒 Adicionando ao carrinho: [Nome]

// Busca de produtos
📥 Buscando produtos...
✅ Produtos carregados: [N]

// Durante finalizar
Carrinho recebido: [...]
Carrinho normalizado: [...]
Venda criada: {..., venda_id: X, ...}
Itens a inserir: [...]

// Atualização de estoque
📦 Produto [Nome] - Estoque no banco: [X]
🔄 Atualizando estoque de [Nome]: [X] → [Y]
✅ Estoque atualizado! Nova resposta: [...]

// Finalização
✅ Venda finalizada com sucesso!

// Real-time
🔔 Mudança detectada nos produtos: {...}
📥 Buscando produtos...
   📦 [Nome] - Estoque: [Y]
```

Se vir essa sequência completa, está tudo funcionando! ✅
