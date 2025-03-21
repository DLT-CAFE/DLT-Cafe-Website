// Craft Imports
import { Section, Container, Prose } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import HeroSpline from './components/HeroSpline';
import { Outfit } from 'next/font/google';
import { CafeButton } from './components/ui/CafeButton';
import { LogoCarousel } from './components/LogoCarousel';
import { IntroSection } from './components/IntroSection';
import { VentureCollective } from './components/VentureCollective';
import { Community } from './components/Community';
import { DomainFocus } from './components/DomainFocus';
import { InStudio } from './components/InStudio';
import { JoinForm } from './components/JoinForm';

const outfit = Outfit({ subsets: ['latin'] });

// Next.js Imports
import Link from "next/link";

// Icons
import { File, Pen, Tag, Diamond, User, Folder } from "lucide-react";
import { WordPressIcon } from "@/components/icons/wordpress";
import { NextJsIcon } from "@/components/icons/nextjs";

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <main>
      {/* Hero Container */}
      <div className="w-full h-[100svh] flex flex-col items-center justify-center relative pt-[100px]">
        {/* Background Color */}
        <div className="absolute inset-0 bg-[#A2F38152]" />
        
        {/* Radial Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at center center, #02010166 17%, #000000 45%)',
            opacity: 1
          }}
        />

        {/* Cup Image Container with Spline */}
        <div className="herocup absolute pl-[10px] z-[3] w-full h-full">
          <HeroSpline />
        </div>
        
        {/* Content Container */}
        <div className="relative max-w-[1220px] mx-auto w-full">
          <div className="flex flex-col gap-7">
            <div className="flex flex-row gap-4 items-center">
              {/* Title Container */}
              <div className="w-[64.69%] z-1 first-line:flex flex-row justify-start items-center min-h-[141px]">
                <h1 className={`${outfit.className} text-[160px] font-normal leading-[0.8] text-white`}>
                  Domain of
                </h1>
              </div>
              
              {/* Video Container */}
              <div className="flex-1 min-h-[138px] rounded-[38px] bg-black overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full">
                  <iframe
                    className="absolute w-[300%] h-[300%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src="https://www.youtube.com/embed/XzdoVlzyzAM?autoplay=1&mute=1&loop=1&playlist=XzdoVlzyzAM&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                    style={{
                      pointerEvents: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>

            {/* Second Title Container */}
            <div className="min-h-[141px] z-20 flex items-center">
              <h1 className={`${outfit.className} text-[160px] font-normal leading-[1.1] text-white`}>
                Limitless <span className="text-[#D2F381]">Talent</span> Cafe
              </h1>
            </div>

            {/* Subtitle and Button Container */}
            <div className="flex flex-col z-20 gap-6 w-[46%]">
              <p className={`font-hanken-grotesk text-[23px] font-normal leading-[1.4em] text-white/80`}>
                Venture Capital x Venture Studio reimagined with a fresh dose of creative and collective intelligence.
              </p>
              <div>
                <CafeButton>
                  Learn More
                </CafeButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Logo Carousel Section */}
      <LogoCarousel />

      {/* Intro and Quote Section */}
      <IntroSection />

      {/* Venture Collective Section */}
      <VentureCollective />
      <Community />
      <DomainFocus />
      <InStudio />
      <JoinForm />
    </main>
  );
}

