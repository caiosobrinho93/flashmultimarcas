import { NextResponse } from 'next/server';
import { leads as initialLeads } from '@/lib/data';
import { Lead } from '@/types';

let leads: Lead[] = [...initialLeads];

export async function GET() {
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { vehicleId, vehicleModel, customerName, customerPhone, message } = body;
    
    if (!vehicleId || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newLead: Lead = {
      id: String(leads.length + 1),
      vehicleId,
      vehicleModel,
      customerName,
      customerPhone,
      message: message || '',
      createdAt: new Date().toISOString(),
    };
    
    leads.push(newLead);
    
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}