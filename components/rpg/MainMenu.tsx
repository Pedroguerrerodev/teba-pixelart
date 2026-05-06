'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MainMenuProps {
  hasSave: boolean;
  onNewGame: () => void;
  onContinue: () => void;
  onSettings: () => void;
}

function startMusicFromGesture() {
  window.__playTebaMusic?.();
}

const titleBackgrounds = [
  '/images/castillo-fondo.png',
  '/images/castillo-dia.png',
  '/images/tajotorrox-vetical.png',
  '/images/ayuntamiento.png',
  '/images/iglesia.png',
  '/images/monumento-douglas.png',
];

export default function MainMenu({ hasSave, onNewGame, onContinue, onSettings }: MainMenuProps) {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const actions = [
    { label: 'Nueva partida', action: onNewGame, disabled: false },
    { label: 'Continuar', action: onContinue, disabled: !hasSave },
    { label: 'Ajustes', action: onSettings, disabled: false },
  ];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % titleBackgrounds.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  const activeBackground = titleBackgrounds[backgroundIndex];

  return (
    <main className="app-screen title-screen" onPointerDown={startMusicFromGesture}>
      <div className="title-backdrop">
        <AnimatePresence mode="sync">
          <motion.img
            key={activeBackground}
            src={activeBackground}
            alt=""
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              opacity: { duration: 1.25, ease: 'easeInOut' },
              scale: { duration: 10, ease: 'linear' },
            }}
            className="title-backdrop-image"
            onError={(event) => {
              event.currentTarget.src = '/images/castillo-fondo.png';
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 title-vignette" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex h-full flex-col items-center justify-between px-5 pb-7 pt-16 text-center"
      >
        <header className="title-logo">
          <h1 className="title-teba" aria-label="Teba">
            TEBA
          </h1>
          <p className="title-subtitle">en pixeles</p>
          <div className="title-rule" />
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
