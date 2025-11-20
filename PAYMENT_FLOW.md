# Lightning Payment Flow Documentation

This document explains how the Lightning payment integration works in your art gallery.

## Architecture Overview

```
User clicks button → Create checkout session → Show Lightning invoice → Payment detected → Mark as purchased
     (ImageCard)         (MDK API route)        (Checkout page)       (Webhook)         (Success page)
```

## File Structure

```
app/
├── api/
│   └── mdk/
│       └── route.js          # MDK endpoint (handles checkout creation + webhooks)
├── checkout/
│   ├── [id]/
│   │   └── page.js          # Displays Lightning invoice for payment
│   └── success/
│       └── page.tsx         # Success page (marks artwork as purchased)
└── artwork/
    └── [id]/
        └── page.tsx         # View purchased artwork (already existing)

components/
└── image-card.tsx           # Gallery card with "Pay with Cashapp" button

next.config.mjs              # Includes MDK webpack plugin
```

## Detailed Flow

### 1. User Initiates Purchase (ImageCard Component)

**File:** `components/image-card.tsx`

```javascript
// Import the checkout hook
import { useCheckout } from '@moneydevkit/nextjs'

// In component:
const { navigate, isNavigating } = useCheckout()

// When button clicked:
const handlePurchase = () => {
  navigate({
    title: `Purchase: ${artwork.title}`,
    description: artwork.description,
    amount: 20,                    // 20 sats
    currency: 'SAT',
    metadata: {
      artworkId: artwork.id,       // Track which artwork
      successUrl: `/checkout/success?artworkId=${artwork.id}`
    }
  })
}
```

**What happens:**
- `navigate()` makes a POST request to `/api/mdk`
- MDK creates a Lightning invoice
- User is redirected to `/checkout/[session-id]`

### 2. API Endpoint Handles Request (MDK Route)

**File:** `app/api/mdk/route.js`

```javascript
// This single line handles everything!
export { POST } from '@moneydevkit/nextjs/server/route'
```

**What it does:**
- **For checkout creation:** Creates Lightning invoice and checkout session
- **For webhooks:** Receives payment confirmations from Lightning network
- **For status checks:** Polls payment status

The MDK library handles all the complexity:
- Generating Lightning invoices
- Communicating with your Lightning node
- Verifying webhook signatures
- Managing session state

### 3. Checkout Page Shows Invoice (Checkout Component)

**File:** `app/checkout/[id]/page.js`

```javascript
import { Checkout } from "@moneydevkit/nextjs"

export default function CheckoutPage({ params }) {
  const { id } = use(params)
  
  return <Checkout id={id} />
}
```

**What user sees:**
- Lightning invoice QR code
- Amount in sats
- Payment status (pending/paid)
- Real-time updates when payment is detected

**User actions:**
- Scan QR with Cash App (or any Lightning wallet)
- Pay the invoice
- Wait for confirmation (usually instant!)

### 4. Payment Detected & Webhook Processed

**Behind the scenes:**

1. User pays Lightning invoice
2. Your Lightning node detects payment
3. MDK sends webhook to `/api/mdk` (same endpoint)
4. Webhook is verified using `MDK_WEBHOOK_SECRET`
5. Payment is marked as complete in session
6. User is redirected to success URL

### 5. Success Page Marks Purchase (Success Component)

**File:** `app/checkout/success/page.tsx`

```javascript
useEffect(() => {
  if (artworkId) {
    // Get purchased artwork
    const artwork = artworks.find(art => art.id === artworkId)
    
    // Save to localStorage
    const purchased = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
    purchased.push(artworkId)
    localStorage.setItem("purchasedArtworks", JSON.stringify(purchased))
    
    // Notify other components (for real-time updates)
    window.dispatchEvent(
      new CustomEvent("artworkPurchased", { detail: { artworkId } })
    )
  }
}, [artworkId])
```

**What happens:**
- Artwork ID is extracted from URL query parameter
- Purchase is stored in browser's localStorage
- Custom event is dispatched to update the gallery
- User sees success message and can view/download artwork

### 6. Gallery Updates Automatically (ImageCard Component)

**File:** `components/image-card.tsx`

```javascript
useEffect(() => {
  // Check localStorage on mount
  const purchased = JSON.parse(localStorage.getItem("purchasedArtworks") || "[]")
  setIsPurchased(purchased.includes(artwork.id))
  
  // Listen for purchase events (real-time updates)
  const handlePurchase = (event) => {
    if (event.detail?.artworkId === artwork.id) {
      setIsPurchased(true)
    }
  }
  
  window.addEventListener("artworkPurchased", handlePurchase)
  
  return () => {
    window.removeEventListener("artworkPurchased", handlePurchase)
  }
}, [artwork.id])
```

**What changes:**
- Blur overlay is removed
- "Locked" icon is replaced with "Unlocked" badge
- "Pay with Cashapp" button becomes "View" button
- User can now access the artwork at `/artwork/[id]`

## Data Flow Diagram

```
┌─────────────┐
│   User      │ Clicks "Pay with Cashapp"
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│  ImageCard Component    │
│  useCheckout().navigate()│
└──────────┬──────────────┘
           │
           │ POST /api/mdk
           ▼
┌─────────────────────────┐
│   MDK API Route         │
│   Creates Lightning     │
│   invoice & session     │
└──────────┬──────────────┘
           │
           │ Redirect to /checkout/[id]
           ▼
┌─────────────────────────┐
│   Checkout Page         │
│   Shows QR code         │
│   Waits for payment     │
└──────────┬──────────────┘
           │
           │ User pays with Lightning wallet
           ▼
┌─────────────────────────┐
│   Lightning Network     │
│   Payment confirmed     │
└──────────┬──────────────┘
           │
           │ Webhook to /api/mdk
           ▼
┌─────────────────────────┐
│   MDK API Route         │
│   Verifies payment      │
│   Marks session paid    │
└──────────┬──────────────┘
           │
           │ Redirect to /checkout/success
           ▼
┌─────────────────────────┐
│   Success Page          │
│   Stores purchase       │
│   Updates localStorage  │
└──────────┬──────────────┘
           │
           │ Event: artworkPurchased
           ▼
┌─────────────────────────┐
│   Gallery Updates       │
│   Shows "Unlocked"      │
│   Removes blur          │
└─────────────────────────┘
```

## Environment Variables Required

```env
# API authentication
MDK_ACCESS_TOKEN=your_api_key_here

# Webhook verification
MDK_WEBHOOK_SECRET=your_webhook_key_here

# Lightning node keys
MDK_MNEMONIC=your_mnemonic_here
```

These are loaded automatically by the MDK library from `.env.local`.

## Security Features

1. **Webhook Verification:** All webhooks are verified using HMAC signatures
2. **Session Validation:** Each checkout session has unique ID and expiration
3. **Payment Proof:** Lightning Network provides cryptographic proof of payment
4. **No Database Required:** Payments are verified on-chain, localStorage is just for UX

## Payment States

```
PENDING → PROCESSING → PAID → SUCCESS
   │          │          │        │
   │          │          │        └─→ Artwork unlocked
   │          │          └─→ Webhook received & verified
   │          └─→ User scanned QR and payment in flight
   └─→ Waiting for user to pay
```

## Customization Options

### Change Price Per Image

Edit `components/image-card.tsx`:

```javascript
amount: 20,  // Change to any number of sats
```

### Change Success Redirect

Edit `components/image-card.tsx`:

```javascript
successUrl: `/your-custom-success-page?artworkId=${artwork.id}`
```

### Add Custom Metadata

Edit `components/image-card.tsx`:

```javascript
metadata: {
  artworkId: artwork.id,
  customField: 'your-value',
  userId: 'user-id',
  // ... any data you want to track
}
```

### Customize Checkout Appearance

The `<Checkout>` component accepts props for styling. See MDK docs for options.

## Testing Checklist

- [ ] Environment variables set in `.env.local`
- [ ] Dev server restarted after adding env vars
- [ ] Click "Pay with Cashapp" button
- [ ] Checkout page loads with QR code
- [ ] Can scan QR with Lightning wallet
- [ ] Payment is detected automatically
- [ ] Redirected to success page
- [ ] Artwork shows as "Unlocked" in gallery
- [ ] Can view artwork at `/artwork/[id]`
- [ ] Can download full resolution image

## Common Issues & Solutions

### Issue: "Missing MDK credentials"
**Solution:** Add all three environment variables to `.env.local` and restart server

### Issue: Checkout page shows error
**Solution:** Check that `withMdkCheckout` is in `next.config.mjs`

### Issue: Payment not detected
**Solution:** Verify `MDK_WEBHOOK_SECRET` is correct

### Issue: Artwork not unlocking after payment
**Solution:** Check browser console for errors in localStorage or event handlers

## Production Deployment

When deploying to Vercel (or other hosting):

1. Add environment variables in hosting dashboard:
   - `MDK_ACCESS_TOKEN`
   - `MDK_WEBHOOK_SECRET`
   - `MDK_MNEMONIC`

2. Ensure webhook endpoint is publicly accessible:
   - `https://your-domain.com/api/mdk`

3. Test a real payment on production

## Learn More

- Money Dev Kit Docs: [moneydevkit.com/docs](https://moneydevkit.com)
- Lightning Network: [lightning.network](https://lightning.network)
- Cash App Lightning: [cash.app/help/lightning](https://cash.app/help)

