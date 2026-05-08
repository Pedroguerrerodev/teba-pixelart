'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, MapPin, ScrollText, Sparkles } from 'lucide-react';
import {
  HistorianStage,
  historianArchiveEntries,
  isHistorianChallengeCorrect,
} from '@/lib/historian-campaign';
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
  const [selectedChallengeOptions, setSelectedChallengeOptions] = useState<string[]>([]);
  const [challengeAttempted, setChallengeAttempted] = useState(false);
  const challengeCorrect = isHistorianChallengeCorrect(stage.id, selectedChallengeOptions);
  const canComplete = completed || !stage.challenge || challengeCorrect;

  const chooseChallengeOption = (optionId: string) => {
    if (!stage.challenge || selectedChallengeOptions.includes(optionId)) {
      return;
    }

    setChallengeAttempted(false);
    setSelectedChallengeOptions((current) => current.length >= stage.challenge!.answer.length ? current : [...current, optionId]);
  };

  const resetChallenge = () => {
    setChallengeAttempted(false);
    setSelectedChallengeOptions([]);
  };

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
            {stage.chapterTitle ?? stage.title}
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-6 text-amber-100/82">{stage.summary}</p>
        </div>
      </section>

      <section className="grid gap-4 px-4 pt-4">
        {stage.narrative && (
          <PixelPanel className="historian-narrative-card p-4" accent="#d6a15f">
            <p className="text-sm italic leading-7 text-stone-100/84">&ldquo;{stage.narrative}&rdquo;</p>
          </PixelPanel>
        )}

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

        {stage.clues && (
          <PixelPanel className="p-4" accent="#d6a15f">
            <h2 className="font-pixel text-[0.72rem] leading-6 text-white">Pistas del Historiador</h2>
            <div className="mt-3 grid gap-3">
              {stage.clues.map((clue, index) => (
                <div key={clue.id} className="historian-clue-card">
                  <span className="historian-clue-index">{index + 1}</span>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-200/75">
                      {clue.eyebrow}
                    </p>
                    <h3 className="mt-1 font-pixel text-[0.64rem] leading-5 text-white">{clue.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-200/78">{clue.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </PixelPanel>
        )}

        {stage.challenge && (
          <PixelPanel className="p-4" accent="#d6a15f">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 shrink-0 text-[color:var(--panel-accent)]" size={18} aria-hidden />
              <div className="min-w-0 flex-1">
                <h2 className="font-pixel text-[0.72rem] leading-6 text-white">{stage.challenge.prompt}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-200/78">{stage.challenge.helper}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {stage.challenge.options.map((option) => {
                const order = selectedChallengeOptions.indexOf(option.id);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => chooseChallengeOption(option.id)}
                    disabled={order !== -1 || completed}
                    className={`historian-challenge-option ${order !== -1 ? 'historian-challenge-option-selected' : ''}`}
                  >
                    <span>{order === -1 ? '?' : order + 1}</span>
                    <strong>{option.label}</strong>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button type="button" onClick={resetChallenge} className="historian-secondary-action">
                Reiniciar
              </button>
              <button
                type="button"
                onClick={() => setChallengeAttempted(true)}
                disabled={selectedChallengeOptions.length !== stage.challenge.answer.length}
                className="historian-secondary-action historian-secondary-action-primary disabled:opacity-45"
              >
                Comprobar
              </button>
            </div>

            {challengeAttempted && (
              <p className={`mt-3 text-sm font-bold leading-6 ${challengeCorrect ? 'text-emerald-200' : 'text-red-100'}`}>
                {challengeCorrect
                  ? stage.challenge.successText
                  : 'Todavia no encaja. Revisa el orden de las pistas y vuelve a intentarlo.'}
              </p>
            )}
          </PixelPanel>
        )}

        {stage.touristTip && (
          <PixelPanel className="p-4" accent="#78a05a">
            <h2 className="font-pixel text-[0.72rem] leading-6 text-white">{stage.touristTip.headline}</h2>
            <div className="mt-3 grid gap-2">
              {stage.touristTip.items.map((item) => (
                <p key={item} className="flex gap-2 text-sm leading-6 text-stone-200/82">
                  <span className="text-[color:var(--panel-accent)]">◆</span>
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <p className="mt-3 border border-white/10 bg-white/5 p-3 text-sm leading-6 text-stone-100/82">
              {stage.touristTip.localAdvice}
            </p>
          </PixelPanel>
        )}

        <PixelPanel className="p-4" accent="#d6a15f">
          <h2 className="font-pixel text-[0.72rem] leading-6 text-white">{stage.missionTitle}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-200/78">{stage.missionDescription}</p>
          {stage.rewardTitle && (
            <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-amber-200/80">
              Recompensa: {stage.rewardTitle}
            </p>
          )}
          <button
            onClick={() => onComplete(stage.id)}
            disabled={completed || !canComplete}
            className="pixel-action pixel-action-primary mt-4 disabled:opacity-60"
            style={{ '--action-accent': '#d6a15f' } as React.CSSProperties}
          >
            <CheckCircle2 size={18} aria-hidden />
            <span>
              {completed
                ? 'Etapa completada'
                : canComplete
                  ? `Completar +${stage.xp} XP`
                  : 'Resuelve el reto'}
            </span>
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
