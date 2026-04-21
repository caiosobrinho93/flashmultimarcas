'use client';

import { useState, useEffect, useRef } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 800);
    const t3 = setTimeout(() => setTextVisible(true), 1200);
    const t4 = setTimeout(() => setStage(3), 3500);
    const t5 = setTimeout(() => setStage(4), 4500);
    const t6 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  if (stage === 5) return null;

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
      {/* Grid effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridPulse 2s ease-in-out infinite',
      }} />

      {/* Scanline effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
        pointerEvents: 'none',
      }} />

      {/* Flash text with glitch effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        {/* Logo letter F with glow */}
        <div style={{
          fontFamily: '"Russo One", sans-serif',
          fontSize: stage >= 2 ? 'clamp(4rem, 15vw, 10rem)' : '0rem',
          color: '#ffc800',
          textShadow: stage >= 2 ? `
            0 0 10px #ffc800,
            0 0 20px #ffc800,
            0 0 40px #ffc800,
            0 0 80px rgba(255,200,0,0.5)
          ` : 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: stage >= 2 ? 1 : 0,
        }}>
          F
        </div>

        {/* Text lines with typewriter effect */}
        <div style={{
          marginTop: 20,
          overflow: 'hidden',
          opacity: textVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          <h1 style={{
            fontFamily: '"Russo One", sans-serif',
            fontSize: 'clamp(1.5rem, 5vw, 3rem)',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.5em',
            margin: 0,
            textShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}>
            Flash
          </h1>
          <p style={{
            fontFamily: '"Exo 2", sans-serif',
            fontSize: 'clamp(0.8rem, 2vw, 1.2rem)',
            color: '#00f0ff',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            margin: '10px 0 0 0',
            textShadow: '0 0 10px #00f0ff',
          }}>
            Multimarcas
          </p>
        </div>
      </div>

      {/* Glitch lines */}
      {stage >= 1 && stage < 4 && (
        <>
          <div style={{
            position: 'absolute',
            top: '30%',
            left: 0,
            right: 0,
            height: 2,
            background: 'rgba(0,240,255,0.5)',
            animation: 'glitchLine 0.3s infinite',
          }} />
          <div style={{
            position: 'absolute',
            top: '70%',
            left: 0,
            right: 0,
            height: 2,
            background: 'rgba(255,200,0,0.3)',
            animation: 'glitchLine 0.4s infinite reverse',
          }} />
        </>
      )}

      {/* Final fade */}
      {stage >= 3 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          animation: stage === 4 ? 'fadeOut 0.8s ease-out forwards' : 'none',
          opacity: stage === 3 ? 0 : stage === 4 ? undefined : 0,
        }} />
      )}

      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes glitchLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}