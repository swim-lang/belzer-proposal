import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'pilot', label: 'The Pilot' },
  { id: 'day', label: 'How It Works' },
  { id: 'value', label: 'Value' },
  { id: 'investment', label: 'Investment' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'next', label: 'Next Step' },
]

const heard = [
  {
    title: 'The firm needs one shared view.',
    body: 'Tasks, dates, client questions, contacts, matter details, and files are spread across email, calendars, software, and conversations. The first step is bringing the most useful information together so the team can see what is happening without checking every system separately.',
  },
  {
    title: 'Agents need connected context.',
    body: 'An agent cannot reliably help with a task unless it understands the people, matter, files, dates, roles, and firm process around that task. The workspace begins creating that shared context so spoken or typed instructions can produce more useful work.',
  },
  {
    title: 'The workspace can become more capable over time.',
    body: 'Gmail, Box, calendars, and PracticePanther can remain in place while the first workspace is built. As the firm sees what is useful, selected workflows can be connected more deeply or moved into the private system instead of remaining spread across third-party tools.',
  },
]

const pilotFeatures = [
  'Private, self-hosted firm workspace configured for Belzer Law',
  'One shared view of active matters, tasks, priorities, owners, dates, and items requiring review',
  'Firm contacts and matter relationships connected to the relevant tasks, communications, dates, and files',
  'Selected email and calendar information brought into the workspace where access permits',
  'Connections or direct links to Box, PracticePanther, and other approved tools based on available integration methods',
  'Central firm memory for processes, templates, roles, decisions, recurring instructions, and approved matter context',
  'Voice or chat instructions converted into proposed tasks, assignments, follow-ups, and draft communications',
  'Email triage, action extraction, and reply drafts prepared with connected firm context and human review',
  'A review queue for agent-prepared work before it changes a calendar, sends a message, or creates an external action',
  'Deadline suggestions prepared from triggering dates and firm-approved rules, with the source and calculation visible',
  'Britt or attorney approval required before any suggested deadline is added to a calendar',
  'A foundation for gradually bringing selected third-party workflows into the private workspace',
  'Workflow observation, configuration, team onboarding, and practical handoff',
]

const pilotOutcomes = [
  'The team can see active work, contacts, matter context, ownership, dates, and items awaiting review in one place.',
  'Agents can use connected firm context when preparing tasks, assignments, follow-ups, and drafts for approval.',
  'The firm begins building central memory that becomes more useful as approved knowledge and workflows are added.',
  'Selected functions can gradually move out of third-party tools and into a system the firm controls.',
]

const boundaries = [
  'No email, client communication, or external action is sent without human approval.',
  'No legal deadline is published to a calendar without Britt or attorney review and approval.',
  'The pilot does not provide legal advice, autonomous legal analysis, or legal research.',
  'Box, PracticePanther, Gmail, and existing calendars remain the systems of record unless separately agreed.',
  'The pilot does not replace the firm’s complete case-management, document-management, billing, or docketing systems.',
  'When a third-party tool cannot support a practical direct connection, the workspace will link to it and organize the task that must be completed there.',
  'A client-facing app, motions bank, large document-review engine, and deeper integrations can be considered after the pilot proves what is useful.',
  'Connections to existing tools are limited to the access and integration methods confirmed during technical setup.',
]

const daySteps = [
  {
    label: 'Shared view',
    title: 'See the work and its context together.',
    body: 'The team sees active matters, contacts, tasks, owners, dates, selected email and calendar items, supporting files, and work waiting for review in one workspace.',
  },
  {
    label: 'Connected context',
    title: 'Give agents enough information to help.',
    body: 'The workspace connects an instruction to the relevant people, matter, files, dates, roles, templates, and firm process before an agent prepares work.',
  },
  {
    label: 'Agent assistance',
    title: 'Turn spoken or typed direction into proposed work.',
    body: 'Aaron or Britt can describe what needs to happen. An agent uses the connected context to prepare tasks, proposed owners, follow-ups, calendar items, and draft communications for human review.',
  },
  {
    label: 'Expansion over time',
    title: 'Connect current tools, then replace selected functions when useful.',
    body: 'The workspace can first organize a task and direct the team or an approved agent to the correct application. Later, selected workflows can be brought directly into the private system when access, risk, and value support it.',
  },
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
        <span className="eyebrow text-ink-2">Firm Workflow Pilot · July 2026</span>
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

export function BelzerSystemsProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Belzer Law - Firm Workflow Pilot'
  }, [])

  return (
    <main className="belzer-systems-proposal bg-paper text-ink">
      <ProposalNav />

      <section id="overview" className="border-b border-[var(--color-rule)] px-5 py-12 md:px-10 md:py-16 lg:px-[96px]">
        <MetaRow left="Belzer Law / Firm Workflow Pilot" right="$7,900 · Approximately six weeks" />
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <Reveal>
            <h1 className="display max-w-[920px] text-[54px] leading-[54px] md:text-[86px] md:leading-[84px] lg:text-[108px] lg:leading-[102px]">
              A private workspace that connects the firm’s work and context.
            </h1>
          </Reveal>
          <Reveal className="flex max-w-[570px] flex-col gap-6 lg:pb-3">
            <p className="serif text-[26px] leading-[34px] md:text-[35px] md:leading-[43px]">
              See the work in one place. Give agents the context to help with it.
            </p>
            <p className="text-[15px] leading-[24px] text-ink-2">
              We will bring selected information from email, calendars, contacts, matters, files, and approved firm knowledge into one secure workspace. That connected context allows an agent to turn spoken or typed instructions into proposed tasks, follow-ups, drafts, and other work for review. As the system proves useful, selected workflows now handled in third-party tools can be brought into it.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <AnchorButton href={calendarHref}>Schedule a proposal review</AnchorButton>
              <AnchorButton href="#pilot" variant="outline">See the pilot</AnchorButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="heard" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="What we heard" right="The opportunity in simple terms" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal>
            <h2 className="display text-[46px] leading-[48px] md:text-[74px] md:leading-[74px]">
              Build shared firm context before asking agents to do more.
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

      <section id="pilot" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="The pilot" right="One focused internal system" />
        <div className="mt-10 grid border border-[var(--color-rule)] lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="flex flex-col justify-between gap-12 border-b border-[var(--color-rule)] p-6 md:p-9 lg:border-b-0 lg:border-r lg:p-11">
            <div>
              <span className="eyebrow text-ink-2">Belzer Firm Workflow Pilot</span>
              <h2 className="display mt-8 text-[52px] leading-[52px] md:text-[72px] md:leading-[70px]">
                A private firm workspace with shared context for people and agents.
              </h2>
              <p className="mt-8 text-[18px] leading-[29px]">
                The first release brings active work and its supporting context into one view. It connects to approved tools where practical, links to the correct third-party system when needed, and begins building central firm memory that agents can use when preparing work.
              </p>
            </div>
            <div className="border-t border-[var(--color-rule)] pt-7">
              <span className="display block text-[64px] leading-none">$7,900</span>
              <span className="eyebrow mt-3 block text-ink-2">Approximately six weeks</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2">
            <div className="border-b border-[var(--color-rule)] p-6 md:border-b-0 md:border-r md:p-9 lg:p-11">
              <span className="eyebrow text-ink-2">What Belzer receives</span>
              <div className="mt-6 border-t border-[var(--color-rule)]">
                {pilotFeatures.map((feature) => (
                  <div key={feature} className="border-b border-[var(--color-rule)] py-3 text-[14px] leading-[21px]">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 md:p-9 lg:p-11">
              <span className="eyebrow text-ink-2">Expected outcome</span>
              <div className="mt-6 space-y-5">
                {pilotOutcomes.map((outcome, index) => (
                  <div key={outcome} className="grid grid-cols-[28px_1fr] gap-3">
                    <span className="eyebrow pt-1 text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-[16px] leading-[25px]">{outcome}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 border-t border-[var(--color-rule)] pt-7">
                <span className="eyebrow text-ink-2">Early visibility</span>
                <p className="mt-4 text-[17px] leading-[27px]">
                  A first working version will be presented within 7 to 10 business days so the team can respond to something real while the broader pilot continues.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="day" className="border-b border-[var(--color-rule)] bg-ink px-5 py-16 text-paper md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="How the first release works" right="Four concrete workflows" dark />
        <div className="mt-12 grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
          <Reveal>
            <h2 className="display text-[52px] leading-[54px] md:text-[82px] md:leading-[82px]">
              What the team can do in the first release.
            </h2>
          </Reveal>
          <div className="border-t border-white/25">
            {daySteps.map((step, index) => (
              <Reveal key={step.title} className="grid gap-5 border-b border-white/25 py-7 md:grid-cols-[54px_0.75fr_1.25fr]">
                <span className="eyebrow text-paper/50">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <span className="eyebrow text-paper/50">{step.label}</span>
                  <h3 className="serif mt-3 text-[25px] leading-[31px]">{step.title}</h3>
                </div>
                <p className="text-[15px] leading-[24px] text-paper/70">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="value" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="A simple value illustration" right="Transparent break-even math" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <Reveal>
            <h2 className="display text-[52px] leading-[54px] md:text-[84px] md:leading-[84px]">
              Saving about twenty attorney hours covers the investment.
            </h2>
          </Reveal>
          <Reveal className="grid border border-[var(--color-rule)] md:grid-cols-[0.85fr_1.15fr]">
            <div className="border-b border-[var(--color-rule)] bg-mac p-7 text-white md:border-b-0 md:border-r md:p-9">
              <span className="eyebrow text-white/60">Break-even illustration</span>
              <span className="display mt-8 block text-[72px] leading-none">Under 20 hours</span>
              <p className="mt-5 text-[15px] leading-[24px] text-white/75">$7,900 divided by an illustrative $400 attorney hour is 19.75 hours.</p>
            </div>
            <div className="flex flex-col justify-between gap-8 p-7 md:p-9">
              <p className="serif text-[27px] leading-[35px]">
                Recovering approximately twenty hours across the firm covers the initial investment.
              </p>
              <p className="text-[13px] leading-[21px] text-ink-2">
                This is transparent break-even math, not a guaranteed savings claim. Actual value depends on adoption, usage, matter volume, and the time the workspace recovers across the firm.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="investment" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Investment and delivery" right="One clear first release" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <span className="eyebrow text-ink-2">Total investment</span>
            <span className="display mt-7 block text-[78px] leading-none">$7,900</span>
            <p className="mt-5 max-w-[420px] text-[16px] leading-[26px] text-ink-2">
              Approximately six weeks, with the first working version presented within 7 to 10 business days.
            </p>
          </Reveal>
          <Reveal className="border-t border-[var(--color-rule)]">
            {[
              ['60%', 'At kickoff', '$4,740'],
              ['20%', 'After approval of the first working version and core workflow', '$1,580'],
              ['20%', 'At team onboarding and pilot launch', '$1,580'],
            ].map(([percent, milestone, amount]) => (
              <div key={milestone} className="grid gap-3 border-b border-[var(--color-rule)] py-6 sm:grid-cols-[72px_1fr_auto] sm:items-center sm:gap-6">
                <span className="display text-[32px] leading-none">{percent}</span>
                <span className="text-[15px] leading-[22px]">{milestone}</span>
                <span className="eyebrow text-ink-2 sm:text-right">{amount}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-10 grid border border-[var(--color-rule)] md:grid-cols-3">
          {[
            ['Observation', 'A focused working session to see where communication, ownership, dates, and files currently create friction.'],
            ['Feedback', 'Two structured feedback rounds are included while the first release takes shape.'],
            ['Stabilization', 'A 30-day stabilization period covers bugs and small launch adjustments.'],
          ].map(([title, body], index) => (
            <div key={title} className={`p-6 md:p-8 ${index < 2 ? 'border-b border-[var(--color-rule)] md:border-b-0 md:border-r' : ''}`}>
              <span className="eyebrow text-ink-2">{title}</span>
              <p className="mt-4 text-[16px] leading-[25px]">{body}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section id="boundaries" className="border-b border-[var(--color-rule)] px-5 py-16 md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Boundaries" right="What keeps the pilot useful" />
        <div className="mt-10 grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <Reveal>
            <h2 className="display text-[46px] leading-[48px] md:text-[72px] md:leading-[72px]">
              What the first release includes and excludes.
            </h2>
          </Reveal>
          <div className="border-t border-[var(--color-rule)]">
            {boundaries.map((boundary, index) => (
              <Reveal key={boundary} className="grid gap-5 border-b border-[var(--color-rule)] py-6 sm:grid-cols-[52px_1fr]">
                <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-[17px] leading-[27px]">{boundary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="next" className="bg-ink px-5 py-16 text-paper md:px-10 md:py-20 lg:px-[96px]">
        <MetaRow left="Next step" right="One decision" dark />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
          <Reveal>
            <h2 className="display text-[52px] leading-[54px] md:text-[88px] md:leading-[86px]">
              Confirm the first workflows and begin the pilot.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[520px] flex-col gap-6">
            <p className="text-[17px] leading-[28px] text-paper/72">
              We will review the pilot with Aaron and Britt together, confirm the first workflows, and begin with an observation session focused on the work that consumes the most time today.
            </p>
            <div className="flex flex-wrap gap-3">
              <AnchorButton href={calendarHref}>Schedule a proposal review</AnchorButton>
              <AnchorButton href="#pilot" variant="light">Review the pilot</AnchorButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
