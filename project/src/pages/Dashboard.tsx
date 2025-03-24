import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageSearch, TrendingUp, Truck, DollarSign, Users, MapPin } from 'lucide-react';
import ConfirmationDialog from '../components/ConfirmationDialog';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  
  const inventoryStats = [
    { name: 'Medical Kits', value: '245', change: '+12%' },
    { name: 'Food Supplies', value: '1,890', change: '+5%' },
    { name: 'Rescue Tools', value: '156', change: '-2%' },
    { name: 'Clothing', value: '2,450', change: '+8%' },
    { name: 'Emergency Funds', value: '$45,670', change: '+15%' },
    { name: 'Transport Units', value: '34', change: '0%' }
  ];

  const supplyLocations = [
    { location: 'Downtown Center', items: 'Medical Supplies, Food' },
    { location: 'North District', items: 'Rescue Equipment' },
    { location: 'East Zone', items: 'Clothing, Food' },
    { location: 'South Hub', items: 'Medical Kits, Tools' }
  ];

  const handleRequestResources = () => {
    setShowRequestDialog(true);
  };

  const handleConfirmRequest = () => {
    setShowRequestDialog(false);
    navigate('/request-resource');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Resource Dashboard</h1>
          <button 
            onClick={handleRequestResources}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
          >
            <PackageSearch className="h-5 w-5 mr-2" />
            Request Resources
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {inventoryStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{stat.name}</h3>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-600' : 
                  stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Truck className="h-5 w-5 mr-2 text-red-600" />
              Supply Distribution
            </h2>
            <div className="space-y-4">
              {supplyLocations.map((loc, index) => (
                <div key={index} className="flex items-start border-b pb-4 last:border-0">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">{loc.location}</h3>
                    <p className="text-sm text-gray-600">{loc.items}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-red-600" />
              Resource Requests
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Medical Supplies</span>
                <span className="text-red-600 font-medium">High Priority</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Food & Water</span>
                <span className="text-yellow-600 font-medium">Medium Priority</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transport</span>
                <span className="text-green-600 font-medium">Low Priority</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showRequestDialog}
        onClose={() => setShowRequestDialog(false)}
        onConfirm={handleConfirmRequest}
        title="Request Resources"
        message="You are about to make a resource request. This will help us understand your needs and coordinate assistance. Would you like to proceed?"
        confirmText="Continue to Request Form"
      />
    </div>
  );
};

export default Dashboard;