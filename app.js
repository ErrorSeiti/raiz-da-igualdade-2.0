// Important: DO NOT remove this `ErrorBoundary` component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-6">
            <h1 className="text-2xl font-bold mb-4">Algo deu errado</h1>
            <p className="mb-4">Desculpe, ocorreu um erro inesperado na aplicação.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [currentPage, setCurrentPage] = React.useState('home');
  const [toastMessage, setToastMessage] = React.useState(null);
  const [showGame, setShowGame] = React.useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const renderPage = () => {
    const commonProps = { setCurrentPage, showToast };
    
    switch (currentPage) {
      case 'home':
        return <Home {...commonProps} />;
      case 'pilares':
        return <Pillars {...commonProps} />;
      case 'mapa-mental':
        return <MindMap {...commonProps} />;
      case 'mapa':
        return <MapSearch {...commonProps} />;
      case 'equipe':
        return <Team {...commonProps} />;
      default:
        return <Home {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" data-name="app" data-file="app.js">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl text-center relative">
        {renderPage()}
      </main>

      <Footer showToast={showToast} onEasterEgg={() => setShowGame(true)} />
      
      {showGame && <HumanRightsGame onClose={() => setShowGame(false)} />}
      
      {/* Assistente de IA para suporte ao usuário */}
      <AIChatAssistant />
      
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);