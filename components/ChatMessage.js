import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { Sparkles, User, Volume2, Square } from 'lucide-react';

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Warm up voices array on mount (so they're available when clicked)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      
      return () => {
        if (isPlaying) window.speechSynthesis.cancel();
      };
    }
  }, [isPlaying]);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel(); 
    
    setTimeout(() => {
      const cleanText = content.replace(/[*#_`]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
      if (!cleanText.trim()) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Auto-detect language from text content
      const detectedLang = detectLanguage(cleanText);
      utterance.lang = detectedLang;
      
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        // Find a voice matching the detected language
        const langPrefix = detectedLang.split('-')[0]; // e.g. 'hi' from 'hi-IN'
        
        // Priority: natural/online > Google > Microsoft > any matching lang > fallback
        const matchingVoice = 
          voices.find(v => v.lang.startsWith(langPrefix) && (v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('online'))) ||
          voices.find(v => v.lang.startsWith(langPrefix) && v.name.toLowerCase().includes('google')) ||
          voices.find(v => v.lang.startsWith(langPrefix) && !v.localService) ||
          voices.find(v => v.lang.startsWith(langPrefix)) ||
          voices.find(v => v.name.toLowerCase().includes('natural') || v.name.toLowerCase().includes('online')) ||
          voices.find(v => v.name.includes('Google US English')) ||
          voices[0];
          
        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }
      }
      
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = (e) => {
        // 'interrupted' is expected when cancel() is called — not a real error
        if (e?.error !== 'interrupted') {
          console.warn('TTS:', e?.error || 'unknown');
        }
        setIsPlaying(false);
      };

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);

      // Chrome >15s timeout workaround
      const chromeBugFix = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(chromeBugFix);
        } else {
          window.speechSynthesis.pause();
          window.speechSynthesis.resume();
        }
      }, 14000);

    }, 100);
  };

  // Detect language from Unicode character ranges
  function detectLanguage(text) {
    const sample = text.substring(0, 200);
    if (/[\u0900-\u097F]/.test(sample)) return 'hi-IN'; // Hindi (Devanagari)
    if (/[\u0980-\u09FF]/.test(sample)) return 'bn-IN'; // Bengali
    if (/[\u0A80-\u0AFF]/.test(sample)) return 'gu-IN'; // Gujarati
    if (/[\u0B00-\u0B7F]/.test(sample)) return 'or-IN'; // Odia
    if (/[\u0A00-\u0A7F]/.test(sample)) return 'pa-IN'; // Punjabi
    if (/[\u0B80-\u0BFF]/.test(sample)) return 'ta-IN'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(sample)) return 'te-IN'; // Telugu
    if (/[\u0C80-\u0CFF]/.test(sample)) return 'kn-IN'; // Kannada
    if (/[\u0D00-\u0D7F]/.test(sample)) return 'ml-IN'; // Malayalam
    if (/[\u0600-\u06FF]/.test(sample)) return 'ar-SA'; // Arabic
    if (/[\u0590-\u05FF]/.test(sample)) return 'he-IL'; // Hebrew
    if (/[\u4E00-\u9FFF]/.test(sample)) return 'zh-CN'; // Chinese
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(sample)) return 'ja-JP'; // Japanese
    if (/[\uAC00-\uD7AF]/.test(sample)) return 'ko-KR'; // Korean
    if (/[\u0E00-\u0E7F]/.test(sample)) return 'th-TH'; // Thai
    if (/[\u0400-\u04FF]/.test(sample)) return 'ru-RU'; // Russian
    if (/[àáâãäéèêëíìîïóòôõöúùûüñçß]/.test(sample)) {
      if (/[ñ¿¡]/.test(sample)) return 'es-ES'; // Spanish
      if (/[àâéèêëîïôùûüç]/.test(sample)) return 'fr-FR'; // French
      if (/[äöüß]/.test(sample)) return 'de-DE'; // German
      if (/[àèéìíîòóùú]/.test(sample)) return 'it-IT'; // Italian
      if (/[àáâãéêíóôõúç]/.test(sample)) return 'pt-BR'; // Portuguese
    }
    return 'en-US'; // Default English
  }

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
