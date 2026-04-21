import type { Metadata } from 'next';
import './globals.css';
import { storeInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: `${storeInfo.name} - Carros em Votuporanga`,
  description: `Loja de carros em Votuporanga/SP. ${storeInfo.address}. ${storeInfo.phone}.`,
  keywords: 'carros, seminovos, Votuporanga, Flash Multimarcas',
  authors: [{ name: storeInfo.name }],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: storeInfo.name,
    description: `Carros em Votuporanga/SP`,
    type: 'website',
    locale: 'pt_BR',
    siteName: storeInfo.name,
  },
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