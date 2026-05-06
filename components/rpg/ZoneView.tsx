'use client';

import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { RpgProgress, RpgZone } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface ZoneViewProps {
  zone: RpgZone;
  progress: RpgProgress;
  onBack: () => void;
  onCompleteMission: (zone: RpgZone) => void;
}

function HotspotIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.MapPin;
  return <Icon size={17} aria-hidden />;
}

export default function ZoneView({ zone, progress, onBack, onCompleteMission }: ZoneViewProps) {
  const completed = progress.completedMissionIds.includes(zone.mission.id);

  return (
    <main className="app-screen overflow-y-auto pb-28">
      <div className="relative min-h-[58dvh] overflow-hidden">
        <img
          src={zone.sceneImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => {
            event.currentTarget.src = zone.fallbackImage;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/18 to-[#070c15]" />

        <button onClick={onBack} className="icon-button absolute left-4 top-4 z-20" aria-label="Volver al mapa">
          <ArrowLeft size={20} aria-hidden />
        </button>

        {zone.hotspots.map((hotspot, index) => (
          <motion.div
            key={hotspot.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25 + index * 0.08, type: 'spring' }}
            className="hotspot"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, '--zone-accent': zone.accent } as React.CSSProperties}
          >
            <HotspotIcon name={hotspot.icon} />
          </motion.div>
        ))}

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          <p className="font-pixel text-[0.52rem] uppercase tracking-[0.22em] text-amber-200/88">
            Enclave descubierto
          </p>
          <h1 className="mt-2 font-pixel text-2xl leading-9 text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.75)]">
            {zone.title}
          </h1>
          <p className="mt-2 text-sm text-stone-100/82">{zone.subtitle}</p>
        </div>
      </div>

      <section className="grid gap-4 px-4 pt-4">
        <PixelPanel className="p-4" accent={zone.accent}>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 shrink-0 text-[color:var(--panel-accent)]" size={18} aria-hidden />
            <div>
              <h2 className="font-pixel text-[0.72rem] leading-6 text-white">Por que importa</h2>
              <p className="mt-2 text-sm leading-6 text-stone-200/82">{zone.guide}</p>
            </div>
          </div>
        </PixelPanel>

        <div className="grid gap-3">
          {zone.hotspots.map((hotspot) => (
            <PixelPanel key={hotspot.id} className="p-4" accent={zone.accent}>
              <div className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center border-2 border-black bg-[color:var(--panel-accent)] text-black shadow-[3px_3px_0_#000]">
                  <HotspotIcon name={hotspot.icon} />
                </span>
                <div>
                  <h3 className="font-pixel text-[0.62rem] leading-5 text-white">{hotspot.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-200/78">{hotspot.content}</p>
                </div>
              </div>
            </PixelPanel>
          ))}
        </div>

        <PixelPanel className="p-4" accent={zone.accent}>
          <div className="flex items-start gap-3">
            {completed ? (
              <CheckCircle2 className="mt-1 shrink-0 text-emerald-300" size={20} aria-hidden />
            ) : (
              <Sparkles className="mt-1 shrink-0 text-[color:var(--panel-accent)]" size={20} aria-hidden />
            )}
            <div className="flex-1">
              <h2 className="font-pixel text-[0.72rem] leading-6 text-white">{zone.mission.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-200/78">{zone.mission.description}</p>
              <button
                onClick={() => onCompleteMission(zone)}
                disabled={completed}
                className="pixel-action pixel-action-primary mt-4 w-full disabled:opacity-60"
                style={{ '--action-accent': zone.accent } as React.CSSProperties}
              >
                <CheckCircle2 size={18} aria-hidden />
                <span>{completed ? 'Mision completada' : `Guardar sello +${zone.mission.xp} XP`}</span>
              </button>
            </div>
          </div>
        </PixelPanel>
      </section>
    </main>
  );
}
