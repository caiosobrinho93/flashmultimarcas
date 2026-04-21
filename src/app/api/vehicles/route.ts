import { NextResponse } from 'next/server';
import { vehicleRepo, initializeDB, authRepo } from '@/lib/db';
import { vehicles as initialVehicles } from '@/lib/data';

initializeDB({ vehicles: initialVehicles, leads: [] });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const filters = {
    brand: searchParams.get('brand') || undefined,
    model: searchParams.get('model') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    year: searchParams.get('year') ? Number(searchParams.get('year')) : undefined,
    fuel: searchParams.get('fuel') || undefined,
    transmission: searchParams.get('transmission') || undefined,
    status: (searchParams.get('status') as 'available' | 'sold' | 'reserved') || undefined,
  };
  
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 12;
  const search = searchParams.get('search') || undefined;
  
  let result;
  
  if (search) {
    const data = await vehicleRepo.search(search);
    result = { data, total: data.length, page: 1, limit: data.length, totalPages: 1 };
  } else {
    result = await vehicleRepo.findAll(filters, page, limit);
  }
  
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const credentials = authHeader.replace('Basic ', '');
    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    
    const isValid = await authRepo.validate(username, password);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const vehicle = await vehicleRepo.create(body);
    
    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}