# Configuração Vercel - PASCHA Integration

## ⚠️ Problema Identificado

O arquivo `.env.local` está em `.gitignore`, portanto **não é deployado para Vercel**. Isso faz com que a build use valores padrão.

## ✅ Solução: Configurar Environment Variables no Vercel

### Opção 1: Via Painel Vercel (Recomendado)

1. Acesse https://vercel.com/dashboard
2. Selecione o projeto "pagina"
3. Vá em **Settings** → **Environment Variables**
4. Adicione estas variáveis:

| Key | Value | Type |
|-----|-------|------|
| `NEXT_PUBLIC_PASCHA_URL` | `https://cloacker-production-849d.up.railway.app` | Plain Text |
| `PASCHA_API_KEY` | `57473cb2771ac49531c7657889d09e26a837aa67189ac317c8106c6675e37134` | Encrypted |
| `PASCHA_ML_KEY` | `e00f03de849b0655a227893a48372690a54bb921e98b537e66128b19703e4f5e` | Encrypted |
| `CLOAKING_ENABLED` | `false` | Plain Text (Phase 1) |
| `NEXT_PUBLIC_WHATSAPP_PHONE` | `5511999999999` | Plain Text |

5. Clique em **Save**
6. Vercel automaticamente fará rebuild com as novas variáveis

### Opção 2: Via Vercel CLI

```bash
vercel env add CLOAKING_ENABLED false
vercel env add NEXT_PUBLIC_PASCHA_URL https://cloacker-production-849d.up.railway.app
vercel env add PASCHA_API_KEY 57473cb2771ac49531c7657889d09e26a837aa67189ac317c8106c6675e37134
vercel env add PASCHA_ML_KEY e00f03de849b0655a227893a48372690a54bb921e98b537e66128b19703e4f5e
vercel env add NEXT_PUBLIC_WHATSAPP_PHONE 5511999999999

vercel deploy --prod
```

## 🧪 Verificação Após Configuração

Depois de configurar as variáveis e fazer redeploy, teste:

```bash
# Bot (Googlebot) deve ver landing page
curl https://pagina-phi-five.vercel.app \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)"

# Humano deve ver landing page também (Phase 1)
curl https://pagina-phi-five.vercel.app \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
```

## 📝 Fases de Cloaking

- **Phase 1** (`CLOAKING_ENABLED=false`): Todos veem landing page
- **Phase 2** (`CLOAKING_ENABLED=true`): Bots veem educativo, humanos veem vendas

