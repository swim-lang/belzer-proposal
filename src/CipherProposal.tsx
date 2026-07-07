import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

type Pillar = {
  label: string
  title: string
  body: string
}

type Cue = {
  num: string
  title: string
  body: string
}

type Priority = {
  num: string
  title: string
  body: string
}

type Phase = {
  num: string
  title: string
  body: string
  recommended?: string[]
  includes: string[]
}

type DeliverableGroup = {
  title: string
  items: string[]
}

type TimelineStep = {
  num: string
  when: string
  title: string
  items: string[]
}

type InvestmentLine = {
  num: string
  phase: string
  summary: string
  amount: string
}

type PaymentMilestone = {
  amount: string
  title: string
  body: string
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'direction', label: 'Direction' },
  { id: 'priorities', label: 'Priorities' },
  { id: 'scope', label: 'Scope' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
]

const pillars: Pillar[] = [
  {
    label: 'Pillar 01',
    title: 'Strategy',
    body: 'A clear position, audience understanding, and creative direction for the brand.',
  },
  {
    label: 'Pillar 02',
    title: 'Messaging',
    body: 'Simple, confident language for a complex offering.',
  },
  {
    label: 'Pillar 03',
    title: 'Visual identity',
    body: 'A sleek, digital-first system built around precision, intelligence, and control.',
  },
  {
    label: 'Pillar 04',
    title: 'Website',
    body: 'A focused website that introduces Cipher, builds trust, and creates the right conversations.',
  },
]

const pillarBorderClasses = [
  'border-b md:border-r xl:border-b-0',
  'border-b md:border-r-0 xl:border-r xl:border-b-0',
  'border-b md:border-r md:border-b-0 xl:border-b-0',
  'md:border-b-0',
]

const cues: Cue[] = [
  {
    num: '01',
    title: 'Precision',
    body: 'Sharp layouts, controlled spacing, clean hierarchy, and a visual system that feels deliberate.',
  },
  {
    num: '02',
    title: 'Mystery',
    body: 'A sense that there is something beneath the surface: coded systems, hidden logic, abstract structures, and subtle reveals.',
  },
  {
    num: '03',
    title: 'Control',
    body: 'The brand should communicate command of a complex environment.',
  },
  {
    num: '04',
    title: 'Premium technology',
    body: 'Black, graphite, silver, muted metallics, restrained contrast, subtle motion, and digital details that feel expensive.',
  },
]

const priorities: Priority[] = [
  {
    num: '01',
    title: 'Make the complex feel simple.',
    body: 'Cipher works inside a complicated media ecosystem. The brand needs to make that complexity feel understandable without flattening the intelligence behind it.',
  },
  {
    num: '02',
    title: 'Communicate transparency and control.',
    body: 'The category has a trust problem around pricing, optimization, reporting, and service quality. Cipher should feel like the antidote.',
  },
  {
    num: '03',
    title: 'Look more premium than the category.',
    body: 'The brand should not blend into generic political, media, or SaaS aesthetics.',
  },
  {
    num: '04',
    title: 'Create curiosity without over-explaining.',
    body: 'The website does not need to function like a manual. It should provoke interest, establish credibility, and move the right people toward a conversation.',
  },
  {
    num: '05',
    title: 'Demonstrate technical sophistication.',
    body: 'Because Cipher works in digital media, the website has an opportunity to show intelligence through experience, not just copy.',
  },
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery and direction',
    body: 'We begin by understanding the business, audience, offering, competitive environment, and the larger point of view behind Cipher.',
    includes: [
      'Founder discovery',
      'Business and audience review',
      'Competitive and category review',
      'Positioning opportunities',
      'Brand personality and tone',
      'Website goals',
      'Creative direction moodboards',
    ],
  },
  {
    num: '02',
    title: 'Messaging',
    body: 'We clarify how Cipher introduces itself, explains its value, and turns a complex service into language that can be remembered and used.',
    includes: [
      'Core positioning',
      'Brand idea',
      'Audience and value proposition',
      'Personality and tone',
      'Short elevator pitch',
      'Homepage messaging direction',
      'Service and capability language',
      'Key messaging hierarchy',
    ],
  },
  {
    num: '03',
    title: 'Visual identity',
    body: 'Cipher needs a visual identity that feels premium, intelligent, and digital-first. The system should be simple enough to use consistently, but distinctive enough to stand apart.',
    includes: [
      'Primary logo or wordmark',
      'Secondary logo configuration',
      'Supporting mark or symbol',
      'Typography system',
      'Color system',
      'Graphic and layout language',
      'Digital texture or coded visual language',
      'Social avatar and profile assets',
      'Business card',
      'Pitch deck cover concept',
      'Light brand guidelines',
      'Final identity files',
    ],
  },
  {
    num: '04',
    title: 'Website design and build',
    body: 'We bring the brand to life through a focused, polished, responsive website designed to create curiosity, communicate credibility, and convert the right visitors into conversations.',
    recommended: ['Home', 'Solutions', 'Outcomes', 'About', 'Contact'],
    includes: [
      'Website strategy and architecture',
      'Sitemap',
      'Website copywriting',
      'Homepage design',
      'Solutions page design',
      'Outcomes page design',
      'About page design',
      'Contact page design',
      'Responsive desktop and mobile design',
      'Framer development',
      'Contact or inquiry experience',
      'Basic metadata and on-page SEO',
      'Brand implementation',
      'Launch QA',
      'Launch support',
    ],
  },
]

const deliverableGroups: DeliverableGroup[] = [
  {
    title: 'Strategy and messaging · 01-10',
    items: [
      'Discovery summary',
      'Competitive observations',
      'Audience and client considerations',
      'Positioning direction',
      'Brand personality and tone',
      'Creative direction moodboards',
      'Core messaging',
      'Short elevator pitch',
      'Homepage messaging direction',
      'Service and capability language',
    ],
  },
  {
    title: 'Visual identity · 11-21',
    items: [
      'Primary logo or wordmark',
      'Secondary logo configuration',
      'Supporting mark or symbol',
      'Typography system',
      'Color system',
      'Graphic and layout language',
      'Social avatar and profile assets',
      'Business card',
      'Pitch deck cover concept',
      'Light brand guidelines',
      'Final identity files',
    ],
  },
  {
    title: 'Website · 22-29',
    items: [
      'Sitemap',
      'Website copy',
      'Homepage design',
      'Solutions page design',
      'Outcomes page design',
      'About page design',
      'Contact page design',
      'Responsive Framer website with launch QA',
    ],
  },
]

const timeline: TimelineStep[] = [
  {
    num: '01',
    when: 'Week 1',
    title: 'Discovery and direction',
    items: ['Founder discovery', 'Market review', 'Positioning', 'Website goals', 'Creative direction'],
  },
  {
    num: '02',
    when: 'Week 2',
    title: 'Messaging and identity exploration',
    items: ['Brand idea', 'Messaging', 'Logo exploration', 'Visual system direction'],
  },
  {
    num: '03',
    when: 'Week 3',
    title: 'Identity refinement and website design',
    items: ['Identity refinement', 'Applications', 'Website copy', 'Homepage and page design'],
  },
  {
    num: '04',
    when: 'Week 4',
    title: 'Website build and handoff',
    items: ['Framer development', 'Responsive QA', 'Final refinements', 'Launch-ready handoff'],
  },
]

const investmentLines: InvestmentLine[] = [
  {
    num: '01',
    phase: 'Strategy + messaging',
    summary: 'Discovery, positioning, messaging, creative direction, and website strategy.',
    amount: '$2,500',
  },
  {
    num: '02',
    phase: 'Visual identity',
    summary: 'Logo, visual system, applications, digital-first assets, and light brand guide.',
    amount: '$5,400',
  },
  {
    num: '03',
    phase: 'Website design',
    summary: 'Sitemap, copywriting, five page designs, and responsive design.',
    amount: '$3,500',
  },
  {
    num: '04',
    phase: 'Website build + launch',
    summary: 'Framer development, QA, launch support, and final handoff.',
    amount: '$4,500',
  },
]

const paymentMilestones: PaymentMilestone[] = [
  {
    amount: '50%',
    title: 'Due at kickoff',
    body: '$7,950 reserves the project window and begins discovery.',
  },
  {
    amount: '25%',
    title: 'After identity presentation',
    body: '$3,975 is due after the primary identity direction has been presented.',
  },
  {
    amount: '25%',
    title: 'At final handoff',
    body: '$3,975 is due before delivery of final files, website transfer, and launch handoff.',
  },
]

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow sm:text-right ${dark ? 'text-paper/60' : 'text-ink-2'}`}>{right}</span>
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
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
      ? 'border border-ink text-ink hover:bg-ink hover:text-paper'
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

function InlineList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="grid grid-cols-[18px_1fr] gap-3">
          <span className={`mt-[9px] h-1 w-1 rounded-full ${dark ? 'bg-paper/55' : 'bg-ink-2'}`} />
          <span className={`text-[13px] leading-[20px] ${dark ? 'text-paper/75' : 'text-ink'}`}>{item}</span>
        </div>
      ))}
    </div>
  )
}

function ProposalNav() {
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
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-5 text-ink md:flex">
        <div className="flex items-center gap-6">
          <span className="eyebrow font-medium text-ink">Anchovies</span>
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Austin Halvorson + Zach Gregory</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="eyebrow text-ink-2">Brand Identity + Website · v1</span>
          <span className="eyebrow text-ink">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
          <a href="#overview" className="flex min-w-0 items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
            <span className="truncate text-[13px] font-medium tracking-[-0.01em] text-ink">Anchovies × Cipher</span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
              Schedule discovery
            </a>
          </div>
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
          <span className="eyebrow text-ink-2">§ 01 / Overview</span>
          <span className="eyebrow text-ink-2">Strategy · Identity · Website</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Cipher · Digital Media</span>
          <span className="eyebrow text-ink-2">Prepared by Anchovies</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="serif max-w-[1200px] pb-16 text-[62px] font-medium leading-[58px] tracking-[-0.04em] sm:text-[88px] sm:leading-[82px] md:text-[120px] md:leading-[108px] lg:text-[148px] lg:leading-[128px]">
          Complexity, made controlled.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 pb-20 lg:flex-row lg:gap-[120px]">
        <Reveal className="max-w-[700px] flex-1">
          <h2 className="serif text-[31px] font-medium leading-[39px] tracking-[-0.024em] md:text-[36px] md:leading-[44px]">
            Cipher is being built around a simple but powerful idea: the digital media ecosystem is fragmented, expensive, opaque, and often optimized around the wrong things.
          </h2>
          <p className="serif mt-7 text-[31px] italic leading-[39px] tracking-[-0.024em] md:text-[36px] md:leading-[44px]">
            Cipher exists to make that complexity usable.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5">
          <p className="text-[15px] leading-[23px] text-ink-2">
            The brand should feel intelligent, precise, premium, and slightly mysterious. The website should be simple, polished, and conversion-focused, giving visitors a clear sense that Cipher understands the systems others are still trying to figure out.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <AnchorButton>{'Schedule discovery ->'}</AnchorButton>
            <AnchorButton href="#scope" variant="outline">
              See the scope
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 / What this work creates" right="Four disciplines" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${pillarBorderClasses[index]}`}>
              <span className="eyebrow text-ink-2">{pillar.label}</span>
              <h3 className="serif text-[40px] font-medium leading-[44px] tracking-[-0.02em]">{pillar.title}</h3>
              <p className="text-[13px] leading-[20px] text-ink-2">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function BrandDirection() {
  return (
    <section id="direction" className="border-b border-paper/15 bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 / Brand direction" right="Intelligent, not obvious" dark />
      <div className="grid gap-12 border-t border-paper/20 py-16 lg:grid-cols-[1.35fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[840px] text-[58px] font-medium italic leading-[64px] tracking-[-0.032em] md:text-[88px] md:leading-[90px]">
            Sleek in form. Sharp in feeling.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[390px] flex-col gap-6 pt-3 text-[15px] leading-[24px] text-paper/70">
          <p>Cipher should feel technically fluent without becoming a tech cliche. Mysterious without becoming gimmicky. Premium without becoming sterile.</p>
          <p>The strongest early direction is restrained, dark, precise, and editorial. Less neon-green hacker. More quiet command center. Less startup dashboard. More private intelligence firm.</p>
        </Reveal>
      </div>
      <Reveal className="pt-2">
        <MetaRow left="Fig. 03 / Creative cues" right="Intelligent restraint" dark />
        <div className="mt-6 grid border-t border-paper/20 md:grid-cols-2 xl:grid-cols-4">
          {cues.map((cue, index) => (
            <div key={cue.title} className={`flex min-h-[220px] flex-col gap-5 border-paper/20 p-8 ${pillarBorderClasses[index]}`}>
              <span className="eyebrow text-paper/55">{cue.num}</span>
              <h3 className="serif text-[32px] font-medium leading-[36px] tracking-[-0.02em]">{cue.title}</h3>
              <p className="text-[13px] leading-[20px] text-paper/70">{cue.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Priorities() {
  return (
    <section id="priorities" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 05 / Strategic priorities" right="Five priorities" />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-12 text-[52px] font-medium leading-[56px] tracking-[-0.032em] md:text-[92px] md:leading-[92px]">
          What the work needs to accomplish.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {priorities.map((item) => (
          <Reveal key={item.num} className="grid gap-7 border-b border-[var(--color-rule)] py-9 lg:grid-cols-[56px_380px_1fr] lg:gap-20">
            <span className="eyebrow leading-[36px] text-ink-2">{item.num}</span>
            <h3 className="serif text-[30px] font-medium leading-[34px] tracking-[-0.014em]">{item.title}</h3>
            <p className="max-w-[640px] pt-1 text-[14px] leading-[22px] text-ink-2">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Scope() {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 06 / Scope of work" right="Four phases" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[820px] text-[50px] font-medium leading-[54px] tracking-[-0.03em] md:text-[88px] md:leading-[94px]">
            A complete brand and website engagement.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] pt-2 text-[15px] leading-[23px] text-ink-2">
          From discovery to launch: strategy, messaging, identity, and a five-page responsive Framer build, one integrated arc of work.
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[120px_420px_1fr] lg:gap-12">
            <div>
              <span className="eyebrow mb-2 block text-ink-2">Phase</span>
              <span className="serif text-[52px] font-medium leading-[52px] tracking-[-0.02em]">{phase.num}</span>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="serif text-[32px] font-medium leading-[38px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{phase.body}</p>
              {phase.recommended && (
                <div className="pt-3">
                  <span className="eyebrow mb-3 block text-ink-2">Recommended site structure</span>
                  <div className="serif grid gap-1 text-[22px] leading-[30px] tracking-[-0.01em]">
                    {phase.recommended.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="pt-1">
              <span className="eyebrow mb-4 block text-ink-2">Includes</span>
              <InlineList items={phase.includes} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WebsiteConcept() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 07 / Website concept" right="A sharper digital moment" />
      <div className="grid gap-12 pt-12 lg:grid-cols-[1.2fr_440px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[680px] text-[48px] font-medium leading-[54px] tracking-[-0.024em] md:text-[64px] md:leading-[68px]">
            A website that feels intelligent.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[440px] flex-col gap-5 text-[15px] leading-[24px] text-ink-2">
          <p>
            Because Cipher works in digital media, the website has an opportunity to feel more aware, responsive, and technically fluent than a standard agency page. This could be as simple as a smart interaction, a return-visitor detail, or a subtle content path based on what a visitor is trying to accomplish.
          </p>
          <p className="serif text-[24px] italic leading-[30px] tracking-[-0.01em] text-ink">
            The point is restraint. Clever, not gimmicky. Aware, not invasive. Premium, not overbuilt.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Deliverables() {
  return (
    <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 08 / Final deliverables" right="Twenty-nine artifacts" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[780px] text-[50px] font-medium leading-[54px] tracking-[-0.03em] md:text-[88px] md:leading-[94px]">
            Everything needed to launch.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] pt-2 text-[15px] leading-[23px] text-ink-2">
          Twenty-nine artifacts across strategy, identity, and website. The complete kit for the brand and its launch.
        </Reveal>
      </div>
      <Reveal className="grid gap-0 border-t border-[var(--color-rule)] lg:grid-cols-3">
        {deliverableGroups.map((group, index) => (
          <div key={group.title} className={`border-[var(--color-rule)] py-8 lg:px-10 ${index === 0 ? 'lg:pr-10' : index === 1 ? 'border-t lg:border-l lg:border-t-0' : 'border-t lg:border-l lg:border-t-0 lg:pl-10'}`}>
            <span className="eyebrow mb-5 block text-ink-2">{group.title}</span>
            <div className="serif grid gap-2 text-[21px] leading-[32px] tracking-[-0.01em]">
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 09 / Process and timeline" right="4 weeks" />
      <div className="grid gap-12 py-12 lg:grid-cols-[1.2fr_400px] lg:items-end lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[900px] text-[50px] font-medium leading-[54px] tracking-[-0.03em] md:text-[88px] md:leading-[94px]">
            Focused, efficient, paced for momentum.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          The target launch may be next year, but the work does not need to stretch that long. We recommend moving while the thinking is fresh and giving the brand breathing room before launch.
        </Reveal>
      </div>
      <Reveal className="grid border-t border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
        {timeline.map((step, index) => (
          <div key={step.num} className={`border-[var(--color-rule)] p-8 ${pillarBorderClasses[index]}`}>
            <span className="eyebrow text-ink-2">{step.num} · {step.when}</span>
            <h3 className="serif mt-5 text-[30px] font-medium leading-[34px] tracking-[-0.016em]">{step.title}</h3>
            <div className="mt-6 grid gap-2">
              {step.items.map((item) => (
                <p key={item} className="text-[13px] leading-[20px] text-ink-2">{item}</p>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 10 / Investment" right="Brand identity + website" />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <Reveal>
          <div className="serif text-[78px] font-medium leading-[78px] tracking-[-0.04em] md:text-[150px] md:leading-[150px]">$15,900</div>
          <div className="mt-4 text-[13px] leading-[18px] tracking-[0.04em] text-ink-2">One integrated engagement · Brand identity + website</div>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-4 pt-3 text-[15px] leading-[24px] text-ink-2">
          <p>A selected engagement covering strategy, messaging, visual identity, and a responsive Framer website, one team, one arc, four weeks.</p>
          <p>Itemized below. One total, three payment milestones.</p>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)]">
        {investmentLines.map((line) => (
          <div key={line.num} className="grid gap-5 border-b border-[var(--color-rule)] py-8 md:grid-cols-[80px_1fr_220px] md:gap-10">
            <span className="eyebrow leading-[38px] text-ink-2">Line {line.num}</span>
            <div>
              <h3 className="serif text-[34px] font-medium leading-[38px] tracking-[-0.018em]">{line.phase}</h3>
              <p className="mt-2 max-w-[560px] text-[13px] leading-[20px] text-ink-2">{line.summary}</p>
            </div>
            <span className="serif text-[42px] font-medium leading-[42px] tracking-[-0.02em] md:text-right">{line.amount}</span>
          </div>
        ))}
        <div className="grid gap-5 border-b border-[var(--color-rule)] py-8 md:grid-cols-[80px_1fr_220px] md:items-center md:gap-10">
          <span className="eyebrow text-ink-2">Total</span>
          <h3 className="serif text-[34px] font-medium leading-[40px] tracking-[-0.018em]">Selected engagement · four lines</h3>
          <span className="serif text-[50px] font-medium leading-[50px] tracking-[-0.03em] md:text-right">$15,900</span>
        </div>
      </Reveal>
      <Reveal className="pt-14">
        <MetaRow left="Fig. 04 / Payment structure" right="Three milestones" />
        <div className="mt-8 grid border-t border-[var(--color-rule)] md:grid-cols-3">
          {paymentMilestones.map((milestone, index) => (
            <div key={milestone.title} className={`border-[var(--color-rule)] p-8 ${index < 2 ? 'border-b md:border-b-0 md:border-r' : ''}`}>
              <div className="serif text-[64px] font-medium leading-[64px] tracking-[-0.03em]">{milestone.amount}</div>
              <h3 className="serif mt-3 text-[22px] font-medium leading-[28px] tracking-[-0.014em]">{milestone.title}</h3>
              <p className="mt-3 text-[13px] leading-[20px] text-ink-2">{milestone.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 11 / In closing" right="Cipher" dark />
      <Reveal className="border-t border-paper/20 pt-16">
        <h2 className="serif max-w-[1000px] text-[62px] font-medium italic leading-[68px] tracking-[-0.034em] md:text-[104px] md:leading-[110px]">
          The code behind the buy.
        </h2>
      </Reveal>
      <div className="grid gap-10 pt-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-paper/70">
            Cipher already has the right ingredients: a strong name, a clear market problem, senior expertise, and a point of view that challenges how digital media is often sold and managed.
          </p>
        </Reveal>
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-paper/70">
            Our role is to give that point of view a form people can recognize, remember, and want on their side. Build the brand that makes complexity feel controlled.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 bg-paper px-6 py-10 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-4">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
        <span className="text-[12px] leading-[16px] tracking-[0.02em] text-ink">Anchovies</span>
        <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="text-[12px] leading-[16px] tracking-[0.02em]">Prepared for Austin Halvorson + Zach Gregory</span>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <a href={calendarHref} target="_blank" rel="noreferrer" className="eyebrow text-ink-2 hover:text-ink">
          Schedule discovery -&gt;
        </a>
        <span className="eyebrow text-ink">Brand Identity + Website · v1 · July 2026</span>
      </div>
    </footer>
  )
}

export function CipherProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Cipher - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A brand identity and website proposal for Cipher from Anchovies.')
    }
  }, [])

  return (
    <main className="cipher-proposal bg-paper text-ink">
      <ProposalNav />
      <Hero />
      <BrandDirection />
      <Priorities />
      <Scope />
      <WebsiteConcept />
      <Deliverables />
      <Timeline />
      <Investment />
      <Closing />
      <Footer />
    </main>
  )
}
