'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [slideOut, setSlideOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 1500);
    const t3 = setTimeout(() => setStage(3), 2800);
    const t4 = setTimeout(() => setStage(4), 3800);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, []);

  useEffect(() => {
    if (stage === 4) {
      const t = setTimeout(() => {
        setSlideOut(true);
        const t2 = setTimeout(() => onComplete(), 1200);
        return () => clearTimeout(t2);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  const showLogo = stage >= 1;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        transform: slideOut ? 'translateX(-100%)' : 'translateX(0)',
        transition: 'transform 1s ease-in-out',
        pointerEvents: 'none',
      }}
    >
      {/* Grid effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(rgba(255,200,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,200,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      {/* Logo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: showLogo ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
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