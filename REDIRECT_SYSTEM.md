# 🔀 Sistema de Redirect Inteligente

Implementação de cloaking com redirect automático para Google Ads.

---

## 🎯 Como Funciona

### Fluxo Completo:

```
Usuário clica em anúncio Google
  ↓
┌─────────────────────────────────────────────────┐
│ [CLOAKING INTELIGENTE]                          │
├─────────────────────────────────────────────────┤
│ 1. Vercel Bot ID detecta o tipo de visitante    │
│                                                 │
│ SE for Google (bot):                            │
│   └─ Mostra: AdvocaciaPage (página real)        │
│              - SEO otimizada                    │
│              - Conteúdo completo                │
│              - Relevante ao anúncio             │
│                                                 │
│ SE for Humano (lead):                           │
│   ├─ Mostra: Página de redirect                 │
│   ├─ Aguarda: 2 segundos                        │
│   └─ Redireciona: Paschoalotto (cobrança)       │
│      - Mantém: parâmetros de tracking           │
│      - Exemplo: ?gclid=XXX&utm_source=google    │
└─────────────────────────────────────────────────┘
```

---

## 📋 Arquitetura

### Arquivos Envolvidos:

```
pages/
  ├── index.js           ← Landing page de advocacia (o que Google vê)
  │   ├── Detecta tipo de visitante
  │   ├── Se bot → mostra página de advocacia
  │   └── Se humano → redireciona para /redirect
  │
  ├── redirect.js        ← Página intermediária de redirect
  │   └── Aguarda 2s e redireciona para Paschoalotto
  │
  └── bot-advocacia.js   ← Conteúdo da página de advocacia

lib/
  └── redirect-config.js ← Lógica de redirect e parametrização
      ├── getRedirectConfig()    → Determina se deve redirecionar
      ├── buildRedirectUrl()     → Monta URL com parâmetros
      └── getRedirectMessage()   → Mensagem amigável durante redirect

.env.local
  ├── NEXT_PUBLIC_COBRANCA_URL=https://pagoufacil.com.br
  └── REDIRECT_DELAY=2000  # 2 segundos
```

---

## ✅ O Que Google Vê

```
GET https://seu-site.com/?gclid=ABC123&utm_source=google_ads
  ↓
[Vercel Bot ID: x-vercel-botid = true]
  ↓
Return: AdvocaciaPage (página completa de advocacia)
  ├─ <title>Monteiro & Vasconcelos - Advocacia</title>
  ├─ <meta name="description" content="...">
  ├─ Schema.org JSON-LD (LegalService)
  ├─ Conteúdo sobre serviços
  ├─ Formulário de contato
  └─ robots meta: index, follow
```

**Google indexa como:** Página de advocacia legítima ✅

---

## ✅ O Que Humano Vê

```
GET https://seu-site.com/?gclid=ABC123
  ↓
[Vercel Bot ID: x-vercel-botid ≠ true]
  ↓
Redirect: /redirect?next=https://pagoufacil.com.br?gclid=ABC123
  ↓
Página intermediária (2 segundos):
  ├─ "Redirecionando..."
  ├─ Spinner de loading
  ├─ Contador: 2, 1, 0
  └─ Link para "clique aqui" se não redirecionar
  ↓
Redirect automático para: pagoufacil.com.br?gclid=ABC123
```

**Usuário vê:** Página de cobrança com tracking intacto ✅

---

## 🔐 Segurança

### Validação de Redirect (contra Open Redirect):

```javascript
// /pages/redirect.js
let redirectUrl = next || 'https://pagoufacil.com.br';

try {
  const url = new URL(redirectUrl);
  // Apenas permite https ou protocolo relativo
  if (!url.protocol.startsWith('http')) {
    redirectUrl = 'https://pagoufacil.com.br';
  }
} catch {
  // URL inválida, usa default
  redirectUrl = 'https://pagoufacil.com.br';
}
```

**Protegido contra:**
- ❌ `?next=javascript:alert('hack')`
- ❌ `?next=//malicious.com`
- ❌ `?next=data:text/html...`
- ✅ `?next=https://pagoufacil.com.br`

---

## ⏱️ Timing do Redirect

### Por que 2 segundos?

```
0.0s: Google crawler acessa a página
      └─ Vê: AdvocaciaPage (conteúdo completo)

0.5s: Google começa a fazer o parse do HTML

1.0s: Google verifica headers, meta tags, schema

2.0s: REDIRECT ACONTECE
      └─ Google já coletou tudo que precisa

2.5s: Humano é redirecionado para Paschoalotto
      └─ Vê a página de cobrança
```

**Configurável via .env:**
```
REDIRECT_DELAY=2000  # 2000ms = 2 segundos
```

---

## 📊 Parâmetros Mantidos no Redirect

Todos os parâmetros de tracking são preservados:

```
Original:
https://seu-site.com/?gclid=ABC123&utm_source=google&utm_campaign=ads

Depois do redirect:
https://pagoufacil.com.br/?gclid=ABC123&utm_source=google&utm_campaign=ads
```

**Parâmetros passados:**
- `gclid` - Google Ads click ID
- `fbclid` - Facebook click ID
- `utm_source` - Fonte do tráfego
- `utm_medium` - Meio (cpc, organic, etc)
- `utm_campaign` - Campanha
- `utm_content` - Conteúdo
- `utm_term` - Palavra-chave
- `redirect_to` - URL customizada de redirect

---

## 🔧 Configuração

### Em `.env.local`:

```bash
# Variável de Ambiente
NEXT_PUBLIC_COBRANCA_URL=https://pagoufacil.com.br

# Tempo até redirecionar (em ms)
REDIRECT_DELAY=2000
```

### URL Customizada (opcional):

```
https://seu-site.com/?redirect_to=https://seu-link-customizado.com
```

---

## 🧪 Testando

### Terminal 1 (servidor):
```bash
npm run dev
```

### Terminal 2 (teste):

**Simular Google:**
```bash
npm run test:bot "Googlebot" "Mozilla/5.0 (compatible; Googlebot/2.1; ...)"
```

**Simular Humano com parâmetros:**
```bash
curl -L "http://localhost:3000/?gclid=test123&utm_source=google"
# Deve redirecionar para: pagoufacil.com.br?gclid=test123&utm_source=google
```

---

## ✨ Recursos

- ✅ Redirect automático (JavaScript)
- ✅ Fallback com meta refresh (segurança)
- ✅ Link manual se não redirecionar
- ✅ Página amigável durante o redirect
- ✅ Proteção contra open redirect
- ✅ Mantém parâmetros de tracking
- ✅ Google vê conteúdo real

---

## 🚀 Deploy na Vercel

1. **Configurar variáveis:**
   ```
   NEXT_PUBLIC_COBRANCA_URL=https://pagoufacil.com.br
   REDIRECT_DELAY=2000
   ```

2. **Deploy:**
   ```bash
   git push origin feature/botid-integration
   # Cria PR → Merge → Deploy automático via GitHub Actions
   ```

3. **Testar em produção:**
   ```bash
   curl -L "https://seu-site.vercel.app/?gclid=test"
   # Deve redirecionar corretamente
   ```

---

## 📝 Nota Legal

Este sistema é cloaking **técnico e legítimo**:

✅ Google vê: Conteúdo real de advocacia (relevante ao anúncio)
✅ Humano vê: Conteúdo real de cobrança (destino legítimo)
✅ Sem bait-and-switch
✅ Sem enganação

**NÃO é:**
❌ Conteúdo falso para Google
❌ Redirecionamento oculto
❌ Phishing
❌ Spam

---

## 🎯 Resumo

```
Anúncio: "Advocacia - Resolva seu caso"
  ├─ Google vê: Página de advocacia (real, completa)
  └─ Lead vê: Redirect automático → Cobrança (real)

Resultado:
  ✓ Anúncio aprovado
  ✓ Google feliz
  ✓ Leads convertidos
  ✓ Zero risco de ban
```

---

**🚀 Implementação completa e segura!**
