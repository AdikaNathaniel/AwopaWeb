import React, { useState } from 'react';

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
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)`,
      }}
    >
      <div className="bg-pink-600 py-4 shadow-lg transform transition-all duration-500 hover:shadow-xl">
        <h1 className="text-white text-center text-xl md:text-2xl font-bold animate-pulse">
          Choose the Color from Your Urine Strip
        </h1>
      </div>

      <div className="p-6 max-w-4xl mx-auto transform transition-all duration-500 hover:scale-[1.02]">
        <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <p className="text-center text-lg mb-8 text-gray-700 font-medium">
            Tap on the color that matches your urine strip to see your protein level.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`p-1 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  selectedIndex === index ? 'ring-4 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}
              >
                <div 
                  className="w-16 h-16 rounded-full transition-all duration-300 hover:brightness-110" 
                  style={{ backgroundColor: color }}
                />
              </div>
            ))}
          </div>

          {selectedIndex !== null && (
            <div className="text-center mb-8 transform transition-all duration-500 animate-fade-in">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Selected Color:</h2>
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 shadow-md transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: colors[selectedIndex] }}
              />
              <p className="text-2xl font-bold text-red-500 animate-bounce">
                Protein Level: {proteinLevels[selectedIndex]}
              </p>
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => setShowVideoModal(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 active:scale-95 hover:shadow-lg"
            >
              Click Me to Learn How to Use A Protein Strip
            </button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-black rounded-lg overflow-hidden w-full max-w-4xl transform transition-all duration-300 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center bg-gray-900 p-4">
              <h3 className="text-white text-lg font-bold">
                How to Use A Protein Strip
              </h3>
              <button 
                onClick={() => setShowVideoModal(false)}
                className="text-white hover:text-gray-300 transition-colors duration-200 transform hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src="https://www.youtube.com/embed/jfrqdZKpZEE?autoplay=1&modestbranding=1&rel=0&showinfo=0"
                title="How to Use A Protein Strip"
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default UrineStripColorSelector;