'use client';

import { useState, useEffect, useRef } from 'react';
import TeslaStyle from '@/components/TeslaStyle';
import Intro from '@/components/Intro';
import { Vehicle } from '@/types';
import { vehicles as localVehicles } from '@/lib/data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const dataLoaded = useRef(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (dataLoaded.current) return;
      dataLoaded.current = true;

      try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        let vehicleData;
        if (error || !data || data.length === 0) {
          vehicleData = localVehicles.filter(v => v.status === 'available');
        } else {
          vehicleData = data.map((v: any) => ({
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
        }

        setVehicles(vehicleData);
        
        const imagePaths = vehicleData.map((v: Vehicle) => `/flashmultimarcas${v.imageUrl}`);
        await preloadImages(imagePaths as string[]);
        setImagesLoaded(true);
      } catch (err) {
        const availableLocal = localVehicles.filter(v => v.status === 'available');
        setVehicles(availableLocal);
        setImagesLoaded(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    setTimeout(() => setShowIntro(false), 500);
  };

  if (loading || showIntro) {
    return (
      <div className="min-h-screen bg-black">
        {showIntro && !introComplete && (
          <Intro onComplete={handleIntroComplete} />
        )}
        {(loading || !imagesLoaded) && !introComplete && (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-16 h-16 border-4 border-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-russo text-yellow">CARREGANDO...</p>
            </div>
          </div>
        )}
        {introComplete && !loading && imagesLoaded && (
          <TeslaStyle vehicles={vehicles} />
        )}
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <TeslaStyle vehicles={vehicles} />
    </main>
  );
}