import Head from 'next/head';
import { useRef, useEffect } from 'react';

export default function Sobre() {
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
        <title>Sobre Nós | Advocacia Jurídica Profissional</title>
        <meta name="description" content="Conheça a história, missão e valores da Advocacia Jurídica Profissional. Somos um escritório de advocacia com mais de 20 anos de experiência." />
        <meta name="keywords" content="sobre advocacia, história jurídica, escritório de advocacia, advocado profissional" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Advocacia Jurídica Profissional" />
        <meta property="og:title" content="Sobre Nós | Advocacia Jurídica Profissional" />
        <meta property="og:description" content="Conheça a história, missão e valores da Advocacia Jurídica Profissional." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://advocaciaprofissional.com.br/sobre" />
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
          @media (max-width: 768px) {
            h2 { font-size: clamp(18px, 5vw, 24px); }
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
              <a href="/sobre" style={{ color: '#1a1a2e', textDecoration: 'none', fontWeight: 'bold' }}>Sobre</a>
            </nav>
          </div>
        </header>

        <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px, 10vw, 80px) 20px', width: '100%', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 42px)', fontWeight: 'bold', marginBottom: 'clamp(20px, 5vw, 40px)', color: '#1a1a2e', lineHeight: 1.2 }}>
            Sobre Nossa Advocacia
          </h1>

          <section style={{ marginBottom: 'clamp(40px, 10vw, 60px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 28px)', fontWeight: 'bold', marginBottom: 'clamp(16px, 4vw, 24px)', color: '#1a1a2e' }}>
              Nossa História
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: 'clamp(14px, 3vw, 16px)', color: '#555', marginBottom: '16px' }}>
              A Advocacia Jurídica Profissional foi fundada em 2003 com o objetivo de oferecer soluções jurídicas inovadoras e de excelência para nossos clientes. Com mais de 20 anos de atuação, construímos uma reputação sólida na defesa dos direitos e interesses de pessoas físicas e jurídicas.
            </p>
            <p style={{ lineHeight: '1.8', fontSize: 'clamp(14px, 3vw, 16px)', color: '#555' }}>
              Nosso crescimento foi alicerçado em princípios de integridade, competência e dedicação ao atendimento de qualidade. Hoje, contamos com uma equipe de profissionais altamente qualificados que se comprometem com a excelência em cada caso.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(40px, 10vw, 60px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 28px)', fontWeight: 'bold', marginBottom: 'clamp(16px, 4vw, 24px)', color: '#1a1a2e' }}>
              Nossa Missão
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: 'clamp(14px, 3vw, 16px)', color: '#555' }}>
              Prestar consultoria e assessoria jurídica de excelência, com ética profissional e responsabilidade social, garantindo a defesa eficaz dos direitos de nossos clientes e contribuindo para a justiça e o desenvolvimento do ordenamento jurídico brasileiro.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(40px, 10vw, 60px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 28px)', fontWeight: 'bold', marginBottom: 'clamp(16px, 4vw, 24px)', color: '#1a1a2e' }}>
              Nossos Valores
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(20px, 4vw, 30px)', marginTop: 'clamp(20px, 5vw, 30px)' }}>
              <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}>
                <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '12px' }}>Integridade</h3>
                <p style={{ fontSize: 'clamp(13px, 3vw, 15px)', color: '#666', lineHeight: '1.6' }}>Atuamos com total honestidade e transparência em todas as nossas relações profissionais.</p>
              </div>
              <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}>
                <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '12px' }}>Excelência</h3>
                <p style={{ fontSize: 'clamp(13px, 3vw, 15px)', color: '#666', lineHeight: '1.6' }}>Buscamos constantemente melhorar nossos serviços e oferecer soluções de qualidade superior.</p>
              </div>
              <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}>
                <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '12px' }}>Confidencialidade</h3>
                <p style={{ fontSize: 'clamp(13px, 3vw, 15px)', color: '#666', lineHeight: '1.6' }}>Garantimos o sigilo profissional e a proteção dos dados de nossos clientes em conformidade com a lei.</p>
              </div>
              <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 0.3s ease' }}>
                <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '12px' }}>Responsabilidade</h3>
                <p style={{ fontSize: 'clamp(13px, 3vw, 15px)', color: '#666', lineHeight: '1.6' }}>Assumimos total responsabilidade por nossas ações e compromissos com os clientes.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 28px)', fontWeight: 'bold', marginBottom: 'clamp(16px, 4vw, 24px)', color: '#1a1a2e' }}>
              Credenciais Profissionais
            </h2>
            <div style={{ backgroundColor: 'white', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #e0e0e0', fontSize: 'clamp(14px, 3vw, 16px)', color: '#555' }}>
                  ✓ Registrados na Ordem dos Advogados do Brasil (OAB)
                </li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #e0e0e0', fontSize: 'clamp(14px, 3vw, 16px)', color: '#555' }}>
                  ✓ Especialização em Direito Civil, Comercial e Administrativo
                </li>
                <li style={{ padding: '12px 0', borderBottom: '1px solid #e0e0e0', fontSize: 'clamp(14px, 3vw, 16px)', color: '#555' }}>
                  ✓ Certificações em Conformidade Legal e LGPD
                </li>
                <li style={{ padding: '12px 0', fontSize: 'clamp(14px, 3vw, 16px)', color: '#555' }}>
                  ✓ Membros de associações jurídicas nacionais
                </li>
              </ul>
            </div>
          </section>
        </div>

        <footer style={{
          backgroundColor: '#1a1a2e',
          color: '#fff',
          padding: 'clamp(40px, 8vw, 60px) 20px clamp(30px, 6vw, 40px) 20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(20px, 4vw, 40px)', marginBottom: 'clamp(30px, 6vw, 50px)', boxSizing: 'border-box' }}>
            <div>
              <h4 style={{ marginBottom: '16px', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 'bold' }}>Advocacia Jurídica Profissional</h4>
              <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', lineHeight: '1.6', color: '#ccc' }}>Consultoria jurídica de excelência com mais de 20 anos de experiência.</p>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 'bold' }}>Links Rápidos</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="/seguro" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>Início</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/sobre" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>Sobre</a></li>
                <li><a href="/faq" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '16px', fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: 'bold' }}>Políticas</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="/politica-privacidade" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>Privacidade</a></li>
                <li style={{ marginBottom: '8px' }}><a href="/termos-servico" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>Termos</a></li>
                <li><a href="/codigo-etica" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>Ética</a></li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 'clamp(11px, 2vw, 13px)', color: '#999', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ margin: 0 }}>&copy; 2026 Advocacia Jurídica Profissional. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
