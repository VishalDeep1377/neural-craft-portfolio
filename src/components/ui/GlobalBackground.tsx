'use client';
import dynamic from 'next/dynamic';

const CursorGrid = dynamic(() => import('./CursorGrid'), { ssr: false });

export default function GlobalBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
      aria-hidden="true"
    >
      <CursorGrid
        cellSize={72}
        color="#6366f1"
        radius={160}
        falloff="smooth"
        holdTime={500}
        fadeDuration={1000}
        lineWidth={1.0}
        maxOpacity={0.75}
        fillOpacity={0.04}
        gridOpacity={0.032}
        cellRadius={6}
        clickPulse={true}
        pulseSpeed={550}
        listenOnWindow={true}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
