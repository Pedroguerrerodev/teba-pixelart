import type { Metadata, Viewport } from 'next';
import { Nunito, Press_Start_2P, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-body',
});

const pressStart = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-pixel',
});

export const metadata: Metadata = {
  title: 'Explora Teba RPG',
  description:
    'Guia RPG inmersiva para descubrir Teba: castillo, historia, naturaleza, gastronomia, fiestas y patrimonio.',
  keywords: ['Teba', 'Malaga', 'turismo', 'pixel art', 'RPG', 'Guadalteba'],
  authors: [{ name: 'Explora Teba' }],
  openGraph: {
    title: 'Explora Teba RPG',
    description: 'Mapa magico e inmersivo para descubrir Teba desde el movil.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#070c15',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn(nunito.variable, pressStart.variable, "font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
