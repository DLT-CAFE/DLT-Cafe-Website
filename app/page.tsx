'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import HomePage from './components/HomePage';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Preloader onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <HomePage />
      )}
    </AnimatePresence>
  );
}

