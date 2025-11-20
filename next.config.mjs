/**
 * Next.js configuration file
 * We import the MoneyDevKit plugin to enable Lightning payments
 */
import withMdkCheckout from '@moneydevkit/nextjs/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {}

// Wrap the config with MDK plugin to enable Lightning checkout functionality
export default withMdkCheckout(nextConfig)