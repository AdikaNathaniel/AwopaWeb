import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LoginWithPin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    userType: ''
  });
  const inputRefs = useRef([]);

  // Get user data from location state
  useEffect(() => {
    if (location.state) {
      setUserData({
        email: location.state.userEmail || '',
        userType: location.state.userType || ''
      });
    }
  }, [location.state]);

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
        userId: userData.email,
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
    const type = userData.userType.toLowerCase();
    switch (type) {
      case 'doctor':
        navigate('/predictions', { state: { userEmail: userData.email } });
        break;
      case 'pregnant woman':
        navigate('/pregnancy-calculator', { state: { userEmail: userData.email } });
        break;
      case 'wellness user':
      case 'family relative':
        navigate('/health-metrics', { state: { userEmail: userData.email } });
        break;
      case 'admin':
        navigate('/admin-home', { state: { userEmail: userData.email } });
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
          <div className="flex justify-center mb-6">
            <div className="rounded-full border-4 border-cyan-600 p-1">
              <img 
                src={pregnancyImg} 
                alt="User" 
                className="w-20 h-20 rounded-full object-cover" 
              />
            </div>
          </div>

          <h2 className="text-cyan-600 text-2xl font-bold text-center mb-4">Login with PIN</h2>
          
          <div className="text-center mb-6">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {userData.email || 'Not provided'}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Role:</span> {userData.userType || 'Not specified'}
            </p>
          </div>

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
                className="w-12 h-12 text-center text-xl bg-gray-100 border border-gray-300 rounded focus:border-cyan-600 focus:outline-none"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            onClick={verifyPin}
            disabled={isLoading}
            className={`w-full py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700 transition flex justify-center items-center ${
              isLoading ? 'opacity-75' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </>
            ) : (
              'Login with PIN'
            )}
          </button>

          <div className="mt-4 text-center">
            <button 
              onClick={clearInputs}
              className="text-cyan-600 hover:text-cyan-800 text-sm font-medium"
            >
              Clear PIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}