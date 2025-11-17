"use client"

/**
 * Gallery component - Main gallery section displaying all artwork
 * Features:
 * - Responsive grid layout (1, 2, or 3 columns based on screen size)
 * - Smooth scroll animations
 * - Collection of ImageCard components
 * - Section header with title
 */

import { motion } from "framer-motion"
import { ImageCard } from "./image-card"
import { artworks } from "@/lib/images"

export function Gallery() {
  return (
    <section id="gallery" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
          Alternative realities that should exist.
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">
          Made these in Midjourney, they&apos;re a window into my head. The kind of sci-fi world I think would be cool to see. You can buy them if you want. Payments powered by <a href="http://moneydevkit.com/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Money Dev Kit</a>.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork, index) => (
            <ImageCard key={artwork.id} artwork={artwork} index={index} />
          ))}
        </div>

        {/* Load More Section (placeholder for future functionality) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
        </motion.div>
      </div>
    </section>
  )
}

