'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  codeSnippet?: { language: string; code: string };
  links?: { label: string; href: string }[];
  actions?: { label: string; actionKey: string }[];
}

const PRESET_QUERIES = [
  { label: '🧠 Tell me about Vishal', query: 'Tell me about Vishal' },
  { label: '📜 Show AI & AWS Certifications', query: 'Show AI certifications' },
  { label: '🚀 What projects has he built?', query: 'What projects has he built?' },
  { label: '💻 Show Architecture Code', query: 'Show architecture code' },
  { label: '📬 How can I hire or contact him?', query: 'How can I contact him?' },
];

const KNOWLEDGE_BASE: Record<string, { text: string; codeSnippet?: { language: string; code: string }; links?: { label: string; href: string }[]; actions?: { label: string; actionKey: string }[] }> = {
  about: {
    text: "Vishal Deep is an MCA candidate in Generative AI at SRM University and a Software Engineer building production AI + Full-Stack systems. He holds professional credentials from AWS, Microsoft, and Google Cloud, and won top honors at DOMINION 2026 and NITROSTACK Hackathon.",
    links: [
      { label: 'View Skills', href: '#skills' },
      { label: 'Download Resume PDF', href: '/vishal_resume.pdf' },
    ],
  },
  certifications: {
    text: "Vishal holds 8 verified industry credentials:\n• [AWS] Large Language Models & Generative AI\n• [Microsoft] AI & ML Engineering Specialization\n• [Google Cloud] Generative AI Leader\n• [DeepLearning.AI] Advance Deep Learning\n• [Vanderbilt Univ] Agentic AI & AI Agents for Leaders",
    links: [
      { label: 'Verify Credentials Section', href: '#certifications' },
    ],
  },
  projects: {
    text: "Vishal has engineered full-stack AI workstations, autonomous multi-agent pipelines, real-time speech analytics engines, and hackathon-winning design platforms.",
    codeSnippet: {
      language: 'typescript',
      code: `// Agentic Workflow Orchestrator Engine
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export async function runAgentStep(prompt: string) {
  const client = new BedrockRuntimeClient({ region: "us-east-1" });
  const response = await client.send(new InvokeModelCommand({
    modelId: "anthropic.claude-3-5-sonnet-20240620-v1:0",
    contentType: "application/json",
    body: JSON.stringify({ prompt, max_tokens: 1024 }),
  }));
  return response;
}`,
    },
    links: [
      { label: 'View All Projects', href: '#projects' },
    ],
  },
  code: {
    text: "Here is a snapshot of Vishal's production WebGL & Neural Pipeline architecture integration:",
    codeSnippet: {
      language: 'typescript',
      code: `// Next.js 16 + WebGL Canvas Integration
export function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const renderer = new OGL.Renderer({ canvas: canvasRef.current, alpha: true });
    // Shader pipeline rendering loop...
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}`,
    },
    links: [
      { label: 'GitHub Repository ↗', href: 'https://github.com/VishalDeep1377' },
    ],
  },
  contact: {
    text: "Vishal is actively open for Full-Stack AI Engineer and Generative AI roles. Direct email: vishalyep1022@gmail.com | Phone / LinkedIn availability active.",
    links: [
      { label: 'Email Vishal Directly', href: 'mailto:vishalyep1022@gmail.com' },
      { label: 'LinkedIn Profile ↗', href: 'https://www.linkedin.com/in/vishal-deep-14a864255/' },
    ],
  },
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "👋 Hello! I am Vishal's AI Assistant Co-Pilot. Ask me about his Generative AI background, certified skills, architecture code, or contact details!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [thinkingStatus, setThinkingStatus] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinkingStatus]);

  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleCustomOpen);
    return () => window.removeEventListener('open-ai-chat', handleCustomOpen);
  }, []);

  const speakText = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#`•]/g, ''));
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

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

    // Multi-stage thinking indicators
    setThinkingStatus('Scanning knowledge graph...');
    setTimeout(() => {
      setThinkingStatus('Formulating neural response...');
    }, 450);

    setTimeout(() => {
      let responseKey = 'about';
      const q = query.toLowerCase();
      if (q.includes('cert') || q.includes('aws') || q.includes('google') || q.includes('microsoft') || q.includes('degree')) {
        responseKey = 'certifications';
      } else if (q.includes('code') || q.includes('architecture') || q.includes('tech stack')) {
        responseKey = 'code';
      } else if (q.includes('project') || q.includes('work') || q.includes('built')) {
        responseKey = 'projects';
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach') || q.includes('phone')) {
        responseKey = 'contact';
      }

      const info = KNOWLEDGE_BASE[responseKey];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: info.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        codeSnippet: info.codeSnippet,
        links: info.links,
        actions: info.actions,
      };

      setMessages(prev => [...prev, aiMsg]);
      setThinkingStatus(null);
      if (voiceEnabled) speakText(info.text);
    }, 900);
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: 380,
              maxWidth: 'calc(100vw - 32px)',
              height: 520,
              maxHeight: 'calc(100vh - 100px)',
              background: 'linear-gradient(165deg, rgba(12, 14, 28, 0.96) 0%, rgba(6, 7, 18, 0.98) 100%)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px)',
              borderRadius: 22,
              border: '1px solid rgba(56, 189, 248, 0.25)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.2)',
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
                background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.18) 0%, rgba(168, 85, 247, 0.18) 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    position: 'relative',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #38BDF8, #A855F7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)',
                  }}
                >
                  🤖
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.88rem', color: '#ffffff', fontWeight: 700 }}>Vishal-AI Co-Pilot</h4>
                  <span style={{ fontSize: '0.66rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: 5, fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} /> Online & Ready
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Voice Toggle */}
                <button
                  onClick={() => setVoiceEnabled(prev => !prev)}
                  title={voiceEnabled ? 'Mute Voice' : 'Enable Voice'}
                  style={{
                    background: voiceEnabled ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 8,
                    padding: '4px 8px',
                    color: voiceEnabled ? '#38BDF8' : 'rgba(255,255,255,0.5)',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {voiceEnabled ? '🔊 Voice On' : '🔇 Muted'}
                </button>
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    fontSize: 16,
                    lineHeight: 1,
                    padding: 4,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div
              style={{
                flex: 1,
                padding: '14px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {messages.map(msg => (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '90%',
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
                      border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(56, 189, 248, 0.3)' : 'none',
                      position: 'relative',
                    }}
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} style={{ margin: i === 0 ? 0 : '4px 0 0' }}>{line}</p>
                    ))}

                    {/* Code Snippet Card */}
                    {msg.codeSnippet && (
                      <div style={{ marginTop: 10, borderRadius: 8, background: '#050714', border: '1px solid rgba(56, 189, 248, 0.3)', overflow: 'hidden' }}>
                        <div style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.65rem', color: '#38BDF8', fontFamily: 'var(--mono)' }}>{msg.codeSnippet.language}</span>
                          <button
                            onClick={() => copyCode(msg.codeSnippet!.code, msg.id)}
                            style={{ background: 'none', border: 'none', color: '#10B981', fontSize: '0.65rem', cursor: 'pointer', fontFamily: 'var(--mono)' }}
                          >
                            {copiedId === msg.id ? '✓ Copied' : '📋 Copy'}
                          </button>
                        </div>
                        <pre style={{ padding: 10, margin: 0, fontSize: '0.68rem', color: '#A7F3D0', fontFamily: 'var(--mono)', overflowX: 'auto', lineHeight: 1.4 }}>
                          {msg.codeSnippet.code}
                        </pre>
                      </div>
                    )}

                    {/* Links */}
                    {msg.links && msg.links.length > 0 && (
                      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {msg.links.map(link => (
                          <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel="noopener noreferrer"
                            style={{
                              fontSize: '0.72rem',
                              padding: '5px 10px',
                              borderRadius: 8,
                              background: 'rgba(56, 189, 248, 0.18)',
                              color: '#38BDF8',
                              textDecoration: 'none',
                              border: '1px solid rgba(56, 189, 248, 0.3)',
                              fontWeight: 600,
                            }}
                          >
                            {link.label} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                      {msg.timestamp}
                    </span>
                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 12, cursor: 'pointer', padding: 0 }}
                        title="Speak Message"
                      >
                        🔊
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Multi-stage Thinking Indicator */}
              {thinkingStatus && (
                <div style={{ alignSelf: 'flex-start', padding: '8px 12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#38BDF8', display: 'inline-block', animation: 'pulse 1s infinite' }} />
                  <span style={{ fontSize: '0.74rem', color: '#38BDF8', fontFamily: 'var(--mono)' }}>{thinkingStatus}</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Preset Query Chips */}
            <div
              style={{
                padding: '8px 10px',
                display: 'flex',
                gap: 6,
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              {PRESET_QUERIES.map(chip => (
                <button
                  key={chip.label}
                  onClick={() => handleSend(chip.query)}
                  style={{
                    fontSize: '0.68rem',
                    whiteSpace: 'nowrap',
                    padding: '5px 10px',
                    borderRadius: 100,
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: 'rgba(255, 255, 255, 0.85)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    fontWeight: 500,
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
                padding: '10px 12px',
                background: 'rgba(5, 7, 20, 0.95)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                gap: 8,
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask about Vishal's AI background..."
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 10,
                  padding: '8px 12px',
                  color: '#ffffff',
                  fontSize: '0.82rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8, #0284C7)',
                  border: 'none',
                  borderRadius: 10,
                  padding: '8px 14px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)',
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
          width: 52,
          height: 52,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #06B6D4, #3B82F6)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 28px rgba(6, 182, 212, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
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
