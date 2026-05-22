/**
 * API Route: Detecta visitante via PASCHA
 * Endpoint: POST /api/detect
 * Retorna: { isBot, score, recommendation, scoreBreakdown }
 */

import pascha from '@/lib/pascha-client';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extrair IP do visitante
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['cf-connecting-ip'] ||
               req.socket.remoteAddress ||
               'unknown';

    const userAgent = req.headers['user-agent'] || '';

    // Debug: Log all available IP headers
    console.log('[DETECT] IP extraction debug:', {
      'x-forwarded-for': req.headers['x-forwarded-for'],
      'cf-connecting-ip': req.headers['cf-connecting-ip'],
      'socket.remoteAddress': req.socket.remoteAddress,
      'final-ip': ip
    });

    // Coletar headers importantes
    const headers = {
      'accept-language': req.headers['accept-language'] || '',
      'accept-encoding': req.headers['accept-encoding'] || '',
      'referer': req.headers['referer'] || '',
      'accept': req.headers['accept'] || '',
      'connection': req.headers['connection'] || '',
      'sec-ch-ua': req.headers['sec-ch-ua'] || ''
    };

    // Debug: Verificar variáveis de ambiente
    const hasPaschaUrl = !!process.env.NEXT_PUBLIC_PASCHA_URL;
    const hasPaschaKey = !!process.env.PASCHA_API_KEY;
    const hasMlKey = !!process.env.PASCHA_ML_KEY;

    if (!hasPaschaUrl || !hasPaschaKey) {
      console.error('[DETECT] Variáveis de ambiente não configuradas:', {
        NEXT_PUBLIC_PASCHA_URL: hasPaschaUrl,
        PASCHA_API_KEY: hasPaschaKey,
        PASCHA_ML_KEY: hasMlKey
      });
    }

    // Debug: Log do que será enviado à API PASCHA
    console.log('[DETECT] Enviando para PASCHA:', {
      ip,
      userAgent: userAgent.substring(0, 50) + '...',
      headers,
      geo: req.geo || { country: 'unknown' }
    });

    // Chamar PASCHA API
    const detection = await pascha.detectVisitor({
      ip,
      userAgent,
      headers,
      geo: req.geo || { country: 'unknown' }
    });

    // Debug: Log da resposta da API PASCHA
    console.log('[DETECT] Resposta PASCHA:', {
      isBot: detection.isBot,
      score: detection.score,
      confidence: detection.confidence,
      cached: detection.cached,
      error: detection.error
    });

    // Coletar dados para ML de forma assíncrona (não bloqueia resposta)
    if (detection.success !== false) {
      pascha.collectMLData({
        ip,
        userAgent,
        country: req.geo?.country || 'unknown',
        detectionResult: {
          isBot: detection.isBot,
          score: detection.score,
          scoreBreakdown: detection.scoreBreakdown
        }
      }).catch(err => console.log('[ML] Error collecting data:', err));
    }

    // Log em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${ip}] Bot: ${detection.isBot} | Score: ${detection.score} | Cached: ${detection.cached}`);
    }

    return res.status(200).json({
      success: detection.success !== false,
      isBot: detection.isBot,
      score: detection.score,
      confidence: detection.confidence,
      recommendation: detection.recommendation,
      cached: detection.cached,
      scoreBreakdown: detection.scoreBreakdown,
      details: detection.details
    });

  } catch (error) {
    console.error('[DETECT API] Erro:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao processar detecção',
      isBot: false, // Fallback
      recommendation: 'oferta'
    });
  }
}
