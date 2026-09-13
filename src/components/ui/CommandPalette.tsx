'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  category: 'Navigation' | 'Actions' | 'Social';
  shortcut?: string;
  perform: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = [
    {
      id: 'projects',
      icon: '🚀',
      title: 'Go to Featured Projects',
      description: 'Explore full-stack AI workstations & live demos',
      category: 'Navigation',
      shortcut: '↵',
      perform: () => {
        window.location.hash = '#projects';
        setIsOpen(false);
      },
    },
    {
      id: 'certifications',
      icon: '📜',
      title: 'Go to Verified Certifications',
      description: 'AWS, Microsoft, and Google Cloud credentials',
      category: 'Navigation',
      perform: () => {
        window.location.hash = '#certifications';
        setIsOpen(false);
      },
    },
    {
      id: 'skills',
      icon: '🛠️',
      title: 'Go to Skills & Tech Stack',
      description: 'Inspect PyTorch, Bedrock, React 19 & Next.js stack',
      category: 'Navigation',
      perform: () => {
        window.location.hash = '#skills';
        setIsOpen(false);
      },
    },
    {
      id: 'experience',
      icon: '💼',
      title: 'Go to Work Experience',
      description: 'Software engineering roles & hackathon achievements',
      category: 'Navigation',
      perform: () => {
        window.location.hash = '#experience';
        setIsOpen(false);
      },
    },
    {
      id: 'contact',
      icon: '📬',
      title: 'Go to Contact Section',
      description: 'Send direct messages or job inquiries',
      category: 'Navigation',
      perform: () => {
        window.location.hash = '#contact';
        setIsOpen(false);
      },
    },
    {
      id: 'terminal',
      icon: '💻',
      title: 'Launch CLI Terminal Drawer',
      description: 'Open retro cyberpunk workstation command prompt',
      category: 'Actions',
      shortcut: '$ CLI',
      perform: () => {
        setIsOpen(false);
        setTimeout(() => window.dispatchEvent(new Event('open-terminal')), 100);
      },
    },
    {
      id: 'ai-copilot',
      icon: '🤖',
      title: 'Launch Vishal-AI Co-Pilot',
      description: 'Chat with AI assistant about skills & background',
      category: 'Actions',
      shortcut: 'AI Chat',
      perform: () => {
        setIsOpen(false);
        setTimeout(() => window.dispatchEvent(new Event('open-ai-chat')), 100);
      },
    },
    {
      id: 'resume',
      icon: '📄',
      title: 'Download Resume PDF',
      description: 'Get verified PDF copy of Vishal Deep resume',
      category: 'Actions',
      shortcut: 'PDF',
      perform: () => {
        const link = document.createElement('a');
        link.href = '/vishal_resume.pdf';
        link.download = 'Vishal_Deep_Resume.pdf';
        link.click();
        setIsOpen(false);
      },
    },
    {
      id: 'copy-email',
      icon: '✉️',
      title: 'Copy Direct Email',
      description: 'vishalyep1022@gmail.com',
      category: 'Actions',
      perform: () => {
        navigator.clipboard.writeText('vishalyep1022@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: 'github',
      icon: '🐙',
      title: 'Open GitHub Profile',
      description: 'github.com/VishalDeep1377',
      category: 'Social',
      perform: () => {
        window.open('https://github.com/VishalDeep1377', '_blank');
        setIsOpen(false);
      },
    },
    {
      id: 'linkedin',
      icon: '💼',
      title: 'Open LinkedIn Profile',
      description: 'linkedin.com/in/vishal-deep',
      category: 'Social',
      perform: () => {
        window.open('https://www.linkedin.com/in/vishal-deep-14a864255/', '_blank');
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(c => {
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    const matchesQuery =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [search, activeCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }

      if (isOpen && filteredCommands.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev < filteredCommands.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredCommands.length - 1));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const target = filteredCommands[selectedIndex];
          if (target) target.perform();
        }
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen, filteredCommands, selectedIndex]);

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
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '8vh',
              paddingLeft: 12,
              paddingRight: 12,
              background: 'rgba(3, 4, 14, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 640,
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 100px)',
                background: 'linear-gradient(165deg, rgba(14, 16, 32, 0.98) 0%, rgba(8, 9, 22, 0.99) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 20,
                boxShadow: '0 30px 90px rgba(0, 0, 0, 0.95), 0 0 50px rgba(99, 102, 241, 0.25)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Shimmer top bar */}
              <motion.div
                initial={{ backgroundPosition: '0% 0%' }}
                animate={{ backgroundPosition: '200% 0%' }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                  height: 3,
                  backgroundImage: 'linear-gradient(90deg, #38BDF8, #6366F1, #EC4899, #10B981, #38BDF8)',
                  backgroundSize: '200% 100%',
                }}
              />

              {/* Search Bar Input */}
              <div
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 18, color: '#6366F1' }}>🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Type a command or search sections..."
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '0.96rem',
                    outline: 'none',
                    fontFamily: 'var(--sans)',
                    fontWeight: 500,
                  }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: 8,
                    color: 'rgba(255, 255, 255, 0.6)',
                    cursor: 'pointer',
                    fontSize: 12,
                    padding: '4px 8px',
                    fontFamily: 'var(--mono)',
                  }}
                >
                  ESC
                </button>
              </div>

              {/* Category Filter Pills */}
              <div style={{ padding: '8px 16px', display: 'flex', gap: 6, background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {['All', 'Navigation', 'Actions', 'Social'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: activeCategory === cat ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'rgba(255,255,255,0.05)',
                      border: activeCategory === cat ? 'none' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 100,
                      padding: '4px 12px',
                      color: activeCategory === cat ? '#ffffff' : 'rgba(255,255,255,0.6)',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--mono)',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Toast Notification */}
              {copied && (
                <div style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '0.78rem', fontFamily: 'var(--mono)', borderBottom: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  ✓ Email copied to clipboard!
                </div>
              )}

              {/* Command List */}
              <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: '8px 0', maxHeight: 360 }}>
                {filteredCommands.length === 0 ? (
                  <div style={{ padding: '30px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
                    No results matching "{search}"
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={cmd.id}
                        onClick={cmd.perform}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        style={{
                          padding: '10px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          background: isSelected ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.1))' : 'transparent',
                          borderLeft: isSelected ? '3px solid #6366F1' : '3px solid transparent',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <span style={{ fontSize: 18, filter: isSelected ? 'drop-shadow(0 0 8px rgba(99,102,241,0.8))' : 'none' }}>
                            {cmd.icon}
                          </span>
                          <div>
                            <span style={{ fontSize: '0.88rem', color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.85)', fontWeight: isSelected ? 700 : 500, display: 'block' }}>
                              {cmd.title}
                            </span>
                            <span style={{ fontSize: '0.70rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                              {cmd.description}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: '0.62rem', color: 'rgba(99, 102, 241, 0.9)', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>
                            {cmd.category}
                          </span>
                          {cmd.shortcut && (
                            <kbd style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', padding: '2px 7px', borderRadius: 4, fontSize: '0.65rem', color: '#ffffff', fontFamily: 'var(--mono)' }}>
                              {cmd.shortcut}
                            </kbd>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer status bar */}
              <div
                style={{
                  padding: '8px 18px',
                  background: 'rgba(5, 7, 20, 0.95)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.68rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontFamily: 'var(--mono)',
                }}
              >
                <span>Use <strong style={{ color: '#38BDF8' }}>↑ ↓</strong> to navigate • <strong style={{ color: '#38BDF8' }}>↵</strong> to select</span>
                <span style={{ color: '#6366F1' }}>Neural-Craft Spotlight v3.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
