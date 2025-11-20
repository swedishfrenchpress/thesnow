# MoneyDevKit Payment Integration Setup

## Overview
This application uses MoneyDevKit (MDK) to accept Lightning Network payments via CashApp. Each artwork costs **20 satoshis**.

---

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```bash
# MoneyDevKit (MDK) Configuration
# Get these credentials from https://dev.money/

# Your MDK API access token (required for creating checkout sessions)
MDK_ACCESS_TOKEN=your_mdk_access_token_here

# Webhook secret for verifying payment confirmations (security)
MDK_WEBHOOK_SECRET=your_webhook_secret_here

# Optional: Your BTC mnemonic if using custody features
# MDK_MNEMONIC=your_mnemonic_phrase_here

# Application Configuration
# Base URL of your application (used for redirect URLs)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, update `NEXT_PUBLIC_BASE_URL` to your actual domain:
```bash
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

---

## How It Works

### 1. **Payment Flow**
```
User clicks "Pay With Cashapp" 
  ↓
Frontend calls /api/mdk/checkout
  ↓
Backend creates Lightning invoice (20 sats)
  ↓
User redirected to MDK checkout page
  ↓
User pays with CashApp/Lightning
  ↓
MDK sends webhook to /api/mdk/webhook
  ↓
User redirected to success page
  ↓
Artwork unlocked in localStorage
```

### 2. **API Routes Created**

#### `/app/api/mdk/checkout/route.ts`
- Creates checkout sessions
- Generates Lightning invoices
- Sets amount to 20 sats per artwork
- Returns checkout URL

#### `/app/api/mdk/webhook/route.ts`
- Receives payment confirmations from MDK
- Verifies webhook signatures for security
- Logs successful payments
- Can be extended to update database

### 3. **Updated Components**

#### `/components/image-card.tsx`
- "Pay With Cashapp" button now triggers MDK checkout
- Shows loading state during checkout
- Handles errors gracefully

#### `/app/artwork/[id]/page.tsx`
- Same checkout integration on individual artwork pages
- Redirects to success page after payment

### 4. **Success Page**
- Already exists at `/app/checkout/success/page.tsx`
- Stores purchase in localStorage
- Shows unlocked artwork
- Provides download link

---

## Testing

### Local Testing
1. Set up a test account at https://dev.money/
2. Get your test API credentials
3. Add them to `.env.local`
4. Run `npm run dev`
5. Click a "Pay With Cashapp" button
6. Complete the test payment

### Webhook Testing
For webhooks to work in development:
1. Use a tool like ngrok to expose localhost:
   ```bash
   ngrok http 3000
   ```
2. Configure webhook URL in MDK dashboard:
   ```
   https://your-ngrok-url.ngrok.io/api/mdk/webhook
   ```

---

## Production Deployment

1. **Set Environment Variables** in your hosting platform (Vercel, etc.):
   - `MDK_ACCESS_TOKEN`
   - `MDK_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_BASE_URL`

2. **Configure Webhook URL** in MDK dashboard:
   ```
   https://yourdomain.com/api/mdk/webhook
   ```

3. **Test the full flow** before going live

---

## Security Notes

- ✅ Webhook signatures are verified for security
- ✅ API keys are kept server-side only
- ✅ Amount (20 sats) is set server-side, not client-side
- ⚠️ Currently using localStorage for purchases (simple but not secure)
- 💡 For production: Consider adding database tracking

---

## Future Enhancements

Consider adding:
- Database to track purchases server-side
- User authentication
- Email confirmations
- Purchase history page
- Admin dashboard to view sales

---

## Support

- MDK Documentation: https://docs.dev.money/
- MDK Discord: https://discord.gg/moneydevkit
- Issue with this integration? Check the console logs in both:
  - Browser console (for frontend errors)
  - Server logs (for API/webhook errors)

