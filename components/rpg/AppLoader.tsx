'use client';

import { motion } from 'framer-motion';

export default function AppLoader() {
  return (
    <main className="app-screen app-loader" aria-label="Cargando Explora Teba">
      <div className="app-loader-vignette" />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="app-loader-content"
      >
        <div className="app-loader-mark" aria-hidden>
          <span />
          <span />
          <span />
          <span />
        </div>
        <h1>TEBA</h1>
        <p>cargando archivo</p>
        <div className="app-loader-bar" aria-hidden>
          <span />
        </div>
      </motion.div>
    </main>
  );
}
