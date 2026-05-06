import { describe, expect, it } from 'vitest';
import { createDefaultRpgProgress } from './rpg-progress';
import {
  completeHistorianStage,
  getHistorianCampaignPercent,
  getHistorianStage,
  visitHistorianStage,
} from './historian-campaign';

describe('historian campaign progress', () => {
  it('starts with no visited stages, completed stages, or archive entries', () => {
    const progress = createDefaultRpgProgress();

    expect(progress.historianCampaign.visitedStageIds).toEqual([]);
    expect(progress.historianCampaign.completedStageIds).toEqual([]);
    expect(progress.historianCampaign.archiveEntryIds).toEqual([]);
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
});
