import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';
import dayjs from 'dayjs';

export default function GlucoseMonitoringPage() {
  const [vitals, setVitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchVitals = async () => {
    try {
      const res = await axios.get('http://localhost:3100/api/v1/vitals');
      if (res.status === 200 && res.data.success) {
        setVitals(res.data.result);
        setErrorMessage('');
      } else {
        setErrorMessage(`Error: ${res.status}`);
      }
    } catch (err) {
      setErrorMessage(`Network error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
    const interval = setInterval(fetchVitals, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        className="bg-white/90 max-w-5xl mx-auto rounded-xl shadow-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-teal-700 text-center mb-6">
          Glucose Monitoring Dashboard
        </h1>

        <div className="mb-4 flex justify-between items-center">
          <span className="font-semibold text-gray-700">Recent Glucose Readings</span>
          <button
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
            onClick={fetchVitals}
          >
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <motion.div
              className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            />
          </div>
        ) : errorMessage ? (
          <div className="text-center text-red-600 font-semibold">
            {errorMessage}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vitals.filter(v => v.glucose).map((vital, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white shadow-lg rounded-lg border border-gray-200"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-sm text-gray-500 mb-1">
                  {dayjs(vital.createdAt).format('MMM D, YYYY h:mm A')}
                </div>
                <div className="text-lg font-bold text-teal-700">
                  {vital.glucose.toFixed(1)} mg/dL
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  Patient ID: <span className="font-medium">{vital.patientId}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Risk: <span className={
                    vital.glucose >= 140 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'
                  }>
                    {vital.glucose >= 140 ? 'High' : 'Low'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
