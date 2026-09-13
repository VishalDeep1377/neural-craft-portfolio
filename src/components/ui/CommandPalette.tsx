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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      title: 'Copy Email to Clipboard (vishalyep1022@gmail.com)',
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
      {/* Navbar Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: 20,
          right: 180,
          zIndex: 99,
          background: 'rgba(10, 10, 24, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 8,
          padding: '6px 12px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'var(--mono)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          backdropFilter: 'blur(12px)',
        }}
      >
        <span>🔍 Search</span>
        <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, fontSize: '0.65rem' }}>Ctrl K</kbd>
      </button>

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
              paddingTop: '15vh',
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(12px)',
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
                width: 600,
                maxWidth: '90vw',
                background: 'rgba(12, 12, 28, 0.96)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: 16,
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.15)',
                overflow: 'hidden',
              }}
            >
              {/* Search Bar */}
              <div
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 18 }}>🔍</span>
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
                    fontSize: '1rem',
                    outline: 'none',
                    fontFamily: 'var(--sans)',
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'var(--mono)' }}>ESC to close</span>
              </div>

              {/* Toast Message */}
              {copied && (
                <div style={{ padding: '8px 20px', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981', fontSize: '0.8rem' }}>
                  ✓ Email copied to clipboard!
                </div>
              )}

              {/* Command List */}
              <div style={{ maxHeight: 360, overflowY: 'auto', padding: '10px 0' }}>
                {filteredCommands.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem' }}>
                    No commands matching "{search}"
                  </div>
                ) : (
                  filteredCommands.map(cmd => (
                    <div
                      key={cmd.id}
                      onClick={cmd.perform}
                      style={{
                        padding: '12px 20px',
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 18 }}>{cmd.icon}</span>
                        <div>
                          <span style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 500 }}>{cmd.title}</span>
                          <span style={{ display: 'block', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.4)' }}>{cmd.category}</span>
                        </div>
                      </div>
                      {cmd.shortcut && (
                        <kbd style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: 4, fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>
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
                  padding: '10px 20px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                <span>Navigate with mouse or keyboard</span>
                <span>Neural-Craft Workstation v2.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
