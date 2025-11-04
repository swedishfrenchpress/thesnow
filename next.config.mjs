/** @type {import('next').NextConfig} */
import withMdkCheckout from 'mdk-checkout/next-plugin'

export default withMdkCheckout({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
})
