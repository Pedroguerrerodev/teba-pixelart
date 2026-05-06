'use client';

import { motion } from 'framer-motion';
import { Compass, Gem, ScrollText, Settings } from 'lucide-react';

interface MainMenuProps {
  onExplore: () => void;
  onQuests: () => void;
  onCollection: () => void;
  onSettings: () => void;
}

export default function MainMenu({ onExplore, onQuests, onCollection, onSettings }: MainMenuProps) {
  const actions = [
    { label: 'Explorar Teba', icon: Compass, action: onExplore, primary: true },
    { label: 'Misiones', icon: ScrollText, action: onQuests },
    { label: 'Coleccion', icon: Gem, action: onCollection },
    { label: 'Ajustes', icon: Settings, action: onSettings },
  ];

  return (
    <main className="app-screen">
      <div className="menu-backdrop">
        <img
          src="/images/main-menu.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-90"
          onError={(event) => {
            event.currentTarget.src = '/images/douglasday.png';
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(246,203,113,0.28),transparent_28%),linear-gradient(180deg,rgba(7,12,21,0.2),rgba(7,12,21,0.94))]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex h-full flex-col justify-end px-5 pb-8 pt-8"
      >
        <div className="mb-8">
          <p className="font-pixel text-[0.58rem] uppercase tracking-[0.28em] text-amber-200/80">
            Guia RPG inmersiva
          </p>
          <h1 className="mt-3 font-pixel text-3xl leading-tight text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.75)]">
            Explora Teba
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-stone-100/82">
            Recorre el castillo, la frontera, el Guadalteba y los sabores del pueblo como si abrieras un mapa magico de bolsillo.
          </p>
        </div>

        <div className="grid gap-3">
          {actions.map(({ label, icon: Icon, action, primary }) => (
            <button
              key={label}
              onClick={action}
              className={`pixel-action ${primary ? 'pixel-action-primary' : ''}`}
            >
              <Icon size={20} aria-hidden />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
