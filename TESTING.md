# 🧪 Testing Guide - Bot Detection

Guia completo para testar a detecção de bots.

---

## ✅ Testes Disponíveis

### 1. **Suite Completa de Simulação** (recomendado)

Testa 26 cenários diferentes (13 bots, 6 humanos, 7 edge cases).

```bash
npm run dev    # Terminal 1: Inicia servidor
npm run test:simulation  # Terminal 2: Roda testes
```

**O que testa:**
- ✅ Googlebot, Bingbot, Yandexbot, Slurp (bots)
- ✅ curl, wget, Python Requests (command-line tools)
- ✅ Puppeteer, Playwright, Selenium (headless browsers)
- ✅ FacebookBot, TwitterBot, LinkedInBot (social crawlers)
- ✅ Chrome, Safari, Firefox, Edge (humanos desktop)
- ✅ iPhone Safari, Android Chrome (humanos mobile)
- ✅ Empty UA, Long UA, Special characters (edge cases)

**⚠️ Nota Importante:**

Vercel Bot ID funciona **apenas em PRODUÇÃO** (no edge). Em localhost, o header `x-vercel-botid` não é injetado automaticamente, portanto:

- ✅ Testes de **humanos passam** (esperado)
- ❌ Testes de **bots falham** em localhost (esperado, pois não há header)

**Resultado esperado em localhost:**
```
📊 RESUMO DOS TESTES:

  ✓ Passou:       13/26  (todos os humanos + edge cases)
  ✗ Falhou:       13/26  (todos os bots - esperado em localhost)
  ⚠ Erros:        0/26

  Taxa de Sucesso: 50.0%

⚠️ Nota sobre testes em localhost:
   Vercel Bot ID funciona apenas em PRODUÇÃO.
   Em localhost, testes de bots falham porque o header
   x-vercel-botid não é injetado (esperado).

✓ Para testar em produção:
   1. Deploy para Vercel
   2. Execute: curl https://seu-site.vercel.app/api/detect
   3. Resultado deve ser: { "isBot": true, ... }
```

**Resultado esperado em PRODUÇÃO:**
```
📊 RESUMO DOS TESTES:

  ✓ Passou:       26/26  (todos passam em produção!)
  ✗ Falhou:       0/26
  ⚠ Erros:        0/26

  Taxa de Sucesso: 100.0%
```

---

### 2. **Teste de Bot Específico**

Testa um bot manualmente com detalhes.

```bash
# Teste Googlebot
node scripts/test-specific-bot.js "Googlebot" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

# Teste Puppeteer
node scripts/test-specific-bot.js "Puppeteer" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.124 Safari/537.36"

# Teste Chrome Browser
node scripts/test-specific-bot.js "Chrome" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
```

**Resultado:**
```
🔍 TESTING: Googlebot

Details:
  User Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
  URL: http://localhost:3000/api/detect

Response:

  Status: 200
  isBot: true
  Score: 95
  Confidence: high
  Recommendation: educativo
  Detected By: vercel-botid
```

---

### 3. **Testes com curl** (simulação real)

Testa com curl - ferramenta real que será detectada como bot.

```bash
npm run dev    # Terminal 1: Inicia servidor
bash scripts/test-with-curl.sh  # Terminal 2: Roda testes
```

**Testes inclusos:**
- curl simples (sem User-Agent)
- Googlebot
- Chrome Browser
- Puppeteer

---

### 4. **Teste Manual no Browser**

Abra seu navegador e visite o site manualmente.

```bash
npm run dev
# Abra: http://localhost:3000
```

**Esperado:**
- Você (humano) vê a **página de vendas**
- Console mostra: `[DETECT] 👤 Human`

---

## 🔧 Setup para Testes

### Pré-requisitos

```bash
# Node.js >= 14
node --version

# npm >= 6
npm --version

# jq (para parse JSON em curl tests) - opcional
# Windows: choco install jq
# Mac: brew install jq
# Linux: apt install jq
```

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/seu-repo/pagina.git
cd pagina

# 2. Install dependências
npm install

# 3. Configure ambiente
# .env.local já vem com valores padrão
cat .env.local
```

---

## 📊 Adicionando Novos Testes

### Adicionar novo bot à suite

Edite `scripts/test-bot-detection.js`:

```javascript
const BotTests = [
  // ... testes existentes ...
  {
    name: 'Seu Bot Aqui',
    ua: 'User-Agent do seu bot',
    expectedBot: true,  // ou false para humanos
  },
];
```

### Adicionar novo caso edge

```javascript
const EdgeCaseTests = [
  // ... casos existentes ...
  {
    name: 'Seu teste',
    ua: 'UA a testar',
    expectedBot: false,  // resultado esperado
  },
];
```

---

## 🐛 Troubleshooting

### "Connection error: ECONNREFUSED"

```bash
# Solução: Inicie o servidor
npm run dev
```

### "Servidor não está rodando em localhost:3000"

```bash
# Verifique se npm run dev está em outro terminal
# Verifique porta 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

### Resultado inesperado

1. Verifique o User-Agent
2. Verifique o arquivo `.env.local`
3. Verifique os logs em `[DETECT]`

```bash
npm run dev
# Procure por linhas como: [DETECT] 👤 Human ou [DETECT] 🤖 Bot
```

---

## 📈 Interpretando Resultados

### Response Completa

```json
{
  "success": true,
  "isBot": false,
  "score": 5,
  "confidence": "high",
  "recommendation": "oferta",
  "detectedBy": "vercel-botid"
}
```

| Campo | Significado | Exemplo |
|---|---|---|
| `success` | Requisição processada | `true` |
| `isBot` | É bot? | `true` ou `false` |
| `score` | Confiança (0-100) | `95` |
| `confidence` | Nível de confiança | `high`, `medium`, `low` |
| `recommendation` | Página a mostrar | `educativo` (bot) ou `oferta` (humano) |
| `detectedBy` | Qual método detectou | `vercel-botid` |

---

## 🎯 Checklist de Testes

### Antes de Deploy em Produção

- [ ] Suite completa passa (26/26)
- [ ] curl é detectado como bot ✓
- [ ] Chrome browser é detectado como humano ✓
- [ ] Googlebot é detectado como bot ✓
- [ ] Puppeteer é detectado como bot ✓
- [ ] Logs aparecem corretos `[DETECT]`
- [ ] No console: sem erros

### Depois de Deploy em Produção

- [ ] Testar com curl em produção
  ```bash
  curl https://seu-site.com/api/detect
  # Deve retornar: { "isBot": true, ... }
  ```

- [ ] Visitar site em browser real
  - Chrome: vê página de vendas
  - Safari: vê página de vendas
  - Firefox: vê página de vendas

- [ ] Verificar logs no Vercel dashboard

---

## 📝 Scripts Disponíveis

```bash
npm run dev                 # Inicia servidor em localhost:3000
npm run build              # Build para produção
npm run start              # Inicia servidor em produção
npm run lint               # Verifica linting

npm run test:simulation    # Suite completa de testes
node scripts/test-specific-bot.js "Nome" "UA"  # Teste específico
bash scripts/test-with-curl.sh     # Testes com curl
```

---

## 🔐 Segurança nos Testes

Os testes **NÃO fazem**:
- ❌ Requisições a servidores externos
- ❌ Armazenam dados de teste
- ❌ Modificam banco de dados
- ❌ Expõem informações sensíveis

Todos os testes são **locais e seguros**.

---

## 📞 Suporte

Se tiver dúvidas sobre os testes:

1. Verifique este arquivo
2. Verifique `scripts/test-bot-detection.js`
3. Abra issue no GitHub

---

🚀 **Boa sorte com os testes!**
