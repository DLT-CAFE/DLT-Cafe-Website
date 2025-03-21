'use client';

import { ButtonHTMLAttributes, forwardRef, useState } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_-1px_0_0_rgba(0,0,0,0.2)]',
  {
    variants: {
      variant: {
        default: 'bg-[#D2F381] text-black',
        outline: 'border-2 border-[#D2F381] text-black bg-transparent',
        secondary: 'bg-black text-white border border-white/20',
        link: 'text-white underline-offset-4',
      },
      size: {
        default: 'h-14 px-8 py-4 text-lg',
        sm: 'h-10 px-5 py-2.5 text-base',
        lg: 'h-16 px-10 py-5 text-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {}

const CafeButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size, ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Define hover styles based on variant
    const getHoverStyles = () => {
      if (!isHovered) return {};
      
      switch(variant) {
        case 'default':
          return { 
            backgroundColor: '#00e1af',
            boxShadow: 'inset 0 2px 0 0 rgba(255,255,255,0.4), inset 0 -2px 0 0 rgba(0,0,0,0.2)'
          };
        case 'outline':
          return {
            backgroundColor: '#00e1af',
            borderColor: '#00e1af',
            color: 'black',
            boxShadow: 'inset 0 2px 0 0 rgba(255,255,255,0.1), inset 0 -2px 0 0 rgba(0,0,0,0.1)'
          };
        case 'secondary':
          return {
            backgroundColor: '#00e1af',
            borderColor: '#00e1af',
            color: 'black',
            boxShadow: 'inset 0 2px 0 0 rgba(255,255,255,0.1), inset 0 -2px 0 0 rgba(0,0,0,0.1)'
          };
        case 'link':
          return {
            color: '#00e1af',
            textDecoration: 'underline'
          };
        default:
          return {};
      }
    };
    
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={getHoverStyles()}
        whileHover={{ 
          scale: 1.03,
          transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 17 
          }
        }}
        whileTap={{ scale: 0.97 }}
        {...props}
      />
    );
  }
);

CafeButton.displayName = 'CafeButton';

export { CafeButton, buttonVariants }; 