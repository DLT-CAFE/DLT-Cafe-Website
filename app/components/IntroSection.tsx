'use client';

import { motion } from 'framer-motion';

export function IntroSection() {
  return (
    <>
      {/* Intro Section */}
      <section className="w-full bg-black py-32">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="flex justify-between items-start gap-16">
            {/* Left Column - Text Content */}
            <div className="w-[50%]">
              <h2 className="text-[52px] font-medium text-white mb-2 leading-tight font-outfit">
                Incoming Tsunami's & The Rise of the Venture Collective
              </h2>
              <div className="flex flex-col gap-6">
                <p className="text-[23px] font-extralight text-white leading-[1.4]">
                  Timing is everything, We're entering a new era of innovation. confluence of new technologies, new business models, and new ways of working. We've kept our finger on the pulse, meticulously tracking every shift across society and business. By collecting and analyzing countless streams of data, we've confirmed our hypothesis: an immense wave of transformative technologies and business models is on the horizon. Over the next five years, this surge will reshape industries, topple entire sectors, and redefine the way we live and work.
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

            {/* Right Column - Word Cloud Placeholder */}
            <div className="w-[50%] h-[500px] bg-black/20 rounded-2xl">
              {/* Word cloud will be implemented here */}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="w-full bg-black py-32">
        <div className="max-w-[1220px] mx-auto px-4">
          <div className="max-w-[946px] mx-auto text-center">
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
          </div>
        </div>
        <div className="mx-auto mb-10 max-w-6xl px-2 md:mb-20 xl:px-0">
          <div className="relative flex flex-col items-center border border-white/20 rounded-lg p-4">
            <div className="absolute -left-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
            <div className="absolute -bottom-1.5 -left-1.5 h-3 w-3 bg-[#d2f381] text-white" />
            <div className="absolute -right-1.5 -top-1.5 h-3 w-3 bg-[#d2f381] text-white" />
            <div className="absolute -bottom-1.5 -right-1.5 h-3 w-3 bg-[#d2f381] text-white" />

            <div className="relative z-20 mx-auto max-w-7xl rounded-[40px] py-6 md:p-10 xl:py-20">
              <div className="text-2xl tracking-tighter md:text-5xl lg:text-7xl xl:text-8xl font-semibold text-white">
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
      </section>
    </>
  );
} 