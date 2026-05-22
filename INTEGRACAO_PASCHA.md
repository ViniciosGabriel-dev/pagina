# 🔌 Exemplo Prático: Integrar API PASCHA em Outro Projeto

Este arquivo mostra como usar a API PASCHA em um projeto separado.

---

## Cenário

Você tem:
- **PASCHA** deployado em `https://pascha.railway.app` (ou seu domínio)
- **Projeto novo** (ex: site de vendas, blog, outro negócio)
- Quer reutilizar a detecção de bot sem duplicar código

---

## 🎯 Solução: Chamar PASCHA via API

### Estrutura do Projeto Novo

```
meu-site-novo/
├── pages/
│   ├── index.js          ← Landing page
│   └── api/
│       └── detect.js     ← Chama PASCHA
├── lib/
│   └── pascha-client.js  ← Cliente para PASCHA
├── .env.local
└── package.json
```

---

## 💾 Passo 1: Variáveis de Ambiente

Arquivo: `.env.local`

```bash
# PASCHA Service
NEXT_PUBLIC_PASCHA_URL=https://pascha.railway.app
PASCHA_API_KEY=sua-api-key-aqui
PASCHA_ML_KEY=sua-ml-key-aqui
```

---

## 📚 Passo 2: Cliente PASCHA

Arquivo: `lib/pascha-client.js`

```javascript
/**
 * Cliente para chamar API do PASCHA
 * Centraliza chamadas à API para reutilizar em múltiplos lugares
 */

class PaschaClient {
  constructor(baseUrl, apiKey, mlKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.mlKey = mlKey;
  }

  /**
   * Detecta se visitante é bot ou humano
   * @param {Object} options - { ip, userAgent, headers, geo }
   * @returns {Promise<Object>} { isBot, score, confidence, recommendation, cached, scoreBreakdown }
   */
  async detectVisitor(options = {}) {
    const {
      ip = 'unknown',
      userAgent = navigator?.userAgent || '',
      headers = {},
      geo = { country: 'unknown' }
    } = options;

    try {
      const response = await fetch(`${this.baseUrl}/api/detect-visitor`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip,
          userAgent,
          headers,
          geo
        }),
        timeout: 10000 // 10 segundos
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      
      // Log do score breakdown para debug
      if (result.scoreBreakdown) {
        console.log('[PASCHA] Score breakdown:', result.scoreBreakdown);
        console.log('[PASCHA] Cache hit:', result.cached);
      }
      
      return result;
    } catch (error) {
      console.error('[PASCHA] Erro ao detectar visitante:', error);
      // Fallback: considera humano se API falhar
      return {
        success: false,
        isBot: false,
        score: 0,
        confidence: 'low',
        recommendation: 'oferta',
        error: error.message
      };
    }
  }

  /**
   * Coleta dados do visitante para ML
   * @param {Object} data - { ip, userAgent, country, detectionResult }
   */
  async collectMLData(data) {
    try {
      const response = await fetch(`${this.baseUrl}/api/ml-collect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.mlKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.warn('[PASCHA] ML collection failed:', response.status);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('[PASCHA] Erro ao coletar dados ML:', error);
      return null;
    }
  }
}

// Criar instância global
const pascha = new PaschaClient(
  process.env.NEXT_PUBLIC_PASCHA_URL,
  process.env.PASCHA_API_KEY,
  process.env.PASCHA_ML_KEY
);

export default pascha;
```

---

## 🔌 Passo 3: Usar em API Route (Next.js)

Arquivo: `pages/api/detect.js`

```javascript
/**
 * Endpoint local que chama PASCHA e redireciona
 */
import pascha from '@/lib/pascha-client';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Coletar informações do visitante
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.socket.remoteAddress ||
               'unknown';

    const userAgent = req.headers['user-agent'] || '';

    const headers = {
      'accept-language': req.headers['accept-language'] || '',
      'accept-encoding': req.headers['accept-encoding'] || '',
      'referer': req.headers['referer'] || '',
      'accept': req.headers['accept'] || '',
      'connection': req.headers['connection'] || ''
    };

    // Chamar PASCHA
    const detection = await pascha.detectVisitor({
      ip,
      userAgent,
      headers,
      geo: req.geo || { country: 'unknown' }
    });

    // Coletar dados para ML (assíncrono, não bloqueia resposta)
    if (detection.success !== false) {
      pascha.collectMLData({
        ip,
        userAgent,
        country: req.geo?.country || 'unknown',
        detectionResult: {
          isBot: detection.isBot,
          score: detection.score
        }
      }).catch(console.error);
    }

    // Log em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${ip}] Bot: ${detection.isBot} | Score: ${detection.score}`);
    }

    return res.status(200).json({
      ...detection,
      recommendation: detection.isBot ? '/seguro' : '/comprar'
    });

  } catch (error) {
    console.error('[DETECT] Erro:', error);
    return res.status(500).json({
      error: 'Erro ao processar detecção',
      isBot: false, // Fallback
      recommendation: '/comprar'
    });
  }
}
```

---

## 🎨 Passo 4: Usar na Landing Page

Arquivo: `pages/index.js`

```javascript
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState('comprar');

  useEffect(() => {
    async function checkBot() {
      try {
        const res = await fetch('/api/detect');
        const data = await res.json();

        // Determinar para onde redirecionar
        const targetPage = data.isBot ? '/seguro' : '/comprar';
        setPage(targetPage);

        // Log
        console.log(`[Landing] Visitante: ${data.isBot ? 'BOT' : 'HUMANO'}`);
        console.log(`[Landing] Score: ${data.score} | Confidence: ${data.confidence}`);

      } catch (error) {
        console.error('Erro ao detectar:', error);
        setPage('/comprar'); // Fallback
      } finally {
        setIsLoading(false);
      }
    }

    checkBot();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Carregando...</p>
      </div>
    );
  }

  // Redirecionar para página apropriada
  if (page === '/seguro') {
    return (
      <div>
        <h1>📚 Conteúdo Educativo</h1>
        <p>Página de conteúdo seguro para bots</p>
        <Link href="/seguro">Ir para página de conteúdo</Link>
      </div>
    );
  } else {
    return (
      <div>
        <h1>💰 Grande Oferta Especial</h1>
        <p>Produto em promoção exclusiva!</p>
        <Link href="/comprar">Comprar Agora</Link>
      </div>
    );
  }
}
```

---

## 📄 Passo 5: Páginas Específicas

Arquivo: `pages/comprar.js`

```javascript
export default function ComprarPage() {
  return (
    <div>
      <h1>🛍️ Página de Compra</h1>
      <p>Visitantes humanos chegam aqui</p>
      <button>Comprar por R$ 297</button>
    </div>
  );
}
```

Arquivo: `pages/seguro.js`

```javascript
export default function SeguroPage() {
  return (
    <div>
      <h1>📖 Artigos Educativos</h1>
      <p>Visitantes bot chegam aqui</p>
      <article>
        <h2>5 Hábitos Saudáveis</h2>
        <p>Conteúdo educativo...</p>
      </article>
    </div>
  );
}
```

---

## ✅ Checklist de Integração

- [ ] Variáveis `.env.local` configuradas
- [ ] Cliente `lib/pascha-client.js` criado
- [ ] API route `/api/detect.js` funcionando
- [ ] Landing page redireciona corretamente
- [ ] Páginas `/seguro` e `/comprar` existem
- [ ] Verificar console para logs de detecção
- [ ] Testar com um bot (curl, Postman)
- [ ] Dados sendo coletados no PASCHA

---

## 🧪 Teste com Bot

```bash
# Simular requisição de bot
curl -H "User-Agent: curl/7.64.1" \
  http://localhost:3000/api/detect

# Esperado: isBot: true
```

---

## 🚀 Próximos Passos

1. **Múltiplas páginas:** Adicione mais rotas seguindo mesmo padrão
2. **Analytics:** Implemente rastreamento de conversão
3. **Cache:** Adicione cache local de detecções recentes
4. **A/B Testing:** Teste diferentes mensagens para humanos vs bots

---

**Pronto!** Seu novo projeto agora usa a detecção centralizada do PASCHA. 🚀
