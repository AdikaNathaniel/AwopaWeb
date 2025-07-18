import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setStartDate(start);
    setEndDate(end);
  }, []);

  const fetchAppointments = async () => {
    if (!doctorName) {
      alert('Please enter doctor name');
      return;
    }
    setIsLoading(true);
    try {
      const encodedName = encodeURIComponent(doctorName.trim());
      let url = `http://localhost:3100/api/v1/doctors/${encodedName}/appointments?status=${selectedStatus}`;
      if (startDate && endDate) {
        url += `&startDate=${format(startDate, 'yyyy-MM-dd')}&endDate=${format(endDate, 'yyyy-MM-dd')}`;
      }
      const response = await axios.get(url);
      if (response.data.success && response.data.result?.appointments) {
        setAppointments(response.data.result.appointments);
        setShowDialog(true);
      } else {
        setAppointments([]);
        setShowDialog(true);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-600';
      case 'canceled': return 'bg-red-600';
      case 'pending': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${pregnancyImg})` }}>
      <div className="bg-white bg-opacity-90 min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl"
        >
          <h1 className="text-center text-2xl font-bold text-cyan-600 mb-6">Doctor Appointments</h1>

          <div className="mb-4">
            <label className="block font-medium mb-1">Doctor Name</label>
            <input
              type="text"
              placeholder="Enter Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Appointment Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="date"
                value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </div>
          </div>

          <button
            disabled={isLoading}
            onClick={fetchAppointments}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700"
          >
            {isLoading ? 'Loading...' : 'SEARCH APPOINTMENTS'}
          </button>
        </motion.div>

        {showDialog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <div className="bg-white p-6 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-700">Appointment Results</h2>
                <button onClick={() => setShowDialog(false)} className="text-gray-500 hover:text-red-600">&times;</button>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 text-sm">Doctor: {doctorName}</p>
                <p className="text-gray-700 text-sm">Status: {selectedStatus.toUpperCase()}</p>
                {startDate && endDate && (
                  <p className="text-gray-700 text-sm">
                    Date Range: {format(startDate, 'yyyy-MM-dd')} to {format(endDate, 'yyyy-MM-dd')}
                  </p>
                )}
              </div>

              {appointments.length === 0 ? (
                <div className="text-center text-gray-500">
                  <p>No appointments found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt, idx) => (
                    <div key={idx} className="border p-4 rounded-xl shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg text-gray-800">{appt.patientName ?? 'No Name'}</h3>
                        <span className={`text-white px-3 py-1 text-xs rounded-full ${statusColor(appt.status)}`}>
                          {appt.status?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Purpose: {appt.purpose ?? 'N/A'}</p>
                      <p className="text-sm text-gray-600 mb-1">Phone: {appt.phone ?? 'N/A'}</p>
                      <p className="text-sm text-gray-600 mb-1">Location: {appt.location ?? 'N/A'}</p>
                      <p className="text-sm text-gray-600">Date: {appt.date ? format(new Date(appt.date), 'MMM dd, yyyy - hh:mm a') : 'N/A'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
