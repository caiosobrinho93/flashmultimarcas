'use client';

import { useState, useEffect } from 'react';
import TeslaStyle from '@/components/TeslaStyle';
import { Vehicle } from '@/types';
import { vehicles as localVehicles } from '@/lib/data';

const supabaseUrl = 'https://ngmcmamyiljczmselrcp.supabase.co';
const supabaseAnonKey = 'sb_publishable_uSPLC9knj9B9DnHtv4gcUg_lO_50uNv';

export default function Home() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase
          .from('vehicles')
          .select('*')
          .eq('status', 'available')
          .order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          const availableLocal = localVehicles.filter(v => v.status === 'available');
          setVehicles(availableLocal);
          return;
        }

        const formattedVehicles: Vehicle[] = data.map((v: any) => ({
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

        setVehicles(formattedVehicles);
      } catch (err) {
        const availableLocal = localVehicles.filter(v => v.status === 'available');
        setVehicles(availableLocal);
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