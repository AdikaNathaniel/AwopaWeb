import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';

const SupportFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Enter your name';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Enter your phone number';
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message) newErrors.message = 'Enter your message';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3100/api/v1/support',
        formData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.status === 200 || response.status === 201) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      alert('Failed to send support request');
    } finally {
      setIsLoading(false);
    }
  };

  const buildInput = (name, label, icon, type = 'text', multiline = false) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <label className="block text-gray-700 text-sm font-medium mb-1">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
          {multiline ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={5}
              placeholder={`Enter ${label}`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder={`Enter ${label}`}
            />
          )}
        </div>
        {errors[name] && (
          <p className="text-red-500 text-xs mt-1">{errors[name]}</p>
        )}
      </motion.div>
    );
  };

  // Icons as React components
  const icons = {
    person: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    email: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    message: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    send: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    )
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '20px 0'
      }}
    >
      {/* Support Form Header - Wider than the card but not touching page edges */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '90%',
          maxWidth: '900px',
          margin: '0 auto 10px', // Reduced bottom margin to close the gap
          position: 'relative',
          zIndex: 2
        }}
      >
        <div className="bg-cyan-600 text-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-center">Support Form</h1>
        </div>
      </motion.div>

      {/* Form Card - Slightly narrower */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          width: '85%',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Support request sent successfully!</h2>
              <p className="text-gray-600">We'll get back to you soon.</p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-lg"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {buildInput('name', 'Name', icons.person)}
                {buildInput('phoneNumber', 'Phone Number', icons.phone, 'tel')}
                {buildInput('email', 'Email', icons.email, 'email')}
                {buildInput('message', 'Message', icons.message, 'text', true)}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6"
              >
                <button
                  onClick={submitForm}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg ${isLoading ? 'bg-cyan-400' : 'bg-cyan-600 hover:bg-cyan-700'} text-white font-medium shadow-md transition-all`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      {icons.send}
                      <span className="ml-2">Send Support Request</span>
                    </>
                  )}
                </button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SupportFormPage;