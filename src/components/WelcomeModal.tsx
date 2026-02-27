interface WelcomeModalProps {
  onClose: () => void;
  onSelectCity: () => void;
}

export default function WelcomeModal({ onClose, onSelectCity }: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          ×
        </button>
        <div className="text-center mb-4">
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome to FindAm!</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Cameroon's marketplace for buying, selling, renting, and finding jobs — all through WhatsApp. No signup needed to browse!
          </p>
        </div>
        <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-3 mb-5">
          <span className="text-lg">📍</span>
          <span className="text-sm text-gray-700">Select your city for better local results</span>
        </div>
        <div className="flex flex-col gap-3">
          <button
            onClick={onSelectCity}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-500 py-2 text-sm hover:text-gray-700 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
