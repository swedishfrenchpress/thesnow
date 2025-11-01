# MDK Lightning Checkout Setup Guide

Your Bitcoin Lightning payment integration is now configured! Follow these steps to complete the setup.

## ✅ What's Been Implemented

1. ✅ **Purchase Buttons** - Connected to MDK checkout
2. ✅ **Checkout Page** - Dynamic route at `/checkout/[id]`
3. ✅ **Success Page** - Shows after successful payment
4. ✅ **API Endpoint** - Webhook handler at `/api/mdk`
5. ✅ **Next.js Config** - MDK plugin integrated

## 🔑 Step 1: Get Your API Keys

1. Go to [moneydevkit.com](https://moneydevkit.com)
2. Create an account or log in
3. Find these three values in your dashboard:
   - **API Key** (MDK_ACCESS_TOKEN)
   - **Webhook Secret** (MDK_WEBHOOK_SECRET)
   - **Mnemonic** (MDK_MNEMONIC)

## 📝 Step 2: Configure Environment Variables

Open the `.env.local` file in your project root and replace the placeholder values:

```bash
# Open the file
nano .env.local

# Or with VS Code
code .env.local
```

Replace these lines with your actual credentials:

```env
MDK_ACCESS_TOKEN=your_actual_api_key_from_mdk
MDK_WEBHOOK_SECRET=your_actual_webhook_secret_from_mdk
MDK_MNEMONIC=your_actual_mnemonic_from_mdk
```

**IMPORTANT:** 
- Never commit this file to git (it's already in .gitignore)
- These are sensitive credentials - keep them secret!

## 🚀 Step 3: Test Locally

1. **Restart your dev server** (environment variables only load on startup):
```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

2. **Test a purchase**:
   - Go to http://localhost:3000
   - Click "Purchase" on any artwork
   - You should be redirected to the Lightning checkout page
   - Complete a test payment

## 🌐 Step 4: Deploy to Vercel

After testing locally, deploy with your environment variables:

### Option A: Via Vercel Dashboard
1. Go to [vercel.com/swedishfrenchpress-projects/thesnow/settings/environment-variables](https://vercel.com)
2. Add each environment variable:
   - `MDK_ACCESS_TOKEN`
   - `MDK_WEBHOOK_SECRET`
   - `MDK_MNEMONIC`
3. Redeploy: `vercel --prod`

### Option B: Via CLI
```bash
# Set environment variables (one-time setup)
vercel env add MDK_ACCESS_TOKEN production
vercel env add MDK_WEBHOOK_SECRET production
vercel env add MDK_MNEMONIC production

# Deploy with environment variables
vercel --prod
```

## 📋 How It Works

### When a user clicks "Purchase":

1. **Button Click** → `useCheckout` hook creates a checkout session
2. **Redirect** → User goes to `/checkout/[session-id]`
3. **Payment UI** → MDK shows Lightning invoice/QR code
4. **User Pays** → Payment processed via Lightning Network
5. **Webhook** → MDK notifies your `/api/mdk` endpoint
6. **Success** → User redirected to `/checkout/success`

### The Flow:
```
[Purchase Button] 
    ↓
[Create Checkout Session]
    ↓
[Show Lightning Invoice]
    ↓
[User Pays with Lightning]
    ↓
[Webhook Confirmation]
    ↓
[Success Page]
```

## 🔧 Customization

### Change Payment Amount
Edit `lib/images.ts`:
```typescript
price: 500  // Amount in satoshis
```

### Customize Success Page
Edit `app/checkout/success/page.tsx`

### Add Purchase Confirmation Email
In the webhook handler, you can add email notifications when payments complete.

## 🐛 Troubleshooting

### "Creating checkout..." button stuck?
- Check browser console for errors
- Verify `.env.local` has correct values
- Restart dev server after changing env vars

### Checkout page shows error?
- Verify MDK API credentials are correct
- Check your MDK account is active
- Look at terminal logs for API errors

### Webhook not working?
- In production, MDK needs a public URL
- Vercel automatically provides this
- Check webhook logs in MDK dashboard

## 📚 Additional Resources

- [MDK Documentation](https://moneydevkit.com/docs)
- [Lightning Network Basics](https://lightning.network)
- [Test with Testnet](https://moneydevkit.com/docs/testnet)

## 🎉 You're Ready!

Once you've added your API keys and restarted the server, your Bitcoin Lightning checkout is fully functional!

Users can now purchase your AI artwork with Bitcoin Lightning payments. ⚡₿

