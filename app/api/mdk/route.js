/**
 * Money Dev Kit (MDK) API Route
 * 
 * This route handles all MDK payment operations including:
 * - Creating checkout sessions
 * - Processing Lightning Network payments
 * - Handling webhooks for payment confirmations
 * 
 * The route automatically uses your environment variables:
 * - MDK_ACCESS_TOKEN: Your API key
 * - MDK_WEBHOOK_SECRET: Secret for webhook verification
 * - MDK_MNEMONIC: For Lightning node operations
 */

// Export the POST handler from the MDK package
// This handles all payment-related requests
export { POST } from '@moneydevkit/nextjs/server/route'

