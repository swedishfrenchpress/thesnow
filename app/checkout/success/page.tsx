"use client"

/**
 * Success page shown after successful payment
 * Users are redirected here after completing their Lightning payment
 */

import { motion } from "framer-motion"
import Link from "next/link"

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        {/* Success Icon */}
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

        {/* Success Message */}
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-foreground/70 mb-8">
          Thank you for your purchase. Your artwork has been unlocked and is ready to download.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
            >
              Back to Gallery
            </motion.button>
          </Link>
          
          <p className="text-sm text-foreground/50">
            You will receive a confirmation email shortly.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

