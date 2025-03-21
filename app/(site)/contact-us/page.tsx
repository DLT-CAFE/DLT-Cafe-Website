'use client';

import React from 'react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';

const outfit = Outfit({ subsets: ['latin'] });

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-24 mb-42">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Heading (65% width) */}
            <div className="lg:col-span-8">
              <p className="text-[#D2F381] mb-4">Contact Us</p>
              <h1 className={`${outfit.className} text-[84px] font-medium text-white leading-[1.1] mb-8`}>
                We're open, and we'd love to hear from you.
              </h1>
            </div>
            
            {/* Right Column - Coffee Cup (35% width) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-[400px] h-[500px]">
                <Image
                  src="/images/coffee-cup.png"
                  alt="Coffee Cup"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className={`${outfit.className} text-[36px] font-medium text-white mb-4`}>
                Reach Out @
              </h2>
              <p className="text-white/80 text-lg mb-2">
                Feel free to reach out using the form, alternatively you can reach us using the details below.
              </p>
              <p className="text-white/80 text-lg">
                media@dltcafe.com
              </p>
            </div>
            
            {/* Right Column - Form */}
            <div>
              <form className="space-y-6">
                {/* Name and Last Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Last Name*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                </div>
                
                {/* Phone and Email Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email*" 
                      className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                      required
                    />
                  </div>
                </div>
                
                {/* Message Field */}
                <div>
                  <textarea 
                    placeholder="Message" 
                    rows={5}
                    className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <div>
                  <button 
                    type="submit" 
                    className="bg-[#D2F381] hover:bg-[#D2F381]/90 text-black font-medium py-3 px-8 rounded transition-all"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 border-t border-white/10 my-80">
        <div className="max-w-[1220px] mx-auto px-4">
          <h2 className="text-white text-center mb-16 uppercase tracking-wider">Our Locations</h2>
          
          <div className="flex flex-col">
            {/* London - First Row */}
            <div className="flex flex-col lg:flex-row">
              {/* Text on Left */}
              <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                <h3 className={`${outfit.className} text-[36px] font-medium text-white mb-4`}>
                  London
                </h3>
                <p className="text-white/80">
                  DLT Café<br />
                  Plexal, Here East, Queen<br />
                  Elizabeth Olympic Park, London,<br />
                  E20 3BS
                </p>
              </div>
              
              {/* Image on Right */}
              <div className="w-full lg:w-1/2 h-[400px] relative">
                <Image
                  src="/images/london-office.jpg"
                  alt="London Office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Manchester - Second Row (Reversed) */}
            <div className="flex flex-col-reverse lg:flex-row">
              {/* Image on Left */}
              <div className="w-full lg:w-1/2 h-[400px] relative">
                <Image
                  src="/images/manchester-office.jpg"
                  alt="Manchester Office"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Text on Right */}
              <div className="w-full lg:w-1/2 p-6 flex flex-col justify-center">
                <h3 className={`${outfit.className} text-[36px] font-medium text-white mb-4`}>
                  Manchester
                </h3>
                <p className="text-white/80">
                  DLT Café<br />
                  Spaceworks, Oxford Street, Peter<br />
                  House, Manchester M1 5AN,<br />
                  United Kingdom
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

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
          <div className="max-w-[600px] mx-auto text-center ">
            <h3 className={`${outfit.className} text-[28px] font-medium text-white mb-8`}>
              Subscribe to our Newsletter
            </h3>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Full Name" 
                className="flex-1 bg-black/80 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="flex-1 bg-black/80 border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
              />
            </div>
            <div className="flex flex-col items-center">
              <button 
                type="submit" 
                className="bg-[#D2F381] hover:bg-[#D2F381]/90 text-black font-medium py-3 px-8 rounded w-full md:w-auto transition-all"
              >
                Submit
              </button>
              
              {/* Lightning Bolt Icon */}
              <div className="mt-8">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.4142 0L0 20.1213H10.1213L8.48528 36L22.6274 15.8787H12.5061L13.4142 0Z" fill="#D2F381"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
       
      </section>
    </main>
  );
} 