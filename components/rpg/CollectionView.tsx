'use client';

import * as Icons from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { CollectionItem, RpgProgress } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface CollectionViewProps {
  items: CollectionItem[];
  progress: RpgProgress;
  onEquipItem: (itemId: string) => void;
}

function ItemIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.Gem;
  return <Icon size={22} aria-hidden />;
}

export default function CollectionView({ items, progress, onEquipItem }: CollectionViewProps) {
  return (
    <main className="app-screen overflow-y-auto px-4 pb-28 pt-32">
      <header className="mb-4">
        <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
          Diario de viaje
        </p>
        <h1 className="mt-3 font-pixel text-xl text-white">Inventario y diario</h1>
        <p className="mt-3 text-sm leading-6 text-stone-200/78">
          Sellos, reliquias y herramientas que convierten la visita en una ruta RPG.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const unlocked = progress.collectionItemIds.includes(item.id);
          const equipped = progress.equippedItemId === item.id;

          return (
            <PixelPanel
              key={item.id}
              className={`min-h-48 p-4 ${unlocked ? '' : 'opacity-60'} ${equipped ? 'inventory-equipped' : ''}`}
            >
              <div className="grid h-12 w-12 place-items-center border-2 border-black bg-amber-300 text-black shadow-[3px_3px_0_#000]">
                {unlocked ? <ItemIcon name={item.icon} /> : <LockKeyhole size={21} aria-hidden />}
              </div>
              <p className="mt-3 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-amber-200/75">
                {item.kind === 'relic' ? 'Reliquia' : item.kind === 'tool' ? 'Herramienta' : 'Sello'}
              </p>
              <h2 className="mt-4 font-pixel text-[0.65rem] leading-5 text-white">
                {unlocked ? item.title : 'Recuerdo oculto'}
              </h2>
              <p className="mt-2 text-xs leading-5 text-stone-200/75">
                {unlocked ? item.description : 'Completa su mision para anadirlo al diario.'}
              </p>
              {unlocked && (
                <button
                  onClick={() => onEquipItem(item.id)}
                  className="mt-4 w-full border-2 border-black bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[2px_2px_0_#000]"
                >
                  {equipped ? 'Equipado' : 'Equipar'}
                </button>
              )}
            </PixelPanel>
          );
        })}
      </div>
    </main>
  );
}
