import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const weatherConditions = [
  { code: '01d', main: 'Clear', description: 'Clear sky' },
  { code: '02d', main: 'Clouds', description: 'Few clouds' },
  { code: '03d', main: 'Clouds', description: 'Scattered clouds' },
  { code: '04d', main: 'Clouds', description: 'Broken clouds' },
  { code: '09d', main: 'Rain', description: 'Shower rain' },
  { code: '10d', main: 'Rain', description: 'Rain' },
  { code: '11d', main: 'Thunderstorm', description: 'Thunderstorm' },
  { code: '13d', main: 'Snow', description: 'Snow' },
  { code: '50d', main: 'Mist', description: 'Mist' }
];

const DebugSlider = ({ onWeatherChange, currentTemp }) => {
  const [temp, setTemp] = React.useState(currentTemp || 20);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleTempChange = (e) => {
    const newTemp = parseInt(e.target.value);
    setTemp(newTemp);
    onWeatherChange(null, newTemp);
  };

  const handleWeatherChange = (e) => {
    const selectedOption = weatherConditions.find(condition => condition.code === e.target.value);
    if (selectedOption) {
      onWeatherChange(selectedOption, temp);
    }
  };

  return (
    <div className="fixed bottom-4 right-0 flex items-center">
      {/* Debug Panel */}
      <div className={`bg-black/50 backdrop-blur-md p-4 rounded-l-xl text-white transition-all duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <h3 className="text-sm font-medium mb-2">Debug Controls</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs block mb-1">Weather Condition</label>
            <select
              onChange={handleWeatherChange}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm text-gray-900"
            >
              {weatherConditions.map((condition) => (
                <option key={condition.code} value={condition.code}>
                  {condition.description}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="text-xs block mb-1">Temperature: {temp}°C</label>
            <input
              type="range"
              min="-20"
              max="45"
              value={temp}
              onChange={handleTempChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 backdrop-blur-md p-2 rounded-l-lg text-white hover:bg-black/60 transition-colors"
      >
        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>
  );
};

export default DebugSlider; 