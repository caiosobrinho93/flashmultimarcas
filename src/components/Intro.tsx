'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setLogoVisible(true), 600);
    const t3 = setTimeout(() => setStage(2), 3000);
    const t4 = setTimeout(() => setLogoVisible(false), 3500);
    const t5 = setTimeout(() => setStage(3), 4200);
    const t6 = setTimeout(() => onComplete(), 4800);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
    };
  }, [onComplete]);

  if (stage === 4) return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Grid effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(rgba(255,200,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,200,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Logo with fade effect */}
      <div style={{
        opacity: logoVisible ? 1 : 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: logoVisible ? 'scale(1)' : 'scale(0.95)',
        transition: 'all 1s ease-in-out',
      }}>
        <div style={{
          position: 'relative',
          width: '150px',
          height: '150px',
        }}>
          <Image
            src="/flashmultimarcas/logo.png"
            alt="Flash Multimarcas"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>

      {/* Final fade to black */}
      {stage >= 2 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          animation: stage === 3 ? 'introFadeOut 0.8s ease-out forwards' : 'none',
        }} />
      )}

      <style>{`
        @keyframes introFadeOut {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}