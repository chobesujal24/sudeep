import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 30,
        mass: 0.8
      }}
      className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
       <div 
        className={`max-w-[85%] px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-blue-800 dark:bg-blue-600 text-white rounded-2xl rounded-br-sm' 
            : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-slate-700 prose prose-sm prose-blue dark:prose-invert max-w-none'
        }`}
      >
        {isUser ? (
           <div className="text-sm whitespace-pre-wrap leading-relaxed">{content}</div>
        ) : (
           <div className="text-sm leading-relaxed overflow-hidden">
             <ReactMarkdown remarkPlugins={[remarkGfm]}>
               {content}
             </ReactMarkdown>
           </div>
        )}
      </div>
    </motion.div>
  );
}
