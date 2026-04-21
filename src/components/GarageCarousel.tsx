'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';

interface GarageCarouselProps {
  vehicles: Vehicle[];
}

export default function GarageCarousel({ vehicles }: GarageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isLoaded, setIsLoaded] = useState(false);

  const currentCar = vehicles[currentIndex];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleNext = () => {
    if (isAnimating || currentIndex >= vehicles.length - 1) return;
    setDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsAnimating(false), 450);
    }, 50);
  };

  const handlePrev = () => {
    if (isAnimating || currentIndex <= 0) return;
    setDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsAnimating(false), 450);
    }, 50);
  };

  const handleInterest = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${currentCar.model} ${currentCar.year} valor ${formatPrice(currentCar.price)}. Mais informações por favor.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getSlideClass = (index: number) => {
    if (!isLoaded) return 'carousel-slide';
    if (index === currentIndex) return 'carousel-slide active';
    if (index < currentIndex) return 'carousel-slide prev';
    return 'carousel-slide next';
  };

  const roverSegmentHeight = (100 / vehicles.length);

  return (
    <div className="garage-bg garage-floor relative w-full h-screen overflow-hidden">
      {/* Spotlights */}
      <div className="spotlight garage-light" style={{ top: '10%', left: '30%' }} />
      <div className="spotlight garage-light" style={{ top: '15%', left: '50%', animationDelay: '1s' }} />
      <div className="spotlight garage-light" style={{ top: '10%', left: '70%', animationDelay: '2s' }} />
      
      {/* Spotlight cones */}
      <div className="spotlight-cone spotlight" style={{ left: '30%' }} />
      <div className="spotlight-cone spotlight" style={{ left: '50%', animationDelay: '0.5s' }} />
      <div className="spotlight-cone spotlight" style={{ left: '70%', animationDelay: '1s' }} />

      {/* Dust particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="dust-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 8}s`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
          }}
        />
      ))}

      {/* Main Carousel Container */}
      <div className="carousel-container">
        {/* Car Display */}
        <div className="car-display mx-auto">
          {isLoaded && (
            <>
              <Image
                src={currentCar.imageUrl}
                alt={currentCar.model}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="car-shadow car-shadow-effect" />
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={isAnimating || currentIndex === 0}
          className="nav-button left"
          aria-label="Carro anterior"
        >
          <svg className="w-6 h-6 text-nfs-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          disabled={isAnimating || currentIndex >= vehicles.length - 1}
          className="nav-button right"
          aria-label="Próximo carro"
        >
          <svg className="w-6 h-6 text-nfs-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Rover Bar */}
      <div className="rover-bar">
        <div
          className="rover-segment"
          style={{
            height: `${roverSegmentHeight}%`,
            top: `${currentIndex * roverSegmentHeight}%`,
          }}
        />
        {/* Indicadores inativos */}
        {vehicles.map((_, idx) => (
          <div
            key={idx}
            className="absolute w-full h-px bg-white/10"
            style={{ top: `${idx * roverSegmentHeight + roverSegmentHeight}%` }}
          />
        ))}
      </div>

      {/* Car Info Panel */}
      <div className="car-info-panel">
        <div className="flex flex-col gap-4">
          {/* Model & Price */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-white font-russo text-xl md:text-2xl uppercase leading-tight">
                {currentCar.model}
              </h1>
              <p className="text-yellow font-exo text-sm">
                {currentCar.brand} • {currentCar.year}
              </p>
            </div>
            <div className="price-display">
              {formatPrice(currentCar.price)}
            </div>
          </div>

          {/* Specs */}
          <div className="flex flex-wrap gap-2">
            <div className="spec-chip">
              <svg className="w-4 h-4 text-yellow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/>
              </svg>
              <span>{currentCar.mileage}</span>
            </div>
            <div className="spec-chip">
              <svg className="w-4 h-4 text-yellow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67z"/>
              </svg>
              <span>{currentCar.fuel}</span>
            </div>
            <div className="spec-chip">
              <svg className="w-4 h-4 text-yellow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              </svg>
              <span>{currentCar.transmission}</span>
            </div>
          </div>

          {/* CTA Button */}
          <button onClick={handleInterest} className="btn-nfs btn-primary w-full">
            TENHO INTERESSE
          </button>
        </div>
      </div>

      {/* Car counter */}
      <div className="absolute top-20 right-4 md:right-8 text-white/50 font-exo text-sm">
        {currentIndex + 1} / {vehicles.length}
      </div>
    </div>
  );
}