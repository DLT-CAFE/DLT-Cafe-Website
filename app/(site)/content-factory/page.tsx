import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const outfit = Outfit({ subsets: ['latin'] });

export default function ContentFactoryPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Hero Section - Full Width */}
      <section className="relative min-h-[100svh] w-full flex">
        {/* Two Column Layout - First column content, Second column image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          {/* Left Column - Content */}
          <div className="flex items-center justify-center z-10 px-8 lg:px-16 pt-14">
            <div className="w-full text-center">
              <div className="mb-4 mx-auto" style={{ maxWidth: "370px" }}>
                <Image 
                  src="/images/dltc-content-factory.png" 
                  alt="DLT Content Factory Logo" 
                  width={369} 
                  height={290}
                  priority
                  quality={100}
                />
              </div>
              
              <h2 className="text-[#D2F381] text-3xl mb-2 tracking-wider font-medium">THE CONTENT FACTORY</h2>
              
              <p className="text-white text-3xl mb-4 font-extralight">
              Scaling content creation to infinity and beyond
              </p>
              
              <h1 className="text-white text-7xl md:text-9xl font-black mb-4 tracking-tight leading-none">COMING SOON</h1>
              
              <Link 
                href="https://dltcafe.com/content-factory-apply" 
                target="_blank"
                className="inline-block"
              >
                <button className="bg-[#D2F381] hover:bg-[#c5e36c] text-black font-medium py-3 px-10 rounded transition-all">
                  Apply to Join
                </button>
              </Link>
              <p className="text-[#D2F381] text-sm mt-4 hover:underline cursor-pointer">
                <Link href="https://dltcafe.com/content-factory-invite">Already have an invite?</Link>
              </p>
            </div>
          </div>

          {/* Right Column - Full Height/Width Image */}
          <div className="relative h-[50vh] lg:h-screen lg:min-h-[100svh] w-full order-first lg:order-last">
            <Image
              src="/images/craft-content.jpg"
              alt="Content Factory"
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
      <div className="h-[200px] w-full" id="section-spacer-4"></div>

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
      
      {/* Spacer Div */}
      <div className="h-[100px] w-full" id="section-spacer-4"></div>
    </main>
  );
} 