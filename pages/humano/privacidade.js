export default function Privacidade() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', color: '#333', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
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
          <nav style={{ display: 'flex', gap: 'clamp(15px, 4vw, 30px)', fontSize: 'clamp(14px, 3vw, 16px)', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <a href="/" style={{ color: '#666', textDecoration: 'none' }}>Voltar ao inicio</a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', padding: 'clamp(30px, 8vw, 60px) 20px', width: '100%' }}>
        <h1 style={{ fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 'bold', marginBottom: 'clamp(20px, 5vw, 30px)', color: '#0051FA', lineHeight: 1.2 }}>
          Política de Privacidade e Proteção de Dados
        </h1>

        <div style={{ lineHeight: '1.8', color: '#555', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              1. Introdução
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              A Paschoalotto está comprometida em proteger sua privacidade e garantir que você tenha uma experiência positiva em nossas plataformas.
              Esta Política de Privacidade explica como coletamos, usamos, divulgamos e salvaguardamos suas informações.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              2. Informações que Coletamos
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              Coletamos informações que você fornece voluntariamente, como nome, endereço de email, número de telefone e informações de pagamento.
              Também coletamos informações automaticamente, como dados de navegação e cookies.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              3. Como Usamos Suas Informações
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              Usamos suas informações para fornecer, manter e melhorar nossos serviços, processar transações,
              enviar comunicações e cumprir obrigações legais.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              4. Proteção de Dados
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              Implementamos medidas técnicas e organizacionais para proteger suas informações pessoais contra acesso,
              alteração, divulgação ou destruição não autorizados.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              5. Direitos do Titular de Dados
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              Você tem direito a acessar, corrigir ou deletar seus dados pessoais. Para exercer esses direitos,
              entre em contato conosco através do Portal do Titular de Dados.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              6. Contato
            </h2>
            <p style={{ margin: 0 }}>
              Se tiver dúvidas sobre esta política, entre em contato conosco pelo WhatsApp: (14) 2108-8000
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#f5f5f5',
        padding: 'clamp(40px, 8vw, 60px) 20px clamp(30px, 6vw, 40px) 20px',
        color: '#333',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', fontSize: 'clamp(10px, 2vw, 12px)', color: '#999' }}>
          <p style={{ margin: 0 }}>&copy; 2026 Paschoalotto. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
