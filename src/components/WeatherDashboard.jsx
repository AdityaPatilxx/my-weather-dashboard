import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap, 
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRainWind,
  Snowflake,
  Wind,
  CloudSun,
  CloudMoon,
  Moon
} from 'lucide-react';
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
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

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

  const getWeatherIcon = (weatherMain, iconCode) => {
    const baseIconClass = "w-16 h-16";
    
    // Map weather condition codes to icons
    switch (weatherMain?.toLowerCase()) {
      // Clear sky
      case 'clear':
        return <Sun className={`${baseIconClass} text-yellow-400`} />;

      // Clouds
      case 'clouds':
        if (iconCode === '02d') return <CloudSun className={`${baseIconClass} text-gray-400`} />;
        if (iconCode === '03d') return <Cloud className={`${baseIconClass} text-gray-400`} />;
        if (iconCode === '04d') return <Cloud className={`${baseIconClass} text-gray-500`} />;
        return <Cloud className={`${baseIconClass} text-gray-400`} />;

      // Rain
      case 'rain':
        if (iconCode === '09d') return <CloudRainWind className={`${baseIconClass} text-blue-400`} />;
        if (iconCode === '10d') return <CloudRain className={`${baseIconClass} text-blue-400`} />;
        return <CloudRain className={`${baseIconClass} text-blue-400`} />;

      // Thunderstorm
      case 'thunderstorm':
        return <CloudLightning className={`${baseIconClass} text-purple-400`} />;

      // Snow
      case 'snow':
        return <Snowflake className={`${baseIconClass} text-blue-300`} />;

      // Atmosphere (Mist, Smoke, Haze, Dust, Fog, Sand, Ash, Squall, Tornado)
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog':
      case 'sand':
      case 'ash':
      case 'squall':
      case 'tornado':
        return <CloudFog className={`${baseIconClass} text-gray-300`} />;

      // Default
      default:
        return <Sun className={`${baseIconClass} text-yellow-400`} />;
    }
  };

  const getBackgroundGradient = (weatherMain, iconCode) => {
    const baseClasses = 'min-h-screen bg-gradient-to-br transition-all duration-1000';

    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return `${baseClasses} from-blue-400 via-blue-500 to-yellow-400`;
      
      case 'clouds':
        // Different gradients for different cloud conditions
        switch (iconCode) {
          case '02d': // Few clouds
            return `${baseClasses} from-blue-300 via-blue-400 to-gray-400`;
          case '03d': // Scattered clouds
            return `${baseClasses} from-gray-300 via-gray-400 to-gray-500`;
          case '04d': // Broken clouds
            return `${baseClasses} from-gray-400 via-gray-500 to-gray-600`;
          default:
            return `${baseClasses} from-gray-400 via-gray-500 to-gray-600`;
        }
      
      case 'rain':
        // Different gradients for different rain conditions
        switch (iconCode) {
          case '09d': // Shower rain
            return `${baseClasses} from-gray-500 via-blue-500 to-blue-700`;
          case '10d': // Rain
            return `${baseClasses} from-gray-600 via-blue-600 to-blue-800`;
          default:
            return `${baseClasses} from-gray-600 via-blue-600 to-blue-800`;
        }
      
      case 'thunderstorm':
        return `${baseClasses} from-gray-800 via-purple-700 to-gray-900`;
      
      case 'snow':
        return `${baseClasses} from-blue-600 via-blue-400 to-blue-300`;
      
      case 'mist':
        return `${baseClasses} from-gray-300 via-gray-400 to-gray-500`;
      
      default:
        return `${baseClasses} from-gray-300 via-gray-400 to-gray-500`;
    }
  };

  const handleDebugWeatherChange = (condition, temperature) => {
    if (!condition) return;
    
    const mockData = {
      main: {
        temp: temperature,
        feels_like: temperature - 2,
        humidity: 65,
        pressure: 1013,
        temp_min: temperature - 3,
        temp_max: temperature + 3
      },
      weather: [{
        id: parseInt(condition.code.slice(0, 2)),
        main: condition.main,
        description: condition.description,
        icon: condition.code
      }],
      wind: {
        speed: 5.2,
        deg: 180
      },
      clouds: {
        all: condition.main === 'Clouds' ? 75 : 20
      },
      sys: {
        country: 'US',
        sunrise: Date.now(),
        sunset: Date.now() + 43200000
      },
      name: 'Debug City',
      visibility: 10000
    };

    setWeatherData(mockData);
    setError(null);
  };

  const fetchWeatherData = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
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

  const displayData = weatherData;
  const weatherMain = displayData?.weather[0]?.main;
  const backgroundClasses = getBackgroundGradient(weatherMain, displayData?.weather[0]?.icon);

  return (
    <div className={backgroundClasses}>
      <div className="max-w-4xl mx-auto h-screen flex flex-col justify-center p-4 text-white">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
            Weather Dashboard
          </h1>
          <p className="text-lg opacity-80">
            Stay updated with real-time weather information
          </p>
        </div> */}

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
        {displayData && !loading && (
          <DebugSlider 
            onWeatherChange={handleDebugWeatherChange}
            currentTemp={displayData?.main?.temp}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;