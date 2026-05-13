import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const contractHref = '/proposal/genesi/contract'
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
    body: 'A brand identity with authority and taste: logo, typography, color, and a system built for influence work.',
  },
  {
    label: 'Pillar 02',
    title: 'Site',
    body: 'A focused website that feels established: concise, premium, and built to create confidence quickly.',
  },
  {
    label: 'Pillar 03',
    title: 'System',
    body: 'A client communication kit: proposals, capital updates, briefings, memos, business cards, and every client-facing send.',
  },
  {
    label: 'Pillar 04',
    title: 'Visibility',
    body: 'A foundation for visibility, hiring, and growth: airport ads, motion, recruiting collateral, and public presence.',
  },
]

const heardSignals = [
  [
    'T-01',
    'You have a strong sense of taste, and recognize when design is working.',
    'That sets a high bar from the start. The work has to earn its place.',
  ],
  [
    'T-02',
    'You want something bespoke, specific, and crafted with intention.',
    'Not generic legal or government affairs design. Not a template. Something built to feel like Genesi, not like everyone else.',
  ],
  [
    'T-03',
    'You need a brand that grows with you: hire, partner, scale, or stay lean.',
    'The system has to handle a one-person firm and a 25-person firm without breaking. Designed once, built to flex.',
  ],
  [
    'T-04',
    'The website should be focused and professional without becoming bloated.',
    'Restraint, not volume. A few pages done at a high level, not a sprawling marketing site.',
  ],
  [
    'T-05',
    'Client-facing assets need a consistent look and feel.',
    'Proposals, capital updates, budget briefings, letterhead, business cards, memos: every send should feel like it came from the same firm.',
  ],
  [
    'T-06',
    "You're thinking long term: airport ads, public-facing brand presence.",
    'The brand has to be ready for the visibility moments before they happen, not designed reactively when an opportunity shows up.',
  ],
  [
    'T-07',
    'You already have high-value clients. The brand should feel equal to the rooms.',
    "Healthcare, energy, infrastructure, tax, technology, privacy. The presentation has to match the work that's already happening.",
  ],
]

const designOutcomes = [
  "Existing clients feel they're working with a serious firm.",
  'Future clients understand the sophistication behind the work.',
  'Stronger staff and partners are easier to attract.',
  'Every proposal, memo, and update lives in one system.',
  'A firm that feels established from the beginning.',
]

const creationPillars = [
  {
    label: 'Pillar 01 - Identity',
    title: 'A brand identity with authority and taste.',
    body: 'A visual identity system that feels specific to you and the world you operate in. The work should carry weight, intelligence, restraint, and a strong point of view.',
    note: 'Logo, typography, color, visual language, and the foundational rules that make the identity usable across digital, print, client materials, advertising, and future firm growth.',
  },
  {
    label: 'Pillar 02 - Site',
    title: 'A focused website that feels established.',
    body: 'The website should be concise, premium, and clear. It should create confidence quickly, frame your experience, and give clients, prospects, and future hires a strong first impression.',
    note: 'Restrained, sharp, elegant, and built for a high-trust professional services environment. A natural extension of the brand, not a separate marketing channel.',
  },
  {
    label: 'Pillar 03 - System',
    title: 'A client communication system.',
    body: 'The most practical part of the project. You need more than a logo and website: you need a system for the materials you send every month.',
    note: 'Proposals, capital updates, budget briefings, memos, and client-facing documents should feel like they came from the same firm, with the same level of care.',
  },
  {
    label: 'Pillar 04 - Visibility',
    title: 'A foundation for visibility, hiring, and growth.',
    body: 'The brand should be strong enough for future use across airport ads, event materials, digital campaigns, presentation decks, recruiting materials, office signage, and partnership conversations.',
    note: 'Even if those touchpoints are phased in later, the system should be ready for them: designed before the moment, not reactive to it.',
  },
]

const phases = [
  {
    num: '01',
    title: 'Discovery, positioning, and market research.',
    body: 'A focused discovery process to understand the firm, the client base, the long-term growth path, and the kind of presence the brand needs to project. We align on the strategic foundation before moving into identity and website design.',
    deliverable: 'Brand direction summary, visual moodboard, positioning language, and creative direction.',
    includes: [
      'Founder + firm discovery',
      'Positioning alignment',
      'Government affairs category review',
      'Competitive visual audit',
      'Client + prospect context',
      'Visual territory exploration',
      'Tone + personality direction',
    ],
  },
  {
    num: '02',
    title: 'Brand identity and design system.',
    body: 'We design a complete identity system for Genesi: logo, typography, color, and supporting visual language. We consider how the identity behaves across different levels of formality.',
    deliverable: 'A complete visual identity system that gives the firm a polished, repeatable design language across digital, print, and client-facing materials.',
    includes: [
      'Primary logo + secondary lockups',
      'Symbol or brand mark',
      'Premium typeface selection + licensing',
      'Color palette + graphic language',
      'Layout + spacing principles',
      'Business card, letterhead, signature',
      'Brand applications + mockups',
    ],
  },
  {
    num: '03',
    title: 'Website design and build.',
    body: 'We design and build a focused website presence for Genesi. The current site has done its job as a fast public presence; this phase gives the firm a more refined, memorable, and established digital home.',
    deliverable: 'A focused, premium website that gives Genesi a strong first impression and a flexible public presence that can grow over time.',
    includes: [
      'Website strategy + structure',
      'Home, About, Services, Clients pages',
      'Insights and Contact pages',
      'Desktop + mobile design',
      'Website build + responsive layout',
      'Contact form + foundational SEO',
      'Analytics setup + launch support',
    ],
  },
  {
    num: '04',
    title: 'Client communication, hiring, and visibility system.',
    body: 'We create a practical system for the materials you send to clients, prospects, partners, and potential hires. This is where the brand becomes part of your daily work.',
    deliverable: 'A suite of branded materials that allows every major communication to feel consistent, polished, and easy to use.',
    includes: [
      'Proposal template',
      'Digital presentation deck template',
      'Capital update + budget briefing templates',
      'Client memo + bulletin templates',
      'Partnering + hiring collateral',
      'Recruiting one-sheet',
      'Airport ad + LinkedIn visibility concepts',
    ],
  },
  {
    num: '05',
    title: 'Digital brand guide and handoff.',
    body: 'We package the system into a clear, usable brand guide: the reference point for future designers, developers, vendors, staff, or partners.',
    deliverable: 'A practical brand guide and organized asset handoff that gives the firm a clear system to use and build from on day one.',
    includes: [
      'Logo + typography + color usage',
      'Visual language guidance',
      'Website direction + components',
      'Document system guidance',
      'Visibility notes + future use',
      'Exported logo + web assets',
      'Print-ready files + template handoff',
    ],
  },
]

const deliverableGroups = [
  {
    title: 'Strategy + identity',
    meta: '14 items',
    items: [
      'Brand discovery + positioning summary',
      'Competitive visual audit',
      'Visual direction moodboard',
      'Primary logo',
      'Secondary logo or lockup',
      'Symbol or brand mark',
      'Premium typography system',
      'Color palette',
      'Graphic language or motif',
      'Brand applications + mockups',
      'Foundational brand guide',
      'Website design + build',
      'Responsive mobile website',
      'Foundational SEO + analytics setup',
    ],
  },
  {
    title: 'System + visibility',
    meta: '14 items',
    start: 15,
    items: [
      'Proposal template',
      'Digital presentation deck template',
      'Capital update template',
      'Budget briefing template',
      'Client memo or bulletin template',
      'Partnering collateral',
      'Hiring collateral',
      'Recruiting one-sheet',
      'Business card design',
      'Letterhead design',
      'Email signature',
      'Short logo or brand animation',
      'Airport ad concept direction',
      'LinkedIn visibility concept + handoff',
    ],
  },
]

const timeline = [
  ['Week 1-2', 'Discovery + direction', 'Discovery, positioning alignment, market and category review, visual direction, moodboard presentation.'],
  ['Week 3-5', 'Brand identity', 'Logo exploration, identity system, typography and color, brand applications, presentation, refinement.'],
  ['Week 5-8', 'Website + communication system', 'Website structure, design, build. Proposal template, briefing templates, client document system.'],
  ['Week 8-10', 'Visibility + handoff', 'Logo animation, airport ad concept, LinkedIn visibility concept, brand guide, final asset handoff, launch support.'],
]

const investmentLines = [
  ['01', 'Discovery, positioning, and market research', 'Founder discovery, positioning alignment, category review, competitive visual audit, client and prospect context, creative direction.', '$3,500'],
  ['02', 'Brand identity and design system', 'Logo, lockups, mark, premium typography, color, visual language, applications, mockups, and foundational brand guide.', '$14,500'],
  ['03', 'Website design and build', 'Website structure, desktop and mobile design, build, contact form, foundational SEO, analytics, launch support.', '$14,000'],
  ['04', 'Client communication, hiring, and visibility system', 'Proposal template, deck template, briefing templates, memo system, partnering and hiring collateral, business card, letterhead, motion, visibility concepts.', '$6,500'],
]

const retainerSupport = [
  'Priority post-launch support',
  'Website updates and refinements',
  'New collateral and template edits',
  'Proposal, deck, memo, or briefing support',
  'Vendor coordination and design oversight',
  'Used as needed at $125/hour',
]

const paymentMilestones = [
  ['50%', 'Due at kickoff', 'Project starts when the kickoff invoice is paid.'],
  ['25%', 'Due after identity presentation', 'Once the brand identity has been presented and approved.'],
  ['25%', 'Due before final handoff', 'Before the final asset handoff and launch support.'],
]

const futureColumns = [
  ['Brand + visibility', ['Airport advertising rollout', 'Recruiting materials', 'Event or sponsorship materials', 'Partner or hiring collateral']],
  ['Site + presence', ['Ongoing website updates', 'Expanded proposal systems', 'Client experience tools', 'Public-facing brand campaigns']],
  ['Custom AI-enabled tools', ['AI-enabled briefing workflows', 'Internal knowledge tools', 'Legislative + policy update systems', 'Document experiences + automation']],
]

const kickoffGives = [
  'A strategic foundation: positioning + creative direction',
  'A complete identity system',
  'A focused, premium website',
  'A practical client communication system',
  'A foundation for visibility and hiring',
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
  href = contractHref,
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

function GenesiNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Chad Mayes · Genesi</span>
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
              Genesi
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
            <a href={contractHref} className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
              Sign contract
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
          <span className="eyebrow text-ink-2">Brand · Site · Communication system</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Genesi · Government Affairs</span>
          <span className="eyebrow text-ink-2">Prepared for Chad Mayes</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1200px] pb-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[128px] lg:leading-[108px]">
          A presence equal to the rooms you&apos;re already in.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            A refined identity, a focused website, and a professional communication system: designed to make every Genesi touchpoint feel equal to the rooms you are already in.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            You have already built the hardest part: reputation, relationships, trust, and a client list most new firms would be lucky to have. What&apos;s next is giving Genesi a system that can carry that reputation with the same level of polish, judgment, and confidence.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton href={contractHref}>{'Sign contract ->'}</AnchorButton>
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
            You have spent your career around presentation that has power.
          </h2>
          <div className="flex max-w-[460px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
            <p>Public life, campaigns, government, influence. You know what it feels like when a brief, a logo, or a room is working, and when it isn&apos;t.</p>
            <p>The current Genesi site was created quickly because you needed a public presence. That was the right move for the moment. The firm is now ready for a more considered expression.</p>
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
          Government affairs is an influence business.
        </h2>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex max-w-[580px] flex-col gap-6">
          <p className="serif text-[26px] italic leading-[36px] tracking-[-0.012em]">
            Before a meeting begins, people are reading signals: the quality of a proposal, the restraint of a logo, the confidence of a website, the clarity of a briefing, the way a name appears on a card.
          </p>
          <p className="text-[15px] leading-[24px] text-paper/70">
            Those details shape perception. For a firm like Genesi, the brand should feel like a well-cut suit, a finely chosen watch, or a sharp policy brief handed across a table. Quiet, precise, and built with care.
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
          Enough presence for today. Enough structure for what comes next.
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
      <MetaRow left="§ 05 - Our approach" right="Five phases" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            A clear path from positioning to handoff.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Five phases over 8-10 weeks. We start with strategic foundation, move into identity and website, build the communication system, then package everything for the firm to use and grow from.
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
            Everything Genesi walks away with.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            A complete system across strategy, identity, website, communication, and visibility: packaged for immediate use and long-term growth.
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
      <MetaRow left="§ 07 - Timeline" right="8 to 10 weeks" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            From discovery to handoff in eight to ten weeks.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Four phases, sequenced so each round of work feeds the next. Identity informs the website. Website confirms the system. The system flows into a usable brand guide.
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
            Across all four.
          </h2>
        </Reveal>
        <Reveal className="lg:text-right">
          <span className="display block text-[78px] leading-[82px] tracking-[-0.03em] md:text-[118px] md:leading-[112px]">$30,000</span>
          <span className="text-[13px] leading-[18px] text-paper/55">Project total after budget accommodation</span>
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
        <div className="grid gap-4 border-b border-paper/20 py-8 md:grid-cols-[80px_320px_1fr_180px] md:items-center md:gap-8">
          <span className="eyebrow text-paper/55">Value</span>
          <span className="serif text-[28px] leading-[34px]">Recommended engagement</span>
          <span className="text-[13px] leading-[20px] text-paper/70">The full scope and deliverable set originally outlined above.</span>
          <span className="serif text-[46px] leading-[50px] tracking-[-0.02em] md:text-right">$38,500</span>
        </div>
        <div className="grid gap-4 border-b border-paper/20 py-8 md:grid-cols-[80px_320px_1fr_180px] md:items-center md:gap-8">
          <span className="eyebrow text-paper/55">Credit</span>
          <span className="serif text-[28px] leading-[34px]">Budget accommodation</span>
          <span className="text-[13px] leading-[20px] text-paper/70">Keeps the same deliverables and quality intact while bringing the project into the target budget.</span>
          <span className="serif text-[46px] leading-[50px] tracking-[-0.02em] md:text-right">-$8,500</span>
        </div>
        <div className="grid gap-4 py-8 md:grid-cols-[80px_320px_1fr_180px] md:items-center md:gap-8">
          <span className="eyebrow text-paper/55">Total</span>
          <span className="serif text-[28px] leading-[34px]">Project total</span>
          <span />
          <span className="serif text-[46px] leading-[50px] tracking-[-0.02em] md:text-right">$30,000</span>
        </div>
      </Reveal>
      <Reveal className="mt-10 grid gap-8 border border-paper/20 p-8 lg:grid-cols-[1.1fr_1fr_180px] lg:p-10">
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-paper/55">Optional ongoing support</span>
          <h3 className="serif text-[36px] leading-[42px] tracking-[-0.016em]">Retainer support.</h3>
          <p className="text-[14px] leading-[22px] text-paper/70">
            After launch, support can stay simple: priority access to Anchovies for updates, new materials, and refinements as they come up. Some months may be active, some may be quiet. Time is billed at the agreed hourly rate.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {retainerSupport.map((item) => (
            <div key={item} className="flex items-baseline gap-3">
              <span className="h-1 w-1 shrink-0 rounded-full bg-paper/70" />
              <span className="text-[13px] leading-[20px]">{item}</span>
            </div>
          ))}
        </div>
        <div className="lg:text-right">
          <span className="serif block text-[44px] leading-[48px] tracking-[-0.018em]">$125/hr</span>
          <span className="eyebrow text-paper/55">As needed after launch</span>
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
            As Genesi expands, we can support additional needs. Anchovies has been investing heavily in custom AI-enabled tools for professional services and law-adjacent industries: well-positioned for the next chapter when it&apos;s ready.
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
            Kick off the next chapter.
          </h2>
          <div className="lg:text-right">
            <span className="display block text-[70px] leading-[74px] tracking-[-0.03em] md:text-[88px] md:leading-[88px]">$30,000</span>
            <span className="text-[13px] leading-[18px] text-ink-2">$38,500 scope · $8,500 accommodation · 8-10 weeks</span>
          </div>
        </div>
        <div className="grid gap-10 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[480px_1fr]">
          <p className="text-[15px] leading-[24px] text-ink-2">
            If this direction feels aligned, we&apos;ll begin with a clear kickoff and move directly into building the brand, website, and communication system around Genesi. The goal is to create something that feels elevated from the start, gives the firm a sharper presence in the market, and sets the foundation for where you&apos;re taking the business next.
          </p>
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ink-2">From kickoff, Genesi gets —</span>
            {kickoffGives.map((item, index) => (
              <div key={item} className="grid grid-cols-[42px_1fr]">
                <span className="text-[14px] leading-[22px] text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[14px] leading-[22px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-8">
          <AnchorButton href={contractHref}>{'Sign contract ->'}</AnchorButton>
        </div>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 11 - Closing" right="Anchovies × Genesi · 2026" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[48px] leading-[52px] tracking-[-0.024em] md:text-[86px] md:leading-[84px] lg:text-[104px] lg:leading-[100px]">
          A firm that feels equal to the rooms it&apos;s already in.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-paper/20 pt-10 lg:flex-row lg:items-start lg:justify-between">
        <Reveal className="max-w-[640px]">
          <p className="text-[17px] leading-[28px] text-paper/70">
            Quiet, precise, and built with care. Designed once for today, with enough structure for the next twelve to fifteen years of how Genesi grows.
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
        <span className="eyebrow">Prepared for Chad Mayes · Genesi</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">May 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function GenesiProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Genesi — Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A brand, website, and communication system proposal for Genesi from Anchovies.')
    }
  }, [])

  return (
    <main className="genesi-proposal bg-paper text-ink">
      <GenesiNav />
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
