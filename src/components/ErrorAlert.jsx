import React from 'react';

const ErrorAlert = ({ error }) => {
  return (
    <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-white p-4 rounded-xl mb-8">
      <p className="text-center">{error}</p>
      <p className="text-center text-sm mt-2 opacity-80">
        Note: This demo uses mock data. Replace with your OpenWeatherMap API key for live data.
      </p>
    </div>
  );
};

export default ErrorAlert; 