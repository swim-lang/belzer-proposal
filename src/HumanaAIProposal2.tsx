import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://pitch.com/v/humana-ai-qbswaq'

type Phase = {
  num: string
  title: string
  body: string
  goal: string
  includes: string[]
}

const navSections = [
  { id: 'overview', label: 'Foundation' },
  { id: 'heard', label: 'Bigger idea' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'approach', label: 'Approach' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'begin', label: 'Begin' },
]

const movements = [
  [
    'Movement 01',
    'Brand',
    'Strategy, naming, and a visual identity that make the platform feel human, modern, and trustworthy from the first look.',
  ],
  ['Movement 02', 'Site', 'A focused two-page website that explains the belief, the vision, and gives people a clear next step.'],
  [
    'Movement 03',
    'Prototype',
    'A high-fidelity clickable app prototype that makes the product vision real for demos, funders, and partners.',
  ],
  ['Movement 04', 'Social', 'A launch package of about 10 designed posts for the Humana AI platform, built from existing content.'],
]

const pillars = [
  'Human-first learning',
  'Trusted voices',
  'Shared experience',
  'Social discovery',
  'AI-powered access',
  'Creators and community',
  'Focus over everything',
]

const outcomes = [
  [
    'A clearer, more ownable name and direction.',
    'The current working name sits very close to a large existing brand. This phase explores a name, story, and positioning the platform can fully own for the long term.',
  ],
  [
    'A visual identity that feels human and trustworthy.',
    'A modern, optimistic, social identity - flexible enough to carry the website, the app prototype, the launch content, and the future platform.',
  ],
  [
    'A website and prototype that make it real.',
    'A focused two-page site and a high-fidelity clickable prototype that let people see, understand, and believe the product vision before the full build.',
  ],
  [
    'A foundation for the next conversation.',
    'A sharper base for funding, partnership, and development talks, plus a social launch system to show up with clarity from day one.',
  ],
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Strategy, naming, and direction',
    body: "We'll clarify the core idea, audience, tone, positioning, and naming direction: the foundation for the brand, website, prototype, and social content.",
    goal: 'Goal - a clear story and name direction before design begins',
    includes: [
      'Brand positioning',
      'Naming exploration',
      'Recommended name direction',
      'Core messaging',
      'Tone of voice direction',
      'Audience and platform framing',
      'Simple brand narrative',
    ],
  },
  {
    num: '02',
    title: 'Brand identity and visual system',
    body: "Once the name and direction are aligned, we'll create a visual identity that feels modern, human, intelligent, social, and optimistic.",
    goal: 'Goal - an identity flexible enough for the site, prototype, and social',
    includes: [
      'Logo direction',
      'Primary and secondary marks',
      'Color palette',
      'Typography direction',
      'Visual language',
      'Basic graphic system',
      'Social look and feel',
      'Basic brand guide',
    ],
  },
  {
    num: '03',
    title: 'Two-page website',
    body: "We'll design a focused two-page website that explains the platform, introduces the mission, and gives people a clear next step.",
    goal: 'Goal - a credible, simple, future-facing place for the vision',
    includes: [
      'Two-page website design',
      'Desktop design',
      'Mobile design',
      'Website copywriting',
      'Simple call-to-action flow',
      'Implementation or handoff',
    ],
  },
  {
    num: '04',
    title: 'App prototype',
    body: "We'll design the core app experience and build a high-fidelity clickable prototype for demos, funding conversations, and future development planning.",
    goal: 'Goal - make the product vision real, without full app development',
    includes: ['Core product screens', 'Clickable user flow', 'Visual UI direction', 'Prototype link for review', 'Design handoff assets'],
  },
  {
    num: '05',
    title: 'Social launch content',
    body: "We'll create a small launch package for the Humana AI platform, using existing content and the new system: enough to show up with clarity and consistency at launch.",
    goal: 'Goal - a reusable system, not an ongoing management program',
    includes: ['Review of existing content', 'About 10 designed social posts', 'Caption and copy direction', 'Reusable post design system'],
  },
]

const deliverables = [
  ['D / 01', 'Strategy and naming direction', 'Positioning, messaging, and a recommended, more ownable name direction.', 'Strategy'],
  ['D / 02', 'Brand identity system', "A coherent visual identity built around the platform's human-first mission.", 'Brand'],
  ['D / 03', 'Logo and brand marks', 'A primary mark and simplified lockup designed to feel human and intelligent.', 'Brand'],
  ['D / 04', 'Color and typography system', "A palette and type hierarchy that carry the brand's tone across every surface.", 'Brand'],
  ['D / 05', 'Basic brand guide', 'A reference for collaborators across site, prototype, social, and future work.', 'Brand'],
  ['D / 06', 'Two-page website', 'Homepage and vision page, designed responsive for desktop and mobile.', 'Site'],
  ['D / 07', 'Website copy and structure', 'Content direction and copywriting for both pages, ready for handoff or publishing.', 'Site'],
  ['D / 08', 'High-fidelity app prototype', 'A clickable prototype of the core product flow for demos and funding conversations.', 'Prototype'],
  ['D / 09', 'Social launch package', 'About 10 designed posts for the Humana AI platform and a reusable system, built from existing content.', 'Social'],
  ['D / 10', 'Exported assets and handoff', 'Logos, type, screens, and product direction, packaged for future development.', 'Handoff'],
]

const schedule = [
  {
    week: 'Week one',
    title: 'Discover, align, name.',
    days: [
      ['Mo', 'Discovery and alignment'],
      ['Tu', 'Brand positioning'],
      ['We', 'Naming exploration'],
      ['Th', 'Name directions'],
      ['Fr', 'Recommended name'],
    ],
  },
  {
    week: 'Week two',
    title: 'Identity, then website.',
    days: [
      ['Mo', 'Identity design'],
      ['Tu', 'Logo and marks'],
      ['We', 'Color and type'],
      ['Th', 'Website design'],
      ['Fr', 'Website copy'],
    ],
  },
  {
    week: 'Week three',
    title: 'Build, prototype, hand off.',
    days: [
      ['Mo', 'Website build and handoff'],
      ['Tu', 'Prototype screens'],
      ['We', 'Prototype flow'],
      ['Th', 'Social launch posts'],
      ['Th', 'Final brand guide'],
      ['Fr', 'Final presentation and handoff'],
    ],
  },
]

const investmentLines = [
  [
    'Line 01',
    'Brand strategy, naming & identity',
    'Positioning, naming direction, logo, color, typography, visual language, and a basic brand guide.',
    '$2,600',
  ],
  [
    'Line 02',
    'Two-page website',
    'Copy, responsive desktop and mobile design, and launch-ready structure for handoff or publishing.',
    '$1,900',
  ],
  [
    'Line 03',
    'High-fidelity app prototype',
    'A clickable prototype of the core product flow for demos, funding, and development planning.',
    '$1,500',
  ],
  [
    'Line 04',
    'Social launch package',
    'About 10 designed posts for the Humana AI platform, caption direction, and a reusable post system from existing content.',
    '$500',
  ],
]

const exclusions = [
  ['A / 01', 'Full production app development', 'Backend, databases, user accounts, security, hosting, and live functionality are a separate, larger phase.'],
  ['A / 02', 'Trademark and legal clearance', 'Formal trademark clearance should be handled by legal counsel before public launch.'],
  ['A / 03', 'App Store and Google Play submission', 'Store setup, review, and release management are not part of this phase.'],
  ['A / 04', 'Moderation, analytics, and privacy', 'Content moderation systems, analytics, and privacy or legal documentation are out of scope.'],
  ['A / 05', 'Ongoing management', 'Website maintenance, social posting, engagement, and paid advertising are not included.'],
  ['A / 06', 'New photo and video production', 'The social package uses existing content; new production can be scoped separately.'],
  ['A / 07', 'Complex animation and illustration', 'Motion design and custom illustration beyond the agreed brand system are separate.'],
  ['A / 08', 'Extra pages and screens', 'Website pages or app screens beyond the agreed scope can be quoted separately, as can anything above.'],
]

const namingEffects = [
  ['It gives the brand', 'Its own meaning'],
  ['It gives the story', 'Room to grow'],
  ['It gives the team', 'Less brand risk'],
  ['It gives partners', 'A clear anchor'],
  ['It gives funders', 'A brand with a future'],
]

const nextSteps = [
  ['01', 'Focused discovery session', 'A working call to align on vision, audience, funding goals, and the naming direction.'],
  ['02', 'Explore the name', 'Find a more ownable name direction the platform can carry for the long term.'],
  ['03', 'Confirm the two pages', 'Decide which two pages introduce the platform most clearly.'],
  ['04', 'Define the app screens', 'Decide which moments of the future platform are most useful to show.'],
  ['05', 'Begin the production sprint', "A complete foundation for the platform's next stage: designed, built, and ready to share."],
]

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
        : 'bg-ink text-paper hover:bg-mac'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-flex rounded-full px-5 py-3.5 text-[13px] font-medium transition-colors ${classes}`}
    >
      {children}
    </a>
  )
}

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-8 pb-12 lg:pb-16">
      <span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow text-right ${dark ? 'text-paper/60' : 'text-ink-2'}`}>{right}</span>
    </div>
  )
}

function HumanaAIProposal2Nav() {
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
          <span className="eyebrow text-ink-2">Prepared for Humana AI</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Foundational Phase · v1</span>
          <span className="eyebrow">May 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/90 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] tracking-[-0.01em] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">×</span>
              Humana AI
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] text-ink-2 lg:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper">
            Approve Project
          </a>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
      <div className="flex flex-col gap-6 pb-16 md:flex-row md:items-start md:justify-between lg:pb-24">
        <Reveal className="flex flex-col gap-1.5">
          <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
          <span className="eyebrow">Brand · Site · Prototype · Social</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Prepared for Maria Salazar & Diana Popic</span>
          <span className="eyebrow text-ink-2">By Anchovies</span>
        </Reveal>
      </div>

      <Reveal>
        <h1 className="display max-w-[1180px] pb-12 text-[48px] leading-[48px] tracking-[-0.025em] sm:text-[72px] sm:leading-[68px] md:text-[84px] md:leading-[80px] lg:pb-16 lg:text-[104px] lg:leading-[98px] xl:text-[124px] xl:leading-[108px]">
          A human-first foundation for the future of learning.
        </h1>
      </Reveal>

      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[25px] leading-[33px] tracking-[-0.018em] md:text-[30px] md:leading-[38px] lg:text-[36px] lg:leading-[44px]">
            A more ownable brand and name, a two-page website, a high-fidelity app prototype, and a social launch system: designed to make the platform feel real from the very first conversation.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-6 pt-2">
          <p className="text-[15px] leading-[23px] text-ink-2">
            This platform has the kind of idea that needs to feel real quickly. This first phase gives the team a strong foundation to share with partners, funders, collaborators, and early users before the cost of full app development.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <AnchorButton>{'Begin the project ->'}</AnchorButton>
            <AnchorButton href="#approach" variant="outline">
              View the approach
            </AnchorButton>
          </div>
        </Reveal>
      </div>

      <Reveal className="flex flex-col gap-6 border-t border-[var(--color-rule)] pt-12">
        <div className="flex items-center justify-between gap-8">
          <span className="eyebrow text-ink-2">Fig. 01 - What this phase delivers</span>
          <span className="eyebrow text-right text-ink-2">Four movements</span>
        </div>
        <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {movements.map(([label, name, desc], index) => (
            <div
              key={name}
              className={`flex min-h-[220px] flex-col gap-6 border-[var(--color-rule)] p-8 md:p-10 ${
                index < movements.length - 1 ? 'border-b xl:border-b-0 xl:border-r' : ''
              } ${index % 2 === 0 ? 'md:border-r xl:border-r' : ''}`}
            >
              <span className="eyebrow text-ink-2">{label}</span>
              <span className="serif text-[36px] leading-[40px] tracking-[-0.02em] md:text-[44px] md:leading-[48px]">{name}</span>
              <span className="text-[13px] leading-[20px] text-ink-2">{desc}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function BiggerIdea() {
  return (
    <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 02 - The bigger idea" right="A human-first platform" />
      <div className="flex flex-col gap-10 pb-16 min-[1400px]:flex-row min-[1400px]:items-start min-[1400px]:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[760px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            A human-first
            <br />
            learning platform,
            <br />
            not another
            <br />
            AI education tool.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>This project is about giving the platform a stronger, more ownable foundation: built on shared experience, trusted voices, social discovery, and AI-powered access.</p>
          <p className="text-ink-2">People already learn from podcasts, short-form video, long-form conversations, creators, and communities they trust. The experience should reflect the way people are already learning today.</p>
          <p className="text-ink-2">The goal is a brand and product vision that gives the team something tangible to share with partners, funders, collaborators, and early users.</p>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-8">
        <div className="flex items-center justify-between gap-8 pb-8">
          <span className="eyebrow text-ink-2">Fig. 02 - What the brand carries</span>
          <span className="eyebrow text-right text-ink-2">Seven ideas, one identity</span>
        </div>
        <div className="grid border-t border-[var(--color-rule)] md:grid-cols-2">
          {pillars.map((pillar, index) => (
            <div
              key={pillar}
              className={`flex items-baseline gap-6 border-[rgba(31,25,18,0.2)] py-8 md:px-8 ${
                index < pillars.length - 1 ? 'border-b' : ''
              } ${index % 2 === 0 ? 'md:border-r md:pl-0' : ''} ${index === pillars.length - 1 ? 'md:col-span-2' : ''}`}
            >
              <span className="eyebrow w-12 shrink-0 text-ink-2">{String(index + 1).padStart(2, '0')}</span>
              <span className="serif text-[26px] leading-[34px] tracking-[-0.014em] md:text-[28px] md:leading-[36px]">{pillar}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Outcomes() {
  return (
    <section id="outcomes" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 03 - What this phase creates" right="Four outcomes" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Clarify the idea.
            <br />
            Then make it real.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">Four outcomes shape this phase: each one helping the team sharpen the idea, make it feel real, and set up the funding, partnership, and development conversations to come.</p>
        </Reveal>
      </div>
      {outcomes.map(([title, body], index) => (
        <Reveal key={title} className="flex flex-col gap-6 border-t border-[var(--color-rule)] py-10 md:grid md:grid-cols-[80px_1.2fr_1fr] md:gap-16 lg:py-14">
          <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')} / 04</span>
          <h3 className="serif max-w-[560px] text-[32px] leading-[36px] tracking-[-0.018em] md:text-[44px] md:leading-[48px]">{title}</h3>
          <p className="max-w-[460px] pt-1 text-[15px] leading-[24px] text-ink-2">{body}</p>
        </Reveal>
      ))}
    </section>
  )
}

function DarkQuote() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-40">
      <MetaRow left="§ 04 - The belief" right="A simple truth" dark />
      <div className="flex flex-col gap-12 border-t border-paper/20 pt-14 lg:flex-row lg:items-start lg:gap-20 lg:pt-16">
        <Reveal className="flex-[1.4]">
          <blockquote className="serif max-w-[920px] text-[42px] italic leading-[48px] tracking-[-0.02em] md:text-[68px] md:leading-[74px] lg:text-[88px] lg:leading-[92px]">
            "People learn best from people. Technology should amplify that, not replace it."
          </blockquote>
        </Reveal>
        <Reveal className="flex max-w-[360px] flex-col gap-6 pt-2 text-[15px] leading-[24px] text-paper/70 lg:pt-12">
          <p>This is the belief underneath the platform. AI can organize knowledge, personalize learning, and help people create material faster, but the human layer is what makes it matter.</p>
          <p>This phase gives that belief its first clear form: a brand, a name, and a product vision people can actually feel.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 05 - Our approach" right="Five phases · Four to six weeks" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Our
            <br />
            approach.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">Five phases that move from strategy and naming into a finished, shareable foundation.</p>
        </Reveal>
      </div>
      {phases.map((phase) => (
        <Reveal key={phase.num} className="flex flex-col gap-8 border-t border-[var(--color-rule)] py-12 md:grid md:grid-cols-[120px_1.4fr_1fr] md:gap-12 lg:gap-16 lg:py-16">
          <div>
            <span className="serif block text-[56px] leading-[56px] tracking-[-0.02em] text-ink md:text-[60px] md:leading-[60px]">{phase.num}</span>
            <span className="eyebrow mt-4 block text-ink-2">Phase</span>
          </div>
          <div className="max-w-[600px]">
            <h3 className="serif pb-5 text-[32px] leading-[38px] tracking-[-0.018em] md:text-[36px] md:leading-[42px]">{phase.title}</h3>
            <p className="pb-6 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
            <span className="inline-flex rounded-full bg-ink/5 px-4 py-2.5 text-[12px] font-medium">{phase.goal}</span>
          </div>
          <div className="max-w-[360px] pt-1">
            <span className="eyebrow mb-4 block text-ink-2">Includes</span>
            <div className="flex flex-col gap-2.5">
              {phase.includes.map((item) => (
                <div key={item} className="flex items-baseline gap-3">
                  <span className="h-px w-2.5 shrink-0 translate-y-[-4px] bg-ink" />
                  <span className="text-[13px] leading-[20px]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  )
}

function Deliverables() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 06 - Final deliverables" right="Ten outputs" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            What you
            <br />
            walk away with.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">A complete foundation for the platform's first stage: the name, the brand, the site, the prototype, and the social launch.</p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {deliverables.map(([label, title, body, category]) => (
          <Reveal key={label} className="grid gap-4 border-b border-[rgba(31,25,18,0.2)] py-7 md:grid-cols-[72px_1fr_1fr_96px] md:items-center md:gap-8">
            <span className="eyebrow text-ink-2">{label}</span>
            <h3 className="serif text-[24px] leading-[32px] tracking-[-0.014em]">{title}</h3>
            <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
            <span className="eyebrow hidden text-right text-ink-2 md:block">{category}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 07 - Timeline" right="Estimated · Four to six weeks" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Four to six weeks,
            <br />
            start to handoff.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">A focused engagement designed to move quickly without rushing the thinking: roughly three weeks of production across a four-to-six-week window, depending on feedback and naming approval.</p>
        </Reveal>
      </div>
      <div className="grid border-y border-[var(--color-rule)] lg:grid-cols-3">
        {schedule.map((week, weekIndex) => (
          <Reveal key={week.week} className={`flex flex-col gap-10 p-8 md:p-10 ${weekIndex < schedule.length - 1 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''}`}>
            <div className="flex items-baseline gap-6 border-b border-[rgba(31,25,18,0.2)] pb-4">
              <span className="serif text-[76px] leading-[76px] tracking-[-0.024em] md:text-[88px] md:leading-[88px]">{weekIndex + 1}</span>
              <div className="flex flex-col gap-2 pb-3">
                <span className="eyebrow text-ink-2">{week.week}</span>
                <h3 className="serif text-[28px] leading-[34px] tracking-[-0.018em]">{week.title}</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {week.days.map(([day, task], index) => (
                <div key={`${week.week}-${day}-${task}-${index}`} className="flex items-baseline gap-5">
                  <span className="eyebrow w-8 shrink-0 text-ink-2">{day}</span>
                  <span className="text-[15px] leading-[22px]">{task}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 08 - Investment" right="Itemized · One total" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.4]">
          <h2 className="display text-[72px] leading-[72px] tracking-[-0.025em] sm:text-[112px] sm:leading-[106px] lg:text-[160px] lg:leading-[152px]">$6,500</h2>
          <span className="eyebrow mt-6 block text-ink-2">Total · Full scope · Four to six weeks</span>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>A focused investment in the foundation the platform needs first: name, brand, website, prototype, and social launch.</p>
          <p className="text-ink-2">A lean build for the strategy, design, website, prototype, and social work included: a strong, presentable foundation before the cost of full app development.</p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {investmentLines.map(([label, title, body, price]) => (
          <Reveal key={label} className="grid gap-4 border-b border-[rgba(31,25,18,0.2)] py-10 md:grid-cols-[80px_1fr_200px] md:gap-12">
            <span className="eyebrow pt-1 text-ink-2">{label}</span>
            <div>
              <h3 className="serif pb-3 text-[32px] leading-[38px] tracking-[-0.018em] md:text-[36px] md:leading-[42px]">{title}</h3>
              <p className="max-w-[520px] text-[13px] leading-[20px] text-ink-2">{body}</p>
            </div>
            <span className="serif text-[40px] leading-[44px] tracking-[-0.018em] md:text-right md:text-[44px]">{price}</span>
          </Reveal>
        ))}
        <Reveal className="grid gap-4 py-8 md:grid-cols-[80px_1fr_200px] md:items-center md:gap-12">
          <span className="eyebrow text-ink-2">Total</span>
          <span className="serif text-[32px] leading-[38px] tracking-[-0.018em] md:text-[36px] md:leading-[42px]">Four lines · 75% to begin, 25% before final handoff</span>
          <span className="serif text-[48px] leading-[52px] tracking-[-0.02em] md:text-right md:text-[56px]">$6,500</span>
        </Reveal>
      </div>
    </section>
  )
}

function Exclusions() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 09 - What's not included" right="Eight exclusions" />
      <Reveal>
        <h2 className="display max-w-[1100px] pb-16 text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:pb-20 lg:text-[88px] lg:leading-[84px]">
          What this phase does not include.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {exclusions.map(([label, title, body]) => (
          <Reveal key={label} className="grid gap-4 border-b border-[rgba(31,25,18,0.2)] py-7 md:grid-cols-[72px_1fr_1fr] md:items-center md:gap-8">
            <span className="eyebrow text-ink-2">{label}</span>
            <h3 className="serif text-[28px] leading-[34px] tracking-[-0.014em] md:text-[32px] md:leading-[38px]">{title}</h3>
            <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function NamingDirection() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 10 - Naming direction" right="A more ownable name" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="serif max-w-[760px] text-[38px] leading-[44px] tracking-[-0.02em] md:text-[56px] md:leading-[62px] lg:text-[64px] lg:leading-[68px]">
            The current working name sits very close to a large existing brand. This phase gives the platform a name, story, and identity it can fully own.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>Naming work includes creative exploration, strategic direction, and clear recommendations: aimed at a name with its own meaning and long-term potential, not just a safer one.</p>
          <p className="text-ink-2">Formal trademark clearance should be handled by legal counsel before public launch. If the team keeps its current AI partner, that can stay part of the path as a white-label layer connected to the larger brand.</p>
        </Reveal>
      </div>
      <Reveal className="grid border-t border-[var(--color-rule)] md:grid-cols-5">
        {namingEffects.map(([label, title], index) => (
          <div key={label} className={`py-8 md:px-8 ${index < namingEffects.length - 1 ? 'border-b border-[rgba(31,25,18,0.2)] md:border-b-0 md:border-r' : ''}`}>
            <span className="eyebrow block pb-3 text-ink-2">{label}</span>
            <h3 className="serif text-[28px] leading-[32px] tracking-[-0.014em]">{title}</h3>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function FutureDevelopment() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 11 - Future development" right="After the prototype" />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="serif max-w-[760px] text-[38px] leading-[44px] tracking-[-0.02em] md:text-[56px] md:leading-[62px]">
            After the prototype is complete, the team will have a much clearer picture of what the full product could become.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>The prototype gives any future team a stronger starting point than a loose concept: the user experience, core screens, product flow, brand system, and intended interaction model.</p>
          <p className="text-ink-2">That means the next phase can be scoped with more clarity and fewer unknowns. The team can raise support, gather feedback, align partners, and decide how far to take it.</p>
        </Reveal>
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section id="begin" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 12 - Next step" right="If this feels aligned" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            A simple way
            <br />
            to begin.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">If this direction feels aligned, we begin with a focused discovery session, then move quickly into naming, brand, site, prototype, and social.</p>
        </Reveal>
      </div>
      <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-5">
        {nextSteps.map(([num, title, body], index) => (
          <Reveal key={num} className={`flex min-h-[220px] flex-col gap-5 p-8 ${index < nextSteps.length - 1 ? 'border-b border-[var(--color-rule)] xl:border-b-0 xl:border-r' : ''} ${index % 2 === 0 ? 'md:border-r xl:border-r' : ''}`}>
            <span className="serif text-[56px] leading-[56px] tracking-[-0.02em]">{num}</span>
            <span className="eyebrow text-ink-2">Step</span>
            <h3 className="serif text-[26px] leading-[32px] tracking-[-0.014em]">{title}</h3>
            <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-40">
      <MetaRow left="§ 13 - In closing" right="Where it leads" dark />
      <Reveal className="border-t border-paper/20 pt-16 lg:pt-20">
        <h2 className="display max-w-[1200px] text-[46px] leading-[50px] tracking-[-0.025em] md:text-[74px] md:leading-[76px] lg:text-[104px] lg:leading-[100px] xl:text-[124px] xl:leading-[116px]">
          Make the human way of learning impossible to ignore.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 pt-12 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="max-w-[520px] flex-1">
          <p className="text-[15px] leading-[24px] text-paper/70">In four to six weeks, the platform moves from idea to identity: a name, a brand, a website, a prototype, and a social launch ready to share.</p>
        </Reveal>
        <Reveal className="flex max-w-[380px] flex-col gap-4">
          <span className="eyebrow text-paper/60">Begin</span>
          <AnchorButton variant="light">{'Begin the discovery ->'}</AnchorButton>
          <span className="pt-2 text-[13px] leading-[20px] text-paper/60">$6,500 · Four to six weeks · Full scope</span>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-6 border-t border-[var(--color-rule)] px-6 py-8 md:flex-row md:items-center md:justify-between md:px-16">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
        <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="eyebrow text-ink-2">Brand · Interface · AI</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <a href={workHref} target="_blank" rel="noreferrer" className="eyebrow text-ink-2 transition-colors hover:text-ink">
          Selected work -&gt;
        </a>
        <span className="eyebrow text-ink-2">anchovies.studio</span>
        <span className="hidden h-[10px] w-px bg-[var(--color-rule)] md:block" />
        <span className="eyebrow">Proposal · v1 · May 2026</span>
      </div>
    </footer>
  )
}

export function HumanaAIProposal2() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies x Humana AI - Proposal 2'
    }
  }, [])

  return (
    <main className="min-h-screen bg-paper text-ink">
      <HumanaAIProposal2Nav />
      <Hero />
      <BiggerIdea />
      <Outcomes />
      <DarkQuote />
      <Approach />
      <Deliverables />
      <Timeline />
      <Investment />
      <Exclusions />
      <NamingDirection />
      <FutureDevelopment />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
