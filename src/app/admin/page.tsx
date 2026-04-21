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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #0d0d0d 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          linear-gradient(rgba(255,200,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,200,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '30px 30px',
      }} />

      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#ffc800',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 0 30px rgba(255,200,0,0.4)',
          }}>
            <span style={{ fontFamily: '"Russo One", sans-serif', fontSize: '40px', color: '#000' }}>F</span>
          </div>
          <h1 style={{ fontFamily: '"Russo One", sans-serif', fontSize: '28px', color: '#ffc800', margin: 0 }}>FLASH</h1>
          <p style={{ fontFamily: '"Exo 2", sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '5px', letterSpacing: '3px' }}>DASHBOARD ADMIN</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,200,0,0.2)',
          borderRadius: '16px',
          padding: '30px',
          backdropFilter: 'blur(10px)',
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {error && (
              <div style={{
                background: 'rgba(255,0,0,0.1)',
                border: '1px solid rgba(255,0,0,0.3)',
                color: '#ff4444',
                padding: '12px',
                borderRadius: '8px',
                textAlign: 'center',
                fontFamily: '"Russo One", sans-serif',
                fontSize: '12px',
              }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: 'block', color: '#ffc800', fontFamily: '"Russo One", sans-serif', fontSize: '12px', marginBottom: '8px' }}>USUÁRIO</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,200,0,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#ffc800'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,200,0,0.2)'}
                placeholder="Digite o usuário"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#ffc800', fontFamily: '"Russo One", sans-serif', fontSize: '12px', marginBottom: '8px' }}>SENHA</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,200,0,0.2)',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.3s',
                }}
                onFocus={(e) => e.target.style.borderColor = '#ffc800'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,200,0,0.2)'}
                placeholder="Digite a senha"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: '#ffc800',
                border: 'none',
                borderRadius: '8px',
                color: '#000',
                fontFamily: '"Russo One", sans-serif',
                fontSize: '14px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s',
                marginTop: '10px',
              }}
            >
              {loading ? 'ENTRANDO...' : 'ENTRAR'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '10px', marginTop: '30px', letterSpacing: '2px' }}>
          ÁREA RESTRITA • FLASH MULTIMARCAS
        </p>
      </div>
    </div>
  );
}