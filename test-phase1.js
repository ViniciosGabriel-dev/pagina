const puppeteer = require('puppeteer');

async function testPhase1() {
  const browser = await puppeteer.launch();

  try {
    console.log('\n========== PHASE 1 TEST (CLOAKING_ENABLED=false) ==========\n');

    // Test 1: Human browser user agent
    console.log('TEST 1: Human browser (Chrome)');
    const pageHuman = await browser.newPage();
    await pageHuman.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await pageHuman.goto('http://localhost:3006', { waitUntil: 'networkidle2' });
    const htmlHuman = await pageHuman.content();

    const hasHeaderHuman = htmlHuman.includes('Paschoalotto');
    const hasLogoHuman = htmlHuman.includes('logo') || htmlHuman.includes('Logo');
    const hasSolutionsHuman = htmlHuman.includes('Regularize') || htmlHuman.includes('Regularizar');
    const hasFAQHuman = htmlHuman.includes('FAQ') || htmlHuman.includes('Perguntas');

    console.log(`  - Contains Paschoalotto: ${hasHeaderHuman}`);
    console.log(`  - Contains logo reference: ${hasLogoHuman}`);
    console.log(`  - Contains solutions/services: ${hasSolutionsHuman}`);
    console.log(`  - Contains FAQ: ${hasFAQHuman}`);
    console.log(`  ✅ Human browser should see landing page\n`);

    // Test 2: Googlebot user agent
    console.log('TEST 2: Googlebot');
    const pageBot = await browser.newPage();
    await pageBot.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

    await pageBot.goto('http://localhost:3006', { waitUntil: 'networkidle2' });
    const htmlBot = await pageBot.content();

    const hasHeaderBot = htmlBot.includes('Paschoalotto');
    const hasLogoBot = htmlBot.includes('logo') || htmlBot.includes('Logo');
    const hasSolutionsBot = htmlBot.includes('Regularize') || htmlBot.includes('Regularizar');
    const hasFAQBot = htmlBot.includes('FAQ') || htmlBot.includes('Perguntas');

    console.log(`  - Contains Paschoalotto: ${hasHeaderBot}`);
    console.log(`  - Contains logo reference: ${hasLogoBot}`);
    console.log(`  - Contains solutions/services: ${hasSolutionsBot}`);
    console.log(`  - Contains FAQ: ${hasFAQBot}`);
    console.log(`  ✅ Googlebot should see landing page (same as human)\n`);

    // Check if both are identical (same page content)
    if (hasHeaderHuman === hasHeaderBot &&
        hasLogoHuman === hasLogoBot &&
        hasSolutionsHuman === hasSolutionsBot &&
        hasFAQHuman === hasFAQBot) {
      console.log('✅ PHASE 1 VERIFIED: Both human and bot see the same landing page');
    } else {
      console.log('❌ PHASE 1 FAILED: Human and bot see different pages');
    }

    await pageHuman.close();
    await pageBot.close();

  } catch (error) {
    console.error('Test error:', error.message);
  } finally {
    await browser.close();
  }
}

testPhase1();
