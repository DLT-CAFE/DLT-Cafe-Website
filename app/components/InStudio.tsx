'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CafeButton } from './ui/CafeButton';

export function InStudio() {
  return (
    <section className="w-full bg-black pt-32 pb-24">
      {/* IN STUDIO Header */}
      <div className="w-full border-t border-b border-white/10 py-6 mb-20">
        <div className="max-w-[1220px] mx-auto px-4">
          <h2 className="text-[5rem] font-extrabold text-white font-outfit tracking-wider">
            IN STUDIO
          </h2>
        </div>
      </div>
      
      {/* Divider line */}
      <div className="max-w-[1220px] mx-auto px-4 mb-8">
        <div className="w-28 h-px bg-white/30"></div>
      </div>
      
      {/* Cafe Venture 001 Header */}
      <div className="max-w-[1220px] mx-auto px-4 mb-8">
        <h3 className="text-xl text-white font-outfit">
          Cafe Venture <span className="text-[#D2F381]">001</span>
        </h3>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-[1220px] mx-auto px-4">
        <div className="flex flex-wrap">
          {/* Left Column - Heading and Text */}
          <div className="w-full lg:w-1/2 pr-8">
            <h2 className="text-[88px] font-medium text-white leading-[0.95] font-outfit mb-12">
              Get ready to<br /> 
              be part of<br />
              something big.
            </h2>
            <div className="hidden lg:block">
              <div className="relative h-[400px] w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/youth-in-sports.jpg"
                  alt="Youth in Sports"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Fox Image and Text */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            {/* Fox with gradient background */}
            <div className="relative mb-12 h-[400px] flex justify-center items-center">
              {/* Enhanced gradient background */}
              <div 
                className="absolute w-[500px] h-[500px]"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)',
                  borderRadius: '50%'
                }}
              ></div>
              <div className="relative z-10">
                <Image
                  src="/images/foxy.png"
                  alt="Fox Logo"
                  width={350}
                  height={350}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* Text Content */}
            <div className="mt-12">
              <p className="text-[23px] font-light text-white/80 leading-[1.4] mb-6">
                Our inaugural venture, is set to disrupt the<br />
                sports/lifestyle and exemplifies our commitment to<br />
                our thesis, technology and community. We're super<br />
                excited as we're developing a blueprint for the future<br />
                of industry.
              </p>
              <p className="text-[23px] font-light text-white/80 leading-[1.4] mb-10">
                Stay connected to learn more.
              </p>
              <CafeButton>
                Join Waitlist
              </CafeButton>
            </div>
            
            {/* Mobile Image */}
            <div className="block lg:hidden mt-12">
              <div className="relative h-[300px] w-full overflow-hidden rounded-3xl">
                <Image
                  src="/images/youth-in-sports.jpg"
                  alt="Youth in Sports"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 