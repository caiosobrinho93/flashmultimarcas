'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';

interface TeslaStyleProps {
  vehicles: Vehicle[];
}

export default function TeslaStyle({ vehicles }: TeslaStyleProps) {
  const [centerIndex, setCenterIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHeroFading, setIsHeroFading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isImgFading, setIsImgFading] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showZoomMenu, setShowZoomMenu] = useState(false);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const [carEffect, setCarEffect] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const zoomOptions = [100, 150, 200, 300, 400];
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);

  const goToCar = (index: number) => {
    if (index < 0 || index >= vehicles.length) return;
    scrollPosRef.current = index * 100;
    if (scrollRef.current) {
      const item = scrollRef.current.children[index] as HTMLElement;
      if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    setCenterIndex(index);
    setIsHeroFading(true);
    setTimeout(() => setIsHeroFading(false), 600);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  const currentCar = vehicles[centerIndex];

  const handleWhatsapp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${currentCar.model} ${currentCar.year} no valor de ${formatPrice(currentCar.price)}.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  const changeImage = (direction: number) => {
    if (!currentCar.images || currentCar.images.length <= 1) return;
    setCurrentImageIndex(prev => {
      if (direction === 1) {
        return (prev + 1) % currentCar.images!.length;
      } else {
        return prev === 0 ? currentCar.images!.length - 1 : prev - 1;
      }
    });
    setIsImgFading(true);
    setTimeout(() => setIsImgFading(false), 300);
  };

useEffect(() => {
    setTimeout(() => {
      const firstItem = scrollRef.current?.children[0] as HTMLElement;
      if (firstItem) {
        firstItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (centerIndex + 1) % vehicles.length;
      
      scrollPosRef.current = nextIndex * 100;
      if (scrollRef.current) {
        const item = scrollRef.current.children[nextIndex] as HTMLElement;
        if (item) item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      
      setCenterIndex(nextIndex);
      setIsHeroFading(true);
      setTimeout(() => setIsHeroFading(false), 400);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [centerIndex, vehicles.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const pause = () => container.style.animationPlayState = 'paused';
    const resume = () => container.style.animationPlayState = 'running';
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    return () => {
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, []);

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
          <Image src="/flashmultimarcas/logo.png" alt="Flash" width={80} height={28} style={{ width: 'auto', height: 'auto' }} />
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
              <a href="/flashmultimarcas/admin" className="menu-config-icon" title="Administrador">
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
                <button key={car.id} className={`menu-item ${idx === centerIndex ? 'active' : ''}`} onClick={() => { goToCar(idx); setMenuOpen(false); }}>
                  <div className="menu-item-img">
                    <Image src={`/flashmultimarcas${car.imageUrl}`} alt={car.model} fill className="object-cover" sizes="80px" />
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

      {/* Car Info Bar - NOVO DESIGN GAMER */}
      <div className="car-info-bar">
        <div className="car-name-group">
          <div className="car-model-gamer">
            <span>{currentCar.model}</span>
            <div className="car-model-gamer-fire" />
          </div>
          <div className="car-model-sub">
            <span className="car-year">{currentCar.year}</span>
            <span className="car-brand">{currentCar.brand}</span>
            <button 
              type="button" 
              className="details-mini-btn"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setDetailsModalOpen(true); }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-11z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Ver detalhes
            </button>
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

      {/* Thumbnails Bar - Novo Design */}
      <div className="thumbnails-bar">
        <div className="thumbnails-track-new" ref={scrollRef}>
          {vehicles.map((car, idx) => (
            <button 
              key={car.id} 
              className={`thumb-item-new ${idx === centerIndex ? 'active' : ''}`} 
              onClick={() => goToCar(idx)}
            >
              <div className="thumb-img-new">
                <Image src={`/flashmultimarcas${car.imageUrl}`} alt={car.model} fill className="object-cover" sizes="80px" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Main */}
      <main 
          className={`tesla-hero ${isHeroFading ? 'fading' : ''} effect-${carEffect}`} 
          style={{ backgroundImage: `url(/flashmultimarcas${currentCar.imageUrl})` }}
        >

        <div className="hero-dots">
          {vehicles.map((_, idx) => (
            <button key={idx} className={`dot ${idx === centerIndex ? 'active' : ''}`} onClick={() => goToCar(idx)} />
          ))}
        </div>
      </main>

      {/* Details Modal - Novo Layout */}
      <div className={`gallery-modal ${detailsModalOpen ? 'open' : ''}`} style={{ zIndex: 50 }}>
        <div className="gallery-backdrop" />
        
        <button className="gallery-close" onClick={() => { setDetailsModalOpen(false); setDetailsExpanded(false); }}>
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
            backgroundImage: `url(/flashmultimarcas${currentCar.images ? currentCar.images[currentImageIndex] : currentCar.imageUrl})`,
            backgroundSize: zoomLevel === 100 ? 'contain' : 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Card flutuante com scroll interno */}
        <div className={`gallery-float-card ${detailsExpanded ? 'expanded' : ''}`}>
          {/* Linha 1: Nome + WhatsApp */}
          <div className="gallery-float-header">
            <div className="gallery-float-title-area">
              <span className="gallery-brand">{currentCar.brand}</span>
              <h2 className="gallery-title">{currentCar.model}</h2>
              <p className="gallery-year">{currentCar.year} · {currentCar.color}</p>
            </div>
            <button className="gallery-float-wpp" onClick={(e) => { e.stopPropagation(); handleWhatsapp(); }}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>
          </div>
          
          
          {/* Área com scroll */}
          <div className="gallery-float-scroll">
            {/* Botão para expandir informações */}
            <button 
              className="details-toggle-btn"
              onClick={() => setDetailsExpanded(!detailsExpanded)}
            >
              {detailsExpanded ? '▼ Ver menos' : '▶ Ver mais características'}
            </button>
            
            {detailsExpanded && (
              <div className="details-expanded-content">
                {/* Grade de especificações */}
                <div className="specs-grid-new">
                  <div className="spec-item-new">
                    <span className="spec-item-new-icon">🛣️</span>
                    <div className="spec-item-new-content">
                      <span className="spec-item-new-label">Quilometragem</span>
                      <span className="spec-item-new-value">{currentCar.mileage}</span>
                    </div>
                  </div>
                  <div className="spec-item-new">
                    <span className="spec-item-new-icon">⛽</span>
                    <div className="spec-item-new-content">
                      <span className="spec-item-new-label">Combustível</span>
                      <span className="spec-item-new-value">{currentCar.fuel}</span>
                    </div>
                  </div>
                  <div className="spec-item-new">
                    <span className="spec-item-new-icon">⚙️</span>
                    <div className="spec-item-new-content">
                      <span className="spec-item-new-label">Câmbio</span>
                      <span className="spec-item-new-value">{currentCar.transmission}</span>
                    </div>
                  </div>
                  <div className="spec-item-new">
                    <span className="spec-item-new-icon">🎨</span>
                    <div className="spec-item-new-content">
                      <span className="spec-item-new-label">Cor</span>
                      <span className="spec-item-new-value">{currentCar.color}</span>
                    </div>
                  </div>
                  
                  {currentCar.extras?.engine && (
                    <div className="spec-item-new">
                      <span className="spec-item-new-icon">🔧</span>
                      <div className="spec-item-new-content">
                        <span className="spec-item-new-label">Motor</span>
                        <span className="spec-item-new-value">{currentCar.extras.engine}</span>
                      </div>
                    </div>
                  )}
                  {currentCar.extras?.acceleration && (
                    <div className="spec-item-new">
                      <span className="spec-item-new-icon">🚀</span>
                      <div className="spec-item-new-content">
                        <span className="spec-item-new-label">0-100 km/h</span>
                        <span className="spec-item-new-value">{currentCar.extras.acceleration}</span>
                      </div>
                    </div>
                  )}
                  {currentCar.extras?.traction && (
                    <div className="spec-item-new">
                      <span className="spec-item-new-icon">🔗</span>
                      <div className="spec-item-new-content">
                        <span className="spec-item-new-label">Tração</span>
                        <span className="spec-item-new-value">{currentCar.extras.traction}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Info extra badges em linha */}
                <div className="gallery-info-row">
                  {currentCar.extras?.ownership && <span className="info-pill">{currentCar.extras.ownership}</span>}
                  {currentCar.extras?.ipva && <span className="info-pill">IPVA {currentCar.extras.ipva}</span>}
                  {currentCar.extras?.inspection && <span className="info-pill">{currentCar.extras.inspection}</span>}
                  {currentCar.extras?.accidentfree && <span className="info-pill">{currentCar.extras.accidentfree}</span>}
                  {currentCar.extras?.maintenance && <span className="info-pill">{currentCar.extras.maintenance}</span>}
                </div>
                
                {/* Features em lista */}
                <div className="features-list">
                  <h4>Opcionais</h4>
                  <ul>
                    {(currentCar.features || []).slice(0, 8).map((feat, idx) => (
                      <li key={idx}>{feat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}