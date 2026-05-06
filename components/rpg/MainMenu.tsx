'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Settings } from 'lucide-react';

interface MainMenuProps {
  hasSave: boolean;
  onNewGame: () => void;
  onContinue: () => void;
  onSettings: () => void;
}

export default function MainMenu({ hasSave, onNewGame, onContinue, onSettings }: MainMenuProps) {
  const actions = [
    { label: 'Nueva partida', action: onNewGame, disabled: false },
    { label: 'Continuar', action: onContinue, disabled: !hasSave },
    { label: 'Ajustes', action: onSettings, disabled: false },
  ];

  return (
    <main className="app-screen title-screen">
      <div className="title-backdrop">
        <img
          src="/images/castillo-fondo.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = '/images/douglasday.png';
          }}
        />
        <div className="absolute inset-0 title-vignette" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex h-full flex-col items-center justify-between px-5 pb-7 pt-16 text-center"
      >
        <header className="title-logo">
          <p className="font-pixel text-[0.58rem] uppercase tracking-[0.42em] text-white/80">
            El mapa de la estrella
          </p>
          <h1 className="title-teba" aria-label="Teba">
            TEBA
          </h1>
          <div className="title-rule" />
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.26em] text-white/82">
            Douglas Heart Traveler
          </p>
        </header>

        <div className="title-menu" role="menu" aria-label="Menu principal">
          {actions.map(({ label, action, disabled }) => (
            <button
              key={label}
              onClick={action}
              disabled={disabled}
              className="title-menu-item group"
              role="menuitem"
            >
              <ChevronRight className="title-menu-arrow" size={24} aria-hidden />
              <span>{label}</span>
              {label === 'Ajustes' && <Settings className="opacity-70" size={18} aria-hidden />}
              {disabled && <small>Sin partida guardada</small>}
            </button>
          ))}
        </div>

        <footer className="font-pixel text-[0.48rem] uppercase tracking-[0.2em] text-white/72">
          Teba - Malaga
        </footer>
      </motion.div>
    </main>
  );
}
