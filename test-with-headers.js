/**
 * Test bot detection with simulated IPs
 * This tests the bot detection endpoint with different IPs and User-Agents
 */

async function testBotDetection() {
  const testCases = [
    {
      name: 'Googlebot from Brazil IP',
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      ip: '203.45.67.100',
      expectedBot: true
    },
    {
      name: 'Chrome browser from USA IP',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0.4472.124 Safari/537.36',
      ip: '192.168.1.100',
      expectedBot: false
    },
    {
      name: 'cURL from Brazil IP',
      userAgent: 'curl/7.64.1',
      ip: '189.45.67.123',
      expectedBot: true
    },
    {
      name: 'Safari from UK IP',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Safari/537.36',
      ip: '81.107.120.100',
      expectedBot: false
    }
  ];

  console.log('🤖 Bot Detection Test Suite\n');
  console.log('Testing http://localhost:3002/api/detect with X-Forwarded-For header\n');

  for (const testCase of testCases) {
    try {
      const response = await fetch('http://localhost:3002/api/detect', {
        method: 'POST',
        headers: {
          'User-Agent': testCase.userAgent,
          'X-Forwarded-For': testCase.ip,
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      const status = data.isBot === testCase.expectedBot ? '✅' : '❌';
      console.log(`${status} ${testCase.name}`);
      console.log(`   IP: ${testCase.ip}`);
      console.log(`   User-Agent: ${testCase.userAgent.substring(0, 60)}...`);
      console.log(`   Result: isBot=${data.isBot}, score=${data.score}, confidence=${data.confidence}`);
      console.log(`   Cached: ${data.cached}`);
      console.log('');

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.log(`❌ ${testCase.name}`);
      console.log(`   Error: ${error.message}\n`);
    }
  }
}

testBotDetection().catch(console.error);
