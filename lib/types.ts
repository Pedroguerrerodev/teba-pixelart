export type AppScreen = 'menu' | 'character' | 'map' | 'zone' | 'quests' | 'collection' | 'settings';

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

export interface CollectionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  zoneId: string;
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
  guide: string;
  hotspots: Hotspot[];
  mission: Mission;
}

export interface RpgProgress {
  selectedCharacterId: CharacterId | null;
  visitedZoneIds: string[];
  completedMissionIds: string[];
  collectionItemIds: string[];
  musicEnabled: boolean;
  effectsEnabled: boolean;
  reducedMotion: boolean;
  startedAt: number;
  updatedAt: number;
}
