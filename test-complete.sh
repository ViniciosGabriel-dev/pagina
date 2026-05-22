#!/bin/bash

echo "=== TESTE COMPLETO PASCHA INTEGRATION ==="
echo ""

echo "1️⃣ Testando /api/detect com bot signature (Googlebot):"
curl -s -X POST http://localhost:3001/api/detect \
  -H "Content-Type: application/json" \
  -d '{"ip":"8.8.8.8","userAgent":"Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}' \
  | grep -o '"isBot":[^,]*\|"score":[^,]*\|"recommendation":"[^"]*'

echo ""
echo "2️⃣ Testando /api/detect com headers completos (humano real):"
curl -s -X POST http://localhost:3001/api/detect \
  -H "Content-Type: application/json" \
  -d '{
    "ip":"192.168.1.100",
    "userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "headers":{
      "accept-language":"pt-BR,pt;q=0.9",
      "accept-encoding":"gzip, deflate, br",
      "accept":"text/html,application/xhtml+xml,application/xml;q=0.9",
      "sec-ch-ua":"\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"120\""
    }
  }' \
  | grep -o '"isBot":[^,]*\|"score":[^,]*\|"recommendation":"[^"]*'

echo ""
echo "3️⃣ Testando homepage com Googlebot (Phase 1):"
curl -s http://localhost:3001 \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1)" \
  | grep -o 'showLandingPage[^,]*\|cloakingEnabled[^,]*' | head -2

echo ""
echo "4️⃣ Testando se PASCHA API está acessível:"
curl -s -I https://cloacker-production-849d.up.railway.app/api/detect-visitor 2>&1 | grep -i 'http\|connection' | head -1

echo ""
echo "✅ Testes completados!"
