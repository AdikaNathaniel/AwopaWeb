import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaPhone, FaUserMd, FaMoneyBill, FaHospital, FaLanguage, FaClock } from 'react-icons/fa';
import { MdRefresh } from 'react-icons/md';
import pregnancyImg from '../assets/pregnancy.png';

export default function MedicsListPage() {
  const [medics, setMedics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchMedics = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.get('http://localhost:3100/api/v1/medics');
      setMedics(response.data.result.medics);
    } catch (error) {
      setErrorMessage(`Error fetching medics: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedics();
  }, []);

  const MedicCard = ({ medic }) => {
    const profileImage = medic.profilePhoto
      ? `http://localhost:3100${medic.profilePhoto}`
      : null;

    return (
      <motion.div
        className="border p-4 rounded-xl shadow-sm mb-4 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start mb-4">
          <div className="mr-4">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Medic" 
                className="w-16 h-16 rounded-full object-cover" 
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <FaUserMd size={24} color="#999" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{medic.fullName || 'No Name'}</h3>
            <p className="text-sm text-cyan-600">{medic.specialization || 'No Specialization'}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <FaHospital className="mr-2 text-cyan-600" />
            <span>{medic.hospital || 'No Hospital'}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 text-cyan-600" />
            <span>{`${medic.yearsOfPractice || 0} years of experience`}</span>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2 text-cyan-600" />
            <span>{medic.phoneNumber || 'No Phone'}</span>
          </div>
          <div className="flex items-center">
            <FaMoneyBill className="mr-2 text-cyan-600" />
            <span>{`$${medic.consultationFee || 0} Consultation Fee`}</span>
          </div>
          <div className="flex items-center">
            <FaLanguage className="mr-2 text-cyan-600" />
            <span>{(medic.languagesSpoken || []).join(', ') || 'No Languages'}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t text-sm text-gray-600">
          <p className="font-medium text-gray-700">Consultation Hours:</p>
          <p><span className="font-medium">Days:</span> {(medic.consultationHours?.days || []).join(', ') || 'Not specified'}</p>
          <p><span className="font-medium">Time:</span> {`${medic.consultationHours?.startTime || ''} - ${medic.consultationHours?.endTime || ''}`}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${pregnancyImg})` }}>
      <div className="min-h-screen p-6">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-cyan-600 text-white p-4">
              <h1 className="text-xl font-bold text-center">Doctor Directory</h1>
            </div>
          </div>
        </motion.div>


        

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {loading ? (
            <div className="text-center py-8">
              <motion.div
                className="inline-block"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <MdRefresh className="text-cyan-600 text-2xl" />
              </motion.div>
              <p className="mt-2 text-white">Loading doctors...</p>
            </div>
          ) : errorMessage ? (
            <div className="text-center py-8 text-red-600 bg-white p-4 rounded-lg">{errorMessage}</div>
          ) : medics.length === 0 ? (
            <div className="text-center py-8 text-white bg-white bg-opacity-80 p-4 rounded-lg">No doctors found.</div>
          ) : (
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
            >
              {medics.map((medic, index) => (
                <MedicCard key={index} medic={medic} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}