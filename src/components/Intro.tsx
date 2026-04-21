'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState<'start' | 'fadein' | 'hold' | 'fadeout' | 'done'>('start');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage('fadein'), 100);
    const t2 = setTimeout(() => setStage('hold'), 1200);
    const t3 = setTimeout(() => setStage('fadeout'), 3200);
    const t4 = setTimeout(() => setStage('done'), 4000);
    const t5 = setTimeout(() => onComplete(), 4200);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  const isVisible = stage === 'fadein' || stage === 'hold';
  const isFadingOut = stage === 'fadeout';

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
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
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
        opacity: isVisible ? 0.5 : 0,
        transition: 'opacity 0.5s ease',
      }} />

      {/* Logo with fade effect */}
      <div style={{
        opacity: isVisible ? 1 : 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
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
    </div>
  );
}