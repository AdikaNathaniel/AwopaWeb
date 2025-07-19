import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const pollingInterval = 5000; // 5 seconds
const apiEndpoint = 'http://192.168.43.64:3100/api/v1/vitals'; // Using the endpoint from Dart code

export default function HardwareVitals() {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVitals = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(apiEndpoint);
      if (response.data.success) {
        setVitals(response.data.result);
      } else {
        throw new Error(response.data.message || 'Failed to load vitals');
      }
    } catch (error) {
      console.error('Error fetching vitals:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals(); // Initial fetch
    const timer = setInterval(fetchVitals, pollingInterval); // Auto-poll
    return () => clearInterval(timer); // Cleanup
  }, []);

  const formatDateTime = (isoDate) => {
    try {
      const date = new Date(isoDate);
      return date.toLocaleString();
    } catch (e) {
      return 'Date not available';
    }
  };

  const VitalTile = ({ icon, label, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-4 rounded-xl mb-4"
      style={{
        backgroundColor: `${color}10`,
        border: `1px solid ${color}30`,
        boxShadow: `0 2px 4px ${color}10`
      }}
    >
      <div className="flex flex-col items-center">
        <div className={`text-2xl mb-2`} style={{ color }}>
          {icon}
        </div>
        <span className="text-gray-700 font-medium text-sm">{label}</span>
        <span className="text-gray-900 font-bold text-lg mt-1" style={{ color }}>
          {value}
        </span>
      </div>
    </motion.div>
  );

  const VitalCard = ({ vital }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-lg mb-6"
    >
      <div className="text-center text-blueGray-600 font-bold mb-4">
        Patient ID: {vital.patientId || 'N/A'}
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        <VitalTile 
          icon="💓" 
          label="HR" 
          value={vital.heartRate ? `${vital.heartRate}` : 'N/A'} 
          color="#EF4444" 
        />
        <VitalTile 
          icon="🩸" 
          label="BP" 
          value={vital.systolic ? `${vital.systolic}/${vital.diastolic || 'N/A'}` : 'N/A'} 
          color="#3B82F6" 
        />
        <VitalTile 
          icon="🌡️" 
          label="Temp" 
          value={vital.temperature ? `${vital.temperature}°C` : 'N/A'} 
          color="#F97316" 
        />
        <VitalTile 
          icon="💨" 
          label="SpO₂" 
          value={vital.spo2 ? `${vital.spo2}%` : 'N/A'} 
          color="#10B981" 
        />
        <VitalTile 
          icon="🍬" 
          label="Glucose" 
          value={vital.glucose ? `${vital.glucose} mg/dL` : 'N/A'} 
          color="#8B5CF6" 
        />
        <VitalTile 
          icon="📊" 
          label="MAP" 
          value={vital.map ? `${vital.map.toFixed(2)}` : 'N/A'} 
          color="#0D9488" 
        />
      </div>
      
      <div className="text-center text-gray-500 text-xs">
        {formatDateTime(vital.createdAt)}
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

      {loading ? (
        <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center">
          <div className="animate-pulse flex justify-center">
            <div className="h-8 w-8 bg-cyan-600 rounded-full"></div>
          </div>
          <p className="text-gray-700 mt-4">Loading vitals data...</p>
        </div>
      ) : error ? (
        <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={fetchVitals}
            className="mt-2 bg-cyan-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-cyan-700 transition"
          >
            Retry
          </motion.button>
        </div>
      ) : vitals.length === 0 ? (
        <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-md rounded-2xl p-6 shadow-lg text-center">
          <p className="text-gray-700 mb-4">No vitals data available</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={fetchVitals}
            className="mt-2 bg-cyan-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-cyan-700 transition"
          >
            Refresh
          </motion.button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {vitals.map((vital, index) => (
            <VitalCard key={index} vital={vital} />
          ))}
        </div>
      )}

      {!loading && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={fetchVitals}
          className="mt-6 bg-cyan-600 text-white py-2 px-4 rounded-xl shadow-md hover:bg-cyan-700 transition"
        >
          🔄 Refresh Vitals
        </motion.button>
      )}
    </div>
  );
}