export interface Vehicle {
  id: string;
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
  status: 'available' | 'sold';
  description: string;
  features: string[];
  createdAt: string;
  extras?: VehicleExtra;
}

export interface VehicleExtra {
  engine?: string;
  horsepower?: string;
  torque?: string;
  cylinders?: string;
  fuelTank?: string;
  consumption?: string;
  acceleration?: string;
  maxSpeed?: string;
  weight?: string;
  capacity?: string;
  traction?: string;
  suspension?: string;
  brakes?: string;
  steering?: string;
  wheels?: string;
  tires?: string;
  dimensions?: {
    length?: string;
    width?: string;
    height?: string;
    wheelbase?: string;
    groundClearance?: string;
  };
  confort?: string[];
  safety?: string[];
  technology?: string[];
  interior?: string[];
  exterior?: string[];
  ownership?: string;
  ipva?: string;
  licensed?: string;
  mechanic?: string;
  inspection?: string;
  accidentfree?: string;
  maintenance?: string;
  warranty?: string;
  notes?: string;
}

export interface Lead {
  id: string;
  vehicleId: string;
  vehicleModel: string;
  customerName: string;
  customerPhone: string;
  message: string;
  createdAt: string;
}

export interface AdminUser {
  username: string;
  password: string;
}