import Head from 'next/head';

export default function TermosServico() {
  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>Termos de Serviço | Monteiro & Vasconcelos Advocacia</title>
        <meta name="description" content="Termos de Serviço da Monteiro & Vasconcelos Advocacia. Condições de uso de nossos serviços." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mvadvocacia.com.br/termos-servico" />
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
          <h1 className="text-4xl font-bold mb-8 text-zinc-900">
            Termos de Serviço
          </h1>

          <p className="text-zinc-600 mb-8">
            <strong>Última atualização: Maio de 2026</strong>
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-zinc-700">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceito dos Termos</h2>
              <p>
                Ao acessar e usar os serviços de consultoria jurídica da Monteiro & Vasconcelos Advocacia, você concorda em estar vinculado por estes Termos de Serviço. Se você não concorda com qualquer parte destes termos, não utilize nossos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Descrição dos Serviços</h2>
              <p>
                Oferecemos consultoria jurídica especializada em negociação de dívidas, análise contratual, renegociação bancária e recuperação financeira. Nossos serviços são prestados por profissionais qualificados e experientes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Responsabilidades do Cliente</h2>
              <p>Como cliente, você concorda em:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fornecer informações precisas e completas</li>
                <li>Seguir as recomendações do advogado</li>
                <li>Manter a confidencialidade de informações</li>
                <li>Cooperar no processo de negociação</li>
                <li>Responder prontamente comunicações</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Honorários e Pagamento</h2>
              <p>
                Os valores dos serviços serão acordados previamente. O pagamento deve ser realizado conforme estipulado em contrato. Atrasos podem resultar em suspensão dos serviços.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Sigilo Profissional</h2>
              <p>
                Todas as informações compartilhadas são protegidas pelo sigilo profissional, conforme determina a legislação brasileira e o Código de Ética Profissional.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitação de Responsabilidade</h2>
              <p>
                Não garantimos resultados específicos. Resultados dependem de diversos fatores, incluindo ação das instituições credoras e circunstâncias individuais de cada caso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Rescisão</h2>
              <p>
                Qualquer das partes pode rescindir a relação de consultoria com notificação prévia de 30 dias. Obrigações pendentes permanecerão em vigor até sua conclusão.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Lei Aplicável</h2>
              <p>
                Estes termos são regidos pelas leis da República Federativa do Brasil, especialmente as leis de proteção ao consumidor e direito civil.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Contato</h2>
              <p>
                Para dúvidas sobre estes termos, contate-nos em:<br />
                <strong>Email:</strong> <a href="mailto:contato@mvadvocacia.com" className="text-yellow-600 hover:underline">contato@mvadvocacia.com</a>
              </p>
            </section>
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
