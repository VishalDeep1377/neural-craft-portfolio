'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [label, setLabel]       = useState('');
  const [hovered, setHovered]   = useState(false);
  const [visible, setVisible]   = useState(false);

  // Raw position for the tiny dot (instant)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Premium physics for the trailing ring (buttery smooth)
  const springX = useSpring(mouseX, { stiffness: 800, damping: 35, mass: 0.3 });
  const springY = useSpring(mouseY, { stiffness: 800, damping: 35, mass: 0.3 });

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer:coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!visible) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        springX.jump(e.clientX);
        springY.jump(e.clientY);
        setVisible(true);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('[data-cursor], a, button, input, textarea') as HTMLElement | null;
      if (el) {
        const text = el.getAttribute('data-cursor');
        // Fallback default verbs based on element tag if no data-cursor is provided
        if (!text) {
          if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') setLabel('Type');
          else setLabel('View');
        } else {
          setLabel(text);
        }
        setHovered(true);
      }
    };
    
    // Using mouseout to clear when leaving an element
    const onMouseOut = (e: MouseEvent) => {
      const el = (e.relatedTarget as HTMLElement)?.closest('[data-cursor], a, button, input, textarea');
      if (!el) {
        setLabel('');
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, [mouseX, mouseY, springX, springY, visible]);

  return (
    <>
      {/* 
        PREMIUM TRAILING CIRCLE
        Uses mix-blend-mode difference for an award-winning aesthetic. 
      */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9997,
          mixBlendMode: 'difference',
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 84 : 32,
            height: hovered ? 84 : 32,
            backgroundColor: hovered ? '#ffffff' : 'transparent',
            border: hovered ? '0px solid transparent' : '1.5px solid rgba(255,255,255,0.7)',
            opacity: visible ? 1 : 0
          }}
          transition={{ type: 'spring', stiffness: 450, damping: 25, mass: 0.5 }}
          style={{
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Label Text - Black color translates to "transparent" via difference blend! */}
          <motion.span
            animate={{ 
              opacity: hovered && label ? 1 : 0, 
              scale: hovered && label ? 1 : 0.4 
            }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ color: '#000000', lineHeight: 1 }}
            className="font-mono text-[0.6rem] font-bold tracking-[0.15em] uppercase text-center"
          >
            {label}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* 
        TINY INSTANT DOT 
        Sits exactly on the mouse coordinates
      */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          x: mouseX, y: mouseY,
          translateX: '-50%', translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference'
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 0 : 5,
            height: hovered ? 0 : 5,
            opacity: visible ? 1 : 0
          }}
          transition={{ duration: 0.15 }}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '50%'
          }}
        />
      </motion.div>
    </>
  );
}
