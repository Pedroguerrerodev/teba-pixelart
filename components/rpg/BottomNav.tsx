'use client';

import { Compass, Gem, Map, ScrollText } from 'lucide-react';
import { AppScreen } from '@/lib/types';

interface BottomNavProps {
  current: AppScreen;
  onNavigate: (screen: AppScreen) => void;
}

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  const items = [
    { screen: 'map' as const, label: 'Mapa', icon: Map },
    { screen: 'quests' as const, label: 'Misiones', icon: ScrollText },
    { screen: 'collection' as const, label: 'Diario', icon: Gem },
    { screen: 'guide' as const, label: 'Guia', icon: Compass },
  ];

  return (
    <nav className="bottom-nav" aria-label="Navegacion principal">
      {items.map(({ screen, label, icon: Icon }) => {
        const active = current === screen || (current === 'zone' && screen === 'map');

        return (
          <button
            key={screen}
            type="button"
            onClick={() => onNavigate(screen)}
            className={`bottom-nav-item ${active ? 'bottom-nav-item-active' : ''}`}
          >
            <Icon size={19} aria-hidden />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
