import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

const Incidents = () => {
  return (
     <div 
        className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 116px)'
        }}
      >
      <div className="bg-white shadow bg-opacity-90">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MapPin className="h-8 w-8 text-red-600 mr-3" />
            Live Incident Map
          </h1>
          <p className="text-gray-700 mt-2">
            Stay informed with real-time updates on global weather incidents. This map provides
            an interactive way to explore ongoing events, including storms, temperature changes,
            and wind patterns worldwide.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
        <a
          href="https://earth.nullschool.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-red-700 text-white rounded-lg flex items-center gap-2 transition transform hover:bg-gradient-to-r hover:from-red-800 hover:to-yellow-600 hover:scale-105"
        >
          Open Earth Nullschool <ExternalLink className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default Incidents;
