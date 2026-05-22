import Head from 'next/head';

export default function PoliticaPrivacidade() {
  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>Política de Privacidade | Monteiro & Vasconcelos Advocacia</title>
        <meta name="description" content="Política de Privacidade da Monteiro & Vasconcelos Advocacia. Saiba como protegemos seus dados pessoais." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mvadvocacia.com.br/politica-privacidade" />
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
            Política de Privacidade
          </h1>

          <p className="text-zinc-600 mb-8">
            <strong>Última atualização: Maio de 2026</strong>
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-zinc-700">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introdução</h2>
              <p>
                A Monteiro & Vasconcelos Advocacia ("nós", "nosso" ou "empresa") está comprometida com a proteção de sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Informações que Coletamos</h2>
              <p>Podemos coletar as seguintes informações:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nome completo, CPF e dados de identificação</li>
                <li>Endereço de email e telefone</li>
                <li>Histórico de dívidas e informações financeiras</li>
                <li>Documentos e arquivos enviados durante o atendimento</li>
                <li>Dados de navegação e interação com nosso site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Como Usamos Suas Informações</h2>
              <p>Utilizamos as informações coletadas para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Prestar serviços de consultoria jurídica</li>
                <li>Comunicação sobre negociações e acordos</li>
                <li>Melhorar nossos serviços</li>
                <li>Cumprir obrigações legais</li>
                <li>Prevenir fraude e atividades ilícitas</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Proteção de Dados</h2>
              <p>
                Implementamos medidas de segurança apropriadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Todos os dados são criptografados em trânsito e em repouso.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Direitos do Usuário</h2>
              <p>Você tem o direito de:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir informações imprecisas</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Opor-se ao processamento de seus dados</li>
                <li>Receber uma cópia de seus dados</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Contato</h2>
              <p>
                Para questões sobre privacidade, entre em contato conosco em:<br />
                <strong>Email:</strong> <a href="mailto:privacidade@mvadvocacia.com" className="text-yellow-600 hover:underline">privacidade@mvadvocacia.com</a>
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
