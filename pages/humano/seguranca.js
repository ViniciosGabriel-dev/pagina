export default function Seguranca() {
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
          Política de Segurança da Informação
        </h1>

        <div style={{ lineHeight: '1.8', color: '#555', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              1. Compromisso com Segurança
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              A Paschoalotto implementa práticas robustas de segurança da informação para proteger os dados de seus clientes
              e parceiros contra ameaças cibernéticas e acessos não autorizados.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              2. Criptografia e Proteção de Dados
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              Todos os dados em trânsito são protegidos por criptografia SSL/TLS de última geração.
              Os dados armazenados também são criptografados para garantir máxima proteção.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              3. Controle de Acesso
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              Implementamos controles de acesso rigorosos, incluindo autenticação multi-fator, para garantir que
              apenas pessoal autorizado possa acessar informações sensíveis.
            </p>
          </section>

          <section style={{ marginBottom: 'clamp(30px, 8vw, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              4. Monitoramento e Detecção
            </h2>
            <p style={{ margin: '0 0 10px 0' }}>
              Nossa equipe de segurança monitora continuamente nossos sistemas para detectar e responder
              a potenciais incidentes de segurança.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 'clamp(18px, 5vw, 24px)', fontWeight: 'bold', marginBottom: 'clamp(12px, 3vw, 15px)', color: '#1a1a1a' }}>
              5. Conformidade
            </h2>
            <p style={{ margin: 0 }}>
              Seguimos todas as normas e regulamentações aplicáveis, incluindo a LGPD e outras leis de proteção de dados.
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
