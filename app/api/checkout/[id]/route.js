/**
 * API route to fetch checkout data from MDK
 * This allows us to call the server-side getCheckout function from the client
 */

import { getCheckout } from "@moneydevkit/nextjs";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    // Fetch checkout data from MDK
    const checkout = await getCheckout(id);
    
    return NextResponse.json(checkout);
  } catch (error) {
    console.error("Error fetching checkout:", error);
    return NextResponse.json(
      { error: "Failed to fetch checkout" },
      { status: 500 }
    );
  }
}

