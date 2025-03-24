import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Package, Truck, Heart, PawPrint, ChevronFirst as FirstAid } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ConfirmationDialog from '../components/ConfirmationDialog';
import toast from 'react-hot-toast';

const Donate = () => {
  const navigate = useNavigate();
  const [donationType, setDonationType] = useState('money');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');

  const donationTypes = [
    { id: 'money', name: 'Money', icon: DollarSign },
    { id: 'food', name: 'Food', icon: Package },
    { id: 'clothes', name: 'Clothes', icon: Package },
    { id: 'transport', name: 'Transport', icon: Truck },
    { id: 'pets', name: 'Pet Emergency Kit', icon: PawPrint },
    { id: 'medical', name: 'Medical Supplies', icon: FirstAid },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmDonation = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in to make a donation');

      const { error } = await supabase.from('donations').insert([{
        user_id: user.id,
        donor_name: user.user_metadata.name || 'Anonymous',
        donation_type: donationType,
        amount_or_items: donationType === 'money' ? amount : description,
        contact_info: user.email
      }]);

      if (error) throw error;

      toast.success('Thank you for your donation!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process donation');
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
            <div className="flex items-center justify-center">
              <Heart className="h-12 w-12" />
            </div>
            <h1 className="text-3xl font-bold text-center mt-4">Make a Difference Today</h1>
            <p className="text-center mt-2 text-red-100">Your support helps save lives and rebuild communities</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {donationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setDonationType(type.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    donationType === type.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <type.icon className={`h-6 w-6 ${
                      donationType === type.id ? 'text-red-600' : 'text-gray-600'
                    }`} />
                    <span className={`mt-2 font-medium ${
                      donationType === type.id ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {type.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {donationType === 'money' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Donation Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="focus:ring-red-500 focus:border-red-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              )}

              {donationType !== 'money' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    rows={4}
                    placeholder={`Describe what you'd like to donate...`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
              )}

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-600 text-white px-4 py-3 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center disabled:bg-red-400"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  {donationType === 'money' ? 'Donate Now' : 'Submit Donation Offer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmDonation}
        title="Confirm Donation"
        message={`Are you sure you want to proceed with your ${donationType === 'money' ? `$${amount}` : donationType} donation? This action cannot be undone.`}
        confirmText="Confirm Donation"
      />
    </div>
  );
};

export default Donate;