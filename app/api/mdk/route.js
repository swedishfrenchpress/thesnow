/**
 * Money Dev Kit (MDK) API route
 * 
 * This is the unified endpoint that handles Lightning payment operations.
 * It manages checkout sessions, invoice generation, and webhook callbacks.
 * 
 * The POST export from '@moneydevkit/nextjs/server/route' provides:
 * - Checkout session creation
 * - Invoice status checking
 * - Webhook event handling
 * 
 * This route is automatically called by:
 * - useCheckout() hook when creating a new checkout
 * - The Checkout component when displaying payment status
 * - Lightning Network when payment is received (webhook)
 */
export { POST } from '@moneydevkit/nextjs/server/route'

