import { NextResponse } from 'next/server';
import { vehicleRepo, leadRepo, storeRepo, authRepo, initializeDB } from '@/lib/db';
import { vehicles as initialVehicles, leads as initialLeads } from '@/lib/data';

initializeDB({ vehicles: initialVehicles, leads: initialLeads });

export async function GET(request: Request) {
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
  
  const stats = await vehicleRepo.getStats();
  const leads = await leadRepo.findAll(1, 5);
  const store = await storeRepo.get();
  
  return NextResponse.json({
    vehicles: stats,
    recentLeads: leads.data,
    store,
  });
}