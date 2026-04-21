'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_CREDENTIALS } from '@/lib/data';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      localStorage.setItem('admin_auth', btoa(`${username}:${password}`));
      router.push('/admin/dashboard');
    } else {
      setError('CREENCIAIS INVÁLIDAS');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center nfs-bg city-grid relative">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-yellow flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-russo text-4xl">F</span>
          </div>
          <h1 className="text-yellow font-russo text-3xl">FLASH</h1>
          <p className="text-white/60 font-exo text-lg">DASHBOARD ADMIN</p>
        </div>

        <div className="glass p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red/20 border border-red text-red font-russo text-center py-2">
                {error}
              </div>
            )}

            <div>
              <label className="block text-yellow font-russo text-sm mb-2">USUÁRIO</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="nfs-input w-full"
                placeholder="Digite o usuário"
                required
              />
            </div>

            <div>
              <label className="block text-yellow font-russo text-sm mb-2">SENHA</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="nfs-input w-full"
                placeholder="Digite a senha"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="nfs-btn nfs-btn-yellow w-full"
            >
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 font-exo text-xs mt-8">
          ÁREA RESTRITA • FLASH MULTIMARCAS
        </p>
      </div>
    </div>
  );
}