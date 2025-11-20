"use client";

/**
 * Dynamic checkout page powered by Money Dev Kit (MDK)
 * 
 * This page displays the Lightning Network payment interface.
 * When a user clicks "Pay With Cashapp" on an artwork, they're redirected here
 * with a unique checkout session ID.
 * 
 * The Checkout component from MDK handles:
 * - Displaying the payment amount and description
 * - Generating Lightning invoices
 * - Processing Cash App payments
 * - Redirecting to success page after payment
 */

import { Checkout } from "@moneydevkit/nextjs";
import { use } from "react";

export default function CheckoutPage({ params }) {
  // Extract the checkout session ID from the URL
  // The 'use' function unwraps the params promise (Next.js 15 requirement)
  const { id } = use(params);

  // Render the MDK Checkout component
  // It automatically loads the checkout session and displays the payment UI
  return <Checkout id={id} />;
}

