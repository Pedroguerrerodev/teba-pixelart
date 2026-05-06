'use client';

import { RotateCcw, Volume2, VolumeX, WandSparkles } from 'lucide-react';
import { RpgProgress } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface SettingsPanelProps {
  progress: RpgProgress;
  onToggleMusic: () => void;
  onToggleEffects: () => void;
  onToggleReducedMotion: () => void;
  onReset: () => void;
}

export default function SettingsPanel({
  progress,
  onToggleMusic,
  onToggleEffects,
  onToggleReducedMotion,
  onReset,
}: SettingsPanelProps) {
  return (
    <main className="app-screen overflow-y-auto px-4 pb-28 pt-5">
      <header className="mb-4">
        <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
          Sistema
        </p>
        <h1 className="mt-3 font-pixel text-xl text-white">Ajustes</h1>
      </header>

      <div className="grid gap-3">
        <PixelPanel className="p-4">
          <button onClick={onToggleMusic} className="settings-row">
            {progress.musicEnabled ? <Volume2 size={20} aria-hidden /> : <VolumeX size={20} aria-hidden />}
            <span>Musica ambiente</span>
            <strong>{progress.musicEnabled ? 'ON' : 'OFF'}</strong>
          </button>
        </PixelPanel>

        <PixelPanel className="p-4">
          <button onClick={onToggleEffects} className="settings-row">
            <WandSparkles size={20} aria-hidden />
            <span>Efectos de interfaz</span>
            <strong>{progress.effectsEnabled ? 'ON' : 'OFF'}</strong>
          </button>
        </PixelPanel>

        <PixelPanel className="p-4">
          <button onClick={onToggleReducedMotion} className="settings-row">
            <WandSparkles size={20} aria-hidden />
            <span>Movimiento reducido</span>
            <strong>{progress.reducedMotion ? 'ON' : 'OFF'}</strong>
          </button>
        </PixelPanel>

        <PixelPanel className="p-4" accent="#e76f51">
          <button onClick={onReset} className="settings-row text-red-100">
            <RotateCcw size={20} aria-hidden />
            <span>Reiniciar progreso</span>
            <strong>RESET</strong>
          </button>
        </PixelPanel>
      </div>
    </main>
  );
}
