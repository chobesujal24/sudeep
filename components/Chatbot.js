'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, MessageSquare, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
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
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
  }, []);

  const handleSend = async (text) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;
    if (messageText.length > 500) {
      alert('Message must be under 500 characters.');
      return;
    }

    setHasInteracted(true);
    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].slice(-10)
        }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'I\'m having trouble connecting right now. Please try again or reach us at **info@sudeepengineers.com**.' }]);
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
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40, rotateX: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.8 }}
            className="mb-2 w-[380px] max-w-[calc(100vw-3rem)] sm:w-[420px] overflow-hidden flex flex-col"
            style={{
              height: "650px",
              maxHeight: "85vh",
              borderRadius: "24px",
              background: "var(--color-background)",
              boxShadow: "0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(22,101,52,0.08)",
            }}
          >
            {/* ─ Header with gradient + glow ─ */}
            <div className="relative overflow-hidden">
              <div className="relative px-5 py-5 flex items-center justify-between z-10" style={{ background: "linear-gradient(135deg, #0F4C2E 0%, #166534 40%, #15803D 100%)" }}>
                {/* Animated light streaks */}
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
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Sparkles size={20} className="text-[#4ADE80]" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-[0.95rem] leading-tight text-white tracking-tight">Sudeep AI Assistant</h3>
                    <p className="text-[11px] text-white/70 mt-1 flex items-center gap-1.5 font-medium">
                      <motion.span
                        className="w-2 h-2 rounded-full bg-[#4ADE80] inline-block"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                      Enterprise AI · Always Online
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white transition-colors p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 cursor-pointer"
                  aria-label="Close chat"
                >
                  <X size={16} />
                </motion.button>
              </div>
              {/* Bottom glow line */}
              <div className="h-[2px]" style={{ background: "linear-gradient(90deg, #22C55E, #4ADE80, #22C55E)" }} />
            </div>

            {/* ─ Messages Area ─ */}
            <div className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth w-full relative" style={{ background: "var(--color-background)" }}>
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0)", backgroundSize: "20px 20px" }} />

              <div className="relative z-10">
                <AnimatePresence initial={false}>
                  {messages.map((msg, index) => (
                    <ChatMessage key={index} role={msg.role} content={msg.content} index={index} />
                  ))}
                </AnimatePresence>

                {/* Quick Actions */}
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
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        whileHover={{ x: 4, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSend(action.query)}
                        className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-[color:var(--color-border)] text-[color:var(--color-foreground)] hover:border-[#22C55E]/40 hover:bg-[#F0FDF4] dark:hover:bg-[#166534]/10 transition-all duration-200 cursor-pointer text-left bg-[color:var(--color-bg-card)]"
                      >
                        <span>{action.label}</span>
                        <ArrowRight size={12} className="text-[color:var(--color-text-muted)] opacity-0 group-hover:opacity-100" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="flex w-full justify-start mb-4 items-start gap-2"
                    >
                      <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5" style={{ background: "linear-gradient(135deg, #166534, #22C55E)" }}>
                        <Sparkles size={13} className="text-white" />
                      </div>
                      <div className="bg-[color:var(--color-bg-card)] border border-[color:var(--color-border)] rounded-2xl rounded-bl-sm px-4 py-3.5 flex items-center gap-3 shadow-sm">
                        <div className="flex gap-[4px] items-center">
                          {[0, 1, 2].map(i => (
                            <motion.span
                              key={i}
                              animate={{
                                y: [0, -6, 0],
                                opacity: [0.3, 1, 0.3],
                                scale: [0.8, 1.2, 0.8]
                              }}
                              transition={{
                                repeat: Infinity,
                                duration: 1,
                                delay: i * 0.2,
                                ease: "easeInOut"
                              }}
                              className="w-[5px] h-[5px] rounded-full"
                              style={{ background: "linear-gradient(135deg, #166534, #22C55E)" }}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] text-[color:var(--color-text-muted)] font-medium italic">Generating response…</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div ref={messagesEndRef} className="h-1" />
            </div>

            {/* ─ Input Area ─ */}
            <div className="p-3.5 border-t border-[color:var(--color-border)] w-full" style={{ background: "var(--color-bg-card)" }}>
              <div className="relative flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message…"
                    maxLength={500}
                    className="w-full pl-4 pr-4 py-3 bg-[color:var(--color-background)] border border-[color:var(--color-border)] rounded-xl text-sm focus:outline-none focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/15 transition-all text-[color:var(--color-foreground)] placeholder-[color:var(--color-text-muted)]"
                    disabled={isLoading}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 p-3 rounded-xl text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer border-none shadow-lg disabled:shadow-none"
                  style={{
                    background: !input.trim() || isLoading
                      ? "#94A3B8"
                      : "linear-gradient(135deg, #166534, #15803D)"
                  }}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </motion.button>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2.5">
                <Sparkles size={9} className="text-[#22C55E] opacity-40" />
                <p className="text-[9px] text-[color:var(--color-text-muted)] opacity-40 font-medium tracking-wider uppercase">
                  Powered by AI · Sudeep Engineers
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle Button ── */}
      <div className="relative">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: 12 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute bottom-full left-0 mb-3 w-[210px] px-4 py-3.5 rounded-2xl shadow-2xl border border-[#BBF7D0] dark:border-[#166534]/50 z-10"
              style={{ background: "var(--color-bg-card)" }}
            >
              <p className="text-[13px] font-semibold text-center text-[color:var(--color-foreground)]">
                Need help? Chat with AI! <motion.span animate={{ rotate: [0, 14, -14, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="inline-block">👋</motion.span>
              </p>
              <div className="absolute -bottom-[6px] left-6 w-3 h-3 border-b border-r border-[#BBF7D0] dark:border-[#166534]/50 transform rotate-45" style={{ background: "var(--color-bg-card)" }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Button */}
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          className={`relative flex items-center justify-center w-[62px] h-[62px] rounded-2xl shadow-2xl border-none cursor-pointer transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 absolute pointer-events-none' : 'scale-100 opacity-100'}`}
          style={{
            background: "linear-gradient(135deg, #0F4C2E, #166534, #15803D)",
            boxShadow: "0 8px 30px rgba(22,101,52,0.4), 0 0 0 1px rgba(22,101,52,0.1)"
          }}
          aria-label="Open chat"
        >
          <motion.div
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <MessageSquare size={24} className="text-white" />
          </motion.div>
          {/* Sparkle accent */}
          <motion.div
            className="absolute -top-0.5 -right-0.5"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Sparkles size={12} className="text-[#4ADE80] drop-shadow-lg" />
          </motion.div>
          {/* Ping */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5">
            <span className="absolute inset-0 rounded-full bg-[#4ADE80] animate-ping opacity-60" />
            <span className="relative block w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-[#0F4C2E]" />
          </span>
        </motion.button>
      </div>
    </div>
  );
}
