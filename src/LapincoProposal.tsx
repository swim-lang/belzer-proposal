import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://pitch.com/v/anchovies-press-zwdsbn'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'approach', label: 'Approach' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

const pillars = [
  {
    label: 'Pillar 01',
    title: 'Identity',
    body: 'A brand identity with a point of view: logo, typography, color, and a visual system Lapinco can stand behind.',
  },
  {
    label: 'Pillar 02',
    title: 'Messaging',
    body: 'A clarified public story: positioning, narrative, and the language that articulates how Lapinco sees value.',
  },
  {
    label: 'Pillar 03',
    title: 'Site',
    body: 'A streamlined website: modern, credible, and built with future investor portal integration in mind.',
  },
  {
    label: 'Pillar 04',
    title: 'System',
    body: 'A foundation that grows: brand, materials, and a structure ready to extend into the investor portal and beyond.',
  },
]

const heardSignals = [
  [
    'T-01',
    'You operate in a highly regulated category.',
    'The public brand and website have to be careful, clear, and appropriate. Restraint is part of the work, and it can become part of the strength of the system.',
  ],
  [
    'T-02',
    'The brand should reflect who Lapinco is.',
    'Specific to Lapinco, category-aware, premium, restrained, and alive with a clearer point of view.',
  ],
  [
    'T-03',
    'Your investment style is patient, tactile, analytical, and instinctive.',
    'You read the numbers and you read the asset. The brand should feel like both: disciplined and tactile, studied and direct.',
  ],
  [
    'T-04',
    'References like Alo, Salomon, Erewhon, and Apple kept coming up.',
    'Purpose-built design, premium simplicity, strong product logic, and a clear point of view: financial services with sharper cultural and product-level clarity.',
  ],
  [
    'T-05',
    'The team mixes architecture, real estate, finance, construction, and investment analysis.',
    "Cross-disciplinary depth is part of the firm's edge. The visual system has to hold that range as one coherent expression.",
  ],
  [
    'T-06',
    'Los Angeles, Boston, and a Dubai presence in motion.',
    'The brand has to feel cool, specific, and culturally aware: at home in LA, Boston, and a Dubai office still finding its footing.',
  ],
  [
    'T-07',
    'An investor portal is on the horizon within the next 18 months.',
    'The website and brand should be ready for it. The system has to extend into a secure portal without forcing a visual reset when it arrives.',
  ],
]

const designOutcomes = [
  "Existing partners feel they're working with a serious firm.",
  'Brokers, counterparties, and counsel see the level of thought behind the work.',
  'Future investors understand the sophistication without needing it explained.',
  'Every brief, capital update, and document lives in one consistent system.',
  'A firm that feels equal to the next chapter.',
]

const creationPillars = [
  {
    label: 'Pillar 01 - Identity',
    title: 'A brand identity with a point of view.',
    body: 'A visual identity system that feels specific to Lapinco and the world it operates in. Premium, restrained, distinct, and built with enough clarity to hold up across website, decks, documents, and future investor materials.',
    note: 'Logo, typography, color, visual language, motion direction, and the foundational rules that make the identity usable across the full system.',
  },
  {
    label: 'Pillar 02 - Messaging',
    title: "A message that clarifies the firm's edge.",
    body: "Lapinco's story has multiple dimensions: alternative assets, property-focused investments, infrastructure roots, patient analysis, global expansion, and a cross-disciplinary team. The brand should articulate that range with discipline.",
    note: 'Positioning, narrative direction, and the language for website, investor-facing materials, and future communications, written with the regulatory environment in mind.',
  },
  {
    label: 'Pillar 03 - Site',
    title: 'A streamlined website built for the current stage.',
    body: 'Simple, focused, and high quality. A website that helps visitors quickly understand who Lapinco is, what the firm does, and how to get in touch while preserving the right amount of discretion around the investment strategy.',
    note: 'Built with future investor portal integration in mind, so the public site can grow into the next phase cleanly.',
  },
  {
    label: 'Pillar 04 - System',
    title: 'A foundation that grows with the firm.',
    body: 'Brand, materials, and structure that extend into investor decks, project summaries, fund overviews, Dubai office materials, and the future investor portal experience.',
    note: 'Built once, designed to flex. Ready for the moments that matter before they arrive.',
  },
]

const phases = [
  {
    num: '01',
    title: 'Discovery, positioning, and stakeholder alignment.',
    body: "A focused process to understand Lapinco's team, history, investment philosophy, audiences, regulatory boundaries, and future plans. With multiple operating partners and disciplines inside the firm, this phase is also about alignment.",
    deliverable: 'Brand direction summary, creative moodboard, positioning and messaging foundation, and website structure recommendation.',
    includes: [
      'Founder + partner discovery',
      'Stakeholder input process',
      'Investment philosophy discussion',
      'Category + competitor scan',
      'Audience + stakeholder review',
      'Regulatory sensitivity discussion',
      'Website structure planning',
    ],
  },
  {
    num: '02',
    title: 'Brand identity and visual system.',
    body: 'We refresh the Lapinco identity and build a cohesive system around it: logo, typography, color, graphic language, and art direction. The system should feel connected to patience, discipline, independence, structure, tactility, and purpose.',
    deliverable: 'A refined identity system that gives Lapinco a recognizable and repeatable design language across website, print, digital, and future investor-facing materials.',
    includes: [
      'Primary logo + secondary lockup',
      'Symbol or brand mark',
      'Premium typeface selection + licensing',
      'Color palette + graphic language',
      'Layout + art direction principles',
      'Motion direction',
      'Brand applications + mockups',
    ],
  },
  {
    num: '03',
    title: 'Messaging and copy direction.',
    body: "We articulate Lapinco's investment philosophy, strategy, and point of view in language that is clear, concise, and appropriate for the category. Final legal and compliance review remains with Lapinco's internal team or counsel.",
    deliverable: 'A clear messaging foundation that supports the website and gives Lapinco a more polished way to describe the firm, its approach, and its capabilities.',
    includes: [
      'Brand narrative direction',
      'Positioning + investment philosophy language',
      'Website copywriting support',
      'Capabilities + team language',
      'Portfolio introduction language',
      'Contact + CTA language',
      'Messaging guidance for future materials',
    ],
  },
  {
    num: '04',
    title: 'Website design and development.',
    body: "A streamlined website for Lapinco: modern, credible, and distinct while remaining simple enough for the firm's current stage. Structured with the future investor portal in mind so the site can evolve cleanly later.",
    deliverable: 'A focused, polished website that gives Lapinco a stronger digital presence and a flexible foundation for future growth.',
    includes: [
      'Site strategy + architecture',
      'Homepage, About, Portfolio, Contact',
      'Desktop + mobile design',
      'Responsive development',
      'Contact form + foundational SEO',
      'Basic analytics + launch support',
      'Subtle motion + interaction direction',
    ],
  },
  {
    num: '05',
    title: 'Investor portal readiness.',
    body: 'Lapinco plans to add an investor portal within the next 18 months. We account for that now: navigation, information architecture, and design system decisions made so the future portal integrates cleanly when it arrives.',
    deliverable: 'A public website and brand system that can support a future investor portal without forcing a major visual reset.',
    includes: [
      'Navigation planning for future portal access',
      'High-level portal integration considerations',
      'Site structure that accommodates secure login',
      'Design system decisions that extend into portal UI',
      'Recommendations for future portal planning',
      'Role-based access considerations',
      'CRM + back-office integration touchpoints',
    ],
  },
  {
    num: '06',
    title: 'Brand guide and launch handoff.',
    body: 'We package the final identity, messaging, and website into a practical handoff: a clear reference point Lapinco can use across the website and future brand materials, in LA, Boston, and Dubai.',
    deliverable: 'A practical brand guide and organized asset handoff with logo usage, typography, color, visual language, and template-ready assets.',
    includes: [
      'Logo usage + system',
      'Color + typography rules',
      'Visual language + art direction',
      'Website direction + components',
      'Messaging guidance',
      'Exported logo + web-ready assets',
      'Template-ready files + launch handoff',
    ],
  },
]

const deliverableGroups = [
  {
    title: 'Strategy + identity',
    meta: '14 items',
    items: [
      'Discovery + stakeholder alignment',
      'Category + competitor scan',
      'Creative direction moodboard',
      'Brand direction summary',
      'Positioning + messaging foundation',
      'Primary logo',
      'Secondary logo or lockup',
      'Symbol or brand mark',
      'Typography system',
      'Premium typeface recommendations',
      'Color palette',
      'Graphic motif + visual language',
      'Art direction guidance',
      'Foundational brand guide',
    ],
  },
  {
    title: 'Site + system',
    meta: '14 items',
    start: 15,
    items: [
      'Website structure + architecture',
      'Website copy support',
      'Homepage design + build',
      'About / Team page',
      'Portfolio page',
      'Contact page',
      'Mobile responsive website',
      'Subtle motion + interaction direction',
      'Foundational SEO setup',
      'Basic analytics setup',
      'Investor portal readiness planning',
      'Brand applications + mockups',
      'Final asset exports',
      'Launch + handoff package',
    ],
  },
]

const timeline = [
  ['Week 1-2', 'Discovery + direction', 'Discovery, stakeholder input, positioning alignment, category and competitor review, website structure planning, creative moodboard.'],
  ['Week 3-4', 'Brand identity', 'Logo exploration, identity system, typography and color, visual language, brand applications, identity presentation, refinement.'],
  ['Week 5-6', 'Website design', 'Website architecture, copy support, desktop and mobile design, motion direction, website presentation, refinement.'],
  ['Week 7-8', 'Development + handoff', 'Website development, responsive testing, foundational SEO, analytics setup, brand guide, launch support, final asset handoff.'],
]

const investmentLines = [
  ['01', 'Discovery, positioning, and stakeholder alignment', 'Discovery, stakeholder input, category review, regulatory sensitivity discussion, website structure planning, creative direction.', '$2,500'],
  ['02', 'Brand identity and visual system', 'Logo, lockups, mark, typography, color, visual language, applications, mockups, and foundational brand guide.', '$7,000'],
  ['03', 'Website design and development', 'Site structure, copy support, desktop and mobile design, responsive development, contact form, SEO, analytics, launch support, and portal readiness planning.', '$9,000'],
  ['04', 'Brand guide and launch handoff', 'Final brand guide, logo exports, web-ready assets, usage guidance, and organized handoff.', '$1,500'],
]

const paymentMilestones = [
  ['50%', 'Due at kickoff', 'Project starts when the kickoff invoice is paid.'],
  ['25%', 'Due after identity presentation', 'Once the brand identity has been presented and approved.'],
  ['25%', 'Due before final handoff', 'Before the final asset handoff and launch support.'],
]

const futureColumns = [
  ['Brand + materials', ['Investor materials + pitch decks', 'Project summary templates', 'Fund or strategy overview documents', 'Dubai office materials']],
  ['Site + presence', ['Investor portal strategy + build', 'Digital reporting experiences', 'Event or conference collateral', 'Animated brand assets']],
  ['Alpoke · Custom AI-enabled tools', ['Investor workflow automation', 'Internal knowledge tools', 'Document experiences + reporting', 'Portal feature tooling + integrations']],
]

const kickoffGives = [
  'A strategic foundation: positioning + creative direction',
  'A refreshed identity system with a point of view',
  'A clear messaging foundation',
  'A focused, premium website',
  'A foundation ready for the future investor portal',
  'A digital brand guide and full handoff',
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

function LapincoNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Andre Navas · Lapinco</span>
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
              Lapinco
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={workHref} target="_blank" rel="noreferrer" className="hidden rounded-full px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap sm:inline-flex">
              Our work
            </a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-ink-2 whitespace-nowrap">
              Schedule kickoff
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
          <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
          <span className="eyebrow text-ink-2">Brand · Messaging · Site · Portal Readiness</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Lapinco · Alternative Asset Management</span>
          <span className="eyebrow text-ink-2">Prepared for Andre Navas</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1200px] pb-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[128px] lg:leading-[108px]">
          A sharp public form for capital that sees differently.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            A refreshed brand identity, focused messaging, and a streamlined website: designed to give Lapinco a clearer public form across Los Angeles, Boston, and Dubai.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            The next phase gives Lapinco a public expression equal to the work happening behind the scenes: disciplined, tactile, culturally aware, and ready for the future investor portal.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton href={calendarHref}>{'Schedule a kickoff meeting ->'}</AnchorButton>
            <AnchorButton href={workHref} variant="outline">
              View our work
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 - What this work creates" right="Four pillars" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${index < pillars.length - 1 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
              <span className="eyebrow text-ink-2">{pillar.label}</span>
              <h3 className="serif text-[40px] leading-[44px] tracking-[-0.018em]">{pillar.title}</h3>
              <p className="text-[13px] leading-[20px] text-ink-2">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function WhatWeHeard() {
  return (
    <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <div className="grid gap-14 lg:grid-cols-[520px_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-14">
          <span className="eyebrow text-ink-2">§ 02 - What we heard</span>
          <h2 className="display max-w-[560px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[64px] md:leading-[64px]">
            You have built a firm that looks where others overlook.
          </h2>
          <div className="flex max-w-[460px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
            <p>Alternative asset management, property-focused investments, infrastructure roots, hands-on evaluation. You know how a firm earns trust over time, and where most others start to feel interchangeable.</p>
            <p>The current Lapinco presence works. This phase gives the brand and website the same level of thought as the work the firm is doing.</p>
            <p className="text-ink">A few things stood out from our conversation.</p>
          </div>
        </Reveal>
        <Reveal className="flex flex-col">
          {heardSignals.map(([label, title, body]) => (
            <div key={label} className="grid gap-5 border-t border-[var(--color-rule)] py-6 md:grid-cols-[56px_1fr] md:gap-8">
              <span className="eyebrow pt-2 text-ink-2">{label}</span>
              <div className="flex flex-col gap-3">
                <h3 className="serif text-[26px] leading-[32px] tracking-[-0.012em]">{title}</h3>
                <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Opportunity() {
  return (
    <section id="opportunity" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 03 - The opportunity" right="Anchovies · Point of view" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[50px] leading-[54px] tracking-[-0.026em] md:text-[78px] md:leading-[78px] lg:text-[96px] lg:leading-[92px]">
          Capital is a perception business.
        </h2>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex max-w-[580px] flex-col gap-6">
          <p className="serif text-[26px] italic leading-[36px] tracking-[-0.012em]">
            Before a meeting, before an introduction, before a wire: people are reading signals. The clarity of a deck, the polish of a one-pager, the way an asset manager presents a position across a table.
          </p>
          <p className="text-[15px] leading-[24px] text-paper/70">
            Those details shape who the firm gets to work with. For Lapinco, the brand should feel like a well-considered structure: patient, restrained, confident, premium, and specific.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[560px] flex-col gap-3">
          <span className="eyebrow pb-3 text-paper/50">What strong design can do here</span>
          {designOutcomes.map((outcome, index) => (
            <p key={outcome} className={`serif text-[22px] leading-[34px] tracking-[-0.012em] ${index === designOutcomes.length - 1 ? 'text-paper/45' : 'text-paper'}`}>
              {index === designOutcomes.length - 1 ? `— ${outcome}` : outcome}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function WorkCreates() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 04 - What this work creates" right="Four pillars, in depth" />
      <Reveal>
        <h2 className="display max-w-[920px] py-16 text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
          Built for the firm Lapinco is becoming.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {creationPillars.map((pillar) => (
          <Reveal key={pillar.label} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[480px_1fr] lg:gap-14">
            <div className="flex max-w-[520px] flex-col gap-6">
              <span className="eyebrow text-ink-2">{pillar.label}</span>
              <h3 className="serif text-[40px] leading-[46px] tracking-[-0.018em] md:text-[56px] md:leading-[60px]">{pillar.title}</h3>
            </div>
            <div className="flex max-w-[620px] flex-col gap-4 pt-2">
              <p className="text-[17px] leading-[28px]">{pillar.body}</p>
              <p className="text-[14px] leading-[22px] text-ink-2">{pillar.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 05 - Our approach" right="Six phases" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            A clear path from positioning to handoff.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Six phases over 6-8 weeks. We start with strategic foundation, move into identity and messaging, design and build the website, prepare the system for the future investor portal, and package everything for Lapinco to use across LA, Boston, and Dubai.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[90px_1fr_360px] lg:gap-12">
            <div>
              <span className="serif block text-[56px] leading-[56px] tracking-[-0.02em]">{phase.num}</span>
              <span className="eyebrow mt-4 block text-ink-2">Phase</span>
            </div>
            <div className="max-w-[620px]">
              <h3 className="serif pb-5 text-[34px] leading-[40px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="pb-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
              <p className="text-[13px] leading-[20px] text-ink-2">Deliverable — {phase.deliverable}</p>
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
  )
}

function Deliverables() {
  return (
    <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 06 - Final deliverables" right="28 items" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            Everything Lapinco walks away with.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            A complete system across strategy, identity, messaging, website, and portal readiness: packaged for immediate use and long-term growth across LA, Boston, and Dubai.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        {deliverableGroups.map((group) => (
          <Reveal key={group.title} className="border-t border-[var(--color-rule)]">
            <div className="flex justify-between gap-6 border-b border-[var(--color-rule)] py-4">
              <span className="eyebrow text-ink-2">{group.title}</span>
              <span className="eyebrow text-ink-2">{group.meta}</span>
            </div>
            {group.items.map((item, index) => {
              const number = (group.start || 1) + index
              return (
                <div key={item} className="grid grid-cols-[54px_1fr] gap-4 border-b border-[#DDD8CD] py-3.5 last:border-b-0">
                  <span className="eyebrow text-ink-2">D-{String(number).padStart(2, '0')}</span>
                  <span className="text-[14px] leading-[20px]">{item}</span>
                </div>
              )
            })}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 07 - Timeline" right="6 to 8 weeks" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            From discovery to handoff in six to eight weeks.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Four phases, sequenced so each round of work feeds the next. Discovery informs identity. Identity shapes messaging. The website confirms the system. Everything flows into a usable brand guide that the future investor portal can plug into.
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
          <div key={when} className="grid gap-3 border-b border-[var(--color-rule)] py-7 last:border-b-0 md:grid-cols-[200px_360px_1fr] md:gap-0">
            <span className="serif text-[24px] leading-[30px]">{when}</span>
            <span className="serif text-[24px] leading-[30px]">{phase}</span>
            <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 08 - Investment" right="Total engagement" dark />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[620px] text-[56px] leading-[58px] tracking-[-0.026em] md:text-[96px] md:leading-[92px]">
            First phase total.
          </h2>
        </Reveal>
        <Reveal className="lg:text-right">
          <span className="display block text-[78px] leading-[82px] tracking-[-0.03em] md:text-[118px] md:leading-[112px]">$20,000</span>
          <span className="text-[13px] leading-[18px] text-paper/55">Recommended first phase</span>
        </Reveal>
      </div>
      <Reveal className="border-t border-paper/20">
        {investmentLines.map(([num, phase, body, amount]) => (
          <div key={num} className="grid gap-4 border-b border-paper/20 py-7 md:grid-cols-[80px_320px_1fr_180px] md:gap-8">
            <span className="serif text-[28px] leading-[32px]">{num}</span>
            <h3 className="serif text-[24px] leading-[30px] tracking-[-0.012em]">{phase}</h3>
            <p className="text-[13px] leading-[20px] text-paper/70">{body}</p>
            <span className="serif text-[34px] leading-[38px] tracking-[-0.018em] md:text-right">{amount}</span>
          </div>
        ))}
        <div className="grid gap-4 py-8 md:grid-cols-[80px_320px_1fr_180px] md:items-center md:gap-8">
          <span className="eyebrow text-paper/55">Total</span>
          <span className="serif text-[28px] leading-[34px]">Recommended first phase</span>
          <span />
          <span className="serif text-[46px] leading-[50px] tracking-[-0.02em] md:text-right">$20,000</span>
        </div>
      </Reveal>
      <Reveal className="mt-10 grid gap-8 border border-paper/20 p-8 lg:grid-cols-[1.1fr_1fr_180px] lg:p-10">
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-paper/55">Optional future phase</span>
          <h3 className="serif text-[36px] leading-[42px] tracking-[-0.016em]">Investor portal strategy and working prototype.</h3>
          <p className="text-[14px] leading-[22px] text-paper/70">
            When Lapinco is ready to move toward the portal, this phase produces a functional working prototype with real screens, real flows, and interaction patterns testable with stakeholders and handed directly to development.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {['Portal goals + requirements', 'User flow mapping + IA', 'Interactive prototype screens', 'Working UI components + states', 'Stakeholder testing + iteration', 'Technical handoff + development roadmap'].map((item) => (
            <div key={item} className="flex items-baseline gap-3">
              <span className="h-1 w-1 shrink-0 rounded-full bg-paper/70" />
              <span className="text-[13px] leading-[20px]">{item}</span>
            </div>
          ))}
        </div>
        <div className="lg:text-right">
          <span className="serif block text-[44px] leading-[48px] tracking-[-0.018em]">+$7,500</span>
          <span className="eyebrow text-paper/55">Brings total to $27,500</span>
        </div>
      </Reveal>
      <Reveal className="mt-14 border-t border-paper/20 pt-8">
        <MetaRow left="Payment structure" right="Three milestones" dark />
        <div className="grid gap-6 lg:grid-cols-3">
          {paymentMilestones.map(([percent, title, body]) => (
            <div key={title} className="border border-paper/20 p-8">
              <span className="display block text-[64px] leading-[68px] tracking-[-0.026em]">{percent}</span>
              <h3 className="serif pt-3 text-[22px] leading-[28px] tracking-[-0.012em]">{title}</h3>
              <p className="pt-3 text-[13px] leading-[20px] text-paper/70">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function FutureOpportunities() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 09 - Future opportunities" right="After this phase" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            After this phase, the firm has room to grow.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            As Lapinco expands, we can support additional needs. We are also launching Alpoke, a sister brand focused on custom AI-enabled tools, app design, and tailored technical systems. If the investor portal or internal workflows become a larger priority, that creates a strong opportunity to support both the creative and technical sides of the experience.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-20">
        {futureColumns.map(([title, items]) => (
          <Reveal key={title as string} className="border-t border-[var(--color-rule)] pt-4">
            <span className="eyebrow text-ink-2">{title}</span>
            <div className="pt-4">
              {(items as string[]).map((item, index) => (
                <div key={item} className={`flex items-center gap-4 py-4 ${index < (items as string[]).length - 1 ? 'border-b border-[#DDD8CD]' : ''}`}>
                  <span className="h-px w-2 shrink-0 bg-ink" />
                  <span className="serif text-[18px] leading-[26px] tracking-[-0.012em]">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 10 - Next step" right="Begin with discovery" />
      <Reveal className="mt-16 border border-[var(--color-rule)] p-8 md:p-14 lg:p-16">
        <div className="flex flex-col gap-8 border-b border-[var(--color-rule)] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display max-w-[720px] text-[52px] leading-[56px] tracking-[-0.026em] md:text-[80px] md:leading-[80px]">
            Begin with a focused discovery session.
          </h2>
          <div className="lg:text-right">
            <span className="display block text-[70px] leading-[74px] tracking-[-0.03em] md:text-[88px] md:leading-[88px]">$20,000</span>
            <span className="text-[13px] leading-[18px] text-ink-2">First phase · 6-8 weeks</span>
          </div>
        </div>
        <div className="grid gap-10 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[480px_1fr]">
          <p className="text-[15px] leading-[24px] text-ink-2">
            If this direction feels aligned, we begin with a focused discovery session, gather partner input, and move into creative direction. From there, we build a refreshed identity, website, and launch foundation that gives Lapinco a more distinctive and considered presence.
          </p>
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ink-2">From kickoff, Lapinco gets —</span>
            {kickoffGives.map((item, index) => (
              <div key={item} className="grid grid-cols-[42px_1fr]">
                <span className="text-[14px] leading-[22px] text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[14px] leading-[22px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-8">
          <AnchorButton href={calendarHref}>{'Schedule a kickoff session ->'}</AnchorButton>
          <AnchorButton href={workHref} variant="outline">
            View our work
          </AnchorButton>
        </div>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 11 - Closing" right="Anchovies × Lapinco · 2026" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[48px] leading-[52px] tracking-[-0.024em] md:text-[86px] md:leading-[84px] lg:text-[104px] lg:leading-[100px]">
          A public form equal to how Lapinco works.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-paper/20 pt-10 lg:flex-row lg:items-start lg:justify-between">
        <Reveal className="max-w-[640px]">
          <p className="text-[17px] leading-[28px] text-paper/70">
            Patient, precise, and built with care. Designed once for today, with enough structure for the next chapter, the future investor portal, and the chapters after.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-2">
          <span className="eyebrow text-paper/55">Prepared by</span>
          <span className="serif text-[28px] leading-[34px]">Anchovies</span>
          <span className="text-[14px] leading-[20px] text-paper/60">Brand, identity, and custom software</span>
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
        <span className="eyebrow">Prepared for Andre Navas · Lapinco</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">May 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function LapincoProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Lapinco — Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A brand, messaging, website, and portal readiness proposal for Lapinco from Anchovies.')
    }
  }, [])

  return (
    <main className="lapinco-proposal bg-paper text-ink">
      <LapincoNav />
      <Hero />
      <WhatWeHeard />
      <Opportunity />
      <WorkCreates />
      <Approach />
      <Deliverables />
      <Timeline />
      <Investment />
      <FutureOpportunities />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
