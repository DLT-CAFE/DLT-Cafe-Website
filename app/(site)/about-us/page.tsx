'use client';

import React, { useEffect, useState } from 'react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { NewsletterForm } from '@/app/components/NewsletterForm';

const outfit = Outfit({ subsets: ['latin'] });

// Updated Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.6
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function AboutUsPage() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // Load iframe when component mounts
    const iframe = document.querySelector('iframe[data-team-iframe]') as HTMLIFrameElement;
    if (iframe && !iframeLoaded) {
      iframe.src = 'https://dltcafe.com/team2';
      setIframeLoaded(true);
    }
  }, [iframeLoaded]);

  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative min-h-[100svh] flex items-center pt-24"
      >
        {/* Absolute positioned images */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute bottom-12 left-72 w-[480px] h-[300px] z-10"
        >
          <Image
            src="/images/ideation.jpg"
            alt="Team Collaboration"
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Main Content */}
        <div className="w-full max-w-[1220px] mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Column 1 - Image (40%) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative h-full">
                <Image
                  src="/images/stand-out.jpg"
                  alt="Orange bird standing out from the crowd"
                  width={480}
                  height={600}
                  className="object-cover w-full h-[550px] rounded-lg shadow-lg shadow-left shadow-bottom" style={{ boxShadow: '0 0 28px black' }}
                />
              </div>
            </motion.div>
            
            {/* Column 2 - Content (60%) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-7"
            >
              {/* Top Label */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-[#D2F381] mb-4"
              >
                About
              </motion.p>
              
              {/* Quote */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className={`${outfit.className} text-[4.2rem] font-semibold text-white leading-[1.2] mb-6 uppercase tracking-wide`}
              >
                &ldquo;WE&apos;RE NEVER<br />
                GONNA SURVIVE<br />
                UNLESS, WE GET<br />
                A LITTLE
                CRAZY&rdquo;
              </motion.h1>
              
              {/* Attribution */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-[#D2F381] text-right text-sm italic"
              >
                -from the song &ldquo;Crazy&rdquo; by the artist Seal
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Spacer Div - 300px height, adjustable */}
      <div className="h-[150px] w-full" id="section-spacer"></div>

      {/* Limitless Is Our Domain Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
        className="w-full py-20"
      >
        <div className="max-w-[1220px] mx-auto px-4 text-center">
          {/* Heading */}
          <motion.h2 
            variants={fadeInUp}
            className={`${outfit.className} text-white text-[4.7rem] md:text-7xl font-semibold mb-8`}
          >
            Limitless Is<br />
            Our Domain
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            variants={fadeInUp}
            className="text-white text-[1.7rem] font-extralight max-w-[900px] mx-auto mb-20"
          >
            We&apos;re assembling a team of bold thinkers, seasoned experts, and emerging 
            trailblazers, to incubate, nurture and scale the communities and ventures 
            that will be at the forefront of a new emerging economy.
          </motion.p>
          
          {/* Icons Grid - Row 1 */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16"
          >
            {/* Research & Analytics - CHANGED ICON */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Research &<br />Analytics</span>
            </motion.div>
            
            {/* Finance & Fundraising */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Finance &<br />Fundraising</span>
            </motion.div>
            
            {/* HR & Talent */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">HR & Talent</span>
            </motion.div>
            
            {/* Engineering */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Engineering</span>
            </motion.div>
            
            {/* Business Strategy */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Business<br />Strategy</span>
            </motion.div>
          </motion.div>
          
          {/* Icons Grid - Row 2 */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-5 gap-8"
          >
            {/* Legal */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Legal</span>
            </motion.div>
            
            {/* Go-To Market */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Go-To<br />Market</span>
            </motion.div>
            
            {/* Leadership - CHANGED ICON */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Leadership</span>
            </motion.div>
            
            {/* Marketing */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Marketing</span>
            </motion.div>
            
            {/* Product Dev */}
            <motion.div variants={staggerItem} className="flex flex-col items-center">
              <div className="w-12 h-12 mb-4 text-[#D2F381]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <span className="text-[#D2F381] font-medium text-lg">Product Dev</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Spacer Div */}
      <div className="h-[200px] w-full" id="section-spacer-2"></div>

      {/* Meet Our Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
        className="w-full py-20"
      >
        <div className="max-w-[1220px] mx-auto px-4 text-center">
          {/* Heading */}
          <motion.p variants={fadeInUp} className="text-white text-xl mb-4">MEET OUR TEAM OF</motion.p>
          <motion.h2 variants={fadeInUp} className={`${outfit.className} text-white text-[4.7rem] md:text-7xl font-semibold mb-8`}>
            Superheros
          </motion.h2>
          
          {/* Description */}
          <motion.p variants={fadeInUp} className="text-white text-[1.7rem] font-extralight max-w-[900px] mx-auto mb-20">
            each with their unique skill set, unparalleled vision, <br /> and the drive to turn 
            crazy ideas into reality.
          </motion.p>

          {/* Placeholder Text - Italicized */}
          <motion.p variants={fadeInUp} className="text-[#D2F381] text-lg italic">
            Sir Maxwell pls create a team photo.
          </motion.p>

          {/* Team Image */}
          <motion.div 
            variants={fadeInUp}
            className="relative mt-2 mb-8 w-[1024px] h-[513px] mx-auto"
          >
            <Image
              src="/images/dltcafe-team-meeting-1024x513.webp"
              alt="DLT Cafe Team Meeting"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>

          {/* Team Members iFrame */}
          <motion.div 
            variants={fadeInUp} 
            className="mt-20 w-full relative min-h-[600px]"
          >
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-t-2 border-[#D2F381] rounded-full animate-spin"></div>
                  <p className="text-[#D2F381]">Loading team members...</p>
                </div>
              </div>
            )}
            <iframe 
              data-team-iframe
              title="DLT Cafe Team Members"
              className="w-full min-h-[600px] border-0 bg-transparent"
              onLoad={() => setIframeLoaded(true)}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Spacer Div */}
      <div className="h-[100px] w-full"></div>

      {/* Our Core Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
        className="w-full"
      >
        <div className="max-w-[1220px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column - Title and Description */}
          <motion.div 
            variants={staggerContainer}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16">
                <Image
                  src="/images/dltcoop.svg"
                  alt="DLT Cafe Hexagon Logo"
                  width={64}
                  height={64}
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <p className="text-[#D2F381] text-lg">Our Core</p>
            </div>
            <motion.h2 variants={fadeInUp} className={`${outfit.className} text-white text-[4.7rem] leading-[1.2] font-semibold mb-6`}>
              Collective<br />
              Co-operative<br />
              Values
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white text-[1.7rem] font-extralight max-w-[900px] mx-auto mb-20">
              Our values are what we stand on. They&apos;re why we innovate, it&apos;s why we support one another, and it&apos;s why we refuse to settle until we redefine venture building.
            </motion.p>
          </motion.div>

          {/* Right Column - Values and Co-operative Values */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 gap-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Community */}
              <motion.div variants={staggerItem} className="mx-auto mb-5 max-w-6xl px-2 md:mb-5 xl:px-0">
                <div className="relative flex flex-col items-center border border-white/20 rounded-lg p-4">
                  <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  
                  <div className="p-4">
                    <div className="w-12 h-12 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#ffffff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <h3 className="text-[#D2F381] text-2xl font-medium mb-2">Community</h3>
                    <p className="text-white text-xl font-light">
                      Our strength resides in the collective. We will endeavour to always provide a safe space with the support our members need.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Innovation */}
              <motion.div variants={staggerItem} className="mx-auto mb-5 max-w-6xl px-2 md:mb-5 xl:px-0">
                <div className="relative flex flex-col items-center border border-white/20 rounded-lg p-4">
                  <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#d2f381] text-white" />

                  <div className="p-4">
                    <div className="w-12 h-12 mb-4">
                      <Image
                        src="/images/innovation.svg"
                        alt="Innovation Icon"
                        width={48}
                        height={48}
                        className="w-full h-full text-[#ffffff]"
                      />
                    </div>
                    <h3 className="text-[#D2F381] text-2xl font-medium mb-2">Innovation</h3>
                    <p className="text-white text-xl font-light">
                      We don&apos;t follow trends; trends follow us. Meaning we set them by staying at the forefront of culture, technological and business.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Growth */}
              <motion.div variants={fadeInUp} className="mx-auto mb-10 max-w-6xl px-2 md:mb-20 xl:px-0">
                <div className="relative flex flex-col items-center border border-white/20 rounded-lg p-4">
                  <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#d2f381] text-white" />

                  <div className="p-4">
                    <div className="w-12 h-12 mb-4">
                      <Image
                        src="/images/agile.svg"
                        alt="Growth Icon"
                        width={48}
                        height={48}
                        className="w-full h-full text-[#ffffff]"
                      />
                    </div>
                    <h3 className="text-[#D2F381] text-2xl font-medium mb-2">Growth</h3>
                    <p className="text-white text-xl font-light">
                      Is our mindset, our ambition, and our commitment to expanding every aspect of our ventures and empowering our community members to reach new heights
                    </p>
                  </div>
                </div>
              </motion.div>
              

              {/* Co-operative Values */}
              <motion.div variants={fadeInUp} className="mx-auto mb-10 max-w-6xl px-2 md:mb-20 xl:px-0">
                <div className="relative flex flex-col items-center border border-white/20 rounded-lg p-4">
                  <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
                  <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#d2f381] text-white" />

                  <div className="p-4">
                    <h3 className="text-[#D2F381] text-2xl font-medium mb-4">Co-op Values</h3>
                    <ul className="list-disc pl-5 text-white text-xl">    
                      <li>Caring for others</li>
                      <li>Democracy</li>
                      <li>Equity</li>
                      <li>Equality</li>
                      <li>Honesty</li>
                      <li>Openness</li>
                      <li>Self help</li>
                      <li>Self responsibility</li>
                      <li>Solidarity</li>
                      <li>Social responsibility</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Spacer Div */}
      <div className="h-[200px] w-full"></div>

      {/* Final Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="w-full py-20"
      >
        <div className="max-w-[1220px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div variants={fadeInUp}>
            <h2 className={`${outfit.className} text-white text-[4.7rem] leading-[1.2] font-semibold mb-6`}>Join Us,<br />We&apos;re Better<br />Together.</h2>
            <p className="text-white text-[1.7rem] font-extralight">
              If you&apos;re reading this and if you&apos;re ready to be part of a fearless movement, DLT Cafe Ventures is the place to be. Let&apos;s disrupt, let&apos;s build, and let&apos;s do something a little crazy—together.
            </p>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div variants={fadeInUp} className="relative w-full h-[400px]">
            <Image
              src="/images/join-the-team.jpg"
              alt="Join Us Image"
              fill
              className="object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </motion.section>
        
        {/* Spacer Div */}
        <div className="h-[100px] w-full"></div>

       {/* Bottom Section */}
       <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="py-16 relative"
      >
        {/* Texture Background with Elliptical Gradient Overlay */}
        <div className="absolute inset-0 overflow-hidde nmy-80">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/texture-bg.jpg"
              alt="Background Texture"
              fill
              className="object-cover"
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 70%)'
            }}
          ></div>
        </div>
        
        <div className="max-w-[1220px] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-white/60 uppercase tracking-wider mb-4">DLT CAFE VENTURE STUDIO</p>
            <div className="flex justify-center mb-4">
              <div className="flex gap-1">
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
                <span className="text-[#D2F381]">★</span>
              </div>
            </div>
            <h2 className={`${outfit.className} text-[52px] font-medium text-white`}>
              Community, Innovation & Growth
            </h2>
          </div>
          
          {/* Newsletter Section */}
          <div className="max-w-[600px] mx-auto text-center">
            <NewsletterForm />
          </div>
        </div>
       
      </motion.section>
      {/* Spacer Div */}
      <div className="h-[100px] w-full"></div>

      

      {/* Spacer Div */}
      <div className="h-[100px] w-full" ></div>
    </main>
  );
} 