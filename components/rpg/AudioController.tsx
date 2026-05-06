'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    __playTebaMusic?: () => void;
  }
}

interface AudioControllerProps {
  enabled: boolean;
  src: string;
  volume?: number;
}

export default function AudioController({ enabled, src, volume = 0.18 }: AudioControllerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src, volume]);

  useEffect(() => {
    window.__playTebaMusic = () => {
      const audio = audioRef.current;
      if (!audio || !enabled) {
        return;
      }

      audio.play().catch(() => undefined);
    };

    return () => {
      delete window.__playTebaMusic;
    };
  }, [enabled]);

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
