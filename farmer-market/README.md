# UzhaMart Frontend

Next.js 16 frontend for the UzhaMart farmer marketplace.

## Local Development

1. Copy `.env.example` to `.env`.
2. Set `API_BASE_URL` to your backend API.
3. Set `NEXT_PUBLIC_SITE_URL` to `http://localhost:3000`.
4. Install dependencies and start the app:

```bash
npm install
npm run dev
```

## Environment Variables

```bash
API_BASE_URL=https://your-backend.example.com/api
NEXT_PUBLIC_SITE_URL=https://your-frontend.example.com
```

- `API_BASE_URL`: Server-side base URL used by the app to fetch and create products.
- `NEXT_PUBLIC_SITE_URL`: Public frontend origin used for canonical metadata, robots, and sitemap URLs.

## Production Readiness

- `npm run lint`
- `npm run build`
- Confirm the backend is reachable from the deployed frontend environment.
- Confirm `NEXT_PUBLIC_SITE_URL` matches the final production domain.
- Confirm the backend supports CORS for your frontend origin if they are on different domains.

## Deploying

This app is ready for platforms that support Next.js 16, including Vercel.

### Vercel

1. Import the repository into Vercel.
2. Add the production environment variables:
   `API_BASE_URL`
   `NEXT_PUBLIC_SITE_URL`
3. Deploy.
4. After deploy, verify:
   - `/`
   - `/add-product`
   - `/product/<id>`
   - `/robots.txt`
   - `/sitemap.xml`

### Other Hosts

Use the standard production flow:

```bash
npm install
npm run build
npm run start
```

The host must provide Node.js and allow the app to reach your backend API.
