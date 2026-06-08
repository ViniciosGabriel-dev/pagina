export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['cf-connecting-ip'] ||
               req.socket.remoteAddress ||
               'unknown';

    // [PHASE 1] Verificar Vercel Bot ID (nativo, instantâneo)
    const vercelBotId = req.headers['x-vercel-botid'] === 'true';
    if (vercelBotId) {
      console.log('[DETECT] 🤖 Bot detectado via Vercel Bot ID:', userAgent.substring(0, 80));
      return res.status(200).json({
        success: true,
        isBot: true,
        score: 95,
        confidence: 'very-high',
        recommendation: 'educativo',
        cached: false,
        source: 'vercel-botid'
      });
    }

    // [PHASE 2] Fallback: PASCHA API (para casos não detectados por Vercel)
    const botDetectionUrl = process.env.BOT_DETECTION_API_URL;

    if (!botDetectionUrl) {
      console.error('[DETECT] BOT_DETECTION_API_URL not configured');
      return res.status(500).json({
        success: false,
        error: 'Bot detection service not configured',
        isBot: false,
        recommendation: 'oferta'
      });
    }

    const apiKey = process.env.PASCHA_API_KEY || 'default-key';

    const response = await fetch(botDetectionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        ip,
        userAgent,
        headers: {
          'accept-language': req.headers['accept-language'] || '',
          'accept-encoding': req.headers['accept-encoding'] || '',
          'accept': req.headers['accept'] || '',
          'connection': req.headers['connection'] || '',
        },
      }),
    });

    if (!response.ok) {
      console.error(`[DETECT] Bot detection API error: ${response.status}`);
      return res.status(500).json({
        success: false,
        error: 'Bot detection service error',
        isBot: false,
        recommendation: 'oferta'
      });
    }

    const detection = await response.json();

    console.log(`[DETECT] 🔍 PASCHA fallback: ${detection.isBot ? '🤖 Bot' : '👤 Human'} | Score: ${detection.score} | UA: ${userAgent.substring(0, 60)}`);

    return res.status(200).json({
      success: true,
      isBot: detection.isBot,
      score: detection.score || (detection.isBot ? 95 : 5),
      confidence: detection.confidence || 'high',
      recommendation: detection.recommendation || (detection.isBot ? 'educativo' : 'oferta'),
      source: 'pascha-fallback'
    });

  } catch (error) {
    console.error('[DETECT API] Erro:', error.message);
    return res.status(500).json({
      success: false,
      error: 'Erro ao processar detecção',
      isBot: false,
      recommendation: 'oferta'
    });
  }
}
