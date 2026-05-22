# ⚡ Setup Rápido - 5 Minutos

## 📥 Passo 1: Copiar Arquivos

```bash
# No seu projeto Next.js (cloacker ou outro)
# Copie estes arquivos para a pasta raiz:

cp -r ./lib/ seu-projeto/
cp -r ./pages/ seu-projeto/
cp .env.local seu-projeto/
```

## 🔑 Passo 2: Configurar Tokens

Abra `.env.local` e substitua:

```bash
NEXT_PUBLIC_PASCHA_URL=https://seu-projeto-pascha.railway.app
PASCHA_API_KEY=valor-copiado-do-railway
PASCHA_ML_KEY=valor-copiado-do-railway
```

**Onde copiar os valores:**
1. Railway Dashboard → seu projeto PASCHA
2. Clique em "Settings"
3. Vá em "Variables"
4. Copie `API_KEY` e `ML_DATA_KEY`

## ✅ Passo 3: Teste

```bash
# No terminal da pasta do projeto
npm run dev

# Acesse: http://localhost:3000
# Você deve ver a detecção funcionando!
```

## 🎯 Passo 4: Customizar (Opcional)

Se não quer redirecionar automaticamente, edite `pages/index.js`:

```javascript
// Remova o redirecionamento e use a detecção para outro fim
if (detection.isBot) {
  // Não mostrar oferta
} else {
  // Mostrar oferta
}
```

---

## 🐛 Solução de Problemas

**Erro: "401 Unauthorized"**
- ❌ Token inválido
- ✅ Copie novamente do Railway

**Erro: "404 Not Found"**
- ❌ PASCHA_URL está errado
- ✅ Verifique URL no Railway (com https://)

**Sempre retorna "isBot: false"**
- ❌ API pode estar caindo (fallback ativado)
- ✅ Verifique logs do Railway

**Localhost está lento**
- ✅ Normal na primeira requisição (sem cache)
- ✅ Segunda requisição volta rápido (com cache)

---

## 📝 Estrutura Final

```
seu-projeto/
├── lib/
│   └── pascha-client.js          ← Cliente PASCHA
├── pages/
│   ├── index.js                  ← Landing page com detecção
│   ├── oferta.js                 ← (opcional) Página de oferta
│   ├── seguro.js                 ← (opcional) Página educativa
│   └── api/
│       └── detect.js             ← API route que chama PASCHA
├── .env.local                    ← Tokens e config
└── package.json
```

---

## 🎉 Pronto!

Seu projeto agora está integrado com PASCHA. Está detectando bots automaticamente! 🚀

Próximos passos:
- [ ] Customize as páginas /oferta e /seguro com seu design
- [ ] Teste com ferramentas (curl, Postman)
- [ ] Deploy no Railway também
- [ ] Monitore os dados ML coletados
