import { useEffect, type ReactNode } from 'react'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const approvalHref = `mailto:sean@anchovies.agency?subject=${encodeURIComponent('Thrive website: next steps')}&body=${encodeURIComponent('Hi Sean,\n\nThanks for putting this together. We’d like to talk through the website options and confirm the right scope and start date.\n\nThanks!')}`
const sections = [['goals', 'Goals'], ['options', 'Options'], ['scope', 'Scope'], ['architecture', 'Architecture'], ['updates', 'Future Updates'], ['timeline', 'Timeline'], ['investment', 'Investment'], ['next', 'Next Steps']]
const migrationFee = 3999
const maintenanceFee = 999
const money = (value: number) => '$' + value.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 })
const scope = [
  {
    title: 'Inventory and a safe starting point',
    intro: 'Begin with a fresh copy of the live site and a clear checklist of what needs to keep working.',
    items: [
      'Inventory published pages, programs, locations, people, articles, events, downloads, and campaign landing pages. Agree on the migration list before building.',
      'Record important URLs, existing redirects, search settings, forms, booking paths, analytics, advertising tags, and third-party services. Use available Search Console and analytics data to set a baseline.',
      'Back up the live site and keep it running during the build. Agree on a short content freeze before cutover and securely archive existing form entries before WordPress is retired.',
    ],
  },
  {
    title: 'Rebuild the existing website',
    intro: 'Keep Thrive’s identity, content, and familiar page layouts. Replace the WordPress foundation with a maintainable codebase.',
    items: [
      'Recreate the shared header, navigation, footer, and responsive page templates, with small usability and accessibility fixes where needed.',
      'Move the current public content and media for all four schools, including programs, people, articles, enrollment information, and all 11 published campaign landing pages. Include the existing site search.',
      'Preserve existing page addresses wherever possible. Map redirects for any approved changes, retain page metadata, and recreate the sitemap and approved indexing rules, including the campaign pages that should stay out of search.',
    ],
  },
  {
    title: 'Preserve enrollment and calendar paths',
    intro: 'Families should still be able to find their school, make an inquiry, and understand what comes next.',
    items: [
      'Retain the four GoHighLevel tour-booking embeds. Recreate up to seven existing simple inquiry or download forms in an agreed service, preserving fields, school routing, confirmation pages, downloads, and notifications.',
      'Move the existing event records into a shared calendar and four school views, with school filtering and event detail pages. The scope assumes the current one-off event model; recurring-event automation is separate.',
      'Retain approved analytics, advertising tags, chat, downloads, and video embeds. Test the agreed conversion paths with your team before launch.',
    ],
  },
  {
    title: 'A lightweight content backend',
    intro: 'A simple, secure place to manage the content Thrive updates most often.',
    items: [
      'Authenticated staff access to edit page copy, images, school details, and one-off calendar events, with changes saved in persistent storage.',
      'An agent-assisted workflow for preparing content and code changes, with a preview and human approval before publication.',
      'Basic change history and a recovery process, plus checks that saved edits appear correctly on the website. Keep existing booking and CRM services connected.',
    ],
  },
  {
    title: 'Included bonuses: search, mobile, and motion',
    intro: 'A few thoughtful improvements to make the existing site clearer, easier to use, and more lively.',
    items: [
      'Review page titles, descriptions, headings, internal links, and relevant structured data. Make school and program information easier for search engines and AI agents to read through clear page structure and crawlable content.',
      'Polish rough spots on mobile, including spacing, text sizing, navigation, image crops, and tap targets, while keeping the existing design.',
      'Add subtle motion to selected existing illustrations and gentle transitions where they help bring the site to life. Keep the effects lightweight and respect reduced-motion preferences.',
    ],
  },
  {
    title: 'Review, launch, and hand over',
    intro: 'A controlled changeover, with clear ownership and a practical way to make future updates.',
    items: [
      'One consolidated round of refinements, desktop and mobile checks, URL and redirect checks, and agreed form and tracking tests.',
      'Publish after your approval, keep a rollback copy, and check key pages, inquiries, and available search data for 30 days. Correct issues introduced by the migration during that period.',
      'Provide the source repository, content export, backend and hosting access handoff, and a recorded walkthrough of the update and publishing process.',
    ],
  },
]
function Section({ id, number, title, children, dark = false }: { id: string; number: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-16 md:px-16 lg:px-[120px] lg:py-24 ${dark ? 'bg-ink text-paper' : ''}`}>
    <span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>§ {number} · {title}</span>
    <h2 id={`${id}-title`} className="display mb-10 mt-8 text-[48px] md:text-[72px]">{title}</h2>
    {children}
  </section>
}
export function ThriveWebsiteProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Thrive Preschool · Website Options'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Website maintenance and migration options for Thrive Preschool. Scope, costs, editing, and a controlled launch.')
  }, [])
  return <div className="bg-paper text-ink">
    <a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
    <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16">
        <a href="#overview" aria-label="Thrive proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" /><span className="hidden text-[13px] sm:inline">Anchovies × Thrive Preschool</span></a>
        <a href="#investment" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium transition-colors hover:bg-ink hover:text-paper">View investment</a>
      </div>
      <nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}</nav>
    </header>
    <main>
      <section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 md:py-24 lg:px-[120px]">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row"><span className="eyebrow text-ink-2">Thrive Preschool · Website</span><span className="eyebrow text-ink-2">October 9, 2026</span></div>
        <h1 className="display max-w-[1100px] pb-10 text-[56px] tracking-[-0.028em] sm:text-[80px] md:text-[104px] lg:text-[116px]">A simpler website foundation.</h1>
        <div className="grid gap-8 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <p className="serif max-w-[640px] text-[30px] leading-[1.3] md:text-[38px]">Keep what families know. Make the site easier to care for.</p>
          <div className="space-y-6"><p className="text-[15px] leading-7 text-ink-2">Thrive already has a website, an established identity, and important enrollment paths. We’ll focus on the technology underneath it, with two options that account for your current budget and how you want to manage the site next.</p><div className="flex flex-wrap gap-x-8 gap-y-3"><span className="eyebrow">Maintain WordPress</span><span className="eyebrow">or move to a new foundation</span></div></div>
        </div>
      </section>
      <Section id="goals" number="01" title="Goals">
        <div className="grid gap-10 md:grid-cols-3">{[
          ['Reliable enrollment paths', 'Help families find the right school and take the next step, while preserving the inquiry and tour tools your team already uses.'],
          ['Easier maintenance', 'Reduce avoidable technical complexity and make future updates easier to review, test, and publish.'],
          ['Protect existing value', 'Keep useful content, recognizable design, established URLs, and marketing measurement in place through the change.'],
        ].map(([title, body]) => <div key={title} className="border-t border-[var(--color-rule)] pt-6"><h3 className="serif mb-5 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div>
      </Section>
      <Section id="options" number="02" title="Options">
        <p className="mb-10 max-w-[850px] text-[17px] leading-7 text-ink-2">Our initial review found a custom WordPress site with page-builder content, an events calendar, and external enrollment services. We can keep the existing design and useful services while improving the system underneath. We’ll measure the intermittent slowdown as part of the initial review.</p>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">Option 1 · Lower upfront cost</span><h3 className="serif mb-5 mt-5 text-[34px] leading-tight">Focused WordPress maintenance</h3><p className="mb-5 text-[15px] leading-7 text-ink-2">Keep the existing system and address the most practical issues first. A sensible short-term choice when budget is the immediate constraint.</p><ul className="list-disc space-y-3 pl-5 text-[15px] leading-7"><li>Fresh backup and staging copy, a performance baseline, and a review of the active theme and plugins.</li><li>Within a 10-hour total allowance: the review above, compatible WordPress, PHP, and plugin updates, straightforward cleanup, and checks of priority pages and enrollment paths.</li><li>A summary of completed work and any unsupported components or larger repairs that need a separate decision.</li></ul><p className="mt-6 text-[14px] leading-7 text-ink-2">This keeps WordPress and its ongoing maintenance needs. We’ll flag blockers before the time allowance is exhausted. Major repairs, plugin replacement, and a guaranteed speed improvement are outside this pass.</p></div>
          <div className="border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">Option 2 · Long-term direction</span><h3 className="serif mb-5 mt-5 text-[34px] leading-tight">Move out of WordPress</h3><p className="mb-5 text-[15px] leading-7 text-ink-2">Use an agent-led development process to rebuild the existing site, reuse its design, and add a lightweight content backend. Anchovies reviews the work and handles testing and launch.</p><ul className="list-disc space-y-3 pl-5 text-[15px] leading-7"><li>Retain the current identity, content, and familiar layouts.</li><li>Replace WordPress with reusable page templates and a simple backend for routine content updates.</li><li>Set up version history, private previews, human approval, and a documented publishing process.</li></ul><p className="mt-6 text-[14px] leading-7 text-ink-2">The {money(migrationFee)} project fee includes the migration, lightweight backend, and search, mobile, and motion bonuses described below. We’ll confirm the content inventory and editing needs at kickoff, then build and review the new workflow together.</p></div>
        </div>
      </Section>
      <Section id="scope" number="03" title="Migration Scope">
        {scope.map((group, i) => <div key={group.title} className="grid gap-8 border-t border-[var(--color-rule)] py-9 lg:grid-cols-[1fr_1.25fr] lg:gap-16"><div><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-4 mt-4 text-[32px] leading-tight md:text-[36px]">{group.title}</h3><p className="max-w-[420px] text-[15px] leading-7 text-ink-2">{group.intro}</p></div><ul className="space-y-4">{group.items.map(item => <li key={item} className="flex gap-4 text-[15px] leading-7"><span aria-hidden="true" className="text-ink-2">↗</span><span>{item}</span></li>)}</ul></div>)}
        <div className="border-t border-[var(--color-rule)] pt-8"><h3 className="serif mb-4 text-[28px]">What stays. What changes.</h3><p className="max-w-[950px] text-[14px] leading-7 text-ink-2">Your domain, approved content, photography, brand assets, and existing service accounts remain yours. We’ll reuse suitable front-end styles and scripts where ownership and licenses allow. WordPress-specific PHP, plugin code, and page-builder markup need replacement or adaptation; they do not transfer directly to the new site.</p><p className="mt-4 max-w-[950px] text-[14px] leading-7 text-ink-2">The agreement will include delivery of Thrive-specific website and backend source code and content after full payment, with access to the repository and hosting project. Existing software, fonts, images, and reusable tools remain subject to their applicable licenses. You’ll receive what another developer needs to maintain the site.</p></div>
        <div className="mt-8 border-t border-[var(--color-rule)] pt-8"><h3 className="serif mb-4 text-[28px]">Scope boundaries</h3><p className="max-w-[950px] text-[14px] leading-7 text-ink-2">This covers the agreed current site, the content backend, and the included search, mobile, and motion improvements. The draft Reunion location, new branding, a visual redesign, substantial copywriting, new campaigns, a parent portal, historical inquiry-data import into a new system, custom CRM development, and ongoing SEO are separate. The included backend covers routine content and event edits. Advanced staff permissions, recurring-event automation, a new booking system, and a drag-and-drop page builder are separate. We’ll agree on any additional work and its cost before proceeding.</p></div>
      </Section>
      <Section id="architecture" number="04" title="Architecture">
        <p className="serif mb-8 max-w-[850px] text-[32px] leading-[1.3]">Next.js, React, and TypeScript, with a PostgreSQL content backend.</p>
        <p className="mb-10 max-w-[900px] text-[15px] leading-7 text-ink-2">The migration option is a new application built around Thrive’s existing design and content. We’ll replace the WordPress/PHP theme and plugin runtime, reusing suitable assets and front-end code where practical. The maintenance option keeps the current WordPress stack.</p>
        <div>{[
          ['Application', 'Next.js + React + TypeScript', 'One codebase for the public website and lightweight staff editor. Public pages will be pre-rendered or server-rendered as HTML so their content is readable by visitors, search engines, and agents without depending on client-side JavaScript.'],
          ['Backend', 'Next.js server code on Vercel', 'Server-side handlers will validate staff access and process content saves, previews, and publishing. Vercel hosts both the website and this application logic.'],
          ['Data, login, and files', 'Supabase: PostgreSQL + Auth + Storage', 'PostgreSQL stores structured page, school, and event content, drafts, and revision records. Supabase Auth handles staff login; Storage holds uploaded media. Access rules keep drafts and editing restricted to authorized staff. This is the proposed database choice.'],
          ['Source and releases', 'GitHub + Vercel previews', 'GitHub holds the source code and its version history. Vercel builds and deploys approved code changes. Content edits use a draft-and-publish workflow in the backend, while code changes receive a preview deployment before release.'],
        ].map(([role, title, body]) => <div key={role} className="grid gap-4 border-t border-[var(--color-rule)] py-7 lg:grid-cols-[1fr_1.4fr] lg:gap-12"><div><span className="eyebrow text-ink-2">{role}</span><h3 className="serif mt-3 text-[28px] leading-tight">{title}</h3></div><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div>
        <p className="mt-7 max-w-[900px] text-[14px] leading-7 text-ink-2">Existing GoHighLevel booking and CRM services remain connected. The agent-assisted workflow helps prepare and test changes; the website runs independently of a coding agent. This architecture is included in the $3,999 migration fee, with hosting, database, storage, and other subscriptions billed separately. Handoff includes the application source, database schema, content export, and service access.</p>
        <p className="mt-5 text-[13px] text-ink-2">Platform details: <a href="https://nextjs.org/docs" target="_blank" rel="noreferrer" className="underline underline-offset-4">Next.js</a> · <a href="https://supabase.com/docs" target="_blank" rel="noreferrer" className="underline underline-offset-4">Supabase</a> · <a href="https://vercel.com/docs/functions" target="_blank" rel="noreferrer" className="underline underline-offset-4">Vercel Functions</a></p>
      </Section>
      <Section id="updates" number="05" title="Future Updates">
        <p className="serif mb-8 max-w-[780px] text-[32px] leading-[1.3]">Request an edit. Review a preview. Approve the change.</p>
        <div className="grid gap-10 lg:grid-cols-2"><p className="text-[15px] leading-7 text-ink-2">We’ll keep the website and backend code in GitHub, with hosting and previews on Vercel. Your team can make routine content edits through the new backend, and an agent can help prepare broader content or code changes. Saved changes are reviewed in preview before an authorized person publishes them.</p><p className="text-[15px] leading-7 text-ink-2">The migration includes one training session and a short guide covering common edits, review checks, publishing, and rollback. We’ll demonstrate the backend and agent-assisted workflow during the build and confirm who on your team will review and publish updates.</p></div>
        <p className="mt-8 max-w-[950px] text-[14px] leading-7 text-ink-2">AI helps prepare changes; a person remains responsible for accuracy and approval. Backend development is included in the project fee. Hosting, database and storage usage, service subscriptions, coding-assistant access, and ongoing support are separate. We’ll confirm the required services and recurring costs before work begins. Removing WordPress does not remove every maintenance need or third-party script.</p>
        <p className="mt-5 max-w-[950px] text-[14px] leading-7 text-ink-2">For planning, <a href="https://vercel.com/pricing" target="_blank" rel="noreferrer" className="underline underline-offset-4">Vercel Pro currently starts at $20/month</a>, with additional usage and team costs possible. Your existing booking and CRM subscriptions continue separately. We’ll confirm any form-service costs and your preferred editing tool before kickoff; ongoing Anchovies support can be quoted as needed.</p>
      </Section>
      <Section id="timeline" number="06" title="Timeline">
        {[
          ['Option 1', 'About one week', 'Schedule the maintenance pass, work in staging, review results, and publish approved updates.'],
          ['Option 2', 'About one week', 'Confirm the inventory and update workflow, build the replacement, test enrollment and search paths, then launch after approval.'],
          ['After migration', '30-day check', 'Monitor the agreed launch checks and address issues introduced by the migration.'],
        ].map(([time, title, body]) => <div key={time} className="grid gap-3 border-t border-[var(--color-rule)] py-6 md:grid-cols-[150px_1fr_1.5fr] md:gap-8"><span className="eyebrow text-ink-2">{time}</span><h3 className="serif text-[25px]">{title}</h3><p className="text-[14px] leading-7 text-ink-2">{body}</p></div>)}
        <p className="mt-7 max-w-[850px] text-[14px] leading-7 text-ink-2">Allow approximately one week of focused work from kickoff, with the launch date dependent on timely access, feedback, and final checks. We’ll confirm scope and the start date together; delays in access or approvals move the launch date. We’ll need current hosting and WordPress access, service credentials, available analytics and Search Console access, and consolidated feedback from one point of contact. Keep the existing hosting active through launch and the agreed rollback period.</p>
      </Section>
      <Section id="investment" number="07" title="Investment" dark>
        <div className="grid gap-12 lg:grid-cols-2"><div className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">Option 1 · Maintenance pass</span><p className="display mb-5 mt-6 text-[68px] md:text-[88px]">{money(maintenanceFee)}</p><p className="text-[15px] leading-7 text-paper/75">A defined 10-hour allowance for the review, compatible updates, testing, and findings above. 100% upfront.</p></div><div className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">Option 2 · Full migration + backend</span><p className="display mb-5 mt-6 text-[68px] md:text-[88px]">{money(migrationFee)}</p><p className="text-[15px] leading-7 text-paper/75">One fixed project fee for the migration, lightweight content backend, agent-assisted workflow, included bonuses, testing, training, and launch described above.</p><p className="mt-5 text-[14px] leading-7 text-paper/75">50% at kickoff ({money(migrationFee / 2)}) and 50% before launch ({money(migrationFee / 2)}).</p></div></div>
        <p className="mt-10 max-w-[950px] text-[14px] leading-7 text-paper/70">These are alternatives, not a combined package. The maintenance pass is optional and its fee is separate if you migrate later. Hosting, domain renewal, paid licenses, external services, and ongoing support are excluded. No new subscription or additional scope is purchased without approval. Search rankings, enrollment volume, and specific speed scores are not guaranteed.</p>
      </Section>
      <Section id="next" number="08" title="Next Steps">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16"><div><p className="serif mb-5 text-[32px] leading-[1.3]">Choose the right next step for Thrive.</p><p className="max-w-[560px] text-[15px] leading-7 text-ink-2">Choose the maintenance pass for focused improvements to the current site, or the full migration to move out of WordPress and establish the new editing workflow. You can choose either option independently. Either way, we’ll prepare the agreement and start date once the scope feels right.</p></div><div className="flex flex-col items-start justify-center gap-4"><a href={approvalHref} className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-center text-[14px] font-medium text-paper hover:bg-ink-2 sm:w-auto">Let’s talk next steps</a><a href={calendarHref} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full border border-ink px-6 py-4 text-center text-[14px] font-medium hover:bg-ink hover:text-paper sm:w-auto">Review the proposal together</a></div></div>
      </Section>
    </main>
    <footer className="flex flex-col justify-between gap-5 px-6 py-10 md:flex-row md:px-16 lg:px-[120px]"><img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-fit" /><span className="eyebrow text-ink-2">Prepared for Matt · Thrive Preschool</span><a href="#overview" className="text-[12px]">Back to top ↑</a></footer>
  </div>
}
