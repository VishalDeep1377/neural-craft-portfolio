'use client';

import { motion } from 'framer-motion';

const NAV_LINKS = [
  { href: '#about',          label: 'About',       color: '#818cf8' },
  { href: '#experience',     label: 'Experience',  color: '#34d399' },
  { href: '#projects',       label: 'Projects',    color: '#22d3ee' },
  { href: '#skills',         label: 'Skills',      color: '#a78bfa' },
  { href: '#certifications', label: 'Credentials', color: '#fbbf24' },
  { href: '#contact',        label: 'Contact',     color: '#fb7185' },
];

const SOCIAL_LINKS = [
  { label: 'GitHub',   href: 'https://github.com/VishalDeep1377',           color: '#a78bfa' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishal-deep-14a864255/', color: '#38bdf8' },
  { label: 'Email',    href: 'mailto:vishalyep1022@gmail.com',              color: '#34d399' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      position: 'relative',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      background: 'linear-gradient(180deg, rgba(6,7,14,0.4) 0%, rgba(4,4,10,0.95) 100%)',
      padding: '48px 24px 36px',
      overflow: 'hidden',
    }}>
      {/* Background radial ambient glow */}
      <div style={{
        position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', filter: 'blur(60px)',
      }} />

      <div style={{
        maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: 36,
      }}>

        {/* Top Row: Brand & Back-to-top */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 20,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <motion.div
              whileHover={{ rotate: 15, scale: 1.08 }}
              style={{
                position: 'relative', width: 42, height: 42, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', flexShrink: 0,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: '-50%',
                  background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #ec4899, #22d3ee, #6366f1)',
                  borderRadius: '50%',
                }}
              />
              <div style={{ position: 'absolute', inset: 2, borderRadius: 12, background: '#0a0a16' }} />
              <span style={{
                position: 'relative', zIndex: 1, fontFamily: 'var(--mono)',
                fontWeight: 800, fontSize: '.8rem',
                background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>VD</span>
            </motion.div>

            <div>
              <p style={{
                fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1rem',
                color: '#fff', letterSpacing: '-0.01em',
              }}>Vishal Deep</p>
              <p style={{
                fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'rgba(255,255,255,0.45)',
                marginTop: 2,
              }}>Generative AI & Full Stack Engineer · Chennai, India</p>
            </div>
          </div>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 100,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--mono)', fontSize: '.72rem',
              cursor: 'pointer', outline: 'none',
              backdropFilter: 'blur(12px)',
            }}
          >
            Back to Top
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6" />
            </svg>
          </motion.button>
        </div>

        {/* Middle Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

        {/* Middle Row: Navigation Links & Social Pills */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 24,
        }}>
          {/* Nav links */}
          <nav style={{
            display: 'flex', alignItems: 'center', gap: 'clamp(12px, 3vw, 24px)',
            flexWrap: 'wrap', justifyContent: 'center',
          }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--mono)', fontSize: '.78rem',
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
                  transition: 'color 0.2s', padding: '4px 0',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = link.color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  fontFamily: 'var(--mono)', fontSize: '.7rem',
                  padding: '6px 14px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: s.color, textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
              >
                {s.label} ↗
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12, paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'rgba(255,255,255,0.4)',
          }}>
            © {new Date().getFullYear()} Vishal Deep. All rights reserved.
          </p>
          <p style={{
            fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'rgba(255,255,255,0.35)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
            Built with Next.js 16 & Framer Motion
          </p>
        </div>

      </div>
    </footer>
  );
}
