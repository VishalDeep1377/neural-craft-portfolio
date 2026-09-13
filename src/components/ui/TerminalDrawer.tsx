'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export default function TerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <p style={{ color: '#38BDF8', margin: 0, fontWeight: 600 }}>Welcome to Neural-Craft Workstation CLI v2.0</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0 0' }}>Type <code style={{ color: '#F43F5E' }}>help</code> to list available commands.</p>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-terminal', handleCustomOpen);
    return () => window.removeEventListener('open-terminal', handleCustomOpen);
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div>
            <p style={{ color: '#F43F5E', margin: '0 0 6px' }}>Available Commands:</p>
            <ul style={{ margin: 0, paddingLeft: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              <li><b style={{ color: '#38BDF8' }}>bio</b> — Display Vishal Deep executive summary</li>
              <li><b style={{ color: '#FF9900' }}>certs</b> — List verified certifications (AWS, Microsoft, Google)</li>
              <li><b style={{ color: '#10B981' }}>skills</b> — Inspect AI/ML & Full-Stack technical skills</li>
              <li><b style={{ color: '#EC4899' }}>projects</b> — View featured engineering projects</li>
              <li><b style={{ color: '#A855F7' }}>contact</b> — Print direct contact channels</li>
              <li><b style={{ color: '#64748B' }}>clear</b> — Clear terminal screen</li>
            </ul>
          </div>
        );
        break;

      case 'bio':
        outputNode = (
          <div style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
            <p style={{ color: '#38BDF8', fontWeight: 600, margin: 0 }}>Vishal Deep — Software Engineer & AI Specialist</p>
            <p style={{ margin: '4px 0 0' }}>MCA candidate in Generative AI at SRM University. Specialist in LLMs, Bedrock, Vertex AI, Agentic Autonomous AI, and React 19 / Next.js 16 full-stack systems.</p>
          </div>
        );
        break;

      case 'certs':
        outputNode = (
          <div>
            <p style={{ color: '#FF9900', margin: '0 0 6px', fontWeight: 600 }}>Verified Credentials:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: 'rgba(255,255,255,0.85)' }}>
              <span>• [AWS] Large Language Models & Generative AI</span>
              <span>• [Microsoft] AI & ML Engineering Specialization</span>
              <span>• [Google Cloud] Generative AI Leader Professional Certificate</span>
              <span>• [DeepLearning.AI] Advance Deep Learning Specialization</span>
              <span>• [Vanderbilt Univ] Agentic AI & AI Agents for Leaders</span>
              <span>• [Dominion 2026] Best Design Award</span>
              <span>• [SRMIST] NITROSTACK Hackathon Runner Up</span>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div>
            <p style={{ color: '#10B981', margin: '0 0 4px', fontWeight: 600 }}>AI / ML Core:</p>
            <p style={{ margin: '0 0 8px', color: 'rgba(255,255,255,0.8)' }}>PyTorch, AWS Bedrock, SageMaker, Vertex AI, Agentic AI, Prompt Engineering, Neural Networks</p>
            <p style={{ color: '#38BDF8', margin: '0 0 4px', fontWeight: 600 }}>Full-Stack Core:</p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)' }}>Next.js 16, React 19, TypeScript, WebGL (OGL), TailwindCSS, Node.js, REST APIs, Git</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div>
            <p style={{ color: '#EC4899', margin: '0 0 6px', fontWeight: 600 }}>Featured Projects:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'rgba(255,255,255,0.85)' }}>
              <span>1. <b>Neural-Craft Portfolio Workstation</b> — WebGL & Canvas AI portfolio platform</span>
              <span>2. <b>Agentic AI Pipeline</b> — Multi-agent autonomous workflow engine</span>
              <span>3. <b>Speech Analytics Platform</b> — Real-time audio evaluation module</span>
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div style={{ color: 'rgba(255,255,255,0.85)' }}>
            <p style={{ margin: 0 }}>✉️ Email: <a href="mailto:vishalyep1022@gmail.com" style={{ color: '#38BDF8' }}>vishalyep1022@gmail.com</a></p>
            <p style={{ margin: '4px 0 0' }}>🐙 GitHub: <a href="https://github.com/VishalDeep1377" target="_blank" style={{ color: '#38BDF8' }}>github.com/VishalDeep1377</a></p>
            <p style={{ margin: '4px 0 0' }}>💼 LinkedIn: <a href="https://www.linkedin.com/in/vishal-deep-14a864255/" target="_blank" style={{ color: '#38BDF8' }}>linkedin.com/in/vishal-deep</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p style={{ color: '#EF4444', margin: 0 }}>
            Command not recognized: "{cmd}". Type <code style={{ color: '#38BDF8' }}>help</code> for available commands.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: input, output: outputNode }]);
    setInput('');
  };

  return (
    <>
      {/* Desktop CLI Launcher Button (Hidden on Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="desktop-terminal-btn"
        style={{
          position: 'fixed',
          bottom: 20,
          left: 130,
          zIndex: 9999,
          background: 'rgba(10, 10, 24, 0.85)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          borderRadius: 100,
          padding: '8px 14px',
          color: '#10B981',
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 15px rgba(16, 185, 129, 0.15)',
        }}
      >
        <span>$ CLI</span>
      </button>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-terminal-btn {
            display: none !important;
          }
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 12,
              paddingRight: 12,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 660,
                maxWidth: '100%',
                height: 420,
                maxHeight: 'calc(100vh - 100px)',
                background: '#070714',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: 14,
                boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(16, 185, 129, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                fontFamily: 'var(--mono)',
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginLeft: 6 }}>vishal@neural-craft:~</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 16, padding: 4 }}
                >
                  ✕
                </button>
              </div>

              {/* Terminal Body */}
              <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {history.map((item, idx) => (
                  <div key={idx}>
                    {item.command !== 'welcome' && (
                      <p style={{ color: '#10B981', margin: '0 0 4px', fontSize: '0.8rem' }}>
                        vishal@neural-craft:~$ <span style={{ color: '#ffffff' }}>{item.command}</span>
                      </p>
                    )}
                    <div style={{ fontSize: '0.78rem' }}>{item.output}</div>
                  </div>
                ))}
              </div>

              {/* Terminal Input */}
              <form onSubmit={handleCommand} style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#10B981', fontSize: '0.8rem' }}>vishal@neural-craft:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="type a command (e.g. help, bio, certs)..."
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.8rem',
                    outline: 'none',
                  }}
                />
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
