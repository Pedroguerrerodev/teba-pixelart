import { CharacterId, RpgProgress, RpgZone } from './types';

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
    solvedPuzzleIds: [],
    collectionItemIds: [],
    historianCampaign: {
      archiveIntroduced: false,
      visitedStageIds: [],
      completedStageIds: [],
      archiveEntryIds: [],
    },
    equippedItemId: null,
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

export function solvePuzzle(
  progress: RpgProgress,
  puzzleId: string,
  rewardItemId?: string
): RpgProgress {
  return {
    ...progress,
    solvedPuzzleIds: unique(progress.solvedPuzzleIds, puzzleId),
    collectionItemIds: rewardItemId
      ? unique(progress.collectionItemIds, rewardItemId)
      : progress.collectionItemIds,
    updatedAt: Date.now(),
  };
}

export function equipItem(progress: RpgProgress, itemId: string): RpgProgress {
  if (!progress.collectionItemIds.includes(itemId)) {
    return progress;
  }

  return {
    ...progress,
    equippedItemId: itemId,
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

    const defaults = createDefaultRpgProgress();
    const parsed = JSON.parse(stored) as Partial<RpgProgress>;

    return {
      ...defaults,
      ...parsed,
      historianCampaign: {
        ...defaults.historianCampaign,
        ...parsed.historianCampaign,
      },
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

export function hasSavedGame(progress: RpgProgress): boolean {
  return Boolean(
    progress.selectedCharacterId ||
      progress.visitedZoneIds.length ||
      progress.completedMissionIds.length ||
      progress.solvedPuzzleIds.length ||
      progress.collectionItemIds.length
  );
}

export function getExplorationPercent(progress: RpgProgress, totalMissions: number): number {
  if (totalMissions <= 0) {
    return 0;
  }

  return Math.round((progress.completedMissionIds.length / totalMissions) * 100);
}

export function getTotalXp(progress: RpgProgress, zones: RpgZone[]): number {
  return zones.reduce((sum, zone) => {
    const missionXp = progress.completedMissionIds.includes(zone.mission.id) ? zone.mission.xp : 0;
    const puzzleXp =
      zone.puzzle && progress.solvedPuzzleIds.includes(zone.puzzle.id) ? zone.puzzle.xp : 0;

    return sum + missionXp + puzzleXp;
  }, 0);
}

export function getPlayerLevel(totalXp: number): number {
  if (totalXp < 30) {
    return 1;
  }

  return Math.min(9, Math.floor(totalXp / 40) + 1);
}
