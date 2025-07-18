import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const pollingInterval = 5000; // 5 seconds
const xiaoIp = 'http://192.168.43.218'; // Replace with actual IP

export default function HardwareVitals() {
  const [vitals, setVitals] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVitals = async () => {
    try {
      const response = await axios.get(`${xiaoIp}/vitals`);
      setVitals(response.data);
    } catch (error) {
      console.error('Error fetching vitals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals(); // Initial fetch
    const timer = setInterval(fetchVitals, pollingInterval); // Auto-poll
    return () => clearInterval(timer); // Cleanup
  }, []);

  const VitalTile = ({ label, value }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-4 rounded-2xl shadow-md mb-4"
    >
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-gray-900 font-bold">{value}</span>
      </div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center px-6 py-8"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.h1
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-white text-3xl font-bold mb-6 bg-cyan-600 px-4 py-2 rounded-xl shadow-lg"
      >
        🩺 Live Vitals Monitor
      </motion.h1>

      <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
        {loading ? (
          <div className="text-center text-gray-700">Loading vitals...</div>
        ) : vitals ? (
          <>
            <VitalTile label="💓 Heart Rate" value={`${vitals.heartRate} bpm`} />
            <VitalTile label="🩸 Blood Pressure" value={`${vitals.systolicBP}/${vitals.diastolicBP} mmHg`} />
            <VitalTile label="🌡️ Temperature" value={`${vitals.temperature} °C`} />
            <VitalTile label="🍬 Blood Glucose" value={`${vitals.bloodGlucose} mg/dL`} />
            <VitalTile label="💨 O₂ Saturation" value={`${vitals.oxygenSaturation} %`} />
          </>
        ) : (
          <div className="text-center text-red-500">No data available</div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={fetchVitals}
          className="mt-6 w-full bg-cyan-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-cyan-700 transition"
        >
          🔄 Refresh Vitals
        </motion.button>
      </div>
    </div>
  );
}
