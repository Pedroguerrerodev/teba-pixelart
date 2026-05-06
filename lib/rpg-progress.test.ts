import { describe, expect, it } from 'vitest';
import {
  completeMission,
  createDefaultRpgProgress,
  selectCharacter,
  toggleEffects,
  toggleMusic,
  visitZone,
} from './rpg-progress';

describe('rpg progress', () => {
  it('starts without a selected character and with empty discovery state', () => {
    const progress = createDefaultRpgProgress();

    expect(progress.selectedCharacterId).toBeNull();
    expect(progress.visitedZoneIds).toEqual([]);
    expect(progress.completedMissionIds).toEqual([]);
    expect(progress.collectionItemIds).toEqual([]);
    expect(progress.musicEnabled).toBe(true);
    expect(progress.effectsEnabled).toBe(true);
    expect(progress.reducedMotion).toBe(false);
  });

  it('selects a character without losing existing progress', () => {
    const progress = visitZone(createDefaultRpgProgress(), 'castillo');
    const updated = selectCharacter(progress, 'arqueologo');

    expect(updated.selectedCharacterId).toBe('arqueologo');
    expect(updated.visitedZoneIds).toEqual(['castillo']);
  });

  it('deduplicates visited zones and completed missions', () => {
    const progress = completeMission(
      visitZone(visitZone(createDefaultRpgProgress(), 'castillo'), 'castillo'),
      'mision-castillo',
      'reliquia-castillo'
    );
    const updated = completeMission(progress, 'mision-castillo', 'reliquia-castillo');

    expect(updated.visitedZoneIds).toEqual(['castillo']);
    expect(updated.completedMissionIds).toEqual(['mision-castillo']);
    expect(updated.collectionItemIds).toEqual(['reliquia-castillo']);
  });

  it('toggles music and effects independently', () => {
    const progress = createDefaultRpgProgress();

    expect(toggleMusic(progress).musicEnabled).toBe(false);
    expect(toggleEffects(progress).effectsEnabled).toBe(false);
  });
});
