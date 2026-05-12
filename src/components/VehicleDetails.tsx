'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';
import { prefixPath } from '@/lib/utils';

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const router = useRouter();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInterest = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no ${vehicle.model} ${vehicle.year} valor ${formatPrice(vehicle.price)}. Mais informações por favor.`
    );
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${vehicle.model} - ${storeInfo.name}`,
        text: `Veja este ${vehicle.model} por ${formatPrice(vehicle.price)}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="scanline" />
      
      {/* HUD Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <button 
          onClick={() => router.back()}
          className="pointer-events-auto bg-black/50 border border-white/10 px-4 py-2 font-russo text-yellow hover:bg-yellow hover:text-black transition-all"
        >
          BACK TO GARAGE
        </button>
        <button 
          onClick={handleShare}
          className="pointer-events-auto bg-black/50 border border-white/10 p-2 hover:border-yellow transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
        </button>
      </div>

      <div className="pt-24 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Vehicle Display */}
        <div className="relative">
          <div className="aspect-[16/10] relative">
            <Image
              src={prefixPath(vehicle.imageUrl)}
              alt={vehicle.model}
              fill
              className="object-contain"
              priority
            />
          </div>
          {/* Gallery placeholder or thumbnails can go here */}
        </div>

        {/* Right: Technical HUD */}
        <div className="space-y-8">
          <div>
            <div className="hud-tag">ESPECIFICAÇÕES TÉCNICAS</div>
            <h1 className="hud-brand-title text-white">{vehicle.brand}</h1>
            <h2 className="hud-model-subtitle">{vehicle.model}</h2>
          </div>

          <div className="hud-stats-box w-full">
            <div className="stat-item">
              <span className="stat-label">Ano</span>
              <span className="stat-value">{vehicle.year}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">KM</span>
              <span className="stat-value">{vehicle.mileage}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Câmbio</span>
              <span className="stat-value">{vehicle.transmission}</span>
            </div>
          </div>

          <div className="p-6 border border-white/5 bg-white/5 backdrop-blur-md">
            <div className="text-yellow font-russo text-4xl mb-6">{formatPrice(vehicle.price)}</div>
            
            <div className="grid grid-cols-2 gap-4 text-sm font-exo mb-8">
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-2 h-2 bg-yellow" />
                COMBUSTÍVEL: {vehicle.fuel}
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <div className="w-2 h-2 bg-yellow" />
                COR: {vehicle.color}
              </div>
            </div>

            {vehicle.status === 'available' ? (
              <button
                onClick={handleInterest}
                className="hud-btn primary w-full text-center"
              >
                TENHO INTERESSE
              </button>
            ) : (
              <div className="hud-btn w-full text-center opacity-50 cursor-not-allowed">
                VENDIDO
              </div>
            )}
          </div>

          {/* Description HUD */}
          <div className="space-y-4">
            <h3 className="font-russo text-yellow text-sm tracking-widest uppercase">Overview</h3>
            <p className="font-exo text-white/70 leading-relaxed">{vehicle.description}</p>
          </div>

          {/* Features HUD */}
          <div className="space-y-4">
            <h3 className="font-russo text-yellow text-sm tracking-widest uppercase">Installed Options</h3>
            <div className="flex flex-wrap gap-2">
              {(vehicle.features || []).map((feature, idx) => (
                <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1 text-xs font-exo uppercase tracking-wider">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}