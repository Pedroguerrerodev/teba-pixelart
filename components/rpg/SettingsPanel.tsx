'use client';

import { ArrowLeft, RotateCcw, Volume2, VolumeX, WandSparkles } from 'lucide-react';
import { RpgProgress } from '@/lib/types';

interface SettingsPanelProps {
  progress: RpgProgress;
  onToggleMusic: () => void;
  onToggleEffects: () => void;
  onToggleReducedMotion: () => void;
  onReset: () => void;
  onBack: () => void;
}

export default function SettingsPanel({
  progress,
  onToggleMusic,
  onToggleEffects,
  onToggleReducedMotion,
  onReset,
  onBack,
}: SettingsPanelProps) {
  const rows = [
    {
      label: 'Musica ambiente',
      value: progress.musicEnabled ? 'ON' : 'OFF',
      action: onToggleMusic,
      icon: progress.musicEnabled ? Volume2 : VolumeX,
    },
    {
      label: 'Efectos de interfaz',
      value: progress.effectsEnabled ? 'ON' : 'OFF',
      action: onToggleEffects,
      icon: WandSparkles,
    },
    {
      label: 'Movimiento reducido',
      value: progress.reducedMotion ? 'ON' : 'OFF',
      action: onToggleReducedMotion,
      icon: WandSparkles,
    },
    {
      label: 'Reiniciar progreso',
      value: 'RESET',
      action: onReset,
      icon: RotateCcw,
      danger: true,
    },
  ];

  return (
    <main className="app-screen title-screen" onPointerDown={() => window.__playTebaMusic?.()}>
      <div className="title-backdrop">
        <img
          src="/images/castillo-fondo.png"
          alt=""
          className="title-backdrop-image"
          onError={(event) => {
            event.currentTarget.src = '/images/douglasday.png';
          }}
        />
        <div className="absolute inset-0 title-vignette" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-5 pb-7 pt-12 text-center">
        <button onClick={onBack} className="title-back-button" aria-label="Volver al inicio">
          <ArrowLeft size={19} aria-hidden />
          <span>Inicio</span>
        </button>

        <header className="title-logo mt-12">
          <h1 className="title-settings-heading">Ajustes</h1>
          <p className="title-subtitle">sistema</p>
          <div className="title-rule" />
        </header>

        <div className="title-settings-menu" role="menu" aria-label="Ajustes">
          {rows.map(({ label, value, action, icon: Icon, danger }) => (
            <button
              key={label}
              onClick={action}
              className={`title-settings-item ${danger ? 'title-settings-item-danger' : ''}`}
              role="menuitem"
            >
              <Icon size={20} aria-hidden />
              <span>{label}</span>
              <strong>{value}</strong>
            </button>
          ))}
        </div>

        <footer className="font-pixel text-[0.48rem] uppercase tracking-[0.2em] text-white/72">
          Teba - Malaga
        </footer>
      </div>
    </main>
  );
}
