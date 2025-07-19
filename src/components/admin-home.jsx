import React, { useState } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaHeadset, FaUsers, FaUserCircle, FaSignOutAlt, FaCog, FaMapMarkerAlt } from 'react-icons/fa';

export default function AdminHomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const userEmail = location.state?.userEmail || "admin@example.com"; 
  const [showUserModal, setShowUserModal] = useState(false);
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

  const UserModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setShowUserModal(false)}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center mb-6">
            <FaUserCircle className="text-cyan-600 text-3xl mr-4" />
            <div>
              <h3 className="text-lg font-semibold">User Profile</h3>
              <p className="text-gray-600">{userEmail}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaCog className="text-gray-500 text-xl mr-4" />
              <span>Settings</span>
            </div>
            <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaMapMarkerAlt className="text-gray-500 text-xl mr-4" />
              <span>View Live Location Of PregMama</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <FaSignOutAlt className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="relative z-20 p-6">
        {/* Admin Panel Header */}
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
                <button
                  onClick={() => setShowUserModal(true)}
                  className="w-10 h-10 bg-white text-blue-700 flex items-center justify-center rounded-full font-bold cursor-pointer"
                  title={userEmail}
                >
                  <FaUserCircle className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg max-w-6xl mx-auto">
          {selectedPage === 'Dashboard' ? renderDashboard() : renderPage()}
        </main>

        {/* User Modal */}
        <AnimatePresence>
          {showUserModal && <UserModal />}
        </AnimatePresence>
      </div>
    </div>
  );
}