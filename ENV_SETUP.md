# Environment Variables Setup

To enable Lightning payments with Money Dev Kit, you need to create a `.env.local` file in the root directory with the following variables:

```env
# Money Dev Kit Configuration
# Get your credentials from https://moneydevkit.com

MDK_ACCESS_TOKEN=your_api_key_here
MDK_WEBHOOK_SECRET=your_webhook_key_here
MDK_MNEMONIC=your_mnemonic_here
```

## Getting Your Credentials

1. Sign up at https://moneydevkit.com
2. Get your API access token
3. Get your webhook secret key
4. Get your mnemonic phrase

## Security Note

- Never commit `.env.local` to git (it's already in .gitignore)
- Keep your credentials secure
- These values should only be on your server, never exposed to the frontend

