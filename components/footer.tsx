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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold tracking-tight mb-3"
            >
              memoria
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

          {/* Payment */}
          <div>
            <h3 className="font-semibold mb-3">Payment</h3>
            <p className="text-sm text-foreground/60 mb-3">
              Powered by <a
                href="https://moneydevkit.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted underline-offset-4 hover:text-orange-500 transition-colors"
              >
                moneydevkit
              </a>.
            </p>
          </div>

          {/* Steal this art */}
          <div>
            <h3 className="font-semibold mb-3">Steal this art</h3>
            <p className="text-sm text-foreground/60 mb-2">
              Use your browser&apos;s inspect mode to snipe all the images.
            </p>
            <ol className="text-xs text-foreground/50 space-y-1 list-decimal list-inside">
              <li>Right-click on a blurred image</li>
              <li>Select &quot;Inspect&quot; or &quot;Inspect Element&quot;</li>
              <li>Find the image element in the code</li>
              <li>Copy the image URL from the src attribute</li>
            </ol>
          </div>
        </div>

      </div>
    </footer>
  )
}

