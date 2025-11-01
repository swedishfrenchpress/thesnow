"use client";

/**
 * Dynamic checkout page that renders the MDK Lightning payment interface
 * This page is accessed when a user clicks "Purchase" on an artwork
 * The [id] in the path is the checkout session ID created by MDK
 */

import { Checkout } from "mdk-checkout";
import { use } from "react";

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  // Extract the checkout ID from the URL params
  const { id } = use(params);

  return (
    <div className="min-h-screen pt-16">
      {/* MDK Checkout component handles the entire payment flow */}
      <Checkout id={id} />
    </div>
  );
}

