'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { storeInfo } from '@/lib/data';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:${storeInfo.phone}`;
  };

  return (
    <header className="header-garage">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo.png"
                alt="Flash Multimarcas"
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={handleCall}
              className="flex items-center gap-2 text-white/70 hover:text-yellow transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.44 16.86a2.41 2.41 0 0 0-.67-1.12l-2.2-1.47a2.31 2.31 0 0 0-1.27-.39 20.59 20.59 0 0 1-6.64-.07 2.26 2.26 0 0 0-1.23.37l-2.18 1.45a2.41 2.41 0 0 0-1.13.66l-.45.73a22.22 22.22 0 0 0 4.76 7.46 2.41 2.41 0 0 0 1.15.67l.73.28a2.29 2.29 0 0 0 1.12 0l6.57-1.75a2.29 2.29 0 0 0 1.12 0l.73-.28a2.42 2.42 0 0 0 .67-1.12l.36-.59a22.5 22.5 0 0 0-.63-6.18z"/>
              </svg>
              <span className="font-exo text-sm">{storeInfo.phone}</span>
            </button>
            
            <Link
              href={`https://wa.me/55${storeInfo.whatsapp}`}
              target="_blank"
              className="bg-yellow text-black font-russo px-4 py-2 text-sm"
            >
              WhatsApp
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCall}
                className="flex items-center gap-2 text-white/70 font-exo"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.44 16.86a2.41 2.41 0 0 0-.67-1.12l-2.2-1.47a2.31 2.31 0 0 0-1.27-.39 20.59 20.59 0 0 1-6.64-.07 2.26 2.26 0 0 0-1.23.37l-2.18 1.45a2.41 2.41 0 0 0-1.13.66l-.45.73a22.22 22.22 0 0 0 4.76 7.46 2.41 2.41 0 0 0 1.15.67l.73.28a2.29 2.29 0 0 0 1.12 0l6.57-1.75a2.29 2.29 0 0 0 1.12 0l.73-.28a2.42 2.42 0 0 0 .67-1.12l.36-.59a22.5 22.5 0 0 0-.63-6.18z"/>
                </svg>
                {storeInfo.phone}
              </button>
              <Link
                href={`https://wa.me/55${storeInfo.whatsapp}`}
                target="_blank"
                className="bg-green-500 text-white font-exo px-4 py-2 text-center"
              >
                WhatsApp
              </Link>
            </div>
          </nav>
        )}
      </div>
      <div className="neon-line" />
    </header>
  );
}