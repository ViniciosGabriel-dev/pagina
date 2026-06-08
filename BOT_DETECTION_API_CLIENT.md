# 🤖 Bot Detection via Vercel Bot ID

Este projeto usa **Vercel Bot ID nativo** para detecção de bots. Não requer API externa.

## Como Funciona

### Fluxo de Detecção

```
1. Browser visita https://seu-site.com
   ↓
2. Vercel CDN/Edge executa Vercel Bot ID
   ├─ Se bot detectado → Injeta header: x-vercel-botid: true
   └─ Se humano → Header não é injetado (ou = false)
   ↓
3. Requisição chega ao Next.js com header
   ↓
4. getServerSideProps() chama /api/detect (POST)
   ↓
5. /api/detect lê o header x-vercel-botid
   ├─ isBot=true  → Retorna { isBot: true, detectedBy: 'vercel-botid' }
   └─ isBot=false → Retorna { isBot: false, detectedBy: 'vercel-botid' }
   ↓
6. pages/index.js renderiza:
   - isBot=true  → mostra AdvocaciaPage (educativa)
   - isBot=false → mostra página de vendas
```

## Endpoint: `POST /api/detect`

**Localização:** `pages/api/detect.js`

### Request
```
POST /api/detect
Headers: {
  "x-vercel-botid": "true" ou undefined
}
```

### Response
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

## Configuração

Nenhuma configuração necessária!

Vercel Bot ID funciona automaticamente:
- ✅ Sem variáveis de ambiente
- ✅ Sem API key
- ✅ Sem latência adicional
- ✅ Nativo da Vercel

### Variáveis Obrigatórias

```bash
# .env.local
CLOAKING_ENABLED=true
NEXT_PUBLIC_WHATSAPP_PHONE=5511986324895
```

## Bots Detectados

Vercel Bot ID detecta:
- Googlebot, Bingbot, Yandexbot
- curl, wget, Python requests
- Puppeteer, Playwright, Selenium
- FacebookBot, TwitterBot, LinkedInBot
- Chrome Lighthouse, GTmetrix
- E muitos mais...

## Vantagens

| Aspecto | Vercel Bot ID |
|---|---|
| **Latência** | ⚡ Instantâneo (no edge) |
| **Custo** | 💰 Gratuito |
| **Configuração** | 🎯 Zero config |
| **Confiabilidade** | ✅ Mantido pela Vercel |
| **Cobertura** | 📊 95%+ de bots |

## Logging

```javascript
// Exemplo de log em pages/api/detect.js
console.log(`[DETECT] 🤖 Bot | IP: 192.168.1.1 | Source: Vercel Bot ID`);
console.log(`[DETECT] 👤 Human | IP: 192.168.1.2 | Source: Vercel Bot ID`);
```

## Fallback

Se houver erro:
```javascript
// Fallback seguro: assume humano
isBot = false
recommendation = 'oferta' // mostra página de vendas
```

## Variáveis Disponíveis

| Variável | Descrição | Exemplo |
|---|---|---|
| `CLOAKING_ENABLED` | Ativa/desativa cloaking | `true` ou `false` |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Número do WhatsApp | `5511986324895` |

## Próximos Passos

1. ✅ Código pronto para produção
2. ✅ Deploy no Vercel (automático via GitHub Actions)
3. ✅ Testar com curl (será bloqueado)
4. ✅ Monitorar logs no Vercel dashboard

---

📝 **Nota:** Solução simples e confiável. Se precisar de detecção avançada (ML, fingerprinting, etc), considere criar uma API externa separada no futuro.
