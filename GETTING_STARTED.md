# Getting Started with Erik's Bitcoin Art Gallery

Welcome! This guide will help you get the website up and running in just a few minutes.

## Step-by-Step Setup

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This command will:
- Install Next.js (the React framework)
- Install TypeScript (for type-safe code)
- Install Tailwind CSS (for styling)
- Install Framer Motion (for smooth animations)
- Install the Geist font
- Install next-themes (for dark/light mode)

**What's happening?** npm (Node Package Manager) reads the `package.json` file and downloads all the required packages your project needs.

### Step 2: Start the Development Server

Once installation is complete, run:

```bash
npm run dev
```

**What's happening?** This starts a local development server. Your website will be available at `http://localhost:3000`

You should see output like:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

### Step 3: View Your Website

Open your web browser and go to:
```
http://localhost:3000
```

You should now see your beautiful Bitcoin art gallery website! 🎨

## Understanding the Project Structure

Let me explain what each folder does:

```
memoria/
│
├── app/                    # The main application folder
│   ├── layout.tsx         # The wrapper for all pages (includes navigation)
│   ├── page.tsx           # The home page
│   └── globals.css        # Global styles that apply everywhere
│
├── components/            # Reusable pieces of your website
│   ├── navigation.tsx     # The header/menu at the top
│   ├── hero.tsx          # The big welcome section
│   ├── gallery.tsx       # The grid of artwork images
│   ├── image-card.tsx    # Individual artwork display
│   ├── about.tsx         # About section
│   ├── contact.tsx       # Contact form
│   ├── footer.tsx        # Footer at bottom
│   ├── theme-provider.tsx # Handles dark/light theme
│   └── theme-toggle.tsx  # The button to switch themes
│
├── lib/                  # Utility functions and data
│   └── images.ts         # Where your artwork data is stored
│
└── public/              # Static files (images, icons, etc.)
```

## Key Concepts Explained

### 1. Components
Think of components as building blocks. Each component is a piece of your website that you can reuse. For example, `image-card.tsx` creates one artwork card, and `gallery.tsx` uses multiple image cards to create the full gallery.

### 2. TypeScript
Files ending in `.tsx` are TypeScript + React. TypeScript helps catch errors before they happen by checking your code's "types" (like making sure a number is always a number).

### 3. Tailwind CSS
Instead of writing CSS in separate files, Tailwind lets you style directly in your components using class names like:
- `text-xl` = extra large text
- `bg-orange-500` = orange background
- `p-4` = padding of 1rem

### 4. Framer Motion
This library powers all the smooth animations. Anywhere you see `<motion.div>`, that element can be animated!

## Making Changes

### Changing Artwork

Edit `lib/images.ts` to add/remove/modify artwork:

```typescript
{
  id: "9",                              // Unique ID
  title: "My New Artwork",             // Display name
  description: "A cool piece",         // Short description
  imageUrl: "https://...",             // Image URL
  price: 0.0050,                       // Price in Bitcoin
  dimensions: "4096 × 4096",           // Image size
  createdAt: "2024-11-01",            // Creation date
}
```

### Changing Colors

Edit `app/globals.css` to change the color scheme:

```css
:root {
  --background: #ffffff;  /* Light mode background */
  --foreground: #0a0a0a;  /* Light mode text */
}

.dark {
  --background: #0a0a0a;  /* Dark mode background */
  --foreground: #ededed;  /* Dark mode text */
}
```

The orange accent color (`orange-500`) is used throughout for the Bitcoin theme. You can search and replace it with other colors like `blue-500`, `purple-500`, etc.

### Changing Text Content

- **Hero section**: Edit `components/hero.tsx`
- **About section**: Edit `components/about.tsx`
- **Contact info**: Edit `components/contact.tsx`

## Development Tips

### Hot Reload
When you save a file, the website automatically updates in your browser! No need to refresh.

### Console Errors
If something goes wrong, check your terminal where you ran `npm run dev`. Errors will show up there.

### Browser DevTools
Press `F12` in your browser to see the developer console. This shows JavaScript errors and lets you inspect elements.

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run the production build
npm start

# Check for code issues
npm run lint
```

## Next Steps

1. **Customize the content**: Update the text, colors, and artwork to match your style
2. **Add your images**: Replace the Unsplash placeholders with your actual AI artwork
3. **Deploy**: When ready, deploy to Vercel, Netlify, or any hosting platform
4. **Add Bitcoin payments**: Integrate a payment processor like BTCPay Server or Lightning

## Need Help?

- Next.js Documentation: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Framer Motion: https://www.framer.com/motion/
- TypeScript: https://www.typescriptlang.org/docs/

## Troubleshooting

### "npm: command not found"
You need to install Node.js first: https://nodejs.org/

### Port 3000 already in use
Stop the other process or use a different port:
```bash
npm run dev -- -p 3001
```

### Styles not loading
Delete `.next` folder and restart:
```bash
rm -rf .next
npm run dev
```

Happy coding! 🚀₿

