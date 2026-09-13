'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import LineSidebar from '@/components/ui/LineSidebar';

const LINKS = [
  { href: '#about',          label: 'About',       color: '#818cf8', glow: 'rgba(129,140,248,0.5)' },
  { href: '#experience',     label: 'Work',         color: '#34d399', glow: 'rgba(52,211,153,0.5)'  },
  { href: '#projects',       label: 'Projects',     color: '#22d3ee', glow: 'rgba(34,211,238,0.5)'  },
  { href: '#skills',         label: 'Skills',       color: '#a78bfa', glow: 'rgba(167,139,250,0.5)' },
  { href: '#certifications', label: 'Credentials',  color: '#fbbf24', glow: 'rgba(251,191,36,0.5)'  },
  { href: '#contact',        label: 'Contact',      color: '#fb7185', glow: 'rgba(251,113,133,0.5)'  },
];

/* ── Magnetic desktop link ── */
function MagneticLink({ href, label, color, glow, index, onClick }: {
  href: string; label: string; color: string; glow: string; index: number; onClick?: () => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    y.set((e.clientY - (rect.top  + rect.height / 2)) * 0.25);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ x: sx, y: sy, textDecoration: 'none', position: 'relative' }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute', inset: '-2px -10px', borderRadius: 100,
              background: `${color}18`, border: `1px solid ${color}44`,
              boxShadow: `0 0 20px ${glow}, inset 0 0 12px ${color}10`, zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>
      <span style={{
        position: 'relative', zIndex: 1, fontFamily: 'var(--mono)',
        fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em',
        color: hovered ? color : 'rgba(241,240,255,0.55)',
        transition: 'color 0.2s ease', display: 'block',
        padding: '7px 14px', whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="dot"
            initial={{ opacity: 0, scale: 0, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              position: 'absolute', bottom: '0px', left: '50%',
              transform: 'translateX(-50%)', width: 4, height: 4,
              borderRadius: '50%', background: color, boxShadow: `0 0 8px ${glow}`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.a>
  );
}

/* ── Hamburger icon ── */
function Hamburger({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      aria-label={open ? 'Close menu' : 'Open menu'}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 12, width: 40, height: 40,
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 5,
        cursor: 'pointer', padding: 0, flexShrink: 0,
      }}
    >
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          animate={
            open
              ? i === 0 ? { rotate: 45,  y: 9, width: 18 }
              : i === 1 ? { opacity: 0, scaleX: 0 }
              : { rotate: -45, y: -9, width: 18 }
              : { rotate: 0, y: 0, opacity: 1, scaleX: 1, width: i === 1 ? 12 : 18 }
          }
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'block', height: 1.5, borderRadius: 99,
            background: 'rgba(255,255,255,0.75)',
            transformOrigin: 'center',
          }}
        />
      ))}
    </motion.button>
  );
}

/* ── Mobile Drawer ── */
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9997,
              background: 'rgba(4, 4, 16, 0.82)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 84,
              left: 16, right: 16,
              zIndex: 9998,
              borderRadius: 24,
              background: 'linear-gradient(165deg, rgba(14, 16, 32, 0.96) 0%, rgba(8, 9, 20, 0.98) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.25)',
              backdropFilter: 'blur(36px) saturate(200%)',
              boxShadow: '0 30px 90px rgba(0, 0, 0, 0.9), 0 0 50px rgba(99, 102, 241, 0.25)',
              overflow: 'hidden',
              padding: '10px 14px 22px',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
            }}
          >
            {/* Shimmer top bar */}
            <motion.div
              initial={{ backgroundPosition: '0% 0%' }}
              animate={{ backgroundPosition: '200% 0%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                height: 3, marginBottom: 12,
                backgroundImage: 'linear-gradient(90deg, #38BDF8, #6366F1, #EC4899, #10B981, #38BDF8)',
                backgroundSize: '200% 100%',
                borderRadius: 99,
              }}
            />

            {/* Monogram & Title Header */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 8px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)',
                marginBottom: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Monogram Badge */}
                <div style={{
                  position: 'relative', width: 34, height: 34, borderRadius: 10,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.75rem', color: '#ffffff',
                  boxShadow: '0 0 15px rgba(99,102,241,0.5)',
                }}>
                  VD
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '0.85rem', color: '#ffffff', fontWeight: 700 }}>Vishal Deep</h4>
                  <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--mono)' }}>SRM University · Generative AI</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: 100, border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                <span className="dot-live" style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%' }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', color: '#10B981', fontWeight: 600 }}>Active</span>
              </div>
            </motion.div>

            {/* ── AI-Lab Interactive Tools ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ margin: '4px 2px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <div style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', color: 'rgba(167, 139, 250, 0.9)', textTransform: 'uppercase', letterSpacing: '.14em', paddingLeft: 4, fontWeight: 700 }}>
                ⚡ Workstation Tools & AI
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                {/* Search Card */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onClose();
                    window.dispatchEvent(new Event('open-command-palette'));
                  }}
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 14,
                    padding: '12px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    color: '#ffffff',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  }}
                >
                  <span style={{ fontSize: 20 }}>🔍</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 700 }}>Search</span>
                  <span style={{ fontSize: '0.56rem', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: 4 }}>Ctrl K</span>
                </motion.button>

                {/* Terminal CLI Card */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onClose();
                    window.dispatchEvent(new Event('open-terminal'));
                  }}
                  style={{
                    background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.12), rgba(16, 185, 129, 0.04))',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    borderRadius: 14,
                    padding: '12px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    color: '#10B981',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.15)',
                  }}
                >
                  <span style={{ fontSize: 20 }}>💻</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 700 }}>CLI</span>
                  <span style={{ fontSize: '0.56rem', color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '1px 5px', borderRadius: 4 }}>$ vishal</span>
                </motion.button>

                {/* Vishal-AI Co-Pilot Card */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onClose();
                    window.dispatchEvent(new Event('open-ai-chat'));
                  }}
                  style={{
                    background: 'linear-gradient(145deg, rgba(56, 189, 248, 0.12), rgba(56, 189, 248, 0.04))',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    borderRadius: 14,
                    padding: '12px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    color: '#38BDF8',
                    boxShadow: '0 4px 15px rgba(56, 189, 248, 0.15)',
                  }}
                >
                  <span style={{ fontSize: 20 }}>🤖</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 700 }}>AI Co-Pilot</span>
                  <span style={{ fontSize: '0.56rem', color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 5px', borderRadius: 4 }}>Online</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', margin: '4px 2px 10px' }} />

            {/* React Bits LineSidebar Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ padding: '2px 12px 12px' }}
            >
              <LineSidebar
                items={LINKS.map(l => l.label)}
                accentColor="#818cf8"
                textColor="rgba(255,255,255,0.85)"
                markerColor="rgba(255,255,255,0.3)"
                showIndex={true}
                showMarker={true}
                proximityRadius={90}
                maxShift={20}
                falloff="smooth"
                markerLength={32}
                markerGap={10}
                tickScale={0.5}
                scaleTick={true}
                itemGap={14}
                fontSize={0.98}
                smoothing={80}
                onItemClick={(index: number) => {
                  const targetLink = LINKS[index];
                  if (targetLink) {
                    onClose();
                    const el = document.querySelector(targetLink.href);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
              />
            </motion.div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', margin: '10px 2px' }} />

            {/* Resume + Social Pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ padding: '2px 2px', display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <a href="https://github.com/VishalDeep1377" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: '#ffffff', textDecoration: 'none', padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', fontWeight: 600 }}>GitHub ↗</a>
                <a href="https://www.linkedin.com/in/vishal-deep-14a864255/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: '#ffffff', textDecoration: 'none', padding: '6px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', fontWeight: 600 }}>LinkedIn ↗</a>
              </div>

              <motion.a
                href="/vishal_resume.pdf" download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  position: 'relative',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '13px 24px', borderRadius: 16,
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6, #EC4899)',
                  color: '#fff', fontFamily: 'var(--sans)', fontSize: '.92rem', fontWeight: 800,
                  textDecoration: 'none',
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.5), inset 0 1px 1px rgba(255,255,255,0.3)',
                  overflow: 'hidden',
                }}
              >
                <motion.span
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  style={{
                    position: 'absolute', top: 0, bottom: 0, width: '40%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)',
                    transform: 'skewX(-15deg)', pointerEvents: 'none',
                  }}
                />
                Download Resume PDF ↗
              </motion.a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Main Navbar ── */
export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y   = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 40);
      setScrollPct(max > 0 ? (y / max) * 100 : 0);
      setIsVisible(y < lastScrollY.current || y < 80);
      lastScrollY.current = y;
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            key="navbar"
            initial={{ y: -90, opacity: 0, x: '-50%' }}
            animate={{ y: 0,   opacity: 1, x: '-50%' }}
            exit={{ y: -90, opacity: 0, x: '-50%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: 18, left: '50%', zIndex: 9999,
              width: 'min(1180px, calc(100vw - 32px))',
            }}
          >
            {/* Outer glow */}
            <motion.div
              animate={{ opacity: scrolled ? 0.6 : 0.3 }}
              transition={{ duration: 0.6 }}
              style={{
                position: 'absolute', inset: '-2px', borderRadius: 24,
                background: 'linear-gradient(135deg, rgba(99,102,241,0.35), rgba(139,92,246,0.2), rgba(34,211,238,0.2))',
                filter: 'blur(12px)', pointerEvents: 'none', zIndex: -1,
              }}
            />

            {/* Bar */}
            <div style={{
              position: 'relative',
              height: isMobile ? 58 : 64,
              display: 'flex', alignItems: 'center',
              padding: isMobile ? '0 10px 0 10px' : '0 8px 0 10px',
              borderRadius: 22,
              background: scrolled ? 'rgba(8, 10, 18, 0.92)' : 'rgba(12, 14, 22, 0.78)',
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(28px) saturate(180%)',
              overflow: 'hidden',
            }}>

              {/* Shimmer sweep */}
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(139,92,246,0.9), rgba(34,211,238,0.8), transparent)',
                  pointerEvents: 'none',
                }}
              />

              {/* Progress bar */}
              <motion.div style={{
                position: 'absolute', bottom: 0, left: 0, height: '1.5px',
                width: `${scrollPct}%`,
                background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #22d3ee)',
                boxShadow: '0 0 10px rgba(99,102,241,0.8)',
              }} />

              {/* Brand */}
              <motion.a
                href="#hero"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', flexShrink: 0,
                  marginRight: isMobile ? 'auto' : 14,
                }}
              >
                {/* VD monogram */}
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                  style={{
                    position: 'relative', width: 36, height: 36, borderRadius: 11,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, overflow: 'hidden',
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{
                      position: 'absolute', inset: '-50%',
                      background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #ec4899, #22d3ee, #6366f1)',
                      borderRadius: '50%',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 2, borderRadius: 9,
                    background: 'linear-gradient(135deg, #1e1b35, #0f0f1e)',
                  }} />
                  <span style={{
                    position: 'relative', zIndex: 1,
                    fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 800,
                    letterSpacing: '-0.04em',
                    background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>VD</span>
                </motion.div>

                {/* Name */}
                <span style={{
                  fontFamily: 'var(--sans)', fontSize: '0.85rem', fontWeight: 700,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(120deg, #f1f0ff, #c4b5fd)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  whiteSpace: 'nowrap',
                }}>Vishal Deep</span>
              </motion.a>

              {/* Desktop: separator + links + badges */}
              {!isMobile && (
                <>
                  <motion.div
                    initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    style={{
                      width: 1, height: 28, flexShrink: 0, marginRight: 10,
                      background: 'linear-gradient(to bottom, transparent, rgba(167,139,250,0.3), transparent)',
                    }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0, flex: 1 }}>
                    {LINKS.map((link, i) => <MagneticLink key={link.href} {...link} index={i} />)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 12, flexShrink: 0 }}>
                    {/* Open to work badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
                      whileHover={{ scale: 1.06 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 7,
                        padding: '6px 14px', borderRadius: 100,
                        background: 'linear-gradient(135deg, rgba(52,211,153,0.10), rgba(34,197,94,0.06))',
                        border: '1px solid rgba(52,211,153,0.25)',
                        boxShadow: '0 0 20px rgba(52,211,153,0.10)',
                        cursor: 'default',
                      }}
                    >
                      <span className="dot-live" style={{ width: 6, height: 6, boxShadow: '0 0 10px var(--emerald)' }} />
                      <span style={{
                        fontFamily: 'var(--mono)', fontSize: '0.60rem', color: 'var(--emerald)',
                        letterSpacing: '0.06em', whiteSpace: 'nowrap',
                      }}>Open to work</span>
                    </motion.div>
                    {/* Resume CTA */}
                    <motion.a
                      href="/vishal_resume.pdf" download
                      initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      style={{
                        position: 'relative', display: 'flex', alignItems: 'center', gap: 5,
                        padding: '8px 20px', borderRadius: 100, textDecoration: 'none',
                        fontFamily: 'var(--sans)', fontSize: '0.76rem', fontWeight: 600, color: '#fff',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        boxShadow: '0 4px 20px rgba(99,102,241,0.45), inset 0 1px 1px rgba(255,255,255,0.2)',
                        whiteSpace: 'nowrap', overflow: 'hidden',
                      }}
                    >
                      <motion.span
                        animate={{ x: ['-150%', '150%'] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                        style={{
                          position: 'absolute', top: 0, bottom: 0, width: '40%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)',
                          transform: 'skewX(-15deg)', pointerEvents: 'none',
                        }}
                      />
                      Resume <span style={{ fontSize: '0.85rem', opacity: 0.9 }}>↗</span>
                    </motion.a>
                  </div>
                </>
              )}

              {/* Mobile: hamburger */}
              {isMobile && (
                <Hamburger open={mobileOpen} onClick={() => setMobileOpen(p => !p)} />
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Mobile slide-down drawer */}
      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}