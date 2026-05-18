import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://pitch.com/v/soup-to-software-pvn3j7'

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
    title: 'Strategy',
    body: 'A clear foundation for the new studio: what it offers, who it serves, how it thinks, and how the existing names should relate.',
  },
  {
    label: 'Pillar 02',
    title: 'Narrative',
    body: 'A public story with shape and precision: positioning, service language, and audience-specific messaging that still sounds like you.',
  },
  {
    label: 'Pillar 03',
    title: 'Identity',
    body: 'A visual system with the right mix of intelligence, restraint, curiosity, and presence.',
  },
  {
    label: 'Pillar 04',
    title: 'Site',
    body: 'A website direction you can build from: structure, art direction, case study framing, and a design system for the new studio.',
  },
]

const heardSignals = [
  [
    'T-01',
    'You want to move from a personal portfolio toward a more intentional studio brand.',
    'The new presence should create room for a consulting practice with a point of view, while still carrying the creative and technical depth people associate with your work.',
  ],
  [
    'T-02',
    'The strongest frame is design-led innovation with technical fluency.',
    'You help organizations move through ambiguity, build prototypes, connect design and engineering, and ask better questions about what technology should become.',
  ],
  [
    'T-03',
    'Soup to Software already has energy as a public voice.',
    'The name and writing have a meaningful audience and a useful point of view. This project gives us a chance to decide how that voice should relate to the new studio brand.',
  ],
  [
    'T-04',
    'Three audiences need to see themselves in the work.',
    'Cultural institutions, early-stage startups, and larger technology teams each speak a slightly different language. The brand should connect those worlds through a shared outcome: helping complex ideas become clear, useful, and experienced.',
  ],
  [
    'T-05',
    'There is a rich archive to draw from.',
    'Years of writing, projects, workshops, client work, and personal perspective give the new brand real material. The work is synthesis, editing, and decision-making.',
  ],
  [
    'T-06',
    'You are looking for a creative partner, not production help alone.',
    'This project calls for judgment, listening, structure, and taste. The goal is to help bring the voice forward and give it a form that can be used.',
  ],
  [
    'T-07',
    'The process needs room for collaboration and a clear path to decisions.',
    'As a creative, you bring strong perspective into the room. The process should honor that while creating enough structure to move the work into the world.',
  ],
  [
    'T-08',
    'This is a new professional chapter.',
    'The identity, language, and website direction should help the studio step into its next phase with more confidence, clarity, and momentum.',
  ],
]

const opportunityLines = [
  'Cultural institutions see a thoughtful, technically capable creative partner.',
  'Startups see a bridge between design, product, and engineering.',
  'Larger technology teams see senior judgment with creative and technical range.',
  'The studio gains a clearer way to explain its work, offers, and value.',
  'The new brand gives the practice a public form with more focus, confidence, and reach.',
]

const creationPillars = [
  {
    label: 'Pillar 01 - Strategy',
    title: 'A strategic foundation for the new studio.',
    body: 'We define the core story: what the studio offers, who it serves, how it thinks, and why the work creates value.',
    note: 'This also includes the relationship between Jono Brandel, Soup to Software, Bits and Bobs, and any existing entities, so the name and structure feel intentional before the identity begins.',
  },
  {
    label: 'Pillar 02 - Narrative',
    title: 'A sharp narrative structure.',
    body: 'This phase gives that voice a clear public role for a more professional B2B offering.',
    note: 'We shape positioning, service framing, audience-specific messaging, and a tone that makes the studio easier to understand while keeping the point of view intact.',
  },
  {
    label: 'Pillar 03 - Identity',
    title: 'A visual identity with precision and life.',
    body: 'The identity should feel intelligent, technical, cultural, and quietly inventive. It should respect the artfulness of the work while giving the studio a more professional presence.',
    note: 'This includes the logo or wordmark, typography, color, graphic language, and layout system that can support the website, writing, case studies, presentations, and future materials.',
  },
  {
    label: 'Pillar 04 - Site',
    title: 'A website direction you can build from.',
    body: 'Because you can develop, the greatest value is in the thinking behind the site: architecture, content hierarchy, art direction, interaction direction, and a design system.',
    note: 'The result is a clear foundation you can build from directly, with modular sections that can adapt to the three audiences the studio needs to reach.',
  },
]

const phases = [
  {
    num: '01',
    title: 'Discovery, synthesis, and positioning.',
    body: 'We review your existing work, writing, site, Substack, and workshop materials alongside the client profiles you want to reach. This phase is about finding the throughline and giving the new studio a clear strategic shape.',
    deliverable: 'Strategic direction summary, audience and offer framework, positioning language, and creative direction moodboard.',
    includes: [
      'Founder + practice discovery',
      'Review of existing site + portfolio',
      'Review of Soup to Software writing',
      'Workshop + slow marketing review',
      'Audience + client profile discussion',
      'Offer + service structure',
      'Positioning + messaging foundation',
    ],
  },
  {
    num: '02',
    title: 'Brand identity and visual system.',
    body: 'We create a visual identity for the new studio, shaped around the kind of work you do: thoughtful, technical, cultural, and quietly inventive.',
    deliverable: 'A visual system that can carry the website, writing, presentations, case studies, social, Substack, and future studio materials.',
    includes: [
      'Primary logo or wordmark',
      'Secondary lockup',
      'Symbol or visual mark, if right',
      'Typography system',
      'Color palette',
      'Graphic language + motif',
      'Foundational brand guide',
    ],
  },
  {
    num: '03',
    title: 'Narrative and website content structure.',
    body: 'We synthesize the existing material into a clear website structure, service language, and audience-specific messaging. The goal is a site that explains what you do, who it serves, and why the work has value with enough restraint to keep the visitor moving.',
    deliverable: 'A messaging framework for the website and brand that keeps your voice while making the practice legible to new audiences.',
    includes: [
      'Homepage narrative',
      'Studio introduction',
      'Service + offering language',
      'Audience-specific framing',
      'Case study framing',
      'Short bio + founder language',
      'Substack integration + CTA language',
    ],
  },
  {
    num: '04',
    title: 'Website design direction.',
    body: 'We design the core website experience and create a system you can build from. Recommended structure: Home, Services, Case Studies, Writing, About, Start a Conversation, with modular sections for the three audiences.',
    deliverable: 'A design foundation with the structure, visual language, and content direction to build a more focused studio presence.',
    includes: [
      'Website architecture',
      'Desktop design direction',
      'Mobile design direction',
      'Homepage design',
      'Key page + modular section design',
      'Substack integration direction',
      'Interaction + motion direction',
    ],
  },
  {
    num: '05',
    title: 'Case study and portfolio framing.',
    body: 'The existing work is strong. The new studio needs to frame that work through the lens of the client you want next. We create a repeatable structure that feels clear, useful, and credible to different audiences.',
    deliverable: 'A repeatable case study system that makes the work easier to understand and more relevant to future clients.',
    includes: [
      'Case study structure',
      'Project intro format',
      'Role + contribution framing',
      'Outcome framing',
      'Visual + written hierarchy',
      'First-feature project picks',
      'Audience-specific reframing',
    ],
  },
  {
    num: '06',
    title: 'Final handoff.',
    body: 'We package strategy, identity, messaging, and website direction into a clean handoff, giving you a system you can carry into development, writing, and future studio materials.',
    deliverable: 'Brand guide, logo exports, color and typography rules, website design files, messaging framework, case study framework, asset organization, and build notes.',
    includes: [
      'Brand guide',
      'Logo + asset exports',
      'Color + typography guidance',
      'Website design files',
      'Messaging + case study framework',
      'Asset organization',
      'Build notes for development',
    ],
  },
]

const deliverableGroups = [
  {
    title: 'Strategy + identity',
    meta: '14 items',
    start: 1,
    items: [
      'Strategic direction summary',
      'Audience + offer framework',
      'Positioning language',
      'Creative direction moodboard',
      'Primary logo or wordmark',
      'Secondary lockup',
      'Symbol or visual mark',
      'Typography system',
      'Color palette',
      'Graphic language or motif',
      'Foundational brand guide',
      'Layout + spacing system',
      'Art direction guidance',
      'Social + profile asset direction',
    ],
  },
  {
    title: 'Narrative + site',
    meta: '14 items',
    start: 15,
    items: [
      'Narrative + messaging framework',
      'Homepage narrative',
      'Studio introduction language',
      'Service + offering language',
      'Audience-specific messaging',
      'Bio + founder language',
      'Tone + CTA guidance',
      'Website architecture',
      'Desktop design direction',
      'Mobile design direction',
      'Homepage design',
      'Key page + modular section design',
      'Case study structure',
      'Substack integration + handoff',
    ],
  },
]

const timeline = [
  ['Week 1', 'Discovery + synthesis', 'Discovery, material review, audience and offer discussion, creative direction moodboard, and the naming + architecture review if selected.'],
  ['Week 2', 'Strategy + identity', 'Positioning language, visual direction, identity development, narrative structure.'],
  ['Week 3-4', 'Website direction', 'Website architecture, homepage design, key page or modular section design, case study structure, Substack integration direction.'],
  ['Week 4-5', 'Refinement + handoff', 'Refinement, brand guide, website design handoff, messaging framework handoff, final asset exports.'],
]

const investmentLines = [
  ['01', 'Discovery, synthesis, and positioning', 'Discovery, existing material review, audience and offer framework, positioning language, and creative direction.', '$3,500'],
  ['02', 'Brand identity and visual system', 'Logo or wordmark, lockup, typography, color, visual language, art direction, social asset direction, and foundational brand guide.', '$4,000'],
  ['03', 'Narrative and website content structure', 'Homepage narrative, service language, audience-specific messaging, bio language, case study framing, CTA language, and tone guidance.', '$2,000'],
  ['04', 'Website design direction and handoff', 'Website architecture, desktop and mobile design direction, homepage design, key page or modular section design, Substack integration direction, and build notes.', '$2,500'],
]

const addOnItems = [
  'Review of current naming assets',
  'Light naming exploration',
  'Trademark knockout (TKO) search',
  'Domain + usage considerations',
  'Final single-name recommendation',
  'Language for how the name is introduced',
]

const paymentMilestones = [
  ['50%', 'Due at kickoff', 'Project starts when the kickoff invoice is paid.'],
  ['25%', 'Due after identity presentation', 'Once the brand identity has been presented and approved.'],
  ['25%', 'Due before final handoff', 'Before the final website and asset handoff.'],
]

const futureColumns: Array<[string, string[]]> = [
  ['Build + collaboration', ['Website build support', 'Design QA + art direction review', 'Motion + interaction guidance', 'Final launch polish']],
  ['Brand + materials', ['Presentation deck system', 'Newsletter + Substack visual system', 'Workshop packaging', 'Sales + outreach materials']],
  ['Writing + reach', ['Expanded case study writing', 'Thought leadership campaign direction', 'Service page expansion', 'Audience-specific landing pages']],
]

const kickoffGives = [
  'A strategic foundation: positioning + creative direction',
  'A new identity system',
  'A messaging framework that keeps your voice',
  'A website design direction you can build from',
  'A repeatable case study system',
  'A clean handoff into development and writing',
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
  variant?: 'light' | 'dark' | 'outline'
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

function SoupNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Jono Brandel</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Strategy · Identity · Narrative · Site</span>
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
              Soup to Software
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
          <span className="eyebrow text-ink-2">Strategy · Identity · Narrative · Site</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Soup to Software · New studio brand</span>
          <span className="eyebrow text-ink-2">Prepared for Jono Brandel</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1200px] pb-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[128px] lg:leading-[108px]">
          A studio identity for the future of creative technology.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            Strategy, identity, narrative, and website direction for a studio built around clarity, invention, and technically fluent creative work.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            You already have the raw material: years of projects, writing, technical fluency, and a perspective shaped by design, software, art, product, and culture. This next phase is about giving that body of work a more intentional public form.
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
            You are building language for a practice that does not fit one conventional title.
          </h2>
          <div className="flex max-w-[460px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
            <p>Your work moves through design, software, consulting, art, systems, writing, and technology. That range is the value, and it needs a public expression that makes the range easier to understand.</p>
            <p>A few things stood out from our conversation.</p>
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
          Clarity is the deliverable.
        </h2>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex max-w-[580px] flex-col gap-6">
          <p className="serif text-[26px] italic leading-[36px] tracking-[-0.012em]">
            You help organizations make sense of complexity. You think in systems, design interfaces, build prototypes, understand engineering constraints, and read the cultural implications of technology. That combination is rare.
          </p>
          <p className="text-[15px] leading-[24px] text-paper/70">
            The new brand should make that value visible quickly. For a museum, that may mean a more thoughtful visitor experience. For a startup, it may mean a bridge between design and engineering before the team is fully built. For a larger technology company, it may mean senior creative and technical judgment on a project that needs shape, taste, and momentum.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[560px] flex-col gap-3">
          <span className="eyebrow pb-3 text-paper/50">What the brand can unlock</span>
          {opportunityLines.map((line, index) => (
            <p key={line} className={`serif text-[22px] leading-[34px] tracking-[-0.012em] ${index === opportunityLines.length - 1 ? 'text-paper/45' : 'text-paper'}`}>
              {index === opportunityLines.length - 1 ? `- ${line}` : line}
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
          A new studio identity with enough structure to move and enough room to grow.
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
            From years of source material to a focused new studio brand.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Six phases over four to five weeks. Discovery shapes strategy. Strategy informs identity and narrative. Identity and narrative guide the website direction. Case study framing and a clean handoff bring the system together.
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
              <p className="text-[13px] leading-[20px] text-ink-2">Deliverable - {phase.deliverable}</p>
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
            Everything Soup to Software walks away with.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            A complete system across strategy, identity, narrative, and website direction, packaged for immediate use and flexible enough to grow with the studio.
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
              const number = group.start + index
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
      <MetaRow left="§ 07 - Timeline" right="4 to 5 weeks" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            From discovery to handoff in four to five weeks.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Four phases, sequenced so the work builds with intention. Discovery and synthesis surface the strategy. Identity, narrative, and website direction take shape in parallel. A clean handoff brings the system together. A July start may give the project the most room to be thoughtful and collaborative.
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
      <MetaRow left="§ 08 - Investment" right="Core engagement" dark />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[620px] text-[56px] leading-[58px] tracking-[-0.026em] md:text-[96px] md:leading-[92px]">
            The core engagement.
          </h2>
        </Reveal>
        <Reveal className="lg:text-right">
          <span className="display block text-[78px] leading-[82px] tracking-[-0.03em] md:text-[118px] md:leading-[112px]">$12,000</span>
          <span className="text-[13px] leading-[18px] text-paper/55">Core engagement</span>
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
          <span className="serif text-[28px] leading-[34px]">Core engagement</span>
          <span />
          <span className="serif text-[46px] leading-[50px] tracking-[-0.02em] md:text-right">$12,000</span>
        </div>
      </Reveal>
      <Reveal className="mt-10 grid gap-8 border border-paper/20 p-8 lg:grid-cols-[1.1fr_1fr_180px] lg:p-10">
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-paper/55">Recommended add-on</span>
          <h3 className="serif text-[36px] leading-[42px] tracking-[-0.016em]">Naming review and name recommendation.</h3>
          <p className="text-[14px] leading-[22px] text-paper/70">Soup to Software has energy, but this is a good moment to pressure-test whether it gives the studio enough room to grow.</p>
          <p className="text-[14px] leading-[22px] text-paper/70">As the work expands across AI, systems, prototypes, cultural experiences, tools, and strategy, "software" may become too narrow. A stronger name could create more range, more intrigue, and a clearer point of view.</p>
          <p className="text-[14px] leading-[22px] text-paper/70">This add-on gives us space to evaluate the current name, explore light alternatives, and recommend the strongest long-term direction before building the identity around it.</p>
        </div>
        <div className="flex flex-col gap-2">
          {addOnItems.map((item) => (
            <div key={item} className="flex items-baseline gap-3">
              <span className="h-1 w-1 shrink-0 rounded-full bg-paper/70" />
              <span className="text-[13px] leading-[20px]">{item}</span>
            </div>
          ))}
        </div>
        <div className="lg:text-right">
          <span className="serif block text-[44px] leading-[48px] tracking-[-0.018em]">+$2,500</span>
          <span className="eyebrow text-paper/55">Brings total to $14,500</span>
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
            After this phase, the studio has room to keep building.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Once the foundation is in place, we can stay involved as the studio evolves. That may mean lighter advisory support during your build, expanded materials, or additional structure for the practice as it grows into the next chapter.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-20">
        {futureColumns.map(([title, items]) => (
          <Reveal key={title} className="border-t border-[var(--color-rule)] pt-4">
            <span className="eyebrow text-ink-2">{title}</span>
            <div className="pt-4">
              {items.map((item, index) => (
                <div key={item} className={`flex items-center gap-4 py-4 ${index < items.length - 1 ? 'border-b border-[#DDD8CD]' : ''}`}>
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
      <MetaRow left="§ 10 - Next step" right="Reserve the project window" />
      <Reveal className="mt-16 border border-[var(--color-rule)] p-8 md:p-14 lg:p-16">
        <div className="flex flex-col gap-8 border-b border-[var(--color-rule)] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display max-w-[720px] text-[52px] leading-[56px] tracking-[-0.026em] md:text-[80px] md:leading-[80px]">
            Reserve the project window and choose the right kickoff timing.
          </h2>
          <div className="lg:text-right">
            <span className="display block text-[70px] leading-[74px] tracking-[-0.03em] md:text-[88px] md:leading-[88px]">$12,000</span>
            <span className="text-[13px] leading-[18px] text-ink-2">Core engagement · 4-5 weeks</span>
          </div>
        </div>
        <div className="grid gap-10 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[480px_1fr]">
          <p className="text-[15px] leading-[24px] text-ink-2">
            If this direction feels aligned, the next step is to reserve the project window with a deposit and schedule kickoff for the timing that gives you the most room to participate fully. From there, we review the existing material, align on the creative direction, and begin shaping the new studio brand.
          </p>
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ink-2">From kickoff, the studio gets -</span>
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
      <MetaRow left="§ 11 - Closing" right="Anchovies × Soup to Software · 2026" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[48px] leading-[52px] tracking-[-0.024em] md:text-[86px] md:leading-[84px] lg:text-[104px] lg:leading-[100px]">
          Build the public face for the practice you're becoming.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-paper/20 pt-10 lg:flex-row lg:items-start lg:justify-between">
        <Reveal className="max-w-[640px]">
          <p className="text-[17px] leading-[28px] text-paper/70">
            Designed, edited, and structured to carry your voice into a more focused professional presence. Clear enough to move forward. Flexible enough to keep the work yours.
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
        <span className="eyebrow">Prepared for Jono Brandel</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">May 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function SoupToSoftwareProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Soup to Software — Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A strategy, identity, narrative, and website direction proposal for Soup to Software from Anchovies.')
    }
  }, [])

  return (
    <main className="soup-to-software-proposal bg-paper text-ink">
      <SoupNav />
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
