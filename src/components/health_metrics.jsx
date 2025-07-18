// import React, { useState } from 'react';
// import pregnancyImg from '../assets/pregnancy.png';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Dialog } from '@headlessui/react';

// // Component Imports
// // import CreateCancelAppointment from './components/create_cancel-appointment.jsx';
// // import LoginPage from './components/login_page.jsx';
// // import WellnessPage from './components/wellness-page.jsx';
// // import ProteinStrip from './components/protein-strip.jsx';
// // import PregnancyHealth from './components/pregnancy-health.jsx';
// // import PregChatBotPage from './components/pregnancy-chatbot.jsx';
// // import PregnantWomanChat from './components/pregnant-woman-chat.jsx';
// // import CreateEmergency from './components/create-emergency.jsx';
// // import EmergencyContactsPage from './components/emergency-contact.jsx';
// // import NotificationListPage from './components/notification-list.jsx';
// // import SupportFormPage from './components/support-create.jsx';
// // import MedicsListPage from './components/medic-list.jsx';
// // import FindDoctorByNamePage from './components/doctor-by-name.jsx';
// // import SymptomForm from './components/symptom-checker.jsx';
// // import SetProfilePage from './components/set_profile.jsx';
// // import MapPage from './components/map.jsx';
// // import HardwareVitals from './components/hardware_vitals.jsx';
// // import PaystackInitiatePage from './components/paystack-home.jsx';

// // Lucide Icons
// import {
//   Thermometer,
//   HeartPulse,
//   Droplets,
//   Activity,
//   Heart,
//   Weight,
//   Bell,
//   Settings,
//   HelpCircle,
//   AlertTriangle,
//   MapPin,
//   LogOut,
//   X,
// } from 'lucide-react';

// const metricData = [
//   {
//     title: 'Body Temperature',
//     value: '37.2°C',
//     icon: <Thermometer size={32} className="text-red-500" />,
//     lastUpdated: '2 hours ago',
//   },
//   {
//     title: 'Blood Pressure',
//     value: '120/80 mmHg',
//     icon: <Heart size={32} className="text-pink-500" />,
//     lastUpdated: '3 hours ago',
//   },
//   {
//     title: 'Blood Glucose',
//     value: '5.4 mmol/L',
//     icon: <Droplets size={32} className="text-purple-500" />,
//     lastUpdated: '1 hour ago',
//   },
//   {
//     title: 'Oxygen Saturation',
//     value: '98%',
//     icon: <Activity size={32} className="text-blue-500" />,
//     lastUpdated: '30 minutes ago',
//   },
//   {
//     title: 'Heart Rate',
//     value: '72 BPM',
//     icon: <HeartPulse size={32} className="text-red-600" />,
//     lastUpdated: '15 minutes ago',
//   },
//   {
//     title: 'Weight',
//     value: '68.5 kg',
//     icon: <Weight size={32} className="text-green-600" />,
//     lastUpdated: '1 day ago',
//   },
// ];

// export default function HealthDashboard() {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleNavigation = (page) => {
//     switch (page) {
//       case 'notifications':
//         navigate('/notifications');
//         break;
//       case 'settings':
//         navigate('/set-profile');
//         break;
//       case 'support':
//         navigate('/support-create');
//         break;
//       case 'map':
//         navigate('/map');
//         break;
//       default:
//         break;
//     }
//   };

//   const handleLogout = async () => {
//     await axios.put('http://localhost:3100/api/v1/users/logout');
//     navigate('/login');
//   };

//   const handleEmergency = () => {
//     alert("Emergency alert triggered!");
//   };

//   const userEmail = 'user@example.com';

//   const options = [
//     { title: 'Notifications', icon: <Bell className="text-blue-500" size={24} />, onClick: () => handleNavigation('notifications') },
//     { title: 'Settings', icon: <Settings className="text-indigo-500" size={24} />, onClick: () => handleNavigation('settings') },
//     { title: 'Support', icon: <HelpCircle className="text-green-600" size={24} />, onClick: () => handleNavigation('support') },
//     { title: 'Emergency Alert', icon: <AlertTriangle className="text-red-500" size={24} />, onClick: handleEmergency },
//     { title: 'View Location', icon: <MapPin className="text-emerald-500" size={24} />, onClick: () => handleNavigation('map') },
//     { title: 'Logout', icon: <LogOut className="text-rose-600" size={24} />, onClick: handleLogout },
//   ];

//   return (
//     <div className="min-h-screen bg-cover bg-center p-8 relative" style={{ backgroundImage: `url(${pregnancyImg})` }}>
//       <motion.h1
//         className="text-white text-3xl font-bold text-center mb-8"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         Health Metrics Dashboard
//       </motion.h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {metricData.map((metric, index) => (
//           <motion.div
//             key={index}
//             className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//           >
//             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//               {metric.icon}
//             </div>
//             <h2 className="text-lg font-semibold text-gray-800">{metric.title}</h2>
//             <p className="text-xl font-bold text-gray-900">{metric.value}</p>
//             <p className="text-sm text-gray-500">Last updated: {metric.lastUpdated}</p>
//           </motion.div>
//         ))}
//       </div>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="mt-10 mx-auto block px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:bg-cyan-700"
//       >
//         Update Weight
//       </motion.button>

//       <button
//         onClick={() => setDialogOpen(true)}
//         className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-md"
//       >
//         <img
//           src="https://ui-avatars.com/api/?name=User"
//           alt="avatar"
//           className="w-8 h-8 rounded-full"
//         />
//       </button>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold text-gray-700">Hi, {userEmail}</h2>
//               <button onClick={() => setDialogOpen(false)}>
//                 <X size={20} className="text-gray-400 hover:text-gray-600" />
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {options.map((opt, idx) => (
//                 <div
//                   key={idx}
//                   onClick={() => {
//                     opt.onClick();
//                     setDialogOpen(false);
//                   }}
//                   className="cursor-pointer border border-gray-200 rounded-xl p-4 flex flex-col items-center hover:bg-gray-50 transition"
//                 >
//                   {opt.icon}
//                   <span className="mt-2 text-sm font-medium text-gray-700 text-center">
//                     {opt.title}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// }



import React, { useState } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import {
  Thermometer,
  HeartPulse,
  Droplets,
  Activity,
  Heart,
  Weight,
  Bell,
  Settings,
  HelpCircle,
  AlertTriangle,
  MapPin,
  LogOut,
  X,
} from 'lucide-react';

const metricData = [
  {
    title: 'Body Temperature',
    value: '37.2°C',
    icon: <Thermometer size={32} className="text-red-500" />,
    lastUpdated: '2 hours ago',
  },
  {
    title: 'Blood Pressure',
    value: '120/80 mmHg',
    icon: <Heart size={32} className="text-pink-500" />,
    lastUpdated: '3 hours ago',
  },
  {
    title: 'Blood Glucose',
    value: '5.4 mmol/L',
    icon: <Droplets size={32} className="text-purple-500" />,
    lastUpdated: '1 hour ago',
  },
  {
    title: 'Oxygen Saturation',
    value: '98%',
    icon: <Activity size={32} className="text-blue-500" />,
    lastUpdated: '30 minutes ago',
  },
  {
    title: 'Heart Rate',
    value: '72 BPM',
    icon: <HeartPulse size={32} className="text-red-600" />,
    lastUpdated: '15 minutes ago',
  },
  {
    title: 'Weight',
    value: '68.5 kg',
    icon: <Weight size={32} className="text-green-600" />,
    lastUpdated: '1 day ago',
  },
];

export default function HealthDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Get userEmail from location state
  const userEmail = location.state?.userEmail || 'User';

  const handleNavigation = (page) => {
    switch (page) {
      case 'notifications':
        navigate('/notifications');
        break;
      case 'settings':
        navigate('/set-profile');
        break;
      case 'support':
        navigate('/support-create');
        break;
      case 'map':
        navigate('/map');
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    await axios.put('http://localhost:3100/api/v1/users/logout');
    navigate('/login');
  };

  const handleEmergency = () => {
    alert("Emergency alert triggered!");
  };

  const options = [
    { title: 'Notifications', icon: <Bell className="text-blue-500" size={24} />, onClick: () => handleNavigation('notifications') },
    { title: 'Settings', icon: <Settings className="text-indigo-500" size={24} />, onClick: () => handleNavigation('settings') },
    { title: 'Support', icon: <HelpCircle className="text-green-600" size={24} />, onClick: () => handleNavigation('support') },
    { title: 'Emergency Alert', icon: <AlertTriangle className="text-red-500" size={24} />, onClick: handleEmergency },
    { title: 'View Location', icon: <MapPin className="text-emerald-500" size={24} />, onClick: () => handleNavigation('map') },
    { title: 'Logout', icon: <LogOut className="text-rose-600" size={24} />, onClick: handleLogout },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center p-8 relative" style={{ backgroundImage: `url(${pregnancyImg})` }}>
      <motion.h1
        className="text-white text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Health Metrics Dashboard
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricData.map((metric, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {metric.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-800">{metric.title}</h2>
            <p className="text-xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm text-gray-500">Last updated: {metric.lastUpdated}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 mx-auto block px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:bg-cyan-700"
      >
        Update Weight
      </motion.button>

      <button
        onClick={() => setDialogOpen(true)}
        className="fixed top-4 right-4 bg-white p-2 rounded-full shadow-md"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${userEmail.split('@')[0]}`}
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
      </button>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Hi, {userEmail}</h2>
              <button onClick={() => setDialogOpen(false)}>
                <X size={20} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    opt.onClick();
                    setDialogOpen(false);
                  }}
                  className="cursor-pointer border border-gray-200 rounded-xl p-4 flex flex-col items-center hover:bg-gray-50 transition"
                >
                  {opt.icon}
                  <span className="mt-2 text-sm font-medium text-gray-700 text-center">
                    {opt.title}
                  </span>
                </div>
              ))}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}