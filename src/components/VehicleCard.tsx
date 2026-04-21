'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';

interface VehicleCardProps {
  vehicle: Vehicle;
  index?: number;
}

export default function VehicleCard({ vehicle, index = 0 }: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInterest = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${vehicle.model} ${vehicle.year} valor ${formatPrice(vehicle.price)}. Mais informações por favor.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <Link 
      href={`/vehicle/${vehicle.id}`}
      className={`nfs-card block rounded-xl animate-fade-in delay-${(index % 4) * 100}`}
    >
      <div className="relative aspect-[16/10] bg-dark overflow-hidden rounded-t-xl">
        <Image
          src={vehicle.imageUrl}
          alt={vehicle.model}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute top-3 right-3">
          <span className={`status-badge ${vehicle.status === 'available' ? 'status-available' : 'status-sold'}`}>
            {vehicle.status === 'available' ? 'DISPONÍVEL' : 'VENDIDO'}
          </span>
        </div>
        
        <div className="absolute bottom-3 left-4 racing-number">
          #{index + 1}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-white font-russo text-xl leading-tight uppercase">
            {vehicle.model}
          </h3>
          <p className="text-yellow font-exo text-sm">
            {vehicle.brand} • {vehicle.year}
          </p>
        </div>

        <div className="spec-grid mb-4">
          <div className="spec-item py-2">
            <svg className="spec-item-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
            <span className="font-exo text-xs">{vehicle.mileage}</span>
          </div>
          <div className="spec-item py-2">
            <svg className="spec-item-icon" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5c1.38 0 2.5-1.12 2.5-2.5 0-.61-.23-1.2-.64-1.67z"/>
            </svg>
            <span className="font-exo text-xs">{vehicle.fuel}</span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-white/50 font-exo text-xs">POR APENAS</p>
            <p className="price-tag">{formatPrice(vehicle.price)}</p>
          </div>
          {vehicle.status === 'available' ? (
            <button
              onClick={handleInterest}
              className="nfs-btn nfs-btn-yellow text-sm py-3 px-6"
            >
              QUERO
            </button>
          ) : (
            <span className="bg-red text-white font-russo text-sm py-3 px-6">
              INDISPONÍVEL
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}