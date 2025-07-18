import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import pregnancyImg from '../assets/pregnancy.png';

const ViewAppointmentsPage = ({ userEmail }) => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/appointments');
      if (response.data.success && response.data.result) {
        setAppointments(response.data.result);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAppointment = async (patientName) => {
    try {
      await axios.delete('http://localhost:3100/api/v1/appointments/last');
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      showSnackbar("Failed to delete appointment");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.put('http://localhost:3100/api/v1/users/logout');
      if (response.data.success) {
        navigate('/login');
      } else {
        showSnackbar(`Logout failed: ${response.data.message}`);
      }
    } catch (error) {
      showSnackbar("Logout failed: Server error");
    }
  };

  const showSnackbar = (message) => {
    // Implement your snackbar/notification system here
    console.log(message); // Placeholder for actual snackbar implementation
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-500 py-4 shadow-md"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold text-center flex-1">
            All Appointments
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProfileDialog(true)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
          >
            <span className="text-blue-500 font-medium">
              {userEmail ? userEmail[0].toUpperCase() : 'U'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
          </motion.div>
        ) : appointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 text-center"
          >
            <p className="text-gray-600 text-lg font-medium">
              No Appointments Available
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchAppointments}
              className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition-colors"
            >
              Refresh
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {appointments.map((appointment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white bg-opacity-90 rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6 flex items-start">
                    <div className="mr-4">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"
                      >
                        <i className="fas fa-user text-blue-500 text-xl"></i>
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">
                        {appointment.details?.patient_name || 'Unknown'}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {appointment.day} at {appointment.time}
                      </p>
                      <p className="text-gray-600 mt-1">
                        <span className="font-medium">Condition:</span> {appointment.details?.condition || 'N/A'}
                      </p>
                      <p className="text-gray-600 mt-1">
                        <span className="font-medium">Notes:</span> {appointment.details?.notes || 'N/A'}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => deleteAppointment(appointment.details?.patient_name)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <i className="fas fa-trash-alt text-xl"></i>
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Profile Dialog */}
      <AnimatePresence>
        {showProfileDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowProfileDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <i className="fas fa-envelope text-blue-500 mr-3"></i>
                  <span className="text-gray-700">{userEmail}</span>
                </div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    setShowProfileDialog(false);
                    navigate('/set-profile', { state: { userEmail } });
                  }}
                >
                  <i className="fas fa-cog text-blue-500 mr-3"></i>
                  <span className="text-blue-600 underline">Settings</span>
                </motion.div>
                
                <div className="pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileDialog(false)}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-medium"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ViewAppointmentsPage;