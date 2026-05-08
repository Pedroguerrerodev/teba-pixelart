'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { BookOpen, Check, ChevronLeft, ChevronRight, Heart, LockKeyhole, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type React from 'react';
import { historianArchiveEntries } from '@/lib/historian-campaign';
import { CollectionItem, RpgProgress } from '@/lib/types';
import PixelPanel from './PixelPanel';

interface CollectionViewProps {
  items: CollectionItem[];
  progress: RpgProgress;
  onEquipItem: (itemId: string) => void;
  onAcknowledgeHistorianArchive?: () => void;
}

function ItemIcon({ name }: { name: string }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] || Icons.Gem;
  return <Icon size={22} aria-hidden />;
}

const codexEntryImages: Record<string, string> = {
  'archivo-teba': '/images/mapa-historia.png',
  'cueva-palomas': '/images/tajodetorrox.png',
  'sima-silex': '/images/tajotorrox-vetical.png',
  'llano-espa': '/images/mapa-historia.png',
  lentejuela: '/images/mapa-historia.png',
  'cerro-horca': '/images/mapa-historia.png',
  castillejos: '/images/mapa-historia.png',
  'carnero-castillejos': '/images/mascota-estrella.png',
  'cortijo-tajo': '/images/ayuntamiento.png',
  'tiberio-joven': '/images/mascota-estrella.png',
  itaba: '/images/castillo-dia.png',
  takurunna: '/images/castillo-fondo.png',
  'castillo-estrella': '/images/castillo-dia.png',
  'sir-james-douglas': '/images/monumento-douglas.png',
  'robert-bruce': '/images/monumento-douglas.png',
  'condado-teba': '/images/iglesia.png',
  'santa-cruz-real': '/images/iglesia.png',
  'octubre-1934': '/images/ayuntamiento.png',
};

export default function CollectionView({
  items,
  progress,
  onEquipItem,
  onAcknowledgeHistorianArchive,
}: CollectionViewProps) {
  const [currentCodexIndex, setCurrentCodexIndex] = useState(0);
  const [codexDragX, setCodexDragX] = useState(0);
  const [isCodexDragging, setIsCodexDragging] = useState(false);
  const [codexCardStep, setCodexCardStep] = useState(326);
  const [openCodexIndex, setOpenCodexIndex] = useState<number | null>(null);
  const [favoriteCodexIds, setFavoriteCodexIds] = useState<string[]>([]);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const suppressCodexClickRef = useRef(false);
  const archiveIntroduced = progress.historianCampaign.archiveIntroduced;
  const unlockedCount = historianArchiveEntries.filter((entry) =>
    progress.historianCampaign.archiveEntryIds.includes(entry.id)
  ).length;
  const currentEntry = historianArchiveEntries[currentCodexIndex] ?? historianArchiveEntries[0];
  const currentUnlocked = progress.historianCampaign.archiveEntryIds.includes(currentEntry.id);
  const currentImage = codexEntryImages[currentEntry.id] ?? '/images/mapa-historia.png';
  const ambientImage = currentUnlocked ? currentImage : '/images/mapa-historia.png';
  const codexSlides = useMemo(
    () =>
      historianArchiveEntries.map((entry) => ({
        entry,
        unlocked: progress.historianCampaign.archiveEntryIds.includes(entry.id),
        image: codexEntryImages[entry.id] ?? '/images/mapa-historia.png',
      })),
    [progress.historianCampaign.archiveEntryIds]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!archiveIntroduced || progress.selectedCharacterId !== 'arqueologo') {
        return;
      }

      if (event.key === 'ArrowRight') {
        setCurrentCodexIndex((current) => Math.min(current + 1, historianArchiveEntries.length - 1));
      }

      if (event.key === 'ArrowLeft') {
        setCurrentCodexIndex((current) => Math.max(current - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [archiveIntroduced, progress.selectedCharacterId]);

  useEffect(() => {
    const updateCardStep = () => {
      const cardWidth = Math.min(window.innerWidth * 0.78, 330);
      setCodexCardStep(cardWidth + 42);
    };

    updateCardStep();
    window.addEventListener('resize', updateCardStep);
    return () => window.removeEventListener('resize', updateCardStep);
  }, []);

  const goToCodexEntry = (index: number) => {
    setCurrentCodexIndex(Math.max(0, Math.min(index, historianArchiveEntries.length - 1)));
  };

  const getClientX = (event: React.MouseEvent | React.TouchEvent) =>
    'touches' in event ? event.touches[0]?.clientX ?? 0 : event.clientX;

  const startCodexDrag = (event: React.MouseEvent | React.TouchEvent) => {
    dragStartXRef.current = getClientX(event);
    dragStartTimeRef.current = Date.now();
    suppressCodexClickRef.current = false;
    setCodexDragX(0);
    setIsCodexDragging(true);
  };

  const moveCodexDrag = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isCodexDragging) {
      return;
    }

    const nextDragX = (getClientX(event) - dragStartXRef.current) * 0.82;
    if (Math.abs(nextDragX) > 10) {
      suppressCodexClickRef.current = true;
    }
    setCodexDragX(nextDragX);
  };

  const endCodexDrag = () => {
    if (!isCodexDragging) {
      return;
    }

    const elapsed = Math.max(1, Date.now() - dragStartTimeRef.current);
    const velocity = codexDragX / elapsed;
    const threshold = 58;

    if (codexDragX < -threshold || velocity < -0.45) {
      goToCodexEntry(currentCodexIndex + 1);
    } else if (codexDragX > threshold || velocity > 0.45) {
      goToCodexEntry(currentCodexIndex - 1);
    }

    setCodexDragX(0);
    setIsCodexDragging(false);
  };

  const handleCodexCardClick = (index: number) => {
    if (suppressCodexClickRef.current) {
      suppressCodexClickRef.current = false;
      return;
    }

    if (index !== currentCodexIndex) {
      goToCodexEntry(index);
      return;
    }

    setOpenCodexIndex(index);
  };

  const openCodexSlide = openCodexIndex === null ? null : codexSlides[openCodexIndex];
  const toggleFavoriteCodexEntry = (entryId: string) => {
    setFavoriteCodexIds((current) =>
      current.includes(entryId)
        ? current.filter((favoriteId) => favoriteId !== entryId)
        : [...current, entryId]
    );
  };

  if (progress.selectedCharacterId === 'arqueologo') {
    if (!archiveIntroduced) {
      return (
        <main className="app-screen historian-dialogue-screen">
          <div className="historian-dialogue-backdrop" />
          <img
            src="/images/El%20Historiador.png"
            alt=""
            className="historian-dialogue-guide"
            onError={(event) => {
              event.currentTarget.src = '/images/mascota-estrella.png';
            }}
          />
          <section className="historian-dialogue-box" aria-label="Conversacion con el guia">
            <div className="historian-dialogue-name">El Historiador</div>
            <p>
              Ya has llegado a Teba. Pero ha pasado algo: la historia del pueblo se ha
              fragmentado, como paginas perdidas de un antiguo codice.
            </p>
            <p>
              Necesitamos visitar sus lugares mas importantes, recuperar cada memoria y
              reconstruir el relato completo. Cuando estes listo, abriremos el mapa.
            </p>
            <button
              type="button"
              onClick={onAcknowledgeHistorianArchive}
              className="historian-dialogue-accept"
            >
              <Check size={17} aria-hidden />
              <span>Aceptar</span>
            </button>
          </section>
        </main>
      );
    }

    return (
      <main className="app-screen codex-gallery-screen">
        <motion.div
          key={ambientImage}
          className="codex-gallery-ambient"
          style={{ backgroundImage: `url("${ambientImage}")` }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55 }}
        />
        <div className="codex-gallery-scrim" />

        <header className="codex-gallery-header">
          <h1>Codice</h1>
          <div className="codex-gallery-counter">
            <span>{String(currentCodexIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(historianArchiveEntries.length).padStart(2, '0')}</span>
          </div>
        </header>

        <section
          className={`codex-gallery-stage ${isCodexDragging ? 'codex-gallery-stage-dragging' : ''}`}
          aria-label="Galeria del Codice de Teba"
          onMouseDown={startCodexDrag}
          onMouseMove={moveCodexDrag}
          onMouseUp={endCodexDrag}
          onMouseLeave={endCodexDrag}
          onTouchStart={startCodexDrag}
          onTouchMove={moveCodexDrag}
          onTouchEnd={endCodexDrag}
        >
          <motion.div
            className="codex-gallery-track"
            animate={{
              x: `calc(50% - ${currentCodexIndex * codexCardStep + Math.min(codexCardStep - 42, 330) / 2}px + ${codexDragX}px)`,
            }}
            transition={
              isCodexDragging ? { duration: 0 } : { duration: 0.56, ease: [0.32, 0.72, 0, 1] }
            }
          >
            {codexSlides.map(({ entry, unlocked, image }, index) => {
              const active = index === currentCodexIndex;

              return (
                <motion.article
                  key={entry.id}
                  className={`codex-gallery-card ${active ? 'codex-gallery-card-active' : ''} ${
                    unlocked ? '' : 'codex-gallery-card-locked'
                  }`}
                  animate={{
                    scale: active ? 1 : 0.78,
                    opacity: active ? 1 : 0.34,
                    rotateY: 0,
                    x: 0,
                  }}
                  whileHover={active ? { y: -10 } : undefined}
                  whileTap={active ? { scale: 0.97, y: -4 } : { scale: 0.82 }}
                  transition={{ duration: 0.42 }}
                  onClick={() => handleCodexCardClick(index)}
                >
                  <motion.div
                    className="codex-gallery-frame"
                    animate={{
                      boxShadow: active
                        ? '0 0 0 3px rgba(255,255,255,0.08), 0 36px 88px rgba(0,0,0,0.62)'
                        : '5px 5px 0 #020617, 0 20px 42px rgba(0,0,0,0.42)',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={unlocked ? image : '/images/mapa-historia.png'}
                      alt=""
                      draggable={false}
                      className="codex-gallery-image"
                    />
                    {!unlocked && (
                      <div className="codex-gallery-lock">
                        <LockKeyhole size={26} aria-hidden />
                      </div>
                    )}
                    <div className="codex-gallery-info">
                      <span>{unlocked ? entry.category : 'Memoria oculta'}</span>
                      <h2>{unlocked ? entry.title : 'Pagina bloqueada'}</h2>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>

        <section className="codex-gallery-caption">
          <div>
            <p className="codex-category">{currentUnlocked ? currentEntry.category : 'Bloqueada'}</p>
            <h2>{currentUnlocked ? currentEntry.title : 'Pagina todavia perdida'}</h2>
            <p>
              {currentUnlocked
                ? currentEntry.summary
                : 'Completa etapas de la campana historica para revelar esta pieza del Codice.'}
            </p>
          </div>
          <div className="codex-gallery-status">
            <BookOpen size={16} aria-hidden />
            <span>
              {unlockedCount}/{historianArchiveEntries.length}
            </span>
          </div>
        </section>

        <div className="codex-gallery-controls">
          <button
            type="button"
            onClick={() => goToCodexEntry(currentCodexIndex - 1)}
            disabled={currentCodexIndex === 0}
            aria-label="Entrada anterior"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <div className="codex-gallery-dots" aria-label="Navegacion del Codice">
            {historianArchiveEntries.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => goToCodexEntry(index)}
                className={index === currentCodexIndex ? 'codex-gallery-dot-active' : ''}
                aria-label={`Ir a entrada ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goToCodexEntry(currentCodexIndex + 1)}
            disabled={currentCodexIndex === historianArchiveEntries.length - 1}
            aria-label="Entrada siguiente"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>

        {openCodexSlide && (
          <motion.div
            className="codex-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="codex-detail-close"
              onClick={() => setOpenCodexIndex(null)}
              aria-label="Cerrar ficha"
            >
              <X size={28} aria-hidden />
            </button>

            <motion.article
              className={`codex-detail-card ${openCodexSlide.unlocked ? '' : 'codex-detail-card-locked'}`}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28 }}
            >
              <img
                src={openCodexSlide.unlocked ? openCodexSlide.image : '/images/mapa-historia.png'}
                alt=""
                className="codex-detail-image"
              />
              {!openCodexSlide.unlocked && (
                <div className="codex-detail-lock">
                  <LockKeyhole size={30} aria-hidden />
                </div>
              )}
              <h2>{openCodexSlide.unlocked ? openCodexSlide.entry.title : 'Pagina bloqueada'}</h2>
              <p>
                {openCodexSlide.unlocked
                  ? openCodexSlide.entry.summary
                  : 'Recupera esta memoria avanzando en la campana historica.'}
              </p>
              <button
                type="button"
                className={`codex-detail-favorite ${
                  favoriteCodexIds.includes(openCodexSlide.entry.id) ? 'codex-detail-favorite-active' : ''
                }`}
                onClick={() => toggleFavoriteCodexEntry(openCodexSlide.entry.id)}
                aria-label="Marcar como favorita"
              >
                <Heart size={20} aria-hidden />
              </button>
            </motion.article>
          </motion.div>
        )}
      </main>
    );
  }

  return (
    <main className="app-screen overflow-y-auto px-4 pb-28 pt-32">
      <header className="mb-4">
        <p className="font-pixel text-[0.55rem] uppercase tracking-[0.22em] text-amber-200/80">
          Diario de viaje
        </p>
        <h1 className="mt-3 font-pixel text-xl text-white">Inventario y diario</h1>
        <p className="mt-3 text-sm leading-6 text-stone-200/78">
          Sellos, reliquias y herramientas que convierten la visita en una ruta RPG.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => {
          const unlocked = progress.collectionItemIds.includes(item.id);
          const equipped = progress.equippedItemId === item.id;

          return (
            <PixelPanel
              key={item.id}
              className={`min-h-48 p-4 ${unlocked ? '' : 'opacity-60'} ${equipped ? 'inventory-equipped' : ''}`}
            >
              <div className="grid h-12 w-12 place-items-center border-2 border-black bg-amber-300 text-black shadow-[3px_3px_0_#000]">
                {unlocked ? <ItemIcon name={item.icon} /> : <LockKeyhole size={21} aria-hidden />}
              </div>
              <p className="mt-3 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-amber-200/75">
                {item.kind === 'relic' ? 'Reliquia' : item.kind === 'tool' ? 'Herramienta' : 'Sello'}
              </p>
              <h2 className="mt-4 font-pixel text-[0.65rem] leading-5 text-white">
                {unlocked ? item.title : 'Recuerdo oculto'}
              </h2>
              <p className="mt-2 text-xs leading-5 text-stone-200/75">
                {unlocked ? item.description : 'Completa su mision para anadirlo al diario.'}
              </p>
              {unlocked && (
                <button
                  onClick={() => onEquipItem(item.id)}
                  className="mt-4 w-full border-2 border-black bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[2px_2px_0_#000]"
                >
                  {equipped ? 'Equipado' : 'Equipar'}
                </button>
              )}
            </PixelPanel>
          );
        })}
      </div>
    </main>
  );
}
