import { Vehicle, Lead, StoreInfo } from '@/types';

export interface VehicleInput {
  model: string;
  brand: string;
  year: number;
  price: number;
  mileage: string;
  fuel: string;
  transmission: string;
  color: string;
  imageUrl: string;
  images?: string[];
  status?: 'available' | 'sold' | 'reserved';
  description?: string;
  features?: string[];
  extras?: Record<string, any>;
}

export interface LeadInput {
  vehicleId: string;
  vehicleModel: string;
  customerName: string;
  customerPhone: string;
  message?: string;
}

export interface SearchFilters {
  brand?: string;
  model?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
  fuel?: string;
  transmission?: string;
  status?: 'available' | 'sold' | 'reserved';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

let vehicles: Vehicle[] = [];
let leads: Lead[] = [];
let nextVehicleId = 1;
let nextLeadId = 1;

export const initializeDB = (data: { vehicles: Vehicle[]; leads: Lead[] }) => {
  vehicles = data.vehicles || [];
  leads = data.leads || [];
  
  if (vehicles.length > 0) {
    const maxId = Math.max(...vehicles.map(v => parseInt(v.id)));
    nextVehicleId = maxId + 1;
  }
  
  if (leads.length > 0) {
    const maxId = Math.max(...leads.map(l => parseInt(l.id)));
    nextLeadId = maxId + 1;
  }
};

export const vehicleRepo = {
  async findAll(filters?: SearchFilters, page = 1, limit = 12): Promise<PaginatedResult<Vehicle>> {
    let result = [...vehicles];
    
    if (filters) {
      if (filters.brand) {
        result = result.filter(v => v.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
      }
      if (filters.model) {
        result = result.filter(v => v.model.toLowerCase().includes(filters.model!.toLowerCase()));
      }
      if (filters.minPrice) {
        result = result.filter(v => v.price >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        result = result.filter(v => v.price <= filters.maxPrice!);
      }
      if (filters.year) {
        result = result.filter(v => v.year === filters.year);
      }
      if (filters.fuel) {
        result = result.filter(v => v.fuel.toLowerCase() === filters.fuel!.toLowerCase());
      }
      if (filters.transmission) {
        result = result.filter(v => v.transmission.toLowerCase().includes(filters.transmission!.toLowerCase()));
      }
      if (filters.status) {
        result = result.filter(v => v.status === filters.status);
      } else {
        result = result.filter(v => v.status === 'available');
      }
    } else {
      result = result.filter(v => v.status === 'available');
    }
    
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedData = result.slice(start, start + limit);
    
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  },
  
  async findById(id: string): Promise<Vehicle | null> {
    return vehicles.find(v => v.id === id) || null;
  },
  
  async findBySlug(slug: string): Promise<Vehicle | null> {
    return vehicles.find(v => v.id === slug) || null;
  },
  
  async search(query: string): Promise<Vehicle[]> {
    const q = query.toLowerCase();
    return vehicles.filter(v => 
      v.status === 'available' && (
        v.model.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.description?.toLowerCase().includes(q)
      )
    );
  },
  
  async create(data: VehicleInput): Promise<Vehicle> {
    const newVehicle: Vehicle = {
      id: String(nextVehicleId++),
      ...data,
      status: data.status || 'available',
      images: data.images || [data.imageUrl],
      features: data.features || [],
      createdAt: new Date().toISOString(),
    };
    vehicles.push(newVehicle);
    return newVehicle;
  },
  
  async update(id: string, data: Partial<VehicleInput>): Promise<Vehicle | null> {
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) return null;
    
    vehicles[index] = { ...vehicles[index], ...data };
    return vehicles[index];
  },
  
  async delete(id: string): Promise<boolean> {
    const index = vehicles.findIndex(v => v.id === id);
    if (index === -1) return false;
    
    vehicles.splice(index, 1);
    return true;
  },
  
  async getBrands(): Promise<string[]> {
    const brands = Array.from(new Set(vehicles.filter(v => v.status === 'available').map(v => v.brand)));
    return brands.sort();
  },
  
  async getStats(): Promise<{
    total: number;
    available: number;
    sold: number;
    reserved: number;
    byBrand: Record<string, number>;
  }> {
    const available = vehicles.filter(v => v.status === 'available').length;
    const sold = vehicles.filter(v => v.status === 'sold').length;
    const reserved = vehicles.filter(v => v.status === 'reserved').length;
    
    const byBrand: Record<string, number> = {};
    vehicles.filter(v => v.status === 'available').forEach(v => {
      byBrand[v.brand] = (byBrand[v.brand] || 0) + 1;
    });
    
    return {
      total: vehicles.length,
      available,
      sold,
      reserved,
      byBrand,
    };
  },
};

export const leadRepo = {
  async findAll(page = 1, limit = 20): Promise<PaginatedResult<Lead>> {
    const result = [...leads].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const total = result.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginatedData = result.slice(start, start + limit);
    
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  },
  
  async create(data: LeadInput): Promise<Lead> {
    const newLead: Lead = {
      id: String(nextLeadId++),
      ...data,
      message: data.message || '',
      createdAt: new Date().toISOString(),
    };
    leads.push(newLead);
    return newLead;
  },
  
  async delete(id: string): Promise<boolean> {
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) return false;
    
    leads.splice(index, 1);
    return true;
  },
};

export const storeRepo = {
  async get(): Promise<StoreInfo> {
    return {
      name: 'Flash Multimarcas',
      address: 'Rua Av Prestes Maia, 2566, Votuporanga/SP',
      phone: '(17) 99758-3742',
      whatsapp: '17997583742',
      instagram: '@flashmotorsvotuporanga',
    };
  },
  
  async update(data: Partial<StoreInfo>): Promise<StoreInfo> {
    return {
      name: data.name || 'Flash Multimarcas',
      address: data.address || 'Rua Av Prestes Maia, 2566, Votuporanga/SP',
      phone: data.phone || '(17) 99758-3742',
      whatsapp: data.whatsapp || '17997583742',
      instagram: data.instagram || '@flashmotorsvotuporanga',
    };
  },
};

export const authRepo = {
  async validate(username: string, password: string): Promise<boolean> {
    return username === 'admin' && password === 'flash2024@';
  },
};