'use client';

import { storeInfo } from '@/lib/data';

export default function Footer() {
  const openInstagram = () => {
    window.open('https://instagram.com/flashmotorsvotuporanga', '_blank');
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os veículos.');
    window.open(`https://wa.me/55${storeInfo.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <footer className="glass border-t border-white/10 mt-auto relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-yellow font-russo text-lg mb-4">CONTATO</h3>
            <div className="space-y-2 font-exo text-white/70">
              <p>{storeInfo.phone}</p>
              <p>WhatsApp: {storeInfo.whatsapp}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-yellow font-russo text-lg mb-4">LOCALIZAÇÃO</h3>
            <p className="font-exo text-white/70">
              {storeInfo.address}
            </p>
          </div>
          
          <div>
            <h3 className="text-yellow font-russo text-lg mb-4">REDES SOCIAIS</h3>
            <button
              onClick={openInstagram}
              className="text-white/70 hover:text-yellow font-exo transition-colors"
            >
              {storeInfo.instagram}
            </button>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-exo text-white/40 text-sm">
            © 2024 {storeInfo.name}. Todos os direitos reservados.
          </p>
          <button
            onClick={openWhatsApp}
            className="nfs-btn nfs-btn-yellow flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198.00-.492.05-.704.15-.213.099-.447.223-.642.223-.297.00-.595.00-.892.00-.198.00-.397.00-.595.00-.198.00-.495-.05-.714-.15z"/>
            </svg>
            FALAR NO WHATSAPP
          </button>
        </div>
      </div>
    </footer>
  );
}