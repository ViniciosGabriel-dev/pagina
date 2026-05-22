import Head from 'next/head';
import { useRef, useEffect } from 'react';

export default function TermosServico() {
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
        <title>Termos de Serviço | Advocacia Jurídica Profissional</title>
        <meta name="description" content="Termos de Serviço da Advocacia Jurídica Profissional. Leia as condições de uso de nossos serviços jurídicos." />
        <meta name="keywords" content="termos de serviço, condições de uso, advocacia, serviços jurídicos" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Advocacia Jurídica Profissional" />
        <meta property="og:title" content="Termos de Serviço | Advocacia Jurídica Profissional" />
        <meta property="og:description" content="Conheça os termos e condições de uso de nossos serviços." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://advocaciaprofissional.com.br/termos-servico" />
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
            Termos de Serviço
          </h1>

          <div style={{ lineHeight: '1.8', color: '#555', fontSize: 'clamp(14px, 3vw, 16px)' }}>
            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                1. Aceitação dos Termos
              </h2>
              <p>
                Ao acessar e utilizar os serviços da Advocacia Jurídica Profissional, você concorda em estar vinculado a estes Termos de Serviço. Se não concordar com qualquer parte dos termos, você não está autorizado a usar nossos serviços.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                2. Descrição dos Serviços
              </h2>
              <p>
                Oferecemos consultoria jurídica especializada nas áreas de Direito Civil, Comercial, Administrativo e Consultoria Geral. Nossos serviços incluem análise de documentos, consultoria sobre questões legais, representação em processos e assessoria jurídica contínua.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                3. Relação Profissional
              </h2>
              <p>
                A Advocacia Jurídica Profissional e seus clientes estabelecem uma relação de prestação de serviços profissionais. Cada caso é analisado individualmente e a aceitação do cliente é necessária para o início formal dos trabalhos.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                4. Confidencialidade
              </h2>
              <p>
                Todos os assuntos discutidos com nossos profissionais são protegidos pelo sigilo profissional garantido pela lei e pela ética profissional. Nenhuma informação será divulgada sem consentimento expresso do cliente, exceto quando obrigado por lei.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                5. Honorários Profissionais
              </h2>
              <p style={{ marginBottom: '12px' }}>
                Os honorários serão estabelecidos mediante acordo prévio entre o cliente e a Advocacia Jurídica Profissional. Os valores podem variar conforme:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                <li>Complexidade do caso</li>
                <li>Tempo estimado de dedicação</li>
                <li>Especialidade jurídica envolvida</li>
                <li>Acordo específico para cada cliente</li>
              </ul>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                6. Responsabilidades do Cliente
              </h2>
              <p style={{ marginBottom: '12px' }}>
                O cliente é responsável por:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                <li>Fornecer informações precisas e completas sobre seu caso</li>
                <li>Comunicar-se de forma clara e honesta com nossos profissionais</li>
                <li>Cumprir os prazos estabelecidos</li>
                <li>Manter a confidencialidade das comunicações profissionais</li>
              </ul>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                7. Limitações de Responsabilidade
              </h2>
              <p>
                A Advocacia Jurídica Profissional agirá conforme os padrões da profissão jurídica. No entanto, não podemos garantir resultados específicos, uma vez que o resultado de processos judiciais depende de diversos fatores, incluindo decisões judiciais.
              </p>
            </section>

            <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                8. Rescisão de Serviços
              </h2>
              <p>
                Tanto o cliente quanto a Advocacia Jurídica Profissional podem rescindir o acordo de prestação de serviços a qualquer momento, mediante notificação escrita. Após a rescisão, o cliente permanece responsável pelos honorários dos serviços já prestados.
              </p>
            </section>

            <section>
              <h2 className="animate-on-scroll" style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a2e' }}>
                9. Lei Aplicável
              </h2>
              <p>
                Estes Termos de Serviço são regidos pelas leis da República Federativa do Brasil e qualquer disputa será resolvida nos tribunais competentes do Brasil.
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
