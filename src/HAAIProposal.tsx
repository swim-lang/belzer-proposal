import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://pitch.com/v/haai-h89pcu'

const navSections = [
  { id: 'foundation', label: 'Foundation' },
  { id: 'heard', label: 'What we heard' },
  { id: 'approach', label: 'Approach' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'access', label: 'Access' },
  { id: 'begin', label: 'Begin' },
]

const movements = [
  ['Movement 01', 'Brand', 'A visual identity that holds the ambition while keeping the idea simple, human, and memorable.'],
  ['Movement 02', 'Site', 'A focused two-page website that gives the vision a credible, emotionally engaging place to land.'],
  ['Movement 03', 'Deck', 'A concise pitch deck that helps you lead funder conversations and stay memorable after the meeting.'],
  ['Movement 04', 'App', 'A light demo concept that shows how the future HAAI platform might look, feel, and move.'],
]

const pillars = [
  "Women's empowerment",
  'Human-led AI',
  'Global connection',
  'Public good',
  'Education and access',
  'Collective problem-solving',
  'A future that feels possible',
]

const outcomes = [
  [
    'A website that gives the vision a place to land.',
    'The website is the central deliverable in this phase. It should quickly explain what HAAI is, why it exists, who it serves, and where it is going: women connecting through pods, learning AI in context, and applying it to real-world problems.',
  ],
  [
    'A brand identity that makes the idea easier to understand.',
    'HAAI needs a visual identity that holds the ambition while making the idea feel simple, human, and memorable. The system should communicate global connection, intelligence, care, and future-forward thinking without falling into the usual visual language of AI.',
  ],
  [
    'A pitch deck for conversations and funding.',
    "A website helps people explore. A deck helps you lead the conversation. We'll create a concise pitch deck that gives you a polished way to present the institute, explain the model, show the opportunity, and invite support.",
  ],
  [
    'A light app concept to make the future feel real.',
    'Because HAAI may eventually include a platform or app experience, we recommend including a small demo concept in this first phase: a simple visual prototype showing how a woman might join, create a profile, identify a problem, get matched with a pod, or access learning resources.',
  ],
]

const phases = [
  {
    num: '01',
    title: 'Discovery and strategic alignment',
    body: "We'll begin with a focused discovery conversation to understand the vision, audiences, funding goals, program structure, and first-stage priorities. The goal is to clarify the story before we design around it.",
    goal: 'Goal - clarity on the story before design begins',
    includes: [
      'Brand and audience discussion',
      'Funding and partner goals',
      'Core message refinement',
      'Program and pod model review',
      'Visual direction discussion',
      'Website and deck priorities',
      'Early app concept discussion',
    ],
  },
  {
    num: '02',
    title: 'Brand identity and visual system',
    body: "We'll create a brand identity system that gives HAAI a clear and professional foundation: global, human, intelligent, and optimistic, with enough polish for funders and enough warmth for the women the institute is designed to serve.",
    goal: 'Goal - enough polish for funders, enough warmth for the women',
    includes: [
      'Logo design',
      'Primary and secondary lockups',
      'Color palette',
      'Typography system',
      'Visual language direction',
      'Graphic elements or motif direction',
      'Basic usage guidance',
      'Starter brand guide',
    ],
  },
  {
    num: '03',
    title: 'Two-page website',
    body: "We'll design a focused two-page website that introduces HAAI clearly and gives funders a strong place to land: a main landing page and a deeper page explaining the collective pod model and human-led AI approach.",
    goal: 'Goal - a credible, simple, future-facing place for the vision',
    includes: [
      'Two-page website design',
      'Desktop design',
      'Mobile design',
      'Core website copy direction',
      'Basic interaction and movement direction',
      'Developer-ready design guidance',
    ],
  },
  {
    num: '04',
    title: 'Pitch deck',
    body: "We'll create a concise, polished pitch deck that helps you explain the vision, the opportunity, the model, and the next step: a deck designed to lead funder and partner conversations with confidence.",
    goal: 'Goal - a deck that helps you lead the conversation',
    includes: [
      'Pitch deck structure',
      'Deck copy direction',
      'Visual design',
      'Digital presentation format',
      'Exportable PDF version',
    ],
  },
  {
    num: '05',
    title: 'Light app concept',
    body: "We'll create a small demo concept that shows how the future HAAI platform could work: a few key screens that give the product idea shape before deeper development begins.",
    goal: "Goal - give the future platform shape, even before it's built",
    includes: ['Light app concept direction', 'A small set of visual screens', 'Simple user flow', 'Demo-ready presentation visuals'],
  },
]

const deliverables = [
  ['D / 01', 'Brand identity system', "A coherent visual identity built around HAAI's mission and audiences.", 'Brand'],
  ['D / 02', 'Logo design', 'A primary mark designed to feel global, human, and intelligent.', 'Brand'],
  ['D / 03', 'Color and typography system', "A palette and type hierarchy that hold the institute's tone.", 'Brand'],
  ['D / 04', 'Visual language direction', 'Graphic motifs, photography direction, and the rhythm of the brand world.', 'Brand'],
  ['D / 05', 'Starter brand guide', 'A reference for collaborators across deck, site, and future materials.', 'Brand'],
  ['D / 06', 'Two-page website design', 'A focused desktop design for both pages, tested in real layout.', 'Site'],
  ['D / 07', 'Mobile website design', 'The same two pages reshaped for the device most visitors will use.', 'Site'],
  ['D / 08', 'Pitch deck', 'A concise, polished deck for funder and partner conversations.', 'Deck'],
  ['D / 09', 'Light app concept', 'A small set of screens that show the future platform in motion.', 'App'],
  ['D / 10', 'Exported assets for next-step usage', 'Logos, swatches, type, and references: packaged and ready to hand off.', 'Handoff'],
]

const schedule = [
  {
    week: 'Week one',
    title: 'Discover, align, explore.',
    days: [
      ['Mo', 'Discovery'],
      ['Tu', 'Brand strategy alignment'],
      ['We', 'Visual direction'],
      ['Th', 'Logo and identity exploration'],
      ['Fr', 'Initial brand presentation'],
    ],
  },
  {
    week: 'Week two',
    title: 'Refine, design, structure.',
    days: [
      ['Mo', 'Identity refinement'],
      ['Tu', 'Website design'],
      ['We', 'Website copy direction'],
      ['Th', 'Pitch deck structure'],
      ['Fr', 'Initial deck direction'],
    ],
  },
  {
    week: 'Week three',
    title: 'Build, polish, hand off.',
    days: [
      ['Mo', 'Website refinement'],
      ['Tu', 'Mobile design'],
      ['We', 'Pitch deck design'],
      ['Th', 'Light app concept'],
      ['Th', 'Final brand guide'],
      ['Fr', 'Final presentation and handoff'],
    ],
  },
]

const investmentLines = [
  [
    'Line 01',
    'Two-page website design',
    'Includes desktop and mobile design for two primary pages, with core website copy direction, interaction direction, and developer-ready design guidance.',
    '$2,600',
  ],
  [
    'Line 02',
    'Brand identity and starter system',
    'Includes logo design, color, typography, visual language, basic usage guidance, and starter brand guide.',
    '$2,000',
  ],
  ['Line 03', 'Pitch deck', 'Includes structure, messaging direction, and visual design for a concise funding and partner presentation.', '$850'],
  ['Line 04', 'Light app concept', 'Includes a small visual demo direction to help funders understand the future product experience.', '$1,000'],
]

const accessItems = [
  ['A / 01', 'A credible first impression for funders', 'A polished surface that signals the institute is organized, thoughtful, and ready for support.'],
  ['A / 02', 'A clear story for meetings and outreach', 'Site, deck, and identity all carrying the same message: easier to share, easier to repeat.'],
  ['A / 03', 'A visual identity that can grow with the institute', 'A system designed to extend across new pages, programs, and partner materials.'],
  ['A / 04', 'A website that explains the model simply', 'Two pages, disciplined and emotionally engaging: built around what the audience needs to feel.'],
  ['A / 05', 'A pitch deck that helps lead funding conversations', 'A concise, polished asset designed to be easy to move through and easy to remember.'],
  ['A / 06', 'A first look at how the future platform could work', 'A small set of demo screens that turn an abstract product idea into something tangible.'],
  ['A / 07', 'A stronger foundation for partners and participants', 'Materials that hold up under scrutiny while inviting people in.'],
  ['A / 08', 'A brand world that feels human, global, and ready to move', 'A first expression of the institute that is intelligent, optimistic, and built to grow.'],
]

const brandEffects = [
  ['It gives the website', 'More authority'],
  ['It gives the deck', 'More polish'],
  ['It gives the app', 'More consistency'],
  ['It gives collaborators', 'A clear standard'],
  ['It gives funders', 'A stronger sense the idea is ready'],
]

const nextSteps = [
  ['01', 'Focused discovery session', 'A working call to align on vision, audience, funding goals, and program direction.'],
  ['02', 'Confirm the two pages', 'Decide which two pages will introduce the institute most clearly to funders and partners.'],
  ['03', 'Identify deck structure', 'Choose the deck flow that best leads funder and partner conversations.'],
  ['04', 'Define the app screens', 'Decide which moments of the future platform are most useful to show first.'],
  ['05', 'Begin the three-week sprint', "A complete foundation for HAAI's next stage: designed, built, and handed off together."],
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

function HAAINav() {
  const [active, setActive] = useState('foundation')

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
          <span className="eyebrow text-ink-2">Prepared for HAAI</span>
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
              HAAI
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
          <span className="eyebrow">Brand · Site · Deck · App concept</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Prepared for Maria Salazar & Diana Popic</span>
          <span className="eyebrow text-ink-2">By Anchovies</span>
        </Reveal>
      </div>

      <Reveal>
        <h1 className="display max-w-[1180px] pb-12 text-[48px] leading-[48px] tracking-[-0.025em] sm:text-[72px] sm:leading-[68px] md:text-[84px] md:leading-[80px] lg:pb-16 lg:text-[104px] lg:leading-[98px] xl:text-[124px] xl:leading-[108px]">
          A clear first expression for a big global vision.
        </h1>
      </Reveal>

      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[25px] leading-[33px] tracking-[-0.018em] md:text-[30px] md:leading-[38px] lg:text-[36px] lg:leading-[44px]">
            A focused brand identity, a two-page website, a pitch deck, and a light app concept: designed to make HAAI feel real from the very first conversation.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-6 pt-2">
          <p className="text-[15px] leading-[23px] text-ink-2">
            HAAI has the kind of idea that needs to feel real quickly. This first phase gives the institute a strong foundation for funders, partners, collaborators, and the women joining the network.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <AnchorButton>{'Begin the project ->'}</AnchorButton>
            <a href="#approach" className="rounded-full border border-[var(--color-rule)] px-5 py-3.5 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper">
              View the approach
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal className="flex flex-col gap-6 border-t border-[var(--color-rule)] pt-12">
        <div className="flex items-center justify-between gap-8">
          <span className="eyebrow text-ink-2">Fig. 01 - What this phase delivers</span>
          <span className="eyebrow text-right text-ink-2">Four movements</span>
        </div>
        <div className="grid border-y border-[var(--color-rule)] sm:grid-cols-2 xl:grid-cols-4">
          {movements.map(([label, name, desc], index) => (
            <div
              key={name}
              className={`flex min-h-[220px] flex-col gap-6 border-[var(--color-rule)] p-8 md:p-10 ${
                index < movements.length - 1 ? 'border-b sm:border-b-0 xl:border-r' : ''
              } ${index % 2 === 0 ? 'sm:border-r' : ''}`}
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

function WhatWeHeard() {
  return (
    <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 02 - What we heard" right="The human age of AI" />
      <div className="flex flex-col gap-10 pb-16 min-[1400px]:flex-row min-[1400px]:items-start min-[1400px]:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Women using AI
            <br />
            for connection,
            <br />
            education, and
            <br />
            public good.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>HAAI is centered around the human age of AI. The heart of the idea is women using AI as a tool for connection, education, problem-solving, and public good.</p>
          <p className="text-ink-2">The initial audience is funders and partners. Over time, the brand will also speak directly to the women joining the network: participating in pods, learning new tools, and applying AI to problems in their communities.</p>
          <p className="text-ink-2">Funders need to see vision, credibility, and execution. Participants need to feel belonging, clarity, safety, and momentum. The best foundation can support both.</p>
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
    <section id="foundation" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 03 - What this phase creates" right="Four outcomes" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Make HAAI feel
            <br />
            real, quickly.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">Four outcomes shape this phase: each one helping the institute land in conversations, in funder rooms, and in the imaginations of the women it's designed to serve.</p>
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
      <MetaRow left="§ 04 - The opportunity" right="A rare moment" dark />
      <div className="flex flex-col gap-12 border-t border-paper/20 pt-14 lg:flex-row lg:items-start lg:gap-20 lg:pt-16">
        <Reveal className="flex-[1.4]">
          <blockquote className="serif max-w-[920px] text-[42px] italic leading-[48px] tracking-[-0.02em] md:text-[68px] md:leading-[74px] lg:text-[88px] lg:leading-[92px]">
            "A rare opportunity to help shape how women use AI for public good."
          </blockquote>
        </Reveal>
        <Reveal className="flex max-w-[360px] flex-col gap-6 pt-2 text-[15px] leading-[24px] text-paper/70 lg:pt-12">
          <p>HAAI sits at an unusual intersection: the human age of AI, women's leadership, global community, and collective problem-solving: all moving at once.</p>
          <p>This phase gives that vision its first clear form: something funders can read, partners can trust, and participants can feel themselves inside.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 05 - Our approach" right="Five phases · Three weeks" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Our
            <br />
            approach.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">Five phases that move from discovery into a finished foundation: each one building on the last so the brand, site, deck, and app concept arrive together, ready for the conversations ahead.</p>
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
          <p className="text-[15px] leading-[24px] text-ink-2">A complete foundation for HAAI's first stage: the brand, the site, the deck, and the early app concept, designed to move together.</p>
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
      <MetaRow left="§ 07 - Timeline" right="Estimated · Three weeks" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Three weeks,
            <br />
            start to handoff.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">A focused engagement designed to move quickly without rushing: leaving HAAI with a complete first foundation by the end of week three.</p>
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
          <h2 className="display text-[72px] leading-[72px] tracking-[-0.025em] sm:text-[112px] sm:leading-[106px] lg:text-[160px] lg:leading-[152px]">$6,450</h2>
          <span className="eyebrow mt-6 block text-ink-2">Total · Three weeks · Full scope</span>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>A focused investment in the foundation HAAI needs first: brand identity, two-page website, pitch deck, and a light app concept, designed to move together.</p>
          <p className="text-ink-2">Each line is priced individually so the value of every piece is clear. Together, they give the institute its first credible expression for funders, partners, and participants.</p>
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
          <span className="serif text-[32px] leading-[38px] tracking-[-0.018em] md:text-[36px] md:leading-[42px]">All four lines, three weeks</span>
          <span className="serif text-[48px] leading-[52px] tracking-[-0.02em] md:text-right md:text-[56px]">$6,450</span>
        </Reveal>
      </div>
    </section>
  )
}

function Access() {
  return (
    <section id="access" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 09 - What this phase gives access to" right="Eight outcomes" />
      <Reveal>
        <h2 className="display max-w-[1100px] pb-16 text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:pb-20 lg:text-[88px] lg:leading-[84px]">
          What this phase gives HAAI access to.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)] pt-8">
        {accessItems.map(([label, title, body]) => (
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

function BrandSite() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 10 - Why brand supports the website" right="A foundation, then a surface" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="serif max-w-[720px] text-[38px] leading-[44px] tracking-[-0.02em] md:text-[56px] md:leading-[62px] lg:text-[64px] lg:leading-[68px]">
            The website is one of the first places people experience HAAI. The brand is what makes the experience feel specific.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>The brand identity gives the website its own language: the logo, type, color, visual rhythm, tone, and design system that make every page feel like HAAI and only HAAI.</p>
          <p className="text-ink-2">That foundation is what makes every next step easier: the deck, the future app, the partner materials. Each of them inherits the same standard.</p>
        </Reveal>
      </div>
      <div className="grid border-t border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-5">
        {brandEffects.map(([label, title], index) => (
          <Reveal key={label} className={`flex min-h-[170px] flex-col gap-3 border-[rgba(31,25,18,0.2)] py-8 md:px-8 ${index < brandEffects.length - 1 ? 'border-b md:border-b-0 xl:border-r' : ''} ${index % 2 === 0 ? 'md:border-r xl:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">{label}</span>
            <h3 className="serif text-[28px] leading-[32px] tracking-[-0.014em]">{title}</h3>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function FutureSupport() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 11 - Future support" right="After the foundation" />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="serif max-w-[720px] text-[38px] leading-[44px] tracking-[-0.02em] md:text-[50px] md:leading-[56px] lg:text-[56px] lg:leading-[60px]">
            When HAAI is ready, we can help move from concept to something more functional.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>After this work is complete, we can also discuss support for full website development, expanded pitch materials, AI product strategy, or a more advanced prototype.</p>
          <p className="text-ink-2">Because we are actively designing and building custom AI-enabled tools, we may be able to help HAAI move from early concept into something more functional when the time is right. For now, the priority is a strong first version that helps the institute tell its story, start conversations, and build momentum.</p>
        </Reveal>
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section id="begin" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 12 - Next step" right="If this feels aligned" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            A simple way
            <br />
            to begin.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">If this direction feels aligned, we begin with a focused discovery session, confirm the two website pages, identify the most useful pitch deck structure, and define the app concept screens: then move into the three-week sprint together.</p>
        </Reveal>
      </div>
      <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-5">
        {nextSteps.map(([num, title, body], index) => (
          <Reveal key={num} className={`flex min-h-[360px] flex-col gap-5 border-[var(--color-rule)] p-8 ${index < nextSteps.length - 1 ? 'border-b md:border-b-0 xl:border-r' : ''} ${index % 2 === 0 ? 'md:border-r xl:border-r' : ''}`}>
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
    <section className="bg-ink px-6 pb-24 pt-28 text-paper md:px-16 lg:px-[120px] lg:pb-40 lg:pt-[200px]">
      <MetaRow left="§ 13 - In closing" right="Where it leads" dark />
      <Reveal className="border-t border-paper/20 pt-14 lg:pt-20">
        <h2 className="display max-w-[1200px] text-[46px] leading-[50px] tracking-[-0.025em] md:text-[74px] md:leading-[76px] lg:text-[104px] lg:leading-[100px] xl:text-[124px] xl:leading-[116px]">
          A clear first form for women leading the human age of AI.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 pt-12 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="max-w-[520px] flex-1">
          <p className="text-[15px] leading-[24px] text-paper/70">In three weeks, HAAI moves from idea to identity: a brand, a site, a deck, and a glimpse of the future platform, all working together to make the institute feel real for the women, funders, and partners ready to join.</p>
        </Reveal>
        <Reveal className="flex max-w-[380px] flex-1 flex-col gap-4">
          <span className="eyebrow text-paper/60">Begin</span>
          <div>
            <AnchorButton variant="light">{'Begin the discovery ->'}</AnchorButton>
          </div>
          <span className="pt-2 text-[13px] leading-[20px] text-paper/60">$6,450 · Three weeks · Full scope</span>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 border-t border-[var(--color-rule)] bg-paper px-6 py-8 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
        <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="eyebrow">Brand · Interface · AI</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <a href={workHref} target="_blank" rel="noreferrer" className="eyebrow transition-colors hover:text-ink">
          {'Selected work ->'}
        </a>
        <a href={calendarHref} target="_blank" rel="noreferrer" className="eyebrow transition-colors hover:text-ink">
          {'Schedule call ->'}
        </a>
        <span className="hidden h-[10px] w-px bg-[var(--color-rule)] md:block" />
        <span className="eyebrow text-ink">Proposal · v1 · May 2026</span>
      </div>
    </footer>
  )
}

export function HAAIProposal() {
  useEffect(() => {
    document.title = 'Anchovies × HAAI — Proposal'
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) {
      meta.content = 'A foundational brand, site, deck, and app concept proposal for HAAI from Anchovies.'
    }
  }, [])

  return (
    <main className="bg-paper text-ink">
      <HAAINav />
      <Hero />
      <WhatWeHeard />
      <Outcomes />
      <DarkQuote />
      <Approach />
      <Deliverables />
      <Timeline />
      <Investment />
      <Access />
      <BrandSite />
      <FutureSupport />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
