import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const portfolioHref = 'https://pitch.com/v/clav-rckauc'
const aboutHref = 'https://anchovies.agency/about'

type Signal = {
  num: string
  title: string
  body: string
}

type Principle = {
  num: string
  title: string
  body: string
}

type Phase = {
  num: string
  title: string
  body: string
  deliverable: string
  includes: string[]
}

type DeliverableGroup = {
  title: string
  items: string[]
}

type TimelineStep = {
  when: string
  title: string
  items: string[]
}

type ValueLine = {
  num: string
  title: string
  summary: string
  value: string
}

type Agreement = {
  label: string
  title: string
  body: string
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'alignment', label: 'Alignment' },
  { id: 'work', label: 'Work' },
  { id: 'scope', label: 'Scope' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'trade', label: 'The Trade' },
  { id: 'terms', label: 'Terms' },
]

const signals: Signal[] = [
  {
    num: '01',
    title: 'Designed for the camera',
    body: 'Braden can use the gym as a recurring setting for his own streams, clips, photos, and interviews. The identity, signage, equipment zones, lighting, and stream graphics should make the brand recognizable on camera without turning the gym into a space only for creators.',
  },
  {
    num: '02',
    title: 'Independent brand equity',
    body: 'Braden’s audience can create immediate attention, but the business should build brand equity of its own: a clear offer, a repeatable in-gym experience, recognizable assets, and a reason to stay relevant beyond any single stream.',
  },
  {
    num: '03',
    title: 'A clear revenue model',
    body: 'A free-access model can still be commercially valuable. The gym can create revenue through Braden’s content, sponsorships, brand partnerships, merchandise, events, coaching, digital products, and selective paid experiences. The brand should connect those opportunities without forcing a traditional membership model.',
  },
  {
    num: '04',
    title: 'A distinct, disciplined identity',
    body: 'Black-and-red aggression, Roman-statue cosplay, and supplement-label graphics are easy shortcuts. They are also easy to forget. The better move is a disciplined identity with enough edge to earn attention and enough control to be trusted with a card on file.',
  },
  {
    num: '05',
    title: 'Transformation as the foundation',
    body: 'Clavicular’s audience already understands the idea of ascension. The opportunity is to translate that instinct into a physical experience people can enter, participate in, and measure—without reducing the brand to internet vocabulary or a personality merch line.',
  },
]

const principles: Principle[] = [
  {
    num: '01',
    title: 'Works in content',
    body: 'A name people can say on stream, a mark that reads in a thumbnail, and a visual system that works across 9:16, 16:9, the building, and the body. The physical space and stream graphics should reinforce the same brand without feeling like product placement.',
  },
  {
    num: '02',
    title: 'Built as a business',
    body: 'A clear access model, partnership structure, conversion-focused website, and launch system designed to turn reach into repeatable value and revenue.',
  },
  {
    num: '03',
    title: 'Connected to Clavicular',
    body: 'The identity should mirror the confidence, directness, transformation, and internet awareness of Clavicular without imitating his feed or trying too hard to speak in memes.',
  },
  {
    num: '04',
    title: 'Built for long-term value',
    body: 'The strongest version feels culturally current now and structurally sound later—recognizable enough for press, disciplined enough to expand, and independent enough to hold long-term value.',
  },
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery and business framing',
    body: 'The first job is to understand the space, the audience, the operating model, the role Braden wants to play, and the revenue paths that matter most. This keeps the identity tied to a business people can actually join.',
    deliverable: 'A concise strategic brief and an agreed definition of what the brand must do.',
    includes: [
      'Discovery session',
      'Space and camera-use walkthrough',
      'Audience and gym-user priorities',
      'Revenue-path discussion',
      'Competitive and category scan',
      'Creator and collaborator use cases',
      'Brand architecture recommendation',
      'Website, access, and participation requirements',
    ],
  },
  {
    num: '02',
    title: 'Positioning, naming, and visual alignment',
    body: 'We define the core idea, naming criteria, tone, and creative territory. A focused moodboard presentation gives us an early decision point before the identity is developed in full.',
    deliverable: 'Approved positioning, name direction, verbal foundation, and one aligned visual territory.',
    includes: [
      'Positioning and central brand idea',
      'Naming strategy and name exploration',
      'Preliminary domain and handle review',
      'Preliminary trademark knockout screening',
      'Tagline and key language exploration',
      'Tone-of-voice direction',
      'Moodboard and visual alignment presentation',
      'Creative principles for physical and digital use',
    ],
  },
  {
    num: '03',
    title: 'Identity and brand world',
    body: 'We create a complete identity rather than a standalone logo: an ownable signal, type and color, image and motion direction, and a system built to hold up in the space and on stream.',
    deliverable: 'A complete visual and verbal identity system, presented as one cohesive world.',
    includes: [
      'Primary logo or wordmark',
      'Secondary lockups and responsive marks',
      'Typography and color systems',
      'Graphic motifs and layout system',
      'Photography and video direction',
      'Motion and stream behavior direction',
      'Verbal identity and message hierarchy',
      'Identity presentation and refinement',
    ],
  },
  {
    num: '04',
    title: 'Launch applications',
    body: 'We pressure-test the system on the things people will actually see and use. The exact mix is finalized in discovery so the work stays useful rather than becoming a pile of speculative mockups.',
    deliverable: 'A practical launch kit covering the highest-value physical, social, and creator-facing touchpoints.',
    includes: [
      'Exterior and interior signage concepts',
      'Wayfinding and environmental graphic direction',
      'Access credential or participation touchpoint',
      'Apparel and merchandise capsule',
      'Towel, bottle, and small-format applications',
      'Social avatar and profile system',
      'Post, story, and announcement templates',
      'Stream overlays, lower thirds, and holding screens',
      'Launch campaign art direction',
      'Partner and sponsor lockup rules',
    ],
  },
  {
    num: '05',
    title: 'Core website and handoff',
    body: 'We design, write, and build the public-facing website that introduces the concept, explains the offer, and moves people toward joining. The first version stays deliberately clean while leaving room for the operating stack to evolve.',
    deliverable: 'A responsive core marketing website, brand standards, and organized final asset library.',
    includes: [
      'Website architecture and conversion path',
      'Core website copywriting',
      'Custom responsive design',
      'Development of up to six core pages or templates',
      'Launch capture or interest form',
      'Access, booking, or membership UX recommendation',
      'Foundational search and social metadata',
      'Analytics setup',
      'Browser and mobile QA',
      'Brand standards',
      'Production-ready asset exports',
      'Final source-file handoff',
    ],
  },
]

const deliverableGroups: DeliverableGroup[] = [
  {
    title: 'Foundation',
    items: [
      'Discovery session',
      'Business and audience brief',
      'Positioning',
      'Naming criteria',
      'Name exploration',
      'Verbal identity',
      'Moodboard alignment',
    ],
  },
  {
    title: 'Identity',
    items: [
      'Primary identity',
      'Responsive mark system',
      'Typography',
      'Color',
      'Graphic language',
      'Image direction',
      'Motion direction',
      'Brand standards',
    ],
  },
  {
    title: 'Launch system',
    items: [
      'Signage concepts',
      'Wayfinding direction',
      'Membership credential',
      'Merchandise capsule',
      'Social system',
      'Stream graphics',
      'Launch art direction',
      'Partner lockups',
    ],
  },
  {
    title: 'Website',
    items: [
      'Architecture',
      'Core copywriting',
      'Responsive design',
      'Core development',
      'Launch capture',
      'Integration recommendation',
      'Metadata and analytics',
      'QA and handoff',
    ],
  },
]

const timeline: TimelineStep[] = [
  {
    when: 'Week 01',
    title: 'Discovery and alignment',
    items: ['Discovery session', 'Business framing', 'Audience and revenue paths', 'Positioning', 'Moodboard alignment'],
  },
  {
    when: 'Week 02',
    title: 'Naming and identity presentation',
    items: ['Name directions', 'Verbal foundation', 'Identity development', 'Full creative presentation', 'Decision and refinement'],
  },
  {
    when: 'Week 03',
    title: 'Identity and launch applications',
    items: ['Identity completion', 'Signage and merch', 'Social and stream system', 'Website copy and design'],
  },
  {
    when: 'Week 04',
    title: 'Website and handoff',
    items: ['Core website build', 'Brand standards', 'Final production assets', 'QA', 'Handoff'],
  },
]

const valueLines: ValueLine[] = [
  {
    num: '01',
    title: 'Discovery, strategy, and naming',
    summary: 'Discovery, business framing, positioning, naming, verbal direction, and visual alignment.',
    value: '$15,000',
  },
  {
    num: '02',
    title: 'Identity and brand world',
    summary: 'Complete identity system, typography, color, graphic language, image and motion direction, and verbal world.',
    value: '$25,000',
  },
  {
    num: '03',
    title: 'Launch applications',
    summary: 'Signage concepts, environmental direction, merchandise, social, stream graphics, and launch art direction.',
    value: '$15,000',
  },
  {
    num: '04',
    title: 'Core website',
    summary: 'Architecture, copywriting, responsive design, core development, analytics, QA, and handoff.',
    value: '$15,000',
  },
]

const agreements: Agreement[] = [
  {
    label: 'Ownership',
    title: 'Ownership of final work',
    body: 'Braden and the gym entity own all approved final project deliverables and production-ready source files delivered through this engagement.',
  },
  {
    label: 'Case study',
    title: 'Case-study rights',
    body: 'After the public launch, Anchovies may document the finished work in our portfolio and submit it to select design publications, awards, and journals. Timing is coordinated with the gym, sensitive business information stays private, and no paid endorsement from Braden is required.',
  },
  {
    label: 'Feedback',
    title: 'Revisions within scope',
    body: 'We will keep refining within the agreed scope until the work is right. Consolidated feedback and timely decisions are what keep a one-month sprint possible.',
  },
  {
    label: 'Mutual fit',
    title: 'Mutual exit',
    body: 'Because the agency fee is waived, either party can step away if the direction, participation, or scope materially stops making sense. Any completed and approved work is organized before the closeout.',
  },
]

const includedCosts = [
  'Anchovies’ agency time across the scope above',
  'Core marketing website design and development',
  'Final standards, production files, and source-file handoff',
]

const approvalCosts = [
  'Premium typeface licenses',
  'Formal trademark or legal clearance',
  'Fabrication, printing, photography, video, talent, or media spend',
  'Third-party software, hosting, booking, membership, or ecommerce fees',
  'Custom member portals or advanced platform integrations',
]

const futureWork = [
  'Full environmental or interior design documentation',
  'Fabrication management and installation',
  'Ongoing campaigns, social content, or community management',
  'Custom membership software, ecommerce, or complex booking integrations',
  'On-site work or travel',
]

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow sm:text-right ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{right}</span>
    </div>
  )
}

function LinkButton({
  children,
  href,
  variant = 'dark',
}: {
  children: string
  href: string
  variant?: 'dark' | 'outline' | 'light'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
        ? 'border border-[var(--color-mac)] text-[var(--color-mac)] hover:bg-[var(--color-mac)] hover:text-paper'
        : 'bg-[var(--color-mac)] text-paper hover:bg-[var(--color-mac-hover)]'

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

function InlineList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="grid gap-2">
      {items.map((item) => (
        <div key={item} className="grid grid-cols-[18px_1fr] gap-3">
          <span className={`mt-[9px] h-1 w-1 rounded-full ${dark ? 'bg-paper/55' : 'bg-ink-2'}`} />
          <span className={`text-[13px] leading-[20px] ${dark ? 'text-paper/75' : 'text-ink'}`}>{item}</span>
        </div>
      ))}
    </div>
  )
}

function ProposalNav() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const sections = navSections.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-40% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-5 md:flex">
        <div className="flex items-center gap-6">
          <span className="eyebrow font-medium">Anchovies</span>
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Braden Peters / Clavicular</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="eyebrow text-ink-2">Brand · Launch system · Website · v1</span>
          <span className="eyebrow">September 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
          <a href="#overview" className="flex min-w-0 items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
            <span className="truncate text-[13px] font-medium tracking-[-0.01em]">Anchovies × Miami Gym</span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}
              >
                {section.label}
              </a>
            ))}
          </nav>
          <a
            href={portfolioHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--color-mac)] px-4 py-2 text-[12px] font-medium text-[var(--color-mac)] transition-colors hover:bg-[var(--color-mac)] hover:text-paper whitespace-nowrap"
          >
            View work
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
          <span className="eyebrow text-ink-2">§ 01 — Overview</span>
          <span className="eyebrow text-ink-2">Strategy · Naming · Identity · Website</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Miami · Creator-first gym</span>
          <span className="eyebrow text-ink-2">Prepared by Anchovies</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="serif max-w-[1220px] pb-16 text-[52px] font-medium leading-[52px] tracking-[-0.036em] sm:text-[72px] sm:leading-[70px] md:text-[92px] md:leading-[88px] lg:text-[108px] lg:leading-[104px]">
          Built for the stream. Ready for real-world revenue.
        </h1>
      </Reveal>
      <div className="grid gap-12 pb-20 lg:grid-cols-[1.2fr_430px] lg:gap-[120px]">
        <Reveal>
          <h2 className="serif max-w-[700px] text-[31px] font-medium leading-[39px] tracking-[-0.024em] md:text-[38px] md:leading-[46px]">
            A complete brand and launch system for a Miami gym that can turn Clavicular’s reach into a business people want to join.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            This is not a standard gym with a famous face attached. It is a physical space, a recurring setting for Braden’s content, a community, and a platform for partnerships, products, and experiences. Access may be free, paid, or hybrid; the brand still needs to turn attention into durable business value.
          </p>
          <div className="flex flex-wrap gap-4">
            <LinkButton href="#alignment">See the thinking -&gt;</LinkButton>
            <LinkButton href={portfolioHref} variant="outline">View selected work</LinkButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="grid border-y border-[var(--color-rule)] md:grid-cols-3">
        {[
          ['Core sprint', 'Four weeks'],
          ['Comparable value', '$70,000'],
          ['Proposed agency fee', '$0'],
        ].map(([label, value], index) => (
          <div key={label} className={`p-8 ${index < 2 ? 'border-b border-[var(--color-rule)] md:border-r md:border-b-0' : ''}`}>
            <span className="eyebrow text-ink-2">{label}</span>
            <div className="serif mt-5 text-[46px] font-medium leading-[48px] tracking-[-0.024em]">{value}</div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Alignment() {
  return (
    <section id="alignment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 02 — Alignment" right="What the brand has to do" />
      <div className="grid gap-12 pt-12 lg:grid-cols-[500px_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <h2 className="serif text-[48px] font-medium leading-[52px] tracking-[-0.026em] md:text-[64px] md:leading-[64px]">
            The stream changes the brief.
          </h2>
          <p className="text-[15px] leading-[24px] text-ink-2">
            This is still a real gym for the people who train there. It can also serve as a recurring setting for Braden’s streams and content, which means the brand and physical experience will often be seen in public, in motion, and in real time. We should account for both uses from the start.
          </p>
        </Reveal>
        <Reveal className="border-t border-[var(--color-rule)] lg:border-t-0">
          {signals.map((signal) => (
            <div key={signal.num} className="grid gap-5 border-b border-[var(--color-rule)] py-7 md:grid-cols-[38px_1fr] md:gap-6">
              <span className="serif text-[18px] font-medium leading-[24px]">{signal.num}</span>
              <div>
                <h3 className="serif text-[24px] font-medium leading-[29px] tracking-[-0.014em]">{signal.title}</h3>
                <p className="mt-2 text-[13px] leading-[21px] text-ink-2">{signal.body}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function PointOfView() {
  return (
    <section className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 03 — Point of view" right="One brand · four jobs" dark />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-16 text-[52px] font-medium leading-[56px] tracking-[-0.03em] md:text-[76px] md:leading-[78px] lg:text-[84px] lg:leading-[86px]">
          Have a clear point of view.
        </h2>
      </Reveal>
      <Reveal className="grid border-y border-paper/25 md:grid-cols-2 xl:grid-cols-4">
        {principles.map((principle, index) => (
          <div key={principle.num} className={`min-h-[310px] p-8 ${index < 3 ? 'border-b border-paper/25 md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
            <span className="eyebrow text-paper/55">{principle.num}</span>
            <h3 className="serif mt-10 text-[34px] font-medium leading-[38px] tracking-[-0.018em]">{principle.title}</h3>
            <p className="mt-5 text-[13px] leading-[21px] text-paper/70">{principle.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 — Selected work" right="Curated for this conversation" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[760px] text-[48px] font-medium leading-[52px] tracking-[-0.026em] md:text-[66px] md:leading-[68px]">
            Relevant work.
          </h2>
        </Reveal>
        <Reveal className="text-[15px] leading-[24px] text-ink-2">
          The deck begins with our work for Within, then moves through identity systems with the restraint, edge, and masculine presence we think are useful references here. They are not proposed styles. They show how we build different identity systems for different audiences.
        </Reveal>
      </div>
      <Reveal>
        <a href={portfolioHref} target="_blank" rel="noreferrer" className="group flex min-h-[390px] flex-col justify-between bg-ink p-8 text-paper transition-colors hover:bg-ink-2 md:p-12">
          <div className="flex items-start justify-between gap-8">
            <span className="eyebrow text-paper/55">Portfolio deck · 103 slides</span>
            <span className="eyebrow text-paper/55">Gym · identity · culture</span>
          </div>
          <div>
            <h3 className="serif text-[58px] font-medium leading-[58px] tracking-[-0.03em] md:text-[88px] md:leading-[84px]">Selected work</h3>
            <div className="mt-8 inline-flex rounded-full bg-[var(--color-mac)] px-4 py-2.5 text-[12px] font-medium text-paper group-hover:bg-[var(--color-mac-hover)]">Open deck -&gt;</div>
          </div>
        </a>
      </Reveal>
    </section>
  )
}

function Scope() {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 05 — Scope" right="Five connected phases" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[760px] text-[44px] font-medium leading-[49px] tracking-[-0.024em] md:text-[58px] md:leading-[60px]">Scope and process.</h2>
        </Reveal>
        <Reveal className="text-[15px] leading-[24px] text-ink-2">Discovery defines the business requirements. Alignment sets the creative direction. The approved identity then moves into launch applications and the website.</Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[110px_390px_1fr] lg:gap-12">
            <div>
              <span className="eyebrow mb-2 block text-ink-2">Phase</span>
              <span className="serif text-[50px] font-medium leading-[50px] tracking-[-0.02em]">{phase.num}</span>
            </div>
            <div>
              <h3 className="serif text-[32px] font-medium leading-[37px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="mt-5 text-[14px] leading-[22px] text-ink-2">{phase.body}</p>
              <div className="mt-6 border-t border-[var(--color-rule)]/15 pt-4">
                <span className="eyebrow text-ink-2">Deliverable</span>
                <p className="mt-2 text-[13px] leading-[21px]">{phase.deliverable}</p>
              </div>
            </div>
            <div>
              <span className="eyebrow mb-4 block text-ink-2">Includes</span>
              <InlineList items={phase.includes} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Deliverables() {
  let count = 0
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 06 — Final deliverables" right="A complete launch system" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[760px] text-[44px] font-medium leading-[49px] tracking-[-0.024em] md:text-[58px] md:leading-[60px]">Final deliverables.</h2>
        </Reveal>
        <Reveal className="text-[15px] leading-[24px] text-ink-2">We will finalize the exact application mix after discovery, but the commitment is simple: deliver the strategy, identity, and practical tools needed to put the brand into the world.</Reveal>
      </div>
      <Reveal className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
        {deliverableGroups.map((group) => (
          <div key={group.title}>
            <span className="eyebrow mb-4 block text-ink-2">{group.title}</span>
            <div className="border-t border-[var(--color-rule)]">
              {group.items.map((item) => {
                count += 1
                return (
                  <div key={item} className="grid grid-cols-[32px_1fr] gap-3 border-b border-[var(--color-rule)] py-3.5">
                    <span className="eyebrow text-[#9A958B]">{String(count).padStart(2, '0')}</span>
                    <span className="text-[13px] leading-[20px]">{item}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 07 — Timeline" right="Four-week core sprint" />
      <Reveal>
        <h2 className="serif max-w-[1080px] py-14 text-[54px] font-medium leading-[57px] tracking-[-0.032em] md:text-[92px] md:leading-[92px]">One month.</h2>
      </Reveal>
      <Reveal>
        <p className="max-w-[760px] pb-12 text-[14px] leading-[22px] text-ink-2">The schedule assumes timely access to the team, consolidated feedback, and a decisive name and identity approval. Formal trademark clearance, location construction, and advanced booking or membership integrations can continue on their own timelines without slowing the core brand sprint.</p>
      </Reveal>
      <Reveal className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {timeline.map((step) => (
          <div key={step.when} className="border-t border-[var(--color-rule)] pt-6">
            <span className="eyebrow text-ink-2">{step.when}</span>
            <h3 className="serif mt-5 text-[30px] font-medium leading-[34px] tracking-[-0.016em]">{step.title}</h3>
            <div className="mt-6 grid gap-2">
              {step.items.map((item) => <p key={item} className="text-[13px] leading-[20px] text-ink-2">{item}</p>)}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function TheTrade() {
  return (
    <section id="trade" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 08 — The trade" right="Comparable value · agency fee waived" dark />
      <div className="grid gap-12 py-16 lg:grid-cols-[1fr_480px] lg:items-end lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[700px] text-[48px] font-medium leading-[52px] tracking-[-0.028em] md:text-[58px] md:leading-[62px]">We do the work. The work becomes the case study.</h2>
        </Reveal>
        <Reveal className="lg:text-right">
          <div className="serif text-[92px] font-medium leading-[90px] tracking-[-0.04em] md:text-[138px] md:leading-[130px]">$0</div>
          <div className="eyebrow mt-3 text-paper/55">Proposed agency fee</div>
          <div className="mt-3 text-[13px] leading-[21px] text-paper/70">Comparable full-scope value: $70,000</div>
        </Reveal>
      </div>
      <Reveal className="border-t border-paper/25">
        <div className="hidden grid-cols-[70px_330px_1fr_170px] border-b border-paper/25 py-4 md:grid">
          <span className="eyebrow text-paper/55">Line</span>
          <span className="eyebrow text-paper/55">Discipline</span>
          <span className="eyebrow text-paper/55">Scope summary</span>
          <span className="eyebrow text-right text-paper/55">Comparable value</span>
        </div>
        {valueLines.map((line) => (
          <div key={line.num} className="grid gap-5 border-b border-paper/25 py-7 md:grid-cols-[70px_330px_1fr_170px] md:gap-0">
            <span className="serif text-[28px] font-medium leading-[32px]">{line.num}</span>
            <h3 className="serif pr-8 text-[24px] font-medium leading-[29px] tracking-[-0.012em]">{line.title}</h3>
            <p className="pr-8 text-[13px] leading-[20px] text-paper/70">{line.summary}</p>
            <span className="serif text-[31px] font-medium leading-[34px] tracking-[-0.018em] md:text-right">{line.value}</span>
          </div>
        ))}
        <div className="grid gap-5 py-8 md:grid-cols-[70px_330px_1fr_170px] md:items-center md:gap-0">
          <span />
          <h3 className="serif pr-8 text-[28px] font-medium leading-[32px]">Total comparable value</h3>
          <span />
          <span className="serif text-[48px] font-medium leading-[48px] tracking-[-0.025em] md:text-right">$70,000</span>
        </div>
      </Reveal>
      <Reveal className="grid gap-6 border-t border-paper/25 pt-12 lg:grid-cols-2">
        <div className="border border-paper/25 p-8">
          <span className="eyebrow text-paper/55">Included at no cost</span>
          <div className="mt-6"><InlineList items={includedCosts} dark /></div>
        </div>
        <div className="border border-paper/25 p-8">
          <span className="eyebrow text-paper/55">Only with written approval</span>
          <p className="mt-4 text-[13px] leading-[20px] text-paper/70">No third-party production expense is incurred without approval. These items are outside the waived agency fee when required.</p>
          <div className="mt-6"><InlineList items={approvalCosts} dark /></div>
        </div>
      </Reveal>
    </section>
  )
}

function Terms() {
  return (
    <section id="terms" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 09 — Working agreement" right="Ownership · revisions · future scope" />
      <Reveal>
        <h2 className="serif max-w-[920px] py-14 text-[48px] font-medium leading-[52px] tracking-[-0.028em] md:text-[64px] md:leading-[66px]">A simple working agreement.</h2>
      </Reveal>
      <Reveal className="grid border-l border-t border-[var(--color-rule)] md:grid-cols-2">
        {agreements.map((agreement) => (
          <div key={agreement.label} className="min-h-[285px] border-r border-b border-[var(--color-rule)] p-8 md:p-10">
            <span className="eyebrow text-ink-2">{agreement.label}</span>
            <h3 className="serif mt-7 text-[33px] font-medium leading-[38px] tracking-[-0.018em]">{agreement.title}</h3>
            <p className="mt-5 text-[14px] leading-[22px] text-ink-2">{agreement.body}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-12 grid gap-10 border border-[var(--color-rule)] p-8 md:p-12 lg:grid-cols-[1fr_520px] lg:gap-20">
        <div>
          <span className="eyebrow text-ink-2">After the core engagement</span>
          <h3 className="serif mt-7 max-w-[560px] text-[42px] font-medium leading-[46px] tracking-[-0.022em]">Future paid work</h3>
          <p className="mt-6 max-w-[580px] text-[14px] leading-[22px] text-ink-2">If the launch grows into deeper environmental, production, content, or technical work, we scope that separately before it begins. There is no automatic retainer and no surprise expansion.</p>
        </div>
        <InlineList items={futureWork} />
      </Reveal>
    </section>
  )
}

function Team() {
  return (
    <>
      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 10 — The team" right="Experience and approach" />
        <div className="grid gap-12 pt-14 lg:grid-cols-[1.1fr_440px] lg:gap-20">
          <Reveal>
            <h2 className="serif max-w-[760px] text-[44px] font-medium leading-[48px] tracking-[-0.024em] md:text-[54px] md:leading-[58px]">Brand strategy with business context.</h2>
          </Reveal>
          <Reveal className="flex flex-col gap-7">
            <p className="text-[15px] leading-[24px] text-ink-2">Anchovies brings nearly two decades of experience using strategy and design to support positioning, differentiation, conversion, and long-term brand value. Sean leads business and creative strategy. Kira Knoop and Logan Causey lead art direction, typography, illustration, and brand application. The team stays small so the people making the decisions are also doing the work.</p>
            <div><LinkButton href={aboutHref} variant="outline">Meet the team -&gt;</LinkButton></div>
          </Reveal>
        </div>
      </section>
      <footer className="flex flex-col gap-5 bg-paper px-6 py-10 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
        <div className="flex items-center gap-4">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
          <span className="text-[12px] leading-[16px] tracking-[0.02em] text-ink">Anchovies</span>
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="text-[12px] leading-[16px] tracking-[0.02em]">Prepared for Braden Peters / Clavicular</span>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <span className="eyebrow">September 2026</span>
          <span className="eyebrow">Brand · Launch system · Website · v1</span>
        </div>
      </footer>
    </>
  )
}

export function ClavicularMiamiGymProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Clavicular Miami Gym — Proposal'
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', 'A strategy, naming, identity, launch system, and website proposal for Clavicular’s Miami gym from Anchovies.')

    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex, nofollow')
  }, [])

  return (
    <main className="clavicular-miami-gym-proposal bg-paper text-ink">
      <ProposalNav />
      <Hero />
      <Alignment />
      <PointOfView />
      <SelectedWork />
      <Scope />
      <Deliverables />
      <Timeline />
      <TheTrade />
      <Terms />
      <Team />
    </main>
  )
}
