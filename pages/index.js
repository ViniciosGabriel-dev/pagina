import { useState, useEffect } from 'react';
import Head from 'next/head';

function collectCanvasFingerprint() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 50;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#333';
    ctx.fillText('PASCHA-FP-2024 🔍', 2, 2);
    ctx.fillStyle = 'rgba(102,204,0,0.7)';
    ctx.fillRect(125, 1, 62, 20);

    return canvas.toDataURL();
  } catch (error) {
    console.error('[CANVAS] Fingerprinting error:', error);
    return null;
  }
}

function useBehaviorCollector(onBehaviorCollected, shouldCollect) {
  useEffect(() => {
    if (!shouldCollect) return;

    let mouseEvents = [];
    let scrollEvents = [];
    let clickEvents = [];
    let collectionTimeout;

    const handleMouseMove = (e) => {
      mouseEvents.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
    };

    const handleScroll = () => {
      scrollEvents.push({
        scrollY: window.scrollY,
        timestamp: Date.now()
      });
    };

    const handleClick = (e) => {
      clickEvents.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
    };

    const sendBehaviorData = () => {
      const deviceInfo = {
        hardwareConcurrency: navigator.hardwareConcurrency || 1,
        deviceMemory: navigator.deviceMemory || 4,
        colorDepth: screen.colorDepth || 24
      };

      const behaviorData = {
        mouseEvents: mouseEvents.length > 0 ? mouseEvents : null,
        scrollEvents: scrollEvents.length > 0 ? scrollEvents : null,
        clickEvents: clickEvents.length > 0 ? clickEvents : null,
        deviceInfo
      };

      const canvasFingerprint = collectCanvasFingerprint();

      if (onBehaviorCollected) {
        onBehaviorCollected({ behaviorData, canvasFingerprint });
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);

    collectionTimeout = setTimeout(sendBehaviorData, 3000);

    return () => {
      clearTimeout(collectionTimeout);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
    };
  }, [onBehaviorCollected, shouldCollect]);
}

function LandingPageAdvocacia() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.6 }}>
      <Head>
        <title>Renegociação de Dívidas - Seus Direitos Explicados</title>
        <meta name="description" content="Entenda como funciona a renegociação legal de dívidas e seus direitos como consumidor." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '2.5em', color: '#1a5490', textAlign: 'center', marginBottom: '30px' }}>
          Entenda Seus Direitos nas Renegociações de Dívidas
        </h1>

        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h2 style={{ color: '#1a5490', borderBottom: '2px solid #1a5490', paddingBottom: '10px' }}>
            O que é Dívida Prescrita?
          </h2>
          <p>
            De acordo com o Código Civil Brasileiro, a maioria das dívidas prescreve em 5 anos, o que significa que
            após esse período, o credor não pode mais cobrar judicialmente. Porém, a cobrança abusiva continua sendo
            crime, mesmo de dívidas recentes.
          </p>
          <p>
            Saiba mais sobre prescrição de dívidas no <a href="https://pt.wikipedia.org/wiki/Prescri%C3%A7%C3%A3o_(direito)" target="_blank" rel="noopener noreferrer" style={{ color: '#1a5490' }}>artigo sobre prescrição</a>.
          </p>
        </section>

        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h2 style={{ color: '#1a5490', borderBottom: '2px solid #1a5490', paddingBottom: '10px' }}>
            Código de Defesa do Consumidor
          </h2>
          <p>
            O Código de Defesa do Consumidor (Lei 8.078/90) protege você contra cobranças abusivas. Exemplos de
            práticas proibidas incluem:
          </p>
          <ul>
            <li>Chamadas em horários inapropriados (madrugada, fins de semana sem aviso prévio)</li>
            <li>Constrangimento público ou ameaças</li>
            <li>Divulgação de dados em redes sociais ou listas de devedores</li>
            <li>Juros e multas que excedem o contrato original</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h2 style={{ color: '#1a5490', borderBottom: '2px solid #1a5490', paddingBottom: '10px' }}>
            Como Funciona a Renegociação Legal de Dívidas
          </h2>
          <p>
            Uma renegociação legítima deve seguir estes passos:
          </p>
          <ol>
            <li><strong>Análise da dívida:</strong> Verificar se é válida, se prescreveu e se há cobranças abusivas</li>
            <li><strong>Negociação com credor:</strong> Propor parcelamento ou redução</li>
            <li><strong>Documentação:</strong> Tudo por escrito (e-mail ou contrato assinado)</li>
            <li><strong>Pagamento:</strong> Apenas após acordo formalizado</li>
          </ol>
        </section>

        <section style={{ marginBottom: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h2 style={{ color: '#1a5490', borderBottom: '2px solid #1a5490', paddingBottom: '10px' }}>
            Perguntas Frequentes
          </h2>
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#333' }}>Posso ser preso por dívida?</h3>
            <p>Não. A prisão por dívida foi abolida no Brasil (exceto para débitos de alimentos).</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#333' }}>Quanto tempo uma dívida pode ser cobrada?</h3>
            <p>Geralmente 5 anos. Após esse período, a dívida prescreve e não pode ser cobrada judicialmente.</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#333' }}>Posso negar uma renegociação proposta?</h3>
            <p>Sim. Você não é obrigado a aceitar nenhuma proposta de renegociação que não lhe convém.</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <h3 style={{ color: '#333' }}>Devo aceitar a primeira proposta?</h3>
            <p>Não necessariamente. É recomendado avaliar várias opções antes de tomar uma decisão.</p>
          </div>
        </section>

        <footer style={{ textAlign: 'center', borderTop: '1px solid #ddd', paddingTop: '20px', marginTop: '40px', color: '#666' }}>
          <p>© 2024 | Conteúdo Educativo Público | Renegociação de Dívidas</p>
          <p style={{ fontSize: '0.9em' }}>Este é um conteúdo informativo geral e não constitui aconselhamento jurídico.</p>
        </footer>
      </div>
    </div>
  );
}

function SalesPageAdvocacia({ whatsappPhone }) {
  const [faqOpen, setFaqOpen] = useState(0);
  const [detectionRefinement, setDetectionRefinement] = useState(null);

  const handleBehaviorCollected = async ({ behaviorData, canvasFingerprint }) => {
    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ behaviorData, canvasFingerprint })
      });

      const refinedDetection = await response.json();
      if (refinedDetection.isBot !== undefined) {
        setDetectionRefinement(refinedDetection.isBot);
      }
    } catch (error) {
      console.error('[BEHAVIOR] Refinement error:', error);
    }
  };

  useBehaviorCollector(handleBehaviorCollected, true);

  const faqs = [
    {
      q: 'Já tem dívidas? Podemos renegociar!',
      a: 'Temos experência em renegociar dívidas de forma legal e segura. Entre em contato conosco pelo WhatsApp e conheça nossas soluções.'
    },
    {
      q: 'Dívida prescrita? Você tem direitos!',
      a: 'Se sua dívida já passou de 5 anos, ela pode estar prescrita. Podemos ajudar você a verificar se é esse o seu caso.'
    },
    {
      q: 'Como funciona a renegociação?',
      a: 'É simples: você nos contata, analisamos sua situação, negociamos com seus credores e formalizamos um acordo justo para você.'
    },
    {
      q: 'Quanto custa nosso serviço?',
      a: 'Oferecemos consulta gratuita. Os valores dos serviços variam conforme a complexidade do caso. Fale conosco!'
    },
    {
      q: 'Posso ser preso por dívida?',
      a: 'Não, mas suas contas ficarão negativadas. Podemos ajudar a resolver isso antes que afete mais sua vida.'
    }
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <Head>
        <title>Renegociação de Dívidas - Escritório de Advocacia</title>
        <meta name="description" content="Renegociação legal de dívidas. Proteção contra cobranças abusivas." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header style={{ backgroundColor: '#1a5490', color: '#fff', padding: '20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '1.8em' }}>Escritório de Advocacia</h1>
          <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#25D366', color: '#fff', padding: '10px 20px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold' }}>
            Fale Conosco
          </a>
        </div>
      </header>

      <section style={{ backgroundColor: '#1a5490', color: '#fff', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5em', marginBottom: '20px' }}>Tem Dívidas? Nós Podemos Ajudar!</h1>
          <p style={{ fontSize: '1.2em', marginBottom: '30px' }}>Renegociação legal, proteção contra cobranças abusivas, dívidas prescritas.</p>
          <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#25D366', color: '#fff', padding: '15px 40px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1em', display: 'inline-block' }}>
            Consulte Agora Gratuitamente
          </a>
        </div>
      </section>

      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '40px', color: '#1a5490' }}>Nossos Serviços</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {['Renegociação de Dívidas', 'Dívidas Prescritas', 'Defesa de Execuções', 'Revisão de Contratos'].map((service, i) => (
            <div key={i} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #ddd' }}>
              <h3 style={{ color: '#1a5490' }}>{service}</h3>
              <p>Análise completa e orientação jurídica especializada para resolver sua situação.</p>
              <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ color: '#1a5490', fontWeight: 'bold', textDecoration: 'none' }}>
                Saiba mais →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: '#f0f4ff', padding: '40px 20px', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '40px', color: '#1a5490' }}>Perguntas Frequentes</h2>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ marginBottom: '15px', backgroundColor: '#fff', borderRadius: '5px', overflow: 'hidden' }}>
                <button onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} style={{ width: '100%', padding: '15px', backgroundColor: '#1a5490', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', textAlign: 'left', fontSize: '1em' }}>
                  {faq.q}
                </button>
                {faqOpen === i && (
                  <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderTop: '1px solid #ddd' }}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#25D366', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', zIndex: 999, textDecoration: 'none', animation: 'pulse 2s infinite' }}>
        <img src="/imagens/whatsapp.png" alt="WhatsApp" style={{ width: '30px', height: '30px', filter: 'brightness(0) invert(1)' }} />
        <style>{`@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }`}</style>
      </a>

      <footer style={{ backgroundColor: '#f5f5f5', padding: '40px 20px', textAlign: 'center', marginTop: '40px', borderTop: '1px solid #ddd' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', color: '#666' }}>
          <h3 style={{ color: '#1a5490' }}>Nossos Endereços</h3>
          <p>São Paulo | Rio de Janeiro | Minas Gerais</p>
          <p style={{ fontSize: '0.9em', marginTop: '20px' }}>© 2024 Escritório de Advocacia | Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}

export default function Home({ showLandingPage, whatsappPhone, cloakingEnabled }) {
  console.log('[HOME] Rendering with:', { showLandingPage, cloakingEnabled });

  if (showLandingPage) {
    return <LandingPageAdvocacia />;
  }

  return <SalesPageAdvocacia whatsappPhone={whatsappPhone} />;
}

export async function getServerSideProps({ req }) {
  const cloakingEnabled = process.env.CLOAKING_ENABLED === 'true';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '550000000000';

  console.log('[SSR] Cloaking enabled:', cloakingEnabled);

  if (!cloakingEnabled) {
    console.log('[PHASE 1] All visitors see landing page');
    return { props: { showLandingPage: true, whatsappPhone, cloakingEnabled } };
  }

  try {
    const userAgent = req.headers['user-agent'] || '';

    const botSignatures = [
      'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider', 'yandexbot',
      'facebookexternalhit', 'twitterbot', 'whatsapp', 'linkedinbot', 'chrome-lighthouse',
      'pagespeedonline', 'gtmetrix', 'perf.tools', 'curl', 'wget', 'python', 'java',
      'node', 'postman', 'insomnia'
    ];

    const isKnownBot = botSignatures.some(sig => userAgent.toLowerCase().includes(sig));

    if (isKnownBot) {
      console.log('[PHASE 2] Known bot detected:', userAgent.substring(0, 50));
      return { props: { showLandingPage: true, whatsappPhone, cloakingEnabled } };
    }

    const paschaUrl = process.env.NEXT_PUBLIC_PASCHA_URL;
    const paschaKey = process.env.PASCHA_API_KEY;

    if (!paschaUrl || !paschaKey) {
      console.warn('[SSR] PASCHA not configured, defaulting to sales page');
      return { props: { showLandingPage: false, whatsappPhone, cloakingEnabled } };
    }

    const clientHeaders = {
      'accept-language': req.headers['accept-language'] || '',
      'accept-encoding': req.headers['accept-encoding'] || '',
      'referer': req.headers['referer'] || '',
      'accept': req.headers['accept'] || '',
      'connection': req.headers['connection'] || '',
      'sec-ch-ua': req.headers['sec-ch-ua'] || ''
    };

    const ip = req.headers['x-forwarded-for']?.split(',')[0] ||
               req.headers['cf-connecting-ip'] ||
               req.socket.remoteAddress ||
               'unknown';

    const response = await fetch(`${paschaUrl}/api/detect-visitor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paschaKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ip,
        userAgent: req.headers['user-agent'] || '',
        headers: clientHeaders,
        geo: req.geo || { country: 'unknown' }
      })
    });

    if (!response.ok) {
      console.error('[SSR] PASCHA API error:', response.status);
      return { props: { showLandingPage: false, whatsappPhone, cloakingEnabled } };
    }

    const detection = await response.json();
    const isBot = detection.isBot || false;

    console.log('[PHASE 2] Detection result:', { isBot, score: detection.score });

    return {
      props: {
        showLandingPage: isBot,
        whatsappPhone,
        cloakingEnabled
      },
    };
  } catch (error) {
    console.error('[SSR] Detection error:', error);
    return {
      props: {
        showLandingPage: false,
        whatsappPhone,
        cloakingEnabled
      },
    };
  }
}
