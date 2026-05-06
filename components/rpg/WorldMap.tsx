'use client';

import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import XpBar from '@/components/ui/8bit/xp-bar';
import { getExplorationPercent } from '@/lib/rpg-progress';
import { RpgProgress, RpgZone } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface WorldMapProps {
  zones: RpgZone[];
  progress: RpgProgress;
  onOpenZone: (zoneId: string) => void;
}

function ZoneIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.MapPin;
  return <Icon size={18} aria-hidden />;
}

export default function WorldMap({ zones, progress, onOpenZone }: WorldMapProps) {
  const explorationPercent = getExplorationPercent(progress, zones.length);

  return (
    <main className="app-screen pb-24">
      <div className="map-stage">
        <img
          src="/images/mapa-teba.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 map-fallback" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,224,151,0.2),transparent_28%),linear-gradient(180deg,rgba(12,18,28,0.08),rgba(12,18,28,0.9))]" />

        <header className="relative z-10 px-4 pt-5">
          <PixelPanel className="p-4">
            <p className="font-pixel text-[0.5rem] uppercase tracking-[0.2em] text-amber-200/80">
              Mapa libre
            </p>
            <h2 className="mt-2 font-pixel text-lg text-white">Territorio de Teba</h2>
            <p className="mt-2 text-xs leading-5 text-stone-200/78">
              Toca un enclave para abrir su escena, descubrir puntos y guardar recuerdos en tu diario.
            </p>
            <XpBar
              className="mt-4"
              value={explorationPercent}
              variant="retro"
              levelUpMessage="TEBA COMPLETA"
            />
          </PixelPanel>
        </header>

        {zones.map((zone, index) => {
          const visited = progress.visitedZoneIds.includes(zone.id);
          const completed = progress.completedMissionIds.includes(zone.mission.id);

          return (
            <motion.button
              key={zone.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15 + index * 0.04, type: 'spring', stiffness: 220 }}
              onClick={() => onOpenZone(zone.id)}
              className={`map-node ${completed ? 'map-node-complete' : visited ? 'map-node-visited' : ''}`}
              style={{ left: `${zone.mapX}%`, top: `${zone.mapY}%`, '--zone-accent': zone.accent } as React.CSSProperties}
            >
              <span className="map-node-icon">
                <ZoneIcon name={zone.nodeIcon} />
              </span>
              <span className="map-node-label">{zone.title}</span>
            </motion.button>
          );
        })}
      </div>
    </main>
  );
}
