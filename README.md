# TinyLink - URL Shortener

A simple, clean URL shortener built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Create short links with custom or auto-generated codes
- ✅ URL validation and duplicate code detection
- ✅ Click tracking and statistics
- ✅ Responsive design with clean UI
- ✅ Search and sort functionality
- ✅ Copy-to-clipboard functionality
- ✅ Health check endpoint

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (recommend Neon for free hosting)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tinylink
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your database URL:
```
POSTGRES_URL="postgresql://username:password@host:port/database"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `POST /api/links` - Create a new short link
- `GET /api/links` - Get all links
- `GET /api/links/:code` - Get specific link stats
- `DELETE /api/links/:code` - Delete a link
- `GET /healthz` - Health check endpoint

## Routes

- `/` - Dashboard (create and manage links)
- `/code/:code` - Statistics page for a specific link
- `/:code` - Redirect to target URL
- `/healthz` - Health check

## Deployment

### Vercel + Neon (Recommended)

1. Create a Neon database at [neon.tech](https://neon.tech)
2. Deploy to Vercel and add your `POSTGRES_URL` environment variable
3. Set `NEXT_PUBLIC_BASE_URL` to your Vercel domain

### Other Platforms

The app can be deployed on any platform that supports Node.js:
- Railway
- Render
- Heroku

## Code Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes
│   ├── code/[code]/    # Stats pages
│   └── [code]/         # Redirect handler
├── components/         # React components
├── lib/               # Utilities and database functions
└── types/             # TypeScript type definitions
```

## Features Implemented

✅ URL shortening with custom codes  
✅ Click tracking and analytics  
✅ Responsive design  
✅ Search and filtering  
✅ Copy-to-clipboard  
✅ Form validation  
✅ Error handling  
✅ Health check endpoint  
✅ Proper HTTP status codes  
✅ Database schema with indexes  

## License

MIT