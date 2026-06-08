const http = require('http');

const bots = [
  { name: 'Googlebot', ua: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'Bingbot', ua: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)' },
  { name: 'Curl', ua: 'curl/7.64.1' },
  { name: 'Wget', ua: 'Wget/1.20.3' },
  { name: 'Python Requests', ua: 'python-requests/2.28.0' },
  { name: 'Playwright', ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
  { name: 'Puppeteer', ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.124 Safari/537.36' },
  { name: 'FacebookBot', ua: 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' },
  { name: 'TwitterBot', ua: 'Twitterbot/1.0' },
  { name: 'LinkedInBot', ua: 'LinkedInBot/1.0 (compatible; Mozilla/5.0; Apache-HttpClient +http://www.linkedin.com)' },
  { name: 'Chrome Lighthouse', ua: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Lighthouse' },
  { name: 'Human Chrome', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { name: 'Human Safari', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15' },
  { name: 'Human Firefox', ua: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/121.0' },
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
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
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
            ua: bot.ua.substring(0, 60) + '...',
            isBot: result.isBot,
            detectedBy: result.detectedBy || 'unknown',
            statusCode: res.statusCode,
          });
        } catch (e) {
          resolve({
            bot: bot.name,
            ua: bot.ua.substring(0, 60) + '...',
            error: 'Invalid JSON response',
            statusCode: res.statusCode,
          });
        }
      });
    });

    req.on('error', (e) => {
      resolve({
        bot: bot.name,
        ua: bot.ua.substring(0, 60) + '...',
        error: `Connection error: ${e.message}`,
      });
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('\n🤖 TESTE DE DETECÇÃO DE BOTS - Vercel Bot ID\n');
  console.log('═'.repeat(100));
  console.log(`${'Bot'.padEnd(25)} | ${'User Agent'.padEnd(60)} | ${'isBot'.padEnd(7)} | Detectado Por`);
  console.log('═'.repeat(100));

  let botsDetected = 0;
  let humansDetected = 0;

  for (const bot of bots) {
    const result = await testBot(bot);

    if (result.error) {
      console.log(`${result.bot.padEnd(25)} | ${result.ua.padEnd(60)} | ERROR: ${result.error}`);
    } else {
      const isBotText = result.isBot ? '✓ BOT' : '✗ HUMAN';
      console.log(
        `${result.bot.padEnd(25)} | ${result.ua.padEnd(60)} | ${isBotText.padEnd(7)} | ${result.detectedBy}`
      );

      if (result.isBot) botsDetected++;
      else humansDetected++;
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('═'.repeat(100));
  console.log(`\n📊 RESULTADOS:\n`);
  console.log(`✓ Bots Detectados: ${botsDetected}`);
  console.log(`✗ Humanos Detectados: ${humansDetected}`);
  console.log(`📈 Taxa de Detecção: ${((botsDetected / bots.length) * 100).toFixed(1)}%\n`);
}

runTests().catch(console.error);
