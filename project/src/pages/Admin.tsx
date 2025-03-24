import React from 'react';
import { Shield, AlertTriangle, Bell, Users } from 'lucide-react';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            Admin Dashboard
          </h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h2 className="text-xl font-semibold">Pending Reports</h2>
            </div>
            <p className="text-3xl font-bold">12</p>
            <button className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-150">
              Review Reports
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Bell className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold">Emergency Alerts</h2>
            </div>
            <p className="text-3xl font-bold">3</p>
            <button className="mt-4 w-full bg-yellow-500 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-150">
              Manage Alerts
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Active Volunteers</h2>
            </div>
            <p className="text-3xl font-bold">245</p>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-150">
              Manage Volunteers
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;