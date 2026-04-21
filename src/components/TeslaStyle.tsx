'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';

interface TeslaStyleProps {
  vehicles: Vehicle[];
}

export default function TeslaStyle({ vehicles }: TeslaStyleProps) {
const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeroFading, setIsHeroFading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImgFading, setIsImgFading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showZoomMenu, setShowZoomMenu] = useState(false);
  const zoomOptions = [100, 150, 200, 300, 400];
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentCar = vehicles[currentIndex];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const goToCar = (index: number) => {
    if (index === currentIndex) return;
    setIsHeroFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsHeroFading(false);
    }, 300);
  };

const goNext = () => {
    if (vehicles.length <=1 || isTransitioning) return;
    setIsTransitioning(true);
    setIsHeroFading(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % vehicles.length);
    }, 500);
    setTimeout(() => {
      setIsHeroFading(false);
      setIsTransitioning(false);
    }, 800);
  };

  const goPrev = () => {
    if (vehicles.length <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setIsHeroFading(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev === 0 ? vehicles.length - 1 : prev - 1);
    }, 500);
    setTimeout(() => {
      setIsHeroFading(false);
      setIsTransitioning(false);
    }, 800);
  };

  const handleWhatsapp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${currentCar.model} ${currentCar.year} no valor de ${formatPrice(currentCar.price)}.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  const changeImage = (direction: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsHeroFading(true);
    setTimeout(() => {
      if (currentCar.images) {
        setCurrentImageIndex(prev => {
          const newIndex = direction === 1 
            ? (prev + 1) % currentCar.images!.length
            : prev === 0 ? currentCar.images!.length - 1 : prev - 1;
          return newIndex;
        });
      }
      setIsHeroFading(false);
    }, 500);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  const scrollToCar = (index: number) => {
    if (isTransitioning) return;
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setIsHeroFading(true);
    if (scrollRef.current) {
      const item = scrollRef.current.children[index] as HTMLElement;
      scrollRef.current.scrollTo({
        left: item.offsetLeft - 100,
        behavior: 'smooth'
      });
    }
    setTimeout(() => {
      setCurrentIndex(index);
    }, 500);
    setTimeout(() => {
      setIsHeroFading(false);
      setIsTransitioning(false);
    }, 800);
  };

  useEffect(() => {
    if (detailsModalOpen) return;
    const autoPlay = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(autoPlay);
  }, [detailsModalOpen, goNext]);

  return (
    <div className="tesla-wrapper">
      {/* Header */}
      <header className="tesla-header">
        <button className="menu-btn" onClick={() => !detailsModalOpen && setMenuOpen(!menuOpen)} disabled={detailsModalOpen}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        
        <div className="header-logo">
          <Image src="/logo.png" alt="Flash" width={80} height={28} style={{ width: 'auto', height: 'auto' }} />
        </div>

        
      </header>

      {/* Slide Menu - Estoque + Config Links */}
      <div className={`slide-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="menu-panel">
          {/* Barra fixa no topo */}
          <div className="menu-fixed-top">
            <div className="menu-config-links">
              <button className="close-menu" onClick={() => setMenuOpen(false)}>✕</button>
              <a href="/admin" className="menu-config-icon" title="Administrador">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
              </a>
              <a href="#" className="menu-config-icon" title="Quem Somos">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </a>
              <a href="#" className="menu-config-icon" title="Localização">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </a>
              <a href="#" className="menu-config-icon" title="Contato">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
              </a>
              <a href={`https://wa.me/55${storeInfo.whatsapp}`} target="_blank" className="menu-config-icon verde" title="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.16 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          <div className="menu-content">
            <div className="menu-title-area">
              <h3>ESTOQUE</h3>
              <span>{vehicles.length} veículos</span>
            </div>
            <div className="menu-grid">
              {vehicles.map((car, idx) => (
                <button key={car.id} className={`menu-item ${idx === currentIndex ? 'active' : ''}`} onClick={() => { goToCar(idx); setMenuOpen(false); }}>
                  <div className="menu-item-img">
                    <Image src={car.imageUrl} alt={car.model} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="menu-item-info">
                    <span className="brand">{car.brand}</span>
                    <span className="name">{car.model}</span>
                    <span className="price">{formatPrice(car.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnails Bar */}
      <div className="thumbnails-bar">
        <button className="thumb-nav left" onClick={() => scrollToCar(Math.max(0, currentIndex - 1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="thumbnails-track" ref={scrollRef}>
          {vehicles.map((car, idx) => (
            <button key={car.id} className={`thumb-item ${idx === currentIndex ? 'active' : ''}`} onClick={() => scrollToCar(idx)}>
              <div className="thumb-img">
                <Image src={car.imageUrl} alt={car.model} fill className="object-cover" sizes="80px" />
              </div>
            </button>
          ))}
        </div>
        <button className="thumb-nav right" onClick={() => scrollToCar(Math.min(vehicles.length - 1, currentIndex + 1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

{/* Car Info Bar */}
      <div className="car-info-bar">
        <div className="car-name-group">
          <span className="car-model">{currentCar.model}</span>
          <div className="car-model-info">
            <span className="car-brand">{currentCar.brand}</span>
            <span className="car-year">{currentCar.year}</span>
          </div>
        </div>
        <button 
          type="button" 
          className="action-button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDetailsModalOpen(true); }}
          title="Ver detalhes"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-11z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>

      {/* Thumbnails Bar */}
      <div className="thumbnails-bar">
        <button className="thumb-nav left" onClick={() => scrollToCar(Math.max(0, currentIndex - 1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="thumbnails-track" ref={scrollRef}>
          {vehicles.map((car, idx) => (
            <button key={car.id} className={`thumb-item ${idx === currentIndex ? 'active' : ''}`} onClick={() => scrollToCar(idx)}>
              <div className="thumb-img">
                <Image src={car.imageUrl} alt={car.model} fill className="object-cover" sizes="80px" />
              </div>
            </button>
          ))}
        </div>
        <button className="thumb-nav right" onClick={() => scrollToCar(Math.min(vehicles.length - 1, currentIndex + 1))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Hero Main */}
      <main 
          className={`tesla-hero ${isHeroFading ? 'fading' : ''} ${isTransitioning ? 'transition-effect effect-2' : ''} ${!isHeroFading ? 'effect-2' : ''}`} 
          style={{ backgroundImage: `url(${currentCar.imageUrl})` }}
        >

        <div className="hero-dots">
          {vehicles.map((_, idx) => (
            <button key={idx} className={`dot ${idx === currentIndex ? 'active' : ''}`} onClick={() => goToCar(idx)} />
          ))}
        </div>
      </main>

      {/* Details Modal - Novo Layout */}
      <div className={`gallery-modal ${detailsModalOpen ? 'open' : ''}`} style={{ zIndex: 50 }}>
        <div className="gallery-backdrop" />
        
        <button className="gallery-close" onClick={() => setDetailsModalOpen(false)}>
          ✕
        </button>
        
        {/* Contador no topo */}
        {currentCar.images && currentCar.images.length > 1 && (
          <div className="gallery-img-counter">
            {currentImageIndex + 1}/{currentCar.images.length}
          </div>
        )}
        
        {/* Setas laterais para navegar */}
        {currentCar.images && currentCar.images.length > 1 && (
          <>
            <button 
              className="gallery-arrow gallery-arrow-left" 
              onClick={() => changeImage(-1)}
            >
              ◀
            </button>
            <button 
              className="gallery-arrow gallery-arrow-right" 
              onClick={() => changeImage(1)}
            >
              ▶
            </button>
          </>
        )}

        {/* Zoom Menu */}
        <div className="gallery-zoom-menu">
          <button 
            className={`zoom-menu-btn ${zoomLevel === 100 ? 'active' : ''}`}
            onClick={() => setZoomLevel(100)}
          >
            1x
          </button>
          {zoomOptions.slice(1).map(opt => (
            <button 
              key={opt}
              className={`zoom-menu-btn ${zoomLevel === opt ? 'active' : ''}`}
              onClick={() => setZoomLevel(opt)}
            >
              {opt/100}x
            </button>
          ))}
        </div>
        
        {/* Imagem fullscreen ao fundo */}
        <div 
          className={`gallery-image-full ${isImgFading ? 'fading' : ''}`}
          style={{ 
            backgroundImage: `url(${currentCar.images ? currentCar.images[currentImageIndex] : currentCar.imageUrl})`,
            backgroundSize: zoomLevel === 100 ? 'contain' : 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Card flutuante com scroll interno */}
        <div className="gallery-float-card">
          {/* Linha 1: Nome + WhatsApp */}
          <div className="gallery-float-header">
            <div className="gallery-float-title-area">
              <span className="gallery-brand">{currentCar.brand}</span>
              <h2 className="gallery-title">{currentCar.model}</h2>
              <p className="gallery-year">{currentCar.year} · {currentCar.color}</p>
            </div>
            <button className="gallery-float-wpp" onClick={(e) => { e.stopPropagation(); handleWhatsapp(); }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>
          </div>
          
          
          {/* Área com scroll */}
          <div className="gallery-float-scroll">
            {/* Dados do veículo */}
            <div className="gallery-data-grid">
              <div className="data-item"><span className="data-label">KM</span><span className="data-value">{currentCar.mileage}</span></div>
              <div className="data-item"><span className="data-label">Comb</span><span className="data-value">{currentCar.fuel}</span></div>
              <div className="data-item"><span className="data-label">Câm</span><span className="data-value">{currentCar.transmission}</span></div>
              {currentCar.extras?.engine && <div className="data-item"><span className="data-label">Motor</span><span className="data-value">{currentCar.extras.engine}</span></div>}
              {currentCar.extras?.torque && <div className="data-item"><span className="data-label">Torque</span><span className="data-value">{currentCar.extras.torque}</span></div>}
              {currentCar.extras?.consumption && <div className="data-item"><span className="data-label">Consumo</span><span className="data-value">{currentCar.extras.consumption}</span></div>}
              {currentCar.extras?.traction && <div className="data-item"><span className="data-label">Tração</span><span className="data-value">{currentCar.extras.traction}</span></div>}
              {currentCar.extras?.acceleration && <div className="data-item"><span className="data-label">0-100</span><span className="data-value">{currentCar.extras.acceleration}</span></div>}
              {currentCar.extras?.capacity && <div className="data-item"><span className="data-label">Carga</span><span className="data-value">{currentCar.extras.capacity}</span></div>}
            </div>
            
            {/* Info extra */}
            <div className="gallery-info-row">
              {currentCar.extras?.ownership && <span className="info-pill">{currentCar.extras.ownership}</span>}
              {currentCar.extras?.ipva && <span className="info-pill">IPVA {currentCar.extras.ipva}</span>}
              {currentCar.extras?.inspection && <span className="info-pill">{currentCar.extras.inspection}</span>}
              {currentCar.extras?.accidentfree && <span className="info-pill">{currentCar.extras.accidentfree}</span>}
              {currentCar.extras?.maintenance && <span className="info-pill">{currentCar.extras.maintenance}</span>}
            </div>
            
            {/* Features */}
            <div className="gallery-features-grid">
              {currentCar.features.slice(0, 6).map((feat, idx) => (
                <span key={idx} className="feature-pill">{feat}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}