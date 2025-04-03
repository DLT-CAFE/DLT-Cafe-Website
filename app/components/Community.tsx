'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export function Community() {
  return (
    <section className="w-full bg-black py-32">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-16 mb-32">
          {/* Left Column - Main Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[52px] font-medium text-white leading-tight font-outfit">
              Community equity means every member has a stake in the ventures they help create.
            </h2>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-[23px] font-extralight text-white/80 leading-[1.4]">
              We believe in the power of community-driven innovation and we want to reshape the landscape of venture building by creating high-growth companies that prioritize collaboration and shared success.
            </p>
            <p className="text-[23px] font-extralight text-white/80 leading-[1.4]">
              Our inspiration comes from cooperative principles, decentralized organizations and the spirit of collective entrepreneurship.
            </p>
            <p className="text-[23px] font-extralight text-white/80 leading-[1.4]">
              We&apos;ve developed a Community Equity Model that ensures every member is not just a contributor but a stakeholder, ensuring that the fruits of our labor are shared equitably.
            </p>
          </motion.div>
        </div>

        {/* Together Section */}
        <div className="text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[44px] font-medium text-white mb-6 font-outfit"
          >
            Together we can
          </motion.h3>

          {/* Neon Sign Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative h-[435px] w-full"
          >
            <Image
              src="/images/great-1024x435.jpg"
              alt="Do Something Great"
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 