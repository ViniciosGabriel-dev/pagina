import Head from 'next/head';
import { useState } from 'react';

export default function Seguro() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Head>
        <title>Advocacia Jurídica Profissional | Consultoria Legal Especializada</title>
        <meta name="description" content="Serviços de consultoria jurídica profissional. Advocacia especializada em direito civil, comercial e administrativo. Atendimento personalizado para empresas e pessoas físicas." />
        <meta name="keywords" content="advocacia, consultoria jurídica, serviços legais, direito civil, direito comercial" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Advocacia Jurídica Profissional" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Advocacia Jurídica Profissional | Consultoria Legal Especializada" />
        <meta property="og:description" content="Serviços de consultoria jurídica profissional. Advocacia especializada em direito civil, comercial e administrativo." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://exemplo.com" />
        <link rel="canonical" href="https://exemplo.com" />
      </Head>

      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif', color: '#333' }}>
        {/* Header */}
        <header style={{
          backgroundColor: '#1a1a2e',
          color: 'white',
          padding: 'clamp(15px, 5vw, 25px) clamp(20px, 5vw, 40px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ margin: 0, fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: '700', letterSpacing: '-0.5px' }}>
              Advocacia Jurídica Profissional
            </h1>
            <p style={{ margin: '8px 0 0 0', fontSize: 'clamp(13px, 2vw, 15px)', opacity: 0.9 }}>
              Consultoria Legal Especializada | Soluções Jurídicas Confiáveis
            </p>
          </div>
        </header>

        {/* Hero Section */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: 'clamp(40px, 10vw, 80px) clamp(20px, 5vw, 40px)',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 6vw, 42px)', fontWeight: '700', marginBottom: '20px', lineHeight: 1.2 }}>
              Consultoria Jurídica de Excelência
            </h2>
            <p style={{ fontSize: 'clamp(15px, 3vw, 18px)', lineHeight: 1.8, color: '#555', marginBottom: '30px', maxWidth: '700px' }}>
              Oferecemos serviços especializados de consultoria jurídica para pessoas físicas e jurídicas. Com uma equipe experiente de profissionais do direito, garantimos soluções legais eficazes e alinhadas às melhores práticas do mercado.
            </p>
            <a href="#contato" style={{
              backgroundColor: '#1a1a2e',
              color: 'white',
              padding: 'clamp(12px, 2vw, 16px) clamp(28px, 5vw, 40px)',
              borderRadius: '6px',
              textDecoration: 'none',
              display: 'inline-block',
              fontWeight: '600',
              fontSize: 'clamp(14px, 2vw, 16px)',
              transition: 'background 0.3s'
            }} onMouseOver={(e) => e.target.style.backgroundColor = '#0d0d1f'} onMouseOut={(e) => e.target.style.backgroundColor = '#1a1a2e'}>
              Solicitar Consultoria
            </a>
          </div>
        </section>

        {/* Services Section */}
        <section style={{
          padding: 'clamp(50px, 10vw, 80px) clamp(20px, 5vw, 40px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: '700', marginBottom: '50px', textAlign: 'center', color: '#1a1a2e' }}>
              Áreas de Atuação
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px'
            }}>
              {[
                {
                  title: 'Direito Civil',
                  description: 'Consultoria em contratos, responsabilidade civil, direito de família e sucessões.'
                },
                {
                  title: 'Direito Comercial',
                  description: 'Assessoria jurídica para empresas, contratos comerciais e direito societário.'
                },
                {
                  title: 'Direito Administrativo',
                  description: 'Orientação em relações com órgãos públicos e procedimentos administrativos.'
                },
                {
                  title: 'Consultoria Geral',
                  description: 'Consultoria jurídica estratégica e conformidade legal com regulamentações.'
                }
              ].map((service, i) => (
                <div key={i} style={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  padding: 'clamp(25px, 5vw, 35px)',
                  borderRadius: '8px',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}>
                  <h3 style={{ fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: '700', marginBottom: '12px', color: '#1a1a2e' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.6, color: '#666', margin: 0 }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: 'clamp(50px, 10vw, 80px) clamp(20px, 5vw, 40px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: '700', marginBottom: '30px', color: '#1a1a2e' }}>
              Sobre Nossa Advocacia
            </h2>
            <p style={{ fontSize: 'clamp(15px, 3vw, 16px)', lineHeight: 1.8, color: '#555', marginBottom: '20px' }}>
              A Advocacia Jurídica Profissional é constituída por profissionais experientes e dedicados à excelência no atendimento. Com anos de atuação no mercado jurídico, desenvolvemos uma sólida reputação baseada em competência, ética profissional e resultados concretos.
            </p>
            <p style={{ fontSize: 'clamp(15px, 3vw, 16px)', lineHeight: 1.8, color: '#555', marginBottom: '20px' }}>
              Nossos valores fundamentais incluem integridade, confidencialidade, comprometimento com o cliente e excelência técnica. Cada caso é tratado com máxima dedicação e atenção personalizada.
            </p>
            <a href="/sobre" style={{
              color: '#1a1a2e',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: 'clamp(14px, 2vw, 16px)',
              borderBottom: '2px solid #1a1a2e',
              paddingBottom: '4px'
            }}>
              Saiba mais sobre nós →
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" style={{
          padding: 'clamp(50px, 10vw, 80px) clamp(20px, 5vw, 40px)',
          backgroundColor: 'white'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: '700', marginBottom: '40px', textAlign: 'center', color: '#1a1a2e' }}>
              Entre em Contato
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              {/* Contact Info */}
              <div>
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: '700', marginBottom: '20px', color: '#1a1a2e' }}>
                  Informações de Contato
                </h3>
                <div style={{ marginBottom: '25px' }}>
                  <p style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: '600', marginBottom: '8px', color: '#1a1a2e' }}>
                    Email
                  </p>
                  <a href="mailto:contato@advocaciarofissional.com.br" style={{
                    fontSize: 'clamp(14px, 2vw, 15px)',
                    color: '#0066cc',
                    textDecoration: 'none'
                  }}>
                    contato@advocaciaprofissional.com.br
                  </a>
                </div>
                <div style={{ marginBottom: '25px' }}>
                  <p style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: '600', marginBottom: '8px', color: '#1a1a2e' }}>
                    Telefone
                  </p>
                  <a href="tel:+551133334444" style={{
                    fontSize: 'clamp(14px, 2vw, 15px)',
                    color: '#0066cc',
                    textDecoration: 'none'
                  }}>
                    (11) 3333-4444
                  </a>
                </div>
                <div>
                  <p style={{ fontSize: 'clamp(14px, 2vw, 15px)', fontWeight: '600', marginBottom: '8px', color: '#1a1a2e' }}>
                    Localização
                  </p>
                  <p style={{ fontSize: 'clamp(14px, 2vw, 15px)', color: '#666', margin: 0 }}>
                    São Paulo, SP<br />Brasil
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 style={{ fontSize: 'clamp(18px, 3vw, 20px)', fontWeight: '700', marginBottom: '20px', color: '#1a1a2e' }}>
                  Formulário de Contato
                </h3>
                {submitted && (
                  <div style={{
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    color: '#155724',
                    padding: '15px',
                    borderRadius: '6px',
                    marginBottom: '20px',
                    fontSize: 'clamp(14px, 2vw, 15px)'
                  }}>
                    ✓ Mensagem enviada com sucesso. Entraremos em contato em breve.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: 'clamp(14px, 2vw, 15px)', color: '#1a1a2e' }}>
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: 'clamp(10px, 2vw, 12px)',
                        fontSize: 'clamp(14px, 2vw, 15px)',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: 'clamp(14px, 2vw, 15px)', color: '#1a1a2e' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: 'clamp(10px, 2vw, 12px)',
                        fontSize: 'clamp(14px, 2vw, 15px)',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: 'clamp(14px, 2vw, 15px)', color: '#1a1a2e' }}>
                      Mensagem
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      style={{
                        width: '100%',
                        padding: 'clamp(10px, 2vw, 12px)',
                        fontSize: 'clamp(14px, 2vw, 15px)',
                        border: '1px solid #ccc',
                        borderRadius: '6px',
                        boxSizing: 'border-box',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#1a1a2e',
                      color: 'white',
                      padding: 'clamp(10px, 2vw, 12px) clamp(24px, 5vw, 32px)',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.3s',
                      width: '100%'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0d0d1f'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1a1a2e'}
                  >
                    Enviar Mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{
          backgroundColor: '#f8f9fa',
          padding: 'clamp(50px, 10vw, 80px) clamp(20px, 5vw, 40px)'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: '700', marginBottom: '40px', textAlign: 'center', color: '#1a1a2e' }}>
              Perguntas Frequentes
            </h2>
            <div style={{ display: 'grid', gap: '20px' }}>
              {[
                {
                  q: 'Quais são as áreas de atuação da advocacia?',
                  a: 'Atuamos em Direito Civil, Comercial, Administrativo e ofertamos consultoria jurídica geral. Cada caso é analisado individualmente para oferecer a melhor solução.'
                },
                {
                  q: 'Como funciona o atendimento inicial?',
                  a: 'O primeiro atendimento é uma consulta inicial onde analisamos seu caso e oferecemos uma avaliação preliminar. Este contato é confidencial e alinhado às normas éticas da profissão.'
                },
                {
                  q: 'Qual é a política de confidencialidade?',
                  a: 'Mantemos total sigilo sobre todas as informações fornecidas pelos clientes, conforme exigido pelas normas de ética profissional e legislação aplicável. Consulte nossa política de privacidade para detalhes.'
                },
                {
                  q: 'Como solicitar um orçamento?',
                  a: 'Você pode solicitar um orçamento entrando em contato através do formulário, email ou telefone. Avaliaremos sua demanda e apresentaremos uma proposta personalizada.'
                }
              ].map((faq, i) => (
                <div key={i} style={{
                  backgroundColor: 'white',
                  padding: 'clamp(20px, 4vw, 28px)',
                  borderRadius: '8px',
                  border: '1px solid #e0e0e0'
                }}>
                  <h3 style={{ fontSize: 'clamp(15px, 3vw, 18px)', fontWeight: '700', marginBottom: '12px', color: '#1a1a2e', margin: '0 0 12px 0' }}>
                    ❓ {faq.q}
                  </h3>
                  <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.6, color: '#666', margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#1a1a2e',
          color: 'white',
          padding: 'clamp(40px, 8vw, 60px) clamp(20px, 5vw, 40px) clamp(30px, 6vw, 40px) clamp(20px, 5vw, 40px)'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(30px, 5vw, 50px)',
              marginBottom: 'clamp(30px, 6vw, 40px)'
            }}>
              <div>
                <h4 style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: '700', marginBottom: '16px', margin: '0 0 16px 0' }}>
                  Advocacia Jurídica Profissional
                </h4>
                <p style={{ fontSize: 'clamp(13px, 2vw, 14px)', lineHeight: 1.8, opacity: 0.9, margin: 0 }}>
                  Serviços especializados de consultoria jurídica com excelência e profissionalismo.
                </p>
              </div>
              <div>
                <h4 style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: '700', marginBottom: '16px', margin: '0 0 16px 0' }}>
                  Links Rápidos
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}>
                    <a href="/sobre" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2vw, 14px)' }}>
                      Sobre Nós
                    </a>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <a href="/faq" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2vw, 14px)' }}>
                      Perguntas Frequentes
                    </a>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <a href="/contato" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2vw, 14px)' }}>
                      Contato
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: '700', marginBottom: '16px', margin: '0 0 16px 0' }}>
                  Políticas
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}>
                    <a href="/politica-privacidade" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2vw, 14px)' }}>
                      Política de Privacidade
                    </a>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <a href="/termos-servico" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2vw, 14px)' }}>
                      Termos de Serviço
                    </a>
                  </li>
                  <li>
                    <a href="/codigo-etica" style={{ color: '#fff', textDecoration: 'none', fontSize: 'clamp(13px, 2vw, 14px)' }}>
                      Código de Ética
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: 'clamp(20px, 5vw, 30px)',
              textAlign: 'center',
              fontSize: 'clamp(12px, 2vw, 13px)',
              opacity: 0.8
            }}>
              <p style={{ margin: 0 }}>
                &copy; 2026 Advocacia Jurídica Profissional. Todos os direitos reservados. | Desenvolvido com excelência jurídica
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
