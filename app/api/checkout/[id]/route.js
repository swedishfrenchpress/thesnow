/**
 * API route to fetch checkout data
 * TODO: Re-implement checkout when payment system is installed
 */

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // Checkout functionality has been removed - this endpoint needs to be re-implemented
  return NextResponse.json(
    { error: "Checkout functionality unavailable - payment system needs to be installed" },
    { status: 503 }
  );
}

