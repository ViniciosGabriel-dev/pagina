# 🔌 Integração PASCHA - Exemplo Pronto

Este é um exemplo **completo e pronto para usar** de como integrar a API PASCHA em um projeto Next.js.

## 📋 O que está incluído?

- ✅ Cliente PASCHA (`lib/pascha-client.js`)
- ✅ API route de detecção (`pages/api/detect.js`)
- ✅ Landing page com redirecionamento automático (`pages/index.js`)
- ✅ Configuração de variáveis de ambiente (`.env.local`)
- ✅ Tratamento de fallback se API cair
- ✅ Coleta de dados ML assíncrona
- ✅ Logging de debug

## 🚀 Como Usar

### 1️⃣ **Copiar para seu projeto**

```bash
# Copie estes arquivos para seu Next.js:
lib/pascha-client.js → seu-projeto/lib/
pages/api/detect.js → seu-projeto/pages/api/
pages/index.js → seu-projeto/pages/
.env.local → seu-projeto/
```

### 2️⃣ **Configurar Variáveis de Ambiente**

Edite `.env.local`:

```bash
NEXT_PUBLIC_PASCHA_URL=https://seu-projeto-pascha.railway.app
PASCHA_API_KEY=sua-chave-api-aqui
PASCHA_ML_KEY=sua-chave-ml-aqui
```

**Onde conseguir as chaves:**
1. Abra seu projeto PASCHA no Railway
2. Settings → Variables
3. Copie `API_KEY` e `ML_DATA_KEY`

### 3️⃣ **Testar Localmente**

```bash
npm run dev
# Acesse: http://localhost:3000
```

---

## 📖 Como Funciona?

### Fluxo Completo:

```
1. Visitante acessa localhost:3000
2. useEffect chama /api/detect
3. /api/detect chama PASCHA API
4. PASCHA retorna: { isBot, score, scoreBreakdown, cached }
5. Se isBot=true → redireciona para /seguro
6. Se isBot=false → mostra oferta (página /oferta)
7. Dados coletados para ML (assíncrono)
```

### Arquivos Principais:

**`lib/pascha-client.js`**
- Classe `PaschaClient` com métodos:
  - `detectVisitor(options)` → detecta bot/humano
  - `collectMLData(data)` → coleta dados para ML
- Cria instância global `pascha` exportada

**`pages/api/detect.js`**
- Extrai IP, User-Agent, Headers do visitante
- Chama `pascha.detectVisitor()`
- Coleta dados ML de forma assíncrona
- Retorna JSON com resultado

**`pages/index.js`**
- Loading page enquanto detecta
- Redireciona para /seguro (bots) ou /oferta (humanos)
- Mostra score breakdown em um `<details>`

---

## 🎯 Usar em Suas Próprias Páginas

Você não precisa redirecionar obrigatoriamente. Pode usar a detecção em qualquer lugar:

### Exemplo: Condicionar Conteúdo

```javascript
import { useEffect, useState } from 'react';

export default function MyPage() {
  const [detection, setDetection] = useState(null);

  useEffect(() => {
    fetch('/api/detect', { method: 'POST' })
      .then(r => r.json())
      .then(setDetection);
  }, []);

  if (!detection) return <p>Carregando...</p>;

  return (
    <div>
      {detection.isBot ? (
        <p>👤 Conteúdo para bots</p>
      ) : (
        <p>👨 Conteúdo para humanos</p>
      )}
      
      <details>
        <summary>Score: {detection.score}</summary>
        <pre>{JSON.stringify(detection.scoreBreakdown, null, 2)}</pre>
      </details>
    </div>
  );
}
```

---

## 🔐 Segurança

✅ Nunca exponha `PASCHA_API_KEY` no cliente
✅ Sempre chame via `/api/detect` (backend)
✅ Use variáveis de ambiente para tokens
✅ Não commit `.env.local` no git

---

## 🧪 Testar com Bot

```bash
# Simular requisição de bot
curl -H "User-Agent: curl/7.64.1" \
  http://localhost:3000/api/detect

# Esperado: "isBot": true
```

---

## 📊 Response Example

```json
{
  "success": true,
  "isBot": false,
  "score": 25,
  "confidence": "low",
  "recommendation": "oferta",
  "cached": false,
  "scoreBreakdown": {
    "botSignature": 0,
    "browserHeaders": 10,
    "tlsFingerprint": 15,
    "proxyDetection": 0,
    "encodingHeaders": 0
  },
  "details": {
    "userAgent": "Mozilla/5.0...",
    "country": "BR",
    "tlsAnalysis": {...}
  }
}
```

---

## ❓ FAQ

**P: E se PASCHA cair?**
R: Tem fallback - volta para `isBot: false` (considera humano)

**P: Posso usar isso em React/Vue/outro?**
R: Sim! Qualquer projeto que pode fazer fetch HTTP. Copie apenas `lib/pascha-client.js`

**P: Como coletar dados ML?**
R: Automático! Veja `pages/api/detect.js` - coleta assíncrona acontece naturalmente

**P: Preciso de /seguro e /oferta?**
R: Não! Você pode usar a detecção para qualquer lógica (mostrar/esconder elementos, mudar preço, etc)

---

## 🎉 Pronto!

Você tem um projeto Next.js totalmente integrado com PASCHA. Agora é só customizar conforme sua necessidade!

Para mais detalhes, veja:
- `API_USAGE.md` do PASCHA
- `INTEGRATION_EXAMPLE.md` do PASCHA
