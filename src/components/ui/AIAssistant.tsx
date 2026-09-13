'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  links?: { label: string; href: string }[];
}

const PRESET_QUERIES = [
  { label: '🧠 Tell me about Vishal', query: 'Tell me about Vishal' },
  { label: '📜 Show AI & AWS Certifications', query: 'Show AI certifications' },
  { label: '🚀 What projects has he built?', query: 'What projects has he built?' },
  { label: '📬 How can I contact him?', query: 'How can I contact him?' },
];

const KNOWLEDGE_BASE: Record<string, { text: string; links?: { label: string; href: string }[] }> = {
  about: {
    text: "Vishal Deep is an MCA candidate in Generative AI at SRM University and a Software Engineer building production AI + Full-Stack systems. He holds professional certifications from AWS, Microsoft, and Google Cloud, and won awards at DOMINION 2026 and SRMIST x NITROSTACK Hackathon.",
    links: [
      { label: 'View Skills', href: '#skills' },
      { label: 'Download Resume', href: '/vishal_resume.pdf' },
    ],
  },
  certifications: {
    text: "Vishal holds 8 verified credentials including AWS Large Language Models & Generative AI, Microsoft AI & ML Engineering, Google Cloud Generative AI Leader, DeepLearning.AI Specialization, and Vanderbilt University Agentic AI.",
    links: [
      { label: 'Explore Certifications', href: '#certifications' },
    ],
  },
  projects: {
    text: "Vishal has engineered AI-driven full-stack web applications, hackathon-winning design platforms, autonomous multi-agent pipelines, and real-time speech analytics engines.",
    links: [
      { label: 'View Featured Projects', href: '#projects' },
    ],
  },
  contact: {
    text: "You can reach Vishal directly via email at vishalyep1022@gmail.com, or connect with him on LinkedIn and GitHub.",
    links: [
      { label: 'Get in Touch', href: '#contact' },
      { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/vishal-deep-14a864255/' },
    ],
  },
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hi! I'm Vishal's AI Assistant. Ask me anything about his AI background, certifications, or projects!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleCustomOpen);
    return () => window.removeEventListener('open-ai-chat', handleCustomOpen);
  }, []);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputValue.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let responseKey = 'about';
      const q = query.toLowerCase();
      if (q.includes('cert') || q.includes('aws') || q.includes('degree') || q.includes('microsoft') || q.includes('google')) {
        responseKey = 'certifications';
      } else if (q.includes('project') || q.includes('work') || q.includes('code') || q.includes('built')) {
        responseKey = 'projects';
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
        responseKey = 'contact';
      }

      const info = KNOWLEDGE_BASE[responseKey];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: info.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: info.links,
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 650);
  };

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 360,
              maxWidth: 'calc(100vw - 32px)',
              height: 480,
              maxHeight: 'calc(100vh - 110px)',
              background: 'rgba(10, 10, 24, 0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: 20,
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85), 0 0 30px rgba(56, 189, 248, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              marginBottom: 12,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '12px 16px',
                background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, rgba(244, 63, 94, 0.15) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #38BDF8, #F43F5E)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                  }}
                >
                  🤖
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#ffffff', fontWeight: 600 }}>Vishal-AI Co-Pilot</h4>
                  <span style={{ fontSize: '0.68rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> Online & Ready
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  fontSize: 18,
                  lineHeight: 1,
                  padding: 6,
                }}
              >
                ✕
              </button>
            </div>

            {/* Messages Body */}
            <div
              style={{
                flex: 1,
                padding: '14px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '88%',
                  }}
                >
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background:
                        msg.sender === 'user'
                          ? 'linear-gradient(135deg, #38BDF8, #0284C7)'
                          : 'rgba(255, 255, 255, 0.07)',
                      color: '#ffffff',
                      fontSize: '0.82rem',
                      lineHeight: 1.5,
                      border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {msg.text}
                    {msg.links && msg.links.length > 0 && (
                      <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {msg.links.map(link => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.72rem',
                              padding: '4px 10px',
                              borderRadius: 8,
                              background: 'rgba(56, 189, 248, 0.2)',
                              color: '#38BDF8',
                              textDecoration: 'none',
                              border: '1px solid rgba(56, 189, 248, 0.3)',
                              fontWeight: 500,
                            }}
                          >
                            {link.label} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      color: 'rgba(255, 255, 255, 0.4)',
                      marginTop: 4,
                      display: 'block',
                      textAlign: msg.sender === 'user' ? 'right' : 'left',
                    }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '8px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 12 }}>
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Vishal-AI is thinking...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Chips */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                gap: 6,
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              {PRESET_QUERIES.map(chip => (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.query)}
                  style={{
                    fontSize: '0.68rem',
                    whiteSpace: 'nowrap',
                    padding: '4px 10px',
                    borderRadius: 100,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                padding: '8px 10px',
                background: 'rgba(0, 0, 0, 0.4)',
                display: 'flex',
                gap: 6,
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask about Vishal..."
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 10,
                  padding: '8px 10px',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8, #0284C7)',
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Launcher Button ── */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 25px rgba(6, 182, 212, 0.45)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          position: 'relative',
          marginLeft: 'auto',
        }}
      >
        🤖
        <span
          style={{
            position: 'absolute',
            top: 2,
            right: 2,
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: '#10B981',
            border: '2px solid #080814',
          }}
        />
      </motion.button>
    </div>
  );
}
