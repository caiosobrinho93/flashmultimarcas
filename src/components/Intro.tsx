'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 3000);
    const t2 = setTimeout(() => onComplete(), 4000);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div className={`intro-wrapper ${!visible ? 'intro-fade-out' : ''}`}>
      <div className="intro-logo-anim">
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