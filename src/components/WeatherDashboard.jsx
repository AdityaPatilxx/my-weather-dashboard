import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle } from 'lucide-react';
import '../index.css';

import SearchBar from './SearchBar';
import MainWeatherCard from './MainWeatherCard';
import WeatherDetailsGrid from './WeatherDetailsGrid';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';
import DebugSlider from './DebugSlider';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [debugWeather, setDebugWeather] = useState(null);

  // OpenWeatherMap API configuration
  const API_KEY = '6a9d21b2c123c7e39f3126e775f7fda8';
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // Mock data for demonstration (commented out as we're using real API now)
  /*
  const mockWeatherData = {
    name: 'Mumbai',
    sys: { country: 'IN' },
    main: {
      temp: 28.5,
      feels_like: 32.1,
      humidity: 78,
      pressure: 1013
    },
    weather: [{
      main: 'Clouds',
      description: 'scattered clouds',
      icon: '03d'
    }],
    wind: {
      speed: 3.5,
      deg: 240
    },
    visibility: 8000,
    dt: Date.now() / 1000
  };
  */

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      case 'drizzle':
        return <CloudDrizzle className="w-16 h-16 text-blue-300" />;
      case 'thunderstorm':
        return <Zap className="w-16 h-16 text-purple-400" />;
      case 'snow':
        return <CloudSnow className="w-16 h-16 text-blue-300" />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <Cloud className="w-16 h-16 text-gray-300" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  const getBackgroundGradient = (weatherMain) => {
    const baseClasses = 'min-h-screen bg-gradient-to-br transition-all duration-1000';
    const textClasses = weatherMain?.toLowerCase() === 'snow' ? 'text-gray-800' : 'text-white';

    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return `${baseClasses} from-blue-400 via-blue-500 to-yellow-400 ${textClasses}`;
      case 'clouds':
        return `${baseClasses} from-gray-400 via-gray-500 to-gray-600 ${textClasses}`;
      case 'rain':
      case 'drizzle':
        return `${baseClasses} from-gray-600 via-blue-600 to-blue-800 ${textClasses}`;
      case 'thunderstorm':
        return `${baseClasses} from-gray-800 via-purple-700 to-gray-900 ${textClasses}`;
      case 'snow':
        return `${baseClasses} from-blue-200 via-white to-gray-300 ${textClasses}`;
      case 'mist':
        return `${baseClasses} from-gray-300 via-gray-400 to-gray-500 ${textClasses}`;
      case 'fog':
        return `${baseClasses} from-gray-400 via-gray-500 to-gray-600 ${textClasses}`;
      case 'haze':
        return `${baseClasses} from-gray-500 via-gray-600 to-gray-700 ${textClasses}`;
      default:
        return `${baseClasses} from-blue-400 via-blue-500 to-purple-600 ${textClasses}`;
    }
  };

  const handleDebugWeatherChange = (condition) => {
    if (!weatherData) return;
    
    const debugData = {
      ...weatherData,
      weather: [{
        main: condition,
        description: condition,
        icon: '01d'
      }]
    };
    setDebugWeather(debugData);
  };

  const fetchWeatherData = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    setDebugWeather(null);
    
    try {
      const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error(`Weather data not found for "${city}"`);
      }
      const data = await response.json();
      
      setWeatherData(data);
      setCurrentLocation(`${data.name}, ${data.sys.country}`);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please check your API key and try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeatherData(searchQuery);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setDebugWeather(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `${BASE_URL}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
              throw new Error('Failed to fetch weather data for your location');
            }
            const data = await response.json();
            setWeatherData(data);
            setCurrentLocation(`${data.name}, ${data.sys.country}`);
          } catch {
            setError('Failed to fetch weather data for your location.');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Unable to retrieve your location. Please search for a city manually.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    // Load default weather data for Mumbai
    fetchWeatherData('Mumbai');
  }, []);

  const displayData = debugWeather || weatherData;
  const weatherMain = displayData?.weather[0]?.main;
  const backgroundClasses = getBackgroundGradient(weatherMain);

  return (
    <div className={backgroundClasses}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
            Weather Dashboard
          </h1>
          <p className="text-lg opacity-80">
            Stay updated with real-time weather information
          </p>
        </div>

        {/* Search Section */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          getCurrentLocation={getCurrentLocation}
          loading={loading}
        />

        {/* Error Message */}
        {error && <ErrorAlert error={error} />}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Weather Data */}
        {displayData && !loading && (
          <div className="space-y-6">
            <MainWeatherCard
              weatherData={displayData}
              currentLocation={currentLocation}
              getWeatherIcon={getWeatherIcon}
            />
            <WeatherDetailsGrid weatherData={displayData} />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 opacity-60">
          <p className="text-sm">
            Weather data provided by OpenWeatherMap • Built with React & Tailwind CSS
          </p>
        </div>

        {/* Debug Controls */}
        {weatherData && !loading && (
          <DebugSlider onWeatherChange={handleDebugWeatherChange} />
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;