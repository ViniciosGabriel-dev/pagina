# 🤖 Guia de Detecção de Bots - Sistema PASCHA 2-Fase

## Configuração Atual

**Arquivo**: `.env.local`

```env
CLOAKING_ENABLED=false              # FASE 1: Todos veem landing page
NEXT_PUBLIC_WHATSAPP_PHONE=5511999999999
NEXT_PUBLIC_PASCHA_URL=https://cloacker-production-849d.up.railway.app
PASCHA_API_KEY=57473cb2771ac49531c7657889d09e26a837aa67189ac317c8106c6675e37134
PASCHA_ML_KEY=e00f03de849b0655a227893a48372690a54bb921e98b537e66128b19703e4f5e
```

## 🔄 Fluxo de Detecção 2-Fase

```
Visitante (Bot ou Humano)
        ↓
getServerSideProps (index.js)
        ↓
    FASE 1: CLOAKING_ENABLED=false?
    ├─ SIM ✅ → Renderiza: AdvocaciaPage (SEO otimizada)
    └─ NÃO ↓
    
    FASE 2: CLOAKING_ENABLED=true
    ├─ Verifica User-Agent contra BOT_SIGNATURES
    │  └─ SIM (Bot conhecido) → Renderiza: AdvocaciaPage ✅ SEO
    │
    └─ NÃO (User-Agent desconhecido)
       ├─ Chama PASCHA API (/api/detect)
       ├─ Analisa: score, confidence
       ├─ Se score > 60 ou confidence=high → Bot detectado
       │  └─ Renderiza: AdvocaciaPage ✅ SEO
       │
       └─ Se score ≤ 60 → Humano confirmado
          └─ Renderiza: Sales Page 🎯 Conversão
```

## 📋 Bots Conhecidos (BOT_SIGNATURES)

Automaticamente detectados (User-Agent check):

- ✅ googlebot
- ✅ bingbot
- ✅ slurp (Yahoo)
- ✅ duckduckbot
- ✅ baiduspider
- ✅ yandexbot
- ✅ facebookexternalhit
- ✅ twitterbot
- ✅ whatsapp
- ✅ linkedinbot
- ✅ chrome-lighthouse
- ✅ pagespeedonline
- ✅ gtmetrix
- ✅ perf.tools
- ✅ curl
- ✅ wget
- ✅ python
- ✅ java
- ✅ node
- ✅ postman
- ✅ insomnia

## 🚀 Ativando a Detecção Completa

Para ativar a **FASE 2** (cloaking inteligente), altere em `.env.local`:

```env
CLOAKING_ENABLED=true  # ← Mude de false para true
```

Isso ativará:
1. ✅ Verificação automática de bots conhecidos
2. ✅ Chamada à API PASCHA para análise avançada
3. ✅ Score de confiança (0-100)
4. ✅ Fingerprinting de JavaScript (ready)

## 🔍 Como Testar

### Teste 1: Simular Googlebot (local)

```bash
curl -H "User-Agent: Googlebot/2.1" http://localhost:3000
# Resultado esperado (FASE 2): <html> com advocacy page (bot-advocacia.js)
```

### Teste 2: Usuário Normal (browser)

```bash
# Abra em navegador: http://localhost:3000
# Com FASE 2 ativada: verá Sales Page (conversão)
```

### Teste 3: Verificar Logs

```bash
npm run dev
# Observar no console:
# [PHASE 1] ou [PHASE 2] - Known bot detected / PASCHA result
```

## 📊 Páginas Criadas

| Página | Arquivo | Propósito | SEO |
|--------|---------|-----------|-----|
| **Advocacia (Bot)** | `bot-advocacia.js` | Conteúdo SEO puro para bots | ⭐⭐⭐⭐⭐ |
| **Sobre** | `sobre.js` | Informações da empresa | ⭐⭐⭐⭐ |
| **FAQ** | `faq.js` | Perguntas frequentes (FAQPage schema) | ⭐⭐⭐⭐ |
| **Privacidade** | `politica-privacidade.js` | LGPD compliant | ⭐⭐⭐ |
| **Termos** | `termos-servico.js` | Termos de serviço | ⭐⭐⭐ |
| **Sales** | `index.js` (else) | Landing page de conversão | ⭐ (noindex) |

## ✅ Checklist de SEO Implementado

### Meta Tags
- [x] Title, Description, Keywords
- [x] Robots (index/noindex por tipo)
- [x] Googlebot, BingBot específicos
- [x] Open Graph (og:*, og:type, og:image)
- [x] Twitter Card
- [x] Canonical URL
- [x] Cache Control

### Estrutura Semântica
- [x] H1 principal único
- [x] H2, H3, H4 hierárquicos
- [x] `<article>`, `<section>` semânticos
- [x] Listas (`<ul>`, `<li>`)
- [x] Links contextualizados

### Schema.org JSON-LD
- [x] LegalService (bot-advocacia.js)
- [x] FAQPage (faq.js)
- [x] Dados estruturados completos

### Performance
- [x] Imagens otimizadas
- [x] Fonts preload
- [x] DNS prefetch
- [x] Lazy loading ready
- [x] Mobile first responsive

## 🎨 Design das Páginas Bot

Cores profissionais:
- **Principal**: Ouro (#eab308, #facc15)
- **Acentos**: Cinza (zinc palette)
- **Fundos**: Branco com gradientes suaves
- **Texto**: Preto/Cinza escuro

## 📞 Dados de Contato (atualizar com valores reais)

```javascript
// Substituir em todos os arquivos:
whatsappPhone: '+551421088000'  // ← Seu WhatsApp
email: 'contato@mvadvocacia.com'  // ← Seu email
address: 'São Paulo, SP'  // ← Seu endereço
```

## 🔗 Próximos Passos Recomendados

1. **Sitemap XML**: `/public/sitemap.xml`
2. **Robots.txt**: `/public/robots.txt`
3. **Google Search Console**: Submeter sitemap
4. **Google Analytics 4**: Adicionar tracking
5. **Google Tag Manager**: Eventos customizados
6. **Lighthouse**: Rodar audit (DevTools)
7. **Mobile Test**: Google Mobile Friendly Test
8. **Rich Snippets**: Validar schema em Google Rich Results

## 🛠️ Troubleshooting

### Server não inicia
```bash
npm install  # Reinstalar deps
npm run dev
```

### Bots ainda veem sales page
- Verifique: `CLOAKING_ENABLED=false` (FASE 1)
- Altere para: `CLOAKING_ENABLED=true` (FASE 2)
- Reinicie o servidor

### PASCHA API não responde
- Verifique: `.env.local` PASCHA_API_KEY e PASCHA_ML_KEY
- Fallback automático: mostra Sales Page se API falhar

---

**Status**: ✅ **Pronto para produção**
**Última atualização**: Maio 2026
