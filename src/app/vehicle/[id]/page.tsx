import { notFound } from 'next/navigation';
import VehicleDetails from '@/components/VehicleDetails';
import { vehicles } from '@/lib/data';

interface VehiclePageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    id: vehicle.id,
  }));
}

export async function generateMetadata({ params }: VehiclePageProps) {
  const vehicle = vehicles.find(v => v.id === params.id);
  
  if (!vehicle) {
    return { title: 'Veículo Não Encontrado' };
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  return {
    title: `${vehicle.model} - ${formatPrice(vehicle.price)} | Flash Multimarcas`,
    description: `${vehicle.model} ${vehicle.year}. ${vehicle.mileage}, ${vehicle.transmission}. Por ${formatPrice(vehicle.price)}`,
  };
}

export default function VehiclePage({ params }: VehiclePageProps) {
  const vehicle = vehicles.find(v => v.id === params.id);
  
  if (!vehicle) {
    notFound();
  }
  
  return <VehicleDetails vehicle={vehicle} />;
}