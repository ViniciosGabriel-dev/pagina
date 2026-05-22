#!/usr/bin/env node
/**
 * Script para testar bot detection em PRODUÇÃO (Vercel)
 */

const baseUrl = 'https://pagina-phi-five.vercel.app';

const testCases = [
  {
    name: '✅ HUMANO - Chrome Browser (Brasil)',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  },
  {
    name: '✅ HUMANO - Firefox Browser',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  },
  {
    name: '✅ HUMANO - Safari (macOS)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
  },
  {
    name: '⚠️  BOT - Googlebot',
    userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  },
  {
    name: '⚠️  BOT - cURL',
    userAgent: 'curl/7.64.1',
  },
  {
    name: '⚠️  BOT - Sem User-Agent',
    userAgent: '',
  },
];

async function testDetection(testCase, index) {
  try {
    const response = await fetch(`${baseUrl}/api/detect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': testCase.userAgent || 'unknown',
      }
    });

    const data = await response.json();

    const resultado = data.isBot ? '🤖 BOT' : '👤 HUMANO';
    const score = data.score || 0;
    const confidence = data.confidence || 'unknown';

    console.log(`\n${index + 1}. ${testCase.name}`);
    console.log(`   User-Agent: ${testCase.userAgent || '(vazio)'}`);
    console.log(`   📊 Resultado: ${resultado}`);
    console.log(`   Score: ${score}/100`);
    console.log(`   Confiança: ${confidence}`);
    console.log(`   Status: ${response.status}`);

    if (data.scoreBreakdown) {
      const nonZero = Object.entries(data.scoreBreakdown).filter(([_, v]) => v > 0);
      if (nonZero.length > 0) {
        console.log(`   Breakdown:`);
        nonZero.forEach(([key, value]) => {
          console.log(`     - ${key}: ${value}`);
        });
      }
    }

    return { test: testCase.name, resultado, score, success: true };
  } catch (error) {
    console.log(`\n${index + 1}. ${testCase.name}`);
    console.log(`   ❌ ERRO: ${error.message}`);
    return { test: testCase.name, error: error.message, success: false };
  }
}

async function runTests() {
  console.log('🚀 TESTE DE DETECÇÃO DE BOTS EM PRODUÇÃO');
  console.log('═'.repeat(70));
  console.log(`API: ${baseUrl}/api/detect\n`);

  const results = [];

  for (let i = 0; i < testCases.length; i++) {
    const result = await testDetection(testCases[i], i);
    results.push(result);
    // Delay entre testes para não sobrecarregar
    await new Promise(r => setTimeout(r, 1000));
  }

  // Resumo final
  console.log('\n' + '═'.repeat(70));
  console.log('📋 RESUMO DOS TESTES:\n');

  const humanTests = results.filter(r => r.success && r.resultado === '👤 HUMANO');
  const botTests = results.filter(r => r.success && r.resultado === '🤖 BOT');
  const failedTests = results.filter(r => !r.success);

  console.log(`✅ Humanos detectados: ${humanTests.length}`);
  humanTests.forEach(r => console.log(`   - ${r.test}`));

  console.log(`\n🤖 Bots detectados: ${botTests.length}`);
  botTests.forEach(r => console.log(`   - ${r.test}`));

  if (failedTests.length > 0) {
    console.log(`\n❌ Erros: ${failedTests.length}`);
    failedTests.forEach(r => console.log(`   - ${r.test}: ${r.error}`));
  }

  console.log('\n' + '═'.repeat(70));

  if (failedTests.length === 0 && humanTests.length > 0 && botTests.length > 0) {
    console.log('✅ TESTES PASSOU COM SUCESSO!');
    console.log('\n🎉 A detecção está funcionando corretamente em produção!');
  } else if (failedTests.length > 0) {
    console.log('⚠️  Houve erros. Verifique as variáveis de ambiente na Vercel.');
  } else {
    console.log('⚠️  Nenhum teste foi bem-sucedido. Verifique a conexão/API.');
  }

  console.log('');
}

runTests().catch(console.error);
