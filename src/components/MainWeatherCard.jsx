import React from 'react';
import { MapPin } from 'lucide-react';

const MainWeatherCard = ({ weatherData, currentLocation, getWeatherIcon }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="text-center lg:text-left mb-6 lg:mb-0">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
            <MapPin className="w-5 h-5 text-white/80" />
            <h2 className="text-xl font-semibold text-white">
              {currentLocation}
            </h2>
          </div>
          <p className="text-white/80 mb-4">
            {formatTime(weatherData.dt)} • {new Date().toLocaleDateString()}
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4">
            {getWeatherIcon(weatherData.weather[0]?.main, weatherData.weather[0]?.icon)}
            <div>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {Math.round(weatherData.main.temp)}°C
              </div>
              <p className="text-white/80 text-lg capitalize">
                {weatherData.weather[0]?.description}
              </p>
            </div>
          </div>
        </div>
        
        {/* Feels Like */}
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <p className="text-white/80 text-sm mb-1">Feels like</p>
          <p className="text-2xl font-bold text-white">
            {Math.round(weatherData.main.feels_like)}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard; 