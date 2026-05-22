function HumanRightsGame({ onClose }) {
  const [score, setScore] = React.useState(0);
  const [position, setPosition] = React.useState(50);
  const [items, setItems] = React.useState([]);
  const [gameActive, setGameActive] = React.useState(true);
  const [highScore, setHighScore] = React.useState(parseInt(localStorage.getItem('hr-highscore') || '0'));

  const rights = ["Vida", "Liberdade", "Igualdade", "Educação", "Saúde", "Dignidade", "Voto", "Cultura"];
  const violations = ["Tortura", "Censura", "Escravidão", "Fome", "Racismo", "Abuso", "Prisão Ilegal"];

  React.useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('hr-highscore', score.toString());
    }
  }, [score]);

  React.useEffect(() => {
    if (!gameActive) return;
    const interval = setInterval(() => {
      const isRight = Math.random() > 0.4;
      const text = isRight 
        ? rights[Math.floor(Math.random() * rights.length)]
        : violations[Math.floor(Math.random() * violations.length)];
      setItems(prev => [...prev, { id: Math.random(), text, isRight, x: Math.random() * 85, y: -10 }]);
    }, 1200);
    return () => clearInterval(interval);
  }, [gameActive]);

  React.useEffect(() => {
    if (!gameActive) return;
    const moveInterval = setInterval(() => {
      setItems(prev => {
        let newItems = prev.map(item => ({ ...item, y: item.y + 1.5 }));
        newItems.forEach(item => {
          if (item.y > 80 && item.y < 90 && item.x > position - 10 && item.x < position + 15) {
            if (!item.caught) {
              item.caught = true;
              setScore(s => s + (item.isRight ? 10 : -20));
            }
          }
        });
        return newItems.filter(item => item.y < 100 && !item.caught);
      });
    }, 30);
    return () => clearInterval(moveInterval);
  }, [gameActive, position]);

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(85, Math.max(0, x - 7)));
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[var(--azul-padrao2)] bg-opacity-95 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-[var(--azul-base)] rounded-3xl p-8 border-4 border-[var(--azul-base-2)] shadow-2xl relative overflow-hidden" 
           onMouseMove={handleMove}
           onTouchMove={handleMove}>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white m-0">DEFENSOR DOS DIREITOS</h2>
            <p className="text-[var(--azul-base-4)] text-sm m-0">Capture os direitos (verde) e evite as violações (vermelho)!</p>
          </div>
          <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors flex items-center justify-center">
            <span className="lucide-x w-6 h-6"></span>
          </button>
        </div>

        <div className="relative h-[400px] bg-[var(--azul-padrao1)] rounded-xl overflow-hidden border-2 border-[var(--azul-base-1)] mb-4">
          <div className="absolute top-4 left-4 z-10 bg-[var(--azul-base)] px-4 py-2 rounded-lg border border-[var(--azul-base-2)]">
            <span className="text-white font-bold">Pontos: {score}</span>
          </div>
          <div className="absolute top-4 right-4 z-10 bg-[var(--azul-base)] px-4 py-2 rounded-lg border border-[var(--azul-base-2)]">
            <span className="text-white font-bold text-xs">Recorde: {highScore}</span>
          </div>

          {items.map(item => (
            <div key={item.id} 
                 className={`absolute px-4 py-1.5 rounded-full font-bold text-sm shadow-lg whitespace-nowrap transition-transform ${item.isRight ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                 style={{ left: `${item.x}%`, top: `${item.y}%` }}>
              {item.text}
            </div>
          ))}

          <div className="absolute bottom-6 h-3 bg-white rounded-full transition-all duration-75 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.4)]"
               style={{ left: `${position}%`, width: '15%' }}>
            <div className="absolute -top-6 text-[10px] font-bold text-white uppercase tracking-widest bg-[var(--azul-base-2)] px-2 py-0.5 rounded">Dignidade</div>
          </div>
        </div>

        <div className="text-center text-[var(--azul-base-5)] text-xs">
          Mova o mouse ou deslize o dedo para controlar a barra de Dignidade.
        </div>
      </div>
    </div>
  );
}
