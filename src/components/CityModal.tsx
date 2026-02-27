import { useState } from 'react';
import { CITIES } from '../data/mockData';

interface CityModalProps {
  onClose: () => void;
}

export default function CityModal({ onClose }: CityModalProps) {
  const [selectedCity, setSelectedCity] = useState('');

  const handleSave = () => {
    if (selectedCity) {
      localStorage.setItem('findam_city', selectedCity);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Select Your City</h2>
        <p className="text-gray-500 text-sm mb-4">We'll show you listings near your city.</p>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-3 text-gray-800 outline-none focus:border-orange-500 mb-4"
        >
          <option value="">-- Choose a city --</option>
          {CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
