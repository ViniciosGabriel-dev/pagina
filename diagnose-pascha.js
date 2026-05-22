/**
 * Script de Diagnóstico da API PASCHA
 * Testa a conexão e os endpoints
 */

const API_URL = process.env.NEXT_PUBLIC_PASCHA_URL || 'https://cloacker-production-849d.up.railway.app';
const API_KEY = process.env.PASCHA_API_KEY || '57473cb2771ac49531c7657889d09e26a837aa67189ac317c8106c6675e37134';
const ML_KEY = process.env.PASCHA_ML_KEY || 'e00f03de849b0655a227893a48372690a54bb921e98b537e66128b19703e4f5e';

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║            🔍 DIAGNÓSTICO DA API PASCHA 🔍                ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

console.log('📋 Configuração:');
console.log(`   URL: ${API_URL}`);
console.log(`   API_KEY: ${API_KEY.substring(0, 10)}...${API_KEY.substring(-10)}`);
console.log(`   ML_KEY: ${ML_KEY.substring(0, 10)}...${ML_KEY.substring(-10)}\n`);

async function testDetectVisitor() {
  console.log('═'.repeat(60));
  console.log('1️⃣  Testando POST /api/detect-visitor');
  console.log('═'.repeat(60));

  try {
    const payload = {
      ip: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      headers: {
        'accept-language': 'pt-BR,pt;q=0.9',
        'accept-encoding': 'gzip, deflate',
        'referer': 'https://google.com/'
      },
      geo: { country: 'BR' }
    };

    console.log('\n📤 Enviando payload:');
    console.log(JSON.stringify(payload, null, 2));

    const response = await fetch(`${API_URL}/api/detect-visitor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log(`\n📥 Status: ${response.status} ${response.statusText}`);

    const text = await response.text();
    console.log(`\n📄 Response (primeiros 500 chars):`);
    console.log(text.substring(0, 500));

    if (response.ok) {
      try {
        const data = JSON.parse(text);
        console.log('\n✅ Resposta JSON válida:');
        console.log(JSON.stringify(data, null, 2));
      } catch (e) {
        console.log('\n⚠️  Resposta não é JSON válido');
      }
    }

  } catch (error) {
    console.error(`\n❌ Erro: ${error.message}`);
  }
}

async function testMLCollect() {
  console.log('\n\n' + '═'.repeat(60));
  console.log('2️⃣  Testando POST /api/ml-collect');
  console.log('═'.repeat(60));

  try {
    const payload = {
      ip: '192.168.1.1',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      country: 'BR',
      detectionResult: {
        isBot: false,
        score: 15,
        scoreBreakdown: { userAgent: 10, headers: 5 }
      }
    };

    console.log('\n📤 Enviando payload:');
    console.log(JSON.stringify(payload, null, 2));

    const response = await fetch(`${API_URL}/api/ml-collect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ML_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log(`\n📥 Status: ${response.status} ${response.statusText}`);

    const text = await response.text();
    console.log(`\n📄 Response (primeiros 500 chars):`);
    console.log(text.substring(0, 500));

    if (response.ok) {
      try {
        const data = JSON.parse(text);
        console.log('\n✅ Resposta JSON válida:');
        console.log(JSON.stringify(data, null, 2));
      } catch (e) {
        console.log('\n⚠️  Resposta não é JSON válido');
      }
    }

  } catch (error) {
    console.error(`\n❌ Erro: ${error.message}`);
  }
}

async function testServerHealth() {
  console.log('\n\n' + '═'.repeat(60));
  console.log('3️⃣  Testando saúde geral do servidor');
  console.log('═'.repeat(60));

  try {
    const response = await fetch(API_URL);
    console.log(`\n✅ Servidor respondeu com status: ${response.status}`);
    const text = await response.text();
    console.log(`   Primeiros 200 chars: ${text.substring(0, 200)}`);
  } catch (error) {
    console.error(`\n❌ Erro ao acessar servidor: ${error.message}`);
  }
}

async function runDiagnostics() {
  await testServerHealth();
  await testDetectVisitor();
  await testMLCollect();

  console.log('\n\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                 ✅ DIAGNÓSTICO CONCLUÍDO                    ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
}

runDiagnostics().catch(console.error);
