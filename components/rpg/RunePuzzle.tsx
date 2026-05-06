'use client';

import * as Icons from 'lucide-react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Puzzle } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface RunePuzzleProps {
  puzzle: Puzzle;
  solved: boolean;
  accent: string;
  onSolve: () => void;
}

function RuneIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.Sparkles;
  return <Icon size={21} aria-hidden />;
}

export default function RunePuzzle({ puzzle, solved, accent, onSolve }: RunePuzzleProps) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const complete = sequence.length === puzzle.answer.length;

  const isCorrect = useMemo(
    () => complete && sequence.every((rune, index) => rune === puzzle.answer[index]),
    [complete, puzzle.answer, sequence]
  );

  function pressRune(rune: string) {
    if (solved || sequence.length >= puzzle.answer.length) {
      return;
    }

    setFailed(false);
    setSequence((current) => [...current, rune]);
  }

  function check() {
    if (isCorrect) {
      onSolve();
      return;
    }

    setFailed(true);
  }

  return (
    <PixelPanel className="p-4" accent={accent}>
      <div className="flex items-start gap-3">
        <Sparkles className="mt-1 shrink-0 text-[color:var(--panel-accent)]" size={20} aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[0.52rem] uppercase tracking-[0.18em] text-amber-200/80">
            Puzzle de reliquia
          </p>
          <h2 className="mt-2 font-pixel text-[0.72rem] leading-6 text-white">{puzzle.title}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-200/78">{solved ? puzzle.solvedText : puzzle.prompt}</p>
          {!solved && <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-stone-300/70">Pista: {puzzle.clue}</p>}

          <div className="mt-4 grid grid-cols-3 gap-2">
            {puzzle.runes.map((rune) => (
              <button
                key={rune}
                onClick={() => pressRune(rune)}
                disabled={solved}
                className="rune-button"
                style={{ '--rune-accent': accent } as React.CSSProperties}
              >
                <RuneIcon name={rune} />
              </button>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2">
            {puzzle.answer.map((_, index) => (
              <span key={index} className={`rune-slot ${sequence[index] ? 'rune-slot-filled' : ''}`}>
                {sequence[index] ? <RuneIcon name={sequence[index]} /> : index + 1}
              </span>
            ))}
          </div>

          {failed && <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-red-200">La reliquia no responde. Prueba otro orden.</p>}

          {!solved && (
            <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
              <button onClick={check} disabled={!complete} className="pixel-action pixel-action-primary disabled:opacity-50">
                <span>Resolver +{puzzle.xp} XP</span>
              </button>
              <button
                onClick={() => {
                  setSequence([]);
                  setFailed(false);
                }}
                className="icon-button"
                aria-label="Reiniciar puzzle"
              >
                <RotateCcw size={18} aria-hidden />
              </button>
            </div>
          )}
        </div>
      </div>
    </PixelPanel>
  );
}
