'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function JoinForm() {
  return (
    <section className="w-full bg-black py-32">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[44px] md:text-[52px] font-medium text-white leading-tight font-outfit text-center max-w-[1100px] mx-auto mb-16">
            If you're an influencer, entrepreneur, creative, technologist, investor or member of the public and want to help redefine what's possible, build great companies?
          </h2>
          
          <h3 className="text-[36px] font-medium text-white font-outfit mb-6">
            Then apply to join the
          </h3>
          
          <h2 className="text-[68px] font-medium font-outfit mb-16">
            <span className="text-[#D2F381]">Domain of Limitless </span>
            <span className="text-[#0fe0bc]">Talent</span>
            <span className="text-white"> Cafe</span>
          </h2>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[600px] mx-auto"
        >
          <form className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
                />
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent border border-white/20 rounded-md px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#D2F381]"
              />
            </div>
            
            {/* Checkbox Group */}
            <div className="pt-4">
              <p className="text-white mb-3">I am a*</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Influencer</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Creator</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Operator</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Dev or Engineer</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Investor</span>
                </label>
                <label className="flex items-center space-x-2 text-white cursor-pointer">
                  <input type="checkbox" className="form-checkbox" />
                  <span>Other</span>
                </label>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex flex-col items-center">
              <button 
                type="submit" 
                className="bg-[#D2F381] hover:bg-[#D2F381]/90 text-black font-medium py-3 px-8 rounded w-40 transition-all"
              >
                Submit
              </button>
              
              {/* Lightning Bolt Icon */}
              <div className="mt-6">
                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.4142 0L0 20.1213H10.1213L8.48528 36L22.6274 15.8787H12.5061L13.4142 0Z" fill="#D2F381"/>
                </svg>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
} 