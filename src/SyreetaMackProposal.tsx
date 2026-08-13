import { useEffect, useState, type CSSProperties } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://anchovies.agency/work'
const acceptHref = 'mailto:sean@anchovies.agency?subject=Syreeta%20Mack%20Proposal%20Acceptance&body=Hi%20Sean%2C%0A%0AI%27d%20like%20to%20move%20forward%20with%20the%20Syreeta%20Mack%20proposal.%20Please%20send%20the%20next%20steps.%0A'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What we heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'scope', label: 'Scope' },
  { id: 'website', label: 'Website' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
]

const signals = [
  [
    '01',
    'The experience is already there.',
    'Ten years producing public art, murals, art fairs, block parties, and unusual creative projects is a serious body of work. The new brand needs to make Syreeta\'s role in that work visible.',
  ],
  [
    '02',
    'The next chapter is under your own name.',
    'The work once lived beneath someone else\'s banner. This is the chance to create a public footprint that makes your judgment, relationships, and creative leadership unmistakably yours.',
  ],
  [
    '03',
    'Taste is part of the offer.',
    'Clients are not only hiring production support. They are trusting you to select artists, shape a room, connect ideas, and make a complex creative experience feel right.',
  ],
  [
    '04',
    'Polished should still feel accessible.',
    'The work needs enough authority to support ambitious grants and large engagements without adopting the distance or pretension that can make the art world difficult to enter.',
  ],
  [
    '05',
    'A clear system can still break rules.',
    'Editorial structure, bold typography, color, handwritten gestures, and human imperfection can work together when one thoughtful idea tells each element what role to play.',
  ],
  [
    '06',
    'This should help create the next opportunity.',
    'The website must do more than look good. It should help a referral understand your value, help a funder trust the vision, and help a new client begin a conversation.',
  ],
]

const principles = [
  ['01', 'Authority', 'Make a decade of creative leadership immediately legible.'],
  ['02', 'Taste', 'Turn your point of view into a recognizable commercial advantage.'],
  ['03', 'Humanity', 'Keep the work warm, playful, tactile, and easy to enter.'],
  ['04', 'Momentum', 'Give every new introduction a polished place to lead.'],
]

const phases = [
  {
    number: '01',
    title: 'Brand Strategy + Positioning',
    price: '$500',
    timing: 'Week one',
    summary:
      'Define the value beneath the many things you can do, who should hire you, and the central idea that can hold the business together.',
    outcome:
      'A clear position for Syreeta Mack as a creative strategist and producer, with language that makes the offer easier to understand, trust, refer, and buy.',
    includes: [
      'Founder discovery and working session',
      'Experience, audience, and offer synthesis',
      'Light category and audience review',
      'Brand positioning statement',
      'Value proposition and proof points',
      'Service architecture and naming',
      'Brand voice and message framework',
      'One unifying creative idea',
    ],
  },
  {
    number: '02',
    title: 'Visual Identity + Brand World',
    price: '$1,600',
    timing: 'Week two',
    summary:
      'Translate the strategy into one complete identity that balances editorial discipline with a more personal, handmade point of view.',
    outcome:
      'A distinctive, flexible visual system that can feel premium without becoming precious, and creative without becoming difficult to use.',
    includes: [
      'Primary wordmark or logo',
      'Supporting mark or symbol',
      'Responsive lockups',
      'Typography and color systems',
      'Graphic and editorial language',
      'Handmade or humanizing motif direction',
      'Photography and art direction',
      'One identity presentation',
      'Two structured refinement rounds',
      'No-cost creative reset if the direction fundamentally misses the agreed outcome',
      'Concise brand guide and final asset library',
    ],
  },
  {
    number: '03',
    title: 'Website Strategy, Design + Development',
    price: '$1,650',
    timing: 'Week three',
    summary:
      'Create a five-page portfolio website that introduces your point of view, shows the range of your work, and gives the right people a clear reason to reach out.',
    outcome:
      'A polished, memorable website that can support referrals now, attract organic opportunities over time, and grow with the practice.',
    includes: [
      'Five-page website architecture',
      'Conversion-conscious website copywriting',
      'Case study and portfolio content structure',
      'Custom desktop, tablet, and mobile design',
      'Responsive website development',
      'Editable projects and selected content',
      'Inquiry and contact pathways',
      'Foundational accessibility and performance',
      'On-page SEO and search indexing setup',
      'Analytics, browser QA, launch, and handoff',
    ],
  },
  {
    number: '04',
    title: 'Launch Toolkit',
    price: 'Included',
    timing: 'Week four',
    summary:
      'Extend the brand into the practical materials needed to introduce the business, pursue projects, and show up consistently from day one.',
    outcome:
      'A coordinated set of social, print, and outreach tools that makes the launch feel complete and gives you useful materials for real conversations.',
    includes: [
      'Social profile and launch graphics',
      'Four flexible social post templates',
      'Business card',
      'Email signature',
      'One-page capabilities sheet',
      'Event flyer or announcement template',
      'Launch messaging and rollout checklist',
    ],
  },
]

const pages = [
  ['01', 'Home', 'A concise introduction to your point of view, the work you lead, and why the right client should keep exploring.'],
  ['02', 'Work', 'A visual portfolio and flexible case-study system for public art, events, murals, creative strategy, and unusual assignments.'],
  ['03', 'Services', 'A clear account of how clients can engage you, from creative strategy and cultural programming to production and art curation.'],
  ['04', 'About', 'Your story, experience, approach, and the human perspective that makes the work different.'],
  ['05', 'Contact', 'A focused inquiry path for new engagements, partnerships, speaking, and other creative opportunities.'],
]

const deliverables = [
  {
    label: 'Strategy',
    items: ['Positioning statement', 'Audience and opportunity map', 'Value proposition', 'Service architecture', 'Message framework', 'Central creative idea'],
  },
  {
    label: 'Identity',
    items: ['Logo and wordmark suite', 'Supporting mark', 'Typography system', 'Color system', 'Graphic language', 'Photography direction'],
  },
  {
    label: 'Website',
    items: ['Five-page responsive site', 'Website copy', 'Portfolio system', 'Editable content', 'SEO foundation', 'Analytics and launch'],
  },
  {
    label: 'Launch',
    items: ['Profile and launch graphics', 'Four social templates', 'Business card', 'Email signature', 'Capabilities sheet', 'Event announcement template'],
  },
]

const selectedWork = [
  {
    name: 'Arc 88',
    type: 'Design and industrial practice',
    href: 'https://anchovies.agency/work/arc88',
    note: 'A disciplined editorial system for a creative practice built around objects, process, and exacting taste.',
  },
  {
    name: 'Seed',
    type: 'Arts and culture',
    href: 'https://anchovies.agency/work/seed',
    note: 'A visual identity with cultural energy, flexibility, and enough character to support many expressions.',
  },
  {
    name: 'Out There',
    type: 'Creative studio',
    href: 'https://anchovies.agency/work/out-there',
    note: 'A new name and identity for a storytelling studio ready to claim a clearer, more distinctive future.',
  },
  {
    name: 'Within',
    type: 'Naming and identity',
    href: 'https://anchovies.agency/work/within',
    note: 'A concise brand world built around an idea that is simple enough to remember and rich enough to expand.',
  },
  {
    name: 'The Work',
    type: 'Creative practice',
    href: 'https://anchovies.agency/work/the-work',
    note: 'An identity that gives creative work a direct, confident frame without overexplaining what makes it valuable.',
  },
  {
    name: 'Layers',
    type: 'Brand identity',
    href: 'https://anchovies.agency/work/layers',
    note: 'A flexible system that shows how one central idea can create depth across many brand touchpoints.',
  },
]

const timeline = [
  ['Week 01', 'Define the business', 'Discovery, audience and offer definition, market context, positioning, message strategy, and one unifying creative idea.'],
  ['Week 02', 'Build the identity', 'Develop and present one complete visual direction, refine it, and establish the brand system and art direction.'],
  ['Week 03', 'Design and build the website', 'Confirm architecture, write the core story, organize projects, and complete responsive design and development.'],
  ['Week 04', 'Refine and launch', 'Complete browser QA, finish the social and print toolkit, connect the domain, and prepare the public rollout.'],
]

const paymentMilestones = [
  ['50%', '$1,875', 'Due at kickoff', 'Reserves the project and begins strategy, positioning, and identity development.'],
  ['25%', '$937.50', 'Due after identity approval', 'Begins website design, copywriting, and development.'],
  ['25%', '$937.50', 'Due before launch', 'Due before final files, website launch, and toolkit handoff.'],
]

const boundaries = [
  ['One recommended direction', 'Anchovies develops and presents one complete recommended identity, investing the work in the direction we believe best answers the agreed strategy.'],
  ['A clear route if it misses', 'If the recommended direction fundamentally misses the agreed outcome after refinement, Anchovies will develop a new direction at no additional creative fee.'],
  ['Client materials', 'Syreeta provides available project photography, credits, descriptions, testimonials, and approvals. Anchovies helps select, organize, edit, and write around those materials.'],
  ['Website scope', 'The proposal includes five core pages and one repeatable project or case-study system. Added pages, commerce, memberships, portals, or complex integrations are quoted separately.'],
  ['Production', 'Printing, photography production, paid fonts, stock assets, premium software, hosting, domains, and third-party fees are paid directly by the client unless stated otherwise.'],
  ['Timing', 'The three-to-four-week target assumes consolidated feedback and approvals within three business days at each major milestone.'],
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
  variant = 'blue',
  external = false,
}: {
  href: string
  children: string
  variant?: 'blue' | 'dark' | 'outline' | 'light'
  external?: boolean
}) {
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink'
      : variant === 'outline'
        ? 'border border-ink/30 text-ink hover:border-ink'
        : variant === 'dark'
          ? 'bg-ink text-paper'
          : 'bg-[#2457f5] text-white hover:bg-[#1744d0]'

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

export function SyreetaMackProposal() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    document.title = 'Anchovies x Syreeta Mack - Proposal'
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
        <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 md:flex">
          <div className="flex items-center gap-5">
            <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
            <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
            <span className="eyebrow text-ink-2">Prepared for Syreeta Mack</span>
          </div>
          <div className="flex items-center gap-5">
            <span className="eyebrow text-ink-2">Brand, website, and launch toolkit · v1</span>
            <span className="eyebrow">August 2026</span>
          </div>
        </div>
        <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
            <a href="#overview" className="flex items-center gap-3">
              <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
              <span className="hidden text-[13px] text-ink-2 sm:inline">
                <span className="text-ink">Anchovies</span><span className="mx-2">x</span>Syreeta Mack
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
              <a href={workHref} target="_blank" rel="noreferrer" className="hidden px-3 py-2 text-[12px] font-medium text-ink sm:inline-flex">Our work</a>
              <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full bg-[#2457f5] px-4 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#1744d0] whitespace-nowrap">
                Review proposal
              </a>
            </div>
          </div>
        </div>
      </header>

      <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 01 - Proposal" right="Prepared for Syreeta Mack" />
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <p className="eyebrow mb-6 text-ink-2">Brand strategy · visual identity · website · launch toolkit</p>
              <h1 className="serif max-w-5xl text-[clamp(3.6rem,8.5vw,8.5rem)] leading-[0.94] tracking-normal text-ink">
                A creative practice of your own.
              </h1>
            </div>
            <div className="space-y-7">
              <p className="max-w-xl text-xl leading-[1.25] text-ink sm:text-2xl">
                A complete public identity for the creative strategist and producer who has spent a decade making ambitious ideas happen behind the scenes.
              </p>
              <p className="max-w-lg text-base leading-7 text-ink-2">
                This engagement turns your experience, taste, and way of working into a brand people can recognize, a website people can trust, and a practical toolkit that helps the next introduction become the next project.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <AnchorButton href={calendarHref} external>Schedule a proposal review</AnchorButton>
                <AnchorButton href="#scope" variant="outline">See the scope</AnchorButton>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--color-rule)] pt-12">
            <MetaRow left="Fig. 01 - What this work creates" right="Four principles" />
            <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
              {principles.map(([num, title, body], index) => (
                <article key={title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${index < 3 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
                  <p className="eyebrow text-ink-2">Principle {num}</p>
                  <h2 className="serif text-[40px] leading-[44px] text-ink">{title}</h2>
                  <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <div className="grid gap-14 lg:grid-cols-[500px_1fr] lg:gap-20">
          <Reveal className="flex flex-col gap-12">
            <span className="eyebrow text-ink-2">§ 02 - What we heard</span>
            <h2 className="display max-w-[560px] text-[46px] leading-[50px] md:text-[64px] md:leading-[64px]">
              The work was never small. Your name was simply not on the door.
            </h2>
            <div className="flex max-w-[470px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
              <p>
                You have produced large public artworks, multi-day art fairs, block parties, murals, and projects that begin with someone saying, “We need a creative team to figure this out.” You sat in the middle of art direction, relationships, production, and business development, helping a small team make unusually ambitious work real.
              </p>
              <p>
                The next chapter is about making that role visible and building a practice that can grow on your terms.
              </p>
            </div>
          </Reveal>
          <Reveal className="flex flex-col">
            {signals.map(([num, title, body]) => (
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
        <Reveal className="space-y-12">
          <MetaRow left="§ 03 - The opportunity" right="Taste made visible" dark />
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <h2 className="serif max-w-4xl text-[clamp(3.2rem,8vw,8rem)] leading-[0.94] tracking-normal">
              Build the kind of presence that can ask for the bigger project.
            </h2>
            <div className="space-y-7 pt-1 text-lg leading-8 text-paper/72">
              <p>
                The goal is not to make the work feel larger than it is. It is to finally let the public presence catch up to the scale of what you have already done.
              </p>
              <p>
                We will define the real value beneath creative strategy, production, curation, and cultural programming, then build a brand world around one thoughtful idea. The result should feel editorial and assured, but also alive: structured enough to signal authority, human enough to remain approachable, and memorable enough that a person wants to know what you might make together.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 04 - Scope" right="Four connected phases" />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="serif max-w-4xl text-[clamp(3rem,7vw,6.5rem)] leading-[0.96] tracking-normal">A complete brand, website, and launch toolkit.</h2>
            <p className="max-w-xl text-base leading-7 text-ink-2">
              Each phase builds on the one before it. Strategy clarifies the offer, the identity makes it recognizable, the website makes it useful, and the launch toolkit helps you put it into the world.
            </p>
          </div>
          <div className="border-y border-ink/20">
            {phases.map((phase) => (
              <article key={phase.number} className="grid gap-8 border-b border-ink/20 py-10 last:border-b-0 xl:grid-cols-[90px_0.8fr_1fr]">
                <div>
                  <p className="eyebrow mb-3 text-ink-2">Phase</p>
                  <p className="serif text-5xl leading-none">{phase.number}</p>
                </div>
                <div>
                  <p className="eyebrow mb-3 text-ink-2">{phase.timing}</p>
                  <h3 className="serif text-4xl leading-[1.02]">{phase.title}</h3>
                  <p className="mt-5 text-sm leading-6 text-ink-2">{phase.summary}</p>
                  <p className="mt-5 border-l border-ink/30 pl-4 text-sm leading-6 text-ink">{phase.outcome}</p>
                  <p className="serif mt-7 text-3xl">{phase.price}</p>
                </div>
                <div className="grid gap-x-8 sm:grid-cols-2">
                  {phase.includes.map((item) => (
                    <div key={item} className="border-t border-ink/18 py-3 text-sm leading-5 text-ink-2">{item}</div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="website" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 05 - Website" right="Five pages plus a project system" />
          <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h2 className="serif max-w-5xl text-[clamp(3.4rem,7vw,7rem)] leading-[0.96] tracking-normal">A portfolio that creates curiosity and makes the next step obvious.</h2>
            <p className="text-base leading-7 text-ink-2">
              The website will stay focused, but it will not feel generic. It should express your taste, tell the story behind the work, and give the practice enough structure to grow without rebuilding it next year.
            </p>
          </div>
          <div className="border-y border-ink/20">
            {pages.map(([num, title, body]) => (
              <article key={title} className="grid gap-5 border-b border-ink/20 py-7 last:border-b-0 md:grid-cols-[70px_0.55fr_1fr]">
                <p className="serif text-2xl">{num}</p>
                <h3 className="serif text-3xl leading-tight">{title}</h3>
                <p className="text-sm leading-6 text-ink-2">{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 06 - Deliverables" right="A complete first chapter" />
          <h2 className="serif max-w-4xl text-[clamp(3rem,6vw,6rem)] leading-[0.98] tracking-normal">Everything included.</h2>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {deliverables.map((group, groupIndex) => (
              <div key={group.label}>
                <p className="eyebrow mb-4 text-ink-2">{group.label}</p>
                <div className="border-t border-ink/25">
                  {group.items.map((item, itemIndex) => (
                    <div key={item} className="grid min-h-[58px] grid-cols-[38px_1fr] gap-3 border-b border-ink/18 py-3">
                      <span className="text-xs text-ink/40">{String(groupIndex * 6 + itemIndex + 1).padStart(2, '0')}</span>
                      <span className="text-sm leading-5 text-ink-2">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-ink/20 pt-10">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <h3 className="serif text-4xl leading-[1.08]">Selected work.</h3>
              <p className="text-base leading-7 text-ink-2">A few projects that reflect the editorial structure, cultural awareness, human detail, and flexible world-building that feel relevant to this engagement.</p>
            </div>
            <div className="mt-10 grid border-y border-ink/20 md:grid-cols-2 xl:grid-cols-3">
              {selectedWork.map((project, index) => (
                <a
                  key={project.name}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex min-h-[230px] flex-col justify-between gap-10 border-ink/20 p-7 transition-colors hover:bg-ink hover:text-paper ${index < 4 ? 'border-b' : ''} ${index < 3 ? 'xl:border-b' : 'xl:border-b-0'} ${index % 2 === 0 ? 'md:border-r' : ''} ${index % 3 !== 2 ? 'xl:border-r' : 'xl:border-r-0'}`}
                >
                  <div className="flex items-start justify-between gap-5">
                    <p className="eyebrow text-ink-2 transition-colors group-hover:text-paper/55">{project.type}</p>
                    <span className="text-lg leading-none" aria-hidden="true">↗</span>
                  </div>
                  <div>
                    <h4 className="serif text-4xl leading-[1.08]">{project.name}</h4>
                    <p className="mt-4 text-sm leading-6 text-ink-2 transition-colors group-hover:text-paper/65">{project.note}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8"><AnchorButton href={workHref} variant="outline" external>View all work</AnchorButton></div>
          </div>
        </Reveal>
      </section>

      <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-10">
          <MetaRow left="§ 07 - Timeline" right="Approximately three to four weeks" />
          <h2 className="serif max-w-5xl text-[clamp(3.4rem,7vw,7rem)] leading-[0.96] tracking-normal">A focused four-week sprint.</h2>
          <div className="syreeta-timeline relative grid gap-0 border-y border-ink/20 lg:grid-cols-4 lg:border-y-0 lg:pt-12 before:absolute before:left-0 before:right-0 before:top-[62px] before:hidden before:h-px before:origin-left before:bg-ink/25 lg:before:block">
            {timeline.map(([when, title, body], index) => (
              <article key={title} style={{ '--timeline-delay': `${180 + index * 130}ms` } as CSSProperties} className="syreeta-timeline-step relative grid grid-cols-[48px_1fr] gap-5 border-b border-ink/20 py-7 last:border-b-0 lg:block lg:border-b-0 lg:border-r lg:px-7 lg:py-0 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink bg-paper text-sm font-semibold lg:mb-12">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <p className="eyebrow mb-4 text-[#2457f5]">{when}</p>
                  <h3 className="serif mb-5 text-3xl leading-[1.08]">{title}</h3>
                  <p className="text-sm leading-6 text-ink-2">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="investment" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
        <Reveal className="space-y-12">
          <MetaRow left="§ 08 - Investment" right="Complete engagement" dark />
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.94] tracking-normal">Complete brand and website.</h2>
            <div className="lg:text-right">
              <p className="serif text-[clamp(4rem,10vw,9rem)] leading-none tracking-normal">$3,750</p>
              <p className="eyebrow mt-3 text-paper/55">Fixed scope · approximately three to four weeks</p>
            </div>
          </div>
          <div className="border-y border-paper/16">
            {phases.map((phase) => (
              <div key={phase.title} className="grid gap-4 border-b border-paper/16 py-6 last:border-b-0 md:grid-cols-[70px_0.65fr_1fr_minmax(100px,auto)]">
                <p className="text-paper/45">{phase.number}</p>
                <h3 className="serif text-xl">{phase.title}</h3>
                <p className="text-sm leading-6 text-paper/62">{phase.outcome}</p>
                <p className="serif text-xl md:text-right">{phase.price}</p>
              </div>
            ))}
            <div className="grid gap-4 py-7 md:grid-cols-[70px_0.65fr_1fr_minmax(100px,auto)]">
              <div /><h3 className="serif text-2xl">Total project fee</h3><div /><p className="serif text-3xl md:text-right">$3,750</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-6 text-paper/50">Payment milestones</p>
            <div className="grid gap-5 lg:grid-cols-3">
              {paymentMilestones.map(([percent, amount, title, body]) => (
                <article key={`${percent}-${title}`} className="border-t border-paper/20 pt-6">
                  <div className="flex items-end justify-between gap-4"><p className="serif text-5xl">{percent}</p><p className="serif text-xl">{amount}</p></div>
                  <h3 className="serif mt-6 text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-paper/62">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <Reveal className="space-y-10">
          <MetaRow left="§ 09 - Working boundaries" right="Clear enough to move" />
          <div className="grid gap-x-10 md:grid-cols-2">
            {boundaries.map(([title, body]) => (
              <article key={title} className="border-t border-ink/20 py-6"><h3 className="serif text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-ink-2">{body}</p></article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <Reveal className="border border-ink/25 p-7 sm:p-10 lg:p-14">
          <MetaRow left="§ 10 - Next step" right="Choose what works" />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <h2 className="serif max-w-5xl text-[clamp(3.5rem,8vw,8rem)] leading-[0.94] tracking-normal">Choose the next step.</h2>
            <div className="space-y-7">
              <p className="text-lg leading-8 text-ink-2">If everything feels right, accept the proposal by email and we will prepare the kickoff. If you would rather talk it through first, schedule a proposal review.</p>
              <div className="flex flex-col gap-3 sm:flex-row"><AnchorButton href={acceptHref}>Accept proposal</AnchorButton><AnchorButton href={calendarHref} variant="outline" external>Schedule a proposal review</AnchorButton></div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="flex flex-col gap-5 border-t border-[var(--color-rule)] bg-paper px-6 py-8 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
          <span className="eyebrow text-ink">Anchovies</span>
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow">Prepared for Syreeta Mack</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <span className="eyebrow">August 2026</span>
          <span className="eyebrow text-ink">Proposal · v1</span>
        </div>
      </footer>
    </main>
  )
}
