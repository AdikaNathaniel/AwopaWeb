import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

export default function DoctorAppointmentsStatsPage() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statsData, setStatsData] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/doctors/${encodeURIComponent(name.trim())}/appointments/stats`
      );
      setStatsData(response.data.result.data);
    } catch (err) {
      setError(`Error fetching stats: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-600';
      case 'pending': return 'bg-orange-600';
      case 'canceled': return 'bg-red-600';
      default: return 'bg-gray-400';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`ID copied to clipboard: ${text.substring(0, 8)}...`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto mt-20 bg-white bg-opacity-90 shadow-lg rounded-xl p-6"
      >
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Doctor Appointments Stats
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700 font-semibold">Doctor Name</span>
            <input
              type="text"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              placeholder="Enter Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 rounded-md text-white bg-cyan-600 hover:bg-cyan-700 transition"
          >
            {isLoading ? 'Loading...' : 'Get Statistics'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

        {statsData && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="mt-6 space-y-6"
          >
            <div className="p-4 border rounded-lg bg-gray-100">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Appointment Summary</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-green-600 font-bold">{statsData.stats?.confirmed ?? 0}</p>
                  <p>Confirmed</p>
                </div>
                <div>
                  <p className="text-orange-600 font-bold">{statsData.stats?.pending ?? 0}</p>
                  <p>Pending</p>
                </div>
                <div>
                  <p className="text-red-600 font-bold">{statsData.stats?.canceled ?? 0}</p>
                  <p>Canceled</p>
                </div>
                <div>
                  <p className="text-blue-600 font-bold">{statsData.stats?.confirmationRate ?? '0%'}</p>
                  <p>Confirmation Rate</p>
                </div>
              </div>
              <p className="text-center mt-4 font-semibold">
                Total Appointments: {statsData.stats?.total ?? 0}
              </p>
            </div>

            {["pending", "confirmed", "canceled", "upcoming"].map((key) => (
              statsData[key]?.appointments?.length > 0 && (
                <div key={key} className="bg-white p-4 border rounded-md">
                  <h3 className="font-bold text-blue-600 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)} Appointments ({statsData[key].count})
                  </h3>
                  <div className="space-y-4">
                    {statsData[key].appointments.map((appt, idx) => {
                      const date = new Date(appt.date);
                      const formattedDate = isNaN(date)
                        ? 'Date not specified'
                        : date.toLocaleString('en-US', {
                            month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          });
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="border p-3 rounded-md shadow"
                        >
                          <div className="flex items-center justify-between text-sm bg-gray-100 rounded p-2">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600 font-semibold">ID:</span>
                              <span className="font-mono text-xs">{appt._id}</span>
                            </div>
                            <button
                              onClick={() => copyToClipboard(appt._id)}
                              className="text-cyan-600 hover:underline text-sm"
                            >Copy</button>
                          </div>

                          <div className="mt-2 space-y-1 text-sm">
                            <p><strong><i className="text-blue-600">Patient:</i></strong> {appt.patientName ?? 'No name'}</p>
                            <p><strong><i className="text-green-600">Phone:</i></strong> {appt.phone ?? 'No phone'}</p>
                            <p><strong><i className="text-purple-600">Date:</i></strong> {formattedDate}</p>
                            <p><strong><i className="text-red-600">Location:</i></strong> {appt.location ?? 'No location'}</p>
                            <p><strong><i className="text-orange-600">Purpose:</i></strong> {appt.purpose ?? 'No purpose specified'}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-blue-800 font-semibold text-sm">Status:</span>
                              <span className={`text-white text-xs px-2 py-1 rounded-full ${getStatusColor(appt.status)}`}>
                                {appt.status?.toUpperCase() ?? 'UNKNOWN'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
