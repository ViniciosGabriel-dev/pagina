# 🎭 Cloacking System - Cloacker Pascha

Sistema de detecção de bots e cloacking inteligente para Next.js que serve conteúdo diferente para bots (SEO) e humanos (vendas).

## 📋 Características

✅ **Detecção de Bots**
- Identifica Googlebot, Bingbot, cURL, Wget e outros bots comuns
- Suporta integração com API PASCHA para detecção avançada
- Fallback seguro em caso de erro

✅ **Cloacking Configurável**
- Phase 1: Todos veem página de vendas (CLOAKING_ENABLED=false)
- Phase 2: Bots veem página educativa, humanos veem página de vendas (CLOAKING_ENABLED=true)

✅ **Dual Content**
- **Para Bots**: Página de Advocacia (Negociação de Dívidas) - otimizada para SEO
- **Para Humanos**: Página de Vendas (Paschoalotto - Pagou Fácil)

## 🚀 Quick Start

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env.local
```

Variáveis essenciais:
```env
CLOAKING_ENABLED=true                           # Ativar cloacking
NEXT_PUBLIC_WHATSAPP_PHONE=5511999999999       # Seu WhatsApp
```

### 3. Rodar localmente
```bash
npm run dev
```

Acesse: http://localhost:3000

## 📊 Testes Rápidos

### Testar como Googlebot
```bash
curl -X GET \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)" \
  -H "X-Forwarded-For: 203.45.67.100" \
  http://localhost:3000/
```

Resultado esperado: **Página de Advocacia** (Negociação de Dívidas)

### Testar como Chrome
```bash
curl -X GET \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0" \
  -H "X-Forwarded-For: 192.168.1.100" \
  http://localhost:3000/
```

Resultado esperado: **Página de Vendas** (Paschoalotto)

## 📁 Estrutura do Projeto

```
.
├── pages/
│   ├── index.js                 # Página principal com cloacking
│   ├── bot-advocacia.js         # Conteúdo para bots (SEO)
│   ├── api/
│   │   └── detect.js           # API de detecção
│   ├── bot/                     # Páginas adicionais para bots
│   │   ├── faq.js
│   │   ├── sobre.js
│   │   └── ...
│   └── humano/                  # Páginas adicionais para humanos
│       ├── privacidade.js
│       ├── compliance.js
│       └── ...
├── lib/                         # Utilitários
├── public/                      # Arquivos estáticos
├── styles/                      # CSS global
├── .env.local                   # Variáveis de produção
├── .env.example                 # Exemplo de variáveis
└── next.config.js              # Configuração
```

## ⚙️ Configuração de Variáveis

### `.env.local` (Produção)

```env
# ✅ REQUERIDO
CLOAKING_ENABLED=true
NEXT_PUBLIC_WHATSAPP_PHONE=5511999999999

# ✅ RECOMENDADO
NEXT_PUBLIC_COBRANCA_URL=https://pagoufacil.com.br

# ℹ️ OPCIONAL (Para detecção avançada)
NEXT_PUBLIC_PASCHA_URL=https://seu-api.com
PASCHA_API_KEY=sua-chave
PASCHA_ML_KEY=sua-ml-key
```

## 🔍 Como Funciona

### Fluxo de Detecção

1. **Request chega** → `getServerSideProps` em `pages/index.js`
2. **Verifica User-Agent** → Procura por assinaturas de bots conhecidos
3. **Se bot identificado** → Retorna `AdvocaciaPage` (página de advocacia)
4. **Se não identificado** → Retorna `index.js` (página de vendas)

### Bots Detectados Automaticamente
- Googlebot, Bingbot, Slurp, DuckDuckBot
- Baidu Spider, Yandex Bot, Facebook External Hit
- Twitter Bot, LinkedIn Bot, WhatsApp
- Chrome Lighthouse, PageSpeed Online, GTmetrix
- cURL, Wget, Python, Java, Node, Postman

## 📦 Deploy

### Vercel (Recomendado)
1. Push para GitHub
2. Conecte repositório no Vercel
3. Configure `.env.local` no painel Vercel
4. Deploy automático

### Self-hosted
```bash
npm run build
npm run start
```

## 🛠️ Troubleshooting

**P: Todos veem a mesma página**
→ Verifique se `CLOAKING_ENABLED=true`

**P: Bots ainda veem página de vendas**
→ Limpe cache: `rm -rf .next && npm run dev`

**P: WhatsApp não abre**
→ Verifique formato: `55XXEXXXXXXXX` (55 = Brasil)
