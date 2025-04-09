# GH Car Detailing Website

A professional car detailing website built with Next.js.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
RESEND_API_KEY=your_resend_api_key
```

You can get a Resend API key by signing up at [Resend](https://resend.com).

### Development

Run the development server:

```bash
pnpm dev
```

### Building for Production

Build the application:

```bash
pnpm build
```

### Deployment

The site is deployed on Vercel. To deploy:

```bash
vercel deploy --prod
```

## Environment Variables

The following environment variables are required:

- `RESEND_API_KEY`: API key for Resend email service

### Setting up Environment Variables in Vercel

You can set up environment variables in Vercel using the provided script:

```bash
node scripts/setup-vercel-env.js
```

Or manually through the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add the required environment variables

## Features

- Responsive design
- Booking system
- Blog
- Contact form
- Gallery
- Testimonials 