import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAppleAlt, faTint, faWalking, faBed, 
  faSeedling, faLungs, faBaby, faClipboardList,
  faSun, faSpa, faBookMedical, faSoap,
  faCarrot, faBrain, faNotesMedical, faPills,
  faShoePrints, faMugHot, faBell, faUserMd,
  faSmile, faDumbbell, faUtensils, faPeace,
  faWater, faHeart, faClock, faHeadphones,
  faPeopleCarry, faStethoscope, faGlassCheers, faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';
import pregnancyImg from '../assets/pregnancy.png';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';


const WellnessTipsScreen = ({ userEmail = "admin@example.com" }) => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  const tips = [
    { icon: faAppleAlt, title: "Eat Nutritious Meals", description: "Ensure a balanced diet with fruits, vegetables, and proteins." },
    { icon: faTint, title: "Stay Hydrated", description: "Drink at least 8 glasses of water daily to stay healthy." },
    { icon: faWalking, title: "Gentle Exercises", description: "Light exercises like walking help improve circulation." },
    { icon: faBed, title: "Get Enough Rest", description: "Aim for 7-9 hours of sleep to keep your energy up." },
    { icon: faSeedling, title: "Take Prenatal Vitamins", description: "Folic acid and iron are crucial for baby's growth." },
    { icon: faLungs, title: "Practice Deep Breathing", description: "Helps reduce stress and improve oxygen flow." },
    { icon: faBaby, title: "Talk to Your Baby", description: "Bonding starts early; talk and sing to your baby." },
    { icon: faClipboardList, title: "Attend Prenatal Checkups", description: "Regular checkups ensure a healthy pregnancy." },
    { icon: faSun, title: "Get Enough Sunlight", description: "Vitamin D is essential for bone health." },
    { icon: faSpa, title: "Manage Stress", description: "Meditation and yoga can help maintain a calm mind." },
    { icon: faBookMedical, title: "Educate Yourself", description: "Read books and take pregnancy classes for knowledge." },
    { icon: faSoap, title: "Maintain Hygiene", description: "Keep clean to prevent infections and stay healthy." },
    { icon: faCarrot, title: "Eat Fiber-Rich Foods", description: "Prevents constipation and aids digestion." },
    { icon: faBrain, title: "Stay Positive", description: "A happy mind leads to a healthy pregnancy." },
    { icon: faNotesMedical, title: "Monitor Baby's Movements", description: "Keep track of fetal kicks and movement patterns." },
    { icon: faPills, title: "Avoid Harmful Substances", description: "Avoid alcohol, smoking, and too much caffeine." },
    { icon: faShoePrints, title: "Wear Comfortable Shoes", description: "Prevents swelling and keeps you comfortable." },
    { icon: faMugHot, title: "Drink Herbal Teas", description: "Some teas can help reduce nausea and aid digestion." },
    { icon: faBell, title: "Listen to Soothing Music", description: "Helps relaxation and bonding with baby." },
    { icon: faUserMd, title: "Consult a Doctor", description: "Seek medical advice for any discomforts." },
    { icon: faSmile, title: "Stay Happy", description: "Your emotions affect your baby's development." },
    { icon: faDumbbell, title: "Avoid Heavy Lifting", description: "Strain can harm both you and your baby." },
    { icon: faUtensils, title: "Eat Small Meals", description: "Prevents nausea and maintains energy levels." },
    { icon: faPeace, title: "Practice Mindfulness", description: "Stay in the moment to reduce anxiety." },
    { icon: faWater, title: "Avoid Sugary Drinks", description: "Can lead to excessive weight gain and diabetes." },
    { icon: faHeart, title: "Take Care of Your Heart", description: "Keep cholesterol and blood pressure in check." },
    { icon: faClock, title: "Stick to a Routine", description: "Keeps your body and baby in sync." },
    { icon: faHeadphones, title: "Enjoy Your Pregnancy", description: "Celebrate the journey and make memories." },
    { icon: faPeopleCarry, title: "Seek Emotional Support", description: "Surround yourself with loved ones for support." },
    { icon: faStethoscope, title: "Be Aware of Warning Signs", description: "Know the signs of complications and seek help." },
    { icon: faGlassCheers, title: "Celebrate Milestones", description: "Enjoy each stage of pregnancy with joy." },
    { icon: faClipboardCheck, title: "Prepare for Labor", description: "Learn about labor and delivery beforehand." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStartIndex(prev => (prev + 4) % tips.length);
    }, 30000);
    return () => clearInterval(timer);
  }, [tips.length]);

  const handleLogout = async () => {
    try {
      const response = await axios.put('http://localhost:3100/api/v1/users/logout');
      if (response.data.success) {
        navigate('/login');
      } else {
        alert(`Logout failed: ${response.data.message}`);
      }
    } catch (error) {
      alert("Logout failed: Server error");
    }
  };

  const displayedTips = tips.slice(startIndex, startIndex + 4);

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
        className="bg-pink-500 py-4 shadow-md"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold text-center flex-1">
            Pregnancy Wellness Tips
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowProfileDialog(true)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md"
          >
            <span className="text-blue-500 font-medium">
              {userEmail ? userEmail[0].toUpperCase() : 'U'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence mode="wait">
            {displayedTips.map((tip, index) => (
              <motion.div
                key={`${tip.title}-${startIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-pink-50 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6 flex flex-col items-center text-center h-full">
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="mb-4"
                  >
                    <FontAwesomeIcon 
                      icon={tip.icon} 
                      size="3x" 
                      className="text-pink-500" 
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 flex-1">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Profile Dialog */}
      <AnimatePresence>
        {showProfileDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowProfileDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Profile</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faUserMd} className="text-blue-500 mr-3" />
                  <span className="text-gray-700">{userEmail}</span>
                </div>
                
                <div className="flex items-center justify-center">
                  <FontAwesomeIcon icon={faCog} className="text-blue-500 mr-3" />
                  <span className="text-gray-700">Settings</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
                  >
                    Logout
                  </motion.button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowProfileDialog(false)}
                  className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-medium"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WellnessTipsScreen;