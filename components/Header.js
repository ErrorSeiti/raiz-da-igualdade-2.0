function Header({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/2966/2966334.png";

  const navItems = [
    { id: 'home', label: 'Início', icon: 'house' },
    { id: 'pilares', label: 'Pilares', icon: 'columns-3' },
    { id: 'mapa-mental', label: 'Mapa Mental', icon: 'brain-circuit' },
    { id: 'mapa', label: 'Buscar Escritórios', icon: 'map-pin' },
    { id: 'equipe', label: 'Sobre', icon: 'info' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-[var(--azul-padrao2)] shadow-lg sticky top-0 z-50 border-b border-[var(--azul-base)]" data-name="header" data-file="components/Header.js">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={logoUrl} 
              alt="Logo Raiz da Igualdade" 
              className="w-10 h-10 rounded-lg bg-white p-1 transition-transform group-hover:scale-110"
            />
            <h1 className="text-xl md:text-2xl font-bold text-[var(--azul-base-6)] m-0 leading-tight">
              Raiz da<br/>Igualdade
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button 
                key={item.id}
                className={`btn-nav flex items-center gap-2 ${currentPage === item.id ? 'active' : 'opacity-80 hover:opacity-100'}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className={`lucide-${item.icon} text-lg`}></span>
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 hover:bg-[var(--azul-base)] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`lucide-${isMenuOpen ? 'x' : 'menu'} text-2xl`}></span>
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--azul-base)] animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button 
                  key={item.id}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors
                    ${currentPage === item.id 
                      ? 'bg-[var(--azul-base-2)] text-white' 
                      : 'text-[var(--azul-base-6)] hover:bg-[var(--azul-base)]'
                    }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className={`lucide-${item.icon} text-xl`}></span>
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
