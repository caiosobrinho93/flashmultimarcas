'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [logoScale, setLogoScale] = useState(0.8);
  const [logoRotation, setLogoRotation] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoOpacity(1), 100);
    const t2 = setTimeout(() => setLogoScale(1), 100);
    const t3 = setTimeout(() => setLogoRotation(720), 100);
    const t4 = setTimeout(() => setLogoRotation(720 + 2880), 2000);
    const t5 = setTimeout(() => setLogoOpacity(0), 5000);
    const t6 = setTimeout(() => setLogoScale(0.5), 5000);
    const t7 = setTimeout(() => setContainerOpacity(0), 5500);
    const t8 = setTimeout(() => setHidden(true), 6500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, []);

  useEffect(() => {
    if (hidden) {
      onComplete();
    }
  }, [hidden, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: containerOpacity,
      transition: 'opacity 1s ease-out',
      pointerEvents: hidden ? 'none' : 'auto'
    }}>
      <div style={{
        width: '180px',
        height: '180px',
        position: 'relative',
        opacity: logoOpacity,
        transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
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
  );
}