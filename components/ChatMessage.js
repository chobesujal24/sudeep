import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';

export default function ChatMessage({ role, content }) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
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
