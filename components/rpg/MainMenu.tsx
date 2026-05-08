'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Settings } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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
  const [loadedBackgrounds, setLoadedBackgrounds] = useState<string[]>([titleBackgrounds[0]]);
  const [visibleLayer, setVisibleLayer] = useState(0);
  const visibleLayerRef = useRef(0);
  const [layerBackgrounds, setLayerBackgrounds] = useState<[string, string]>([
    titleBackgrounds[0],
    titleBackgrounds[0],
  ]);
  const actions = [
    { label: 'Nueva partida', action: onNewGame, disabled: false },
    { label: 'Continuar', action: onContinue, disabled: !hasSave },
    { label: 'Ajustes', action: onSettings, disabled: false },
  ];

  useEffect(() => {
    titleBackgrounds.forEach((src) => {
      const image = new Image();
      image.onload = async () => {
        await image.decode?.().catch(() => undefined);
        setLoadedBackgrounds((current) => (current.includes(src) ? current : [...current, src]));
      };
      image.onerror = () => {
        setLoadedBackgrounds((current) =>
          current.includes(titleBackgrounds[0]) ? current : [...current, titleBackgrounds[0]]
        );
      };
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (loadedBackgrounds.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % loadedBackgrounds.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [loadedBackgrounds.length]);

  const activeBackground = loadedBackgrounds[backgroundIndex % loadedBackgrounds.length];

  useEffect(() => {
    visibleLayerRef.current = visibleLayer;
  }, [visibleLayer]);

  useEffect(() => {
    const currentLayer = visibleLayerRef.current;
    const nextLayer = currentLayer === 0 ? 1 : 0;

    setLayerBackgrounds((current) => {
      if (current[currentLayer] === activeBackground) {
        return current;
      }

      const nextBackgrounds: [string, string] = [...current] as [string, string];
      nextBackgrounds[nextLayer] = activeBackground;
      return nextBackgrounds;
    });

    const frame = window.requestAnimationFrame(() => {
      setVisibleLayer(nextLayer);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeBackground]);

  return (
    <main className="app-screen title-screen" onPointerDown={startMusicFromGesture}>
      <div className="title-backdrop">
        {layerBackgrounds.map((src, index) => (
          <div
            key={`${index}-${src}`}
            className={`title-backdrop-layer ${
              visibleLayer === index ? 'title-backdrop-layer-active' : ''
            }`}
            style={{ backgroundImage: `url("${src}")` }}
          />
        ))}
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
