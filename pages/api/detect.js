import { checkBotId } from 'botid/server';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await checkBotId({
      advancedOptions: { headers: req.headers }
    });

    return res.status(200).json({
      success: true,
      isBot: result.isBot,
      score: result.isBot ? 95 : 5,
      confidence: 'high',
      recommendation: result.isBot ? 'educativo' : 'oferta',
      detectedBy: 'vercel-botid'
    });

  } catch (error) {
    console.error('[DETECT API] Erro:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao processar detecção',
      isBot: false,
      recommendation: 'oferta'
    });
  }
}
