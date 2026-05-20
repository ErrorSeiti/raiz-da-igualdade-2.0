function Home({ setCurrentPage }) {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [lastUpdate, setLastUpdate] = React.useState('');
  
  const heroImage = "https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=2000";

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Fetch from NewsAPI (human rights / UN / ONU keywords)
      const API_KEY = 'YOUR_NEWSAPI_KEY'; // Replace with your key from newsapi.org
      const url = `https://newsapi.org/v2/everything?q=human+rights+OR+direitos+humanos+OR+ONU+OR+UNESCO&language=pt&sortBy=publishedAt&apiKey=${API_KEY}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      const articles = data.articles.slice(0, 6).map(article => ({
        title: article.title || 'Sem título',
        description: article.description || 'Sem descrição disponível',
        url: article.url,
        urlToImage: article.urlToImage || 'https://images.unsplash.com/photo-1547625121-655268480302?auto=format&fit=crop&q=80&w=600',
        source: article.source.name || 'Fonte desconhecida',
        date: formatRelativeDate(article.publishedAt)
      }));

      setNews(articles);
      setLoading(false);
      setLastUpdate(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    } catch (error) {
      console.warn('NewsAPI fallback due to CORS/local dev:', error);
      // Fallback para dados simulados
      setNews([
        {
          title: "ONU alerta sobre crises humanitárias globais",
          description: "Relatório aponta necessidade urgente de fundos para apoiar refugiados em diversas regiões de conflito.",
          url: "https://news.un.org/pt/",
          urlToImage: "https://images.unsplash.com/photo-1547625121-655268480302?auto=format&fit=crop&q=80&w=600",
          source: "ONU News",
          date: "Há 2 horas"
        },
        {
          title: "Avanços na legislação de direitos digitais na Europa",
          description: "Novas leis buscam proteger a privacidade dos cidadãos na internet.",
          url: "https://ec.europa.eu/info/law/law-topic/data-protection_pt",
          urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
          source: "Tecnologia & Sociedade",
          date: "Há 5 horas"
        },
        {
          title: "Educação como pilar dos direitos fundamentais",
          description: "UNESCO lança campanha para erradicar analfabetismo até 2030.",
          url: "https://www.unesco.org/pt",
          urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
          source: "Educação Hoje",
          date: "Há 1 dia"
        }
      ]);
      setLoading(false);
      setLastUpdate(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
    }
  };

  const formatRelativeDate = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Agora mesmo';
    if (diffHours < 24) return `Há ${diffHours} horas`;
    if (diffHours < 48) return 'Há 1 dia';
    return `Há ${Math.floor(diffHours / 24)} dias`;
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="fade-in space-y-12" data-name="home" data-file="components/Home.js">
      
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--azul-padrao2)] via-[var(--azul-padrao1)] to-transparent opacity-90"></div>
        </div>
        
        <div className="relative z-10 p-8 md:p-16 text-left max-w-2xl">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[var(--azul-base-2)] text-white text-sm font-semibold tracking-wide uppercase">
            Direitos Humanos
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Igualdade, Justiça e Liberdade
          </h1>
          <p className="text-lg md:text-xl text-[var(--azul-base-6)] mb-8 leading-relaxed">
            Bem-vindo ao portal que conecta você aos seus direitos. 
            Informação, educação e acesso à justiça em um só lugar.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setCurrentPage('pilares')}
              className="bg-[var(--azul-base-3)] hover:bg-[var(--azul-base-2)] text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg flex items-center gap-2"
            >
              <span className="lucide-book-open"></span> Aprenda Mais
            </button>
            <button 
              onClick={() => setCurrentPage('mapa')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[var(--azul-padrao1)] px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2"
            >
              <span className="lucide-map-pin"></span> Encontrar Ajuda
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--azul-base)] p-6 rounded-xl shadow-lg flex items-center gap-4">
          <div className="bg-[var(--azul-base-2)] p-3 rounded-full">
            <span className="lucide-users text-2xl text-white"></span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-0">8B+</h3>
            <p className="text-sm text-[var(--azul-base-4)] mb-0">Pessoas no mundo</p>
          </div>
        </div>
        <div className="bg-[var(--azul-base)] p-6 rounded-xl shadow-lg flex items-center gap-4">
          <div className="bg-[var(--azul-base-2)] p-3 rounded-full">
            <span className="lucide-scale text-2xl text-white"></span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-0">30</h3>
            <p className="text-sm text-[var(--azul-base-4)] mb-0">Artigos na Declaração</p>
          </div>
        </div>
        <div className="bg-[var(--azul-base)] p-6 rounded-xl shadow-lg flex items-center gap-4">
          <div className="bg-[var(--azul-base-2)] p-3 rounded-full">
             <span className="lucide-globe text-2xl text-white"></span>
          </div>
          <div className="text-left">
            <h3 className="text-2xl font-bold text-white mb-0">193</h3>
            <p className="text-sm text-[var(--azul-base-4)] mb-0">Países membros da ONU</p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="text-left">
        <div className="flex flex-wrap justify-between items-end mb-8 border-b border-[var(--azul-base)] pb-4">
          <div>
             <h2 className="text-3xl font-bold text-white flex items-center gap-3">
               <span className="lucide-newspaper text-[var(--azul-base-3)]"></span> 
               Últimas Notícias
             </h2>
             <p className="text-[var(--azul-base-4)] mb-0 mt-2">Fique por dentro das atualizações sobre direitos humanos</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-[var(--azul-base-4)] flex items-center gap-1">
              <span className="lucide-clock w-4 h-4"></span> {lastUpdate}
            </span>
            <button 
              onClick={fetchNews}
              className="bg-[var(--azul-base)] hover:bg-[var(--azul-base-1)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <span className={`lucide-refresh-cw w-4 h-4 ${loading ? 'animate-spin' : ''}`}></span> 
              Atualizar
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-[var(--azul-base)] rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <article key={index} className="group bg-[var(--azul-base)] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full border border-[var(--azul-base-1)]">
                <div className="relative overflow-hidden h-48">
                  {item.urlToImage && (
                    <img 
                      src={item.urlToImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.source}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-[var(--azul-base-4)] mb-3 flex items-center gap-1">
                    <span className="lucide-calendar w-3 h-3"></span> {item.date}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-[var(--azul-base-3)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[var(--azul-base-5)] text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <a 
                    href={item.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--azul-base-3)] font-bold hover:text-white transition-colors mt-auto group/link"
                  >
                    Ler matéria completa 
                    <span className="lucide-arrow-right w-4 h-4 transition-transform group-hover/link:translate-x-1"></span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
