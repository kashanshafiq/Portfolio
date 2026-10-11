# Kashan Shafiq — Academic Portfolio

Vue portfolio built from the approved **Field Notes** concept: graphite surfaces, Instrument Sans, technical captions, headline left and an interactive 3D truss bridge right. See `docs/approved-design.png` and start the next session with `HANDOFF.md`.

## Run locally

Install Node.js 24 and pnpm 11.19.0 (for example `npm install --global pnpm@11.19.0`). Then, from **this directory**:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:5173/. The development server uses a fixed port; stop the prior instance if it is occupied.

```sh
pnpm typecheck  # Vue + TypeScript checks
pnpm check      # Typecheck, production build, asset/base-path/source-file checks
pnpm preview    # Serve the built site on http://127.0.0.1:4173/
```

The committed `pnpm-lock.yaml` fixes the installed dependency versions. TypeScript is kept on the compatible 5.9 line: TypeScript 7 failed with the installed Vue checker. Do not upgrade it alone without checking the build. No backend, database, API keys or external font service is needed.

## What is included

- Home, work archive, six project details, research, about, experience, recognition, community, contact, printable CV and not-found pages.
- Search and discipline filters, recognition filters, expandable experience, clipboard citation with failure feedback, functional email/LinkedIn links, mobile navigation.
- Locally bundled fonts and bridge artwork. Three.js powers a procedural bridge with drag/keyboard orbit, keyboard zoom, orthographic elevation and a restrained conceptual gravity-load route. The original artwork is the loading/WebGL fallback.
- Semantic layouts, keyboard focus styles, skip link, reduced-motion support, responsive styles and print styles for the CV.
- GitHub Pages workflow with separate build/deploy permissions; PRs only build.

## Project map

```text
src/
  content/      # Profile, confirmed contact details, projects, research, recognition
  types/        # Shared content interfaces
  components/   # Header/footer, bridge, schematics, shared page intro/research feature
  views/        # Route pages
  styles/       # Design tokens and responsive/print CSS
  router.ts     # Hash routes and page titles
  main.ts       # Fonts and application entry point
public/
  images/bridge-hero.png
  favicon.svg
docs/
  approved-design.png
  CONTENT.md
  VALIDATION.md
scripts/check-dist.mjs
.github/workflows/deploy.yml
```

## Deploy on GitHub Pages

**Use the contents of `portfolio-site` as the repository root. Do not upload its parent academic archive.** No GitHub account, repository or public deployment was created by this build.

1. Create a GitHub repository and push this directory's source files and lockfile to its `main` branch. Leave `node_modules` and `dist` ignored.
2. In repository **Settings → Pages**, select **GitHub Actions** as the source.
3. The workflow installs pnpm, runs `pnpm install --frozen-lockfile`, checks/builds, uploads only `dist`, then deploys.
4. It automatically uses `/` for a `username.github.io` repository and `/repository-name/` otherwise. For a custom domain, set the repository Actions variable `VITE_BASE_PATH` to `/`, configure the domain in Pages, and add the corresponding `public/CNAME` once the domain is known.
5. Hash routes (for example `/#/work`) let direct links and refreshes work without server rewrites. A future SEO/prerendering phase can replace this deliberately simple routing strategy.

For a local project-path check in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/portfolio-test/'
pnpm check
Remove-Item Env:VITE_BASE_PATH
pnpm check
```

Deployment configuration follows the [Vite GitHub Pages guide](https://vite.dev/guide/static-deploy.html#github-pages). Vue development follows the [Vue quick start](https://vuejs.org/guide/quick-start.html).

## Editing content and design

- Change identity, email, LinkedIn, optional GitHub and optional downloadable CV in `src/content/profile.ts`.
- Add projects in `src/content/projects.ts`; unique slugs create detail pages automatically.
- Update research in `src/content/research.ts`. Keep publication status as **preprint**, not peer-reviewed journal publication.
- Adjust colour and typography in `src/styles/tokens.css`, then layout in `main.css`.
- Edit bridge controls in `src/components/BridgeHero.vue` and procedural geometry in `src/three/bridgeViewer.ts`. Three.js is dynamically imported; no GLB, model hosting or API key is required. Rendering runs only on interaction, has no autoplay or animated transitions, stops offscreen, and disposes GPU resources when leaving Home.
- Replace schematic project diagrams with selected, reviewed actual project screenshots when available. The current schematics are clearly illustrative and do not claim analysis results.
- The CV route prints to PDF; an authored downloadable PDF is optional and is not silently fabricated.

Keep source certificates, identity documents and spreadsheets outside the public application. See `docs/CONTENT.md` for source mapping and open content questions. New approved downloads require updating the explicit file check in `scripts/check-dist.mjs`.

