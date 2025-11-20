/**
 * Next.js Configuration with MoneyDevKit
 * The MDK plugin enables Lightning payment functionality
 * by configuring necessary webpack and runtime settings
 */

import withMdkCheckout from '@moneydevkit/nextjs/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {}

export default withMdkCheckout(nextConfig)