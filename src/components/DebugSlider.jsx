import React from 'react';

const weatherConditions = [
  'clear',
  'clouds',
  'rain',
  'drizzle',
  'thunderstorm',
  'snow',
  'mist',
  'fog',
  'haze'
];

const DebugSlider = ({ onWeatherChange }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-black/50 backdrop-blur-md p-4 rounded-xl text-white">
      <h3 className="text-sm font-medium mb-2">Debug Controls</h3>
      <div className="space-y-2">
        <label className="text-xs block">Weather Condition</label>
        <select
          onChange={(e) => onWeatherChange(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm"
        >
          {weatherConditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition.charAt(0).toUpperCase() + condition.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DebugSlider; 