"use client"

/**
 * Footer component - Site footer with copyright and links
 * Features:
 * - Bitcoin branding
 * - Copyright notice
 * - Quick links
 * - Minimalist design
 */

import { motion } from "framer-motion"

export function Footer() {

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold tracking-tight mb-3"
            >
              THE SNOW
            </motion.div>
            <p className="text-sm text-foreground/60">
            Digital art from my brain.
            </p>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-3">Social</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li>
                <a
                  href="https://x.com/uxerik_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  X / @uxerik_
                </a>
              </li>
              <li>
                <a
                  href="https://primal.net/erik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-500 transition-colors"
                >
                  Nostr / primal.net/erik
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold mb-3">Payment</h3>
            <p className="text-sm text-foreground/60 mb-3">
              Payments powered by Money Dev Kit. Self-custodial Bitcoin payments, deployed simply.
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}

