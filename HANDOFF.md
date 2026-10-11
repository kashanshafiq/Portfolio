# Handoff — continue Kashan Shafiq's portfolio

## User direction
Build a distinctive academic civil-engineering portfolio in **Vue**, intended for **GitHub Pages**. The approved design is `docs/approved-design.png` (Field Notes): graphite/green-black, restrained mint, modern Instrument Sans, small monospaced labels. Hero headline **“Precision in structure. Curiosity in technology.” is on the left; an arched cross-braced truss bridge is on the right**. Do not revert to the earlier full-width concrete beam/rebar hero. FaizanManshad.com inspired the typographic/interactive feel, but its branding, code, content and layout were not copied.

## Built
- Vue 3 + TypeScript + Vite + Vue Router, with installed dependencies and `pnpm-lock.yaml`; local fonts.
- Responsive homepage, work/search/filter archive, six project details, research, about, experience, recognition, community, contact, printable CV, 404 handling.
- Interactive Three.js bridge: procedural arched through-truss geometry, drag/keyboard orbit, keyboard zoom/reset, orthographic elevation and a conceptual deck-to-truss-to-support load route. Controls intentionally reduced to Perspective, Elevation, Trace load path and Reset. Static artwork remains the WebGL/loading fallback. Illustrative SVG project schematics remain.
- GitHub Pages workflow, root/project-path configuration, production checks and documentation.
- Confirmed public contact: `kashankashi27@gmail.com` and `https://www.linkedin.com/in/kashan-shafiq-11764229b/`.

## Continue here
Run from this folder: `pnpm install --frozen-lockfile`, then `pnpm dev`. Use Node 24 / pnpm 11.19.0. Run `pnpm check` before handoff. Read `README.md` for deployment and `docs/VALIDATION.md` for actual verification results. TypeScript is on 5.9 because the installed Vue checker failed against TS 7.

Content is separate in `src/content/`; shared components in `src/components/`; pages in `src/views/`; theme in `src/styles/`. `BridgeHero.vue` owns controls; `src/three/bridgeViewer.ts` owns geometry, camera, load-route overlay and cleanup. Three.js 0.186.1 / @types/three 0.186.0 are installed and locked. The generated hero lives in `public/images/bridge-hero.png`, not a temporary path.

## Evidence and boundaries
Original notebook and `Documents/` are in the parent directory, unchanged and excluded from this app. Source notes are not blanket independent verification. Research is an **SSRN preprint**, never an accepted journal publication. Do not invent job start dates, GitHub profile, individual ownership of team work, measured outcomes, or private identifiers. See `docs/CONTENT.md` for specific gaps. Project visuals are diagrams, not actual result screenshots. A dedicated public CV PDF has not been authored; the CV page can be printed.

## Next phase
Refine visuals with the user, replace schematics with approved actual project figures, confirm detailed team contributions and employment dates; refine bridge materials/geometry if desired. Improve route SEO/prerendering if desired. The app is deployable, but **no GitHub repository/account or live publication has been created**. Publish only this subfolder as the repository root; never publish the parent document archive.

