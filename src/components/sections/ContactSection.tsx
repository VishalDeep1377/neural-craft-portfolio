'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const MoltenMetal = dynamic(() => import('@/components/ui/MoltenMetal'), { ssr: false });

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);
  return m;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

const CONTACT_LINKS = [
  {
    type: 'email',
    href: 'mailto:vishalyep1022@gmail.com',
    label: 'vishalyep1022@gmail.com',
    icon: '✉',
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.4)',
  },
  {
    type: 'phone',
    href: 'tel:+917999829540',
    label: '+91 7999829540',
    icon: '📞',
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.4)',
  },
  {
    type: 'github',
    href: 'https://github.com/VishalDeep1377',
    label: 'github.com/VishalDeep1377',
    icon: '⌥',
    color: '#a78bfa',
    glow: 'rgba(167,139,250,0.4)',
  },
  {
    type: 'linkedin',
    href: 'https://www.linkedin.com/in/vishal-deep-14a864255/',
    label: 'linkedin.com/in/vishal-deep-14a864255',
    icon: 'in',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.4)',
  },
  {
    type: 'location',
    href: '#',
    label: 'Chennai, Tamil Nadu, India',
    icon: '⊙',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.4)',
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (r.ok) { setStatus('success'); setForm({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
    setTimeout(() => setStatus('idle'), 4000);
  };

  const magnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = magnetRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.32}px, ${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* MoltenMetal ambient background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.75 }}>
        <MoltenMetal
          color1="#5227FF"
          color2="#FF9FFC"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={1.0}
        />
      </div>

      {/* BG ambience */}
      <div style={{ position: 'absolute', bottom: 0, insetInline: 0, height: 500, background: 'radial-gradient(ellipse at bottom, rgba(99,102,241,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'absolute', top: '30%', left: '-6%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 72 }}
        >
          <p className="section-eyebrow">06 / Contact</p>
          <h2 className="section-title">Let&apos;s <span className="text-gradient">Build Together</span></h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 'clamp(48px,6vw,96px)' }}>
          {/* Left — info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.85, fontSize: '1.05rem' }}
            >
              I&apos;m open to product roles, internships, or collaborative AI projects. If you&apos;re building something meaningful, I want to hear about it.
            </motion.p>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.1 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderRadius: 14, background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.22)' }}
            >
              <span className="dot-live" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: '#34d399', fontWeight: 600 }}>Available for new opportunities</span>
            </motion.div>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {CONTACT_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 6 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 16px', borderRadius: 14, textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = `${l.glow.replace('0.4)', '0.08)')}`;
                    (e.currentTarget as HTMLElement).style.borderColor = l.color + '40';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${l.glow.replace('0.4)', '0.2)')}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    style={{
                      width: 42, height: 42, borderRadius: 11,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${l.color}18`,
                      border: `1px solid ${l.color}35`,
                      color: l.color, fontFamily: 'var(--mono)', fontSize: '.78rem', fontWeight: 700, flexShrink: 0,
                    }}
                  >
                    {l.icon}
                  </motion.div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.82rem', color: 'rgba(255,255,255,0.72)', flex: 1 }}>{l.label}</span>
                  <motion.svg
                    initial={{ opacity: 0, x: -4 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={l.color} strokeWidth="2"
                    style={{ flexShrink: 0, opacity: 0 }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </motion.svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glass form card */}
            <div style={{
              padding: '32px 28px', borderRadius: 24,
              background: 'rgba(10,10,22,0.85)',
              border: '1px solid rgba(99,102,241,0.2)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.08)',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Top shimmer */}
              <motion.div
                initial={{ backgroundPosition: '0% 0%' }}
                animate={{ backgroundPosition: '200% 0%' }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  backgroundImage: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), rgba(168,85,247,0.8), transparent)',
                  backgroundSize: '200% 100%',
                }}
              />

              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: 6 }}>Send a message</h3>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>I typically respond within 24 hours.</p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 12 }}>
                  {['name', 'email'].map((field) => (
                    <div key={field} style={{ position: 'relative' }}>
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field === 'name' ? 'Your name' : 'your@email.com'}
                        required
                        value={form[field as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.04)',
                          border: `1px solid ${focusedField === field ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)'}`,
                          borderRadius: 12,
                          color: '#fff',
                          fontFamily: 'var(--mono)',
                          fontSize: '.875rem',
                          padding: '14px 18px',
                          outline: 'none',
                          boxShadow: focusedField === field ? '0 0 0 3px rgba(99,102,241,0.14)' : 'none',
                          transition: 'border-color 0.25s, box-shadow 0.25s',
                        }}
                      />
                    </div>
                  ))}
                </div>

                <textarea
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  required
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    width: '100%', resize: 'none',
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${focusedField === 'message' ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: 12, color: '#fff',
                    fontFamily: 'var(--mono)', fontSize: '.875rem',
                    padding: '14px 18px', outline: 'none',
                    boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(99,102,241,0.14)' : 'none',
                    transition: 'border-color 0.25s, box-shadow 0.25s',
                  }}
                />

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={status === 'idle' ? { scale: 1.02, y: -2 } : {}}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    position: 'relative', padding: '16px 24px', borderRadius: 14,
                    background: status === 'success'
                      ? 'linear-gradient(135deg, #10b981, #34d399)'
                      : status === 'error'
                        ? 'linear-gradient(135deg, #ef4444, #f87171)'
                        : 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
                    color: '#fff', fontFamily: 'var(--sans)', fontSize: '.95rem', fontWeight: 700,
                    border: 'none', cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                    opacity: status === 'loading' ? 0.7 : 1,
                    boxShadow: status === 'success'
                      ? '0 8px 30px rgba(16,185,129,0.45)'
                      : '0 10px 40px rgba(168,85,247,0.5)',
                    overflow: 'hidden',
                    transition: 'background 0.4s, box-shadow 0.4s, opacity 0.3s',
                  }}
                >
                  {/* Shimmer */}
                  {status === 'idle' && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute', top: 0, left: 0, width: '60%', height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                        skewX: '-20deg',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                  <AnimatePresence mode="wait">
                    {status === 'idle' && (
                      <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" x2="11" y1="2" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                        Send Message
                      </motion.span>
                    )}
                    {status === 'loading' && <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Sending…</motion.span>}
                    {status === 'success' && <motion.span key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>✓ Message Sent! I&apos;ll respond soon.</motion.span>}
                    {status === 'error' && <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>Error — Try Again</motion.span>}
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Magnetic closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}
        >
          <a
            ref={magnetRef}
            href="mailto:vishalyep1022@gmail.com"
            className="magnetic-cta"
            onMouseMove={magnet}
            onMouseLeave={() => { if (magnetRef.current) magnetRef.current.style.transform = ''; }}
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 16, padding: '28px 52px', borderRadius: 100, fontFamily: 'var(--sans)', fontSize: 'clamp(1.3rem,3vw,2rem)', fontWeight: 700, color: '#fff' }}
          >
            Let&apos;s build something
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-gradient"
              style={{ display: 'inline-block' }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
