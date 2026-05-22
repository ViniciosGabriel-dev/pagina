import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';

export default function Contato() {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Contato | Advocacia Jurídica Profissional</title>
        <meta name="description" content="Entre em contato com a Advocacia Jurídica Profissional. Tire suas dúvidas e agende uma consulta com nossos especialistas." />
        <meta name="keywords" content="contato advocacia, consulta jurídica, telefone, email, agendamento" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Advocacia Jurídica Profissional" />
        <meta property="og:title" content="Contato | Advocacia Jurídica Profissional" />
        <meta property="og:description" content="Entre em contato conosco para agendar sua consulta jurídica." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://advocaciaprofissional.com.br/contato" />
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
          input, textarea {
            width: 100%;
            padding: clamp(12px, 3vw, 16px);
            border: 1px solid #ddd;
            border-radius: 6px;
            font-family: inherit;
            font-size: clamp(13px, 3vw, 15px);
            box-sizing: border-box;
          }
          input:focus, textarea:focus {
            outline: none;
            border-color: #1a1a2e;
            box-shadow: 0 0 0 3px rgba(26, 26, 46, 0.1);
          }
          textarea {
            resize: vertical;
            min-height: 150px;
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
              <a href="/contato" style={{ color: '#1a1a2e', textDecoration: 'none', fontWeight: 'bold' }}>Contato</a>
            </nav>
          </div>
        </header>

        <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px, 10vw, 80px) 20px', width: '100%', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 42px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 20px)', color: '#1a1a2e', lineHeight: 1.2 }}>
            Entre em Contato
          </h1>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: '#666', marginBottom: 'clamp(30px, 8vw, 50px)', lineHeight: '1.6' }}>
            Gostaríamos de ouvir de você. Entre em contato através dos meios abaixo ou preencha o formulário para agendar uma consulta.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 4vw, 40px)', marginBottom: 'clamp(40px, 10vw, 60px)' }}>
            <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(24px, 5vw, 32px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '16px', marginTop: 0 }}>
                Email
              </h3>
              <p style={{ margin: '0 0 8px 0', fontSize: 'clamp(13px, 3vw, 15px)', color: '#666' }}>
                Para dúvidas gerais:
              </p>
              <a href="mailto:contato@advocaciaprofissional.com.br" style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: '#1a1a2e', textDecoration: 'none', fontWeight: '600' }}>
                contato@advocaciaprofissional.com.br
              </a>
            </div>

            <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(24px, 5vw, 32px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '16px', marginTop: 0 }}>
                Telefone
              </h3>
              <p style={{ margin: '0 0 8px 0', fontSize: 'clamp(13px, 3vw, 15px)', color: '#666' }}>
                Atendimento:
              </p>
              <a href="tel:+551133334444" style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: '#1a1a2e', textDecoration: 'none', fontWeight: '600' }}>
                (11) 3333-4444
              </a>
            </div>

            <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(24px, 5vw, 32px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              <h3 style={{ fontSize: 'clamp(16px, 4vw, 18px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '16px', marginTop: 0 }}>
                Localização
              </h3>
              <p style={{ margin: 0, fontSize: 'clamp(14px, 3vw, 16px)', color: '#666', lineHeight: '1.6' }}>
                São Paulo, SP<br />
                Brasil
              </p>
            </div>
          </div>

          <div className="animate-on-scroll" style={{ backgroundColor: 'white', padding: 'clamp(24px, 5vw, 32px)', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: 'clamp(20px, 5vw, 30px)', marginTop: 0 }}>
              Formulário de Contato
            </h2>

            {submitted && (
              <div style={{
                backgroundColor: '#d4edda',
                color: '#155724',
                padding: 'clamp(12px, 3vw, 16px)',
                borderRadius: '6px',
                marginBottom: '20px',
                fontSize: 'clamp(13px, 3vw, 15px)',
                border: '1px solid #c3e6cb'
              }}>
                ✓ Mensagem enviada com sucesso! Responderemos em breve.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 'clamp(16px, 4vw, 20px)' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: '600', color: '#1a1a2e' }}>
                  Nome *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Seu nome completo"
                />
              </div>

              <div style={{ marginBottom: 'clamp(16px, 4vw, 20px)' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: '600', color: '#1a1a2e' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                />
              </div>

              <div style={{ marginBottom: 'clamp(16px, 4vw, 20px)' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: '600', color: '#1a1a2e' }}>
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 9999-9999"
                />
              </div>

              <div style={{ marginBottom: 'clamp(16px, 4vw, 20px)' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: '600', color: '#1a1a2e' }}>
                  Assunto *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Qual é o seu assunto?"
                />
              </div>

              <div style={{ marginBottom: 'clamp(20px, 5vw, 28px)' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: '600', color: '#1a1a2e' }}>
                  Mensagem *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Descreva sua situação e dúvidas..."
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#1a1a2e',
                  color: 'white',
                  padding: 'clamp(12px, 3vw, 16px)',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: 'clamp(14px, 3vw, 16px)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#0d0d1a'}
                onMouseLeave={(e) => e.target.style.background = '#1a1a2e'}
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
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
                <li><a href="/contato" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>Contato</a></li>
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
