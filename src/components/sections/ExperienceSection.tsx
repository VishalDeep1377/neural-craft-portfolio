'use client';
import { useState, useEffect } from 'react';
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

const EXP = [
  {
    id: 'smartground',
    role: 'Software Engineer (Intern)',
    company: 'Smartground Infotech Pvt. Ltd.',
    period: 'Jan 2026 – Present',
    type: 'Full-time Internship · Remote',
    current: true,
    color: '#6366f1',
    colorRaw: '99,102,241',
    glow: 'rgba(99,102,241,0.4)',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 100%)',
    summary: 'Building production-grade software: automating email marketing pipelines and architecting a job search portal for the healthcare sector.',
    impact: ['70% reduction in manual effort', 'Full-stack healthcare portal', 'Scalable AI architecture'],
    highlights: [
      'Automated email marketing workflows, cutting manual effort by 70%',
      'Built a full-stack job search portal connecting medical institutions & consultancies',
      'Developed and maintained the company website and internal tooling',
      'Designed scalable software architecture and infrastructure patterns',
    ],
    skills: ['Next.js', 'Node.js', 'System Architecture', 'Software Design', 'Infrastructure'],
  },
  {
    id: 'deloitte',
    role: 'Web Developer',
    company: 'Deloitte Australia',
    period: 'Jul 2025',
    type: 'Virtual Internship · Forage',
    current: false,
    color: '#22d3ee',
    colorRaw: '34,211,238',
    glow: 'rgba(34,211,238,0.4)',
    gradient: 'linear-gradient(135deg, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.04) 100%)',
    summary: 'Enterprise-grade internship with Deloitte Australia — built interactive business intelligence dashboards and data cleansing pipelines.',
    impact: ['Enterprise-scale BI dashboards', 'Data pipeline architecture', 'Deloitte certified'],
    highlights: [
      'Built interactive BI dashboards delivering real-time business insights',
      'Data cleansing and classification pipelines for dataset reliability',
      'Applied enterprise data transformation and visualization patterns',
    ],
    skills: ['Data Visualization', 'Business Intelligence', 'Dashboard Design', 'Data Cleansing'],
  },
];

export default function ExperienceSection() {
  const [open, setOpen] = useState<string | null>('smartground');
  const isMobile = useIsMobile();

  return (
    <section id="experience" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
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

      {/* Ambient BG orbs */}
      <div style={{ position: 'absolute', right: '-5%', top: '15%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: '-5%', bottom: '10%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 72 }}
        >
          <p className="section-eyebrow">02 / Experience</p>
          <h2 className="section-title">Where I&apos;ve <span className="text-gradient">Shipped Product</span></h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Vertical timeline line */}
          <div style={{
            position: 'absolute',
            left: 'clamp(20px,5vw,64px)',
            top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06), transparent)',
            pointerEvents: 'none',
          }} />

          {EXP.map((e, i) => {
            const isOpen = open === e.id;
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 40, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: 24, position: 'relative' }}
              >
                {/* Glowing card */}
                <motion.div
                  animate={{
                    borderColor: isOpen ? `rgba(${e.colorRaw},0.4)` : 'rgba(255,255,255,0.07)',
                    boxShadow: isOpen
                      ? `0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(${e.colorRaw},0.15), inset 0 1px 0 rgba(255,255,255,0.08)`
                      : '0 8px 30px rgba(0,0,0,0.3)',
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    borderRadius: 22, overflow: 'hidden',
                    background: isOpen ? e.gradient : 'rgba(10,10,22,0.8)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Top shimmer line */}
                  <motion.div
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: 2, transformOrigin: 'left',
                      background: `linear-gradient(90deg, transparent, ${e.color}, transparent)`,
                    }}
                  />

                  {/* Header button */}
                  <button
                    onClick={() => setOpen(p => p === e.id ? null : e.id)}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: isMobile ? '16px' : '24px 28px', display: 'flex', gap: isMobile ? 12 : 20,
                      alignItems: 'flex-start', background: 'none', border: 'none', cursor: 'pointer',
                    }}
                  >
                    {/* Icon */}
                    <motion.div
                      animate={{
                        background: isOpen ? `rgba(${e.colorRaw},0.18)` : `rgba(${e.colorRaw},0.08)`,
                        boxShadow: isOpen ? `0 0 24px rgba(${e.colorRaw},0.35)` : 'none',
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: 50, height: 50, borderRadius: 15,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid rgba(${e.colorRaw},0.3)`,
                        flexShrink: 0,
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={e.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="14" x="2" y="7" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    </motion.div>

                    {/* Details */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                            <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{e.role}</h3>
                            {e.current && (
                              <span style={{
                                display: 'flex', alignItems: 'center', gap: 5,
                                padding: '3px 10px', borderRadius: 100,
                                background: 'rgba(52,211,153,0.12)',
                                border: '1px solid rgba(52,211,153,0.3)',
                                fontFamily: 'var(--mono)', fontSize: '.6rem', color: '#34d399',
                              }}>
                                <span className="dot-live" style={{ width: 5, height: 5 }} /> Present
                              </span>
                            )}
                          </div>
                          <p style={{ fontFamily: 'var(--mono)', fontSize: '.8rem', color: e.color, fontWeight: 600 }}>{e.company}</p>
                          <p style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{e.type}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: 8, marginTop: isMobile ? 6 : 0 }}>
                          <span style={{ fontFamily: 'var(--mono)', fontSize: '.7rem', color: 'rgba(255,255,255,0.45)' }}>{e.period}</span>
                          {/* Impact chips */}
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: isMobile ? 'flex-start' : 'flex-end' }}>
                            {e.impact.map(imp => (
                              <span key={imp} style={{
                                fontFamily: 'var(--mono)', fontSize: '.58rem',
                                padding: '2px 8px', borderRadius: 4,
                                background: `rgba(${e.colorRaw},0.1)`,
                                border: `1px solid rgba(${e.colorRaw},0.22)`,
                                color: e.color,
                              }}>{imp}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '.9rem', marginTop: 12, lineHeight: 1.7 }}>{e.summary}</p>
                    </div>

                    {/* Chevron */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ flexShrink: 0, marginTop: 4 }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: isMobile ? '0 16px 20px' : '0 28px 28px 98px', display: 'flex', flexDirection: 'column', gap: 22 }}>
                          <div style={{ height: 1, background: `linear-gradient(90deg, rgba(${e.colorRaw},0.4), transparent)` }} />

                          {/* Highlights */}
                          <div>
                            <p className="section-eyebrow" style={{ marginBottom: 14, color: e.color }}>Key Highlights</p>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                              {e.highlights.map((h, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: -16 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.08, duration: 0.4 }}
                                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(255,255,255,0.75)', fontSize: '.92rem' }}
                                >
                                  <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ delay: j * 0.08 + 0.2, duration: 0.4 }}
                                    style={{ width: 7, height: 7, borderRadius: '50%', background: e.color, flexShrink: 0, marginTop: 6, boxShadow: `0 0 8px ${e.color}` }}
                                  />
                                  {h}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Skills */}
                          <div>
                            <p className="section-eyebrow" style={{ marginBottom: 12, color: e.color }}>Technologies</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                              {e.skills.map(s => (
                                <motion.span
                                  key={s}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  whileHover={{ scale: 1.08, y: -2 }}
                                  style={{
                                    padding: '5px 14px', borderRadius: 100,
                                    fontFamily: 'var(--mono)', fontSize: '.7rem', fontWeight: 600,
                                    color: e.color,
                                    background: `rgba(${e.colorRaw},0.12)`,
                                    border: `1px solid rgba(${e.colorRaw},0.3)`,
                                    boxShadow: `0 4px 12px rgba(${e.colorRaw},0.15)`,
                                  }}
                                >
                                  {s}
                                </motion.span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
