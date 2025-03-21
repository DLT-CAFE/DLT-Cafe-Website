"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/nav/mobile-nav";

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

const Navigation = ({ className, id }: NavProps) => {
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  return (
    <nav
      className={cn("fixed z-50 top-0 w-full backdrop-blur-md bg-black/20 border-b border-white/5", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-[1220px] mx-auto py-6 px-4 flex justify-between items-center"
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/images/dltcafe-venture-logo1.svg"
            alt="DLT Cafe Ventures"
            width={80}
            height={60}
            className="w-[220px] h-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-6">
          <div
            className="relative"
            onMouseEnter={() => setIsProgramsOpen(true)}
            onMouseLeave={() => setIsProgramsOpen(false)}
          >
            <button
              className="flex items-center gap-1 text-white/80 hover:text-[#00E1AF] transition-colors"
            >
              Programs
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isProgramsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            
            <AnimatePresence>
              {isProgramsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-60 rounded-md bg-black/80 backdrop-blur-md shadow-lg border border-white/10 overflow-hidden z-50"
                >
                  <div className="py-1">
                    <Link 
                      href="/influence-academy" 
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                    >
                      Influence Academy
                    </Link>
                    <Link 
                      href="/content-factory" 
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                    >
                      Content Factory
                    </Link>
                    <Link 
                      href="/codemasons-guild" 
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                    >
                      Codemasons Guild
                    </Link>
                    <Link 
                      href="/venture-ops-league" 
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-[#00E1AF] transition-colors"
                    >
                      Venture Ops League
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Link 
            href="/posts" 
            className="text-white/80 hover:text-[#00E1AF] transition-colors"
          >
            Cafe Blog
          </Link>
          <Link 
            href="/about-us" 
            className="text-white/80 hover:text-[#00E1AF] transition-colors"
          >
            About
          </Link>
          <Link 
            href="/contact-us" 
            className="text-white/80 hover:text-[#00E1AF] transition-colors"
          >
            Contact
          </Link>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 