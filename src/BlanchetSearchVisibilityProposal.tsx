import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const acceptHref =
  'mailto:sean@anchovies.agency?subject=Blanchet%20Search%20Visibility%20Sprint&body=Hi%20Sean%2C%0A%0AWe%27d%20like%20to%20move%20forward%20with%20the%20Blanchet%20Search%20Visibility%20Sprint.%0A%0A'

type Step = {
  num: string
  title: string
  body: string
  items: string[]
}

type TimelineRow = {
  when: string
  title: string
  body: string
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'sprint', label: 'Sprint' },
  { id: 'work', label: 'Work' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next step' },
]

const signals = [
  ['01', 'Already strong', 'The website is fast, the technical basics are in place, and the site has already been built with clear search signals.'],
  ['02', 'Still new', 'Google may need more time, clearer ownership signals, and more trusted references before the site rises for branded and attorney-name searches.'],
  ['03', 'More proof', 'Third-party listings, firm profiles, attorney profiles, and short news updates can help Google connect Blanchet to the right searches.'],
  ['04', 'Better tracking', 'Search Console gives us a way to watch indexing, branded searches, search impressions, and the pages Google is actually seeing.'],
]

const sprintSteps: Step[] = [
  {
    num: '01',
    title: 'Confirm the core search signals.',
    body: 'We start by making sure the website is giving Google the clearest possible version of Blanchet: the firm name, address, attorney names, logo, site map, page titles, and structured firm information.',
    items: [
      'Address update on the website',
      'Homepage and attorney-name signal review',
      'Page title and description check',
      'Organization and legal-service structured data review',
      'Sitemap and robots review',
      'Indexing request for priority pages',
    ],
  },
  {
    num: '02',
    title: 'Set up the search dashboard.',
    body: 'Google Search Console gives us the baseline. It lets us see whether Google has indexed the site, what terms are beginning to show, and whether there are any avoidable issues slowing the site down.',
    items: [
      'Google Search Console setup or verification',
      'Sitemap submission',
      'URL inspection for homepage and attorney pages',
      'Branded-search baseline',
      'Search visibility tracking sheet',
      'Handoff notes for what to watch next',
    ],
  },
  {
    num: '03',
    title: 'Build outside confirmation.',
    body: 'The website should not be the only place Google sees Blanchet. We will create or clean up a focused set of trusted listings and profiles so the firm name, address, website, and attorneys appear consistently across the web.',
    items: [
      'Firm-owned setup email recommendation',
      'Core legal directory listing pass',
      'LinkedIn and public profile review',
      'Apple Maps, Bing Places, or local listing recommendations',
      'Name, address, phone, and website consistency check',
      'Priority citation list for future updates',
    ],
  },
  {
    num: '04',
    title: 'Add a small content layer.',
    body: 'A few short news or press-style posts give Google more relevant pages to crawl and create a useful place to record firm updates, attorney news, and outside mentions over time.',
    items: [
      'Simple news or press section',
      'Two to three short launch or firm-update posts',
      'Attorney and firm-name reinforcement',
      'Internal links to priority pages',
      'Metadata for each post',
      'Final indexing request after publishing',
    ],
  },
]

const timelineRows: TimelineRow[] = [
  {
    when: 'Day 01',
    title: 'Access and address update',
    body: 'Confirm access, update the firm address on the website, review branded search signals, and check the current site indexability.',
  },
  {
    when: 'Day 02',
    title: 'Search Console and indexing',
    body: 'Set up or verify Search Console, submit the sitemap, inspect the priority pages, and request indexing where appropriate.',
  },
  {
    when: 'Days 03 to 04',
    title: 'Listings and outside signals',
    body: 'Create or clean up the priority listings and profiles so Blanchet appears consistently across trusted third-party sources.',
  },
  {
    when: 'Days 05 to 06',
    title: 'News and press content',
    body: 'Add the lightweight news layer and publish two to three short posts that reinforce the firm, attorneys, address, and practice focus.',
  },
  {
    when: 'Day 07',
    title: 'Final pass and handoff',
    body: 'Complete final indexing requests, confirm the tracking baseline, and send a simple report of what was done and what to watch over the next few weeks.',
  },
]

const boundaries = [
  ['Ranking timeline', 'Google can take days to weeks to recrawl and reprocess changes. The sprint is designed to improve the signals, not promise an exact ranking date.'],
  ['Primary goal', 'The priority is branded visibility: Blanchet, the firm name, and individual attorney-name searches. Broader competitive SEO can be scoped later if needed.'],
  ['Client access', 'Blanchet will provide or approve a firm-owned email for account creation, plus any listing verification details required by third-party platforms.'],
  ['Ongoing SEO', 'Monthly SEO, large content programs, paid media, paid placements, reputation management, and advanced link-building are not included in this sprint.'],
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
  const external = href.startsWith('http') || href.startsWith('mailto:')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
        ? 'border border-mac text-mac hover:bg-mac hover:text-white'
        : 'bg-mac text-white hover:bg-mac-hover'

  return (
    <a
      href={href}
      target={external && !href.startsWith('mailto:') ? '_blank' : undefined}
      rel={external && !href.startsWith('mailto:') ? 'noreferrer' : undefined}
      className={`inline-flex min-h-[46px] items-center justify-center rounded-full px-5 py-3 text-center text-[13px] font-medium transition-colors ${classes}`}
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
          <span className="eyebrow text-ink-2">Prepared for Blanchet</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Search visibility sprint</span>
          <span className="eyebrow">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline"><span className="text-ink">Anchovies</span> x Blanchet</span>
          </a>
          <nav className="hidden items-center gap-6 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <AnchorButton href={acceptHref}>Accept proposal</AnchorButton>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-20 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-[140px] lg:pt-[120px]">
      <MetaRow left="§ 01 - Overview" right="Blanchet search visibility" />
      <Reveal>
        <h1 className="display max-w-[1120px] py-16 text-[50px] leading-[54px] sm:text-[68px] sm:leading-[70px] md:text-[92px] md:leading-[92px] lg:text-[108px] lg:leading-[104px]">
          Help Google connect Blanchet to the searches that should already belong to the firm.
        </h1>
      </Reveal>
      <div className="grid gap-10 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-[1.1fr_460px] lg:gap-24">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[31px] leading-[40px] md:text-[38px] md:leading-[47px]">
            The site is already in strong technical shape. The next step is a small visibility sprint that gives Google clearer signals, stronger outside references, and a place for firm updates to live.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-7">
          <p className="text-[15px] leading-[24px] text-ink-2">
            The goal is simple: when someone searches for Blanchet or an individual attorney name, the firm should not be buried. We cannot force Google to move on a fixed date, but we can give it better information and track whether the right signals are improving.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={acceptHref}>Accept proposal</AnchorButton>
            <AnchorButton href={calendarHref} variant="outline">Schedule a review</AnchorButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function SignalGrid() {
  return (
    <section id="sprint" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 02 - Why this sprint" right="Minimal SEO play" />
      <Reveal>
        <h2 className="display max-w-[900px] py-16 text-[48px] leading-[52px] md:text-[78px] md:leading-[78px]">
          This is not a big SEO engagement. It is a focused push for branded visibility.
        </h2>
      </Reveal>
      <Reveal className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
        {signals.map(([num, title, body], index) => (
          <article key={title} className={`min-h-[280px] p-7 sm:p-8 ${index < signals.length - 1 ? 'border-b border-[var(--color-rule)] md:border-r xl:border-b-0' : ''} ${index === 1 ? 'md:border-r-0 xl:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">Signal {num}</span>
            <h3 className="serif mt-12 text-[34px] leading-[39px]">{title}</h3>
            <p className="mt-6 text-[14px] leading-[22px] text-ink-2">{body}</p>
          </article>
        ))}
      </Reveal>
    </section>
  )
}

function WorkPlan() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 03 - What we will do" right="Seven-day search visibility sprint" dark />
      <Reveal>
        <h2 className="display max-w-[1040px] py-16 text-[52px] leading-[56px] md:text-[84px] md:leading-[84px]">
          Four practical moves to make the firm easier for Google to understand.
        </h2>
      </Reveal>
      <div className="border-t border-paper/20">
        {sprintSteps.map((step) => (
          <Reveal key={step.num} className="grid gap-9 border-b border-paper/20 py-11 lg:grid-cols-[92px_1fr_390px] lg:gap-14">
            <div>
              <span className="display block text-[62px] leading-none">{step.num}</span>
            </div>
            <div className="max-w-[620px]">
              <h3 className="serif text-[36px] leading-[42px]">{step.title}</h3>
              <p className="mt-5 text-[15px] leading-[24px] text-paper/70">{step.body}</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow mb-2 text-paper/50">Included</span>
              {step.items.map((item) => (
                <div key={item} className="flex items-baseline gap-3">
                  <span className="h-px w-[10px] shrink-0 bg-paper/25" />
                  <span className="text-[13px] leading-[20px] text-paper/78">{item}</span>
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
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 - Timeline" right="Seven days" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_430px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[820px] text-[50px] leading-[54px] md:text-[76px] md:leading-[76px]">
            One focused week, then a few weeks of Google catching up.
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            We can complete the work in seven days once access is ready. Search movement may continue after the sprint as Google recrawls the site and processes the updated signals.
          </p>
        </Reveal>
      </div>
      <Reveal className="border-y border-[var(--color-rule)]">
        {timelineRows.map((row, index) => (
          <div key={row.title} className={`grid gap-4 py-7 md:grid-cols-[190px_280px_1fr] md:gap-8 ${index < timelineRows.length - 1 ? 'border-b border-[var(--color-rule)]' : ''}`}>
            <span className="eyebrow pt-2 text-ink-2">{row.when}</span>
            <span className="serif text-[25px] leading-[31px]">{row.title}</span>
            <p className="text-[14px] leading-[22px] text-ink-2">{row.body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 05 - Investment" right="One sprint" />
      <Reveal className="grid gap-10 lg:grid-cols-[1fr_460px] lg:items-start lg:gap-20">
        <div>
          <h2 className="display max-w-[760px] text-[54px] leading-[58px] md:text-[86px] md:leading-[84px]">
            Search Visibility Sprint.
          </h2>
          <p className="mt-8 max-w-[660px] text-[15px] leading-[24px] text-ink-2">
            A seven-day sprint to update the address, set up tracking, submit the site to Google, clean up priority listings, and add a lightweight content layer for firm updates and search relevance.
          </p>
        </div>
        <div className="border border-mac p-7 sm:p-9">
          <span className="eyebrow text-mac">Project fee</span>
          <div className="display mt-5 text-[82px] leading-[84px]">$2,500</div>
          <div className="mt-7 grid gap-3 border-t border-[var(--color-rule)] pt-5 text-[13px] leading-[19px] text-ink-2">
            <div className="flex items-center justify-between gap-5">
              <span>Timeline</span>
              <span className="text-ink">7 days</span>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span>Payment</span>
              <span className="text-ink">50% to begin, 50% on completion</span>
            </div>
            <div className="flex items-center justify-between gap-5">
              <span>Primary outcome</span>
              <span className="text-ink">Better branded search signals</span>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal className="mt-12 grid border-y border-[var(--color-rule)] md:grid-cols-2">
        {boundaries.map(([title, body], index) => (
          <article key={title} className={`min-h-[190px] p-7 sm:p-8 ${index < boundaries.length - 2 ? 'border-b border-[var(--color-rule)]' : ''} ${index % 2 === 0 ? 'md:border-r' : ''} ${index === boundaries.length - 2 ? 'border-b md:border-b-0' : ''}`}>
            <span className="eyebrow text-ink-2">Note {String(index + 1).padStart(2, '0')}</span>
            <h3 className="serif mt-6 text-[28px] leading-[34px]">{title}</h3>
            <p className="mt-4 text-[14px] leading-[22px] text-ink-2">{body}</p>
          </article>
        ))}
      </Reveal>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 06 - Next step" right="Approve and begin" dark />
      <Reveal>
        <h2 className="display max-w-[1050px] py-16 text-[52px] leading-[56px] md:text-[86px] md:leading-[84px]">
          Give Google a clearer path back to Blanchet.
        </h2>
      </Reveal>
      <div className="grid gap-12 border-t border-paper/20 pt-12 lg:grid-cols-[1fr_470px] lg:gap-24">
        <Reveal>
          <p className="serif max-w-[650px] text-[28px] italic leading-[39px] text-paper/85">
            This is the practical next step: fix the address signal, verify the site with Google, build outside confirmation, publish a few relevant updates, and track what changes.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-6">
          <p className="text-[15px] leading-[24px] text-paper/70">
            Once approved, we will confirm access, create or use the firm-owned setup email, and begin the seven-day sprint.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={acceptHref}>Accept proposal</AnchorButton>
            <AnchorButton href={calendarHref} variant="light">Schedule a review</AnchorButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 border-t border-[var(--color-rule)] bg-paper px-6 py-8 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" />
        <span className="eyebrow text-ink">Anchovies</span>
        <span className="h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="eyebrow">Prepared for Blanchet</span>
      </div>
      <div className="flex items-center gap-5">
        <span className="eyebrow">July 2026</span>
        <span className="eyebrow text-ink">Proposal</span>
      </div>
    </footer>
  )
}

export function BlanchetSearchVisibilityProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Blanchet - Search Visibility Proposal'
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', 'A seven-day branded search visibility sprint proposal for Blanchet from Anchovies.')
  }, [])

  return (
    <main className="blanchet-search-visibility-proposal bg-paper text-ink">
      <ProposalNav />
      <Hero />
      <SignalGrid />
      <WorkPlan />
      <Timeline />
      <Investment />
      <NextStep />
      <Footer />
    </main>
  )
}
