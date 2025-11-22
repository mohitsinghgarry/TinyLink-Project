# TinyLink Deployment Guide

## 🚀 Deploy to Vercel

### Step 1: Set up Database (Neon PostgreSQL)

1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project/database
4. Copy the connection string (it looks like: `postgresql://username:password@host/database`)

### Step 2: Deploy to Vercel

#### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   # Create a new repository on GitHub first, then:
   git remote add origin https://github.com/yourusername/tinylink.git
   git branch -M main
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Sign up/login with your GitHub account
4. Click "New Project"
5. Import your GitHub repository
6. Configure environment variables:
   - `POSTGRES_URL`: Your Neon database connection string
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel domain (e.g., `https://your-app.vercel.app`)
7. Click "Deploy"

#### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts and add environment variables when asked

### Step 3: Configure Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `POSTGRES_URL`: Your Neon database connection string
   - `NEXT_PUBLIC_BASE_URL`: Your Vercel app URL

### Step 4: Test Your Deployment

1. Visit your deployed app URL
2. Test the health endpoint: `https://your-app.vercel.app/healthz`
3. Try creating a short link
4. Test the redirect functionality

## 🔧 Environment Variables

```env
POSTGRES_URL="postgresql://username:password@host:port/database"
NEXT_PUBLIC_BASE_URL="https://your-app.vercel.app"
```

## 📝 Post-Deployment Checklist

- [ ] Health check endpoint works (`/healthz`)
- [ ] Can create new links
- [ ] Redirects work properly
- [ ] Click tracking functions
- [ ] Can delete links
- [ ] Stats page displays correctly
- [ ] Responsive design works on mobile

## 🐛 Troubleshooting

### Database Connection Issues
- Verify your `POSTGRES_URL` is correct
- Check Neon dashboard for connection details
- Ensure database is not paused (free tier auto-pauses)

### Build Errors
- Check Vercel build logs
- Verify all dependencies are in package.json
- Ensure TypeScript errors are resolved

### API Errors
- Check Vercel function logs
- Verify environment variables are set
- Test API endpoints individually

## 🎯 Testing URLs

After deployment, test these endpoints:
- `GET /healthz` - Should return `{"ok": true, "version": "1.0"}`
- `POST /api/links` - Create a new link
- `GET /api/links` - List all links
- `GET /:code` - Should redirect (302)
- `GET /code/:code` - Stats page