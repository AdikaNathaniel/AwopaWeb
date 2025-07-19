import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/pregnancy.png';
import ForgotPassword from './ForgotPassword';
import Register from './Register';
import FaceLogin from './FaceLogin';
// import LoginWithPin from './LoginWithPin'; 
// import LoginWithPin from   './LoginPin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('Doctor');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFaceLogin, setShowFaceLogin] = useState(false);

  // Typewriter effect state
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const fullText = 'Welcome To Awoapa';

  // Complex typewriter effect
  useEffect(() => {
    let index = 0;
    let timer;

    const runAnimation = () => {
      switch (animationPhase) {
        case 0: // Type full text first time
          timer = setInterval(() => {
            if (index < fullText.length) {
              setDisplayText(fullText.slice(0, index + 1));
              index++;
            } else {
              clearInterval(timer);
              setTimeout(() => {
                setAnimationPhase(1);
                index = fullText.length;
              }, 1000); // Wait 1 second before starting backspace
            }
          }, 250); // Slower typing speed for initial text
          break;

        case 1: // Backspace to "Welcome To"
          timer = setInterval(() => {
            if (index > 10) { // "Welcome To" is 10 characters
              setDisplayText(fullText.slice(0, index - 1));
              index--;
            } else {
              clearInterval(timer);
              setTimeout(() => {
                setAnimationPhase(2);
              }, 500);
            }
          }, 50);
          break;

        case 2: // Type "Welcome To" again
          timer = setInterval(() => {
            if (index < 10) {
              setDisplayText(fullText.slice(0, index + 1));
              index++;
            } else {
              clearInterval(timer);
              setTimeout(() => {
                setAnimationPhase(3);
              }, 500);
            }
          }, 200); // Slower typing for re-typing "Welcome To"
          break;

        case 3: // Backspace everything
          timer = setInterval(() => {
            if (index > 0) {
              setDisplayText(fullText.slice(0, index - 1));
              index--;
            } else {
              clearInterval(timer);
              setTimeout(() => {
                setAnimationPhase(4);
              }, 500);
            }
          }, 50);
          break;

        case 4: // Type final "Awoapa" and stay
          timer = setInterval(() => {
            if (index < 6) { // "Awoapa" is 6 characters
              setDisplayText('Awoapa'.slice(0, index + 1));
              index++;
            } else {
              clearInterval(timer);
              setIsTyping(false); // Stop cursor blinking
            }
          }, 200); // Slower typing for final "Awopa"
          break;

        default:
          break;
      }
    };

    runAnimation();

    return () => clearInterval(timer);
  }, [animationPhase]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3100/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseData = await response.json();

      if (response.status === 200 && responseData.success) {
        // Redirect to LoginWithPin page with user email and type
        navigate('/login-pin', {
          state: {
            userEmail: email,
            userType: userType.toLowerCase()
          }
        });
      } else {
        setErrorMessage(responseData.message || "Wrong credentials.");
      }
    } catch (error) {
      setErrorMessage("Failed to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    try {
      const response = await fetch(`http://localhost:3100/api/v1/users/forgot-password/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      if (response.status === 200 && responseData.success) {
        alert("Password reset email sent");
        setShowForgotPassword(false);
      } else {
        alert(responseData.message || "Failed to send password reset email");
      }
    } catch (error) {
      alert("Failed to connect to the server");
    }
  };

  if (showForgotPassword) {
    return <ForgotPassword 
             goBack={() => setShowForgotPassword(false)} 
             onSubmit={handleForgotPassword} 
           />;
  }

  if (showRegister) {
    return <Register goBack={() => setShowRegister(false)} />;
  }

  if (showFaceLogin) {
    return <FaceLogin />;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      {/* Left side image with typewriter effect */}
      <div className='hidden sm:block relative'>
        <img className='w-full h-full object-cover' src={loginImg} alt="Pregnancy" />
        {/* Typewriter overlay - positioned to align with login button */}
        <div className='absolute bottom-32 left-8 z-10'>
          <h1 className='text-2xl md:text-3xl font-bold text-white drop-shadow-2xl'>
            {displayText}
            {isTyping && (
              <span className='animate-pulse text-white'>|</span>
            )}
          </h1>
        </div>
        {/* Optional: Add a subtle dark overlay to make text more readable */}
        <div className='absolute inset-0 bg-black bg-opacity-20'></div>
      </div>

      {/* Right side */}
      <div className='bg-gradient-to-br from-blue-500 to-red-500 flex flex-col justify-center items-center'>
        <form onSubmit={handleLogin} className='max-w-[400px] w-full mx-auto rounded-lg bg-white bg-opacity-10 p-8 px-8 shadow-xl backdrop-blur-sm'>
          <div className='flex justify-center mb-8'>
            <div className='rounded-full border-2 border-white p-1'>
              <img 
                className='w-24 h-24 rounded-full object-cover' 
                src={loginImg} 
                alt="User" 
              />
            </div>
          </div>
          
          <h2 className="text-4xl text-white font-bold text-center mb-8">SIGN IN</h2>

          {errorMessage && (
            <div className='mb-4 p-2 bg-red-100 text-red-700 rounded text-center'>
              {errorMessage}
            </div>
          )}

          {/* Email */}
          <div className='flex flex-col py-2'>
            <label className='text-white'>Email</label>
            <input 
              className='rounded-lg bg-white bg-opacity-10 border border-white mt-2 p-2 focus:border-blue-500 focus:outline-none text-white' 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className='flex flex-col py-2'>
            <label className='text-white'>Password</label>
            <input 
              className='p-2 rounded-lg bg-white bg-opacity-10 border border-white mt-2 focus:border-blue-500 focus:outline-none text-white' 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* User Type */}
          <div className='flex flex-col py-2'>
            <label className='text-white'>User Type</label>
            <select 
              className='mt-2 p-2 rounded-lg bg-white bg-opacity-10 border border-white text-white focus:border-blue-500 focus:outline-none'
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option className='bg-blue-500'>Doctor</option>
              <option className='bg-blue-500'>Pregnant Woman</option>
              <option className='bg-blue-500'>Family Relative</option>
              <option className='bg-blue-500'>Admin</option>
              <option className='bg-blue-500'>Wellness User</option>
            </select>
          </div>

          {/* Remember Me + Forgot */}
          <div className='flex justify-between text-white py-2 text-sm'>
            <p className='flex items-center'>
              <input className='mr-2' type="checkbox" /> Remember Me
            </p>
            <p 
              className='hover:underline cursor-pointer'
              onClick={() => setShowForgotPassword(true)}
            >
              Forgot Password
            </p>
          </div>

          {/* Login Button */}
          <button 
            type='submit'
            className='w-full my-5 py-3 bg-white text-blue-500 shadow-lg hover:shadow-white/40 font-semibold rounded-lg flex justify-center items-center'
            disabled={isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Processing...' : 'LOGIN'}
          </button>

          {/* Extra Links */}
          <p 
            className='text-center text-white text-sm mt-4 hover:underline cursor-pointer'
            onClick={() => setShowRegister(true)}
          >
            Don't have an account? Register here
          </p>

          {/* Facial Recognition Redirect */}
          <p 
            className='text-center text-white text-sm italic mt-2 hover:underline cursor-pointer'
            onClick={() => setShowFaceLogin(true)}
          >
            Tap here to log in with facial recognition.
          </p>
        </form>
      </div>
    </div>
  );
}