# Build Prompt for Claude Code — AlphaMasterCRM Landing Page

Copy everything below into Claude Code to start the build.

---

## Project Overview

Build a premium marketing landing page for **AlphaMasterCRM** (an all-in-one CRM for Forex/CFD brokers, crypto companies, call centers, lead generation companies, and sales teams), with a full admin panel to manage all content.

**Existing state:** the Laravel + Inertia + React project is already scaffolded (Vite build working, Inertia routing configured), but it currently has **no UI, no auth, and no database models**. Treat this as building on top of an empty shell — inspect the existing `routes/web.php`, `resources/js/`, and `app/Http/Controllers` structure first before adding anything, and match whatever conventions are already in place (folder structure, naming, existing layout components if any).

**Stack:**

- Laravel (already installed — check `composer.json` for the version)
- Inertia.js + React (already installed — check `package.json` and `resources/js` for the existing setup/layout structure before adding new pages)
- MySQL (or whatever DB is already configured in `.env`)
- Tailwind CSS for styling (check if already installed/configured; add if missing)
- Laravel Breeze (Inertia + React preset) or Fortify for admin authentication — since there's no auth yet, install this first (single admin user is fine, but design auth so more can be added later)

**Public site goal:** drive visitors to click "Book a Demo." Premium, enterprise, modern SaaS feel. Fast-loading, SEO-friendly, no unnecessary JS bloat on public pages.

**Admin panel goal:** allow non-technical staff to edit every piece of website content without touching code — text, images, section order/visibility, repeatable cards, demo requests, and site-wide settings.

---

## Data Model

Create migrations and Eloquent models for:

### 1. `sections`

Controls the 7 landing page sections (Hero, Why AlphaMasterCRM, Product Showcase, Industries, Powerful Management, AI & Automation, Final CTA).

- `id`
- `key` (string, unique — e.g. `hero`, `why_us`, `product_showcase`, `industries`, `powerful_management`, `ai_automation`, `final_cta`)
- `title` (nullable — section headline)
- `subtitle` / `body` (text/longtext, nullable)
- `is_enabled` (boolean, default true)
- `sort_order` (integer)
- `content` (JSON — flexible field for section-specific data: button text/links, stat labels, etc.)
- timestamps

### 2. `section_items`

For repeatable content within a section — feature cards (6), industry cards (5), product showcase items, stats.

- `id`
- `section_id` (FK to `sections`)
- `title`
- `description` (text, nullable)
- `image_path` (nullable)
- `icon` (nullable, string — icon name/class if using an icon set)
- `link_url` (nullable)
- `sort_order` (integer)
- `is_enabled` (boolean, default true)
- `meta` (JSON, nullable — for extra fields per item type, e.g. stat values)
- timestamps

### 3. `demo_requests`

Captures the demo form submissions.

- `id`
- `name`
- `company`
- `email`
- `phone` (WhatsApp/phone combined field)
- `country`
- `business_type`
- `message` (text, nullable)
- `status` (enum/string: `new`, `contacted`, `converted`, `closed` — default `new`)
- timestamps

### 4. `site_settings`

Single-row (or key-value) table for global settings.

- `id`
- `site_title`
- `seo_title`
- `seo_description`
- `contact_email`
- `contact_phone`
- `social_facebook`, `social_instagram`, `social_linkedin`, `social_twitter` (nullable)
- `tracking_ga_id` (nullable)
- `tracking_meta_pixel_id` (nullable)
- `tracking_custom_head_script` (text, nullable — for any extra tracking snippets)
- `logo_path`, `favicon_path` (nullable)
- timestamps

Use a `SiteSetting::current()` static accessor pattern (get-or-create the single row) so it's easy to use in both admin and public pages.

---

## Admin Panel (Inertia + React) — Pages Needed

Build under `/admin` (protected by auth middleware):

1. **Dashboard** — quick overview: total demo requests, new requests this week, quick links to sections.
2. **Sections Manager**
    - List all 7 sections with drag-and-drop reorder (use `dnd-kit` or `react-beautiful-dnd` alternative) and an enable/disable toggle per row.
    - Click into a section to edit its title/subtitle/body and section-specific `content` JSON fields via a form.
    - Within a section's edit page, manage its `section_items` (add/edit/delete/reorder feature cards, industry cards, stats, etc.) — include image upload per item.
3. **Demo Requests**
    - Table of all submissions, sortable/filterable by status and date.
    - View/detail modal or page per request.
    - Ability to update status (new/contacted/converted/closed).
    - Export to CSV (nice-to-have).
4. **Site Settings**
    - Single form: SEO title/description, contact info, social links, tracking codes, logo/favicon upload.
5. **Auth**
    - Login page for admin (Breeze scaffolding is fine). No public registration.

**Admin UI requirements:**

- Use Tailwind for consistent styling.
- File uploads should preview the image before/after upload and store via Laravel's filesystem (local or S3-ready).
- All forms need server-side validation (Laravel Form Requests) with errors surfaced cleanly in the React forms via Inertia's error bag.
- Reordering must persist `sort_order` on drop (debounce/batch update to avoid excessive requests).

---

## Public Site — Pages/Sections Needed

Single landing page (`/`) rendering all enabled sections in their configured order, pulling all content dynamically from the database (no hard-coded text/images). Structure:

1. **Hero** — headline, subtext, dashboard visual, "Book a Demo" + "Explore the CRM" buttons.
2. **Why AlphaMasterCRM** — headline + 6 feature cards (icon, title, description).
3. **Product Showcase** — visual-heavy grid/carousel of screenshots (Dashboard, Lead Management, Customer Profile, Sales Pipeline, Reports, Call Center, Automation, Team Performance). Minimal text.
4. **Industries** — 5 cards (Forex & CFD, Crypto, Call Centers, Lead Generation, Sales Organizations), each with a one-line benefit.
5. **Powerful Management** — headline + text + visual stats block (Today's Leads, Conversions, Conversion Rate, Active Agents, Sales, Top Campaigns). These can be static/sample numbers stored in `section_items.meta` since there's no live CRM data feed.
6. **AI & Automation** — visual/futuristic section listing AI capabilities (AI customer summaries, AI content assistance, smart lead distribution, automated follow-ups, workflow automation, management insights). Do NOT imply real-time functionality beyond what's described.
7. **Final CTA + Demo Form** — closing headline/pitch + demo request form (Name, Company, Email, Phone/WhatsApp, Country, Business Type, Message) submitting via Inertia form POST to a public `DemoRequestController@store`.

**Design direction:** premium, powerful, modern SaaS aesthetic — strong typography, generous spacing, subtle animations (Framer Motion is fine), dashboard-style visuals, avoid generic stock photography. "Book a Demo" button should be visible in the header/nav at all times and repeated at natural points down the page.

**SEO:** render `seo_title` and `seo_description` from `site_settings` into the `<head>` via Inertia's `<Head>` component. Include Open Graph tags. Public page should be server-rendered (SSR via Inertia SSR, or at least ensure meta tags are present without requiring JS execution for crawlers).

---

## Build Order (suggested)

1. **Inspect the existing project first** — check `composer.json`, `package.json`, `routes/web.php`, `resources/js/` structure, `.env` DB config, and any existing layout/component conventions before writing anything new.
2. Install Tailwind (if not already present) and Laravel Breeze with the Inertia + React preset for auth (there's no auth yet — restrict registration so only admins can be created, e.g. via seeder/tinker rather than a public register page).
3. Migrations + models for `sections`, `section_items`, `demo_requests`, `site_settings`.
4. Seeder that populates the 7 default sections and their items with the content from this brief (as starting/sample data).
5. Admin: Sections Manager (list + reorder + toggle) → Section edit form → Section Items CRUD with image upload.
6. Admin: Site Settings page.
7. Admin: Demo Requests list + detail + status update.
8. Public: dynamic section renderer — one React component per section `key`, driven by DB data, assembled on the homepage in `sort_order`.
9. Public: demo form + submission handling + validation + success state.
10. Polish: SEO meta tags, tracking script injection from `site_settings`, responsive design pass, image optimization.

---

## Constraints / Reminders

- No hard-coded website content — every visible text/image/button must trace back to the database.
- Sections must be independently enable/disable-able and reorderable from the admin.
- Don't overclaim AI features that don't exist — keep the AI & Automation section's copy aligned with what's actually listed in this brief.
- Keep the public site fast — no admin JS/CSS should load on public routes.
