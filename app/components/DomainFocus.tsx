'use client';

import { motion } from 'framer-motion';

export function DomainFocus() {
  return (
    <section className="w-full bg-black py-32">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-[52px] font-medium text-white leading-tight font-outfit">
            Our Domain Focus
          </h2>
        </motion.div>

        {/* Two Column Text Layout */}
        <div className="grid grid-cols-2 gap-16 mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[23px] font-extralight text-white/100 leading-[1.4] mb-6">
              Our venture building and investments are at the intersection of <span className="text-white font-normal">Sports, Media, Entertainment, Lifestyle,
              and Technology</span> - a convergence we call <strong>SMELT</strong>
            </p>
            <p className="text-[23px] font-extralight text-white/80 leading-[1.4]">
            These culturally charged sectors are being redefined by shifts in consumer behavior, exponential tech, and new forms of digital ownership, identity, and interaction. This creates a rich environment for scalable, disruptive ventures.
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-[23px] font-extralight text-white/80 leading-[1.4]">
            While SMELT is our core focus, we also pursue Special Operations — high-conviction, out-of-scope plays where we have strategic edge. These include category-agnostic SaaS platforms, marketplaces, and productivity tools aligned with our broader thesis on leverage, network effects, and future infrastructure.
            </p>
            <p className="text-[23px] font-extralight text-white/80 leading-[1.4]">
            Our venture framework is designed to identify and launch opportunities with built-in distribution, product-market alignment, and cultural relevance from day one.
            </p>
          </motion.div>
        </div>
        <a href="/investment-thesis" className="text-[23px] font-bold text-white/80 leading-[1.4] inline-flex items-center transition-all duration-300 ease-in-out hover:text-[#D2F381] mb-16">
          → Learn more about our investment thesis and criteria.
        </a>

        {/* SMELT Gallery Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full h-[500px]"
        >
          <iframe 
            src="https://dltcafe.com/smelt-gallery/"
            className="w-full h-full border-0"
            title="SMELT Gallery"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </motion.div>
      </div>
    </section>
  );
} 