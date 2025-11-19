/**
 * API route to fetch checkout data
 * TODO: Re-implement MoneyDevKit checkout when package is reinstalled
 */

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  // MoneyDevKit has been removed - this endpoint needs to be re-implemented
  return NextResponse.json(
    { error: "Checkout functionality unavailable - MoneyDevKit needs to be reinstalled" },
    { status: 503 }
  );
}

