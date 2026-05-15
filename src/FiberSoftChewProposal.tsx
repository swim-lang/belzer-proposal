import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const approveHref = 'mailto:sean@anchovies.agency?subject=Fiber%20Soft%20Chew%20Proposal%20Approval'
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
    title: 'Name',
    body: 'A memorable, practical, ownable first impression for packaging, search, social, and conversation.',
  },
  {
    label: 'Pillar 02',
    title: 'Identity',
    body: 'A visual system that makes the soft chew format feel premium, intentional, and easy to recognize.',
  },
  {
    label: 'Pillar 03',
    title: 'Packaging',
    body: 'Mockups and direction for the wrap, box, pouch, or related format before production decisions lock in.',
  },
  {
    label: 'Pillar 04',
    title: 'Launch',
    body: 'A starter social and marketing idea that gives TikTok Shop, content, and product education a sharper path.',
  },
]

const heardSignals = [
  [
    'T-01',
    'You see fiber as a category with open space.',
    'The category has functional products, but there is room for something more satisfying, portable, and habit-friendly.',
  ],
  [
    'T-02',
    'The product format is the advantage.',
    'Individually wrapped soft chews can borrow from candy, wellness, beauty, food, and supplements while creating a more desirable daily ritual.',
  ],
  [
    'T-03',
    'Packaging is central to the brand.',
    'The individual wrap, texture, size, tactility, and shelf impression all need to be part of the creative foundation.',
  ],
  [
    'T-04',
    'Manufacturing is already in motion.',
    'You are speaking with manufacturers, and the brand can help guide smarter production, packaging, and supplier conversations.',
  ],
  [
    'T-05',
    'Naming and copywriting matter to you.',
    'The thinking behind the creative decisions should be visible: name rationale, tone, category position, and the story behind the product.',
  ],
  [
    'T-06',
    'TikTok Shop may be an early path to market.',
    'That makes the product concept, packaging reveal, social angle, and first marketing idea especially important.',
  ],
]

const opportunityLines = [
  'It can feel clean enough for the supplement aisle.',
  'It can feel satisfying enough for a candy-like experience.',
  'It can feel premium enough for a modern CPG customer.',
  'It can feel simple enough for TikTok Shop and social discovery.',
  'It can feel distinctive enough to create curiosity before the product is tasted.',
]

const creationPillars = [
  {
    label: 'Foundation 01 - Naming',
    title: 'A name that gives the brand a strong first impression.',
    body: 'Naming is the first strategic decision. The name needs to work on packaging, in search, in social content, in conversation, and eventually on shelf.',
    note: 'We will explore directions that can carry the product personality, format, and category position while checking practical barriers like domain availability and obvious trademark conflicts.',
  },
  {
    label: 'Foundation 02 - Identity',
    title: 'A visual identity that makes the format feel premium.',
    body: 'The brand should make the product feel intentional from the beginning. Logo, color, type, visual language, tone, and application all need to support the soft chew experience.',
    note: 'Because packaging is central, we will test the identity through mockups for the wrap, box, pouch, or related formats.',
  },
  {
    label: 'Foundation 03 - Voice',
    title: 'A tone of voice with clarity and charm.',
    body: 'Supplements can become too clinical, too wellness-coded, or too cute. This product has a chance to speak with more clarity and confidence.',
    note: 'The starter voice will support packaging, product copy, social captions, and the first version of the website later.',
  },
  {
    label: 'Foundation 04 - Social',
    title: 'A first social and marketing idea.',
    body: 'We will define the core idea early content can build from, including launch themes, TikTok Shop considerations, education angles, and packaging reveal concepts.',
    note: 'This is creative direction for launch, not daily social media management.',
  },
]

const phases = [
  {
    num: '01',
    title: 'Discovery and creative direction.',
    body: 'We begin with a focused discovery session around the product, customer, category, manufacturing considerations, and creative ambition. This clarifies the brand lane before naming and design begin.',
    deliverable: 'Creative direction summary, moodboard, brand and category observations, and initial direction for naming, identity, and packaging.',
    includes: [
      'Founder and product discovery',
      'Customer and use-case discussion',
      'Category and competitor review',
      'Naming direction discussion',
      'Packaging format discussion',
      'Tone and voice direction',
      'Visual territory exploration',
      'Creative direction moodboard',
    ],
  },
  {
    num: '02',
    title: 'Brand naming.',
    body: 'A focused naming sprint to develop one recommended name direction that is memorable, practical, ownable, and appropriate for a fiber soft chew product with a premium CPG feel.',
    deliverable: 'A focused naming recommendation with rationale, availability notes, and a clear path forward.',
    includes: [
      'Naming brief',
      'Name territory exploration',
      'Initial name development',
      'One recommended name direction',
      'Domain availability scan',
      'Social handle scan where applicable',
      'Preliminary trademark knockout review',
      'Name rationale',
      'Final name recommendation',
    ],
  },
  {
    num: '03',
    title: 'Brand identity system.',
    body: 'Once the name direction is selected, we develop the core visual identity. We lead with the strongest recommended direction so the work has enough depth to stand out.',
    deliverable: 'A complete starter identity system for packaging, social, digital, and future ecommerce.',
    includes: [
      'Primary logo',
      'Secondary logo or lockup',
      'Symbol or brand mark if appropriate',
      'Typography system',
      'Color palette',
      'Graphic language or motif',
      'Art direction',
      'Starter tone of voice',
      'Core copy lines',
      'Brand applications',
      'Social/profile asset direction',
      'Foundational brand guide',
    ],
  },
  {
    num: '04',
    title: 'Packaging direction and mockups.',
    body: 'Packaging mockups help test whether the name, logo, color, type, and brand idea can work in the physical format that makes the product unique.',
    deliverable: 'Packaging mockups and visual recommendations that support manufacturer and supplier conversations.',
    includes: [
      'Packaging concept direction',
      'Individual wrap mockup',
      'Outer box, pouch, or carton mockup',
      'Flavor or variant direction if applicable',
      'Material and tactile considerations',
      'Packaging copy direction',
      'Shelf and hand-feel considerations',
      'High-level production notes',
    ],
  },
  {
    num: '05',
    title: 'Social and launch idea.',
    body: 'A first strategic direction for how the brand can begin to show up socially. This is the creative idea and content direction that can guide the first phase of launch.',
    deliverable: 'A concise social and launch direction for early content, TikTok Shop, and future social planning.',
    includes: [
      'Launch content themes',
      'TikTok Shop considerations',
      'Social tone direction',
      'Content idea starters',
      'Product education angles',
      'Packaging reveal direction',
      'Starter campaign idea',
    ],
  },
  {
    num: '06',
    title: 'Final handoff.',
    body: 'We package the final name, identity, packaging direction, and starter voice into an organized handoff that can support the next phase of launch planning.',
    deliverable: 'A clean starter brand system for manufacturing conversations, packaging development, social planning, and ecommerce.',
    includes: [
      'Final logo exports',
      'Color and typography guidance',
      'Starter brand guide',
      'Packaging mockups',
      'Core copy lines',
      'Social and launch direction',
      'Web-ready assets',
      'Organized final files',
    ],
  },
]

const deliverables = [
  'Creative direction summary',
  'Moodboard',
  'Brand naming recommendation',
  'Domain availability scan',
  'Social handle scan where applicable',
  'Preliminary trademark knockout review',
  'Final recommended name',
  'Primary logo',
  'Secondary logo or lockup',
  'Symbol or brand mark if appropriate',
  'Typography system',
  'Color palette',
  'Graphic language or motif',
  'Starter tone of voice',
  'Core copy lines',
  'Packaging concept direction',
  'Individual wrap mockup',
  'Outer packaging mockup',
  'Social and launch idea',
  'Starter brand guide',
  'Final asset exports and handoff',
]

const timeline = [
  ['Week 1', 'Discovery + naming start', 'Discovery, category review, creative direction, naming brief, and initial name development.'],
  ['Week 2', 'Naming + visual direction', 'Naming presentation, name refinement, final name selection, identity exploration, and visual direction.'],
  ['Week 3', 'Identity + packaging', 'Brand identity presentation, packaging mockups, tone of voice, and social and launch idea.'],
  ['Week 4', 'Refinement + handoff', 'Refinement, starter brand guide, final exports, and organized handoff.'],
]

const investmentLines = [
  [
    '01',
    'Brand naming',
    'Naming brief, name exploration, one recommended name direction, domain scan, social handle scan where applicable, preliminary trademark knockout review, rationale, and final recommendation.',
    '$950',
  ],
  [
    '02',
    'Brand identity system',
    'Logo system, color, typography, visual language, tone of voice, core copy lines, packaging mockups, social and launch direction, starter brand guide, and final exports.',
    '$4,900',
  ],
]

const paymentMilestones = [
  ['50%', 'Due at kickoff', 'Project starts when the kickoff invoice is paid.'],
  ['50%', 'Due before final handoff', 'Before the final asset handoff and starter brand guide delivery.'],
]

const whyNow = [
  'What the product is called',
  'How the packaging feels in the hand',
  'How the individual wrap looks',
  'How the box or pouch presents itself',
  'How the product is described',
  'How it appears on TikTok Shop',
  'How Shopify should eventually be designed',
  'How the brand separates itself from powders, gummies, and other supplement formats',
]

const futureColumns = [
  ['Launch + ecommerce', ['Shopify website design and development', 'TikTok Shop launch support', 'Product page copywriting', 'Launch campaign concept']],
  ['Packaging + content', ['Production packaging design', 'Flavor or variant system', 'Social content templates', 'Photography art direction']],
  ['Growth + adjacent work', ['Investor or manufacturer pitch materials', 'Ongoing brand expansion', 'Nonprofit website conversation', 'Future product extensions']],
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
  href = approveHref,
  variant = 'dark',
}: {
  children: string
  href?: string
  variant?: 'dark' | 'outline'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'outline'
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

function FiberNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Harikrishna Patel</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Naming and Brand Identity · v1</span>
          <span className="eyebrow">May 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] tracking-[-0.01em] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              Fiber Soft Chew
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
            <a href={approveHref} className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-ink-2 whitespace-nowrap">
              Approve proposal
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
          <span className="eyebrow text-ink-2">Naming · Brand Identity · Packaging Direction</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Fiber Soft Chew · CPG Brand</span>
          <span className="eyebrow text-ink-2">Prepared for Harikrishna Patel</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1180px] pb-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[120px] lg:leading-[104px]">
          A brand for a supplement people want to reach for.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            A naming and identity phase for a fiber soft chew with a candy-like experience, premium feel, and the potential to become an easier daily habit.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            This first phase builds the foundation before manufacturing, Shopify, TikTok Shop, and launch planning begin: naming, identity, tone, packaging direction, and a first marketing idea.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Approve proposal ->'}</AnchorButton>
            <AnchorButton href={workHref} variant="outline">
              View our work
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 - What this phase creates" right="Four pillars" />
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
            You have a product idea in a category ready for a new expression.
          </h2>
          <div className="flex max-w-[460px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
            <p>You are coming into CPG from tech, product, nonprofit work, and startup experience. That gives you a useful mix of product thinking, business discipline, and creative curiosity.</p>
            <p>Fiber is often associated with powders, gummies, chalky routines, and products people take because they feel they should. Your idea moves the category into a more satisfying format.</p>
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
          This is an opportunity to make daily fiber feel more desirable.
        </h2>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex max-w-[580px] flex-col gap-6">
          <p className="serif text-[26px] italic leading-[36px] tracking-[-0.012em]">
            The category has plenty of functional products. The opening is to create a brand with more pleasure, more clarity, and a more memorable format.
          </p>
          <p className="text-[15px] leading-[24px] text-paper/70">
            The soft chew gives us a real design advantage. It can borrow cues from candy, wellness, beauty, food, and supplements while becoming specific to its own ritual.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[560px] flex-col gap-3">
          <span className="eyebrow pb-3 text-paper/50">What the brand can hold</span>
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
      <MetaRow left="§ 04 - What this phase creates" right="Naming, identity, voice, launch" />
      <Reveal>
        <h2 className="display max-w-[920px] py-16 text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
          Simple, ownable, pressworthy, and ready for the next stage.
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
            A focused path from product idea to starter brand system.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Six phases over 3-4 weeks. We start with discovery and creative direction, move into naming, build the starter identity, test it through packaging, shape the launch idea, and package everything for handoff.
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
      <Reveal className="mt-10 border border-[var(--color-rule)] p-8">
        <span className="eyebrow text-ink-2">Important note</span>
        <p className="mt-4 max-w-[920px] text-[14px] leading-[22px] text-ink-2">
          Trademark review in this phase is a preliminary knockout check for obvious conflicts. Formal trademark clearance, registration, and legal advice should be handled by an attorney before final production or launch.
        </p>
      </Reveal>
    </section>
  )
}

function Deliverables() {
  return (
    <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 06 - Final deliverables" right="21 items" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            Everything this first phase hands off.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            A clear starter system that can support manufacturing conversations, packaging development, social planning, and the next phase of ecommerce.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid gap-0 border-y border-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-3">
        {deliverables.map((item, index) => (
          <div key={item} className="grid grid-cols-[58px_1fr] gap-4 border-b border-[#DDD8CD] p-5 md:min-h-[86px]">
            <span className="eyebrow text-ink-2">D-{String(index + 1).padStart(2, '0')}</span>
            <span className="text-[14px] leading-[20px]">{item}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 07 - Timeline" right="3 to 4 weeks" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            From discovery to handoff in three to four weeks.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Timeline may shift depending on feedback speed, name approval, availability checks, and any manufacturing or packaging constraints that emerge during the process.
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
      <MetaRow left="§ 08 - Investment" right="First phase" dark />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[620px] text-[56px] leading-[58px] tracking-[-0.026em] md:text-[96px] md:leading-[92px]">
            Total first phase investment.
          </h2>
        </Reveal>
        <Reveal className="lg:text-right">
          <span className="display block text-[78px] leading-[82px] tracking-[-0.03em] md:text-[118px] md:leading-[112px]">$5,850</span>
          <span className="text-[13px] leading-[18px] text-paper/55">Naming and brand identity</span>
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
          <span className="serif text-[28px] leading-[34px]">First phase investment</span>
          <span />
          <span className="serif text-[46px] leading-[50px] tracking-[-0.02em] md:text-right">$5,850</span>
        </div>
      </Reveal>
      <Reveal className="mt-14 border-t border-paper/20 pt-8">
        <MetaRow left="Payment structure" right="Two milestones" dark />
        <div className="grid gap-6 lg:grid-cols-2">
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

function WhyFirstPhase() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 09 - Why this first" right="Before larger investments begin" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            The next decisions will be shaped by the brand.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            This phase gives the brand a name, a look, a voice, and a first sense of packaging before the larger investments begin. Starting here makes each next step clearer.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid gap-0 border-y border-[var(--color-rule)] md:grid-cols-2">
        {whyNow.map((item, index) => (
          <div key={item} className="grid grid-cols-[46px_1fr] gap-4 border-b border-[#DDD8CD] p-5">
            <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')}</span>
            <span className="serif text-[22px] leading-[30px] tracking-[-0.012em]">{item}</span>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-10 border border-[var(--color-rule)] p-8">
        <span className="eyebrow text-ink-2">Out of scope for this phase</span>
        <p className="mt-4 max-w-[980px] text-[14px] leading-[22px] text-ink-2">
          This phase does not include production-ready dielines, nutrition panels, supplement facts formatting, barcode setup, regulatory claim review, vendor coordination, or print-ready mechanical files. Those can be added later once the packaging format and supplier requirements are confirmed.
        </p>
      </Reveal>
    </section>
  )
}

function FutureOpportunities() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 10 - Future opportunities" right="After this phase" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            After the foundation, the launch system can grow.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            After this first phase, we can support additional needs as the product moves closer to launch. We can also have a separate conversation about the nonprofit website project when the timing is right.
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
      <MetaRow left="§ 11 - Next step" right="Approve proposal" />
      <Reveal className="mt-16 border border-[var(--color-rule)] p-8 md:p-14 lg:p-16">
        <div className="flex flex-col gap-8 border-b border-[var(--color-rule)] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display max-w-[720px] text-[52px] leading-[56px] tracking-[-0.026em] md:text-[80px] md:leading-[80px]">
            Begin with naming, identity, and packaging direction.
          </h2>
          <div className="lg:text-right">
            <span className="display block text-[70px] leading-[74px] tracking-[-0.03em] md:text-[88px] md:leading-[88px]">$5,850</span>
            <span className="text-[13px] leading-[18px] text-ink-2">First phase · 3-4 weeks</span>
          </div>
        </div>
        <div className="grid gap-10 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[480px_1fr]">
          <p className="text-[15px] leading-[24px] text-ink-2">
            If this direction feels aligned, we start with discovery, move into naming, select the strongest path, then build the starter identity and packaging direction around it.
          </p>
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ink-2">From kickoff, the brand gets -</span>
            {['Creative direction', 'Naming presentation and recommendation', 'Starter identity system', 'Packaging mockups', 'Tone of voice and core copy lines', 'Social and launch direction'].map((item, index) => (
              <div key={item} className="grid grid-cols-[42px_1fr]">
                <span className="text-[14px] leading-[22px] text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[14px] leading-[22px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-8">
          <AnchorButton>{'Approve proposal ->'}</AnchorButton>
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
      <MetaRow left="§ 12 - Closing" right="Anchovies x Fiber Soft Chew · 2026" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[48px] leading-[52px] tracking-[-0.024em] md:text-[86px] md:leading-[84px] lg:text-[104px] lg:leading-[100px]">
          A clearer first form before the bigger launch decisions begin.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-paper/20 pt-10 lg:flex-row lg:items-start lg:justify-between">
        <Reveal className="max-w-[640px]">
          <p className="text-[17px] leading-[28px] text-paper/70">
            Name, look, voice, packaging direction, and a first marketing idea - built to make the next decisions sharper.
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
        <span className="eyebrow">Prepared for Harikrishna Patel</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">May 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function FiberSoftChewProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Fiber Soft Chew - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A naming and brand identity proposal for a fiber soft chew CPG brand from Anchovies.')
    }
  }, [])

  return (
    <main className="fiber-soft-chew-proposal bg-paper text-ink">
      <FiberNav />
      <Hero />
      <WhatWeHeard />
      <Opportunity />
      <WorkCreates />
      <Approach />
      <Deliverables />
      <Timeline />
      <Investment />
      <WhyFirstPhase />
      <FutureOpportunities />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
