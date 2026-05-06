import { CharacterId, RpgProgress } from './types';

const STORAGE_KEY = 'explora-teba-rpg-progress';

function unique(values: string[], next: string): string[] {
  return values.includes(next) ? values : [...values, next];
}

export function createDefaultRpgProgress(): RpgProgress {
  const now = Date.now();

  return {
    selectedCharacterId: null,
    visitedZoneIds: [],
    completedMissionIds: [],
    collectionItemIds: [],
    musicEnabled: true,
    effectsEnabled: true,
    reducedMotion: false,
    startedAt: now,
    updatedAt: now,
  };
}

export function selectCharacter(progress: RpgProgress, characterId: CharacterId): RpgProgress {
  return {
    ...progress,
    selectedCharacterId: characterId,
    updatedAt: Date.now(),
  };
}

export function visitZone(progress: RpgProgress, zoneId: string): RpgProgress {
  return {
    ...progress,
    visitedZoneIds: unique(progress.visitedZoneIds, zoneId),
    updatedAt: Date.now(),
  };
}

export function completeMission(
  progress: RpgProgress,
  missionId: string,
  rewardItemId?: string
): RpgProgress {
  return {
    ...progress,
    completedMissionIds: unique(progress.completedMissionIds, missionId),
    collectionItemIds: rewardItemId
      ? unique(progress.collectionItemIds, rewardItemId)
      : progress.collectionItemIds,
    updatedAt: Date.now(),
  };
}

export function toggleMusic(progress: RpgProgress): RpgProgress {
  return {
    ...progress,
    musicEnabled: !progress.musicEnabled,
    updatedAt: Date.now(),
  };
}

export function toggleEffects(progress: RpgProgress): RpgProgress {
  return {
    ...progress,
    effectsEnabled: !progress.effectsEnabled,
    updatedAt: Date.now(),
  };
}

export function toggleReducedMotion(progress: RpgProgress): RpgProgress {
  return {
    ...progress,
    reducedMotion: !progress.reducedMotion,
    updatedAt: Date.now(),
  };
}

export function loadRpgProgress(): RpgProgress {
  if (typeof window === 'undefined') {
    return createDefaultRpgProgress();
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return createDefaultRpgProgress();
    }

    return {
      ...createDefaultRpgProgress(),
      ...JSON.parse(stored),
    };
  } catch {
    return createDefaultRpgProgress();
  }
}

export function saveRpgProgress(progress: RpgProgress): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetRpgProgress(): RpgProgress {
  const progress = createDefaultRpgProgress();

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return progress;
}

export function getExplorationPercent(progress: RpgProgress, totalMissions: number): number {
  if (totalMissions <= 0) {
    return 0;
  }

  return Math.round((progress.completedMissionIds.length / totalMissions) * 100);
}
