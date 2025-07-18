import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';
import pregnancyImg from '../assets/pregnancy.png';

const UrineStripColorSelector = () => {
  const colors = [
    '#00C2C7', // Cyan Blue
    '#E5B7A5', // Light Pink
    '#B794C0', // Light Purple
    '#D8D8D8', // Light Gray
    '#F0D56D', // Light Yellow
    '#F5C243', // Yellow
    '#FFA500', // Orange
    '#FFD700', // Gold Yellow
    '#D2B48C', // Tan
    '#8B5A2B', // Dark Brown
  ];

  const proteinLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-pink-600 py-4 shadow-lg"
      >
        <h1 className="text-white text-center text-xl md:text-2xl font-bold">
          Choose the Color from Your Urine Strip
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 max-w-4xl mx-auto"
      >
        <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
          <motion.p 
            className="text-center text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Tap on the color that matches your urine strip to see your protein level.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {colors.map((color, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedIndex(index)}
                className={`p-1 rounded-full ${selectedIndex === index ? 'ring-4 ring-blue-500' : ''}`}
              >
                <div 
                  className="w-16 h-16 rounded-full" 
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center mb-8"
              >
                <h2 className="text-xl font-bold mb-4">Selected Color:</h2>
                <div 
                  className="w-20 h-20 rounded-full mx-auto mb-4 shadow-md"
                  style={{ backgroundColor: colors[selectedIndex] }}
                />
                <p className="text-2xl font-bold text-red-500">
                  Protein Level: {proteinLevels[selectedIndex]}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => setShowVideoModal(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
            >
              Click Me to Learn How to Use A Protein Strip
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-lg overflow-hidden w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center bg-black p-4">
                <h3 className="text-white text-lg font-bold">
                  How to Use A Protein Strip
                </h3>
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="text-white hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=jfrqdZKpZEE"
                  width="100%"
                  height="100%"
                  controls={true}
                  config={{
                    youtube: {
                      playerVars: { 
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0
                      }
                    }
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UrineStripColorSelector;