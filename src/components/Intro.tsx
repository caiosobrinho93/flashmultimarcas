'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 1500);
    const t3 = setTimeout(() => setStage(3), 2800);
    const t4 = setTimeout(() => setStage(4), 3800);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [onComplete]);

  useEffect(() => {
    if (stage === 4) {
      setIsFadingOut(true);
      const t = setTimeout(() => onComplete(), 800);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  if (isFadingOut) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        opacity: 1,
        transition: 'opacity 0.8s ease-out',
      }} />
    );
  }

  const showLogo = stage >= 1;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        transition: isFadingOut ? 'opacity 0.8s ease-out' : (stage >= 3 ? 'opacity 1s ease-out' : 'none'),
        opacity: isFadingOut ? 1 : (stage >= 3 ? 0 : 1),
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