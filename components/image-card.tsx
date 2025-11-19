"use client"

/**
 * ImageCard component - Displays an individual artwork card
 * Features:
 * - Blurred image preview (until purchased)
 * - Price in BTC/sats
 * - Artwork metadata (title, dimensions, date)
 * - Hover animations
 * 
 * The blur effect protects the full-resolution image until payment is made
 */

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Artwork } from "@/lib/images"
import { useState, useEffect } from "react"

interface ImageCardProps {
  artwork: Artwork
  index: number
}

export function ImageCard({ artwork, index }: ImageCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)

  // Check if this artwork has been purchased (stored in localStorage)
  useEffect(() => {
    // Function to check and update purchase status
    const checkPurchaseStatus = () => {
      const purchasedItems = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
      setIsPurchased(purchasedItems.includes(artwork.id))
    }
    
    // Check on mount
    checkPurchaseStatus()
    
    // Listen for custom purchase event (same tab)
    const handlePurchaseEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ artworkId: string }>
      if (customEvent.detail?.artworkId === artwork.id) {
        checkPurchaseStatus()
      }
    }
    
    // Listen for storage changes (other tabs)
    const handleStorageChange = () => {
      checkPurchaseStatus()
    }
    
    window.addEventListener("artworkPurchased", handlePurchaseEvent)
    window.addEventListener("storage", handleStorageChange)
    
    return () => {
      window.removeEventListener("artworkPurchased", handlePurchaseEvent)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [artwork.id])
  
  // Handle purchase button click
  // TODO: Re-implement checkout when MoneyDevKit is reinstalled
  const handlePurchase = () => {
    // Checkout functionality removed - needs to be re-implemented
    console.log("Purchase functionality disabled - MoneyDevKit needs to be reinstalled")
  }

  return (
    <motion.div
      // Stagger animation based on card index
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <div className="border border-foreground/10 hover:border-foreground/30 transition-colors overflow-hidden bg-background">
        {/* Image Container with Blur Effect */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Blur Overlay - This protects the image until purchased */}
          {!isPurchased && (
            <div className="absolute inset-0 backdrop-blur-2xl bg-background/50 flex items-center justify-center z-10">
              {/* Additional blur layer for stronger protection */}
              <div className="absolute inset-0 backdrop-blur-2xl bg-background/40"></div>
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="text-center relative z-20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 mx-auto mb-2 opacity-50"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
                <p className="text-sm font-medium opacity-70">Locked</p>
              </motion.div>
            </div>
          )}
          
          {/* Unlocked Badge - Show when artwork is purchased */}
          {isPurchased && (
            <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Unlocked
            </div>
          )}
        </div>

        {/* Card Content - Artwork Information */}
        <div className="p-6 space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="text-xl font-bold mb-1">{artwork.title}</h3>
            <p className="text-sm text-foreground/60">{artwork.description}</p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-foreground/50 mb-1">Dimensions</p>
              <p className="font-medium">{artwork.dimensions}</p>
            </div>
            <div>
              <p className="text-foreground/50 mb-1">Created</p>
              <p className="font-medium">{new Date(artwork.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Price Display */}
          <div className="pt-4 border-t border-foreground/10">
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-foreground/50 text-xs mb-1">Price</p>
                <p className="text-2xl font-bold text-orange-500 font-mono">
                  ₿{artwork.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Purchase Button - Only show if not purchased */}
            {!isPurchased ? (
              <motion.button
                onClick={handlePurchase}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#00D632] text-white font-semibold transition-colors hover:bg-[#00C02E] flex items-center justify-center gap-2"
              >
                <Image
                  src="/images/cash-app.png"
                  alt="Cash App"
                  width={20}
                  height={20}
                  className="object-contain drop-shadow-none"
                  style={{ filter: 'none', boxShadow: 'none' }}
                />
                Pay With Cashapp
              </motion.button>
            ) : (
              <div className="space-y-3">
                <div className="w-full py-3 bg-green-500/10 border border-green-500/20 text-green-500 font-semibold text-center rounded">
                  ✓ Purchased
                </div>
                <Link
                  href={`/artwork/${artwork.id}`}
                  className="block w-full py-3 border border-foreground/20 text-center font-semibold hover:border-foreground/40 transition-colors rounded"
                >
                  View
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

