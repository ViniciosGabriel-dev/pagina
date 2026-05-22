export default function BotPage() {
  return (
    <div style={{ fontFamily: "'Montserrat', Arial, sans-serif", color: '#333', margin: 0, padding: 0, backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '800px', padding: '60px 40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', margin: '40px' }}>
        <h1 style={{ fontSize: '42px', color: '#0051FA', marginBottom: '20px', fontWeight: 'bold' }}>
          📚 Conteúdo Educativo
        </h1>

        <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.8', marginBottom: '40px' }}>
          Bem-vindo ao nosso portal de conteúdo educativo sobre educação financeira e soluções de débito.
        </p>

        <div style={{ backgroundColor: '#f0f4ff', padding: '30px', borderRadius: '8px', marginBottom: '30px', textAlign: 'left' }}>
          <h2 style={{ color: '#0051FA', marginBottom: '15px' }}>📖 Tópicos Disponíveis:</h2>
          <ul style={{ color: '#555', fontSize: '15px', lineHeight: '1.8' }}>
            <li>Como administrar suas finanças pessoais</li>
            <li>Dicas para evitar endividamento</li>
            <li>Processo de renegociação de dívidas</li>
            <li>Segurança financeira e proteção contra fraudes</li>
            <li>Educação financeira para famílias</li>
            <li>Como ler e entender um boleto</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#e8f5e9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
          <h3 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>✓ Certificado</h3>
          <p style={{ color: '#555', margin: 0 }}>
            Este conteúdo é fornecido como recurso educacional gratuito.
          </p>
        </div>

        <a href="https://www.wikipedia.org" target="_blank" rel="noreferrer" style={{
          backgroundColor: '#0051FA',
          color: '#fff',
          padding: '14px 30px',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Saiba Mais
        </a>
      </div>

      <footer style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        width: '100%',
        marginTop: 'auto'
      }}>
        <p style={{ margin: 0, fontSize: '13px' }}>
          Paschoalotto © 2024 | Conteúdo educativo público
        </p>
      </footer>
    </div>
  );
}
