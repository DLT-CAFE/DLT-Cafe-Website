'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { CafeButton } from './ui/CafeButton';
import { useState } from 'react';

const tabs = [
  { id: 'venture-001', label: 'Venture 001' },
  { id: 'venture-002', label: 'Venture 002' },
  { id: 'venture-003', label: 'Venture 003' }
];

export function InStudio() {
  const [activeTab, setActiveTab] = useState('venture-001');

  return (
    <section className="w-full bg-black pt-32">
      {/* IN STUDIO Header */}
      <div className="w-full border-t border-b border-white/10 py-6 mb-20">
        <div className="max-w-[1220px] mx-auto px-4">
          <h2 className="text-[5rem] font-extrabold text-white font-outfit tracking-wider">
            IN <span className="text-[#D2F381]">STUDIO</span>
          </h2>
        </div>
      </div>
      
      {/* Tabs Navigation */}
      <div className="max-w-[1220px] mx-auto px-4 mb-16">
        <div className="flex gap-2 p-1 border border-white/10 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                ? 'bg-white/10 text-[#D2F381]'
                : 'text-white/60 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1220px] mx-auto px-4">
        {activeTab === 'venture-001' && (
          <>
            {/* Divider line */}
            <div className="mb-8">
              <div className="w-28 h-px bg-white/30"></div>
            </div>
            
            {/* Cafe Venture 001 Header */}
            <div className="mb-8">
              <h3 className="text-xl text-white font-outfit">
                Cafe Venture <span className="text-[#D2F381]">001</span>
              </h3>
            </div>

            {/* Two Column Layout */}
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
                <div className="relative mb-12 h-[400px] flex justify-center items-center">
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
                
                <div className="mt-12">
                  <p className="text-[23px] font-light text-white/80 leading-[1.4] mb-6">
                    Our inaugural venture, is set to disrupt the<br />
                    sports/lifestyle and exemplifies our commitment to<br />
                    our thesis, technology and community. We&apos;re super<br />
                    excited as we&apos;re developing a blueprint for the future<br />
                    of industry.
                  </p>
                  <p className="text-[23px] font-light text-white/80 leading-[1.4] mb-10">
                    Stay connected to learn more.
                  </p>
                  <CafeButton>
                    Join Waitlist
                  </CafeButton>
                </div>
                
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
          </>
        )}

        {activeTab === 'venture-002' && (
          <>
            {/* Divider line */}
            <div className="mb-8">
              <div className="w-28 h-px bg-white/30"></div>
            </div>
            
            {/* Cafe Venture 002 Header */}
            <div className="mb-8">
              <h3 className="text-xl text-white font-outfit">
                Cafe Venture <span className="text-[#D2F381]">002</span>
              </h3>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 pr-8">
                <h2 className="text-[88px] font-medium text-white leading-[0.95] font-outfit mb-12">
                  Reimagining<br />
                  the future of<br />
                  healthcare.
                </h2>
                <p className="text-[23px] font-light text-white/80 leading-[1.4] mb-10">
                  Our second venture focuses on revolutionizing healthcare<br />
                  accessibility through AI-powered diagnostics and<br />
                  personalized medicine. Coming soon in 2024.
                </p>
                <CafeButton>
                  Learn More
                </CafeButton>
              </div>
              
              <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                <div className="relative h-[600px] w-full overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D2F381]/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'venture-003' && (
          <>
            {/* Divider line */}
            <div className="mb-8">
              <div className="w-28 h-px bg-white/30"></div>
            </div>
            
            {/* Cafe Venture 003 Header */}
            <div className="mb-8">
              <h3 className="text-xl text-white font-outfit">
                Cafe Venture <span className="text-[#D2F381]">003</span>
              </h3>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 pr-8">
                <h2 className="text-[88px] font-medium text-white leading-[0.95] font-outfit mb-12">
                  Sustainable<br />
                  future for<br />
                  everyone.
                </h2>
                <p className="text-[23px] font-light text-white/80 leading-[1.4] mb-10">
                  Our third venture combines blockchain technology<br />
                  with environmental sustainability to create<br />
                  transparent and impactful green initiatives.
                </p>
                <div className="flex gap-4">
                  <CafeButton>
                    Coming Soon
                  </CafeButton>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                <div className="relative h-[600px] w-full overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-bl from-[#D2F381]/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Border */}
      <div className="w-full border-t border-b border-white/10 py-6 mt-20">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="h-2"></div>
        </div>
      </div>
    </section>
  );
} 