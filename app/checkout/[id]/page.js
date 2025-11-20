/**
 * Checkout Page - Displays the Money Dev Kit payment interface
 * 
 * This page is shown when a user clicks "Pay with Cashapp"
 * It displays:
 * - Lightning invoice QR code
 * - Payment amount in sats
 * - Real-time payment status updates
 * 
 * The [id] in the URL is the checkout session ID created by MDK
 */

"use client";

import { Checkout } from "@moneydevkit/nextjs";
import { use } from "react";

export default function CheckoutPage({ params }) {
  // Extract the checkout session ID from the URL
  // Example: /checkout/abc123 -> id = "abc123"
  const { id } = use(params);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* The Checkout component handles everything:
            - Displays QR code for Lightning payment
            - Shows payment status
            - Redirects on success
        */}
        <Checkout id={id} />
      </div>
    </div>
  );
}

