'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const logos = [
  {
    src: '/images/logo/antler.svg',
    width: 120,
    height: 45,
    alt: 'Antler'
  },
  {
    src: '/images/logo/tide.svg',
    width: 120,
    height: 45,
    alt: 'Tide'
  },
  {
    src: '/images/logo/ukri.png',
    width: 140,
    height: 45,
    alt: 'UKRI'
  }
];

export function LogoCarousel() {
  return (
    <section className="w-full bg-black py-16">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Trusted By Text */}
        <h2 className="text-center text-white/60 text-2xl mb-12 ">Trusted By</h2>
        
        {/* Logo Grid */}
        <div className="grid grid-cols-3 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 