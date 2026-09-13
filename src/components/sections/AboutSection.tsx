'use client';
import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
} from 'framer-motion';
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

const EDU = [
  {
    degree: 'MCA — Generative AI',
    school: 'SRM Institute of Science and Technology',
    loc: 'Chennai, Tamil Nadu',
    period: '2026 – Expected 2028',
    status: 'pursuing',
    color: '#6366f1',
    glowColor: 'rgba(99,102,241,0.5)',
    detail: 'Coursework in large language model architectures, agentic systems, and applied generative AI — feeding directly into production work at Smartground Infotech.',
  },
  {
    degree: 'BCA — Data Science',
    school: 'Lovely Professional University',
    loc: 'Chennai, Tamil Nadu',
    period: '2022 – May 2025',
    grade: 'CGPA 8.0',
    status: 'completed',
    color: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.5)',
    detail: 'Foundation in statistics, DBMS, and applied machine learning — capstone work paired data pipelines with full-stack delivery.',
  },
];

const STATS = [
  { label: 'Production apps shipped', value: 4, color: '#6366f1', glow: 'rgba(99,102,241,0.35)', icon: '🚀' },
  { label: 'Certifications earned', value: 7, color: '#22d3ee', glow: 'rgba(34,211,238,0.35)', icon: '🏆' },
  { label: 'Hackathon podium finishes', value: 2, color: '#a78bfa', glow: 'rgba(167,139,250,0.35)', icon: '🥇' },
];

const SKILL_GLIMPSE = [
  { label: 'Languages', val: 'JS · TS · Py · Java', color: '#6366f1' },
  { label: 'Frameworks', val: 'Next.js · React · Node', color: '#22d3ee' },
  { label: 'AI/ML', val: 'PyTorch · FastAPI · GenAI', color: '#a78bfa' },
];

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function StatCard({ stat, active, delay }: { stat: typeof STATS[0]; active: boolean; delay: number }) {
  const value = useCountUp(stat.value, active);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        padding: '20px 16px',
        borderRadius: 18,
        background: hovered
          ? `linear-gradient(135deg, ${stat.color}18 0%, rgba(10,10,25,0.9) 100%)`
          : 'rgba(10,10,25,0.7)',
        border: `1px solid ${hovered ? stat.color + '55' : 'rgba(255,255,255,0.08)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.5), 0 0 30px ${stat.glow}` : '0 8px 24px rgba(0,0,0,0.3)',
        transition: 'all 0.35s ease',
        cursor: 'default',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated top shimmer on hover */}
      {hovered && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
            transformOrigin: 'left',
          }}
        />
      )}
      <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{stat.icon}</div>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '2.2rem',
        fontWeight: 800,
        color: stat.color,
        textShadow: hovered ? `0 0 20px ${stat.color}` : 'none',
        transition: 'text-shadow 0.3s',
        lineHeight: 1,
      }}>
        {value}+
      </div>
      <div style={{
        fontFamily: 'var(--mono)',
        fontSize: '.62rem',
        color: 'rgba(255,255,255,0.6)',
        marginTop: 8,
        letterSpacing: '.04em',
        lineHeight: 1.4,
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <p style={{
      color: 'var(--text)',
      lineHeight: 1.8,
      fontSize: '1.15rem',
      fontWeight: 500,
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0 7px',
    }}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: i * 0.025, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

function TiltPhoto({ photo }: { photo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const springX = useSpring(rotateX, { stiffness: 160, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 160, damping: 18 });
  const glow = useTransform(
    [glowX, glowY],
    ([gx, gy]: number[]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,.22), transparent 55%)`
  );

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 18);
    rotateX.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  }
  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ position: 'relative', perspective: 1200 }}>
      {/* Outer rainbow border glow */}
      <motion.div
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: -2, borderRadius: 28, zIndex: 0,
          background: 'linear-gradient(135deg, #6366f1, #22d3ee, #a78bfa, #ec4899, #6366f1)',
          backgroundSize: '300% 300%',
          opacity: 0.75,
        }}
      />
      <motion.div
        style={{
          position: 'relative', zIndex: 1,
          width: 'min(300px,100%)', aspectRatio: '3/4',
          borderRadius: 26, overflow: 'hidden',
          background: '#0b0b18',
          rotateX: springX, rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="Vishal Deep" style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top center',
          display: 'block',
          filter: 'contrast(1.06) saturate(1.02)',
        }} />
        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, rgba(7,7,16,.85) 100%)',
        }} />
        {/* Cursor-follow glow */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          background: glow,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }} />
        {/* Bottom name chip */}
        <div style={{
          position: 'absolute', bottom: 16, left: 16, right: 16,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          zIndex: 3,
        }}>
          <div>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '.95rem', color: '#fff' }}>Vishal Deep</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '.6rem', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Full Stack · AI Engineer</div>
          </div>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#22d3ee', boxShadow: '0 0 10px #22d3ee' }} />
        </div>
      </motion.div>
      {/* Ambient glow beneath */}
      <div style={{
        position: 'absolute', inset: -40, zIndex: -1,
        background: 'radial-gradient(ellipse, rgba(99,102,241,.25) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
    </div>
  );
}

function EduEntry({ e, isLast, isOpen, onToggle }: {
  e: typeof EDU[0]; isLast: boolean; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {/* Timeline line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          onClick={onToggle}
          animate={{
            scale: isOpen ? 1.4 : 1,
            boxShadow: isOpen ? `0 0 28px ${e.glowColor}` : `0 0 14px ${e.glowColor}60`,
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: 12, height: 12, borderRadius: '50%',
            background: e.color, cursor: 'pointer', flexShrink: 0,
            border: `2px solid ${e.color}50`,
          }}
        />
        {!isLast && (
          <motion.div
            style={{
              width: 1, flex: 1, minHeight: 50, margin: '6px 0',
              background: isOpen
                ? `linear-gradient(to bottom, ${e.color}80, rgba(255,255,255,0.06))`
                : 'rgba(255,255,255,0.07)',
            }}
          />
        )}
      </div>

      <button onClick={onToggle} style={{
        all: 'unset', cursor: 'pointer',
        paddingBottom: isLast ? 0 : 32, paddingTop: 2, flex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--mono)', fontSize: '.62rem',
            padding: '3px 10px', borderRadius: 100, fontWeight: 600,
            background: e.status === 'pursuing' ? `${e.color}18` : 'rgba(52,211,153,.1)',
            color: e.status === 'pursuing' ? e.color : '#34d399',
            border: `1px solid ${e.status === 'pursuing' ? e.color + '40' : 'rgba(52,211,153,.3)'}`,
          }}>
            {e.status === 'pursuing' ? '● In Progress' : '✓ Completed'}
          </span>
          {e.grade && (
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '.68rem',
              color: '#fbbf24', fontWeight: 600,
            }}>★ {e.grade}</span>
          )}
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', textAlign: 'left' }}>{e.degree}</p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.75rem', color: e.color, marginTop: 2, textAlign: 'left' }}>{e.school}</p>
        <p style={{ fontFamily: 'var(--mono)', fontSize: '.68rem', color: 'var(--text-3)', marginTop: 4, textAlign: 'left' }}>{e.period} · {e.loc}</p>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: '.84rem', lineHeight: 1.75,
                color: 'rgba(255,255,255,0.72)',
                overflow: 'hidden', textAlign: 'left',
                paddingLeft: 12,
                borderLeft: `2px solid ${e.color}60`,
              }}
            >
              {e.detail}
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default function AboutSection({ photo }: { photo: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeSkill, setActiveSkill] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => setActiveSkill(i => (i + 1) % SKILL_GLIMPSE.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="section" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
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

      {/* BG ambient orbs */}
      <div style={{ position: 'absolute', top: '10%', right: '-8%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 72 }}
        >
          <p className="section-eyebrow">01 / About</p>
          <h2 className="section-title">
            The Mind <span className="text-gradient">Behind The Code</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)',
          gap: isMobile ? 48 : 'clamp(48px,6vw,96px)',
          alignItems: 'start',
        }}>
          {/* LEFT — Copy + Stats + Education */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <WordReveal text="I didn't just study Computer Science — I rebuilt my understanding of it from first principles." />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '1rem' }}
            >
              Starting with a BCA in Data Science at Lovely Professional University, I obsessed over the intersection of data and intelligent systems. Now pursuing an MCA in Generative AI at SRM University, Chennai, I&apos;m not studying theory — I&apos;m shipping production AI systems that solve real problems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{ color: 'var(--text-2)', lineHeight: 1.85, fontSize: '1rem' }}
            >
              From building autonomous AI agents at Smartground Infotech to architecting multi-model chat systems — every project is a deliberate step toward one goal: creating technology that feels less like software and more like intelligence.
            </motion.p>

            {/* Animated Stat Cards */}
            <div ref={statsRef} style={{ display: 'flex', gap: 10, paddingTop: 4, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              {STATS.map((s, i) => (
                <StatCard key={s.label} stat={s} active={statsInView} delay={i * 0.14} />
              ))}
            </div>

            {/* Education Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginTop: 4 }}
            >
              <p className="section-eyebrow" style={{ marginBottom: 24 }}>Education — tap to expand</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {EDU.map((e, i) => (
                  <EduEntry
                    key={e.degree}
                    e={e}
                    isLast={i === EDU.length - 1}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Photo + Skills Quick-View */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: isMobile ? 0 : 24 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', paddingBottom: isMobile ? 0 : 56 }}
          >
            <TiltPhoto photo={photo} />

            {/* Floating Skills Quick-View Card */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              style={{
                position: isMobile ? 'relative' : 'absolute',
                bottom: isMobile ? 'auto' : -32,
                right: isMobile ? 'auto' : '-8%',
                marginTop: isMobile ? 16 : 0,
                padding: '18px 22px',
                borderRadius: 20,
                background: 'rgba(8,8,20,0.90)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                minWidth: isMobile ? 'auto' : 210,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <p style={{
                fontFamily: 'var(--mono)', fontSize: '.58rem',
                textTransform: 'uppercase', letterSpacing: '.15em',
                color: 'rgba(255,255,255,0.4)', marginBottom: 12,
              }}>
                Core Stack
              </p>
              {SKILL_GLIMPSE.map((s, i) => (
                <motion.div
                  key={s.label}
                  animate={{
                    opacity: activeSkill === i ? 1 : 0.5,
                    x: activeSkill === i ? 4 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}
                >
                  <motion.div
                    animate={{ scale: activeSkill === i ? [1, 1.5, 1] : 1, boxShadow: activeSkill === i ? `0 0 10px ${s.color}` : 'none' }}
                    transition={{ duration: 0.6 }}
                    style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.62rem', color: 'rgba(255,255,255,0.45)' }}>{s.label}:</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '.62rem', color: activeSkill === i ? s.color : 'rgba(255,255,255,0.65)', fontWeight: activeSkill === i ? 600 : 400, transition: 'color 0.3s' }}>{s.val}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}