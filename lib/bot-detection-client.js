/**
 * Client-side Bot Detection Utilities
 * Coleta dados do navegador e prepara para envio ao backend
 */

/**
 * Gera canvas fingerprint para detecção de headless browsers
 * @returns {string|null} Hash do canvas ou null se não suportado
 */
export async function getCanvasFingerprint() {
  try {
    // Verificar se canvas é suportado
    const canvas = document.createElement('canvas');
    if (!canvas.getContext) {
      console.log('[CANVAS] Canvas não suportado ou desabilitado');
      return null;
    }

    const ctx = canvas.getContext('2d');
    const text = 'Bot Detection Canvas Fingerprint 🤖';

    // Desenhar texto no canvas
    canvas.width = 280;
    canvas.height = 60;
    ctx.textBaseline = 'top';
    ctx.font = '16px Arial';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = '#069';
    ctx.fillText(text, 2, 15);
    ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
    ctx.fillText(text, 4, 17);

    // Obter dados do canvas
    const canvasData = canvas.toDataURL();

    // Simples hash do canvas data (não usa crypto)
    let hash = 0;
    for (let i = 0; i < canvasData.length; i++) {
      const char = canvasData.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    console.log('[CANVAS] Fingerprint gerado:', hash.toString(16));
    return {
      hash: hash.toString(16),
      supportsCanvas: true,
      dataLength: canvasData.length
    };
  } catch (error) {
    console.error('[CANVAS] Erro ao gerar fingerprint:', error.message);
    return null;
  }
}

/**
 * Coleta dados comportamentais do usuário
 * @param {number} duration - Tempo em ms para coletar dados (padrão: 5000)
 * @returns {Promise<Object>} Dados de comportamento
 */
export async function collectBehaviorData(duration = 5000) {
  return new Promise((resolve) => {
    const behaviorData = {
      mouseMovements: 0,
      clicks: 0,
      scrolls: 0,
      keyPresses: 0,
      touches: 0,
      startTime: Date.now(),
      endTime: null,
      viewportSize: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      screenSize: {
        width: window.screen.width,
        height: window.screen.height
      }
    };

    // Coletor de eventos
    const handleMouseMove = () => behaviorData.mouseMovements++;
    const handleClick = () => behaviorData.clicks++;
    const handleScroll = () => behaviorData.scrolls++;
    const handleKeyPress = () => behaviorData.keyPresses++;
    const handleTouchStart = () => behaviorData.touches++;

    // Registrar listeners
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('click', handleClick, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('keypress', handleKeyPress, { passive: true });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Cleanup após duração
    setTimeout(() => {
      behaviorData.endTime = Date.now();
      behaviorData.duration = behaviorData.endTime - behaviorData.startTime;

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keypress', handleKeyPress);
      document.removeEventListener('touchstart', handleTouchStart);

      console.log('[BEHAVIOR] Dados coletados:', behaviorData);
      resolve(behaviorData);
    }, duration);
  });
}

/**
 * Obtém headers relevantes do navegador para detecção
 * @returns {Object} Headers do cliente
 */
export function getClientHeaders() {
  try {
    const headers = {
      'accept-language': navigator.language || navigator.userLanguage || '',
      'accept': document.documentElement.lang ? 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' : '',
      'user-agent': navigator.userAgent || '',
    };

    // Verificar se há Vercel Bot ID (set pelo middleware do Vercel)
    if (typeof window !== 'undefined' && window.__vercelBotId) {
      headers['x-vercel-botid'] = window.__vercelBotId;
    }

    return headers;
  } catch (error) {
    console.error('[HEADERS] Erro ao obter headers:', error.message);
    return {};
  }
}

/**
 * Verifica se o navegador parece ser um bot baseado em features
 * Detecção simplista no cliente (o servidor é mais robusto)
 * @returns {Object} { isLikelyBot, reasons, score }
 */
export function detectBotSignals() {
  const signals = {
    isHeadless: false,
    hasNoNavigator: !navigator,
    hasNoWindow: typeof window === 'undefined',
    hasNoCookies: !navigator.cookieEnabled,
    hasNoPlugins: navigator.plugins && navigator.plugins.length === 0,
    webDriver: navigator.webdriver === true,
    chromeHeadless: /HeadlessChrome/.test(navigator.userAgent),
    phantomJS: /PhantomJS/.test(navigator.userAgent),
    zombie: /zombie/i.test(navigator.userAgent),
    puppeteer: /puppeteer/i.test(navigator.userAgent),
  };

  const detectedSignals = Object.entries(signals)
    .filter(([, value]) => value === true)
    .map(([key]) => key);

  const score = detectedSignals.length * 15; // Cada sinal = 15 pontos

  return {
    isLikelyBot: score >= 30,
    signals: detectedSignals,
    score: Math.min(score, 100),
  };
}

/**
 * Detecta visitante via chamada ao backend
 * Integra canvas fingerprint, behavior data e headers
 * @param {Object} options - { apiUrl, apiKey, timeout, collectBehavior }
 * @returns {Promise<Object>} { isBot, score, confidence, ... }
 */
export async function detectVisitor(options = {}) {
  const {
    apiUrl = process.env.NEXT_PUBLIC_PASCHA_URL || 'http://localhost:3001',
    apiKey = process.env.PASCHA_API_KEY,
    timeout = parseInt(process.env.NEXT_PUBLIC_PASCHA_TIMEOUT || '10000'),
    collectBehavior = true,
    collectCanvas = true
  } = options;

  try {
    console.log('[BOT_DETECTION] Iniciando detecção...', { apiUrl, timeout });

    // Coletar dados em paralelo
    const collectPromises = [];

    if (collectBehavior) {
      collectPromises.push(
        collectBehaviorData(2000).catch(err => {
          console.warn('[BEHAVIOR] Erro ao coletar:', err);
          return null;
        })
      );
    }

    if (collectCanvas) {
      collectPromises.push(
        Promise.resolve(getCanvasFingerprint()).catch(err => {
          console.warn('[CANVAS] Erro ao gerar:', err);
          return null;
        })
      );
    }

    // Aguardar coleta
    const [behaviorData, canvasFingerprint] = await Promise.all(collectPromises);

    // Detectar sinais de bot no cliente
    const clientBotSignals = detectBotSignals();
    if (clientBotSignals.isLikelyBot) {
      console.warn('[BOT_DETECTION] ⚠️ Sinais de bot detectados no cliente:', clientBotSignals.signals);
    }

    // Obter headers
    const headers = getClientHeaders();

    // Chamar API do backend
    const requestBody = {
      userAgent: navigator.userAgent,
      headers,
      ...(behaviorData && { behaviorData }),
      ...(canvasFingerprint && { canvasFingerprint }),
      clientSignals: clientBotSignals
    };

    console.log('[BOT_DETECTION] Enviando para backend:', {
      apiUrl: `${apiUrl}/api/detect-visitor`,
      dataSize: JSON.stringify(requestBody).length
    });

    // Fetch com timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${apiUrl}/api/detect-visitor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('[BOT_DETECTION] API error:', response.status, response.statusText);
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('[BOT_DETECTION] ✅ Resultado:', {
      isBot: result.isBot,
      score: result.score,
      confidence: result.confidence,
      cached: result.cached
    });

    return result;
  } catch (error) {
    console.error('[BOT_DETECTION] ❌ Erro:', error.message);

    // Fallback: considerar humano se houver erro
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
 * HOC para wrapping de componentes com detecção de bot
 * Renderiza componente diferente baseado em resultado de detecção
 * @param {Function} Component - Componente para humanos
 * @param {Function} BotComponent - Componente para bots
 * @returns {Function} Component wrapped
 */
export function withBotDetection(Component, BotComponent = null) {
  return function BotDetectionWrapper(props) {
    const [isBot, setIsBot] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      detectVisitor()
        .then(result => {
          setIsBot(result.isBot);
        })
        .catch(error => {
          console.error('[HOC] Error detecting bot:', error);
          setIsBot(false); // Fallback
        })
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
      return <div>Detectando visitante...</div>;
    }

    if (isBot && BotComponent) {
      return <BotComponent {...props} />;
    }

    return <Component {...props} />;
  };
}

export default {
  getCanvasFingerprint,
  collectBehaviorData,
  getClientHeaders,
  detectBotSignals,
  detectVisitor,
  withBotDetection
};
