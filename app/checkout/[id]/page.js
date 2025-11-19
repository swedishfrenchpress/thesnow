"use client";

/**
 * Dynamic checkout page
 * This page renders the Money Dev Kit hosted checkout interface
 * The [id] in the path is the checkout session ID created by useCheckout
 */

import { Checkout } from "@moneydevkit/nextjs";
import { use } from "react";

export default function CheckoutPage({ params }) {
  // Extract the checkout ID from the URL params
  // Using React's use() hook to unwrap the params promise (Next.js 15 requirement)
  const { id } = use(params);

  return <Checkout id={id} />;
}

