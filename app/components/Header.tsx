'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Header() {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-[1220px] mx-auto px-4 pt-6 pb-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative">
            <Image
              className="w-[120px] h-auto"
              src="/images/dltcafe-venture-logo1.svg"
              alt="DLT Cafe Ventures"
              width={10}
              height={60}
              priority
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6 text-white/80">
            {/* Programs Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-1 hover:text-[#00E1AF] transition-colors"
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                Programs
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${isProgramsOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {isProgramsOpen && (
                  <motion.div 
                    className="absolute left-0 top-full mt-2 bg-black/90 backdrop-blur-sm border border-white/10 rounded-md p-2 w-52 shadow-xl"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setIsProgramsOpen(true)}
                    onMouseLeave={() => setIsProgramsOpen(false)}
                  >
                    <div className="flex flex-col space-y-2">
                      <Link 
                        href="/influencer-academy" 
                        className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                      >
                        Influence Academy
                      </Link>
                      <Link 
                        href="/content-factory" 
                        className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                      >
                        Content Factory
                      </Link>
                      <Link 
                        href="/codemasons-guild" 
                        className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                      >
                        Codemasons Guild
                      </Link>
                      <Link 
                        href="/venture-operators-league" 
                        className="px-3 py-2 rounded-md hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                      >
                        Venture Ops League
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link href="#" className="hover:text-[#00E1AF] transition-colors">
              Cafe Blog
            </Link>
            <Link href="#" className="hover:text-[#00E1AF] transition-colors">
              About
            </Link>
            <Link href="/contact-us" className="hover:text-[#00E1AF] transition-colors">
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 