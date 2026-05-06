'use client';

import { CheckCircle2, Circle, ScrollText } from 'lucide-react';
import { historianStages } from '@/lib/historian-campaign';
import { RpgProgress, RpgZone } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface QuestLogProps {
  zones: RpgZone[];
  progress: RpgProgress;
  onOpenZone: (zoneId: string) => void;
}

export default function QuestLog({ zones, progress, onOpenZone }: QuestLogProps) {
  if (progress.selectedCharacterId === 'arqueologo') {
    return (
      <main className="app-screen overflow-y-auto px-4 pb-28 pt-32">
        <header className="mb-4">
          <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
            Campana historica
          </p>
          <h1 className="mt-3 font-pixel text-xl text-white">Misiones del Historiador</h1>
          <p className="mt-3 text-sm leading-6 text-stone-200/78">
            Etapas, lugares y pistas que convierten la historia de Teba en una ruta consultable.
          </p>
        </header>

        <div className="grid gap-3">
          {historianStages.map((stage) => {
            const completed = progress.historianCampaign.completedStageIds.includes(stage.id);
            const visited = progress.historianCampaign.visitedStageIds.includes(stage.id);

            return (
              <PixelPanel key={stage.id} className="p-4" accent="#d6a15f">
                <div className="flex gap-3">
                  <span className="mt-1 text-[color:var(--panel-accent)]">
                    {completed ? <CheckCircle2 size={20} aria-hidden /> : <Circle size={20} aria-hidden />}
                  </span>
                  <div>
                    <p className="font-pixel text-[0.58rem] uppercase tracking-[0.16em] text-stone-300/75">
                      {stage.period}
                    </p>
                    <h2 className="mt-2 font-pixel text-[0.72rem] leading-6 text-white">
                      {stage.missionTitle}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-200/78">{stage.missionDescription}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--panel-accent)]">
                      <ScrollText size={14} aria-hidden />
                      {completed ? 'Completada' : visited ? 'En curso' : `${stage.xp} XP`}
                    </p>
                  </div>
                </div>
              </PixelPanel>
            );
          })}
        </div>
      </main>
    );
  }

  return (
    <main className="app-screen overflow-y-auto px-4 pb-28 pt-32">
      <header className="mb-4">
        <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
          Quest log
        </p>
        <h1 className="mt-3 font-pixel text-xl text-white">Misiones de Teba</h1>
        <p className="mt-3 text-sm leading-6 text-stone-200/78">
          Objetivos opcionales para convertir la visita en una exploracion con memoria.
        </p>
      </header>

      <div className="grid gap-3">
        {zones.map((zone) => {
          const completed = progress.completedMissionIds.includes(zone.mission.id);

          return (
            <PixelPanel key={zone.id} className="p-4" accent={zone.accent}>
              <button onClick={() => onOpenZone(zone.id)} className="w-full text-left">
                <div className="flex gap-3">
                  <span className="mt-1 text-[color:var(--panel-accent)]">
                    {completed ? <CheckCircle2 size={20} aria-hidden /> : <Circle size={20} aria-hidden />}
                  </span>
                  <div>
                    <p className="font-pixel text-[0.58rem] uppercase tracking-[0.16em] text-stone-300/75">
                      {zone.title}
                    </p>
                    <h2 className="mt-2 font-pixel text-[0.72rem] leading-6 text-white">
                      {zone.mission.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-stone-200/78">{zone.mission.description}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--panel-accent)]">
                      <ScrollText size={14} aria-hidden />
                      {completed ? 'Completada' : `${zone.mission.xp} XP`}
                    </p>
                  </div>
                </div>
              </button>
            </PixelPanel>
          );
        })}
      </div>
    </main>
  );
}
