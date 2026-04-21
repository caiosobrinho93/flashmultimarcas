import TeslaStyle from '@/components/TeslaStyle';
import { vehicles } from '@/lib/data';

export default function Home() {
  const availableVehicles = vehicles.filter(v => v.status === 'available');

  return (
    <main className="min-h-screen">
      <TeslaStyle vehicles={availableVehicles} />
    </main>
  );
}