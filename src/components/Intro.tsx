'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 2100);
    const t3 = setTimeout(() => setStage(3), 4100);
    const t4 = setTimeout(() => {
      setIntroVisible(false);
      setTimeout(() => onComplete(), 1000);
    }, 5100);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [onComplete]);

  const showLogo = stage >= 1 && stage < 3;
  const isFading = stage >= 3;

  return (
    <div 
      ref={containerRef}
      className={`intro-wrapper ${isFading ? 'intro-fade-out' : ''} ${!introVisible ? 'intro-hidden' : ''}`}
    >
      <div className="intro-grid" />
      <div className="intro-logo-center">
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
