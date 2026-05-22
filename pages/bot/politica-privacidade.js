import Head from 'next/head';
import { useRef, useEffect } from 'react';

export default function PoliticaPrivacidade() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const animateElements = containerRef.current.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <Head>
        <title>Política de Privacidade | Advocacia Jurídica Profissional</title>
        <meta name="description" content="Política de Privacidade e proteção de dados da Advocacia Jurídica Profissional. Conheça como cuidamos das suas informações pessoais." />
        <meta name="keywords" content="política de privacidade, proteção de dados, LGPD, advocacia" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Advocacia Jurídica Profissional" />
        <meta property="og:title" content="Política de Privacidade | Advocacia Jurídica Profissional" />
        <meta property="og:description" content="Conheça nossa política de privacidade e proteção de dados." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://advocaciaprofissional.com.br/politica-privacidade" />
      </Head>

      <div ref={containerRef} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', color: '#333', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f9f9f9' }}>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          .animate-visible {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 1;
            transform: translateY(0);
          }
        `}</style>

        <header style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e0e0e0',
          padding: 'clamp(15px, 5vw, 20px) 0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', boxSizing: 'border-box' }}>
            <a href="/seguro" style={{ textDecoration: 'none', fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 'bold', color: '#1a1a2e' }}>
              Advocacia Jurídica
            </a>
            <nav style={{ display: 'flex', gap: 'clamp(15px, 4vw, 30px)', fontSize: 'clamp(14px, 3vw, 16px)', alignItems: 'center' }}>
              <a href="/seguro" style={{ color: '#666', textDecoration: 'none' }}>Início</a>
            </nav>
          </div>
        </header>

        <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px, 10vw, 80px) 20px', width: '100%', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 42px)', fontWeight: 'bold', marginBottom: 'clamp(20px, 5vw, 40px)', color: '#1a1a2e', lineHeight: 1.2 }}>
            Política de Privacidade
          </h1>

          <div style={{ lineHeight: '1.8', color: '#555', fontSize: 'clamp(14px, 3vw, 16px)' }}>
            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                1. Introdução
              </h2>
              <p>
                A Advocacia Jurídica Profissional respeita a privacidade de todos os seus visitantes e clientes. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                2. Informações que Coletamos
              </h2>
              <p style={{ marginBottom: '12px' }}>
                Coletamos informações que você nos fornece diretamente, incluindo:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                <li>Nome, email e telefone através de formulários de contato</li>
                <li>Informações sobre seus assuntos jurídicos para fins de consultoria</li>
                <li>Dados de navegação através de cookies e tecnologias similares</li>
              </ul>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                3. Como Usamos Suas Informações
              </h2>
              <p style={{ marginBottom: '12px' }}>
                Utilizamos suas informações para:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                <li>Fornecer e melhorar nossos serviços jurídicos</li>
                <li>Responder a suas dúvidas e solicitações</li>
                <li>Comunicações sobre atualizações de serviços</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                4. Proteção de Dados
              </h2>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Todas as comunicações com nossos clientes são criptografadas.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                5. Lei Geral de Proteção de Dados (LGPD)
              </h2>
              <p>
                Estamos em conformidade total com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). Você tem direito de acessar, corrigir, deletar e exportar seus dados pessoais a qualquer momento, conforme previsto em lei.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                6. Compartilhamento de Dados
              </h2>
              <p>
                Não compartilhamos suas informações pessoais com terceiros sem seu consentimento, exceto quando obrigado por lei ou quando necessário para prestar nossos serviços. Todos os compartilhamentos são feitos sob rigorosos acordos de confidencialidade.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                7. Cookies
              </h2>
              <p>
                Nosso site utiliza cookies para melhorar sua experiência de navegação. Você pode controlar o uso de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                8. Alterações na Política
              </h2>
              <p>
                Esta Política de Privacidade pode ser atualizada periodicamente. Notificaremos sobre alterações significativas através deste site.
              </p>
            </section>

            <section>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                9. Contato
              </h2>
              <p>
                Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos de proteção de dados, entre em contato conosco em contato@advocaciaprofissional.com.br.
              </p>
            </section>
          </div>
        </div>

        <footer style={{
          backgroundColor: '#1a1a2e',
          color: '#fff',
          padding: 'clamp(40px, 8vw, 60px) 20px clamp(30px, 6vw, 40px) 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: 'clamp(11px, 2vw, 13px)', color: '#999' }}>
            <p style={{ margin: 0 }}>&copy; 2026 Advocacia Jurídica Profissional. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
