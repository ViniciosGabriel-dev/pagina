# 🚀 Quick Test Guide

Teste a detecção de bots em 2 minutos!

---

## 1️⃣ Inicie o Servidor

```bash
npm run dev
```

Você verá:
```
> next dev

  ▲ Next.js 14.2.35
  - Environments: .env.local

  ◇ Starting...
  ◇ Ready in 2.5s
  ◇ Listening on http://localhost:3000
```

---

## 2️⃣ Execute os Testes

**Em outro terminal:**

```bash
# Suite completa (26 testes)
npm run test:simulation
```

Resultado esperado:
```
🤖 BOT DETECTION SIMULATION TESTS

🤖 Bot User Agents

Name                       | Expected   | Got        | Status | Error
─────────────────────────────────────────────────────────────────
Googlebot                  | Bot        | Bot        | ✓ PASS | 
Bingbot                    | Bot        | Bot        | ✓ PASS | 
curl                       | Bot        | Bot        | ✓ PASS | 
...

📊 RESUMO DOS TESTES:

  ✓ Passou:       26/26
  ✗ Falhou:       0/26
  ⚠ Erros:        0/26

  Taxa de Sucesso: 100.0%
```

---

## 3️⃣ Outros Testes Disponíveis

### Teste um bot específico

```bash
npm run test:bot "Googlebot" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
```

### Teste com curl (simulação real)

```bash
bash scripts/test-with-curl.sh
```

### Teste manual no browser

```
Abra: http://localhost:3000
Você deve ver a página de vendas (pois é humano)
```

---

## ✅ O que é Testado?

### Bots (devem ser bloqueados)
- ✓ Googlebot
- ✓ Bingbot
- ✓ curl, wget
- ✓ Puppeteer, Playwright, Selenium
- ✓ FacebookBot, TwitterBot, LinkedInBot
- ✓ E mais...

### Humanos (devem passar)
- ✓ Chrome Desktop
- ✓ Safari macOS
- ✓ Firefox Linux
- ✓ iPhone Safari
- ✓ Android Chrome
- ✓ Microsoft Edge

### Edge Cases
- ✓ User-Agent vazio
- ✓ User-Agent muito longo
- ✓ Caracteres especiais
- ✓ Mixed case

---

## 📊 Interpretando Resultados

```json
{
  "success": true,
  "isBot": true,           // ← Bot detectado
  "score": 95,             // ← Confiança (0-100)
  "confidence": "high",    // ← Nível de confiança
  "recommendation": "educativo",  // ← Página a mostrar
  "detectedBy": "vercel-botid"   // ← Método de detecção
}
```

---

## 🐛 Troubleshooting

| Erro | Solução |
|---|---|
| "Connection refused" | Certifique-se que `npm run dev` está rodando |
| "Server not running" | Use `npm run dev` em outro terminal |
| Testes falhando | Verifique se `.env.local` existe |

---

## 📚 Documentação Completa

Veja `TESTING.md` para guia detalhado de testes.

---

**🎉 Pronto! Seus testes estão funcionando!**
