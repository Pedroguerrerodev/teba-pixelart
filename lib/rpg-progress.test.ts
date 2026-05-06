import { describe, expect, it } from 'vitest';
import {
  completeMission,
  createDefaultRpgProgress,
  equipItem,
  getPlayerLevel,
  getTotalXp,
  hasSavedGame,
  selectCharacter,
  solvePuzzle,
  toggleEffects,
  toggleMusic,
  visitZone,
} from './rpg-progress';
import { zones } from './rpg-data';

describe('rpg progress', () => {
  it('starts without a selected character and with empty discovery state', () => {
    const progress = createDefaultRpgProgress();

    expect(progress.selectedCharacterId).toBeNull();
    expect(progress.visitedZoneIds).toEqual([]);
    expect(progress.completedMissionIds).toEqual([]);
    expect(progress.collectionItemIds).toEqual([]);
    expect(progress.solvedPuzzleIds).toEqual([]);
    expect(progress.equippedItemId).toBeNull();
    expect(progress.musicEnabled).toBe(true);
    expect(progress.effectsEnabled).toBe(true);
    expect(progress.reducedMotion).toBe(false);
  });

  it('detects a saved game only when meaningful progress exists', () => {
    expect(hasSavedGame(createDefaultRpgProgress())).toBe(false);
    expect(hasSavedGame(selectCharacter(createDefaultRpgProgress(), 'senderista'))).toBe(true);
    expect(hasSavedGame(visitZone(createDefaultRpgProgress(), 'castillo'))).toBe(true);
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

  it('solves puzzles once and unlocks their inventory reward', () => {
    const solved = solvePuzzle(createDefaultRpgProgress(), 'puzzle-corazon', 'fragmento-corazon');
    const updated = solvePuzzle(solved, 'puzzle-corazon', 'fragmento-corazon');

    expect(updated.solvedPuzzleIds).toEqual(['puzzle-corazon']);
    expect(updated.collectionItemIds).toEqual(['fragmento-corazon']);
  });

  it('equips only unlocked inventory items', () => {
    const progress = solvePuzzle(createDefaultRpgProgress(), 'puzzle-corazon', 'fragmento-corazon');
    const equipped = equipItem(progress, 'fragmento-corazon');

    expect(equipped.equippedItemId).toBe('fragmento-corazon');
    expect(equipItem(equipped, 'objeto-bloqueado').equippedItemId).toBe('fragmento-corazon');
  });

  it('calculates XP and level from completed missions and solved puzzles', () => {
    const progress = solvePuzzle(
      completeMission(createDefaultRpgProgress(), 'mision-castillo', 'sello-castillo'),
      'puzzle-corazon',
      'fragmento-corazon'
    );

    expect(getTotalXp(progress, zones)).toBe(50);
    expect(getPlayerLevel(0)).toBe(1);
    expect(getPlayerLevel(50)).toBe(2);
    expect(getPlayerLevel(130)).toBe(4);
  });
});
