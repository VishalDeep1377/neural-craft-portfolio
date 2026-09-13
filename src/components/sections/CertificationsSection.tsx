'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const MoltenMetal = dynamic(() => import('@/components/ui/MoltenMetal'), { ssr: false });
const ElectricBorder = dynamic(() => import('@/components/ui/ElectricBorder'), { ssr: false });
import CertLogo from '@/components/ui/CertLogo';

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
import { certifications, type Certification } from '@/data/certifications';

function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const CAT_MAP = {
  achievement:    { label: 'Achievement',     icon: '🏆', color: '#f59e0b' },
  specialization: { label: 'Specialization',  icon: '🎓', color: '#a78bfa' },
  professional:   { label: 'Professional',    icon: '⭐', color: '#6366f1' },
};

type Filter = 'all' | Certification['category'];

// Lightbox
function Lightbox({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  return (
    <motion.div
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(4,4,14,0.97)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 880, maxHeight: '92vh',
          borderRadius: 24, overflow: 'hidden',
          background: 'rgba(8,8,20,0.98)',
          border: `1px solid ${hexToRgba(cert.accentColor, 0.45)}`,
          boxShadow: `0 60px 140px rgba(0,0,0,0.95), 0 0 120px ${hexToRgba(cert.accentColor, 0.2)}`,
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Shimmer bar */}
        <motion.div
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '200% 0%' }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          style={{
            height: 3, flexShrink: 0,
            backgroundImage: `linear-gradient(90deg, transparent, ${cert.accentColor}, transparent)`,
            backgroundSize: '200% 100%',
          }}
        />

        {/* Header */}
        <div style={{ padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, borderBottom: `1px solid rgba(255,255,255,0.07)`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <motion.div
              initial={{ scale: 0.5, rotate: -12, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.1 }}
              style={{
                width: 52, height: 52, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
                background: hexToRgba(cert.accentColor, 0.14),
                border: `1px solid ${hexToRgba(cert.accentColor, 0.3)}`,
                boxShadow: `0 0 24px ${hexToRgba(cert.accentColor, 0.3)}`,
                flexShrink: 0,
              }}
            >
              <CertLogo id={cert.id} color={cert.accentColor} size={28} />
            </motion.div>
            <div>
              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1.15rem', color: '#fff', lineHeight: 1.2 }}>{cert.title}</h3>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{cert.issuer} · {cert.date}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {cert.file && (
              <motion.a
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                href={cert.file} download
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px', borderRadius: 10,
                  fontFamily: 'var(--mono)', fontSize: '.72rem', fontWeight: 600,
                  background: hexToRgba(cert.accentColor, 0.14),
                  border: `1px solid ${hexToRgba(cert.accentColor, 0.32)}`,
                  color: cert.accentColor, textDecoration: 'none',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                Download
              </motion.a>
            )}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={onClose}
              style={{ padding: 9, borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', minHeight: 260 }}>
          {cert.file ? (
            cert.fileType === 'pdf' ? (
              <iframe src={`${cert.file}#toolbar=0&navpanes=0`} title={cert.title} style={{ width: '100%', height: '65vh', border: 'none' }} />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{ padding: 18 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cert.file} alt={cert.title} style={{ width: '100%', borderRadius: 14, objectFit: 'contain', maxHeight: '65vh' }} />
              </motion.div>
            )
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '52px 24px', gap: 18, textAlign: 'center' }}>
              <motion.div
                animate={{ scale: [1, 1.05, 1], boxShadow: [`0 0 30px ${hexToRgba(cert.accentColor, 0.3)}`, `0 0 50px ${hexToRgba(cert.accentColor, 0.5)}`, `0 0 30px ${hexToRgba(cert.accentColor, 0.3)}`] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{ fontSize: '4rem', padding: 22, borderRadius: 22, background: hexToRgba(cert.accentColor, 0.1), border: `1px solid ${hexToRgba(cert.accentColor, 0.25)}` }}
              >
                {cert.icon}
              </motion.div>
              <div>
                <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1.25rem', color: '#fff' }}>{cert.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--mono)', fontSize: '.72rem', marginTop: 8 }}>{cert.issuer}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 28px', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {cert.tags.map(t => (
              <span key={t} style={{ padding: '3px 10px', borderRadius: 6, fontFamily: 'var(--mono)', fontSize: '.62rem', fontWeight: 600, color: cert.accentColor, background: hexToRgba(cert.accentColor, 0.1), border: `1px solid ${hexToRgba(cert.accentColor, 0.25)}` }}>{t}</span>
            ))}
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', padding: '5px 14px', borderRadius: 100, background: hexToRgba(cert.accentColor, 0.12), color: cert.accentColor, border: `1px solid ${hexToRgba(cert.accentColor, 0.28)}` }}>
            {CAT_MAP[cert.category].label} · {cert.date}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Cert Card
function CertCard({ cert, index, onOpen }: { cert: Certification; index: number; onOpen: (c: Certification) => void }) {
  const cat = CAT_MAP[cert.category];
  const [hovered, setHovered] = useState(false);
  const glareRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 6}deg) translateZ(5px) scale(1.01)`;
    if (glareRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.15), transparent 55%)`;
    }
  }
  function handleLeave(e: React.MouseEvent<HTMLDivElement>) {
    e.currentTarget.style.transform = 'none';
    setHovered(false);
  }

  const cardElement = (
    <div
      onClick={() => onOpen(cert)}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 20,
        background: hovered ? `linear-gradient(135deg, ${hexToRgba(cert.accentColor, 0.12)} 0%, rgba(8,8,20,0.95) 100%)` : 'rgba(10,10,22,0.85)',
        border: `1px solid ${hovered ? hexToRgba(cert.accentColor, 0.45) : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 24px 70px rgba(0,0,0,0.65), 0 0 60px ${hexToRgba(cert.accentColor, 0.2)}` : '0 6px 24px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(20px)',
        transition: 'border-color 0.35s, box-shadow 0.35s, background 0.35s',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      }}
    >
      {/* Animated top accent line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, transformOrigin: 'left', background: `linear-gradient(90deg, transparent, ${cert.accentColor}, transparent)`, zIndex: 2 }}
      />

      {/* Cursor glare */}
      <div ref={glareRef} style={{ position: 'absolute', inset: 0, opacity: hovered ? 1 : 0, transition: 'opacity .35s', pointerEvents: 'none', mixBlendMode: 'overlay', zIndex: 1 }} />

      {/* Hover radial glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at top left, ${hexToRgba(cert.accentColor, hovered ? 0.14 : 0.05)} 0%, transparent 60%)`, pointerEvents: 'none', transition: 'background 0.4s' }} />

      {/* Featured shimmer badge */}
      {cert.isFeatured && (
        <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 5 }}>
          <motion.div
            initial={{ backgroundPosition: '0% 0%' }}
            animate={{ backgroundPosition: '200% 0%' }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            style={{
              padding: '4px 10px', borderRadius: 100,
              fontFamily: 'var(--mono)', fontSize: '.58rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.08em',
              color: cert.accentColor,
              border: `1px solid ${hexToRgba(cert.accentColor, 0.45)}`,
              backgroundImage: `linear-gradient(110deg, ${hexToRgba(cert.accentColor, 0.15)} 30%, ${hexToRgba(cert.accentColor, 0.45)} 45%, ${hexToRgba(cert.accentColor, 0.15)} 60%)`,
              backgroundSize: '250% 100%',
            }}
          >
            ★ Featured
          </motion.div>
        </div>
      )}

      <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16, height: '100%', position: 'relative', zIndex: 2 }}>
        {/* Icon + meta */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/* Breathing glow ring */}
            <motion.div
              animate={hovered ? { scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 1, opacity: 0.2 }}
              transition={{ duration: 1.6, repeat: hovered ? Infinity : 0, ease: 'easeInOut' }}
              style={{ position: 'absolute', inset: -5, borderRadius: 16, background: hexToRgba(cert.accentColor, 0.35), filter: 'blur(10px)', zIndex: 0 }}
            />
            <motion.div
              whileHover={{ scale: 1.12, rotate: 8 }}
              style={{
                position: 'relative', zIndex: 1,
                width: 52, height: 52, borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                background: hexToRgba(cert.accentColor, 0.12),
                border: `1px solid ${hexToRgba(cert.accentColor, 0.28)}`,
                boxShadow: hovered ? `0 0 24px ${hexToRgba(cert.accentColor, 0.4)}` : 'none',
                transition: 'box-shadow 0.3s',
              }}
            >
              <CertLogo id={cert.id} color={cert.accentColor} size={28} />
            </motion.div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '3px 9px', borderRadius: 5,
              fontFamily: 'var(--mono)', fontSize: '.58rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '.1em',
              color: cat.color,
              background: hexToRgba(cat.color, 0.1),
              border: `1px solid ${hexToRgba(cat.color, 0.25)}`,
              marginBottom: 7,
            }}>
              {cat.icon} {cat.label}
            </div>
            <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '.95rem', color: '#fff', lineHeight: 1.3, textShadow: hovered ? `0 0 20px ${hexToRgba(cert.accentColor, 0.5)}` : 'none', transition: 'text-shadow 0.3s' }}>{cert.title}</h3>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{cert.issuer} · {cert.date}</p>
          </div>
        </div>

        {/* Description */}
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '.83rem', lineHeight: 1.78, flex: 1 }}>{cert.description}</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {cert.tags.slice(0, 3).map(t => (
            <span key={t} style={{ padding: '3px 9px', borderRadius: 100, fontFamily: 'var(--mono)', fontSize: '.6rem', fontWeight: 600, color: cert.accentColor, background: hexToRgba(cert.accentColor, 0.08), border: `1px solid ${hexToRgba(cert.accentColor, 0.22)}` }}>{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: `1px solid ${hexToRgba(cert.accentColor, 0.15)}` }}>
          <motion.span
            animate={{ x: hovered ? 4 : 0, color: hovered ? cert.accentColor : 'rgba(255,255,255,0.45)' }}
            transition={{ duration: 0.25 }}
            style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            {cert.file ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                View Certificate
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                Details
              </>
            )}
          </motion.span>
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
              style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
              Verify ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 38, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.92, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, delay: index * 0.055, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '100%' }}
    >
      <ElectricBorder
        color={cert.accentColor}
        speed={cert.isFeatured ? 0.9 : 0.65}
        chaos={cert.isFeatured ? 0.12 : 0.08}
        borderRadius={20}
        style={{ height: '100%' }}
      >
        {cardElement}
      </ElectricBorder>
    </motion.div>
  );
}

function useCountUp(target: number, active: boolean, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      setValue(Math.round((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function StatPill({ n, label, color, delay }: { n: number; label: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const value = useCountUp(n, inView);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textAlign: 'center', padding: '18px 20px', borderRadius: 16,
        background: hovered ? hexToRgba(color, 0.1) : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? hexToRgba(color, 0.4) : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 30px ${hexToRgba(color, 0.2)}` : 'none',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '2rem', color, fontVariantNumeric: 'tabular-nums', textShadow: hovered ? `0 0 16px ${color}` : 'none', transition: 'text-shadow 0.3s' }}>
        {value}
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: '.62rem', color: 'rgba(255,255,255,0.5)', marginTop: 5, textTransform: 'uppercase', letterSpacing: '.1em' }}>
        {label}
      </div>
    </motion.div>
  );
}

function FilterTabs({ filter, onChange }: { filter: Filter; onChange: (f: Filter) => void }) {
  const FILTERS: { key: Filter; label: string; color: string }[] = [
    { key: 'all',            label: 'All',             color: '#6366f1' },
    { key: 'achievement',    label: 'Achievements',    color: '#f59e0b' },
    { key: 'specialization', label: 'Specializations', color: '#a78bfa' },
    { key: 'professional',   label: 'Professional',    color: '#22d3ee' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}
    >
      {FILTERS.map(({ key, label, color }) => {
        const active = filter === key;
        const count = key === 'all' ? certifications.length : certifications.filter(c => c.category === key).length;
        return (
          <motion.button
            key={key}
            onClick={() => onChange(key)}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              position: 'relative', padding: '9px 20px', borderRadius: 100,
              fontFamily: 'var(--mono)', fontSize: '.72rem', fontWeight: 600,
              border: active ? `1px solid ${hexToRgba(color, 0.5)}` : '1px solid rgba(255,255,255,0.08)',
              color: active ? '#fff' : 'rgba(255,255,255,0.5)',
              overflow: 'hidden', cursor: 'pointer',
              background: active ? `${hexToRgba(color, 0.18)}` : 'rgba(255,255,255,0.04)',
              boxShadow: active ? `0 0 24px ${hexToRgba(color, 0.3)}` : 'none',
              transition: 'all 0.3s',
            }}
          >
            {active && (
              <motion.div
                layoutId="filter-pill"
                transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                style={{ position: 'absolute', inset: 0, borderRadius: 100, background: hexToRgba(color, 0.2), zIndex: 0 }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>
              {label}
              <span style={{ marginLeft: 7, padding: '1px 7px', borderRadius: 100, background: 'rgba(255,255,255,0.12)', fontSize: '.6rem' }}>{count}</span>
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

export default function CertificationsSection() {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const filtered = filter === 'all' ? certifications : certifications.filter(c => c.category === filter);

  const statColors = ['#6366f1', '#f59e0b', '#a78bfa', '#22d3ee'];

  return (
    <>
      <AnimatePresence>{activeCert && <Lightbox cert={activeCert} onClose={() => setActiveCert(null)} />}</AnimatePresence>

      <section id="certifications" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
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

        {/* BG orbs */}
        <motion.div
          animate={shouldReduceMotion ? {} : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '20%', right: '-5%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={shouldReduceMotion ? {} : { x: [0, -24, 0], y: [0, 18, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          style={{ position: 'absolute', bottom: '5%', left: '-8%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }}
        />
        <div style={{ position: 'absolute', top: '60%', left: '45%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 48 }}
          >
            <p className="section-eyebrow">05 / Credentials</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
              <h2 className="section-title">Certifications & <span className="text-gradient">Achievements</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 380, lineHeight: 1.75, fontSize: '.95rem' }}>
                Industry credentials from Google, Microsoft, DeepLearning.AI & national hackathon wins.
              </p>
            </div>
          </motion.div>

          {/* Stat pills */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 12, marginBottom: 48 }}>
            <StatPill n={certifications.length} label="Total Credentials" color={statColors[0]} delay={0} />
            <StatPill n={certifications.filter(c => c.category === 'achievement').length} label="Achievements" color={statColors[1]} delay={0.08} />
            <StatPill n={certifications.filter(c => c.category === 'specialization').length} label="Specializations" color={statColors[2]} delay={0.16} />
            <StatPill n={certifications.filter(c => c.category === 'professional').length} label="Professional" color={statColors[3]} delay={0.24} />
          </div>

          {/* Filter tabs */}
          <FilterTabs filter={filter} onChange={setFilter} />

          {/* Grid */}
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 20 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((cert, i) => (
                <CertCard key={cert.id} cert={cert} index={i} onOpen={setActiveCert} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginTop: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}
          >
            <p style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '.18em', textTransform: 'uppercase' }}>[ always learning — always shipping ]</p>
            <motion.div
              animate={{ boxShadow: ['0 0 16px rgba(99,102,241,0.15)', '0 0 32px rgba(99,102,241,0.3)', '0 0 16px rgba(99,102,241,0.15)'] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 26px', borderRadius: 100, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.22)' }}
            >
              <span className="dot-live" />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'rgba(255,255,255,0.65)' }}>
                Currently pursuing MCA in Generative AI · SRM University, Chennai
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}