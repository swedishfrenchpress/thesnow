# Erik's Bitcoin Art Gallery

A modern, minimalist website for selling AI-generated artwork using Bitcoin payments.

## Features

- 🎨 **Beautiful Gallery**: Showcase AI-generated Midjourney artwork
- 🔒 **Blur Protection**: Images are blurred until purchased
- ₿ **Bitcoin Ready**: Price display in BTC (payment integration coming soon)
- 🌓 **Dark/Light Theme**: Seamless theme switching
- ⚡ **Smooth Animations**: Powered by Framer Motion
- 📱 **Fully Responsive**: Mobile-first design approach

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Font**: Geist Sans & Geist Mono
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd memoria
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
memoria/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── navigation.tsx     # Header/navigation
│   ├── hero.tsx          # Hero section
│   ├── gallery.tsx       # Gallery grid
│   ├── image-card.tsx    # Individual artwork cards
│   ├── theme-provider.tsx # Theme context provider
│   └── theme-toggle.tsx  # Dark/light mode toggle
├── lib/                  # Utility functions and data
│   └── images.ts         # Artwork data and types
└── public/              # Static assets
```

## Customization

### Adding New Artwork

Edit `lib/images.ts` and add new artwork objects to the `artworks` array:

```typescript
{
  id: "9",
  title: "Your Artwork Title",
  description: "Description of the artwork",
  imageUrl: "https://your-image-url.com/image.jpg",
  price: 0.0050, // Price in BTC
  dimensions: "4096 × 4096",
  createdAt: "2024-11-01",
}
```

### Changing Colors

The site uses Tailwind CSS with custom color variables. Key colors:
- Primary accent: `orange-500` (Bitcoin orange)
- Background: Defined in `globals.css` with CSS variables
- Text: Automatic based on theme

### Modifying Theme

Edit `app/globals.css` to change theme colors:

```css
:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ededed;
}
```

## Future Enhancements

- [ ] Bitcoin payment integration (Lightning Network)
- [ ] User authentication
- [ ] Purchase history
- [ ] Download high-res images after purchase
- [ ] Admin panel for managing artwork
- [ ] Email notifications
- [ ] Social sharing features

## Build for Production

```bash
npm run build
npm run start
```

## License

Private project - All rights reserved

## Contact

For questions or inquiries, contact Erik via the website contact form.

