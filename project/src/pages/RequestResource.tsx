import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, AlertTriangle, Truck, Heart, ChevronFirst as FirstAid, DollarSign } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmationDialog from '../components/ConfirmationDialog';
import toast from 'react-hot-toast';

const resourceTypes = [
  { id: 'food', name: 'Food Supplies', icon: Package, description: 'Request food and water supplies' },
  { id: 'medical', name: 'Medical Kits', icon: FirstAid, description: 'Request medical supplies and first aid kits' },
  { id: 'clothing', name: 'Clothing', icon: Heart, description: 'Request clothing and blankets' },
  { id: 'rescue', name: 'Rescue Tools', icon: AlertTriangle, description: 'Request rescue equipment and tools' },
  { id: 'transport', name: 'Transport', icon: Truck, description: 'Request vehicles or transportation assistance' },
  { id: 'funds', name: 'Emergency Funds', icon: DollarSign, description: 'Request financial assistance' },
];

const RequestResource = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    resource_type: '',
    quantity: 1,
    priority: 'medium',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to request resources');

      const { error } = await supabase
        .from('resource_requests')
        .insert([{
          user_id: user.id,
          ...formData
        }]);

      if (error) throw error;

      toast.success('Resource request submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to submit request');
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-red-600 px-6 py-8 text-white">
            <h1 className="text-3xl font-bold text-center">Request Resources</h1>
            <p className="text-center mt-2 text-red-100">Submit your resource requirements for emergency assistance</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, resource_type: type.id })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.resource_type === type.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <type.icon className={`h-8 w-8 ${
                      formData.resource_type === type.id ? 'text-red-600' : 'text-gray-600'
                    }`} />
                    <span className={`mt-2 font-medium ${
                      formData.resource_type === type.id ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {type.name}
                    </span>
                    <p className="mt-1 text-sm text-gray-500">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity Required
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="critical">Critical Priority</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Details
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  placeholder="Please provide any specific requirements or additional information..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !formData.resource_type}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150 flex items-center disabled:bg-red-400"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        title="Confirm Resource Request"
        message="Are you sure you want to submit this resource request? Our team will review your request and respond as soon as possible."
        confirmText="Submit Request"
      />
    </div>
  );
};

export default RequestResource;