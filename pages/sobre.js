import Head from 'next/head';

export default function Sobre() {
  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>Sobre Monteiro & Vasconcelos Advocacia | Especialistas em Negociação de Dívidas</title>
        <meta name="description" content="Conheça a Monteiro & Vasconcelos Advocacia. Especialistas em negociação de dívidas e recuperação financeira com anos de experiência." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mvadvocacia.com.br/sobre" />
      </Head>

      <header className="sticky top-0 z-50 bg-zinc-950 text-white border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold tracking-wider text-yellow-400">
              Monteiro & Vasconcelos
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Advocacia especializada em negociação de dívidas
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm text-zinc-300 hover:text-yellow-400 transition">Início</a>
            <a href="/#contato" className="text-sm text-zinc-300 hover:text-yellow-400 transition">Contato</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-white rounded-3xl shadow-lg border border-zinc-200 p-8 md:p-14">
          <h1 className="text-4xl font-bold mb-8 text-zinc-900">
            Sobre Monteiro & Vasconcelos
          </h1>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mt-8 mb-4">Nossa Missão</h2>
            <p className="text-lg leading-8 text-zinc-700">
              Promover recuperação financeira e justiça para pessoas e empresas que enfrentam dificuldades no pagamento de dívidas, através de análise jurídica rigorosa, negociação ética e defesa dos direitos consumeristas.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mt-8 mb-4">Visão</h2>
            <p className="text-lg leading-8 text-zinc-700">
              Ser referência nacional em consultoria jurídica para negociação de dívidas, reconhecida pela excelência, ética profissional e resultados positivos alcançados.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mt-8 mb-4">Nossos Valores</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                { title: 'Integridade', desc: 'Atuamos com honestidade e transparência em todas as relações.' },
                { title: 'Excelência', desc: 'Buscamos qualidade máxima em todos os serviços prestados.' },
                { title: 'Empatia', desc: 'Compreendemos as dificuldades de nossos clientes e atuamos com solidariedade.' },
                { title: 'Profissionalismo', desc: 'Mantemos altos padrões éticos e técnicos no exercício profissional.' },
              ].map((valor, i) => (
                <div key={i} className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">{valor.title}</h3>
                  <p className="text-zinc-700">{valor.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mt-8 mb-4">Áreas de Atuação</h2>
            <div className="space-y-4 mt-6">
              {[
                'Negociação de dívidas bancárias e cheque especial',
                'Renegociação de empréstimos pessoais',
                'Análise e revisão de contratos',
                'Defesa contra cobranças abusivas',
                'Ações por cobrança indevida',
                'Recuperação de crédito consumerista',
                'Análise de prescrição de dívidas',
                'Consultoria em insolvência pessoal',
              ].map((area, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-zinc-50 rounded-lg border border-zinc-200">
                  <span className="text-yellow-500 font-bold text-xl shrink-0">✓</span>
                  <p className="text-zinc-700 leading-relaxed">{area}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 border border-yellow-200">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900">Por que escolher a gente?</h2>
            <ul className="space-y-3 text-zinc-700">
              <li className="flex gap-3">
                <span className="text-yellow-600 font-bold">→</span>
                <span>Experiência de anos em negociação de dívidas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-600 font-bold">→</span>
                <span>Equipe de advogados especializados em direito consumerista</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-600 font-bold">→</span>
                <span>Análise personalizada de cada caso</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-600 font-bold">→</span>
                <span>Atendimento online em todo o Brasil</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-600 font-bold">→</span>
                <span>Transparência total sobre possibilidades jurídicas</span>
              </li>
              <li className="flex gap-3">
                <span className="text-yellow-600 font-bold">→</span>
                <span>Acompanhamento completo do processo negocial</span>
              </li>
            </ul>
          </section>

          <section className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Quer conhecer melhor nossos serviços?</h2>
            <p className="text-zinc-300 mb-6">
              Agende uma consulta inicial e descubra como podemos ajudar sua situação financeira.
            </p>
            <a
              href="https://wa.me/551199999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-zinc-950 font-bold px-8 py-4 rounded-lg transition"
            >
              Conversar via WhatsApp
            </a>
          </section>
        </article>
      </main>

      <footer className="bg-black text-zinc-400 border-t border-white/10 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <p className="text-sm">
              © 2026 Monteiro & Vasconcelos Advocacia. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
