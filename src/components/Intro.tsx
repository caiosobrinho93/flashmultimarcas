'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { storeInfo } from '@/lib/data';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [containerVisible, setContainerVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 1600);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleWhatsapp = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      window.open(`https://wa.me/55${storeInfo.whatsapp}`, '_blank');
      setContainerVisible(false);
      setTimeout(() => onComplete(), 1000);
    }, 1000);
  };

  const handleAccessSite = () => {
    setStage(3);
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setContainerVisible(false);
        setTimeout(() => onComplete(), 1000);
      }, 1000);
    }, 1000);
  };

  const showLogo = stage >= 1;
  const showButtons = stage >= 2;

  return (
    <div className={`intro-container ${isFadingOut ? 'fade-out' : ''} ${!containerVisible ? 'hidden' : ''}`}>
      <div className={`intro-logo-wrapper ${showLogo ? 'visible' : ''}`}>
        <Image
          src="/flashmultimarcas/logo.png"
          alt="Flash Multimarcas"
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>
      
      <div className={`intro-buttons ${showButtons ? 'visible' : ''}`}>
        <button className="intro-btn intro-btn-site" onClick={handleAccessSite}>
          Acessar Site
        </button>
        <button className="intro-btn intro-btn-whats" onClick={handleWhatsapp}>
          WhatsApp
        </button>
      </div>
    </div>
  );
}