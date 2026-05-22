export default function HumanPage() {
  return (
    <div style={{ fontFamily: "'Montserrat', Arial, sans-serif", color: '#333', margin: 0, padding: 0, backgroundColor: '#fff' }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-section { animation: fadeInUp 0.8s ease-out; }
        .whatsapp-btn { animation: pulse 2s infinite; }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .whatsapp-btn:hover { transform: scale(1.15); }
      ` }} />

      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e0e0e0', padding: '14px 40px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <img src="/imagens/logo.png" alt="Paschoalotto" style={{ height: '40px' }} />
          <div style={{ display: 'flex', gap: '20px' }}>
            <button style={{ backgroundColor: '#0051FA', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>
              Quero Pagar Agora
            </button>
            <button style={{ backgroundColor: '#0051FA', color: '#fff', border: 'none', padding: '10px 22px', borderRadius: '6px', fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }}>
              Falar com Suporte
            </button>
          </div>
        </div>
      </header>

      <section className="hero-section" style={{ position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img src="/imagens/banner-desktop.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.75) 50%, rgba(0,0,0,0.1) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '70px 40px', width: '100%' }}>
          <h1 style={{ color: '#fff', fontSize: '48px', fontWeight: 'bold', maxWidth: '580px', lineHeight: '1.2', marginBottom: '25px' }}>
            🎯 Oferta Especial Hoje!
          </h1>
          <p style={{ color: '#fff', fontSize: '20px', maxWidth: '480px', lineHeight: '1.7', marginBottom: '32px', fontWeight: '500' }}>
            Aproveite condições únicas para regularizar suas dívidas. Pagamento facilitado, sem juros adicionais.
          </p>
          <button style={{
            backgroundColor: '#25D366',
            color: '#fff',
            padding: '16px 40px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)'
          }}>
            ✅ Quero Aproveitar a Oferta
          </button>
        </div>
      </section>

      <section style={{ padding: '80px 40px', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', color: '#0051FA', marginBottom: '50px', fontWeight: 'bold', textAlign: 'center' }}>
            Por Que Escolher a Paschoalotto?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[
              {
                icon: '⚡',
                title: 'Processo Rápido',
                desc: 'Aprovação em minutos'
              },
              {
                icon: '💰',
                title: 'Melhor Taxa',
                desc: 'Condições especiais de hoje'
              },
              {
                icon: '🔒',
                title: 'Seguro e Confiável',
                desc: 'Dados protegidos com criptografia'
              }
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <div style={{ fontSize: '48px', marginBottom: '15px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 40px', backgroundColor: '#0051FA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', color: '#fff', marginBottom: '30px', fontWeight: 'bold' }}>
            Não Deixe Para Depois!
          </h2>
          <p style={{ fontSize: '18px', color: '#ddd', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
            Esta oferta é válida apenas hoje. Regularize suas dívidas agora com as melhores condições.
          </p>
          <button style={{
            backgroundColor: '#25D366',
            color: '#fff',
            padding: '16px 50px',
            borderRadius: '6px',
            fontSize: '17px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(37, 211, 102, 0.6)'
          }}>
            🚀 APROVEITAR OFERTA AGORA
          </button>
        </div>
      </section>

      <footer style={{ backgroundColor: '#222', color: '#fff', padding: '40px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '13px' }}>
          Paschoalotto © 2024 | Oferta Exclusiva para Visitantes
        </p>
      </footer>

      <a
        className="whatsapp-btn"
        href="https://api.whatsapp.com/send/?phone=5514988142000"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#25D366',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
          zIndex: 999,
          textDecoration: 'none',
          fontSize: '32px',
          cursor: 'pointer'
        }}
      >
        💬
      </a>
    </div>
  );
}
