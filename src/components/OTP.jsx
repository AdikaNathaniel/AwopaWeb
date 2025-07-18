import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';

export default function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const inputRefs = useRef([]);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If no email was passed, redirect back to register
      navigate('/register');
    }
  }, [location, navigate]);

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/users/verify-email/${otpCode}/${email}`
      );
      const data = response.data;

      if (response.status === 200 && data.message === 'Email verified successfully. You can log in now.') {
        alert('✅ Email verified successfully. You can log in now.');
        setOtp(['', '', '', '', '', '']);
        navigate('/login');
      } else {
        setError(data.message || 'Verification failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10"></div>

      <div className="relative z-20 flex justify-center items-center h-full">
        <div className="bg-gradient-to-br from-blue-500 to-red-500 p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
            <h2 className="text-white text-3xl font-bold mb-4 text-center">
              Verify Your Email
            </h2>
            <p className="text-white text-center mb-6">
              Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>
            </p>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-center">
                {error}
              </div>
            )}

            <div className="flex justify-center gap-3 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl bg-white text-black rounded-lg shadow-md"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full py-3 bg-white text-blue-500 font-bold rounded hover:bg-gray-100"
            >
              {isLoading ? 'Verifying...' : 'VERIFY'}
            </button>

            <div className="text-center mt-6">
              <a href="/login" className="text-sm text-white underline">
                Back to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}