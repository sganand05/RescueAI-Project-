import React from 'react';
import { AlertTriangle, Users, Truck, MapPin } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      id: 1,
      name: 'Active Incidents',
      value: '24',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgHover: 'hover:bg-red-50',
    },
    {
      id: 2,
      name: 'Volunteers Available',
      value: '1,432',
      icon: Users,
      color: 'text-blue-600',
      bgHover: 'hover:bg-blue-50',
    },
    {
      id: 3,
      name: 'Resources Deployed',
      value: '89',
      icon: Truck,
      color: 'text-green-600',
      bgHover: 'hover:bg-green-50',
    },
    {
      id: 4,
      name: 'Areas Covered',
      value: '156',
      icon: MapPin,
      color: 'text-purple-600',
      bgHover: 'hover:bg-purple-50',
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`bg-white overflow-hidden shadow rounded-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 ${stat.bgHover} cursor-pointer`}
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;