import React from 'react';
import { useNavigate } from 'react-router-dom';
import pregnancyImg from '../assets/pregnancy.png';

export default function NotificationSettingsPage({ userEmail = "admin@example.com"}) {
  const navigate = useNavigate();

  

  const buildNotificationCard = ({ icon, title, iconColor, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white/80 rounded-xl shadow-md p-4 flex items-center justify-between hover:bg-white/90 transition cursor-pointer mx-4 my-2"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full bg-[${iconColor}]/10 text-[${iconColor}]`}
        >
          <i className={`fas ${icon} text-xl`} style={{ color: iconColor }}></i>
        </div>
        <div className="text-lg font-semibold text-gray-800">{title}</div>
      </div>
      <i className="fas fa-chevron-right text-gray-500"></i>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10" />

      <div className="relative z-20 p-6">
        <header className="text-white text-center mb-6">
          <h1 className="text-2xl font-bold">Notification Settings</h1>
        </header>

        <div className="bg-purple-100/70 rounded-lg p-4 mb-4 mx-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-user-shield text-purple-700"></i>
            <span className="text-purple-700 font-semibold">Admin: {userEmail}</span>
          </div>
        </div>

        {buildNotificationCard({
          icon: 'fa-plus-circle',
          title: 'Create Notification',
          iconColor: '#22c55e',
          onClick: () => navigate('/admin/notifications/create'),
        })}

        {buildNotificationCard({
          icon: 'fa-users',
          title: 'Get Notifications by Role',
          iconColor: '#14b8a6',
          onClick: () => navigate('/admin/notifications/role'),
        })}

        {buildNotificationCard({
          icon: 'fa-bell',
          title: 'Get All Notifications',
          iconColor: '#f59e0b',
          onClick: () => navigate('/admin/notifications/all'),
        })}

        {buildNotificationCard({
          icon: 'fa-pen',
          title: 'Update Notification',
          iconColor: '#3b82f6',
          onClick: () => navigate('/admin/notifications/update'),
        })}

        {buildNotificationCard({
          icon: 'fa-id-badge',
          title: 'Get Notification by ID',
          iconColor: '#f97316',
          onClick: () => navigate('/admin/notifications/id'),
        })}

        {buildNotificationCard({
          icon: 'fa-check-circle',
          title: 'Mark Notification as Sent',
          iconColor: '#6366f1',
          onClick: () => navigate('/admin/notifications/sent'),
        })}

        {buildNotificationCard({
          icon: 'fa-trash-alt',
          title: 'Delete Notifications',
          iconColor: '#ef4444',
          onClick: () => navigate('/admin/notifications/delete'),
        })}
      </div>
    </div>
  );
}
