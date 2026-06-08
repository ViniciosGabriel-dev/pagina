#!/usr/bin/env node

/**
 * 🔍 Test Specific Bot
 *
 * Testa um bot específico manualmente.
 * Use: node scripts/test-specific-bot.js "Googlebot" "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
 */

const http = require('http');
const colors = require('./colors');

const botName = process.argv[2] || 'Custom Bot';
const userAgent = process.argv[3] || 'Mozilla/5.0 (compatible; Test/1.0)';

console.log('\n' + colors.cyan('═'.repeat(100)));
console.log(colors.cyan(`🔍 TESTING: ${botName}`));
console.log(colors.cyan('═'.repeat(100)) + '\n');

console.log(colors.bold('Details:'));
console.log(`  User Agent: ${userAgent}`);
console.log(`  URL: http://localhost:3000/api/detect\n`);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/detect',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': userAgent,
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

      console.log(colors.bold('Response:\n'));
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  isBot: ${colors.bold(result.isBot ? colors.red('true') : colors.green('false'))}`);
      console.log(`  Score: ${result.score}`);
      console.log(`  Confidence: ${result.confidence}`);
      console.log(`  Recommendation: ${result.recommendation}`);
      console.log(`  Detected By: ${result.detectedBy}`);

      console.log('\n' + colors.cyan('═'.repeat(100)) + '\n');

      if (result.isBot) {
        console.log(colors.yellow('⚠️  This is detected as a BOT'));
      } else {
        console.log(colors.green('✓ This is detected as a HUMAN'));
      }

      console.log('');
    } catch (e) {
      console.error(colors.red(`Error parsing response: ${e.message}`));
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(colors.red(`Connection error: ${e.message}`));
  console.error(colors.red('Make sure the server is running: npm run dev'));
  process.exit(1);
});

req.write(JSON.stringify({}));
req.end();
