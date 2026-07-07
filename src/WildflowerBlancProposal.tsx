import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://pitch.com/v/wildflower-blanc-rt4vmj'
const contractHref = '/proposal/wildflower-blanc/contract'

type Pillar = {
  label: string
  title: string
  body: string
}

type Personality = {
  num: string
  title: string
  body: string
}

type Priority = {
  num: string
  title: string
  body: string
}

type Phase = {
  num: string
  title: string
  body: string
  includes: string[]
}

type DeliverableGroup = {
  title: string
  items: string[]
}

type AddOn = {
  title: string
  price: string
  body: string
  includes: string[]
}

type TimelineStep = {
  num: string
  when: string
  title: string
  items: string[]
}

type InvestmentLine = {
  num: string
  phase: string
  summary: string
  amount: string
}

type PaymentMilestone = {
  amount: string
  title: string
  body: string
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'story', label: 'The Story' },
  { id: 'work', label: 'Work' },
  { id: 'scope', label: 'Scope' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

const pillars: Pillar[] = [
  {
    label: 'Pillar 01',
    title: 'Strategy',
    body: 'Positioning, brand architecture, and the relationship between two businesses that share one story.',
  },
  {
    label: 'Pillar 02',
    title: 'Verbal identity',
    body: 'How each brand introduces itself, speaks, and tells a story only these founders can tell.',
  },
  {
    label: 'Pillar 03',
    title: 'Visual identity',
    body: 'Two distinct, ownable systems built to hold up from an avatar to the side of a delivery crate.',
  },
  {
    label: 'Pillar 04',
    title: 'Brand systems',
    body: 'The shared family logic, applications, and tools that keep both brands working long after launch.',
  },
]

const pillarBorderClasses = [
  'border-b md:border-r xl:border-b-0',
  'border-b md:border-r-0 xl:border-r xl:border-b-0',
  'border-b md:border-r md:border-b-0 xl:border-b-0',
  'md:border-b-0',
]

const opportunityBullets = [
  'Turn raw ingredients into two brands with enough clarity to sell.',
  'Enough character to be remembered by planners and couples alike.',
  'Enough creative range to keep generating ideas long after launch.',
  'A richer merchandising and storytelling system for Wildflower.',
  'A narrative for Blanc that goes beyond the architecture.',
  'A recognizable creative ecosystem built around beautiful gatherings.',
  'One point of view, expressed through two distinct businesses.',
]

const personalities: Personality[] = [
  {
    num: '01',
    title: 'Wildflower',
    body: 'Imaginative, capable, welcoming, and full of possibility. It needs to speak to couples building an event themselves while carrying enough authority and taste to become a trusted favorite among planners producing six-figure celebrations. Elevated without becoming exclusionary. Creative without being confused for a florist. Strong enough to live on delivery vehicles, crates, crew apparel, catalogs, product tags, and digital storefronts.',
  },
  {
    num: '02',
    title: 'Blanc',
    body: 'More singular, place-led, and editorial. It is not simply a rentable room. It is a destination with history, flexibility, and a personal story behind its next chapter. The brand should feel premium from the first inquiry while leaving enough visual space for every event to become its own expression.',
  },
  {
    num: '03',
    title: 'Together',
    body: 'The relationship should feel intentional whenever the brands appear beside one another. We will explore where they can share sensibilities, typography, systems, endorsement language, or subtle visual details while preserving the individuality and equity of each name. The result should feel like one point of view expressed through two different businesses.',
  },
]

const priorities: Priority[] = [
  {
    num: '01',
    title: 'Build recognition among planners.',
    body: 'A significant portion of Wildflower’s revenue comes through repeat planners and venues. The brand must work as a relationship tool, recognizable when crates arrive, when a proposal is opened, when a product is tagged, and when it is credited in a publication.',
  },
  {
    num: '02',
    title: 'Own the flower system without becoming a florist.',
    body: 'The existing product names and “Bouquets” concept contain the seeds of a highly ownable system: individual pieces become flowers, curated combinations become bouquets, and the catalog becomes a garden of possibilities that can extend into naming, iconography, merchandising, and language.',
  },
  {
    num: '03',
    title: 'Give Blanc a narrative beyond the space.',
    body: 'The venue already has architectural character. The stronger opportunity is to connect that physical experience to Kelly and Willy’s story and their point of view on what a great event should feel like. The venue does not need an invented mythology; it already has one.',
  },
  {
    num: '04',
    title: 'Create ideas, not decoration.',
    body: 'Every major creative choice should answer a business or communication need. The identities will be built around concepts that keep producing campaigns, content, merchandise, signage, and product systems. That makes the brands easier to market because the underlying ideas are strong.',
  },
  {
    num: '05',
    title: 'Design for attention without chasing trends.',
    body: 'The work should feel appropriate to weddings and events without inheriting every cliche of the category. It should be striking enough to earn attention from clients, planners, collaborators, and publications, while staying useful well beyond a single season.',
  },
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery and brand architecture',
    body: 'We begin by understanding the businesses separately and together: their audiences, services, growth plans, referral relationships, competitive environment, brand equity, and long-term ambitions. This phase establishes what each brand must own and how they should relate.',
    includes: [
      'Joint founder discovery',
      'Business and audience review',
      'Planner and venue relationship considerations',
      'Competitive and category review',
      'Brand architecture recommendations',
      'Relationship between Wildflower and Blanc',
      'Positioning opportunities for each business',
      'Creative direction moodboards',
      'Photography and visual-content observations',
      'Website and workflow considerations',
    ],
  },
  {
    num: '02',
    title: 'Verbal identity and story',
    body: 'We clarify how each brand introduces itself, speaks, and tells its story. This is not an exhaustive corporate strategy document. It is a focused language system that can actually be remembered and used.',
    includes: [
      'Core positioning for Wildflower',
      'Core positioning for Blanc',
      'Brand idea for each company',
      'Audience and value proposition',
      'Personality and tone',
      'Short elevator pitch for each company',
      'Founder and origin-story narrative',
      'Key messaging hierarchy',
      'Tagline or campaign-line exploration',
      'Product and collection naming guidance',
      '“Flower,” “Bouquet,” and “Flower Power” territory',
      'Relationship and endorsement language',
    ],
  },
  {
    num: '03',
    title: 'Wildflower visual identity',
    body: 'Wildflower needs an identity that feels full of life without relying on the predictable softness of the wedding category. It needs a bold, functional system that holds its own at every scale, from an Instagram avatar to the side of a delivery crate.',
    includes: [
      'Primary logo or wordmark',
      'Secondary logo configuration',
      'Supporting icon or symbol',
      'Typography system',
      'Color system',
      'Graphic and layout language',
      'Illustration, botanical, or handmade exploration',
      'Product and collection icon direction',
      'Photography and merchandising guidance',
      'Social avatar and profile assets',
      'Delivery crate or vehicle-marking concept',
      'Crew shirt or merchandise concept',
      'Business card',
      'One reusable Canva template system',
      'Wildflower mini brand guide',
    ],
  },
  {
    num: '04',
    title: 'Blanc visual identity',
    body: 'Blanc should feel like a destination, not simply another wedding venue. The identity complements the architecture, carries a premium price point, and signals that the venue is entering a meaningful new chapter.',
    includes: [
      'Primary logo or wordmark',
      'Secondary logo configuration',
      'Supporting icon or symbol',
      'Typography system',
      'Color system',
      'Graphic and layout language',
      'Venue-specific visual motifs',
      'Photography direction',
      'Social avatar and profile assets',
      'Business card',
      'Inquiry or sales-document cover concept',
      'Signage concept',
      'One reusable Canva template system',
      'Blanc mini brand guide',
    ],
  },
  {
    num: '05',
    title: 'The shared system',
    body: 'Once both identities are established, we bring them together intentionally and determine how the brands appear when they collaborate, cross-promote, share a location, refer business, or appear within the same presentation or event.',
    includes: [
      'Co-branding hierarchy',
      'Side-by-side logo behavior',
      'Shared versus individual visual elements',
      'Cross-promotion language',
      '“Rentals by Wildflower” endorsement exploration',
      'Shared touchpoint concepts',
      'Final brand-family overview',
      'Organized master asset handoff',
    ],
  },
]

const deliverableGroups: DeliverableGroup[] = [
  {
    title: 'Shared foundation',
    items: [
      'Discovery summary',
      'Competitive observations',
      'Brand-family architecture',
      'Positioning for both companies',
      'Creative direction moodboards',
      'Cross-promotion recommendations',
    ],
  },
  {
    title: 'Wildflower',
    items: [
      'Verbal identity',
      'Brand narrative',
      'Primary and secondary logos',
      'Supporting mark',
      'Typography',
      'Color system',
      'Graphic and illustration language',
      'Product-naming guidance',
      'Photography and merchandising direction',
      'Business card',
      'Social assets',
      'Crate, vehicle, or delivery application',
      'Apparel concept',
      'Canva template system',
      'Mini brand guide',
      'Final identity files',
    ],
  },
  {
    title: 'Blanc',
    items: [
      'Verbal identity',
      'Founder and venue narrative',
      'Primary and secondary logos',
      'Supporting mark',
      'Typography',
      'Color system',
      'Graphic language',
      'Photography direction',
      'Business card',
      'Social assets',
      'Signage concept',
      'Inquiry or sales-document concept',
      'Canva template system',
      'Mini brand guide',
      'Final identity files',
    ],
  },
  {
    title: 'Shared system',
    items: [
      'Co-branding guidance',
      'Cross-promotion language',
      'Shared application examples',
      'Combined brand-family overview',
      'Organized final asset library',
    ],
  },
]

const websiteAddOns: AddOn[] = [
  {
    title: 'Wildflower website',
    price: '+$5,000',
    body: 'A focused Shopify redesign that makes the rental catalog feel easier to explore, more inspiring to shop, and unmistakably connected to the new identity. Browsing can be shaped by product type, color, season, event, and theme.',
    includes: [
      'Website strategy and architecture',
      'Shopify theme selection or evaluation',
      'Custom homepage design',
      'Collection and category template',
      'Product page template',
      'Bouquet or lookbook template',
      'Services and delivery page',
      'About or story page',
      'FAQ and contact experience',
      'Mobile and tablet adaptation',
      'Core page copy refinement',
      'Brand implementation',
      'Basic metadata and on-page SEO',
      'Shopify theme configuration',
      'Launch QA',
    ],
  },
  {
    title: 'Blanc website',
    price: '+$5,000',
    body: "A premium, inquiry-led Shopify website that introduces the venue, tells the founders' story, and helps couples, planners, and event clients understand the full property.",
    includes: [
      'Website strategy and architecture',
      'Shopify theme selection or implementation',
      'Custom homepage design',
      'Venue overview',
      'Weddings page',
      'Private and corporate events page',
      'Spaces or property page',
      'Gallery',
      'Founder story',
      'FAQ',
      'Inquiry experience',
      'Mobile and tablet adaptation',
      'Core page copy refinement',
      'Brand implementation',
      'Basic metadata and on-page SEO',
      'Launch QA',
    ],
  },
]

const timeline: TimelineStep[] = [
  {
    num: '01',
    when: 'Week 1',
    title: 'Discovery & direction',
    items: ['Market review', 'Brand architecture', 'Positioning', 'Creative direction'],
  },
  {
    num: '02',
    when: 'Week 2',
    title: 'Verbal identity',
    items: ['Brand story', 'Messaging direction', 'Relationship language'],
  },
  {
    num: '03',
    when: 'Weeks 2-3',
    title: 'Wildflower identity',
    items: ['Visual identity development', 'Applications', 'Refinement'],
  },
  {
    num: '04',
    when: 'Weeks 3-4',
    title: 'Blanc identity',
    items: ['Visual identity development', 'Applications', 'Refinement'],
  },
  {
    num: '05',
    when: 'Weeks 4-5',
    title: 'Refinement & handoff',
    items: ['Brand-family alignment', 'Guidelines', 'Final files'],
  },
]

const investmentLines: InvestmentLine[] = [
  {
    num: '01',
    phase: 'Wildflower',
    summary: 'Strategy, verbal identity, visual identity, applications, and brand guide.',
    amount: '$5,950',
  },
  {
    num: '02',
    phase: 'Blanc',
    summary: 'Strategy, verbal identity, visual identity, applications, and brand guide.',
    amount: '$5,950',
  },
]

const paymentMilestones: PaymentMilestone[] = [
  {
    amount: '50%',
    title: 'Due at kickoff',
    body: '$5,950 reserves the project window and begins discovery.',
  },
  {
    amount: '25%',
    title: 'After identity presentations',
    body: '$2,975 is due after both primary identity directions have been presented.',
  },
  {
    amount: '25%',
    title: 'At final handoff',
    body: '$2,975 is due before delivery of final files and guidelines.',
  },
]

const assumptions = [
  'The engagement includes up to two focused refinement rounds for each primary identity presentation.',
  'Kelly and Willy will provide consolidated feedback.',
  'Final company names remain Wildflower and Blanc unless naming is added through a separate scope.',
  'Printing, fabrication, signage production, vehicle installation, photography, paid fonts, premium Shopify themes, apps, hosting, and third-party costs are not included.',
  'Website work is not included in this engagement unless added through a separate written scope.',
  'Large-scale product entry, catalog cleanup, inventory tools, booking systems, or advanced integrations can be scoped separately.',
  'The client will provide final product data, policies, pricing, event photography, and legally approved claims.',
  'Canva templates will be built around agreed-upon recurring workflows and delivered for client use.',
  'Timely, consolidated feedback will protect the proposed schedule.',
]

const nextStepItems = [
  'A clear role and position for each brand.',
  'A thoughtful relationship between Wildflower and Blanc.',
  'A verbal identity and story for each company.',
  'Two complete and ownable visual identity systems.',
  'Practical tools for planners, customers, deliveries, and marketing.',
  'A foundation that can expand into websites, signage, merchandise, and editorial.',
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
  href = calendarHref,
  variant = 'dark',
}: {
  children: string
  href?: string
  variant?: 'dark' | 'outline' | 'light'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
      ? 'border border-ink text-ink hover:bg-ink hover:text-paper'
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
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-5 text-ink md:flex">
        <div className="flex items-center gap-6">
          <span className="eyebrow font-medium text-ink">Anchovies</span>
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Kelly & Willy</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="eyebrow text-ink-2">Dual Brand Identity · v3</span>
          <span className="eyebrow text-ink">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
          <a href="#overview" className="flex min-w-0 items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
            <span className="truncate text-[13px] font-medium tracking-[-0.01em] text-ink">Anchovies × Wildflower + Blanc</span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#work" className="hidden rounded-full px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap sm:inline-flex">
              View work
            </a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
              Schedule a discovery
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
          <span className="eyebrow text-ink-2">§ 01 / Overview</span>
          <span className="eyebrow text-ink-2">Strategy · Verbal · Visual · Brand systems</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Wildflower + Blanc · Events</span>
          <span className="eyebrow text-ink-2">Prepared by Anchovies</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="serif max-w-[1200px] pb-16 text-[56px] font-medium leading-[54px] tracking-[-0.04em] sm:text-[82px] sm:leading-[76px] md:text-[112px] md:leading-[98px] lg:text-[144px] lg:leading-[124px]">
          From what fills the room to the room itself.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 pb-20 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[31px] font-medium leading-[39px] tracking-[-0.024em] md:text-[36px] md:leading-[44px]">
            Two connected identities: one for the pieces that bring an occasion to life, one for the place that holds it.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            You came to us for two visual identities. We see a much larger opportunity: to build the creative foundation for two connected brands that can influence how events are imagined, styled, experienced, and remembered. Wildflower curates the pieces that bring an occasion to life. Blanc holds the occasion itself.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Schedule a discovery ->'}</AnchorButton>
            <AnchorButton href={contractHref} variant="outline">
              Review contract
            </AnchorButton>
            <AnchorButton href="#scope" variant="outline">
              See the scope
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 / What this work creates" right="Four disciplines" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className={`flex min-h-[288px] flex-col gap-6 border-[var(--color-rule)] p-8 ${pillarBorderClasses[index]}`}>
              <span className="eyebrow text-ink-2">{pillar.label}</span>
              <h3 className="serif text-[40px] font-medium leading-[44px] tracking-[-0.02em]">{pillar.title}</h3>
              <p className="text-[13px] leading-[20px] text-ink-2">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Story() {
  return (
    <section id="story" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 02 / The story" right="Full circle" />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-12 text-[52px] font-medium leading-[56px] tracking-[-0.032em] md:text-[92px] md:leading-[92px]">
          A business story that came full circle.
        </h2>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] whitespace-pre-line text-[17px] leading-[28px] text-ink-2">
            {'Kelly and Willy were married at Blanc. Their own experience planning that wedding exposed an opportunity in the rental market, so they began Wildflower from their garage, secured the first booking before they had inventory, and built the business one event at a time.\n\nYears later, they returned to purchase the venue where their own story began. That is not a small detail. It is the emotional foundation for both brands.'}
          </p>
        </Reveal>
        <Reveal>
          <p className="max-w-[560px] whitespace-pre-line text-[17px] leading-[28px] text-ink-2">
            {'Wildflower was created to make beautiful events easier to assemble. Blanc is the place where those events become real.\n\nTogether, they represent both sides of the same occasion: the pieces people choose and the space where their memories are made.'}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 02b / Work" right="Reference deck" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.1fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[760px] text-[46px] font-medium leading-[50px] tracking-[-0.026em] md:text-[64px] md:leading-[66px]">
            One place to review the work.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A single reference deck for the Wildflower + Blanc identity direction and related brand work.
        </Reveal>
      </div>
      <Reveal className="pt-14">
        <a
          href={workHref}
          target="_blank"
          rel="noreferrer"
          className="group grid min-h-[260px] gap-10 border border-[var(--color-rule)] bg-ink p-8 text-paper transition-colors hover:bg-ink-2 lg:grid-cols-[1fr_280px]"
        >
          <div className="flex h-full flex-col justify-between gap-16">
            <div className="flex items-start justify-between gap-6">
              <span className="eyebrow text-paper/55">Featured</span>
              <span className="eyebrow text-paper/55">Pitch deck</span>
            </div>
            <h3 className="serif text-[48px] font-medium leading-[50px] tracking-[-0.026em] md:text-[72px] md:leading-[72px]">
              Wildflower + Blanc Work
            </h3>
          </div>
          <div className="flex items-end justify-between gap-6 border-t border-paper/20 pt-6 lg:flex-col lg:items-end lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 lg:text-right">
            <span className="text-[13px] leading-[20px] text-paper/70">Identity direction, brand thinking, and visual reference.</span>
            <span className="inline-flex rounded-full bg-paper px-3.5 py-2 text-[12px] font-medium leading-[16px] text-ink transition-colors group-hover:bg-white">Open work -&gt;</span>
          </div>
        </a>
      </Reveal>
    </section>
  )
}

function Opportunity() {
  return (
    <section className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 03 / The opportunity" right="Bigger than two logos" dark />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-12 text-[52px] font-medium leading-[56px] tracking-[-0.032em] md:text-[96px] md:leading-[96px]">
          Whatever you came for, the opportunity is bigger.
        </h2>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-paper/70">
            The wedding and events category is crowded with familiar visual language: florals, fine-line marks, handwritten type, generic luxury, and identities designed to disappear politely into the background. These brands have permission to do something more memorable.
          </p>
        </Reveal>
        <Reveal>
          <span className="eyebrow mb-5 block text-paper/55">Our opportunity</span>
          <InlineList items={opportunityBullets} dark />
        </Reveal>
      </div>
    </section>
  )
}

function Personalities() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 04 / One family, two personalities" right="Connected, not identical" />
      <Reveal>
        <h2 className="serif max-w-[900px] py-12 text-[48px] font-medium leading-[52px] tracking-[-0.026em] md:text-[64px] md:leading-[64px]">
          Connected in sensibility. Distinct in purpose.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {personalities.map((item) => (
          <Reveal key={item.num} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[480px_1fr] lg:gap-20">
            <div className="flex flex-col gap-4">
              <span className="serif text-[72px] font-medium leading-[72px] tracking-[-0.03em]">{item.num}</span>
              <h3 className="serif text-[40px] font-medium leading-[44px] tracking-[-0.02em]">{item.title}</h3>
            </div>
            <p className="max-w-[720px] text-[16px] leading-[26px] text-ink-2">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Priorities() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 05 / Strategic priorities" right="Five priorities" />
      <div className="grid gap-12 pt-12 lg:grid-cols-[520px_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <h2 className="serif text-[48px] font-medium leading-[52px] tracking-[-0.026em] md:text-[64px] md:leading-[64px]">
            What the work needs to accomplish.
          </h2>
          <p className="text-[15px] leading-[23px] text-ink-2">
            Before any logo, we agree on what these brands must do in the real world: for planners, for couples, for deliveries, and for the way both businesses grow.
          </p>
          <p className="text-[15px] leading-[23px] text-ink-2">Five priorities shape every creative decision that follows.</p>
        </Reveal>
        <div className="border-t border-[var(--color-rule)]">
          {priorities.map((item) => (
            <Reveal key={item.num} className="grid gap-6 border-b border-[var(--color-rule)] py-8 sm:grid-cols-[52px_1fr]">
              <span className="serif text-[48px] font-medium leading-[48px] tracking-[-0.02em]">{item.num}</span>
              <div>
                <h3 className="serif text-[28px] font-medium leading-[32px] tracking-[-0.014em]">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-[22px] text-ink-2">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Scope() {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 06 / Scope of work" right="Five phases" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[42px] font-medium leading-[48px] tracking-[-0.024em] md:text-[48px] md:leading-[52px]">
            Two complete identities, developed as one engagement.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          Five phases that move from joint discovery through two distinct identities to the shared system that connects them.
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[120px_360px_1fr] lg:gap-12">
            <div>
              <span className="eyebrow mb-2 block text-ink-2">Phase</span>
              <span className="serif text-[48px] font-medium leading-[48px] tracking-[-0.02em]">{phase.num}</span>
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="serif text-[32px] font-medium leading-[38px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{phase.body}</p>
            </div>
            <div className="pt-1">
              <span className="eyebrow mb-4 block text-ink-2">Includes</span>
              <InlineList items={phase.includes} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function HandmadeLayer() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 07 / The handmade layer" right="Fingerprints on it" />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-12 text-[52px] font-medium leading-[56px] tracking-[-0.032em] md:text-[92px] md:leading-[92px]">
          Identity with fingerprints on it.
        </h2>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            We believe one of the clearest ways to create distinction now is to let the brands feel touched by real hands through illustration, markings, product icons, venue details, imperfect systems, and graphic gestures that feel authored rather than bought.
          </p>
        </Reveal>
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            The goal is not to add handmade details for decoration. It is to build identities that feel connected to the physical world of events: things carried, placed, gathered, arranged, lit, signed, photographed, and remembered.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Deliverables() {
  let count = 0
  return (
    <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 08 / Final deliverables" right="Forty-two artifacts" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[42px] font-medium leading-[48px] tracking-[-0.024em] md:text-[48px] md:leading-[52px]">
            Everything needed to launch both identities.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          A shared strategic foundation, two complete and ownable identities, and the system that connects them, packaged and ready to use.
        </Reveal>
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

function WebsiteAddOns() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 09 / Website options" right="Future add-ons" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[42px] font-medium leading-[48px] tracking-[-0.024em] md:text-[48px] md:leading-[52px]">
            Websites can follow the identities.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          The selected engagement is focused on the brand systems. Either website can be added later as a separate Shopify build once the identities are ready to move into customer-facing pages.
        </Reveal>
      </div>
      <Reveal className="grid gap-6 lg:grid-cols-2">
        {websiteAddOns.map((addOn) => (
          <div key={addOn.title} className="border border-[var(--color-rule)] p-8 md:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="serif text-[36px] font-medium leading-[40px] tracking-[-0.018em]">{addOn.title}</h3>
              <span className="serif text-[40px] font-medium leading-[42px] tracking-[-0.02em]">{addOn.price}</span>
            </div>
            <p className="mt-6 text-[14px] leading-[22px] text-ink-2">{addOn.body}</p>
            <div className="mt-8">
              <span className="eyebrow mb-4 block text-ink-2">Includes</span>
              <InlineList items={addOn.includes} />
            </div>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-6 grid gap-4 border border-[var(--color-rule)] p-6 md:grid-cols-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-ink-2">Selected engagement</span>
          <span className="serif text-[28px] font-medium leading-[32px]">$11,900</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-ink-2">Each website add-on</span>
          <span className="serif text-[28px] font-medium leading-[32px]">+$5,000</span>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-ink-2">Both websites later</span>
          <span className="serif text-[28px] font-medium leading-[32px]">$21,900</span>
        </div>
      </Reveal>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 10 / Process and timeline" right="4-5 weeks" />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-12 text-[52px] font-medium leading-[56px] tracking-[-0.032em] md:text-[92px] md:leading-[92px]">
          Thoughtful enough to matter. Paced for your season.
        </h2>
      </Reveal>
      <Reveal>
        <p className="max-w-[720px] pb-12 text-[15px] leading-[23px] text-ink-2">
          The engagement is focused on the identities first: discovery, story, visual systems, refinement, and final handoff across roughly 4-5 weeks.
        </p>
      </Reveal>
      <Reveal className="grid gap-8 md:grid-cols-2 xl:grid-cols-6">
        {timeline.map((step) => (
          <div key={step.num} className="border-t border-[var(--color-rule)] pt-6">
            <div className="flex items-baseline gap-3">
              <span className="serif text-[44px] font-medium leading-[44px] tracking-[-0.02em]">{step.num}</span>
              <span className="eyebrow text-ink-2">{step.when}</span>
            </div>
            <h3 className="serif mt-5 text-[26px] font-medium leading-[30px] tracking-[-0.016em]">{step.title}</h3>
            <div className="mt-5 grid gap-2">
              {step.items.map((item) => (
                <p key={item} className="text-[13px] leading-[20px] text-ink-2">{item}</p>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 11 / Investment" right="Dual brand identity" dark />
      <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[560px] text-[56px] font-medium leading-[60px] tracking-[-0.034em] md:text-[92px] md:leading-[92px]">
            Dual brand identity engagement.
          </h2>
        </Reveal>
        <Reveal className="lg:text-right">
          <div className="serif text-[72px] font-medium leading-[76px] tracking-[-0.036em] md:text-[120px] md:leading-[116px]">$11,900</div>
          <div className="mt-2 text-[13px] leading-[18px] tracking-[0.04em] text-paper/55">One integrated engagement · two brands</div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-6">
        <div className="hidden grid-cols-[80px_340px_1fr_180px] border-b border-[var(--color-rule)] py-4 md:grid">
          <span className="eyebrow text-paper/55">Line</span>
          <span className="eyebrow text-paper/55">Phase</span>
          <span className="eyebrow text-paper/55">Scope summary</span>
          <span className="eyebrow text-right text-paper/55">Amount</span>
        </div>
        {investmentLines.map((line) => (
          <div key={line.num} className="grid gap-5 border-b border-[var(--color-rule)] py-7 md:grid-cols-[80px_340px_1fr_180px] md:gap-0">
            <span className="serif text-[28px] font-medium leading-[32px]">{line.num}</span>
            <h3 className="serif max-w-[300px] pr-8 text-[24px] font-medium leading-[30px] tracking-[-0.012em]">{line.phase}</h3>
            <p className="pr-6 text-[13px] leading-[20px] text-paper/70">{line.summary}</p>
            <span className="serif text-[32px] font-medium leading-[36px] tracking-[-0.018em] md:text-right">{line.amount}</span>
          </div>
        ))}
        <div className="grid gap-5 py-8 md:grid-cols-[80px_340px_1fr_180px] md:items-center md:gap-0">
          <span />
          <h3 className="serif pr-8 text-[28px] font-medium leading-[32px] tracking-[-0.014em]">Total / Selected engagement</h3>
          <span />
          <span className="serif text-[48px] font-medium leading-[48px] tracking-[-0.025em] md:text-right">$11,900</span>
        </div>
      </Reveal>
      <Reveal className="grid gap-8 border border-[var(--color-rule)] p-8 md:p-10 lg:grid-cols-[520px_1fr_180px] lg:gap-12">
        <div className="flex flex-col gap-3">
          <span className="eyebrow text-paper/55">Optional add-ons</span>
          <h3 className="serif text-[40px] font-medium leading-[42px] tracking-[-0.02em]">Shopify websites.</h3>
          <p className="text-[14px] leading-[22px] text-paper/70">
            Websites are not included in the selected engagement. Either site can be added later as a separate Shopify build when the brand systems are ready to move into customer-facing pages.
          </p>
        </div>
        <InlineList
          items={[
            'Wildflower Shopify website: $5,000',
            'Blanc Shopify website: $5,000',
            'Both websites: $10,000',
            'Theme-based build',
            'Brand carried directly into each storefront',
          ]}
          dark
        />
        <div className="lg:text-right">
          <div className="serif text-[40px] font-medium leading-[42px] tracking-[-0.02em]">+$5,000</div>
          <div className="eyebrow mt-1 text-paper/55">per website</div>
        </div>
      </Reveal>
      <Reveal className="pt-14">
        <MetaRow left="Payment structure" right="Three milestones" dark />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {paymentMilestones.map((milestone) => (
            <div key={milestone.title} className="border border-[var(--color-rule)] p-8">
              <div className="serif text-[64px] font-medium leading-[64px] tracking-[-0.03em]">{milestone.amount}</div>
              <h3 className="serif mt-3 text-[22px] font-medium leading-[28px] tracking-[-0.014em]">{milestone.title}</h3>
              <p className="mt-3 text-[13px] leading-[20px] text-paper/70">{milestone.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Assumptions() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 12 / Working assumptions" right="Scope boundaries" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[42px] font-medium leading-[48px] tracking-[-0.024em] md:text-[48px] md:leading-[52px]">
            A few things we are assuming.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          Clear boundaries keep the engagement focused and the schedule protected. These are the assumptions behind the scope and investment above.
        </Reveal>
      </div>
      <Reveal className="grid gap-0 lg:grid-cols-2 lg:gap-12">
        {assumptions.map((item) => (
          <div key={item} className="grid grid-cols-[18px_1fr] gap-3.5 border-t border-[var(--color-rule)] py-4.5 last:border-b lg:[&:nth-last-child(2)]:border-b">
            <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#9A958B]" />
            <span className="text-[14px] leading-[22px] text-ink-2">{item}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function WhyAnchovies() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 13 / Why Anchovies" right="Small team, senior attention" />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-12 text-[52px] font-medium leading-[56px] tracking-[-0.032em] md:text-[92px] md:leading-[92px]">
          Small team. Senior attention. Bigger thinking.
        </h2>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            You will work directly with Sean and the same small senior team throughout the engagement. The people in the first conversation remain the people doing the work. Our process is collaborative, but it is not designed to create homework. We listen closely, identify the ideas with the most potential, and turn them into focused creative systems.
          </p>
        </Reveal>
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            We understand the wedding ecosystem, the importance of planner relationships, and the balance between differentiation and category familiarity. More importantly, we believe these two businesses have the ingredients for something far more meaningful than a standard rebrand.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 14 / Next step" right="Schedule discovery" />
      <Reveal className="border border-[var(--color-rule)] bg-paper p-8 md:p-12 lg:p-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <h2 className="serif max-w-[760px] text-[54px] font-medium leading-[58px] tracking-[-0.032em] md:text-[88px] md:leading-[84px]">
            Build the brands people remember.
          </h2>
          <div className="lg:text-right">
            <div className="serif text-[56px] font-medium leading-[58px] tracking-[-0.028em] md:text-[72px] md:leading-[72px]">$11,900</div>
            <div className="eyebrow mt-2 text-ink-2">Selected engagement · 4-5 weeks</div>
          </div>
        </div>
        <div className="grid gap-10 pt-14 lg:grid-cols-[1fr_480px] lg:gap-20">
          <p className="max-w-[560px] text-[15px] leading-[23px] text-ink-2">
            The engagement begins with one shared discovery phase, followed by strategic and creative development for each company. After the discovery conversation, Kelly and Willy receive:
          </p>
          <div className="grid gap-3.5">
            {nextStepItems.map((item, index) => (
              <div key={item} className="grid grid-cols-[28px_1fr] gap-3.5">
                <span className="serif text-[14px] font-medium leading-[22px]">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[14px] leading-[22px]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-12">
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Schedule a discovery ->'}</AnchorButton>
            <AnchorButton href={contractHref} variant="outline">
              Review contract
            </AnchorButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 15 / In closing" right="Wildflower + Blanc" />
      <Reveal>
        <h2 className="serif max-w-[1100px] py-16 text-[52px] font-medium leading-[56px] tracking-[-0.032em] md:text-[92px] md:leading-[92px]">
          One sets the table. One sets the scene.
        </h2>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            Wildflower and Blanc already share a story. Our role is to give that story a form people can recognize, remember, and want to become part of.
          </p>
        </Reveal>
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            Build the brands people remember long after the event is over.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 bg-paper px-6 py-10 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-4">
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
        <span className="text-[12px] leading-[16px] tracking-[0.02em] text-ink">Anchovies</span>
        <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="text-[12px] leading-[16px] tracking-[0.02em]">Prepared for Kelly & Willy</span>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <span className="eyebrow text-ink-2">July 2026</span>
        <span className="eyebrow text-ink-2">Dual Brand Identity · v3</span>
      </div>
    </footer>
  )
}

export function WildflowerBlancProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Wildflower + Blanc - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A dual brand identity proposal for Wildflower and Blanc from Anchovies.')
    }
  }, [])

  return (
    <main className="wildflower-blanc-proposal bg-paper text-ink">
      <ProposalNav />
      <Hero />
      <Story />
      <Work />
      <Opportunity />
      <Personalities />
      <Priorities />
      <Scope />
      <HandmadeLayer />
      <Deliverables />
      <WebsiteAddOns />
      <Timeline />
      <Investment />
      <Assumptions />
      <WhyAnchovies />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
