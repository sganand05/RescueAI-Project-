import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HandHelping as Helping, 
  Bell, 
  User, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  BookOpen, 
  Building2, 
  Truck, 
  PackageSearch, 
  Heart, 
  PenSquare,
  LayoutDashboard,
  DollarSign
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      const button = document.getElementById('menu-button');
      const profile = document.getElementById('profile-menu');
      const profileButton = document.getElementById('profile-button');
      
      if (menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      
      if (profile && profileButton && !profile.contains(event.target as Node) && !profileButton.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    gender: "Male",
    age: 28,
    location: "New York, NY",
    role: "Volunteer",
    resources: ["Medical Kit", "4x4 Vehicle"],
    phone: "+1 (555) 123-4567",
    organization: "Red Cross Relief",
    inventory: {
      medicalKits: 50,
      foodSupplies: 1000,
      rescueTools: 25,
      clothing: 500
    }
  });

  const handleProfileUpdate = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              id="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <Link to="/" className="flex items-center ml-2 md:ml-0">
              <Helping className="h-8 w-8 text-red-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">RescueAI</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavigation('/')} className="text-gray-700 hover:text-red-600 transition-colors">Home</button>
            <button onClick={() => handleNavigation('/resources')} className="text-gray-700 hover:text-red-600 transition-colors">Resources</button>
            <button onClick={() => handleNavigation('/incidents')} className="text-gray-700 hover:text-red-600 transition-colors">Incidents</button>
            <button onClick={() => handleNavigation('/guidelines')} className="text-gray-700 hover:text-red-600 transition-colors">
              <BookOpen className="h-4 w-4 inline-block mr-1" />
              Guidelines
            </button>
            <button onClick={() => handleNavigation('/alerts')} className="flex items-center text-gray-700 hover:text-red-600 transition-colors">
              <Bell className="h-4 w-4 mr-1" />
              Alerts
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={() => handleNavigation('/dashboard')} className="hidden md:block text-gray-700 hover:text-red-600 transition-colors">
              <LayoutDashboard className="h-6 w-6" />
            </button>
            <button onClick={() => handleNavigation('/donate')} className="hidden md:block text-gray-700 hover:text-red-600 transition-colors">
              <DollarSign className="h-6 w-6" />
            </button>
            <button onClick={() => handleNavigation('/login')} className="text-gray-700 hover:text-red-600 transition-colors">Login</button>
            <button onClick={() => handleNavigation('/signup')} className="text-gray-700 hover:text-red-600 transition-colors">Signup</button>
            <div className="relative">
              <button
                id="profile-button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
              >
                <User className="h-6 w-6" />
              </button>

              {isProfileOpen && (
                <div id="profile-menu" className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
                  <div className="flex justify-between items-center px-4 py-2 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
                    <button 
                      onClick={() => setIsProfileOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="px-4 py-3 border-b">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-900">
                        {isEditing ? (
                          <input
                            type="text"
                            value={userProfile.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          userProfile.name
                        )}
                      </p>
                      <span className="text-sm text-red-600">{userProfile.role}</span>
                    </div>
                    {userProfile.organization && (
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <Building2 className="h-4 w-4 mr-2" />
                        {userProfile.organization}
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-2 space-y-3">
                    <div className="flex items-center text-sm text-gray-700">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Age: {isEditing ? (
                        <input
                          type="number"
                          value={userProfile.age}
                          onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                          className="border rounded px-2 py-1 w-16 ml-2"
                        />
                      ) : userProfile.age}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Shield className="h-4 w-4 mr-2" />
                      <span>Gender: {isEditing ? (
                        <select
                          value={userProfile.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="border rounded px-2 py-1 ml-2"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : userProfile.gender}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{isEditing ? (
                        <input
                          type="text"
                          value={userProfile.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      ) : userProfile.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-700">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{isEditing ? (
                        <input
                          type="tel"
                          value={userProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      ) : userProfile.phone}</span>
                    </div>

                    {userProfile.role === "NGO" && (
                      <div className="border-t pt-3 mt-3">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <PackageSearch className="h-4 w-4 mr-2" />
                          Inventory Status
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Medical Kits:</span>
                            <span className="font-semibold">{userProfile.inventory.medicalKits}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Food Supplies:</span>
                            <span className="font-semibold">{userProfile.inventory.foodSupplies}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Rescue Tools:</span>
                            <span className="font-semibold">{userProfile.inventory.rescueTools}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Clothing:</span>
                            <span className="font-semibold">{userProfile.inventory.clothing}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <button className="flex-1 bg-yellow-500 text-white px-3 py-1.5 rounded text-sm hover:bg-yellow-600 transition-colors flex items-center justify-center">
                            <Truck className="h-4 w-4 mr-1" />
                            Update Supply
                          </button>
                          <button className="flex-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700 transition-colors flex items-center justify-center">
                            <Heart className="h-4 w-4 mr-1" />
                            Request Donations
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="pt-2 flex space-x-2">
                      <button 
                        onClick={handleProfileUpdate}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm flex items-center justify-center"
                      >
                        <PenSquare className="h-4 w-4 mr-2" />
                        {isEditing ? 'Save Changes' : 'Update Profile'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden transition-all duration-300 ease-in-out transform"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            <button 
              onClick={() => handleNavigation('/')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/resources')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Resources
            </button>
            <button 
              onClick={() => handleNavigation('/incidents')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Incidents
            </button>
            <button 
              onClick={() => handleNavigation('/guidelines')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Guidelines
            </button>
            <button 
              onClick={() => handleNavigation('/alerts')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Alerts
            </button>
            <button 
              onClick={() => handleNavigation('/dashboard')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Dashboard
            </button>
            <button 
              onClick={() => handleNavigation('/donate')}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-colors duration-200"
            >
              Donate
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;