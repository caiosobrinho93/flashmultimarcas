'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [bgFading, setBgFading] = useState(false);
  const [containerHidden, setContainerHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 2000);
    const t3 = setTimeout(() => setStage(3), 4000);
    const t4 = setTimeout(() => setStage(4), 4800);
    const t5 = setTimeout(() => setBgFading(true), 5800);
    const t6 = setTimeout(() => {
      setContainerHidden(true);
      onComplete();
    }, 6800);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  return (
    <div className={`intro-container ${bgFading ? 'bg-fade-out' : ''} ${containerHidden ? 'hidden' : ''}`}>
      <div className={`intro-logo-wrapper ${stage >= 1 ? 'logo-fade-in' : ''} ${stage === 2 ? 'logo-spin-start' : ''} ${stage >= 3 ? 'logo-spin-fast' : ''} ${stage === 4 ? 'logo-fade-out' : ''}`}>
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