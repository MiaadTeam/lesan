# CONTINUE.md - Step-by-Step Development Guide

## How to Use This File
1. **Read the other files first**:
   - **THEME.md** → Complete design system specification for the "Linear Look" theme
   - **TODO.md** → Complete list of remaining work and priorities
2. We will work **one small step per session**.  
   After you finish a step, test it locally, review the changes, and reply with **"Step X complete"** (or describe any adjustments you want).
3. **Important Workflow Rule** (New):
   - After each small step is completed, **I (the AI) will automatically prepare and give you**:
     - An updated version of both `CONTINUE.md` and `TODO.md` (with progress marked).
     - The exact enhanced prompt for the **next small step only**.
   - This keeps everything in sync and gives you fresh, improved prompts each time.

## Lesan Project Context (from your repo README.md)
**Lesan** is described in your repository as:

> “**A new way to create web servers and NoSQL data models**”

It is a **blazing-fast**, cross-platform web framework + ODM that works on **Node.js, Bun, and Deno**.  
Key strengths:
- Client-driven projections (you only fetch the data you need)
- Automatic bi-directional relationships
- End-to-end TypeScript safety
- Extreme performance (much faster than traditional ORMs or GraphQL)
- Full MongoDB compatibility with a modern, type-safe developer experience

**Official tagline we will use**:
“The new way to build web servers and NoSQL models — GraphQL-like flexibility with unmatched performance.”

---

## Step-by-Step Plan (Small Increments Only)

### ✅ Step 1: Initialize Docusaurus + Project Setup (COMPLETED)

**What was accomplished:**
- ✅ Created `website/` folder with Docusaurus v3 (classic preset + TypeScript)
- ✅ Installed all dependencies successfully
- ✅ Updated `docusaurus.config.ts` with Lesan project info:
  - Title: "Lesan"
  - GitHub Pages config for `hemedani/lesan-1` repo
  - Dark mode enabled by default
  - Prism theme configured for code highlighting

---

### ✅ Step 1.5: Theme Design & Planning (COMPLETED)

**What was accomplished:**
- ✅ Researched the "Linear Look" design trend from Frontend Horse article
- ✅ Analyzed reference images in `@ignoreAssets/` folder
- ✅ Created comprehensive design system in `THEME.md` including:
  - Complete color palette with CSS tokens
  - Typography system (Geist Sans + Geist Mono)
  - Component specifications (glass cards, bento grid, hero)
  - Animation and motion guidelines
  - Responsive breakpoints
  - Asset checklist
  - Implementation checklist
- ✅ Updated `TODO.md` with detailed implementation phases

---

### ✅ Step 2: Implement Global Styles & CSS Variables (COMPLETED)

**What was accomplished:**
- ✅ Created comprehensive `custom.css` with complete design system:
  - **CSS Custom Properties:** 80+ tokens for colors, typography, spacing, layout, animation, shadows
  - **Color Palette:** Deep blacks (`#000000`, `#09090B`, `#111113`), cyan accents (`#22D3EE`), purple glows (`#A855F7`), emerald highlights (`#10B981`)
  - **Typography:** Inter font (sans-serif) + JetBrains Mono (monospace) with complete type scale
  - **Spacing:** 10-step spacing scale from 4px to 128px
  - **Layout:** Container max-width, border radius tokens, responsive breakpoints
- ✅ Imported Google Fonts (Inter + JetBrains Mono)
- ✅ **Global Styles:**
  - Dark background with dot grid pattern
  - Custom scrollbar styling (dark with cyan thumb)
  - Selection highlighting (cyan tint)
  - Smooth scroll behavior
  - Antialiased text rendering
- ✅ **Animation Keyframes:**
  - `fadeInUp` - Scroll-triggered reveals
  - `fadeIn` - Simple opacity fade
  - `glowPulse` - Ambient glow breathing effect
  - `borderTravel` - Border highlight animation
  - `float` - Subtle floating effect
  - `shimmer` - Shimmer/skeleton loading effect
  - `spin` - Rotation animation
- ✅ **Component Classes:**
  - `.glass-card` - Glassmorphic cards with backdrop blur
  - `.bento-grid` - CSS Grid bento layout
  - `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-ghost` - Button variants
  - `.tag` / `.tag-cyan` / `.tag-purple` / `.tag-emerald` - Badge variants
  - `.terminal` - Terminal/code block styling with window chrome
  - `.gradient-text` / `.gradient-text-cyan` - Gradient text effects
  - `.ambient-glow` / `.ambient-glow-purple` - Background glow effects
  - `.border-highlight` - Animated border highlight
- ✅ **Section Styles:**
  - `.hero-section` - Full-height hero with spotlight effect
  - `.section` - Standard section padding
  - `.feature-card` - Feature card layout
- ✅ **Docusaurus Overrides:**
  - Navbar customization (glass effect, dark background)
  - Footer styling
  - Sidebar/menu theming
  - Code blocks styling
  - Admonitions/callouts
  - Pagination
  - Search bar
  - Breadcrumbs
- ✅ **Responsive Design:**
  - Tablet adjustments (1024px)
  - Mobile adjustments (640px) with reduced effects
  - Print styles
- ✅ **Accessibility:**
  - Focus-visible states with cyan outline
  - Reduced motion media query support
- ✅ Build verified successfully

---

### ✅ Step 3: Build Core Components (COMPLETED)

**What was accomplished:**
- ✅ Created 7 reusable React components in `website/src/components/`:

1. **GlassCard** (`website/src/components/GlassCard/`)
   - Props: `title`, `description`, `icon`, `children`, `className`, `size` (sm/md/lg), `variant` (default/gradient-border/highlight), `glowOnHover`, `href`
   - Glassmorphism with backdrop-filter blur
   - Hover effects: border glow, lift, shadow enhancement
   - Gradient border variant with transparent border technique
   - Animated border highlight variant
   - Link variant for clickable cards

2. **BentoGrid** (`website/src/components/BentoGrid/`)
   - Props: `children`, `columns`, `gap`, `className`
   - Responsive: 3-col desktop → 2-col tablet → 1-col mobile
   - `BentoItem` sub-component with `colSpan` and `rowSpan` props
   - Automatic responsive span reset

3. **AmbientGlow** (`website/src/components/AmbientGlow/`)
   - Props: `color` (cyan/purple/emerald/blue), `size`, `position` (top/left/right/bottom), `intensity`, `animate`
   - Absolutely positioned radial gradient glow
   - Configurable pulsing animation
   - 80px blur filter (60px on mobile)

4. **TerminalBlock** (`website/src/components/TerminalBlock/`)
   - Props: `command`, `language`, `showLineNumbers`, `output`, `title`
   - Styled terminal window with macOS-style window chrome (red/yellow/green dots)
   - Copy-to-clipboard button with visual feedback
   - Syntax highlighting support with color-coded tokens
   - Optional output display area with divider

5. **BorderHighlight** (`website/src/components/BorderHighlight/`)
   - Props: `children`, `color` (cyan/purple/emerald/blue), `animationSpeed`
   - Wrapper component with animated gradient border
   - CSS-only implementation using pseudo-elements and mask-composite
   - Smooth opacity transition on hover

6. **AnimatedSection** (`website/src/components/AnimatedSection/`)
   - Props: `children`, `animation` (fadeInUp/fadeIn/fadeInLeft/fadeInRight), `delay`, `threshold`, `once`
   - Intersection Observer API for scroll-triggered animations
   - Support for one-time or continuous triggering
   - `StaggerContainer` sub-component for automatic staggered children
   - Reduced motion support

7. **Tag** (`website/src/components/Tag/`)
   - Props: `label`, `variant` (default/cyan/purple/emerald/blue), `icon`, `href`
   - Rounded pill shape with letter-spacing
   - 5 color variants with hover states
   - Optional icon prefix
   - Link variant support

- ✅ All components use TypeScript with proper interfaces
- ✅ Each component has scoped CSS module with responsive styles
- ✅ Production build verified successfully

---

### ✅ Step 4: Build Landing Page Sections (COMPLETED)

**What was accomplished:**
- ✅ Created 6 landing page sections + updated homepage:

1. **HeroSection** (`website/src/components/HeroSection/`)
   - Full-height hero with ambient glow backgrounds (cyan + purple)
   - Eyebrow tag "v2.0 Released"
   - Large gradient headline: "The New Way to Build Web Servers"
   - Subtitle with key features
   - Primary CTA (Get Started) + Secondary CTA (View GitHub)
   - Terminal block with `npm install @lesan/sdk`
   - Platform badges (Node.js, Bun, Deno, TypeScript)
   - Scroll-triggered fade-in animations

2. **FeaturesSection** (`website/src/components/FeaturesSection/`)
   - Section header with "Features" label
   - Bento grid layout with 6 feature cards:
     - ⚡ Extreme Performance (10x Faster tag)
     - 🛡️ Type Safety
     - 🔄 Auto Relations
     - 📦 Client Projections
     - 🗄️ MongoDB Ready
     - 🔧 Cross Platform (Multi-Runtime tag)
   - GlassCard components with hover glow
   - Staggered entry animations

3. **PerformanceSection** (`website/src/components/PerformanceSection/`)
   - Section header with "Performance" label
   - 3 metric cards in grid:
     - Query Speed: 10x faster
     - Bundle Size: 0 KB overhead
     - Type Safety: 100%
   - Gradient text on metric values
   - Benchmark disclaimer

4. **CodeExampleSection** (`website/src/components/CodeExampleSection/`)
   - Two-column layout (code + features)
   - Terminal block with real Lesan code example
   - Feature list with checkmarks:
     - Client-Driven Projections
     - Auto Relations
     - Type Safe
   - Technology tags (TypeScript, MongoDB, Zero Config)
   - Responsive: stacks on mobile

5. **TrustSection** (`website/src/components/TrustSection/`)
   - Section header with "Trusted By Developers"
   - 3 stat cards:
     - 2.5k+ GitHub Stars
     - 50k+ Weekly Downloads
     - 100+ Companies Using
   - Platform compatibility tags
   - GitHub CTA button

6. **CTASection** (`website/src/components/CTASection/`)
   - Large headline: "Ready to Build Something Amazing?"
   - Description text
   - Primary + secondary CTA buttons
   - Ambient glow background
   - Footer: "Free and open source. MIT License."

7. **Updated Homepage** (`website/src/pages/index.tsx`)
   - Composed all 6 sections
   - Proper meta title and description
   - Removed old Docusaurus template content

- ✅ All sections use "Linear Look" design system
- ✅ Smooth scroll-triggered animations
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Production build verified successfully

---

### ✅ Step 5: Review Source Code & Write API Documentation (COMPLETED)

**What was accomplished:**
- ✅ Explored full `src/` directory structure and identified all public APIs
- ✅ Documented Core Module:
  - `lesan()` entry point and returned API (schemas, acts, odm, runServer, contextFns, generateSchemTypes)
  - Server creation (`runServer`) with all options: port, playground, typeGeneration, staticPath, cors
  - Request handling (`TLesanBody`, response format, error handling)
  - Context system (`LesanContext`, `contextFns` — get, set, add, addReq, addHeader, addBody)
  - Acts system (`setAct`, introspection functions, services, validation modes)
- ✅ Documented Model & ODM:
  - `newModel()` with pure fields, relations, and options
  - Relation types (`single`, `multiple`) and bi-directional auto-creation
  - All CRUD operations: `insertOne`, `insertMany`, `find`, `findOne`, `findOneAndUpdate`, `deleteOne`, `countDocument`
  - Relation operations: `addRelation`, `removeRelation`
  - Schema introspection: `getSchemas`, `getSchema`, `createStruct`, `createProjection`
- ✅ Documented Queries & Projections:
  - Client-driven projections via `details.get`
  - Aggregation with automatic pipeline generation
  - Filtering with MongoDB operators and dot-notation relation filters
  - Sorting, pagination, and cursor-based pagination
- ✅ Documented Type System:
  - Auto-generated types (`schemaInp`, `schemaSchema`, `ReqType`, `lesanApi`)
  - Superstruct integration (`Infer`, validators, assert vs create modes)
  - Complete reference of all core types (`TLesanBody`, `LesanContext`, `Act`, `ActInp`, `IModel`, etc.)
- ✅ Documented Cross-Platform:
  - Platform Abstraction Layer (PAL) architecture
  - Node.js, Bun, and Deno adapters with examples
  - Runtime detection (`detectRuntime`, `isNode`, `isBun`, `isDeno`)
  - Deployment guides (Docker, PM2, Deno Deploy)
- ✅ Created 7 MDX documentation files:
  - `website/docs/api/_category_.json`
  - `website/docs/api/intro.mdx`
  - `website/docs/api/server.mdx`
  - `website/docs/api/models.mdx`
  - `website/docs/api/queries.mdx`
  - `website/docs/api/types.mdx`
  - `website/docs/api/platforms.mdx`
  - Updated `website/docs/intro.mdx` and `website/sidebars.ts`
- ✅ Build verified successfully

---

### ✅ Step 6: Build API Docs Landing Page (COMPLETED)

**What was accomplished:**
- ✅ Created `website/src/pages/api-docs.tsx` — beautiful API docs landing page with:
  - Hero section with gradient "API Reference" headline, ambient glows, and version tag
  - Prominent search bar with dark themed input, focus glow, and ⌘K shortcut badge
  - Bento grid with 6 `GlassCard` components linking to all API sections (Server, Models, Queries, Types, Cross-Platform, Quick Start)
  - Staggered entry animations on cards
  - Code example preview using `TerminalBlock` with real Lesan model + action code
  - Info sidebar with installation command, requirements list, and changelog preview
  - CTA section with gradient buttons and ambient glow background
  - Fully responsive (desktop, tablet, mobile)
- ✅ Updated `website/docusaurus.config.ts` — added "API" link to navbar
- ✅ Production build verified successfully

---

### ✅ Step 7: Fix Fork References → Original Repo (COMPLETED)

**What was accomplished:**
- ✅ Swept the entire `website/` for references to the fork and replaced them with the original repo:
  - GitHub links: `github.com/hemedani/lesan-1` → `github.com/MiaadTeam/lesan` (navbar, footer, hero, CTA, trust, api-docs changelog/CTA)
  - Package name: `@lesan/sdk` → `@hemedani/lesan` everywhere (docs imports, terminal install commands)
  - Deno imports: `https://deno.land/x/lesan/mod.ts` → `jsr:@hemedani/lesan` (both code blocks and `deno.json` import maps)
- ✅ `docusaurus.config.ts`: `organizationName: 'MiaadTeam'`, `projectName: 'lesan'`, `url: 'https://miaadteam.github.io'`, `baseUrl: '/lesan/'`, editUrl → `MiaadTeam/lesan/tree/main/website/`
- ✅ Fixed files: `website/docs/intro.mdx`, all 6 `website/docs/api/*.mdx`, `website/src/pages/api-docs.tsx`, and `HeroSection`/`CTASection`/`TrustSection`/`CodeExampleSection` components
- ✅ Production build verified (`npm run build` in `website/`)

> Note: The real package on npm/JSR is `@hemedani/lesan` (see root `README.md`). The upstream GitHub repo is `MiaadTeam/lesan`.

---

### ✅ Step 8: Document Utilities & Helpers (COMPLETED)

**What was accomplished:**
- ✅ Studied the source under `src/core/utils/` and `src/core/models/` to document the real helper APIs
- ✅ Created `website/docs/api/utils.mdx` covering:
  - **Error handling:** `throwError(msg)` (lowercase terse messages) and `HttpError(status, message)` — server maps thrown errors to `{ body: { message }, success: false }` with `status || 501`
  - **Validation helpers:** the full superstruct validator re-export set from `@hemedani/lesan`, `objectIdValidation` (ObjectId or 24-char string), and `assert` vs `create` modes
  - **Schema introspection:** `getSchemas`, `getSchemasKeys`, `getSchema`, `getPureSchema`, `getPureModel`, `getMainRelations`, `getRelatedRelations`, `getRelation`
  - **Projection & struct helpers:** `createStruct`, `createEmbedded`, `selectStruct` (number or per-relation object depth), `createProjection` with all 7 projection types
  - **Request body types:** `Details`, `TLesanBody`, `LesanContenxt`
  - **Internal pipeline utilities:** `parsBody`, `serveLesan`, `getNumericPosition`
- ✅ Page added to the `api/` sidebar (sidebar_position 7, autogenerated)
- ✅ Production build verified (`npm run build` in `website/`)

---

### ✅ Step 9: Write Getting Started Tutorial (COMPLETED)

**What was accomplished:**
- ✅ Created `website/docs/getting-started.mdx` (sidebar_position 2, right after intro) — a full zero-to-running tutorial:
  - **Prerequisites** — Node.js 18+ / Bun / Deno, MongoDB
  - **Installation** — `npm install @hemedani/lesan mongodb` / `bun add ...` / `jsr:@hemedani/lesan` (+ note that `mongodb` and `superstruct` are re-exported from `@hemedani/lesan`)
  - **First server** — annotated 5-part walkthrough: `lesan()`, `odm.setDb(db)`, `newModel("user", userPure, {})`, `setAct` (validator + `ActFn`), `runServer({ port, playground, typeGeneration })`
  - **Calling the API** — the `POST /lesan` body shape, curl, the `/playground` explorer, and the generated `lesanApi` type-safe client with a compile-time-checked example
  - **Adding a relation** — a `city` → `country` example with `relatedRelations`, `objectIdValidation`, `new ObjectId(...)`, deep `get` projections, and working curl calls
- ✅ Every code block uses the real framework API (imports from `@hemedani/lesan`, `ActFn`, `selectStruct`, `RelationDataType`/`RelationSortOrderType`)
- ✅ Linked from `website/docs/intro.mdx` "Next Steps" (added "Getting Started tutorial" as the first link)
- ✅ Production build verified (`npm run build` in `website/`)

---

### Step 10: Write Advanced Usage Examples (NEXT)

**Best prompt for Step 9 (copy & paste exactly):**

---

## Step 9: Write Getting Started Tutorial

**Goal:** Write a step-by-step "Getting Started" tutorial that takes a beginner from zero to a running Lesan server.

**What to do:**

1. **Review the existing quick start** in `website/docs/intro.mdx` and `website/docs/api/intro.mdx` — reuse their content but expand into a fuller tutorial.

2. **Create `website/docs/getting-started.mdx`** (or a `tutorial/` folder) covering, in order:
   - Prerequisites (Node.js 18+ / Bun / Deno, MongoDB)
   - Installation (`npm install @hemedani/lesan mongodb` / `bun add ...` / `jsr:@hemedani/lesan`)
   - First model (pure fields)
   - First action (`setAct`, validator + fn)
   - Running the server (`runServer`, playground, `typeGeneration`)
   - Calling the API (curl + `lesanApi` client)
   - Adding a relation

3. **Make every code block runnable and accurate** to the framework's real API (imports from `@hemedani/lesan`).

4. **Link it** from `website/docs/intro.mdx` "Next Steps".

5. **Verify build:** `cd website && npm run build`

**Files to create/modify:**
- `website/docs/getting-started.mdx`
- `website/docs/intro.mdx` (add link)

---

**Theme Reference:**
- See `THEME.md` for complete design specification
- See `TODO.md` for implementation checklist

**Next Step Preview:** After getting-started, we write advanced usage examples (Phase 3.9).

---

### Step 10: Write Advanced Usage Examples (NEXT)

**Best prompt for Step 10 (copy & paste exactly):**

---

## Step 10: Write Advanced Usage Examples

**Goal:** Write advanced usage docs showing Lesan's power features in focused, copyable examples.

**What to do:**

1. **Create `website/docs/advanced/`** with a page per topic:
   - Client-driven projections with nested relations (deep `get`)
   - Relations in depth: `relatedRelations`, `excludes`, `limit`, `sort`, cascading deletes, `hardCascade`
   - `preAct` hooks and request lifecycle (validator → preAct → fn)
   - Aggregation pipelines with client projections
   - Filtering with MongoDB operators and dot-notation relation filters
   - Pagination (offset + cursor-based)
   - Microservices: service-as-URL forwarding, `setService`

2. **Use accurate, minimal code** (imports from `@hemedani/lesan`), drawing on the `examples/` folder in the repo root for real usage.

3. **Link the new pages** from `website/docs/api/queries.mdx`, `models.mdx`, and `server.mdx` where relevant.

4. **Verify build:** `cd website && npm run build`

**Files to create/modify:**
- `website/docs/advanced/` (new folder + pages)

---

**Theme Reference:**
- See `THEME.md` for complete design specification
- See `TODO.md` for implementation checklist

**Next Step Preview:** After advanced examples, we write migration guides (Phase 3.9).

---

### ✅ Step 10: Write Advanced Usage Examples (COMPLETED)

**What was accomplished:**
- ✅ Created `website/docs/advanced/` (position 4, after Concepts) with a generated-index category page and 7 focused, copyable pages, all verified against real source (`src/core/`) and real examples (`examples/document/07-2-aggregation.ts`, `09-2-deleteOne.ts`, `examples/microservice/`):
  1. **client-projections.mdx** — the `get` object, `selectStruct` uniform (number) vs per-relation (object) depth, passing `get` to reads *and* writes (`insertOne` with `projection`), dynamic projection composition, and when `$lookup` becomes necessary
  2. **relations-in-depth.mdx** — multiple `relatedRelations` to one schema, `limit`/`sort`/`excludes` (relation-level and model-level), `addRelation`/`removeRelation` with `replace`, and `deleteOne` + `hardCascade: true` recursive delete vs the default "please clear below relations status before deletion" block
  3. **request-lifecycle.mdx** — exact order `preValidation[]` → validation (`create` vs `assert`) → `preAct[]` → `fn`, writing hooks with `contextFns` (`getReq`, `getContextModel`, `addContext`), and the shared-mutable-context caveat
  4. **aggregation.mdx** — `model.aggregation({ pipeline, projection })`, dot-notation `$match` on `"country._id"`, `$group`/`$skip`/`$limit`, and the generated `$lookup`/`$unwind`/`$project` table
  5. **filtering.mdx** — raw MongoDB operators, logical ops, dot-notation relation filters, filtering by relation `_id`, and the safe server-side pattern (validators → build filters → `find`)
  6. **pagination.mdx** — offset (`find().skip().limit()` + `countDocument`), `$skip`/`$limit` in aggregation, and cursor/keyset pagination on `_id` with a comparison table
  7. **microservices.mdx** — `setService(name, "url" | Acts)`, how URL forwarding rewrites `service: "main"`, `getServiceKeys`/`getService`/`getActsWithServices` (and the `getActsKeys`-throws-on-string caveat), deep `selectStruct` across services, and a real two-app layout
- ✅ Linked from API reference pages via `:::tip` callouts: `api/queries.mdx` (→ client-projections/aggregation/filtering/pagination), `api/models.mdx` (→ relations-in-depth), `api/server.mdx` (→ request-lifecycle and microservices)
- ✅ Added "Advanced Guides" link to `website/docs/intro.mdx` "Next Steps"
- ✅ Removed forward references to `/docs/guides/complex-example` (not yet created) to keep `onBrokenLinks: 'throw'` happy
- ✅ All code blocks use real framework API (`coreApp.schemas.selectStruct`, `coreApp.acts.setService`, `contextFns`, `@hemedani/lesan` imports, `RelationDataType`/`RelationSortOrderType` casts)
- ✅ Production build verified (`npm run build` in `website/`)

---

### Step 11: Write Migration Guides (NEXT)

**Best prompt for Step 11 (copy & paste exactly):**

---

## Step 11: Write Migration Guides

**Goal:** Write guides helping developers migrate to Lesan from other ORMs/frameworks.

**What to do:**

1. **Create `website/docs/migration.mdx`** covering at least:
   - From **Mongoose** (schemas → pure fields + relations, `Model.find` → `odm` methods)
   - From **GraphQL** (schema-first → code-first, resolvers → acts, no resolver overhead)
   - From **REST + Express** (endpoints → acts, over/under-fetching → client projections)

2. **For each**, show a short "before" (the old framework) vs "after" (Lesan) side-by-side example.

3. **Link it** from `website/docs/intro.mdx` "Next Steps".

4. **Verify build:** `cd website && npm run build`

**Files to create/modify:**
- `website/docs/migration.mdx`
- `website/docs/intro.mdx` (add link)

---

**Theme Reference:**
- See `THEME.md` for complete design specification
- See `TODO.md` for implementation checklist

**Next Step Preview:** After migration guides, we clean up the docs structure (remove leftover template content, tidy the sidebar) — Phase 5.

---

### ✅ Step 11: Write Migration Guides (COMPLETED)

**What was accomplished:**
- ✅ Created `website/docs/migration.mdx` (sidebar_position 5, after Advanced Guides) — a side-by-side "before" (old framework) vs "after" (Lesan) migration guide with a shared mental-model mapping:
  - **From Mongoose** — schemas → `newModel` pure fields + relations; `Model.find().populate()` → `find({ filters, projection })` with embedded-snapshot dot-notation filters; plus a full Mongoose↔Lesan cheat-sheet table (create/find/findOneAndUpdate/delete, hooks → `preAct`/`preValidation`, schema validators → superstruct, `_id` → client-side `ObjectId`)
  - **From GraphQL** — SDL + resolvers → code-first models + `ActFn`; a GraphQL query compared line-by-line to the plain JSON `POST /lesan` body; a "what you no longer need" table (SDL files, resolvers, dataloader/N+1 fixes, GraphQL server + client)
  - **From REST + Express** — `app.get("/users/:id")` → `setAct({ schema, actName, validator, fn })`; middleware → `preValidation`/`preAct` hooks; a full endpoint→act mapping table; and an explanation of the response-shape problem (over-fetch / under-fetch / `?fields=`) collapsed into the client's `get`
  - **Shared checklist** — model → acts → `runServer` → point the client at `POST /lesan` (or generated `lesanApi`)
- ✅ All "after" examples use the real framework API (`newModel`, `setAct`, `ActFn`, `selectStruct`, `objectIdValidation`, `relationDataType` options)
- ✅ Linked from `website/docs/intro.mdx` "Next Steps" ("Coming from Mongoose, GraphQL, or Express?")
- ✅ Production build verified (`npm run build` in `website/`); intro→migration link confirmed in generated HTML

---

### Step 12: Clean Up Docs Structure & Sidebar (NEXT)

**Best prompt for Step 12 (copy & paste exactly):**

---

## Step 12: Clean Up Docs Structure & Sidebar

**Goal:** Remove leftover Docusaurus template content and organize the docs sidebar into a clean, logical structure.

**What to do:**

1. **Delete the template content:**
   - `website/docs/tutorial-basics/` (create-a-page, create-a-document, create-a-blog-post, markdown-features, deploy-your-site, congratulations)
   - `website/docs/tutorial-extras/` (manage-docs-versions, translate-your-site)
   - Default blog posts in `website/blog/` (welcome, first-blog-post, long-blog-post, mdx-blog-post) — replace with a single placeholder or remove the blog entirely if unused

2. **Reorganize the docs tree** so the sidebar reads logically, e.g.:
   - Introduction (`intro.mdx`)
   - Getting Started (`getting-started.mdx`)
   - API Reference (`api/`)
   - Advanced Guides (`advanced/`)
   - Migration (`migration.mdx`)
   - Example Projects (`guides/` — to be added in the final steps)

3. **Review `website/sidebars.ts`** and `_category_.json` files to make ordering explicit where needed.

4. **Verify build:** `cd website && npm run build`

**Files to create/modify:**
- Delete `website/docs/tutorial-basics/`, `website/docs/tutorial-extras/`
- Clean `website/blog/`
- Adjust `website/sidebars.ts` / `_category_.json` files

---

**Theme Reference:**
- See `THEME.md` for complete design specification
- See `TODO.md` for implementation checklist

**Next Step Preview:** After structure cleanup, the very last documentation steps are the real-world example projects (Satek complex example + smaller case studies) — then deploy.

---

### ✅ Step 12: Clean Up Docs Structure & Sidebar (COMPLETED)

**What was accomplished:**
- ✅ **Deleted Docusaurus template content:** `website/docs/tutorial-basics/` (create-a-page, create-a-document, create-a-blog-post, markdown-features, deploy-your-site, congratulations) and `website/docs/tutorial-extras/` (manage-docs-versions, translate-your-site)
- ✅ **Removed the unused blog entirely:** deleted `website/blog/` (welcome, first-blog-post, long-blog-post, mdx-blog-post), set `blog: false` in `docusaurus.config.ts` (the classic preset enables it by default otherwise), and removed the "Blog" navbar item + footer "Blog" link
- ✅ **Cleaned the footer:** replaced template footer (Community → Stack Overflow/Discord/X, all pointing to Docusaurus) with real Lesan links — Docs: Getting Started / API Reference / Concepts / Migrating to Lesan; More: GitHub / Playground (examples folder)
- ✅ **Reorganized the docs tree** into an explicit, unambiguous order (fixing the previous getting-started(2)/api(2) tie) — `sidebar_position` / category `position` now all distinct:
  1. Introduction (`intro.mdx`, 1)
  2. Getting Started (`getting-started.mdx`, 2)
  3. API Reference (`api/`, 3)
  4. Concepts (`concepts/`, 4)
  5. Advanced Guides (`advanced/`, 5)
  6. Migration (`migration.mdx`, 6)
  7. Example Projects (`guides/` — to be added in Steps 13–14, 7)
- ✅ Left `website/sidebars.ts` as the single autogenerated sidebar (no explicit overrides needed — ordering is fully expressed via frontmatter/category `position`)
- ✅ Production build verified (`npm run build` in `website/`); confirmed the blog route is no longer generated in `build/`

---

### ✅ Step 13: Write the Complex Example Documentation (Satek Project) (COMPLETED)

**What was accomplished:**
- ✅ Studied `/Users/syd/work/sitak/lesanSatek/back` (30-model procurement/warehouse system): `mod.ts` entry (`lesan()` → MongoClient → `odm.setDb` → one model per file → `functionsSetup()` → `runServer`), `models/*.ts` (pure + relations with `relatedRelations`, `excludes`, `limit`, `sort`, `createIndex`, model-level `excludes: ["password"]`), `src/<schema>/<act>/{mod,fn,val}.ts` layout, `utils/` (`MyContext extends LesanContenxt`, `grantAccess`, `setTokens`/`setUser` preAct hooks, `activeRoleMixin`, `pagination`, `createUpdateAt`, `throwError`), multi-role `activeRoleId` auth, feature flags (per-user + per-unit), text indexes (`$text` + `$meta: "textScore"` relevance sort), `$lookup` cross-collection checks, guarded `hardCascade` deletes, `addRelation({ replace: true })`.
- ✅ Created `website/docs/guides/_category_.json` (label "Example Projects", `position: 7`, generated-index) — reserved in Step 12.
- ✅ Created `website/docs/guides/complex-example.mdx` (sidebar_position 1) covering: domain overview, project layout, the model layer (`newModel` with `createIndex`/`excludes`, shared `createUpdateAt`/`excludes.ts` spreads, the 13-relation `purchasingRequest` hub), the action layer (`mod.ts`/`.val.ts`/`.fn.ts` trio, `validationRunType: "create"`, shared `activeRoleMixin`+`pagination`), authentication & context (`setTokens` → `setUser` → `grantAccess` chain, `hasFeature`, role-scoped `$match`), aggregation & search (text relevance ranking, `$lookup` size checks, offset pagination, matching count act), and relations in practice (`addRelation` with `replace`, guarded `hardCascade` deletes).
- ✅ All code excerpts adapted to `@hemedani/lesan` imports and verified against real framework source (`src/core/odm/newModel/mod.ts` confirms `createIndex` + model-level `excludes`; `src/context.ts` confirms `contextFns` API).
- ✅ Linked from `website/docs/intro.mdx` "Next Steps" and replaced the two "keep an eye on the upcoming real-world example projects in `docs/guides/`" placeholders in `advanced/request-lifecycle.mdx` + `advanced/relations-in-depth.mdx` with real links.
- ✅ Production build verified (`npm run build` in `website/`, `onBrokenLinks: 'throw'`).

---

### ✅ Step 14: Write Smaller Example Case Studies (LAST DOCUMENTATION STEP) (COMPLETED)

**What was accomplished:**
- ✅ Studied the four reference projects and identified each one's distinct Lesan pattern:
  - **NEJAT** (`/Users/syd/work/madani/nejat/lesan/back`) — road-accident analytics: ~40 models, GeoJSON spatial data via a shared superstruct `geoJSONStruct`, deep embedded `vehicle_dtos`/`pedestrian_dtos`, Jalali-calendar date handling, Redis, ~25 client-driven `charts/` analytics acts (`accidentSeverityAnalytics` runs three parallel `countDocument` calls)
  - **Paper** (`/Users/syd/work/momeni/paper`) — scientific publishing platform in a monorepo: shared `lib/` package (`@paper/lib`) holds all models + utils, models import `coreApp` from `@paper/back`, bounded fields via `size(number(), 1250, 1500)`, `registrar` relation auto-wired from context user
  - **Naghshe** (`/Users/syd/work/momeni/naghshe/back`) — tourism/heritage platform (db `yademan`): spatial search in `place/gets` (`$geoNear` as first stage + `$geoIntersects` polygon/area), Solar-Hijri "antiquity" filter, and `utils/actionGenerator.ts` that scaffolds typed `"use server"` Next.js API functions from the generated `ReqType` declarations
  - **Ziwound** (`/Users/syd/work/katiraei/ziwound/back`) — war-crimes reporting platform (db `gozaresh`): `RateLimiter` sliding-window class + `createRateLimitMiddleware` composed into `preAct` (100 req/min), non-CRUD acts (`statistics`, `exportCSV`, `exportPDF`), dot-notation relation `$in` filtering on `"hostileCountries._id"` etc., text indexes
- ✅ Created four case-study pages under `website/docs/guides/`, one per project (sidebar_position 2–5), each with: project goal, distinctive-pattern callout, models/relations table, acts list, and a faithful code excerpt adapted to `@hemedani/lesan` imports:
  - `case-study-nejat.mdx` — `geoJSONStruct` + `accidentSeverityAnalytics` (3× `countDocument`)
  - `case-study-paper.mdx` — `articleRelations` + `addArticleFn` (registrar from context, `TInsertRelations`)
  - `case-study-naghshe.mdx` — `$geoNear`/`$geoIntersects` pipeline + generated `"use server"` client fn
  - `case-study-ziwound.mdx` — `RateLimiter`/middleware wired into `preAct` + `statistics`/`exportCSV`
- ✅ Linked them from `website/docs/intro.mdx` "Next Steps" and from the Step 13 complex-example closing tip.
- ✅ Production build verified (`npm run build` in `website/`, `onBrokenLinks: 'throw'`); all five `build/docs/guides/` pages confirmed present.

**Documentation is now complete.** Remaining work is Phase 6 (polish & interactivity) and Phase 7 (deploy & maintain) — see TODO.md.

---

**Theme Reference:**
- See `THEME.md` for complete design specification
- See `TODO.md` for implementation checklist

**Next Step Preview:** Documentation is finished. The remaining phases are Phase 6 (polish & interactivity: search, smooth scroll, copy-to-clipboard, keyboard navigation, image optimization) and Phase 7 (deploy & maintain: GitHub Pages + GitHub Actions CI/CD, custom domain optional).

---

### ✅ Step 15: Add Local Search (Phase 6 — First Polish Step) (COMPLETED)

**What was accomplished:**
- ✅ Assessed all six Phase 6 items against the current site before writing code:
  - **Search** — NOT present → the real gap, chosen as this step's focus
  - **Smooth scroll** — already working (`scroll-behavior: smooth` in `src/css/custom.css`)
  - **Copy-to-clipboard on code blocks** — already working (Docusaurus v3 default)
  - **Loading skeletons / keyboard nav / image optimization** — deferred to later Phase 6 steps
- ✅ Added the **local search plugin** `@easyops-cn/docusaurus-search-local@0.55.3` (user-confirmed choice: offline, no Algolia account/keys, works on static GitHub Pages) via `npm install` in `website/`.
- ✅ Configured it in `website/docusaurus.config.ts` via a new `plugins` array: `hashed: true`, `indexDocs: true`, `indexBlog: false` (blog is disabled), `indexPages: false`, `docsRouteBasePath: '/docs'`, `searchBarPosition: 'navbar'`, `searchContextByPaths: ['docs']`, `language: ['en']`, `highlightSearchTermsOnTargetPage: true`, `searchResultContextMaxLength: 120`.
- ✅ The plugin reuses the pre-existing `.navbar__search` / `.navbar__search-input` classes, so the input already inherits the theme's glass styling and cyan focus glow.
- ✅ Added a Linear-Look dark-theme override block to `src/css/custom.css` for the results dropdown (the plugin's default panel uses light-theme colors like `#dfe3e8`): glass `var(--bg-secondary)` panel with thin border + cyan ambient shadow, hover highlight `rgba(34,211,238,0.08)`, muted result paths/summaries, themed kbd hints and context/query inputs.
- ✅ Verified:
  - `npm run build` passes (`onBrokenLinks: 'throw'`)
  - `build/search-index-docs.json` generated and populated (28+ docs, split into hashed chunks)
  - SSR HTML contains `navbar__search-input`
  - `npm run serve` → `/lesan/docs/intro` (200), `/lesan/search-index-docs.json` (200), search input present in served HTML
  - `npm run typecheck` still only reports the same **pre-existing** `JSX` namespace errors (React 19 + `strict` project typecheck; confirmed identical output with my changes stashed)

---

### ✅ Step 16: Add Step-by-Step Tutorials (mdBook Ports) (COMPLETED)

**What was accomplished:**
- ✅ Created a new top-level `website/docs/tutorials/` category (sidebar position **3**, between Getting Started and API Reference), with a `_category_.json` generated-index ("Step-by-step tutorials that build a complete country/city/user example…").
- ✅ Renumbered the surrounding sidebar to make room: `api` 3→4, `concepts` 4→5, `advanced` 5→6, `migration` 6→7, `guides` 7→8.
- ✅ Ported 9 of the original mdBook tutorial pages to MDX, adapting them to the **current** `@hemedani/lesan` API (verified against `src/core/odm/newModel/mod.ts` signatures + `examples/document/` runnable code):
  1. `add-more-relations.mdx` (mdBook `add_more_relation`) — second `relatedRelation` (`citiesByPopulation`), selective single `capital` via `isCapital`, new many-to-many `user` model (`livedCities` + `country`).
  2. `managing-relations.mdx` (mdBook `mannage_relations`) — short hub: relations are managed only via `addRelation`/`removeRelation`, never hand-edited.
  3. `add-relation.mdx` (mdBook `add_relation_fn`) — many-to-many `addUserLivedCities`, single `addUserCountry` with `replace: true`, and the 9-step under-the-hood explainer.
  4. `remove-relation.mdx` (mdBook `remove_relation_fn`) — many-to-many `removeLivedCities`, optional single `mostLovedCity`/`lovedByUser` add+remove.
  5. `find-and-find-one.mdx` (mdBook `findOne_and_find_fn`) — `findOne`/`find` with `selectStruct` per-relation depth object, `.skip()/.limit()/.toArray()` pagination.
  6. `aggregation.mdx` (mdBook `aggregation_fn`) — pipeline + generated `$lookup`/`$unwind`/`$project`, one-step-behind principle, list + single-doc variants.
  7. `find-one-and-update.mdx` (mdBook `find_one_and_update_functions`) — best/worse case updates, and the three scale solutions (QQ query-queue, in-memory DB, make-a-new-relation for `population`).
  8. `delete-one.mdx` (mdBook `delete_one_fn`) — simple user delete, country `relatedRelations` guard error, `hardCascade: true` recursive delete.
  9. `insert-many.mdx` (mdBook `insert_many_fn`) — many cities (single `capital: false` rule) and many users (all relation types), `docs` array + validation-before-database point.
- ✅ Skipped the first two mdBook pages (`getting_started`, `add_relation`) because [Getting Started](/docs/getting-started) already covers them; the tutorials reference it as the prerequisite and cross-link onward (each page links its full `examples/document/*.ts` source and the next tutorial).
- ✅ Cross-linked: `getting-started.mdx` "Next Steps" now lists the 7 tutorial pages before the API links; `intro.mdx` "Next Steps" gained a Tutorials entry.
- ✅ Verified:
  - `npm run build` passes with `onBrokenLinks: 'throw'` (zero broken links)
  - `build/docs/tutorials/` emits all 9 pages + category index
  - Sidebar renders Tutorials between Getting Started and API Reference (confirmed in generated HTML)

---

### Step 17: Next Phase 6 Polish Item (NEXT)

**Goal:** Continue Phase 6 (Polish & Interactivity) with the remaining items, one per session:

1. **Keyboard navigation** — add/enhance `/docs` keyboard affordances: document/table-of-contents skip links, visible focus states on nav/search/results, `⌘K`-style focus shortcut for the search bar (the plugin supports `searchBarShortcut`), and `keydown` traversal in the search dropdown.
2. **Optimize images and assets** — the landing page and docs use `img/logo.svg`, `img/favicon.ico`, and a social-card reference (`img/lesan-social-card.jpg` in `themeConfig.image`). Verify these exist, add `loading="lazy"`/`decoding="async"` where static images are rendered, and prune any unused/unreferenced assets in `website/static` to slim the bundle.
3. **Loading skeletons** — low priority for a fully static site (no data fetching); likely documented as not applicable, or a lightweight CSS `shimmer` polish for any async-loaded content.
4. **Phase 7 (deploy)** — after Phase 6: GitHub Pages workflow + `docusaurus deploy` config (the site config already has `organizationName: 'MiaadTeam'`, `projectName: 'lesan'`, `baseUrl: '/lesan/'`).

**Files to create/modify (Step 17):**
- `website/docusaurus.config.ts` (search shortcut option, if chosen)
- `website/src/css/custom.css` (focus/keyboard styles)
- `website/src/theme/` (only if swizzling the search bar for a ⌘K hint)

---
