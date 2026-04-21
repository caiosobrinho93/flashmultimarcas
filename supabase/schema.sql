-- Tabela de Veículos
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  model TEXT NOT NULL,
  brand TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  mileage TEXT,
  fuel TEXT,
  transmission TEXT,
  color TEXT,
  image_url TEXT,
  images TEXT[],
  status TEXT DEFAULT 'available',
  description TEXT,
  features TEXT[],
  extras JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vehicle_id TEXT,
  vehicle_model TEXT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Informações da Loja
CREATE TABLE IF NOT EXISTS store (
  id INTEGER PRIMARY KEY DEFAULT 1,
  name TEXT DEFAULT 'Flash Multimarcas',
  address TEXT,
  phone TEXT,
  whatsapp TEXT,
  instagram TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert inicial da loja
INSERT INTO store (id, name, address, phone, whatsapp, instagram)
VALUES (1, 'Flash Multimarcas', 'Rua Av Prestes Maia, 2566, Votuporanga/SP', '(17) 99758-3742', '17997583742', '@flashmotorsvotuporanga')
ON CONFLICT (id) DO NOTHING;

-- Habilitar Row Level Security
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE store ENABLE ROW LEVEL SECURITY;

-- Policies para veículos (todos podem ver disponíveis)
CREATE POLICY "vehicles_available_read" ON vehicles
  FOR SELECT USING (status = 'available');

CREATE POLICY "vehicles_all_read" ON vehicles
  FOR SELECT USING (true);

CREATE POLICY "vehicles_insert" ON vehicles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "vehicles_update" ON vehicles
  FOR UPDATE USING (true);

CREATE POLICY "vehicles_delete" ON vehicles
  FOR DELETE USING (true);

-- Policies para leads (escrita pública, leitura só auth)
CREATE POLICY "leads_insert" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "leads_read" ON leads
  FOR SELECT USING (true);

-- Policies para store
CREATE POLICY "store_read" ON store
  FOR SELECT USING (true);

CREATE POLICY "store_update" ON store
  FOR UPDATE USING (true);

-- Criar índice para busca
CREATE INDEX IF NOT EXISTS idx_vehicles_brand ON vehicles(brand);
CREATE INDEX IF NOT EXISTS idx_vehicles_model ON vehicles(model);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_price ON vehicles(price);
CREATE INDEX IF NOT EXISTS idx_vehicles_year ON vehicles(year);

-- Inserir veículos do data.ts
INSERT INTO vehicles (model, brand, year, price, mileage, fuel, transmission, color, image_url, images, status, description, features, extras) VALUES
('Jeep Commander Overland', 'Jeep', 2023, 289900, '8.500', 'Diesel', 'Automático 9AT', 'Cinza Graphite', '/car1.jpeg', ARRAY['/car1.jpeg', '/car2.jpeg', '/car3.jpg', '/car4.jpg'], 'available', 'Único dono, top de linha, pkg offroad', ARRAY['4x4', 'Suspensão Independent', 'Cambio 9AT', 'Rodas 20"', 'Som Alpine', 'Camera 360', 'Banco Couro', 'Teto Solar'], '{"engine": "2.0 Turbo"}'::jsonb),
('Toyota Corolla Cross', 'Toyota', 2024, 199900, '5.000', 'Híbrido', 'CVT e-CVT', 'Branco Polar', '/car2.jpeg', ARRAY['/car2.jpeg', '/car3.jpg', '/car4.jpg', '/car1.jpeg'], 'available', 'Zero km, Garantia total 5 anos', ARRAY['Hybrid', 'Toyota Safety Sense', 'Painel Digital', 'Multimídia 10"'], '{"engine": "2.0 Hybrid"}'::jsonb),
('Toyota Hilux SR5', 'Toyota', 2023, 259900, '32.000', 'Diesel', 'Automático 6AT', 'Preto', '/car3.jpg', ARRAY['/car3.jpg', '/car4.jpg', '/car1.jpeg', '/car2.jpeg'], 'available', 'Único dono, revisões concessionária', ARRAY['4x4', 'Spray Bar', 'Protetor Carter', 'Multimídia 9"'], '{"engine": "2.8 Turbo"}'::jsonb),
('Lamborghini Lanzador', 'Lamborghini', 2024, 2500000, '0', 'Elétrico', 'Automático', 'Amarelo', '/car4.jpg', NULL, 'available', 'Conceito 100% elétrico, produção limitada', ARRAY['1000cv', 'Ar Condicionado 4 Zonas'], '{"engine": "Dual Motor"}'::jsonb);