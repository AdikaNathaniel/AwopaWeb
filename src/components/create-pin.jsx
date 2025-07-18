import React, { useState, useRef } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CreatePinPage() {
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(false);

  const pinRefs = useRef([]);

  const handlePinChange = (value, index) => {
    if (/\d/.test(value) || value === '') {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value !== '' && index < 5) {
        pinRefs.current[index + 1].focus();
      } else if (value === '' && index > 0) {
        pinRefs.current[index - 1].focus();
      }
    }
  };

  const submitPin = async () => {
    const fullPin = pin.join('');
    if (!userId || !phone || fullPin.length !== 6) {
      alert('Please fill all fields and enter a 6-digit PIN');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3100/api/v1/pin', {
        userId: userId.trim(),
        phone: phone.trim(),
        pin: fullPin
      });

      if (response.status === 201 && response.data.success) {
        alert('PIN created successfully! Kindly verify.');
        window.location.href = '/verify-pin';
      } else {
        alert(response.data.message || 'Failed to create PIN.');
      }
    } catch (err) {
      alert('Error occurred while submitting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Your PIN</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-cyan-600"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-cyan-600"
          />

          <p className="text-center text-sm text-gray-600">Enter a 6-digit PIN</p>

          <div className="flex justify-center gap-2">
            {pin.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => (pinRefs.current[index] = el)}
                type="password"
                value={digit}
                maxLength={1}
                onChange={(e) => handlePinChange(e.target.value, index)}
                className="w-10 h-12 text-center text-xl font-bold rounded-lg border border-gray-400 focus:outline-none focus:border-cyan-600"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              />
            ))}
          </div>

          <button
            onClick={submitPin}
            disabled={isLoading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg text-lg hover:bg-cyan-700 transition"
          >
            {isLoading ? 'Creating PIN...' : 'Create PIN'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
