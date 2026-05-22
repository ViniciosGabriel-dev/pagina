/**
 * Cliente PASCHA - Integração com API de Bot Detection
 * Use este cliente para chamar a API PASCHA de qualquer lugar do projeto
 */

class PaschaClient {
  constructor(baseUrl, apiKey, mlKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.mlKey = mlKey;
  }

  /**
   * Detecta se visitante é bot ou humano
   * @param {Object} options - { ip, userAgent, headers, geo }
   * @returns {Promise<Object>} { isBot, score, confidence, recommendation, cached, scoreBreakdown }
   */
  async detectVisitor(options = {}) {
    const {
      ip = 'unknown',
      userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '',
      headers = {},
      geo = { country: 'unknown' }
    } = options;

    try {
      const response = await fetch(`${this.baseUrl}/api/detect-visitor`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ip,
          userAgent,
          headers,
          geo
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();

      if (result.scoreBreakdown) {
        console.log('[PASCHA] Score breakdown:', result.scoreBreakdown);
        console.log('[PASCHA] Cache hit:', result.cached);
      }

      return result;
    } catch (error) {
      console.error('[PASCHA] Erro ao detectar visitante:', error);
      // Fallback: considera humano se API falhar
      return {
        success: false,
        isBot: false,
        score: 0,
        confidence: 'low',
        recommendation: 'oferta',
        error: error.message
      };
    }
  }

  /**
   * Coleta dados do visitante para ML
   * @param {Object} data - { ip, userAgent, country, detectionResult }
   */
  async collectMLData(data) {
    try {
      const response = await fetch(`${this.baseUrl}/api/ml-collect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.mlKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        console.warn('[PASCHA] ML collection failed:', response.status);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('[PASCHA] Erro ao coletar dados ML:', error);
      return null;
    }
  }
}

// Criar instância global
const pascha = new PaschaClient(
  process.env.NEXT_PUBLIC_PASCHA_URL,
  process.env.PASCHA_API_KEY,
  process.env.PASCHA_ML_KEY
);

export default pascha;
