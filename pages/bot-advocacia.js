import Head from 'next/head';

export default function AdvocaciaPage({ whatsappPhone = '551199999999' }) {
  const formattedPhone = whatsappPhone.startsWith('+') ? whatsappPhone : `+${whatsappPhone}`;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "Monteiro & Vasconcelos Advocacia",
    "description": "Especialistas em negociação de dívidas e recuperação financeira com experiência em renegociação bancária e análise jurídica.",
    "url": "https://mvadvocacia.com.br",
    "telephone": formattedPhone,
    "email": "contato@mvadvocacia.com",
    "areaServed": "BR",
    "serviceType": "Negociação de Dívidas",
    "priceRange": "Consultar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Principal, 1000",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "postalCode": "01000-000",
      "addressCountry": "BR"
    },
    "sameAs": [
      "https://www.facebook.com/mvadvocacia",
      "https://www.instagram.com/mvadvocacia",
      "https://www.linkedin.com/company/mvadvocacia"
    ]
  };

  return (
    <div className="bg-white text-gray-900">
      <Head>
        {/* Meta Tags Essenciais */}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* SEO Básico */}
        <title>Negociação de Dívidas | Monteiro & Vasconcelos Advocacia - SP</title>
        <meta name="description" content="Especialistas em negociação de dívidas e recuperação financeira. Análise jurídica, renegociação bancária e defesa contra cobranças abusivas. Atendimento em todo o Brasil." />
        <meta name="keywords" content="negociação de dívidas, advocacia, renegociação bancária, dívida, juros abusivos, recuperação financeira, advogado dívida" />

        {/* Indexação */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow" />

        {/* Canonical */}
        <link rel="canonical" href="https://mvadvocacia.com.br" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Negociação de Dívidas | Monteiro & Vasconcelos Advocacia" />
        <meta property="og:description" content="Especialistas em negociação de dívidas e recuperação financeira. Análise jurídica completa para sua situação." />
        <meta property="og:url" content="https://mvadvocacia.com.br" />
        <meta property="og:site_name" content="Monteiro & Vasconcelos Advocacia" />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Negociação de Dívidas | Monteiro & Vasconcelos Advocacia" />
        <meta name="twitter:description" content="Especialistas em negociação de dívidas e recuperação financeira." />

        {/* Verificações */}
        <meta name="author" content="Monteiro & Vasconcelos Advocacia" />
        <meta name="publisher" content="Monteiro & Vasconcelos Advocacia" />
        <meta name="google-site-verification" content="" />
        <meta name="msvalidate.01" content="" />

        {/* Cache Control */}
        <meta httpEquiv="cache-control" content="max-age=3600, must-revalidate" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

        {/* Preload críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.whatsapp.com" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-zinc-950 text-white border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-wider text-yellow-400">
              Monteiro & Vasconcelos
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm">
              Advocacia especializada em negociação de dívidas e recuperação financeira
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicos" className="text-sm text-zinc-300 hover:text-yellow-400 transition">Serviços</a>
            <a href="#sobre" className="text-sm text-zinc-300 hover:text-yellow-400 transition">Sobre</a>
            <a href="#contato" className="text-sm text-zinc-300 hover:text-yellow-400 transition">Contato</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-950 to-zinc-900 text-white relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.35),transparent_40%)]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex rounded-full border border-yellow-500/30 bg-yellow-500/10 px-5 py-2 text-sm text-yellow-300 mb-8">
            Guia Completo • Negociação de Dívidas
          </span>

          <h2 className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto mb-8">
            Como negociar dívidas da forma correta e recuperar sua estabilidade financeira
          </h2>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto mb-10">
            Entenda seus direitos, saiba como funcionam as renegociações bancárias e descubra estratégias utilizadas por especialistas jurídicos para buscar acordos mais equilibrados.
          </p>

          <a
            href="#contato"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-zinc-950 font-bold px-8 py-4 rounded-lg transition transform hover:scale-105"
          >
            Fale com um Especialista
          </a>
        </div>
      </section>

      {/* Artigo Principal */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-white rounded-3xl shadow-lg border border-zinc-200 overflow-hidden">
          <div className="p-8 md:p-14">
            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-8 pb-8 border-b border-zinc-200">
              <span>Atualizado em Maio de 2026</span>
              <span>•</span>
              <span>Leitura de 12 minutos</span>
              <span>•</span>
              <span>Equipe Jurídica Monteiro & Vasconcelos</span>
            </div>

            {/* Introdução */}
            <div className="mb-10 space-y-6 text-lg leading-8 text-zinc-700">
              <p>
                O aumento do custo de vida, juros elevados e imprevistos financeiros fizeram com que milhares de brasileiros enfrentassem dificuldades para manter pagamentos em dia. Em muitos casos, as dívidas acabam crescendo rapidamente devido a multas, juros e cobranças sucessivas.
              </p>

              <p>
                Apesar disso, muitas pessoas não sabem que existem alternativas legais e estratégias de negociação que podem ajudar a reduzir valores, reorganizar parcelas e até evitar cobranças abusivas.
              </p>
            </div>

            {/* Destaque */}
            <div className="my-12 rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 text-white p-10 md:p-12">
              <h3 className="text-3xl font-bold leading-tight mb-5">
                A negociação de dívida não é apenas uma conversa com o banco.
              </h3>
              <p className="text-zinc-300 leading-8 text-lg">
                Em diversas situações, uma análise jurídica adequada pode identificar cobranças indevidas, cláusulas abusivas e oportunidades de renegociação mais vantajosas.
              </p>
            </div>

            {/* Seção: O que é */}
            <section className="mt-16 mb-12">
              <h2 className="text-4xl font-bold mb-6 text-zinc-900">
                O que é negociação de dívida?
              </h2>
              <div className="space-y-6 text-lg leading-8 text-zinc-700">
                <p>
                  A negociação de dívida é um processo utilizado para buscar novas condições de pagamento junto a instituições financeiras, empresas de cobrança ou credores. O objetivo é encontrar um acordo mais sustentável para o consumidor.
                </p>
                <p>
                  Dependendo do caso, é possível reduzir juros, aumentar prazo de pagamento, obter descontos para quitação ou revisar cláusulas contratuais que estejam em desacordo com a legislação.
                </p>
              </div>
            </section>

            {/* Seção: Quando procurar ajuda */}
            <section className="mt-16 mb-12">
              <h2 className="text-4xl font-bold mb-6 text-zinc-900">
                Quando procurar ajuda especializada?
              </h2>
              <p className="text-lg leading-8 text-zinc-700 mb-8">
                Muitas pessoas tentam resolver tudo diretamente com bancos ou empresas de cobrança, mas acabam aceitando acordos desfavoráveis por falta de orientação adequada.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200">
                  <h3 className="text-2xl font-bold mb-4 text-zinc-900">
                    Sinais de alerta
                  </h3>
                  <ul className="space-y-3 text-zinc-700 leading-relaxed">
                    <li>• Parcelas impossíveis de manter</li>
                    <li>• Juros muito elevados</li>
                    <li>• Ligações excessivas de cobrança</li>
                    <li>• Nome negativado há muito tempo</li>
                    <li>• Dificuldade para reorganizar finanças</li>
                  </ul>
                </div>

                <div className="bg-yellow-500 rounded-3xl p-8 text-zinc-950">
                  <h3 className="text-2xl font-bold mb-4">
                    O que um advogado pode fazer
                  </h3>
                  <ul className="space-y-3 leading-relaxed font-medium">
                    <li>• Revisão contratual detalhada</li>
                    <li>• Análise de juros e encargos</li>
                    <li>• Intermediação de negociações</li>
                    <li>• Defesa contra cobranças abusivas</li>
                    <li>• Estratégias para recuperação financeira</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Seção: Dívidas bancárias */}
            <section className="mt-16 mb-12">
              <h2 className="text-4xl font-bold mb-6 text-zinc-900">
                Dívidas bancárias e juros abusivos
              </h2>
              <div className="space-y-6 text-lg leading-8 text-zinc-700">
                <p>
                  Um dos principais problemas enfrentados pelos consumidores está relacionado aos juros elevados em cartões de crédito, empréstimos pessoais e cheque especial.
                </p>
                <p>
                  Em alguns casos, o valor original da dívida cresce rapidamente, tornando praticamente impossível a quitação sem uma renegociação adequada. Por isso, a análise jurídica se torna importante para verificar se existem práticas abusivas ou cobranças excessivas.
                </p>
              </div>

              <blockquote className="mt-12 border-l-4 border-yellow-500 pl-6 italic text-2xl leading-relaxed text-zinc-700">
                "Buscar orientação antes de assinar um novo acordo pode evitar que o consumidor entre novamente em um ciclo de endividamento."
              </blockquote>
            </section>

            {/* Seção: Como funciona */}
            <section className="mt-16">
              <h2 className="text-4xl font-bold mb-6 text-zinc-900">
                Como funciona o atendimento da Monteiro & Vasconcelos Advocacia?
              </h2>
              <p className="text-lg leading-8 text-zinc-700 mb-10">
                Nosso escritório realiza uma análise inicial da situação financeira e contratual do cliente. A partir disso, avaliamos possibilidades jurídicas e estratégias de negociação compatíveis com cada caso.
              </p>

              <div className="space-y-6">
                {[
                  {
                    num: '1',
                    title: 'Análise financeira e contratual',
                    desc: 'Avaliação completa das dívidas, contratos e cobranças.'
                  },
                  {
                    num: '2',
                    title: 'Estratégia personalizada',
                    desc: 'Definição da melhor abordagem de negociação para cada situação.'
                  },
                  {
                    num: '3',
                    title: 'Acompanhamento completo',
                    desc: 'Suporte durante todo o processo de negociação e formalização do acordo.'
                  }
                ].map((step, i) => (
                  <div key={i} className="flex gap-5 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:shadow-lg transition">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-yellow-500 flex items-center justify-center font-bold text-zinc-950">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-zinc-600 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Final */}
            <div id="contato" className="mt-20 rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 text-white p-10 md:p-14 text-center scroll-mt-20">
              <span className="inline-flex rounded-full bg-yellow-500/10 border border-yellow-500/30 px-4 py-2 text-yellow-300 text-sm mb-6">
                Atendimento em todo o Brasil
              </span>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight max-w-3xl mx-auto mb-6">
                Fale com um especialista e entenda quais opções podem existir para o seu caso
              </h2>

              <p className="text-zinc-300 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Nossa equipe realiza atendimento online com análise personalizada para consumidores e empresas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${whatsappPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-zinc-950 font-bold px-8 py-4 rounded-lg transition"
                >
                  Conversar via WhatsApp
                </a>
                <a
                  href="mailto:contato@mvadvocacia.com"
                  className="inline-block bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg transition border border-white/20"
                >
                  Enviar Email
                </a>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Links de Políticas */}
      <section className="bg-zinc-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/politica-privacidade" className="text-zinc-700 hover:text-zinc-900 transition font-medium">
              Política de Privacidade
            </a>
            <span className="text-zinc-400">•</span>
            <a href="/termos-servico" className="text-zinc-700 hover:text-zinc-900 transition font-medium">
              Termos de Serviço
            </a>
            <span className="text-zinc-400">•</span>
            <a href="/sobre" className="text-zinc-700 hover:text-zinc-900 transition font-medium">
              Sobre
            </a>
            <span className="text-zinc-400">•</span>
            <a href="/faq" className="text-zinc-700 hover:text-zinc-900 transition font-medium">
              FAQ
            </a>
          </nav>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-zinc-400 border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-yellow-400 text-2xl font-bold mb-4">
                Monteiro & Vasconcelos
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Advocacia especializada em negociação de dívidas, recuperação financeira e defesa de direitos consumeristas.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contato</h4>
              <div className="text-sm space-y-2">
                <p>
                  <a href={`tel:${formattedPhone}`} className="hover:text-yellow-400 transition">
                    {formattedPhone}
                  </a>
                </p>
                <p>
                  <a href="mailto:contato@mvadvocacia.com" className="hover:text-yellow-400 transition">
                    contato@mvadvocacia.com
                  </a>
                </p>
                <p className="text-zinc-500 mt-4">
                  Atendimento online em todo o Brasil
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Endereço</h4>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Av. Principal, 1000<br />
                São Paulo, SP 01000-000<br />
                Brasil
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-sm text-zinc-600">
              © 2026 Monteiro & Vasconcelos Advocacia. Todos os direitos reservados. |
              <a href="/politica-privacidade" className="hover:text-yellow-400 transition ml-2">Política de Privacidade</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
