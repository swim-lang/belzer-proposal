# Thrive Preschool proposal research

Prepared October 9, 2026. Internal scoping notes, not a client deliverable or authorization to change Thrive's site.

## Sources

- Matt / Sean, “Re: Website Underpinning Overhaul”: https://mail.missiveapp.com/#inbox/conversations/b09016fc-e5d6-437e-a68a-c743b36741b6
- Existing portal task: `316b1f03-96ff-471f-82fb-27a0a828e94d`, “Scope website modernization options for Matt”.
- Authorized read-only audit by the existing “Thrive Website” chat on Mac Mini: `01a03eaa-2705-7600-88cc-be25fc311862`, completed October 9. Local restored to its stopped state after inspection.
- Public production: https://thrivepreschool.com/
- Public sitemap: https://thrivepreschool.com/sitemap_index.xml
- Provider pricing: https://vercel.com/pricing (checked October 9: Pro starts at $20/month, additional usage/team costs possible).

## What Matt requested

Intermittent slowness, older PHP/WordPress/add-on maintenance, and difficulty managing marketing/tracking/SEO code. Wants change details and costs for a focused WordPress update versus a clean rebuild. Marketing budget is stretched; a simpler short-term update may be necessary. No price was quoted in the four-message thread. Sean's current reply was verified as sent, superseding older memory that described it as an unsent draft.

## Public inventory and local findings

Our read-only crawl fetched all 139 sitemap-listed URLs without fetch errors. This is not a form, browser, speed, or integration-functionality test. Sitemap entries are not equivalent to unique page designs. The saved JSON captures statuses, final URLs, titles, descriptions, headings, canonicals and form-tag counts.

The companion audit used public REST endpoints and markup for current counts and Local for code/data structure:

- Production: 27 published pages, 13 posts, four locations, five programs, seven people, 11 PPC/enrollment pages, 66 event records (67 sitemap entries), 496 media records.
- Local only until a fresh production export: seven non-trash Gravity Forms, 1,992 historical active entries, 24 enabled redirects, four disabled rules, 28 menu items, 17 active plugins, roughly 1.9 GB uploads.
- Four booking pages use GoHighLevel/LeadConnector embeds. Preserve existing scheduler IDs rather than rebuilding booking.
- MEC has one-off events and school categories. Initial scope covers main calendar and four school views, filtering and existing detail pages. No recurrence engine or full admin.
- Legacy PPC pages and Admissions reference Gravity Forms. Existing inquiry/download flows must be mapped before retirement. Archive records securely; do not put them in a public repository or import them into an agent's context.
- WordPress search requires a replacement, included in the migration planning range.
- Existing GTM/dataLayer conventions, PixelYourSite locally, and external school chat widgets require reconciliation against production account settings. Loading a script does not verify event delivery or conversion attribution.
- All 11 /discover/ pages were verified by the companion audit as noindex, follow. Preserve intentional campaign indexing; review other indexing choices explicitly.
- Public sitemap includes seven Elementor global templates. robots.txt blocks upload paths. These observations need approved decisions, not automatic deletion/indexing changes.
- Local records trail production changes September 16, September 20, and October 2. Never migrate from the stale Local database; obtain a fresh production export and a content-freeze/cutover plan.

## Reuse and rights

Reuse existing identity, layout patterns, content models, icons and suitable styles/scripts where rights allow. PHP templates, WordPress plugins and Elementor data are specifications for rebuilding, not portable application code. The old theme was not in Git; no clear project-level asset licensing records found. Fonts include Mabry Pro, Stinger Fit and files named StingerFitTrial. Confirm webfont rights and existing asset ownership before committing to reuse. No legal conclusion about current ownership is implied.

## Current direction from Sean

Sean revised the draft after review: maintenance is $999 with the existing 10-hour allowance; full migration is a $3,999 fixed project fee, including a lightweight content backend and an agent-led implementation workflow. This replaces the initial pricing and the earlier exclusion of a client content backend. The backend includes authenticated routine content/event editing, persistent storage, preview/approval, basic history and recovery. Broader CRM, booking, visual page-builder and advanced permission systems remain separate. Migration payment milestones are 50% ($1,999.50) at kickoff and 50% ($1,999.50) before launch. Sean’s latest direction sets about one week of focused work, dependent on access, feedback and final checks. Included migration bonuses: foundational search/agent readability (metadata, semantic crawlable content, relevant structured data), mobile usability polish, and lightweight motion for selected existing illustrations respecting reduced-motion preferences. These are included in the $3,999 fee; ongoing SEO remains separate. Recurring services are separate. Sean approved publication of this proposal with the $3,999 migration fee. This does not authorize website migration work.

## Original pricing rationale (superseded)

Draft only, subject to Sean's review:

1. $1,500 capped 10-hour maintenance pass. This is intentionally narrower than a full stabilization program. Baseline, staging, safe compatible updates, limited cleanup, priority-path checks and a findings report must fit the allowance. Stop and quote blockers separately. No promise to resolve every legacy issue or deliver a speed score.
2. $14,500–$19,500 migration planning range. The companion audit estimated 95–135 hours for a code-first parity rebuild, about $14,250–$20,250 at an illustrative $150/hour, with extra effort possible for archival/admin. The draft is a rounded planning range, not a binding fee; current forms, archive, content and licensing must be validated before a fixed quote. Existing seven-page New Line scope at $6,500 and nine-page M. Bouvier branding/site package at $9,900 are poor direct parity comparisons for this site's multiple content types, calendar, forms, legacy records and campaign integrations.

Target migration: 6–8 weeks, one consolidated refinement, 30-day correction window for introduced defects. Proposed 50/25/25 milestones; maintenance 100% upfront. No invoice or agreement created. Neither choice requires buying the other. No implicit credit for later migration.

Original implementation assumption (backend exclusion superseded above): static rendered pages and typed content collections (Astro is a candidate), GitHub, Vercel, retained GoHighLevel embeds, a small event collection and static search. No client CMS/admin, CRM replacement, parent portal, new branding, new copy campaign or Reunion launch. Agent-assisted changes require a preview and human approval. A trained site owner must accept this editing workflow before replacing WordPress.

Current Flywheel, CRM, form-service, chat and assistant subscriptions are not all verified. Do not promise hosting savings. $20/month is a provider starting price, not an all-in quote. Keep old hosting through the rollback/archive handoff.

## Unverified items before contracting / implementation

Fresh authenticated production database; live plugin state; actual slowdown cause and performance baseline; current form mapping and notifications; GoHighLevel/GTM/Meta account configuration; field/data-retention requirements; calendar parity and school categories; asset licenses; client editing owner; recurring service costs. No submissions, client messages, site edits or deployment occurred during research.
