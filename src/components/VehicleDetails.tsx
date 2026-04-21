'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Vehicle } from '@/types';
import { storeInfo } from '@/lib/data';

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
      `Olá! Tenho interesse no ${vehicle.model} ${vehicle.year} valor ${formatPrice(vehicle.price)}.Mais informaçõespor favor.`
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
    <div className="min-h-screen bg-black">
      <div className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-yellow font-exo hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            VOLTAR
          </button>
          
          <button 
            onClick={handleShare}
            className="bg-dark p-2 border border-white/10 hover:border-yellow transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="vehicle-hero">
              <div className="relative aspect-[16/10]">
                <Image
                  src={vehicle.imageUrl}
                  alt={vehicle.model}
                  fill
                  className="object-contain animate-float"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className={`inline-block mb-3 status-badge ${vehicle.status === 'available' ? 'status-available' : 'status-sold'}`}>
                  {vehicle.status === 'available' ? 'DISPONÍVEL' : 'VENDIDO'}
                </span>
                <h1 className="nfs-title uppercase leading-tight">
                  {vehicle.model}
                </h1>
                <p className="text-white/60 font-exo text-xl mt-2">
                  {vehicle.brand} {vehicle.year}
                </p>
              </div>

              <div className="glass p-6 border-l-4 border-yellow">
                <p className="text-white/60 font-exo text-sm">VALOR</p>
                <p className="text-yellow font-russo text-5xl animate-glow">{formatPrice(vehicle.price)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="vehicle-stat">
                  <p className="vehicle-stat-value">{vehicle.year}</p>
                  <p className="vehicle-stat-label">ANO</p>
                </div>
                <div className="vehicle-stat">
                  <p className="vehicle-stat-value">{vehicle.mileage}</p>
                  <p className="vehicle-stat-label">KM</p>
                </div>
                <div className="vehicle-stat">
                  <p className="vehicle-stat-value">{vehicle.fuel}</p>
                  <p className="vehicle-stat-label">COMB</p>
                </div>
                <div className="vehicle-stat">
                  <p className="vehicle-stat-value text-base">{vehicle.transmission}</p>
                  <p className="vehicle-stat-label">CÂMBIO</p>
                </div>
              </div>

              <div className="glass p-5">
                <h3 className="text-yellow font-russo mb-4">ESPECIFICAÇÕES</h3>
                <div className="spec-grid">
                  <div className="spec-item">
                    <svg className="spec-item-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="font-exo">{vehicle.color}</span>
                  </div>
                  <div className="spec-item">
                    <svg className="spec-item-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                    <span className="font-exo">Laudo Aprovado</span>
                  </div>
                  <div className="spec-item">
                    <svg className="spec-item-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="font-exo">Revisões em Dia</span>
                  </div>
                  <div className="spec-item">
                    <svg className="spec-item-icon" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                    </svg>
                    <span className="font-exo">Garantia</span>
                  </div>
                </div>
              </div>

              <div className="glass p-5">
                <h3 className="text-yellow font-russo mb-4">OPCIONAIS</h3>
                <div className="feature-list">
                  {vehicle.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
              </div>

              <div className="glass p-5">
                <h3 className="text-yellow font-russo mb-3">DESCRIÇÃO</h3>
                <p className="text-white/70 font-exo">{vehicle.description}</p>
              </div>

              {vehicle.status === 'available' && (
                <button
                  onClick={handleInterest}
                  className="nfs-btn nfs-btn-yellow w-full text-lg py-4"
                >
                  TENHO INTERESSE
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}