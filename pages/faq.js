import Head from 'next/head';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'Qual é o tempo médio para resolver uma negociação de dívida?',
      a: 'O tempo varia conforme a complexidade do caso, mas geralmente a negociação leva de 2 a 6 meses. Casos simples podem ser resolvidos mais rapidamente, enquanto casos complexos envolvendo múltiplas dívidas demandam mais tempo.'
    },
    {
      q: 'Vocês garantem redução de juros?',
      a: 'Não garantimos valores específicos, pois depende da instituição credora e da situação individual. Porém, nossa análise jurídica identifica oportunidades reais de negociação e renegociação.'
    },
    {
      q: 'Qual é o valor dos honorários?',
      a: 'Os honorários são personalizados conforme a complexidade do caso. Realizamos uma análise inicial gratuita para apresentar opcões e valores.'
    },
    {
      q: 'Vocês atuam em qual cidade/estado?',
      a: 'Atuamos em todo o Brasil através de atendimento online. Não é necessário comparecer presencialmente, facilitando o acesso ao serviço.'
    },
    {
      q: 'Minha dívida prescreveu. Ainda preciso de ajuda?',
      a: 'Sim. Mesmo com prescrição, podemos ajudar na defesa contra cobranças indevidas e na restauração de sua reputação creditícia.'
    },
    {
      q: 'Como funciona a primeira consulta?',
      a: 'A primeira consulta é realizada via WhatsApp ou email. Você compartilha detalhes sobre sua situação e recebe uma avaliação inicial sobre as possibilidades jurídicas.'
    },
    {
      q: 'Posso confiar na confidencialidade?',
      a: 'Sim. Toda informação é protegida pelo sigilo profissional conforme a legislação brasileira e Código de Ética Profissional.'
    },
    {
      q: 'E se não conseguir chegar a um acordo?',
      a: 'Analisamos todas as alternativas jurídicas disponíveis, incluindo ações judiciais por cobranças abusivas ou indevidas quando apropriado.'
    },
    {
      q: 'Vocês lidam com negativação?',
      a: 'Sim. Podemos ajudar a remover seu nome dos órgãos de restrição (SPC/Serasa) através de negociação ou ações judiciais.'
    },
    {
      q: 'Qual é o diferencial de contratar um advogado?',
      a: 'Um advogado identifica direitos que você não conhece, negocia de forma mais eficaz, protege contra práticas ilegais e oferece segurança jurídica no processo.'
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>FAQ - Perguntas Frequentes | Monteiro & Vasconcelos Advocacia</title>
        <meta name="description" content="Respostas para as perguntas mais frequentes sobre negociação de dívidas e serviços jurídicos." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mvadvocacia.com.br/faq" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": ${JSON.stringify(faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            })))}
          }
        `}</script>
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
            <a href="/sobre" className="text-sm text-zinc-300 hover:text-yellow-400 transition">Sobre</a>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <article className="bg-white rounded-3xl shadow-lg border border-zinc-200 p-8 md:p-14">
          <h1 className="text-4xl font-bold mb-4 text-zinc-900">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-zinc-600 mb-12">
            Encontre respostas para as dúvidas mais comuns sobre negociação de dívidas e nossos serviços.
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-zinc-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 flex justify-between items-center bg-zinc-50 hover:bg-zinc-100 transition"
                >
                  <h3 className="text-lg font-bold text-zinc-900 flex-1">
                    {faq.q}
                  </h3>
                  <span className={`text-2xl text-yellow-500 shrink-0 transition transform ${openIndex === index ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>

                {openIndex === index && (
                  <div className="p-6 bg-white border-t border-zinc-200">
                    <p className="text-zinc-700 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 p-10 rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200">
            <h2 className="text-2xl font-bold mb-4 text-zinc-900">
              Não encontrou sua resposta?
            </h2>
            <p className="text-zinc-700 mb-6">
              Entre em contato conosco diretamente e converse com um especialista sobre seu caso específico.
            </p>
            <a
              href="https://wa.me/551199999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-lg transition"
            >
              Fale com um Especialista
            </a>
          </div>
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
