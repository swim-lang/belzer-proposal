import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const choosePilotHref = 'mailto:sean@anchovies.agency?subject=Belzer%20Pilot%20Proposal'
const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

type Option = {
  num: string
  title: string
  bestFor: string
  outcome: string
  receives: string[]
  usefulBecause: string
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'proposal', label: 'Proposal' },
  { id: 'options', label: 'Options' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next' },
]

const heard = [
  'The larger idea is interesting, but the next step needs to be easier to understand.',
  'The value needs to show up as a clear work product, not a vague promise about future software.',
  'The risk should feel low: one workflow, one outcome, one reviewable result.',
]

const options: Option[] = [
  {
    num: '01',
    title: 'Document Review + Exhibit Organizer',
    bestFor: 'A matter with a messy set of documents, invoices, records, or production materials.',
    outcome:
      'Belzer Law receives a clearer first pass through the materials, with the important facts, issues, and possible exhibit groupings easier to review.',
    receives: [
      'A searchable document index',
      'Plain-English summaries of the selected materials',
      'Issue tags and key fact tags',
      'A short key-facts list',
      'Possible exhibit groupings',
      'A review note on what still needs attorney attention',
    ],
    usefulBecause:
      'This helps the team spend less time hunting through documents and more time deciding what matters.',
  },
  {
    num: '02',
    title: 'Client Clarity System',
    bestFor: 'Matters where clients need clearer updates, next steps, deadlines, risks, costs, or decisions.',
    outcome:
      'Belzer Law receives a repeatable client update structure that makes legal progress easier for clients to understand.',
    receives: [
      'A client update structure',
      'Plain-English status summary templates',
      'Next-step and open-question prompts',
      'Risk, cost, and deadline explanation prompts',
      'One sample client update using a realistic matter scenario',
      'Guidelines for attorney review before anything is sent',
    ],
    usefulBecause:
      'This improves the part of the experience clients feel most directly: knowing what happened, what it means, and what comes next.',
  },
  {
    num: '03',
    title: 'Motions Bank / Case Knowledge Library',
    bestFor: 'Past motions, briefs, arguments, research, or case examples that should be easier to reuse.',
    outcome:
      'Belzer Law receives the foundation for a searchable internal reference library built around the firm’s own work.',
    receives: [
      'A searchable internal reference library',
      'Issue categories and matter tags',
      'Reusable argument summaries',
      'Fact-pattern notes',
      'Reusable language candidates',
      'A short recommendation for how the library should grow',
    ],
    usefulBecause:
      'This helps strong prior work become easier to find, reuse, and build from instead of starting from scratch.',
  },
]

const scopeLines = [
  'One selected pilot only',
  'One defined workflow or material set',
  'One concrete outcome for the team to review',
  'No full platform build',
  'No integrations unless separately agreed',
  'Human legal review remains required',
]

const nextSteps = [
  'Choose one of the three pilot options.',
  'Confirm the workflow, sample matter, or material set.',
  'Anchovies creates the selected outcome.',
  'We review the result together and decide whether anything should happen next.',
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
  variant = 'dark',
}: {
  children: string
  href: string
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

function BelzerPilotNav() {
  const [active, setActive] = useState('overview')

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
      <div className="hidden border-b border-[var(--color-rule)] px-10 py-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[11px] w-auto" />
          <span className="h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Belzer Law</span>
        </div>
        <span className="eyebrow text-ink-2">Focused Workflow Pilot · June 2026</span>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/92 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-10">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">×</span>
              Belzer Law
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-[12px] text-ink-2 lg:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <AnchorButton href={choosePilotHref}>Choose a pilot</AnchorButton>
        </div>
      </div>
    </header>
  )
}

function OptionCard({ option }: { option: Option }) {
  return (
    <Reveal className="grid gap-0 border border-[var(--color-rule)] bg-paper lg:grid-cols-[0.92fr_1.08fr]">
      <div className="flex flex-col justify-between gap-10 border-b border-[var(--color-rule)] p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-10">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow text-ink-2">Option {option.num}</span>
            <span className="eyebrow text-ink-2">$4,500</span>
          </div>
          <h3 className="serif text-[36px] leading-[38px] tracking-[-0.018em] md:text-[52px] md:leading-[52px]">
            {option.title}
          </h3>
          <p className="text-[15px] leading-[24px] text-ink-2">{option.bestFor}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <AnchorButton href={choosePilotHref}>Choose this pilot</AnchorButton>
          <AnchorButton href={calendarHref} variant="outline">Talk it through</AnchorButton>
        </div>
      </div>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-[var(--color-rule)] p-6 md:border-b-0 md:border-r md:p-8 lg:p-10">
          <span className="eyebrow text-ink-2">Outcome</span>
          <p className="mt-5 text-[17px] leading-[27px] text-ink">{option.outcome}</p>
          <p className="mt-6 text-[14px] leading-[22px] text-ink-2">{option.usefulBecause}</p>
        </div>
        <div className="p-6 md:p-8 lg:p-10">
          <span className="eyebrow text-ink-2">What you receive</span>
          <div className="mt-5 border-t border-[var(--color-rule)]">
            {option.receives.map((item) => (
              <div key={item} className="border-b border-[var(--color-rule)] py-3 text-[14px] leading-[21px] text-ink">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function BelzerPilotProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Belzer Law - Focused Workflow Pilot'
  }, [])

  return (
    <main className="bg-paper text-ink">
      <BelzerPilotNav />

      <section id="overview" className="border-b border-[var(--color-rule)] px-5 py-12 md:px-10 md:py-16 lg:px-[96px]">
        <MetaRow left="Belzer Law / Focused Workflow Pilot" right="$4,500 · one selected outcome" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <h1 className="display max-w-[900px] text-[52px] leading-[50px] tracking-[-0.025em] md:text-[84px] md:leading-[78px] lg:text-[104px] lg:leading-[96px]">
              One focused pilot. One useful outcome.
            </h1>
          </Reveal>
          <Reveal className="flex max-w-[520px] flex-col gap-6 lg:pb-3">
            <p className="serif text-[25px] leading-[32px] tracking-[-0.01em] md:text-[34px] md:leading-[42px]">
              Choose one practical workflow and receive one concrete outcome.
            </p>
            <p className="text-[15px] leading-[24px] text-ink-2">
              This is a smaller, clearer way to test whether Anchovies can improve a real Belzer Law workflow. No big system. No vague platform commitment. Just one useful result the team can review.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <AnchorButton href="#options">See the three options</AnchorButton>
              <AnchorButton href={calendarHref} variant="outline">Schedule a proposal review</AnchorButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="heard" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Here is what we heard" right="Simple terms" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="display text-[44px] leading-[44px] tracking-[-0.022em] md:text-[72px] md:leading-[70px]">
              Clear outcomes matter more than a bigger idea.
            </h2>
          </Reveal>
          <div className="border-t border-[var(--color-rule)]">
            {heard.map((item, index) => (
              <Reveal key={item} className="grid gap-6 border-b border-[var(--color-rule)] py-6 md:grid-cols-[56px_1fr]">
                <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-[20px] leading-[30px] text-ink">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="proposal" className="border-b border-[var(--color-rule)] bg-ink px-5 py-16 text-paper md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Here is what we propose" right="One pilot · $4,500" dark />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <h2 className="display text-[52px] leading-[52px] tracking-[-0.024em] md:text-[88px] md:leading-[84px]">
              Pick one of three. We deliver the outcome.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[560px] flex-col gap-5">
            <p className="text-[17px] leading-[28px] text-paper/78">
              Belzer Law chooses the workflow. Anchovies turns it into a concrete deliverable. Then we review whether it was useful enough to expand, repeat, or leave as a one-time improvement.
            </p>
            <p className="text-[15px] leading-[24px] text-paper/62">
              The price is the same for each option, so the decision can stay focused on value rather than scope math.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="options" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Choose the first useful win" right="Three options" />
        <div className="mt-10 flex flex-col gap-8">
          {options.map((option) => (
            <OptionCard key={option.title} option={option} />
          ))}
        </div>
      </section>

      <section id="investment" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Investment and boundaries" right="Flat fee pilot" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal className="flex flex-col gap-4">
            <span className="display text-[76px] leading-[76px] tracking-[-0.024em] md:text-[112px] md:leading-[104px]">$4,500</span>
            <span className="eyebrow text-ink-2">Same price for whichever option Belzer chooses</span>
          </Reveal>
          <Reveal className="grid gap-0 border border-[var(--color-rule)] md:grid-cols-2">
            <div className="border-b border-[var(--color-rule)] p-6 md:border-b-0 md:border-r md:p-8">
              <span className="eyebrow text-ink-2">Included boundary</span>
              <div className="mt-5 border-t border-[var(--color-rule)]">
                {scopeLines.map((line) => (
                  <div key={line} className="border-b border-[var(--color-rule)] py-3 text-[14px] leading-[21px]">
                    {line}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 md:p-8">
              <span className="eyebrow text-ink-2">Confidence promise</span>
              <p className="mt-5 text-[17px] leading-[27px]">
                If the selected pilot does not produce a useful agreed deliverable, we will credit the pilot fee toward a revised pilot direction or the next agreed step.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="next" className="bg-ink px-5 py-16 text-paper md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Next step" right="Choose the pilot" dark />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <Reveal className="flex flex-col gap-8">
            <h2 className="display text-[52px] leading-[52px] tracking-[-0.024em] md:text-[88px] md:leading-[84px]">
              Start with the workflow that would help most.
            </h2>
            <div className="flex flex-wrap gap-3">
              <AnchorButton href={choosePilotHref} variant="light">Choose a pilot</AnchorButton>
              <AnchorButton href={calendarHref} variant="light">Schedule a proposal review</AnchorButton>
            </div>
          </Reveal>
          <Reveal className="border-t border-white/20">
            {nextSteps.map((step, index) => (
              <div key={step} className="grid gap-5 border-b border-white/20 py-5 md:grid-cols-[56px_1fr]">
                <span className="eyebrow text-paper/55">{String(index + 1).padStart(2, '0')}</span>
                <span className="serif text-[24px] leading-[32px] tracking-[-0.01em]">{step}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  )
}
