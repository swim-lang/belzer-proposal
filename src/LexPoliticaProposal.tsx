import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'modules', label: 'Modules' },
  { id: 'approach', label: 'Approach' },
  { id: 'sprint', label: 'Sprint' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

const stages = [
  {
    label: 'Stage 01',
    name: 'Map',
    desc: 'The current ecosystem — Outlook, Teams, SharePoint, Bill4Time, Monday.com, Typeform, DocuSign, and the rest. What lives where.',
  },
  {
    label: 'Stage 02',
    name: 'Design',
    desc: 'A portal that holds matters, people, deadlines, and documents in one place. Designed once, released in pieces the team is ready for.',
  },
  {
    label: 'Stage 03',
    name: 'Release',
    desc: 'One useful workflow at a time. Boring in the best way — clear, dependable, and immediately saves the team a step.',
  },
  {
    label: 'Stage 04',
    name: 'Evolve',
    desc: "As the foundation proves itself, AI assistance, deeper integrations, and reduced tool sprawl follow — on the firm's timeline.",
  },
]

const modules = [
  {
    num: '01',
    title: 'Firm home dashboard.',
    body: 'A central landing page for the team. The dashboard does not replace every tool; it gives the firm one useful place to see what matters now.',
    includes: [
      'Upcoming deadlines and recent activity',
      'Attorney capacity signals',
      'New client intake status',
      'Items awaiting signature',
      'Quick links to common systems',
      'Internal announcements + reminders',
    ],
  },
  {
    num: '02',
    title: 'Client and matter hub.',
    body: 'A cleaner place to view the essential information tied to a client, matter, or internal workflow without searching across multiple systems.',
    includes: [
      'Client name + contact information',
      'Lead attorney + supporting staff',
      'Matter type, status, relevant deadlines',
      'SharePoint file links + intake info',
      'Bill4Time reference + DocuSign status',
      'Next action and clear owner',
    ],
  },
  {
    num: '03',
    title: 'Attorney capacity tracker.',
    body: 'A simple internal tool for understanding who has room to help, who is constrained, and what the firm should know before assigning work.',
    includes: [
      'Green / Yellow / Red status',
      'Notes for major constraints',
      'Trial, depositions, filings, travel',
      'Team-level group views',
      'Lightweight to update + read',
      'Smarter v2 uses calendar data',
    ],
  },
  {
    num: '04',
    title: 'Branded document generator.',
    body: 'A custom Lex Politica version of the current document-generation workflow, with a cleaner interface and better routing around review.',
    includes: [
      'Polished Lex Politica interface',
      'Form-based intake + conditional logic',
      'Cleaner formatting + template management',
      'Attorney review workflow',
      'AI-assisted field cleanup + summary',
      'Routing to storage or DocuSign',
    ],
  },
  {
    num: '05',
    title: 'Intake + onboarding flow.',
    body: 'Today, Typeform handles new client info. Either bring it inside the portal or connect it more intelligently to the rest of the system.',
    includes: [
      'New client submission',
      'Conflict + internal review routing',
      'Required document checklist',
      'DocuSign trigger + SharePoint folder',
      'Matter creation + internal notification',
      'Status tracking through close',
    ],
  },
  {
    num: '06',
    title: 'Integration + connection layer.',
    body: 'The long-term value comes from talking to existing tools. The first version should identify the right connections, not connect everything.',
    includes: [
      'Outlook · Teams · SharePoint',
      'Bill4Time · QuickBooks · Typeform',
      'DocuSign · MailChimp · Everhour',
      'Westlaw · Monday.com',
      'Vercel · Supabase · GitHub',
      'Claude Code + future model layer',
    ],
  },
  {
    num: '07',
    title: 'AI-assisted firm intelligence.',
    body: 'Once the foundation is organized, a smarter AI layer becomes useful because it has cleaner structure and clearer boundaries.',
    includes: [
      'Ask questions across matter data',
      'Summarize recent activity on a matter',
      'Identify missing intake information',
      'Suggest next administrative actions',
      'Generate admin-friendly reports',
      'Help train new staff and law clerks',
    ],
  },
]

const timeline = [
  ['Day 1', 'Map the ecosystem', "Identify what exists, where information lives, what's duplicated, and which workflows create the most friction."],
  ['Day 12', 'Show the future state', 'A designed prototype of the portal, dashboard, client/matter hub, and priority workflows.'],
  ['Day 20', 'Launch the first useful version', 'A small set of practical features — portal shell, Typeform intake routing, Bill4Time reference points, or capacity tracking — depending on priority.'],
  ['Month 2', 'Connect the system', 'Deeper integrations — likely SharePoint, Outlook or Teams, Typeform, DocuSign, and Bill4Time.'],
  ['Month 3', 'Reduce tool dependency', 'As the portal becomes more useful, decide which outside tools stay, connect, or eventually become unnecessary.'],
  ['Month 4', 'Proprietary firm infrastructure', 'Lex Politica has a custom operating layer that supports how the firm actually works.'],
]

const weekOneTasks = [
  ['1.1', 'Kickoff + stakeholder alignment', 'Define goals, users, constraints, and the highest-value workflows for the first release.'],
  ['1.2', 'Current ecosystem map', 'Document the software landscape — Outlook, Teams, Bill4Time, Monday.com, Typeform, DocuSign, SharePoint, and adjacent tools.'],
  ['1.3', 'Workflow mapping', 'Map the most important workflows: new client intake, matter setup, document generation, signatures, capacity, and handoffs.'],
  ['1.4', 'Feature prioritization', 'Sort ideas into four buckets: must exist in first release, useful later, integration-dependent, and not worth building yet.'],
]

const weekTwoTasks = [
  ['2.1', 'Information architecture', 'Define the structure of the portal: main navigation, dashboard hierarchy, client/matter views, and admin flows.'],
  ['2.2', 'Interface design', 'First visual concepts — firm home dashboard, client/matter overview, capacity tracker, and document workflow.'],
  ['2.3', 'Technical architecture', 'A practical technical path — Vercel deployment, Supabase data model, authentication, permissions, and integration sequence.'],
  ['2.4', 'Build roadmap + final presentation', 'Phased build plan: recommended MVP, build phases, rough timeline, and a responsible quote for the first build sprint.'],
]

const includedDeliverables = [
  'Current software ecosystem map',
  'Workflow map',
  'User role + stakeholder map',
  'Feature priority matrix',
  'First-release recommendation',
  'Portal information architecture',
  'Initial UI direction',
  'Dashboard concept',
  'Client/matter hub concept',
  'Capacity tracker concept',
  'Document generator concept',
  'Integration roadmap',
  'Security + permissions considerations',
  'Phased build plan + rough quote',
  'Technical implementation notes',
]

const optionalDeliverables = [
  'Clickable prototype',
  'Mobile concept',
  'Partner-facing presentation deck',
  'More detailed data model',
  'More detailed technical architecture',
]

const sprintClarity = [
  {
    label: 'What the sprint is',
    body: 'A focused strategy, UX, working prototype, and technical roadmap engagement. Lex Politica leaves with a clear product direction and enough detail to understand what should be built first.',
  },
  {
    label: 'What it is not',
    body: 'It is not a commitment to the full software build. The prototype and roadmap are useful on their own, and Lex Politica can use them internally or share them with another developer.',
  },
  {
    label: 'What happens after',
    body: 'Once the MVP, features, integrations, and permissions are defined, Anchovies can quote the build. Simple first builds may start around $7K; more involved builds with heavier integrations, automation, or AI features may reach $50K+.',
  },
]

const whyAnchovies = [
  ['01', 'We design first.', 'The work starts by making the system understandable before anyone builds the wrong thing.'],
  ['02', 'We ship in pieces.', 'The right first version is small enough to use and serious enough to become infrastructure.'],
  ['03', 'AI as a tool, not a sales pitch.', 'AI becomes useful when the workflow, data, and review boundaries are clear.'],
  ['04', 'Modern stack, no resellers.', 'Vercel, Supabase, GitHub, and practical model layers give the firm leverage without unnecessary platform bloat.'],
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
  variant?: 'dark' | 'light' | 'outline'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
        ? 'border border-[var(--color-rule)] text-ink hover:bg-ink hover:text-paper'
        : 'bg-ink text-paper hover:bg-ink-2'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3.5 text-[13px] font-medium transition-colors whitespace-nowrap ${classes}`}
    >
      {children}
    </a>
  )
}

function LexNav() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const sections = navSections.map((section) => document.getElementById(section.id)).filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 text-ink md:flex">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Lex Politica</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Proposal · v1</span>
          <span className="eyebrow">May 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] tracking-[-0.01em] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">×</span>
              Lex Politica
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-ink-2 whitespace-nowrap">
            Schedule Sprint
          </a>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
      <MetaRow left="§ 01 — Proposal" right="Lex Politica · Washington, D.C." />
      <div className="pt-4">
        <span className="eyebrow text-ink-2">A custom-built operating layer · Strategy + Custom Software</span>
      </div>
      <Reveal>
        <h1 className="display max-w-[1200px] py-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:py-16 lg:text-[128px] lg:leading-[108px]">
          A custom-built
          <br />
          operating layer for
          <br />
          Lex Politica.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            A focused internal system that makes the firm easier to run, easier to scale, and easier to evolve.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            A clearer foundation for how matters, people, documents, deadlines, intake, and capacity all live together.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Begin with the design sprint ->'}</AnchorButton>
            <AnchorButton href="#modules" variant="outline">
              View modules
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 — How the operating layer comes together" right="Four stages" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage, index) => (
            <div key={stage.name} className={`flex min-h-[260px] flex-col gap-6 p-8 ${index < stages.length - 1 ? 'border-b border-[var(--color-rule)] md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
              <span className="eyebrow text-ink-2">{stage.label}</span>
              <h3 className="serif text-[40px] leading-[44px] tracking-[-0.018em]">{stage.name}</h3>
              <p className="text-[13px] leading-[20px] text-ink-2">{stage.desc}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Opportunity() {
  return (
    <section id="heard" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 02 — The opportunity" right="Anchovies · Recommendation" dark />
      <Reveal>
        <h2 className="display max-w-[1100px] py-16 text-[50px] leading-[54px] tracking-[-0.026em] md:text-[78px] md:leading-[78px] lg:text-[96px] lg:leading-[92px]">
          Build the first layer of Lex Politica&apos;s internal operating system.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[520px] flex-1">
          <p className="text-[15px] leading-[24px] text-paper/70">
            A focused internal system that begins by organizing what already exists, then gradually becomes the place where the firm can see, understand, route, and act on its work.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[600px] flex-1 flex-col gap-3">
          <span className="eyebrow pb-3 text-paper/50">One place to answer</span>
          {[
            'Where is this matter?',
            'Who is attached to it?',
            'What is the next deadline?',
            'Where are the files?',
            'Who has capacity this week?',
            "What's waiting on a signature?",
          ].map((question) => (
            <p key={question} className="serif text-[26px] leading-[36px] tracking-[-0.012em] text-paper">
              {question}
            </p>
          ))}
          <p className="serif text-[26px] leading-[36px] tracking-[-0.012em] text-paper/45">... without opening five other tools.</p>
        </Reveal>
      </div>
    </section>
  )
}

function ProposedConcept() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 03 — Proposed concept" right="Working name" />
      <Reveal className="flex flex-col gap-6 py-16">
        <span className="eyebrow text-ink-2">A custom portal —</span>
        <h2 className="display max-w-[1200px] text-[58px] leading-[58px] tracking-[-0.03em] md:text-[96px] md:leading-[88px] lg:text-[144px] lg:leading-[124px]">
          Lex Politica Operating Layer.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 pt-6 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[520px] flex-1">
          <p className="serif text-[26px] leading-[36px] tracking-[-0.014em] md:text-[28px] md:leading-[38px]">
            A custom portal that connects the firm&apos;s matters, people, tools, files, deadlines, documents, and operational workflows into one cleaner experience.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[600px] flex-1 flex-col gap-6">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Designed as a long-term system, but built in phases. The first version focuses on a small number of high-value workflows. Later versions expand as the firm gains confidence and the system proves where it saves time.
          </p>
          <div className="grid border-t border-[var(--color-rule)] pt-4 sm:grid-cols-3">
            {[
              ['Designed for', 'Attorneys + staff'],
              ['Sequencing', 'Phased release'],
              ['Foundation', 'Vercel · Supabase'],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1 border-b border-[var(--color-rule)] py-4 sm:border-b-0 sm:pr-4">
                <span className="eyebrow text-ink-2">{label}</span>
                <span className="serif text-[20px] leading-[26px]">{value}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Modules() {
  return (
    <section id="modules" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 04 — Potential modules" right="Seven candidates" />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[600px] flex-1">
          <h2 className="display text-[44px] leading-[48px] tracking-[-0.024em] md:text-[64px] md:leading-[64px]">
            The sprint will prioritize. These are the strongest starting candidates.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Each module below is sized as a candidate, not a commitment. The design sprint decides what belongs in the first useful release.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {modules.map((module) => (
          <Reveal key={module.num} className="grid gap-8 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[120px_1fr_360px] lg:gap-12">
            <div className="flex flex-row items-baseline gap-4 lg:flex-col lg:gap-2">
              <span className="serif text-[56px] leading-[56px] tracking-[-0.02em]">{module.num}</span>
              <span className="eyebrow text-ink-2">Module</span>
            </div>
            <div className="max-w-[580px]">
              <h3 className="serif text-[30px] leading-[38px] tracking-[-0.015em]">{module.title}</h3>
              <p className="pt-4 text-[15px] leading-[24px] text-ink-2">{module.body}</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow text-ink-2">Includes</span>
              {module.includes.map((item) => (
                <div key={item} className="flex items-baseline gap-4">
                  <span className="h-px w-[10px] shrink-0 bg-[var(--color-rule)]" />
                  <span className="text-[14px] leading-[22px] text-ink-2">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function DayOneYearOne() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 05 — Day 1 to Year 1" right="A phased evolution" />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[600px] flex-1">
          <h2 className="display text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            The system evolves without creating confusion.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1">
          <p className="text-[15px] leading-[24px] text-ink-2">
            From mapping the ecosystem on Day 1 to a custom operating layer over time, the work should move in deliberate phases.
          </p>
        </Reveal>
      </div>
      <Reveal className="border-y border-[var(--color-rule)]">
        <div className="hidden grid-cols-[200px_360px_1fr] border-b border-[var(--color-rule)] py-4 md:grid">
          {['When', 'Phase', 'What happens'].map((label) => (
            <span key={label} className="eyebrow text-ink-2">{label}</span>
          ))}
        </div>
        {timeline.map(([when, phase, body]) => (
          <div key={when} className="grid gap-3 border-b border-[var(--color-rule)] py-6 last:border-b-0 md:grid-cols-[200px_360px_1fr] md:gap-0">
            <span className="serif text-[24px] leading-[28px]">{when}</span>
            <span className="serif text-[24px] leading-[28px]">{phase}</span>
            <p className="text-[15px] leading-[22px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function SprintHero() {
  return (
    <section id="sprint" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 06 — Recommended first step" right="Two weeks · Lower risk" dark />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-start lg:justify-between">
        <Reveal>
          <h2 className="display max-w-[700px] text-[52px] leading-[56px] tracking-[-0.025em] md:text-[84px] md:leading-[84px]">
            Begin with the design sprint.
          </h2>
        </Reveal>
        <Reveal className="pt-2 lg:text-right">
          <span className="display block text-[80px] leading-[82px] tracking-[-0.03em] md:text-[112px] md:leading-[104px]">$5,900</span>
          <span className="eyebrow text-paper/55">Starting at · 2-week timeline</span>
        </Reveal>
      </div>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[580px] flex-1">
          <p className="text-[15px] leading-[24px] text-paper/70">
            The sprint gives Lex Politica a clear plan, a working prototype direction, and a practical technical roadmap before deciding whether to build.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[540px] flex-1 flex-col border-t border-paper/20">
          {[
            ['Investment', 'Starting at $5,900'],
            ['Timeline', '2 weeks, depending on feedback + meeting availability'],
            ['Output', 'Strategy + UX direction + working prototype + technical roadmap + phased build estimate'],
            ['Decision point', 'Sprint creates clarity without requiring Lex Politica to build with Anchovies afterward'],
          ].map(([label, value]) => (
            <div key={label} className="grid gap-2 border-b border-paper/20 py-5 sm:grid-cols-[140px_1fr]">
              <span className="text-[14px] leading-[20px] text-paper/55">{label}</span>
              <span className="text-[14px] leading-[20px] text-paper/85">{value}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function SprintScope() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 07 — Sprint scope" right="Two-week structure" />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[600px] flex-1">
          <h2 className="display text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">Two weeks, start to handoff.</h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Week one is discovery, mapping, and strategy. Week two is design, roadmap, technical direction, and the first-build recommendation.
          </p>
        </Reveal>
      </div>
      <div className="flex flex-col gap-14">
        <SprintWeek num="01" title="Week 01 — Discovery, mapping, and strategy" subtitle="Understand the landscape before designing it." tasks={weekOneTasks} />
        <SprintWeek num="02" title="Week 02 — Design, roadmap, and quote" subtitle="Turn the strategy into a designed first version." tasks={weekTwoTasks} />
      </div>
    </section>
  )
}

function SprintWeek({ num, title, subtitle, tasks }: { num: string; title: string; subtitle: string; tasks: string[][] }) {
  return (
    <Reveal className="border-t border-[var(--color-rule)] pt-8">
      <div className="grid gap-6 pb-8 md:grid-cols-[140px_1fr]">
        <span className="display text-[74px] leading-[74px] tracking-[-0.025em]">{num}</span>
        <div>
          <span className="eyebrow text-ink-2">{title}</span>
          <h3 className="serif pt-3 text-[32px] leading-[40px] tracking-[-0.016em]">{subtitle}</h3>
        </div>
      </div>
      <div className="border-y border-[var(--color-rule)]">
        {tasks.map(([taskNum, taskTitle, taskBody]) => (
          <div key={taskNum} className="grid gap-4 border-b border-[var(--color-rule)] py-6 last:border-b-0 md:grid-cols-[80px_320px_1fr]">
            <span className="eyebrow text-ink-2">{taskNum}</span>
            <h4 className="serif text-[24px] leading-[30px] tracking-[-0.012em]">{taskTitle}</h4>
            <p className="text-[15px] leading-[22px] text-ink-2">{taskBody}</p>
          </div>
        ))}
      </div>
    </Reveal>
  )
}

function SprintDeliverables() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 08 — Sprint deliverables" right="What you walk away with" />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[600px] flex-1">
          <h2 className="display text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            A clear plan, a working prototype direction, and a quote you can trust.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Each item below is delivered at the end of the two-week sprint or identified as an optional add-on depending on depth. The build remains optional and is quoted only after the MVP scope is defined.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <DeliverableList title="D — Included" meta="15 items" items={includedDeliverables} prefix="D" />
        <DeliverableList title="D — Optional add-ons" meta="Sprint depth dependent" items={optionalDeliverables} prefix="+" />
      </div>
      <Reveal className="mt-10 grid border border-[var(--color-rule)] lg:grid-cols-3">
        {sprintClarity.map((item, index) => (
          <div
            key={item.label}
            className={`flex min-h-[220px] flex-col gap-5 p-6 md:p-8 ${
              index < sprintClarity.length - 1 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''
            }`}
          >
            <span className="eyebrow text-ink-2">{item.label}</span>
            <p className="text-[15px] leading-[24px] text-ink">{item.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function DeliverableList({ title, meta, items, prefix }: { title: string; meta: string; items: string[]; prefix: string }) {
  return (
    <Reveal className="border border-[var(--color-rule)]">
      <div className="flex items-center justify-between border-b border-[var(--color-rule)] px-5 py-4">
        <span className="eyebrow text-ink">{title}</span>
        <span className="eyebrow text-ink-2">{meta}</span>
      </div>
      {items.map((item, index) => (
        <div key={item} className="grid grid-cols-[64px_1fr] border-b border-[var(--color-rule)] px-5 py-4 last:border-b-0">
          <span className="eyebrow text-ink-2">{prefix === '+' ? `+ ${String(index + 1).padStart(2, '0')}` : `D-${String(index + 1).padStart(2, '0')}`}</span>
          <span className="text-[15px] leading-[22px]">{item}</span>
        </div>
      ))}
    </Reveal>
  )
}

function WhyAnchovies() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 09 — Why Anchovies" right="Designers + builders + practical AI" />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[48px] leading-[52px] tracking-[-0.024em] md:text-[82px] md:leading-[82px]">
          Custom software, but only when it&apos;s the right thing.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
        <Reveal className="flex max-w-[580px] flex-col gap-5">
          <p className="text-[15px] leading-[24px] text-ink-2">We are not approaching this as generic software resellers. We are approaching it as a design and build problem.</p>
          <p className="text-[15px] leading-[24px] text-ink-2">We approach this as designers, builders, strategists, and practical AI collaborators.</p>
          <p className="text-[15px] leading-[24px] text-ink-2">Lex Politica needs a system that is useful, clear, well-designed, and grounded in the firm&apos;s real operating needs.</p>
        </Reveal>
        <Reveal className="flex flex-1 flex-col border-t border-[var(--color-rule)]">
          {whyAnchovies.map(([num, title, body]) => (
            <div key={num} className="grid gap-4 border-b border-[var(--color-rule)] py-6 md:grid-cols-[60px_1fr]">
              <span className="eyebrow text-ink-2">{num}</span>
              <div>
                <h3 className="serif text-[26px] leading-[32px] tracking-[-0.012em]">{title}</h3>
                <p className="pt-2 text-[14px] leading-[22px] text-ink-2">{body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 10 — Next step" right="A simple way to begin" />
      <Reveal className="mt-16 border border-[var(--color-rule)] p-8 md:p-14 lg:p-16">
        <div className="flex flex-col gap-8 border-b border-[var(--color-rule)] pb-10 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="display max-w-[680px] text-[52px] leading-[56px] tracking-[-0.026em] md:text-[88px] md:leading-[84px]">
            Approve the design sprint.
          </h2>
          <div className="lg:text-right">
            <span className="display block text-[70px] leading-[74px] tracking-[-0.03em] md:text-[96px] md:leading-[88px]">$5,900</span>
            <span className="eyebrow text-ink-2">Two weeks, start to handoff</span>
          </div>
        </div>
        <div className="grid gap-10 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[480px_1fr]">
          <p className="text-[15px] leading-[24px] text-ink-2">
            The sprint is the right first move because it creates clarity before the firm decides whether to build, what to build first, and who should build it.
          </p>
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ink-2">At the end of the sprint, Lex Politica has —</span>
            {[
              'A clear product direction',
              'A working prototype or designed first version',
              'A technical roadmap',
              'A recommended MVP',
              'A phased build estimate after MVP scope is defined',
              'A smarter basis for what to build next',
            ].map((item, index) => (
              <div key={item} className="grid grid-cols-[42px_1fr]">
                <span className="text-[14px] leading-[22px] text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[14px] leading-[22px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-8">
          <AnchorButton>{'Schedule the sprint ->'}</AnchorButton>
        </div>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 11 — Closing" right="Anchovies × Lex Politica · 2026" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[48px] leading-[52px] tracking-[-0.024em] md:text-[86px] md:leading-[84px] lg:text-[104px] lg:leading-[100px]">
          Design the whole system. Build the first useful layer.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <Reveal className="max-w-[600px]">
          <p className="text-[15px] leading-[24px] text-paper/70">
            The technical question is never &quot;Can we build this?&quot; The real question is what should Lex Politica build first, in what order, and with what level of control.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-2">
          <span className="eyebrow text-paper/55">Prepared by</span>
          <span className="serif text-[28px] leading-[34px]">Anchovies</span>
          <span className="text-[14px] leading-[20px] text-paper/60">Strategy + custom software for law firms</span>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 border-t border-[var(--color-rule)] bg-paper px-6 py-8 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
        <span className="eyebrow text-ink">Anchovies</span>
        <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="eyebrow">Prepared for Lex Politica</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">May 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function LexPoliticaProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Lex Politica — Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A custom operating layer proposal for Lex Politica from Anchovies.')
    }
  }, [])

  return (
    <main className="lex-proposal bg-paper text-ink">
      <LexNav />
      <Hero />
      <Opportunity />
      <ProposedConcept />
      <Modules />
      <DayOneYearOne />
      <SprintHero />
      <SprintScope />
      <SprintDeliverables />
      <WhyAnchovies />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
