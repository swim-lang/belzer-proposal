import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const choosePackageHref =
  'mailto:sean@anchovies.agency?subject=Avodah%20program%20selection&body=Hi%20Sean%2C%0A%0AWe%27d%20like%20to%20move%20forward%20with%3A%20%5BResearch%20%2B%20Avodah%20Blog%20and%20Site%20Improvements%20%2F%20Research%20%2B%20Practice-Area%20Resource%20Site%20%2F%20The%20complete%20program%5D.%0A%0A'
const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const contractHref = '/proposal/avodah/contract'

type Package = {
  number: string
  name: string
  price: string
  timing: string
  badge: string
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
  'Keyword, competitor, search result, and content-gap research across employment, traffic and criminal, and corporate work',
  'Technical and content audit of avodahlegal.com',
  'Public benchmark review of vaemploymentlawyers.com',
  'Search Console, analytics, inquiry, and lead-quality baseline using first-party data',
  'Branded-search and audience architecture that protects Avodah as the primary firm experience',
  'Google Search, AI search, YouTube, and LinkedIn opportunity map',
  'Recommendation for what belongs on Avodah and what should become a focused resource site',
  'Rollout map for employment, traffic and criminal, and corporate practice areas',
]

const packages: Package[] = [
  {
    number: '01',
    name: 'Search Foundation',
    price: '$3,500',
    timing: '3 weeks',
    badge: 'Required',
    summary: 'Research the search landscape once, then use the evidence to decide what Avodah should build and where it should live.',
    outcomes: [
      'A research-backed opportunity map across three practice groups and multiple search channels',
      'A plan that protects Avodah branded search while creating focused paths for consumer demand',
      'A prioritized build sequence, baseline, and measurement plan grounded in first-party data',
    ],
    includes: [
      ...researchFoundation,
      'Practice-area keyword and page map',
      'Content architecture and internal-linking plan',
      'Google Search Console, analytics, inquiry, and lead-quality measurement plan',
      'Implementation roadmap and measurement baseline',
    ],
    payment: 'Selected $8,000 engagement: 50% at project kickoff ($4,000), then 50% at project completion ($4,000).',
  },
  {
    number: '02',
    name: 'Avodah Blog + Site Improvements',
    price: '$4,500',
    timing: '6 to 8 weeks',
    badge: 'Site + content',
    summary: "Design and code Avodah's first blog, publish a substantial launch library, and make focused improvements without blurring the firm's premium positioning.",
    outcomes: [
      'A newly designed and developed blog that does not exist on the current Avodah site today',
      'Fifty concise, research-backed articles allocated across priority practice groups',
      'Focused usability, conversion, technical, and practice-page improvements around the existing firm experience',
    ],
    includes: [
      'Built from the approved Search Foundation',
      'Blog strategy, responsive design, Framer development, CMS, and article templates',
      'Focused improvements to Avodah practice pages, conversion paths, and technical structure',
      'Fifty original, attorney-reviewed articles with source notes',
      'Topic clusters, tags, search, and internal linking',
      'Listen to this article audio experience across the library',
      'Author and reviewer attribution, article schema, AI-search structure, and metadata',
      'Main Avodah Google Business Profile setup and Norfolk office addition once details are supplied',
      'Avodah-owned shared marketing account setup for platform access',
      'Analytics, inquiry events, responsive QA, and publishing',
    ],
    payment: 'Selected $8,000 engagement: 50% at project kickoff ($4,000), then 50% at project completion ($4,000).',
  },
  {
    number: '03',
    name: 'Practice-Area Resource Site',
    price: '$10,500',
    timing: '8 to 10 weeks',
    badge: 'Primary build',
    summary: 'Create the first focused seven-page destination, launch it with its own deep content library, then use the system as the foundation for future practice-area sites.',
    outcomes: [
      'A complete educational sister site with its own role, name, and visual direction, with employment as the assumed first focus',
      'Twenty-five original cornerstone guides and answers, plus a substantial collection of tools and trusted resources',
      'A reusable system for future traffic and criminal or corporate sites without producing identical copies',
    ],
    includes: [
      'Built from the approved Search Foundation',
      'Seven adaptable core pages: Home, Start Here, Common Problems, Rights and Options, Guides and Answers, Resource Directory, and About and Get Help',
      'Focused naming and visual direction',
      'Twenty-five original, research-backed cornerstone guides with source notes and attorney review',
      'Up to seventy-five curated government, nonprofit, and authoritative resources with summaries and topic tags',
      'Plain-language glossary of up to one hundred terms for the selected practice area',
      'Six practical checklists and decision guides',
      'Connections to relevant Avodah articles without duplicating them',
      'Reusable practice-area design and CMS system with room for each future site to vary',
      'Responsive Framer design and development',
      'CMS, technical SEO, analytics, forms, QA, and launch',
    ],
    payment: '50% at site kickoff ($5,250), 25% after design approval ($2,625), then 25% before launch ($2,625).',
  },
]

const workPhases = [
  {
    number: '01',
    title: 'Research the landscape.',
    forPackages: 'Required foundation',
    body: 'We begin with evidence across employment, traffic and criminal, and corporate work. The research measures current performance, maps demand, evaluates Google and AI search, and protects the role of the main Avodah site.',
    items: researchFoundation,
  },
  {
    number: '02',
    title: "Build Avodah's first blog.",
    forPackages: 'Blog + improvements',
    body: 'Avodah does not have a current blog, so this includes the strategy, design, coding, CMS, and article experience from the ground up. We also make focused improvements without turning the firm website into a consumer-law destination.',
    items: [
      'Responsive blog design and Framer development',
      'Fifty original, attorney-reviewed practice-area articles with source notes',
      'Searchable and filterable knowledge library and CMS',
      'Listen to this article audio across the library',
      'Topic clusters, internal links, authorship, article schema, and AI-search structure',
      'General site improvements, main Google Business Profile setup, Norfolk office update, analytics, QA, and publishing',
    ],
  },
  {
    number: '03',
    title: 'Build a destination of its own.',
    forPackages: 'Resource site',
    body: 'The sister site is the primary new build. It combines a complete website with an original content library, curated sources, and practical tools. Employment is the assumed first focus, and the system can support distinct traffic and criminal or corporate versions later.',
    items: [
      'Seven adaptable core pages: Home, Start Here, Common Problems, Rights and Options, Guides and Answers, Resource Directory, and About and Get Help',
      'Twenty-five original cornerstone guides and answers with source notes and attorney review',
      'Up to seventy-five curated resources with summaries and topic tags',
      'Plain-language glossary of up to one hundred terms',
      'Six practical checklists and decision guides',
      'Search, filters, distinct naming, visual direction, reusable CMS system, and launch',
    ],
  },
]

const timelineRows = [
  ['Weeks 1 to 3', 'Foundation', 'Research three practice groups, audit current performance, establish the first-party baseline, protect branded search, and recommend the build sequence and channels.'],
  ['Weeks 4 to 6', 'Systems and direction', 'Design and develop the new Avodah blog, confirm both content frameworks, establish the source and review process, and design the first practice-area site if selected.'],
  ['Weeks 7 to 10', 'Content and development', 'Produce the Avodah article library and sister-site guides, improve the main site, build the resource experience, and connect search, audio, AI-search structure, analytics, and inquiry paths.'],
  ['Weeks 11 to 12', 'Review and launch', 'Complete attorney review, responsive QA, final publishing, measurement setup, and launch for the selected destination or destinations.'],
]

const boundaries = [
  ['Rankings', 'Search rankings, traffic, leads, and business outcomes cannot be guaranteed. The work is designed to improve the quality of the inputs and the clarity of the decisions.'],
  ['Master-brand protection', 'Avodah remains the primary branded-search and firm-credibility experience. Consumer-practice content will not take over the main navigation, homepage message, or premium-client journey.'],
  ['Review and access', 'Avodah attorneys provide subject-matter review and timely approvals. Avodah also provides an owned marketing account and necessary platform access so Anchovies can handle setup, production, and publishing with minimal lift from the firm.'],
  ['Repeatable, not identical', 'Future practice-area sites can reuse the first site system, but each requires its own audience, content, structure, and distinguishing details. Additional launches are scoped after the first system is proven.'],
  ['Channels and profiles', 'Main Google Business Profile facilitation and the Norfolk office update are included. YouTube and LinkedIn opportunity analysis is included in research, while ongoing video and social production are quoted separately.'],
  ['Added scope', 'Paid media, paid links, sponsorships, pages beyond the seven-page resource site, custom applications, premium software, ongoing content, and media production beyond the article audio system are quoted separately.'],
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
          <span className="eyebrow text-ink-2">Practice-area search · v6</span>
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
          <AnchorButton href={contractHref}>Review contract</AnchorButton>
        </div>
      </div>
    </>
  )
}

function Opportunity() {
  return (
    <section id="opportunity" className="border-b border-[var(--color-rule)] px-6 pb-20 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-[140px] lg:pt-[120px]">
      <MetaRow left="§ 01 - Opportunity" right="Avodah · Practice-area search" />
      <Reveal>
        <h1 className="display max-w-[1160px] py-16 text-[48px] leading-[52px] sm:text-[64px] sm:leading-[68px] md:text-[84px] md:leading-[86px] lg:text-[96px] lg:leading-[96px]">
          Grow search without making Avodah look like a consumer law firm.
        </h1>
      </Reveal>
      <div className="grid gap-10 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-[1.15fr_480px] lg:gap-24">
        <Reveal>
          <h2 className="serif max-w-[700px] text-[31px] leading-[40px] md:text-[38px] md:leading-[47px]">
            The main site should remain the clearest expression of Avodah, its attorneys, and the sophisticated clients who already drive the firm. Search growth should add focused paths around that foundation, not change what the firm looks like at its center.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-7">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Employment and traffic or criminal work create the clearest near-term consumer-search opportunities. Corporate work may follow differently. Research will show what belongs quietly inside Avodah, what deserves a focused resource site, and which channels can create useful demand without confusing branded search.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={contractHref}>Review contract</AnchorButton>
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
      <MetaRow left="§ 02 - Recommendation" right="Protect the center · Build focused edges" dark />
      <Reveal>
        <h2 className="display max-w-[1180px] py-16 text-[50px] leading-[54px] md:text-[78px] md:leading-[78px] lg:text-[94px] lg:leading-[92px]">
          Keep Avodah primary. Build focused search systems around it.
        </h2>
      </Reveal>
      <div className="grid gap-12 border-t border-paper/20 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <Reveal className="flex max-w-[620px] flex-col gap-6">
          <p className="serif text-[27px] italic leading-[38px]">
            Branded search should continue to lead to the firm, its people, and the credibility sophisticated clients expect.
          </p>
          <p className="text-[15px] leading-[24px] text-paper/70">
            Focused practice-area sites can pursue a different job. They can answer questions, define terms, organize trusted resources, and create a useful path for people who begin with a problem instead of a firm name.
          </p>
        </Reveal>
        <Reveal className="grid gap-0 border-y border-paper/20">
          <div className="border-b border-paper/20 py-7">
            <span className="eyebrow text-paper/45">Layer A · Avodah blog + improvements</span>
            <p className="mt-3 text-[15px] leading-[24px] text-paper/75">
              A new blog designed and coded from scratch, fifty articles, focused site improvements, the main Google Business Profile, and better measurement without crowding the premium firm experience.
            </p>
          </div>
          <div className="py-7">
            <span className="eyebrow text-paper/45">Layer B · Primary sister-site build</span>
            <p className="mt-3 text-[15px] leading-[24px] text-paper/75">
              A complete website and original content library for the first priority practice, plus a reusable system for traffic and criminal or corporate versions later.
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
      <MetaRow left="§ 03 - Program structure" right="One foundation · Two build layers" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_430px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[780px] text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">Research is required. What gets built next is the choice.</h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            Start with the Search Foundation. Then build Avodah's first blog with fifty articles and focused site improvements, commission the more substantial practice-area resource site, or do both as one coordinated program.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid border-y border-[var(--color-rule)] lg:grid-cols-3">
        {packages.map((item, index) => (
          <article key={item.name} className={`flex min-w-0 flex-col p-7 sm:p-9 ${index < packages.length - 1 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''}`}>
            <div className="flex min-h-[92px] items-start justify-between gap-5">
              <div>
                <span className="eyebrow text-ink-2">Package {item.number}</span>
                <span className="mt-3 block w-fit bg-mac px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">{item.badge}</span>
              </div>
              <span className="eyebrow text-ink-2">{item.timing}</span>
            </div>
            <h3 className="serif min-h-[98px] text-[38px] leading-[43px]">{item.name}</h3>
            <span className="display mt-3 text-[58px] leading-[62px]">{item.price}</span>
            <span className="mt-1 text-[12px] text-ink-2">{item.number === '01' ? 'Project fee' : 'Build-layer fee'}</span>
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
              <AnchorButton href={choosePackageHref} variant={item.number === '01' ? 'blue' : 'outline'}>Choose a direction</AnchorButton>
            </div>
          </article>
        ))}
      </Reveal>
      <Reveal className="mt-8 border border-mac p-6 sm:p-8">
        <span className="eyebrow text-mac">How the choices work</span>
        <p className="mt-4 max-w-[1000px] serif text-[25px] leading-[34px]">
          Search Foundation is required. Add the Avodah Blog + Site Improvements, the Practice-Area Resource Site, or both. The complete program is $18,500.
        </p>
      </Reveal>
    </section>
  )
}

function IncludedWork() {
  return (
    <section id="included" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 - Included work" right="Research · Blog + improvements · Sister site" />
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
      <MetaRow left="§ 05 - Timeline" right="Research first · Builds can overlap" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_430px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[820px] text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">Three weeks to clarity. Up to twelve weeks for the complete program.</h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            Research comes first. The Avodah library and educational resource site can then move together, with timing dependent on timely access, feedback, and attorney review.
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
      <MetaRow left="§ 06 - Investment" right="Required foundation · Flexible build" dark />
      <Reveal>
        <h2 className="display max-w-[1020px] py-16 text-[54px] leading-[58px] md:text-[86px] md:leading-[86px]">Start with research. Choose one destination or build both.</h2>
      </Reveal>
      <Reveal className="border-y border-paper/20">
        {packages.map((item, index) => (
          <div key={item.name} className={`grid gap-6 py-8 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px_420px] lg:items-center ${index < packages.length - 1 ? 'border-b border-paper/20' : ''}`}>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="serif text-[30px] leading-[36px]">{item.name}</h3>
                <span className="bg-mac px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">{item.badge}</span>
              </div>
              <span className="mt-2 block text-[13px] text-paper/55">{item.timing}</span>
            </div>
            <span className="display text-[48px] leading-[52px] md:text-right lg:text-left">{item.price}</span>
            <p className="text-[13px] leading-[21px] text-paper/65 md:col-span-2 lg:col-span-1">{item.payment}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-10 grid gap-8 border border-paper/20 p-7 md:grid-cols-3 md:p-9">
        <div>
          <span className="eyebrow text-paper/50">Avodah path</span>
          <p className="serif mt-4 text-[27px] leading-[36px]">Research plus the Avodah blog and improvements: $8,000. Pay $4,000 at kickoff and $4,000 at completion.</p>
        </div>
        <div>
          <span className="eyebrow text-paper/50">Resource-site path</span>
          <p className="serif mt-4 text-[27px] leading-[36px]">Research plus the sister site and launch content: $14,000.</p>
        </div>
        <div>
          <span className="eyebrow text-paper/50">Complete program</span>
          <p className="serif mt-4 text-[27px] leading-[36px]">Research and both build layers: $18,500.</p>
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
            The program begins with three practice groups and one protected master brand. Research defines the priority order, selected build layers define the deliverables, and Avodah review protects quality across every page.
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
      <MetaRow left="§ 08 - Next step" right="Review · Sign · Begin" dark />
      <Reveal>
        <h2 className="display max-w-[1120px] py-16 text-[52px] leading-[56px] md:text-[86px] md:leading-[84px] lg:text-[100px] lg:leading-[96px]">
          Begin with research. Then put the findings to work on Avodah.
        </h2>
      </Reveal>
      <div className="grid gap-12 border-t border-paper/20 pt-12 lg:grid-cols-[1fr_470px] lg:gap-24">
        <Reveal>
          <p className="serif max-w-[640px] text-[28px] italic leading-[39px] text-paper/85">
            The first engagement covers the Search Foundation, Avodah's first blog, fifty articles, and focused improvements to the existing website.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-6">
          <p className="text-[15px] leading-[24px] text-paper/70">
            Review and sign the contract to begin. The separate practice-area resource site can be added later once the first phase is underway.
          </p>
          <div className="flex flex-wrap gap-3">
            <AnchorButton href={contractHref}>Review contract</AnchorButton>
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
        <span className="eyebrow text-ink">Proposal · v6</span>
      </div>
    </footer>
  )
}

export function AvodahProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Avodah - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', 'A practice-area search research, Avodah blog, site-improvement, and reusable sister-site proposal from Anchovies.')
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
