"use client"

/**
 * Gallery component - Main gallery section displaying all artwork
 * Features:
 * - Hero image with overlaid text
 * - Responsive grid layout (1, 2, or 3 columns based on screen size)
 * - Smooth scroll animations
 * - Collection of ImageCard components
 * - Section header with title
 */

import { motion } from "framer-motion"
import Image from "next/image"
import { ImageCard } from "./image-card"
import { artworks } from "@/lib/images"

export function Gallery() {
  return (
    <section id="gallery" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Image with Overlaid Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[50vh] mb-12 overflow-hidden rounded-lg"
        >
          {/* Hero Image */}
          <Image
            src="/images/hero.png"
            alt="Hero"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Text Overlay - centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-tight text-center mb-4"
            >
              Alternative realities that should exist.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl text-center"
            >
              A window info the kind of sci-fi world I think would be cool to see.
            </motion.p>
          </div>
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

