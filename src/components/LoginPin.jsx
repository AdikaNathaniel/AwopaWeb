import React, { useState, useRef } from 'react';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import { useNavigate } from 'react-router-dom';

export default function LoginWithPin({ userEmail, userType }) {
  const navigate = useNavigate();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const clearInputs = () => {
    setPin(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const verifyPin = async () => {
    const pinCode = pin.join('');
    if (pinCode.length !== 6) {
      alert('Please enter a valid 6-digit PIN');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3100/api/v1/pin/verify', {
        userId: userEmail,
        pin: pinCode,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 201) {
        alert('PIN verified successfully');
        navigateBasedOnUserType();
      } else {
        alert(response?.data?.message || 'Verification failed');
        clearInputs();
      }
    } catch (error) {
      if (error.message.includes('timeout')) {
        alert('Request timed out. Please try again.');
      } else if (error.message.includes('Network')) {
        alert('Network error. Please check your connection.');
      } else {
        alert('Error occurred: ' + error.message);
      }
      clearInputs();
    } finally {
      setIsLoading(false);
    }
  };

  const navigateBasedOnUserType = () => {
    const type = userType.toLowerCase();
    switch (type) {
      case 'doctor':
        navigate('/predictions');
        break;
      case 'pregnant woman':
        navigate('/pregnancy-calculator');
        break;
      case 'wellness user':
      case 'family relative':
        navigate('/health-metrics');
        break;
      case 'admin':
        navigate('/admin-home');
        break;
      default:
        alert(`Unknown user type: ${type}`);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img src={pregnancyImg} alt="Background" className="absolute w-full h-full object-cover z-0" />
      <div className="absolute w-full h-full bg-black opacity-60 z-10" />

      <div className="relative z-20 flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-cyan-600 text-2xl font-bold text-center mb-4">Login with PIN</h2>
          <p className="text-center text-gray-700 mb-4">
            User: <strong>{userEmail}</strong><br />Role: <strong>{userType}</strong>
          </p>

          <div className="flex justify-center gap-3 mb-6">
            {pin.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl bg-gray-100 border border-gray-300 rounded"
              />
            ))}
          </div>

          <button
            onClick={verifyPin}
            disabled={isLoading}
            className="w-full py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700 transition"
          >
            {isLoading ? 'Verifying...' : 'Login with PIN'}
          </button>
        </div>
      </div>
    </div>
  );
}
