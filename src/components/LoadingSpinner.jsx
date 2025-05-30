import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white"></div>
      <p className="text-white mt-4 text-lg">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner; 