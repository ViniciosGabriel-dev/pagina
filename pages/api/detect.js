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

    // [ÚNICA CAMADA] Vercel Bot ID Detection
    // Header injetado automaticamente por Vercel quando detecta bot
    const vercelBotId = req.headers['x-vercel-botid'];
    const isBot = vercelBotId === 'true';

    console.log(`[DETECT] ${isBot ? '🤖 Bot' : '👤 Human'} | IP: ${ip} | UA: ${userAgent.substring(0, 60)} | Source: Vercel Bot ID`);

    return res.status(200).json({
      success: true,
      isBot,
      score: isBot ? 95 : 5,
      confidence: 'high',
      recommendation: isBot ? 'educativo' : 'oferta',
      detectedBy: 'vercel-botid'
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
