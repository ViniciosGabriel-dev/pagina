/**
 * Teste de Bot Detection com IPs Reais
 */

const BASE_URL = 'http://localhost:3006';

// IPs reais de bots conhecidos
const BOTS = {
  googleBot: {
    ip: '66.249.64.0',
    ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    name: 'Google Bot',
    headers: { 'accept-language': '', 'accept-encoding': 'gzip, deflate' }
  },
  bingBot: {
    ip: '207.46.13.0',
    ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    name: 'Bing Bot',
    headers: { 'accept-language': '', 'accept-encoding': 'gzip, deflate' }
  },
  facebookBot: {
    ip: '31.13.24.0',
    ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    name: 'Facebook Bot',
    headers: { 'accept-language': '', 'accept-encoding': 'gzip, deflate' }
  }
};

const HUMANS = {
  chrome: {
    ip: '192.168.1.100',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    name: 'Chrome (Humano)',
    headers: {
      'accept-language': 'pt-BR,pt;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'referer': 'https://google.com/'
    }
  }
};

async function testVisitor(config) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🧪 Testando: ${config.name}`);
  console.log(`${'='.repeat(60)}`);

  try {
    const response = await fetch(`${BASE_URL}/api/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': config.ua,
        'X-Forwarded-For': config.ip, // Passar IP customizado
        ...config.headers
      }
    });

    const data = await response.json();

    console.log(`✅ IP: ${config.ip}`);
    console.log(`✅ UA: ${config.ua.substring(0, 60)}...`);
    console.log(`\n🤖 RESULTADO: ${data.isBot ? '🚨 BOT DETECTADO' : '✨ HUMANO DETECTADO'}`);
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
  console.log('║     🤖 TESTE DE DETECÇÃO DE BOT - COM IPs REAIS 🤖       ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  console.log('\n🤖 BOTS:');
  for (const bot of Object.values(BOTS)) {
    await testVisitor(bot);
  }

  console.log('\n\n👤 HUMANOS:');
  for (const human of Object.values(HUMANS)) {
    await testVisitor(human);
  }

  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                    ✅ TESTES CONCLUÍDOS                     ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
}

run().catch(console.error);
