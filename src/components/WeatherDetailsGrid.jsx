import React from 'react';
import { Droplets, Wind, Gauge, Eye } from 'lucide-react';
import WeatherDetailCard from './WeatherDetailCard';

const WeatherDetailsGrid = ({ weatherData }) => {
  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: weatherData.main.humidity,
      unit: '%'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: weatherData.wind.speed,
      unit: ' m/s'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: weatherData.main.pressure,
      unit: ' hPa'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: (weatherData.visibility / 1000).toFixed(1),
      unit: ' km'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {details.map((detail, index) => (
        <WeatherDetailCard
          key={index}
          icon={detail.icon}
          label={detail.label}
          value={detail.value}
          unit={detail.unit}
        />
      ))}
    </div>
  );
};

export default WeatherDetailsGrid; 