'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-[1440px] mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">
          {/* Logo Column */}
          <div className="w-full lg:w-[340px] flex flex-col items-center lg:items-start text-center lg:text-left">
            <Image
              src="/images/dltcafe-venture-logo1.svg"
              alt="DLT Cafe Ventures"
              width={220}
              height={60}
              className="mb-6"
            />
            <p className="text-[17px] font-light leading-relaxed text-white/80 mb-6">
              The world&apos;s first community powered venture studio.
            </p>
            {/* Social Icons */}
            <div className="flex gap-6 mb-8 lg:mb-0">
              <Link href="#" className="text-white/60 hover:text-[#00E1AF]">
                <TwitterIcon />
              </Link>
              <Link href="#" className="text-white/60 hover:text-[#00E1AF]">
                <YoutubeIcon />
              </Link>
              <Link href="#" className="text-white/60 hover:text-[#00E1AF]">
                <LinkedInIcon />
              </Link>
              <Link href="#" className="text-white/60 hover:text-[#00E1AF]">
                <InstagramIcon />
              </Link>
            </div>
          </div>

          {/* Menu Columns Group */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Company Links */}
            <div className="text-center lg:text-left">
              <h3 className="text-white mb-6 text-lg font-medium">Company</h3>
              <ul className="space-y-4">
                {[
                  { name: 'About', href: '#' },
                  { name: 'Blog', href: '/posts' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-[17px] font-light text-white/80 hover:text-[#00E1AF] flex items-center justify-center lg:justify-start group"
                    >
                      {item.name}
                      <ArrowUpRight 
                        className="ml-1 w-4 h-4 text-[#D2F381] opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" 
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs Links */}
            <div className="text-center lg:text-left">
              <h3 className="text-white mb-6 text-lg font-medium">Programs</h3>
              <ul className="space-y-4">
                {[
                  { name: 'Influence Academy', href: '#' },
                  { name: 'Content Factory', href: '#' },
                  { name: 'Codemasons Guild', href: '#' },
                  { name: 'Venture Ops League', href: '#' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-[17px] font-light text-white/80 hover:text-[#00E1AF] flex items-center justify-center lg:justify-start group"
                    >
                      {item.name}
                      <ArrowUpRight 
                        className="ml-1 w-4 h-4 text-[#D2F381] opacity-0 -translate-y-1 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" 
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center lg:text-left">
              <h3 className="text-white mb-2 text-lg font-medium">Contact Us</h3>
              <div className="space-y-4">
                <p className="text-[17px] font-light text-white/80">
                  DLT Cafe, Plexal
                </p>
                <p className="text-[17px] font-light text-white/80">
                  Here East, <br/>Queen Elizabeth Olympic Park, <br/>London, E20 3BS
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 mt-16 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
          <div className="flex flex-col lg:flex-row items-center gap-2 text-[17px] font-light text-white/60 text-center lg:text-left">
            <p>© 2024 DLT Cafe Ltd.</p>
            <p>Trademarks and brands are the property of their respective owners.</p>
          </div>
          <div className="flex gap-6">
            {[
              { name: 'Disclaimer', href: '#' },
              { name: 'TOS', href: '#' },
              { name: 'Privacy Policy', href: '#' },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-[17px] font-light text-white/60 hover:text-[#00E1AF]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social Icons Components
const TwitterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
); 