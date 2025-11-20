/** @type {import('next').NextConfig} */
// Import the MDK plugin to enable Lightning payments
import withMdkCheckout from '@moneydevkit/nextjs/next-plugin'

// Configure Next.js with MDK checkout functionality
// This enables the payment processing and webhook handling
const nextConfig = {}

// Wrap the config with MDK plugin
export default withMdkCheckout(nextConfig)