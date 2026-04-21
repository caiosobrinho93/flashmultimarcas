'use client';

import { useState, useEffect, useRef } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState<'curtain' | 'logo' | 'fade' | 'done'>('curtain');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('logo'), 500);
    const timer2 = setTimeout(() => setStage('fade'), 2500);
    const timer3 = setTimeout(() => setStage('done'), 4000);
    const timer4 = setTimeout(() => onComplete(), 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Cortina - esquerda */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: stage === 'curtain' ? '50%' : '0%',
        background: '#ffc800',
        transition: 'width 1s ease-in-out',
        transitionDelay: stage === 'curtain' ? '0s' : '0.5s',
      }} />
      
      {/* Cortina - direita */}
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: stage === 'curtain' ? '50%' : '0%',
        background: '#ffc800',
        transition: 'width 1s ease-in-out',
        transitionDelay: stage === 'curtain' ? '0s' : '0.5s',
      }} />

      {/* Logo */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: stage === 'logo' || stage === 'fade' ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
        transitionDelay: stage === 'fade' ? '0s' : '0.3s',
      }}>
        <div style={{
          width: 100,
          height: 100,
          background: '#ffc800',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
          <span style={{
            fontFamily: '"Russo One", sans-serif',
            fontSize: 48,
            color: '#000',
          }}>F</span>
        </div>
        <h1 style={{
          fontFamily: '"Russo One", sans-serif',
          fontSize: 32,
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: 8,
        }}>Flash</h1>
        <p style={{
          fontFamily: '"Exo 2", sans-serif',
          fontSize: 14,
          color: '#00f0ff',
          textTransform: 'uppercase',
          letterSpacing: 4,
        }}>Multimarcas</p>
      </div>

      {/* Fade out final */}
      {stage === 'fade' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          animation: 'fadeOut 1s ease-out forwards',
        }} />
      )}
      <style>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}