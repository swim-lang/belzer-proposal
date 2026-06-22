import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const contractHref = '/proposal/off-menu/contract'

type DetailRow = [string, string, string]
type PriceRow = [string, string, string, string]
type Phase = {
  num: string
  title: string
  body: string
  outcome: string
  includes: string[]
}

const navSections = [
  { id: 'heard', label: 'What We Heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'goals', label: 'Goals' },
  { id: 'approach', label: 'Approach' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Launch' },
]

const heroCards: DetailRow[] = [
  ['01', 'Storefront', 'A Shopify site built to sell - product education, credibility, conversion, and clean mobile purchase paths.'],
  ['02', 'Story', 'Site copy and structure shaped around what a customer needs to understand before buying.'],
  ['03', 'Ads', 'A starter kit of Meta concepts and static variations built for early angle testing.'],
  ['04', 'Refresh', 'A light, polished refresh of the personal / TED site to support founder credibility.'],
]

const heardNotes = [
  {
    num: '01',
    label: 'Format',
    title: 'Make the product feel habit-friendly, portable, and more desirable than the category standard.',
    body: 'A supplement people actually reach for - not a routine-based obligation.',
  },
  {
    num: '02',
    label: 'Brand',
    title: 'Stay simple enough for instant understanding, distinct enough to spark curiosity.',
    body: 'People should get it in a few seconds - then want to know more.',
  },
  {
    num: '03',
    label: 'Identity',
    title: 'Keep the name and identity working together as the product format keeps evolving.',
    body: 'Off Menu has to flex as the product itself takes shape.',
  },
  {
    num: '04',
    label: 'Storefront',
    title: 'Shopify is the next major public touchpoint for the brand.',
    body: 'The site has to sell, educate, and build trust in one pass.',
  },
  {
    num: '05',
    label: 'Growth',
    title: 'Early growth runs through Meta ads, static creative testing, and TikTok Shop.',
    body: 'Direct-response channels that need a batch of creative to test against.',
  },
  {
    num: '06',
    label: 'Founder',
    title: 'The personal / TED site should feel more polished as the founder story goes public.',
    body: 'Credibility for the broader ecosystem around Off Menu.',
  },
  {
    num: '07',
    label: 'Trust',
    title: 'Supplement buyers need ingredient clarity and proof before they purchase.',
    body: "Answer the obvious questions before they're asked.",
  },
  {
    num: '08',
    label: 'Scale',
    title: 'The store can start focused, then grow as data, SKUs, and channels expand.',
    body: 'A launch store today; a fuller commerce system later.',
  },
]

const opportunityLines = [
  'A first-time visitor should think: I get what this is, and I want to try it.',
  'A returning customer should think: this fits my routine, and reordering is effortless.',
  'A skeptic should think: the ingredients are clear and the claims feel honest.',
  'A scroller from an ad should think: that packaging is great - tell me more.',
]

const goals = [
  {
    num: '01',
    title: 'A Shopify site built to sell',
    label: 'Storefront',
    body: 'Designed and built around launch needs - product education, credibility, conversion, mobile shopping, and clean purchase paths.',
    outcome: 'Focused and sharp, with enough brand energy to escape supplement sameness.',
  },
  {
    num: '02',
    title: 'A stronger product story',
    label: 'Story',
    body: 'Site copy and structure shaped around what a customer needs before buying - format, benefits, daily fit, ingredients, FAQs.',
    outcome: 'The product point of view, made legible from the first scroll.',
  },
  {
    num: '03',
    title: 'A launch ad kit',
    label: 'Ads',
    body: 'A set of Meta concepts and static variations designed for early testing before deeper media spend.',
    outcome: 'A smart starting batch of creative to learn what people respond to.',
  },
  {
    num: '04',
    title: 'A refreshed personal site',
    label: 'Refresh',
    body: 'A light, polished refresh of the personal / TED site - clearer visual system, hierarchy, and flow.',
    outcome: 'A more credible public presence, without a separate brand project.',
  },
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Shopify strategy',
    body: "Map the Shopify site around customer understanding and purchase behavior - product education, page structure, conversion goals, and the site's role alongside TikTok Shop and Meta.",
    outcome: 'A Shopify strategy summary, site structure, and launch checklist.',
    includes: ['Shopify kickoff', 'Product and SKU review', 'Customer path planning', 'Site architecture', 'App and integration review', 'Analytics and pixel planning', 'Conversion strategy', 'Mobile-first UX planning'],
  },
  {
    num: '02',
    title: 'Shopify design',
    body: 'Design the key Shopify pages and sections so the Off Menu identity carries into a functioning ecommerce experience - desktop and mobile.',
    outcome: 'A polished Shopify design system for the core launch experience.',
    includes: ['Homepage design', 'Product page design', 'Shop / listing page design', 'About / story page design', 'FAQ + product education modules', 'Ad landing section direction', 'CTA and button system', 'Responsive design guidance'],
  },
  {
    num: '03',
    title: 'Shopify build',
    body: 'Build the approved design in Shopify - a clean, functional, easy-to-manage store ready for launch, sales, and ad traffic.',
    outcome: 'A live Shopify website ready for launch.',
    includes: ['Theme + core page build', 'Product page setup', 'Shop / collection setup', 'Navigation and footer setup', 'Email capture setup', 'Meta pixel + analytics setup', 'Foundational SEO setup', 'Mobile responsive build + launch QA'],
  },
  {
    num: '04',
    title: 'Website copy',
    body: 'Refine the core site copy so the experience feels clear, concise, and brand-aligned - the lines that help customers understand and buy.',
    outcome: 'Launch-ready copy for the core Shopify pages.',
    includes: ['Homepage copy', 'Product page copy direction', 'FAQ copy', 'About / founder story copy', 'CTA language', 'Ad landing page messaging', 'Microcopy for buttons and forms', 'SEO titles + descriptions'],
  },
  {
    num: '05',
    title: 'Meta ad creative kit',
    body: 'Create a starter kit for early Meta testing - several directions that can be tested against each other before deeper media spend.',
    outcome: '12 static ad concepts, 3 message angles, captions, and testing notes.',
    includes: ['Meta ad creative direction', 'Static ad concepts', 'Copy variations', 'Product-focused ads', 'Packaging-focused ads', 'Benefit-led ads', 'Founder / story-led ads', 'Launch offer + testing notes'],
  },
  {
    num: '06',
    title: 'Personal / TED site refresh',
    body: 'A light cosmetic refresh of the personal / TED site - improving the visual system, hierarchy, flow, and credibility. A side project alongside the launch.',
    outcome: 'A refreshed personal site that supports your speaking and founder credibility.',
    includes: ['Current site review', 'Visual refresh direction', 'Homepage / main page redesign', 'Typography + spacing cleanup', 'Content hierarchy refinement', 'Light copy refinement', 'Speaker / TED section styling', 'Mobile polish + handoff'],
  },
]

const deliverables = [
  ['Strategy', 'Shopify strategy summary', 'Site structure, customer path map, and conversion plan in one place.'],
  ['Strategy', 'Recommended site structure + app stack', 'Site architecture and the apps and integrations the store needs.'],
  ['Design', 'Homepage design', 'The first surface of Off Menu, designed for desktop and mobile.'],
  ['Design', 'Product detail page design', 'The page that has to do the selling - built to convert.'],
  ['Design', 'Shop / listing + About / story design', 'The browse path and the founder story, designed together.'],
  ['Design', 'FAQ / product education modules', 'The sections that answer questions and build trust before purchase.'],
  ['Build', 'Shopify theme + core page build', 'A clean, easy-to-manage store, live and ready for traffic.'],
  ['Build', 'Product + collection setup', 'Products, variants, and collections configured for sale.'],
  ['Build', 'Email capture + Meta pixel + analytics', 'Capture, tracking, and measurement wired in from day one.'],
  ['Build', 'Foundational SEO + launch QA', 'Search basics in place and the store tested end to end.'],
  ['Copy', 'Website copy for core pages', 'Homepage, product, FAQ, about, and CTA language - launch-ready.'],
  ['Ads', '12 static Meta ad concepts', 'A starter batch across product, packaging, benefit, and founder angles.'],
  ['Ads', '3 message angles + captions and testing notes', 'Directions to test against each other, with simple testing guidance.'],
  ['Refresh', 'Personal / TED site refresh', 'A lighter, more polished public presence for the founder story.'],
  ['Handoff', 'Final handoff: assets, access, and support window', 'Organized assets, store access, and a clean post-launch handoff.'],
]

const timeline = [
  ['Week 01', 'Strategy & structure', ['Shopify kickoff', 'Product & SKU review', 'Customer path planning', 'Site architecture', 'Ad angle planning', 'Personal site review']],
  ['Week 02', 'Shopify design', ['Homepage design', 'Product page design', 'Shop page design', 'Mobile direction', 'Copy direction']],
  ['Week 03', 'Shopify build', ['Theme setup', 'Core page build', 'Product setup', 'Email capture', 'Analytics & pixel setup', 'Foundational SEO']],
  ['Week 04', 'Ads & site polish', ['Meta ad creative kit', '12 static ad concepts', 'Shopify refinements', 'FAQ & product education', 'Conversion checks', 'Mobile QA']],
  ['Week 05', 'Personal site refresh', ['Current site review', 'Visual refresh', 'Content hierarchy', 'Light copy refinement', 'Mobile polish', 'Implementation or handoff']],
  ['Week 06 - if needed', 'Final QA & launch', ['Final QA', 'Launch support', 'Ad export handoff', 'Final refinements', 'Asset handoff', 'Post-launch support window']],
] as const

const investmentLines: PriceRow[] = [
  ['01', 'Shopify strategy, design & build', 'Strategy, site architecture, desktop and mobile design, core page and product build, email capture, analytics, pixel, foundational SEO, and launch QA.', '$5,000'],
  ['02', 'Website copy', 'Homepage, product page direction, FAQ, about / founder story, CTA language, microcopy, and SEO titles and descriptions.', 'Included'],
  ['03', 'Meta ad creative kit', 'Creative direction, 12 static ad concepts, message angles, copy variations, format sizing, and simple testing recommendations.', '$750'],
  ['04', 'Personal / TED site refresh', 'Current site review, light visual refresh, content hierarchy, speaker / TED section styling, mobile polish, and implementation or handoff.', '$2,000'],
]

const optionalAddOns = [
  {
    label: 'Optional - After launch',
    title: 'Ongoing growth support',
    price: 'Scoped per round',
    body: 'After launch, we can support new needs as the brand collects data - more ad rounds, video, and landing variants.',
    items: ['Additional ad testing rounds', 'Video ad concepts', 'Landing page variants', 'TikTok Shop creative', 'Email flows', 'Product photography direction'],
    note: 'Added as needed, without locking into a monthly retainer.',
  },
  {
    label: 'Optional - Post-launch',
    title: 'Commerce expansion',
    price: 'Custom estimate',
    body: 'Once the store is live, we can expand based on data - subscriptions, bundles, and conversion work.',
    items: ['Subscription or bundle strategy', 'A/B testing support', 'Conversion optimization', 'Seasonal campaign pages', 'Investor or retail pitch materials', 'Ongoing Shopify improvements'],
    note: 'Estimate confirmed once the store is live and the first data comes in.',
  },
]

const paymentMilestones: DetailRow[] = [
  ['60%', 'Due at kickoff', '$4,650 - Project begins on receipt.'],
  ['40%', 'Due before final handoff', '$3,100 - Before final handoff and store launch.'],
]

const whyItems: DetailRow[] = [
  ['Site', 'A Shopify site ready for launch', 'Designed, built, and tested to sell.'],
  ['Story', 'A clearer product story', 'What customers need to understand, made simple.'],
  ['Path', 'A stronger purchase path', 'From first scroll to checkout, friction removed.'],
  ['Mobile', 'A better mobile shopping experience', 'Designed mobile-first for where buyers are.'],
  ['Ads', 'A starter ad system for early testing', '12 concepts and angles ready to learn from.'],
  ['Profile', 'A refreshed public profile', 'A more credible personal / TED presence.'],
  ['Growth', 'A foundation for future growth', 'Built to expand as the data comes in.'],
]

const futureItems = [
  'Additional ad testing rounds',
  'Video ad concepts',
  'Landing page variants',
  'TikTok Shop creative',
  'Email flows',
  'Product photography direction',
  'Subscription or bundle strategy',
  'A/B testing support',
  'Conversion optimization',
  'Seasonal campaign pages',
  'Investor or retail pitch materials',
  'Ongoing Shopify improvements',
]

const nextSteps: DetailRow[] = [
  ['01', 'Confirm and kick off', 'Within 48 hours - confirm direction, gather product details, review the personal site, and schedule a kickoff session.'],
  ['02', 'Build sprint', 'Weeks 1-5 - Shopify strategy, design, build, copy, and the ad kit.'],
  ['03', 'Launch', 'Launch + post-launch support window - go live with a store ready for traffic, a starter ad kit to test, and a refreshed personal site.'],
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
  href = contractHref,
  variant = 'dark',
}: {
  children: string
  href?: string
  variant?: 'dark' | 'outline' | 'light'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-paper/85'
      : variant === 'outline'
        ? 'border border-[var(--color-rule)] text-ink hover:bg-ink hover:text-paper'
        : 'bg-ink text-paper hover:bg-ink-2'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-[13px] font-medium transition-colors whitespace-nowrap ${classes}`}
    >
      {children}
    </a>
  )
}

function OffMenuNav() {
  const [active, setActive] = useState('heard')

  useEffect(() => {
    const sections = navSections.map((section) => document.getElementById(section.id)).filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.2, 0.5, 0.75], rootMargin: '-38% 0px -52% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header>
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 text-ink md:flex">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Harikrishna Patel</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Launch sprint - v1</span>
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
              Off Menu
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <a href={contractHref} className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
            Sign contract
          </a>
        </div>
      </div>
    </header>
  )
}

function fourCardBorderClass(index: number, total: number) {
  return [
    index < total - 2 ? 'border-b' : 'border-b md:border-b-0',
    index % 2 === 0 ? 'md:border-r' : 'md:border-r-0',
    index < total - 1 ? 'xl:border-r' : 'xl:border-r-0',
    'xl:border-b-0',
  ].join(' ')
}

export function OffMenuProposal() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies x Off Menu - Proposal'
    }
  }, [])

  return (
    <main className="off-menu-proposal min-h-screen bg-paper text-ink antialiased">
      <OffMenuNav />

      <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
        <div className="flex flex-col gap-6 pb-16 md:flex-row md:items-start md:justify-between lg:pb-24">
          <Reveal className="flex flex-col gap-1.5">
            <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
            <span className="eyebrow text-ink-2">Shopify Website, Launch Ads & Site Refresh</span>
          </Reveal>
          <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
            <span className="eyebrow text-ink-2">Prepared for Harikrishna Patel</span>
            <span className="eyebrow text-ink-2">By Anchovies</span>
          </Reveal>
        </div>
        <Reveal>
          <h1 className="display max-w-[1180px] pb-12 text-[52px] leading-[54px] sm:text-[76px] sm:leading-[76px] md:text-[100px] md:leading-[96px] lg:pb-16 lg:text-[124px] lg:leading-[116px]">
            A launch system for Off Menu to enter the world.
          </h1>
        </Reveal>
        <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
          <Reveal className="max-w-[650px] flex-1">
            <h2 className="serif text-[30px] leading-[38px] md:text-[38px] md:leading-[46px]">
              A five-to-six-week sprint to launch a Shopify store that sells, a starter ad system for early testing, and a refreshed personal site for the founder story.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[440px] flex-col gap-7">
            <p className="text-[15px] leading-[23px] text-ink-2">
              Off Menu now has the foundation for a brand that can move differently in the supplement space.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AnchorButton>{'Sign contract ->'}</AnchorButton>
              <AnchorButton href="#approach" variant="outline">
                View the approach
              </AnchorButton>
            </div>
          </Reveal>
        </div>
        <Reveal className="border-t border-[var(--color-rule)] pt-12">
          <MetaRow left="Fig. 01 - What this phase creates" right="Four outcomes" />
          <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
            {heroCards.map(([num, title, body], index) => (
              <div key={title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(index, heroCards.length)}`}>
                <span className="eyebrow text-ink-2">Section {num}</span>
                <h3 className="serif text-[40px] leading-[44px]">{title}</h3>
                <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section id="heard" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 02 - What we heard" right="A more satisfying form" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <h2 className="display max-w-[650px] text-[48px] leading-[52px] md:text-[68px] md:leading-[70px]">
              The brand needs a launch that can sell the idea.
            </h2>
            <div className="flex max-w-[500px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
              <p>"Off Menu" has immediate intrigue, contrast, and recall. People can get the idea in a few seconds.</p>
              <p>The work now is turning that identity into a store that sells.</p>
            </div>
          </Reveal>
          <Reveal className="grid gap-0 border-t border-[var(--color-rule)] sm:grid-cols-2">
            {heardNotes.map((note, index) => (
              <article key={note.num} className={`flex min-h-[250px] flex-col justify-between gap-8 border-[var(--color-rule)] p-7 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index < heardNotes.length - 2 ? 'border-b' : 'border-b sm:border-b-0'}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow text-ink-2">N / {note.num}</span>
                  <span className="eyebrow text-ink-2">{note.label}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="serif text-[25px] leading-[30px]">{note.title}</h3>
                  <p className="text-[13px] leading-[20px] text-ink-2">{note.body}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="opportunity" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 03 - The opportunity" right="An idea people get in seconds" dark />
        <Reveal>
          <h2 className="display max-w-[1180px] py-16 text-[48px] leading-[54px] md:text-[76px] md:leading-[78px] lg:text-[96px] lg:leading-[96px]">
            The site should explain the product, show the packaging, answer the questions, and make buying feel simple.
          </h2>
        </Reveal>
        <Reveal className="ml-auto max-w-[760px] border-t border-paper/20">
          {opportunityLines.map((line) => (
            <p key={line} className="serif border-b border-paper/20 py-7 text-[25px] leading-[34px] text-paper/82 md:text-[34px] md:leading-[42px]">
              {line}
            </p>
          ))}
        </Reveal>
      </section>

      <section id="goals" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 05 - What this phase creates" right="Four outcomes" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[720px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              Built to sell now. Flexible enough for the next wave.
            </h2>
          </Reveal>
          <Reveal className="max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            Four outcomes shape this phase. Each is meant to move Off Menu from concept into market.
          </Reveal>
        </div>
        <div className="border-t border-[var(--color-rule)]">
          {goals.map((goal) => (
            <Reveal key={goal.num} className="grid gap-7 border-b border-[var(--color-rule)] py-9 md:grid-cols-[120px_minmax(0,0.8fr)_minmax(0,1fr)] lg:grid-cols-[120px_minmax(0,0.8fr)_minmax(0,1fr)_minmax(260px,0.9fr)]">
              <div>
                <span className="eyebrow text-ink-2">G / {goal.num}</span>
                <p className="eyebrow mt-4 text-ink">{goal.label}</p>
              </div>
              <h3 className="serif text-[32px] leading-[38px]">{goal.title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{goal.body}</p>
              <div className="border-t border-ink/20 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                <span className="eyebrow text-ink-2">Outcome</span>
                <p className="mt-3 text-[14px] leading-[22px] text-ink">{goal.outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 06 - Our approach" right="Six phases, five to six weeks" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[820px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              Strategy, design, build, copy, ads - paced for a focused launch.
            </h2>
          </Reveal>
          <Reveal className="max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            Six tightly sequenced phases. Each one ends in a meaningful, usable deliverable.
          </Reveal>
        </div>
        <div className="border-t border-[var(--color-rule)]">
          {phases.map((phase) => (
            <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[90px_1fr_360px] lg:gap-12">
              <div>
                <span className="serif block text-[56px] leading-[56px]">{phase.num}</span>
                <span className="eyebrow mt-4 block text-ink-2">Phase</span>
              </div>
              <div className="max-w-[650px]">
                <h3 className="serif pb-5 text-[34px] leading-[40px]">{phase.title}</h3>
                <p className="pb-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
                <p className="text-[13px] leading-[20px] text-ink">Outcome - {phase.outcome}</p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <span className="eyebrow text-ink-2">Includes</span>
                {phase.includes.map((item) => (
                  <div key={item} className="flex items-baseline gap-3">
                    <span className="h-px w-[10px] shrink-0 bg-[var(--color-rule)]" />
                    <span className="text-[14px] leading-[22px]">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="deliverables" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 07 - Final deliverables" right="Everything Off Menu walks away with" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[640px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              A launch system, line by line.
            </h2>
          </Reveal>
          <Reveal className="max-w-[540px] text-[15px] leading-[24px] text-ink-2">
            A clear picture of what's included. Each item is something you can point to, use, and build on.
          </Reveal>
        </div>
        <Reveal className="grid border-t border-l border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-3">
          {deliverables.map(([label, title, body], index) => (
            <article key={title} className="min-h-[210px] border-r border-b border-[var(--color-rule)] p-7">
              <div className="mb-8 flex items-center justify-between gap-4">
                <span className="eyebrow text-ink-2">D / {String(index + 1).padStart(2, '0')}</span>
                <span className="eyebrow text-ink-2">{label}</span>
              </div>
              <h3 className="serif text-[27px] leading-[32px]">{title}</h3>
              <p className="mt-4 text-[13px] leading-[20px] text-ink-2">{body}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 08 - Timeline" right="Five to six weeks - phased launch" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[700px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              Kickoff to launch in six weeks.
            </h2>
          </Reveal>
          <Reveal className="max-w-[500px] text-[15px] leading-[24px] text-ink-2">
            Phased around a focused launch. Assumes timely feedback, product details, and store access.
          </Reveal>
        </div>
        <Reveal className="grid border-t border-l border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-3">
          {timeline.map(([week, title, items]) => (
            <article key={week} className="min-h-[330px] border-r border-b border-[var(--color-rule)] p-8">
              <span className="eyebrow text-ink-2">{week}</span>
              <h3 className="serif mt-5 text-[34px] leading-[38px]">{title}</h3>
              <div className="mt-8 flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item} className="border-t border-ink/15 pt-3 text-[14px] leading-[20px] text-ink-2">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 09 - Investment" right="Launch system - full scope" />
        <Reveal className="grid gap-10 border-b border-[var(--color-rule)] py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="display text-[72px] leading-none md:text-[124px]">$7,750</p>
            <p className="eyebrow mt-5 text-ink-2">Total - Five to six weeks - Launch system</p>
          </div>
          <div className="flex max-w-[560px] flex-col gap-5 text-[15px] leading-[24px] text-ink-2">
            <p>This covers Shopify strategy, design, and build, website copy, the Meta ad creative kit, and the personal / TED site refresh.</p>
            <p>Optional future support below - added as the brand starts collecting data.</p>
          </div>
        </Reveal>
        <div className="border-b border-[var(--color-rule)]">
          {investmentLines.map(([num, title, body, price]) => (
            <Reveal key={num} className="grid gap-6 border-b border-ink/20 py-8 last:border-b-0 md:grid-cols-[80px_1fr_minmax(0,1.25fr)_160px]">
              <span className="serif text-[40px] leading-none">{num}</span>
              <h3 className="serif text-[30px] leading-[34px]">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
              <p className="serif text-[34px] leading-none md:text-right">{price}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="grid gap-6 border-b border-[var(--color-rule)] py-10 lg:grid-cols-2">
          {optionalAddOns.map((item) => (
            <article key={item.title} className="border border-ink/20 p-7">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="eyebrow text-ink-2">{item.label}</p>
                  <h3 className="serif mt-4 text-[34px] leading-[38px]">{item.title}</h3>
                </div>
                <p className="eyebrow text-ink">{item.price}</p>
              </div>
              <p className="mb-6 text-[14px] leading-[22px] text-ink-2">{item.body}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {item.items.map((option) => (
                  <div key={option} className="border-t border-ink/15 pt-3 text-[13px] leading-[19px] text-ink-2">
                    {option}
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[13px] leading-[20px] text-ink">{item.note}</p>
            </article>
          ))}
        </Reveal>
        <Reveal className="pt-10">
          <MetaRow left="Payment structure" right="60 / 40" />
          <div className="mt-6 grid border-t border-l border-[var(--color-rule)] md:grid-cols-2">
            {paymentMilestones.map(([percent, title, body]) => (
              <article key={`${percent}-${title}`} className="border-r border-b border-[var(--color-rule)] p-7">
                <p className="serif text-[58px] leading-none">{percent}</p>
                <h3 className="mt-6 serif text-[28px] leading-[32px]">{title}</h3>
                <p className="mt-4 text-[13px] leading-[20px] text-ink-2">{body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 10 - Why this is the right phase" right="What Off Menu walks away with" dark />
        <Reveal>
          <div className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr]">
            <h2 className="display max-w-[820px] text-[46px] leading-[52px] md:text-[72px] md:leading-[78px]">
              The Shopify site turns the brand into a customer experience.
              <br />
              The ads create early testing fuel.
              <br />
              The personal site gives your broader story a cleaner place to live.
            </h2>
            <div className="flex flex-col border-t border-paper/20">
              {whyItems.map(([label, title, body]) => (
                <div key={title} className="grid gap-4 border-b border-paper/20 py-5 sm:grid-cols-[92px_1fr]">
                  <span className="eyebrow text-paper/45">{label}</span>
                  <div>
                    <h3 className="serif text-[26px] leading-[31px]">{title}</h3>
                    <p className="mt-2 text-[13px] leading-[20px] text-paper/60">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 11 - Future opportunities" right="Beyond launch" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[780px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              After launch, we can keep supporting Off Menu as the brand collects data.
            </h2>
          </Reveal>
          <Reveal className="max-w-[460px] text-[15px] leading-[24px] text-ink-2">
            A partnership built to grow with the brand. Each piece can be scoped on its own, when it's needed.
          </Reveal>
        </div>
        <Reveal className="grid border-t border-l border-[var(--color-rule)] sm:grid-cols-2 lg:grid-cols-4">
          {futureItems.map((item, index) => (
            <div key={item} className="min-h-[150px] border-r border-b border-[var(--color-rule)] p-7">
              <p className="eyebrow text-ink-2">F / {String(index + 1).padStart(2, '0')}</p>
              <h3 className="mt-8 serif text-[26px] leading-[31px]">{item}</h3>
            </div>
          ))}
        </Reveal>
      </section>

      <section id="next" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
        <MetaRow left="§ 12 - Next step" right="From kickoff to live store" />
        <div className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[72px]">
              If this direction feels aligned, we can begin immediately.
            </h2>
          </Reveal>
          <Reveal className="max-w-[440px] text-[15px] leading-[24px] text-ink-2">
            A kickoff, a build sprint, a launch. Three steps from here to a live store.
          </Reveal>
        </div>
        <div className="border-t border-[var(--color-rule)]">
          {nextSteps.map(([num, title, body]) => (
            <Reveal key={num} className="grid gap-6 border-b border-ink/20 py-9 last:border-b-0 md:grid-cols-[100px_1fr_320px]">
              <span className="serif text-[54px] leading-none">{num}</span>
              <h3 className="serif text-[34px] leading-[40px]">{title}</h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
        <MetaRow left="§ 13 - In closing" right="Where this lands" dark />
        <Reveal className="border-t border-paper/20 pt-16">
          <h2 className="display max-w-[1180px] text-[52px] leading-[58px] md:text-[92px] md:leading-[96px] lg:text-[124px] lg:leading-[120px]">
            A store that sells, a sharper story, and Off Menu out in the world.
          </h2>
        </Reveal>
        <div className="grid gap-10 pt-16 lg:grid-cols-[1fr_360px]">
          <Reveal className="max-w-[540px] text-[15px] leading-[24px] text-paper/70">
            By launch, Off Menu has a store that sells, a product story that lands, and a starter ad system to learn from.
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow text-paper/55">Begin</span>
            <AnchorButton href={contractHref} variant="light">
              {'Sign contract ->'}
            </AnchorButton>
            <p className="text-[13px] leading-[20px] text-paper/60">$7,750 - Five to six weeks - Launch system</p>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[var(--color-rule)] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-16">
        <div className="flex flex-wrap items-center gap-4">
          <span className="eyebrow font-medium text-ink">Anchovies</span>
          <span className="hidden h-[10px] w-px bg-[var(--color-rule)] sm:block" />
          <span className="eyebrow text-ink-2">Off Menu launch system proposal</span>
          <span className="eyebrow text-ink-2">v1 - June 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="eyebrow text-ink-2">Prepared for Harikrishna Patel</span>
          <span className="eyebrow text-ink-2">Confidential</span>
          <span className="eyebrow text-ink">- end -</span>
        </div>
      </footer>
    </main>
  )
}
