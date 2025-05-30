import React from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch, getCurrentLocation, loading }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
          />
        </div>
        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 transition-all duration-200 font-medium disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={loading}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:bg-white/10 backdrop-blur-sm text-white rounded-xl border border-white/30 transition-all duration-200 font-medium disabled:cursor-not-allowed flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          My Location
        </button>
      </div>
    </div>
  );
};

export default SearchBar; 