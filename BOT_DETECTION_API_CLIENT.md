# 🤖 Bot Detection API Client

Este projeto agora consome uma **API externa de detecção de bots** em vez de implementar a lógica internamente.

## Configuração

### Variável de Ambiente

```bash
# .env.local (desenvolvimento)
BOT_DETECTION_API_URL=http://localhost:3001/api/detect

# .env.production (Vercel)
BOT_DETECTION_API_URL=https://seu-bot-detection-api.com/api/detect
```

## Interface da API

### Endpoint: `POST /api/detect`

**Localização no código:** `pages/api/detect.js`

### Request Body

```json
{
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
  "headers": {
    "accept-language": "en-US,en;q=0.9",
    "accept-encoding": "gzip, deflate",
    "accept": "text/html,application/xhtml+xml,...",
    "connection": "keep-alive"
  }
}
```

### Response

```json
{
  "success": true,
  "isBot": false,
  "score": 15,
  "confidence": "high",
  "recommendation": "oferta",
  "detectedBy": "external-api"
}
```

## Fluxo de Dados

```
1. Browser visita https://seu-site.com
   ↓
2. getServerSideProps() chama /api/detect (POST)
   ↓
3. /api/detect faz fetch para BOT_DETECTION_API_URL
   ↓
4. API externa retorna { isBot: boolean, ... }
   ↓
5. pages/index.js renderiza:
   - isBot=true  → mostra AdvocaciaPage (educativa)
   - isBot=false → mostra página de vendas
```

## Tratamento de Erros

Se a API externa estiver indisponível:
- Fallback: `isBot=false` (mostra página de vendas)
- Log de erro no servidor
- HTTP 500 para o cliente

## Especificação da API Externa

A API externa **deve implementar:**

- ✅ `POST /api/detect` endpoint
- ✅ Aceitar `ip`, `userAgent`, `headers`
- ✅ Retornar `{ isBot, score, confidence, recommendation, detectedBy }`
- ✅ Ser escalável para múltiplos domínios
- ✅ Suportar diferentes métodos de detecção (Bot ID, ML, signatures, etc)

## Stack Recomendado para API Externa

- **Runtime:** Node.js, Python, Rust, Go
- **Framework:** Express, FastAPI, Actix, etc
- **Detecção:** Vercel Bot ID (ou alternativas)
- **Banco:** Redis para cache de IPs/decisions
- **Observabilidade:** Logs, métricas, alertas

## Exemplo: Consumo da API no Projeto

```javascript
// pages/api/detect.js
const response = await fetch(process.env.BOT_DETECTION_API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ip,
    userAgent,
    headers: { ... }
  })
});

const detection = await response.json();
```

## Variáveis Disponíveis

| Variável | Descrição | Exemplo |
|---|---|---|
| `BOT_DETECTION_API_URL` | URL da API externa | `http://localhost:3001/api/detect` |
| `CLOAKING_ENABLED` | Ativa/desativa cloaking | `true` ou `false` |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | Número do WhatsApp | `5511986324895` |

## Próximos Passos

1. **Criar API externa** em pasta separada
2. **Implementar detecção de bots** (Bot ID, ML, signatures, etc)
3. **Deploy API** (Railway, Vercel, AWS, etc)
4. **Atualizar `BOT_DETECTION_API_URL`** em produção
5. **Testar integração** end-to-end

---

📝 **Nota:** Este projeto é agnóstico à implementação da API externa. Pode usar qualquer tecnologia/método de detecção.
