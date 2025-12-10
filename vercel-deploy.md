# Vercel deployment notes

- Framework: Next.js (App Router) — Vercel will detect automatically.
- Build command: `npm run build`
- Output directory: (leave default)
- Environment: Set `NEXT_PUBLIC_API_URL` or other env vars if needed.

Tips:
- Use Vercel Edge Functions if you integrate dynamic XR endpoints.
- Configure image domains in `next.config.js` if you're loading remote images.
