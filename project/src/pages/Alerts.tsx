import React, { useEffect, useState } from 'react';
import { Bell, AlertTriangle, MapPin, Thermometer, Wind, Droplets } from 'lucide-react';
import { getWeatherData, getWeatherAlerts, type WeatherData, type WeatherAlert } from '../services/weatherApi';
import toast from 'react-hot-toast';

const Alerts = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherAlerts, setWeatherAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const localAlerts = [
    {
      id: 1,
      type: 'Flood Warning',
      location: 'Downtown Area',
      description: 'Rising water levels reported. Evacuation recommended.',
      timestamp: '10 minutes ago',
      severity: 'high'
    },
    {
      id: 2,
      type: 'Fire Alert',
      location: 'Industrial District',
      description: 'Large fire reported at warehouse. Emergency services en route.',
      timestamp: '25 minutes ago',
      severity: 'critical'
    }
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Using a default location - in a real app, you'd get this from user's location
        const location = 'London';
        const [weather, alerts] = await Promise.all([
          getWeatherData(location),
          getWeatherAlerts(location)
        ]);
        
        setWeatherData(weather);
        setWeatherAlerts(alerts);
      } catch (error) {
        toast.error('Failed to fetch weather data');
        console.error('Weather fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
    
    // Refresh weather data every 5 minutes
    const interval = setInterval(fetchWeatherData, 300000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'border-red-600 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'moderate':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Bell className="h-8 w-8 text-red-600 mr-3" />
            Emergency Alerts
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Weather Information */}
        {weatherData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Thermometer className="h-6 w-6 text-blue-600 mr-2" />
              Current Weather Conditions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-red-500" />
                <span>{weatherData.temp_c}°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="h-5 w-5 text-blue-500" />
                <span>{weatherData.wind_kph} km/h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span>{weatherData.humidity}% Humidity</span>
              </div>
            </div>
          </div>
        )}

        {/* Weather Alerts */}
        {weatherAlerts.length > 0 && (
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
              Weather Alerts
            </h2>
            {weatherAlerts.map((alert, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
                  getSeverityColor(alert.severity)
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-900">{alert.headline}</h3>
                <p className="text-gray-600 mt-2">{alert.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Effective: {new Date(alert.effective).toLocaleString()}</p>
                  <p>Expires: {new Date(alert.expires).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Local Emergency Alerts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
            Local Emergency Alerts
          </h2>
          {localAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${
                alert.severity === 'critical' ? 'border-red-600' : 'border-yellow-500'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{alert.type}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <p>{alert.location}</p>
                  </div>
                  <p className="text-gray-800 mt-2">{alert.description}</p>
                  <p className="text-sm text-gray-500 mt-2">{alert.timestamp}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  alert.severity === 'critical' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;