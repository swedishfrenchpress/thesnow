/**
 * Checkout Page - Displays the Lightning Invoice
 * 
 * This page is automatically navigated to when a user clicks "Pay with Lightning"
 * It shows the QR code and payment details for the Lightning invoice.
 * 
 * How it works:
 * 1. User clicks pay button on artwork page
 * 2. navigate() function creates a checkout session and redirects here
 * 3. The [id] in the URL is the checkout session ID
 * 4. The <Checkout> component from Money Dev Kit renders the invoice
 * 5. User scans QR code or copies invoice to pay
 * 6. After payment, user is redirected to successUrl
 */

"use client"

import { Checkout } from "@moneydevkit/nextjs"
import { use } from "react"

export default function CheckoutPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // Unwrap the params promise (Next.js 15 pattern)
  const { id } = use(params)

  return (
    <div className="min-h-screen py-20 px-4">
      {/* 
        The Checkout component handles everything:
        - Displays the Lightning invoice QR code
        - Shows the payment amount
        - Monitors payment status
        - Redirects after successful payment
      */}
      <Checkout id={id} />
    </div>
  )
}

