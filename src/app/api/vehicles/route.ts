import { NextResponse } from 'next/server';
import { vehicles as initialVehicles, ADMIN_CREDENTIALS } from '@/lib/data';

let vehicles = [...initialVehicles];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  
  let filtered = vehicles;
  if (status) {
    filtered = vehicles.filter(v => v.status === status);
  }
  
  return NextResponse.json(filtered);
}

export async function PUT(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const credentials = authHeader.replace('Basic ', '');
    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
    
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    const { id, status: newStatus } = body;
    
    const vehicleIndex = vehicles.findIndex(v => v.id === id);
    
    if (vehicleIndex === -1) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }
    
    vehicles[vehicleIndex] = {
      ...vehicles[vehicleIndex],
      status: newStatus,
    };
    
    return NextResponse.json(vehicles[vehicleIndex]);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}