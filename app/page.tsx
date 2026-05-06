'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AudioController from '@/components/rpg/AudioController';
import BottomNav from '@/components/rpg/BottomNav';
import CharacterSelect from '@/components/rpg/CharacterSelect';
import CollectionView from '@/components/rpg/CollectionView';
import GuideProfile from '@/components/rpg/GuideProfile';
import HistorianCampaignMap from '@/components/rpg/HistorianCampaignMap';
import HistorianStageView from '@/components/rpg/HistorianStageView';
import MainMenu from '@/components/rpg/MainMenu';
import Prologue from '@/components/rpg/Prologue';
import QuestLog from '@/components/rpg/QuestLog';
import RpgHud from '@/components/rpg/RpgHud';
import SettingsPanel from '@/components/rpg/SettingsPanel';
import WorldMap from '@/components/rpg/WorldMap';
import ZoneView from '@/components/rpg/ZoneView';
import { characters, collectionItems, zones } from '@/lib/rpg-data';
import {
  completeHistorianStage,
  getHistorianStage,
  visitHistorianStage,
} from '@/lib/historian-campaign';
import {
  completeMission,
  createDefaultRpgProgress,
  loadRpgProgress,
  hasSavedGame,
  resetRpgProgress,
  saveRpgProgress,
  selectCharacter,
  equipItem,
  solvePuzzle,
  toggleEffects,
  toggleMusic,
  toggleReducedMotion,
  visitZone,
} from '@/lib/rpg-progress';
import { AppScreen, CharacterId, RpgProgress, RpgZone } from '@/lib/types';

type WebkitAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('menu');
  const [progress, setProgress] = useState<RpgProgress>(() => createDefaultRpgProgress());
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null);
  const [activeHistorianStageId, setActiveHistorianStageId] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const saved = loadRpgProgress();
    setProgress(saved);
  }, []);

  useEffect(() => {
    saveRpgProgress(progress);
  }, [progress]);

  const activeZone = useMemo(
    () => zones.find((zone) => zone.id === activeZoneId) ?? zones[0],
    [activeZoneId]
  );
  const selectedCharacter = useMemo(
    () => characters.find((character) => character.id === progress.selectedCharacterId),
    [progress.selectedCharacterId]
  );
  const activeHistorianStage = useMemo(
    () => (activeHistorianStageId ? getHistorianStage(activeHistorianStageId) : undefined),
    [activeHistorianStageId]
  );
  const showGameChrome =
    hasSavedGame(progress) &&
    !(
      ['menu', 'settings', 'character', 'prologue', 'guide', 'historian-campaign', 'historian-stage'].includes(screen) ||
      (screen === 'map' && selectedCharacter?.id === 'arqueologo')
    );
  const showGameNav = hasSavedGame(progress) && !['menu', 'settings', 'character', 'prologue'].includes(screen);
  const musicSrc =
    ['menu', 'settings'].includes(screen) || selectedCharacter?.id !== 'arqueologo'
      ? '/sound/musica-inicio.mp3'
      : '/sound/bso-bd3.mp3';

  const playEffect = useCallback(() => {
    window.__playTebaMusic?.();

    if (!progress.effectsEnabled || typeof window === 'undefined') {
      return;
    }

    const AudioCtor = window.AudioContext || (window as WebkitAudioWindow).webkitAudioContext;
    if (!AudioCtor) {
      return;
    }

    const context = audioContextRef.current ?? new AudioCtor();
    audioContextRef.current = context;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = 'square';
    oscillator.frequency.value = 740;
    gain.gain.value = 0.025;
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.055);
  }, [progress.effectsEnabled]);

  const navigate = useCallback(
    (nextScreen: AppScreen) => {
      playEffect();
      setScreen(nextScreen);
    },
    [playEffect]
  );

  const beginExplore = useCallback(() => {
    playEffect();
    setScreen(progress.selectedCharacterId ? 'prologue' : 'character');
  }, [playEffect, progress.selectedCharacterId]);

  const beginNewGame = useCallback(() => {
    playEffect();
    setProgress(resetRpgProgress());
    setActiveZoneId(null);
    setScreen('character');
  }, [playEffect]);

  const continueGame = useCallback(() => {
    playEffect();
    setScreen(progress.selectedCharacterId ? 'map' : 'character');
  }, [playEffect, progress.selectedCharacterId]);

  const chooseCharacter = useCallback(
    (characterId: CharacterId) => {
      playEffect();
      setProgress((current) => selectCharacter(current, characterId));
    },
    [playEffect]
  );

  const openZone = useCallback(
    (zoneId: string) => {
      playEffect();
      setActiveZoneId(zoneId);
      setProgress((current) => visitZone(current, zoneId));
      setScreen('zone');
    },
    [playEffect]
  );

  const finishMission = useCallback(
    (zone: RpgZone) => {
      playEffect();
      setProgress((current) =>
        completeMission(current, zone.mission.id, zone.mission.rewardItemId)
      );
    },
    [playEffect]
  );

  const finishPuzzle = useCallback(
    (zone: RpgZone) => {
      if (!zone.puzzle) {
        return;
      }

      playEffect();
      setProgress((current) =>
        solvePuzzle(current, zone.puzzle!.id, zone.puzzle!.rewardItemId)
      );
    },
    [playEffect]
  );

  const handleEquipItem = useCallback(
    (itemId: string) => {
      playEffect();
      setProgress((current) => equipItem(current, itemId));
    },
    [playEffect]
  );

  const resetProgress = useCallback(() => {
    playEffect();
    setProgress(resetRpgProgress());
    setActiveZoneId(null);
    setActiveHistorianStageId(null);
    setScreen('menu');
  }, [playEffect]);

  const openHistorianStage = useCallback(
    (stageId: string) => {
      playEffect();
      setActiveHistorianStageId(stageId);
      setProgress((current) => visitHistorianStage(current, stageId));
      setScreen('historian-stage');
    },
    [playEffect]
  );

  const finishHistorianStage = useCallback(
    (stageId: string) => {
      playEffect();
      setProgress((current) => completeHistorianStage(current, stageId));
    },
    [playEffect]
  );

  return (
    <div className="rpg-app">
      <AudioController
        enabled={progress.musicEnabled}
        src={musicSrc}
        volume={['menu', 'settings'].includes(screen) ? 0.28 : 0.18}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${screen}-${activeZoneId ?? 'none'}`}
          initial={progress.reducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={progress.reducedMotion ? { opacity: 0 } : { opacity: 0, y: -18 }}
          transition={{ duration: 0.22 }}
          className="app-route"
        >
          {screen === 'menu' && (
            <MainMenu
              hasSave={hasSavedGame(progress)}
              onNewGame={beginNewGame}
              onContinue={continueGame}
              onSettings={() => navigate('settings')}
            />
          )}

          {screen === 'character' && (
            <CharacterSelect
              characters={characters}
              selectedCharacterId={progress.selectedCharacterId}
              onSelect={chooseCharacter}
              onContinue={() => navigate('prologue')}
            />
          )}

          {screen === 'prologue' && (
            <Prologue character={selectedCharacter} onEnterMap={() => navigate('map')} />
          )}

          {screen === 'map' &&
            (selectedCharacter?.id === 'arqueologo' ? (
              <HistorianCampaignMap progress={progress} onOpenStage={openHistorianStage} />
            ) : (
              <WorldMap zones={zones} progress={progress} onOpenZone={openZone} />
            ))}

          {screen === 'zone' && (
            <ZoneView
              zone={activeZone}
              progress={progress}
              onBack={() => navigate('map')}
              onCompleteMission={finishMission}
              onSolvePuzzle={finishPuzzle}
            />
          )}

          {screen === 'quests' && <QuestLog zones={zones} progress={progress} onOpenZone={openZone} />}

          {screen === 'collection' && (
            <CollectionView items={collectionItems} progress={progress} onEquipItem={handleEquipItem} />
          )}

          {screen === 'guide' && (
            <GuideProfile
              character={selectedCharacter}
              progress={progress}
              zones={zones}
              items={collectionItems}
              onOpenHistorianCampaign={() => navigate('historian-campaign')}
            />
          )}

          {screen === 'historian-campaign' && (
            <HistorianCampaignMap progress={progress} onOpenStage={openHistorianStage} />
          )}

          {screen === 'historian-stage' && activeHistorianStage && (
            <HistorianStageView
              stage={activeHistorianStage}
              progress={progress}
              onBack={() => navigate('historian-campaign')}
              onComplete={finishHistorianStage}
            />
          )}

          {screen === 'settings' && (
            <SettingsPanel
              progress={progress}
              onToggleMusic={() => setProgress((current) => toggleMusic(current))}
              onToggleEffects={() => setProgress((current) => toggleEffects(current))}
              onToggleReducedMotion={() => setProgress((current) => toggleReducedMotion(current))}
              onReset={resetProgress}
              onBack={() => navigate('menu')}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {showGameChrome && (
        <RpgHud
          character={selectedCharacter}
          progress={progress}
          zones={zones}
          items={collectionItems}
        />
      )}

      {showGameNav && (
        <BottomNav current={screen} onNavigate={navigate} />
      )}
    </div>
  );
}
