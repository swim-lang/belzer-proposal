import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://pitch.com/v/sleep-like-a-goddess-meb4m4'

const navSections = [
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'what-this-creates', label: 'Goals' },
  { id: 'approach', label: 'Scope' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'begin', label: 'Begin' },
]

const movements = [
  {
    label: 'Movement 01',
    name: 'System',
    desc: "A coherent visual language that's easier to apply across every touchpoint.",
  },
  {
    label: 'Movement 02',
    name: 'Identity',
    desc: 'A refined letter mark plus one additional symbol direction to evaluate.',
  },
  {
    label: 'Movement 03',
    name: 'Site',
    desc: 'Three primary website pages, designed for desktop and mobile.',
  },
  {
    label: 'Movement 04',
    name: 'Guide',
    desc: 'A practical brand guide built for developers, photographers, and partners.',
  },
]

const outcomes = [
  {
    title: 'A brand system that is easier to use.',
    body: "You already have a meaningful strategy, visual references, a logo direction, colors, and typography. We'll bring those pieces into a more coherent system so the brand becomes easier to apply across every touchpoint.",
  },
  {
    title: 'A more resolved identity.',
    body: "We'll refine the existing letter mark so it feels more balanced, legible, premium, and practical across digital and print. Alongside that, we'll explore one additional symbol opportunity rooted in the world of the brand.",
  },
  {
    title: 'A digital foundation for the website.',
    body: "Because the website will be one of the first places people experience the brand, we'll design three primary pages of your choice, including mobile.",
  },
  {
    title: 'A brand that can travel into hospitality.',
    body: "Your long-term vision for hotels, retreats, wellness destinations, and high-end sleep programs is an important part of the brand's potential.",
  },
]

const phases = [
  {
    num: '01',
    title: 'Brand system review',
    body: "We'll begin by reviewing the current brand book, logo files, colors, typography, references, and existing design direction. From there, we'll identify the strongest elements and clarify where the system needs more structure.",
    goal: 'Goal - a clean foundation before moving into design',
    includes: [
      'Brand book review',
      'Logo and lockup review',
      'Color and typography review',
      'Visual language review',
      'Website needs review',
      'Recommendations on what to preserve, refine, or simplify',
    ],
  },
  {
    num: '02',
    title: 'Identity refinement',
    body: "We'll refine the current letter mark direction so it feels more polished and usable. We'll also explore one additional symbol direction to see if there's a stronger visual opportunity within the brand story.",
    goal: 'Goal - a resolved identity with a second path to evaluate',
    includes: [
      'Refined letter mark',
      'Primary logo lockup direction',
      'Secondary lockup direction',
      'Small-use considerations',
      'One additional symbol exploration',
      'Identity recommendation',
    ],
  },
  {
    num: '03',
    title: 'Visual system development',
    body: "We'll build a practical system around the identity so the brand has more than individual ingredients: the core decisions that help everything feel consistent.",
    goal: 'Goal - individual ingredients become a coherent system',
    includes: [
      'Color usage',
      'Typography hierarchy',
      'Layout and spacing direction',
      'Photography direction',
      'Editorial styling',
      'Button and UI direction',
      'Graphic language',
      'Digital and print usage notes',
    ],
  },
  {
    num: '04',
    title: 'Website design direction',
    body: "We'll design three primary website pages of your choice, including mobile versions, selected based on what will be most useful for launch.",
    goal: 'Goal - the brand system tested in its first real environment',
    includes: [
      'Homepage',
      'Product listing page',
      'Product detail page',
      'About page',
      'Journal or editorial page',
      'Rest guide or education page',
    ],
  },
  {
    num: '05',
    title: 'Final brand guide',
    body: "We'll package the refined identity, visual system, and website direction into a clear brand guide: a practical reference for your developer, photographer, packaging vendor, email designer, and future collaborators.",
    goal: 'Goal - a practical reference any future collaborator can use',
    includes: [
      'Logo system',
      'Color system',
      'Typography system',
      'Visual language',
      'Photography direction',
      'Website design direction',
      'Sample applications',
      'Usage guidance',
      'Asset handoff notes',
    ],
  },
]

const deliverables = [
  ['D / 01', 'Refined letter mark', 'A more functional, more legible version of the existing direction.', 'Identity'],
  ['D / 02', 'One additional symbol exploration', 'A second, ownable path - for evaluation, not commitment.', 'Identity'],
  ['D / 03', 'Recommended primary identity direction', 'Our point of view on which direction will serve the brand best.', 'Identity'],
  ['D / 04', 'Logo lockup guidance', "Primary and secondary lockups, sized for the places they'll appear.", 'Identity'],
  ['D / 05', 'Refined color and typography', 'Hierarchy, usage, and pairings - the editorial backbone.', 'System'],
  ['D / 06', 'Visual language system', 'Color, type, layout, photography, and graphic language as one coherent system.', 'System'],
  ['D / 07', 'Three website page designs', 'Your three priority pages, rendered as the site is meant to feel.', 'Web'],
  ['D / 08', 'Mobile versions of the same pages', 'The same three pages, designed for the device most people will use.', 'Web'],
  ['D / 09', 'Practical brand guidelines document', 'A guide built for use, not for impressing strangers in a meeting.', 'Guide'],
  ['D / 10', 'Exported assets for next-step usage', 'Logo files, swatches, and references - packaged and ready.', 'Handoff'],
]

const schedule = [
  {
    week: 'Week one',
    title: 'Audit, refine, explore.',
    days: [
      ['Mo', 'Kickoff'],
      ['Tu', 'Brand system review'],
      ['We', 'Identity refinement'],
      ['Th', 'Symbol exploration'],
      ['Th', 'Initial visual system direction'],
      ['Fr', 'First presentation'],
    ],
  },
  {
    week: 'Week two',
    title: 'Build, test, hand off.',
    days: [
      ['Mo', 'Direction refinement'],
      ['Tu', 'Website page design'],
      ['We', 'Mobile design'],
      ['Th', 'Final brand guide'],
      ['Fr', 'Final presentation'],
      ['Fr', 'Asset handoff'],
    ],
  },
]

const access = [
  ['A / 01', 'A more premium first impression', 'From the moment a customer or partner meets the brand, the system carries the same quality as the product.'],
  ['A / 02', 'A clearer system for your website', "A foundation that's already been tested in real pages, ready for whoever builds it."],
  ['A / 03', 'A stronger basis for packaging and print', 'A tactile world where the brand can extend without losing its register.'],
  ['A / 04', 'A more useful guide for collaborators', 'Developers, photographers, and vendors get a reference made for use, not display.'],
  ['A / 05', 'A more consistent customer experience', 'Site, email, packaging, and social all hold the same temperature.'],
  ['A / 06', 'A brand world ready for hospitality', 'Built to support D2C, hospitality, wellness, and retreat partnerships from the start.'],
  ['A / 07', 'A visual foundation ready for launch', 'A foundation that makes the product feel more considered, more desirable, more inevitable.'],
]

const beginSteps = [
  ['01', 'Kickoff conversation', 'A short call to align on tone, audience, and the long view for the brand.'],
  ['02', 'Confirm the three pages', 'Choose the three website pages most useful for launch - the system will be tested there first.'],
  ['03', 'Gather final assets', 'Existing files, references, and any in-progress materials - a single, clean handoff to begin from.'],
  ['04', 'Begin the two-week sprint', 'A clearer identity, a stronger system, and a practical foundation for launch - all by the end of the engagement.'],
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

function LeadBlock({
  eyebrow,
  meta,
  headline,
  body,
  id,
}: {
  eyebrow: string
  meta: string
  headline: string
  body: string
  id?: string
}) {
  return (
    <section id={id} className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left={eyebrow} right={meta} />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            {headline}
          </h2>
        </Reveal>
        <Reveal className="max-w-[480px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">{body}</p>
        </Reveal>
      </div>
    </section>
  )
}

function ListRow({ item, index, kind = 'outcome' }: { item: string[] | { title: string; body: string }; index: number; kind?: 'outcome' | 'deliverable' | 'access' }) {
  if (kind === 'outcome' && !Array.isArray(item)) {
    return (
      <Reveal className="flex flex-col gap-6 border-t border-[var(--color-rule)] py-10 md:grid md:grid-cols-[80px_1.2fr_1fr] md:gap-16 lg:py-14">
        <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')} / 04</span>
        <h3 className="serif max-w-[560px] text-[32px] leading-[36px] tracking-[-0.018em] md:text-[44px] md:leading-[48px]">
          {item.title}
        </h3>
        <p className="max-w-[460px] pt-1 text-[15px] leading-[24px] text-ink-2">{item.body}</p>
      </Reveal>
    )
  }

  const [label, title, body, category] = item as string[]
  return (
    <Reveal
      className={`grid gap-4 border-b border-[rgba(31,25,18,0.2)] py-7 md:grid-cols-[72px_1fr_1fr_96px] md:items-center md:gap-8 ${
        kind === 'access' ? 'md:grid-cols-[72px_1fr_1fr]' : ''
      }`}
    >
      <span className="eyebrow text-ink-2">{label}</span>
      <h3 className={`${kind === 'access' ? 'text-[28px] leading-[34px] md:text-[32px] md:leading-[38px]' : 'text-[24px] leading-[32px]'} serif tracking-[-0.014em]`}>
        {title}
      </h3>
      <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
      {kind !== 'access' ? <span className="eyebrow hidden text-right text-ink-2 md:block">{category}</span> : null}
    </Reveal>
  )
}

function SleepNav() {
  const [active, setActive] = useState('opportunity')

  useEffect(() => {
    const sections = navSections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el)
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
          <span className="eyebrow text-ink-2">Prepared for Sleep Like a Goddess</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Brand System · v1</span>
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
              Sleep Like a Goddess
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] text-ink-2 lg:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-mac">
            Begin
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
          <span className="eyebrow">Brand System Refinement</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Prepared for Marion Voldan</span>
          <span className="eyebrow text-ink-2">By Anchovies</span>
        </Reveal>
      </div>

      <Reveal>
        <h1 className="display max-w-[1180px] pb-12 text-[46px] leading-[46px] tracking-[-0.025em] sm:text-[68px] sm:leading-[64px] md:text-[94px] md:leading-[86px] lg:pb-16 xl:text-[124px] xl:leading-[108px]">
          A clearer foundation for Sleep Like a Goddess to launch from.
        </h1>
      </Reveal>

      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-20">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[25px] leading-[33px] tracking-[-0.018em] md:text-[30px] md:leading-[38px] lg:text-[36px] lg:leading-[44px]">
            A refinement phase designed to shape the identity, build the visual system, and apply it to the website - so the brand can move forward with confidence.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-6 pt-2">
          <p className="text-[15px] leading-[23px] text-ink-2">
            The name has presence. The audience is thoughtful. The product sits in a beautiful space between restwear, wellness, quiet luxury, and personal ritual. This phase brings everything together into one usable system.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <AnchorButton>{'Book kickoff ->'}</AnchorButton>
            <AnchorButton href={workHref} variant="outline">
              Our work
            </AnchorButton>
          </div>
        </Reveal>
      </div>

      <Reveal className="flex flex-col gap-6 border-t border-[var(--color-rule)] pt-12">
        <div className="flex items-center justify-between gap-8">
          <span className="eyebrow text-ink-2">Fig. 01 - What this phase shapes</span>
          <span className="eyebrow text-right text-ink-2">Four movements</span>
        </div>
        <div className="grid border-y border-[var(--color-rule)] sm:grid-cols-2 xl:grid-cols-4">
          {movements.map((movement, index) => (
            <div
              key={movement.name}
              className={`flex min-h-[220px] flex-col gap-6 border-[var(--color-rule)] p-8 md:p-10 ${
                index < movements.length - 1 ? 'border-b sm:border-b-0 xl:border-r' : ''
              } ${index % 2 === 0 ? 'sm:border-r' : ''}`}
            >
              <span className="eyebrow text-ink-2">{movement.label}</span>
              <span className="serif text-[36px] leading-[40px] tracking-[-0.02em] md:text-[44px] md:leading-[48px]">{movement.name}</span>
              <span className="text-[13px] leading-[20px] text-ink-2">{movement.desc}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Opportunity() {
  return (
    <section id="opportunity" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 02 - A clearer foundation" right="For launch and beyond" />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[680px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Refinement,
            <br />
            clarity,
            <br />
            application.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[480px] flex-col gap-6 pt-2 text-[15px] leading-[24px]">
          <p>Sleep Like a Goddess already has a strong emotional foundation. The current brand work has captured a lot of the feeling - the next step is bringing everything into a more usable system.</p>
          <p>We'll take the strongest pieces already in place and shape them into a brand system that can move confidently across the website, packaging, email, social, photography, and future hospitality partnerships.</p>
          <p>The goal is simple: give Sleep Like a Goddess a visual foundation that feels as considered as the product itself.</p>
          <p className="text-ink-2">A system designed to support a long view - from D2C launch to the hotels, retreats, and wellness destinations the brand will eventually live inside.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Outcomes() {
  return (
    <section id="what-this-creates" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 03 - What this phase creates" right="Four outcomes" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            What this
            <br />
            phase creates.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">Four outcomes shape the engagement - each one giving Sleep Like a Goddess access to a stronger, more usable foundation for launch and the years that follow.</p>
        </Reveal>
      </div>
      {outcomes.map((outcome, index) => (
        <ListRow key={outcome.title} item={outcome} index={index} />
      ))}
    </section>
  )
}

function DarkQuote() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-40">
      <MetaRow left="§ 04 - The brand's potential" right="Where it can sit" dark />
      <div className="flex flex-col gap-12 border-t border-paper/20 pt-14 lg:flex-row lg:items-start lg:gap-20 lg:pt-16">
        <Reveal className="flex-[1.4]">
          <blockquote className="serif max-w-[880px] text-[42px] italic leading-[48px] tracking-[-0.02em] md:text-[68px] md:leading-[74px] lg:text-[88px] lg:leading-[92px]">
            "A rare space - refined restwear with emotional intelligence, wellness credibility, and enough restraint to feel timeless."
          </blockquote>
        </Reveal>
        <Reveal className="flex max-w-[380px] flex-col gap-6 pt-2 text-[15px] leading-[24px] text-paper/70 lg:pt-12">
          <p>Sleep Like a Goddess has the potential to occupy a space few brands manage to hold: warm enough for the customer at home, refined enough for the hotel that wants to carry it.</p>
          <p>This phase helps the brand step into that space with more confidence - a system that supports the product, the launch, and the partnerships still ahead.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 05 - Our approach" right="Five phases · Two weeks" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Our
            <br />
            approach.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">Five phases, designed to move in sequence - each one building on the last so the system gets sharper, clearer, and more practical as the work progresses.</p>
        </Reveal>
      </div>

      <div>
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
      </div>
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
          <p className="text-[15px] leading-[24px] text-ink-2">Everything Sleep Like a Goddess needs to brief a developer, photographer, packaging vendor, or future collaborator with confidence - designed for use, not display.</p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {deliverables.map((item, index) => (
          <ListRow key={item[0]} item={item} index={index} kind="deliverable" />
        ))}
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 07 - Timeline" right="Estimated · Two weeks" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display max-w-[720px] text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
            Two weeks,
            <br />
            start to handoff.
          </h2>
        </Reveal>
        <Reveal className="max-w-[460px] flex-1 pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">A focused engagement designed to move quickly without rushing - leaving you with a finished system, not a half-complete sketch.</p>
        </Reveal>
      </div>
      <div className="grid border-y border-[var(--color-rule)] lg:grid-cols-2">
        {schedule.map((week, weekIndex) => (
          <Reveal key={week.week} className={`flex flex-col gap-10 p-8 md:p-12 ${weekIndex === 0 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''}`}>
            <div className="flex items-baseline gap-6 border-b border-[rgba(31,25,18,0.2)] pb-4">
              <span className="serif text-[76px] leading-[76px] tracking-[-0.024em] md:text-[96px] md:leading-[96px]">{String(weekIndex + 1).padStart(2, '0')}</span>
              <div className="flex flex-col gap-2 pb-3">
                <span className="eyebrow text-ink-2">{week.week}</span>
                <h3 className="serif text-[30px] leading-[36px] tracking-[-0.018em]">{week.title}</h3>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {week.days.map(([day, task], index) => (
                <div key={`${day}-${task}-${index}`} className="flex items-baseline gap-5">
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
  const cards = [
    ['Identity', 'Logo + symbol', 'Refined letter mark, one alternative direction, and lockup recommendations.'],
    ['System', 'Visual language', 'Color, type, layout, photography, and editorial composition direction.'],
    ['Web', 'Three pages, x2', 'Three primary website pages, each in desktop and mobile.'],
    ['Handoff', 'Brand guidelines', 'A practical guide for briefing developers, photographers, and partners.'],
  ]

  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 08 - Investment" right="One fee, full scope" />
      <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20 lg:pb-20">
        <Reveal className="flex-[1.4]">
          <h2 className="display text-[72px] leading-[72px] tracking-[-0.025em] sm:text-[112px] sm:leading-[106px] lg:text-[160px] lg:leading-[152px]">$2,500</h2>
          <span className="eyebrow mt-6 block text-ink-2">Total · Two weeks · Full scope</span>
        </Reveal>
        <Reveal className="flex max-w-[460px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>This investment includes identity refinement, one additional symbol exploration, visual system development, three primary website page designs, mobile versions, and final brand guidelines.</p>
          <p className="text-ink-2">The original job post focused mainly on refining the brand guide. We are proposing a broader, more useful phase that helps resolve the identity, shape the system, and apply it directly to the website.</p>
          <p className="text-ink-2">This gives you more clarity before launch and a stronger foundation for the people who will help bring the brand to life.</p>
        </Reveal>
      </div>
      <div className="grid border-t border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card, index) => (
          <Reveal key={card[0]} className={`flex min-h-[190px] flex-col gap-3 border-[rgba(31,25,18,0.2)] p-8 md:p-10 ${index < cards.length - 1 ? 'border-b md:border-b-0 xl:border-r' : ''} ${index % 2 === 0 ? 'md:border-r xl:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">{card[0]}</span>
            <h3 className="serif text-[28px] leading-[32px] tracking-[-0.014em]">{card[1]}</h3>
            <p className="text-[13px] leading-[20px] text-ink-2">{card[2]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Access() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 09 - What this phase gives access to" right="Seven outcomes" />
      <Reveal>
        <h2 className="display max-w-[1100px] pb-16 text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:pb-20 lg:text-[88px] lg:leading-[84px]">
          What this phase gives Sleep Like a Goddess access to.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)] pt-8">
        {access.map((item, index) => (
          <ListRow key={item[0]} item={item} index={index} kind="access" />
        ))}
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <>
      <LeadBlock
        id="future-support"
        eyebrow="§ 10 - Future website support"
        meta="After this phase"
        headline="If the direction feels aligned, we can build the site too."
        body="After this phase, we can also discuss supporting the full website design and development. Our process allows us to move efficiently from design into build, which may allow us to offer competitive pricing for the next stage."
      />
      <section id="begin" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
        <MetaRow left="§ 11 - Next step" right="If this feels aligned" />
        <div className="flex flex-col gap-10 pb-16 lg:flex-row lg:items-start lg:gap-20">
          <Reveal className="flex-[1.2]">
            <h2 className="display text-[48px] leading-[48px] tracking-[-0.022em] md:text-[72px] md:leading-[70px] lg:text-[88px] lg:leading-[84px]">
              A simple way
              <br />
              to begin.
            </h2>
          </Reveal>
          <Reveal className="max-w-[460px] flex-1 pt-2">
            <p className="text-[15px] leading-[24px] text-ink-2">If this direction feels aligned, we can begin with a kickoff conversation, confirm the three website pages to prioritize, gather any final assets, and move into the two-week sprint.</p>
          </Reveal>
        </div>
        <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {beginSteps.map((step, index) => (
            <Reveal key={step[0]} className={`flex min-h-[320px] flex-col gap-5 border-[var(--color-rule)] p-8 ${index < beginSteps.length - 1 ? 'border-b md:border-b-0 xl:border-r' : ''} ${index % 2 === 0 ? 'md:border-r xl:border-r' : ''}`}>
              <span className="serif text-[56px] leading-[56px] tracking-[-0.02em]">{step[0]}</span>
              <span className="eyebrow text-ink-2">Step</span>
              <h3 className="serif text-[26px] leading-[32px] tracking-[-0.014em]">{step[1]}</h3>
              <p className="text-[13px] leading-[20px] text-ink-2">{step[2]}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 pb-24 pt-28 text-paper md:px-16 lg:px-[120px] lg:pb-40 lg:pt-[200px]">
      <MetaRow left="§ 12 - In closing" right="Where it leads" dark />
      <Reveal className="border-t border-paper/20 pt-14 lg:pt-20">
        <h2 className="display max-w-[1200px] text-[52px] leading-[54px] tracking-[-0.025em] md:text-[86px] md:leading-[86px] lg:text-[124px] lg:leading-[116px]">
          A clearer identity. A stronger system. A foundation worth launching from.
        </h2>
      </Reveal>
      <div className="flex flex-col gap-10 pt-12 lg:flex-row lg:items-start lg:gap-20">
        <Reveal className="max-w-[480px] flex-1">
          <p className="text-[15px] leading-[24px] text-paper/70">By the end of two weeks, Sleep Like a Goddess has the visual foundation it needs to move - considered enough for the customer at home, refined enough for the rooms it wants to enter next.</p>
        </Reveal>
        <Reveal className="flex max-w-[380px] flex-1 flex-col gap-4">
          <span className="eyebrow text-paper/60">Begin</span>
          <div>
            <AnchorButton variant="light">{'Book the kickoff ->'}</AnchorButton>
          </div>
          <span className="pt-2 text-[13px] leading-[20px] text-paper/60">$2,500 · Two weeks · Full scope</span>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 border-t border-paper/20 bg-ink px-6 py-8 text-paper/70 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto invert" />
        <span className="block h-[10px] w-px bg-paper/40" />
        <span className="eyebrow">Brand & interface design</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <a href={workHref} target="_blank" rel="noreferrer" className="eyebrow transition-colors hover:text-paper">
          {'Our work ->'}
        </a>
        <a href={calendarHref} target="_blank" rel="noreferrer" className="eyebrow transition-colors hover:text-paper">
          {'Schedule call ->'}
        </a>
        <span className="hidden h-[10px] w-px bg-paper/40 md:block" />
        <span className="eyebrow">Proposal · v1 · May 2026</span>
      </div>
    </footer>
  )
}

export function SleepGoddessProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Sleep Like a Goddess — Proposal'
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) {
      meta.content = 'A brand system refinement proposal for Sleep Like a Goddess from Anchovies.'
    }
  }, [])

  return (
    <main className="bg-paper text-ink">
      <SleepNav />
      <Hero />
      <Opportunity />
      <Outcomes />
      <DarkQuote />
      <Approach />
      <Deliverables />
      <Timeline />
      <Investment />
      <Access />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
