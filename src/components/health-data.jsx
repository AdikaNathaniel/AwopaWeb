import React, { useEffect, useState } from 'react';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import { motion } from 'framer-motion';
import {
  Baby,
  Calendar,
  ThermometerSun,
  Droplet,
  AlertTriangle,
  Syringe,
  Clock,
  User
} from 'lucide-react';

export default function PregnancyHistoryPage() {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await axios.get('http://localhost:3100/api/v1/health');
        setHealthData(response.data.result);
      } catch (error) {
        console.error('Failed to load health data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  const renderInfoRow = (Icon, label, value, color = 'text-green-600') => (
    <div className="flex items-center gap-3 mb-2">
      <Icon className={color} size={20} />
      <span className="text-gray-800 font-medium">{label}: {value}</span>
    </div>
  );

  const renderBooleanRow = (Icon, label, value) => {
    const isTrue = value?.toString().toLowerCase() === 'true';
    return renderInfoRow(Icon, label, isTrue ? 'Yes' : 'No', isTrue ? 'text-red-600' : 'text-green-600');
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.h1
        className="text-white text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Pregnancy History
      </motion.h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <motion.div
            className="w-12 h-12 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      ) : (
        <div className="grid gap-6">
          {healthData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-opacity-80"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="text-blue-600" size={22} />
                <h2 className="text-lg font-semibold text-gray-900">Age: {item.age}</h2>
              </div>
              <hr className="mb-3" />
              {renderInfoRow(Baby, 'Parity', item.parity)}
              {renderInfoRow(ThermometerSun, 'Gravida', item.gravida)}
              {renderInfoRow(Calendar, 'Gestational Age', `${item.gestationalAge} weeks`)}
              {renderBooleanRow(Droplet, 'Diabetes', item.hasDiabetes)}
              {renderBooleanRow(Syringe, 'Anemia', item.hasAnemia)}
              {renderBooleanRow(AlertTriangle, 'Preeclampsia', item.hasPreeclampsia)}
              {renderBooleanRow(ThermometerSun, 'Gestational Diabetes', item.hasGestationalDiabetes)}
              <hr className="my-3" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock size={18} />
                <span>Created At: {item.createdAt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
