// Mock fetch global para testes
if (!globalThis.fetch) {
  globalThis.fetch = jest.fn();
}

// Setup environment variables para testes
process.env.BOT_DETECTION_API_URL = 'http://localhost:3001/api/detect';
process.env.NEXT_PUBLIC_PASCHA_URL = process.env.NEXT_PUBLIC_PASCHA_URL || 'http://localhost:3001';
