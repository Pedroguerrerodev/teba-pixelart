'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { RpgCharacter } from '@/lib/types';

interface CharacterSelectProps {
  characters: RpgCharacter[];
  selectedCharacterId: string | null;
  onSelect: (id: RpgCharacter['id']) => void;
  onContinue: () => void;
}

export default function CharacterSelect({
  characters,
  selectedCharacterId,
  onSelect,
  onContinue,
}: CharacterSelectProps) {
  return (
    <main className="app-screen overflow-y-auto px-4 py-5">
      <div className="mx-auto flex min-h-full w-full max-w-md flex-col">
        <div className="mb-5">
          <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
            Antes de abrir el mapa
          </p>
          <h2 className="mt-3 font-pixel text-xl leading-8 text-white">Elige tu mirada</h2>
          <p className="mt-3 text-sm leading-6 text-stone-200/78">
            No bloquea contenido. Solo cambia el tono de tus dialogos y como la app te acompana por Teba.
          </p>
        </div>

        <div className="grid flex-1 gap-3">
          {characters.map((character, index) => {
            const selected = character.id === selectedCharacterId;

            return (
              <motion.button
                key={character.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => onSelect(character.id)}
                className={`character-card ${selected ? 'character-card-selected' : ''}`}
                style={{ '--character-accent': character.accent } as React.CSSProperties}
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded border-2 border-black bg-stone-900">
                  <img
                    src={character.portrait}
                    alt=""
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = '/images/mascota-estrella.png';
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-pixel text-[0.62rem] leading-5 text-white">{character.name}</h3>
                    {selected && <Check size={16} className="text-emerald-300" aria-hidden />}
                  </div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--character-accent)]">
                    {character.title}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-stone-200/78">{character.focus}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={onContinue}
          disabled={!selectedCharacterId}
          className="pixel-action pixel-action-primary mt-5 disabled:cursor-not-allowed disabled:opacity-45"
        >
          <Sparkles size={18} aria-hidden />
          <span>Abrir mapa</span>
        </button>
      </div>
    </main>
  );
}
