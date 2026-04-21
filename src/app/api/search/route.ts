import { NextResponse } from 'next/server';
import { vehicleRepo, leadRepo, initializeDB } from '@/lib/db';
import { vehicles as initialVehicles, leads as initialLeads } from '@/lib/data';
import { supabase, isSupabaseConfigured, tables } from '@/lib/supabase';

initializeDB({ vehicles: initialVehicles, leads: initialLeads });

async function fetchFromSupabase(query: string) {
  const { data, error } = await supabase
    .from(tables.vehicles)
    .select('*')
    .or(`model.ilike.%${query}%,brand.ilike.%${query}%`)
    .eq('status', 'available')
    .limit(6);
  
  if (error) throw error;
  return data || [];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  
  if (!query || query.length < 2) {
    return NextResponse.json({ data: [], suggestions: [] });
  }
  
  let results;
  let suggestions: string[] = [];
  
  if (isSupabaseConfigured()) {
    results = await fetchFromSupabase(query);
    suggestions = Array.from(new Set(results.map((v: any) => v.brand).concat(results.map((v: any) => v.model)))).slice(0, 5);
  } else {
    results = await vehicleRepo.search(query);
    suggestions = Array.from(new Set(results.map(v => v.brand).concat(results.map(v => v.model)))).slice(0, 5);
  }
  
  return NextResponse.json({
    data: results.slice(0, 6),
    suggestions,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vehicleId, vehicleModel, customerName, customerPhone, message } = body;
    
    if (!vehicleId || !customerName || !customerPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    let lead;
    
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase
        .from(tables.leads)
        .insert([{
          vehicle_id: vehicleId,
          vehicle_model: vehicleModel,
          customer_name: customerName,
          customer_phone: customerPhone,
          message,
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();
      
      if (error) throw error;
      lead = data;
    } else {
      lead = await leadRepo.create({
        vehicleId,
        vehicleModel,
        customerName,
        customerPhone,
        message,
      });
    }
    
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}