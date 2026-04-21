'use client';

import { useState, useEffect, useRef } from 'react';

interface IntroProps {
  onComplete: () => void;
}

export default function Intro({ onComplete }: IntroProps) {
  const [stage, setStage] = useState(0);
  const [lightning, setLightning] = useState(false);
  const [flash, setFlash] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 200);
    const t2 = setTimeout(() => setFlash(true), 400);
    const t3 = setTimeout(() => setFlash(false), 500);
    const t4 = setTimeout(() => setLightning(true), 600);
    const t5 = setTimeout(() => setLightning(false), 700);
    const t6 = setTimeout(() => setStage(2), 1200);
    const t7 = setTimeout(() => setStage(3), 3500);
    const t8 = setTimeout(() => setStage(4), 4500);
    const t9 = setTimeout(() => onComplete(), 5000);

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      clearTimeout(t4); clearTimeout(t5); clearTimeout(t6);
      clearTimeout(t7); clearTimeout(t8); clearTimeout(t9);
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
      {/* Flash effect */}
      {flash && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#fff',
          animation: 'flashPop 0.15s ease-out',
        }} />
      )}

      {/* Lightning bolt */}
      {lightning && (
        <svg 
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '300px',
            filter: 'drop-shadow(0 0 30px #00f0ff) drop-shadow(0 0 60px #fff)',
            animation: 'lightningBolt 0.2s ease-out',
          }}
          viewBox="0 0 100 150"
        >
          <path 
            d="M50 0 L20 60 L45 60 L15 150 L85 70 L55 70 L95 0 Z" 
            fill="#00f0ff"
            stroke="#fff"
            strokeWidth="2"
          />
        </svg>
      )}

      {/* Grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(rgba(0,240,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,240,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Logo when visible */}
      {stage >= 2 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          opacity: stage === 2 ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}>
          {/* Logo Image - using same source as header */}
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 20px',
            background: '#ffc800',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `
              0 0 20px rgba(255,200,0,0.5),
              0 0 40px rgba(255,200,0,0.3),
              0 0 60px rgba(255,200,0,0.1)
            `,
            animation: 'logoPulse 2s ease-in-out infinite',
          }}>
            <span style={{
              fontFamily: '"Russo One", sans-serif',
              fontSize: '64px',
              color: '#000',
            }}>F</span>
          </div>
          
          <h1 style={{
            fontFamily: '"Russo One", sans-serif',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            margin: 0,
            textShadow: '0 0 20px rgba(255,255,255,0.5)',
          }}>
            Flash
          </h1>
          <p style={{
            fontFamily: '"Exo 2", sans-serif',
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            color: '#00f0ff',
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            marginTop: '10px',
            textShadow: '0 0 10px #00f0ff',
          }}>
            Multimarcas
          </p>
        </div>
      )}

      {/* Final fade */}
      {stage >= 3 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          animation: stage === 4 ? 'fadeOut 0.8s ease-out forwards' : 'none',
        }} />
      )}

      <style>{`
        @keyframes flashPop {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes lightningBolt {
          0% { opacity: 0; transform: translateX(-50%) scale(0.5); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.2); }
          100% { opacity: 0; transform: translateX(-50%) scale(1); }
        }
        @keyframes logoPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}