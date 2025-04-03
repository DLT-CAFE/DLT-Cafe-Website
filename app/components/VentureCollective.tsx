'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const programs = [
  {
    title: 'Influence Academy',
    description: 'The art and science of social influence and organic marketing.',
    image: '/images/influence-academy.png', 
    status: 'Apply Now',
    link: '#'
  },
  {
    title: 'Content Factory',
    description: 'Crafting multi-modal, compelling content at scale.',
    image: '/images/content-factory.jpeg',
    status: 'Coming Soon',
    link: '#'
  },
  {
    title: 'Codemasons Guild',
    description: 'Architecting and engineering ideas into reality.',
    image: '/images/codemasons-guild.jpg',
    status: 'Coming Soon',
    link: '#'
  },
  {
    title: 'League of Venture Ops',
    description: 'Master and leverage the operations of success.',
    image: '/images/venture-ops.jpg',
    status: 'Invite Only',
    link: '#'
  }
];

export function VentureCollective() {
  const { theme } = useTheme();

  return (
    <section className="w-full bg-black py-32">
      <div className="max-w-[1440px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#D2F381] uppercase tracking-wider text-sm mb-4"
          >
            Introducing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[44px] font-medium text-white mb-6 font-outfit"
          >
            The Venture Collective
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[23px] font-light text-white/80 max-w-[800px] mx-auto leading-[1.4]"
          >
            At the heart of DLT Cafe lies four communities. When combined together, they turn ideas into reality and the impossible into the possible.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-4 gap-6 mb-16">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="relative group"
            >
                <MagicCard
                  className="w-full h-full bg-black/10 backdrop-blur-sm rounded-lg"
                >
                    <div className="relative w-full h-full">
                    <Link href={program.link} className="block w-full h-full">
            
                <div className="relative h-[420px] overflow-hidden rounded-lg">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/90" />
                  </div>

                  {/* Status Ribbon */}
                  <div className="absolute top-6 right-6">
                    <div className="bg-[#D2F381] text-black px-4 py-2 text-sm font-medium rounded-full">
                      {program.status}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-[28px] font-medium text-white mb-2 font-outfit">
                      {program.title}
                    </h3>
                    <p className="text-white/80 text-[17px] font-light mb-6">
                      {program.description}
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center gap-2 text-[#D2F381] text-sm font-medium"
                    >
                      Learn more
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
              </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 