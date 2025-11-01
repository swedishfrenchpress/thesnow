# Deployment Guide

## Option 1: Deploy via GitHub + Vercel (Recommended)

### Step 1: Push to GitHub

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit - Bitcoin art gallery"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/thesnow.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your `thesnow` repository
5. Click "Deploy" (Vercel auto-detects Next.js settings)
6. Wait ~2 minutes
7. Your site is live! 🎉

**You'll get a free domain**: `your-project-name.vercel.app`

### Benefits:
- ✅ Free hosting
- ✅ Automatic HTTPS
- ✅ Free domain
- ✅ Auto-deploys when you push to GitHub
- ✅ Edge network (fast globally)

---

## Option 2: Deploy via Vercel CLI (Fastest)

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Deploy:
```bash
cd /Users/erik/Documents/GitHub/thesnow
vercel
```

Follow the prompts:
- Login with GitHub/Email
- Confirm project settings
- Deploy!

---

## After Deployment

### Custom Domain (Optional)
If you own a domain, you can connect it:
1. Go to your project on Vercel
2. Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed

### Environment Variables
If you add any API keys later:
1. Project Settings → Environment Variables
2. Add your variables
3. Redeploy

### Automatic Deployments
Every time you push to GitHub:
- Vercel automatically rebuilds and deploys
- Preview deployments for branches
- Production deployment for `main` branch

---

## Troubleshooting

### Build fails?
Check the build logs on Vercel dashboard for errors.

### Images not loading?
Make sure images are in `/public/images/` folder and committed to git.

### Need to update?
Just push changes to GitHub, Vercel auto-deploys!

```bash
git add .
git commit -m "Updated artwork"
git push
```

Your site updates automatically in ~2 minutes!

