# Plan: 10 landing-page changes for AlphaMasterCRM

Scope check against the current architecture: the homepage is 100% database-driven —
`Section`/`SectionItem` rows (seeded by `database/seeders/SectionSeeder.php`, editable
live in `/admin/sections`) get rendered by a fixed switch in
`resources/js/components/sections/section-renderer.tsx`, one React component per
section `key`. **Nothing here requires a rebuild.** Most of the 10 items are pure
content edits (seeder + admin panel); a few need one new small, reusable component
(not a redesign) plus 2-3 new section rows. Nav lives separately in
`site-header.tsx` / `site-footer.tsx` (hard-coded `NAV_LINKS`, not DB-driven).

## ⚠️ Decisions needed before I implement (can't guess these safely)

1. **Real dashboard screenshot (#2)** — there is currently **no real screenshot**.
   The "dashboard" in `hero.tsx` is a hand-built fake mock (`BrowserMock`) with
   made-up numbers (Active leads 2,481, etc.). To do what's asked — "the real
   CRM/Dashboard screenshot" — I need an actual image file from you (or a URL) of
   the real product UI. I can enlarge/feature whatever mockup exists, but I won't
   invent a "real screenshot" — that would just be more fake UI with a different
   label.
2. **Accurate feature/security/Forex copy (#4, #5, #6, #7)** — this repo is the
   marketing site only; it doesn't contain the actual CRM product. The current
   seeded copy (11 features + "Advertisers/Affiliates" framing) reads like an
   affiliate/CPA lead-gen network, not a general Forex/Crypto/sales-team CRM. Your
   brief explicitly says *"show only features/security that are actually
   implemented"* — I can restructure and tighten wording, but I can't verify from
   this codebase whether e.g. "Role-Based Access", "2FA", "Encryption", "Backups",
   or specific Forex capabilities are real product features. **I'll draft the 6
   feature blurbs, the Forex section, the Sales Team section, and the Security
   list using only what's already implied by existing seeded content (nothing
   new invented) — flag anything you want changed/removed once you see it.**
3. **Solutions / Integrations / Resources nav items (#3)** — no such pages exist
   (only `/`, `/api-docs`, and homepage anchors). Options: (a) point them at the
   closest existing homepage anchor (Solutions → Industries, Integrations →
   Features, Resources → FAQ or API Docs), or (b) build minimal new pages. Given
   "do not rebuild / not adding new functionality today," I'm defaulting to
   **(a) — anchor them to existing sections** unless you say otherwise.
4. **Privacy Policy / Terms (#9)** — footer asks for real links. I can create two
   minimal static pages, but I will not write real legal text — that needs your
   actual policy content (or a placeholder explicitly marked "Coming soon" until
   legal provides copy). Let me know which.

I'll proceed with the safe defaults above (3a, and honest/minimal copy for #2 and
#4) and implement everything else now; flag anything you want changed.

## Item-by-item plan

### 1. Hero headline/subtitle/buttons
- Edit `SectionSeeder.php` `hero` entry (or directly via `/admin/sections/{hero}`
  once seeded): title → *"The CRM Built for Forex, Crypto & High-Performance
  Sales Teams"*, subtitle → *"Manage leads, clients, sales teams, follow-ups and
  performance from one powerful CRM."*
- `content.primary_button_text` = "Book a Free Demo" (→ `#demo`, unchanged),
  `content.secondary_button_text` = "Explore Features" (→ `#platform-features`,
  changed from `#product-showcase`).
- No component code changes — `hero.tsx` already reads all of this from DB.

### 2. Dashboard screenshot large & prominent
- Pending decision #1 above. Once I have an image: replace (or wrap) the
  `BrowserMock` fake content in `hero.tsx` with an `<img>` of the real screenshot,
  increase its column width / remove the stat-strip competing for attention so
  the screenshot is the dominant visual (per the brief: "main visual focus").
- Keep the existing floating badge accents only if they reflect real behavior;
  otherwise drop them (no fake "AI Summary: Ready" callouts on a real screenshot).

### 3. Navbar cleanup
- `site-header.tsx` `NAV_LINKS`: replace current 6 items with
  `Features (#platform-features) | Solutions (#industries) | Integrations
  (#platform-features or a new anchor) | Pricing (#pricing) | Resources (#faq)`,
  plus existing `Log in` and `Book a Demo` (already styled as the highlighted
  gradient button — no change needed there).
- Mirror the same set in `site-footer.tsx`'s NAV_LINKS (currently duplicated,
  slightly different labels — will keep in sync).
- Drop `/api-docs` from the header/footer nav (not in the requested list) —
  the page itself stays live at its URL, just unlinked from nav.

### 4. Features section (6 clear features + benefit each)
- Rework `platform_features` section content in the seeder: replace the current
  11 items + Advertiser/Affiliate "featured" blocks with exactly 6 items:
  Lead Management, Sales Pipeline, Client Management, Team Management,
  Follow-ups & Activities, Reports & Analytics — each with a one-line benefit
  (subject to decision #2).
- Component change: `platform-features.tsx` currently branches into "compact
  grid" vs "featured big blocks" (via `meta.highlight_*`). With no featured
  items left, it collapses to just the clean 6-card grid — verify this renders
  fine with 6 items (likely 3-column grid, already responsive) and remove the
  now-dead "featured" branch/`FeatureMock` component if nothing uses it.

### 5. "Built for Forex Brokers" section
- New `Section` row, key `forex_brokers`, title "Built for Forex Brokers",
  with `SectionItem` rows for real Forex-relevant capabilities pulled from what
  the CRM already claims elsewhere (lead distribution/compliance/reporting) —
  see decision #2.
- New tiny reusable component, e.g. `resources/js/components/sections/icon-grid.tsx`
  (title/subtitle + icon+title+description cards) — this is the same visual
  pattern `platform-features.tsx`'s compact grid already uses, factored out so
  Forex/Sales-Team/Security sections all reuse one component instead of three
  near-duplicate ones (keeps things consistent, avoids "rebuilding" per-section).
- Add `case 'forex_brokers': return <IconGrid section={section} />` in
  `section-renderer.tsx`, insert the row after `platform_features` via
  `sort_order` (or reorder later via `/admin/sections`).

### 6. Sales Team section
- New `Section` row, key `sales_team`, title "Give Your Sales Team the Tools to
  Close More Deals", items: Lead Assignment, Follow-ups, Agent Performance,
  Pipeline Management, Conversion Tracking, Reporting — reuses the same
  `IconGrid` component from #5.

### 7. Security section
- New `Section` row, key `security`, title "Your Data. Your Control.", items:
  2FA, Role-Based Access, Encryption, Backups, Activity Logs — again reuses
  `IconGrid`. **Only include items you confirm are actually implemented**
  (decision #2) — I won't ship an unverified security claim.

### 8. Mid-page + bottom CTA
- Bottom: `final_cta` section already exists with a working demo-request form —
  update its title to "Ready to Take Control of Your Sales?" and button label to
  "Book Your Free Demo" (content edit only, no code change).
- Mid-page (after Features, per the brief "after the main features"): add a new
  lightweight `Section` row, key `mid_page_cta`, and a small new component
  (`cta-banner.tsx` — headline + single button, no form) so it doesn't duplicate
  the actual booking form or clash with the `#demo` anchor. Button links to
  `#demo` to scroll down to the real form.

### 9. Footer overhaul
- `site-footer.tsx`: restructure the "Platform" column to
  Features / Solutions / Integrations / Pricing / Contact / Security / Privacy
  Policy / Terms / Login. Contact → existing `mailto:`/`tel:` links already
  present; Security → `#security` anchor (new section from #7); Privacy
  Policy/Terms → pending decision #4 (new minimal pages `/privacy`, `/terms` +
  routes, or "Coming soon" placeholders).
- Visual pass: tighten column spacing/typography to look more like a standard
  B2B SaaS footer (this repo's footer is currently fairly bare — 3-column grid
  with logo/blurb, nav, contact). No structural rebuild, just spacing/type/
  divider polish alongside the content changes above.

### 10. Final UI polish pass
- Sweep every section component for:
  - **Buttons**: confirm all primary CTAs use the same `gradient` Button
    variant, secondary actions use `outline`, consistent sizing (`lg` for
    hero/CTA, default elsewhere).
  - **Cards**: confirm consistent `rounded-2xl`/`rounded-xl` usage and
    `border bg-card p-6/p-8` pattern across Features, Forex, Sales Team,
    Security, Pricing, FAQ, Product Showcase — currently slightly inconsistent
    (some use `rounded-2xl`, some `rounded-xl`, some `rounded-3xl` on
    `final-cta.tsx`'s form card).
  - **Spacing**: standardize section vertical padding (`py-16 sm:py-20` is
    the common pattern already — check `pricing`/`roi-calculator`/
    `social-proof` for outliers).
  - **Typography**: consistent heading scale (`text-2xl`/`text-3xl`/`text-4xl`
    hierarchy per section level — h1 hero vs h2 section titles).
  - **Remove unnecessary elements**: candidates flagged during exploration —
    the floating "AI Summary: Ready" / "Assigned → Agent A" badges on the Hero
    mock (fake, and gone anyway once real screenshot lands); re-check
    `roi-calculator.tsx` fits the "no fake stats" spirit since its math is
    hard-coded, not tied to real data — likely fine since it's explicitly a
    user-input calculator, not a claimed stat.
  - **Mobile check**: manually verify each reworked/new section
    (`icon-grid.tsx`, `cta-banner.tsx`, updated `platform-features.tsx`,
    updated footer) at mobile widths after implementation.

## Suggested execution order
1. Confirm decisions #1-#4 (or accept my defaults above).
2. Nav + footer structure (#3, #9 nav part) — quick, unblocks nothing else.
3. Content-only edits: Hero (#1), Features rewrite (#4), bottom CTA copy (#8) —
   all via `SectionSeeder.php`, no new components.
4. Build `IconGrid` + `CtaBanner` components, wire into `section-renderer.tsx`,
   seed Forex (#5), Sales Team (#6), Security (#7), mid-page CTA (#8) sections.
5. Privacy/Terms pages if you want real pages now (#9).
6. Final polish pass (#10) across everything touched.
7. Full manual pass on mobile + re-run `npm run build`/lint/tests.
