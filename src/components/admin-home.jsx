import React, { useState } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBell, FaHeadset, FaUsers, FaUserCircle, FaSignOutAlt, FaCog, FaMapMarkerAlt } from 'react-icons/fa';

export default function AdminHomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Use from navigation state or fallback to test email
  const userEmail = location.state?.userEmail || "admin@example.com"; 
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedPage, setSelectedPage] = useState('Dashboard');

  const logout = async () => {
    try {
      const response = await axios.put('http://localhost:3100/api/v1/users/logout', {}, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 && response.data.success) {
        navigate('/login');
      } else {
        alert('Logout failed: ' + (response.data.message || 'Server error'));
      }
    } catch (err) {
      alert('Logout failed: ' + err.message);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => navigate('/admin-notification')}
            className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-100">
              <FaBell className="text-orange-500 text-2xl" />
            </div>
            <div className="text-lg font-semibold text-gray-800 text-center">Notifications</div>
          </div>
          
          <div 
            onClick={() => navigate('/admin/support')}
            className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
              <FaHeadset className="text-green-500 text-2xl" />
            </div>
            <div className="text-lg font-semibold text-gray-800 text-center">Support</div>
          </div>
          
          <div 
            onClick={() => navigate('/admin/users')}
            className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100">
              <FaUsers className="text-blue-500 text-2xl" />
            </div>
            <div className="text-lg font-semibold text-gray-800 text-center">View All Users</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => (
    <div className="text-center max-w-4xl mx-auto">
      <button
        className="mb-4 text-blue-500 underline"
        onClick={() => setSelectedPage('Dashboard')}
      >
        &larr; Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold">{selectedPage}</h2>
      <p className="mt-2">{selectedPage} Page</p>
    </div>
  );

  const UserMenu = () => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <FaUserCircle className="text-gray-500 mr-3" />
          <span className="text-gray-700">{userEmail}</span>
        </div>
        
        <div className="border-t pt-2">
          <div className="flex items-center py-2 hover:bg-gray-100 cursor-pointer px-2 rounded">
            <FaCog className="text-gray-500 mr-3" />
            <span>Settings</span>
          </div>
          <div className="flex items-center py-2 hover:bg-gray-100 cursor-pointer px-2 rounded">
            <FaMapMarkerAlt className="text-gray-500 mr-3" />
            <span>View Live Location Of PregMama</span>
          </div>
        </div>
        
        <div className="border-t pt-2">
          <div 
            className="flex items-center py-2 text-red-500 hover:bg-gray-100 cursor-pointer px-2 rounded"
            onClick={logout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="relative z-20 p-6">
        {/* Admin Panel Header with User Controls */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-cyan-600 text-white p-4 flex justify-center items-center relative">
              <h1 className="text-xl font-bold text-center">Admin Panel</h1>
              <div className="absolute right-4">
                <div
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 bg-white text-blue-700 flex items-center justify-center rounded-full font-bold cursor-pointer"
                  title={userEmail}
                >
                  <FaUserCircle className="text-xl" />
                </div>
                {showUserMenu && <UserMenu />}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg max-w-6xl mx-auto">
          {selectedPage === 'Dashboard' ? renderDashboard() : renderPage()}
        </main>
      </div>
    </div>
  );
}