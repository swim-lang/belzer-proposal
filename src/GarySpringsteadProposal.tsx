import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'

type Pillar = {
  label: string
  title: string
  body: string
}

type HeardSignal = {
  num: string
  title: string
  body: string
}

type CreationPillar = {
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

type FutureTrack = {
  label: string
  title: string
  items: string[]
}

type WorkLink = {
  title: string
  href: string
  category: string
  note?: string
  featured?: boolean
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

const pillars: Pillar[] = [
  {
    label: 'Pillar 01',
    title: 'Strategy',
    body: 'A focused position for the firm, built around its investigative instincts, courtroom experience, national capability, and direct partner involvement.',
  },
  {
    label: 'Pillar 02',
    title: 'Identity',
    body: 'A visual system that feels commanding, discreet, and contemporary without relying on the usual law firm cliches.',
  },
  {
    label: 'Pillar 03',
    title: 'Narrative',
    body: 'Clear language for clients, referral counsel, the media, and search audiences that communicates the depth of the practice quickly.',
  },
  {
    label: 'Pillar 04',
    title: 'Website',
    body: 'A polished, responsive platform that establishes credibility, supports discovery, and gives the firm room to grow.',
  },
]

const heardSignals: HeardSignal[] = [
  {
    num: '01',
    title: 'This is an independent launch, not a reset.',
    body: 'The brand should recognize the weight already carried by the Springstead name. It needs the confidence of an established practice, not the visual language of an attorney opening an office for the first time.',
  },
  {
    num: '02',
    title: 'The practice moves between local depth and national reach.',
    body: 'Michigan remains the home base, but the firm must feel credible wherever a serious federal matter leads. The identity and website should make that range immediately legible.',
  },
  {
    num: '03',
    title: 'The investigative background is a real differentiator.',
    body: 'Two former FBI agents bring a perspective most criminal defense firms cannot claim. That history should inform the positioning without turning the brand into a government-themed costume.',
  },
  {
    num: '04',
    title: 'The firm offers more than trial defense alone.',
    body: 'Gary’s federal and state criminal defense experience is complemented by Kathryn’s investigative, research, writing, appellate, post-conviction, and habeas work. Together, they create a more complete view of a case, from investigation through trial and appeal.',
  },
  {
    num: '05',
    title: 'High-stakes work calls for composure.',
    body: 'The brand does not need to shout “aggressive” or decorate itself with shields, gavels, columns, flags, or courtroom symbolism. The experience already supplies the authority. The design can be more restrained, exacting, and self-assured.',
  },
  {
    num: '06',
    title: 'The launch needs to move quickly.',
    body: 'The process should be collaborative but white glove, with clear decision points and minimal homework. The goal is to move from discovery to launch in approximately four to five weeks.',
  },
]

const opportunityBullets = [
  'Preserve the equity already held by the Springstead name.',
  'Signal national federal capability without losing West Michigan roots.',
  'Make the combined investigative, trial, and appellate depth easy to understand.',
  'Differentiate the firm without making it feel abstract or unfamiliar.',
  'Create a stronger first impression for sophisticated and high-stakes matters.',
  'Support referrals, media visibility, attorney profiles, and search discovery.',
  'Give the new practice a foundation that can lead the category rather than imitate it.',
]

const creationPillars: CreationPillar[] = [
  {
    num: '01',
    title: 'A clear strategic position',
    body: 'We will define the firm’s public story: what it does, who it is best equipped to represent, how the partners’ backgrounds create a meaningful advantage, and how the practice should be framed across Michigan and national federal work. The goal is not to make the firm sound larger than it is — it is to make the market understand the caliber of experience clients receive directly.',
  },
  {
    num: '02',
    title: 'An identity with authority and independence',
    body: 'The visual identity should feel premium, recognizable, and assured without becoming corporate or generic. We will build a system that works across the website, business cards, correspondence, attorney profiles, media appearances, presentations, and future materials. It should feel sharp enough to earn attention, but restrained enough to belong in the most serious rooms.',
  },
  {
    num: '03',
    title: 'A narrative that makes experience legible',
    body: 'Credentials alone do not create a compelling story. We will shape the firm’s experience into a concise narrative that helps people understand the value behind it. This includes positioning, firm language, attorney biographies, practice framing, case-experience language, calls to action, and a tone that is direct, intelligent, and composed.',
  },
  {
    num: '04',
    title: 'A digital platform that establishes the firm immediately',
    body: 'The website will introduce the new practice with the confidence of an established national firm while retaining the directness and accessibility of a focused partnership. It will serve prospective clients, referral attorneys, journalists, and search audiences while providing a flexible system for practice areas, results, insights, and future growth.',
  },
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery, audit, and market framing',
    body: "We begin with Gary and Kathryn's backgrounds, current public profiles, existing brand equity, target matters, referral network, search considerations, and goals for the new practice. This phase is about understanding what should carry forward, what should change, and what the independent firm must communicate from day one.",
    deliverable: 'Strategic direction summary, audience framework, market observations, website priorities, and creative direction moodboard.',
    includes: [
      'Partner discovery',
      'Background and credential review',
      'Current digital presence review',
      'Competitive and category review',
      'Audience and referral-path discussion',
      'State and federal practice framing',
      'Search and domain considerations',
      'Creative direction moodboard',
    ],
  },
  {
    num: '02',
    title: 'Positioning and brand foundation',
    body: 'We translate the discovery into a simple, ownable position for the firm. This includes the central brand idea, value proposition, audience priorities, practice architecture, personality, and a clear point of view that can guide design and writing.',
    deliverable: 'Positioning foundation and messaging direction for the identity and website.',
    includes: [
      'Brand positioning',
      'Core value proposition',
      'Audience priorities',
      'Practice and service architecture',
      'Brand attributes',
      'Tone direction',
      'Key proof points',
      'Foundational message hierarchy',
    ],
  },
  {
    num: '03',
    title: 'Brand identity and visual system',
    body: 'We create the identity that will introduce the firm to the market. The work will be distinctive without becoming decorative, contemporary without feeling temporary, and authoritative without leaning on category cliches.',
    deliverable: 'A complete visual identity system prepared for immediate launch.',
    includes: [
      'Primary logo or wordmark',
      'Secondary lockup',
      'Monogram or supporting mark, if appropriate',
      'Typography system',
      'Color system',
      'Graphic language and layout direction',
      'Photography and portrait art direction',
      'Foundational brand guide',
      'Business card',
      'Letterhead',
      'Email signature',
      'Social and directory profile assets',
    ],
  },
  {
    num: '04',
    title: 'Narrative, copy, and website architecture',
    body: 'We build the public story and organize it into a clear website experience. The writing will balance credentials with clarity. It should communicate the seriousness of the practice without overloading visitors with professional history or generic legal language.',
    deliverable: 'Core website copy, message framework, and approved site architecture.',
    includes: [
      'Homepage narrative',
      'Firm introduction',
      'Gary Springstead biography',
      'Kathryn Springstead biography',
      'Federal criminal defense framing',
      'Michigan criminal defense framing',
      'Practice-area language',
      'Experience and results framing',
      'Contact and CTA language',
      'Tone and writing guidance',
      'Sitemap and page hierarchy',
      'Search-conscious content structure',
    ],
  },
  {
    num: '05',
    title: 'Website design and development',
    body: 'We design and build a custom responsive website that carries the identity, narrative, and authority of the new practice. The site is built for clarity, speed, mobile use, and future expansion, with a CMS structure that makes practice areas, insights, and selected experience easier to manage.',
    deliverable: 'A complete, responsive, launch-ready website.',
    includes: [
      'Custom desktop design',
      'Custom tablet and mobile design',
      'Development in Framer',
      'Up to eight core pages',
      'Reusable practice-area page system',
      'Reusable insights or news system',
      'Contact and consultation form',
      'CMS configuration',
      'Basic accessibility considerations',
      'Page titles and metadata',
      'Sitemap and indexing setup',
      'Analytics and Search Console setup',
      'Redirect planning for firm domains',
      'Performance and browser QA',
    ],
  },
  {
    num: '06',
    title: 'Launch and handoff',
    body: 'We complete final QA, connect the domain, launch the website, and package the identity and content system for continued use.',
    deliverable: 'A live firm platform and organized final handoff.',
    includes: [
      'Final responsive review',
      'Browser and device testing',
      'Domain connection',
      'Analytics verification',
      'Form testing',
      'Final asset exports',
      'Brand guide delivery',
      'Website ownership transfer',
      'Recorded website walkthrough',
      'Launch support',
    ],
  },
]

const deliverableGroups: DeliverableGroup[] = [
  {
    title: 'Strategy',
    items: [
      'Strategic direction summary',
      'Audience and referral framework',
      'Brand positioning',
      'Value proposition',
      'Practice architecture',
      'Creative direction moodboard',
    ],
  },
  {
    title: 'Identity',
    items: [
      'Primary identity',
      'Secondary lockup',
      'Supporting mark or monogram',
      'Typography system',
      'Color system',
      'Graphic language',
      'Photography direction',
      'Foundational brand guide',
      'Business card',
      'Letterhead',
      'Email signature',
      'Social and directory assets',
    ],
  },
  {
    title: 'Narrative',
    items: [
      'Messaging framework',
      'Homepage copy',
      'Firm introduction copy',
      'Gary biography',
      'Kathryn biography',
      'Federal practice framing',
      'Michigan practice framing',
      'Experience and results framing',
      'CTA and contact language',
    ],
  },
  {
    title: 'Website & launch',
    items: [
      'Website architecture',
      'Desktop designs',
      'Tablet and mobile designs',
      'Up to eight core pages',
      'Practice-area content system',
      'Insights or news content system',
      'Framer development',
      'CMS configuration',
      'Contact form',
      'Foundational on-page SEO',
      'Analytics and Search Console setup',
      'Launch QA',
      'Website walkthrough and handoff',
    ],
  },
]

const timeline: TimelineStep[] = [
  {
    num: '01',
    when: 'Week one',
    title: 'Discovery & direction',
    items: ['Partner discovery', 'Market review', 'Audience framing', 'Positioning', 'Website priorities', 'Creative direction'],
  },
  {
    num: '02',
    when: 'Week two',
    title: 'Strategy & identity',
    items: ['Brand foundation', 'Visual identity development', 'Initial messaging structure'],
  },
  {
    num: '03',
    when: 'Week three',
    title: 'Narrative & design',
    items: ['Core copy', 'Site architecture', 'Homepage design', 'Primary page system'],
  },
  {
    num: '04',
    when: 'Week four',
    title: 'Development',
    items: ['Framer build', 'Remaining pages', 'CMS configuration', 'Tablet & mobile adaptation'],
  },
  {
    num: '05',
    when: 'Week five',
    title: 'Refinement & launch',
    items: ['QA & metadata', 'Analytics setup', 'Domain connection', 'Final approval', 'Handoff'],
  },
]

const investmentLines: InvestmentLine[] = [
  {
    num: '01',
    phase: 'Discovery, audit, and positioning',
    summary: 'Discovery, market review, audience framework, positioning, practice architecture, and creative direction.',
    amount: '$3,500',
  },
  {
    num: '02',
    phase: 'Brand identity and launch system',
    summary: 'Logo, supporting marks, typography, color, visual system, brand guide, and essential firm applications.',
    amount: '$5,500',
  },
  {
    num: '03',
    phase: 'Narrative, copy, and site architecture',
    summary: 'Core messaging, website copy, attorney biographies, practice framing, CTAs, and sitemap.',
    amount: '$3,500',
  },
  {
    num: '04',
    phase: 'Website design, development, and launch',
    summary: 'Custom responsive design, Framer development, CMS systems, foundational SEO, QA, and launch.',
    amount: '$10,500',
  },
]

const investmentSummary = {
  originalCore: '$23,000',
  accommodation: '-$6,500',
  adjustedCore: '$16,500',
}

const paymentMilestones: PaymentMilestone[] = [
  {
    amount: '50%',
    title: 'Due at kickoff',
    body: '$8,250 reserves the project window and begins discovery.',
  },
  {
    amount: '25%',
    title: 'After identity presentation',
    body: '$4,125 is due once the primary brand identity has been presented and approved.',
  },
  {
    amount: '25%',
    title: 'Before launch',
    body: '$4,125 is due before the final website launch and asset handoff.',
  },
]

const futureTracks: FutureTrack[] = [
  {
    label: 'Track 01',
    title: 'Search & authority',
    items: [
      'Ongoing SEO strategy',
      'Additional practice-area pages',
      'Federal jurisdiction landing pages',
      'Case analysis and legal insights',
      'Attorney profile and directory optimization',
    ],
  },
  {
    label: 'Track 02',
    title: 'Brand & business development',
    items: [
      'Media kit',
      'Referral presentation',
      'Speaking and press materials',
      'Case-result library',
      'Recruiting materials',
      'Presentation and document templates',
    ],
  },
  {
    label: 'Track 03',
    title: 'Content & campaigns',
    items: [
      'Thought leadership',
      'Video and photography',
      'Social content system',
      'Email newsletter',
      'High-profile matter communications',
      'Public relations support',
    ],
  },
]

const nextStepItems = [
  'A clear strategic position.',
  'A distinctive visual identity.',
  'A complete messaging framework.',
  'A custom responsive website.',
  'A scalable practice-area and content system.',
  'A polished launch across brand and digital touchpoints.',
]

const brandingWork: WorkLink = {
  title: 'Branding Work',
  href: 'https://pitch.com/v/anchovies-press-zwdsbn',
  category: 'Branding',
  featured: true,
}

const websiteWork: WorkLink[] = [
  {
    title: 'Blanchet',
    href: 'https://swim-lang.github.io/blanchet-site/index.html',
    category: 'Website Design',
    note: 'Password: Dolly',
  },
  { title: 'Koplow Defense', href: 'https://koplow-defense.framer.website/', category: 'Website Design' },
  { title: 'Sid Weber Law', href: 'https://sidweberlaw.com/', category: 'Website Design' },
  { title: 'Todd Burnham', href: 'https://toddburnham.framer.website/', category: 'Website Design' },
  { title: 'Maven Advocacy', href: 'https://mavenadvocacy.com/', category: 'Website Design' },
  { title: 'Lex Politica', href: 'https://lexpolitica.com/', category: 'Website Design' },
  { title: 'Burnham Law', href: 'https://burnhamlaw.com/', category: 'Website Design' },
  { title: 'Belzer Law Firm', href: 'https://belzerlawfirm.com/', category: 'Website Design' },
]

const pressWork: WorkLink[] = [
  {
    title: 'The Brand Identity',
    href: 'https://the-brandidentity.com/project/how-did-anchovies-bring-consumer-brand-thinking-to-a-texas-law-firm',
    category: 'Press',
  },
  {
    title: 'Best Law Firm Websites 2023',
    href: 'https://lawyerist.com/news/best-law-firm-websites-2023-2/',
    category: 'Press',
  },
  {
    title: 'Best Law Firm Websites 2026',
    href: 'https://lawyerist.com/news/best-law-firm-websites-2026/',
    category: 'Press',
  },
  {
    title: '2025 Award: Good vs. Great',
    href: 'https://lawyerist.com/news/good-vs-great-what-best-law-firm-websites-get-right/',
    category: 'Press',
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

function GaryNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Gary & Kathryn Springstead</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="eyebrow text-ink-2">Brand · Identity · Website · v1</span>
          <span className="eyebrow text-ink">June 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
          <a href="#overview" className="flex min-w-0 items-center gap-3">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ink" />
            <span className="truncate text-[13px] font-medium tracking-[-0.01em] text-ink">Anchovies × Springstead</span>
          </a>
          <nav className="hidden items-center gap-7 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="#work" className="hidden rounded-full border border-[var(--color-mac)] px-4 py-2 text-[12px] font-medium text-[var(--color-mac)] transition-colors hover:bg-[var(--color-mac)] hover:text-paper whitespace-nowrap sm:inline-flex">
              View work
            </a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full bg-[var(--color-mac)] px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-[var(--color-mac-hover)] whitespace-nowrap">
              Schedule proposal review
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
          <span className="eyebrow text-ink-2">§ 01 — Overview</span>
          <span className="eyebrow text-ink-2">Strategy · Identity · Narrative · Website</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Springstead · Criminal defense</span>
          <span className="eyebrow text-ink-2">Prepared by Anchovies</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1200px] pb-16 text-[56px] leading-[54px] sm:text-[82px] sm:leading-[76px] md:text-[112px] md:leading-[98px] lg:text-[144px] lg:leading-[124px]">
          A new firm with a reputation already built.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 pb-20 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="display text-[31px] leading-[39px] md:text-[36px] md:leading-[44px]">
            Strategy, identity, messaging, and a custom website for the next chapter of Gary and Kathryn Springstead’s criminal defense practice.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Schedule proposal review ->'}</AnchorButton>
            <AnchorButton href="#work" variant="outline">
              View work
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 — What this work creates" right="Four disciplines" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className={`flex min-h-[288px] flex-col gap-6 border-[var(--color-rule)] p-8 ${index < pillars.length - 1 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
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

function WhatWeHeard() {
  return (
    <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 02 — What we heard" right="Partner discovery · 06.2026" />
      <div className="grid gap-12 pt-12 lg:grid-cols-[520px_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <h2 className="display text-[48px] leading-[52px] md:text-[64px] md:leading-[64px]">
            The firm is new. The credibility is not.
          </h2>
          <p className="text-[15px] leading-[23px] text-ink-2">
            For more than a decade, Gary’s name has been attached to a respected criminal defense practice that grew from a two-attorney firm into a larger team. The next chapter is not about rebuilding that reputation. It is about carrying its strongest equity forward while creating something Gary and Kathryn can shape entirely on their own terms.
          </p>
          <p className="text-[15px] leading-[23px] text-ink-2">A few things stood out from our conversation.</p>
        </Reveal>
        <Reveal className="border-t border-[var(--color-rule)] lg:border-t-0">
          {heardSignals.map((signal) => (
            <div key={signal.num} className="grid gap-5 border-b border-[var(--color-rule)] py-6 md:grid-cols-[36px_1fr] md:gap-6">
              <span className="serif text-[18px] font-medium leading-[24px]">{signal.num}</span>
              <div className="flex flex-col gap-2">
                <h3 className="serif text-[22px] font-medium leading-[28px] tracking-[-0.014em]">{signal.title}</h3>
                <p className="text-[13px] leading-[20px] text-ink-2">{signal.body}</p>
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
      <MetaRow left="§ 03 — The opportunity" right="Catch up to the practice" dark />
      <Reveal>
        <h2 className="display max-w-[1100px] py-16 text-[52px] leading-[56px] md:text-[96px] md:leading-[94px] lg:text-[120px] lg:leading-[120px]">
          Make the public expression catch up to the practice.
        </h2>
      </Reveal>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-paper/70">
            A brand that can turn heads without chasing attention, a website that works as more than a glossy business card, a platform that gives clients, referral counsel, courts, and the media an immediate sense of who is leading the matter and why they are equipped to do it.
          </p>
        </Reveal>
        <Reveal className="max-w-[560px]">
          <span className="eyebrow mb-5 block text-paper/55">What this work can do</span>
          <InlineList items={opportunityBullets} dark />
        </Reveal>
      </div>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 03b — Selected work" right="Branding · websites · press" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.15fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] md:text-[64px] md:leading-[66px]">
            One place to review the shape of the work.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A single grid with one dedicated brand reference, live website examples, and press context.
        </Reveal>
      </div>
      <Reveal className="pt-14">
        <div className="grid gap-10">
          <a
            href={brandingWork.href}
            target="_blank"
            rel="noreferrer"
            className="group grid min-h-[260px] gap-10 border border-[var(--color-rule)] bg-ink p-8 text-paper transition-colors hover:bg-ink-2 lg:grid-cols-[1fr_280px]"
          >
            <div className="flex h-full flex-col justify-between gap-16">
              <div className="flex items-start justify-between gap-6">
                <span className="eyebrow text-paper/55">Featured</span>
                <span className="eyebrow text-paper/55">{brandingWork.category}</span>
              </div>
              <div>
                <h3 className="serif text-[48px] font-medium leading-[50px] tracking-[-0.026em] md:text-[72px] md:leading-[72px]">
                  {brandingWork.title}
                </h3>
              </div>
            </div>
            <div className="flex items-end justify-between gap-6 border-t border-paper/20 pt-6 lg:flex-col lg:items-end lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 lg:text-right">
              <span className="text-[13px] leading-[20px] text-paper/70">Identity systems, visual language, and brand worlds.</span>
              <span className="inline-flex rounded-full bg-[var(--color-mac)] px-3.5 py-2 text-[12px] font-medium leading-[16px] text-paper transition-colors group-hover:bg-[var(--color-mac-hover)]">Open -&gt;</span>
            </div>
          </a>

          <div>
            <div className="flex items-end justify-between border-b border-[var(--color-rule)] pb-4">
              <span className="eyebrow text-ink-2">Website Design</span>
              <span className="eyebrow text-ink-2">{websiteWork.length} examples</span>
            </div>
            <div className="grid border-l border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
              {websiteWork.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[210px] flex-col justify-between border-r border-b border-[var(--color-rule)] p-7 transition-colors hover:bg-ink hover:text-paper"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="eyebrow text-ink-2 group-hover:text-paper/55">W / {String(index + 1).padStart(2, '0')}</span>
                    <span className="eyebrow text-right text-ink-2 group-hover:text-paper/55">{item.category}</span>
                  </div>
                  <div>
                    <h3 className="serif text-[34px] font-medium leading-[38px] tracking-[-0.018em]">{item.title}</h3>
                    {item.note && <p className="mt-3 text-[12px] leading-[18px] text-ink-2 group-hover:text-paper/70">{item.note}</p>}
                    <div className="mt-5 inline-flex w-fit rounded-full bg-[var(--color-mac)] px-3.5 py-2 text-[12px] font-medium leading-[16px] text-paper transition-colors group-hover:bg-[var(--color-mac-hover)]">Open -&gt;</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between border-b border-[var(--color-rule)] pb-4">
              <span className="eyebrow text-ink-2">Press</span>
              <span className="eyebrow text-ink-2">{pressWork.length} references</span>
            </div>
            <div className="grid border-l border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
              {pressWork.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-h-[190px] flex-col justify-between border-r border-b border-[var(--color-rule)] p-7 transition-colors hover:bg-ink hover:text-paper"
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="eyebrow text-ink-2 group-hover:text-paper/55">P / {String(index + 1).padStart(2, '0')}</span>
                    <span className="eyebrow text-right text-ink-2 group-hover:text-paper/55">{item.category}</span>
                  </div>
                  <div>
                    <h3 className="serif text-[30px] font-medium leading-[34px] tracking-[-0.016em]">{item.title}</h3>
                    <div className="mt-5 inline-flex w-fit rounded-full bg-[var(--color-mac)] px-3.5 py-2 text-[12px] font-medium leading-[16px] text-paper transition-colors group-hover:bg-[var(--color-mac-hover)]">Open -&gt;</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Creation() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 04 — What this work creates" right="Four pillars, in depth" />
      <Reveal>
        <h2 className="display max-w-[900px] py-12 text-[48px] leading-[52px] md:text-[64px] md:leading-[64px]">
          Built for the reputation already there. Designed for what comes next.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {creationPillars.map((pillar) => (
          <Reveal key={pillar.num} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[480px_1fr] lg:gap-20">
            <div className="flex flex-col gap-4">
              <span className="serif text-[72px] font-medium leading-[72px] tracking-[-0.03em]">{pillar.num}</span>
              <h3 className="serif max-w-[420px] text-[36px] font-medium leading-[42px] tracking-[-0.02em]">{pillar.title}</h3>
            </div>
            <p className="max-w-[620px] text-[16px] leading-[26px] text-ink-2">{pillar.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 05 — Our approach" right="Six phases · 4–5 weeks" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[42px] leading-[48px] md:text-[48px] md:leading-[52px]">
            From an established reputation to an independent platform.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          Six focused phases over approximately four to five weeks. Discovery defines the position. Strategy informs identity and narrative. Both move directly into website design, development, and launch.
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
              <div className="border-t border-[var(--color-rule)]/15 pt-4">
                <span className="eyebrow block text-ink-2">Deliverable</span>
                <p className="mt-2 text-[13px] leading-[21px]">{phase.deliverable}</p>
              </div>
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

function Deliverables() {
  let count = 0
  return (
    <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 06 — Final deliverables" right="Forty artifacts" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[42px] leading-[48px] md:text-[48px] md:leading-[52px]">
            Everything the new firm walks away with.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          A complete strategy, identity, narrative, and website system — packaged, documented, and ready to put to work.
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

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 07 — Timeline" right="Four to five weeks" />
      <Reveal>
        <h2 className="display max-w-[1100px] py-12 text-[52px] leading-[56px] md:text-[92px] md:leading-[92px]">
          From discovery to launch in four to five weeks.
        </h2>
      </Reveal>
      <Reveal>
        <p className="max-w-[720px] pb-12 text-[14px] leading-[22px] text-ink-2">
          A launch within approximately 30 days is achievable with timely access to content, clear decision-making, and consolidated feedback. The fifth week functions as a launch and refinement window.
        </p>
      </Reveal>
      <Reveal className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
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
      <MetaRow left="§ 08 — Investment" right="Core engagement" dark />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_520px] lg:items-end lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[560px] text-[56px] leading-[60px] md:text-[92px] md:leading-[92px]">
            The core engagement.
          </h2>
        </Reveal>
        <Reveal className="border border-paper/20 p-6 md:p-8">
          <div className="eyebrow text-paper/55">Budget-adjusted total</div>
          <div className="display mt-5 text-[72px] leading-[76px] md:text-[120px] md:leading-[116px]">{investmentSummary.adjustedCore}</div>
          <div className="mt-7 grid gap-3 border-t border-paper/20 pt-5 text-[13px] leading-[18px] tracking-[0.04em] text-paper/65">
            <div className="flex items-center justify-between gap-6">
              <span>Original core engagement</span>
              <span className="text-paper">{investmentSummary.originalCore}</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span>Budget accommodation</span>
              <span className="text-paper">{investmentSummary.accommodation}</span>
            </div>
            <div className="flex items-center justify-between gap-6">
              <span>Timeline</span>
              <span className="text-paper">4-5 weeks</span>
            </div>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-6">
        <div className="hidden grid-cols-[80px_340px_1fr_180px] border-b border-[var(--color-rule)] py-4 md:grid">
          <span className="eyebrow text-paper/55">Line</span>
          <span className="eyebrow text-paper/55">Phase</span>
          <span className="eyebrow text-paper/55">Scope summary</span>
          <span className="eyebrow text-right text-paper/55">Original amount</span>
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
          <h3 className="serif pr-8 text-[28px] font-medium leading-[32px] tracking-[-0.014em]">Total - Core engagement</h3>
          <div className="text-[13px] leading-[20px] text-paper/70">
            <div>Original core engagement: {investmentSummary.originalCore}</div>
            <div>Budget accommodation: {investmentSummary.accommodation}</div>
          </div>
          <span className="display text-[48px] leading-[48px] md:text-right">{investmentSummary.adjustedCore}</span>
        </div>
      </Reveal>
      <Reveal className="pt-14">
        <MetaRow left="Payment structure" right="Three milestones" dark />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {paymentMilestones.map((milestone) => (
            <div key={milestone.title} className="border border-[var(--color-rule)] p-8">
              <div className="display text-[64px] leading-[64px]">{milestone.amount}</div>
              <h3 className="serif mt-3 text-[22px] font-medium leading-[28px] tracking-[-0.014em]">{milestone.title}</h3>
              <p className="mt-3 text-[13px] leading-[20px] text-paper/70">{milestone.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function FutureOpportunities() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_400px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[42px] leading-[48px] md:text-[48px] md:leading-[52px]">
            A foundation the firm can keep building from.
          </h2>
        </Reveal>
        <Reveal className="max-w-[400px] text-[15px] leading-[23px] text-ink-2">
          Once the firm is launched, the system can expand into deeper search, business development, and content work — added and scoped as the practice grows, never all at once.
        </Reveal>
      </div>
      <Reveal className="grid gap-6 lg:grid-cols-3">
        {futureTracks.map((track) => (
          <div key={track.label} className="border border-[var(--color-rule)] p-8">
            <span className="eyebrow text-ink-2">{track.label}</span>
            <h3 className="serif mt-6 text-[32px] font-medium leading-[36px] tracking-[-0.018em]">{track.title}</h3>
            <div className="mt-6">
              <InlineList items={track.items} />
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 10 — Next step" right="Begin with a kickoff" />
      <Reveal className="border border-[var(--color-rule)] bg-paper p-8 md:p-12 lg:p-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-20">
          <h2 className="display max-w-[760px] text-[54px] leading-[58px] md:text-[88px] md:leading-[84px]">
            Build the next chapter.
          </h2>
          <div className="lg:text-right">
            <div className="eyebrow mb-2 text-ink-2">Budget-adjusted total</div>
            <div className="display text-[56px] leading-[58px] md:text-[72px] md:leading-[72px]">{investmentSummary.adjustedCore}</div>
            <div className="eyebrow mt-2 text-ink-2">Original {investmentSummary.originalCore} · 4-5 weeks</div>
          </div>
        </div>
        <div className="grid gap-10 pt-14 lg:grid-cols-[1fr_480px] lg:gap-20">
          <p className="max-w-[560px] text-[15px] leading-[23px] text-ink-2">
            This is an opportunity to introduce a new firm without looking new. The work begins with a focused discovery session, then moves quickly through positioning, identity, messaging, website design, development, and launch — a complete public platform that carries the reputation Gary and Kathryn have already earned. From kickoff, the firm receives:
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
          <AnchorButton>{'Schedule proposal review ->'}</AnchorButton>
        </div>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <Reveal>
        <h2 className="display max-w-[1100px] py-16 text-[52px] leading-[56px] md:text-[92px] md:leading-[92px]">
          A new chapter, already proven.
        </h2>
      </Reveal>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            The goal is not to manufacture authority. It is to give the authority already there a clearer form — a firm that feels independent from day one.
          </p>
        </Reveal>
        <Reveal>
          <p className="max-w-[560px] text-[17px] leading-[28px] text-ink-2">
            Established without being conventional. Personal without appearing small. Distinct enough to lead, and disciplined enough to let the work remain the strongest proof.
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
        <span className="text-[12px] leading-[16px] tracking-[0.02em]">Prepared for Gary & Kathryn Springstead</span>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <span className="eyebrow text-ink-2">June 2026</span>
        <span className="eyebrow text-ink-2">Brand & Website · v1</span>
      </div>
    </footer>
  )
}

export function GarySpringsteadProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Springstead - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A strategy, identity, narrative, and website proposal for Springstead from Anchovies.')
    }
  }, [])

  return (
    <main className="gary-springstead-proposal bg-paper text-ink">
      <GaryNav />
      <Hero />
      <WhatWeHeard />
      <Opportunity />
      <SelectedWork />
      <Creation />
      <Approach />
      <Deliverables />
      <Timeline />
      <Investment />
      <FutureOpportunities />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
