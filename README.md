# Tobiya Game Studio — Website

This project is a starter Next.js (App Router) website tailored for Tobiya Game Studio, showcasing XR/VR/AR projects.

Tech stack:
- Next.js 14 (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion
- Three.js (placeholder for 3D model viewer)

Quick start

1. Install dependencies

```powershell
cd "C:/Users/hp/Documents/Tobiya Game Studio/Website"; npm install
```

2. Run dev server

```powershell
npm run dev
```

Notes
- Replace the `components/ModelViewer.tsx` placeholder with a `react-three-fiber` scene or `<model-viewer>` for project 3D previews.
- Add production-ready images in `public/` and update `Projects` cards to use `next/image` for optimization.

Deployment
- Deploy to Vercel by connecting the repository and selecting the root as the project. See `vercel-deploy.md` for suggestions.
