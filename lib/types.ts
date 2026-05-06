export type AppScreen =
  | 'menu'
  | 'character'
  | 'prologue'
  | 'map'
  | 'zone'
  | 'quests'
  | 'collection'
  | 'guide'
  | 'historian-campaign'
  | 'historian-stage'
  | 'settings';

export type CharacterId = 'arqueologo' | 'senderista' | 'quesero';

export type ZoneCategory = 'heritage' | 'nature' | 'food' | 'festival' | 'village';

export interface RpgCharacter {
  id: CharacterId;
  name: string;
  title: string;
  portrait: string;
  sprite?: string;
  focus: string;
  quote: string;
  accent: string;
}

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  content: string;
  icon: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardItemId: string;
  xp: number;
}

export interface Puzzle {
  id: string;
  title: string;
  prompt: string;
  clue: string;
  runes: string[];
  answer: string[];
  rewardItemId: string;
  xp: number;
  solvedText: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  zoneId: string;
  kind: 'seal' | 'relic' | 'tool';
}

export interface RpgZone {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ZoneCategory;
  mapX: number;
  mapY: number;
  sceneImage: string;
  fallbackImage: string;
  nodeIcon: string;
  accent: string;
  summary: string;
  narrative: string;
  guide: string;
  visitInfo: {
    whatToSee: string[];
    localTip: string;
    visitorUse: string;
  };
  hotspots: Hotspot[];
  mission: Mission;
  puzzle?: Puzzle;
}

export interface RpgProgress {
  selectedCharacterId: CharacterId | null;
  visitedZoneIds: string[];
  completedMissionIds: string[];
  solvedPuzzleIds: string[];
  collectionItemIds: string[];
  historianCampaign: {
    visitedStageIds: string[];
    completedStageIds: string[];
    archiveEntryIds: string[];
  };
  equippedItemId: string | null;
  musicEnabled: boolean;
  effectsEnabled: boolean;
  reducedMotion: boolean;
  startedAt: number;
  updatedAt: number;
}
