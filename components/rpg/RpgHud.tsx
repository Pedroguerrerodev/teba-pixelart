'use client';

import { Backpack, Star } from 'lucide-react';
import XpBar from '@/components/ui/8bit/xp-bar';
import { getPlayerLevel, getTotalXp } from '@/lib/rpg-progress';
import { CollectionItem, RpgCharacter, RpgProgress, RpgZone } from '@/lib/types';

interface RpgHudProps {
  character: RpgCharacter | undefined;
  progress: RpgProgress;
  zones: RpgZone[];
  items: CollectionItem[];
}

export default function RpgHud({ character, progress, zones, items }: RpgHudProps) {
  const xp = getTotalXp(progress, zones);
  const level = getPlayerLevel(xp);
  const levelFloor = level === 1 ? 0 : (level - 1) * 40;
  const nextFloor = level * 40;
  const levelProgress = Math.min(100, Math.max(0, ((xp - levelFloor) / (nextFloor - levelFloor)) * 100));
  const equipped = items.find((item) => item.id === progress.equippedItemId);

  return (
    <aside className="rpg-hud" aria-label="Estado del explorador">
      <div className="flex items-center gap-3">
        <div className="level-orb">
          <span>{level}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[0.5rem] uppercase tracking-[0.16em] text-amber-200/85">
            {character?.name ?? 'Explorador'}
          </p>
          <XpBar className="mt-2" value={levelProgress} variant="retro" levelUpMessage="NIVEL +" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.12em] text-stone-200/75">
        <span className="inline-flex items-center gap-1">
          <Star size={14} aria-hidden />
          {xp} XP
        </span>
        <span className="inline-flex items-center justify-end gap-1">
          <Backpack size={14} aria-hidden />
          {equipped?.title ?? 'Sin reliquia'}
        </span>
      </div>
    </aside>
  );
}
