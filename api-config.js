/**
 * SEGURANÇA: Em aplicações de produção, NUNCA exponha chaves de API no frontend.
 * Como estudante de Segurança da Informação, considere usar um Proxy Backend
 * ou variáveis de ambiente seguras via Netlify/Vercel.
 */

const NEWS_API_KEY = 'SUA_CHAVE_AQUI'; 
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

// Cache para evitar múltiplas requisições inúteis se a chave não estiver configurada
let newsCache = null;

export const fetchHumanRightsNews = async () => {
  if (NEWS_API_KEY === 'SUA_CHAVE_AQUI') {
    console.warn('Raiz da Igualdade: NEWS_API_KEY não configurada. Usando dados de demonstração.');
    return getFallbackNews();
  }

  if (newsCache) return newsCache;

  try {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/everything?q=human+rights+OR+direitos+humanos+OR+ONU&language=pt&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );

    if (!response.ok) throw new Error('Falha ao buscar notícias');

    const data = await response.json();
    newsCache = data.articles.slice(0, 6).map(article => ({
      title: article.title,
      description: article.description || 'Sem descrição disponível',
      url: article.url,
      urlToImage: article.urlToImage || 'https://images.unsplash.com/photo-1547625121-655268480302?auto=format&fit=crop&q=80&w=600',
      source: article.source.name,
      date: formatRelativeDate(article.publishedAt)
    }));
    return newsCache;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return getFallbackNews();
  }
};

// Fallback para quando a API falhar (CORS em dev local)
const getFallbackNews = () => [
  {
    title: "ONU alerta sobre crises humanitárias globais",
    description: "Relatório aponta necessidade urgente de fundos para apoiar refugiados em diversas regiões de conflito, destacando a importância da solidariedade internacional.",
    url: "https://news.un.org/pt/",
    urlToImage: "https://images.unsplash.com/photo-1547625121-655268480302?auto=format&fit=crop&q=80&w=600",
    source: "ONU News",
    date: "Há 2 horas"
  },
  {
    title: "Avanços na legislação de direitos digitais na Europa",
    description: "Novas leis buscam proteger a privacidade dos cidadãos na internet, estabelecendo limites claros para o uso de dados por grandes corporações tecnológicas.",
    url: "https://ec.europa.eu/info/law/law-topic/data-protection_pt",
    urlToImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    source: "Tecnologia & Sociedade",
    date: "Há 5 horas"
  },
  {
    title: "Educação como pilar dos direitos fundamentais",
    description: "UNESCO lança nova campanha global para erradicar o analfabetismo até 2030, com foco especial em comunidades rurais e marginalizadas.",
    url: "https://www.unesco.org/pt",
    urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    source: "Educação Hoje",
    date: "Há 1 dia"
  }
];

// Formata data ISO para formato relativo
const formatRelativeDate = (isoDate) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return 'Agora mesmo';
  if (diffHours < 24) return `Há ${diffHours} horas`;
  if (diffHours < 48) return 'Há 1 dia';
  return `Há ${Math.floor(diffHours / 24)} dias`;
};
