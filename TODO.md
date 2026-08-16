# TODO.md - Lesan Beautiful Documentation Website (GitHub Pages)

## Phase 0: Preparation ✅ (Completed)
- [x] You have forked the repository: https://github.com/hemedani/lesan-1
- [x] Create `website/` folder (recommended) or work in root

## Phase 1: Setup & Foundation ✅ (Completed)
- [x] Initialize Docusaurus v3 + TypeScript
- [x] Install dependencies
- [x] Configure basic Docusaurus settings (title, URL, baseUrl)
- [x] Set up dark mode as default

## Phase 1.5: Theme Design & Planning ✅ (Current)
- [x] Research "Linear Look" design trend
- [x] Analyze reference images (@ignoreAssets/)
- [x] Define comprehensive color palette
- [x] Define typography system (Geist Sans + Geist Mono)
- [x] Define spacing and layout system
- [x] Design component specifications (glass cards, bento grid, hero)
- [x] Plan animation and motion system
- [x] Document border and glow effects
- [x] Define responsive breakpoints
- [x] Create asset checklist
- [x] Create implementation checklist

## Phase 2: Theme Implementation (Next)
### 2.1 Global Styles & CSS Variables ✅ (COMPLETED)
- [x] Update `custom.css` with all CSS custom properties
- [x] Set up typography (import Inter + JetBrains Mono fonts)
- [x] Create global animation keyframes
- [x] Style scrollbar and selection colors
- [x] Add grid background pattern

### 2.2 Core Components ✅ (COMPLETED)
- [x] Create GlassCard component
- [x] Create BentoGrid component
- [x] Create AmbientGlow component
- [x] Create BorderHighlight component
- [x] Create TerminalBlock component (for install commands)
- [x] Create AnimatedSection component
- [x] Create Tag component

### 2.3 Landing Page Sections ✅ (COMPLETED)
- [x] Hero Section with spotlight effect
- [x] Features Bento Grid
- [x] Performance Benchmarks section
- [x] Code Example / Terminal section
- [x] Trust Signals / Social Proof section
- [x] CTA / Get Started section

### 2.4 Animations & Interactions ✅ (COMPLETED)
- [x] Implement scroll-triggered fade-in animations
- [x] Add hover glow effects to cards
- [x] Create ambient glow pulse animations
- [x] Add border highlight traveling animation
- [x] Implement staggered children reveals
- [x] Polish and verify all animations (Step 7)
- [x] Add reduced-motion support (Step 7) — `@media (prefers-reduced-motion: reduce)` present in `custom.css`

### 2.5 Responsive Design ✅ (MOSTLY COMPLETE — verify in Step 7)
- [x] Mobile layout adjustments
- [x] Tablet layout adjustments
- [x] Reduce effects on mobile (performance)
- [x] Test all breakpoints thoroughly (Step 7) — responsive breakpoints verified via build + `npm run serve`

## Phase 3: API Documentation (Source Code Review) ✅ (COMPLETED)
**Goal:** Review all project source code step by step, one by one, and write comprehensive API documentation.

### 3.1 Source Code Exploration ✅
- [x] Review `src/` directory structure and main entry points
- [x] Identify all public APIs, functions, classes, and modules
- [x] Create a list of all source files to document (step-by-step checklist)

### 3.2 Core Module Documentation ✅
- [x] Document the main `lesan` module / entry point
- [x] Document server creation API
- [x] Document context and request handling
- [x] Document middleware system

### 3.3 Model & ODM Documentation ✅
- [x] Document model definition API
- [x] Document schema types and validators
- [x] Document relationship definitions (bi-directional)
- [x] Document hooks and lifecycle events

### 3.4 Query & Projection Documentation ✅
- [x] Document query builder API
- [x] Document client-driven projections
- [x] Document aggregation pipelines
- [x] Document filtering and sorting options

### 3.5 Type Safety & TypeScript Documentation ✅
- [x] Document generated types
- [x] Document type inference system
- [x] Document advanced TypeScript utilities

### 3.6 Cross-Platform Documentation ✅
- [x] Document Node.js compatibility
- [x] Document Bun compatibility
- [x] Document Deno compatibility
- [x] Document platform-specific configurations

### 3.7 Fork Reference Cleanup ✅ (COMPLETED)
- [x] Replaced all fork references (`hemedani/lesan-1`, `@lesan/sdk`, `deno.land/x/lesan`) to point to the original repo
- [x] Fixed `website/docusaurus.config.ts` (org `MiaadTeam`, repo `lesan`, url `https://miaadteam.github.io`, baseUrl `/lesan/`, editUrl, navbar/footer GitHub links)
- [x] Fixed `website/docs/intro.mdx` and `website/docs/api/*.mdx` — package imports now use `@hemedani/lesan` (npm/bun) and `jsr:@hemedani/lesan` (Deno)
- [x] Fixed `website/src/pages/api-docs.tsx` and landing-page components (HeroSection, CTASection, TrustSection, CodeExampleSection)
- [x] Production build verified

### 3.8 Utilities & Helpers Documentation ✅ (COMPLETED)
- [x] Document all utility functions
- [x] Document error handling
- [x] Document logging and debugging tools

### 3.9 Examples & Tutorials (examples are the LAST documentation step — write after everything else)
- [x] Write getting started tutorial (Step 9)
- [x] Write advanced usage examples (Step 10) — `website/docs/advanced/` (client-projections, relations-in-depth, request-lifecycle, aggregation, filtering, pagination, microservices) + tips added to api/queries.mdx, models.mdx, server.mdx
- [x] Write migration guides (Step 11) — `website/docs/migration.mdx` (Mongoose / GraphQL / REST+Express before→after)
- [x] Clean up docs structure & sidebar (Step 12) — deleted `tutorial-basics/`/`tutorial-extras/`, removed unused blog (`blog: false`), cleaned footer links, sidebar now intro→getting-started→api→concepts→advanced→migration→guides
- [x] Write real-world Satek complex example (Step 13) — `website/docs/guides/complex-example.mdx` (project layout, model layer with indexes/excludes, action trio, auth/context hooks, role-scoped aggregation & search, guarded `hardCascade`) + `guides/_category_.json` (pos 7) + links from intro.mdx and advanced/ pages
- [x] Write smaller example case studies (Step 14) — `website/docs/guides/case-study-{nejat,paper,naghshe,ziwound}.mdx` (analytics+GeoJSON / shared-lib monorepo / spatial `$geoNear`+generated client / rate-limited exports); linked from intro.mdx + complex-example tip; build verified
- [x] Port the original mdBook tutorials (Step 16) — new `website/docs/tutorials/` category (sidebar pos 3) with 9 pages adapted to the current API: add-more-relations, managing-relations, add-relation, remove-relation, find-and-find-one, aggregation, find-one-and-update, delete-one, insert-many; sidebar renumbered (api 4 / concepts 5 / advanced 6 / migration 7 / guides 8); cross-linked from getting-started.mdx + intro.mdx; build verified
- [x] Write the full Procurement Workflow tutorial series — new `website/docs/tutorials/procurement-workflow/` (84 pages, built from `examples/advanced-tutorial/`): `overview`, `project-layout`, `models/` (15 pages with verbatim model source), `auth/` (11), `catalog/` (22), `inventory/` (7), `workflow/` (20), `finance/` (7). Overview documents **15 models / 63 actions**; each act page follows template: validator → registration (`mod.ts`) → implementation → in-workflow links → curl → errors & fixes. `guides/procurement-workflow.mdx` callout links the series; `guides/cross-platform-examples.mdx` covers runtime-agnostic imports. Build verified exit 0.
- [x] Fix Docusaurus slug + link quirks in the tutorial series — numeric prefixes stripped (`00-overview` → `/docs/tutorials/procurement-workflow/overview`, `01-project-layout` → `project-layout`); fixed 86 references across the series, `inventory/00-overview` → `/docs/category/inventory`, `finance/award` → `finance/award-tender`, overview table anchors → `/docs/category/*` links. Build exit 0.
- [x] Fix the site-wide titled-admonition breakage — `future: { v4: true }` renders `:::note Title` as literal `:::` text; converted all 91 titled admonitions in the tutorial series + `guides/procurement-workflow.mdx` + `guides/cross-platform-examples.mdx` to untitled `:::` + `**Title**` first line. Also fixed the 6 remaining pre-existing broken pages (`advanced/relations-in-depth`, `advanced/request-lifecycle`, `api/models`, `api/queries`, `api/server`, `concepts/what-is-the-relationship`). Build verified — **zero** `<p>:::` across the whole site.

**Reference examples for the real-world project docs (Step 13 & Step 14):**

- **Satek (the "most complex example"):** `/Users/syd/work/sitak/lesanSatek/back`
  A 30-model procurement/warehouse system with rich patterns: `preAct` hooks (`grantAccess`, `setUser`), custom context (`MyContext extends LesanContenxt`), relations with `relatedRelations`, `excludes`, text indexes, aggregation pipelines — ideal for a "complex example" doc.
- Other examples:
  - `/Users/syd/work/madani/nejat/lesan/back`
  - `/Users/syd/work/momeni/paper`
  - `/Users/syd/work/momeni/naghshe/back`
  - `/Users/syd/work/katiraei/ziwound/back`

## Phase 4: Documentation Landing Page ✅ (COMPLETED)
**Goal:** Create a beautiful, standalone landing page specifically for the API documentation.

### 4.1 Landing Page Design ✅
- [x] Design API docs landing page with "Linear Look" theme
- [x] Create hero section for API documentation
- [x] Add quick navigation cards to major API sections
- [x] Add code example preview on landing page

### 4.2 Landing Page Components ✅
- [x] API Section Cards (Server, Models, Queries, Types, etc.)
- [x] Interactive API explorer preview
- [x] "Quick Start" terminal block
- [x] Version selector / changelog preview
- [x] Search bar for API docs

### 4.3 Integration ✅
- [x] Link landing page to main site navigation
- [x] Ensure consistent theming with main site
- [x] Add breadcrumbs and navigation between docs sections

## Phase 5: Documentation Structure & Migration
- [x] Migrate content from old GitBook (converted concept pages + getting-started + testing from original mdBook HTML)
- [x] Build clean sidebar navigation for all docs (Step 12: explicit ordering intro → getting-started → tutorials → api → concepts → advanced → migration → guides; template content + unused blog removed)
- [x] Create MDX documentation pages from API docs
- [x] Style documentation pages to match theme

## Phase 6: Polish & Interactivity
- [x] Add search functionality (Step 15) — `@easyops-cn/docusaurus-search-local` plugin, configured in `docusaurus.config.ts` (indexDocs, navbar position, hashed), results dropdown themed to the Linear Look dark palette in `custom.css`; build + serve verified, search index generated
- [x] Add smooth scroll navigation — already present via `scroll-behavior: smooth` in `custom.css` (Step 2)
- [x] Add copy-to-clipboard for code blocks — already present (Docusaurus v3 default)
- [x] Add keyboard navigation (Step 17) — enabled `searchBarShortcut: true` + `searchBarShortcutHint: true` (⌘K / Ctrl+K, default keymap `mod+k`) on the search plugin; themed the `searchHint`/`searchHintContainer` kbd affordances in `custom.css`; `mod+k` confirmed in the built JS bundle
- [x] Optimize images and assets (Step 18) — fixed the broken `themeConfig.image` reference: renamed `static/img/docusaurus-social-card.jpg` → `lesan-social-card.jpg` (config already pointed there); deleted unused template assets (`undraw_docusaurus_*.svg`, `docusaurus.png`) and the unused `src/components/HomepageFeatures/` component; remaining `static/img/` (`besmelah.jpg`, `favicon.ico`, `logo.svg`, `lesan-social-card.jpg`) all referenced
- [x] Add loading skeletons (Step 19) — N/A for a fully static site (no async data fetching); `shimmer`/`animate-shimmer` keyframes already exist in `custom.css` for any future use

## Phase 7: Deploy & Maintain
- [x] Configure GitHub Pages — site config already has `organizationName: 'MiaadTeam'`, `projectName: 'lesan'`, `url: 'https://miaadteam.github.io'`, `baseUrl: '/lesan/'` (Step 7)
- [x] Set up GitHub Actions CI/CD — existing `ci.yml` (test-node 20/22 + test-bun + test-deno matrix) + `publish.yml` (npm/JSR on tags); added `.github/workflows/website-deploy.yml` (build Docusaurus → configure-pages → upload-pages-artifact → deploy-pages, triggered on `website/**` changes to `main`)
- [ ] Deploy to GitHub Pages — enable Pages → "GitHub Actions" as source in repo settings; the workflow handles the rest on next `main` push
- [ ] Test deployment — open `https://miaadteam.github.io/lesan/` after first run
- [ ] Set up custom domain (optional) — add `static/CNAME` + DNS record if desired

---

## Theme Implementation Details

### Design System: "Linear Look"
**Status:** Planning Complete ✓

**Key Characteristics:**
- Dark, glassy, ultra-modern aesthetic
- Deep black backgrounds with subtle grid patterns
- Cyan and purple ambient glows
- Glassmorphic cards with backdrop-filter blur
- Bento box grid layouts
- Super-thin borders with animated highlights
- Gradient text effects
- Smooth, physics-based animations

**Reference:** See `THEME.md` for complete design specification including:
- Detailed color palette (with CSS tokens)
- Typography scale (Geist Sans + Geist Mono)
- Component specifications (glass cards, buttons, tags)
- Layout system (spacing, grid, container)
- Animation guidelines
- Responsive breakpoints
- Asset requirements

### Implementation Priority
1. **CSS Variables & Global Styles** (Foundation)
2. **Glass Cards & Bento Grid** (Core components)
3. **Hero Section** (First impression)
4. **Feature Sections** (Content)
5. **Animations** (Polish)
6. **Responsive** (Accessibility)

---

**Primary Goals**:
1. Build the **most attractive landing page** possible for Lesan using the "Linear Look" design.
2. **Review all source code step by step** and write comprehensive API documentation.
3. Create a **beautiful landing page for the API documentation** that matches the main site theme.
4. Keep all documentation professional, accurate, and easy to navigate.

**Current Phase:** Phase 6 (Polish & Interactivity) complete — Steps 15 (local search), 16 (mdBook tutorial ports), 17 (keyboard navigation), 18 (asset optimization), 19 (skeletons, N/A) all done. Phase 7 (deploy & maintain) in progress: the GitHub Pages deploy workflow is written; remaining steps are GitHub-side (enable Pages via GitHub Actions source, first deploy, optional custom domain).
