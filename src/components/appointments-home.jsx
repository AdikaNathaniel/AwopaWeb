import React from 'react';
import { useNavigate } from 'react-router-dom';
import pregnancyImg from '../assets/pregnancy.png';
import { motion } from 'framer-motion';

export default function AppointmentHomePage() {
  const navigate = useNavigate();

  const options = [
    {
      icon: '📅',
      title: 'Schedule Appointment',
      subtitle: 'Schedule a new appointment for a pregnant woman',
      onClick: () => navigate('/medic-appointment'),
    },
    {
      icon: '📊',
      title: 'Doctor Appointment Stats',
      subtitle: 'Track doctor appointments and performance insights',
      onClick: () => navigate('/doctor-stats'),
    },
    {
      icon: '🗒️',
      title: 'Appointment Details',
      subtitle: 'Review and update patient appointment records',
      onClick: () => navigate('/appointment-details'),
    },
    {
      icon: '🔄',
      title: 'Update Appointment Status',
      subtitle: 'Modify and track the status of appointments',
      onClick: () => navigate('/appointment-status-update'),
    },
  ];

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10" />
      <div className="relative z-20 p-6 max-w-3xl mx-auto">
        <motion.h1
          className="text-3xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Appointments Manager
        </motion.h1>

        <div className="space-y-6">
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={option.onClick}
              className="cursor-pointer bg-white bg-opacity-90 rounded-xl shadow-md p-6 flex items-center gap-4 hover:bg-cyan-50"
            >
              <div className="text-4xl">{option.icon}</div>
              <div>
                <div className="text-lg font-semibold text-gray-800">{option.title}</div>
                <div className="text-sm text-gray-600">{option.subtitle}</div>
              </div>
              <div className="ml-auto text-gray-400">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
