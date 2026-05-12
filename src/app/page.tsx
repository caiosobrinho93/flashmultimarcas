'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import TeslaStyle from '@/components/TeslaStyle';
import { Vehicle } from '@/types';
import { vehicles as localVehicles } from '@/lib/data';
import { prefixPath } from '@/lib/utils';

function preloadImages(imagePaths: string[]) {
  return Promise.all(
    imagePaths.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = src;
      });
    })
  );
}

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(localVehicles.filter(v => v.status === 'available'));
  const [loading, setLoading] = useState(true);
  const dataLoaded = useRef(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (dataLoaded.current) return;
      dataLoaded.current = true;

      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const vehicleData = data.map((v: any) => ({
            id: v.id,
            model: v.model,
            brand: v.brand,
            year: v.year,
            price: v.price,
            mileage: v.mileage,
            fuel: v.fuel,
            transmission: v.transmission,
            color: v.color,
            imageUrl: v.image_url || '/car1.jpeg',
            images: v.images,
            status: v.status,
            description: v.description,
            features: v.features,
            createdAt: v.created_at,
            extras: v.extras
          }));
          setVehicles(vehicleData);
          const imagePaths = vehicleData.map((v: Vehicle) => prefixPath(v.imageUrl));
          await preloadImages(imagePaths as string[]);
        } else {
          // If supabase fails or is empty, we already have localVehicles in state
          const imagePaths = vehicles.map((v: Vehicle) => prefixPath(v.imageUrl));
          await preloadImages(imagePaths as string[]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  // Removed the 'if (loading) return <div className="bg-black" />' to eliminate initial black flash
  return (
    <main className="min-h-screen">
      <TeslaStyle vehicles={vehicles} />
    </main>
  );
}