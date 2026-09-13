'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<'error' | 'override' | 'granted'>('error');
  const [pct, setPct] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // Progress interval (0% to 100%)
    let currentPct = 0;
    const interval = setInterval(() => {
      currentPct += Math.random() * 14 + 6;
      if (currentPct >= 100) {
        currentPct = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLaunching(true);
          setTimeout(onDone, 450);
        }, 600);
      }
      setPct(Math.min(Math.floor(currentPct), 100));

      if (currentPct > 30 && currentPct < 70) {
        setPhase('override');
      } else if (currentPct >= 70) {
        setPhase('granted');
      }
    }, 110);

    return () => clearInterval(interval);
  }, [onDone]);

  const handleManualLaunch = () => {
    setIsLaunching(true);
    setTimeout(onDone, 300);
  };

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(16px, 4vw, 36px)',
          background: phase === 'error'
            ? 'radial-gradient(circle at 50% 40%, #170909 0%, #050202 100%)'
            : phase === 'override'
            ? 'radial-gradient(circle at 50% 40%, #0c0a1d 0%, #030208 100%)'
            : 'radial-gradient(circle at 50% 40%, #061517 0%, #020708 100%)',
          color: '#f8fafc',
          userSelect: 'none',
          overflow: 'hidden',
          transition: 'background 0.5s ease',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background Cyber Dotted Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            opacity: phase === 'error' ? 0.12 : 0.2,
            backgroundImage: `radial-gradient(${
              phase === 'error' ? 'rgba(239, 68, 68, 0.4)' : phase === 'override' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(34, 211, 238, 0.4)'
            } 1.5px, transparent 1px)`,
            backgroundSize: '28px 28px',
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Top Terminal Status Header */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '100%',
            maxWidth: 720,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
            borderBottom: `1px solid ${
              phase === 'error' ? 'rgba(239, 68, 68, 0.2)' : phase === 'override' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(34, 211, 238, 0.2)'
            }`,
            paddingBottom: 12,
            gap: 12,
            transition: 'border-color 0.4s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: phase === 'error' ? '#ef4444' : phase === 'override' ? '#a855f7' : '#34d399',
                boxShadow: `0 0 10px ${phase === 'error' ? '#ef4444' : phase === 'override' ? '#a855f7' : '#34d399'}`,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 'clamp(0.65rem, 2.5vw, 0.75rem)',
                letterSpacing: '.18em',
                color: phase === 'error' ? '#f87171' : phase === 'override' ? '#c084fc' : '#34d399',
                fontWeight: 700,
                textTransform: 'uppercase',
              }}
            >
              {phase === 'error' ? 'SYSTEM ERROR: 404' : phase === 'override' ? 'SYSTEM OVERRIDE' : 'STATUS: ONLINE'}
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 'clamp(0.6rem, 2.2vw, 0.72rem)',
              color: '#94a3b8',
              letterSpacing: '.08em',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span style={{ color: '#64748b' }}>SYS:</span>
            <span style={{ color: '#22d3ee', fontWeight: 600 }}>VD-2026</span>
          </div>
        </motion.div>

        {/* Central Display Card (100% Mobile Centered) */}
        <div
          style={{
            margin: 'auto 0',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            width: '100%',
            maxWidth: 600,
            padding: '24px 16px',
          }}
        >
          <motion.div
            key={phase}
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 'clamp(20px, 5vw, 36px) clamp(16px, 4vw, 32px)',
              borderRadius: 24,
              background: 'rgba(15, 23, 42, 0.75)',
              border: `1px solid ${
                phase === 'error'
                  ? 'rgba(239, 68, 68, 0.3)'
                  : phase === 'override'
                  ? 'rgba(168, 85, 247, 0.3)'
                  : 'rgba(52, 211, 153, 0.3)'
              }`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
              transition: 'border-color 0.4s ease',
            }}
          >
            {/* Warning / Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 100,
                background:
                  phase === 'error'
                    ? 'rgba(239, 68, 68, 0.12)'
                    : phase === 'override'
                    ? 'rgba(168, 85, 247, 0.15)'
                    : 'rgba(52, 211, 153, 0.15)',
                border: `1px solid ${
                  phase === 'error'
                    ? 'rgba(239, 68, 68, 0.35)'
                    : phase === 'override'
                    ? 'rgba(168, 85, 247, 0.4)'
                    : 'rgba(52, 211, 153, 0.4)'
                }`,
                marginBottom: 18,
              }}
            >
              <span
                style={{
                  color: phase === 'error' ? '#f87171' : phase === 'override' ? '#c084fc' : '#34d399',
                  fontSize: 'clamp(0.68rem, 2.5vw, 0.78rem)',
                  fontFamily: 'var(--mono)',
                  fontWeight: 700,
                  letterSpacing: '.06em',
                }}
              >
                {phase === 'error' && '⚠️ 404 — ROUTE NOT FOUND'}
                {phase === 'override' && '⚡ INITIATING SYSTEM OVERRIDE'}
                {phase === 'granted' && '✓ ACCESS GRANTED'}
              </span>
            </div>

            {/* Main Title / Glitch Text */}
            <h1
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 'clamp(1.6rem, 5.5vw, 2.75rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: phase === 'error' ? '#ef4444' : phase === 'override' ? '#e9d5ff' : '#ffffff',
                marginBottom: 10,
                wordBreak: 'break-word',
              }}
            >
              {phase === 'error' && '404_NOT_FOUND'}
              {phase === 'override' && 'BYPASSING_LOGS...'}
              {phase === 'granted' && 'VISHAL DEEP'}
            </h1>

            {/* Subtitle Description */}
            <p
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 'clamp(0.8rem, 2.8vw, 0.95rem)',
                color: 'rgba(255, 255, 255, 0.65)',
                maxWidth: 420,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {phase === 'error' && 'The requested URL /portfolio was not found on this server.'}
              {phase === 'override' && 'Decrypting core assets and initializing security protocols...'}
              {phase === 'granted' && 'Software Engineer & AI Architect · Chennai, India'}
            </p>
          </motion.div>
        </div>

        {/* Bottom Progress Bar & Launch Controls */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{
            width: '100%',
            maxWidth: 480,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
            zIndex: 10,
          }}
        >
          {/* Progress Indicator */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div
              style={{
                height: 5,
                width: '100%',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: 10,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <motion.div
                style={{
                  height: '100%',
                  borderRadius: 10,
                  width: `${pct}%`,
                  background:
                    phase === 'error'
                      ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                      : phase === 'override'
                      ? 'linear-gradient(90deg, #ef4444 0%, #a855f7 100%)'
                      : 'linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #34d399 100%)',
                  boxShadow: `0 0 12px ${phase === 'error' ? '#ef4444' : phase === 'override' ? '#a855f7' : '#34d399'}`,
                  transition: 'width 0.12s linear, background 0.4s ease',
                }}
              />
            </div>

            <div
              style={{
                fontFamily: 'var(--mono)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 'clamp(0.62rem, 2.2vw, 0.7rem)',
                color: '#94a3b8',
              }}
            >
              <span style={{ letterSpacing: '.1em', textTransform: 'uppercase' }}>
                {isLaunching
                  ? 'LAUNCHING PORTFOLIO...'
                  : phase === 'error'
                  ? 'INTERCEPTING ROUTE...'
                  : phase === 'override'
                  ? 'OVERRIDE PROGRESS'
                  : 'INITIALIZATION COMPLETE'}
              </span>
              <span
                style={{
                  color: phase === 'error' ? '#f87171' : phase === 'override' ? '#c084fc' : '#34d399',
                  fontWeight: 700,
                }}
              >
                {pct}%
              </span>
            </div>
          </div>

          {/* Quick Override Button */}
          <button
            onClick={handleManualLaunch}
            style={{
              fontFamily: 'var(--mono)',
              padding: '10px 24px',
              borderRadius: 100,
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#f8fafc',
              fontSize: 'clamp(0.68rem, 2.4vw, 0.75rem)',
              fontWeight: 600,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>SKIP TO PORTFOLIO</span>
            <span>→</span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
