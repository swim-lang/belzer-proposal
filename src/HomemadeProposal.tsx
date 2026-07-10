import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = '#work'

type DetailRow = [string, string, string]
type LabelPair = [string, string]
type PriceRow = [string, string, string, string]
type TimelineRow = [string, string, string]
type Phase = {
  num: string
  title: string
  body: string
  deliverable: string
  includes: string[]
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'approach', label: 'Approach' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

const pillars: LabelPair[] = [
  ['Name', 'A name and language system that can be owned, remembered, searched, shared, and trusted.'],
  ['Identity', 'A cookbook-inspired brand world: warm, premium, useful, intimate, and built for a digital marketplace.'],
  ['Marketplace', 'A clear product experience for discovery, shop profiles, menus, ordering, hosting, and community signals.'],
  ['Prototype', 'A clickable concept that gives the backend build a visual target without pretending to be final app development.'],
]

const heardSignals: DetailRow[] = [
  ['T-01', 'You are building the platform small food businesses wish existed.', 'Homemade sits between Uber Eats, Etsy, Hot Plate, popups, and private hosting: a marketplace for people who are too small, too local, or too personal for the big delivery platforms.'],
  ['T-02', 'The seller pain is practical.', 'Home cooks should not have to maintain a website, domain, checkout setup, payment stack, and marketing surface just to sell what they make. The platform can absorb that friction.'],
  ['T-03', 'The experience needs to feel social without becoming noisy.', 'Likes, ratings, reviews, photos, opening-soon shops, and community signals can make the marketplace feel alive if they are designed with restraint.'],
  ['T-04', 'Privacy and hosting modes are part of the product.', 'Semi-public and private shops are not edge cases. They are central to the way popups, apartment dinners, and invite-based food moments actually happen.'],
  ['T-05', 'You can own the backend.', 'Because you are a software engineer, this proposal can focus on what you need most from us: naming, brand identity, UI/UX direction, and a prototype that makes the product feel specific.'],
  ['T-06', 'The current name may be hard to protect.', 'Homemade is clear and warm, but it is also broad. We should treat it as a working title and make naming a real strategic step before the brand goes public.'],
]

const opportunityLines = [
  'It can make local food feel easier to discover.',
  'It can make home cooks feel more legitimate without making them feel corporate.',
  'It can turn a shop link into a tiny world with menu, story, trust, and demand.',
  'It can give private popups and public sellers the same thoughtful product language.',
  'It can feel more like a cookbook community than another sterile marketplace.',
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery and creative direction.',
    body: 'We begin with the product, audience, category, competitor set, name risk, and the kind of world Homemade needs to create. This sets the direction before naming, identity, and interface work begin.',
    deliverable: 'Creative direction summary, category observations, naming point of view, and cookbook-inspired visual direction.',
    includes: [
      'Founder and product discovery',
      'Marketplace and competitor review',
      'Buyer and cook user paths',
      'Cookbook-inspired moodboard',
      'Name-risk discussion',
      'Tone and voice direction',
      'Product experience priorities',
      'Creative direction summary',
    ],
  },
  {
    num: '02',
    title: 'Naming and brand language.',
    body: 'We treat Homemade as a working title and explore stronger, more ownable naming directions. The goal is not to rename for the sake of it. The goal is to reduce risk and give the marketplace a name with more room to grow.',
    deliverable: 'A focused naming recommendation with rationale, availability notes, and a path forward.',
    includes: [
      'Naming brief',
      'Name territory exploration',
      'Homemade name-risk scan',
      'Alternative name development',
      'One recommended name direction',
      'Domain availability scan',
      'Social handle scan where applicable',
      'Preliminary trademark knockout review',
      'Name rationale',
    ],
  },
  {
    num: '03',
    title: 'Brand identity system.',
    body: 'Once the name direction is selected, we build the visual identity: logo, type, color, graphic language, art direction, and starter voice. The system should feel premium and warm without becoming overly precious or narrow.',
    deliverable: 'A starter identity system for marketplace, social, investor conversations, and early launch materials.',
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
      'Social/profile asset direction',
      'Foundational brand guide',
    ],
  },
  {
    num: '04',
    title: 'Marketplace UX direction.',
    body: 'We translate the brand into product structure: how buyers discover shops, how cooks create and manage shops, how privacy works, and how the marketplace expresses trust, community, and momentum.',
    deliverable: 'A UX direction for the core marketplace flows and the clickable prototype scope.',
    includes: [
      'User flow mapping',
      'Information architecture',
      'Marketplace home direction',
      'Shop and menu hierarchy',
      'Buyer and cook states',
      'Private and semi-public flow logic',
      'Community signal direction',
      'Implementation notes for backend handoff',
    ],
  },
  {
    num: '05',
    title: 'Clickable concept prototype.',
    body: 'A polished prototype gives the product a visible shape before full buildout. It is designed to guide your backend work, support outreach, and make the concept easier to understand in seconds.',
    deliverable: 'A clickable concept prototype covering roughly 25 screens across the primary user and shop-owner flows.',
    includes: [
      'Core screen designs',
      'Desktop and mobile direction where useful',
      'Clickable flow linking',
      'Interaction rhythm',
      'Visual UI system',
      'Prototype review',
      'Refinement pass',
      'Build guidance notes',
    ],
  },
  {
    num: '06',
    title: 'Final handoff.',
    body: 'We package the name, identity, copy direction, prototype, and implementation guidance so you have a clean foundation for building and testing the first version.',
    deliverable: 'A brand and prototype handoff that helps the product move from idea into implementation.',
    includes: [
      'Final logo exports',
      'Color and typography guidance',
      'Starter brand guide',
      'Core copy lines',
      'Clickable prototype link',
      'Prototype notes',
      'Web-ready assets',
      'Organized final files',
    ],
  },
]

const deliverables = [
  'Creative direction summary',
  'Cookbook-inspired moodboard',
  'Marketplace and competitor observations',
  'Homemade name-risk scan',
  'Alternative name recommendation',
  'Domain availability scan',
  'Social handle scan where applicable',
  'Preliminary trademark knockout review',
  'Primary logo',
  'Secondary logo or lockup',
  'Typography system',
  'Color palette',
  'Graphic language or motif',
  'Starter tone of voice',
  'Core copy lines',
  'Marketplace UX map',
  'Clickable concept prototype',
  'Roughly 25 key screens',
  'Implementation guidance notes',
  'Starter brand guide',
  'Final asset exports and handoff',
]

const prototypeGroups: DetailRow[] = [
  ['Discovery', 'Marketplace home and discovery', 'Home, nearby/trending shops, opening-soon surfaces, search/filter direction, and the first impression for buyers.'],
  ['Shop', 'Shop profile, menu, and product detail', 'The surfaces where a cook becomes trusted: story, menu, photos, item detail, ratings, and buying cues.'],
  ['Order', 'Cart and checkout direction', 'A clear path from interest to order, designed as direction for implementation rather than full payment engineering.'],
  ['Buyer', 'Buyer profile and order history', 'Saved shops, past orders, ratings, notifications, and the lightweight return path that keeps people engaged.'],
  ['Cook', 'Shop owner dashboard', 'Create/edit shop, menu management, order management, requests, status, visibility, and simple performance signals.'],
  ['Trust', 'Private and semi-public flows', 'Invite links, access requests, approval/rejection states, address reveal logic, and the product language around privacy.'],
  ['Community', 'Likes, ratings, reviews, and lightweight social signals', 'Enough social behavior to make the marketplace feel alive without turning it into a feed-first product.'],
]

const timeline: TimelineRow[] = [
  ['Week 1', 'Discovery + naming start', 'Discovery, category review, creative direction, cookbook world, naming brief, and Homemade name-risk scan.'],
  ['Week 2', 'Naming + identity direction', 'Naming recommendation, name refinement, visual direction, identity exploration, tone, and marketplace UI principles.'],
  ['Week 3', 'Identity + UX structure', 'Brand identity presentation, marketplace flow mapping, core prototype structure, and first screen directions.'],
  ['Week 4', 'Prototype + handoff', 'Prototype screens, clickable flow, refinement, starter brand guide, final exports, and implementation notes.'],
]

const investmentLines: PriceRow[] = [
  [
    '01',
    'Brand naming',
    'Naming brief, name exploration, Homemade risk scan, one recommended name direction, domain scan, social handle scan where applicable, preliminary trademark knockout review, rationale, and final recommendation.',
    '$950',
  ],
  [
    '02',
    'Brand identity system',
    'Logo system, color, typography, visual language, tone of voice, core copy lines, social direction, starter brand guide, and final exports.',
    '$4,900',
  ],
  [
    '03',
    'Clickable concept prototype',
    'Marketplace UX map, roughly 25 key screens, visual UI direction, clickable concept flow, prototype review, refinement pass, and implementation guidance notes.',
    '$4,000',
  ],
]

const paymentMilestones: DetailRow[] = [
  ['50%', 'Due at kickoff', 'Sprint begins on receipt.'],
  ['25%', 'Due after identity and prototype direction', 'After the brand identity and first prototype direction are presented.'],
  ['25%', 'Due before final handoff', 'Before the final files, prototype link, and implementation notes are completed.'],
]

const selectedWork: DetailRow[] = [
  ['Soft', 'CPG website', 'https://softinside.shop/'],
  ["Ta'im", 'Food website', 'https://reminiscent-chess.flywheelsites.com/'],
  ['Italic', 'Catering website', 'https://italic.catering'],
  ['Heartwood', 'Health and wellness', 'https://swim-lang.github.io/heartwood/'],
  ['Adlib', 'Brand and digital system', 'https://anchovies.agency/work/adlib'],
  ['Tagawa', 'Brand and web experience', 'https://anchovies.agency/work/tagawa'],
  ['The Passenger', 'Hospitality brand', 'https://anchovies.agency/work/the-passenger'],
  ['Odd Feather', 'Food and beverage brand', 'https://anchovies.agency/work/odd-feather'],
  ['Wild Hare Floral', 'Brand website', 'https://wildharefloral.co/'],
]

const futureOpportunities = [
  'Production app UI system',
  'Pitch deck for funding conversations',
  'Launch social content',
  'Seller onboarding materials',
  'Founder outreach deck',
  'Investor narrative and metrics story',
  'Beta launch landing page',
  'Product development support',
]

function fourCardBorderClass(index: number, total: number) {
  return [
    index < total - 2 ? 'border-b' : 'border-b md:border-b-0',
    index % 2 === 0 ? 'md:border-r' : 'md:border-r-0',
    index < total - 1 ? 'xl:border-r' : 'xl:border-r-0',
    'xl:border-b-0',
  ].join(' ')
}

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

function HomemadeNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Vrunda Patel</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Naming, Brand Identity, UX Prototype · v1</span>
          <span className="eyebrow">June 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              Homemade
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
            <a href={workHref} className="hidden rounded-full px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap sm:inline-flex">
              Our work
            </a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-ink-2 whitespace-nowrap">
              Review call
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
          <span className="eyebrow text-ink-2">Naming · Brand Identity · Marketplace Prototype</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Homemade · Marketplace for Home Cooks</span>
          <span className="eyebrow text-ink-2">Prepared for Vrunda Patel</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1200px] pb-12 text-[54px] leading-[52px] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[120px] lg:leading-[104px]">
          A marketplace that feels made by hand.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[650px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] md:text-[36px] md:leading-[44px]">
            A naming, identity, and clickable prototype phase for a web-first food marketplace connecting home cooks, popups, private hosts, and local buyers.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[440px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            This keeps the same brand pricing as Hari's Fiber Soft Chew proposal, then adds a focused prototype layer so the product has a clear visual and UX direction before backend buildout continues.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Schedule review call ->'}</AnchorButton>
            <AnchorButton href="#investment" variant="outline">
              View investment
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 - What this phase creates" right="Four pillars" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(([title, body], index) => (
            <div key={title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(index, pillars.length)}`}>
              <span className="eyebrow text-ink-2">Pillar {String(index + 1).padStart(2, '0')}</span>
              <h3 className="serif text-[40px] leading-[44px]">{title}</h3>
              <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
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
          <h2 className="display max-w-[560px] text-[46px] leading-[50px] md:text-[64px] md:leading-[64px]">
            You have the product instincts. The brand has to make them visible.
          </h2>
          <div className="flex max-w-[470px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
            <p>Homemade is not just food delivery for smaller sellers. It is a way for people making food in homes, apartments, rented kitchens, and tiny popups to look legitimate without losing the intimacy that makes the idea interesting.</p>
            <p>Because you can handle the backend, the design work should create the shape around it: what the marketplace is called, how it feels, how screens behave, and why someone would want to use it.</p>
            <p className="text-ink">A few things stood out from the conversation.</p>
          </div>
        </Reveal>
        <Reveal className="flex flex-col">
          {heardSignals.map(([label, title, body]) => (
            <div key={label} className="grid gap-5 border-t border-[var(--color-rule)] py-6 md:grid-cols-[56px_1fr] md:gap-8">
              <span className="eyebrow pt-2 text-ink-2">{label}</span>
              <div className="flex flex-col gap-3">
                <h3 className="serif text-[26px] leading-[32px]">{title}</h3>
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
        <h2 className="display max-w-[1200px] py-16 text-[50px] leading-[54px] md:text-[78px] md:leading-[78px] lg:text-[96px] lg:leading-[92px]">
          Homemade should feel less like a delivery app and more like opening a cookbook with a map inside.
        </h2>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex max-w-[590px] flex-col gap-6">
          <p className="serif text-[26px] italic leading-[36px]">
            The best version of this product is not corporate marketplace software with cute colors on top. It is a warmer system where discovery, trust, hosting, ordering, and identity all support the same idea.
          </p>
          <p className="text-[15px] leading-[24px] text-paper/70">
            Cookbooks give us a useful creative anchor: collected recipes, margin notes, family memory, specificity, texture, and the feeling that food comes from a person, not a platform.
          </p>
        </Reveal>
        <Reveal className="flex max-w-[560px] flex-col gap-3">
          <span className="eyebrow pb-3 text-paper/50">What the product can hold</span>
          {opportunityLines.map((line, index) => (
            <p key={line} className={`serif text-[22px] leading-[34px] ${index === opportunityLines.length - 1 ? 'text-paper/45' : 'text-paper'}`}>
              {index === opportunityLines.length - 1 ? `- ${line}` : line}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 04 - Our approach" right="Six phases" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
            Start with the brand. Then make the product visible.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            The core brand phase mirrors Fiber Soft Chew's referral pricing. The prototype layer is separated so the scope stays clear: a polished concept and UX direction, not production engineering.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[90px_1fr_360px] lg:gap-12">
            <div>
              <span className="serif block text-[56px] leading-[56px]">{phase.num}</span>
              <span className="eyebrow mt-4 block text-ink-2">Phase</span>
            </div>
            <div className="max-w-[620px]">
              <h3 className="serif pb-5 text-[34px] leading-[40px]">{phase.title}</h3>
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
        <p className="mt-4 max-w-[980px] text-[14px] leading-[22px] text-ink-2">
          Trademark review in this phase is a preliminary knockout check for obvious conflicts. Formal trademark clearance, registration, and legal advice should be handled by an attorney before public launch or investor materials rely on the final name.
        </p>
      </Reveal>
    </section>
  )
}

function PrototypeScope() {
  return (
    <section id="prototype" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 05 - Prototype scope" right="Roughly 25 screens" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[800px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
            Enough screens to understand the product.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            The prototype is a clickable concept. It shows the core experience, key flows, and visual system so you can build with confidence and show the idea clearly to early cooks, users, and potential partners.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid border-y border-[var(--color-rule)] md:grid-cols-2">
        {prototypeGroups.map(([label, title, body], index) => (
          <div key={title} className="grid min-h-[210px] grid-cols-[78px_1fr] gap-5 border-b border-[#DDD8CD] p-6 md:p-7">
            <span className="eyebrow pt-1 text-ink-2">{label}</span>
            <div className="flex flex-col gap-3">
              <h3 className="serif text-[26px] leading-[32px]">{title}</h3>
              <p className="text-[13px] leading-[21px] text-ink-2">{body}</p>
              <span className="eyebrow text-ink-2">Group {String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Deliverables() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 06 - Final deliverables" right="21 items" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
            Everything this first phase hands off.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            A clear starter system for naming, identity, product experience, prototype review, and the next build decisions.
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
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
            A clickable concept in three to four weeks.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Timeline depends on feedback speed, name approval, availability checks, and how quickly prototype priorities are confirmed.
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
      <MetaRow left="§ 08 - Investment" right="Core foundation + recommended prototype" dark />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[680px] text-[56px] leading-[58px] md:text-[96px] md:leading-[92px]">
            Recommended first engagement.
          </h2>
        </Reveal>
        <Reveal className="lg:text-right">
          <span className="display block text-[76px] leading-[82px] md:text-[118px] md:leading-[112px]">$9,850</span>
          <span className="text-[13px] leading-[18px] text-paper/55">Brand foundation + clickable prototype</span>
        </Reveal>
      </div>
      <Reveal className="border-t border-paper/20">
        {investmentLines.map(([num, phase, body, amount]) => (
          <div key={num} className="grid gap-4 border-b border-paper/20 py-7 md:grid-cols-[80px_320px_1fr_180px] md:gap-8">
            <span className="serif text-[28px] leading-[32px]">{num}</span>
            <h3 className="serif text-[24px] leading-[30px]">{phase}</h3>
            <p className="text-[13px] leading-[20px] text-paper/70">{body}</p>
            <span className="serif text-[34px] leading-[38px] md:text-right">{amount}</span>
          </div>
        ))}
        <div className="grid gap-4 border-b border-paper/20 py-8 md:grid-cols-[80px_320px_1fr_180px] md:items-center md:gap-8">
          <span className="eyebrow text-paper/55">Subtotal</span>
          <span className="serif text-[28px] leading-[34px]">Core brand foundation</span>
          <span className="text-[13px] leading-[20px] text-paper/60">Same brand pricing as Fiber Soft Chew: naming plus identity system.</span>
          <span className="serif text-[42px] leading-[46px] md:text-right">$5,850</span>
        </div>
        <div className="grid gap-4 py-8 md:grid-cols-[80px_320px_1fr_180px] md:items-center md:gap-8">
          <span className="eyebrow text-paper/55">Total</span>
          <span className="serif text-[28px] leading-[34px]">Recommended engagement</span>
          <span className="text-[13px] leading-[20px] text-paper/60">Core brand foundation plus the clickable concept prototype.</span>
          <span className="serif text-[46px] leading-[50px] md:text-right">$9,850</span>
        </div>
      </Reveal>
      <Reveal className="mt-14 border-t border-paper/20 pt-8">
        <MetaRow left="Fig. 03 - Payment structure" right="50 · 25 · 25" dark />
        <div className="mt-8 grid md:grid-cols-3">
          {paymentMilestones.map(([percent, title, body], index) => (
            <div key={title} className={`flex flex-col gap-4 border-paper/25 p-8 ${index < paymentMilestones.length - 1 ? 'border-b md:border-b-0 md:border-r' : ''}`}>
              <span className="display block text-[64px] leading-[68px]">{percent}</span>
              <h3 className="serif text-[22px] leading-[28px]">{title}</h3>
              <p className="text-[13px] leading-[20px] text-paper/70">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function WorkAndFuture() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]" id="work">
      <MetaRow left="§ 09 - Selected work" right="Food, product, brand, and digital systems" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
            The references should feel useful, not decorative.
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            These projects point toward the kind of balance Homemade needs: food desire, product clarity, brand warmth, and digital execution.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid border-y border-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-3">
        {selectedWork.map(([name, category, href]) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex min-h-[190px] flex-col justify-between border-b border-[var(--color-rule)]/20 p-8 transition-colors hover:bg-ink hover:text-paper md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
          >
            <span className="eyebrow text-ink-2">{category}</span>
            <span className="serif text-[32px] leading-[36px]">{name}</span>
          </a>
        ))}
      </Reveal>
      <Reveal className="mt-16 border border-[var(--color-rule)] p-8">
        <span className="eyebrow text-ink-2">Out of scope for this phase</span>
        <p className="mt-4 max-w-[980px] text-[14px] leading-[22px] text-ink-2">
          This phase does not include backend development, production payment implementation, production-ready app component documentation, legal trademark advice, regulatory review for food sellers, daily social media management, or investor deck production. Those can be scoped after the foundation is approved.
        </p>
      </Reveal>
      <Reveal className="mt-16">
        <MetaRow left="Future opportunities" right="After this phase" />
        <div className="mt-8 grid gap-0 border-y border-[var(--color-rule)] md:grid-cols-2">
          {futureOpportunities.map((item, index) => (
            <div key={item} className="grid grid-cols-[46px_1fr] gap-4 border-b border-[#DDD8CD] p-5">
              <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')}</span>
              <span className="serif text-[22px] leading-[30px]">{item}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 10 - Next step" right="Total investment" />
      <Reveal className="mt-16 border border-[var(--color-rule)] p-8 md:p-14 lg:p-16">
        <div className="flex flex-col gap-8 border-b border-[var(--color-rule)] pb-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="display max-w-[760px] text-[52px] leading-[56px] md:text-[80px] md:leading-[80px]">
            Total investment.
          </h2>
          <div className="lg:text-right">
            <span className="display block text-[70px] leading-[74px] md:text-[88px] md:leading-[88px]">$9,850</span>
            <span className="text-[13px] leading-[18px] text-ink-2">Recommended engagement · 3-4 weeks</span>
          </div>
        </div>
        <div className="grid gap-10 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[480px_1fr]">
          <p className="text-[15px] leading-[24px] text-ink-2">
            If this direction feels aligned, we can review scope together, confirm whether the prototype layer belongs in the first engagement, and then move into discovery, naming, identity, UX structure, and prototype design.
          </p>
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-ink-2">From kickoff, Homemade gets -</span>
            {['Creative direction', 'Naming presentation and recommendation', 'Starter identity system', 'Marketplace UX map', 'Clickable concept prototype', 'Implementation guidance notes'].map((item, index) => (
              <div key={item} className="grid grid-cols-[42px_1fr]">
                <span className="text-[14px] leading-[22px] text-ink-2">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[14px] leading-[22px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-8">
          <AnchorButton>{'Schedule review call ->'}</AnchorButton>
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
      <MetaRow left="§ 11 - Closing" right="Anchovies x Homemade · 2026" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] py-16 text-[48px] leading-[52px] md:text-[86px] md:leading-[84px] lg:text-[104px] lg:leading-[100px]">
          For the food people make close to home.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-paper/20 pt-10 lg:flex-row lg:items-start lg:justify-between">
        <Reveal className="max-w-[650px]">
          <p className="text-[17px] leading-[28px] text-paper/70">
            Name, look, voice, marketplace structure, and a clickable prototype - built to help Homemade become more specific before the product reaches more cooks and customers.
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
        <span className="eyebrow">Prepared for Vrunda Patel</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">June 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function HomemadeProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Homemade - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A naming, brand identity, and marketplace prototype proposal for Homemade from Anchovies.')
    }
  }, [])

  return (
    <main className="homemade-proposal bg-paper text-ink">
      <HomemadeNav />
      <Hero />
      <WhatWeHeard />
      <Opportunity />
      <Approach />
      <PrototypeScope />
      <Deliverables />
      <Timeline />
      <Investment />
      <WorkAndFuture />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
