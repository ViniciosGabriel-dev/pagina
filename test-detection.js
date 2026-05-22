#!/usr/bin/env node
/**
 * Script para testar bot detection com diferentes User-Agents e IPs
 * Simula requisições de bots, navegadores reais e diferentes IPs
 */

const baseUrl = 'http://localhost:3000';

const testCases = [
  {
    name: '✅ HUMANO - Chrome Browser',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    ip: '189.45.67.123' // IP brasileiro
  },
  {
    name: '✅ HUMANO - Firefox Browser',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    ip: '187.32.100.50'
  },
  {
    name: '✅ HUMANO - Safari (macOS)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
    ip: '152.43.89.200'
  },
  {
    name: '⚠️  BOT - Googlebot',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    ip: '66.249.66.1' // IP do Google
  },
  {
    name: '⚠️  BOT - cURL (típico de scripts)',
    userAgent: 'curl/7.64.1',
    ip: '203.0.113.45'
  },
  {
    name: '⚠️  BOT - Sem User-Agent',
    userAgent: '',
    ip: '198.51.100.10'
  },
  {
    name: '🌍 HUMANO - IP Americano',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    ip: '8.8.8.8' // Google DNS (simulando IP americano)
  },
  {
    name: '🌍 HUMANO - IP Europeu',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    ip: '185.89.218.100' // IP europeu
  },
  {
    name: '🔒 SUSPEITO - Proxy detectado',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
    ip: '10.0.0.1' // IP privado (proxy)
  },
];

async function testDetection(testCase) {
  try {
    const response = await fetch(`${baseUrl}/api/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': testCase.userAgent,
        'X-Forwarded-For': testCase.ip,
      }
    });

    const data = await response.json();

    console.log(`\n${testCase.name}`);
    console.log(`  IP: ${testCase.ip}`);
    console.log(`  User-Agent: ${testCase.userAgent || '(vazio)'}`);
    console.log(`  📊 Resultado: ${data.isBot ? '🤖 BOT' : '👤 HUMANO'}`);
    console.log(`  Score: ${data.score}/100`);
    console.log(`  Confiança: ${data.confidence}`);
    console.log(`  Cache: ${data.cached ? '✅ Sim' : '❌ Não'}`);

    if (data.scoreBreakdown) {
      console.log(`  Breakdown:`);
      Object.entries(data.scoreBreakdown).forEach(([key, value]) => {
        if (value > 0) console.log(`    - ${key}: ${value}`);
      });
    }

  } catch (error) {
    console.log(`\n${testCase.name}`);
    console.log(`  ❌ ERRO: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 TESTE DE DETECÇÃO DE BOTS');
  console.log('═'.repeat(60));
  console.log(`API: ${baseUrl}/api/detect\n`);

  for (const testCase of testCases) {
    await testDetection(testCase);
    // Pequeno delay entre testes
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ Testes concluídos!');
  console.log('\n📍 Para testar com IP REAL americano:');
  console.log('   1. Use uma VPN com servidor nos EUA');
  console.log('   2. Acesse http://localhost:3000');
  console.log('   3. Abra DevTools (F12) → Console');
  console.log('   4. Você verá: [HUMAN] ou [BOT DETECTED]\n');
}

runTests().catch(console.error);
