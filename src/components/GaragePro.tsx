'use client';

import { useState, useEffect } from 'react';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';

interface GarageProProps {
  vehicles: Vehicle[];
}

export default function GaragePro({ vehicles }: GarageProProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCar = vehicles[currentIndex];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleSelectCar = (index: number) => {
    setCurrentIndex(index);
  };

  const handleBuy = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${currentCar.model} ${currentCar.year} valor ${formatPrice(currentCar.price)}.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % vehicles.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [vehicles.length]);

  return (
    <div className="garage-pro-container">
      {/* Car View */}
      <div 
        className="garage-pro-car-view"
        style={{ backgroundImage: `url(${currentCar.imageUrl})` }}
      >
        <div className="garage-pro-overlay" />
        
        <div className="garage-pro-header">
          <div className="garage-pro-logo-mini">
            <span>FLASH</span>
            <span className="text-cyan">MULTIMARCAS</span>
          </div>
        </div>

        <div className="garage-pro-car-info">
          <p className="garage-pro-brand">{currentCar.brand}</p>
          <h1 className="garage-pro-model">{currentCar.model}</h1>
          <p className="garage-pro-year">{currentCar.year}</p>
        </div>

        {/* Car Thumbnails */}
        <div className="garage-pro-footer">
          {vehicles.map((car, idx) => (
            <button 
              key={car.id}
              className={`garage-pro-card ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => handleSelectCar(idx)}
            >
              <span className="card-brand">{car.brand}</span>
              <span className="card-model">{car.model.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        </div>

      {/* Mobile CTA Button */}
      <div className="mobile-cta">
        <button onClick={handleBuy}>
          TENHO INTERESSE - {formatPrice(currentCar.price)}
        </button>
      </div>

      {/* Panel - Desktop only */}
      <div className="garage-pro-panel">
        <div className="garage-pro-logo">
          <h2>FLASH</h2>
          <p>MULTIMARCAS</p>
        </div>

        <div className="garage-pro-price">
          {formatPrice(currentCar.price)}
        </div>

        <div className="garage-pro-specs">
          <h3>INFORMAÇÕES</h3>
          <SpecRow label=" Quilometragem" value={currentCar.mileage} icon="car" />
          <SpecRow label=" Combustível" value={currentCar.fuel} icon="fuel" />
          <SpecRow label=" Câmbio" value={currentCar.transmission} icon="gear" />
          <SpecRow label=" Cor" value={currentCar.color} icon="color" />
        </div>

        <div className="garage-pro-desc">
          <p>{currentCar.description}</p>
        </div>

        <div className="garage-pro-features">
          <h3>OPCIONAIS</h3>
          <div className="feature-tags">
            {currentCar.features.slice(0, 6).map((feat, idx) => (
              <span key={idx} className="feature-tag">{feat}</span>
            ))}
          </div>
        </div>

        <button className="garage-pro-btn-buy" onClick={handleBuy}>
          TENHO INTERESSE
        </button>
      </div>
    </div>
  );
}

function SpecRow({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="spec-row">
      <span className="spec-row-label">{label}</span>
      <span className="spec-row-value">{value}</span>
    </div>
  );
}