/**
 * 🔀 Redirect Configuration
 *
 * Configura os redirects intelligentes baseado em:
 * - Se é bot (Google) ou humano (lead)
 * - UTM parameters (campaign source)
 * - Query parameters customizados
 */

/**
 * Página de cobrança da Paschoalotto
 * Esta é a página para a qual leads são redirecionados
 */
const COBRANCA_URL = process.env.NEXT_PUBLIC_COBRANCA_URL || 'https://pagoufacil.com.br';

/**
 * Tempo de delay antes do redirect (em ms)
 * Permite que Google crawle a página antes de redirecionar
 */
const REDIRECT_DELAY = parseInt(process.env.REDIRECT_DELAY || '2000');

/**
 * Determina se deve redirecionar baseado no tipo de visitante
 *
 * @param {Object} context - Next.js context (getServerSideProps)
 * @returns {Object} { shouldRedirect: boolean, redirectUrl: string, delayMs: number }
 */
function getRedirectConfig(context) {
  const isBot = context.props?.showLandingPage === true;
  const gclid = context.query?.gclid; // Google Ads parameter
  const fbclid = context.query?.fbclid; // Facebook Ads parameter
  const redirectTo = context.query?.redirect_to; // Custom redirect

  // Se for bot (Google), NÃO redireciona
  // Google vê a página de advocacia completa
  if (isBot) {
    console.log('[REDIRECT] Bot detected - showing advocacy page');
    return {
      shouldRedirect: false,
      redirectUrl: null,
      delayMs: 0,
      reason: 'bot-detected'
    };
  }

  // Se for humano (lead), redireciona para cobrança
  // Mantém os parâmetros de tracking (gclid, fbclid, etc)
  if (!isBot) {
    const redirectUrl = buildRedirectUrl(redirectTo || COBRANCA_URL, {
      gclid,
      fbclid,
      utm_source: context.query?.utm_source,
      utm_medium: context.query?.utm_medium,
      utm_campaign: context.query?.utm_campaign,
      utm_content: context.query?.utm_content,
      utm_term: context.query?.utm_term,
    });

    console.log(`[REDIRECT] Human detected - redirecting to: ${redirectUrl}`);
    return {
      shouldRedirect: true,
      redirectUrl,
      delayMs: REDIRECT_DELAY,
      reason: 'human-detected'
    };
  }
}

/**
 * Constrói URL de redirect mantendo parâmetros de tracking
 * @param {string} baseUrl - URL base
 * @param {Object} params - Parâmetros de query
 * @returns {string} URL completa com parâmetros
 */
function buildRedirectUrl(baseUrl, params) {
  const url = new URL(baseUrl);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}

/**
 * Gera o script de redirect para o cliente
 * Usa tanto meta refresh quanto JavaScript para máxima compatibilidade
 *
 * @param {string} redirectUrl - URL para redirecionar
 * @param {number} delayMs - Delay em millisegundos
 * @returns {string} HTML script para redirect
 */
function getRedirectScript(redirectUrl, delayMs = 2000) {
  const delaySeconds = Math.ceil(delayMs / 1000);

  return `
    <!-- Soft Redirect para Cobrança -->
    <!-- Meta refresh como fallback -->
    <meta http-equiv="refresh" content="${delaySeconds};url=${redirectUrl}" />

    <script>
      // Redirect via JavaScript (mais confiável)
      (function() {
        const redirectUrl = '${redirectUrl}';
        const delayMs = ${delayMs};

        // Aguarda o delay antes de redirecionar
        setTimeout(function() {
          window.location.href = redirectUrl;
        }, delayMs);

        // Monitora cliques - se clicar em link, vai direto
        document.addEventListener('click', function(e) {
          const target = e.target.closest('a');
          if (target && target.href === window.location.href) {
            // Clicou no link atual, vai pro redirect
            e.preventDefault();
            window.location.href = redirectUrl;
          }
        }, true);
      })();
    </script>
  `;
}

/**
 * Gera mensagem amigável durante o redirect
 * @param {number} delaySeconds - Segundos até redirecionar
 * @returns {string} HTML com mensagem
 */
function getRedirectMessage(delaySeconds = 2) {
  return `
    <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    ">
      <div style="
        text-align: center;
        color: white;
        max-width: 400px;
      ">
        <h1 style="margin-bottom: 20px; font-size: 28px;">
          Redirecionando...
        </h1>
        <p style="margin-bottom: 30px; font-size: 16px; opacity: 0.9;">
          Você será redirecionado para a página de cobrança em <span id="counter">${delaySeconds}</span> segundos.
        </p>
        <p style="font-size: 14px; opacity: 0.8;">
          Se não for redirecionado automaticamente,
          <a href="javascript:void(0)" style="color: white; text-decoration: underline; cursor: pointer;">
            clique aqui
          </a>
        </p>
      </div>
    </div>

    <script>
      let counter = ${delaySeconds};
      const counterEl = document.getElementById('counter');

      if (counterEl) {
        setInterval(function() {
          counter--;
          counterEl.textContent = counter;
        }, 1000);
      }

      document.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();
        // Redireciona imediatamente ao clicar
        window.location.href = document.location.href;
      });
    </script>
  `;
}

module.exports = {
  getRedirectConfig,
  buildRedirectUrl,
  getRedirectScript,
  getRedirectMessage,
  COBRANCA_URL,
  REDIRECT_DELAY,
};
