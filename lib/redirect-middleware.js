/**
 * Middleware de Redirecionamento para Bot Detection
 * Redireciona automaticamente bots e humanos para páginas corretas
 */

/**
 * Determina para qual página redirecionar baseado em resultado de detecção
 * @param {Object} detection - Resultado de detecção { isBot, confidence, recommendation }
 * @param {string} minConfidence - Confiança mínima para redirecionar (padrão: 'high')
 * @returns {string|null} Caminho para redirecionar ou null se não deve redirecionar
 */
export function getRedirectPath(detection, minConfidence = 'high') {
  const { isBot, confidence, recommendation } = detection;

  if (!detection || isBot === null || isBot === undefined) {
    console.log('[REDIRECT] Sem resultado de detecção ainda, não redirecionando');
    return null;
  }

  const confidenceLevels = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
  const currentLevel = confidenceLevels[confidence] || 0;
  const minimumLevel = confidenceLevels[minConfidence] || 0;
  const hasEnoughConfidence = currentLevel >= minimumLevel;

  console.log('[REDIRECT] Analisando resultado:', {
    isBot,
    confidence,
    currentLevel,
    minimumLevel,
    hasEnoughConfidence,
    recommendation
  });

  // Bot detectado com confiança suficiente
  if (isBot && hasEnoughConfidence) {
    console.log('[REDIRECT] ➡️ Bot detectado com confiança', confidence, '→ /bot-advocacia');
    return '/bot-advocacia';
  }

  // Humano detectado com confiança suficiente
  if (!isBot && hasEnoughConfidence) {
    console.log('[REDIRECT] ➡️ Humano detectado com confiança', confidence, '→ /humano/compliance');
    return '/humano/compliance'; // Ou página principal de humano
  }

  // Confiança baixa - fallback seguro para humano
  if (!hasEnoughConfidence) {
    console.log('[REDIRECT] ⚠️ Confiança insuficiente (', confidence, '), fallback para humano');
    return '/humano/compliance';
  }

  return null;
}

/**
 * Redireciona no lado do servidor (getServerSideProps)
 * @param {Object} context - Contexto do Next.js
 * @param {Object} detection - Resultado de detecção
 * @param {string} minConfidence - Confiança mínima
 * @returns {Object|null} Objeto de redirect ou null
 */
export function getServerSideRedirect(context, detection, minConfidence = 'high') {
  const redirectPath = getRedirectPath(detection, minConfidence);

  if (redirectPath) {
    console.log('[REDIRECT] Server-side redirect para:', redirectPath);
    return {
      redirect: {
        destination: redirectPath,
        permanent: false
      }
    };
  }

  return null;
}

/**
 * Hook para redirecionamento no lado do cliente
 * Usa router.push() do Next.js
 * @param {Object} detection - Resultado de detecção
 * @param {string} minConfidence - Confiança mínima
 * @param {boolean} shouldRedirect - Se deve redirecionar ou apenas analisar
 */
export function useClientRedirect(detection, minConfidence = 'high', shouldRedirect = true) {
  const router = typeof window !== 'undefined' ? require('next/router').useRouter() : null;

  // Apenas em client-side
  if (typeof window === 'undefined') {
    return { redirect: null };
  }

  if (!router) {
    console.warn('[REDIRECT] Next.js router não disponível');
    return { redirect: null };
  }

  const redirectPath = getRedirectPath(detection, minConfidence);

  if (redirectPath && shouldRedirect) {
    console.log('[REDIRECT] Client-side redirect para:', redirectPath);
    // Usar useEffect para redirecionar (não bloqueia render)
    React.useEffect(() => {
      router.push(redirectPath);
    }, [redirectPath, router]);
  }

  return {
    redirect: redirectPath,
    shouldRedirect: shouldRedirect && !!redirectPath
  };
}

/**
 * Middleware de redirecionamento automático para getServerSideProps
 * Já redireciona automaticamente baseado em detecção
 *
 * Uso em getServerSideProps:
 * ```
 * const detection = await fetch('/api/detect').then(r => r.json());
 * const redirect = getServerSideRedirect(context, detection);
 * if (redirect) return redirect;
 * ```
 */
export function detectAndRedirect(detection, context = null, minConfidence = 'high') {
  const { isBot, confidence, recommendation } = detection || {};

  // Validações
  if (!detection || isBot === null || isBot === undefined) {
    console.warn('[REDIRECT] Detecção inválida, não redirecionando');
    return { shouldRedirect: false };
  }

  const confidenceLevels = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
  const currentLevel = confidenceLevels[confidence] || 0;
  const minimumLevel = confidenceLevels[minConfidence] || 0;

  console.log('[REDIRECT] Analisando redirecionamento:', {
    isBot,
    confidence,
    minConfidence,
    currentLevel,
    minimumLevel
  });

  const shouldRedirect = currentLevel >= minimumLevel;

  let path = null;
  if (shouldRedirect) {
    path = isBot ? '/bot-advocacia' : '/humano/compliance';
  } else if (currentLevel < minimumLevel) {
    // Fallback seguro para humano se confiança baixa
    path = '/humano/compliance';
  }

  return {
    shouldRedirect: !!path,
    path,
    isBot,
    confidence,
    recommendation
  };
}

/**
 * Utilitário para exibir mensagem de redirecionamento
 * (útil para debug)
 */
export function getRedirectMessage(detection, minConfidence = 'high') {
  const { isBot, confidence, score, recommendation } = detection || {};

  if (!detection) {
    return 'Aguardando detecção...';
  }

  const messages = {
    bot_high: `🤖 Bot detectado (Score: ${score}/100, Confiança: ${confidence}) → Página Educacional`,
    bot_low: `⚠️ Possível bot (Confiança baixa) → Página Educacional`,
    human_high: `✅ Humano detectado (Score: ${score}/100, Confiança: ${confidence}) → Página de Vendas`,
    human_low: `⚠️ Indeterminado (Confiança baixa) → Fallback para Humano`
  };

  const confidenceLevels = { 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
  const hasHighConfidence = (confidenceLevels[confidence] || 0) >= (confidenceLevels[minConfidence] || 0);

  if (isBot && hasHighConfidence) return messages.bot_high;
  if (isBot && !hasHighConfidence) return messages.bot_low;
  if (!isBot && hasHighConfidence) return messages.human_high;
  return messages.human_low;
}

/**
 * Component para exibir status de redirecionamento
 */
export function RedirectStatus({ detection, minConfidence = 'high', visible = true }) {
  if (!visible || typeof window === 'undefined') {
    return null;
  }

  const message = getRedirectMessage(detection, minConfidence);
  const redirectInfo = detectAndRedirect(detection, null, minConfidence);

  return (
    <div
      style={{
        padding: '10px 15px',
        background: redirectInfo.shouldRedirect
          ? (redirectInfo.isBot ? '#fff3cd' : '#d4edda')
          : '#f8d7da',
        border: `1px solid ${redirectInfo.shouldRedirect
          ? (redirectInfo.isBot ? '#ffc107' : '#28a745')
          : '#dc3545'}`,
        borderRadius: '4px',
        marginBottom: '20px',
        fontSize: '14px',
        color: redirectInfo.shouldRedirect
          ? (redirectInfo.isBot ? '#856404' : '#155724')
          : '#721c24'
      }}
    >
      <strong>Status de Detecção:</strong> {message}
    </div>
  );
}

export default {
  getRedirectPath,
  getServerSideRedirect,
  useClientRedirect,
  detectAndRedirect,
  getRedirectMessage,
  RedirectStatus
};
