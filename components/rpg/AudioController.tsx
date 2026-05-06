'use client';

import { useEffect, useRef } from 'react';

interface AudioControllerProps {
  enabled: boolean;
}

export default function AudioController({ enabled }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/sound/bso.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.18;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!enabled) {
      audio.pause();
      return;
    }

    audio.play().catch(() => {
      // Browsers require a user gesture before music starts. The next settings/menu tap retries.
    });
  }, [enabled]);

  return null;
}
