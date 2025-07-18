import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const UpdateEmergencyContact = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email || !email.includes('@')) {
      setErrorMsg('Please fill all fields with valid values.');
      return;
    }

    setIsLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await axios.put(
        `http://localhost:3100/api/v1/emergency/contacts/${name.trim()}`,
        {
          phoneNumber: phoneNumber.trim(),
          email: email.trim(),
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (res.status === 200) {
        setSuccessMsg(res.data.message || 'Contact updated successfully');
        setName('');
        setPhoneNumber('');
        setEmail('');
        setShowSuccessDialog(true);
      } else {
        setErrorMsg(res.data.message || 'Failed to update contact');
      }
    } catch (err) {
      setErrorMsg(`Network error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        className="bg-white/90 max-w-xl mx-auto rounded-xl shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">
          Update Emergency Contact
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-gray-700 mb-1">Contact Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Enter contact name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-gray-700 mb-1">New Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Enter phone number"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-gray-700 mb-1">New Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none"
              placeholder="Enter email address"
            />
          </motion.div>

          {errorMsg && (
            <motion.p
              className="text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {errorMsg}
            </motion.p>
          )}

          {successMsg && (
            <motion.p
              className="text-green-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {successMsg}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 rounded-lg flex items-center justify-center gap-3"
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Update Contact
              </>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* ✅ Success Dialog */}
      <AnimatePresence>
        {showSuccessDialog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 text-center max-w-sm mx-auto"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-green-500 text-5xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3 className="text-xl font-bold mb-4">Contact Updated Successfully!</h3>
              <motion.button
                onClick={() => setShowSuccessDialog(false)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg"
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateEmergencyContact;
