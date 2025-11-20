"use client"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { artworks, Artwork } from "@/lib/images"
import { motion } from "framer-motion"
// Import the useCheckout hook from MoneyDevKit to handle Lightning payments
import { useCheckout } from "@moneydevkit/nextjs"

function ArtworkContent({ artwork }: { artwork: Artwork }) {
  const [isPurchased, setIsPurchased] = useState(false)
  const router = useRouter()
  
  // Initialize the MoneyDevKit checkout hook
  // navigate() creates a checkout session and redirects to the payment page
  // isNavigating indicates if we're currently creating the checkout session
  const { navigate, isNavigating } = useCheckout()

  useEffect(() => {
    const purchased = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
    setIsPurchased(purchased.includes(artwork.id))

    const handlePurchaseEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ artworkId: string }>
      if (customEvent.detail?.artworkId === artwork.id) {
        const updated = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
        setIsPurchased(updated.includes(artwork.id))
      }
    }

    window.addEventListener("artworkPurchased", handlePurchaseEvent)
    window.addEventListener("storage", handlePurchaseEvent)
    return () => {
      window.removeEventListener("artworkPurchased", handlePurchaseEvent)
      window.removeEventListener("storage", handlePurchaseEvent)
    }
  }, [artwork.id])

  /**
   * Handle the purchase button click
   * 
   * When the user clicks "Pay with Cash App", this function:
   * 1. Calls navigate() from the useCheckout hook
   * 2. Creates a Lightning invoice for 20 sats
   * 3. Redirects the user to the checkout page
   * 4. After payment, MDK redirects to the success page with artworkId
   */
  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Create a checkout session and navigate to the payment page
    navigate({
      title: `Purchase: ${artwork.title}`,
      description: `Unlock full-resolution download of "${artwork.title}"`,
      amount: 20,              // 20 sats per image (as requested)
      currency: 'SAT',         // Bitcoin satoshis
      metadata: {
        type: 'artwork_purchase',
        artworkId: artwork.id, // Store artwork ID to track which item was purchased
        // The success URL will include the artworkId in the query string
        successUrl: `/checkout/success?artworkId=${artwork.id}`
      }
    })
  }

  if (!isPurchased) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-3xl font-bold">Unlock this artwork</h1>
          <p className="text-foreground/70">
            This download page unlocks after purchase. Complete the Lightning checkout to
            access the full-resolution file anytime.
          </p>
          <div className="space-y-3">
            {/* 
              Payment button that triggers Lightning checkout
              - Shows loading state while creating checkout session
              - Displays Cash App logo for brand recognition
              - Disabled while navigating to prevent double-clicks
            */}
            <motion.button
              whileHover={{ scale: isNavigating ? 1 : 1.02 }}
              whileTap={{ scale: isNavigating ? 1 : 0.98 }}
              onClick={handlePurchase}
              disabled={isNavigating}
              className={`w-full py-3 font-semibold transition-colors flex items-center justify-center gap-2 ${
                isNavigating 
                  ? 'bg-gray-400 text-white cursor-wait opacity-70' 
                  : 'bg-[#00D632] hover:bg-[#00C12B] text-white cursor-pointer'
              }`}
            >
              <Image
                src="/images/cash-app.png"
                alt="Cash App"
                width={20}
                height={20}
                className="object-contain drop-shadow-none"
                style={{ filter: 'none', boxShadow: 'none' }}
              />
              {isNavigating ? 'Creating checkout...' : 'Pay with Cash App (20 sats)'}
            </motion.button>
            <Link
              href="/"
              className="block w-full py-3 border border-foreground/20 text-sm rounded hover:border-foreground/40 transition-colors"
            >
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-green-500/80">Unlocked</p>
          <h1 className="text-4xl sm:text-5xl font-bold">{artwork.title}</h1>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto">{artwork.description}</p>
        </div>

        <div className="bg-background border border-foreground/10">
          <div className="relative aspect-[4/5] sm:aspect-square w-full">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-foreground/50">Dimensions</p>
                <p className="font-medium">{artwork.dimensions}</p>
              </div>
              <div>
                <p className="text-foreground/50">Created</p>
                <p className="font-medium">{new Date(artwork.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={artwork.imageUrl}
                download
                className="flex-1 py-3 bg-foreground text-background font-semibold text-center hover:bg-foreground/90 transition-colors"
              >
                Download full resolution
              </a>
              <button
                onClick={() => router.push("/")}
                className="flex-1 py-3 border border-foreground/20 hover:border-foreground/40 transition-colors rounded"
              >
                Back to gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ArtworkPage() {
  const params = useParams()
  const artwork = artworks.find((art) => art.id === params?.id)

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24 text-center space-y-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Artwork not found</h1>
          <p className="text-foreground/70 mb-6">Double-check the link or head back home.</p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 border border-foreground/20 rounded hover:border-foreground/40 transition-colors"
          >
            Return to gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ArtworkContent artwork={artwork} />
    </Suspense>
  )
}


