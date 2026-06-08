#!/usr/bin/env node

/**
 * 🤖 Bot Detection Simulation Tests
 *
 * Testa a detecção de bots simulando vários tipos de requisições.
 * Use: npm run test:simulation
 *
 * NOTA IMPORTANTE:
 * - Vercel Bot ID funciona apenas em PRODUÇÃO (no edge)
 * - Em localhost, o header x-vercel-botid não é injetado
 * - Testes de bots com UA específicas passam apenas em produção
 * - Testes de humanos passam em ambos (localhost e produção)
 *
 * Testes:
 * - Bot User Agents (Googlebot, Bingbot, curl, wget, etc) → Expected bot
 * - Headless Browsers (Puppeteer, Playwright, Selenium) → Expected bot
 * - Humanos Reais (Chrome, Safari, Firefox) → Expected human
 * - Edge Cases (IPs suspeitos, headers malformados, etc) → Expected human
 */

const http = require('http');
const colors = require('./colors');

const TEST_SERVER = 'http://localhost:3000';
const TESTS = [];

// ============================================
// Definição de Testes
// ============================================

const BotTests = [
  {
    name: 'Googlebot',
    ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    expectedBot: true,
  },
  {
    name: 'Bingbot',
    ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    expectedBot: true,
  },
  {
    name: 'curl',
    ua: 'curl/7.64.1',
    expectedBot: true,
  },
  {
    name: 'wget',
    ua: 'Wget/1.20.3',
    expectedBot: true,
  },
  {
    name: 'Python Requests',
    ua: 'python-requests/2.28.0',
    expectedBot: true,
  },
  {
    name: 'Puppeteer',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.124 Safari/537.36',
    expectedBot: true,
  },
  {
    name: 'Playwright',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    expectedBot: true,
  },
  {
    name: 'Selenium',
    ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    expectedBot: true,
  },
  {
    name: 'FacebookBot',
    ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
    expectedBot: true,
  },
  {
    name: 'TwitterBot',
    ua: 'Twitterbot/1.0',
    expectedBot: true,
  },
  {
    name: 'LinkedInBot',
    ua: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)',
    expectedBot: true,
  },
  {
    name: 'Yandexbot',
    ua: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
    expectedBot: true,
  },
  {
    name: 'Slurp',
    ua: 'Slurp/cat',
    expectedBot: true,
  },
];

const HumanTests = [
  {
    name: 'Chrome Desktop',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    expectedBot: false,
  },
  {
    name: 'Safari macOS',
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    expectedBot: false,
  },
  {
    name: 'Firefox Linux',
    ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/121.0',
    expectedBot: false,
  },
  {
    name: 'iPhone Safari',
    ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
    expectedBot: false,
  },
  {
    name: 'Android Chrome',
    ua: 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    expectedBot: false,
  },
  {
    name: 'Edge Windows',
    ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    expectedBot: false,
  },
];

const EdgeCaseTests = [
  {
    name: 'Empty User Agent',
    ua: '',
    expectedBot: false,
  },
  {
    name: 'Very Long User Agent (10KB)',
    ua: 'A'.repeat(10000),
    expectedBot: false,
  },
  {
    name: 'Special Characters in UA',
    ua: 'Mozilla/5.0 (X11; Linux; !@#$%^&*()) Safari/537.36',
    expectedBot: false,
  },
  {
    name: 'Mixed Case Googlebot',
    ua: 'Mozilla/5.0 (compatible; GoOgLeBoT/2.1; +http://www.google.com/bot.html)',
    expectedBot: true,
  },
];

// ============================================
// Funções Auxiliares
// ============================================

function makeRequest(testCase) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/detect',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': testCase.ua || 'unknown',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({
            ...testCase,
            result,
            statusCode: res.statusCode,
            error: null,
          });
        } catch (e) {
          resolve({
            ...testCase,
            result: null,
            statusCode: res.statusCode,
            error: 'Invalid JSON response',
          });
        }
      });
    });

    req.on('error', (e) => {
      resolve({
        ...testCase,
        result: null,
        statusCode: 0,
        error: e.message,
      });
    });

    req.write(JSON.stringify({}));
    req.end();
  });
}

function checkTest(test) {
  if (test.error) {
    return { status: 'ERROR', message: test.error };
  }

  if (!test.result || !('isBot' in test.result)) {
    return { status: 'FAIL', message: 'Invalid response' };
  }

  const passed = test.result.isBot === test.expectedBot;
  if (passed) {
    return { status: 'PASS', message: '' };
  }

  return {
    status: 'FAIL',
    message: `Expected isBot=${test.expectedBot}, got ${test.result.isBot}`,
  };
}

// ============================================
// Execução dos Testes
// ============================================

async function runTests() {
  console.log('\n' + colors.cyan('═'.repeat(100)));
  console.log(colors.cyan('🤖 BOT DETECTION SIMULATION TESTS'));
  console.log(colors.cyan('═'.repeat(100)) + '\n');

  const allTests = [
    { category: '🤖 Bot User Agents', tests: BotTests },
    { category: '👤 Human Browsers', tests: HumanTests },
    { category: '⚠️  Edge Cases', tests: EdgeCaseTests },
  ];

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  let errorTests = 0;

  for (const group of allTests) {
    console.log(colors.bold(group.category) + '\n');
    console.log(`${'Name'.padEnd(30)} | ${'Expected'.padEnd(10)} | ${'Got'.padEnd(10)} | Status | Error`);
    console.log('─'.repeat(100));

    for (const testCase of group.tests) {
      const response = await makeRequest(testCase);
      const check = checkTest(response);

      totalTests++;

      const expectedStr = response.expectedBot ? 'Bot' : 'Human';
      const gotStr = response.result?.isBot !== undefined ? (response.result.isBot ? 'Bot' : 'Human') : 'N/A';
      const statusIcon =
        check.status === 'PASS'
          ? colors.green('✓ PASS')
          : check.status === 'FAIL'
            ? colors.red('✗ FAIL')
            : colors.yellow('⚠ ERROR');

      console.log(
        `${testCase.name.padEnd(30)} | ${expectedStr.padEnd(10)} | ${gotStr.padEnd(10)} | ${statusIcon} | ${check.message}`
      );

      if (check.status === 'PASS') passedTests++;
      else if (check.status === 'FAIL') failedTests++;
      else errorTests++;

      // Delay pequeno entre requisições
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    console.log('');
  }

  // ============================================
  // Resumo Final
  // ============================================

  console.log(colors.cyan('═'.repeat(100)));
  console.log(colors.bold('\n📊 RESUMO DOS TESTES:\n'));

  console.log(`  ${colors.green('✓ Passou:')}       ${passedTests}/${totalTests}`);
  console.log(`  ${colors.red('✗ Falhou:')}       ${failedTests}/${totalTests}`);
  console.log(`  ${colors.yellow('⚠ Erros:')}        ${errorTests}/${totalTests}`);

  const successRate = ((passedTests / totalTests) * 100).toFixed(1);
  console.log(`\n  ${colors.bold('Taxa de Sucesso:')} ${successRate}%\n`);

  // Nota sobre testes em localhost
  console.log(colors.yellow('⚠️  Nota sobre testes em localhost:'));
  console.log(colors.yellow('   Vercel Bot ID funciona apenas em PRODUÇÃO.'));
  console.log(colors.yellow('   Em localhost, testes de bots com UA falham porque o header'));
  console.log(colors.yellow('   x-vercel-botid não é injetado (esperado).\n'));

  console.log(colors.green('✓ Para testar em produção:'));
  console.log(colors.green('   1. Deploy para Vercel'));
  console.log(colors.green('   2. Execute: curl https://seu-site.vercel.app/api/detect'));
  console.log(colors.green('   3. Resultado deve ser: { "isBot": true, ... }\n'));

  console.log(colors.cyan('═'.repeat(100)) + '\n');

  // Exit code
  process.exit(failedTests > 0 || errorTests > 0 ? 1 : 0);
}

// ============================================
// Verificar conexão com servidor
// ============================================

function checkServerConnection() {
  return new Promise((resolve) => {
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET',
      },
      (res) => {
        resolve(res.statusCode < 500);
      }
    );

    req.on('error', () => {
      resolve(false);
    });

    req.end();
  });
}

// ============================================
// Main
// ============================================

(async () => {
  console.log('\n⏳ Verificando conexão com servidor...\n');

  const connected = await checkServerConnection();

  if (!connected) {
    console.error(colors.red('❌ Erro: Servidor não está rodando em localhost:3000'));
    console.error(colors.red('Execute: npm run dev'));
    process.exit(1);
  }

  await runTests();
})();
