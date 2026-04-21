import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ngmcmamyiljczmselrcp.supabase.co';
const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (!serviceKey) {
  console.error('Erro: NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY não definida');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceKey);

const vehicles = [
  {
    model: 'Jeep Commander Overland',
    brand: 'Jeep',
    year: 2023,
    price: 289900,
    mileage: '8.500',
    fuel: 'Diesel',
    transmission: 'Automático 9AT',
    color: 'Cinza Graphite',
    image_url: '/car1.jpeg',
    images: ['/car1.jpeg', '/car2.jpeg', '/car3.jpg', '/car4.jpg'],
    status: 'available',
    description: 'Único dono, top de linha, pkg offroad',
    features: ['4x4', 'Suspensão Independent', 'Cambio 9AT', 'Rodas 20"', 'Som Alpine', 'Camera 360', 'Banco Couro', 'Teto Solar'],
    extras: {
      engine: '2.0 Turbo',
      horsepower: '270cv',
      torque: '40,8kgfm',
      fuelTank: '60L',
      consumption: '9,2km/L',
      acceleration: '8,5s',
      traction: '4x4 Active Drive',
      ownership: 'Único Dono',
      ipva: 'Pago',
      licensed: 'Licenciado',
      inspection: 'Laudo Aprovado',
      accidentfree: 'Sem Sinistro',
      maintenance: 'Concessionária'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Toyota Corolla Cross',
    brand: 'Toyota',
    year: 2024,
    price: 199900,
    mileage: '5.000',
    fuel: 'Híbrido',
    transmission: 'CVT e-CVT',
    color: 'Branco Polar',
    image_url: '/car2.jpeg',
    images: ['/car2.jpeg', '/car3.jpg', '/car4.jpg', '/car1.jpeg'],
    status: 'available',
    description: 'Zero km, Garantia total 5 anos',
    features: ['Hybrid', 'Toyota Safety Sense', 'Painel Digital', 'Multimídia 10"', 'Carregador Wireless', 'Faróis LED Matrix'],
    extras: {
      engine: '2.0 Hybrid',
      horsepower: '172cv',
      torque: '21,0kgfm',
      consumption: '16,0km/L',
      traction: 'FWD',
      ownership: 'Primeiro Dono',
      ipva: 'Pago'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Toyota Hilux SR5',
    brand: 'Toyota',
    year: 2023,
    price: 259900,
    mileage: '32.000',
    fuel: 'Diesel',
    transmission: 'Automático 6AT',
    color: 'Preto',
    image_url: '/car3.jpg',
    images: ['/car3.jpg', '/car4.jpg', '/car1.jpeg', '/car2.jpeg'],
    status: 'available',
    description: 'Único dono, revisões concessionária',
    features: ['4x4', 'Spray Bar', 'Protetor Carter', 'Multimídia 9"', 'Camera Ré', 'Farol Neblina', 'Assento Couro'],
    extras: {
      engine: '2.8 Turbo',
      horsepower: '204cv',
      torque: '50,9kgfm',
      fuelTank: '80L',
      consumption: '10,5km/L',
      traction: '4x4 Part Time',
      ownership: 'Único Dono',
      ipva: 'Pago',
      inspection: 'Laudo Aprovado',
      maintenance: 'Concessionária'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Lamborghini Lanzador',
    brand: 'Lamborghini',
    year: 2024,
    price: 2500000,
    mileage: '0',
    fuel: 'Elétrico',
    transmission: 'Automático',
    color: 'Amarelo',
    image_url: '/car4.jpg',
    images: ['/car4.jpg', '/car1.jpeg', '/car2.jpeg', '/car3.jpg'],
    status: 'available',
    description: 'Conceito 100% elétrico, produção limitada',
    features: ['1000cv', 'Ar Condicionado 4 Zonas', 'Painel Holográfico', 'Som Supreme', 'Assentos Esportivos', 'Modo Correr'],
    extras: {
      engine: 'Dual Motor',
      horsepower: '1.000cv',
      torque: '1.000Nm',
      fuelTank: '120kWh',
      consumption: '5,0km/kWh',
      acceleration: '2,8s',
      maxSpeed: '300km/h',
      traction: '4WD Elétrico',
      warranty: '5 anos'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Honda Civic EX',
    brand: 'Honda',
    year: 2022,
    price: 159900,
    mileage: '45.000',
    fuel: 'Flex',
    transmission: 'CVT',
    color: 'Preto',
    image_url: '/car1.jpeg',
    images: ['/car1.jpeg', '/car2.jpeg', '/car3.jpg', '/car4.jpg'],
    status: 'available',
    description: 'Completo, único dono',
    features: ['Honda Sensing', 'Cambio CVT', 'Rodas 17"', 'Farol LED'],
    extras: {
      engine: '1.5 Turbo',
      horsepower: '173cv',
      torque: '22,4kgfm',
      fuelTank: '47L',
      consumption: '11,5km/L',
      acceleration: '8,9s',
      traction: 'FWD',
      ownership: 'Único Dono',
      ipva: 'Pago'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Ford Ranger Storm',
    brand: 'Ford',
    year: 2023,
    price: 219900,
    mileage: '18.000',
    fuel: 'Diesel',
    transmission: 'Automático 10AT',
    color: 'Prata',
    image_url: '/car2.jpeg',
    images: ['/car2.jpeg', '/car3.jpg', '/car4.jpg', '/car1.jpeg'],
    status: 'available',
    description: 'Top de linha, 4x4',
    features: ['4x4', 'Som Sony', 'Camera 360', 'Assistência de Faixa'],
    extras: {
      engine: '3.0 V6 Turbo',
      horsepower: '250cv',
      torque: '58,1kgfm',
      fuelTank: '80L',
      consumption: '9,5km/L',
      acceleration: '7,8s',
      traction: '4x4',
      ownership: 'Único Dono',
      ipva: 'Pago',
      maintenance: 'Concessionária'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Chevrolet S10 High Country',
    brand: 'Chevrolet',
    year: 2022,
    price: 249900,
    mileage: '28.000',
    fuel: 'Diesel',
    transmission: 'Automático 6AT',
    color: 'Preto',
    image_url: '/car3.jpg',
    images: ['/car3.jpg', '/car4.jpg', '/car1.jpeg', '/car2.jpeg'],
    status: 'available',
    description: 'Única dono, revisões em dia',
    features: ['4x4', 'Teclado', 'Multimídia', 'Bancos de Couro'],
    extras: {
      engine: '2.8 Turbo',
      horsepower: '200cv',
      torque: '51,0kgfm',
      fuelTank: '76L',
      consumption: '9,8km/L',
      traction: '4x4',
      ownership: 'Único Dono',
      ipva: 'Pago',
      inspection: 'Laudo Aprovado'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Volkswagen Amarok',
    brand: 'Volkswagen',
    year: 2023,
    price: 199900,
    mileage: '22.000',
    fuel: 'Diesel',
    transmission: 'Automático 8AT',
    color: 'Branco',
    image_url: '/car4.jpg',
    images: ['/car4.jpg', '/car1.jpeg', '/car2.jpeg', '/car3.jpg'],
    status: 'available',
    description: 'Único dono, laudo aprovado',
    features: ['4x4', 'Rodas 20"', 'Multimídia', 'Camera Ré'],
    extras: {
      engine: '2.0 Biturbo',
      horsepower: '204cv',
      torque: '40,8kgfm',
      fuelTank: '80L',
      consumption: '10,0km/L',
      ownership: 'Único Dono',
      ipva: 'Pago',
      inspection: 'Laudo Aprovado'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Nissan Frontier Pro-4X',
    brand: 'Nissan',
    year: 2022,
    price: 189900,
    mileage: '35.000',
    fuel: 'Diesel',
    transmission: 'Automático 7AT',
    color: 'Laranja',
    image_url: '/car1.jpeg',
    images: ['/car1.jpeg', '/car2.jpeg', '/car3.jpg', '/car4.jpg'],
    status: 'available',
    description: 'Offroad, skid plates',
    features: ['4x4', 'Diferencial Travas', 'Proteção Inferior', 'Farol Neblina'],
    extras: {
      engine: '2.3 Biturbo',
      horsepower: '190cv',
      torque: '45,1kgfm',
      fuelTank: '80L',
      traction: '4x4 Part Time',
      ownership: 'Único Dono',
      ipva: 'Pago'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Mitsubishi L200 Triton',
    brand: 'Mitsubishi',
    year: 2023,
    price: 209900,
    mileage: '15.000',
    fuel: 'Diesel',
    transmission: 'Automático 6AT',
    color: 'Preto',
    image_url: '/car2.jpeg',
    images: ['/car2.jpeg', '/car3.jpg', '/car4.jpg', '/car1.jpeg'],
    status: 'available',
    description: 'Única dono, pkg offroad',
    features: ['4x4', 'Cambio 6AT', 'Rodas 18"', 'Multimídia'],
    extras: {
      engine: '2.4 Turbo',
      horsepower: '181cv',
      torque: '43,0kgfm',
      fuelTank: '75L',
      consumption: '10,2km/L',
      traction: '4x4 Super Select',
      ownership: 'Único Dono',
      ipva: 'Pago'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'GMC Hummer EV',
    brand: 'GMC',
    year: 2024,
    price: 189900,
    mileage: '0',
    fuel: 'Elétrico',
    transmission: 'Automático',
    color: 'Verde',
    image_url: '/car3.jpg',
    images: ['/car3.jpg', '/car4.jpg', '/car1.jpeg', '/car2.jpeg'],
    status: 'available',
    description: '100% elétrico, torque instantâneo',
    features: ['1000Nm torque', 'Modo Terra', 'Regenerativo', '4WD'],
    extras: {
      engine: 'Tri Motor',
      horsepower: '1.000cv',
      torque: '1.065Nm',
      consumption: '3,0km/kWh',
      acceleration: '3,3s',
      maxSpeed: '160km/h',
      traction: '4WD',
      warranty: '8 anos'
    },
    created_at: new Date().toISOString()
  },
  {
    model: 'Ford F-150 Raptor',
    brand: 'Ford',
    year: 2023,
    price: 459900,
    mileage: '12.000',
    fuel: 'V8 EcoBoost',
    transmission: 'Automático 10AT',
    color: 'Azul',
    image_url: '/car4.jpg',
    images: ['/car4.jpg', '/car1.jpeg', '/car2.jpeg', '/car3.jpg'],
    status: 'available',
    description: 'Performance offroad extreme',
    features: ['Suspensão Longa', 'Fox Shocks', 'Modo Baja', 'Michelin BF'],
    extras: {
      engine: '3.0 V6 EcoBoost',
      horsepower: '450cv',
      torque: '58,0kgfm',
      fuelTank: '136L',
      consumption: '6,5km/L',
      acceleration: '5,0s',
      maxSpeed: '190km/h',
      capacity: '1.130kg',
      traction: '4x4 Part Time',
      suspension: 'Long Travel FOX',
      ownership: 'Único Dono'
    },
    created_at: new Date().toISOString()
  }
];

async function seedDatabase() {
  console.log('Inserindo veículos no Supabase...');
  
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehicles)
    .select();

  if (error) {
    console.error('Erro ao inserir veículos:', error);
    return;
  }

  console.log('Veículos inseridos com sucesso!');
  console.log('Total inserido:', data?.length);
}

seedDatabase();