/**
 * MoneyDevKit API Route
 * This unified endpoint handles all MDK payment operations including:
 * - Creating checkout sessions
 * - Processing Lightning invoices
 * - Handling webhooks for payment confirmations
 * 
 * MDK will automatically handle the Lightning node communication
 * and invoice generation. No additional configuration needed beyond
 * environment variables (MDK_ACCESS_TOKEN, MDK_WEBHOOK_SECRET, MDK_MNEMONIC)
 */

export { POST } from '@moneydevkit/nextjs/server/route'

