# Money Dev Kit Setup Guide

This guide will help you complete the Lightning payment integration for your art gallery.

## What We've Built

I've integrated Money Dev Kit (`@moneydevkit/nextjs`) into your site to enable Lightning payments. Here's what was added:

### 1. **Package Installation** ✅
- Installed `@moneydevkit/nextjs` package

### 2. **API Route** ✅
- Created `/app/api/mdk/route.js`
- This handles checkout session creation and payment webhooks

### 3. **Checkout Page** ✅
- Created `/app/checkout/[id]/page.js`
- Displays the Lightning payment interface with QR code

### 4. **Next.js Configuration** ✅
- Updated `next.config.mjs` with MDK plugin
- This adds necessary webpack configurations

### 5. **ImageCard Updates** ✅
- Updated `/components/image-card.tsx`
- The "Pay with Cashapp" button now initiates a real Lightning checkout
- Shows loading state while creating checkout session
- Charges **20 sats** per image (as requested)

### 6. **Success Page** ✅
- Your existing success page already handles marking artwork as purchased
- It stores the purchase in localStorage and dispatches events

## What You Need To Do

### Step 1: Get Your Credentials

You have two options:

**Option A: Create Account at Money Dev Kit**
1. Go to [moneydevkit.com](https://moneydevkit.com)
2. Create an account
3. Get your `api_key`, `webhook_key`, and `mnemonic`

**Option B: Generate Credentials Locally**
1. Run: `npx @moneydevkit/create`
2. This will generate credentials locally

### Step 2: Add Credentials to Environment Variables

Create a file called `.env.local` in your project root with:

```env
MDK_ACCESS_TOKEN=your_api_key_here
MDK_WEBHOOK_SECRET=your_webhook_key_here
MDK_MNEMONIC=your_mnemonic_here
```

**Important:** Replace the placeholder values with your actual credentials!

### Step 3: Restart Your Development Server

After adding the environment variables:

```bash
# Stop your current server (Ctrl+C)
# Then restart it:
npm run dev
```

## How It Works

### User Flow:

1. **User clicks "Pay with Cashapp" button** on an artwork card
2. **`useCheckout` hook creates a checkout session** via the MDK API
   - Sends 20 sats, artwork details, and success URL
3. **User is redirected to `/checkout/[id]`** 
   - Shows Lightning invoice QR code
   - User scans with Cash App (or any Lightning wallet)
4. **Payment is detected** via Lightning Network
5. **User is redirected to `/checkout/success`** with artwork ID
6. **Artwork is marked as purchased** in localStorage
7. **Gallery updates** to show artwork as "Unlocked"

### Technical Details:

```javascript
// When user clicks "Pay with Cashapp", this code runs:
navigate({
  title: `Purchase: ${artwork.title}`,
  description: artwork.description,
  amount: 20,              // 20 sats per image
  currency: 'SAT',         // Bitcoin sats
  metadata: {
    type: 'artwork_purchase',
    artworkId: artwork.id,
    successUrl: `/checkout/success?artworkId=${artwork.id}`
  }
})
```

## Testing

1. Make sure your `.env.local` file has valid credentials
2. Restart your dev server
3. Click "Pay with Cashapp" on any artwork
4. You should see the checkout page with a Lightning invoice
5. Pay the invoice (or test with your Lightning wallet)
6. You'll be redirected to success page
7. Artwork should now show as "Unlocked" in the gallery

## Payment Amount

Currently set to **20 sats per image** (as you requested). To change this, edit the `amount` in `/components/image-card.tsx`:

```typescript:175:183:components/image-card.tsx
navigate({
  title: `Purchase: ${artwork.title}`,
  description: artwork.description,
  amount: 20,  // Change this number to adjust price
  currency: 'SAT',
  metadata: {
    // ... rest of metadata
  }
})
```

## Troubleshooting

### "MDK credentials not found"
- Make sure `.env.local` exists and has all three environment variables
- Restart your dev server after adding credentials

### "Payment not detected"
- Check that your webhook secret is correct
- Verify your Lightning node is online (if using local credentials)

### "Checkout page not loading"
- Make sure you ran `npm install` after adding the package
- Verify `next.config.mjs` has the `withMdkCheckout` plugin

## Next Steps

Once you have your credentials set up:
1. Test a payment flow
2. Deploy to production (Vercel will need the same env variables)
3. Consider adding email notifications for purchases
4. Add analytics to track conversion rates

## Questions?

Feel free to ask if you need help with:
- Getting MDK credentials
- Testing payments
- Deploying to production
- Customizing the checkout experience

