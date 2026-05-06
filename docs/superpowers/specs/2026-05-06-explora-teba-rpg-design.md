# Explora Teba RPG - Design Spec

## Vision

Explora Teba will become a mobile-first immersive web app that feels like a native RPG guide for Teba. It will keep the pixel art identity, but move away from a childish educational tone. The product should serve visitors and residents equally: a useful cultural and tourism guide wrapped in a magical, classic RPG atmosphere inspired by Final Fantasy, tabletop fantasy adventures, the Castillo de la Estrella, and the Douglas story.

The app should feel like opening a small magical travel companion on your phone. It should provide real local value: what to see, what each place means, what stories are attached to it, what products and traditions matter, and why Teba is worth exploring.

## Audience

The app is for both:

- Visitors who want an attractive, practical, memorable way to discover Teba.
- Residents who want to rediscover local history, traditions, nature, food, and identity through a polished digital experience.

The tone should be evocative, elegant, and accessible. It can be playful, but not childish.

## Core Direction

The approved direction is a hybrid:

- Base: free magical pixel art map.
- Utility: real tourism guide content.
- Narrative layer: light RPG atmosphere around Douglas, the Castillo de la Estrella, local memory, and discovery.
- Gameplay layer: optional missions, discoveries, progress, collection, and character identity.

The user is not forced through a linear story. They explore Teba freely.

## App Structure

### Main Menu

The first screen should use an 8-bit RPG main menu style, preferably using 8bitcn Main Menu patterns. It should show a high-impact pixel art background, ideally the Castillo de la Estrella at dusk or night.

Primary options:

- Explore Teba
- Missions
- Collection
- Settings

The app should not start by asking for the user's name. Entry should feel quick and adult.

### Character Selection

After starting, the user chooses one of three RPG-style exploration identities. This selection gives personality to the experience, but should not lock content.

Characters:

- El Arqueologo: focused on prehistory, archaeological sites, Iberian/Roman/Andalusian heritage, and the Castillo de la Estrella.
- La Senderista: focused on sierras, the Guadalteba river, the reservoir, viewpoints, cereal fields, and olive groves.
- El Maestro Quesero: focused on gastronomy, the cheese fair, olive oil, cured meats, local recipes, festivals, and village life.

The selected character appears in dialogue, the quest log, and collection/profile areas.

### Interactive Map

The main app screen is a vertical mobile-first pixel art territory map of Teba. It should feel magical and explorable, like an RPG world map. The map contains tappable nodes.

Initial nodes:

- Castillo de la Estrella
- Historia antigua
- Pueblo blanco
- Naturaleza y Guadalteba
- Gastronomia
- Fiestas y Douglas Days
- Museos y patrimonio

Each node shows state: available, visited, completed, or highlighted.

### Immersive Zone

Tapping a node opens a zone screen. Each zone should include:

- Full-screen or near full-screen pixel art scene.
- Hotspots with concise, useful content.
- Optional ambient sound.
- A small mission objective.
- "What to see" or "Why it matters" guide content.
- A way back to the map.

Existing hotspot and progress mechanics can be reused, but the content and UI must be reframed away from school quiz language.

### Quest Log

The quest log replaces the feeling of a classroom exercise with RPG travel objectives. It should use an 8bitcn drawer/dialog style.

Example mission types:

- Discover three facts about the Castillo.
- Complete the Douglas route.
- Find a hidden local product.
- Explore one natural viewpoint.
- Save a heritage note to the collection.

Missions are optional and serve engagement, not gating.

### Collection

The current diploma concept should become a travel journal or collection.

Collection items may include:

- Stamps
- Relics
- Places visited
- Local curiosities
- Food discoveries
- Douglas/Teba connection notes

This area should feel like a personal RPG codex, not a children's diploma.

### Settings

Settings should include:

- Music on/off
- Sound effects on/off
- Reduced motion
- Reset progress
- Future language support

## Native-App Feel

The app should be mobile-first and behave like a native app even though it runs in the browser.

Design requirements:

- Vertical layout first.
- Full viewport experience.
- Bottom navigation for primary surfaces.
- Large touch targets.
- Smooth transitions using Framer Motion.
- Sound effects for selection, opening panels, completing missions, and discoveries.
- Ambient music, with browser autoplay restrictions handled by user interaction.
- Local progress persistence.
- Future PWA install support.

## 8bitcn Usage

Use 8bitcn components and blocks where they fit the product:

- Main Menu for the RPG entry screen.
- Dialogue for character and guide text.
- Quest Log for missions.
- Drawer/Dialog for mobile panels.
- XP Bar or similar progress component for exploration progress.
- Button, Badge, Tabs, Switch, Tooltip, and related controls for consistent retro UI.

The app already uses Tailwind, React, Next, and Framer Motion, so 8bitcn should be integrated in sympathy with the existing stack.

## Content Model

The current chapter model should evolve from a linear list into map zones.

Each zone should support:

- id
- slug
- title
- short subtitle
- category
- map coordinates
- scene image
- ambient sound key
- accent color
- guide summary
- hotspots
- mission
- collection reward

Hotspots should contain practical and cultural information, not only trivia.

## Initial Asset List

Required for the first polished version:

- `mapa-teba.png`: vertical mobile RPG territory map of Teba, no text baked in.
- `main-menu.png`: dramatic pixel art menu background, ideally Castillo de la Estrella.
- `castillo-estrella.png`: immersive castle zone.
- `pueblo-blanco.png`: streets and white village atmosphere.
- `naturaleza-guadalteba.png`: sierras, river, reservoir, cereal/olive landscape.
- `gastronomia-teba.png`: cheese, oil, cured meats, local dishes/products.
- `douglas-days.png`: medieval and Scottish connection.
- `museo-patrimonio.png`: museum, church, archaeological or heritage material.
- `personaje-arqueologo.png`: portrait, preferably 512x512 or 768x768.
- `personaje-senderista.png`: portrait, preferably 512x512 or 768x768.
- `personaje-quesero.png`: portrait, preferably 512x512 or 768x768.

Implementation can begin with placeholders for any scene assets the user has not delivered yet. The map, main menu background, castle scene, and the three character portraits are the highest priority assets because they define the product's first impression.

Optional but valuable:

- `sprite-arqueologo.png`
- `sprite-senderista.png`
- `sprite-quesero.png`
- Small node icons for castle, nature, food, church, shield, parchment, bagpipe/heart.

Asset guidance:

- PNG format.
- Pixel art style.
- Backgrounds ideally 1080x1920 or 1440x2560.
- Icons ideally 128x128 or 256x256.
- Avoid text in images so the UI can remain responsive and accessible.
- Use ASCII file names without accents to avoid encoding and import issues.

## Existing App Migration Notes

The existing app already has useful foundations:

- Next 15 and React 19.
- Tailwind.
- Framer Motion.
- Local storage progress.
- Full-screen scene transitions.
- Hotspots.
- Audio handling.
- Badge/progress mechanics.

The redesign should reuse the technical ideas, but refactor the product shape:

- Replace name input with main menu and character selection.
- Replace linear chapters with a free map and zone routing/state.
- Replace quizzes with optional missions or discoveries.
- Replace diploma with collection/travel journal.
- Replace "Para profes" with a more general About/Guide/Info surface if needed.
- Fix encoding issues currently visible in Spanish text and emoji output.

## Success Criteria

The redesign is successful if:

- It feels like a polished mobile app, not a desktop web page.
- It keeps pixel art but feels suitable for adults, families, locals, and visitors.
- The first screen makes Teba feel important and distinctive.
- The map invites exploration without needing instructions.
- Each zone teaches something real and useful about Teba.
- Character selection adds identity without blocking content.
- Sound and motion make the experience feel immersive, but can be disabled.
- The app can grow later with real routes, agenda, commerce, multilingual content, and PWA install support.
