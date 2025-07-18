import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const PregChatBotPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3100/api/v1/api/v1/chatbot/message',
        { content: input },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        const botResponse = response.data?.result?.response || '';
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      } else {
        setMessages(prev => [...prev, { 
          sender: 'bot', 
          text: `Error: ${response.status}. Please try again.` 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Failed to connect to server.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const BuildMessage = ({ message }) => {
    const isUser = message.sender === 'user';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`flex max-w-3/4 ${isUser ? 'flex-row-reverse' : ''}`}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-pink-500' : 'bg-purple-500'} mx-2`}>
              {isUser ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className={`p-3 rounded-lg ${isUser ? 'bg-pink-100' : 'bg-purple-50'}`}
          >
            {isUser ? (
              <p className="text-gray-800 text-sm">{message.text}</p>
            ) : (
              <ReactMarkdown className="prose prose-sm max-w-none">
                {message.text}
              </ReactMarkdown>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-cyan-600 py-4 shadow-lg">
        <h1 className="text-white text-center text-2xl font-semibold">PregChatBot</h1>
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full bg-white bg-opacity-90 rounded-lg p-4 flex flex-col"
        >
          <div className="flex-1 overflow-y-auto mb-4">
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ duration: 0.5 }}
                  className="h-full flex items-center justify-center"
                >
                  <div className="text-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p>Ask me anything about pregnancy...</p>
                  </div>
                </motion.div>
              ) : (
                messages.map((msg, index) => (
                  <BuildMessage key={index} message={msg} />
                ))
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-2"
            >
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-600"></div>
            </motion.div>
          )}

          <motion.div 
            layout
            className="flex items-center gap-2"
          >
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="w-full px-4 py-2 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-cyan-600 text-white rounded-full p-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PregChatBotPage;