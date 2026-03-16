import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';
  
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
       <div 
        className={`max-w-[85%] px-4 py-3 shadow-sm ${
          isUser 
            ? 'bg-blue-800 text-white rounded-2xl rounded-br-sm' 
            : 'bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100 prose prose-sm prose-blue max-w-none'
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
    </div>
  );
}
