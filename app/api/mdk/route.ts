/**
 * Money Dev Kit API Route
 * 
 * This is the unified endpoint that Money Dev Kit uses to:
 * 1. Create checkout sessions
 * 2. Fetch payment status
 * 3. Handle webhooks from your Lightning node
 * 4. Manage Lightning Network operations
 * 
 * By importing the POST handler from @moneydevkit/nextjs/server/route,
 * we get all the necessary functionality without writing custom code.
 * 
 * The Money Dev Kit SDK handles:
 * - Creating Lightning invoices
 * - Monitoring payment status
 * - Claiming paid invoices
 * - Webhook signature verification
 * - Error handling
 * 
 * All communication between the frontend and Money Dev Kit
 * flows through this endpoint.
 */

export { POST } from '@moneydevkit/nextjs/server/route'

