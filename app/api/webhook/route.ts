/**
 * Webhook API Route for Money Dev Kit
 * 
 * This route handles incoming webhooks from Money Dev Kit to confirm
 * when payments have been successfully received.
 * 
 * How it works:
 * 1. Money Dev Kit sends a POST request when a payment is completed
 * 2. We verify the webhook signature for security
 * 3. We process the payment and update our records
 * 4. We return a 200 status to acknowledge receipt
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    // Get the raw body and signature from the request
    const body = await req.json()
    const signature = req.headers.get('x-mdk-signature')

    // Log the webhook for debugging (remove in production)
    console.log('Webhook received:', {
      body,
      signature,
      timestamp: new Date().toISOString()
    })

    // Verify the webhook signature to ensure it's from Money Dev Kit
    // The signature verification ensures no one can fake payment confirmations
    const webhookSecret = process.env.MDK_WEBHOOK_SECRET
    
    if (!webhookSecret) {
      console.error('MDK_WEBHOOK_SECRET is not configured')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // TODO: Implement actual signature verification
    // For now, we'll just check if the signature exists
    if (!signature) {
      console.error('No signature provided')
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Extract payment information from the webhook
    const { 
      status, 
      amount, 
      metadata 
    } = body

    // Check if the payment was successful
    if (status === 'completed' || status === 'settled') {
      const artworkId = metadata?.artworkId

      if (artworkId) {
        console.log(`Payment confirmed for artwork ${artworkId}`)
        // In a real app, you would:
        // 1. Store this in a database
        // 2. Mark the artwork as purchased for this user
        // 3. Send a confirmation email
        // 4. Grant access to the download
        
        // For this example, we're using localStorage on the client side
        // but in production, you'd want a proper database
      }
    }

    // Always return 200 to acknowledge receipt
    // If we return an error, Money Dev Kit will retry the webhook
    return NextResponse.json({ received: true }, { status: 200 })

  } catch (error) {
    console.error('Webhook handler failed:', error)
    
    // Return 400 for bad requests (malformed data)
    // This tells Money Dev Kit not to retry
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

// Only allow POST requests to this endpoint
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

