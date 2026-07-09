import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const contractHref = '/proposal/molly/contract'
const workHref = 'https://anchovies.agency/work'

type DetailRow = [string, string, string]
type Phase = {
  num: string
  title: string
  body: string
  includes: string[]
  deliverables: string[]
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'approach', label: 'Approach' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'work', label: 'Our Work' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

const pillars: DetailRow[] = [
  [
    '01',
    'Brand identity',
    'A personal, flexible visual system (logo, color, type, and a motif) for your site, profiles, proposals, and email.',
  ],
  [
    '02',
    'Three-page website',
    'A simple site that tells the right story and gives people a clear way to reach you: more strong scroll than complicated maze.',
  ],
  [
    '03',
    'A clear offer',
    'Your range, organized into language people understand quickly: writing, narrative, social, and storytelling support.',
  ],
  [
    '04',
    'Better clients',
    'A foundation that helps you attract more aligned projects, stronger referrals, and the confidence to charge for them.',
  ],
]

const brandCanDo = [
  'Turn a loose set of skills into a clearer offer.',
  'Make referrals easier.',
  'Give people a place to send others.',
  'Help collaborators see your range.',
  'Help you charge with more confidence.',
  'Make the transition year feel intentional.',
]

const heardSignals: DetailRow[] = [
  [
    '01',
    "You're entering a year of unknowns.",
    'A year of transition with a real need to create opportunity and turn experience into paid work.',
  ],
  [
    '02',
    'You want a clearer way to present yourself.',
    'Your skills, your values, and the kinds of projects you want more of, in language people understand fast.',
  ],
  [
    '03',
    'Your work lives between disciplines.',
    'Legal knowledge, writing, storytelling, advocacy, and creative production, all at once.',
  ],
  [
    '04',
    'You want to feel marketable, not sanded down.',
    'Polished enough to be taken seriously, without losing the parts of you that make you interesting.',
  ],
  [
    '05',
    "You're drawn to work that feels alive.",
    'Funky, creative, and expressive: more alive than the typical legal or nonprofit website.',
  ],
  [
    '06',
    'The brand has to carry trust.',
    'The subject areas you work in are sensitive and emotionally charged; the work has to feel safe to hand over.',
  ],
  [
    '07',
    'You have a strong personal style.',
    'Tattoos, color, art, a bulldog, Denver energy, and a willingness to push what professionalism can look like.',
  ],
]

const pillarDetails: DetailRow[] = [
  [
    '01',
    'A brand identity with personality',
    'We will create a visual identity that feels personal, professional, creative, and flexible. It gives you a starting system for how you show up across your website, social profiles, proposals, email, and future materials: a recognizable look that holds together wherever your work appears.',
  ],
  [
    '02',
    'A three-page website',
    'We will build a simple site that tells the right story and gives people a clear way to contact you. It should feel more like a strong scroll than a complicated maze: creating interest, showing your range, and guiding people into a conversation.',
  ],
  [
    '03',
    'A clear offer',
    'We will organize what you do into language people understand quickly: writing, social content, narrative development, bios, storytelling support, civil-rights-adjacent creative work, and support for photographers, writers, documentary teams, and justice-driven organizations.',
  ],
  [
    '04',
    'A foundation for better clients',
    'This investment should help you move toward more aligned projects and stronger referrals. A helpful way to think about the cost: one or two good clients can cover the full foundation. The point of doing it now is a better shot at being taken seriously when those opportunities come across your desk.',
  ],
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery & creative direction',
    body: 'A focused conversation about your story, your work, your ideal clients, and your creative taste, plus a review of the references you sent, which point toward warmth, texture, personality, and a little edge.',
    includes: [
      'Founder discovery',
      'Audience & client discussion',
      'Offer & service discussion',
      'Visual direction',
      'Reference review',
      'Moodboard direction',
      'Website structure planning',
    ],
    deliverables: [
      'Creative direction summary',
      'Moodboard',
      'Website structure recommendation',
      'Initial direction for identity & site',
    ],
  },
  {
    num: '02',
    title: 'Brand identity',
    body: 'We translate the creative references into a flexible visual system: polished and memorable, without sanding off your edge.',
    includes: [
      'Primary logo or wordmark',
      'Secondary lockup',
      'Color palette',
      'Typography system',
      'Graphic style or motif',
      'Social / profile asset direction',
      'Simple brand guide',
    ],
    deliverables: ['A starter identity system for your website, profiles, proposals, and future materials.'],
  },
  {
    num: '03',
    title: 'Website copy & structure',
    body: 'We shape the site content so it feels clear, useful, and natural to read: a real person with a point of view, explaining what you do without becoming too long or over-polished.',
    includes: [
      'Homepage message direction',
      'Services / offer language',
      'Short about language',
      'CTA language',
      'Page hierarchy',
      'Simple content flow',
    ],
    deliverables: ['A concise copy and content structure for the three website pages.'],
  },
  {
    num: '04',
    title: 'Three-page website',
    body: 'We design and build a simple three-page site (Homepage, Services / Work, About / Contact), with the homepage carrying most of the story through a longer scroll.',
    includes: [
      'Three-page website design',
      'Three-page website build',
      'Desktop design',
      'Mobile design',
      'Simple contact path',
      'Basic SEO setup',
      'Responsive layout',
      'Launch support',
    ],
    deliverables: [
      'A polished three-page website that gives people a clear place to learn about you, understand your work, and reach out.',
    ],
  },
  {
    num: '05',
    title: 'Handoff',
    body: 'We package the final identity and website so it is simple and easy to use: everything you need to start showing up right away.',
    includes: [
      'Final logo exports',
      'Color & typography guidance',
      'Website login / access handoff',
      'Basic usage notes',
      'Social / profile asset direction',
      'Launch checklist',
    ],
    deliverables: ['A clean handoff so you can start using the brand and website right away.'],
  },
]

const deliverableGroups = [
  {
    title: 'Direction',
    items: ['Creative direction summary', 'Moodboard', 'Primary logo or wordmark', 'Secondary lockup', 'Color palette'],
  },
  {
    title: 'Identity',
    items: ['Typography system', 'Graphic style or motif', 'Simple brand guide', 'Homepage copy direction', 'Services / offer language'],
  },
  {
    title: 'Website',
    items: ['Short about language', 'CTA language', 'Three-page website design', 'Three-page website build', 'Desktop and mobile layouts'],
  },
  {
    title: 'Handoff',
    items: ['Basic SEO setup', 'Simple contact path', 'Final logo exports', 'Website handoff', 'Launch checklist'],
  },
]

const timeline: DetailRow[] = [
  ['Week one', 'Direction & identity', 'Discovery, reference review, creative direction, moodboard, and identity design.'],
  ['Week two', 'Website design & build', 'Website structure, copy direction, homepage design, services / work page, about / contact page, and mobile design.'],
  ['Week three', 'Refinement & launch', 'Final refinements, responsive review, asset exports, website handoff, and launch checklist.'],
]

const investmentLines: DetailRow[] = [
  [
    '01',
    'Brand identity',
    'Logo or wordmark, secondary lockup, color, typography, graphic style, and a simple brand guide. $900',
  ],
  [
    '02',
    'Three-page website',
    'Website design, build, desktop and mobile layouts, basic SEO setup, simple contact path, and launch support. $850',
  ],
  [
    '03',
    'Copy direction & handoff',
    'Page structure, homepage message direction, services language, CTA language, final exports, and launch checklist. $200',
  ],
]

const namingIncludes = [
  'Naming discussion',
  'Name territory exploration',
  'One recommended name',
  'Domain availability scan',
  'Light trademark knockout search',
  'Naming rationale and notes',
]

const paymentMilestones: DetailRow[] = [
  ['50%', 'Due at kickoff', 'The project starts once the kickoff invoice is paid and we have reviewed your references.'],
  ['25%', 'Due at the website phase', 'When we move into website design and build, once the identity direction is approved.'],
  ['25%', 'Due before final handoff', 'Before the final identity and website are handed off for launch.'],
]

const futureTracks = [
  {
    label: 'Track 01',
    title: 'Show the work',
    items: ['Expanded case studies', 'Additional website pages', 'Photography or creative direction', 'Media kit'],
  },
  {
    label: 'Track 02',
    title: 'Tools & templates',
    items: ['Proposal template', 'Social templates', 'Resume / CV design', 'Client outreach materials'],
  },
  {
    label: 'Track 03',
    title: 'Voice & network',
    items: ['Newsletter or Substack direction', 'Collaborator introductions'],
  },
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
  href,
  children,
  variant = 'dark',
  external = false,
}: {
  href: string
  children: string
  variant?: 'dark' | 'light' | 'outline'
  external?: boolean
}) {
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink'
      : variant === 'outline'
        ? 'border border-ink/30 text-ink hover:border-ink'
        : 'bg-ink text-paper'

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${classes}`}
    >
      {children}
    </a>
  )
}

export function MollyEngelsProposal() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies x Molly Engels - Proposal'
    }
  }, [])

  useEffect(() => {
    const observers = navSections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean)
      .map((section) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setActiveSection(section!.id)
          },
          { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
        )
        observer.observe(section!)
        return observer
      })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <main className="molly-proposal min-h-screen bg-paper text-ink antialiased">
      <header>
        <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 text-ink md:flex">
          <div className="flex items-center gap-5">
            <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
            <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
            <span className="eyebrow text-ink-2">Prepared for Molly Engels</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="eyebrow text-ink-2">Brand Identity, Website, Copy Direction · v1</span>
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
                Molly Engels
              </span>
            </a>
            <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
              {navSections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${activeSection === section.id ? 'text-ink' : ''}`}>
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <a href={workHref} target="_blank" rel="noreferrer" className="hidden rounded-full px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap sm:inline-flex">
                Our work
              </a>
              <a href={contractHref} className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-ink-2 whitespace-nowrap">
                Sign contract
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 01 - Proposal" right="Prepared for Molly Engels" />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow mb-6 text-ink-2">Brand identity - website - copy direction</p>
              <h1 className="serif max-w-5xl text-[clamp(4rem,10vw,10rem)] leading-[0.88] tracking-normal text-ink">
                Look ready before the next opportunity.
              </h1>
            </div>
            <div className="space-y-7">
              <p className="max-w-xl text-xl leading-[1.25] text-ink sm:text-2xl">
                A brand identity and a simple three-page website for the year you turn law school, civil rights work,
                and documentary storytelling into a body of freelance work that's unmistakably yours.
              </p>
              <p className="max-w-lg text-base leading-7 text-ink-2">
                You're finishing law school, stepping into a year of transition, and building freelance work around
                civil rights, storytelling, writing, and people doing meaningful work in hard spaces. This phase gives
                that work a public presence with more shape: polished enough to open doors, personal enough to still
                feel like you.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <AnchorButton href={contractHref}>Sign contract</AnchorButton>
                <AnchorButton href="#approach" variant="outline">
                  See the approach
                </AnchorButton>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--color-rule)] pt-12">
            <MetaRow left="Fig. 01 - What this phase creates" right="Four pillars" />
            <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
              {pillars.map(([label, title, body], index) => (
                <article
                  key={title}
                  className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${index < pillars.length - 1 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}
                >
                  <p className="eyebrow text-ink-2">Pillar {label}</p>
                  <h2 className="serif text-[40px] leading-[44px] text-ink">{title}</h2>
                  <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <div className="grid gap-14 lg:grid-cols-[520px_1fr] lg:gap-20">
          <Reveal className="flex flex-col gap-14">
            <span className="eyebrow text-ink-2">§ 02 - What we heard</span>
            <h2 className="display max-w-[560px] text-[46px] leading-[50px] md:text-[64px] md:leading-[64px]">
              You are already doing the work.
            </h2>
            <div className="flex max-w-[470px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
              <p>
                You've spent years with Juvenile Injustice and in the broader world of incarceration, post-conviction
                work, civil rights, and storytelling. You're also writing narratives, bios, and social content for
                photographers, documentary storytellers, writers, and people working around justice-driven stories.
              </p>
              <p>
                This is the year to turn that experience into a public presence with more shape: one that helps the
                right people understand your range and reach out.
              </p>
            </div>
          </Reveal>
          <Reveal className="flex flex-col">
            {heardSignals.map(([num, title, body]) => (
              <div key={num} className="grid gap-5 border-t border-[var(--color-rule)] py-6 md:grid-cols-[56px_1fr] md:gap-8">
                <span className="serif pt-1 text-[18px] leading-[24px] text-ink">{num}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="serif text-[26px] leading-[32px]">{title}</h3>
                  <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="opportunity" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <MetaRow left="§ 03 - The opportunity" right="A really good introduction" dark />
            <h2 className="serif mt-10 max-w-4xl text-[clamp(3.2rem,8vw,8rem)] leading-[0.9] tracking-normal">
              A good brand helps people understand you faster.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-1">
            <p className="text-lg leading-8 text-paper/72">
              For this phase the goal is a lean foundation that works hard immediately: a visual identity, a clear
              voice, and a three-page site that gives people a strong first impression and an obvious next step. Think
              of it less like a giant website and more like a really good introduction: enough story to create trust,
              enough edge to feel like you, enough clarity that someone says, "I know exactly why I should reach out."
            </p>
            <div>
              <p className="eyebrow mb-4 text-paper/50">What a brand can do</p>
              <ul className="space-y-3 text-sm leading-6 text-paper/72">
                {brandCanDo.map((line) => (
                  <li key={line} className="border-b border-paper/12 pb-3">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="pillars" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 04 - What this phase creates" right="Four pillars, in depth" />
          <h2 className="serif max-w-4xl text-[clamp(3rem,7vw,6.6rem)] leading-[0.92] tracking-normal text-ink">
            Built for the work you're already doing, and the work you want next.
          </h2>
          <div className="border-y border-ink/20">
            {pillarDetails.map(([num, title, body]) => (
              <article key={title} className="grid gap-6 border-b border-ink/20 py-8 last:border-b-0 md:grid-cols-[120px_0.75fr_1.15fr]">
                <p className="serif text-5xl leading-none text-ink">{num}</p>
                <h3 className="serif max-w-sm text-3xl leading-[1.02] text-ink">{title}</h3>
                <p className="text-base leading-7 text-ink-2">{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-10">
          <MetaRow left="§ 05 - Our approach" right="Five phases" />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="serif max-w-3xl text-[clamp(3rem,6vw,6rem)] leading-[0.95] tracking-normal text-ink">
              From a focused conversation to a brand and site you can use.
            </h2>
            <p className="max-w-lg text-base leading-7 text-ink-2">
              Five phases that move from creative direction to a finished identity and a live three-page website: clear,
              lean, and built to feel like you.
            </p>
          </div>
          <div className="border-y border-ink/20">
            {phases.map((phase) => (
              <article key={phase.num} className="grid gap-7 border-b border-ink/20 py-8 last:border-b-0 lg:grid-cols-[110px_0.85fr_0.65fr_0.75fr]">
                <div>
                  <p className="eyebrow mb-2 text-ink-2">Phase</p>
                  <p className="serif text-5xl leading-none text-ink">{phase.num}</p>
                </div>
                <div>
                  <h3 className="serif text-3xl leading-[1.02] text-ink">{phase.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-ink-2">{phase.body}</p>
                </div>
                <div>
                  <p className="eyebrow mb-4 text-ink-2">Includes</p>
                  <ul className="space-y-2">
                    {phase.includes.map((item) => (
                      <li key={item} className="text-sm leading-5 text-ink-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow mb-4 text-ink-2">Deliverables</p>
                  <ul className="space-y-2">
                    {phase.deliverables.map((item) => (
                      <li key={item} className="text-sm leading-5 text-ink">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-10">
          <MetaRow left="§ 06 - Final deliverables" right="Twenty artifacts" />
          <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
            <h2 className="serif text-[clamp(3rem,6vw,6rem)] leading-[0.96] text-ink">
              Everything you walk away with.
            </h2>
            <p className="text-base leading-7 text-ink-2">
              A complete starter identity and a live three-page website, packaged, documented, and ready to put to work.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {deliverableGroups.map((group, groupIndex) => (
              <div key={group.title}>
                <p className="eyebrow mb-4 text-ink-2">{group.title}</p>
                <div className="border-t border-ink/25">
                  {group.items.map((item, itemIndex) => (
                    <div key={item} className="grid grid-cols-[42px_1fr] gap-4 border-b border-ink/18 py-3">
                      <span className="text-xs text-ink/40">{String(groupIndex * 5 + itemIndex + 1).padStart(2, '0')}</span>
                      <span className="text-sm leading-5 text-ink-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-4 text-ink-2">Our Work</p>
            <h2 className="serif max-w-2xl text-5xl leading-[0.98] text-ink">
              A simple place to revisit the broader Anchovies archive.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="max-w-2xl text-lg leading-8 text-ink-2">
              Rather than stacking case studies into this proposal, this links directly to the work archive so the range
              is easy to explore in one place.
            </p>
            <AnchorButton href={workHref} external>
              View our work
            </AnchorButton>
          </div>
        </Reveal>
      </section>

      <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-10">
          <MetaRow left="§ 07 - Timeline" right="Two to three weeks" />
          <h2 className="serif max-w-5xl text-[clamp(3.4rem,7vw,7rem)] leading-[0.92] tracking-normal text-ink">
            From discovery to launch in two to three weeks.
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-ink-2">
            Timeline assumes timely feedback and a focused round of revisions at each step.
          </p>
          <div className="grid gap-5 lg:grid-cols-3">
            {timeline.map(([when, title, body], index) => (
              <article key={title} className="border-t border-ink/25 pt-6">
                <div className="mb-6 flex items-end gap-3">
                  <span className="serif text-5xl leading-none text-ink">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow pb-1 text-ink-2">{when}</span>
                </div>
                <h3 className="serif mb-5 text-3xl leading-tight text-ink">{title}</h3>
                <p className="max-w-sm text-sm leading-6 text-ink-2">{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="investment" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 08 - Investment" right="Recommended first phase" dark />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="serif text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] tracking-normal">
                The first phase.
              </h2>
            </div>
            <div className="lg:text-right">
              <p className="serif text-[clamp(4rem,10vw,9rem)] leading-none tracking-normal">$1,950</p>
              <p className="eyebrow mt-3 text-paper/55">Fixed scope - two to three weeks</p>
            </div>
          </div>

          <div className="border-y border-paper/16">
            {investmentLines.map(([num, phase, scope]) => {
              const amount = scope.match(/\$[0-9,]+/)?.[0] ?? ''
              const summary = scope.replace(` ${amount}`, '')
              return (
                <div key={phase} className="grid gap-4 border-b border-paper/16 py-6 last:border-b-0 md:grid-cols-[70px_0.65fr_1fr_minmax(84px,auto)]">
                  <p className="text-paper/45">{num}</p>
                  <h3 className="serif text-lg text-paper">{phase}</h3>
                  <p className="text-sm leading-6 text-paper/62">{summary}</p>
                  <p className="serif text-lg text-paper md:text-right">{amount}</p>
                </div>
              )
            })}
            <div className="grid gap-4 py-7 md:grid-cols-[70px_0.65fr_1fr_minmax(84px,auto)]">
              <div />
              <h3 className="serif text-2xl text-paper">Total - First phase</h3>
              <div />
              <p className="serif text-3xl text-paper md:text-right">$1,950</p>
            </div>
          </div>

          <div className="grid gap-8 border border-paper/12 p-7 lg:grid-cols-[0.9fr_1fr_140px] lg:items-start">
            <div>
              <p className="eyebrow mb-4 text-paper/50">Optional add-on</p>
              <h3 className="serif mb-5 text-4xl leading-none text-paper">Naming sprint.</h3>
              <p className="text-sm leading-6 text-paper/62">
                If you want the freelance side to feel more like a studio, creative practice, or storytelling partner
                (not only a personal portfolio), we can add a focused naming sprint. Formal trademark clearance should
                be handled by an attorney before final use.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {namingIncludes.map((item) => (
                <li key={item} className="border-b border-paper/12 pb-3 text-sm leading-5 text-paper/65">
                  {item}
                </li>
              ))}
            </ul>
            <div className="lg:text-right">
              <p className="serif text-3xl text-paper">+$750</p>
              <p className="eyebrow mt-2 text-paper/45">Added to scope</p>
            </div>
          </div>

          <div>
            <MetaRow left="Payment structure" right="Three milestones" dark />
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {paymentMilestones.map(([percent, title, body]) => (
                <article key={title} className="border border-paper/12 p-7">
                  <p className="serif mb-8 text-5xl leading-none text-paper">{percent}</p>
                  <h3 className="serif mb-5 text-xl text-paper">{title}</h3>
                  <p className="text-sm leading-6 text-paper/62">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-10">
          <MetaRow left="§ 09 - Future opportunities" right="After this phase" />
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <h2 className="serif text-[clamp(3rem,6vw,6rem)] leading-[0.95] text-ink">
              Where the brand can grow next.
            </h2>
            <p className="max-w-lg text-base leading-7 text-ink-2">
              After this phase, we can support additional needs as your work grows, added and scoped as you go, never
              all at once.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {futureTracks.map((track) => (
              <article key={track.title} className="border border-ink/20 p-7">
                <p className="eyebrow mb-6 text-ink-2">{track.label}</p>
                <h3 className="serif mb-7 text-3xl leading-tight text-ink">{track.title}</h3>
                <ul className="space-y-3">
                  {track.items.map((item) => (
                    <li key={item} className="text-sm leading-5 text-ink-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="border border-ink/25 p-7 sm:p-10 lg:p-14">
          <MetaRow left="§ 10 - Next step" right="Sign contract" />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div className="space-y-10">
              <h2 className="serif max-w-3xl text-[clamp(3.8rem,8vw,8rem)] leading-[0.88] tracking-normal text-ink">
                Look ready before the next opportunity arrives.
              </h2>
              <p className="max-w-xl text-base leading-7 text-ink-2">
                Now that this direction feels aligned, the next step is signing the agreement so we can reserve the
                project window, review your website references, and start shaping the identity.
              </p>
              <AnchorButton href={contractHref}>Sign contract</AnchorButton>
            </div>
            <div className="space-y-8">
              <div>
                <p className="serif text-[clamp(3rem,7vw,6rem)] leading-none text-ink">$1,950</p>
                <p className="eyebrow mt-3 text-ink-2">Recommended first phase</p>
              </div>
              <div className="space-y-4">
                {[
                  'Sign the agreement.',
                  'Review your website references together.',
                  'Send kickoff invoice (50%).',
                  'Start shaping the identity. Week one begins.',
                ].map((item, index) => (
                  <div key={item} className="grid grid-cols-[42px_1fr] gap-4 border-b border-ink/15 pb-4">
                    <span className="text-sm text-ink/45">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-sm leading-5 text-ink-2">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 11 - In closing" right="For Molly Engels" />
        <Reveal>
          <h2 className="display max-w-[1120px] py-16 text-[48px] leading-[52px] md:text-[86px] md:leading-[84px] lg:text-[104px] lg:leading-[100px]">
            A small foundation with a real job.
          </h2>
        </Reveal>
        <div className="grid gap-10 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="text-[17px] leading-[28px] text-ink-2">
              This is a small foundation with a real job: a way to show up more clearly during a year where you'll need
              to create opportunity, make new connections, and turn your current experience into paid work.
            </p>
          </Reveal>
          <Reveal>
            <p className="text-[17px] leading-[28px] text-ink-2">
              The goal is simple: help you look ready before the next opportunity arrives, with a presence that's
              professional, trustworthy, creative, and unmistakably yours.
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-col gap-5 border-t border-[var(--color-rule)] bg-paper px-6 py-8 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
          <span className="eyebrow text-ink">Anchovies</span>
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow">Prepared for Molly Engels</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <span className="eyebrow">June 2026</span>
          <span className="eyebrow text-ink">Proposal · v1</span>
        </div>
      </footer>
    </main>
  )
}
