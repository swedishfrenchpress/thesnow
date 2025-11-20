"use client"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { artworks, Artwork } from "@/lib/images"
import { motion } from "framer-motion"

function ArtworkContent({ artwork }: { artwork: Artwork }) {
  const [isPurchased, setIsPurchased] = useState(false)
  const router = useRouter()

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

  // Non-functional for now - checkout functionality removed
  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault()
    // Button does nothing - checkout functionality removed
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


