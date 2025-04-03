'use client';

import { motion } from 'framer-motion';
import { IconCloudDemo } from './ui/icon-cloud-demo';

export function IntroSection() {
  return (
    <>
      {/* Intro Section */}
      <section className="w-full bg-black py-32">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="flex justify-between items-center gap-16">
            {/* Left Column - Text Content */}
            <div className="w-[50%]">
              <h2 className="text-[52px] font-medium text-white mb-2 leading-tight font-outfit">
                Incoming Tsunami's & The Rise of the Venture Collective
              </h2>
              <div className="flex flex-col gap-6">
                <p className="text-[23px] font-extralight text-white leading-[1.4]">
                Timing is everything, and we've been waiting for this moment for a long time. We've been listening to the signals others ignore — tracking subtle shifts, filtering the noise, and analyzing emergent patterns. <br/><strong>Our thesis is now confirmed: a transformational tsunami isn't coming — it's already here.</strong> <br/><br/> We now stand at the dawn of a new world order, driven by a confluence of breakthrough technologies, disruptive models, and unspoken rules. What comes next is inevitable: an innovation arms race that will lead to the dismantling of legacy systems, the unraveling of giants, the reshaping of culture — and a fundamental reimagining of how we live, work, and play.
                </p>
                <div>
                  <h2 className="text-[44px] font-medium text-white mb-2 leading-tight font-outfit">
                    Why We're Here
                  </h2>
                  <p className="text-[23px] font-extralight text-white leading-[1.4]">
                    In response, we're pioneering a new model of business creation — one that's <span className="text-white font-normal">agile, tech-driven, and community-powered</span>. We call it <span className="text-white font-normal">the venture collective</span>: a more collaborative, future-ready approach to designing, building, and scaling tomorrow's most disruptive startups.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Interactive Icon Cloud */}
            <div className="w-[50%] h-[600px] flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center rounded-2xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm">
                <IconCloudDemo />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full bg-black py-32">
        <div className="max-w-[1220px] mx-auto px-4">
          {/* <div className="max-w-[946px] mx-auto text-center">
            <motion.blockquote 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[44px] font-medium text-white leading-[1.2] font-outfit"
            >
              "The future of innovation lies not in individual genius, but in the collective intelligence of communities working together."
            </motion.blockquote>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-[23px] font-light text-white/60"
            >
              — James Smith, Founder & CEO
            </motion.div>
          </div> */}
        </div>
        <div className="mx-auto mb-10 max-w-6xl px-2 md:mb-20 xl:px-0">
          <div className="relative flex flex-col items-center border border-white/20 rounded-lg p-4">
            <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#d2f381] text-white" />
            <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#d2f381] text-white" />

            <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
              <div className="text-2xl tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl font-semibold text-white">
                <div className="flex flex-col">
                  
                  <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                    <h1 className="font-semibold">"If ideas</h1>
                    <p className="font-thin">are <span className="font-semibold">nothing</span></p>
                  </div>
                  <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                    <p className="font-thin">without</p>
                    <h1 className="font-semibold text-[#d2f381]">execution,</h1>
                    <p className="font-semibold">what</p>
                  </div>
                  <div className="flex gap-1 md:gap-2 lg:gap-3 xl:gap-4">
                    <p className="font-semibold">happens <span className="font-thin pl-1">when</span></p>
                    <h1 className="font-thin">the<span className="font-semibold text-[#d2f381] pl-4">cost</span> </h1>
                  </div>
                  <h1 className="font-thin">to execute <span className="font-semibold text-[#d2f381] pl-1">drops</span>  to</h1>
                  <h1 className="font-thin">near <span className="font-semibold text-[#d2f381] pl-1">zero</span>? "</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 