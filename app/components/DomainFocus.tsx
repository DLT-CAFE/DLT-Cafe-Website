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
              Our venture building and investments are centered around the
              convergence of the <span className="text-white font-normal">Sports, Media, Entertainment, Lifestyle,
              and Technology (SMELT).</span>
            </p>
            <p className="text-[23px] font-extralight text-white/80 leading-[1.4]">
              Each of these sector is experiencing high growth, technological
              advancements and shifting consumer behaviors creating fertile
              ground for innovation and disruption.
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
              To address the emerging needs and trends of each domain, we
              have developed a set of criteria and principles that enable us
              to quickly identify opportunities and capitalize on the gaps with
              a robust pipeline of scalable ventures that come with pre-
              launch product-market fit already integrated.
            </p>
          </motion.div>
        </div>

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