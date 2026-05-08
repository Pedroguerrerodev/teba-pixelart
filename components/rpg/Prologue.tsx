'use client';

import { motion } from 'framer-motion';
import { BookOpen, Castle, Heart, Map, Sparkles } from 'lucide-react';
import { RpgCharacter } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface PrologueProps {
  character: RpgCharacter | undefined;
  onEnterMap: () => void;
}

export default function Prologue({ character, onEnterMap }: PrologueProps) {
  const isHistorian = character?.id === 'arqueologo';

  return (
    <main className="app-screen overflow-y-auto px-4 pb-10 pt-5">
      <div className="prologue-bg" />
      <div className="relative z-10 mx-auto grid min-h-full max-w-md content-center gap-4">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-pixel text-[0.55rem] uppercase tracking-[0.24em] text-amber-200/85">
            Prologo
          </p>
          <h1 className="mt-3 font-pixel text-2xl leading-9 text-white">
            {isHistorian ? 'Llegada a Teba' : 'El mapa de la Estrella'}
          </h1>
        </motion.div>

        <PixelPanel className="p-4">
          <div className="dialogue-row">
            <Castle className="text-amber-200" size={22} aria-hidden />
            <p>
              {isHistorian
                ? 'Oh... hemos llegado a Teba. Antes de subir al castillo o seguir cualquier ruta, deberiamos pasar por el Archivo.'
                : 'En Teba, la historia no duerme bajo el castillo: late. En 1330, una promesa escocesa cruzo estas tierras con el corazon de un rey.'}
            </p>
          </div>
          <div className="dialogue-row mt-4">
            <Heart className="text-red-300" size={22} aria-hidden />
            <p>
              {isHistorian
                ? 'Si queremos entender este pueblo, primero hay que escuchar lo que guarda. El mapa vendra despues.'
                : 'Tu guia no busca monstruos ni coronas. Busca lugares reales: una muralla, una calle blanca, una receta, una fiesta, una mirada al Guadalteba.'}
            </p>
          </div>
          <div className="dialogue-row mt-4">
            <Sparkles className="text-emerald-200" size={22} aria-hidden />
            <p className="italic text-stone-100">
              {character?.quote ?? 'El mapa se abrira cuando elijas como mirar el pueblo.'}
            </p>
          </div>
        </PixelPanel>

        <button onClick={onEnterMap} className="pixel-action pixel-action-primary">
          {isHistorian ? <BookOpen size={18} aria-hidden /> : <Map size={18} aria-hidden />}
          <span>{isHistorian ? 'Ir al Archivo' : 'Abrir el mapa'}</span>
        </button>
      </div>
    </main>
  );
}
