import { useEffect, type ReactNode } from 'react'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const approvalHref = `mailto:sean@anchovies.agency?subject=${encodeURIComponent('Bennett + Anchovies: let’s get started')}&body=${encodeURIComponent('Hi Sean,\n\nWe’re excited to move forward with the Bennett proposal. Please send over the agreement and kickoff invoice so we can get started.\n\nThanks!')}`

const sections = [
  ['goals', 'Goals'], ['scope', 'Scope'], ['process', 'Process'],
  ['work', 'Selected Work'], ['timeline', 'Timeline'], ['investment', 'Investment'], ['next', 'Next Steps'],
]
const scope = [
  {
    title: 'Brand strategy',
    intro: 'Agree on what the firm stands for, who it serves, and how it should present itself.',
    items: ['Discovery with both partners, including an in-person visit to Missoula', 'Separate taste and moodboard input from each partner, followed by alignment', 'Audience, competitor, and positioning review', 'Core messaging, a short firm introduction, and guidance on tone'],
    note: 'A shared strategic foundation for the identity, website, and client experience.',
  },
  {
    title: 'Naming',
    intro: 'Explore whether a new name better represents the firm and its future.',
    items: ['Naming criteria informed by the brand strategy', 'Focused name exploration and a recommended name', 'Supporting rationale and examples of the name in use', 'Refinement with both partners before a final decision'],
    note: 'Naming is a separate part of the scope so we can discuss it independently. Final legal clearance and registration of a name remain with the firm.',
  },
  {
    title: 'Brand identity',
    intro: 'A complete visual identity that works at the office, online, and in the hands of a client.',
    items: ['Primary logo, secondary lockups, and supporting mark', 'Typography, color palette, and supporting graphics', 'Layout and image direction for consistent future materials', 'One developed creative direction, presented in realistic applications', 'Brand guidelines and organized logo and design assets'],
    note: 'We align on direction through discovery, then present one considered solution and refine it together.',
  },
  {
    title: 'Website design & build',
    intro: 'A clear introduction to the firm, its services, and the people behind the work.',
    items: ['Website structure and page inventory agreed during discovery', 'Copywriting based on partner interviews and existing firm information', 'Custom desktop and mobile design, followed by responsive development', 'Service information, team profiles, and clear contact paths', 'Contact forms, foundational SEO, analytics, testing, and launch support'],
    note: 'The firm reviews service descriptions and legal content before launch. Custom portals, payment systems, and operational software are outside this engagement.',
  },
  {
    title: 'Launch materials',
    intro: 'Practical tools for daily client communication and the firm’s next chapter.',
    items: ['Print-ready business card and letterhead designs', 'Email signature system for the team', 'Editable client welcome, process overview, and correspondence templates', 'Social profile assets and reusable post templates', 'Exterior sign and office entry artwork for vendor production', 'Event and merchandise concepts for dealer, auction, and collector settings'],
    note: 'Stationery, client templates, social assets, and signage artwork are finished deliverables. Event and merchandise work is concept-level. Printing, fabrication, installation, and architectural services are separate.',
  },
]
const phases = [
  ['01', 'Discovery', 'Meet both partners, visit Missoula, review the business and its audiences, and align on taste, naming, and priorities.'],
  ['02', 'Creative direction', 'Develop the name, messaging, and identity into one considered presentation, with examples of how the brand works in use.'],
  ['03', 'Refinement & production', 'Refine the approved direction, write and build the website, and prepare the launch materials.'],
  ['04', 'Launch & handoff', 'Test the website, prepare final files and editable templates, and walk the team through the new system.'],
]
const investment = [
  { label: 'Brand strategy', amount: 3000 },
  { label: 'Naming', amount: 3000 },
  { label: 'Brand identity', amount: 13000 },
  { label: 'Website design & build', amount: 14000 },
  { label: 'Launch materials & handoff', amount: 6500 },
]
const total = investment.reduce((sum, item) => sum + item.amount, 0)
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
const payments = [
  { percent: 50, label: 'At kickoff', detail: 'To reserve the project and begin discovery.' },
  { percent: 25, label: 'At identity approval', detail: 'After the identity presentation and approval.' },
  { percent: 25, label: 'Before final handoff', detail: 'Before final files are delivered and the website launches.' },
]
const awards = [
  ['Best Law Firm Websites 2023', 'https://lawyerist.com/news/best-law-firm-websites-2023-2/'],
  ['Best Law Firm Websites 2025', 'https://lawyerist.com/news/good-vs-great-what-best-law-firm-websites-get-right/'],
  ['Best Law Firm Websites 2026', 'https://lawyerist.com/news/best-law-firm-websites-2026/'],
]

function Section({ id, number, title, children, dark = false }: { id: string; number: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px] ${dark ? 'bg-ink text-paper' : ''}`}>
    <div className="flex items-center justify-between gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>§ {number} · {title}</span>
      <span className={`eyebrow hidden sm:block ${dark ? 'text-paper/60' : 'text-ink-2'}`}>Anchovies × Bennett</span>
    </div>
    <h2 id={`${id}-title`} className="display mb-12 mt-10 text-[48px] md:text-[72px]">{title}</h2>
    {children}
  </section>
}

export function BennettProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Bennett Law Office · Proposal'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Brand strategy, naming, identity, website, and launch materials for Bennett Law Office.')
  }, [])

  return <div className="bg-paper text-ink">
    <a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
    <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16">
        <a href="#overview" aria-label="Bennett proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" /><span className="hidden text-[13px] sm:inline">Anchovies × Bennett Law Office</span></a>
        <a href="#investment" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium transition-colors hover:bg-ink hover:text-paper">View investment</a>
      </div>
      <nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}
      </nav>
    </header>
    <main>
      <section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24">
        <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row"><span className="eyebrow text-ink-2">Brand strategy · Identity · Website</span><span className="eyebrow text-ink-2">Bennett Law Office · Missoula, Montana</span></div>
        <h1 className="display max-w-[1100px] pb-12 text-[56px] tracking-[-0.028em] sm:text-[80px] md:text-[104px] lg:text-[128px]">Brand & website proposal.</h1>
        <div className="grid gap-10 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <p className="serif max-w-[680px] text-[28px] leading-[1.3] md:text-[36px]">A clear identity for the firm you have built and the business you want it to become.</p>
          <div className="space-y-6"><p className="text-[15px] leading-6 text-ink-2">You have spent the last two years strengthening the business. This project brings the name, brand, website, and everyday materials up to the same standard, with both partners involved from the start.</p><div className="flex flex-wrap gap-x-8 gap-y-3"><span className="eyebrow">{money(total)} · Fixed project fee</span><span className="eyebrow">5–7 week target</span></div></div>
        </div>
      </section>

      <Section id="goals" number="01" title="Goals">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ['Reflect the firm today', 'Make the firm’s experience and level of service clear to clients, dealers, and referral partners. Give the current ownership a shared direction for the years ahead.'],
            ['Build confidence in the team', 'Create a name and identity that both partners and the staff are proud to share, backed by materials they can use every day.'],
            ['Make every interaction consistent', 'Connect the website, client communication, and renovated Missoula office through one recognizable design system.'],
          ].map(([title, body], i) => <div key={title} className="border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-5 mt-6 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-6 text-ink-2">{body}</p></div>)}
        </div>
      </Section>

      <section aria-labelledby="outcome-title" className="border-b border-[var(--color-rule)] px-6 py-16 md:px-16 lg:px-[120px] lg:py-20">
        <h2 id="outcome-title" className="eyebrow mb-7 text-ink-2">The outcome</h2>
        <p className="serif max-w-[1050px] text-[34px] leading-[1.25] md:text-[48px]">A brand that helps you grow the firm, attract great people, and feel proud of what you’re building together.</p>
      </section>

      <Section id="scope" number="02" title="Scope">
        <p className="mb-12 max-w-[680px] text-[17px] leading-7 text-ink-2">Five connected areas of work, with a practical set of files and tools ready for your team at handoff.</p>
        {scope.map((group, i) => <div key={group.title} className="grid gap-8 border-t border-[var(--color-rule)] py-10 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-5 mt-4 text-[34px] leading-tight md:text-[40px]">{group.title}</h3><p className="max-w-[430px] text-[15px] leading-6 text-ink-2">{group.intro}</p></div>
          <div><ul className="space-y-4">{group.items.map(item => <li key={item} className="flex gap-4 text-[15px] leading-6"><span aria-hidden="true" className="text-ink-2">↗</span><span>{item}</span></li>)}</ul><p className="mt-8 border-t border-ink/15 pt-5 text-[13px] leading-6 text-ink-2">{group.note}</p></div>
        </div>)}
      </Section>

      <Section id="process" number="03" title="Process" dark>
        <p className="mb-12 max-w-[760px] font-normal text-[24px] leading-[1.4] text-paper/85">We agree on the direction together, then develop one complete creative solution. Your feedback shapes the refinements.</p>
        <div className="grid gap-10 md:grid-cols-2">{phases.map(([n, title, body]) => <div key={n} className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">{n}</span><h3 className="serif mb-4 mt-5 text-[34px]">{title}</h3><p className="max-w-[500px] text-[15px] leading-6 text-paper/75">{body}</p></div>)}</div>
      </Section>

      <Section id="work" number="04" title="Selected Work">
        <div className="mb-10 grid gap-8 lg:grid-cols-2"><p className="serif text-[30px] leading-[1.3]">Experience in law. Ideas from a wider world.</p><p className="text-[15px] leading-6 text-ink-2">Our work spans law firms, hospitality, consumer brands, and independent businesses. The same care goes into understanding each business and making its identity specific to it.</p></div>
        <figure><video className="aspect-video w-full bg-ink" controls playsInline preload="metadata" poster="/media/anchovies-reel-v20-first-frame.jpg" aria-label="Anchovies portfolio film, 30 seconds, with music"><source src="/media/anchovies-reel-v20.mp4" type="video/mp4" />Your browser does not support embedded video. <a href="/media/anchovies-reel-v20.mp4">Watch the portfolio film</a>.</video><figcaption className="mt-4 flex flex-wrap justify-between gap-3 text-[12px] text-ink-2"><span>Anchovies portfolio · 30 seconds</span><span>Press play for video and music</span></figcaption></figure>
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <a href="https://pitch.com/v/anchovies-press-zwdsbn" target="_blank" rel="noreferrer" className="group border-t border-[var(--color-rule)] pt-7">
            <span className="eyebrow text-ink-2">Portfolio</span>
            <h3 className="serif mb-4 mt-5 text-[32px] group-hover:underline">Branding work ↗</h3>
            <p className="text-[15px] leading-6 text-ink-2">An overview of our brand identities and how they come to life across print, digital, and physical spaces.</p>
          </a>
          <a href="https://the-brandidentity.com/project/how-did-anchovies-bring-consumer-brand-thinking-to-a-texas-law-firm" target="_blank" rel="noreferrer" className="group border-t border-[var(--color-rule)] pt-7">
            <span className="eyebrow text-ink-2">Consumer thinking for a law firm</span>
            <h3 className="serif mb-4 mt-5 text-[32px] group-hover:underline">Press · The Brand Identity ↗</h3>
            <p className="text-[15px] leading-6 text-ink-2">A feature on our approach to bringing consumer-brand thinking to legal services.</p>
          </a>
        </div>
        <div className="mt-12 border-t border-[var(--color-rule)] pt-7">
          <span className="eyebrow text-ink-2">Awards · Lawyerist</span>
          <h3 className="serif mb-6 mt-5 text-[32px]">Website design recognition</h3>
          <div className="grid gap-x-10 md:grid-cols-3">{awards.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-4 border-b border-ink/15 py-5 text-[15px] hover:underline"><span>{label}</span><span aria-hidden="true">↗</span></a>)}</div>
        </div>
      </Section>

      <Section id="timeline" number="05" title="Timeline">
        <div className="mb-12 grid gap-6 lg:grid-cols-2"><p className="serif text-[36px]">Approximately 5–7 weeks.</p><p className="max-w-[550px] text-[15px] leading-6 text-ink-2">A target from kickoff to handoff, with overlapping work where practical. We will confirm the schedule after discovery and the website page inventory are agreed. Partner availability, feedback, and content approvals affect timing.</p></div>
        {[
          ['Week 1', 'Discovery & naming', 'Missoula visit, partner input, positioning, naming exploration, and website scope.'],
          ['Weeks 2–3', 'Identity & direction', 'Creative presentation, naming decision, identity refinement, and initial website structure and copy.'],
          ['Weeks 3–6', 'Website & launch materials', 'Responsive website design and build, client templates, stationery, social assets, and signage artwork.'],
          ['Weeks 5–7', 'Testing & handoff', 'Final approvals, website testing and launch, organized assets, and team walkthrough.'],
        ].map(([time, title, body]) => <div key={time} className="grid gap-3 border-t border-[var(--color-rule)] py-7 md:grid-cols-[120px_1fr_1.5fr] md:gap-8"><span className="eyebrow text-ink-2">{time}</span><h3 className="serif text-[25px]">{title}</h3><p className="text-[14px] leading-6 text-ink-2">{body}</p></div>)}
        <p className="mt-6 text-[13px] leading-6 text-ink-2">Signage fabrication, installation, and the office renovation follow their own schedules and do not need to hold up the website launch.</p>
      </Section>

      <Section id="investment" number="06" title="Investment" dark>
        <p className="display mb-5 text-[76px] md:text-[112px]">{money(total)}</p><p className="mb-12 max-w-[650px] text-[16px] leading-7 text-paper/75">One fixed project fee for the scope above, including the Missoula discovery visit and associated agency travel.</p>
        {investment.map(item => <div key={item.label} className="flex items-start justify-between gap-6 border-t border-paper/25 py-6 text-[16px]"><span>{item.label}</span><span className="shrink-0 tabular-nums">{money(item.amount)}</span></div>)}
        <div className="mt-12 grid gap-8 md:grid-cols-3">{payments.map(payment => <div key={payment.percent + payment.label} className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">{payment.percent}% · {payment.label}</span><p className="serif my-4 text-[40px]">{money(total * payment.percent / 100)}</p><p className="text-[14px] leading-6 text-paper/75">{payment.detail}</p></div>)}</div>
        <p className="mt-12 max-w-[900px] border-t border-paper/25 pt-6 text-[13px] leading-6 text-paper/70">Third-party costs, including hosting, domains, paid licenses, printing, and sign production, are separate and will be identified before purchase. Additional work or changes to the agreed scope will be priced and approved before proceeding.</p>
      </Section>

      <Section id="next" number="07" title="Next Steps">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="serif mb-6 text-[32px] leading-[1.3]">Ready when you are.</p>
            <p className="max-w-[530px] text-[15px] leading-7 text-ink-2">If this feels right, let us know and we’ll prepare the agreement and kickoff invoice. If you’d like to talk it through first, choose a time for us to review the proposal together.</p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <a href="/proposal/bennett/contract" className="inline-flex w-full items-center justify-center rounded-full border border-ink px-6 py-4 text-center text-[14px] font-medium transition-colors hover:bg-ink hover:text-paper sm:w-auto">Review contract draft</a>
            <a href={approvalHref} className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-center text-[14px] font-medium text-paper transition-colors hover:bg-ink-2 sm:w-auto">Let’s get started</a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full border border-ink px-6 py-4 text-center text-[14px] font-medium transition-colors hover:bg-ink hover:text-paper sm:w-auto">Review the proposal together</a>
          </div>
        </div>
      </Section>
    </main>
    <footer className="flex flex-col justify-between gap-5 px-6 py-10 md:flex-row md:px-16 lg:px-[120px]"><img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-fit" /><span className="eyebrow text-ink-2">Prepared for Bennett Law Office · September 2026</span><a href="#overview" className="text-[12px]">Back to top ↑</a></footer>
  </div>
}
