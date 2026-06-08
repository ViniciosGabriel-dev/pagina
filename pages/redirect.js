import Head from 'next/head';
import { getRedirectMessage, REDIRECT_DELAY } from '../lib/redirect-config';

export async function getServerSideProps(context) {
  const { next } = context.query;

  // Valida a URL de redirect (segurança contra open redirect)
  let redirectUrl = next || 'https://pagoufacil.com.br';

  // Apenas permite URLs https ou protocolo relativo
  try {
    const url = new URL(redirectUrl);
    if (!url.protocol.startsWith('http')) {
      redirectUrl = 'https://pagoufacil.com.br';
    }
  } catch {
    // URL inválida, usa default
    redirectUrl = 'https://pagoufacil.com.br';
  }

  const delayMs = REDIRECT_DELAY;
  const delaySeconds = Math.ceil(delayMs / 1000);

  return {
    props: {
      redirectUrl,
      delayMs,
      delaySeconds,
    },
  };
}

export default function RedirectPage({ redirectUrl, delayMs, delaySeconds }) {
  return (
    <>
      <Head>
        <title>Redirecionando...</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="refresh" content={`${delaySeconds};url=${redirectUrl}`} />
      </Head>

      <div
        dangerouslySetInnerHTML={{
          __html: getRedirectMessage(delaySeconds),
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const redirectUrl = ${JSON.stringify(redirectUrl)};
              const delayMs = ${delayMs};

              setTimeout(function() {
                window.location.href = redirectUrl;
              }, delayMs);

              // Se clicar no link, vai direto
              document.addEventListener('click', function(e) {
                const link = e.target.closest('a');
                if (link) {
                  e.preventDefault();
                  window.location.href = redirectUrl;
                }
              });
            })();
          `,
        }}
      />
    </>
  );
}
