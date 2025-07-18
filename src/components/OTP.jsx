import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';

export default function OTPVerification() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]);

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
      alert('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/users/verify-email/${otpCode}/${email}`
      );
      const data = response.data;

      if (
        response.status === 200 &&
        data.message === 'Email verified successfully. You can log in now.'
      ) {
        alert('✅ Email verified successfully. You can log in now.');
        setOtp(['', '', '', '', '', '']); // Clear boxes on success
        inputRefs.current[0]?.focus();
        navigate('/login');
      } else {
        alert(data.message || 'Verification failed');
      }
    } catch (err) {
      alert('❌ An error occurred. Please try again.');
    }

    setOtp(['', '', '', '', '', '']); // Clear boxes on error too
    inputRefs.current[0]?.focus();
    setIsLoading(false);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex justify-center items-center h-full">
        <div className="bg-cyan-600 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-white text-3xl font-bold mb-4 text-center">
            Verify Your Email
          </h2>
          <p className="text-white text-center mb-6">
            Enter the 6-digit OTP sent to <span className="font-semibold">{email}</span>
          </p>

          {/* OTP Input Boxes */}
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
            className="w-full py-3 bg-white text-cyan-700 font-bold rounded hover:bg-cyan-100"
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
  );
}
