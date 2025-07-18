import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const FindDoctorByNamePage = () => {
  const [doctorName, setDoctorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);

  const fetchDoctor = async (e) => {
    e.preventDefault();
    if (!doctorName.trim()) return alert('Please enter a name');

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3100/api/v1/medics/${doctorName.trim()}`);
      const data = response.data;
      const doctorData = data.result?.medic || null;
      setDoctor(doctorData);
    } catch (error) {
      alert('Doctor not found or an error occurred.');
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  const renderDoctorDetails = () => {
    if (!doctor) return null;

    const languages = Array.isArray(doctor.languagesSpoken)
      ? doctor.languagesSpoken.join(', ')
      : 'N/A';

    const consultationHours = doctor.consultationHours || {};
    let days = 'N/A';
    if (Array.isArray(consultationHours.days)) {
      if (consultationHours.days[0]?.includes(',')) {
        days = consultationHours.days[0];
      } else {
        days = consultationHours.days.join(', ');
      }
    }

    const hours = consultationHours.startTime && consultationHours.endTime
      ? `${consultationHours.startTime} - ${consultationHours.endTime}`
      : 'N/A';

    const photoPath = doctor.profilePhoto || '';
    const profilePhotoUrl = photoPath.startsWith('http')
      ? photoPath
      : `http://localhost:3100${photoPath}`;

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      } catch {
        return dateString;
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 rounded-lg shadow-lg p-6 max-w-xl mx-auto mt-8"
      >
        <div className="flex flex-col items-center mb-4">
          <img
            src={profilePhotoUrl}
            alt="Doctor"
            className="rounded-full w-28 h-28 object-cover border"
            onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
          />
          <h2 className="text-xl font-bold mt-4">{doctor.fullName || 'N/A'}</h2>
        </div>
        <div className="space-y-3">
          <InfoRow label="Specialization" value={doctor.specialization} />
          <InfoRow label="Hospital" value={doctor.hospital} />
          <InfoRow label="Years of Practice" value={doctor.yearsOfPractice} />
          <InfoRow label="Languages" value={languages} />
          <InfoRow label="Consultation Fee" value={doctor.consultationFee} />
          <InfoRow label="Available Days" value={days} />
          <InfoRow label="Available Hours" value={hours} />
          <InfoRow label="Created" value={formatDate(doctor.createdAt)} />
        </div>
      </motion.div>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="flex items-center justify-center px-4 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <form onSubmit={fetchDoctor} className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-700">Find Doctor by Name</h1>
          </div>

          <div>
            <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">
              Doctor Name
            </label>
            <input
              type="text"
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter Doctor Name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-cyan-600 focus:border-cyan-600"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-md font-semibold"
          >
            {loading ? 'Searching...' : 'Find Doctor'}
          </motion.button>
        </form>

        {renderDoctorDetails()}
      </motion.div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value || 'N/A'}</span>
  </div>
);

export default FindDoctorByNamePage;
