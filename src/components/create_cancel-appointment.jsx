import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

export default function AppointmentManagerPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [notes, setNotes] = useState('');
  const [currentDay, setCurrentDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDay(
      `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    );
    setCurrentTime(
      `${now.getHours() % 12 === 0 ? 12 : now.getHours() % 12}:${String(now.getMinutes()).padStart(2, '0')} ${
        now.getHours() >= 12 ? 'PM' : 'AM'
      }`
    );
  }, []);

  const createAppointment = async () => {
    if (!name) return alert('Patient name is required');

    const appointment = {
      email: 'patient@example.com',
      day: currentDay,
      time: currentTime,
      patient_name: name,
      condition: condition || 'Routine check-up',
      notes: notes || 'No specific notes',
    };

    try {
      const res = await axios.post('http://localhost:3100/api/v1/appointments', appointment);
      if (res.status === 201) {
        alert('Appointment created successfully!');
        setName('');
        setCondition('');
        setNotes('');
      }
    } catch (err) {
      alert('Error creating appointment: ' + err.message);
    }
  };

  const deleteAppointment = async () => {
    try {
      const res = await axios.delete('http://localhost:3100/api/v1/appointments/last');
      if (res.status === 200) {
        alert('Last appointment cancelled successfully!');
      }
    } catch (err) {
      alert('Error cancelling appointment: ' + err.message);
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10" />
      <div className="relative z-20 max-w-xl mx-auto py-10 px-6">
        <motion.h1
          className="text-4xl font-bold text-center text-white mb-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Manage Appointment
        </motion.h1>

        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {[
            {
              label: 'Patient Name',
              value: name,
              setValue: setName,
              placeholder: 'Enter patient name...',
            },
            {
              label: 'Condition',
              value: condition,
              setValue: setCondition,
              placeholder: 'Enter condition or reason...',
            },
            {
              label: 'Notes',
              value: notes,
              setValue: setNotes,
              placeholder: 'Additional notes (optional)',
            },
          ].map((field, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
              className="w-full"
            >
              <label className="block text-white mb-1">{field.label}</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none text-gray-800"
                value={field.value}
                placeholder={field.placeholder}
                onChange={(e) => field.setValue(e.target.value)}
              />
            </motion.div>
          ))}

          <motion.div
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
            className="grid grid-cols-2 gap-4 text-center"
          >
            <div className="bg-white/80 rounded-xl p-3">
              <div className="text-xs text-gray-600">Date</div>
              <div className="text-lg font-semibold">{currentDay}</div>
            </div>
            <div className="bg-white/80 rounded-xl p-3">
              <div className="text-xs text-gray-600">Time</div>
              <div className="text-lg font-semibold">{currentTime}</div>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-4"
            variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
          >
            <button
              onClick={createAppointment}
              className="w-full bg-cyan-600 text-white py-3 rounded-xl hover:bg-cyan-700 transition"
            >
              Create Appointment
            </button>
            <button
              onClick={deleteAppointment}
              className="w-full bg-cyan-600 text-white py-3 rounded-xl hover:bg-red-600 transition"
            >
              Cancel Last Appointment
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
