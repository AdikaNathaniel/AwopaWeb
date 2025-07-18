import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/pregnancy.png';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [card, setCard] = useState('');
  const [allowRelative, setAllowRelative] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) =>
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  const isValidCard = (c) => /^\d{6,15}$/.test(c);

  // Map of display values to backend values
  const userTypeMap = {
    'Doctor': 'doctor',
    'Pregnant Woman': 'pregnant-woman',
    'Family Relative': 'relative',
    'Admin': 'admin',
    'Wellness User': 'wellness-user'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!name || !email || !password || !type || !card) {
      setMessage('All fields are required.');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
    if (!isValidCard(card)) {
      setMessage('Ghana Card Number must be 6–15 digits.');
      return;
    }
    if (password.length < 6) {
      setMessage('Password must be at least 6 characters.');
      return;
    }
    if (!userTypeMap[type]) {
      setMessage('Invalid user type.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:3100/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email: email.toLowerCase(), 
          password, 
          type: userTypeMap[type], // Use mapped value
          card: card.toString() // Ensure card is sent as string
        }),
      });
      const data = await res.json();
      if (res.status === 201 && data.success) {
        setMessage('Registration successful! Please check your email for OTP.');
      } else {
        setMessage(data.message || `Registration failed (${res.status}).`);
      }
    } catch (err) {
      setMessage('Server error during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      {/* Left side image */}
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt="Pregnancy" />
      </div>

      {/* Right side */}
      <div className='bg-gradient-to-br from-blue-500 to-red-500 flex flex-col justify-center items-center'>
        <form 
          onSubmit={handleSubmit}
          className='max-w-[500px] w-full mx-auto rounded-lg bg-white bg-opacity-10 p-8 shadow-xl backdrop-blur-sm'
        >
          <div className='flex justify-center mb-6'>
            <div className='rounded-full border-2 border-white p-1'>
              <img 
                className='w-24 h-24 rounded-full object-cover' 
                src={loginImg} 
                alt="User" 
              />
            </div>
          </div>

          <h2 className="text-4xl text-white font-bold text-center mb-8">Register On Awopa</h2>

          {message && (
            <div className='mb-4 p-2 bg-red-100 text-red-700 rounded text-center'>
              {message}
            </div>
          )}

          <div className='flex flex-col py-2'>
            <label className='text-white'>Full Name</label>
            <input 
              className='rounded-lg bg-white bg-opacity-10 border border-white mt-2 p-2 focus:border-blue-500 focus:outline-none text-white' 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col py-2'>
            <label className='text-white'>Email</label>
            <input 
              type="email"
              className='rounded-lg bg-white bg-opacity-10 border border-white mt-2 p-2 focus:border-blue-500 focus:outline-none text-white' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col py-2'>
            <label className='text-white'>Password</label>
            <input 
              type="password"
              className='rounded-lg bg-white bg-opacity-10 border border-white mt-2 p-2 focus:border-blue-500 focus:outline-none text-white' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col py-2'>
            <label className='text-white'>User Type</label>
            <select 
              className='mt-2 p-2 rounded-lg bg-white bg-opacity-10 border border-white text-white focus:border-blue-500 focus:outline-none'
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" className='bg-blue-500'>Select type...</option>
              <option className='bg-blue-500'>Doctor</option>
              <option className='bg-blue-500'>Pregnant Woman</option>
              <option className='bg-blue-500'>Family Relative</option>
              <option className='bg-blue-500'>Admin</option>
              <option className='bg-blue-500'>Wellness User</option>
            </select>
          </div>

          <div className='flex flex-col py-2'>
            <label className='text-white'>Ghana Card Number</label>
            <input 
              type="number"
              className='rounded-lg bg-white bg-opacity-10 border border-white mt-2 p-2 focus:border-blue-500 focus:outline-none text-white' 
              value={card}
              onChange={(e) => setCard(e.target.value)}
              required
            />
          </div>

          <div className='flex items-center py-2 text-white'>
            <input 
              type="checkbox"
              checked={allowRelative}
              onChange={() => setAllowRelative(!allowRelative)}
              className='mr-2'
            />
            <label>Allow relative to view vitals</label>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full my-5 py-3 bg-white text-blue-500 shadow-lg hover:shadow-white/40 font-semibold rounded-lg flex justify-center items-center'
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p 
            className='text-center text-white text-sm mt-4 hover:underline cursor-pointer'
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </p>
        </form>
      </div>
    </div>
  );
}



// .Give the corresponding .jsx code for this pag with the  import pregnancyImg from '../assets/pregnancy.png'; as the background image and the endpoints should also be added in the .jsx code..Give the full code  for this.Give the full code  for this and make any button be in cyan -600.Use
// framer motion for alot of animation effects on this page.Make sure all the imports are well imported but make it a .jsx file instead of .dart
// Make sure that whatecver is pon the .dart file including hinttext should alos be on the .jsx file 

