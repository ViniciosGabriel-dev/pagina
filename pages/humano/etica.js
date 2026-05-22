export default function Etica() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', color: '#333', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
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
          Código de Ética e Conduta
        </h1>

        <div style={{ lineHeight: '1.8', color: '#555', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>1. Princípios Fundamentais</h2>
            <p style={{ margin: '0 0 10px 0' }}>A Paschoalotto operar com integridade, honestidade e transparência em todas as nossas interações. Esperamos que todos os colaboradores adotem esses princípios em suas atividades diárias.</p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>2. Conflito de Interesses</h2>
            <p style={{ margin: '0 0 10px 0' }}>Colaboradores devem evitar situações que possam criar conflitos de interesses e devem divulgar qualquer potencial conflito à administração.</p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>3. Conduta Profissional</h2>
            <p style={{ margin: '0 0 10px 0' }}>Esperamos que todos os colaboradores mantenham altos padrões de conduta profissional, respeitando os direitos e dignidade de colegas, clientes e parceiros.</p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>4. Conformidade Legal</h2>
            <p style={{ margin: '0 0 10px 0' }}>Todos os colaboradores devem cumprir com as leis e regulamentos aplicáveis. A violação de leis pode resultar em ações disciplinares ou legais.</p>
          </section>

          <section>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>5. Denúncias de Violações</h2>
            <p style={{ margin: 0 }}>Encorajamos a denúncia de violações deste código. Oferecemos canais seguros e confidenciais para reportar preocupações sem medo de retaliação.</p>
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
