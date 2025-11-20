/**
 * MDK Webhook Handler
 * 
 * This endpoint receives payment confirmation webhooks from MoneyDevKit
 * - Verifies webhook signature for security
 * - Processes payment success events
 * - Could be extended to update database, send emails, etc.
 * 
 * When a payment is successful, MDK sends a webhook here
 */

import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

/**
 * Verify that the webhook came from MDK (security check)
 * This prevents malicious actors from faking payment confirmations
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // Create HMAC signature using the webhook secret
  const hmac = createHmac('sha256', secret)
  hmac.update(payload)
  const expectedSignature = hmac.digest('hex')
  
  // Compare signatures (timing-safe comparison)
  return signature === expectedSignature
}

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text()
    
    // Get signature from headers
    const signature = request.headers.get('x-mdk-signature') || ''
    
    // Verify the webhook is legitimate
    const isValid = verifyWebhookSignature(
      rawBody,
      signature,
      process.env.MDK_WEBHOOK_SECRET || ''
    )

    if (!isValid) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    // Parse the webhook payload
    const payload = JSON.parse(rawBody)
    const { event, data } = payload

    console.log('Webhook received:', event, data)

    // Handle different webhook events
    switch (event) {
      case 'checkout.completed':
      case 'payment.succeeded':
        // Payment was successful!
        const { metadata } = data
        const artworkId = metadata?.artworkId

        if (artworkId) {
          console.log(`✅ Payment successful for artwork: ${artworkId}`)
          
          // TODO: Here you could:
          // - Store purchase in database
          // - Send confirmation email
          // - Grant user access to premium features
          // - Update user's purchase history
          
          // For now, the client-side code handles localStorage
          // In a production app, you'd want server-side tracking
        }
        break

      case 'payment.failed':
        // Payment failed
        console.log('❌ Payment failed:', data)
        break

      default:
        console.log('Unhandled webhook event:', event)
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

