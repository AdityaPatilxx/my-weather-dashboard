import React from 'react';

const WeatherDetailCard = ({ icon: Icon, label, value, unit }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
      <Icon className="w-8 h-8 text-blue-300 mx-auto mb-3" />
      <p className="text-white/80 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}{unit}</p>
    </div>
  );
};

export default WeatherDetailCard; 