function MindMap() {
  const [isZoomed, setIsZoomed] = React.useState(false);
  
  // Using a placeholder image for Mind Map since I don't have the original local file
  const mapImage = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1000";

  return (
    <div className="flex flex-col items-center" data-name="mind-map" data-file="components/MindMap.js">
      <h1 className="text-3xl mb-6">Mapa Mental - Direitos Humanos</h1>
      
      <div className="relative group cursor-pointer" onClick={() => setIsZoomed(true)}>
        <div className="bg-[var(--azul-base)] p-4 rounded-xl shadow-2xl">
           <img 
            src={mapImage} 
            alt="Mapa Mental Direitos Humanos" 
            className="rounded-lg max-w-full md:max-w-2xl border-4 border-[var(--azul-base-2)]"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-xl">
            <span className="lucide-zoom-in text-white text-5xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </div>
        </div>
        <p className="mt-4 text-[var(--azul-base-4)]">Clique na imagem para ampliar</p>
      </div>

      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-full max-h-full">
            <img 
              src={mapImage} 
              alt="Mapa Mental Zoom" 
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            />
            <button 
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 hover:bg-gray-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
              }}
            >
              <span className="lucide-x text-2xl"></span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
