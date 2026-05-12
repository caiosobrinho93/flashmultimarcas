'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';
import { prefixPath } from '@/lib/utils';

interface TeslaStyleProps {
  vehicles: Vehicle[];
}

export default function TeslaStyle({ vehicles }: TeslaStyleProps) {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  const isTransitioning = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const goToCar = (index: number) => {
    console.log("goToCar called:", index, vehicles[index]?.model);
    if (index < 0 || index >= vehicles.length) return;
    if (isTransitioning.current) return;
    if (index === centerIndex) return;
    
    isTransitioning.current = true;
    setIsFadingOut(true);
    
    setTimeout(() => {
      setCenterIndex(index);
      setAnimKey(prev => prev + 1);
      setGalleryIndex(0);
      setShowFullSpecs(false);
      
      setTimeout(() => {
        setIsFadingOut(false);
        isTransitioning.current = false;
      }, 100);
    }, 400);
  };

  useEffect(() => {
    // Loop Automático Infinito - 3 segundos
    let interval: NodeJS.Timeout | null = null;
    
    if (!detailsModalOpen && !menuOpen) {
      interval = setInterval(() => {
        setCenterIndex((prev) => (prev + 1) % vehicles.length);
        setAnimKey(k => k + 1);
      }, 3000); // 3 Segundos de intervalo
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [vehicles.length, detailsModalOpen, menuOpen, centerIndex]); // Adicionado centerIndex para resetar o timer ao clicar

  useEffect(() => {
    if (trackRef.current) {
      const activeItem = trackRef.current.children[centerIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [centerIndex]);

  const currentCar = vehicles[centerIndex];
  
  const carImages = currentCar?.images && currentCar.images.length > 0 
    ? currentCar.images 
    : [currentCar?.imageUrl || ''];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryIndex((prev) => (prev + 1) % carImages.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGalleryIndex((prev) => (prev - 1 + carImages.length) % carImages.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const handleWhatsapp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${currentCar.model} ${currentCar.year} no valor de ${formatPrice(currentCar.price)}.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <div className="tesla-wrapper bg-black overflow-hidden select-none">
      <div className="scanline" />
      
      {/* HUD Header */}
      <div className="lobby-header">
        <button 
          className="menu-v2-trigger"
          onClick={() => setMenuOpen(true)}
        >
          <div className="burger-line" />
          <div className="burger-line" />
          <div className="burger-line" />
        </button>
        
        <div className="logo-container-refined" style={{ width: '120px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <img 
            src={prefixPath('/logo.png')} 
            alt="Flash" 
            style={{ 
              width: '100px',
              height: 'auto',
              display: 'block',
              pointerEvents: 'none',
              mixBlendMode: 'screen', /* Tenta remover fundo preto se for cor pura */
              filter: 'brightness(1.2)' /* Melhora visibilidade do logo */
            }}
          />
        </div>
      </div>

      {/* Side Menu */}
      <div className={`menu-v2-panel ${menuOpen ? 'open' : ''}`} style={{ zIndex: 3000 }}>
        <div className="flex justify-between items-center mb-10">
          <span className="font-russo text-yellow text-xs tracking-widest">SISTEMA</span>
          <button onClick={() => setMenuOpen(false)} className="text-white hover:text-yellow text-2xl">✕</button>
        </div>
        
        <nav className="menu-v2-links">
          <a href="#" className="menu-v2-link" onClick={(e) => { e.preventDefault(); setMenuOpen(false); }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            GARAGEM
          </a>
          <a href={prefixPath('/admin')} className="menu-v2-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            ADMINISTRAÇÃO
          </a>
          <a href={`https://wa.me/55${storeInfo.whatsapp}`} target="_blank" className="menu-v2-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
            CONTATO
          </a>
        </nav>
      </div>

      {/* Fundo do Veículo */}
      <div 
        key={`bg-${currentCar.id}-${animKey}`}
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 pointer-events-none bg-zoom-out`}
        style={{ 
          backgroundImage: `url(${currentCar.imageUrl.startsWith('http') ? currentCar.imageUrl : prefixPath(currentCar.imageUrl)})`,
          zIndex: 1
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
      </div>

      {/* Lobby Overlay HUD */}
      <div className="lobby-v2">
        <div className="hero-text-block">
          <h1 className="hero-model-name-refined">{currentCar.model}</h1>
          <div className="hero-year-tag-refined">{currentCar.year}</div>
        </div>

        <div className="side-action-panel">
          <button 
            className="btn-gamer-hud" 
            onClick={() => setDetailsModalOpen(true)}
          >
            <span className="bracket text-yellow">[</span>
            <span className="btn-text">VER DETALHES</span>
            <span className="bracket text-yellow">]</span>
          </button>
        </div>

        <div className="footer-hud">
          <div className="selector-v2">
            <div className="track-v2" ref={trackRef}>
              {vehicles.map((car, idx) => (
                <div 
                  key={car.id} 
                  className={`item-v2 ${idx === centerIndex ? 'active' : ''}`}
                  onClick={() => {
                    console.log("Car Selector Item Clicked:", car.model, "Index:", idx);
                    goToCar(idx);
                  }}
                >
                  <Image 
                    src={car.imageUrl.startsWith('http') ? car.imageUrl : prefixPath(car.imageUrl)} 
                    alt={car.model} 
                    fill 
                    className="object-cover" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detalhes */}
      <div className={`gallery-modal ${detailsModalOpen ? 'open' : ''}`}>
        <div className="gallery-backdrop" onClick={() => {
          console.log("Backdrop Clicked - Closing Modal");
          setDetailsModalOpen(false);
        }} />
        
        <div className="gallery-top-bar">
          <button className="gallery-close" onClick={() => {
            console.log("Close Button Clicked");
            setDetailsModalOpen(false);
          }}>✕</button>
        </div>
        
        {/* Gallery Slider - Refined Arrows */}
        <div className="relative w-full h-[60vh] md:h-full flex items-center justify-center pointer-events-none">
          {carImages[galleryIndex] && (
            <div 
              className="gallery-image-full pointer-events-auto w-full h-full"
              style={{ 
                backgroundImage: `url(${carImages[galleryIndex].startsWith('http') ? carImages[galleryIndex] : prefixPath(carImages[galleryIndex])})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            />
          )}
          
          {carImages.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10">
              <button 
                className="pointer-events-auto z-50 p-4 bg-black/50 text-white rounded-full hover:bg-yellow hover:text-black transition-all shadow-xl border border-white/10" 
                onClick={prevImage}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button 
                className="pointer-events-auto z-50 p-4 bg-black/50 text-white rounded-full hover:bg-yellow hover:text-black transition-all shadow-xl border border-white/10" 
                onClick={nextImage}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-50">
                {carImages.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === galleryIndex ? 'bg-yellow scale-125' : 'bg-white/30'}`} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Info Card - Spec Toggle */}
        <div className={`gallery-float-card ${showFullSpecs ? 'expanded' : ''} pointer-events-auto`}>
           <div className="gallery-float-header">
            <div className="gallery-float-title-area">
              <span className="gallery-brand" style={{ color: 'var(--neon-yellow)' }}>{currentCar.brand}</span>
              <h2 className="gallery-title">{currentCar.model}</h2>
              <p className="gallery-year">{currentCar.year} · {currentCar.color}</p>
              
              <button 
                className="mt-5 flex items-center gap-3 text-yellow font-russo text-[11px] tracking-[0.2em] hover:brightness-125 transition-all group"
                onClick={() => {
                  console.log("Spec Toggle Clicked. New State:", !showFullSpecs);
                  setShowFullSpecs(!showFullSpecs);
                }}
              >
                {showFullSpecs ? 'OCULTAR DETALHES' : 'MOSTRAR DETALHES'}
                <svg className={`transition-transform duration-300 ${showFullSpecs ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          </div>
          
          {showFullSpecs && (
            <div className="gallery-float-scroll animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
              <div className="specs-professional">
                <div className="spec-row">
                  <div className="spec-key">Quilometragem</div>
                  <div className="spec-value">{currentCar.mileage}</div>
                </div>
                <div className="spec-row">
                  <div className="spec-key">Câmbio</div>
                  <div className="spec-value">{currentCar.transmission}</div>
                </div>
                <div className="spec-row">
                  <div className="spec-key">Preço</div>
                  <div className="spec-value" style={{ color: 'var(--neon-blue)' }}>{formatPrice(currentCar.price)}</div>
                </div>
              </div>
              
              {currentCar.features && currentCar.features.length > 0 && (
                <div className="features-list">
                  <h4>EQUIPAMENTOS DE SÉRIE</h4>
                  <ul>
                    {currentCar.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <button 
                className="hud-main-cta w-full mt-8"
                onClick={handleWhatsapp}
              >
                ADQUIRIR AGORA (WHATSAPP)
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .tesla-wrapper {
          height: 100vh;
          width: 100vw;
          position: relative;
        }
        .tesla-hero-container {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .tesla-hero {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: opacity 0.4s ease-in-out, transform 0.8s ease-out;
        }
        .fading-out {
          opacity: 0;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}