'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [allFading, setAllFading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 100);
    const t2 = setTimeout(() => setLogoVisible(false), 2100);
    const t3 = setTimeout(() => setAllFading(true), 4100);
    const t4 = setTimeout(() => onComplete(), 5100);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className={`intro-container ${allFading ? 'intro-fading' : ''}`}
    >
      <div className="intro-grid" />

      <div className={`intro-logo-wrapper ${allFading ? 'intro-fading' : ''} ${logoVisible ? 'intro-visible' : ''}`}>
        <div className="intro-logo">
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
