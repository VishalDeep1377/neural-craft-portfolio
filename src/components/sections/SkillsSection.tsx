'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const MoltenMetal = dynamic(() => import('@/components/ui/MoltenMetal'), { ssr: false });

const SKILLS = [
  { name: 'JavaScript',   icon: 'javascript/javascript-original.svg',          color: '#f7df1e', category: 'lang' },
  { name: 'TypeScript',   icon: 'typescript/typescript-original.svg',           color: '#3178c6', category: 'lang' },
  { name: 'Python',       icon: 'python/python-original.svg',                   color: '#3776ab', category: 'lang' },
  { name: 'Java',         icon: 'java/java-original.svg',                       color: '#f89820', category: 'lang' },
  { name: 'React.js',     icon: 'react/react-original.svg',                     color: '#61dafb', category: 'frontend' },
  { name: 'Next.js',      icon: 'nextjs/nextjs-original.svg',                   color: '#ffffff', category: 'frontend', invert: true },
  { name: 'Tailwind CSS', icon: 'tailwindcss/tailwindcss-original.svg',         color: '#38bdf8', category: 'frontend' },
  { name: 'HTML5',        icon: 'html5/html5-original.svg',                     color: '#e34f26', category: 'frontend' },
  { name: 'CSS3',         icon: 'css3/css3-original.svg',                       color: '#1572b6', category: 'frontend' },
  { name: 'Node.js',      icon: 'nodejs/nodejs-original.svg',                   color: '#5fa04e', category: 'backend' },
  { name: 'Express',      icon: 'express/express-original.svg',                 color: '#ffffff', category: 'backend', invert: true },
  { name: 'PHP',          icon: 'php/php-original.svg',                         color: '#8892be', category: 'backend' },
  { name: 'MongoDB',      icon: 'mongodb/mongodb-original.svg',                 color: '#47a248', category: 'data' },
  { name: 'MySQL',        icon: 'mysql/mysql-original.svg',                     color: '#4479a1', category: 'data' },
  { name: 'TensorFlow',   icon: 'tensorflow/tensorflow-original.svg',           color: '#ff6f00', category: 'ai' },
  { name: 'Scikit-Learn', icon: 'scikitlearn/scikitlearn-original.svg',         color: '#f7931e', category: 'ai' },
  { name: 'Pandas',       icon: 'pandas/pandas-original.svg',                   color: '#6c6ead', invert: true, category: 'ai' },
  { name: 'NumPy',        icon: 'numpy/numpy-original.svg',                     color: '#4dabcf', category: 'ai' },
  { name: 'Jupyter',      icon: 'jupyter/jupyter-original-wordmark.svg',        color: '#f37626', category: 'ai' },
  { name: 'Git',          icon: 'git/git-original.svg',                         color: '#f05032', category: 'tools' },
  { name: 'GitHub',       icon: 'github/github-original.svg',                   color: '#ffffff', category: 'tools', invert: true },
  { name: 'VS Code',      icon: 'vscode/vscode-original.svg',                   color: '#007acc', category: 'tools' },
  { name: 'Arduino',      icon: 'arduino/arduino-original.svg',                 color: '#00979d', category: 'tools' },
];

const CATEGORIES = [
  { key: 'all',      label: 'All',         color: '#6366f1' },
  { key: 'lang',     label: 'Languages',   color: '#a78bfa' },
  { key: 'frontend', label: 'Frontend',    color: '#22d3ee' },
  { key: 'backend',  label: 'Backend',     color: '#34d399' },
  { key: 'data',     label: 'Database',    color: '#fbbf24' },
  { key: 'ai',       label: 'AI / ML',     color: '#f472b6' },
  { key: 'tools',    label: 'Tools',       color: '#fb923c' },
];

const DOMAINS = [
  { label: 'Deep Learning',              color: '#a78bfa' },
  { label: 'Neural Networks',            color: '#6366f1' },
  { label: 'Natural Language Processing',color: '#22d3ee' },
  { label: 'Transformer Architectures',  color: '#38bdf8' },
  { label: 'CNN / RNN / LSTM',           color: '#34d399' },
  { label: 'Agentic AI Development',     color: '#f472b6' },
  { label: 'Model Context Protocol',     color: '#fb923c' },
  { label: 'Data Visualization',         color: '#fbbf24' },
  { label: 'Feature Engineering',        color: '#a3e635' },
  { label: 'Hyperparameter Tuning',      color: '#f87171' },
  { label: 'Project Management',         color: '#c4b5fd' },
  { label: 'Team Leadership',            color: '#67e8f9' },
];

function SkillTile({ skill, index, prefersReducedMotion }: {
  skill: typeof SKILLS[0]; index: number; prefersReducedMotion: boolean | null;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.4, y: -12 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.55,
        delay: prefersReducedMotion ? 0 : index * 0.04,
        type: prefersReducedMotion ? 'tween' : 'spring',
        stiffness: 200, damping: 16,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative' }}
    >
      <motion.div
        animate={{
          borderColor: hovered ? `${skill.color}70` : 'rgba(255,255,255,0.06)',
          boxShadow: hovered
            ? `0 0 32px ${skill.color}45, 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`
            : '0 4px 12px rgba(0,0,0,0.3)',
          backgroundColor: hovered ? 'rgba(12,12,28,0.95)' : 'rgba(12,12,28,0.8)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          width: 92, height: 92, borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 9,
          cursor: 'default', backdropFilter: 'blur(12px)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Radial gradient hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(ellipse at center, ${skill.color}18 0%, rgba(12,12,28,0.97) 70%)`,
          }}
        />
        {/* Corner neon dots */}
        <motion.div animate={{ background: hovered ? skill.color : 'rgba(255,255,255,.10)', boxShadow: hovered ? `0 0 6px ${skill.color}` : 'none' }} transition={{ duration: 0.3 }}
          style={{ position: 'absolute', top: 7, left: 7, width: 4, height: 4, borderRadius: '50%' }} />
        <motion.div animate={{ background: hovered ? skill.color : 'rgba(255,255,255,.10)', boxShadow: hovered ? `0 0 6px ${skill.color}` : 'none' }} transition={{ duration: 0.3 }}
          style={{ position: 'absolute', top: 7, right: 7, width: 4, height: 4, borderRadius: '50%' }} />

        {/* Icon */}
        <motion.img
          src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}`}
          alt={skill.name}
          animate={prefersReducedMotion ? {} : {
            scale: hovered ? 1.25 : 1,
            filter: hovered
              ? `drop-shadow(0 0 10px ${skill.color}cc) ${skill.invert ? 'invert(1)' : ''}`
              : `drop-shadow(0 0 0px transparent) ${skill.invert ? 'invert(1)' : ''}`,
          }}
          style={{ width: 38, height: 38, objectFit: 'contain', filter: skill.invert ? 'invert(1)' : 'none', pointerEvents: 'none' }}
          transition={{ duration: 0.3 }}
        />

        {/* Label */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0.5, color: hovered ? skill.color : 'rgba(255,255,255,0.55)' }}
          transition={{ duration: 0.25 }}
          style={{
            fontFamily: 'var(--mono)', fontSize: '0.55rem', fontWeight: 600,
            letterSpacing: '.04em', textAlign: 'center', lineHeight: 1.2,
            maxWidth: 78, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}
        >
          {skill.name}
        </motion.span>
      </motion.div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.82 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.18, type: 'spring', stiffness: 480, damping: 20 }}
            style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', zIndex: 100, whiteSpace: 'nowrap' }}
          >
            <div style={{
              background: 'rgba(8,8,20,0.97)', backdropFilter: 'blur(20px)',
              border: `1px solid ${skill.color}55`, borderRadius: 10,
              padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 8,
              boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 20px ${skill.color}30`,
            }}>
              <motion.div animate={{ scale: [1, 1.4, 1], boxShadow: [`0 0 6px ${skill.color}`, `0 0 14px ${skill.color}`, `0 0 6px ${skill.color}`] }} transition={{ duration: 1, repeat: Infinity }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: skill.color }} />
              <span style={{ fontFamily: 'var(--sans)', fontSize: '.8rem', fontWeight: 700, color: '#fff' }}>{skill.name}</span>
            </div>
            <div style={{ width: 0, height: 0, margin: '0 auto', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${skill.color}55` }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CategoryFilter({ active, onChange, prefersReducedMotion }: {
  active: string; onChange: (k: string) => void; prefersReducedMotion: boolean | null;
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
      {CATEGORIES.map((c, i) => {
        const isActive = active === c.key;
        return (
          <motion.button
            key={c.key}
            onClick={() => onChange(c.key)}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              position: 'relative', padding: '9px 22px', borderRadius: 100,
              fontFamily: 'var(--mono)', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.06em',
              cursor: 'pointer', overflow: 'hidden',
              border: isActive ? `1px solid ${c.color}60` : '1px solid rgba(255,255,255,0.07)',
              background: isActive ? `${c.color}18` : 'rgba(255,255,255,0.03)',
              color: isActive ? c.color : 'rgba(255,255,255,0.45)',
              boxShadow: isActive ? `0 0 24px ${c.color}30` : 'none',
              transition: 'color .25s, background .25s, border-color .25s, box-shadow .25s',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="cat-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{
                  position: 'absolute', inset: 0, borderRadius: 100,
                  background: `${c.color}20`,
                }}
              />
            )}
            <span style={{ position: 'relative', zIndex: 1 }}>{c.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function DomainChip({ label, color, index, prefersReducedMotion }: { label: string; color: string; index: number; prefersReducedMotion: boolean | null }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.span
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.65, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay: prefersReducedMotion ? 0 : index * 0.05, type: 'spring', stiffness: 180, damping: 14 }}
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 20px', borderRadius: 100,
        fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 600,
        color: hovered ? color : 'rgba(255,255,255,0.65)',
        background: hovered ? `${color}20` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? `${color}60` : 'rgba(255,255,255,0.08)'}`,
        cursor: 'default',
        boxShadow: hovered ? `0 4px 20px ${color}35` : 'none',
        transition: 'color .25s, background .25s, border-color .25s, box-shadow .25s',
        display: 'inline-flex', alignItems: 'center', gap: 7,
      }}
    >
      <motion.span
        animate={{ background: hovered ? color : 'rgba(255,255,255,0.3)', boxShadow: hovered ? `0 0 8px ${color}` : 'none', scale: hovered ? 1.3 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ width: 6, height: 6, borderRadius: '50%', display: 'inline-block', flexShrink: 0 }}
      />
      {label}
    </motion.span>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const shouldReduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const domainsRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const domainsInView = useInView(domainsRef, { once: true, margin: '-60px' });

  const filtered = activeCategory === 'all' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);
  const activeCat = CATEGORIES.find(c => c.key === activeCategory)!;

  return (
    <section id="skills" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
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

      {/* Animated dotted grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1.5px, transparent 1px)',
        backgroundSize: '28px 28px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 88%)',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 20%, transparent 88%)',
      }} />

      {/* Ambient orbs */}
      <div style={{ position: 'absolute', top: '15%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 70%)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '55%', left: '48%', width: 320, height: 320, background: 'radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: 1100 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.7 }}
          style={{ marginBottom: 64, textAlign: 'center' }}
        >
          <p className="section-eyebrow" style={{ justifyContent: 'center' }}>04 / Stack</p>
          <h2 className="section-title">The <span className="text-gradient">Tech Stack</span></h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: 16, maxWidth: 500, lineHeight: 1.75, margin: '16px auto 0' }}>
            Technologies and tools I use to build scalable, high-performance applications and AI systems.
          </p>
        </motion.div>

        {/* Category filter */}
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} prefersReducedMotion={shouldReduceMotion} />

        {/* Active category label */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}
        >
          <motion.div
            animate={{ boxShadow: [`0 0 10px ${activeCat.color}`, `0 0 20px ${activeCat.color}`, `0 0 10px ${activeCat.color}`] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 9, height: 9, borderRadius: '50%', background: activeCat.color }}
          />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '.12em', textTransform: 'uppercase' }}>
            {activeCat.label} · {filtered.length} tools
          </span>
        </motion.div>

        {/* Skill tiles */}
        <div ref={gridRef}>
          {gridInView && (
            <motion.div
              layout
              style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(10px,2vw,16px)', marginBottom: 80, justifyContent: 'center' }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((skill, i) => (
                  <SkillTile key={skill.name} skill={skill} index={i} prefersReducedMotion={shouldReduceMotion} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', marginBottom: 48 }} />

        {/* Domains */}
        <div ref={domainsRef}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={domainsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '.2em', color: '#6366f1', marginBottom: 28 }}
          >
            Core Domains & Expertise Areas
          </motion.p>
          {domainsInView && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10 }}>
              {DOMAINS.map((d, i) => (
                <DomainChip key={d.label} label={d.label} color={d.color} index={i} prefersReducedMotion={shouldReduceMotion} />
              ))}
            </div>
          )}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 64 }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 20px rgba(99,102,241,0.15)', '0 0 40px rgba(99,102,241,0.28)', '0 0 20px rgba(99,102,241,0.15)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '13px 30px', borderRadius: 100,
              background: 'rgba(99,102,241,0.06)',
              border: '1px solid rgba(99,102,241,0.2)',
            }}
          >
            <span className="dot-live" />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'rgba(255,255,255,0.65)' }}>
              Always learning · Always shipping
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
