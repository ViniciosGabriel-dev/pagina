import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';

export default function FAQ() {
  const containerRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

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

  const faqs = [
    {
      id: 1,
      question: 'Qual é o processo inicial para contratar seus serviços?',
      answer: 'O primeiro passo é entrar em contato conosco através do formulário de contato ou telefone. Agende uma consulta inicial onde discutiremos seu caso, esclareceremos dúvidas e apresentaremos nossas soluções. Após isso, elaboraremos uma proposta com os honorários e condições do atendimento.'
    },
    {
      id: 2,
      question: 'Como vocês garantem a confidencialidade das informações?',
      answer: 'A confidencialidade é protegida pelo sigilo profissional, garantido pela lei e pela ética profissional da advocacia. Todas as informações compartilhadas são protegidas e nunca serão divulgadas sem seu consentimento expresso, exceto quando obrigado por lei.'
    },
    {
      id: 3,
      question: 'Quanto tempo leva para resolver um caso?',
      answer: 'O tempo varia significativamente dependendo da complexidade do caso, do tipo de processo e de fatores externos como a agenda do tribunal. Forneceremos uma estimativa realista durante a consulta inicial e atualizaremos você regularmente sobre o progresso.'
    },
    {
      id: 4,
      question: 'Qual é a forma de cálculo dos honorários?',
      answer: 'Os honorários podem ser calculados de diferentes formas: por hora de trabalho, valor fixo para o caso, ou percentual sobre a causa. Discutiremos as opções e escolheremos a mais adequada para seu caso durante a negociação inicial.'
    },
    {
      id: 5,
      question: 'Vocês atendem casos em diferentes áreas do direito?',
      answer: 'Sim, atuamos em Direito Civil, Comercial, Administrativo e oferecemos Consultoria Jurídica Geral. Se seu caso envolver uma especialidade diferente, podemos recomendá-lo a um colega especializado.'
    },
    {
      id: 6,
      question: 'É possível fazer uma consulta inicial?',
      answer: 'Sim, oferecemos consultas iniciais onde você pode discutir seu caso conosco sem compromisso. Essas consultas são essenciais para que ambas as partes avaliem se é possível trabalhar juntas.'
    },
    {
      id: 7,
      question: 'Quais são os meios de comunicação para manter contato?',
      answer: 'Você pode nos contatar por email, telefone ou através do formulário de contato em nosso site. Responderemos suas comunicações no prazo mais breve possível.'
    },
    {
      id: 8,
      question: 'Qual é sua experiência com casos similares ao meu?',
      answer: 'Temos mais de 20 anos de experiência e um histórico comprovado de sucesso em diversos tipos de casos. Discutiremos experiências relevantes durante sua consulta inicial.'
    }
  ];

  return (
    <>
      <Head>
        <title>Perguntas Frequentes | Advocacia Jurídica Profissional</title>
        <meta name="description" content="Respostas às perguntas frequentes sobre os serviços da Advocacia Jurídica Profissional. Saiba mais sobre nossos processos e honorários." />
        <meta name="keywords" content="FAQ, perguntas frequentes, advocacia, serviços jurídicos" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Advocacia Jurídica Profissional" />
        <meta property="og:title" content="Perguntas Frequentes | Advocacia Jurídica Profissional" />
        <meta property="og:description" content="Conheça as respostas às perguntas mais frequentes sobre nossos serviços." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://advocaciaprofissional.com.br/faq" />
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
          .faq-item {
            background: white;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            margin-bottom: 16px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          }
          .faq-question {
            padding: clamp(16px, 4vw, 20px);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #fafafa;
            transition: background 0.3s ease;
          }
          .faq-question:hover {
            background: #f0f0f0;
          }
          .faq-answer {
            padding: clamp(12px, 3vw, 20px);
            border-top: 1px solid #e0e0e0;
            background: white;
            line-height: 1.6;
          }
          .faq-toggle {
            font-size: 20px;
            transition: transform 0.3s ease;
          }
          .faq-toggle.open {
            transform: rotate(180deg);
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
              <a href="/faq" style={{ color: '#1a1a2e', textDecoration: 'none', fontWeight: 'bold' }}>FAQ</a>
            </nav>
          </div>
        </header>

        <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px, 10vw, 80px) 20px', width: '100%', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 42px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 20px)', color: '#1a1a2e', lineHeight: 1.2 }}>
            Perguntas Frequentes
          </h1>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: '#666', marginBottom: 'clamp(30px, 8vw, 50px)', lineHeight: '1.6' }}>
            Encontre respostas às perguntas mais comuns sobre nossos serviços, processos e como trabalhamos.
          </p>

          <div>
            {faqs.map((faq) => (
              <div key={faq.id} className="animate-on-scroll faq-item">
                <div
                  className="faq-question"
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                >
                  <h3 style={{ fontSize: 'clamp(14px, 3vw, 16px)', fontWeight: '600', color: '#1a1a2e', margin: 0, paddingRight: '16px', flex: 1 }}>
                    {faq.question}
                  </h3>
                  <span className={`faq-toggle ${expandedId === faq.id ? 'open' : ''}`}>
                    ▼
                  </span>
                </div>
                {expandedId === faq.id && (
                  <div className="faq-answer" style={{ fontSize: 'clamp(13px, 3vw, 15px)', color: '#555' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'white', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '8px', marginTop: 'clamp(40px, 10vw, 60px)', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '16px' }}>
              Não encontrou sua resposta?
            </h2>
            <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', color: '#666', marginBottom: '20px' }}>
              Entre em contato conosco para esclarecermos suas dúvidas especificamente.
            </p>
            <a href="/contato" style={{
              display: 'inline-block',
              backgroundColor: '#1a1a2e',
              color: 'white',
              padding: 'clamp(12px, 3vw, 16px) clamp(24px, 5vw, 32px)',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: '600',
              transition: 'background 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.background = '#0d0d1a'}
            onMouseLeave={(e) => e.target.style.background = '#1a1a2e'}
            >
              Contate-nos
            </a>
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
