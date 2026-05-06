import { ReactNode } from 'react';

interface PixelPanelProps {
  children: ReactNode;
  className?: string;
  accent?: string;
}

export default function PixelPanel({ children, className = '', accent = '#d6a15f' }: PixelPanelProps) {
  return (
    <section
      className={`pixel-panel ${className}`}
      style={{ '--panel-accent': accent } as React.CSSProperties}
    >
      {children}
    </section>
  );
}
