#!/bin/bash

# 🔗 Test Bot Detection with curl
#
# Testa a detecção com curl (simulando bot de verdade)
# Use: bash scripts/test-with-curl.sh
#
# Nota: curl itself é um User Agent que deve ser detectado como bot!

echo ""
echo "═══════════════════════════════════════════════════════════════════════"
echo "🔗 TESTING BOT DETECTION WITH CURL"
echo "═══════════════════════════════════════════════════════════════════════"
echo ""

SERVER="http://localhost:3000"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Verificar se servidor está rodando
echo "⏳ Verificando conexão com servidor..."
if ! curl -s "$SERVER" > /dev/null 2>&1; then
  echo -e "${RED}❌ Erro: Servidor não está rodando em $SERVER${NC}"
  echo -e "${YELLOW}Execute: npm run dev${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Servidor conectado${NC}\n"

# Teste 1: Curl simples (deve ser detectado como bot)
echo -e "${BLUE}[TEST 1] curl simples${NC}"
echo "POST $SERVER/api/detect"
curl -X POST "$SERVER/api/detect" \
  -H "Content-Type: application/json" \
  -d '{}' \
  -s | jq '.'
echo ""

# Teste 2: Googlebot
echo -e "${BLUE}[TEST 2] Googlebot${NC}"
echo "POST $SERVER/api/detect -H 'User-Agent: Googlebot'"
curl -X POST "$SERVER/api/detect" \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" \
  -d '{}' \
  -s | jq '.'
echo ""

# Teste 3: Browser Chrome (deve ser detectado como humano)
echo -e "${BLUE}[TEST 3] Chrome Browser${NC}"
echo "POST $SERVER/api/detect -H 'User-Agent: Chrome'"
curl -X POST "$SERVER/api/detect" \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  -d '{}' \
  -s | jq '.'
echo ""

# Teste 4: Puppeteer
echo -e "${BLUE}[TEST 4] Puppeteer${NC}"
echo "POST $SERVER/api/detect -H 'User-Agent: HeadlessChrome'"
curl -X POST "$SERVER/api/detect" \
  -H "Content-Type: application/json" \
  -H "User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.124 Safari/537.36" \
  -d '{}' \
  -s | jq '.'
echo ""

echo -e "${CYAN}═══════════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Testes concluídos${NC}"
echo ""
