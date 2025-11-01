/** @type {import('postcss-load-config').Config} */
const config = (ctx) => {
  // Skip Tailwind processing for MDK CSS files
  const shouldSkipTailwind = ctx.file && ctx.file.includes('mdk-checkout');
  
  return {
    plugins: {
      ...(!shouldSkipTailwind && {
        tailwindcss: {
          config: './tailwind.config.ts',
        },
      }),
      autoprefixer: {},
    },
  };
};

export default config;

