import { describe, expect, it } from 'vitest';
import { createDefaultRpgProgress } from './rpg-progress';
import {
  acknowledgeHistorianArchive,
  completeHistorianStage,
  getHistorianCampaignPercent,
  getHistorianStage,
  isHistorianChallengeCorrect,
  visitHistorianStage,
} from './historian-campaign';

describe('historian campaign progress', () => {
  it('starts with no visited stages, completed stages, or archive entries', () => {
    const progress = createDefaultRpgProgress();

    expect(progress.historianCampaign.visitedStageIds).toEqual([]);
    expect(progress.historianCampaign.completedStageIds).toEqual([]);
    expect(progress.historianCampaign.archiveEntryIds).toEqual([]);
    expect(progress.historianCampaign.archiveIntroduced).toBe(false);
  });

  it('introduces the archive and unlocks the first codex card', () => {
    const progress = acknowledgeHistorianArchive(createDefaultRpgProgress());
    const updated = acknowledgeHistorianArchive(progress);

    expect(updated.historianCampaign.archiveIntroduced).toBe(true);
    expect(updated.historianCampaign.archiveEntryIds).toEqual(['archivo-teba']);
  });

  it('visits and completes historical stages without duplicating progress', () => {
    const visited = visitHistorianStage(createDefaultRpgProgress(), 'prehistoria');
    const completed = completeHistorianStage(
      completeHistorianStage(visited, 'prehistoria'),
      'prehistoria'
    );

    expect(completed.historianCampaign.visitedStageIds).toEqual(['prehistoria']);
    expect(completed.historianCampaign.completedStageIds).toEqual(['prehistoria']);
    expect(completed.historianCampaign.archiveEntryIds).toEqual([
      'cueva-palomas',
      'sima-silex',
      'llano-espa',
    ]);
  });

  it('calculates campaign percent from completed stages', () => {
    const progress = completeHistorianStage(createDefaultRpgProgress(), 'prehistoria');

    expect(getHistorianCampaignPercent(progress)).toBe(11);
  });

  it('finds campaign stages by id', () => {
    const stage = getHistorianStage('douglas-conquista');

    expect(stage?.title).toBe('Douglas y la conquista');
    expect(stage?.archiveEntryIds).toContain('sir-james-douglas');
  });

  it('defines Prehistoria as a playable tourist chapter', () => {
    const stage = getHistorianStage('prehistoria');

    expect(stage?.chapterTitle).toBe('Capitulo I: Antes de Teba');
    expect(stage?.clues).toHaveLength(3);
    expect(stage?.touristTip?.headline).toBe('Si estas en Teba');
    expect(stage?.challenge?.prompt).toContain('Ordena la transformacion');
    expect(stage?.rewardTitle).toBe('Sello: Primeros pasos del Guadalteba');
  });

  it('validates historical challenge answers', () => {
    expect(isHistorianChallengeCorrect('prehistoria', ['cazadores', 'silex', 'agricultura'])).toBe(true);
    expect(isHistorianChallengeCorrect('prehistoria', ['agricultura', 'silex', 'cazadores'])).toBe(false);
    expect(isHistorianChallengeCorrect('roma', ['whatever'])).toBe(false);
  });
});
