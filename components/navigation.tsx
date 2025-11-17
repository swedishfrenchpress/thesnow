"use client"

/**
 * Navigation component - The main header/navbar for the site
 * Features:
 * - Sticky positioning that stays at top while scrolling
 * - Smooth animations when scrolling
 * - Links to different sections
 * - Theme toggle button
 * - Responsive design with mobile menu
 */

import { motion, useScroll } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { useEffect, useState } from "react"

export function Navigation() {
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  // Track scroll position to add background blur when scrolled
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold tracking-tight"
            >
              THE SNOW
            </motion.div>
          </Link>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

/**
 * NavLink component - Individual navigation link with hover animation
 */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ y: -2 }}
        className="text-sm font-medium hover:text-orange-500 transition-colors cursor-pointer"
      >
        {children}
      </motion.span>
    </Link>
  )
}

