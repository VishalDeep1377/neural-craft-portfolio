'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const ASCII_BANNER = `
  _  _ _____ _   _ ____    _    _       ____ ____ ____ ____ ___ 
  |\\ | |____ |   | |__/   / \\   |       |    |__/ |__| |___  |  
  | \\| |____ |___| |  \\  / _ \\  |___    |___ |  \\ |  | |     |  
`;

const QUICK_COMMANDS = [
  { label: '⚡ bio', cmd: 'bio' },
  { label: '📜 certs', cmd: 'certs' },
  { label: '🛠️ skills', cmd: 'skills' },
  { label: '🚀 projects', cmd: 'projects' },
  { label: '📬 contact', cmd: 'contact' },
  { label: '🧹 clear', cmd: 'clear' },
];

export default function TerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div style={{ fontFamily: 'var(--mono)' }}>
          <pre style={{ color: '#38BDF8', fontSize: '0.65rem', margin: '0 0 10px', lineHeight: 1.25, fontWeight: 700 }}>
            {ASCII_BANNER}
          </pre>
          <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 6, padding: '4px 10px', color: '#38BDF8', fontSize: '0.75rem', fontWeight: 600, marginBottom: 8 }}>
            Neural-Craft Workstation CLI v3.0 (Pro Cyberpunk Edition)
          </div>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '4px 0 0', fontSize: '0.78rem' }}>
            Type <code style={{ color: '#F43F5E', background: 'rgba(244, 63, 94, 0.15)', padding: '1px 6px', borderRadius: 4 }}>help</code> or tap any command chip below to execute.
          </p>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-terminal', handleCustomOpen);
    return () => window.removeEventListener('open-terminal', handleCustomOpen);
  }, []);

  const executeCommandString = (commandStr: string) => {
    const cmd = commandStr.trim().toLowerCase();
    if (!cmd) return;

    // Add to command history list for ArrowUp/ArrowDown navigation
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div style={{ padding: '4px 0' }}>
            <p style={{ color: '#F43F5E', margin: '0 0 8px', fontWeight: 700, fontSize: '0.8rem' }}>Available CLI Commands:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                <b style={{ color: '#38BDF8' }}>bio</b>
                <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>Executive summary & background</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                <b style={{ color: '#FF9900' }}>certs</b>
                <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>AWS, Microsoft & Google credentials</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                <b style={{ color: '#10B981' }}>skills</b>
                <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>AI/ML & Full-Stack technical stack</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                <b style={{ color: '#EC4899' }}>projects</b>
                <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>Featured production systems</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                <b style={{ color: '#A855F7' }}>contact</b>
                <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>Direct contact channels</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                <b style={{ color: '#64748B' }}>clear</b>
                <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>Clear terminal screen</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'bio':
        outputNode = (
          <div style={{ background: 'rgba(56, 189, 248, 0.05)', borderLeft: '3px solid #38BDF8', padding: '10px 14px', borderRadius: '0 8px 8px 0' }}>
            <h4 style={{ color: '#38BDF8', margin: '0 0 4px', fontWeight: 700, fontSize: '0.88rem' }}>Vishal Deep — Software Engineer & AI Specialist</h4>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontSize: '0.78rem' }}>
              MCA candidate in Generative AI at SRM University. Specialist in LLMs, AWS Bedrock, Vertex AI, Agentic Autonomous Workflows, Next.js 16, React 19, and scalable full-stack engineering. Winner at DOMINION 2026 and SRMIST x NITROSTACK Hackathon.
            </p>
          </div>
        );
        break;

      case 'certs':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <p style={{ color: '#FF9900', margin: 0, fontWeight: 700, fontSize: '0.8rem' }}>Verified Credentials & Certifications:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
              <div style={{ background: 'rgba(255,153,0,0.08)', border: '1px solid rgba(255,153,0,0.25)', padding: '8px 12px', borderRadius: 8 }}>
                <span style={{ fontSize: '0.72rem', color: '#FF9900', fontWeight: 700 }}>AWS</span>
                <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: '#ffffff' }}>LLMs & Generative AI</p>
              </div>
              <div style={{ background: 'rgba(0,164,239,0.08)', border: '1px solid rgba(0,164,239,0.25)', padding: '8px 12px', borderRadius: 8 }}>
                <span style={{ fontSize: '0.72rem', color: '#00A4EF', fontWeight: 700 }}>Microsoft</span>
                <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: '#ffffff' }}>AI & ML Engineering</p>
              </div>
              <div style={{ background: 'rgba(66,133,244,0.08)', border: '1px solid rgba(66,133,244,0.25)', padding: '8px 12px', borderRadius: 8 }}>
                <span style={{ fontSize: '0.72rem', color: '#4285F4', fontWeight: 700 }}>Google Cloud</span>
                <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: '#ffffff' }}>Generative AI Leader</p>
              </div>
              <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)', padding: '8px 12px', borderRadius: 8 }}>
                <span style={{ fontSize: '0.72rem', color: '#A855F7', fontWeight: 700 }}>DeepLearning.AI</span>
                <p style={{ margin: '2px 0 0', fontSize: '0.76rem', color: '#ffffff' }}>Advance Deep Learning</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <p style={{ color: '#10B981', margin: '0 0 6px', fontWeight: 700, fontSize: '0.78rem' }}>🧠 AI / ML Stack:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['PyTorch', 'AWS Bedrock', 'SageMaker', 'Vertex AI', 'Agentic AI', 'Prompt Engineering', 'LangChain', 'OpenAI API'].map(s => (
                  <span key={s} style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', padding: '3px 8px', borderRadius: 6, fontSize: '0.70rem' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p style={{ color: '#38BDF8', margin: '0 0 6px', fontWeight: 700, fontSize: '0.78rem' }}>💻 Full-Stack Architecture:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {['Next.js 16', 'React 19', 'TypeScript', 'WebGL (OGL)', 'TailwindCSS', 'Node.js', 'REST & GraphQL', 'Git'].map(s => (
                  <span key={s} style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', color: '#38BDF8', padding: '3px 8px', borderRadius: 6, fontSize: '0.70rem' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ color: '#EC4899', margin: 0, fontWeight: 700, fontSize: '0.78rem' }}>🚀 Featured Engineering Projects:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: 8 }}>
                <span style={{ color: '#EC4899', fontWeight: 700, fontSize: '0.8rem' }}>1. Neural-Craft Portfolio Workstation</span>
                <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.74rem' }}>Next.js 16 + WebGL + Custom AI Co-Pilot & CLI Terminal interface</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: 8 }}>
                <span style={{ color: '#38BDF8', fontWeight: 700, fontSize: '0.8rem' }}>2. Agentic Autonomous AI Pipeline</span>
                <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.74rem' }}>Multi-agent workflow orchestration engine built on AWS Bedrock & PyTorch</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', padding: '8px 12px', borderRadius: 8 }}>
                <span style={{ color: '#10B981', fontWeight: 700, fontSize: '0.8rem' }}>3. Real-Time Speech Analytics Engine</span>
                <p style={{ margin: '2px 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.74rem' }}>Continuous audio evaluation & transcription analysis module</p>
              </div>
            </div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)', padding: '10px 14px', borderRadius: 10 }}>
            <p style={{ color: '#A855F7', margin: '0 0 6px', fontWeight: 700, fontSize: '0.8rem' }}>📬 Direct Contact Channels:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.78rem' }}>
              <span>✉️ Email: <a href="mailto:vishalyep1022@gmail.com" style={{ color: '#38BDF8', textDecoration: 'underline' }}>vishalyep1022@gmail.com</a></span>
              <span>🐙 GitHub: <a href="https://github.com/VishalDeep1377" target="_blank" rel="noopener noreferrer" style={{ color: '#38BDF8', textDecoration: 'underline' }}>github.com/VishalDeep1377</a></span>
              <span>💼 LinkedIn: <a href="https://www.linkedin.com/in/vishal-deep-14a864255/" target="_blank" rel="noopener noreferrer" style={{ color: '#38BDF8', textDecoration: 'underline' }}>linkedin.com/in/vishal-deep</a></span>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p style={{ color: '#EF4444', margin: 0, fontSize: '0.78rem' }}>
            Command not recognized: "{cmd}". Type <code style={{ color: '#38BDF8', background: 'rgba(56,189,248,0.15)', padding: '1px 5px', borderRadius: 4 }}>help</code> for available commands.
          </p>
        );
        break;
    }

    setHistory(prev => [...prev, { command: commandStr, output: outputNode }]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInput(commandHistory[commandHistory.length - 1 - nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <>
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
              background: 'rgba(3, 4, 12, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 720,
                maxWidth: '100%',
                height: 480,
                maxHeight: 'calc(100vh - 80px)',
                background: 'linear-gradient(165deg, #070918 0%, #03040c 100%)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                borderRadius: 18,
                boxShadow: '0 30px 80px rgba(0,0,0,0.95), 0 0 45px rgba(16, 185, 129, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                fontFamily: 'var(--mono)',
                position: 'relative',
              }}
            >
              {/* Scanline overlay effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
                  backgroundSize: '100% 4px',
                  zIndex: 2,
                  opacity: 0.4,
                }}
              />

              {/* Terminal Header */}
              <div
                style={{
                  padding: '10px 16px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 3,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#EF4444', display: 'inline-block', boxShadow: '0 0 8px rgba(239,68,68,0.6)' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#F59E0B', display: 'inline-block', boxShadow: '0 0 8px rgba(245,158,11,0.6)' }} />
                  <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#10B981', display: 'inline-block', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }} />
                  <span style={{ fontSize: '0.74rem', color: '#10B981', marginLeft: 8, fontWeight: 600 }}>
                    vishal@neural-craft:~ $
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: 'none',
                    borderRadius: 6,
                    color: 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    fontSize: 14,
                    padding: '2px 8px',
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Terminal Body */}
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, zIndex: 3 }}>
                {history.map((item, idx) => (
                  <div key={idx}>
                    {item.command !== 'welcome' && (
                      <p style={{ color: '#10B981', margin: '0 0 6px', fontSize: '0.82rem', fontWeight: 600 }}>
                        vishal@neural-craft:~$ <span style={{ color: '#ffffff' }}>{item.command}</span>
                      </p>
                    )}
                    <div style={{ fontSize: '0.78rem' }}>{item.output}</div>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Quick Action Chips Bar */}
              <div
                style={{
                  padding: '6px 12px',
                  background: 'rgba(0,0,0,0.6)',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  gap: 6,
                  overflowX: 'auto',
                  zIndex: 3,
                }}
              >
                {QUICK_COMMANDS.map(chip => (
                  <button
                    key={chip.cmd}
                    onClick={() => executeCommandString(chip.cmd)}
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      borderRadius: 6,
                      color: '#10B981',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--mono)',
                      padding: '3px 8px',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      fontWeight: 600,
                    }}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={e => {
                  e.preventDefault();
                  executeCommandString(input);
                }}
                style={{
                  padding: '10px 14px',
                  background: 'rgba(5, 7, 20, 0.95)',
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 3,
                }}
              >
                <span style={{ color: '#10B981', fontSize: '0.84rem', fontWeight: 700 }}>vishal@neural-craft:~$</span>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type command (use ↑/↓ for history)..."
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.84rem',
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
