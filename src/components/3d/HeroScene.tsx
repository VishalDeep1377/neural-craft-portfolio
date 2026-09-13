'use client';

import { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useVideoTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fresnelVertexShader, fresnelFragmentShader } from '@/shaders/fresnelGlow';

gsap.registerPlugin(ScrollTrigger);



// ── Photo plane (inside Suspense so texture errors are caught) ───────────────
function MediaMesh({
  photoUrl,
  prefersReducedMotion,
}: {
  photoUrl: string;
  prefersReducedMotion: boolean;
}) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const revealRef = useRef(0);

  // drei useVideoTexture — throws a promise while loading (Suspense-compatible)
  const texture = useVideoTexture(photoUrl, {
    crossOrigin: 'Anonymous',
    muted: true,
    loop: true,
    start: true,
  });
  texture.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime:    { value: 0 },
    uHover:   { value: 0 },
    uReveal:  { value: 0 },
  }), [texture]);

  // Reveal wipe on mount
  useEffect(() => {
    if (prefersReducedMotion) { uniforms.uReveal.value = 1; return; }
    gsap.to(revealRef, {
      current: 1,
      duration: 1.6,
      delay: 0.4,
      ease: 'power2.out',
      onUpdate: () => { uniforms.uReveal.value = revealRef.current; },
    });
  }, [prefersReducedMotion, uniforms]);

  // GSAP scroll scrub for the card
  useEffect(() => {
    if (prefersReducedMotion || !groupRef.current) return;
    const group = groupRef.current;

    const trigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        group.rotation.y = p * Math.PI * 0.22;
        group.position.y = -p * 1.4;
        group.position.z =  p * 0.6;
      },
    });
    return () => trigger.kill();
  }, [prefersReducedMotion]);

  useFrame(({ clock, mouse }) => {
    uniforms.uTime.value = clock.getElapsedTime();
    if (prefersReducedMotion || !meshRef.current || !groupRef.current) return;

    // Gentle mouse-follow tilt
    const targetX = -mouse.y * 0.1;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, targetX, 0.04
    );

    // Breathing
    const breath = 1 + Math.sin(clock.getElapsedTime() * 0.7) * 0.004;
    meshRef.current.scale.setScalar(breath);
  });

  const W = 5.6, H = 3.15; // 16:9, fills canvas

  return (
    <group ref={groupRef}>
      {/* Purple glow behind card */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[W + 0.16, H + 0.16]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.14} />
      </mesh>

      {/* Corner accent lines — top-left */}
      <mesh position={[-W / 2 + 0.15, H / 2 - 0.15, 0.02]}>
        <planeGeometry args={[0.016, 0.55]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.95} />
      </mesh>
      <mesh position={[-W / 2 + 0.29, H / 2 - 0.016, 0.02]}>
        <planeGeometry args={[0.55, 0.016]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.95} />
      </mesh>

      {/* Corner accent lines — bottom-right */}
      <mesh position={[W / 2 - 0.15, -H / 2 + 0.15, 0.02]}>
        <planeGeometry args={[0.016, 0.55]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.95} />
      </mesh>
      <mesh position={[W / 2 - 0.29, -H / 2 + 0.016, 0.02]}>
        <planeGeometry args={[0.55, 0.016]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.95} />
      </mesh>

      {/* Photo plane */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <planeGeometry args={[W, H, 1, 1]} />
        <meshBasicMaterial 
          map={texture}
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>

    </group>
  );
}

// ── Fallback while photo loads ──────────────────────────────────────────────
function PhotoFallback() {
  const { scene } = useThree();
  void scene;
  return (
    <mesh>
      <planeGeometry args={[3.6, 2.025]} />
      <meshBasicMaterial color="#0f0f1e" transparent opacity={0.8} />
    </mesh>
  );
}

// ── Scene root ──────────────────────────────────────────────────────────────
function Scene({
  photoUrl,
  prefersReducedMotion,
}: {
  photoUrl: string;
  prefersReducedMotion: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={1.6} color="#6366f1" />
      <pointLight position={[-4, -2, 2]} intensity={0.9} color="#22d3ee" />
      <pointLight position={[0, 6, 2]} intensity={0.7} color="#a78bfa" />
      <pointLight position={[0, -3, 3]} intensity={0.4} color="#f472b6" />

      <Suspense fallback={<PhotoFallback />}>
        <MediaMesh photoUrl={photoUrl} prefersReducedMotion={prefersReducedMotion} />
      </Suspense>
    </>
  );
}

// ── WebGL check ─────────────────────────────────────────────────────────────
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

// ── Static CSS fallback (no WebGL / reduced motion) ─────────────────────────
function StaticPhotoFallback({ photoUrl }: { photoUrl: string }) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', borderRadius: 28, overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: -20, zIndex: -1,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(99,102,241,.35) 0%, transparent 70%)',
        filter: 'blur(40px)',
      }} />
      <video
        src={photoUrl}
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          objectPosition: 'top center', display: 'block',
          filter: 'contrast(1.06) saturate(0.92)',
          borderRadius: 28,
        }}
      />
      {/* Scanline overlay */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 28,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(99,102,241,.025) 3px, rgba(99,102,241,.025) 4px)',
        pointerEvents: 'none',
      }} />
      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 28,
        background: 'linear-gradient(0deg, rgba(7,7,16,1) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}

// ── Exported component ───────────────────────────────────────────────────────
export default function HeroScene({ photoUrl }: { photoUrl: string }) {
  const [canRender, setCanRender] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    setCanRender(detectWebGL());
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Still detecting — show nothing (avoids flash)
  if (canRender === null) return null;

  // WebGL unavailable — static CSS fallback
  if (!canRender || prefersReducedMotion) {
    return <StaticPhotoFallback photoUrl={photoUrl} />;
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 3.8], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => {
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      }}
    >
      <Scene photoUrl={photoUrl} prefersReducedMotion={prefersReducedMotion} />
    </Canvas>
  );
}
