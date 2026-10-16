# Jan Kevin B. Dionaldo — Portfolio

Modern React/Vite portfolio migrated from the original static site. It keeps the original copy, photos, project screenshots, certificates, social links, and CV while adding responsive sections, light/dark mode, accessible navigation, a validated contact form, and subtle reduced-motion-friendly animations.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`. Run `npm run lint` to check the TypeScript/React source.

## Edit portfolio content

All editable content lives in [`src/data/portfolio.ts`](./src/data/portfolio.ts): identity, bio, contact details, links, services, skills, projects, education, experience, and certifications. Components consume this data and should not contain portfolio copy.

Images and the CV remain in the existing `images/` and `cv/` folders. Use root-relative paths such as `/images/main_picture/kevin.JPG` when adding an asset.

## Add a shadcn/ui component

The project is initialized with shadcn/ui in `components.json`, Tailwind CSS v4, and the `@/*` alias. Add a component with the official CLI:

```bash
npx shadcn@latest add <component>
```

Generated primitives belong in `src/components/ui/`. Shared layout and portfolio components belong in `src/components/layout/`, `src/components/sections/`, or `src/components/shared/`.

## Deploy

The app is a static Vite build and can deploy to Vercel or Netlify without a server:

1. Import the repository.
2. Use `npm run build` as the build command.
3. Use `dist` as the output directory.

Both platforms detect Vite automatically when connected to the repository.
