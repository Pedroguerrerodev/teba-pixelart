'use client';

import { ArrowLeft, CheckCircle2, MapPin, ScrollText } from 'lucide-react';
import { HistorianStage, historianArchiveEntries } from '@/lib/historian-campaign';
import { RpgProgress } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface HistorianStageViewProps {
  stage: HistorianStage;
  progress: RpgProgress;
  onBack: () => void;
  onComplete: (stageId: string) => void;
}

export default function HistorianStageView({
  stage,
  progress,
  onBack,
  onComplete,
}: HistorianStageViewProps) {
  const completed = progress.historianCampaign.completedStageIds.includes(stage.id);
  const entries = historianArchiveEntries.filter((entry) => stage.archiveEntryIds.includes(entry.id));

  return (
    <main className="app-screen overflow-y-auto pb-28">
      <section className="historian-stage-hero">
        <img src="/images/mapa-historia.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/28 via-black/42 to-[#070c15]" />
        <button onClick={onBack} className="icon-button absolute left-4 top-32 z-20" aria-label="Volver a la campana">
          <ArrowLeft size={20} aria-hidden />
        </button>
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          <p className="font-pixel text-[0.52rem] uppercase tracking-[0.22em] text-amber-200/88">
            {stage.period}
          </p>
          <h1 className="mt-2 font-pixel text-2xl leading-9 text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.75)]">
            {stage.title}
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-amber-100/82">{stage.summary}</p>
        </div>
      </section>

      <section className="grid gap-4 px-4 pt-4">
        <PixelPanel className="p-4" accent="#d6a15f">
          <div className="flex gap-3">
            <ScrollText className="mt-1 shrink-0 text-[color:var(--panel-accent)]" size={18} aria-hidden />
            <div>
              <h2 className="font-pixel text-[0.72rem] leading-6 text-white">Por que importa</h2>
              <p className="mt-2 text-sm leading-6 text-stone-200/82">{stage.whyItMatters}</p>
            </div>
          </div>
        </PixelPanel>

        <PixelPanel className="p-4" accent="#d6a15f">
          <h2 className="font-pixel text-[0.72rem] leading-6 text-white">Lugares relacionados</h2>
          <div className="mt-3 grid gap-2">
            {stage.places.map((place) => (
              <p key={place} className="inline-flex items-center gap-2 text-sm font-bold text-stone-200/82">
                <MapPin size={15} aria-hidden />
                {place}
              </p>
            ))}
          </div>
        </PixelPanel>

        <PixelPanel className="p-4" accent="#d6a15f">
          <h2 className="font-pixel text-[0.72rem] leading-6 text-white">{stage.missionTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-200/78">{stage.missionDescription}</p>
          <button
            onClick={() => onComplete(stage.id)}
            disabled={completed}
            className="pixel-action pixel-action-primary mt-4 disabled:opacity-60"
            style={{ '--action-accent': '#d6a15f' } as React.CSSProperties}
          >
            <CheckCircle2 size={18} aria-hidden />
            <span>{completed ? 'Etapa completada' : `Completar +${stage.xp} XP`}</span>
          </button>
        </PixelPanel>

        {entries.length > 0 && (
          <PixelPanel className="p-4" accent="#d6a15f">
            <h2 className="font-pixel text-[0.72rem] leading-6 text-white">Entradas de archivo</h2>
            <div className="mt-3 grid gap-3">
              {entries.map((entry) => {
                const unlocked = progress.historianCampaign.archiveEntryIds.includes(entry.id);

                return (
                  <div key={entry.id} className={unlocked ? '' : 'opacity-55'}>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-200/75">
                      {entry.category}
                    </p>
                    <h3 className="mt-1 font-pixel text-[0.62rem] leading-5 text-white">
                      {unlocked ? entry.title : 'Entrada bloqueada'}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-200/78">
                      {unlocked ? entry.summary : 'Completa esta etapa para anadirla al archivo.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </PixelPanel>
        )}
      </section>
    </main>
  );
}
