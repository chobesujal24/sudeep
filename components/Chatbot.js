'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am the Sudeep Engineers AI Assistant. How can I help you today with our lighting or fabrication solutions?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Show tooltip shortly after mount
    const showTimer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 1500);

    // Hide tooltip after 3 seconds of showing
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 4500); // 1.5s delay + 3s duration

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []); // Only run once on mount

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (input.length > 500) {
      alert('Message must be under 500 characters.');
      return;
    }

    const userMessage = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].slice(-10) // Keep recent history 
        }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now. Please try again later or contact us directly at info@sudeepengineers.com.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start">
      {/* Chat Window */}
      <div
        className={`mb-4 bg-gray-50 dark:bg-slate-900 w-[350px] max-w-[calc(100vw-3rem)] sm:w-[380px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-slate-800 transition-all duration-300 ease-in-out origin-bottom-left ${isOpen ? 'scale-100 opacity-100 h-[500px] max-h-[75vh]' : 'scale-50 opacity-0 h-0 pointer-events-none'
          }`}
      >
        <div className="bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-100 px-4 py-3 flex items-center justify-between shadow-sm z-10 w-full border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center border border-blue-100 dark:border-blue-800">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 2C11.5 7 15 10.5 20 10.5C15 10.5 11.5 14 11.5 19C11.5 14 8 10.5 3 10.5C8 10.5 11.5 7 11.5 2Z" fill="currentColor" className="text-blue-800 dark:text-blue-400" />
                <path d="M19 13C19 15 20.5 16.5 22.5 16.5C20.5 16.5 19 18 19 20C19 18 17.5 16.5 15.5 16.5C17.5 16.5 19 15 19 13Z" fill="#3B82F6" />
                <path d="M6.5 16C6.5 17.5 7.5 18.5 9 18.5C7.5 18.5 6.5 19.5 6.5 21C6.5 19.5 5.5 18.5 4 18.5C5.5 18.5 6.5 17.5 6.5 16Z" fill="#60A5FA" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-gray-900 dark:text-slate-100">AI Assistant</h3>
              <p className="text-[11px] text-green-600 dark:text-green-400 mt-0.5 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 p-1.5 rounded-full"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 dark:bg-slate-900/50 scroll-smooth w-full">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <ChatMessage key={index} role={msg.role} content={msg.content} />
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex w-full justify-start mb-4"
            >
              <div className="bg-white dark:bg-slate-800 shadow-sm text-gray-800 dark:text-slate-200 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-slate-700 px-4 py-3 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-blue-800 dark:text-blue-400" />
                <span className="text-sm">Generating response</span>
                <div className="flex gap-1 items-center pt-1.5 overflow-hidden">
                  {[0, 1, 2].map(i => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -3, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 0.6, 
                        delay: i * 0.15,
                        ease: "easeInOut" 
                      }}
                      className="w-1 h-1 bg-blue-800 dark:bg-blue-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about products or services..."
              maxLength={500}
              className="w-full pr-12 pl-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-full text-sm focus:outline-none focus:border-blue-800 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-800 dark:focus:ring-blue-500 transition-all text-gray-800 dark:text-slate-100 placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-blue-800 dark:bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:hover:bg-blue-800 flex items-center justify-center shadow-md"
              aria-label="Send message"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="relative">
        <div
          className={`absolute bottom-full left-0 mb-3 w-[180px] bg-white dark:bg-slate-800 text-blue-900 dark:text-blue-100 border border-blue-100 dark:border-slate-700 px-4 py-3 rounded-2xl shadow-xl transition-all duration-500 origin-bottom-left
            ${showTooltip && !isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-2 pointer-events-none'}
          `}
        >
          <p className="text-sm font-semibold text-center relative z-10">Need help? Chat with me! 👋</p>
          <div className="absolute -bottom-2 left-5 w-4 h-4 bg-white dark:bg-slate-800 border-b border-r border-blue-100 dark:border-slate-700 transform rotate-45"></div>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={`flex items-center justify-center w-14 h-14 bg-white dark:bg-slate-800 text-blue-800 dark:text-blue-400 rounded-full shadow-xl hover:shadow-2xl border border-blue-100 dark:border-slate-700 transition-all duration-300 ease-in-out hover:-translate-y-1 ${isOpen ? 'scale-0 opacity-0 absolute pointer-events-none' : 'scale-100 opacity-100'}`}
          aria-label="Open chat window"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cool-ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E40AF" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
            </defs>
            <path d="M11.5 2C11.5 7 15 10.5 20 10.5C15 10.5 11.5 14 11.5 19C11.5 14 8 10.5 3 10.5C8 10.5 11.5 7 11.5 2Z" fill="url(#cool-ai-grad)" />
            <path d="M19 13C19 15 20.5 16.5 22.5 16.5C20.5 16.5 19 18 19 20C19 18 17.5 16.5 15.5 16.5C17.5 16.5 19 15 19 13Z" fill="url(#cool-ai-grad)" />
            <path d="M6.5 16C6.5 17.5 7.5 18.5 9 18.5C7.5 18.5 6.5 19.5 6.5 21C6.5 19.5 5.5 18.5 4 18.5C5.5 18.5 6.5 17.5 6.5 16Z" fill="url(#cool-ai-grad)" />
          </svg>
        </button>
      </div>
    </div>
  );
}
