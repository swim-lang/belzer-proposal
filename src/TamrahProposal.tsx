import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workSectionHref = '#work'

type LabelPair = [string, string]
type DetailRow = [string, string, string]
type PhaseRow = {
  num: string
  title: string
  body: string
  outcome: string
  includes: string[]
}
type TimelineRow = [string, string, string[]]
type WorkLink = {
  name: string
  href: string
  category: string
}

const navSections: Array<{ id: string; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'Heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'phase', label: 'Phase' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next' },
]

const pillars: LabelPair[] = [
  ['Sales flow', 'An ecommerce experience that feels effortless: the kind of simple that takes design to build.'],
  ['Visual system', 'Layout, type, color, motion, and photography rules that translate the burgundy packaging into the browser.'],
  ['Photography', 'Art direction and a shot list shaped around the site, so the shoot gives every layout what it needs.'],
  ['Launch', 'Site shipped on Square Up with design QA, launch review, and post-launch polish included.'],
]

const heardSignals: DetailRow[] = [
  ['Founder', "The founder's hand is the product", 'Washing, pitting, filling, packaging, and presenting the dates has been hands-on from day one. That care should be felt online.'],
  ['Packaging', 'The burgundy packaging is already half the brand', 'The new packaging, illustration, and foiling carry a quieter luxury feel. The website should extend that world with restraint.'],
  ['Color', 'Burgundy carries memory and meaning', 'The color ties back to Qatar and to home. We can treat it as an heirloom and use it with intention.'],
  ['Market', 'Las Vegas has proven the appetite', 'Wellness studios, gifting, cafes, and hotel conversations show that Tamrah has a real opening beyond a local passion project.'],
  ['Expansion', 'Miami gives the brand a next chapter', 'A stronger digital home can help the business show up with more confidence as the audience widens.'],
  ['Commerce', 'Square Up is the practical launch path', 'The site should be beautiful and operational: easy to browse, easy to buy, easy to keep moving after launch.'],
  ['Photography', 'The product needs to be seen with care', 'Texture, filling, packaging, hands, gifting, and table moments all become part of the story when directed clearly.'],
  ['Feeling', 'Luxury can feel warm, generous, and human', 'Tamrah can hold cultural depth and premium presence while still feeling welcoming and giftable.'],
]

const goals: DetailRow[] = [
  ['G/01', 'A refined site story', 'A sharper homepage narrative that explains what Tamrah is, where it comes from, why it feels different, and how to buy.'],
  ['G/02', 'A full ecommerce design system', 'A cohesive visual system across homepage, product, collection, story, gifting, and checkout-adjacent surfaces.'],
  ['G/03', 'A photography plan for the website', 'Art direction, shot priorities, and image guidance for packaging, product, hands, gifting, wellness, and hospitality use cases.'],
  ['G/04', 'A Square Up launch path', 'Square Up implementation support, styling guidance, QA, and launch coordination so the site can move from design into sales.'],
  ['G/05', 'Motion and polish', 'Subtle interaction direction that makes the digital experience feel premium, calm, and intentional.'],
]

const selectedWork: WorkLink[] = [
  { name: 'Soft', href: 'https://softinside.shop/', category: 'CPG website' },
  { name: "Ta'im", href: 'https://reminiscent-chess.flywheelsites.com/', category: 'Food website' },
  { name: 'Italic', href: 'https://italic.catering', category: 'Catering website' },
  { name: 'Heartwood', href: 'https://swim-lang.github.io/heartwood/', category: 'Health and wellness' },
  { name: 'Wild Hare Floral', href: 'https://wildharefloral.co/', category: 'Brand website' },
  { name: 'Runway Botox', href: 'https://runwaybotox.framer.website/', category: 'Healthcare website' },
  { name: '206 Architects', href: 'https://206architects.com/', category: 'Architecture website' },
]

const phases: PhaseRow[] = [
  {
    num: '01',
    title: 'Discovery, site strategy, and structure',
    body: 'We begin with a focused working session around the product, audiences, Square Up setup, packaging direction, Miami expansion, and the sales path the site needs to support.',
    outcome: 'A clear website structure, launch priorities, and creative direction',
    includes: ['Founder discovery', 'Current site and brand review', 'Packaging direction review', 'Audience and use-case discussion', 'Square Up context', 'Homepage story direction', 'Sitemap and page plan', 'Launch priorities'],
  },
  {
    num: '02',
    title: 'Visual direction and homepage system',
    body: 'We translate the burgundy packaging, cultural roots, and premium gifting position into a digital visual language: type, spacing, image rhythm, color balance, and interface tone.',
    outcome: 'A homepage direction and design language for the full site',
    includes: ['Creative direction moodboard', 'Homepage concept', 'Typography and color guidance', 'Layout system', 'Product and packaging emphasis', 'CTA language', 'Motion direction', 'Responsive direction'],
  },
  {
    num: '03',
    title: 'Core page design and ecommerce flow',
    body: 'We design the pages that move someone from first impression to purchase while giving the brand enough room for story, ritual, gifting, and hospitality.',
    outcome: 'A complete website design system for launch',
    includes: ['Homepage design', 'Shop / collection page', 'Product detail page', 'About / story page', 'Gifting or hospitality section', 'Cart and checkout-adjacent styling direction', 'Mobile layouts', 'Modular content blocks'],
  },
  {
    num: '04',
    title: 'Photography direction and shot list',
    body: 'Photography is planned around the actual website, so the shoot supports the layouts and gives the brand the right mix of product clarity, texture, warmth, and premium presence.',
    outcome: 'A shoot plan that gives the website the imagery it needs',
    includes: ['Photography art direction', 'Shot list', 'Packaging and wrap priorities', 'Founder-hand moments', 'Gift and hospitality moments', 'Texture and filling detail shots', 'Image usage guidance', 'Production notes'],
  },
  {
    num: '05',
    title: 'Square Up implementation and launch QA',
    body: 'We support the Square Up build so the finished site keeps the design intact and is ready to take orders with confidence.',
    outcome: 'A Square Up-launched site with design QA and launch polish',
    includes: ['Square Up styling support', 'Responsive build review', 'Product page setup guidance', 'Content placement support', 'Basic SEO structure', 'Browser and mobile QA', 'Launch review', 'Post-launch polish window'],
  },
]

const deliverables: DetailRow[] = [
  ['Website strategy summary', 'A concise direction for audience, story, ecommerce priorities, and launch scope.', 'Strategy'],
  ['Sitemap and page plan', 'Homepage, shop, product, story, gifting or hospitality, and supporting sections.', 'UX'],
  ['Creative direction moodboard', 'Visual references for luxury, food, wellness, gifting, and cultural warmth.', 'Direction'],
  ['Homepage design', 'The primary brand and sales surface for the next chapter of Tamrah.', 'Design'],
  ['Shop and product page designs', 'A clear ecommerce path built around product desire and simple purchase behavior.', 'Design'],
  ['Story and gifting sections', 'The surfaces that carry founder story, cultural roots, hospitality, and giftability.', 'Design'],
  ['Responsive design system', 'Desktop and mobile layouts with reusable section rules and interface patterns.', 'System'],
  ['Photography art direction', 'Image direction for packaging, dates, texture, hands, gifting, table, and hospitality moments.', 'Photography'],
  ['Website shot list', 'A practical shoot map organized around the actual pages and content needs.', 'Photography'],
  ['Motion and interaction guidance', 'Subtle movement direction for hero, product reveals, transitions, and moments of polish.', 'Motion'],
  ['Square Up styling and launch support', 'Implementation guidance, launch QA, and polish so the live store matches the design intent.', 'Launch'],
  ['Final design handoff', 'Organized files, assets, notes, and implementation guidance for future site evolution.', 'Handoff'],
]

const timeline: TimelineRow[] = [
  ['Week 01', 'Discovery and direction', ['Kickoff session', 'Review current site and packaging', 'Square Up context', 'Audience and use-case discussion', 'Sitemap and page plan', 'Creative direction']],
  ['Week 02', 'Homepage and visual system', ['Homepage concept', 'Type and color direction', 'Photography direction', 'Ecommerce hierarchy', 'Mobile direction', 'First presentation']],
  ['Week 03', 'Core pages and launch system', ['Shop page', 'Product page', 'Story page', 'Gifting or hospitality section', 'Motion guidance', 'Square Up styling plan']],
  ['Week 04', 'Implementation, QA, and polish', ['Square Up launch support', 'Responsive QA', 'Copy and content placement', 'SEO basics', 'Final design handoff', 'Post-launch polish window']],
]

const investmentLines: DetailRow[] = [
  ['Strategy and site architecture', '$1,500', 'Discovery, current site review, Square Up context, sitemap, page structure, ecommerce priorities, and launch direction.'],
  ['Visual system and core page design', '$3,500', 'Homepage, shop, product, story, responsive system, visual direction, interface rhythm, and motion guidance.'],
  ['Square Up launch support', '$2,750', 'Square Up styling support, content placement guidance, responsive review, product page setup guidance, and launch coordination.'],
  ['QA, polish, and handoff', '$1,750', 'Browser and mobile QA, post-launch polish window, organized final files, implementation notes, and design handoff.'],
]

const paymentStructure: DetailRow[] = [
  ['50%', 'Due at kickoff', 'Sprint begins on receipt.'],
  ['25%', 'Due after homepage presentation', 'After the first site direction is presented.'],
  ['25%', 'Due before final handoff', 'Before the final files and launch support are completed.'],
]

const futureOpportunities: string[] = [
  'Product photography production',
  'Miami launch materials',
  'Hospitality sales materials',
  'Wholesale deck',
  'Seasonal collection pages',
  'Gift guide pages',
  'Email design system',
  'Packaging extensions',
  'Launch campaign direction',
  'Social campaign templates',
  'Ongoing website design support',
  'A/B testing and site evolution',
]

const nextSteps: DetailRow[] = [
  ['01', 'Confirm scope and timing', 'Align on the four-week window, Square Up access, photography timing, and any additions before kickoff.'],
  ['02', 'Send kickoff invoice', 'The first 50% invoice reserves the sprint and starts week one.'],
  ['03', 'Share current materials', 'Brand files, packaging direction, product details, Square Up context, and any existing imagery or copy.'],
  ['04', 'Schedule the kickoff session', 'We begin with the working session that shapes the site structure and creative direction.'],
]

function fourCardBorderClass(index: number, total: number) {
  return [
    index < total - 1 ? 'border-b' : '',
    index % 2 === 0 ? 'md:border-r' : 'md:border-r-0',
    index < 2 ? 'md:border-b' : 'md:border-b-0',
    index < total - 1 ? 'xl:border-r' : 'xl:border-r-0',
    'xl:border-b-0',
  ].join(' ')
}

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow sm:text-right ${dark ? 'text-paper/60' : 'text-ink-2'}`}>{right}</span>
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

function InlineList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-baseline gap-3">
          <span className={`h-px w-[10px] shrink-0 ${dark ? 'bg-paper/50' : 'bg-ink'}`} />
          <span className={`text-[13px] leading-[20px] ${dark ? 'text-paper/70' : 'text-ink'}`}>{item}</span>
        </div>
      ))}
    </div>
  )
}

function TamrahNav() {
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
          <span className="eyebrow text-ink-2">Proposal No. 014 · Prepared for Yara</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Las Vegas -&gt; Miami</span>
          <span className="eyebrow">Valid through 06.25.2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] tracking-[-0.01em] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              Tamrah
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
            <a href={workSectionHref} className="hidden rounded-full px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap sm:inline-flex">
              Our work
            </a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper transition-colors hover:bg-ink-2 whitespace-nowrap">
              Schedule kickoff
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
          <span className="eyebrow text-ink-2">Website design · Art direction · Photography plan · Motion</span>
          <span className="eyebrow text-ink">Tamrah · Luxury Medjool dates</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Prepared for Yara</span>
          <span className="eyebrow text-ink-2">Prepared by Anchovies</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1120px] pb-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[118px] lg:leading-[104px]">
          A digital home for the date, reimagined.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[660px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            A luxury website launch for the next chapter of Tamrah.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            When people think of luxury macarons, they think of Laduree. When people think of luxury dates, Tamrah should be the name that comes to mind. This phase begins the digital side of that story: beautiful, clear, intentional, and ready to ship from Las Vegas to Miami.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Schedule a kickoff session ->'}</AnchorButton>
            <AnchorButton href={workSectionHref} variant="outline">
              See our work
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="pt-12">
        <MetaRow left="Fig. 01 - What this phase creates" right="Four pillars" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(([title, body], index) => (
            <div key={title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(index, pillars.length)}`}>
              <span className="eyebrow text-ink-2">Pillar {String(index + 1).padStart(2, '0')}</span>
              <h3 className="serif text-[40px] leading-[44px] tracking-[-0.018em]">{title}</h3>
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
    <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 02 - What we heard" right="From discovery" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[76px] md:leading-[78px]">
            A brand built from hand, hospitality, and home.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[440px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>Tamrah began from something personal: roots in Qatar, the cultural importance of dates, and the daily ritual of hospitality.</p>
          <p>The website is the asset that can carry the next shift the furthest and the fastest: from passion project into a broader luxury food and gifting business.</p>
        </Reveal>
      </div>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 02 - What stood out" right="Eight notes" />
        <div className="mt-8">
          {heardSignals.map(([tag, title, body], index) => (
            <div key={title} className="grid gap-5 border-b border-[var(--color-rule)]/20 py-7 md:grid-cols-[74px_1.2fr_1fr_110px] md:gap-8">
              <span className="eyebrow pt-2 text-ink-2">N / {String(index + 1).padStart(2, '0')}</span>
              <h3 className="serif text-[24px] leading-[31px] tracking-[-0.012em]">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
              <span className="eyebrow pt-2 text-ink-2 md:text-right">{tag}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Opportunity() {
  return (
    <section id="opportunity" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 03 - The opportunity" right="One job, six specifics" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            The website is the packaging before the packaging arrives.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>Tamrah sits at the intersection of culture, wellness, luxury food, and gifting. The website can make that intersection feel obvious in seconds.</p>
          <p>It should make the product feel desirable, explain the craft behind it, support everyday orders and elevated gifting, and give Miami a digital surface worthy of the next chapter.</p>
          <p className="text-ink">The goal is a site that sells with restraint, warmth, and confidence.</p>
        </Reveal>
      </div>
    </section>
  )
}

function PhaseCreates() {
  return (
    <section id="phase" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 - What this phase creates" right="Five goals" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Designed for shopping, storytelling, and the next room Tamrah enters.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          This phase creates a complete launch system for the site: the story, the sales path, the image plan, the Square Up implementation direction, and the polish that makes it feel considered.
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {goals.map(([num, title, body]) => (
          <Reveal key={num} className="grid gap-8 border-b border-[var(--color-rule)]/20 py-10 lg:grid-cols-[160px_1.3fr_360px] lg:gap-14">
            <div>
              <span className="serif block text-[54px] leading-[54px] tracking-[-0.02em]">{num}</span>
              <span className="eyebrow mt-4 block text-ink-2">Goal</span>
            </div>
            <div className="max-w-[640px]">
              <h3 className="serif pb-4 text-[34px] leading-[40px] tracking-[-0.016em]">{title}</h3>
              <p className="text-[15px] leading-[24px] text-ink-2">{body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 05 - Selected work" right="Live sites" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.1fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Brand and website work.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>A focused collection across ecommerce, food, hospitality, health, wellness, retail, and brand systems.</p>
          <p className="text-ink">These projects show places where Anchovies led both the brand work and the website experience.</p>
        </Reveal>
      </div>
      <Reveal className="pt-20">
        <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2">
          {selectedWork.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group min-h-[190px] border-b border-[var(--color-rule)]/20 p-8 transition-colors hover:bg-ink hover:text-paper md:border-r md:[&:nth-child(2n)]:border-r-0"
            >
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="flex items-start justify-between gap-6">
                  <span className="eyebrow text-ink-2 transition-colors group-hover:text-paper/55">W / {String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow text-ink-2 transition-colors group-hover:text-paper/55">{item.category}</span>
                </div>
                <div>
                  <h3 className="serif text-[34px] leading-[38px] tracking-[-0.016em]">{item.name}</h3>
                  <div className="mt-4 flex items-center justify-between gap-5 text-[13px] leading-[20px] text-ink-2 transition-colors group-hover:text-paper/70">
                    <span>Brand + website</span>
                    <span>Open site -&gt;</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function DarkInterlude() {
  return (
    <section className="border-b border-paper/20 bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 06 - The feeling" right="Burgundy, craft, hospitality" dark />
      <div className="mt-12 grid gap-12 border-t border-paper/20 pt-16 lg:grid-cols-[1.5fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[920px] text-[52px] italic leading-[58px] tracking-[-0.024em] md:text-[88px] md:leading-[92px]">
            "As considered as the packaging."
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[400px] flex-col gap-6 pt-5 text-[15px] leading-[24px] text-paper/70">
          <p>The site should feel like the moment before opening the packaging: calm, warm, generous, and beautifully handled.</p>
          <p>Every choice should support the same promise: a luxury date experience with cultural depth, founder care, and modern ecommerce clarity.</p>
        </Reveal>
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 07 - Our approach" right="Five phases, four weeks" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            From discovery to a Square Up store ready to sell.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          The sprint runs in a tight sequence: strategy, visual system, page design, photography direction, implementation support, and launch polish.
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)]/20 py-12 lg:grid-cols-[120px_1.2fr_360px] lg:gap-14">
            <div>
              <span className="serif block text-[58px] leading-[58px] tracking-[-0.02em]">{phase.num}</span>
              <span className="eyebrow mt-4 block text-ink-2">Phase</span>
            </div>
            <div className="max-w-[640px]">
              <h3 className="serif pb-5 text-[34px] leading-[40px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="pb-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
              <span className="inline-flex rounded-full bg-ink/5 px-4 py-2 text-[12px] font-medium leading-[16px]">Goal - {phase.outcome}</span>
            </div>
            <div className="pt-2">
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
  return (
    <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 08 - Final deliverables" right="Twelve artifacts" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Everything Tamrah ships with at the end of week four.
          </h2>
        </Reveal>
        <Reveal className="max-w-[430px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A complete website system organized for launch: strategy, page designs, photography direction, Square Up implementation guidance, QA, and handoff.
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)]">
        {deliverables.map(([title, body, category], index) => (
          <div key={title} className="grid gap-5 border-b border-[var(--color-rule)]/20 py-6 md:grid-cols-[74px_1fr_1fr_120px] md:gap-8">
            <span className="eyebrow pt-2 text-ink-2">D / {String(index + 1).padStart(2, '0')}</span>
            <h3 className="serif text-[24px] leading-[31px] tracking-[-0.012em]">{title}</h3>
            <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
            <span className="eyebrow pt-2 text-ink-2 md:text-right">{category}</span>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 09 - Timeline" right="Four weeks · kickoff to live store" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            From discovery to a live store in four weeks.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          Timeline assumes timely feedback and access to current website, brand, packaging, photography, and Square Up context.
        </Reveal>
      </div>
      <Reveal className="grid md:grid-cols-2 xl:grid-cols-4">
        {timeline.map(([when, title, items], index) => (
          <div key={when} className={`flex min-h-[360px] flex-col gap-6 border-[var(--color-rule)]/25 p-8 ${fourCardBorderClass(index, timeline.length)}`}>
            <span className="eyebrow text-ink-2">{when}</span>
            <h3 className="serif text-[34px] leading-[38px] tracking-[-0.016em]">{title}</h3>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
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
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 10 - Investment" right="Website design sprint + Square Up launch" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.4fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display text-[78px] leading-[82px] tracking-[-0.035em] sm:text-[120px] sm:leading-[116px] md:text-[150px] md:leading-[140px]">
            $9,500
          </h2>
          <span className="eyebrow mt-6 block text-ink-2">Total · Four weeks · Website sprint</span>
        </Reveal>
        <Reveal className="flex max-w-[470px] flex-col gap-5 pt-4 text-[15px] leading-[24px]">
          <p>This covers website strategy, visual direction, core page design, photography direction, Square Up launch support, QA, polish, and organized final handoff.</p>
          <p className="text-ink-2">Photography direction and design file organization are included inside the sprint so the work stays simple, connected, and ready for launch.</p>
        </Reveal>
      </div>
      <Reveal className="grid md:grid-cols-2 xl:grid-cols-4">
        {investmentLines.map(([title, price, body], index) => (
          <div key={title} className={`flex min-h-[260px] flex-col gap-4 border-[var(--color-rule)]/20 p-8 ${fourCardBorderClass(index, investmentLines.length)}`}>
            <span className="eyebrow text-ink-2">{title}</span>
            <span className="serif text-[32px] leading-[36px]">{price}</span>
            <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 03 - Payment structure" right="50 · 25 · 25" />
        <div className="mt-8 grid md:grid-cols-3">
          {paymentStructure.map(([amount, title, body], index) => (
            <div key={title} className={`flex flex-col gap-4 border-[var(--color-rule)]/25 p-8 ${index < 2 ? 'border-b md:border-b-0 md:border-r' : ''}`}>
              <span className="serif text-[64px] leading-[64px] tracking-[-0.03em]">{amount}</span>
              <span className="text-[14px] font-medium leading-[20px]">{title}</span>
              <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
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
      <MetaRow left="§ 11 - Future opportunities" right="After the sprint" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[44px] leading-[48px] tracking-[-0.024em] md:text-[60px] md:leading-[64px]">
            Where Tamrah's design system can travel next.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          The site ships in week four. After that, the same system can extend into Miami launch materials, hospitality decks, packaging extensions, seasonal moments, and ongoing site work.
        </Reveal>
      </div>
      <Reveal className="grid md:grid-cols-2 xl:grid-cols-4">
        {futureOpportunities.map((item, index) => (
          <div key={item} className="min-h-[150px] border-b border-[var(--color-rule)]/20 p-8 md:border-r xl:[&:nth-child(4n)]:border-r-0">
            <span className="eyebrow text-ink-2">F / {String(index + 1).padStart(2, '0')}</span>
            <h3 className="serif mt-4 text-[24px] leading-[30px] tracking-[-0.012em]">{item}</h3>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 12 - Next step" right="Reserve the four-week window" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[44px] leading-[48px] tracking-[-0.024em] md:text-[60px] md:leading-[64px]">
            Reserve a kickoff window and ship a live store in four weeks.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          If this direction feels aligned, we begin with a kickoff session, gather the current brand files, review the new packaging direction, and map the website structure.
        </Reveal>
      </div>
      <Reveal>
        {nextSteps.map(([num, title, body]) => (
          <div key={num} className="grid gap-8 border-b border-[var(--color-rule)]/20 py-10 lg:grid-cols-[120px_1.2fr_320px] lg:gap-14">
            <span className="serif text-[56px] leading-[56px] tracking-[-0.02em]">{num}</span>
            <div className="max-w-[650px]">
              <h3 className="serif pb-4 text-[34px] leading-[40px] tracking-[-0.016em]">{title}</h3>
              <p className="text-[15px] leading-[24px] text-ink-2">{body}</p>
            </div>
            <span className="eyebrow pt-3 text-ink-2">Next</span>
          </div>
        ))}
      </Reveal>
      <Reveal className="flex flex-wrap gap-4 pt-10">
        <AnchorButton>{'Schedule a kickoff session ->'}</AnchorButton>
        <AnchorButton href={workSectionHref} variant="outline">
          See our work
        </AnchorButton>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[170px]">
      <MetaRow left="§ 13 - In closing" right="For Tamrah · For Yara" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] border-t border-paper/20 py-16 text-[52px] leading-[56px] tracking-[-0.024em] md:text-[94px] md:leading-[92px] lg:text-[116px] lg:leading-[110px]">
          As considered as the packaging.
        </h2>
      </Reveal>
      <div className="grid gap-10 pt-4 lg:grid-cols-[520px_380px] lg:gap-20">
        <Reveal>
          <p className="text-[15px] leading-[24px] text-paper/70">
            When someone receives a Tamrah package, the brand does its job in a few seconds. The website should do the same: restrained, warm, deliberate, and ready to earn trust before it asks for a sale.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-4">
          <span className="eyebrow text-paper/60">Begin</span>
          <div>
            <AnchorButton variant="light">{'Schedule kickoff ->'}</AnchorButton>
          </div>
          <p className="text-[13px] leading-[20px] text-paper/60">$9,500 · Four weeks · Website design sprint</p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 bg-paper px-6 py-8 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
        <span className="eyebrow text-ink">Anchovies</span>
        <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="eyebrow">Prepared for Yara · Tamrah</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">05.25.2026</span>
        <span className="eyebrow text-ink">Proposal No. 014 · v1</span>
      </div>
    </footer>
  )
}

export function TamrahProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Tamrah - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A website design, art direction, photography plan, and Square Up launch proposal for Tamrah from Anchovies.')
    }
  }, [])

  return (
    <main className="tamrah-proposal bg-paper text-ink">
      <TamrahNav />
      <Hero />
      <WhatWeHeard />
      <Opportunity />
      <PhaseCreates />
      <SelectedWork />
      <DarkInterlude />
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
