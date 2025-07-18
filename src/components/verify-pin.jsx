import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const PinVerifyScreen = () => {
  const [formData, setFormData] = useState({
    userId: '',
    pin: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.userId) newErrors.userId = 'Please enter user ID';
    if (!formData.pin) {
      newErrors.pin = 'Please enter PIN';
    } else if (formData.pin.length !== 6) {
      newErrors.pin = 'PIN must be 6 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const verifyPin = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3100/api/v1/pin/verify', {
        userId: formData.userId.trim(),
        pin: formData.pin.trim()
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000
      });

      if (response.status === 201) {
        showSuccessDialog("PIN verified successfully");
      } else {
        showErrorDialog(response.data?.message || `Verification failed (Status: ${response.status})`);
      }
    } catch (error) {
      let errorMessage = "Error occurred: ";
      if (error.code === 'ECONNABORTED') {
        errorMessage += "Request timed out. Please try again.";
      } else if (error.message?.includes('Network Error')) {
        errorMessage += "Network error. Please check your connection.";
      } else {
        errorMessage += error.response?.data?.message || error.message;
      }
      showErrorDialog(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuccessDialog = (message) => {
    // Using Framer Motion for the dialog animation
    const SuccessDialog = () => (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div 
          className="bg-white rounded-lg p-6 w-full max-w-md"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <div className="flex items-center">
            <svg className="w-8 h-8 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold">Success</h3>
          </div>
          <div className="flex flex-col items-center mt-4">
            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-center mt-4">{message || "PIN verified successfully"}</p>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                clearAllFields();
                setShowDialog(null);
              }}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              OK
            </button>
          </div>
        </motion.div>
      </motion.div>
    );

    setShowDialog(<SuccessDialog />);
  };

  const showErrorDialog = (message) => {
    const ErrorDialog = () => (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div 
          className="bg-white rounded-lg p-6 w-full max-w-md"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
        >
          <div className="flex items-center">
            <svg className="w-8 h-8 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-bold">Error</h3>
          </div>
          <p className="mt-4">{message}</p>
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowDialog(null)}
              className="text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              OK
            </button>
          </div>
        </motion.div>
      </motion.div>
    );

    setShowDialog(<ErrorDialog />);
  };

  const clearAllFields = () => {
    setFormData({
      userId: '',
      pin: ''
    });
    setErrors({});
  };

  const [showDialog, setShowDialog] = useState(null);

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-white to-gray-50"
      style={{ backgroundImage: `url(${pregnancyImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-cyan-600 text-white py-4 shadow-md">
        <h1 className="text-xl font-semibold text-center">Verify PIN</h1>
      </div>

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto bg-white bg-opacity-90 rounded-xl shadow-md overflow-hidden p-8 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex justify-center mb-8"
          >
            <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </motion.div>

          <div className="space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="Enter your user ID"
                  className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.userId ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.userId && <p className="mt-1 text-sm text-red-600">{errors.userId}</p>}
            </motion.div>

            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-1">PIN</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="Enter your 6-digit PIN"
                  maxLength={6}
                  className={`pl-10 w-full px-4 py-3 rounded-lg border ${errors.pin ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              {errors.pin && <p className="mt-1 text-sm text-red-600">{errors.pin}</p>}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={verifyPin}
                disabled={isLoading}
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors flex justify-center items-center"
              >
                {isLoading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Verify PIN
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {showDialog}
    </div>
  );
};

export default PinVerifyScreen;