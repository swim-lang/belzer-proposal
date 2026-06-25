import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const priorWorkHref = 'https://anchovies.pro/proposal/sleep-like-a-goddess'

type DetailRow = [string, string, string]
type Phase = {
  num: string
  title: string
  body: string
  outcome: string
  includes: string[]
}

const navSections = [
  { id: 'context', label: 'Context' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'approach', label: 'Approach' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Begin' },
]

const heroCards: DetailRow[] = [
  ['01', 'Storefront', 'A Shopify site brought from started to finished, with the brand system carried into the buying experience.'],
  ['02', 'Product path', 'Cleaner product, collection, and detail pages that help visitors understand the offer and move toward purchase.'],
  ['03', 'Mobile polish', 'Responsive review and refinement for the device most customers will use first.'],
  ['04', 'Launch handoff', 'Final QA, launch basics, and a practical handoff so the store is easier to manage after launch.'],
]

const contextNotes = [
  {
    num: '01',
    label: 'Brand',
    title: 'Soft Hours already has a refined emotional foundation.',
    body: 'The work is not to reinvent the brand. It is to carry the feeling into Shopify with enough restraint, softness, and clarity.',
  },
  {
    num: '02',
    label: 'Site',
    title: 'The store has already started, so the scope should stay focused.',
    body: 'This phase helps finish the pieces that matter most for launch rather than opening a broad redesign.',
  },
  {
    num: '03',
    label: 'Product',
    title: 'Sleepwear needs texture, trust, and a quiet purchase path.',
    body: 'The site should make fabric, fit, ritual, care, and brand world easier to understand without overexplaining.',
  },
  {
    num: '04',
    label: 'Launch',
    title: 'Completion matters more than extra features.',
    body: 'A clean Shopify handoff, mobile polish, and launch-ready pages will do more here than a larger engagement.',
  },
]

const opportunityLines = [
  'A first-time visitor should feel the softness of the brand quickly.',
  'A product page should make fit, fabric, care, and value easy to understand.',
  'A mobile shopper should be able to browse, trust, and buy without friction.',
  'The finished store should feel calm, premium, and ready to share.',
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Shopify audit and completion map',
    body: 'We review the current Shopify build, theme setup, page structure, product content, imagery, navigation, and launch needs. The goal is to turn the remaining work into a clear completion sprint.',
    outcome: 'A short completion plan that identifies what to preserve, polish, finish, and hand off.',
    includes: [
      'Current Shopify review',
      'Theme and template review',
      'Homepage and product path review',
      'Product and collection content review',
      'Navigation and footer review',
      'Launch readiness checklist',
    ],
  },
  {
    num: '02',
    title: 'Core page polish',
    body: 'We refine the priority pages so the store feels like Soft Hours: calm, tactile, clear, and easier to shop. This assumes we are building from the existing direction rather than starting from a blank canvas.',
    outcome: 'A more resolved homepage, collection path, product page, and supporting brand/story content.',
    includes: [
      'Homepage polish',
      'Collection page polish',
      'Product detail page polish',
      'About or story section refinement',
      'CTA and button language',
      'Typography, spacing, and section rhythm cleanup',
    ],
  },
  {
    num: '03',
    title: 'Product and content setup support',
    body: 'We help organize the core product information so shoppers can understand the pieces and make a decision. This includes practical copy and setup support, not a full content production engagement.',
    outcome: 'Product pages that communicate the essentials clearly and consistently.',
    includes: [
      'Product copy refinement',
      'Fit, fabric, care, and detail modules',
      'Collection naming and organization support',
      'Image placement recommendations',
      'FAQ or care guidance section',
      'Basic SEO title and description support',
    ],
  },
  {
    num: '04',
    title: 'Mobile QA and launch basics',
    body: 'We test and polish the responsive experience, then help prepare the practical launch layer. The focus is a store that can be shared confidently and managed after handoff.',
    outcome: 'A cleaner mobile shopping experience and a practical launch handoff.',
    includes: [
      'Mobile responsive review',
      'Checkout path spot check',
      'Email capture placement',
      'Navigation and footer QA',
      'Basic analytics and pixel placement review',
      'Final launch checklist and handoff notes',
    ],
  },
]

const deliverables = [
  ['Strategy', 'Shopify completion plan', 'A clear map of what remains and how the sprint will finish the store.'],
  ['Design', 'Homepage polish', 'A more resolved first impression that carries the Soft Hours brand into Shopify.'],
  ['Design', 'Collection page polish', 'A cleaner browsing path for categories, product families, or launch assortment.'],
  ['Design', 'Product page polish', 'A product detail experience shaped around fabric, fit, care, imagery, and purchase confidence.'],
  ['Content', 'Core copy refinement', 'Light refinement for page sections, product modules, CTAs, FAQ, care, and SEO basics.'],
  ['Build', 'Theme and section cleanup', 'Practical Shopify cleanup to improve rhythm, hierarchy, and maintainability.'],
  ['Build', 'Product setup support', 'Support for products, collections, imagery, page modules, and core launch content.'],
  ['QA', 'Mobile responsive review', 'Responsive testing and polish across the core customer path.'],
  ['Launch', 'Launch checklist', 'A simple checklist for final Shopify launch needs, access, and remaining owner tasks.'],
  ['Handoff', 'Store handoff notes', 'A practical handoff so the store can be managed without needing every decision explained again.'],
]

const timeline = [
  ['Week 01', 'Audit and page polish', ['Shopify review', 'Completion map', 'Homepage polish', 'Collection path polish', 'Product page direction']],
  ['Week 02', 'Build cleanup and launch readiness', ['Product/content setup support', 'Mobile QA', 'Navigation and footer QA', 'Launch basics', 'Handoff notes']],
  ['Buffer', 'If needed', ['Additional responsive cleanup', 'Content swaps', 'Final stakeholder edits', 'Launch checklist closeout']],
] as const

const investmentLines = [
  ['01', 'Shopify completion sprint', 'Audit, completion map, core page polish, product path cleanup, mobile QA, launch basics, and handoff notes.', '$2,850'],
  ['02', 'Brand system carryover', 'Using the existing Sleep Like a Goddess/Soft Hours foundation to keep the store calm, refined, tactile, and coherent.', 'Included'],
  ['03', 'Post-launch additions', 'Email flows, deeper SEO, campaign pages, photography direction, paid ads, subscriptions, and ongoing optimization can be scoped later.', 'Optional'],
]

const nextSteps: DetailRow[] = [
  ['01', 'Confirm scope', 'Confirm this is focused on finishing the Shopify site rather than restarting brand or site strategy.'],
  ['02', 'Share access', 'Provide Shopify access, current theme status, product details, photography, and any outstanding launch notes.'],
  ['03', 'Begin sprint', 'Start with the completion map, then move into page polish, setup support, mobile QA, and handoff.'],
]

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow sm:text-right ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{right}</span>
    </div>
  )
}

function AnchorButton({
  children,
  href = calendarHref,
  variant = 'dark',
}: {
  children: string
  href?: string
  variant?: 'dark' | 'outline' | 'light'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-paper/85'
      : variant === 'outline'
        ? 'border border-[var(--color-rule)] text-ink hover:bg-ink hover:text-paper'
        : 'bg-ink text-paper hover:bg-ink-2'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-[13px] font-medium transition-colors whitespace-nowrap ${classes}`}
    >
      {children}
    </a>
  )
}

function SoftHoursNav() {
  const [active, setActive] = useState('context')

  useEffect(() => {
    const sections = navSections.map((section) => document.getElementById(section.id)).filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.2, 0.5, 0.75], rootMargin: '-38% 0px -52% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header>
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 text-ink md:flex">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Soft Hours</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Shopify completion - v1</span>
          <span className="eyebrow">June 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              Soft Hours
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
            Review proposal
          </a>
        </div>
      </div>
    </header>
  )
}

function fourCardBorderClass(index: number, total: number) {
  return [
    index < total - 2 ? 'border-b' : 'border-b md:border-b-0',
    index % 2 === 0 ? 'md:border-r' : 'md:border-r-0',
    index < total - 1 ? 'xl:border-r' : 'xl:border-r-0',
    'xl:border-b-0',
  ].join(' ')
}

export function SoftHoursProposal() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies x Soft Hours - Shopify Proposal'
      const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (meta) {
        meta.content = 'A focused Shopify completion proposal for Soft Hours from Anchovies.'
      }
    }
  }, [])

  return (
    <main className="soft-hours-proposal min-h-screen bg-paper text-ink antialiased">
      <SoftHoursNav />

      <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
        <div className="flex flex-col gap-6 pb-16 md:flex-row md:items-start md:justify-between lg:pb-24">
          <Reveal className="flex flex-col gap-1.5">
            <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
            <span className="eyebrow text-ink-2">Shopify Website Completion</span>
          </Reveal>
          <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
            <span className="eyebrow text-ink-2">Prepared for Soft Hours</span>
            <span className="eyebrow text-ink-2">By Anchovies</span>
          </Reveal>
        </div>
        <Reveal>
          <h1 className="display max-w-[1180px] pb-12 text-[52px] leading-[54px] sm:text-[76px] sm:leading-[76px] md:text-[100px] md:leading-[96px] lg:pb-16 lg:text-[124px] lg:leading-[116px]">
            A focused sprint to finish the Soft Hours Shopify store.
          </h1>
        </Reveal>
        <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
          <Reveal className="max-w-[650px] flex-1">
            <h2 className="serif text-[30px] leading-[38px] md:text-[38px] md:leading-[46px]">
              A practical Shopify completion phase for a soft, refined sleepwear brand that already has direction and now needs the store brought to launch quality.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[440px] flex-col gap-7">
            <p className="text-[15px] leading-[23px] text-ink-2">
              The brand foundation from Sleep Like a Goddess gives Soft Hours a strong emotional world. This phase turns that world into a calmer, clearer Shopify experience.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AnchorButton>{'Review proposal ->'}</AnchorButton>
              <AnchorButton href="#approach" variant="outline">
                View the scope
              </AnchorButton>
            </div>
          </Reveal>
        </div>
        <Reveal className="border-t border-[var(--color-rule)] pt-12">
          <MetaRow left="Fig. 01 - What this phase creates" right="Four outcomes" />
          <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
            {heroCards.map(([num, title, body], index) => (
              <div key={title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(index, heroCards.length)}`}>
                <span className="eyebrow text-ink-2">Section {num}</span>
                <h3 className="serif text-[40px] leading-[44px]">{title}</h3>
                <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="context" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 02 - What we know" right="A store already in motion" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <h2 className="display max-w-[650px] text-[48px] leading-[52px] md:text-[68px] md:leading-[70px]">
              This is a completion sprint, not a restart.
            </h2>
            <div className="flex max-w-[500px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
              <p>Soft Hours does not need the site to become louder. It needs the store to become clearer, calmer, and easier to finish.</p>
              <p>The work is to bring the existing Shopify direction into better shape and make the customer path feel launch-ready.</p>
            </div>
          </Reveal>
          <Reveal className="grid gap-0 border-t border-[var(--color-rule)] sm:grid-cols-2">
            {contextNotes.map((note, index) => (
              <article key={note.num} className={`flex min-h-[250px] flex-col justify-between gap-8 border-[var(--color-rule)] p-7 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index < contextNotes.length - 2 ? 'border-b' : 'border-b sm:border-b-0'}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow text-ink-2">N / {note.num}</span>
                  <span className="eyebrow text-ink-2">{note.label}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="serif text-[25px] leading-[30px]">{note.title}</h3>
                  <p className="text-[13px] leading-[20px] text-ink-2">{note.body}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="opportunity" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 03 - The opportunity" right="A softer path to purchase" dark />
        <Reveal>
          <h2 className="display max-w-[1180px] py-16 text-[48px] leading-[54px] md:text-[76px] md:leading-[78px] lg:text-[96px] lg:leading-[96px]">
            The Shopify site should make the product feel tactile, understandable, and easy to buy.
          </h2>
        </Reveal>
        <Reveal className="ml-auto max-w-[760px] border-t border-paper/20">
          {opportunityLines.map((line) => (
            <p key={line} className="serif border-b border-paper/20 py-7 text-[25px] leading-[34px] text-paper/82 md:text-[34px] md:leading-[42px]">
              {line}
            </p>
          ))}
        </Reveal>
      </section>

      <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 04 - Our approach" right="Four phases, focused sprint" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[820px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              Audit, polish, complete, hand off.
            </h2>
          </Reveal>
          <Reveal className="max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            Four tightly scoped phases keep the work useful and affordable. The priority is getting the existing Shopify site finished, not expanding into a larger brand or growth engagement.
          </Reveal>
        </div>
        <div className="border-t border-[var(--color-rule)]">
          {phases.map((phase) => (
            <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[90px_1fr_360px] lg:gap-12">
              <div>
                <span className="serif block text-[56px] leading-[56px]">{phase.num}</span>
                <span className="eyebrow mt-4 block text-ink-2">Phase</span>
              </div>
              <div className="max-w-[650px]">
                <h3 className="serif pb-5 text-[34px] leading-[40px]">{phase.title}</h3>
                <p className="pb-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
                <p className="text-[13px] leading-[20px] text-ink">Outcome - {phase.outcome}</p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <span className="eyebrow text-ink-2">Includes</span>
                {phase.includes.map((item) => (
                  <div key={item} className="flex items-baseline gap-3">
                    <span className="h-px w-[10px] shrink-0 bg-[var(--color-rule)]" />
                    <span className="text-[14px] leading-[22px]">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 05 - Final deliverables" right="Shopify completion list" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[640px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              The pieces needed to finish the store.
            </h2>
          </Reveal>
          <Reveal className="max-w-[540px] text-[15px] leading-[24px] text-ink-2">
            A clear picture of what is included in the sprint. Each item is meant to help the Shopify site become easier to shop, easier to launch, and easier to maintain.
          </Reveal>
        </div>
        <Reveal className="grid border-t border-l border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-3">
          {deliverables.map(([label, title, body], index) => (
            <article key={title} className="min-h-[210px] border-r border-b border-[var(--color-rule)] p-7">
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="eyebrow text-ink-2">D / {String(index + 1).padStart(2, '0')}</span>
                <span className="eyebrow text-ink-2">{label}</span>
              </div>
              <h3 className="serif text-[27px] leading-[32px]">{title}</h3>
              <p className="mt-4 text-[13px] leading-[20px] text-ink-2">{body}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 06 - Timeline" right="Two weeks, with buffer if needed" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[700px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              A focused sprint to finish what is already started.
            </h2>
          </Reveal>
          <Reveal className="max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            The timeline assumes Shopify access, product details, photography, and key launch decisions are available at kickoff.
          </Reveal>
        </div>
        <Reveal className="grid border-t border-l border-[var(--color-rule)] md:grid-cols-3">
          {timeline.map(([week, title, items]) => (
            <article key={week} className="min-h-[330px] border-r border-b border-[var(--color-rule)] p-8">
              <span className="eyebrow text-ink-2">{week}</span>
              <h3 className="serif mt-5 text-[34px] leading-[38px]">{title}</h3>
              <div className="mt-8 flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item} className="border-t border-ink/15 pt-3 text-[14px] leading-[20px] text-ink-2">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 07 - Investment" right="Shopify completion" />
        <Reveal className="grid gap-10 border-b border-[var(--color-rule)] py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="display text-[72px] leading-none md:text-[124px]">$2,850</p>
            <p className="eyebrow mt-5 text-ink-2">Total - Shopify completion sprint</p>
          </div>
          <div className="flex max-w-[560px] flex-col gap-5 text-[15px] leading-[24px] text-ink-2">
            <p>This covers the focused work needed to help complete the Soft Hours Shopify site: audit, page polish, product setup support, mobile QA, launch basics, and handoff notes.</p>
            <p>The price assumes we are working from the current brand and site direction, not restarting the brand, writing a full content system, or building a custom Shopify app.</p>
          </div>
        </Reveal>
        <div className="border-b border-[var(--color-rule)]">
          {investmentLines.map(([num, title, body, price]) => (
            <Reveal key={num} className="grid gap-6 border-b border-ink/20 py-8 last:border-b-0 md:grid-cols-[80px_1fr_minmax(0,1.25fr)_160px]">
              <span className="serif text-[40px] leading-none">{num}</span>
              <h3 className="serif text-[30px] leading-[34px]">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
              <p className="serif text-[34px] leading-none md:text-right">{price}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 08 - Next step" right="From access to handoff" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              If this direction feels right, we can start with access and a completion map.
            </h2>
          </Reveal>
          <Reveal className="max-w-[440px] text-[15px] leading-[24px] text-ink-2">
            The first step is confirming what is already done, what needs polish, and which launch details still need decisions.
          </Reveal>
        </div>
        <div className="border-t border-[var(--color-rule)]">
          {nextSteps.map(([num, title, body]) => (
            <Reveal key={num} className="grid gap-6 border-b border-ink/20 py-9 last:border-b-0 md:grid-cols-[100px_1fr_320px]">
              <span className="serif text-[54px] leading-none">{num}</span>
              <h3 className="serif text-[34px] leading-[40px]">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 09 - In closing" right="Where this lands" dark />
        <Reveal className="border-t border-paper/20 pt-16">
          <h2 className="display max-w-[1180px] text-[52px] leading-[58px] md:text-[92px] md:leading-[96px] lg:text-[124px] lg:leading-[120px]">
            A softer, clearer Shopify store, finished enough to share.
          </h2>
        </Reveal>
        <div className="grid gap-10 pt-16 lg:grid-cols-[1fr_360px]">
          <Reveal className="max-w-[540px] text-[15px] leading-[24px] text-paper/70">
            By handoff, Soft Hours has a more complete Shopify experience: clearer pages, stronger mobile flow, cleaner product presentation, and a practical path to launch.
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow text-paper/55">Begin</span>
            <AnchorButton href={calendarHref} variant="light">
              {'Review proposal ->'}
            </AnchorButton>
            <p className="text-[13px] leading-[20px] text-paper/60">$2,850 - Shopify completion sprint</p>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[var(--color-rule)] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-16">
        <div className="flex flex-wrap items-center gap-4">
          <span className="eyebrow font-medium text-ink">Anchovies</span>
          <span className="hidden h-[10px] w-px bg-[var(--color-rule)] sm:block" />
          <span className="eyebrow text-ink-2">Soft Hours Shopify completion proposal</span>
          <span className="eyebrow text-ink-2">v1 - June 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a href={priorWorkHref} className="eyebrow text-ink-2 transition-colors hover:text-ink">
            Previous brand proposal
          </a>
          <span className="eyebrow text-ink-2">Confidential</span>
          <span className="eyebrow text-ink">- end -</span>
        </div>
      </footer>
    </main>
  )
}
