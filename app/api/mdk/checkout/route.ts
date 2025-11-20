/**
 * MDK Checkout API Route
 * 
 * This endpoint creates a checkout session for purchasing artwork
 * - Receives artwork ID and amount
 * - Creates a Lightning invoice via MDK
 * - Returns checkout URL for the user to complete payment
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get artwork details
    const body = await request.json()
    const { artworkId, amount, title } = body

    // Validate required fields
    if (!artworkId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: artworkId and amount' },
        { status: 400 }
      )
    }

    // Create checkout session with MDK
    // This will generate a Lightning invoice for the specified amount
    const checkoutResponse = await fetch('https://api.dev.money/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MDK_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        // Amount in satoshis (20 sats per image as requested)
        amount: amount,
        // Currency is Bitcoin/Lightning
        currency: 'BTC',
        // Description shown to user during checkout
        description: `Purchase: ${title || 'Artwork'} (ID: ${artworkId})`,
        // Metadata to track which artwork was purchased
        metadata: {
          artworkId,
          type: 'artwork_purchase'
        },
        // Success/cancel URLs (user will be redirected here)
        successUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/checkout/success?artworkId=${artworkId}`,
        cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/artwork/${artworkId}`,
      }),
    })

    if (!checkoutResponse.ok) {
      const error = await checkoutResponse.text()
      console.error('MDK checkout error:', error)
      return NextResponse.json(
        { error: 'Failed to create checkout session' },
        { status: 500 }
      )
    }

    const checkoutData = await checkoutResponse.json()

    // Return the checkout URL to the client
    // The client will redirect the user to this URL to complete payment
    return NextResponse.json({
      checkoutUrl: checkoutData.url,
      sessionId: checkoutData.id,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

