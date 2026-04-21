'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Vehicle, Lead } from '@/types';

export default function Dashboard() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'vehicles' | 'leads'>('vehicles');

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      router.push('/admin');
      return;
    }

    const fetchData = async () => {
      try {
        const [vehiclesRes, leadsRes] = await Promise.all([
          fetch('/api/vehicles'),
          fetch('/api/leads'),
        ]);

        if (vehiclesRes.ok) {
          const vehiclesData = await vehiclesRes.json();
          setVehicles(vehiclesData);
        }

        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          setLeads(leadsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleStatusChange = async (id: string, newStatus: 'available' | 'sold') => {
    const auth = localStorage.getItem('admin_auth');

    try {
      const res = await fetch('/api/vehicles', {
        method: 'PUT',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setVehicles(vehicles.map(v =>
          v.id === id ? { ...v, status: newStatus } : v
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-yellow font-russo text-2xl animate-pulse">CARREGANDO...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <header className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-yellow font-russo text-2xl">
              FLASH
            </Link>
            <span className="text-white/50 font-exo">DASHBOARD</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-dark text-white font-russo px-5 py-2 border border-red hover:bg-red transition-colors"
          >
            SAIR
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`nfs-btn text-sm ${activeTab === 'vehicles' ? 'nfs-btn-yellow' : 'nfs-btn-dark'}`}
          >
            VEÍCULOS ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`nfs-btn text-sm ${activeTab === 'leads' ? 'nfs-btn-yellow' : 'nfs-btn-dark'}`}
          >
            LEADS ({leads.length})
          </button>
        </div>

        {activeTab === 'vehicles' && (
          <div className="glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="nfs-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>MODELO</th>
                    <th>ANO</th>
                    <th>PREÇO</th>
                    <th>STATUS</th>
                    <th>AÇÃO</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle, idx) => (
                    <tr key={vehicle.id}>
                      <td className="racing-number">{idx + 1}</td>
                      <td>
                        <p className="text-white font-russo">{vehicle.model}</p>
                        <p className="text-white/50 text-xs">{vehicle.brand}</p>
                      </td>
                      <td className="font-exo">{vehicle.year}</td>
                      <td className="text-yellow font-russo">{formatPrice(vehicle.price)}</td>
                      <td>
                        <span className={`status-badge ${vehicle.status === 'available' ? 'status-available' : 'status-sold'}`}>
                          {vehicle.status === 'available' ? 'DISP' : 'VEND'}
                        </span>
                      </td>
                      <td>
                        <select
                          value={vehicle.status}
                          onChange={(e) => handleStatusChange(vehicle.id, e.target.value as 'available' | 'sold')}
                          className="nfs-select"
                        >
                          <option value="available">Disponível</option>
                          <option value="sold">Vendido</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="space-y-4">
            {leads.length === 0 ? (
              <div className="glass p-10 text-center">
                <p className="text-white/50 font-exo text-xl">NENHUM LEAD RECEBIDO</p>
              </div>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} className="glass p-5 border-l-4 border-yellow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <p className="text-yellow font-russo text-lg">{lead.customerName}</p>
                      <p className="text-white/60 font-exo text-sm">{lead.customerPhone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-yellow font-exo">{lead.vehicleModel}</p>
                      <p className="text-white/40 text-xs">{formatDate(lead.createdAt)}</p>
                    </div>
                  </div>
                  {lead.message && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-white/70 font-exo text-sm">{lead.message}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}