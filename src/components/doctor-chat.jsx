import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';
import { UserIcon } from '@heroicons/react/24/solid';

const socket = io('http://localhost:3009', {
  transports: ['websocket'],
  autoConnect: false,
});

const DoctorChatPage = ({ doctorId = 'doctor123', patientId = 'patient456' }) => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('register', { userId: doctorId, role: 'doctor' });
      socket.emit('startConversation', { targetUserId: patientId });
    });

    socket.on('conversationStarted', (data) => {
      setRoomId(data.roomId);
      socket.emit('getMessageHistory', { roomId: data.roomId });
    });

    socket.on('messageHistory', (data) => {
      const sorted = [...data.messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      setMessages(sorted);
    });

    socket.on('newMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
      if (msg.senderId === patientId) {
        socket.emit('markAsRead', { roomId, messageIds: [msg.id] });
      }
    });

    socket.on('messagesRead', (data) => {
      setMessages((prev) =>
        prev.map((msg) =>
          data.messageIds.includes(msg.id) ? { ...msg, isRead: true } : msg
        )
      );
    });

    socket.on('user-joined', (data) => addSystemMessage(data.message));
    socket.on('user-left', (data) => addSystemMessage(data.message));
    socket.on('error', (data) => addSystemMessage(`Error: ${data.message}`));

    return () => {
      socket.disconnect();
    };
  }, []);

  const addSystemMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        senderId: 'system',
        content: text,
        timestamp: new Date().toISOString(),
        isRead: true,
      },
    ]);
  };

  const sendMessage = () => {
    if (!messageText.trim() || !roomId) return;
    socket.emit('sendMessage', {
      roomId,
      content: messageText,
      receiverId: patientId,
    });
    setMessageText('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <div className="bg-white/80 max-w-3xl mx-auto mt-10 rounded-lg shadow-lg flex flex-col h-[90vh]">
        {/* Header */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-cyan-600 text-white px-6 py-4 rounded-t-lg"
        >
          <h2 className="text-2xl font-bold mb-1">Doctor Chat</h2>
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="w-5 h-5 text-white" />
            <span>Patient ID: <span className="font-medium">{patientId}</span></span>
          </div>
          <p className="text-xs mt-1 opacity-90">
            Status: <span className="font-semibold">{isConnected ? 'Online' : 'Connecting...'}</span>
          </p>
        </motion.div>

        {/* Message List */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-gray-600">No messages yet.</p>
          ) : (
            messages.map((msg) => {
              const isDoctor = msg.senderId === doctorId;
              const isSystem = msg.senderId === 'system';
              const time = new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-md max-w-xs ${
                    isSystem
                      ? 'bg-gray-300 text-center mx-auto'
                      : isDoctor
                      ? 'bg-cyan-100 self-end'
                      : 'bg-blue-100 self-start'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-right mt-1 text-gray-500">
                    {time}
                    {isDoctor && (
                      <span className="ml-1">
                        {msg.isRead ? '✓✓' : '✓'}
                      </span>
                    )}
                  </p>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Message Input */}
        <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={sendMessage}
              disabled={!isConnected}
              className="bg-cyan-600 text-white px-4 py-2 rounded-full font-semibold"
            >
              Send
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorChatPage;
