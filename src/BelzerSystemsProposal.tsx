import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

type System = {
  number: string
  title: string
  format: string
  outcome: string
  features: string[]
  results: string[]
  boundaries: string[]
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'systems', label: 'Two Systems' },
  { id: 'value', label: 'Value' },
  { id: 'investment', label: 'Investment' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'next', label: 'Next Step' },
]

const heard = [
  {
    title: 'The firm needs clearer lanes.',
    body: 'Belzer Law is busy and growing. Work moves quickly, but ownership, next steps, and client communication should be easier to see.',
  },
  {
    title: 'Aaron needs more room to lead.',
    body: 'The goal is to recover time for leadership, relationships, and business development without losing visibility into the work.',
  },
  {
    title: 'Start with operations and experience.',
    body: 'The clearest first opportunities are repetitive coordination and client communication, not AI-generated legal work.',
  },
]

const systems: System[] = [
  {
    number: '01',
    title: 'Client Experience App',
    format: 'Private iPhone app through TestFlight',
    outcome:
      'Give every client one clear, private place to understand their matter, send what the firm needs, and know what comes next.',
    features: [
      'Private iPhone app distributed through TestFlight',
      'Initial client onboarding',
      'Matter home with plain-English status and current contacts',
      'Requests, next steps, decisions, and deadlines in one place',
      'Secure document library and client document uploads',
      'Private messages and attorney-reviewed updates',
      'Push notifications for missing documents, upcoming actions, and important changes',
      'Lightweight staff controls for publishing updates and requests',
    ],
    results: [
      'Fewer repeated client emails',
      'Faster collection of client materials',
      'Clearer expectations throughout the matter',
      'A more considered, boutique client experience',
    ],
    boundaries: [
      'Android version',
      'Public App Store launch',
      'Billing or payment collection',
      'AI legal advice',
      'Autonomous legal responses',
    ],
  },
  {
    number: '02',
    title: 'Firm Workflow Portal',
    format: 'Responsive internal portal for the Belzer team',
    outcome:
      'Make it immediately clear who owns the work, what needs to happen, when it is due, and how the team should move it forward.',
    features: [
      'Matter dashboard with owners, assignments, deadlines, and current priorities',
      'Repeatable case checklists and role-specific views',
      'Voice or chat capture that prepares tasks for review',
      'Email drafts and action extraction, always requiring human approval before sending',
      'New-client document naming and organization workflow',
      'Calendar and deadline visibility using firm-approved dates',
      'Workflow observation session',
      'Onboarding for Aaron, Britt, and key team members',
    ],
    results: [
      'Clearer task ownership and handoffs',
      'Less time spent checking who is doing what',
      'More consistent internal processes',
      'More room for leadership, relationships, and growth',
    ],
    boundaries: [
      'Autonomous email sending',
      'AI legal research',
      'Automatic legal deadline calculation',
      'Replacement of the firm’s entire case-management system',
    ],
  },
]

const sharedBoundaries = [
  'Belzer attorneys remain responsible for all legal judgment, legal advice, and final client communications.',
  'The first release is limited to the functions listed in the selected system.',
  'New integrations, platforms, and major features are scoped separately after the first release proves what is useful.',
  'Belzer provides timely access, content, approvals, and firm-approved dates needed to complete the work.',
]

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow sm:text-right ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{right}</span>
    </div>
  )
}

function AnchorButton({
  children,
  href,
  variant = 'blue',
}: {
  children: string
  href: string
  variant?: 'blue' | 'outline' | 'light'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-paper/85'
      : variant === 'outline'
        ? 'border border-[var(--color-rule)] text-ink hover:bg-ink hover:text-paper'
        : 'bg-mac text-white hover:bg-mac-hover'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-center text-[13px] font-medium leading-[18px] transition-colors ${classes}`}
    >
      {children}
    </a>
  )
}

function ProposalNav() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const sections = navSections.map((section) => document.getElementById(section.id)).filter((el): el is HTMLElement => Boolean(el))
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
      <div className="hidden border-b border-[var(--color-rule)] px-10 py-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[11px] w-auto" />
          <span className="h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Belzer Law</span>
        </div>
        <span className="eyebrow text-ink-2">Client + Firm Systems · July 2026</span>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/92 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10">
          <a href="#overview" className="flex items-center gap-3" aria-label="Return to proposal overview">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">×</span>
              Belzer Law
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}
              >
                {section.label}
              </a>
            ))}
          </nav>
          <AnchorButton href={calendarHref}>Schedule a proposal review</AnchorButton>
        </div>
      </div>
    </header>
  )
}

function SystemCard({ system }: { system: System }) {
  return (
    <Reveal className="grid border border-[var(--color-rule)] bg-paper lg:grid-cols-[0.8fr_1.2fr]">
      <div className="flex flex-col justify-between gap-10 border-b border-[var(--color-rule)] p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <span className="eyebrow text-ink-2">System {system.number}</span>
            <div className="text-right">
              <span className="display block text-[40px] leading-none">$8,000</span>
              <span className="eyebrow mt-2 block text-ink-2">About six weeks</span>
            </div>
          </div>
          <h3 className="display mt-12 text-[46px] leading-[48px] md:text-[64px] md:leading-[64px]">{system.title}</h3>
          <p className="eyebrow mt-5 text-ink-2">{system.format}</p>
          <p className="mt-8 text-[18px] leading-[29px] text-ink">{system.outcome}</p>
        </div>
        <AnchorButton href={calendarHref}>Discuss this system</AnchorButton>
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border-b border-[var(--color-rule)] p-6 md:border-b-0 md:border-r md:p-8 lg:p-10">
          <span className="eyebrow text-ink-2">What Belzer receives</span>
          <div className="mt-6 border-t border-[var(--color-rule)]">
            {system.features.map((feature) => (
              <div key={feature} className="border-b border-[var(--color-rule)] py-3 text-[14px] leading-[21px]">
                {feature}
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-rows-[auto_1fr]">
          <div className="border-b border-[var(--color-rule)] p-6 md:p-8 lg:p-10">
            <span className="eyebrow text-ink-2">Expected outcome</span>
            <div className="mt-5 space-y-3">
              {system.results.map((result) => (
                <p key={result} className="text-[15px] leading-[23px]">{result}</p>
              ))}
            </div>
          </div>
          <div className="p-6 md:p-8 lg:p-10">
            <span className="eyebrow text-ink-2">Not in the first release</span>
            <div className="mt-5 space-y-2">
              {system.boundaries.map((boundary) => (
                <p key={boundary} className="text-[13px] leading-[20px] text-ink-2">{boundary}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function BelzerSystemsProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Belzer Law - Client + Firm Systems'
  }, [])

  return (
    <main className="belzer-systems-proposal bg-paper text-ink">
      <ProposalNav />

      <section id="overview" className="border-b border-[var(--color-rule)] px-5 py-12 md:px-10 md:py-16 lg:px-[96px]">
        <MetaRow left="Belzer Law / Client + Firm Systems" right="$8,000 each · $16,000 together" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <Reveal>
            <h1 className="display max-w-[920px] text-[54px] leading-[54px] md:text-[86px] md:leading-[84px] lg:text-[108px] lg:leading-[102px]">
              Less chasing. Clearer work. A better client experience.
            </h1>
          </Reveal>
          <Reveal className="flex max-w-[560px] flex-col gap-6 lg:pb-3">
            <p className="serif text-[26px] leading-[34px] md:text-[35px] md:leading-[43px]">
              Two practical systems built around the work Belzer Law does every day.
            </p>
            <p className="text-[15px] leading-[24px] text-ink-2">
              Start with the client experience, start with the firm’s internal workflow, or build both as one connected engagement. Each direction has a clear first release and a concrete outcome.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <AnchorButton href={calendarHref}>Schedule a proposal review</AnchorButton>
              <AnchorButton href="#systems" variant="outline">Compare the two systems</AnchorButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="heard" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="What we heard" right="The opportunity in simple terms" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <h2 className="display text-[46px] leading-[48px] md:text-[74px] md:leading-[74px]">
              More clarity for clients. More control for the firm.
            </h2>
          </Reveal>
          <div className="border-t border-[var(--color-rule)]">
            {heard.map((item, index) => (
              <Reveal key={item.title} className="grid gap-5 border-b border-[var(--color-rule)] py-6 md:grid-cols-[54px_0.7fr_1.3fr]">
                <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="serif text-[24px] leading-[30px]">{item.title}</h3>
                <p className="text-[15px] leading-[24px] text-ink-2">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="systems" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Two systems" right="Choose either one or build both" />
        <Reveal className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <h2 className="display text-[50px] leading-[52px] md:text-[82px] md:leading-[82px]">
            Choose where clarity would matter most first.
          </h2>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            Both systems are designed around a bounded first release. Either one can stand alone. The second can be added later for the same $8,000 investment.
          </p>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {systems.map((system) => <SystemCard key={system.title} system={system} />)}
        </div>
      </section>

      <section id="value" className="border-b border-[var(--color-rule)] bg-ink px-5 py-16 text-paper md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="A simple value illustration" right="Transparent break-even math" dark />
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <Reveal>
            <h2 className="display text-[52px] leading-[54px] md:text-[84px] md:leading-[84px]">
              The investment only has to recover a small amount of firm time.
            </h2>
          </Reveal>
          <Reveal className="grid border border-white/25 md:grid-cols-2">
            <div className="border-b border-white/25 p-7 md:border-b-0 md:border-r md:p-9">
              <span className="eyebrow text-paper/55">One system</span>
              <span className="display mt-8 block text-[72px] leading-none">20 hours</span>
              <p className="mt-5 text-[15px] leading-[24px] text-paper/70">$8,000 divided by an illustrative $400 attorney hour.</p>
            </div>
            <div className="p-7 md:p-9">
              <span className="eyebrow text-paper/55">Both systems</span>
              <span className="display mt-8 block text-[72px] leading-none">40 hours</span>
              <p className="mt-5 text-[15px] leading-[24px] text-paper/70">$16,000 divided by the same illustrative $400 attorney hour.</p>
            </div>
            <p className="border-t border-white/25 p-7 text-[13px] leading-[21px] text-paper/55 md:col-span-2 md:p-9">
              This is transparent break-even math, not a guaranteed savings claim. The actual value depends on adoption, usage, matter volume, and the time each system recovers across the firm.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="investment" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Investment and delivery" right="A clear first release" />
        <div className="mt-10 grid border border-[var(--color-rule)] lg:grid-cols-3">
          <Reveal className="border-b border-[var(--color-rule)] p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <span className="eyebrow text-ink-2">Client Experience App</span>
            <span className="display mt-7 block text-[62px] leading-none">$8,000</span>
            <p className="mt-4 text-[15px] leading-[24px] text-ink-2">Approximately six weeks, ending with TestFlight onboarding.</p>
          </Reveal>
          <Reveal className="border-b border-[var(--color-rule)] p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <span className="eyebrow text-ink-2">Firm Workflow Portal</span>
            <span className="display mt-7 block text-[62px] leading-none">$8,000</span>
            <p className="mt-4 text-[15px] leading-[24px] text-ink-2">Approximately six weeks, ending with team onboarding.</p>
          </Reveal>
          <Reveal className="bg-mac p-6 text-white md:p-8 lg:p-10">
            <span className="eyebrow text-white/65">Both systems</span>
            <span className="display mt-7 block text-[62px] leading-none">$16,000</span>
            <p className="mt-4 text-[15px] leading-[24px] text-white/80">Approximately ten weeks as one coordinated engagement.</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <h3 className="display text-[42px] leading-[44px] md:text-[60px] md:leading-[60px]">50 / 25 / 25</h3>
            <p className="mt-5 max-w-[420px] text-[15px] leading-[24px] text-ink-2">
              The same milestone structure applies whether Belzer selects one system or both.
            </p>
          </Reveal>
          <Reveal className="border-t border-[var(--color-rule)]">
            {[
              ['50%', 'At kickoff', '$4,000 for one system · $8,000 for both'],
              ['25%', 'After approval of the working prototype and core experience', '$2,000 for one system · $4,000 for both'],
              ['25%', 'At launch or TestFlight onboarding', '$2,000 for one system · $4,000 for both'],
            ].map(([percent, milestone, amount]) => (
              <div key={milestone} className="grid gap-3 border-b border-[var(--color-rule)] py-5 sm:grid-cols-[70px_1fr_auto] sm:items-center sm:gap-6">
                <span className="display text-[30px] leading-none">{percent}</span>
                <span className="text-[14px] leading-[21px]">{milestone}</span>
                <span className="eyebrow text-ink-2 sm:text-right">{amount}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-10 grid border border-[var(--color-rule)] md:grid-cols-2">
          <div className="border-b border-[var(--color-rule)] p-6 md:border-b-0 md:border-r md:p-8">
            <span className="eyebrow text-ink-2">Feedback</span>
            <p className="mt-4 text-[17px] leading-[27px]">Two structured feedback rounds are included in the selected engagement.</p>
          </div>
          <div className="p-6 md:p-8">
            <span className="eyebrow text-ink-2">Stabilization</span>
            <p className="mt-4 text-[17px] leading-[27px]">A 30-day stabilization period covers bugs and small launch adjustments.</p>
          </div>
        </Reveal>
      </section>

      <section id="boundaries" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Boundaries" right="What keeps the first release focused" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <h2 className="display text-[46px] leading-[48px] md:text-[72px] md:leading-[72px]">Useful first. Expand only when it earns it.</h2>
          </Reveal>
          <div className="border-t border-[var(--color-rule)]">
            {sharedBoundaries.map((boundary, index) => (
              <Reveal key={boundary} className="grid gap-5 border-b border-[var(--color-rule)] py-6 sm:grid-cols-[52px_1fr]">
                <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-[17px] leading-[27px]">{boundary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="next" className="bg-ink px-5 py-16 text-paper md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Next step" right="Choose where to begin" dark />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <Reveal>
            <h2 className="display text-[52px] leading-[54px] md:text-[88px] md:leading-[86px]">
              Decide which kind of clarity would help most right now.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[520px] flex-col gap-6">
            <p className="text-[17px] leading-[28px] text-paper/72">
              We can review the two directions together, choose the right starting point, and confirm the first release before kickoff.
            </p>
            <div className="flex flex-wrap gap-3">
              <AnchorButton href={calendarHref}>Schedule a proposal review</AnchorButton>
              <AnchorButton href="#systems" variant="light">Compare the two systems</AnchorButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
