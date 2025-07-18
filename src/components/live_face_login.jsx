// LiveFaceLoginPage.jsx
import React, { useState } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import { motion } from 'framer-motion';
import axios from 'axios';

// Imported pages as JSX
// import LoginPage from './login_page.jsx';
// import PregnancyCalculator from './pregnancy-calculator.jsx';
// import PredictionsPage from './predictions.jsx';
// import FaceRegisterPage from './face_register.jsx';

export default function LiveFaceLoginPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const loginWithFace = async () => {
    if (!selectedImage) {
      alert('Please select or capture an image.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const res = await axios.post('http://localhost:3100/api/v1/face/detect', formData);
      const data = res.data;

      if (data.success && data.result.match) {
        const match = data.result.match;
        const confidence = parseFloat(match.confidence);
        const userId = match.userId;

        if (confidence > 0.4) {
          alert('Low confidence. Please login with email and password.');
        } else if (userId === 'Einsteina Owoh') {
          alert('Logging In As Pregnant Woman');
          window.location.href = '/pregnancy-calculator';
        } else if (userId === 'Dr.George Anane') {
          alert('Logging In As Medic');
          window.location.href = '/predictions';
        } else {
          alert('Invalid user');
          window.location.href = '/login';
        }
      } else {
        alert('Face not recognized.');
        window.location.href = '/login';
      }
    } catch (err) {
      alert('Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center px-4 py-8 flex flex-col items-center"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.h1
        className="text-white text-2xl font-bold mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Live Face Login
      </motion.h1>

      <motion.div
        className="bg-white bg-opacity-20 rounded-xl border border-white/30 p-4 shadow-md w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="rounded-xl w-full h-64 object-cover" />
        ) : (
          <div className="w-full h-64 bg-white bg-opacity-10 flex flex-col justify-center items-center rounded-xl">
            <motion.div
              className="text-white text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p>No image selected</p>
              <p className="text-sm">Take a live photo for authentication</p>
            </motion.div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <label className="text-white text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <motion.div
              className="bg-cyan-600 text-white py-3 px-6 rounded-lg cursor-pointer text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Capture Live Photo
            </motion.div>
          </label>

          {isLoading ? (
            <div className="text-white text-center">Loading...</div>
          ) : (
            <motion.button
              className="bg-cyan-600 text-white py-3 px-6 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loginWithFace}
            >
              Login with Face
            </motion.button>
          )}

          <a href="/login" className="text-cyan-600 text-center underline">
            Login with Email/Password instead
          </a>
          <a href="/face_register" className="text-cyan-600 text-center italic underline">
            Click Me To Register Your Face On Awo)Pa
          </a>
        </div>
      </motion.div>
    </div>
  );
}
