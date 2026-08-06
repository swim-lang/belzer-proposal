import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const garzaFeatureHref =
  'https://the-brandidentity.com/project/how-did-anchovies-bring-consumer-brand-thinking-to-a-texas-law-firm'
const genesiPreviewHref = 'https://pitch.com/v/genesi-pitch-ssispr'
const contractHref = '/proposal/emergences-labs/contract'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What we heard' },
  { id: 'idea', label: 'Opportunity' },
  { id: 'work', label: 'Selected work' },
  { id: 'process', label: 'Process' },
  { id: 'scope', label: 'Scope' },
  { id: 'investment', label: 'Investment' },
]

const signals = [
  ['01', 'Human at the center', 'The brand should make human capability feel consequential, not decorate another AI company with familiar machine-age signals.'],
  ['02', 'A serious house of knowledge', 'Emergences Labs needs the authority of an institution, the curiosity of a research lab, and the clarity of a product company.'],
  ['03', 'Considered grandeur', 'Warm, inhabited, classically grounded, and weighted, with a hint of the future. Grandeur should come through light, scale, and composition rather than familiar symbols or ornament.'],
  ['04', 'A family, not three strangers', 'Emergences Labs, NeoWork, and NeoHuman each need a clear role and identity while sharing enough logic to feel deliberately related.'],
  ['05', 'Clarity as a creative constraint', "The brief tells us what must be true without dictating the final answer. We will honor the team's alignment and keep enough room for the work to become better than the references can currently describe."],
]

const outcomes = [
  {
    title: 'An ownable mark.',
    body: 'A logo and wordmark with enough character to be remembered on their own, without borrowing the visual shorthand of the AI category.',
  },
  {
    title: 'A living system.',
    body: 'A flexible visual language that can feel editorial, institutional, expressive, and digital while still belonging unmistakably to one organization.',
  },
  {
    title: 'Products that feel related.',
    body: 'A complete master identity for Emergences Labs plus focused identities for NeoWork and NeoHuman, all connected by a clear family architecture.',
  },
  {
    title: 'A world worth entering.',
    body: 'Motion, research, social, merchandise, events, and presentations that make the identity feel bigger than a logo and ready for public attention.',
  },
]

const selectedWork = [
  {
    name: 'Lex Politica',
    label: 'The big idea',
    image: '/work/emergences/lex-politica.jpg',
    href: 'https://anchovies.agency/work/lex-politica',
    body: 'The big idea was ancient and modern at once. It came from reading the cultural world around a lawyer who had represented Elon Musk and moved through a world that felt equal parts Washington Post and socialite. The work had to balance the appropriateness of a traditional field with the bravery to pursue something aesthetically distinct.',
  },
  {
    name: 'Wild Hare',
    label: 'The big idea',
    image: '/work/emergences/wild-hare.jpg',
    href: 'https://anchovies.agency/work/wild-hare',
    body: 'The big idea was to rethink what a hare or rabbit could be. The mythical Wolpertinger became a vessel for creativity and the pursuit of the unexpected, giving the brand a character that could hold both whimsy and sophistication.',
  },
  {
    name: 'Garza',
    label: 'The big idea',
    image: '/work/emergences/garza.webp',
    href: 'https://anchovies.agency/work/garza',
    featureHref: garzaFeatureHref,
    body: 'For Garza, the big idea and the process behind it are best told in The Brand Identity.',
  },
  {
    name: 'Genesi',
    label: 'In progress',
    image: '/work/emergences/genesi.webp',
    href: genesiPreviewHref,
    preview: true,
    body: 'Still in beta and hot off the presses. The big idea begins with Marcus Aurelius: a Roman coin recast for a modern political and public affairs company. The identity uses the weight of history to make the organization feel considered, credible, and distinct without asking it to live in the past.',
  },
]

const processSignals = [
  { label: 'Intuition', note: 'An antenna for the frequency underneath the words.', x: 14, y: 14 },
  { label: 'Listening', note: 'Knowing what to listen for, not simply what to ask.', x: 39, y: 8 },
  { label: 'Curiosity', note: 'A perpetual practice, not a workshop exercise.', x: 75, y: 17 },
  { label: 'Empathy', note: "Feeling the stakes and matching the client's passion.", x: 19, y: 38 },
  { label: 'Culture', note: 'Context gathered from living curiously in the world.', x: 48, y: 36 },
  { label: 'Memory', note: 'What worked, what failed, and what still echoes.', x: 82, y: 37 },
  { label: 'Taste', note: 'Recognizing the difference between new and meaningful.', x: 13, y: 74 },
  { label: 'Imagination', note: 'A sense of what tomorrow could make possible.', x: 35, y: 69 },
  { label: 'Courage', note: 'The willingness to choose the unexpected idea.', x: 59, y: 70 },
  { label: 'Decisiveness', note: 'Having the guts to follow the signal.', x: 80, y: 72 },
  { label: 'Love', note: 'Caring about the work beyond the contract.', x: 61, y: 88 },
  { label: 'Restraint', note: 'Knowing when not to add another thing.', x: 28, y: 90 },
  {
    label: 'The big idea',
    note: 'A vessel for what makes you special, made clear enough for the world to recognize.',
    x: 50,
    y: 52,
    outcome: true,
  },
]

const processConnections = [
  [0, 1],
  [0, 3],
  [0, 4],
  [0, 6],
  [1, 2],
  [1, 4],
  [1, 5],
  [2, 4],
  [2, 5],
  [2, 8],
  [3, 4],
  [3, 6],
  [3, 10],
  [4, 5],
  [4, 7],
  [4, 8],
  [4, 11],
  [5, 8],
  [5, 9],
  [6, 7],
  [6, 11],
  [7, 8],
  [7, 10],
  [8, 9],
  [8, 10],
  [9, 10],
  [10, 11],
  [0, 12],
  [1, 12],
  [2, 12],
  [3, 12],
  [4, 12],
  [5, 12],
  [6, 12],
  [7, 12],
  [8, 12],
  [9, 12],
  [10, 12],
  [11, 12],
]

function getProcessPath(from: number, to: number, index: number) {
  const start = processSignals[from]
  const end = processSignals[to]
  const startX = start.x * 10
  const startY = start.y * 5
  const endX = end.x * 10
  const endY = end.y * 5
  const direction = index % 2 === 0 ? 1 : -1
  const lift = 28 + (index % 4) * 11
  const drift = 18 + (index % 3) * 9

  const makePath = (phase: number) => {
    const firstX = startX + (endX - startX) * 0.34 + direction * drift * phase
    const firstY = startY + (endY - startY) * 0.28 - direction * lift * phase
    const secondX = startX + (endX - startX) * 0.68 - direction * drift * phase
    const secondY = startY + (endY - startY) * 0.72 + direction * lift * phase
    return `M ${startX} ${startY} C ${firstX} ${firstY} ${secondX} ${secondY} ${endX} ${endY}`
  }

  const paths = [makePath(0.45), makePath(1), makePath(-0.35), makePath(0.45)]
  return { initial: paths[0], values: paths.join(';') }
}

const phases = [
  {
    num: '01',
    title: 'Discovery and alignment',
    body: 'We begin by absorbing the thinking already inside the team and translating it into a shared creative brief. This phase confirms the non-negotiables, resolves the remaining tensions, and defines what success must feel like without prescribing the final form.',
    items: [
      'Founder and stakeholder working session',
      'Existing survey and reference synthesis',
      'Category and visual landscape audit',
      'Audience, product, and brand architecture review',
      'Success criteria and creative brief',
      'Guided interactive moodboard',
    ],
  },
  {
    num: '02',
    title: 'Master brand identity',
    body: 'We find the central idea that can make Emergences Labs feel like a serious institution built around human potential, then develop it as one complete recommended identity and system.',
    items: [
      'Creative concept and narrative',
      'Primary logo or wordmark',
      'Ownable brand mark',
      'Responsive lockups and submarks',
      'Typography and color system',
      'Graphic, image, and editorial language',
      'One identity presentation',
      'Two structured refinement rounds as the standard path',
      'No-cost creative reset if the direction fundamentally misses the agreed outcome',
    ],
  },
  {
    num: '03',
    title: 'Product identities and expression',
    body: 'We develop focused identities for NeoWork and NeoHuman inside the shared family. With access to the current software, we extend the system into the product itself through high-fidelity studies of primary workflows and the smaller states and controls that make a system feel finished.',
    items: [
      'Emergences Labs, NeoWork, and NeoHuman family architecture',
      'NeoWork product identity and logo system',
      'NeoHuman product identity and logo system',
      'Product-specific color, type, and graphic expression',
      'Digital design tokens and component direction',
      'Current product environment and backend software review',
      'Product-site homepage direction',
      'Assessment and results interface studies',
      'Dashboard and learning-surface studies',
      'Navigation, forms, tables, cards, empty states, and notifications',
      'Responsive desktop and mobile product mockups',
      'Figma design system library',
    ],
  },
  {
    num: '04',
    title: 'Launch world and handoff',
    body: 'We make the system feel real through a broad mockup suite across the places people will encounter it, from major launch moments to the smaller everyday touchpoints that prove the identity can keep working.',
    items: [
      'Research report or publication template',
      'Presentation deck template',
      'Social content starter system',
      'Profile and launch assets',
      'Email, event badge, signage, and document mockups',
      'Logo animation',
      'Two short motion studies',
      'Merchandise and event concepts',
      'Digital brand guide and asset library',
      'Team handoff session',
      '30 days of launch support',
    ],
  },
]

const timeline = [
  ['Week 01', 'Listen and align', 'Discovery, internal materials, category review, stakeholder alignment, and success criteria.'],
  ['Week 02', 'Find the big idea', 'Guided moodboard, creative brief, brand architecture, and one recommended territory for the Emergences Labs identity.'],
  ['Weeks 03 to 04', 'Build the identity family', 'Develop the master identity, focused NeoWork and NeoHuman expressions, and the shared system connecting all three.'],
  ['Week 05', 'Prove it in use', 'Product and backend interface studies, responsive mockups, motion, publications, presentations, launch assets, and everyday touchpoints.'],
  ['Week 06', 'Refine and hand off', 'Structured refinement, final assets, Figma library, brand guide, team training, and the start of launch support. If a creative reset is needed, we will agree on the added time without adding a creative fee.'],
]

const investment = [
  ['01', 'Discovery and creative strategy', 'Alignment, category review, brand architecture, guided moodboard, success criteria, and creative brief.', '$5,000'],
  ['02', 'Emergences Labs master identity', 'One lead concept, logo suite, typography, color, graphic language, image direction, and the core system for the institution.', '$17,500'],
  ['03', 'NeoWork and NeoHuman identities', 'Two focused product identities, each with its own logo expression and visual character inside the shared brand family.', '$13,000'],
  ['04', 'Digital expression, launch, and handoff', 'Current software and backend interface studies, responsive product mockups, an expanded touchpoint suite, motion, templates, Figma library, brand guide, and launch support.', '$9,500'],
]

const milestones = [
  ['50%', '$22,500', 'Due at kickoff to schedule the engagement and begin discovery.'],
  ['25%', '$11,250', 'Due only after written approval of the Emergences Labs master identity direction.'],
  ['25%', '$11,250', 'Due before final files, Figma library, brand guide, and handoff.'],
]

const boundaries = [
  ['Direction assurance', 'We lead with one complete recommended direction and two structured refinement rounds as the standard path. If it still feels fundamentally wrong against the agreed brief and outcome, we will diagnose why, revisit the connecting big idea, and develop a materially distinct new territory at no additional creative fee.'],
  ['Product expression', 'With access to the current software, we will design representative backend, product, and interface surfaces across primary workflows and smaller UI touchpoints. Full product UX architecture, engineering, and coded websites are not included.'],
  ['Decision makers start with us', 'Anyone who will approve the identity at the end should participate in discovery and early visual alignment at the beginning.'],
  ['One day-to-day lead', 'Emergences Labs designates one primary contact to gather feedback, make routine decisions, and keep communication moving.'],
  ['Named working team', 'Sean Ashlow, Kira Knoop, and Logan Causey remain the working team throughout. Sean remains the creative lead and primary point of contact for email, meetings, reviews, and decisions.'],
  ['Client inputs', 'Emergences Labs provides timely access to internal research, a walkthrough of the current software and product environment, and one consolidated set of feedback at each milestone.'],
  ['Approval-gated payment', 'The second payment is not due until the Emergences Labs master identity direction is approved in writing. A creative reset does not trigger an added fee or that milestone.'],
  ['Direction-stage exit', 'If Emergences Labs chooses to end the engagement before approving the master identity direction, Anchovies retains the kickoff payment, nothing further is owed, and Emergences Labs receives and owns the project-specific work created through that point.'],
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
  href,
  variant = 'primary',
}: {
  children: string
  href: string
  variant?: 'primary' | 'outline' | 'light'
}) {
  const external = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
        ? 'border border-mac text-mac hover:bg-mac hover:text-white'
        : 'bg-mac text-white hover:bg-mac-hover'

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex min-h-[46px] items-center justify-center px-5 py-3 text-center text-[13px] font-medium transition-colors ${classes}`}
    >
      {children}
    </a>
  )
}

function ProposalNav() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const sections = navSections.map(({ id }) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.2, 0.5], rootMargin: '-38% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 md:flex">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Charles Zuo</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Brand identity and design system</span>
          <span className="eyebrow">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span> x Emergences Labs
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <AnchorButton href={contractHref}>Review contract</AnchorButton>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-20 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-[140px] lg:pt-[120px]">
      <MetaRow left="§ 01 - Proposal" right="Emergences Labs · San Francisco" />
      <Reveal>
        <h1 className="display max-w-[1200px] py-12 text-[52px] leading-[54px] sm:text-[70px] sm:leading-[70px] md:text-[84px] md:leading-[84px] lg:text-[96px] lg:leading-[94px]">
          Make human capability impossible to overlook.
        </h1>
      </Reveal>
      <div className="grid gap-10 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[28px] leading-[36px] md:text-[38px] md:leading-[46px]">
            An ownable identity and living design system for the institution measuring what matters next.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[520px] flex-col gap-7">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Emergences Labs is building human competency models for the AI era. The brand should feel equally ambitious: serious enough for research, human enough for learning, and flexible enough to carry a growing family of products.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={calendarHref}>Schedule proposal review</AnchorButton>
            <AnchorButton href="#work" variant="outline">See relevant work</AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="mt-16 grid border-y border-[var(--color-rule)] md:grid-cols-3">
        {[
          ['The subject', 'Human capability'],
          ['The form', 'One family, three identities'],
          ['The engagement', '$45,000 · 6 weeks'],
        ].map(([label, value], index) => (
          <div key={label} className={`flex min-h-[150px] flex-col justify-between gap-8 p-7 ${index < 2 ? 'border-b border-[var(--color-rule)] md:border-b-0 md:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">{label}</span>
            <span className="serif text-[25px] leading-[31px]">{value}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function WhatWeHeard() {
  return (
    <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 02 - What we heard" right="Clear constraints, open possibility" />
      <div className="grid gap-14 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[590px] text-[50px] leading-[54px] md:text-[74px] md:leading-[74px]">
            The brief is clear. The answer should still surprise us.
          </h2>
          <p className="mt-8 max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            You have already done unusually thoughtful work defining the world: human, warm, inhabited, classically grounded, grand with restraint, and unmistakably outside familiar AI shorthand. We understand those as real constraints. Our job is to honor that clarity without mistaking the current references for the limit of what is possible. The brief tells us what must be true. The work can still become better than any of us can describe before we begin.
          </p>
        </Reveal>
        <Reveal className="border-t border-[var(--color-rule)]">
          {signals.map(([num, title, body]) => (
            <article key={num} className="grid gap-4 border-b border-[var(--color-rule)] py-7 sm:grid-cols-[52px_1fr] sm:gap-7">
              <span className="eyebrow pt-2 text-ink-2">{num}</span>
              <div>
                <h3 className="serif text-[28px] leading-[34px]">{title}</h3>
                <p className="mt-3 max-w-[680px] text-[14px] leading-[22px] text-ink-2">{body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function BigIdea() {
  return (
    <section id="idea" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 03 - The opportunity" right="A strategic premise" dark />
      <Reveal>
        <h2 className="display max-w-[1180px] py-16 text-[52px] leading-[56px] md:text-[82px] md:leading-[82px] lg:text-[104px] lg:leading-[100px]">
          The machine is the context. The human is the subject.
        </h2>
      </Reveal>
      <div className="grid gap-12 border-t border-paper/20 pt-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal className="max-w-[500px]">
          <p className="serif text-[26px] italic leading-[36px] text-paper/90">
            AI branding keeps finding new ways to picture the machine. Emergences Labs has a more valuable subject: the qualities in people that become more important as machines advance.
          </p>
        </Reveal>
        <Reveal className="grid sm:grid-cols-2">
          {outcomes.map((outcome, index) => (
            <article key={outcome.title} className={`min-h-[235px] border-paper/25 p-7 ${index < 2 ? 'border-b' : ''} ${index % 2 === 0 ? 'sm:border-r' : ''}`}>
              <span className="eyebrow text-paper/45">Outcome {String(index + 1).padStart(2, '0')}</span>
              <h3 className="serif mt-7 text-[29px] leading-[35px]">{outcome.title}</h3>
              <p className="mt-4 text-[13px] leading-[21px] text-paper/60">{outcome.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 - Selected work" right="Four relevant ways we think" />
      <div className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[650px] text-[50px] leading-[54px] md:text-[74px] md:leading-[74px]">
            The process changes because the problem changes.
          </h2>
        </Reveal>
        <Reveal className="max-w-[600px] pt-2">
          <p className="text-[16px] leading-[26px] text-ink-2">
            We do not apply one aesthetic or repeat one formula. Each project finds its own big idea: a clear vessel for what makes the client special. These projects show four very different ways that outcome can take shape.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-px bg-[var(--color-rule)] border border-[var(--color-rule)] lg:grid-cols-2">
        {selectedWork.map((project) => (
          <Reveal key={project.name} className="group bg-paper">
            <article>
              <a href={project.href} target="_blank" rel="noreferrer" className="block">
                <div className="relative aspect-video overflow-hidden bg-ink">
                  <img src={project.image} alt={`${project.name} brand identity`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  <div className="absolute inset-0 hidden items-end bg-ink/90 p-7 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex">
                    <p className="text-[14px] leading-[22px]">{project.body}</p>
                  </div>
                </div>
              </a>
              <div className="min-h-[188px] p-7">
                <span className="eyebrow text-ink-2">{project.label}</span>
                <h3 className="serif mt-5 text-[34px] leading-[39px]">
                  <a href={project.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-mac">
                    {project.name}
                  </a>
                </h3>
                <p className="mt-4 text-[13px] leading-[21px] text-ink-2 lg:hidden">{project.body}</p>
                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                  <a href={project.href} target="_blank" rel="noreferrer" className="text-[12px] text-mac hover:underline">
                    {'preview' in project && project.preview ? 'Preview the work' : 'View project'}
                  </a>
                  {'featureHref' in project && project.featureHref ? (
                    <a href={project.featureHref} target="_blank" rel="noreferrer" className="text-[12px] text-mac hover:underline">
                      Read the process feature
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Process() {
  const [activeSignal, setActiveSignal] = useState<number | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(query.matches)
    updatePreference()
    query.addEventListener('change', updatePreference)
    return () => query.removeEventListener('change', updatePreference)
  }, [])

  return (
    <section id="process" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 05 - How we work" right="A process, not a formula" />
      <Reveal>
        <h2 className="display max-w-[980px] py-14 text-[50px] leading-[54px] md:text-[76px] md:leading-[76px]">
          I can explain the steps. I cannot reduce the process.
        </h2>
      </Reveal>
      <Reveal>
        <p className="mb-10 max-w-[700px] text-[16px] leading-[26px] text-ink-2">
          There are parts we can schedule and name. What happens inside them is a web of signals, history, instinct, and judgment that refuses to move in a straight line.
        </p>
      </Reveal>
      <Reveal className="emergences-process-field">
        <div className="bg-ink px-6 py-16 text-paper md:px-16 md:py-20 lg:px-[120px]">
          <MetaRow left="Made in real time" right="For Emergences Labs" dark />
          <div className="grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <h3 className="display max-w-[690px] text-[48px] leading-[51px] md:text-[72px] md:leading-[72px]">
              Before the idea becomes clear.
            </h3>
            <p className="max-w-[620px] text-[15px] leading-[25px] text-paper/65">
              I made this while thinking about your question. It did not exist before this proposal. The relationships keep changing because they do in me, too. What remains at the center is the outcome: everything comes together to form the big idea, a vessel for what makes you special.
            </p>
          </div>
          <div className="border-y border-paper/20">
            <div className="relative mx-auto aspect-[3/4] max-w-[1120px] md:aspect-[16/9]">
              <svg aria-hidden="true" viewBox="0 0 1000 500" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {processConnections.map(([from, to], index) => {
                const path = getProcessPath(from, to, index)
                const connected = activeSignal === from || activeSignal === to
                const dimmed = activeSignal !== null && !connected
                const duration = 7.5 + (index % 6) * 0.8
                return (
                  <path
                    key={`${from}-${to}`}
                    d={path.initial}
                    fill="none"
                    stroke={connected ? 'var(--color-mac)' : 'currentColor'}
                    opacity={connected ? '0.9' : dimmed ? '0.05' : '0.28'}
                    strokeWidth={connected ? '1.6' : '1'}
                    pathLength="1"
                    strokeDasharray="1"
                    strokeDashoffset={reduceMotion ? 0 : 1}
                    className="transition-[stroke,opacity,stroke-width] duration-300"
                  >
                    {!reduceMotion ? (
                      <>
                        <animate
                          attributeName="d"
                          values={path.values}
                          dur={`${duration}s`}
                          begin={`${-(index % 8) * 0.7}s`}
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-dashoffset"
                          values="1;0;0;-1"
                          keyTimes="0;0.34;0.74;1"
                          dur={`${duration + 2.5}s`}
                          begin={`${-(index % 6) * 0.9}s`}
                          repeatCount="indefinite"
                        />
                        {activeSignal === null ? (
                          <animate
                            attributeName="opacity"
                            values="0.06;0.34;0.22;0.06"
                            keyTimes="0;0.3;0.76;1"
                            dur={`${duration + 2.5}s`}
                            begin={`${-(index % 7) * 0.8}s`}
                            repeatCount="indefinite"
                          />
                        ) : null}
                      </>
                    ) : null}
                  </path>
                )
              })}
              </svg>
              {processSignals.map((signal, index) => {
                const isOutcome = 'outcome' in signal && signal.outcome
                const tooltipBelow = signal.y < 24
                const tooltipAlign =
                  signal.x < 25 ? 'left-0' : signal.x > 72 ? 'right-0' : 'left-1/2 -translate-x-1/2'
                return (
                <button
                  type="button"
                  key={signal.label}
                  aria-label={`${signal.label}: ${signal.note}`}
                  className={`group absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-ink text-left hover:z-30 focus-visible:z-30 md:gap-3 ${
                    isOutcome ? 'z-10 border border-mac px-4 py-3 shadow-[0_0_0_18px_var(--color-ink)] md:px-5 md:py-4 md:shadow-[0_0_0_28px_var(--color-ink)]' : 'px-2 py-2 md:px-3'
                  }`}
                  style={{ left: `${signal.x}%`, top: `${signal.y}%` }}
                  onMouseEnter={() => setActiveSignal(index)}
                  onMouseLeave={() => setActiveSignal(null)}
                  onFocus={() => setActiveSignal(index)}
                  onBlur={() => setActiveSignal(null)}
                >
                  <span className={`${isOutcome ? 'h-3 w-3' : 'h-2 w-2'} shrink-0 bg-mac transition-transform duration-300 ${activeSignal === index ? 'scale-150' : ''}`} />
                  <span className={`serif whitespace-nowrap ${isOutcome ? 'text-[18px] leading-[23px] md:text-[28px] md:leading-[32px]' : 'text-[15px] leading-[20px] md:text-[23px] md:leading-[28px]'}`}>
                    {signal.label}
                  </span>
                  <span
                    role="tooltip"
                    className={`pointer-events-none absolute z-40 w-[190px] border border-paper/20 bg-paper px-4 py-3 text-[12px] leading-[18px] text-ink opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                      tooltipBelow ? 'top-full mt-3 translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0' : 'bottom-full mb-3 -translate-y-1 group-hover:translate-y-0 group-focus-visible:translate-y-0'
                    } ${tooltipAlign}`}
                  >
                    {signal.note}
                  </span>
                </button>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-7 sm:flex-row">
            <span className="eyebrow text-paper/45">No fixed beginning</span>
            <span className="eyebrow text-paper/45">No fixed center</span>
            <span className="eyebrow text-paper/45">No two projects produce the same map</span>
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-12 border-t border-[var(--color-rule)] py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
          <div>
            <span className="eyebrow text-ink-2">A note on process</span>
            <h3 className="display mt-7 max-w-[460px] text-[46px] leading-[49px] md:text-[62px] md:leading-[63px]">
              The honest answer is that it is complicated.
            </h3>
          </div>
          <div className="max-w-[720px]">
            <p className="serif text-[27px] leading-[37px]">
              You asked about my process. I have a clean answer for the parts that can be scheduled: we talk, I listen, we align, I make, and we refine. The honest answer about the creative part is messier.
            </p>
            <div className="mt-8 space-y-5 text-[15px] leading-[25px] text-ink-2">
              <p>
                It is intuition, and intuition is an antenna. It is the ability to pick up on the right frequency from the client, from culture, and from all the context I have collected over time. It is remembering what failed in the past, sensing what feels exhausted in the present, and imagining what could be right for tomorrow. It is empathy for the person in front of me, curiosity about the world they are trying to build, and enough love for the work to match their passion. This is more than a contract for me.
              </p>
              <p>
                Then there is decisiveness. Intuition may catch the right frequency, but being decisive is having the guts to follow it. That means knowing when difference is meaningful, when risk is worth taking, when restraint is smarter, and when an idea needs to be protected before everyone else can see it.
              </p>
              <p>
                The environment changes too. Some ideas arrive in seconds. Others take weeks. The challenge may send me into the woods for two weeks or into a happy hour full of suits. Sometimes I need distance. Sometimes I need to get close to the people, rituals, and context surrounding the work. The process is mental, environmental, and specific to the question in front of me.
              </p>
              <p>
                I would like to simplify that for you, but I cannot do it honestly. It is a web of references, conversations, failures, obsessions, taste, timing, memory, instinct, and relationships between things I may not fully recognize until the work reveals them. The deliverables and decisions will be clear. The inner process will always contain some mystery. I do not think that is a weakness in creative work. I think it is where much of the value lives.
              </p>
              <p>
                That is why the question feels so appropriate coming from Emergences Labs. In the mysteries underneath AI, there is a mystery to my creative process too. The route may change, but the thing I am after does not: the big idea. It is the vessel for what makes you special, clear enough for strategy, identity, product, and every expression that follows to belong to it. I can tell you exactly how we will work together. I just cannot pretend the creative leap comes from a recipe.
              </p>
            </div>
            <div className="mt-10 border-t border-[var(--color-rule)] pt-6">
              <img
                src="/signatures/sean-ashlow.png"
                alt="Sean Ashlow"
                className="h-auto w-[230px] md:w-[270px]"
              />
              <span className="eyebrow mt-2 block text-ink-2">Founder and Creative Director, Anchovies</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Scope() {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 06 - The engagement" right="Four connected phases" />
      <div className="grid gap-10 py-14 lg:grid-cols-[1fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[50px] leading-[54px] md:text-[76px] md:leading-[76px]">
            One master brand. Two focused product identities. One connected system.
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            Working on the three brands together lets us share discovery, align the architecture early, and give each product its own character without paying to solve the same strategic questions three separate times.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase, index) => (
          <Reveal key={phase.num} className={`grid gap-8 py-12 lg:grid-cols-[100px_0.9fr_1.1fr] lg:gap-12 ${index < phases.length - 1 ? 'border-b border-[var(--color-rule)]' : ''}`}>
            <div>
              <span className="display text-[64px] leading-[64px]">{phase.num}</span>
              <span className="eyebrow mt-4 block text-ink-2">Phase</span>
            </div>
            <div>
              <h3 className="serif text-[36px] leading-[42px]">{phase.title}</h3>
              <p className="mt-5 max-w-[520px] text-[14px] leading-[23px] text-ink-2">{phase.body}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {phase.items.map((item) => (
                <div key={item} className="flex gap-3 border-t border-[#DDD8CD] pt-3">
                  <span className="mt-[9px] h-px w-3 shrink-0 bg-[var(--color-rule)]" />
                  <span className="text-[13px] leading-[20px]">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 07 - Timeline" right="6 weeks" />
      <Reveal>
        <h2 className="display max-w-[900px] py-14 text-[50px] leading-[54px] md:text-[76px] md:leading-[76px]">
          Enough time to find the right idea. Enough momentum to keep it alive.
        </h2>
      </Reveal>
      <Reveal className="border-t border-[var(--color-rule)]">
        {timeline.map(([when, title, body]) => (
          <div key={when} className="grid gap-4 border-b border-[var(--color-rule)] py-7 md:grid-cols-[150px_280px_1fr] md:gap-8">
            <span className="eyebrow pt-2 text-ink-2">{when}</span>
            <span className="serif text-[25px] leading-[31px]">{title}</span>
            <p className="max-w-[620px] text-[14px] leading-[22px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 08 - Investment" right="One complete engagement" />
      <div className="grid gap-12 py-14 lg:grid-cols-[1fr_420px] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[720px] text-[52px] leading-[56px] md:text-[82px] md:leading-[82px]">
            Three identities, built as one family.
          </h2>
        </Reveal>
        <Reveal className="border border-mac p-8">
          <span className="eyebrow text-mac">Total project fee</span>
          <div className="display mt-5 text-[78px] leading-[82px]">$45,000</div>
          <div className="mt-7 border-t border-[var(--color-rule)] pt-5 text-[13px] leading-[21px] text-ink-2">
            <p>Six-week target</p>
            <p>50% / 25% / 25% milestone structure</p>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)]">
        {investment.map(([num, title, body, amount]) => (
          <div key={num} className="grid gap-4 border-b border-[var(--color-rule)] py-7 md:grid-cols-[60px_280px_1fr_120px] md:gap-8">
            <span className="eyebrow pt-2 text-ink-2">{num}</span>
            <span className="serif text-[25px] leading-[31px]">{title}</span>
            <p className="max-w-[610px] text-[13px] leading-[21px] text-ink-2">{body}</p>
            <span className="serif text-[25px] leading-[31px] md:text-right">{amount}</span>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-12 grid gap-8 border border-mac p-8 md:grid-cols-[0.7fr_1.3fr] md:p-10">
        <div>
          <span className="eyebrow text-mac">Three-brand partnership</span>
          <p className="serif mt-5 text-[28px] leading-[35px]">Built together for less duplication and more coherence.</p>
        </div>
        <div>
          <p className="text-[14px] leading-[23px] text-ink-2">
            Commissioned separately, three identities of this depth would exceed this investment. We are packaging the Emergences Labs master identity with focused identities for NeoWork and NeoHuman at $45,000 because the work is unusually aligned with where Anchovies wants to go, and because we see the opportunity to earn a long-term creative relationship from the start.
          </p>
          <p className="mt-5 text-[14px] leading-[23px] text-ink-2">
            Shared discovery and one coordinated process make the package more efficient without asking any one brand to feel like an afterthought.
          </p>
        </div>
      </Reveal>
      <Reveal className="mt-14">
        <MetaRow left="Payment milestones" right="$45,000 total" />
        <div className="mt-6 grid border border-[var(--color-rule)] md:grid-cols-3">
          {milestones.map(([percent, amount, body], index) => (
            <article key={`${percent}-${index}`} className={`min-h-[225px] p-7 ${index < 2 ? 'border-b border-[var(--color-rule)] md:border-b-0 md:border-r' : ''}`}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="display text-[48px] leading-[50px]">{percent}</span>
                <span className="serif text-[22px]">{amount}</span>
              </div>
              <p className="mt-10 text-[13px] leading-[21px] text-ink-2">{body}</p>
            </article>
          ))}
        </div>
      </Reveal>
      <Reveal className="mt-14 grid border-y border-[var(--color-rule)] md:grid-cols-2">
        {boundaries.map(([title, body], index) => (
          <article key={title} className={`min-h-[210px] p-8 ${index < boundaries.length - 2 ? 'border-b border-[var(--color-rule)]' : ''} ${index % 2 === 0 ? 'md:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">Note {String(index + 1).padStart(2, '0')}</span>
            <h3 className="serif mt-6 text-[28px] leading-[34px]">{title}</h3>
            <p className="mt-4 text-[13px] leading-[21px] text-ink-2">{body}</p>
          </article>
        ))}
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 09 - In closing" right="Anchovies x Emergences Labs · 2026" dark />
      <Reveal>
        <h2 className="display max-w-[1120px] py-16 text-[52px] leading-[56px] md:text-[86px] md:leading-[84px] lg:text-[102px] lg:leading-[98px]">
          Build the institution people look to when they want to understand what humans can become.
        </h2>
      </Reveal>
      <div className="grid gap-10 border-t border-paper/20 pt-10 lg:grid-cols-[1fr_440px] lg:gap-24">
        <Reveal>
          <p className="serif max-w-[690px] text-[27px] leading-[37px] text-paper/90">
            The goal is not to make Emergences Labs look less like an AI company. It is to give the organization a visual idea strong enough to set a new standard for the category.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-6">
          <p className="text-[14px] leading-[23px] text-paper/60">
            The updated agreement confirms the complete three-brand scope, the named working team, approval-gated payments, and what happens if the first creative direction does not reach the agreed outcome.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={calendarHref} variant="light">Schedule proposal review</AnchorButton>
            <AnchorButton href={contractHref} variant="outline">Review contract</AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="mt-20 flex flex-col justify-between gap-8 border-t border-paper/20 pt-8 sm:flex-row sm:items-end">
        <div>
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[15px] w-auto invert" />
          <p className="mt-4 text-[12px] text-paper/50">Creative direction led by Sean Ashlow</p>
        </div>
        <div className="text-left sm:text-right">
          <span className="eyebrow block text-paper/45">Prepared for Emergences Labs</span>
          <span className="eyebrow mt-2 block text-paper/45">July 2026</span>
        </div>
      </Reveal>
    </section>
  )
}

export function EmergencesLabsProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Emergences Labs - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', 'A brand identity and product design system proposal for Emergences Labs from Anchovies.')
  }, [])

  return (
    <main className="emergences-labs-proposal overflow-x-hidden bg-paper text-ink">
      <ProposalNav />
      <Hero />
      <WhatWeHeard />
      <BigIdea />
      <SelectedWork />
      <Process />
      <Scope />
      <Timeline />
      <Investment />
      <Closing />
    </main>
  )
}
