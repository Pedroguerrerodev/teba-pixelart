# Explora Teba RPG Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the current childlike linear chapter app into a mobile-first RPG tourism guide for Teba with a main menu, character selection, free interactive map, immersive zones, missions, collection, settings, sound, and clean git/dependency setup.

**Architecture:** Use the existing Next app router, React client state, Tailwind, Framer Motion, and localStorage. Replace the current linear `chapters` shape with a zone-based domain model and focused components: shell, main menu, character select, map, zone detail, quest log, collection, and settings. Keep all content static for now so the app can ship without a backend.

**Tech Stack:** Next 15, React 19, TypeScript, Tailwind CSS, Framer Motion, 8bitcn/shadcn-inspired components, lucide-react, localStorage, Vitest for domain tests.

---

## File Structure

- Modify: `package.json` for scripts and dependencies.
- Create: `.gitignore` for build, dependency, and brainstorm artifacts.
- Create: `vitest.config.ts` for unit tests.
- Create: `lib/rpg-data.ts` for zones, characters, missions, collection rewards, and asset paths.
- Create: `lib/rpg-progress.ts` for localStorage progress helpers.
- Create: `lib/rpg-progress.test.ts` for progress behavior.
- Modify: `lib/types.ts` for RPG app types.
- Replace: `app/page.tsx` with the new mobile app shell.
- Modify: `app/globals.css` for the visual system.
- Modify: `app/layout.tsx` for metadata and encoding-safe text.
- Create: `components/rpg/MainMenu.tsx`.
- Create: `components/rpg/CharacterSelect.tsx`.
- Create: `components/rpg/WorldMap.tsx`.
- Create: `components/rpg/ZoneView.tsx`.
- Create: `components/rpg/QuestLog.tsx`.
- Create: `components/rpg/CollectionView.tsx`.
- Create: `components/rpg/SettingsPanel.tsx`.
- Create: `components/rpg/BottomNav.tsx`.
- Create: `components/rpg/PixelPanel.tsx`.
- Create: `components/rpg/AudioController.tsx`.
- Remove after replacement: old child-oriented components that are no longer imported.

## Task 1: Git and Dependency Foundation

**Files:**
- Create: `.gitignore`
- Modify: `package.json`
- Create: `vitest.config.ts`

- [ ] **Step 1: Initialize git and remote**

Run:

```powershell
git init
git remote add origin https://github.com/Pedroguerrerodev/teba-pixelart.git
git branch -M main
```

Expected: local repository initialized. If remote already exists, verify with `git remote -v`.

- [ ] **Step 2: Add dependency and generated-file ignores**

Create `.gitignore` with:

```gitignore
node_modules/
.next/
out/
dist/
coverage/
.env*
!.env.example
.vercel/
.superpowers/
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 3: Install runtime and test dependencies**

Run:

```powershell
npm install lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot @radix-ui/react-dialog
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

Expected: install completes and `package-lock.json` updates.

- [ ] **Step 4: Add scripts and Vitest config**

Add scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
```

- [ ] **Step 5: Run baseline checks**

Run:

```powershell
npm test -- --passWithNoTests
npm run build
```

Expected: tests pass with no tests or build reveals current app issues to fix during later tasks.

## Task 2: RPG Domain Model and Progress

**Files:**
- Modify: `lib/types.ts`
- Create: `lib/rpg-data.ts`
- Create: `lib/rpg-progress.ts`
- Create: `lib/rpg-progress.test.ts`

- [ ] **Step 1: Write failing progress tests**

Create `lib/rpg-progress.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { createDefaultRpgProgress, completeMission, visitZone, selectCharacter } from './rpg-progress';

describe('rpg progress', () => {
  it('starts without a selected character and with empty discovery state', () => {
    const progress = createDefaultRpgProgress();

    expect(progress.selectedCharacterId).toBeNull();
    expect(progress.visitedZoneIds).toEqual([]);
    expect(progress.completedMissionIds).toEqual([]);
    expect(progress.collectionItemIds).toEqual([]);
    expect(progress.musicEnabled).toBe(true);
    expect(progress.effectsEnabled).toBe(true);
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
      'mision-castillo'
    );
    const updated = completeMission(progress, 'mision-castillo');

    expect(updated.visitedZoneIds).toEqual(['castillo']);
    expect(updated.completedMissionIds).toEqual(['mision-castillo']);
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```powershell
npm test -- lib/rpg-progress.test.ts
```

Expected: FAIL because `rpg-progress` does not exist yet.

- [ ] **Step 3: Implement types, data, and progress helpers**

Create the types and pure helpers used by the tests. Use immutable updates and dedupe arrays.

- [ ] **Step 4: Run the test and verify GREEN**

Run:

```powershell
npm test -- lib/rpg-progress.test.ts
```

Expected: PASS.

## Task 3: Mobile RPG Shell

**Files:**
- Replace: `app/page.tsx`
- Create: `components/rpg/MainMenu.tsx`
- Create: `components/rpg/CharacterSelect.tsx`
- Create: `components/rpg/BottomNav.tsx`
- Create: `components/rpg/PixelPanel.tsx`

- [ ] **Step 1: Create the app state flow**

Use screens: `menu`, `character`, `map`, `quests`, `collection`, `settings`, `zone`.

- [ ] **Step 2: Implement Main Menu**

Use `main-menu.png` if present, otherwise existing Teba imagery. Buttons: Explore Teba, Missions, Collection, Settings.

- [ ] **Step 3: Implement Character Select**

Render Arqueologo, Senderista, and Maestro Quesero from `rpg-data`. Persist selection using `selectCharacter`.

- [ ] **Step 4: Implement bottom navigation**

Show Map, Missions, Collection, Settings after the user enters the app.

- [ ] **Step 5: Run checks**

Run:

```powershell
npm test
npm run build
```

Expected: PASS.

## Task 4: Interactive Map and Zone View

**Files:**
- Create: `components/rpg/WorldMap.tsx`
- Create: `components/rpg/ZoneView.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement WorldMap**

Use `mapa-teba.png` if present, otherwise a CSS/pixel placeholder. Render tappable zone nodes from `rpg-data`.

- [ ] **Step 2: Implement ZoneView**

Render scene image, guide text, hotspots, mission objective, completion action, and back-to-map action.

- [ ] **Step 3: Persist visit and mission completion**

Call `visitZone` when a zone opens and `completeMission` when the mission action is pressed.

- [ ] **Step 4: Run checks**

Run:

```powershell
npm test
npm run build
```

Expected: PASS.

## Task 5: Quest Log, Collection, Settings, and Sound

**Files:**
- Create: `components/rpg/QuestLog.tsx`
- Create: `components/rpg/CollectionView.tsx`
- Create: `components/rpg/SettingsPanel.tsx`
- Create: `components/rpg/AudioController.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Implement QuestLog**

Show all missions and their completed state.

- [ ] **Step 2: Implement CollectionView**

Show unlocked and locked collection items based on completed missions.

- [ ] **Step 3: Implement SettingsPanel**

Allow music, effects, reduced motion, and reset progress.

- [ ] **Step 4: Implement AudioController**

Use existing `/sound/bso.mp3` for music and lightweight Web Audio oscillator tones for UI effects when enabled.

- [ ] **Step 5: Run checks**

Run:

```powershell
npm test
npm run build
```

Expected: PASS.

## Task 6: Cleanup, Verification, and Push

**Files:**
- Delete: old unused components after confirming no imports.
- Delete: old unused `lib/chapters.ts` if no longer imported.
- Modify: docs if needed.

- [ ] **Step 1: Remove unused old app files**

Remove child-oriented components that are no longer imported.

- [ ] **Step 2: Verify no imports reference deleted files**

Run:

```powershell
npm run build
```

Expected: PASS.

- [ ] **Step 3: Commit and push**

Run:

```powershell
git add .
git commit -m "feat: rebuild Explora Teba as RPG tourism guide"
git push -u origin main
```

Expected: commit succeeds. Push may require GitHub authentication.

## Self-Review

Spec coverage:

- Mobile-first native app feel: covered by Tasks 3-5.
- Main menu: Task 3.
- Character selection: Task 3.
- Free map: Task 4.
- Immersive zones: Task 4.
- Quest log: Task 5.
- Collection replacing diploma: Task 5.
- Sound/settings: Task 5.
- Cleanup and git remote: Tasks 1 and 6.

No intentional scope gaps. Real route navigation, agenda, multilingual content, and PWA install support remain future expansion from the design spec, not this MVP rebuild.
