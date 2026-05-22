/**
 * Script de Teste para Bot Detection
 * Usa porta dinâmica
 */

const BASE_URL = 'http://localhost:3006'; // Porta correta!

const USER_AGENTS = {
  googleBot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  bingBot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

const BOT_HEADERS = {
  'accept-language': '',
  'accept-encoding': 'gzip, deflate',
  'referer': '',
  'accept': '*/*',
};

const HUMAN_HEADERS = {
  'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  'accept-encoding': 'gzip, deflate, br',
  'referer': 'https://google.com/',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
};

async function testBot(name, userAgent, headers) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 Testando: ${name}`);
  console.log(`${'='.repeat(60)}`);

  try {
    const response = await fetch(`${BASE_URL}/api/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        ...headers
      }
    });

    const data = await response.json();

    console.log(`✅ User-Agent: ${userAgent.substring(0, 50)}...`);
    console.log(`🤖 Resultado: ${data.isBot ? '🚨 BOT DETECTADO' : '✨ HUMANO DETECTADO'}`);
    console.log(`📊 Score: ${data.score}/100`);
    console.log(`🎯 Confiança: ${data.confidence}`);
    console.log(`📋 Recomendação: ${data.recommendation}`);

    if (data.scoreBreakdown) {
      console.log(`\n📈 Score Breakdown:`);
      Object.entries(data.scoreBreakdown).forEach(([key, value]) => {
        console.log(`   - ${key}: ${value}`);
      });
    }

  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
  }
}

async function run() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║          🤖 TESTE DE DETECÇÃO DE BOT - PASCHA 🤖          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`\n📍 Servidor em: ${BASE_URL}\n`);

  await testBot('Google Bot', USER_AGENTS.googleBot, BOT_HEADERS);
  await testBot('Bing Bot', USER_AGENTS.bingBot, BOT_HEADERS);
  await testBot('Chrome (Humano)', USER_AGENTS.chrome, HUMAN_HEADERS);

  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    ✅ TESTES CONCLUÍDOS                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
}

run().catch(console.error);
