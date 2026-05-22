import { useRef, useEffect } from 'react';

export default function DenuncieFraude() {
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
    <div ref={containerRef} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', color: '#333', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
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
          h2 { font-size: clamp(16px, 4vw, 22px); }
        }
      `}</style>
      <header style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        padding: 'clamp(15px, 5vw, 20px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <img src="/imagens/logo.png" alt="Paschoalotto" style={{ height: 'clamp(40px, 10vw, 50px)', width: 'auto' }} />
          </a>
          <nav style={{ display: 'flex', gap: 'clamp(15px, 4vw, 30px)', fontSize: 'clamp(14px, 3vw, 16px)', alignItems: 'center' }}>
            <a href="/" style={{ color: '#666', textDecoration: 'none' }}>Voltar ao inicio</a>
          </nav>
        </div>
      </header>

      <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(30px, 8vw, 60px) 20px', width: '100%' }}>
        <h1 style={{ fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 'bold', marginBottom: 'clamp(20px, 5vw, 30px)', color: '#0051FA', lineHeight: 1.2 }}>
          Denuncie uma Fraude
        </h1>

        <div style={{ lineHeight: '1.8', color: '#555', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>1. Proteção contra Fraude</h2>
            <p style={{ margin: '0 0 10px 0' }}>A Paschoalotto leva a fraude muito a sério. Se você suspeita de atividade fraudulenta ou golpes, pedimos que denuncie imediatamente para proteger você e outros usuários.</p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>2. Como Denunciar</h2>
            <p style={{ margin: '0 0 10px 0' }}>Você pode denunciar fraude através de diversos canais:<br />• WhatsApp: (14) 2108-8000<br />• Email: fraude@paschoalotto.com.br<br />• Redes Sociais: Envie uma mensagem privada<br />• Portal: Acesse nosso portal de denúncias</p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>3. Informações a Incluir</h2>
            <p style={{ margin: '0 0 10px 0' }}>Ao denunciar fraude, forneça o máximo de detalhes possível, como:<br />• Data e hora do incidente<br />• Descrição do que aconteceu<br />• Informações de contato do fraudador (se disponível)<br />• Qualquer evidência ou documentação</p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>4. Confidencialidade</h2>
            <p style={{ margin: '0 0 10px 0' }}>Suas denúncias serão tratadas com confidencialidade máxima. Investigaremos todas as alegações e tomaremos as ações legais apropriadas contra fraudadores.</p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>5. Proteção Legal</h2>
            <p style={{ margin: '0 0 10px 0' }}>Denunciantes de boa fé estarão protegidos contra retaliação. A Lei da Assobiadrice Corporativa protege aqueles que reportam atividades ilegais.</p>
          </section>

          <section>
            <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>6. Dicas de Segurança</h2>
            <p style={{ margin: 0 }}>Lembre-se: A Paschoalotto nunca solicitará seus dados pessoais ou bancários por telefone, email ou redes sociais. Seja cuidadoso com phishing e golpes.</p>
          </section>
        </div>
      </div>

      <footer style={{
        backgroundColor: '#f5f5f5',
        padding: 'clamp(40px, 8vw, 60px) 20px clamp(30px, 6vw, 40px) 20px',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 12px)', color: '#999' }}>
          <p style={{ margin: 0 }}>&copy; 2026 Paschoalotto. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
