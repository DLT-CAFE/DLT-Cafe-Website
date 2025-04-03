import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';
import { NewsletterForm } from '@/app/components/NewsletterForm';

const outfit = Outfit({ subsets: ['latin'] });

export default function InfluencerAcademyPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative min-h-[100svh] w-full flex">
        {/* Two Column Layout - First column content, Second column image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Left Column - Content */}
          <div className="flex items-center justify-center z-10">
            <div className="max-w-[600px] mx-auto px-8 py-12 lg:py-0 text-center">
              <div className="mb-8 mx-auto">
                <Image 
                  src="/images/tia-logo.png" 
                  alt="Influence Academy Logo" 
                  width={600} 
                  height={179}
                  priority
                  className="w-auto h-auto"
                  quality={100}
                />
              </div>
              
              <p className="text-white text-3xl mb-8 font-extralight">
                A new paradigm for marketing—where creators build wealth, gain influence, and 
                secure equity.
              </p>
              
              <Link 
                href="https://dltcafe.com/influence-academy" 
                target="_blank"
                className="inline-block"
              >
                <button className="bg-[#D2F381] hover:bg-[#c5e36c] text-black font-medium py-3 px-10 rounded transition-all">
                  Learn More
                </button>
              </Link>
              <p className="text-white text-xs mt-2">Opens in new window</p>
            </div>
          </div>

          {/* Right Column - Full Height/Width Image */}
          <div className="relative h-[50vh] lg:h-screen lg:min-h-[100svh] w-full order-first lg:order-last">
            <Image
              src="/images/influencer-0.webp"
              alt="Influencer Academy"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Social Buttons */}
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-6 z-20">
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#D2F381] hover:bg-[#c5e36c] w-10 h-10 flex items-center justify-center rounded-lg text-black transition-all"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#D2F381] hover:bg-[#c5e36c] w-10 h-10 flex items-center justify-center rounded-lg text-black transition-all"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#D2F381] hover:bg-[#c5e36c] w-10 h-10 flex items-center justify-center rounded-lg text-black transition-all"
            aria-label="YouTube"
          >
            <FaYoutube size={20} />
          </a>
        </div>
      </section>

      {/* Spacer Div */}
      <div className="h-[100px] w-full" id="section-spacer-1"></div>

      {/* Bottom Section */}
      <section className="py-16 relative">
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
        
      </section>

      {/* Spacer Div */}
      <div className="h-[100px] w-full" id="section-spacer-4"></div>
    </main>
  );
} 