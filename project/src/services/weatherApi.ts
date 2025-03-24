const API_KEY = '2a87a6ab2bbd4b61960141333252403';
const BASE_URL = 'https://api.weatherapi.com/v1';

export interface WeatherAlert {
  headline: string;
  severity: 'moderate' | 'severe' | 'extreme';
  event: string;
  description: string;
  instruction: string;
  effective: string;
  expires: string;
}

export interface WeatherData {
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  wind_kph: number;
  precip_mm: number;
  humidity: number;
  alerts?: WeatherAlert[];
}

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=no`
    );
    if (!response.ok) throw new Error('Weather data fetch failed');
    const data = await response.json();
    return data.current;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

export const getWeatherAlerts = async (location: string): Promise<WeatherAlert[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(location)}&days=1&alerts=yes`
    );
    if (!response.ok) throw new Error('Weather alerts fetch failed');
    const data = await response.json();
    return data.alerts?.alert || [];
  } catch (error) {
    console.error('Weather Alerts API Error:', error);
    throw error;
  }
};