'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Vehicle, Lead } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const carBrands: Record<string, string[]> = {
  'Chevrolet': ['Onix', 'Cruze', 'Tracker', 'S10', 'Colorado', 'Spin', 'Equinox', 'Trailblazer', 'Camaro', 'Bolt'],
  'Ford': ['Ka', 'EcoSport', 'Ranger', 'Mustang', 'Bronco', 'Territory', 'Maverick'],
  'Volkswagen': ['Gol', 'Polo', 'Virtus', 'T-Cross', 'Nivus', 'Jetta', 'Passat', 'Amarok', 'Touareg', 'ID.4'],
  'Fiat': ['Uno', 'Argo', 'Cronos', 'Pulse', 'Fastback', 'Strada', 'Toro', 'Mobi', 'Grand Siena'],
  'Toyota': ['Corolla', 'Corolla Cross', 'Hilux', 'SW4', 'Yaris', 'Rav4', 'Prius', 'Camry'],
  'Honda': ['Civic', 'HR-V', 'CR-V', 'City', 'Fit', 'Accord', 'Pilot', 'WR-V'],
  'Hyundai': ['HB20', 'Creta', 'Tucson', 'Santa Fe', 'I30', 'Elantra', 'Kona', 'Ioniq'],
  'Nissan': ['Kicks', 'Sentra', 'Versa', 'Altima', 'Frontier', 'Leaf', 'X-Trail'],
  'Jeep': ['Renegade', 'Compass', 'Commander', 'Wrangler', 'Gladiator'],
  'Renault': ['Kwid', 'Sandero', 'Logan', 'Duster', 'Oroch', 'Kiger', 'Arkana'],
  'Mitsubishi': ['L200', 'Pajero', 'Outlander', 'Eclipse Cross', 'ASX', 'Xpander'],
  'Peugeot': ['208', '2008', '3008', '408', '508', 'Partner', 'Expert'],
  'Citroën': ['C3', 'C4 Cactus', 'C5 Aircross', 'Berlingo', 'Jumpy'],
  'BMW': ['Series 1', 'Series 3', 'Series 5', 'X1', 'X3', 'X5', 'X7', 'M3', 'M5'],
  'Mercedes': ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC', 'GLE', 'GLS', 'AMG'],
  'Audi': ['A3', 'A4', 'A5', 'Q3', 'Q5', 'Q7', 'e-tron'],
  'Volvo': ['XC40', 'XC60', 'XC90', 'S60', 'V60', 'EX30', 'EX90'],
  'Kia': ['Sportage', 'Seltos', 'Cerato', 'Optima', 'Stonic', 'Soul', 'EV6'],
  'Chery': ['Tiggo 2', 'Tiggo 3', 'Tiggo 5', 'Tiggo 7', 'Arrizo 5', 'QQ'],
  'Caoa Chery': ['Tiggo 2', 'Tiggo 3', 'Tiggo 5', 'Tiggo 7', 'Arrizo 5'],
  'BYD': ['Dolphin', 'Seal', 'Atto 3', 'Tan', 'Han'],
  'Geely': ['Coolray', 'Okavango', 'Tugella', 'Coutury'],
  'Jaecoo': ['J6', 'J7', 'J8'],
  'Omoda': ['C5', 'E5'],
  'Porsche': ['911', 'Cayenne', 'Macan', 'Taycan', 'Panamera'],
  'Land Rover': ['Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar', 'Discovery', 'Defender'],
  'Jaguar': ['F-PACE', 'E-PACE', 'I-PACE', 'XE', 'XF'],
  'Lexus': ['UX', 'NX', 'RX', 'LX', 'ES', 'LS', 'LC'],
  'Maserati': ['Ghibli', 'Levante', 'Quattroporte', 'MC20'],
  'Alfa Romeo': ['Giulia', 'Stelvio', 'Tonale'],
  'Subaru': ['Impreza', 'Forester', 'Outback', 'XV', 'WRX', 'BRZ'],
  'Suzuki': ['Jimny', 'Vitara', 'S-Cross', 'Ciaz', 'Swift'],
};

const brandLogos: Record<string, string> = {
  'Chevrolet': '/logos/chevrolet.png',
  'Ford': '/logos/ford.png',
  'Volkswagen': '/logos/vw.png',
  'Fiat': '/logos/fiat.png',
  'Toyota': '/logos/toyota.png',
  'Honda': '/logos/honda.png',
  'Hyundai': '/logos/hyundai.png',
  'Nissan': '/logos/nissan.png',
  'Jeep': '/logos/jeep.png',
  'Renault': '/logos/renault.png',
  'Mitsubishi': '/logos/mitsubishi.png',
  'Peugeot': '/logos/peugeot.png',
  'Citroën': '/logos/citroen.png',
  'BMW': '/logos/bmw.png',
  'Mercedes': '/logos/mercedes.png',
  'Audi': '/logos/audi.png',
  'Volvo': '/logos/volvo.png',
  'Kia': '/logos/kia.png',
  'Chery': '/logos/chery.png',
  'Caoa Chery': '/logos/caoacherry.png',
  'BYD': '/logos/byd.png',
  'Geely': '/logos/geely.png',
  'Jaecoo': '/logos/jaecoo.png',
  'Omoda': '/logos/omoda.png',
  'Porsche': '/logos/porsche.png',
  'Land Rover': '/logos/landrover.png',
  'Jaguar': '/logos/jaguar.png',
  'Lexus': '/logos/lexus.png',
  'Maserati': '/logos/maserati.png',
  'Alfa Romeo': '/logos/alfaromeo.png',
  'Subaru': '/logos/subaru.png',
  'Suzuki': '/logos/suzuki.png',
};

export default function Dashboard() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'vehicles' | 'leads'>('vehicles');
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      setError(null);
      const [vehiclesRes, leadsRes] = await Promise.all([
        supabase.from('vehicles').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false })
      ]);

      if (vehiclesRes.error) {
        setError('Erro ao carregar veículos: ' + vehiclesRes.error.message);
      } else if (vehiclesRes.data) {
        setVehicles(vehiclesRes.data.map((v: any) => ({
          id: v.id,
          model: v.model,
          brand: v.brand,
          year: v.year,
          price: v.price,
          mileage: v.mileage,
          fuel: v.fuel,
          transmission: v.transmission,
          color: v.color,
          imageUrl: v.image_url,
          images: v.images,
          status: v.status,
          description: v.description,
          features: v.features,
          createdAt: v.created_at,
          extras: v.extras
        })));
      }

      if (leadsRes.data) {
        setLeads(leadsRes.data.map((l: any) => ({
          id: l.id,
          vehicleId: l.vehicle_id,
          vehicleModel: l.vehicle_model,
          customerName: l.customer_name,
          customerPhone: l.customer_phone,
          message: l.message,
          createdAt: l.created_at
        })));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVehicle = async (vehicle: Partial<Vehicle>) => {
    setSaving(true);
    try {
      const vehicleData = {
        model: vehicle.model,
        brand: vehicle.brand,
        year: vehicle.year,
        price: vehicle.price,
        mileage: vehicle.mileage,
        fuel: vehicle.fuel,
        transmission: vehicle.transmission,
        color: vehicle.color,
        image_url: vehicle.imageUrl,
        images: vehicle.images,
        status: vehicle.status || 'available',
        description: vehicle.description,
        features: vehicle.features,
        extras: vehicle.extras
      };

      if (editingVehicle?.id) {
        await supabase.from('vehicles').update(vehicleData).eq('id', editingVehicle.id);
      } else {
        await supabase.from('vehicles').insert([{ ...vehicleData, created_at: new Date().toISOString() }]);
      }

      setShowModal(false);
      setEditingVehicle(null);
      fetchData();
    } catch (error) {
      console.error('Error saving vehicle:', error);
      alert('Erro ao salvar veículo');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este veículo?')) return;
    setDeleting(id);
    try {
      await supabase.from('vehicles').delete().eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'available' | 'sold' | 'reserved') => {
    try {
      await supabase.from('vehicles').update({ status: newStatus }).eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price);
  };

  const stats = {
    total: vehicles.length,
    available: vehicles.filter(v => v.status === 'available').length,
    sold: vehicles.filter(v => v.status === 'sold').length,
    leads: leads.length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-yellow font-russo text-2xl">CARREGANDO...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-dark border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow flex items-center justify-center">
              <span className="text-black font-russo text-xl">F</span>
            </div>
            <div>
              <h1 className="font-russo text-yellow text-xl">FLASH MULTIMARCAS</h1>
              <p className="text-white/40 text-xs">ADMIN DASHBOARD</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setEditingVehicle(null); setShowModal(true); }}
              className="bg-yellow text-black font-russo px-4 py-2 text-sm hover:bg-yellow/80"
            >
              + NOVO VEÍCULO
            </button>
            <button
              onClick={() => { localStorage.removeItem('admin_auth'); router.push('/'); }}
              className="text-white/60 hover:text-white text-sm"
            >
              SAIR
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="bg-gray-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-4 gap-4">
          <div className="bg-black/50 p-4 rounded border border-white/10">
            <p className="text-white/40 text-xs font-russo">TOTAL</p>
            <p className="text-3xl font-russo text-white">{stats.total}</p>
          </div>
          <div className="bg-black/50 p-4 rounded border border-white/10">
            <p className="text-white/40 text-xs font-russo">DISPONÍVEIS</p>
            <p className="text-3xl font-russo text-green-500">{stats.available}</p>
          </div>
          <div className="bg-black/50 p-4 rounded border border-white/10">
            <p className="text-white/40 text-xs font-russo">VENDIDOS</p>
            <p className="text-3xl font-russo text-red-500">{stats.sold}</p>
          </div>
          <div className="bg-black/50 p-4 rounded border border-white/10">
            <p className="text-white/40 text-xs font-russo">LEADS</p>
            <p className="text-3xl font-russo text-yellow">{stats.leads}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-2 font-russo text-sm ${activeTab === 'vehicles' ? 'text-yellow border-b-2 border-yellow' : 'text-white/60'}`}
          >
            VEÍCULOS ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 font-russo text-sm ${activeTab === 'leads' ? 'text-yellow border-b-2 border-yellow' : 'text-white/60'}`}
          >
            LEADS ({leads.length})
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        {activeTab === 'vehicles' && (
          <div className="space-y-3">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-gray-dark border border-white/10 p-4 flex items-center gap-4">
                <div className="w-24 h-16 bg-black rounded overflow-hidden flex-shrink-0">
                  {vehicle.imageUrl && (
                    <img src={vehicle.imageUrl} alt={vehicle.model} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow text-xs font-russo">{vehicle.brand}</span>
                    <span className="text-white font-russo">{vehicle.model}</span>
                    <span className="text-white/40 text-sm">{vehicle.year}</span>
                  </div>
                  <p className="text-cyan text-sm font-russo">{formatPrice(vehicle.price)}</p>
                </div>
                <select
                  value={vehicle.status}
                  onChange={(e) => handleStatusChange(vehicle.id, e.target.value as any)}
                  className={`px-3 py-1 rounded text-xs font-russo ${vehicle.status === 'available' ? 'bg-green-500/20 text-green-500' : vehicle.status === 'sold' ? 'bg-red-500/20 text-red-500' : 'bg-yellow/20 text-yellow'}`}
                >
                  <option value="available">Disponível</option>
                  <option value="reserved">Reservado</option>
                  <option value="sold">Vendido</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setEditingVehicle(vehicle); setShowModal(true); }}
                    className="p-2 text-white/60 hover:text-yellow"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    disabled={deleting === vehicle.id}
                    className="p-2 text-white/60 hover:text-red-500"
                  >
                    {deleting === vehicle.id ? '...' : '🗑️'}
                  </button>
                </div>
              </div>
            ))}
            {vehicles.length === 0 && (
              <div className="text-center py-10 text-white/40">Nenhum veículo encontrado</div>
            )}
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-3">
            {leads.map(lead => (
              <div key={lead.id} className="bg-gray-dark border border-white/10 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white font-russo">{lead.customerName}</p>
                    <p className="text-cyan text-sm">{lead.customerPhone}</p>
                  </div>
                  <span className="text-white/40 text-xs">{new Date(lead.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
                {lead.vehicleModel && (
                  <p className="text-yellow text-sm mt-2">Interessado em: {lead.vehicleModel}</p>
                )}
                {lead.message && (
                  <p className="text-white/60 text-sm mt-2">"{lead.message}"</p>
                )}
                <a
                  href={`https://wa.me/55${lead.customerPhone.replace(/\D/g, '')}`}
                  target="_blank"
                  className="inline-block mt-3 bg-green-500 text-white px-4 py-2 text-xs font-russo hover:bg-green-600"
                >
                  WHATSAPP
                </a>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="text-center py-10 text-white/40">Nenhum lead encontrado</div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <VehicleModal
          vehicle={editingVehicle}
          onSave={handleSaveVehicle}
          onClose={() => { setShowModal(false); setEditingVehicle(null); }}
          saving={saving}
        />
      )}
    </div>
  );
}

function VehicleModal({ vehicle, onSave, onClose, saving }: { vehicle: Vehicle | null; onSave: (v: Partial<Vehicle>) => void; onClose: () => void; saving: boolean }) {
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [form, setForm] = useState<Partial<Vehicle>>({
    model: vehicle?.model || '',
    brand: vehicle?.brand || '',
    year: vehicle?.year || new Date().getFullYear(),
    price: vehicle?.price || 0,
    mileage: vehicle?.mileage || '',
    fuel: vehicle?.fuel || '',
    transmission: vehicle?.transmission || '',
    color: vehicle?.color || '',
    imageUrl: vehicle?.imageUrl || '',
    images: vehicle?.images || [],
    status: vehicle?.status || 'available',
    description: vehicle?.description || '',
    features: vehicle?.features || [],
    extras: vehicle?.extras || {}
  });
  
  const [selectedBrand, setSelectedBrand] = useState(vehicle?.brand || '');
  const [selectedModel, setSelectedModel] = useState(vehicle?.model || '');
  const [uploadedImages, setUploadedImages] = useState<string[]>(vehicle?.images || []);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('');
    setForm({ ...form, brand, model: '' });
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setForm({ ...form, model });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.name}`;
        const filePath = `vehicles/${fileName}`;
        
        const { data, error } = await supabase.storage
          .from('vehicles')
          .upload(filePath, file);

        if (error) {
          console.error('Upload error:', error);
          showNotification('error', 'Erro ao fazer upload de imagem');
          continue;
        }

        if (data) {
          const { data: { publicUrl } } = supabase.storage
            .from('vehicles')
            .getPublicUrl(filePath);
          uploadedUrls.push(publicUrl);
        }
      }

      if (uploadedUrls.length > 0) {
        const newImages = [...uploadedImages, ...uploadedUrls];
        setUploadedImages(newImages);
        setForm({ ...form, images: newImages, imageUrl: newImages[0] || form.imageUrl });
        showNotification('success', `${uploadedUrls.length} imagem(ns) carregada(s) com sucesso!`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      showNotification('error', 'Erro ao processar imagens');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setForm({ ...form, images: newImages, imageUrl: newImages[0] || '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBrand || !selectedModel) {
      showNotification('error', 'Por favor, selecione marca e modelo');
      return;
    }

    onSave(form);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);
  const fuelTypes = ['Gasolina', 'Álcool', 'Flex', 'Diesel', 'Elétrico', 'Híbrido'];
  const transmissionTypes = ['Manual', 'Automático', 'CVT', 'Semi-automático', 'DCT'];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      {/* Notificação */}
      {notification && (
        <div className={`fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-[60] ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white font-russo text-sm`}>
          {notification.message}
        </div>
      )}
      
      <div className="bg-gray-dark border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-gray-dark z-10">
          <h2 className="font-russo text-yellow text-xl">{vehicle ? 'EDITAR' : 'NOVO'} VEÍCULO</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Marca e Modelo com Dropdowns Dinâmicos */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">MARCA *</label>
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
                required
              >
                <option value="">Selecione a marca</option>
                {Object.keys(carBrands).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">MODELO *</label>
              <select
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
                disabled={!selectedBrand}
                required
              >
                <option value="">{selectedBrand ? 'Selecione o modelo' : 'Selecione a marca primeiro'}</option>
                {(carBrands[selectedBrand] || []).map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Ano, Preço e KM */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">ANO *</label>
              <select
                value={form.year}
                onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
                required
              >
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">PREÇO (R$) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">QUILOMETRAGEM</label>
              <input
                type="text"
                value={form.mileage}
                onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
                placeholder="0 km"
              />
            </div>
          </div>

          {/* Combustível, Câmbio e Cor */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">COMBUSTÍVEL</label>
              <select
                value={form.fuel}
                onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
              >
                <option value="">Selecione</option>
                {fuelTypes.map(fuel => (
                  <option key={fuel} value={fuel}>{fuel}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">CÂMBIO</label>
              <select
                value={form.transmission}
                onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
              >
                <option value="">Selecione</option>
                {transmissionTypes.map(trans => (
                  <option key={trans} value={trans}>{trans}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-2">COR</label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2.5 text-sm rounded"
                placeholder="Ex: Prata, Preto, Branco"
              />
            </div>
          </div>

          {/* Upload de Imagens */}
          <div>
            <label className="block text-yellow text-xs font-russo mb-2">IMAGENS DO VEÍCULO</label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-yellow/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-white/60 mb-2">
                  {uploading ? (
                    <span className="text-yellow">Carregando imagens...</span>
                  ) : (
                    <>
                      <span className="text-yellow font-russo">Clique para selecionar</span>
                      <span className="text-white/40"> ou arraste as imagens aqui</span>
                    </>
                  )}
                </div>
                <p className="text-white/30 text-xs">Selecione várias imagens do seu celular</p>
              </label>
            </div>
            
            {/* Preview das Imagens */}
            {uploadedImages.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-2">
                {uploadedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={img} 
                      alt={`Imagem ${idx + 1}`} 
                      className="w-full h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 bg-yellow text-black text-[10px] px-1 rounded font-russo">
                        CAPA
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-yellow text-xs font-russo mb-2">DESCRIÇÃO</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm rounded h-24"
              placeholder="Descrição adicional do veículo..."
            />
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving || !selectedBrand || !selectedModel}
              className="flex-1 bg-yellow text-black font-russo py-3 hover:bg-yellow/80 disabled:opacity-50 rounded"
            >
              {saving ? 'SALVANDO...' : 'SALVAR VEÍCULO'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 border border-white/20 text-white font-russo hover:bg-white/10 rounded"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}