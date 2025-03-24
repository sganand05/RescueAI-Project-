import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Warehouse } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Full-screen background image with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-8">
          Rapid Response When <br />
          <span className="text-red-500">Every Second Counts</span>
        </h1>
        <p className="mt-6 text-xl text-gray-200 max-w-3xl mx-auto mb-12">
     
          
      Disasters don’t wait, and neither do we—RescueAI is the future of rapid 
                          response and relief.
                 Be the light in someone's darkest hour
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/report"
            className="w-64 flex items-center justify-center bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-md hover:bg-red-700 active:bg-red-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <AlertTriangle className="h-6 w-6 mr-2" />
            Report Emergency
          </Link>
          <Link
            to="/resources"
            className="w-64 flex items-center justify-center bg-yellow-500 text-gray-900 px-8 py-4 text-lg font-semibold rounded-md hover:bg-yellow-600 active:bg-yellow-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Warehouse className="h-6 w-6 mr-2" />
            Local Resources
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;