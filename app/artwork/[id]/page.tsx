"use client"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { artworks, Artwork } from "@/lib/images"
import { motion } from "framer-motion"
import { useCheckout } from "@moneydevkit/nextjs"

function ArtworkContent({ artwork }: { artwork: Artwork }) {
  const [isPurchased, setIsPurchased] = useState(false)
  const router = useRouter()
  
  // Initialize the checkout hook from Money Dev Kit
  // This gives us the navigate function to start a payment
  // and isNavigating to show loading state
  const { navigate, isNavigating } = useCheckout()

  useEffect(() => {
    // Check if this artwork has been purchased before
    const purchased = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
    setIsPurchased(purchased.includes(artwork.id))

    // Check if we're returning from a successful payment
    // The URL will have ?payment=success if the payment completed
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('payment') === 'success') {
      // Mark this artwork as purchased
      const purchasedArtworks = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
      if (!purchasedArtworks.includes(artwork.id)) {
        purchasedArtworks.push(artwork.id)
        localStorage.setItem("purchasedArtworks", JSON.stringify(purchasedArtworks))
        setIsPurchased(true)
        
        // Dispatch a custom event so other components know about the purchase
        window.dispatchEvent(
          new CustomEvent("artworkPurchased", {
            detail: { artworkId: artwork.id }
          })
        )
      }
      
      // Clean up the URL by removing the payment parameter
      // This prevents re-triggering if the user refreshes the page
      window.history.replaceState({}, '', `/artwork/${artwork.id}`)
    }

    // Listen for purchase events from other tabs or windows
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
   * Handle Purchase Button Click
   * 
   * This function is called when the user clicks "Pay With Cashapp"
   * It initiates a Lightning Network payment using Money Dev Kit
   * 
   * How it works:
   * 1. User clicks the button
   * 2. We call navigate() with the payment details
   * 3. User is taken to a payment page to complete the transaction
   * 4. After payment, they're redirected back to our success page
   * 5. The webhook confirms the payment and we unlock the artwork
   */
  const handlePurchase = async () => {
    try {
      // Navigate to the checkout page with payment details
      await navigate({
        title: artwork.title, // Title shown on the checkout page
        amount: artwork.price, // 20 sats per artwork
        description: `Purchase: ${artwork.title}`, // Description shown to user
        // Metadata is extra information attached to this payment
        // It helps us identify what was purchased when the webhook fires
        metadata: {
          artworkId: artwork.id,
          artworkTitle: artwork.title,
        },
        // After successful payment, redirect to this URL
        successUrl: `${window.location.origin}/artwork/${artwork.id}?payment=success`,
      })
    } catch (error) {
      // Log any errors for debugging
      console.error("Payment navigation failed:", error)
      alert("Failed to initiate payment. Please try again.")
    }
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePurchase}
              disabled={isNavigating}
              className="w-full py-3 bg-[#00D632] text-white font-semibold transition-colors hover:bg-[#00C02E] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isNavigating ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  <Image
                    src="/images/cash-app.png"
                    alt="Cash App"
                    width={20}
                    height={20}
                    className="object-contain drop-shadow-none"
                    style={{ filter: 'none', boxShadow: 'none' }}
                  />
                  Pay {artwork.price} sats with Lightning
                </>
              )}
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


