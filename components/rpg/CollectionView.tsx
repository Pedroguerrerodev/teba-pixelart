'use client';

import * as Icons from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { CollectionItem, RpgProgress } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface CollectionViewProps {
  items: CollectionItem[];
  progress: RpgProgress;
}

function ItemIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.Gem;
  return <Icon size={22} aria-hidden />;
}

export default function CollectionView({ items, progress }: CollectionViewProps) {
  return (
    <main className="app-screen overflow-y-auto px-4 pb-28 pt-5">
      <header className="mb-4">
        <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
          Diario de viaje
        </p>
        <h1 className="mt-3 font-pixel text-xl text-white">Coleccion</h1>
        <p className="mt-3 text-sm leading-6 text-stone-200/78">
          Sellos y recuerdos que vas desbloqueando al explorar el mapa.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const unlocked = progress.collectionItemIds.includes(item.id);

          return (
            <PixelPanel key={item.id} className={`min-h-44 p-4 ${unlocked ? '' : 'opacity-60'}`}>
              <div className="grid h-12 w-12 place-items-center border-2 border-black bg-amber-300 text-black shadow-[3px_3px_0_#000]">
                {unlocked ? <ItemIcon name={item.icon} /> : <LockKeyhole size={21} aria-hidden />}
              </div>
              <h2 className="mt-4 font-pixel text-[0.65rem] leading-5 text-white">
                {unlocked ? item.title : 'Recuerdo oculto'}
              </h2>
              <p className="mt-2 text-xs leading-5 text-stone-200/75">
                {unlocked ? item.description : 'Completa su mision para anadirlo al diario.'}
              </p>
            </PixelPanel>
          );
        })}
      </div>
    </main>
  );
}
