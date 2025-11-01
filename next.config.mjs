/** @type {import('next').NextConfig} */
import withMdkCheckout from 'mdk-checkout/next-plugin'

const mdkConfig = withMdkCheckout({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Find the rule that processes CSS
    const rules = config.module.rules.find((rule) => typeof rule.oneOf === 'object');
    
    if (rules) {
      // Find CSS rules and exclude MDK styles from Tailwind processing
      rules.oneOf.forEach((rule) => {
        if (rule.test && rule.test.toString().includes('css')) {
          // Add exclude for MDK CSS files
          const originalExclude = rule.exclude;
          rule.exclude = (modulePath) => {
            // Skip Tailwind processing for MDK CSS
            if (modulePath && modulePath.includes('mdk-checkout/dist/mdk-styles.css')) {
              return true;
            }
            return originalExclude ? originalExclude(modulePath) : false;
          };
        }
      });
    }
    
    return config;
  },
})

export default mdkConfig
