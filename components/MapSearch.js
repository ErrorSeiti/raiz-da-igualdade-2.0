function MapSearch() {
  const mapContainerRef = React.useRef(null);
  const mapInstanceRef = React.useRef(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [status, setStatus] = React.useState('');

  const offices = [
    {
      name: "Defensoria Pública",
      desc: "Agende seu atendimento online",
      url: "https://www.defensoria.sp.def.br/atendimento/agende-seu-atendimento",
      location: "São Paulo, SP",
      coords: [-23.550520, -46.633308]
    },
    {
      name: "Departamento Jurídico XI de Agosto",
      desc: "Praça Dr. João Mendes 62, Centro Histórico",
      url: "https://juridicoxideagosto.wordpress.com",
      location: "Praça Dr. João Mendes 62, São Paulo",
      coords: [-23.5517, -46.6345]
    },
    {
      name: "EAJ - UNIP Tatuapé",
      desc: "Rua São Jorge, 560 - Tatuapé",
      url: "https://www.unip.br/universidade/locais_atendimento/eaj.aspx",
      location: "Rua São Jorge, 560, São Paulo",
      coords: [-23.5367, -46.5615]
    },
    {
      name: "Mattos Filho - Pro Bono",
      desc: "Al. Joaquim Eugênio de Lima, 447",
      url: "https://www.mattosfilho.com.br/area-atuacao/pro-bono",
      location: "Al. Joaquim Eugênio de Lima, 447, São Paulo",
      coords: [-23.5657, -46.6521]
    }
  ];

  React.useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current).setView([-23.55052, -46.633308], 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      offices.forEach(office => {
        const marker = L.marker(office.coords).addTo(map);
        marker.bindPopup(`
          <div class="text-center">
            <h3 class="font-bold text-gray-800 text-sm mb-1">${office.name}</h3>
            <p class="text-gray-600 text-xs mb-2">${office.desc}</p>
            <a href="${office.url}" target="_blank" class="text-blue-600 underline text-xs">Acessar Site</a>
          </div>
        `);
      });

      mapInstanceRef.current = map;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            map.setView([latitude, longitude], 13);
            L.circle([latitude, longitude], {
              color: '#00BFFF',
              fillColor: '#00BFFF',
              fillOpacity: 0.3,
              radius: 800
            }).addTo(map).bindPopup("Sua localização aproximada");
          },
          (err) => {
            console.warn("Geolocation error", err);
            setStatus("Nota: Localização automática não permitida.");
          }
        );
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleManualSearch = () => {
    if (!searchTerm) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTerm)}`;
    window.open(url, '_blank');
  };

  return (
    <div data-name="map-search" data-file="components/MapSearch.js" className="fade-in space-y-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-[var(--azul-base)] rounded-full mb-4">
          <span className="lucide-map-pin text-3xl text-[var(--azul-base-3)]"></span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Escritórios e Assistência Jurídica</h1>
        <p className="text-[var(--azul-base-4)] max-w-2xl mx-auto">
          Encontre locais que oferecem atendimento jurídico gratuito ou com apoio estudantil próximo a você.
        </p>
      </div>

      {/* Map Card */}
      <div className="bg-[var(--azul-base)] p-1 rounded-2xl shadow-2xl overflow-hidden border border-[var(--azul-base-1)]">
        <div className="bg-[var(--azul-padrao1)] p-4 flex flex-col md:flex-row gap-4 items-center border-b border-[var(--azul-base)]">
          <div className="flex-grow w-full">
            <div className="relative">
              <span className="lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></span>
              <input 
                type="text" 
                placeholder="Pesquisar endereço no Google Maps..." 
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--azul-base)] border border-[var(--azul-base-1)] text-white focus:outline-none focus:border-[var(--azul-base-3)] transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleManualSearch()}
              />
            </div>
          </div>
          <button 
            onClick={handleManualSearch}
            className="w-full md:w-auto bg-[var(--azul-base-2)] hover:bg-[var(--azul-base-3)] text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            Buscar Externamente <span className="lucide-external-link w-4 h-4"></span>
          </button>
        </div>
        
        <div className="relative">
          <div id="map" ref={mapContainerRef} className="w-full h-[500px] bg-gray-100 z-0"></div>
          {status && (
            <div className="absolute bottom-4 left-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-xs font-semibold shadow-lg z-[400]">
              {status}
            </div>
          )}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-left">
        {offices.map((office, idx) => (
          <div key={idx} className="bg-[var(--azul-base)] p-6 rounded-xl hover:bg-[var(--azul-base-1)] transition-colors border-l-4 border-[var(--azul-base-3)] shadow-md">
            <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="lucide-building text-[var(--azul-base-3)]"></span> {office.name}
            </h2>
            <p className="text-[var(--azul-base-5)] mb-4 text-sm">{office.desc}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href={office.url} target="_blank" className="bg-[var(--azul-padrao1)] hover:bg-[var(--azul-base-2)] text-white px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
                <span className="lucide-globe w-3 h-3"></span> Site
              </a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.location)}`} target="_blank" className="bg-[var(--azul-padrao1)] hover:bg-[var(--azul-base-2)] text-white px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
                <span className="lucide-map-pin w-3 h-3"></span> Rotas
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
