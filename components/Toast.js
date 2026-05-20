function Toast({ message, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl z-[100] animate-fade-in flex items-center gap-3">
      <span className="lucide-info text-[var(--azul-base-3)]"></span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 hover:text-gray-300">
        <span className="lucide-x w-4 h-4"></span>
      </button>
    </div>
  );
}
