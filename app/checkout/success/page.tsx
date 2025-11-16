"use client"

/**
 * Success page shown after successful payment
 * Users are redirected here after completing their Lightning payment
 * Displays the purchased artwork and stores the purchase in localStorage
 */

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { artworks, Artwork } from "@/lib/images"

// Component that uses useSearchParams - must be wrapped in Suspense
function SuccessContent() {
  const searchParams = useSearchParams()
  const artworkId = searchParams.get("artworkId")
  const [artwork, setArtwork] = useState<Artwork | null>(null)

  // Find the artwork and store purchase in localStorage
  useEffect(() => {
    if (artworkId) {
      // Find the artwork from our collection
      const purchasedArtwork = artworks.find((art) => art.id === artworkId)
      if (purchasedArtwork) {
        setArtwork(purchasedArtwork)
        
        // Store purchased artwork ID in localStorage
        // This allows us to show it as "unlocked" when user returns to gallery
        const purchasedItems = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
        if (!purchasedItems.includes(artworkId)) {
          purchasedItems.push(artworkId)
          localStorage.setItem("purchasedArtworks", JSON.stringify(purchasedItems))
          
          // Dispatch custom event to notify other components of the purchase
          // This allows the gallery to update immediately if user navigates back
          window.dispatchEvent(new CustomEvent("artworkPurchased", { detail: { artworkId } }))
        }
      }
    }
  }, [artworkId])

  // If no artwork ID, show basic success message
  if (!artworkId || !artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-foreground/70 mb-8">
            Thank you for your purchase. Your artwork has been unlocked and is ready to download.
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
            >
              Back to Gallery
            </motion.button>
          </Link>
        </motion.div>
      </div>
    )
  }

  // Show the purchased artwork
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-foreground/70">
            Your artwork has been unlocked and is ready to view.
          </p>
        </motion.div>

        {/* Artwork Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-background border border-foreground/10 overflow-hidden"
        >
          {/* Full-resolution artwork image - no blur! */}
          <div className="relative aspect-square w-full">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>

          {/* Artwork Information */}
          <div className="p-6 sm:p-8 space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{artwork.title}</h2>
              <p className="text-lg text-foreground/70">{artwork.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-foreground/10">
              <div>
                <p className="text-foreground/50 text-sm mb-1">Dimensions</p>
                <p className="font-medium">{artwork.dimensions}</p>
              </div>
              <div>
                <p className="text-foreground/50 text-sm mb-1">Created</p>
                <p className="font-medium">{new Date(artwork.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 space-y-4"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
            >
              Back to Gallery
            </motion.button>
          </Link>
          
          <p className="text-sm text-foreground/50 text-center">
            You will receive a confirmation email shortly.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
          <p className="text-foreground/70">Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}

