import React, { useState, useEffect } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import {
  Thermometer,
  HeartPulse,
  Droplets,
  Activity,
  Heart,
  Weight,
  Bell,
  Settings,
  HelpCircle,
  AlertTriangle,
  MapPin,
  LogOut,
  X,
  Plus,
  Minus,
  Gauge,
  TestTube,
  User,
} from 'lucide-react';

// Helper function to format time elapsed
const formatTimeElapsed = (date) => {
  if (!date) return 'Never';
  
  try {
    const now = new Date();
    const dateObj = new Date(date);
    const diff = now - dateObj;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } catch (e) {
    return 'Never';
  }
};

export default function HealthDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [weightModalOpen, setWeightModalOpen] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [weightLastUpdated, setWeightLastUpdated] = useState(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const [currentWeight, setCurrentWeight] = useState(68.5);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [proteinData, setProteinData] = useState(null);
  
  // Get userEmail from location state or default
  const userEmail = location.state?.userEmail || 'User';

  useEffect(() => {
    // Check for protein data in location state (just came from urine test)
    if (location.state?.proteinData) {
      setProteinData(location.state.proteinData);
      localStorage.setItem('proteinTestResult', JSON.stringify(location.state.proteinData));
    } else {
      // Try to load from localStorage
      const savedProteinData = localStorage.getItem('proteinTestResult');
      if (savedProteinData) {
        setProteinData(JSON.parse(savedProteinData));
      }
    }
  }, [location.state]);

  const metricData = [
    {
      title: 'Body Temperature',
      value: '37.2°C',
      icon: <Thermometer size={32} className="text-red-500" />,
      lastUpdated: '2 hours ago',
    },
    {
      title: 'Blood Pressure',
      value: '120/80 mmHg',
      icon: <Heart size={32} className="text-pink-500" />,
      lastUpdated: '3 hours ago',
    },
    {
      title: 'Blood Glucose',
      value: '5.4 mmol/L',
      icon: <Droplets size={32} className="text-purple-500" />,
      lastUpdated: '1 hour ago',
    },
    {
      title: 'Oxygen Saturation',
      value: '98%',
      icon: <Activity size={32} className="text-blue-500" />,
      lastUpdated: '30 minutes ago',
    },
    {
      title: 'Heart Rate',
      value: '72 BPM',
      icon: <HeartPulse size={32} className="text-red-600" />,
      lastUpdated: '15 minutes ago',
    },
    {
      title: 'Weight',
      value: `${currentWeight} kg`,
      icon: <Weight size={32} className="text-green-600" />,
      lastUpdated: formatTimeElapsed(weightLastUpdated),
    },
  ];

  // Additional metrics data
  const additionalMetrics = [
    {
      title: 'Mean Arterial Pressure',
      value: '93 mmHg',
      icon: <Gauge size={32} className="text-teal-500" />,
      lastUpdated: '1 hour ago',
    },
    {
      title: 'Protein in Urine',
      value: proteinData?.level || 'Not tested',
      icon: <TestTube size={32} className="text-indigo-500" />,
      lastUpdated: proteinData ? formatTimeElapsed(proteinData.lastUpdated) : 'Never',
      color: proteinData?.color
    },
    {
      title: 'Patient ID',
      value: '001',
      icon: <User size={32} className="text-cyan-600" />,
      lastUpdated: 'Profile created',
    },
  ];

  const navItems = [
    { name: 'Appointments', path: '/medic-appointment', short: 'Appts' },
    { name: 'Pregnancy Tips', path: '/wellness-tips', short: 'Tips' },
    { name: 'Protein In Urine Test', path: '/urine-strip', short: 'Protein' },
    { name: 'InfoDesk', path: '/pregnancy-health', short: 'Info' },
    { name: 'Chatbot', path: '/pregnancy-chatbot', short: 'Chat' },
    { name: 'Emergency', path: '/emergency-contact', short: 'Emergency' },
    { name: 'Payments', path: '/paystack-init', short: 'Pay' },
    { name: 'Medics', path: '/medic-list', short: 'Medics' },
    { name: 'Mood', path: '/symptom-checker', short: 'Mood' },
    { name: 'Find Medic', path: '/doctor-by-name', short: 'Find' }
  ];

  const handleNavigation = (page) => {
    switch (page) {
      case 'notifications':
        navigate('/notifications');
        break;
      case 'settings':
        navigate('/set-profile');
        break;
      case 'support':
        navigate('/support-create');
        break;
      case 'map':
        navigate('/map');
        break;
      default:
        break;
    }
  };

  const handleNavItemClick = (item) => {
    setActiveNavItem(item.name);
    navigate(item.path, { state: { userEmail } });
  };

  const handleLogout = async () => {
    await axios.put('http://localhost:3100/api/v1/users/logout');
    navigate('/login');
  };

  const handleEmergency = () => {
    alert("Emergency alert triggered!");
  };

  const handleWeightUpdate = () => {
    setWeightModalOpen(true);
    setNewWeight(currentWeight.toString());
  };

  const handleWeightSubmit = () => {
    if (newWeight && !isNaN(newWeight) && parseFloat(newWeight) > 0) {
      setCurrentWeight(parseFloat(newWeight));
      setWeightLastUpdated(new Date());
      setWeightModalOpen(false);
      setNewWeight('');
    }
  };

  const incrementWeight = () => {
    const weight = parseFloat(newWeight) || 0;
    setNewWeight((weight + 0.1).toFixed(1));
  };

  const decrementWeight = () => {
    const weight = parseFloat(newWeight) || 0;
    if (weight > 0.1) {
      setNewWeight((weight - 0.1).toFixed(1));
    }
  };

  const options = [
    { title: 'Notifications', icon: <Bell className="text-blue-500" size={24} />, onClick: () => handleNavigation('notifications') },
    { title: 'Settings', icon: <Settings className="text-indigo-500" size={24} />, onClick: () => handleNavigation('settings') },
    { title: 'Support', icon: <HelpCircle className="text-green-600" size={24} />, onClick: () => handleNavigation('support') },
    { title: 'Emergency Alert', icon: <AlertTriangle className="text-red-500" size={24} />, onClick: handleEmergency },
    { title: 'View Location', icon: <MapPin className="text-emerald-500" size={24} />, onClick: () => handleNavigation('map') },
    { title: 'Logout', icon: <LogOut className="text-rose-600" size={24} />, onClick: handleLogout },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center p-4 md:p-8 relative" style={{ backgroundImage: `url(${pregnancyImg})` }}>
      {/* Navigation Bar */}
      <div className="relative mb-6 w-full">
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 pb-3">
          {navItems.map((item, index) => (
            <div 
              key={index}
              className="relative flex flex-col items-center px-2 py-1 md:px-3 md:py-2"
              onClick={() => handleNavItemClick(item)}
            >
              <motion.div
                className={`text-white text-xs md:text-sm font-medium whitespace-nowrap cursor-default ${
                  activeNavItem === item.name ? 'font-bold' : ''
                }`}
                whileHover={{ scale: 1.05 }}
              >
                <span className="hidden sm:inline">{item.name}</span>
                <span className="sm:hidden">{item.short}</span>
              </motion.div>
              {activeNavItem === item.name && (
                <motion.div 
                  className="absolute -bottom-1 w-2 h-2 bg-white rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white bg-opacity-30" />
      </div>

      <motion.h1
        className="text-white text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Health Metrics Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {metricData.map((metric, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
              {metric.icon}
            </div>
            <h2 className="text-base md:text-lg font-semibold text-gray-800">{metric.title}</h2>
            <p className="text-lg md:text-xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs md:text-sm text-gray-500">Last updated: {metric.lastUpdated}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
        {additionalMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
              {metric.icon}
            </div>
            <h2 className="text-base md:text-lg font-semibold text-gray-800">{metric.title}</h2>
            {metric.color ? (
              <div className="flex items-center justify-center gap-2 mb-2">
                <div 
                  className="w-6 h-6 rounded-full border border-gray-300" 
                  style={{ backgroundColor: metric.color }}
                />
                <p className="text-lg md:text-xl font-bold text-gray-900">{metric.value}</p>
              </div>
            ) : (
              <p className="text-lg md:text-xl font-bold text-gray-900 mb-2">{metric.value}</p>
            )}
            <p className="text-xs md:text-sm text-gray-500">Last updated: {metric.lastUpdated}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 md:mt-10 mx-auto block px-4 py-2 md:px-6 md:py-3 bg-cyan-600 text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold shadow-lg hover:bg-cyan-700"
        onClick={handleWeightUpdate}
      >
        Update Weight
      </motion.button>

      <button
        onClick={() => setDialogOpen(true)}
        className="fixed top-2 right-2 md:top-4 md:right-4 bg-white p-1 md:p-2 rounded-full shadow-md"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${userEmail.split('@')[0]}`}
          alt="avatar"
          className="w-6 h-6 md:w-8 md:h-8 rounded-full"
        />
      </button>

      {/* Main Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Hi, {userEmail}</h2>
              <button onClick={() => setDialogOpen(false)}>
                <X size={20} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    opt.onClick();
                    setDialogOpen(false);
                  }}
                  className="cursor-default border border-gray-200 rounded-xl p-4 flex flex-col items-center hover:bg-gray-50 transition"
                >
                  {opt.icon}
                  <span className="mt-2 text-sm font-medium text-gray-700 text-center">
                    {opt.title}
                  </span>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Weight Update Modal */}
      <Dialog open={weightModalOpen} onClose={() => setWeightModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setWeightModalOpen(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">Update Weight</h2>
              <button 
                onClick={() => setWeightModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} className="md:h-6" />
              </button>
            </div>

            <div className="flex flex-col items-center space-y-4 md:space-y-6">
              {/* Weight Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Weight size={32} className="text-green-600" />
              </div>

              {/* Weight Input Section */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Weight (kg)
                </label>
                <div className="flex items-center space-x-2 md:space-x-4">
                  <button
                    onClick={decrementWeight}
                    className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="flex-1 px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg md:rounded-xl text-center text-lg md:text-xl font-semibold focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    placeholder="Enter weight"
                    step="0.1"
                    min="0"
                  />
                  
                  <button
                    onClick={incrementWeight}
                    className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Current Weight Display */}
              <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg md:rounded-xl w-full">
                <p className="text-xs md:text-sm text-gray-600">Previous Weight</p>
                <p className="text-base md:text-lg font-semibold text-gray-800">{currentWeight} kg</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 md:space-x-4 w-full">
                <button
                  onClick={() => setWeightModalOpen(false)}
                  className="flex-1 px-4 py-2 md:px-6 md:py-3 border border-gray-300 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWeightSubmit}
                  className="flex-1 px-4 py-2 md:px-6 md:py-3 bg-cyan-600 text-white rounded-lg md:rounded-xl text-sm md:text-base font-semibold shadow-lg hover:bg-cyan-700 transition-colors"
                >
                  Update Weight
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </div>
  );
};