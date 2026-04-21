'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';

interface PremiumSiteProps {
  vehicles: Vehicle[];
}

export default function PremiumSite({ vehicles }: PremiumSiteProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentCar = vehicles[currentIndex];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => prev === 0 ? vehicles.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % vehicles.length);
  };

  const handleSelectCar = (index: number) => {
    setCurrentIndex(index);
    setMenuOpen(false);
  };

  const handleBuy = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${currentCar.model} ${currentCar.year} valor ${formatPrice(currentCar.price)}.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${storeInfo.phone}`;
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`premium-container ${menuOpen ? 'menu-open' : ''}`}>
      {/* Header */}
      <header className="premium-header">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M3 12h18M3 6h18M3 18h18" />
              </>
            )}
          </svg>
        </button>

        <Link href="/" className="logo" onClick={() => setMenuOpen(false)}>
          <Image src="/logo.png" alt="Flash" width={120} height={40} style={{ width: 'auto', height: 'auto' }} />
        </Link>

        <div className="header-actions">
          <button className="call-btn" onClick={handleCall}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.44 16.86a2.41 2.41 0 0 0-.67-1.12l-2.2-1.47a2.31 2.31 0 0 0-1.27-.39 20.59 20.59 0 0 1-6.64-.07 2.26 2.26 0 0 0-1.23.37l-2.18 1.45a2.41 2.41 0 0 0-1.13.66l-.45.73a22.22 22.22 0 0 0 4.76 7.46"/>
            </svg>
          </button>
          <Link href={`https://wa.me/55${storeInfo.whatsapp}`} target="_blank" className="whatsapp-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207z"/>
            </svg>
          </Link>
        </div>
      </header>

      {/* Side Menu */}
      <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <h3>NOSSO ESTOQUE</h3>
          <span>{vehicles.length} veículos</span>
        </div>
        
        <div className="menu-cars">
          {vehicles.map((car, idx) => (
            <button 
              key={car.id}
              className={`menu-car-item ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => handleSelectCar(idx)}
            >
              <div className="menu-car-thumb">
                <Image src={car.imageUrl} alt={car.model} fill className="object-cover" />
              </div>
              <div className="menu-car-info">
                <span className="brand">{car.brand}</span>
                <span className="model">{car.model}</span>
                <span className="price">{formatPrice(car.price)}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="menu-footer">
          <p>{storeInfo.address}</p>
          <p>{storeInfo.phone}</p>
        </div>
      </div>

      {/* Overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* Hero Car */}
      <div className="hero-container">
        <div className="hero-image">
          {isLoaded && (
            <Image 
              src={currentCar.imageUrl} 
              alt={currentCar.model} 
              fill 
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Navigation Arrows */}
        <button className="nav-arrow prev" onClick={handlePrev}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button className="nav-arrow next" onClick={handleNext}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Car Counter */}
        <div className="car-counter">
          <span>{currentIndex + 1}</span>
          <span>/</span>
          <span>{vehicles.length}</span>
        </div>

        {/* Car Info */}
        <div className="hero-info">
          <p className="car-brand">{currentCar.brand}</p>
          <h1 className="car-model">{currentCar.model}</h1>
          <p className="car-year">{currentCar.year}</p>
        </div>

        {/* Specs Pills */}
        <div className="hero-specs">
          <div className="spec-pill">
            <span className="label">KM</span>
            <span className="value">{currentCar.mileage}</span>
          </div>
          <div className="spec-pill">
            <span className="label">Comb</span>
            <span className="value">{currentCar.fuel}</span>
          </div>
          <div className="spec-pill">
            <span className="label">Câmbio</span>
            <span className="value">{currentCar.transmission}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="hero-cta">
          <div className="price">{formatPrice(currentCar.price)}</div>
          <button className="cta-btn" onClick={handleBuy}>
            TENHO INTERESSE
          </button>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="dots-indicator">
        {vehicles.map((_, idx) => (
          <button 
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}