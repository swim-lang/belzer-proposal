import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const choosePackageHref =
  'mailto:sean@anchovies.agency?subject=Avodah%20package%20selection&body=Hi%20Sean%2C%0A%0AWe%27d%20like%20to%20move%20forward%20with%20the%20following%20Avodah%20package%3A%20%5BSearch%20Foundation%20%2F%20Employment%20Search%20Launch%20%2F%20Growth%20Launch%5D.%0A%0A'
const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const doorwayGuidanceHref = 'https://developers.google.com/search/docs/essentials/spam-policies'
const businessProfileGuidanceHref = 'https://support.google.com/business/answer/3038177'

type Package = {
  number: string
  name: string
  price: string
  timing: string
  recommended?: boolean
  summary: string
  outcomes: string[]
  includes: string[]
  payment: string
}

const navSections = [
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'recommendation', label: 'Recommendation' },
  { id: 'packages', label: 'Packages' },
  { id: 'included', label: 'Included work' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'boundaries', label: 'Boundaries' },
  { id: 'next', label: 'Next step' },
]

const researchFoundation = [
  'Keyword, competitor, search result, and content-gap research',
  'Technical and content audit of avodahlegal.com',
  'Public benchmark review of vaemploymentlawyers.com',
  'Search Console, analytics, conversion, and lead-quality baseline',
  'Domain, location, and Google Business Profile recommendation',
  'Expansion map for employment, transactional, and traffic practices',
]

const packages: Package[] = [
  {
    number: '01',
    name: 'Search Foundation',
    price: '$4,950',
    timing: '3 weeks',
    summary: 'Know where to compete, what to build, and how to measure it before committing to a website launch.',
    outcomes: [
      'A research-backed keyword, competitor, and content opportunity map',
      'A clear domain, location, and employment hub recommendation',
      'A prioritized 90-day roadmap Avodah can implement with us or independently',
    ],
    includes: [
      ...researchFoundation,
      'Employment keyword and page map',
      'Content architecture and internal-linking plan',
      'Measurement and reporting plan',
      '90-day implementation roadmap',
    ],
    payment: '75% at kickoff ($3,712.50), then 25% before delivery ($1,237.50).',
  },
  {
    number: '02',
    name: 'Employment Search Launch',
    price: '$12,500',
    timing: '8 to 10 weeks',
    summary: 'Turn the research into a focused employment search hub that is designed, built, measured, and ready to generate qualified inquiries.',
    outcomes: [
      'A live employment search hub inside the Avodah website',
      'Up to eight researched pages written and designed around qualified search demand',
      'A conversion and measurement system that shows which work is creating useful inquiries',
    ],
    includes: [
      'Everything in Search Foundation',
      'Up to eight researched launch pages',
      'Responsive Framer design and development',
      'Conversion-focused website copy',
      'One reusable CMS content template',
      'Technical SEO and metadata',
      'Analytics, conversion events, and forms',
      'Responsive QA and launch support',
    ],
    payment: '50% at kickoff ($6,250), 25% after strategy and design approval ($3,125), then 25% before launch ($3,125).',
  },
  {
    number: '03',
    name: 'Growth Launch',
    price: '$20,000',
    timing: 'Launch plus 90 days',
    recommended: true,
    summary: 'Launch the employment hub, then give it three months of focused publishing, optimization, and reporting so the strategy has time to produce evidence.',
    outcomes: [
      'The complete Employment Search Launch',
      'Six attorney-reviewed content pieces published across the first 90 days',
      'Active optimization, technical monitoring, and a clearer view of search and lead quality',
    ],
    includes: [
      'Everything in Employment Search Launch',
      'Three months of SEO management',
      'Two attorney-reviewed content pieces per month',
      'Page optimization and internal-linking updates',
      'Technical monitoring',
      'Keyword and competitor tracking',
      'Conversion and lead-quality reporting',
      'Monthly recommendations and priority planning',
    ],
    payment: 'The $12,500 launch follows a 50/25/25 schedule. SEO management is billed at $2,500 per month for the first three months.',
  },
]

const workPhases = [
  {
    number: '01',
    title: 'Research the landscape.',
    forPackages: 'Included in every package',
    body: 'We begin with evidence: demand, competition, current performance, content gaps, location requirements, and the questions qualified employment clients are actually asking.',
    items: researchFoundation,
  },
  {
    number: '02',
    title: 'Build the employment hub.',
    forPackages: 'Launch and Growth',
    body: 'We translate the research into a focused section of avodahlegal.com that is clear to prospects, useful to search engines, and built to convert the right inquiries.',
    items: [
      'Up to eight launch pages',
      'Responsive Framer design and development',
      'Conversion copy and calls to action',
      'CMS content template',
      'Technical SEO, analytics, forms, QA, and launch',
    ],
  },
  {
    number: '03',
    title: 'Publish, learn, and improve.',
    forPackages: 'Growth only',
    body: 'The first 90 days turn the launch into a working growth program through attorney-reviewed content, monitoring, optimization, and clear monthly decisions.',
    items: [
      'Two content pieces per month',
      'Page and internal-link optimization',
      'Technical monitoring',
      'Keyword and competitor tracking',
      'Conversion reporting and monthly recommendations',
    ],
  },
]

const timelineRows = [
  ['Weeks 1 to 3', 'Foundation', 'Research demand, audit current performance, map competitors, recommend the domain and location structure, and define the employment content system.'],
  ['Weeks 4 to 6', 'Design and content', 'Write and design the launch pages, define the conversion flow, and build the reusable content template.'],
  ['Weeks 7 to 10', 'Development and launch', 'Develop the responsive Framer experience, configure technical SEO and measurement, complete QA, and launch.'],
  ['First 90 days', 'Growth management', 'Publish two attorney-reviewed pieces per month, optimize priority pages, monitor performance, and recommend the next moves.'],
]

const boundaries = [
  ['Rankings', 'Search rankings, traffic, leads, and business outcomes cannot be guaranteed. The work is designed to improve the quality of the inputs and the clarity of the decisions.'],
  ['Paid acquisition', 'Paid media, paid links, sponsorships, and third-party link purchases are not included.'],
  ['Legal review', 'Avodah attorneys remain responsible for reviewing and approving legal claims, interpretations, and published legal content.'],
  ['Additional practices', 'Complete transactional and traffic practice builds are not included in these packages. Future hubs can be scoped from $6,500 each using the shared Avodah system.'],
  ['Business profiles', 'A separate Google Business Profile is recommended only if the location meets Google requirements for staffing, signage, and customer access. Verification cannot be guaranteed.'],
  ['Added scope', 'Pages beyond the agreed eight, custom integrations, premium software, media production, and ongoing work beyond the selected package are quoted separately.'],
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
  variant = 'blue',
}: {
  children: string
  href: string
  variant?: 'blue' | 'outline' | 'light'
}) {
  const isExternal = href.startsWith('http')
  const classes =
    variant === 'outline'
      ? 'border border-mac text-mac hover:bg-mac hover:text-white'
      : variant === 'light'
        ? 'bg-paper text-ink hover:bg-white'
        : 'bg-mac text-white hover:bg-mac-hover'

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      className={`inline-flex min-h-[46px] items-center justify-center rounded-full px-5 py-3 text-center text-[13px] font-medium transition-colors ${classes}`}
    >
      {children}
    </a>
  )
}

function AvodahNav() {
  const [active, setActive] = useState('opportunity')

  useEffect(() => {
    const sections = navSections.map((section) => document.getElementById(section.id)).filter((section): section is HTMLElement => Boolean(section))
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
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 md:flex">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[11px] w-auto" />
          <span className="h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Avodah</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Employment search · v2</span>
          <span className="eyebrow">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
          <a href="#opportunity" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              Avodah
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={active === section.id ? 'text-ink' : 'transition-colors hover:text-ink'}>
                {section.label}
              </a>
            ))}
          </nav>
          <AnchorButton href={choosePackageHref}>Choose a package</AnchorButton>
        </div>
      </div>
    </>
  )
}

function Opportunity() {
  return (
    <section id="opportunity" className="border-b border-[var(--color-rule)] px-6 pb-20 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-[140px] lg:pt-[120px]">
      <MetaRow left="§ 01 - Opportunity" right="Avodah · Employment search" />
      <Reveal>
        <h1 className="display max-w-[1160px] py-16 text-[54px] leading-[58px] sm:text-[76px] sm:leading-[78px] md:text-[104px] md:leading-[100px] lg:text-[118px] lg:leading-[112px]">
          Turn employment search into a focused growth channel.
        </h1>
      </Reveal>
      <div className="grid gap-10 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-[1.15fr_480px] lg:gap-24">
        <Reveal>
          <h2 className="serif max-w-[700px] text-[31px] leading-[40px] md:text-[38px] md:leading-[47px]">
            Avodah has already seen what a focused employment site can produce. The next move is to rebuild that advantage with stronger research, a better home, and a clearer path from search to qualified inquiry.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-7">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Employment is the right first practice to develop because it has proven demand, a sophisticated audience, and a clear role inside the broader firm. This proposal gives Avodah three ways to move forward, from a decisive research sprint to a complete launch and the first 90 days of growth.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={choosePackageHref}>Choose a package</AnchorButton>
            <AnchorButton href={calendarHref} variant="outline">Schedule a proposal review</AnchorButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Recommendation() {
  return (
    <section id="recommendation" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 02 - Recommendation" right="One domain · One first practice" dark />
      <Reveal>
        <h2 className="display max-w-[1180px] py-16 text-[50px] leading-[54px] md:text-[78px] md:leading-[78px] lg:text-[94px] lg:leading-[92px]">
          Build employment inside Avodah, then let the evidence guide what comes next.
        </h2>
      </Reveal>
      <div className="grid gap-12 border-t border-paper/20 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal className="flex max-w-[620px] flex-col gap-6">
          <p className="serif text-[27px] italic leading-[38px]">
            Our starting recommendation is one employment search hub inside avodahlegal.com, likely under /employment.
          </p>
          <p className="text-[15px] leading-[24px] text-paper/70">
            This concentrates authority, keeps the brand connected, and gives future practice groups a shared system. A separate domain remains possible only if the research identifies a genuinely distinct audience and value proposition.
          </p>
        </Reveal>
        <Reveal className="grid gap-0 border-y border-paper/20">
          <div className="border-b border-paper/20 py-7">
            <span className="eyebrow text-paper/45">Search structure</span>
            <p className="mt-3 text-[15px] leading-[24px] text-paper/75">
              Google warns against similar websites or regional pages created mainly to capture more queries.{' '}
              <a href={doorwayGuidanceHref} target="_blank" rel="noreferrer" className="text-white underline decoration-paper/40 underline-offset-4 hover:decoration-white">
                Review the search guidance
              </a>.
            </p>
          </div>
          <div className="py-7">
            <span className="eyebrow text-paper/45">Location eligibility</span>
            <p className="mt-3 text-[15px] leading-[24px] text-paper/75">
              A separate Google Business Profile should only be pursued when the location has the required staffing, signage, and customer access.{' '}
              <a href={businessProfileGuidanceHref} target="_blank" rel="noreferrer" className="text-white underline decoration-paper/40 underline-offset-4 hover:decoration-white">
                Review the profile guidelines
              </a>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Packages() {
  return (
    <section id="packages" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 03 - Three ways to begin" right="Choose one package" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_430px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[780px] text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">Research first. Then choose how far to take it.</h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            Every option begins with the same research foundation. The difference is whether Avodah stops with the roadmap, launches the employment hub, or launches and actively grows it for the first 90 days.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid border-y border-[var(--color-rule)] lg:grid-cols-3">
        {packages.map((item, index) => (
          <article key={item.name} className={`flex min-w-0 flex-col p-7 sm:p-9 ${index < packages.length - 1 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''}`}>
            <div className="flex min-h-[92px] items-start justify-between gap-5">
              <div>
                <span className="eyebrow text-ink-2">Package {item.number}</span>
                {item.recommended ? <span className="mt-3 block w-fit bg-mac px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">Recommended</span> : null}
              </div>
              <span className="eyebrow text-ink-2">{item.timing}</span>
            </div>
            <h3 className="serif min-h-[98px] text-[38px] leading-[43px]">{item.name}</h3>
            <span className="display mt-3 text-[58px] leading-[62px]">{item.price}</span>
            {item.recommended ? <span className="mt-1 text-[12px] text-ink-2">Initial commitment</span> : <span className="mt-1 text-[12px] text-ink-2">Project fee</span>}
            <p className="min-h-[126px] border-b border-[var(--color-rule)] py-7 text-[14px] leading-[22px] text-ink-2">{item.summary}</p>
            <span className="eyebrow mt-7 text-ink-2">What Avodah gets</span>
            <div className="mt-5 flex flex-col gap-4">
              {item.outcomes.map((outcome) => (
                <div key={outcome} className="grid grid-cols-[16px_1fr] gap-3">
                  <span className="mt-[9px] h-px bg-[var(--color-rule)]" />
                  <span className="text-[14px] leading-[22px]">{outcome}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-9">
              <AnchorButton href={choosePackageHref} variant={item.recommended ? 'blue' : 'outline'}>Choose this package</AnchorButton>
            </div>
          </article>
        ))}
      </Reveal>
      <Reveal className="mt-8 border border-mac p-6 sm:p-8">
        <span className="eyebrow text-mac">Foundation credit</span>
        <p className="mt-4 max-w-[1000px] serif text-[25px] leading-[34px]">
          If Avodah selects Search Foundation first and upgrades within 30 days of delivery, the full $4,950 is credited toward either launch package.
        </p>
      </Reveal>
    </section>
  )
}

function IncludedWork() {
  return (
    <section id="included" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 - Included work" right="Research · Launch · Growth" />
      <Reveal>
        <h2 className="display max-w-[860px] py-16 text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">Each step produces something Avodah can use.</h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {workPhases.map((phase) => (
          <Reveal key={phase.number} className="grid gap-9 border-b border-[var(--color-rule)] py-11 lg:grid-cols-[92px_1fr_360px] lg:gap-14">
            <div>
              <span className="display block text-[62px] leading-none">{phase.number}</span>
              <span className="eyebrow mt-5 block text-mac">{phase.forPackages}</span>
            </div>
            <div className="max-w-[620px]">
              <h3 className="serif text-[36px] leading-[42px]">{phase.title}</h3>
              <p className="mt-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow mb-2 text-ink-2">Included</span>
              {phase.items.map((item) => (
                <div key={item} className="flex items-baseline gap-3">
                  <span className="h-px w-[10px] shrink-0 bg-[var(--color-rule)]" />
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
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 05 - Timeline" right="Three possible stopping points" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_430px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">Three weeks to clarity. Ten weeks to launch.</h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            Search Foundation ends after week three. Employment Search Launch continues through launch. Growth Launch continues for the first 90 days after the site is live.
          </p>
        </Reveal>
      </div>
      <Reveal className="border-y border-[var(--color-rule)]">
        {timelineRows.map(([when, phase, body], index) => (
          <div key={phase} className={`grid gap-4 py-7 md:grid-cols-[190px_280px_1fr] md:gap-8 ${index < timelineRows.length - 1 ? 'border-b border-[var(--color-rule)]' : ''}`}>
            <span className="eyebrow pt-2 text-ink-2">{when}</span>
            <span className="serif text-[25px] leading-[31px]">{phase}</span>
            <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 06 - Investment" right="One selected package" dark />
      <Reveal>
        <h2 className="display max-w-[900px] py-16 text-[54px] leading-[58px] md:text-[86px] md:leading-[86px]">Choose the level of commitment that fits now.</h2>
      </Reveal>
      <Reveal className="border-y border-paper/20">
        {packages.map((item, index) => (
          <div key={item.name} className={`grid gap-6 py-8 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px_420px] lg:items-center ${index < packages.length - 1 ? 'border-b border-paper/20' : ''}`}>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="serif text-[30px] leading-[36px]">{item.name}</h3>
                {item.recommended ? <span className="bg-mac px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">Recommended</span> : null}
              </div>
              <span className="mt-2 block text-[13px] text-paper/55">{item.timing}</span>
            </div>
            <span className="display text-[48px] leading-[52px] md:text-right lg:text-left">{item.price}</span>
            <p className="text-[13px] leading-[21px] text-paper/65 md:col-span-2 lg:col-span-1">{item.payment}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-10 grid gap-8 border border-paper/20 p-7 md:grid-cols-[1fr_340px] md:p-9">
        <div>
          <span className="eyebrow text-paper/50">After the first 90 days</span>
          <p className="serif mt-4 text-[27px] leading-[36px]">Continued SEO management is optional and month-to-month at $2,500.</p>
        </div>
        <div>
          <span className="eyebrow text-paper/50">Future practice hubs</span>
          <p className="mt-4 text-[14px] leading-[22px] text-paper/70">Transactional or traffic hubs can be offered later from $6,500 each using the shared Avodah system.</p>
        </div>
      </Reveal>
    </section>
  )
}

function Boundaries() {
  return (
    <section id="boundaries" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 07 - Boundaries" right="Clear scope · Clear decisions" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_430px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">Focused enough to measure. Flexible enough to grow.</h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            These packages are designed around one first practice. The research can map the wider opportunity, but execution stays focused on employment until the evidence supports the next investment.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid border-y border-[var(--color-rule)] md:grid-cols-2">
        {boundaries.map(([title, body], index) => (
          <div key={title} className={`min-h-[210px] p-7 sm:p-9 ${index < boundaries.length - 2 ? 'border-b border-[var(--color-rule)]' : ''} ${index % 2 === 0 ? 'md:border-r' : ''} ${index === boundaries.length - 2 ? 'border-b md:border-b-0' : ''}`}>
            <span className="eyebrow text-ink-2">B-{String(index + 1).padStart(2, '0')}</span>
            <h3 className="serif mt-6 text-[29px] leading-[35px]">{title}</h3>
            <p className="mt-4 text-[14px] leading-[22px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function NextStep() {
  return (
    <section id="next" className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 08 - Next step" right="Choose · Confirm · Begin" dark />
      <Reveal>
        <h2 className="display max-w-[1120px] py-16 text-[52px] leading-[56px] md:text-[86px] md:leading-[84px] lg:text-[100px] lg:leading-[96px]">
          Start with the package that matches the decision Avodah is ready to make.
        </h2>
      </Reveal>
      <div className="grid gap-12 border-t border-paper/20 pt-12 lg:grid-cols-[1fr_470px] lg:gap-24">
        <Reveal>
          <p className="serif max-w-[640px] text-[28px] italic leading-[39px] text-paper/85">
            Research creates the map. Launch turns it into a working search experience. Growth gives the system time to learn.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-6">
          <p className="text-[15px] leading-[24px] text-paper/70">
            Choose a package by email, or schedule a proposal review so we can compare the options and confirm the best starting point together.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={choosePackageHref}>Choose a package</AnchorButton>
            <AnchorButton href={calendarHref} variant="light">Schedule a proposal review</AnchorButton>
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
        <span className="eyebrow">Prepared for Avodah</span>
      </div>
      <div className="flex items-center gap-5">
        <span className="eyebrow">July 2026</span>
        <span className="eyebrow text-ink">Proposal · v2</span>
      </div>
    </footer>
  )
}

export function AvodahProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Avodah - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', 'An employment search strategy, website launch, and SEO growth proposal for Avodah from Anchovies.')
  }, [])

  return (
    <main className="avodah-proposal bg-paper text-ink">
      <AvodahNav />
      <Opportunity />
      <Recommendation />
      <Packages />
      <IncludedWork />
      <Timeline />
      <Investment />
      <Boundaries />
      <NextStep />
      <Footer />
    </main>
  )
}
