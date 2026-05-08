'use client';

import { Archive, CheckCircle2, Landmark, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';
import { getHistorianCampaignPercent, historianStages } from '@/lib/historian-campaign';
import { RpgProgress } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface HistorianCampaignMapProps {
  progress: RpgProgress;
  onOpenStage: (stageId: string) => void;
  onOpenArchive?: () => void;
}

export default function HistorianCampaignMap({
  progress,
  onOpenStage,
  onOpenArchive,
}: HistorianCampaignMapProps) {
  const percent = getHistorianCampaignPercent(progress);
  const archiveIntroduced = progress.historianCampaign.archiveIntroduced;

  return (
    <main className="app-screen pb-24">
      <div className="historian-map-stage">
        <motion.img
          src="/images/mapa-historia.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          initial={archiveIntroduced ? false : { scale: 1.16, opacity: 0.35 }}
          animate={{ scale: 1.03, opacity: 1 }}
          transition={{ duration: archiveIntroduced ? 0 : 5.5, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,224,151,0.18),transparent_28%),linear-gradient(180deg,rgba(7,12,21,0.14),rgba(7,12,21,0.92))]" />

        {archiveIntroduced && (
          <header className="relative z-20 px-4 pt-6">
            <PixelPanel className="historian-map-progress p-3" accent="#d6a15f">
              <span>Historia de Teba</span>
              <strong>{percent}%</strong>
            </PixelPanel>
          </header>
        )}

        {historianStages.map((stage, index) => {
          const visited = progress.historianCampaign.visitedStageIds.includes(stage.id);
          const completed = progress.historianCampaign.completedStageIds.includes(stage.id);
          const isArchiveStage = stage.id === 'archivo-vivo';
          const locked = !archiveIntroduced && !isArchiveStage;
          const enabled = archiveIntroduced || isArchiveStage;

          return (
            <motion.button
              key={stage.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: archiveIntroduced ? 0.12 + index * 0.04 : 0.55 + index * 0.22,
                type: 'spring',
                stiffness: archiveIntroduced ? 220 : 140,
              }}
              onClick={() => {
                if (!enabled) {
                  return;
                }

                if (!archiveIntroduced && isArchiveStage) {
                  onOpenArchive?.();
                  return;
                }

                onOpenStage(stage.id);
              }}
              disabled={!enabled}
              className={`historian-node ${visited ? 'historian-node-visited' : ''} ${completed ? 'historian-node-complete' : ''} ${locked ? 'historian-node-locked' : ''} ${!archiveIntroduced && isArchiveStage ? 'historian-node-archive' : ''}`}
              style={{ left: `${stage.mapX}%`, top: `${stage.mapY}%` }}
            >
              <span className="map-node-aura" />
              <span className="map-node-icon">
                {locked ? (
                  <LockKeyhole size={18} aria-hidden />
                ) : completed ? (
                  <CheckCircle2 size={18} aria-hidden />
                ) : isArchiveStage ? (
                  <Archive size={18} aria-hidden />
                ) : (
                  <Landmark size={18} aria-hidden />
                )}
              </span>
              <span className="map-node-label">
                {!archiveIntroduced && isArchiveStage ? 'Archivo' : stage.title}
              </span>
            </motion.button>
          );
        })}

      </div>
    </main>
  );
}
