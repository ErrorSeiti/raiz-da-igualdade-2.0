const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { text: "Olá! Sou o assistente Raiz IA. Em que posso te ajudar hoje sobre Direitos Humanos?", isBot: true }
  ]);
  const [input, setInput] = React.useState("");

  const responses = {
    "advogado": "Você pode encontrar assistência jurídica gratuita na Defensoria Pública do seu estado ou em núcleos de prática jurídica de universidades.",
    "denúncia": "Para denúncias de violações de direitos humanos, você pode ligar para o Disque 100 (Direitos Humanos) ou procurar a delegacia mais próxima.",
    "saúde": "O acesso à saúde é um direito fundamental. Caso precise de ajuda, o SUS é a porta de entrada para o atendimento público no Brasil.",
    "educação": "O direito à educação é garantido pela Constituição. Se houver negativa de matrícula, procure o Conselho Tutelar ou o Ministério Público.",
    "padrão": "Interessante sua dúvida. No portal Raiz da Igualdade, temos seções sobre Pilares da Justiça e um Mapa de Apoio. Como posso detalhar mais?"
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput("");

    // Simulação de IA Thinking
    setTimeout(() => {
      let botResponse = responses.padrão;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("advogado") || lowerInput.includes("ajuda") || lowerInput.includes("jurídic")) {
        botResponse = responses.advogado;
      } else if (lowerInput.includes("denúncia") || lowerInput.includes("denunciar")) {
        botResponse = responses.denúncia;
      } else if (lowerInput.includes("saúde") || lowerInput.includes("médico")) {
        botResponse = responses.saúde;
      } else if (lowerInput.includes("escola") || lowerInput.includes("educação")) {
        botResponse = responses.educação;
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botão de Abrir */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[var(--azul-base-2)] hover:bg-[var(--azul-base-3)] text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110"
      >
        <i className={isOpen ? "lucide-x" : "lucide-message-square"}></i>
      </button>

      {/* Janela do Chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-[var(--azul-base)] border border-[var(--azul-base-2)] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[var(--azul-base-2)] p-4 text-white font-bold flex items-center gap-2">
            <i className="lucide-sparkles w-5"></i>
            Raiz IA - Assistente Virtual
          </div>
          
          <div className="flex-1 h-80 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.isBot ? 'bg-[var(--azul-padrao1)] self-start text-white' : 'bg-[var(--azul-base-2)] self-end text-white'}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-4 bg-[var(--azul-padrao2)] border-t border-[var(--azul-base-1)] flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte algo..."
              className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder-gray-400"
            />
            <button onClick={handleSend} className="text-[var(--azul-base-2)] hover:text-[var(--azul-base-3)]">
              <i className="lucide-send"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

window.AIChatAssistant = AIChatAssistant;
