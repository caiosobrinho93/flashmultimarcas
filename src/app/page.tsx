'use client';

import { useState, useEffect } from 'react';
import TeslaStyle from '@/components/TeslaStyle';
import { supabase, tables } from '@/lib/supabase';
import { Vehicle } from '@/types';

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { data, error } = await supabase
          .from(tables.vehicles)
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (data) {
          setVehicles(data.map(v => ({
            id: v.id,
            model: v.model,
            brand: v.brand,
            year: v.year,
            price: v.price,
            mileage: v.mileage,
            fuel: v.fuel,
            transmission: v.transmission,
            color: v.color,
            imageUrl: v.image_url,
            images: v.images,
            status: v.status,
            description: v.description,
            features: v.features,
            createdAt: v.created_at,
            extras: v.extras
          })));
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-russo text-yellow">CARREGANDO...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <TeslaStyle vehicles={vehicles} />
    </main>
  );
}