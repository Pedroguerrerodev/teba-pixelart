'use client';

import { Backpack, BookOpen, MapPinned, Star, Trophy } from 'lucide-react';
import XpBar from '@/components/ui/8bit/xp-bar';
import {
  getExplorationPercent,
  getPlayerLevel,
  getTotalXp,
} from '@/lib/rpg-progress';
import { CollectionItem, RpgCharacter, RpgProgress, RpgZone } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface GuideProfileProps {
  character: RpgCharacter | undefined;
  progress: RpgProgress;
  zones: RpgZone[];
  items: CollectionItem[];
  onOpenHistorianCampaign: () => void;
}

export default function GuideProfile({
  character,
  progress,
  zones,
  items,
  onOpenHistorianCampaign,
}: GuideProfileProps) {
  const xp = getTotalXp(progress, zones);
  const level = getPlayerLevel(xp);
  const levelFloor = level === 1 ? 0 : (level - 1) * 40;
  const nextFloor = level * 40;
  const levelProgress = Math.min(100, Math.max(0, ((xp - levelFloor) / (nextFloor - levelFloor)) * 100));
  const explorationPercent = getExplorationPercent(progress, zones.length);
  const equipped = items.find((item) => item.id === progress.equippedItemId);
  const completedMissions = progress.completedMissionIds.length;
  const unlockedItems = progress.collectionItemIds.length;

  return (
    <main className="app-screen overflow-y-auto px-4 pb-28 pt-32">
      <header className="mb-4">
        <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
          Guia
        </p>
        <h1 className="mt-3 font-pixel text-xl text-white">Tu personaje</h1>
      </header>

      <section className="grid gap-4">
        <PixelPanel className="guide-profile-card p-4" accent={character?.accent}>
          <div className="guide-profile-portrait">
            <img
              src={character?.portrait ?? '/images/mascota-estrella.png'}
              alt=""
              onError={(event) => {
                event.currentTarget.src = '/images/mascota-estrella.png';
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="font-pixel text-[0.58rem] uppercase tracking-[0.16em] text-[color:var(--panel-accent)]">
              {character?.title ?? 'Explorador de Teba'}
            </p>
            <h2 className="mt-3 font-pixel text-lg leading-7 text-white">
              {character?.name ?? 'Explorador'}
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-200/80">{character?.focus}</p>
          </div>
        </PixelPanel>

        {character?.id === 'arqueologo' && (
          <PixelPanel className="p-4" accent={character.accent}>
            <button onClick={onOpenHistorianCampaign} className="w-full text-left">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center border-2 border-black bg-[color:var(--panel-accent)] text-black shadow-[3px_3px_0_#000]">
                  <BookOpen size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-pixel text-[0.72rem] leading-6 text-white">Campana historica</p>
                  <p className="mt-2 text-sm leading-6 text-stone-200/78">
                    Explora la historia de Teba por etapas y convierte cada hallazgo en archivo.
                  </p>
                </div>
              </div>
            </button>
          </PixelPanel>
        )}

        <PixelPanel className="p-4" accent={character?.accent}>
          <div className="flex items-center gap-3">
            <div className="level-orb">
              <span>{level}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-pixel text-[0.56rem] uppercase tracking-[0.16em] text-white">
                Nivel {level}
              </p>
              <XpBar className="mt-3" value={levelProgress} variant="retro" levelUpMessage="NIVEL +" />
            </div>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-stone-200/72">
            {xp} XP acumulados
          </p>
        </PixelPanel>

        <div className="grid grid-cols-2 gap-3">
          <PixelPanel className="guide-stat-card p-4" accent={character?.accent}>
            <MapPinned size={19} aria-hidden />
            <strong>{explorationPercent}%</strong>
            <span>Mapa</span>
          </PixelPanel>
          <PixelPanel className="guide-stat-card p-4" accent={character?.accent}>
            <Trophy size={19} aria-hidden />
            <strong>{completedMissions}/{zones.length}</strong>
            <span>Misiones</span>
          </PixelPanel>
          <PixelPanel className="guide-stat-card p-4" accent={character?.accent}>
            <Star size={19} aria-hidden />
            <strong>{unlockedItems}</strong>
            <span>Recuerdos</span>
          </PixelPanel>
          <PixelPanel className="guide-stat-card p-4" accent={character?.accent}>
            <Backpack size={19} aria-hidden />
            <strong>{equipped ? 'ON' : '-'}</strong>
            <span>{equipped?.title ?? 'Sin reliquia'}</span>
          </PixelPanel>
        </div>

        {character?.quote && (
          <PixelPanel className="p-4" accent={character.accent}>
            <p className="text-sm italic leading-6 text-stone-100/82">&ldquo;{character.quote}&rdquo;</p>
          </PixelPanel>
        )}
      </section>
    </main>
  );
}
