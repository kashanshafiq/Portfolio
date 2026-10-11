# Validation — 4 October 2026

## Passed

- `pnpm install --frozen-lockfile --offline`: dependency manifest/lockfile reproduced successfully.
- `pnpm check`: Vue/TypeScript checking, Vite production build and output checks passed.
- Build and output checks passed with both `/` and `/portfolio-test/` base paths. Final `dist` was restored to the root `/` base.
- Output checker found all entry assets and bridge artwork, verified base-path URLs, and confirmed the source PDF/XLSX/TXT archive is not included in the build.
- Desktop homepage rendered and was visually reviewed; `homepage-preview.png` is a screenshot of the actual implementation.
- Mobile homepage reviewed at 390 × 844: loaded bridge, no horizontal document overflow. Mobile contact page also had no overflow.
- Mobile menu opens, navigates to contact, and closes after navigation.
- Work archive: Water filter yields one project; unmatched search shows an empty state; Clear filters restores six projects.
- Research citation button reports successful copying.
- Contact email and LinkedIn targets match the user's supplied values.
- Keyboard activation of Skip to content focuses `main-content` while preserving the hash route.
- Experience disclosure expands to show responsibilities.
- CV page loads with its print/save-to-PDF control visible.
- No JavaScript console errors were observed in the initial successful desktop review.

## Scope and remaining work

The homepage now contains an interactive procedural 3D bridge. It is a concept model, not a structural analysis or fabrication model. Project drawings are labelled schematic illustrations. Screenshots of actual project outputs can be added after review.

No GitHub Actions run or public deployment has occurred: no GitHub repository/account has been connected. Workflow was prepared against the official Vite Pages instructions; live verification remains part of publishing.

Print styles and the CV print button are implemented; no browser-generated PDF was exported or visually audited. This is not a full accessibility, cross-browser, SEO or performance audit. Hash routes deliberately favour straightforward GitHub Pages hosting; route prerendering remains a future improvement.

One full-page mobile screenshot attempt failed in the browser tool; the mobile viewport screenshot and DOM overflow checks succeeded. The dev server was restarted after the interrupted turn and returned HTTP 200.


## Interactive bridge update

- Added Three.js 0.186.1 and matching type definitions to manifest/lockfile. Original bridge artwork remains as loading/WebGL fallback.
- Procedural bridge includes arched side trusses, deck/floor beams, handrails, overhead X-bracing and concrete supports. It preserves the approved bridge family rather than reproducing the reference site's house.
- Browser verified: model renders, assembled/exploded and blueprint controls change the visual, part buttons update highlights/descriptions, camera rotation/zoom work, arrow keys and Home reset work, and navigating away/back creates one fresh canvas.
- Mobile reviewed at 390 × 844: no horizontal overflow, controls wrap, exploded bridge remains visible.
- Final `pnpm check` passed for `/portfolio-test/` and `/`; final build restored to `/`.
- Three.js is dynamically imported in a separate ~541 kB minified (~136 kB gzip) chunk. Vite reports its default 500 kB chunk advisory; the build succeeds. No model download or external rendering service is required.
- Rendering is event driven; transition frames stop offscreen. Reduced-motion users receive immediate assembly changes. Listeners, observers and GPU resources are released on unmount.
- Physical touch dragging, forced WebGL/context-loss fallback and reduced-motion emulation have not been browser-tested. These paths are implemented but not claimed as verified. No load/stress simulation is provided.
- The reference website could not be reopened during this update (ERR_QUIC_PROTOCOL_ERROR); interaction design used the controls inspected earlier in this conversation.

## Minimal bridge refinement (supersedes the earlier interaction set)

- Removed assembled/exploded, blueprint, numbered component selectors and the camera button cluster.
- Four controls remain: Perspective, Elevation, Trace load path and Reset. Elevation uses an orthographic camera; orbiting returns to perspective. Keyboard arrows, +/- and Home remain supported.
- Load route is an illustrative deck-to-truss-to-support overlay with subdued model shading, never a computed force or stress result. No looping motion or extra dependencies were added.
- Browser checked both viewpoints, load-route toggle, keyboard rotation/reset and mobile layout at 390 × 844 (four controls, no horizontal overflow). Production build/typecheck/output checks passed.
- Current preview: bridge-refined.png. The preceding exploded/blueprint validation describes the earlier revision only.
