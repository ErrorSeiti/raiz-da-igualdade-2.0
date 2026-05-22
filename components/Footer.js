function Footer({ showToast, onEasterEgg }) {
  const currentYear = new Date().getFullYear();
  const [eggClicks, setEggClicks] = React.useState(0);

  const handleEasterEggClick = () => {
    setEggClicks(prev => {
      if (prev + 1 >= 7) {
        if (onEasterEgg) onEasterEgg();
        return 0;
      }
      return prev + 1;
    });
  };
  
  const handleLinkClick = (e, name) => {
    e.preventDefault();
    if (showToast) showToast(`Link para ${name} não disponível na demonstração.`);
  };

  return (
    <footer className="bg-[var(--azul-padrao2)] pt-12 pb-6 border-t border-[var(--azul-base)] mt-auto" data-name="footer" data-file="components/Footer.js">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
          
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="lucide-sprout text-[var(--azul-base-3)]"></span>
              Raiz da Igualdade
            </h3>
            <p className="text-[var(--azul-base-4)] text-sm mb-4">
              Promovendo dignidade, justiça e igualdade através da informação e tecnologia.
            </p>
            <div className="flex gap-4">
              <button onClick={(e) => handleLinkClick(e, 'Instagram')} className="w-8 h-8 rounded bg-[var(--azul-base)] flex items-center justify-center text-[var(--azul-base-4)] hover:text-white hover:bg-[var(--azul-base-2)] transition-colors">
                <span className="lucide-instagram w-4 h-4"></span>
              </button>
              <button onClick={(e) => handleLinkClick(e, 'Twitter')} className="w-8 h-8 rounded bg-[var(--azul-base)] flex items-center justify-center text-[var(--azul-base-4)] hover:text-white hover:bg-[var(--azul-base-2)] transition-colors">
                <span className="lucide-twitter w-4 h-4"></span>
              </button>
              <button onClick={(e) => handleLinkClick(e, 'Facebook')} className="w-8 h-8 rounded bg-[var(--azul-base)] flex items-center justify-center text-[var(--azul-base-4)] hover:text-white hover:bg-[var(--azul-base-2)] transition-colors">
                <span className="lucide-facebook w-4 h-4"></span>
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm text-[var(--azul-base-4)]">
              <li><button onClick={(e) => handleLinkClick(e, 'Declaração Universal')} className="hover:text-[var(--azul-base-3)] transition-colors">Declaração Universal</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'ONU Brasil')} className="hover:text-[var(--azul-base-3)] transition-colors">ONU Brasil</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Anistia Internacional')} className="hover:text-[var(--azul-base-3)] transition-colors">Anistia Internacional</button></li>
              <li><button onClick={(e) => handleLinkClick(e, 'Política de Privacidade')} className="hover:text-[var(--azul-base-3)] transition-colors">Politica de Privacidade</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-[var(--azul-base-4)]">
              <li className="flex items-center gap-2">
                <span className="lucide-mail w-4 h-4"></span> contato@raizdaigualdade.org
              </li>
              <li className="flex items-center gap-2">
                <span className="lucide-phone w-4 h-4"></span> (11) 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <span className="lucide-map-pin w-4 h-4"></span> São Paulo, SP - Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--azul-base)] pt-6 text-center text-[var(--azul-base-5)] text-xs">
          <p className="cursor-default select-none" onClick={handleEasterEggClick}>© {currentYear} Raiz da Igualdade | Projeto Acadêmico sem fins lucrativos.</p>
        </div>
      </div>
    </footer>
  );
}
