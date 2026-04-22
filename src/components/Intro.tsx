'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [logoFade, setLogoFade] = useState(false);
  const [bgFade, setBgFade] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 2100);
    const t3 = setTimeout(() => setStage(3), 4100);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (stage === 3) {
      setLogoFade(true);
      const t = setTimeout(() => {
        setBgFade(true);
        const t2 = setTimeout(() => onComplete(), 1000);
        return () => clearTimeout(t2);
      }, 800);
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
        opacity: bgFade ? 0 : 1,
        transition: 'opacity 1s ease-out',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(rgba(255,200,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,200,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }} />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: logoFade ? 0 : (showLogo ? 1 : 0),
        transition: 'opacity 1s ease-in-out',
      }}>
        <div style={{ width: '150px', height: '150px', position: 'relative' }}>
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
