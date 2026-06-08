export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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

    const userAgent = req.headers['user-agent'] || '';
    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['cf-connecting-ip'] ||
               req.socket.remoteAddress ||
               'unknown';

    const response = await fetch(botDetectionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
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

    return res.status(200).json({
      success: true,
      isBot: detection.isBot,
      score: detection.score || (detection.isBot ? 95 : 5),
      confidence: detection.confidence || 'high',
      recommendation: detection.recommendation || (detection.isBot ? 'educativo' : 'oferta'),
      detectedBy: detection.detectedBy || 'external-api'
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
