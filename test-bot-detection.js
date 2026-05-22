/**
 * Script de Teste para Bot Detection
 * Simula requisições como bot e humano
 */

const BASE_URL = 'http://localhost:3000';

// User agents para teste
const USER_AGENTS = {
  // Bots conhecidos
  googleBot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  bingBot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  yandexBot: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
  facebookBot: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
  twitterBot: 'facebookexternalhit/1.1',
  linkedinBot: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache Nutch 1.6)',

  // Navegadores normais (humanos)
  chrome: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  firefox: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
  safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
  edge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59'
};

// Headers de bot
const BOT_HEADERS = {
  'accept-language': '', // Bots geralmente não têm language preference
  'accept-encoding': 'gzip, deflate',
  'referer': '', // Bots podem não ter referer
  'accept': '*/*',
  'connection': 'keep-alive',
  'sec-ch-ua': '' // Bots não têm sec-ch-ua
};

// Headers de humano
const HUMAN_HEADERS = {
  'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  'accept-encoding': 'gzip, deflate, br',
  'referer': 'https://google.com/',
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'connection': 'keep-alive',
  'sec-ch-ua': '"Google Chrome";v="91", " Not;A Brand";v="99"'
};

async function testDetection(name, userAgent, headers) {
  try {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🧪 Testando: ${name}`);
    console.log(`${'='.repeat(60)}`);

    const response = await fetch(`${BASE_URL}/api/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        ...headers
      }
    });

    const text = await response.text();

    // Verificar se é JSON válido
    if (!text.startsWith('{')) {
      console.error(`❌ Resposta não é JSON. Status: ${response.status}`);
      console.error(`   Primeiros 200 chars: ${text.substring(0, 200)}`);
      return null;
    }

    const data = JSON.parse(text);

    console.log(`✅ User-Agent: ${userAgent.substring(0, 80)}...`);
    console.log(`🤖 Resultado: ${data.isBot ? '🚨 BOT DETECTADO' : '✨ HUMANO DETECTADO'}`);
    console.log(`📊 Score: ${data.score}/100`);
    console.log(`🎯 Confiança: ${data.confidence}`);
    console.log(`💾 Cache Hit: ${data.cached ? 'Sim' : 'Não'}`);
    console.log(`📋 Recomendação: ${data.recommendation}`);

    if (data.scoreBreakdown) {
      console.log(`\n📈 Score Breakdown:`);
      Object.entries(data.scoreBreakdown).forEach(([key, value]) => {
        console.log(`   - ${key}: ${value}`);
      });
    }

    return data;
  } catch (error) {
    console.error(`❌ Erro ao testar ${name}:`, error.message);
  }
}

async function checkServerHealth() {
  try {
    console.log('\n🔍 Verificando se o servidor está rodando...\n');
    const response = await fetch(`${BASE_URL}/`);
    const text = await response.text();

    if (text.includes('Carregando') || text.includes('Oferta') || text.includes('Educativo')) {
      console.log('✅ Servidor está rodando em http://localhost:3000');
      return true;
    } else {
      console.log('⚠️  Servidor respondeu mas com conteúdo inesperado');
      return true;
    }
  } catch (error) {
    console.error('❌ ERRO: O servidor NÃO está rodando!');
    console.error(`   Certifique-se de executar: npm run dev`);
    console.error(`   ou: next dev\n`);
    return false;
  }
}

async function runAllTests() {
  console.log('\n');
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║          🤖 TESTE DE DETECÇÃO DE BOT - PASCHA 🤖          ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  // Verificar saúde do servidor
  const serverOk = await checkServerHealth();
  if (!serverOk) {
    return;
  }

  // Testar bots
  console.log('\n📍 TESTANDO BOTS CONHECIDOS:\n');
  await testDetection('Google Bot', USER_AGENTS.googleBot, BOT_HEADERS);
  await testDetection('Bing Bot', USER_AGENTS.bingBot, BOT_HEADERS);
  await testDetection('Yandex Bot', USER_AGENTS.yandexBot, BOT_HEADERS);
  await testDetection('Facebook Bot', USER_AGENTS.facebookBot, BOT_HEADERS);

  // Testar navegadores normais
  console.log('\n\n📍 TESTANDO NAVEGADORES NORMAIS (HUMANOS):\n');
  await testDetection('Chrome', USER_AGENTS.chrome, HUMAN_HEADERS);
  await testDetection('Firefox', USER_AGENTS.firefox, HUMAN_HEADERS);
  await testDetection('Safari', USER_AGENTS.safari, HUMAN_HEADERS);
  await testDetection('Edge', USER_AGENTS.edge, HUMAN_HEADERS);

  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    ✅ TESTES CONCLUÍDOS                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
}

// Executar testes
runAllTests().catch(console.error);
