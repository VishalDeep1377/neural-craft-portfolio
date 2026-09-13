'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  icon: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Social';
  shortcut?: string;
  perform: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'projects',
      icon: '🚀',
      title: 'Go to Featured Projects',
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
      category: 'Navigation',
      perform: () => {
        window.location.hash = '#skills';
        setIsOpen(false);
      },
    },
    {
      id: 'contact',
      icon: '📬',
      title: 'Go to Contact Section',
      category: 'Navigation',
      perform: () => {
        window.location.hash = '#contact';
        setIsOpen(false);
      },
    },
    {
      id: 'resume',
      icon: '📄',
      title: 'Download Resume PDF',
      category: 'Actions',
      shortcut: 'Download',
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
      title: 'Copy Email (vishalyep1022@gmail.com)',
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
      category: 'Social',
      perform: () => {
        window.open('https://www.linkedin.com/in/vishal-deep-14a864255/', '_blank');
        setIsOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Desktop Floating Trigger (Hidden on Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="desktop-workstation-btn"
        style={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 9999,
          background: 'rgba(10, 10, 24, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 100,
          padding: '8px 14px',
          color: 'rgba(255, 255, 255, 0.85)',
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        <span>🔍 Search</span>
        <kbd style={{ background: 'rgba(255,255,255,0.12)', padding: '2px 5px', borderRadius: 4, fontSize: '0.62rem' }}>Ctrl K</kbd>
      </button>

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-workstation-btn {
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
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '10vh',
              paddingLeft: 12,
              paddingRight: 12,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                width: 580,
                maxWidth: '100%',
                maxHeight: 'calc(100vh - 120px)',
                background: 'rgba(12, 12, 28, 0.96)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 16,
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.15)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Search Bar */}
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 16 }}>🔍</span>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Type a command or search..."
                  autoFocus
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'var(--sans)',
                  }}
                />
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    fontSize: 16,
                    padding: 4,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Toast Message */}
              {copied && (
                <div style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '0.78rem' }}>
                  ✓ Email copied to clipboard!
                </div>
              )}

              {/* Command List */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
                {filteredCommands.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.85rem' }}>
                    No commands matching "{search}"
                  </div>
                ) : (
                  filteredCommands.map(cmd => (
                    <div
                      key={cmd.id}
                      onClick={cmd.perform}
                      style={{
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 16 }}>{cmd.icon}</span>
                        <div>
                          <span style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 500, display: 'block' }}>{cmd.title}</span>
                          <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.4)' }}>{cmd.category}</span>
                        </div>
                      </div>
                      {cmd.shortcut && (
                        <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)' }}>
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '8px 16px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.7rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                <span>Navigate with touch or keyboard</span>
                <span>Neural-Craft v2.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
