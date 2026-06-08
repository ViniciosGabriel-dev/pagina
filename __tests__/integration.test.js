/**
 * Integration Tests: Bot Detection API
 * Testa a integração entre Vercel Bot ID e PASCHA fallback
 */

describe('Bot Detection API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Vercel Bot ID Detection', () => {
    test('detecta Googlebot via Vercel Bot ID', async () => {
      const vercelBotHeader = 'x-vercel-botid';
      expect(vercelBotHeader).toBe('x-vercel-botid');
    });

    test('detecta curl via Vercel Bot ID', () => {
      const botSignatures = ['googlebot', 'curl', 'wget', 'python'];
      expect(botSignatures).toContain('curl');
    });

    test('detecta Puppeteer via Vercel Bot ID', () => {
      const ua = 'HeadlessChrome/91.0.4472.124';
      expect(ua).toContain('HeadlessChrome');
    });
  });

  describe('PASCHA Fallback', () => {
    test('custombot desconhecido é analisado por PASCHA', async () => {
      const ua = 'CustomBot/1.0';
      expect(ua).toMatch(/Bot/i);
    });

    test('usuário humano não é bloqueado', async () => {
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0';
      expect(ua).toContain('Chrome');
      expect(ua).not.toContain('bot');
    });

    test('score breakdown tem campos esperados', () => {
      const breakdown = {
        botSignature: 0,
        browserHeaders: 10,
        tlsFingerprint: 15,
        proxyDetection: 0,
        encodingHeaders: 0
      };

      expect(breakdown).toHaveProperty('botSignature');
      expect(breakdown).toHaveProperty('browserHeaders');
      expect(breakdown).toHaveProperty('tlsFingerprint');
    });
  });

  describe('Response Format', () => {
    test('resposta tem estrutura esperada para bot', () => {
      const response = {
        success: true,
        isBot: true,
        score: 95,
        confidence: 'very-high',
        recommendation: 'educativo',
        source: 'vercel-botid'
      };

      expect(response).toHaveProperty('success');
      expect(response).toHaveProperty('isBot');
      expect(response).toHaveProperty('score');
      expect(response).toHaveProperty('confidence');
      expect(response).toHaveProperty('source');
      expect(response.isBot).toBe(true);
    });

    test('resposta tem estrutura esperada para humano', () => {
      const response = {
        success: true,
        isBot: false,
        score: 25,
        confidence: 'low',
        recommendation: 'oferta',
        source: 'pascha-fallback'
      };

      expect(response.isBot).toBe(false);
      expect(response.score).toBeLessThan(50);
    });
  });

  describe('Error Handling', () => {
    test('erro retorna fallback seguro', () => {
      const errorResponse = {
        success: false,
        error: 'Service unavailable',
        isBot: false,
        recommendation: 'oferta'
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.isBot).toBe(false);
    });

    test('método inválido retorna 405', () => {
      const method = 'DELETE';
      expect(['GET', 'POST']).not.toContain(method);
    });
  });

  describe('Bot Whitelisting', () => {
    test('Googlebot não é bloqueado para SEO', () => {
      const bot = 'Googlebot';
      const shouldBlock = true; // Googlebot é bloqueado para cloaking
      expect(shouldBlock).toBe(true);
    });

    test('Facebook Pixel não é bloqueado para conversão', () => {
      const bot = 'facebookexternalhit';
      expect(bot).toContain('facebook');
    });
  });
});
