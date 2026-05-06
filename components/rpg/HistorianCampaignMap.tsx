'use client';

import { CheckCircle2, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';
import XpBar from '@/components/ui/8bit/xp-bar';
import { getHistorianCampaignPercent, historianStages } from '@/lib/historian-campaign';
import { RpgProgress } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface HistorianCampaignMapProps {
  progress: RpgProgress;
  onOpenStage: (stageId: string) => void;
}

export default function HistorianCampaignMap({ progress, onOpenStage }: HistorianCampaignMapProps) {
  const percent = getHistorianCampaignPercent(progress);

  return (
    <main className="app-screen pb-24">
      <div className="historian-map-stage">
        <img src="/images/mapa-historia.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,224,151,0.18),transparent_28%),linear-gradient(180deg,rgba(7,12,21,0.14),rgba(7,12,21,0.92))]" />

        <header className="relative z-20 px-4 pt-6">
          <PixelPanel className="p-4" accent="#d6a15f">
            <p className="font-pixel text-[0.5rem] uppercase tracking-[0.2em] text-amber-200/80">
              Campana historica
            </p>
            <h1 className="mt-2 font-pixel text-lg text-white">Historia de Teba</h1>
            <p className="mt-2 text-xs leading-5 text-stone-200/78">
              Recorre el territorio como archivo vivo: cada etapa completa desbloquea entradas de enciclopedia.
            </p>
            <XpBar className="mt-4" value={percent} variant="retro" levelUpMessage="ARCHIVO COMPLETO" />
          </PixelPanel>
        </header>

        {historianStages.map((stage, index) => {
          const visited = progress.historianCampaign.visitedStageIds.includes(stage.id);
          const completed = progress.historianCampaign.completedStageIds.includes(stage.id);

          return (
            <motion.button
              key={stage.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12 + index * 0.04, type: 'spring', stiffness: 220 }}
              onClick={() => onOpenStage(stage.id)}
              className={`historian-node ${visited ? 'historian-node-visited' : ''} ${completed ? 'historian-node-complete' : ''}`}
              style={{ left: `${stage.mapX}%`, top: `${stage.mapY}%` }}
            >
              <span className="map-node-aura" />
              <span className="map-node-icon">
                {completed ? <CheckCircle2 size={18} aria-hidden /> : <Landmark size={18} aria-hidden />}
              </span>
              <span className="map-node-label">{stage.title}</span>
            </motion.button>
          );
        })}

      </div>
    </main>
  );
}
