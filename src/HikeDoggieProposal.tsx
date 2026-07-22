import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const acceptProposalHref = 'mailto:sean@anchovies.agency?subject=Accepting%20the%20Hike%20Doggie%20SOP%20%26%20Prototype%20Proposal'

// ── Pricing (edit here) ──────────────────────────────────────────────
const PRICE_SOP_FOUNDATION = '$5,500'
const PRICE_PROTOTYPE = '$6,500'
const PRICE_TOTAL = '$12,000'
const PRICE_ADVISORY = '$1,500/mo'
// ─────────────────────────────────────────────────────────────────────

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
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'approach', label: 'Approach' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Begin' },
]

const heroCards: DetailRow[] = [
  [
    '01',
    'SOPs, out and owned',
    'Every SOP extracted from Delight Tree, cleaned up, reformatted, and standardized into one consistent, portable library that Hike Doggie owns.',
  ],
  [
    '02',
    'A usable prototype',
    'The quick concept evolves into a testable prototype, shaped by what Phase 1 teaches us and precise enough to price the build.',
  ],
  [
    '03',
    'Context capture, running',
    'Sales calls recorded, knowledge structured, measurements defined. The proprietary fuel for every agentic system that follows.',
  ],
  [
    '04',
    'A partner in the room',
    'Ongoing advisory as the team learns to run and evolve agentic systems. The big questions and the small ones, throughout.',
  ],
]

const contextNotes = [
  {
    num: '01',
    label: 'The session',
    title: 'The direction is aligned.',
    body: 'We presented the full approach: SOPs digested, learned, and proven through one system. This proposal turns that direction into scoped, priced, outcome-focused work.',
  },
  {
    num: '02',
    label: 'Delight Tree',
    title: 'No migration required.',
    body: 'Delight Tree stays as long as it is useful. But the content has to come out: extraction, de-duplication, and organization is real manual work, and it is priced into this scope. The result is portable: usable in Delight Tree today, required for anything we build tomorrow.',
  },
  {
    num: '03',
    label: 'The prototype',
    title: 'A head start, not a product.',
    body: 'The concept you saw was built quickly to show possibilities. The real prototype gets designed from what Phase 1 teaches us. Then it becomes the estimating document for the build.',
  },
  {
    num: '04',
    label: 'Pricing',
    title: 'We price outcomes, not hours.',
    body: 'Each line below is tied to something finished you can point at. Anything we cannot responsibly price yet, like the app build, waits for the prototype to define it.',
  },
]

const outcomeLines = [
  'A new operator should digest, learn, and prove every SOP inside one system.',
  'Training should get faster because the work is optimized, not compressed.',
  'Your context, from calls to trails to judgment, should compound into an asset you own.',
  'Discipline should be designed into the system, so the standards manage the results.',
  'Every improvement should be measured against yesterday, not the dream.',
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'SOP Foundation: extract, organize, standardize',
    body: 'We pull everything out of Delight Tree and the surrounding spreadsheets, docs, and drives. Then we do the unglamorous work: inventory, de-duplication, cleanup, and general organization. From there, every SOP is reformatted into one consistent, AI-ready standard with a named owner and a completion cadence. Alongside the content work, we fix the process basics: sales calls get recorded, training time gets protected, and the measurement baseline gets set.',
    outcome: 'One complete, consistent, portable SOP library that Hike Doggie owns, plus the process foundations that make it stick.',
    includes: [
      'Full SOP inventory and audit',
      'Delight Tree content extraction',
      'De-duplication, cleanup, and general organization',
      'One consistent SOP structure and template',
      'Every SOP reformatted to the standard',
      'Owner and cadence assigned per SOP',
      'Call-recording workflow stood up',
      'Measurement baseline defined',
    ],
  },
  {
    num: '02',
    title: 'Prototype: design the real thing',
    body: 'With the SOP library in hand, we decide the feature set together, grounded in what the content actually needs, not guesses. Then we evolve the quick concept into a usable, testable prototype: the screens, flows, and structure a trainee would actually move through, built the way adults actually learn: by doing. The prototype does double duty: it proves the experience, and it defines the scope that prices the build.',
    outcome: 'A usable prototype that demonstrates the training experience and produces a firm, honest estimate for the app build.',
    includes: [
      'Feature decisions workshop (from Phase 1 findings)',
      'Prototype scope definition',
      'Screen design across the core trainee journey',
      'SOP content flowed into real screens',
      'Clickable walkthrough for the team',
      'Build scope and firm estimate document',
    ],
  },
  {
    num: '03',
    title: 'Build and beta: priced by the prototype',
    body: 'The build covers the trainee app, a desktop version, and the backend controls that let Hike Doggie manage SOPs, assignments, and agents themselves. By that point, much of the foundation already exists: the content, the standard, the prototype. The remaining work is the deep agentic nuance, and where it lands in the range depends entirely on the features you choose. The approved prototype turns the range into a firm quote.',
    outcome: 'An indicative range of $8k to $20k today, turned into a firm quote by the approved prototype.',
    includes: [
      'Trainee app build',
      'Desktop version',
      'Admin backend for SOPs, assignments, and agents',
      'Agentic integrations and tuning',
      'Beta plan with real trainees',
      'Continuation and maintenance outline',
    ],
  },
]

const deliverables = [
  ['Foundation', 'SOP inventory and audit', 'A complete accounting of every SOP, where it lives, what shape it is in, and what is missing.'],
  ['Foundation', 'Extracted content library', 'All SOP content out of Delight Tree and scattered docs: organized, de-duplicated, and owned by Hike Doggie.'],
  ['System', 'SOP master template', 'One consistent structure every SOP follows: purpose, steps, proof, owner, cadence.'],
  ['System', 'Reformatted SOP library', 'The full library rewritten to the standard: consistent, complete, and AI-ready.'],
  ['System', 'Measurement definitions', 'What we measure and why, tied to outcomes: SOP velocity, time to first solo, context captured.'],
  ['Process', 'Call-recording workflow', 'Sales calls recorded and stored from week one. The start of the context asset.'],
  ['Product', 'Prototype design', 'A usable, testable prototype of the training experience, built from the real SOP content.'],
  ['Product', 'Build estimate', 'A firm quote for the app build, derived line-by-line from the approved prototype.'],
  ['Advisory', 'Ongoing counsel', 'Regular working sessions plus async access: how to run, evolve, and think in agentic systems.'],
]

const timeline = [
  [
    'Week 01',
    'Extract and inventory',
    ['Delight Tree extraction', 'SOP inventory and audit', 'De-duplication and cleanup', 'Call recording begins', 'Master template drafted'],
  ],
  [
    'Week 02',
    'Standardize the library',
    ['Every SOP reformatted', 'Owners and cadences assigned', 'Measurement baseline set', 'Consistency review with the team', 'Library handoff'],
  ],
  [
    'Week 03',
    'Prototype',
    ['Feature decisions workshop', 'Prototype scope locked', 'Screen design and content flow', 'Team walkthrough', 'Build estimate delivered'],
  ],
] as const

const investmentLines = [
  [
    '01',
    'SOP Foundation',
    'Extraction from Delight Tree, inventory, de-duplication, general organization, master template, full library reformat, owners and cadences, call-recording workflow, and measurement baseline.',
    PRICE_SOP_FOUNDATION,
  ],
  [
    '02',
    'Prototype',
    'Feature decisions, prototype scope, screen design across the trainee journey, real SOP content flowed in, clickable walkthrough, and a firm build estimate.',
    PRICE_PROTOTYPE,
  ],
  [
    '03',
    'Advisory retainer',
    'Ongoing counsel throughout the engagement: working sessions and async access on agentic systems, big and small. Month to month, cancel anytime.',
    PRICE_ADVISORY,
  ],
  [
    '04',
    'Owner responsibilities',
    'Hike Doggie records the calls, names SOP owners, and protects training time. We provide the systems; the standards live or die with the team.',
    'Client-owned',
  ],
  [
    '05',
    'App build and beta',
    'App, desktop version, and admin backend. Much will already be built by then; the remaining work is agentic nuance, and the range depends on the features you choose. The approved prototype turns this into a firm quote.',
    '$8k to $20k',
  ],
]

const breakEven: DetailRow[] = [
  [
    '01',
    'A faster launch',
    'Every week trimmed from a new operator ramp is a week of revenue-producing hikes gained. Multiply that by every operator who ever onboards.',
  ],
  [
    '02',
    'A saved sale',
    'One closed deal that would have slipped past an undertrained operator covers a meaningful share of this entire engagement.',
  ],
  [
    '03',
    'A standard that lasts',
    'SOPs done once, in a portable format every future tool can use. This work never has to be paid for twice.',
  ],
  [
    '04',
    'Yours to repurpose',
    'You own this outright: the library, the system, the build. If it proves itself, repurpose it for your other clients however you like. Nothing is licensed back to us.',
  ],
]

const nextSteps: DetailRow[] = [
  [
    '01',
    'Confirm scope',
    'Confirm this engagement covers the SOP Foundation, the prototype, and advisory, with the build quoted after the prototype is approved.',
  ],
  [
    '02',
    'Share access',
    'Provide Delight Tree access or exports, the SOP spreadsheets and docs, and a first list of SOP owners on the team.',
  ],
  [
    '03',
    'Begin Week 01',
    'Extraction and inventory start immediately, and sales calls start recording the same week. Small wins, right away.',
  ],
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
  href = acceptProposalHref,
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

function HikeDoggieNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Hike Doggie</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">SOP Foundation and Prototype - v1</span>
          <span className="eyebrow">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              Hike Doggie
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <a href={acceptProposalHref} className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
            Accept proposal
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

export function HikeDoggieProposal() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies x Hike Doggie - SOP & Prototype Proposal'
      const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (meta) {
        meta.content = 'An outcome-focused SOP Foundation and Prototype proposal for Hike Doggie from Anchovies.'
      }
    }
  }, [])

  return (
    <main className="hike-doggie-proposal min-h-screen bg-paper text-ink antialiased">
      <HikeDoggieNav />

      <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
        <div className="flex flex-col gap-6 pb-16 md:flex-row md:items-start md:justify-between lg:pb-24">
          <Reveal className="flex flex-col gap-1.5">
            <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
            <span className="eyebrow text-ink-2">SOP Foundation and Prototype</span>
          </Reveal>
          <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
            <span className="eyebrow text-ink-2">Prepared for Hike Doggie</span>
            <span className="eyebrow text-ink-2">By Anchovies</span>
          </Reveal>
        </div>
        <Reveal>
          <h1 className="display max-w-[1180px] pb-12 text-[52px] leading-[54px] sm:text-[76px] sm:leading-[76px] md:text-[100px] md:leading-[96px] lg:pb-16 lg:text-[124px] lg:leading-[116px]">
            More dogs on the bus.
          </h1>
        </Reveal>
        <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
          <Reveal className="max-w-[650px] flex-1">
            <h2 className="serif text-[30px] leading-[38px] md:text-[38px] md:leading-[46px]">
              An outcome-focused engagement to transform Hike Doggie's SOPs into a system people actually complete, and to design the app that will deliver them.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[440px] flex-col gap-7">
            <p className="text-[15px] leading-[23px] text-ink-2">
              The direction is set. We walked it together in the working session. This proposal prices the first two phases, keeps advisory in the room throughout, and lets the prototype price the build honestly.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AnchorButton>{'Accept proposal ->'}</AnchorButton>
              <AnchorButton href="#approach" variant="outline">
                View the scope
              </AnchorButton>
            </div>
          </Reveal>
        </div>
        <Reveal className="border-t border-[var(--color-rule)] pt-12">
          <MetaRow left="Fig. 01 - What this engagement creates" right="Four outcomes" />
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
        <MetaRow left="§ 02 - What we know" right="Direction set, weeds avoided" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <h2 className="display max-w-[650px] text-[48px] leading-[52px] md:text-[68px] md:leading-[70px]">
              Clarity evolves through the process. This is the process.
            </h2>
            <div className="flex max-w-[500px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
              <p>The working session established the direction: SOPs digested, learned, and proven through one system Hike Doggie owns.</p>
              <p>This proposal scopes only what can be scoped honestly today, and commits to small wins with tangible, measurable outcomes from the first week.</p>
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

      <section id="outcomes" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 03 - The outcomes" right="Measured against yesterday" dark />
        <Reveal>
          <h2 className="display max-w-[1180px] py-16 text-[48px] leading-[54px] md:text-[76px] md:leading-[78px] lg:text-[96px] lg:leading-[96px]">
            Efficiency in the right places, and a standard that carries itself.
          </h2>
        </Reveal>
        <Reveal className="ml-auto max-w-[760px] border-t border-paper/20">
          {outcomeLines.map((line) => (
            <p key={line} className="serif border-b border-paper/20 py-7 text-[25px] leading-[34px] text-paper/82 md:text-[34px] md:leading-[42px]">
              {line}
            </p>
          ))}
        </Reveal>
      </section>

      <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 04 - Our approach" right="Two priced phases, one honest deferral" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[820px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              Extract, standardize, prototype.
            </h2>
          </Reveal>
          <Reveal className="max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            The unglamorous work comes first: getting the content out of Delight Tree and into one owned, consistent standard. The prototype follows from what that work teaches us. The build is quoted only when the prototype has defined it.
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
                <p className="text-[14px] leading-[21px] font-semibold text-ink">Outcome - {phase.outcome}</p>
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
        <MetaRow left="§ 05 - Final deliverables" right="Things you can point at" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[640px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              Every line ends in something finished.
            </h2>
          </Reveal>
          <Reveal className="max-w-[540px] text-[15px] leading-[24px] text-ink-2">
            Outcome-focused means each deliverable is a finished, usable thing, not a report about one. The library is yours, the standard is yours, and the context you start capturing is yours to keep.
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
        <MetaRow left="§ 06 - Timeline" right="Two weeks SOP, one week prototype" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[700px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              Short sprints. Tangible outcomes. No waiting for perfect.
            </h2>
          </Reveal>
          <Reveal className="max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            Realistically: two weeks for the SOP Foundation, one week for the prototype, with everyone moving. Exact dates are confirmed at kickoff, once Delight Tree access and the SOP materials are in hand. Call recording starts in week one regardless. Context capture should never wait on a plan.
          </Reveal>
        </div>
        <Reveal className="grid border-t border-l border-[var(--color-rule)] md:grid-cols-3">
          {timeline.map(([sprint, title, items]) => (
            <article key={sprint} className="min-h-[330px] border-r border-b border-[var(--color-rule)] p-8">
              <span className="eyebrow text-ink-2">{sprint}</span>
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
        <MetaRow left="§ 07 - Investment" right="Itemized · One total" />
        <Reveal className="grid gap-10 border-b border-[var(--color-rule)] py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="display text-[72px] leading-none md:text-[124px]">{PRICE_TOTAL}</p>
            <p className="eyebrow mt-5 text-ink-2">Total - SOP Foundation and Prototype · plus {PRICE_ADVISORY} advisory</p>
          </div>
          <div className="flex max-w-[560px] flex-col gap-5 text-[15px] leading-[24px] text-ink-2">
            <p>This covers the two phases that can be priced honestly today: the full SOP Foundation, including the manual work of extracting and organizing everything out of Delight Tree, and the prototype that will define and price the build.</p>
            <p>Advisory runs alongside as a month-to-month retainer, cancel anytime. Pricing reflects a founding-client consideration in exchange for case-study rights and referenceable results as this work becomes a portfolio.</p>
          </div>
        </Reveal>
        <Reveal className="pt-12">
          <MetaRow left="Fig. 02 - How to judge the number" right="Outcomes, not hours" />
          <p className="max-w-[640px] pt-6 text-[15px] leading-[24px] text-ink-2">
            We think about price the way you will: against outcomes. A few ways this investment covers itself.
          </p>
          <div className="mt-8 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
            {breakEven.map(([num, title, body], index) => (
              <div key={title} className={`flex min-h-[220px] flex-col gap-5 border-[var(--color-rule)] p-7 ${fourCardBorderClass(index, breakEven.length)}`}>
                <span className="eyebrow text-ink-2">B / {num}</span>
                <h3 className="serif text-[27px] leading-[32px]">{title}</h3>
                <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-12 border-b border-t border-[var(--color-rule)]">
          {investmentLines.map(([num, title, body, price]) => (
            <Reveal key={num} className="grid gap-6 border-b border-ink/20 py-8 last:border-b-0 md:grid-cols-[80px_1fr_minmax(0,1.25fr)_200px]">
              <span className="serif text-[40px] leading-none">{num}</span>
              <h3 className="serif text-[30px] leading-[34px]">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
              <p className="serif text-[30px] leading-[36px] md:text-right">{price}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 08 - Next step" right="From access to extraction" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              If this feels right, we start with access, and the calls start recording the same week.
            </h2>
          </Reveal>
          <Reveal className="max-w-[440px] text-[15px] leading-[24px] text-ink-2">
            The first step costs nothing and proves everything: get the content flowing out of Delight Tree, and get the context flowing in.
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
            From scattered SOPs to a standard that gets dogs on the bus.
          </h2>
        </Reveal>
        <div className="grid gap-10 pt-16 lg:grid-cols-[1fr_360px]">
          <Reveal className="max-w-[540px] text-[15px] leading-[24px] text-paper/70">
            By the end of this engagement, Hike Doggie owns a complete, consistent SOP library; a context asset that grows daily; a tested prototype of the training experience; and an honest, prototype-priced path to the full build: app, desktop, and the backend to run it all. Every piece is owned outright, and yours to repurpose for other clients if it proves itself.
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow text-paper/55">Begin</span>
            <AnchorButton href={acceptProposalHref} variant="light">
              {'Accept proposal ->'}
            </AnchorButton>
            <p className="text-[13px] leading-[20px] text-paper/60">{PRICE_TOTAL} - SOP Foundation and Prototype · {PRICE_ADVISORY} advisory</p>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[var(--color-rule)] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-16">
        <div className="flex flex-wrap items-center gap-4">
          <span className="eyebrow font-medium text-ink">Anchovies</span>
          <span className="hidden h-[10px] w-px bg-[var(--color-rule)] sm:block" />
          <span className="eyebrow text-ink-2">Hike Doggie SOP Foundation and Prototype proposal</span>
          <span className="eyebrow text-ink-2">v1 - July 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="eyebrow text-ink-2">Confidential</span>
          <span className="eyebrow text-ink">- end -</span>
        </div>
      </footer>
    </main>
  )
}
