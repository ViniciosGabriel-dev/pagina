const http = require('http');

const bots = [
  { name: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'Bingbot', ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)' },
  { name: 'Curl', ua: 'curl/7.64.1' },
  { name: 'Wget', ua: 'Wget/1.20.3' },
  { name: 'Python Requests', ua: 'python-requests/2.28.0' },
  { name: 'Headless Chrome (Playwright)', ua: 'HeadlessChrome/91.0.4472.124' },
  { name: 'Human Chrome', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { name: 'Human Safari', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15' },
];

async function testBot(bot) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({});

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/detect',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent': bot.ua,
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
            bot: bot.name,
            isBot: result.isBot,
            detectedBy: result.detectedBy || 'unknown',
          });
        } catch (e) {
          resolve({
            bot: bot.name,
            error: 'Parse error',
          });
        }
      });
    });

    req.on('error', (e) => {
      resolve({
        bot: bot.name,
        error: e.message,
      });
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('\n🤖 TESTE: Vercel Bot ID com User Agents Suspeitos\n');
  console.log('Nota: Em localhost, Bot ID não faz validação completa.');
  console.log('Em produção (vercel.app), o desafio client-side é obrigatório.\n');
  
  console.log('─'.repeat(80));
  console.log(`${'Bot Type'.padEnd(30)} | ${'Detectado Como'.padEnd(10)} | Verificador`);
  console.log('─'.repeat(80));

  for (const bot of bots) {
    const result = await testBot(bot);

    if (result.error) {
      console.log(`${result.bot.padEnd(30)} | ERROR: ${result.error}`);
    } else {
      const type = result.isBot ? '🤖 BOT' : '👤 HUMAN';
      console.log(`${result.bot.padEnd(30)} | ${type.padEnd(10)} | ${result.detectedBy}`);
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log('─'.repeat(80));
}

runTests().catch(console.error);
