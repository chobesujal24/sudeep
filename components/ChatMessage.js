import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { Sparkles, User, Volume2, Square } from 'lucide-react';

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = React.useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const handleSpeak = async () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);

    try {
      const cleanText = content.replace(/[*#_`]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
      if (!cleanText.trim()) {
        setIsPlaying(false);
        return;
      }

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText })
      });

      if (!response.ok) throw new Error('TTS request failed');

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      await audio.play();

    } catch (error) {
      console.error('Failed to play TTS:', error);
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      {/* AI avatar */}
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mr-2 mt-1" style={{ background: "linear-gradient(135deg, #166534, #22C55E)" }}>
          <Sparkles size={13} className="text-white" />
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'rounded-2xl rounded-br-sm text-white shadow-sm'
            : 'rounded-2xl rounded-bl-sm bg-[color:var(--color-bg-card)] text-[color:var(--color-foreground)] border border-[color:var(--color-border)] shadow-sm prose prose-sm prose-green dark:prose-invert max-w-none'
        }`}
        style={isUser ? { background: "linear-gradient(135deg, #166534, #15803D)" } : undefined}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{content}</div>
        ) : (
          <div className="overflow-hidden [&_p]:my-1.5 [&_a]:text-[#166534] dark:[&_a]:text-[#4ADE80] [&_a]:underline [&_strong]:font-bold [&_ul]:pl-4 [&_ul]:my-2 [&_li]:my-0.5">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
            
            {/* AI Action Bar - Text Bottom */}
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[color:var(--color-border)] opacity-80 hover:opacity-100 transition-opacity">
              <button 
                onClick={handleSpeak}
                className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2 py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${isPlaying ? 'text-[#166534] dark:text-[#4ADE80]' : 'text-[color:var(--color-text-muted)]'}`}
                title={isPlaying ? "Stop Reading" : "Read Aloud"}
              >
                {isPlaying ? <Square size={13} fill="currentColor" /> : <Volume2 size={13} />}
                {isPlaying ? "Stop" : "Read Aloud"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-[#0F172A] dark:bg-[#1E293B] flex items-center justify-center ml-2 mt-1">
          <User size={13} className="text-white" />
        </div>
      )}
    </motion.div>
  );
}
