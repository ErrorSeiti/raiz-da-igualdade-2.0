function Pillars() {
  const [expandedIndex, setExpandedIndex] = React.useState(null);

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const sections = [
    {
      title: "Liberdade",
      icon: "sun",
      color: "text-yellow-400",
      content: "A liberdade pode ser entendida como ausência de restrições ou como posse de direitos civis, políticos e sociais. No plano político, envolve exercer a cidadania respeitando os direitos dos outros.",
      moreContent: "A liberdade de expressão é um direito fundamental, mas não é absoluta, sendo limitada pelo respeito à dignidade alheia e vedação ao discurso de ódio. Historicamente, a luta pela liberdade está ligada à abolição da escravatura e à conquista do sufrágio universal."
    },
    {
      title: "Igualdade",
      icon: "scale",
      color: "text-blue-400",
      content: (
        <>
          <p>Igualdade é o princípio que garante que todas as pessoas tenham os mesmos direitos, oportunidades e tratamento, sem discriminação de origem, gênero, cor, religião ou condição social.</p>
          <div className="mt-4 bg-[var(--azul-padrao1)] p-3 rounded border-l-2 border-[var(--azul-base-3)]">
            <h4 className="font-bold text-white text-sm mb-1">Formal vs. Material</h4>
            <p className="text-xs text-[var(--azul-base-5)]">A igualdade formal é a lei escrita. A material busca garantir condições reais.</p>
          </div>
        </>
      ),
      moreContent: "Políticas de ações afirmativas (cotas) são exemplos de mecanismos que buscam a igualdade material, corrigindo desigualdades históricas para oferecer oportunidades equitativas a grupos marginalizados."
    },
    {
      title: "Justiça",
      icon: "gavel",
      color: "text-red-400",
      content: (
        <>
          <p>Justiça busca o equilíbrio e a imparcialidade nas relações sociais. Ela orienta a forma como as leis são aplicadas.</p>
          <ul className="mt-4 space-y-1 text-sm text-[var(--azul-base-5)]">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--azul-base-3)]"></span>Restaurativa</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--azul-base-3)]"></span>Ambiental</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--azul-base-3)]"></span>Digital</li>
          </ul>
        </>
      ),
      moreContent: "O acesso à justiça é vital. A Defensoria Pública atua para garantir que pessoas sem recursos possam defender seus direitos, concretizando o ideal de justiça para todos, não apenas para quem pode pagar."
    },
    {
      title: "Dignidade",
      icon: "sprout",
      color: "text-green-400",
      content: "A dignidade humana é um valor essencial e intrínseco de cada indivíduo, que deve ser reconhecido e respeitado como um fim em si mesmo.",
      moreContent: "Este princípio é o fundamento de todos os Direitos Humanos. Nenhuma lei ou estado pode violar a dignidade da pessoa humana, proibindo-se tortura, tratamento degradante e condições de vida subumanas."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8" data-name="pillars" data-file="components/Pillars.js">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Os 4 Pilares Fundamentais</h2>
        <p className="text-[var(--azul-base-4)] max-w-2xl mx-auto">
          Conheça os conceitos essenciais que sustentam a Declaração Universal dos Direitos Humanos e garantem uma sociedade mais justa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className={`bg-[var(--azul-base)] rounded-2xl p-6 transition-all duration-300 border border-transparent hover:border-[var(--azul-base-3)] flex flex-col ${expandedIndex === idx ? 'md:col-span-2 row-span-2 bg-[var(--azul-padrao1)] shadow-2xl z-10' : 'hover:-translate-y-2'}`}>
            <div className={`w-14 h-14 rounded-full bg-[var(--azul-padrao1)] flex items-center justify-center mb-6 ${section.color} ${expandedIndex === idx ? 'bg-[var(--azul-base)]' : ''}`}>
              <div className={`lucide-${section.icon} text-2xl`}></div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
            
            <div className="text-[var(--azul-base-5)] text-sm leading-relaxed mb-4 flex-grow">
              {section.content}
              {expandedIndex === idx && (
                <div className="mt-4 pt-4 border-t border-[var(--azul-base-3)] animate-fade-in text-white">
                  <p>{section.moreContent}</p>
                </div>
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-[var(--azul-padrao1)]">
              <button 
                onClick={() => toggleExpand(idx)}
                className="text-[var(--azul-base-3)] text-sm font-semibold hover:text-white flex items-center gap-1 transition-colors"
              >
                {expandedIndex === idx ? 'Mostrar menos' : 'Saiba mais'} 
                <span className={`lucide-chevron-${expandedIndex === idx ? 'up' : 'down'} w-3 h-3`}></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-[var(--azul-base)] rounded-xl p-8 border-l-4 border-[var(--azul-base-3)] text-left">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="lucide-book-open"></span> Referências e Fontes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="https://enciclopediajuridica.pucsp.br/verbete/4/edicao-1/igualdade" target="_blank" className="flex items-start gap-3 p-4 rounded-lg bg-[var(--azul-padrao1)] hover:bg-[var(--azul-base-1)] transition-colors group">
            <span className="lucide-library text-[var(--azul-base-4)] mt-1 group-hover:text-white"></span>
            <div>
              <span className="block font-semibold text-white mb-1">Enciclopédia Jurídica PUC-SP</span>
              <span className="text-xs text-[var(--azul-base-4)]">Conceito de Igualdade</span>
            </div>
          </a>
          <a href="https://brasilescola.uol.com.br/sociologia/consciencia-e-liberda-humana-texto-2.htm" target="_blank" className="flex items-start gap-3 p-4 rounded-lg bg-[var(--azul-padrao1)] hover:bg-[var(--azul-base-1)] transition-colors group">
            <span className="lucide-library text-[var(--azul-base-4)] mt-1 group-hover:text-white"></span>
            <div>
              <span className="block font-semibold text-white mb-1">Brasil Escola</span>
              <span className="text-xs text-[var(--azul-base-4)]">Consciência e Liberdade</span>
            </div>
          </a>
          <a href="https://brasilescola.uol.com.br/o-que-e/o-que-e-sociologia/o-que-e-justica.htm" target="_blank" className="flex items-start gap-3 p-4 rounded-lg bg-[var(--azul-padrao1)] hover:bg-[var(--azul-base-1)] transition-colors group">
            <span className="lucide-library text-[var(--azul-base-4)] mt-1 group-hover:text-white"></span>
            <div>
              <span className="block font-semibold text-white mb-1">Brasil Escola</span>
              <span className="text-xs text-[var(--azul-base-4)]">O que é Justiça</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
