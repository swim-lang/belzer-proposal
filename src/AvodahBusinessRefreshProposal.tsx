import { useEffect, type ReactNode } from 'react'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const approvalHref = `mailto:sean@anchovies.agency?subject=${encodeURIComponent('Avodah website refresh: let’s get started')}&body=${encodeURIComponent('Hi Sean,\n\nThis scope looks good. We’d like to move forward with the $2,500 Earley Business Legal website refresh for Avodah. Please send over the agreement and kickoff invoice.\n\nThanks!')}`
const sections = [['goals', 'Goals'], ['scope', 'Scope'], ['timeline', 'Timeline'], ['investment', 'Investment'], ['next', 'Next Steps']]
const priorityPages = [
  ['Home', '/'], ['About Us', '/about-us/'], ['Our Team', '/our-team/'],
  ['Justin’s profile', '/our-team/justin/'], ['Business Formation', '/virginia-business-formation-lawyer/'],
  ['Mergers & Acquisitions', '/virginia-business-merger-and-acquisitions-lawyer/'], ['Contact', '/contact/'],
]
const scope = [
  {
    title: 'Review what is there',
    intro: 'Start with a short inventory and a clear list of what to keep, update, and check before launch.',
    items: [
      'Inventory the existing pages, URLs, navigation, forms, and Handshake portal links.',
      'Review available Search Console, analytics, and inquiry data to identify valuable pages and establish a baseline.',
      'Confirm current Avodah team details, contact information, and the priority changes with your team.',
    ],
  },
  {
    title: 'Make Avodah the clear brand',
    intro: 'Apply the Avodah identity you already have to the existing WordPress site.',
    items: [
      'Update the shared header, footer, logo, colors, typography, buttons, and mobile navigation.',
      'Refresh the layout and introductory copy on the seven priority pages below, keeping useful service content in place.',
      'Explain the connection between Earley Business Legal and Avodah. Keep Justin’s name and experience easy to find.',
      'Update firm attribution and contact details in the shared templates and priority pages. Review other legacy references before changing them.',
    ],
  },
  {
    title: 'Clean up search and contact paths',
    intro: 'Make practical improvements within the existing site while preserving its established URLs.',
    items: [
      'Review and refine titles, descriptions, headings, internal links, and relevant image descriptions on the seven priority pages.',
      'Check canonical URLs, sitemap visibility, indexing settings, and existing firm information in structured data; correct straightforward issues supported by the current setup.',
      'Review exposed placeholder pages and recommend which to remove from search. Make approved indexing changes after checking their content and available traffic data.',
      'Retain the current inquiry route, confirm the Avodah recipients, and test form submission, confirmation, phone links, and existing portal links before launch.',
    ],
  },
  {
    title: 'Review, launch, and hand over',
    intro: 'One focused design direction, one consolidated round of refinements, and a controlled release.',
    items: [
      'Back up the existing site and prepare the refresh in staging or a protected preview.',
      'Complete desktop and mobile checks, then publish after your approval with a rollback copy available.',
      'Provide a short change summary and check the updated pages, inquiry route, and available Search Console data during the first 14 days after launch.',
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
export function AvodahBusinessRefreshProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Avodah · Website Refresh'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'A focused refresh of Earley Business Legal for Avodah. Scope, timeline, and a $2,500 fixed fee.')
  }, [])
  return <div className="bg-paper text-ink">
    <a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
    <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16">
        <a href="#overview" aria-label="Avodah proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" /><span className="hidden text-[13px] sm:inline">Anchovies × Avodah</span></a>
        <a href="#investment" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium transition-colors hover:bg-ink hover:text-paper">View investment</a>
      </div>
      <nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}</nav>
    </header>
    <main>
      <section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 md:py-24 lg:px-[120px]">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row"><span className="eyebrow text-ink-2">Earley Business Legal → Avodah</span><span className="eyebrow text-ink-2">October 9, 2026</span></div>
        <h1 className="display max-w-[1100px] pb-10 text-[56px] tracking-[-0.028em] sm:text-[80px] md:text-[104px] lg:text-[116px]">Website refresh.</h1>
        <div className="grid gap-8 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <p className="serif max-w-[640px] text-[30px] leading-[1.3] md:text-[38px]">Make it clear that visitors are reaching Avodah.</p>
          <div className="space-y-6"><p className="text-[15px] leading-7 text-ink-2">The Earley Business Legal site is already bringing in business inquiries. We’ll keep its domain and useful content, apply Avodah’s existing identity, and make the experience clearer and more consistent.</p><div className="flex flex-wrap gap-x-8 gap-y-3"><span className="eyebrow">$2,500 · Fixed fee</span><span className="eyebrow">2-week target</span></div></div>
        </div>
      </section>
      <Section id="goals" number="01" title="Goals">
        <div className="grid gap-10 md:grid-cols-3">{[
          ['Clear firm identity', 'Help people searching for Justin immediately understand that they are connecting with Avodah.'],
          ['Preserve useful traffic', 'Keep the current domain, established page URLs, and valuable content as the starting point for every change.'],
          ['A better path to contact', 'Make the site easier to read and use, with clear next steps and inquiries reaching the right Avodah team.'],
        ].map(([title, body]) => <div key={title} className="border-t border-[var(--color-rule)] pt-6"><h3 className="serif mb-5 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-7 text-ink-2">{body}</p></div>)}</div>
      </Section>
      <Section id="scope" number="02" title="Scope">
        <p className="mb-10 max-w-[760px] text-[17px] leading-7 text-ink-2">A focused design and cleanup sprint on <a href="https://www.earleybusinesslegal.com/" target="_blank" rel="noreferrer" className="underline underline-offset-4 break-words">earleybusinesslegal.com</a>, using its existing platform and Avodah’s approved brand assets.</p>
        {scope.map((group, i) => <div key={group.title} className="grid gap-8 border-t border-[var(--color-rule)] py-9 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-4 mt-4 text-[32px] leading-tight md:text-[36px]">{group.title}</h3><p className="max-w-[420px] text-[15px] leading-7 text-ink-2">{group.intro}</p></div>
          <ul className="space-y-4">{group.items.map(item => <li key={item} className="flex gap-4 text-[15px] leading-7"><span aria-hidden="true" className="text-ink-2">↗</span><span>{item}</span></li>)}</ul>
        </div>)}
        <div className="border-t border-[var(--color-rule)] pt-9">
          <h3 className="serif mb-5 text-[32px]">Priority pages</h3>
          <p className="mb-7 max-w-[780px] text-[15px] leading-7 text-ink-2">Page-specific layout, copy, and search cleanup covers these seven existing pages. We can swap a page before work begins. Other pages retain their content and receive shared styling where their existing templates support it.</p>
          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">{priorityPages.map(([title, path]) => <a key={path} href={`https://www.earleybusinesslegal.com${path}`} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-4 border-t border-[var(--color-rule)] py-5 text-[15px] hover:underline">{title}<span aria-hidden="true">↗</span></a>)}</div>
        </div>
        <div className="mt-10 border-t border-[var(--color-rule)] pt-8">
          <h3 className="serif mb-4 text-[28px]">Scope boundaries</h3>
          <p className="max-w-[950px] text-[14px] leading-7 text-ink-2">The existing domain, WordPress platform, service content, and Handshake workflows stay in place. This fee covers light copy edits and the updates listed above. A new identity, full-site redesign, platform migration, new pages or articles, legal-document revisions, portal development, major technical repairs, and ongoing SEO are separate. Any additional work is quoted for approval first.</p>
          <p className="mt-4 max-w-[950px] text-[14px] leading-7 text-ink-2">We’ll take care to preserve what is working. Search rankings, AI referrals, traffic, and inquiry volume can change and are not guaranteed.</p>
        </div>
      </Section>
      <Section id="timeline" number="03" title="Timeline">
        <p className="serif mb-8 max-w-[780px] text-[32px] leading-[1.3]">Approximately two weeks from kickoff to launch.</p>
        {[
          ['Week 1', 'Review & refresh', 'Confirm the inventory, baseline, and seven priority pages. Prepare the shared Avodah styling and page updates in preview.'],
          ['Week 2', 'Refine & launch', 'Collect one consolidated round of feedback, complete testing, and publish after approval.'],
          ['After launch', '14-day check', 'Check the updated pages and inquiry route, review available search data, and correct issues introduced by the refresh.'],
        ].map(([time, title, body]) => <div key={time} className="grid gap-3 border-t border-[var(--color-rule)] py-6 md:grid-cols-[120px_1fr_1.5fr] md:gap-8"><span className="eyebrow text-ink-2">{time}</span><h3 className="serif text-[25px]">{title}</h3><p className="text-[14px] leading-7 text-ink-2">{body}</p></div>)}
        <p className="mt-7 max-w-[850px] text-[14px] leading-7 text-ink-2">We’ll confirm the start date together. Timing assumes working WordPress and hosting access, existing Avodah brand assets, and timely feedback from one point of contact. Your team confirms current people, offices, services, and legal wording. Analytics and Search Console access let us verify the performance baseline; any gaps are documented before changes begin.</p>
      </Section>
      <Section id="investment" number="04" title="Investment" dark>
        <p className="display mb-5 text-[76px] md:text-[112px]">$2,500</p>
        <p className="mb-10 max-w-[760px] text-[16px] leading-7 text-paper/75">One fixed fee for the inventory, shared brand refresh, seven priority pages, targeted search cleanup, testing, and launch described above.</p>
        <div className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">100% upfront</span><p className="serif mt-4 text-[40px]">$2,500</p></div>
        <p className="mt-8 max-w-[850px] text-[13px] leading-6 text-paper/70">The full project fee is due before work begins. Existing hosting and domain costs continue separately. Any new paid license or third-party cost requires approval before purchase.</p>
      </Section>
      <Section id="next" number="05" title="Next Steps">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16"><div><p className="serif mb-5 text-[32px] leading-[1.3]">A simple scope. A clear next step.</p><p className="max-w-[560px] text-[15px] leading-7 text-ink-2">If this matches what you have in mind, let us know and we’ll prepare the agreement, kickoff invoice, and start date. We can also walk through it together before you decide.</p></div><div className="flex flex-col items-start justify-center gap-4"><a href={approvalHref} className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-center text-[14px] font-medium text-paper hover:bg-ink-2 sm:w-auto">Let’s get started</a><a href={calendarHref} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full border border-ink px-6 py-4 text-center text-[14px] font-medium hover:bg-ink hover:text-paper sm:w-auto">Review the proposal together</a></div></div>
      </Section>
    </main>
    <footer className="flex flex-col justify-between gap-5 px-6 py-10 md:flex-row md:px-16 lg:px-[120px]"><img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-fit" /><span className="eyebrow text-ink-2">Prepared for Avodah · October 2026</span><a href="#overview" className="text-[12px]">Back to top ↑</a></footer>
  </div>
}
