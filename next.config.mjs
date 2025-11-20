/**
 * Next.js configuration file
 * Now includes Money Dev Kit plugin for Lightning payments
 * 
 * The withMdkCheckout plugin adds necessary webpack configurations
 * to make the MDK checkout components work properly
 */

import withMdkCheckout from '@moneydevkit/nextjs/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {}

// Wrap our config with the MDK plugin
export default withMdkCheckout(nextConfig)