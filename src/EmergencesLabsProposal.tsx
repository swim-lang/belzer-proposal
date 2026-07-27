import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const acceptHref =
  'mailto:sean@anchovies.agency?subject=Emergences%20Labs%20Proposal&body=Hi%20Sean%2C%0A%0AWe%27d%20like%20to%20move%20forward%20with%20the%20Emergences%20Labs%20brand%20identity%20and%20design%20system.%0A%0A'

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
  ['03', 'One identity, several expressions', 'The master system must hold the lab, NeoWork, NeoHuman, research, product experiences, social content, and future launches together.'],
  ['04', 'Focused, not finished', 'You have references, internal thinking, and strong opinions. Our job is to turn that useful direction into alignment and one ownable idea.'],
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
    body: 'A clear family architecture for Emergences Labs, NeoWork, and NeoHuman, with product-facing design studies that show how the system behaves in practice.',
  },
  {
    title: 'A world worth entering.',
    body: 'Motion, research, social, merchandise, events, and presentations that make the identity feel bigger than a logo and ready for public attention.',
  },
]

const selectedWork = [
  {
    name: 'Lex Politica',
    label: 'Institutional authority',
    image: '/work/emergences/lex-politica.jpg',
    href: 'https://anchovies.agency/work/lex-politica',
    body: 'A single ownable mark helped a new legal intelligence platform feel part newspaper, part institution, and part modern think tank. The identity carries authority without becoming conservative or expected.',
  },
  {
    name: 'Out There',
    label: 'World-building',
    image: '/work/emergences/out-there.svg',
    href: 'https://anchovies.agency/work/out-there',
    body: 'We turned a broad creative company into a distinct world with its own name, point of view, and visual logic. The process started with what the company believed, then found the clearest form for it.',
  },
  {
    name: 'Freddie',
    label: 'Humanizing a technical category',
    image: '/work/emergences/freddie.jpg',
    href: 'https://anchovies.agency/work/freddie',
    body: 'A performance-oriented product became warmer, stranger, and more culturally alive through illustration, motion, and a flexible identity. The work made the category feel human without losing product credibility.',
  },
]

const principles = [
  ['Listen for the worldview', 'We learn the business, but the deeper work is understanding how Emergences Labs sees people, work, learning, and the future. That is where the identity becomes specific.'],
  ['Align before designing', 'We review the internal survey, reference set, and stakeholder perspectives, then use a guided visual exercise to find genuine agreement before creative development begins.'],
  ['Lead with one answer', 'We present one recommended identity direction and push it far enough to judge as a complete system. More effort goes into the strongest idea instead of spreading attention across weaker options.'],
  ['Improvise with intent', 'The process has structure, but the creative route is tailored to the problem. Every project asks for a different way in. The constants are relevance, simplicity, distinction, and clear reasoning.'],
]

const phases = [
  {
    num: '01',
    title: 'Discovery and alignment',
    body: 'We turn the thinking already inside the team into a shared creative brief. This phase creates confidence around the outcomes, not a rigid prescription for what the logo must look like.',
    items: [
      'Founder and stakeholder discovery session',
      'Internal survey and reference-set review',
      'Category and visual landscape audit',
      'Audience, product, and brand architecture review',
      'Success criteria and creative brief',
      'Guided interactive moodboard',
    ],
  },
  {
    num: '02',
    title: 'Big idea and identity',
    body: 'We find the central idea that can make Emergences Labs feel like a serious institution built around human potential, then develop it as one complete recommended identity.',
    items: [
      'Creative concept and narrative',
      'Primary logo or wordmark',
      'Ownable brand mark',
      'Responsive lockups and submarks',
      'Typography and color system',
      'Graphic, image, and editorial language',
      'One identity presentation',
      'Two structured refinement rounds',
    ],
  },
  {
    num: '03',
    title: 'Digital and product expression',
    body: 'We show how the identity moves from the research lab into products. These are high-fidelity brand and interface studies that give internal teams a practical visual system to extend.',
    items: [
      'Emergences Labs, NeoWork, and NeoHuman family architecture',
      'Digital design tokens and component direction',
      'Product-site homepage direction',
      'Assessment and results interface studies',
      'Dashboard and learning-surface studies',
      'Data visualization and icon direction',
      'Responsive desktop and mobile examples',
      'Figma design system library',
    ],
  },
  {
    num: '04',
    title: 'Launch world and handoff',
    body: 'We make the system feel real across the places people will encounter it, then package the work so the team can use it with confidence.',
    items: [
      'Research report or publication template',
      'Presentation deck template',
      'Social content starter system',
      'Profile and launch assets',
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
  ['Week 02', 'Find the creative territory', 'Guided moodboard, creative brief, brand architecture, and approval of the direction we will explore.'],
  ['Weeks 03 to 05', 'Build the identity', 'One recommended concept developed across logo, type, color, visual language, and initial applications.'],
  ['Weeks 06 to 08', 'Extend the system', 'Product and website studies, research and social applications, motion, merchandise, and event concepts.'],
  ['Weeks 09 to 10', 'Refine and hand off', 'Structured refinement, final assets, Figma library, brand guide, training, and launch support.'],
]

const investment = [
  ['01', 'Discovery and creative strategy', 'Alignment, category review, brand architecture, guided moodboard, success criteria, and creative brief.', '$5,000'],
  ['02', 'Identity and core design system', 'One lead concept, logo suite, typography, color, graphic language, image direction, and foundational applications.', '$14,500'],
  ['03', 'Digital and product expression', 'Family architecture, product-site direction, interface studies, data and icon direction, responsive examples, and Figma system.', '$8,500'],
  ['04', 'Motion, applications, and handoff', 'Motion identity, research and deck templates, social system, launch assets, merchandise, event concepts, guide, and support.', '$7,000'],
]

const milestones = [
  ['50%', '$17,500', 'Due at kickoff to schedule the engagement and begin discovery.'],
  ['25%', '$8,750', 'Due after presentation and approval of the core identity direction.'],
  ['25%', '$8,750', 'Due before final files, Figma library, brand guide, and handoff.'],
]

const boundaries = [
  ['One lead direction', 'The engagement is built around one recommended identity concept, supported by two structured refinement rounds.'],
  ['Product expression', 'Product and interface work is designed to establish the visual system. Full product UX, engineering, and coded websites are not included.'],
  ['Team access', 'Sean remains the creative lead and primary point of contact, with the Anchovies team brought in where their specialties strengthen the work.'],
  ['Client inputs', 'Emergences Labs provides timely access to stakeholders, internal research, current product context, and consolidated feedback.'],
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
          <AnchorButton href={calendarHref}>Schedule proposal review</AnchorButton>
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
          ['The form', 'One identity, many expressions'],
          ['The engagement', '$35,000 · 8 to 10 weeks'],
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
      <MetaRow left="§ 02 - What we heard" right="A focused starting point" />
      <div className="grid gap-14 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[590px] text-[50px] leading-[54px] md:text-[74px] md:leading-[74px]">
            You know the register. You need the idea.
          </h2>
          <p className="mt-8 max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            Parable, Cosmos Institute, Anthropic, and Lex Politica point toward a world with intelligence, restraint, and cultural weight. They are useful coordinates, not a finished identity. The work is to find the one idea only Emergences Labs can own.
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
        <Reveal className="grid border-t border-paper/25 sm:grid-cols-2">
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
      <MetaRow left="§ 04 - Selected work" right="Three relevant ways we think" />
      <div className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[650px] text-[50px] leading-[54px] md:text-[74px] md:leading-[74px]">
            The process changes because the problem changes.
          </h2>
        </Reveal>
        <Reveal className="max-w-[600px] pt-2">
          <p className="text-[16px] leading-[26px] text-ink-2">
            We do not apply one aesthetic or repeat one formula. Each identity begins with a different tension, then finds the simplest distinctive system capable of resolving it. These projects show three parts of that range.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-px bg-[var(--color-rule)] border border-[var(--color-rule)] lg:grid-cols-3">
        {selectedWork.map((project) => (
          <Reveal key={project.name} className="group bg-paper">
            <a href={project.href} target="_blank" rel="noreferrer" className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                <img src={project.image} alt={`${project.name} brand identity`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 hidden items-end bg-ink/90 p-7 text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex">
                  <p className="text-[14px] leading-[22px]">{project.body}</p>
                </div>
              </div>
              <div className="min-h-[188px] p-7">
                <span className="eyebrow text-ink-2">{project.label}</span>
                <h3 className="serif mt-5 text-[34px] leading-[39px]">{project.name}</h3>
                <p className="mt-4 text-[13px] leading-[21px] text-ink-2 lg:hidden">{project.body}</p>
                <span className="mt-6 inline-block text-[12px] text-mac">View project</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 05 - How we work" right="Structure with room to discover" />
      <Reveal>
        <h2 className="display max-w-[980px] py-14 text-[50px] leading-[54px] md:text-[76px] md:leading-[76px]">
          Confidence comes from alignment, judgment, and one idea carried far enough.
        </h2>
      </Reveal>
      <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2">
        {principles.map(([title, body], index) => (
          <Reveal key={title} className={`min-h-[280px] p-8 md:p-10 ${index < 2 ? 'border-b border-[var(--color-rule)]' : ''} ${index % 2 === 0 ? 'md:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">Principle {String(index + 1).padStart(2, '0')}</span>
            <h3 className="serif mt-8 text-[33px] leading-[39px]">{title}</h3>
            <p className="mt-5 max-w-[530px] text-[14px] leading-[23px] text-ink-2">{body}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 grid gap-8 border border-mac p-8 md:grid-cols-[0.7fr_1.3fr] md:p-10">
        <span className="eyebrow text-mac">Creative leadership</span>
        <p className="serif max-w-[780px] text-[26px] leading-[35px]">
          Sean remains the creative director and primary point of contact throughout the engagement. The team supports the work, but the relationship is never handed off.
        </p>
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
            One system, developed from first principles to final use.
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            The scope is intentionally broad enough to prove the identity across real product and public contexts, while staying focused on the core system your team can extend.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[100px_0.9fr_1.1fr] lg:gap-12">
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
      <MetaRow left="§ 07 - Timeline" right="8 to 10 weeks" />
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
            Brand identity and product design system.
          </h2>
        </Reveal>
        <Reveal className="border border-mac p-8">
          <span className="eyebrow text-mac">Total project fee</span>
          <div className="display mt-5 text-[78px] leading-[82px]">$35,000</div>
          <div className="mt-7 border-t border-[var(--color-rule)] pt-5 text-[13px] leading-[21px] text-ink-2">
            <p>Eight to ten weeks</p>
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
      <Reveal className="mt-14">
        <MetaRow left="Payment milestones" right="$35,000 total" />
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
          <article key={title} className={`min-h-[210px] p-8 ${index < 2 ? 'border-b border-[var(--color-rule)]' : ''} ${index % 2 === 0 ? 'md:border-r' : ''}`}>
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
            We can use a proposal review to meet additional stakeholders, answer questions, and confirm the right starting point before kickoff.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={calendarHref} variant="light">Schedule proposal review</AnchorButton>
            <AnchorButton href={acceptHref} variant="outline">Accept proposal</AnchorButton>
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
