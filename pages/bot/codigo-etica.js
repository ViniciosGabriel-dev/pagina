import Head from 'next/head';
import { useRef, useEffect } from 'react';

export default function CodigoEtica() {
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
        <title>Código de Ética | Advocacia Jurídica Profissional</title>
        <meta name="description" content="Código de Ética Profissional da Advocacia Jurídica Profissional. Conheça os valores que guiam nossas práticas." />
        <meta name="keywords" content="código de ética, ética profissional, advocacia, integridade jurídica" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Advocacia Jurídica Profissional" />
        <meta property="og:title" content="Código de Ética | Advocacia Jurídica Profissional" />
        <meta property="og:description" content="Conheça nosso código de ética e princípios profissionais." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://advocaciaprofissional.com.br/codigo-etica" />
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
            Código de Ética Profissional
          </h1>

          <div style={{ lineHeight: '1.8', color: '#555', fontSize: 'clamp(14px, 3vw, 16px)' }}>
            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                1. Integridade Profissional
              </h2>
              <p>
                Nossos profissionais atuam com total integridade em todas as relações profissionais. Rejeitamos qualquer forma de desonestidade, fraude ou má conduta. Nos comprometemos a cumprir todas as leis e regulamentações aplicáveis.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                2. Sigilo Profissional
              </h2>
              <p>
                O sigilo profissional é um dos pilares fundamentais de nossa ética. Todas as informações compartilhadas por clientes são mantidas em sigilo absoluto, conforme garantido pela lei e pela deontologia jurídica. Nenhuma informação será divulgada sem consentimento expresso do cliente.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                3. Competência Profissional
              </h2>
              <p>
                Oferecemos apenas os serviços que nossos profissionais estão qualificados a prestar. Continuamos nos atualizando sobre as mudanças na legislação e nas melhores práticas jurídicas para oferecer o mais alto nível de competência aos nossos clientes.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                4. Equidade e Igualdade
              </h2>
              <p>
                Tratamos todos os clientes com igualdade e respeito, sem discriminação por raça, cor, religião, gênero, orientação sexual ou qualquer outra característica pessoal. Nos comprometemos a servir a justiça e a equidade em todas as nossas ações.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                5. Transparência Financeira
              </h2>
              <p>
                Somos transparentes em relação aos honorários cobrados. Informamos claramente quais serão os custos associados aos nossos serviços antes do início dos trabalhos. Não mantemos cobranças ocultas ou inesperadas.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                6. Independência Profissional
              </h2>
              <p>
                Mantemos total independência em nossa avaliação dos casos dos clientes. Nossas recomendações são baseadas exclusivamente nas leis e nos méritos do caso, nunca em considerações financeiras prejudiciais aos interesses dos clientes.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                7. Respeito ao Adversário
              </h2>
              <p>
                Mantemos respeito profissional com advogados adversários e com o sistema judiciário. Nunca adotamos práticas abusivas ou desleais, mesmo quando defendemos vigorosamente os interesses de nossos clientes.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                8. Cumprimento de Prazos
              </h2>
              <p>
                Cumprimos rigorosamente todos os prazos estabelecidos. A pontualidade é essencial na profissão jurídica e é fundamental para proteger os direitos de nossos clientes.
              </p>
            </section>

            <section>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                9. Responsabilidade Social
              </h2>
              <p>
                Como profissionais jurídicos, reconhecemos nossa responsabilidade para com a sociedade. Participamos em atividades de educação jurídica e oferecemos orientação em questões de interesse público quando possível.
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
