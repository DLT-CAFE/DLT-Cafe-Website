'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete?: () => void;
}

export default function Preloader({ onLoadingComplete }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete?.();
    }, 7000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const quote = "The future of innovation lies not in individual genius, but in the collective intelligence of communities working together.";
  const author = "— James Smith, Founder & CEO";

  const words = quote.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          className="space-y-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="flex flex-wrap justify-center gap-x-2 text-xl md:text-2xl lg:text-3xl font-light">
            {words.map((word, i) => (
              <motion.span
                key={i}
                variants={child}
                className="text-white/90 inline-block"
                style={{ 
                  transformOrigin: "0% 50%",
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p 
            className="text-white/70 text-lg md:text-xl italic"
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
              delay: 5
            }}
          >
            {author}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
} 