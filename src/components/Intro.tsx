'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<'enter' | 'exit-bg'>('enter');

  useEffect(() => {
    const logoExit = setTimeout(() => {
      setPhase('exit-bg');
    }, 3000);

    const complete = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(logoExit);
      clearTimeout(complete);
    };
  }, [onComplete]);

  return (
    <div className={`intro-wrapper ${phase === 'exit-bg' ? 'bg-fade' : ''}`}>
      <div className={`intro-logo ${phase === 'exit-bg' ? 'logo-exit' : 'logo-enter'}`}>
        <Image
          src="/flashmultimarcas/logo.png"
          alt="Flash Multimarcas"
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}