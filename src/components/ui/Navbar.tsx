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
  // Lock body scroll when open
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
              background: 'rgba(4,4,14,0.75)',
              backdropFilter: 'blur(4px)',
            }}
          />
          {/* Drawer panel */}
          <motion.div
            initial={{ y: -24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 88, // below navbar
              left: 16, right: 16,
              zIndex: 9998,
              borderRadius: 22,
              background: 'rgba(8,8,20,0.97)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(32px) saturate(180%)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(99,102,241,0.15)',
              overflow: 'hidden',
              padding: '8px 12px 20px',
            }}
          >
            {/* Shimmer top bar */}
            <motion.div
              initial={{ backgroundPosition: '0% 0%' }}
              animate={{ backgroundPosition: '200% 0%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                height: 2, marginBottom: 12,
                backgroundImage: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(168,85,247,0.8), rgba(34,211,238,0.8), transparent)',
                backgroundSize: '200% 100%',
                borderRadius: 99,
              }}
            />

            {/* Header info bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '6px 12px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)',
              marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="dot-live" style={{ width: 5, height: 5 }} />
                <span style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'rgba(255,255,255,0.5)' }}>
                  Chennai, India
                </span>
              </div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', color: '#6366f1', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                AI-Lab Navigation
              </span>
            </div>

            {/* React Bits LineSidebar Navigation */}
            <div style={{ padding: '8px 16px 12px' }}>
              <LineSidebar
                items={LINKS.map(l => l.label)}
                accentColor="#818cf8"
                textColor="rgba(255,255,255,0.7)"
                markerColor="rgba(255,255,255,0.2)"
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
                fontSize={0.95}
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
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '10px 4px' }} />

            {/* Resume + Social Pills */}
            <div style={{ padding: '4px 4px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <a href="https://github.com/VishalDeep1377" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '4px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>GitHub ↗</a>
                <a href="https://www.linkedin.com/in/vishal-deep-14a864255/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '4px 10px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>LinkedIn ↗</a>
              </div>

              <motion.a
                href="/vishal_resume.pdf" download
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 14,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff', fontFamily: 'var(--sans)', fontSize: '.88rem', fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 28px rgba(99,102,241,0.45)',
                }}
              >
                Download Resume ↗
              </motion.a>
            </div>
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
      // close drawer on scroll
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

                {/* Name — hide on very small screens */}
                {!isMobile && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5, lineHeight: 1 }}>
                    <span style={{
                      fontFamily: 'var(--sans)', fontSize: '0.85rem', fontWeight: 700,
                      letterSpacing: '-0.02em',
                      background: 'linear-gradient(120deg, #f1f0ff, #c4b5fd)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                      whiteSpace: 'nowrap',
                    }}>Vishal Deep</span>
                    <span style={{
                      fontFamily: 'var(--mono)', fontSize: '0.5rem', letterSpacing: '0.16em',
                      textTransform: 'uppercase', color: 'rgba(167,139,250,0.7)', whiteSpace: 'nowrap',
                    }}>Software · AI</span>
                  </div>
                )}
                {/* Show name on mobile in compact form */}
                {isMobile && (
                  <span style={{
                    fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 700,
                    background: 'linear-gradient(120deg, #f1f0ff, #c4b5fd)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    whiteSpace: 'nowrap',
                  }}>Vishal Deep</span>
                )}
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