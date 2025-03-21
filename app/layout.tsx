import "./globals.css";
import "../styles/post-content.css";

import type { Metadata } from "next";
import { Inter, Hanken_Grotesk, Outfit } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import localFont from 'next/font/local';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/site.config";
import { Footer } from './components/Footer';
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import Navigation from './components/Navigation';

import Balancer from "react-wrap-balancer";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-output",
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Domain of Limitless Talent Cafe",
  description: "Venture Capital x Venture Studio reimagined with a fresh dose of creative and collective intelligence.",
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen font-sans antialiased",
        hankenGrotesk.variable,
        outfit.variable,
        spaceGrotesk.variable,
        inter.variable,
        "font-hanken-grotesk"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
          >
            <Navigation />
            {children}
            <Footer />
            <Analytics />
          </NextThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
