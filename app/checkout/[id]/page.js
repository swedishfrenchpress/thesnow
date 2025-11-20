"use client";

/**
 * Dynamic checkout page
 * TODO: Re-implement checkout when payment system is installed
 * This page is accessed when a user clicks "Purchase" on an artwork
 * The [id] in the path is the checkout session ID
 */

import { useRouter } from "next/navigation";

export default function CheckoutPage({ params }) {
  const router = useRouter();
  // Extract the checkout ID from the URL params
  const { id } = params;

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Checkout Unavailable</h1>
        <p className="text-foreground/70">
          Checkout functionality has been removed. Please install a payment system to enable payments.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 border border-foreground/20 rounded hover:border-foreground/40 transition-colors"
        >
          Return to Gallery
        </button>
      </div>
    </div>
  );
}

