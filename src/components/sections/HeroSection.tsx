'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const ROLES = ['Software Engineer', 'Full Stack Developer', 'AI Systems Enthusiast'];

function GithubSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 23.227 23.2 22.271V1.729C23.2.774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const fadeUp = (delay = 0) => shouldReduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.01 } }
    : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } };

  const socials = [
    {
      href: 'https://github.com/VishalDeep1377',
      icon: <GithubSVG />,
      label: 'GitHub',
      hoverColor: '#ffffff',
      hoverGlow: 'rgba(255,255,255,0.4)',
      bgHover: 'rgba(255,255,255,0.1)',
    },
    {
      href: 'https://www.linkedin.com/in/vishal-deep-14a864255/',
      icon: <LinkedinSVG />,
      label: 'LinkedIn',
      hoverColor: '#2b88f2',
      hoverGlow: 'rgba(43,136,242,0.5)',
      bgHover: 'rgba(43,136,242,0.15)',
    },
    {
      href: 'mailto:vishalyep1022@gmail.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      label: 'Email',
      hoverColor: '#ff2886',
      hoverGlow: 'rgba(255,40,134,0.5)',
      bgHover: 'rgba(255,40,134,0.15)',
    },
  ];

  return (
    <section
      id="hero"
      style={{
        position:   'relative',
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        overflow:   'hidden',
        paddingTop: 100,
        paddingBottom: 60,
      }}
    >
      {/* ── Full-Bleed Clean Video Background ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video
          src="/videos/vishal.mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width:     '100%',
            height:    '100%',
            objectFit: 'cover',
            objectPosition: 'center 20%',
            display:   'block',
          }}
        />

        {/* Minimal Dark Gradient for Left Text Contrast (No Color Tint) */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(90deg, rgba(5,5,12,0.85) 0%, rgba(5,5,12,0.55) 45%, rgba(5,5,12,0.15) 80%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Top Vignette (Navbar Transition) */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '140px',
          background: 'linear-gradient(180deg, rgba(5,5,12,0.80) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom Vignette (Section Transition) */}
        <div style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '180px',
          background: 'linear-gradient(0deg, rgba(5,5,12,0.92) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Main Hero Content Container ── */}
      <div className="container" style={{ position:'relative', zIndex:10, width:'100%' }}>
        <div style={{
          maxWidth: '640px',
          display:  'flex',
          flexDirection: 'column',
          gap: 24,
        }}>

          {/* Live status badge */}
          <motion.div
            {...fadeUp(0.15)}
            style={{
              display:      'flex',
              alignItems:   'center',
              gap:          8,
              width:        'fit-content',
              padding:      '8px 18px',
              borderRadius: 100,
              background:   'rgba(5,5,12,0.70)',
              border:       '1px solid rgba(52,211,153,0.35)',
              backdropFilter:'blur(16px)',
              boxShadow:    '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <span className="dot-live" />
            <span style={{ fontFamily:'var(--mono)', fontSize:'.75rem', color:'var(--emerald)', letterSpacing:'.04em', fontWeight: 500 }}>
              Currently building @ Smartground Infotech
            </span>
          </motion.div>

          {/* Name */}
          <motion.div {...fadeUp(0.25)}>
            <h1 style={{
              fontFamily:    'var(--sans)',
              fontWeight:    700,
              lineHeight:    1.0,
              letterSpacing: '-.03em',
              fontSize:      'clamp(3.4rem,7.5vw,6.2rem)',
              color:         '#ffffff',
              margin:        0,
              textShadow:    '0 10px 40px rgba(0,0,0,0.7)',
            }}>
              Vishal<br />
              <span className="text-gradient">Deep</span>
            </h1>
          </motion.div>

          {/* Typewriter role switcher */}
          <motion.div
            {...(shouldReduceMotion
              ? { initial:{ opacity:0 }, animate:{ opacity:1 } }
              : { initial:{ opacity:0 }, animate:{ opacity:1 }, transition:{ delay:0.42 } }
            )}
            style={{ height:38, overflow:'hidden', position:'relative' }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={ROLES[roleIdx]}
                initial={shouldReduceMotion ? { opacity:0 } : { y:36, opacity:0 }}
                animate={shouldReduceMotion ? { opacity:1 } : { y:0, opacity:1 }}
                exit={shouldReduceMotion   ? { opacity:0 } : { y:-36, opacity:0 }}
                transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
                style={{
                  position:      'absolute',
                  fontFamily:    'var(--mono)',
                  fontSize:      'clamp(1rem,2vw,1.3rem)',
                  color:         'var(--accent)',
                  fontWeight:    600,
                  letterSpacing: '.02em',
                  margin:        0,
                  textShadow:    '0 2px 12px rgba(0,0,0,0.8)',
                }}
              >
                {'> '}{ROLES[roleIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Bio paragraph */}
          <motion.p
            {...fadeUp(0.55)}
            style={{
              fontSize:  '1.05rem',
              color:     'rgba(255,255,255,0.90)',
              lineHeight:1.75,
              maxWidth:  480,
              margin:    0,
              textShadow:'0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            MCA candidate in Generative AI at SRM University — building AI-integrated full-stack products that ship to production.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            {...fadeUp(0.68)}
            style={{ display:'flex', flexWrap:'wrap', gap:14, marginTop:8 }}
          >
            <motion.a
              href="#projects"
              className="btn-primary"
              whileHover={shouldReduceMotion ? {} : { scale:1.03, y:-2 }}
              whileTap={{ scale:0.97 }}
              style={{
                boxShadow: '0 8px 30px rgba(99,102,241,0.45)',
              }}
            >
              <span style={{ position:'relative', zIndex:10, display:'flex', alignItems:'center', gap:8, fontWeight: 600 }}>
                View Projects <span>→</span>
              </span>
            </motion.a>

            <motion.a
              href="/vishal_resume.pdf"
              download
              className="btn-ghost"
              whileHover={shouldReduceMotion ? {} : { scale:1.02, y:-2 }}
              whileTap={{ scale:0.97 }}
              style={{
                background: 'rgba(5,5,12,0.65)',
                border:     '1px solid rgba(255,255,255,0.20)',
                backdropFilter:'blur(16px)',
              }}
            >
              ↓ Download Resume
            </motion.a>

            <motion.a
              href="#contact"
              className="btn-ghost"
              whileHover={shouldReduceMotion ? {} : { scale:1.02, y:-2 }}
              whileTap={{ scale:0.97 }}
              style={{
                background: 'rgba(5,5,12,0.65)',
                border:     '1px solid rgba(255,255,255,0.20)',
                backdropFilter:'blur(16px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor  = 'rgba(52,211,153,0.50)';
                (e.currentTarget as HTMLElement).style.boxShadow    = '0 8px 28px rgba(52,211,153,0.20)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor  = 'rgba(255,255,255,0.20)';
                (e.currentTarget as HTMLElement).style.boxShadow    = 'none';
              }}
            >
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Socials & location */}
          <motion.div
            {...(shouldReduceMotion
              ? { initial:{ opacity:0 }, animate:{ opacity:1 } }
              : { initial:{ opacity:0 }, animate:{ opacity:1 }, transition:{ delay:0.82 } }
            )}
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        18,
              paddingTop: 18,
              marginTop:  4,
            }}
          >
            <div style={{ display:'flex', gap:12 }}>
              {socials.map(({ href, icon, label, hoverColor, hoverGlow, bgHover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="social-icon"
                  whileHover={shouldReduceMotion ? {} : { scale:1.15, y:-4 }}
                  whileTap={{ scale:0.95 }}
                  style={{
                    background:     'rgba(5,5,12,0.70)',
                    borderColor:    'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(16px)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = hoverColor;
                    e.currentTarget.style.color       = hoverColor;
                    e.currentTarget.style.boxShadow   = `0 8px 22px ${hoverGlow}, inset 0 0 10px ${hoverGlow}`;
                    e.currentTarget.style.background  = bgHover;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                    e.currentTarget.style.color       = 'var(--text-3)';
                    e.currentTarget.style.boxShadow   = 'none';
                    e.currentTarget.style.background  = 'rgba(5,5,12,0.70)';
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>

            <div style={{ height:1, width: 40, background:'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, transparent 100%)' }} />

            <div style={{
              display:       'flex',
              alignItems:    'center',
              gap:           8,
              padding:       '6px 14px',
              borderRadius:  100,
              background:    'rgba(5,5,12,0.70)',
              border:        '1px solid rgba(255,255,255,0.15)',
              backdropFilter:'blur(16px)',
            }}>
              <span className="dot-live" style={{ width:7, height:7 }} />
              <span style={{ fontFamily:'var(--mono)', fontSize:'.72rem', color:'rgba(255,255,255,0.85)', letterSpacing:'.05em' }}>
                Chennai, India
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator cue */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ opacity:[0, 0.75, 0] }}
          transition={{ duration:2.4, repeat:Infinity, ease:'easeInOut', delay:1.5 }}
          style={{
            position:     'absolute',
            bottom:       24,
            left:         '50%',
            transform:    'translateX(-50%)',
            display:      'flex',
            flexDirection:'column',
            alignItems:   'center',
            gap:          8,
            zIndex:       10,
            pointerEvents:'none',
          }}
        >
          <span style={{ fontFamily:'var(--mono)', fontSize:'.60rem', color:'rgba(255,255,255,0.7)', letterSpacing:'.22em', textTransform:'uppercase', textShadow:'0 2px 8px rgba(0,0,0,0.8)' }}>scroll</span>
          <div style={{ width:1, height:36, background:'linear-gradient(to bottom, var(--accent), transparent)' }} />
        </motion.div>
      )}
    </section>
  );
}
