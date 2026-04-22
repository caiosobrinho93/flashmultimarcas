import type { Metadata, Viewport } from 'next';
import './globals.css';
import { storeInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: `${storeInfo.name} - Carros em Votuporanga`,
  description: `Loja de carros em Votuporanga/SP. ${storeInfo.address}. ${storeInfo.phone}.`,
  keywords: 'carros, seminovos, Votuporanga, Flash Multimarcas',
  authors: [{ name: storeInfo.name }],
  metadataBase: new URL('https://caiosobrinho93.github.io/flashmultimarcas'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Flash Multimarcas',
  },
  openGraph: {
    title: storeInfo.name,
    description: `Carros em Votuporanga/SP`,
    type: 'website',
    locale: 'pt_BR',
    siteName: storeInfo.name,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}