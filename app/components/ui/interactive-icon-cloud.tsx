"use client"

import { useEffect, useMemo, useState, useRef } from "react"
import { useTheme } from "next-themes"
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud"
import { motion } from 'framer-motion'
import TagCloud from 'TagCloud'
import Image from 'next/image'

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
}

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510"
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff"
  const minContrastRatio = theme === "dark" ? 2 : 1.2

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  })
}

export type DynamicCloudProps = {
  iconSlugs: string[]
}

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>

export function IconCloud({ iconSlugs }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null)
  const { theme } = useTheme()

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData)
  }, [iconSlugs])

  const renderedIcons = useMemo(() => {
    if (!data) return null

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, theme || "dark"),
    )
  }, [data, theme])

  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>{renderedIcons}</>
    </Cloud>
  )
}

interface TextIcon {
  id: string;
  text: string;
}

export const TextCloud = ({ icons }: { icons: TextIcon[] }) => {
  const cloudRef = useRef<any>(null);

  useEffect(() => {
    // Wait for DOM to be ready
    setTimeout(() => {
      const texts = icons.map(icon => icon.text);
      const options = {
        radius: 300,
        maxSpeed: 'normal',
        initSpeed: 'normal',
        direction: 135,
        keep: true,
      };

      try {
        // Cleanup any existing instance
        if (cloudRef.current?.destroy) {
          cloudRef.current.destroy();
        }

        // Create new instance
        // @ts-ignore
        cloudRef.current = TagCloud('.tagcloud', texts, options);
      } catch (error) {
        console.error('Error creating TagCloud:', error);
      }
    }, 100);

    // Cleanup on unmount
    return () => {
      if (cloudRef.current?.destroy) {
        cloudRef.current.destroy();
      }
    };
  }, [icons]);

  return (
    <div className="main">
      <div className="cloud-center">
        <div className="center-content">
          <div className="pulse-circle"></div>
        </div>
      </div>
      <span className="tagcloud"></span>
    </div>
  );
}; 