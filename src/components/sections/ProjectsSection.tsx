'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
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
import { projects, type Project } from '@/data/projects';

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function hexToRgba(hex: string, a: number) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="lightbox-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          '--accent-color': project.accentColor,
          position: 'relative', width: '100%', maxWidth: 880, maxHeight: '92vh',
          borderRadius: 24, overflow: 'hidden',
          background: 'rgba(8,8,20,0.97)',
          border: `1px solid ${hexToRgba(project.accentColor, 0.4)}`,
          boxShadow: `0 60px 140px rgba(0,0,0,0.95), 0 0 120px ${hexToRgba(project.accentColor, 0.2)}`,
          display: 'flex', flexDirection: 'column',
        } as React.CSSProperties}
      >
        {/* Animated shimmer bar */}
        <motion.div
          initial={{ backgroundPosition: '0% 0%' }}
          animate={{ backgroundPosition: '200% 0%' }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          style={{
            height: 3, flexShrink: 0,
            backgroundImage: `linear-gradient(90deg, transparent, ${project.accentColor}, ${hexToRgba(project.accentColor, 0.5)}, transparent)`,
            backgroundSize: '200% 100%',
          }}
        />

        {/* Header */}
        <div style={{ padding: '24px 32px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
          <div>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '.62rem',
              textTransform: 'uppercase', letterSpacing: '.12em',
              color: project.accentColor,
              background: hexToRgba(project.accentColor, 0.12),
              border: `1px solid ${hexToRgba(project.accentColor, 0.25)}`,
              padding: '4px 12px', borderRadius: 6, display: 'inline-block', marginBottom: 10,
            }}>
              {project.year} · {project.status.toUpperCase()}
            </span>
            <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '1.9rem', color: '#fff', lineHeight: 1.1 }}>{project.title}</h2>
            <p style={{ color: project.accentColor, fontFamily: 'var(--mono)', fontSize: '.8rem', marginTop: 6, fontWeight: 600 }}>{project.tagline}</p>
          </div>
          <button onClick={onClose} style={{
            padding: 10, borderRadius: 12,
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.6)', cursor: 'pointer', flexShrink: 0,
            transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>
          {/* Description */}
          <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.85, fontSize: '1rem' }}>{project.description}</p>

          {/* Problem / Solution */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{
              padding: '20px 22px', borderRadius: 16,
              background: 'rgba(251,113,133,0.07)',
              border: '1px solid rgba(251,113,133,0.25)',
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: '#fb7185', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontWeight: 600 }}>⚠ Problem</p>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '.9rem', lineHeight: 1.75 }}>{project.problem}</p>
            </div>
            <div style={{
              padding: '20px 22px', borderRadius: 16,
              background: hexToRgba(project.accentColor, 0.08),
              border: `1px solid ${hexToRgba(project.accentColor, 0.25)}`,
            }}>
              <p style={{ fontFamily: 'var(--mono)', fontSize: '.65rem', color: project.accentColor, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10, fontWeight: 600 }}>⚡ Solution</p>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '.9rem', lineHeight: 1.75 }}>{project.solution}</p>
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="section-eyebrow" style={{ marginBottom: 16, color: project.accentColor }}>Key Features</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {project.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    fontSize: '.88rem', color: 'rgba(255,255,255,0.75)',
                    padding: '10px 14px', borderRadius: 10,
                    background: hexToRgba(project.accentColor, 0.05),
                    border: `1px solid ${hexToRgba(project.accentColor, 0.12)}`,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={project.accentColor} strokeWidth="2.5" style={{ marginTop: 3, flexShrink: 0 }}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  {f}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <p className="section-eyebrow" style={{ marginBottom: 14, color: project.accentColor }}>Tech Stack</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.techStack.map(t => (
                <span key={t} style={{
                  padding: '6px 16px', borderRadius: 100,
                  fontFamily: 'var(--mono)', fontSize: '.72rem', fontWeight: 600,
                  color: project.accentColor,
                  background: hexToRgba(project.accentColor, 0.12),
                  border: `1px solid ${hexToRgba(project.accentColor, 0.3)}`,
                  boxShadow: `0 4px 14px ${hexToRgba(project.accentColor, 0.15)}`,
                }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 12, paddingTop: 8, borderTop: `1px solid rgba(255,255,255,0.08)` }}>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: project.accentColor, color: '#fff',
                  padding: '13px 28px', borderRadius: 12,
                  fontFamily: 'var(--mono)', fontSize: '.82rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', gap: 8,
                  boxShadow: `0 8px 30px ${hexToRgba(project.accentColor, 0.5)}`,
                  textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'rgba(255,255,255,0.06)', color: '#fff',
                  padding: '13px 28px', borderRadius: 12,
                  fontFamily: 'var(--mono)', fontSize: '.82rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 8,
                  border: '1px solid rgba(255,255,255,0.12)',
                  textDecoration: 'none',
                }}
              >
                <GithubIcon /> GitHub
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) translateZ(6px) scale(1.01)`;
    if (glareRef.current) {
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,.14), transparent 55%)`;
    }
  }, []);

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0) scale(1)';
    setHovered(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 55, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ height: '100%' }}
    >
      <div
        ref={ref}
        onClick={() => onOpen(project)}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        style={{
          height: '100%', display: 'flex', flexDirection: 'column',
          background: 'rgba(10,10,22,0.85)',
          borderRadius: 22, overflow: 'hidden', position: 'relative',
          border: `1px solid ${hovered ? hexToRgba(project.accentColor, 0.45) : 'rgba(255,255,255,0.07)'}`,
          boxShadow: hovered ? `0 28px 80px rgba(0,0,0,0.75), 0 0 60px ${hexToRgba(project.accentColor, 0.18)}` : '0 8px 30px rgba(0,0,0,0.3)',
          transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.38s',
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Shimmer top line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.4 }}
          style={{
            height: 2, transformOrigin: 'left',
            background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
            flexShrink: 0,
          }}
        />

        {/* Cursor glare */}
        <div ref={glareRef} style={{
          position: 'absolute', inset: 0,
          opacity: hovered ? 1 : 0, transition: 'opacity 0.35s',
          pointerEvents: 'none', mixBlendMode: 'overlay', zIndex: 1,
        }} />

        {/* Background glow */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse at top, ${hexToRgba(project.accentColor, hovered ? 0.1 : 0.04)} 0%, transparent 60%)`,
          transition: 'background 0.4s', pointerEvents: 'none',
        }} />

        <div style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 18, flex: 1, position: 'relative', zIndex: 2 }}>
          {/* Meta row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '.65rem', fontWeight: 600,
              color: project.accentColor,
              background: hexToRgba(project.accentColor, 0.12),
              border: `1px solid ${hexToRgba(project.accentColor, 0.28)}`,
              padding: '4px 12px', borderRadius: 6,
            }}>
              {project.year}
            </span>
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '.62rem',
              padding: '4px 10px', borderRadius: 100,
              background: project.status === 'live' ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)',
              color: project.status === 'live' ? '#34d399' : 'rgba(255,255,255,0.45)',
              border: `1px solid ${project.status === 'live' ? 'rgba(52,211,153,0.28)' : 'rgba(255,255,255,0.1)'}`,
            }}>
              {project.status === 'live' ? '● live' : project.status}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 style={{
              fontFamily: 'var(--sans)', fontWeight: 800, fontSize: '1.3rem',
              color: '#fff', lineHeight: 1.2,
              textShadow: hovered ? `0 0 30px ${hexToRgba(project.accentColor, 0.4)}` : 'none',
              transition: 'text-shadow 0.35s',
            }}>{project.title}</h3>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: project.accentColor, marginTop: 6, fontWeight: 600 }}>{project.tagline}</p>
          </div>

          {/* Description */}
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '.88rem', lineHeight: 1.8, flex: 1 }}>
            {project.description.slice(0, 145)}…
          </p>

          {/* Tech chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {project.techStack.slice(0, 4).map(t => (
              <span key={t} style={{
                padding: '4px 10px', borderRadius: 100,
                fontFamily: 'var(--mono)', fontSize: '.62rem', fontWeight: 600,
                color: project.accentColor,
                background: hexToRgba(project.accentColor, 0.08),
                border: `1px solid ${hexToRgba(project.accentColor, 0.22)}`,
              }}>{t}</span>
            ))}
            {project.techStack.length > 4 && (
              <span style={{
                padding: '4px 10px', borderRadius: 100,
                fontFamily: 'var(--mono)', fontSize: '.62rem',
                color: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>+{project.techStack.length - 4}</span>
            )}
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            paddingTop: 14, borderTop: `1px solid ${hexToRgba(project.accentColor, 0.15)}`,
          }}>
            <motion.span
              animate={{ x: hovered ? 6 : 0, color: hovered ? project.accentColor : 'rgba(255,255,255,0.5)' }}
              transition={{ duration: 0.25 }}
              style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              Case Study
            </motion.span>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                whileHover={{ scale: 1.12, backgroundColor: hexToRgba(project.accentColor, 0.18) }}
                style={{
                  padding: '7px 12px', borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid rgba(255,255,255,0.1)`,
                  color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" x2="21" y1="14" y2="3" /></svg>
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);
  const isMobile = useIsMobile();

  return (
    <>
      <AnimatePresence>{active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}</AnimatePresence>
      <section id="projects" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
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
        <div style={{ position: 'absolute', left: '-5%', top: '20%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: '-5%', bottom: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)', filter: 'blur(90px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: 72 }}
          >
            <p className="section-eyebrow">03 / Projects</p>
            <h2 className="section-title">Products I&apos;ve <span className="text-gradient">Shipped</span></h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: 16, maxWidth: 500, lineHeight: 1.75, fontSize: '1rem' }}>
              Click any card for a full case study — problem, solution, architecture & live demo.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 24 : 22 }}>
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={setActive} />)}
          </div>
        </div>
      </section>
    </>
  );
}
