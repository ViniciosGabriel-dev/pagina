// puppeteer-bot-test/screenshot-as-bot.js
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Simular Googlebot
  await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');
  
  console.log('📸 Capturando página como Googlebot...');
  await page.goto('http://localhost:3002');
  
  // Esperar pela renderização
  await page.waitForTimeout(2000);
  
  // Tirar screenshot
  await page.screenshot({ 
    path: 'bot-view.png',
    fullPage: true 
  });
  
  console.log('✅ Screenshot salvo: bot-view.png');
  
  await browser.close();
})();
