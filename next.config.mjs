/**
 * Next.js Configuration with Money Dev Kit Plugin
 * 
 * The withMdkCheckout plugin configures Next.js to work properly
 * with Money Dev Kit's Lightning payment system.
 * 
 * What it does:
 * - Sets up proper webpack configuration for the Lightning SDK
 * - Configures server-side rendering for checkout components
 * - Enables necessary Next.js features for payment processing
 */

import withMdkCheckout from '@moneydevkit/nextjs/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withMdkCheckout(nextConfig)