import React from 'react';
import { Phone, Guitar as Hospital, FireExtinguisher, Shield, Zap } from 'lucide-react';

interface EmergencyResource {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  icon: any;
  color: string;
}

const Resources = () => {
  const resources: EmergencyResource[] = [
    {
      id: 1,
      name: "Central Hospital",
      type: "Hospital",
      address: "123 Medical Center Dr",
      phone: "+1 (555) 234-5678",
      icon: Hospital,
      color: "text-blue-600"
    },
    {
      id: 2,
      name: "City Fire Station",
      type: "Fire Station",
      address: "456 Emergency Ave",
      phone: "+1 (555) 345-6789",
      icon: FireExtinguisher,
      color: "text-red-600"
    },
    {
      id: 3,
      name: "Police Department",
      type: "Police Station",
      address: "789 Safety Blvd",
      phone: "+1 (555) 456-7890",
      icon: Shield,
      color: "text-indigo-600"
    },
    {
      id: 4,
      name: "Electric Board",
      type: "Utility",
      address: "321 Power Lane",
      phone: "+1 (555) 567-8901",
      icon: Zap,
      color: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Local Emergency Resources</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="flex items-center mb-4">
                <resource.icon className={`h-8 w-8 ${resource.color}`} />
                <div className="ml-3">
                  <h2 className="text-xl font-semibold text-gray-900">{resource.name}</h2>
                  <p className="text-sm text-gray-500">{resource.type}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-gray-600">{resource.address}</p>
                
                <a
                  href={`tel:${resource.phone}`}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {resource.phone}
                </a>
                
                <button className="w-full mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 active:bg-red-800 transition-colors flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;