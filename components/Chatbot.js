'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageSquare, Sparkles, ArrowRight, Mic, MicOff, Volume2, VolumeX, Paperclip, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';

const quickActions = [
  { label: "📦 Product Catalog", query: "Tell me about your product categories" },
  { label: "💰 Get a Quote", query: "I need a quote for LED lighting" },
  { label: "⚙️ Custom Solutions", query: "Do you offer custom fabrication?" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to **Sudeep Engineers**! 👋\n\nI\'m your AI assistant — ready to help with product details, quotes, or custom engineering solutions.\n\nHow can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // New features state
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, attachedFile]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen]);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 2000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 6000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [isOpen]);

  // Trap wheel events inside the chat messages area so the main page never scrolls
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // If scrolling up at the top, or scrolling down at the bottom, block the event
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
        e.preventDefault();
      }
      // Always stop propagation so the outer page never gets the wheel event
      e.stopPropagation();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [isOpen]);

  // Handle Speech Recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setInput(prev => prev ? prev + ' ' + finalTranscript : finalTranscript);
          }
        };
        
        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Stop speech synthesis if closing chat completely
  useEffect(() => {
    if (!isOpen && typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate 15MB limit
    if (file.size > 15 * 1024 * 1024) {
      alert("File is too large. Maximum size is 15MB.");
      return;
    }
    
    setAttachedFile(file);
    // Reset the input value so the same file could be selected again if removed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText && !attachedFile && !isLoading) return;
    if (messageText.length > 500) {
      alert('Message must be under 500 characters.');
      return;
    }

    setHasInteracted(true);
    let displayContent = messageText;
    if (attachedFile) {
      displayContent += `\n\n📄 **Attached Document:** ${attachedFile.name}`;
    }
    
    const displayMessage = { role: 'user', content: displayContent || "Please analyze the attached document." };
    const userMessage = { role: 'user', content: messageText || "Please analyze the attached document." };
    
    setMessages(prev => [...prev, displayMessage]);
    
    const fileToSend = attachedFile;
    
    setInput('');
    setAttachedFile(null);
    setIsLoading(true);
    if (isListening) toggleListening();

    try {
      const formData = new FormData();
      // Keep only last 10 messages for context window stability
      formData.append('messages', JSON.stringify([...messages, userMessage].slice(-10)));
      if (fileToSend) {
        formData.append('file', fileToSend);
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData, 
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || 'Connection error. Try again later.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40, rotateX: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
            className="mb-2 w-[440px] max-w-[calc(100vw-3rem)] sm:w-[480px] overflow-hidden flex flex-col"
            style={{
              height: "780px",
              maxHeight: "80vh",
              borderRadius: "24px",
              background: "var(--color-background)",
              boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(22,101,52,0.08)",
            }}
          >
            {/* ─ Header ─ */}
            <div className="relative overflow-hidden">
              <div className="relative px-5 py-5 flex items-center justify-between z-10" style={{ background: "linear-gradient(135deg, #0F4C2E 0%, #166534 40%, #15803D 100%)" }}>
                <motion.div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundImage: "linear-gradient(90deg, transparent, white, transparent)", backgroundSize: "50% 100%" }}
                />
                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center border border-white/20"
                    style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}
                  >
                    <Sparkles size={20} className="text-[#4ADE80]" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-[0.95rem] leading-tight text-white tracking-tight">Sudeep AI Assistant</h3>
                    <p className="text-[11px] text-white/70 mt-1 flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#4ADE80] inline-block animate-pulse" />
                      AI assistant
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white transition-colors p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10"
                  >
                    <X size={16} />
                  </motion.button>
                </div>
              </div>
              <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #22C55E, #4ADE80, #22C55E)" }} />
            </div>

            {/* ─ Messages Area ─ */}
            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 w-full relative custom-scrollbar" style={{ background: "var(--color-background)", overscrollBehavior: "contain" }}>
              <div className="relative z-10">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => (
                    <ChatMessage key={index} role={msg.role} content={msg.content} index={index} />
                  ))}
                </AnimatePresence>

                {!hasInteracted && messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="flex flex-col gap-2 mt-1 mb-4 pl-9"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-[color:var(--color-text-muted)] font-bold mb-1">Quick Actions</span>
                    {quickActions.map((action, i) => (
                      <motion.button
                        key={i}
                        onClick={() => handleSend(action.query)}
                        className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[color:var(--color-border)] hover:border-[#22C55E]/40 hover:bg-[#F0FDF4] transition-all bg-[color:var(--color-bg-card)]"
                      >
                        <span>{action.label}</span>
                        <ArrowRight size={12} className="opacity-40" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex w-full justify-start mb-4 items-start gap-2"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5" style={{ background: "linear-gradient(135deg, #166534, #22C55E)" }}>
                        <Sparkles size={13} className="text-white" />
                      </div>
                      <div className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-sm items-center">
                        <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-[#4ADE80] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* ─ Input Area ─ */}
            <div className="p-3 border-t border-[color:var(--color-border)] w-full" style={{ background: "var(--color-bg-card)" }}>
              {/* Attached file preview */}
              <AnimatePresence>
                {attachedFile && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between mx-2 mb-2 p-2 bg-[#F0FDF4] dark:bg-[#166534]/20 border border-[#BBF7D0] dark:border-[#166534] rounded-lg"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText size={14} className="text-green-600 flex-shrink-0" />
                      <span className="text-xs text-green-800 dark:text-green-200 truncate">{attachedFile.name} ({Math.round(attachedFile.size / 1024)}KB)</span>
                    </div>
                    {attachedFile.type.startsWith('image/') && (
                      <div className="w-10 h-10 rounded border border-green-200 overflow-hidden ml-2 flex-shrink-0">
                        <img 
                          src={URL.createObjectURL(attachedFile)} 
                          alt="preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <button onClick={() => setAttachedFile(null)} className="text-green-600 hover:text-green-800 p-1 bg-green-100 rounded-full dark:bg-green-900/50 ml-auto">
                      <X size={12} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative flex items-center gap-2">
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".pdf,.txt,.md,.csv,.json,.doc,.docx,image/*"
                />
                
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-[color:var(--color-text-muted)] hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  title="Attach File or Image (Max 15MB)"
                >
                  <Paperclip size={18} />
                </button>

                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isListening ? "Listening..." : "Type your message…"}
                    maxLength={500}
                    className="w-full px-3 py-2.5 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E]/50 transition-all text-[color:var(--color-foreground)] placeholder-[color:var(--color-text-muted)]"
                    disabled={isLoading}
                  />
                  {/* Speech to Text button */}
                  {typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition) && (
                    <button
                      onClick={toggleListening}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${
                        isListening ? "text-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse" : "text-[color:var(--color-text-muted)] hover:text-green-600"
                      }`}
                    >
                      {isListening ? <Mic size={16} /> : <MicOff size={16} />}
                    </button>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSend()}
                  disabled={(!input.trim() && !attachedFile) || isLoading}
                  className="p-3 rounded-xl text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed border-none shadow-md disabled:shadow-none flex items-center justify-center cursor-pointer"
                  style={{ background: (!input.trim() && !attachedFile) || isLoading ? "#94A3B8" : "linear-gradient(135deg, #166534, #15803D)" }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 12 }}
              className="absolute bottom-full left-0 mb-3 w-[210px] px-4 py-3.5 rounded-2xl shadow-2xl border border-[#BBF7D0] z-10"
              style={{ background: "var(--color-bg-card)" }}
            >
              <p className="text-[13px] font-semibold text-center text-[color:var(--color-foreground)]">
                Need Help? Chat with me👋
              </p>
              <div className="absolute -bottom-[6px] left-6 w-3 h-3 border-b border-r border-[#BBF7D0] transform rotate-45" style={{ background: "var(--color-bg-card)" }} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`relative flex items-center justify-center w-[62px] h-[62px] rounded-2xl shadow-2xl border-none cursor-pointer transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 absolute pointer-events-none' : 'scale-100 opacity-100'}`}
          style={{ background: "linear-gradient(135deg, #0F4C2E, #166534, #15803D)", boxShadow: "0 8px 30px rgba(22,101,52,0.4)" }}
        >
          <MessageSquare size={24} className="text-white" />
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5">
            <span className="absolute inset-0 rounded-full bg-[#4ADE80] animate-ping opacity-60" />
            <span className="relative block w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#0F4C2E]" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
