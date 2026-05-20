function Team({ showToast }) {
  const members = [
    { name: "Giovanni Gonçalves Santini", role: "Desenvolvedor", ra: "242003407" },
    { name: "Gabriel Seiti de Marino Suda", role: "Desenvolvedor", ra: "241001360" },
    { name: "Murilo Vieira Marinho", role: "Desenvolvedor", ra: "170000992" },
    { name: "Victor Gonzales de Sa", role: "Desenvolvedor", ra: "241001342" }
  ];

  const handleSocialClick = (e, network) => {
    e.preventDefault();
    if (showToast) showToast(`Link do ${network} não configurado para demonstração.`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8" data-name="team" data-file="components/Team.js">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Quem Somos</h2>
        <p className="text-[var(--azul-base-4)]">
          Projeto de Extensão Universitária - Direitos Humanos<br/>
          Universidade Carlos Drummond de Andrade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member, idx) => (
          <div key={idx} className="bg-[var(--azul-base)] rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 group border border-transparent hover:border-[var(--azul-base-3)]">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--azul-padrao1)] flex items-center justify-center border-2 border-[var(--azul-base-2)] group-hover:border-[var(--azul-base-4)] transition-colors">
              <span className="lucide-user text-3xl text-[var(--azul-base-4)] group-hover:text-white transition-colors"></span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
            <p className="text-sm text-[var(--azul-base-3)] font-medium mb-1">{member.role}</p>
            <p className="text-xs text-[var(--azul-base-5)] mb-3">RA: {member.ra}</p>
            
            <div className="flex justify-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => handleSocialClick(e, 'Github')}
                className="p-2 hover:text-white transition-colors"
                title="Github"
              >
                <span className="lucide-github w-4 h-4"></span>
              </button>
              <button 
                onClick={(e) => handleSocialClick(e, 'LinkedIn')}
                className="p-2 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <span className="lucide-linkedin w-4 h-4"></span>
              </button>
              <button 
                onClick={(e) => handleSocialClick(e, 'E-mail')}
                className="p-2 hover:text-white transition-colors"
                title="E-mail"
              >
                <span className="lucide-mail w-4 h-4"></span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-[var(--azul-base)] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="text-left">
          <h3 className="text-2xl font-bold text-white mb-2">Sobre o Projeto</h3>
          <p className="text-[var(--azul-base-4)] max-w-lg">
            "Raiz da Igualdade" nasceu com o propósito de democratizar o acesso à informação sobre direitos humanos 
            e facilitar a localização de assistência jurídica gratuita para quem mais precisa.
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-[var(--azul-padrao1)] rounded-lg flex items-center justify-center">
             <span className="lucide-code-xml text-3xl text-[var(--azul-base-3)]"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
