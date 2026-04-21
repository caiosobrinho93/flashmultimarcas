'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Vehicle, Lead } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const [form, setForm] = useState<Partial<Vehicle>>({
    model: vehicle?.model || '',
    brand: vehicle?.brand || '',
    year: vehicle?.year || 2024,
    price: vehicle?.price || 0,
    mileage: vehicle?.mileage || '',
    fuel: vehicle?.fuel || '',
    transmission: vehicle?.transmission || '',
    color: vehicle?.color || '',
    imageUrl: vehicle?.imageUrl || '',
    status: vehicle?.status || 'available',
    description: vehicle?.description || '',
    features: vehicle?.features || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-dark border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-russo text-yellow text-xl">{vehicle ? 'EDITAR' : 'NOVO'} VEÍCULO</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">MARCA</label>
              <input
                type="text"
                value={form.brand}
                onChange={e => setForm({ ...form, brand: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">MODELO</label>
              <input
                type="text"
                value={form.model}
                onChange={e => setForm({ ...form, model: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">ANO</label>
              <input
                type="number"
                value={form.year}
                onChange={e => setForm({ ...form, year: parseInt(e.target.value) })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">PREÇO</label>
              <input
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: parseInt(e.target.value) })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">KM</label>
              <input
                type="text"
                value={form.mileage}
                onChange={e => setForm({ ...form, mileage: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">COMBUSTÍVEL</label>
              <input
                type="text"
                value={form.fuel}
                onChange={e => setForm({ ...form, fuel: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">CÂMBIO</label>
              <input
                type="text"
                value={form.transmission}
                onChange={e => setForm({ ...form, transmission: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-yellow text-xs font-russo mb-1">COR</label>
              <input
                type="text"
                value={form.color}
                onChange={e => setForm({ ...form, color: e.target.value })}
                className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-yellow text-xs font-russo mb-1">URL IMAGEM PRINCIPAL</label>
            <input
              type="url"
              value={form.imageUrl}
              onChange={e => setForm({ ...form, imageUrl: e.target.value })}
              className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-yellow text-xs font-russo mb-1">DESCRIÇÃO</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full bg-black border border-white/20 text-white px-3 py-2 text-sm h-20"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-yellow text-black font-russo py-3 hover:bg-yellow/80 disabled:opacity-50"
            >
              {saving ? 'SALVANDO...' : 'SALVAR'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 border border-white/20 text-white font-russo hover:bg-white/10"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}