import { useEffect, useMemo, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const acceptHref =
  'mailto:sean@anchovies.agency?subject=New%20Line%20Custom%20Interiors%20Website%20Proposal&body=Sean%2C%0A%0AI%27d%20like%20to%20move%20forward%20with%20the%20New%20Line%20Custom%20Interiors%20website.%0A%0AThanks%2C%0ABrad'
const workHref = 'https://anchovies.agency/work'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'website', label: 'Website' },
  { id: 'search', label: 'Search' },
  { id: 'scope', label: 'Scope' },
  { id: 'value', label: 'Value' },
  { id: 'investment', label: 'Investment' },
]

const outcomes = [
  ['01', 'Premium', 'Present New Line as the considered choice for custom homes and substantial residential projects.'],
  ['02', 'Clear', 'Give visitors a direct understanding of the work, the process, and why New Line is the right company to call.'],
  ['03', 'Visible', 'Build a stronger foundation for local search, traditional search, and AI-assisted discovery.'],
  ['04', 'Useful', 'Turn the portfolio into proof and give qualified prospects a clear path to start a conversation.'],
]

const pages = [
  ['01', 'Home', 'A premium introduction to New Line, its capabilities, and the fastest path to an inquiry.'],
  ['02', 'Custom Homes', 'A dedicated case for ground-up residential work, from first conversation through completion.'],
  ['03', 'Remodeling + Interiors', 'A focused overview of kitchens, bathrooms, basements, additions, and substantial interior work.'],
  ['04', 'Projects', 'A visual portfolio organized around the quality, range, and details of the work.'],
  ['05', 'Process', 'A clear explanation of what clients can expect before, during, and after construction.'],
  ['06', 'About', 'Your experience, the company, and the standards behind the work.'],
  ['07', 'Contact', 'A concise qualification and inquiry experience for the next right-fit project.'],
]

const searchLayers = [
  {
    title: 'Local search foundation',
    body: 'Clear Aurora and Colorado service signals, page metadata, internal links, local business schema, Search Console, and a practical recommendation for the Google Business Profile.',
  },
  {
    title: 'Project-led authority',
    body: 'Projects become useful search content through location, project type, services, constraints, and outcomes, instead of sitting in an image gallery without context.',
  },
  {
    title: 'AI discovery readiness',
    body: 'Crawlable service facts, project detail, structured data, clear answers, and consistent company information help search engines and AI tools understand when New Line is relevant.',
  },
]

const scope = [
  {
    num: '01',
    title: 'Direction + architecture',
    body: 'Define the website structure, priority audiences, conversion paths, and the clearest way to introduce custom homes without losing the remodeling business.',
    items: ['Focused kickoff', 'Current-site content audit', 'Page architecture', 'Conversion plan', 'Project-content plan'],
  },
  {
    num: '02',
    title: 'Design + copy',
    body: 'Create a tailored visual direction and rewrite the agreed website copy so the work feels premium, specific, and easy to understand.',
    items: ['Custom responsive design', 'Seven core pages', 'Conversion-focused copy', 'Portfolio art direction', 'Calls to action'],
  },
  {
    num: '03',
    title: 'Development + launch',
    body: 'Build a fast custom website outside WordPress, prepare the priority project content, and handle the technical details required for launch.',
    items: ['Custom codebase', 'Project editing tools', 'Up to 10 priority projects', 'Forms and analytics', 'Redirects, QA, and launch'],
  },
  {
    num: '04',
    title: 'Search foundation',
    body: 'Build the site so people, search engines, and AI-assisted tools can understand the company, the services, the locations, and the proof behind them.',
    items: ['On-page SEO', 'Local business schema', 'Service and project metadata', 'Search Console setup', 'AI discovery structure'],
  },
]

const timeline = [
  ['Days 01–03', 'Align + organize', 'Kickoff, site audit, page architecture, project selection, and creative direction.'],
  ['Days 04–08', 'Design + build', 'Responsive design, copywriting, development, project system, and first working review.'],
  ['Days 09–10', 'Refine + launch', 'Feedback, responsive QA, search setup, redirects, domain connection, and public launch.'],
]

const boundaries = [
  ['Content', 'The scope includes copywriting for the seven core pages and entry of up to 10 priority projects. You supply accurate project facts, approvals, and available photography.'],
  ['Photography', 'Image selection, sequencing, and light web preparation are included. New photography production, extensive retouching, and licensing are not included.'],
  ['Search', 'The site will follow strong technical, local, and AI-discovery practices. Search rankings, AI citations, traffic, inquiries, and project wins cannot be guaranteed.'],
  ['Timing', 'The two-week schedule assumes timely access, content, and feedback. Client delays move the launch date without changing the scope.'],
  ['Extensions', 'New branding, ongoing SEO, paid media, long-form content production, additional pages, and major custom software can be scoped separately.'],
]

function Button({ children, href, variant = 'primary' }: { children: string; href: string; variant?: 'primary' | 'outline' | 'light' }) {
  const external = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
        ? 'border border-[var(--color-rule)] text-ink hover:bg-ink hover:text-paper'
        : 'bg-mac text-white hover:bg-mac-hover'

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-center text-[13px] font-medium transition-colors ${classes}`}
    >
      {children}
    </a>
  )
}

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 pb-12 sm:flex-row sm:gap-8 lg:pb-16">
      <span className={`eyebrow ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow sm:text-right ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{right}</span>
    </div>
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
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-10 py-4 md:flex lg:px-[96px]">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Brad Drummond</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Website proposal</span>
          <span className="eyebrow">August 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-5 py-4 md:px-10 lg:px-[96px]">
          <a href="#overview" className="flex min-w-0 items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto shrink-0" />
            <span className="hidden truncate text-[13px] text-ink-2 sm:inline"><span className="text-ink">Anchovies</span> x New Line</span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 2xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <Button href={acceptHref}>Start the website</Button>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-5 pb-16 pt-20 md:px-10 md:pt-28 lg:px-[96px] lg:pb-24 lg:pt-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-5 pb-16 md:flex-row md:items-start md:justify-between lg:pb-24">
          <Reveal className="flex flex-col gap-1.5">
            <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
            <span className="eyebrow">Custom website + search foundation</span>
          </Reveal>
          <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
            <span className="eyebrow text-ink-2">New Line Custom Interiors</span>
            <span className="eyebrow text-ink-2">Aurora, Colorado</span>
          </Reveal>
        </div>

        <Reveal>
          <h1 className="display max-w-[1180px] pb-12 text-[54px] leading-[58px] sm:text-[72px] sm:leading-[76px] md:text-[94px] md:leading-[98px] lg:pb-16 lg:text-[116px] lg:leading-[118px]">
            A website built for the projects New Line wants next.
          </h1>
        </Reveal>

        <div className="grid gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <Reveal>
            <h2 className="serif max-w-[720px] text-[28px] leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[42px] lg:leading-[50px]">
              A fresh custom website that adds custom homes, presents the work at a higher level, and gives New Line a stronger path to qualified local inquiries.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[500px] flex-col gap-6">
            <p className="text-[15px] leading-[24px] text-ink-2">
              The current website has served the company since 2014. This proposal replaces it with a faster, clearer, mobile-first site designed around the work New Line does now and the work you want to do next.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button href={acceptHref}>Start the website</Button>
              <Button href={calendarHref} variant="outline">Review together</Button>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="flex items-center justify-between gap-8 pb-7">
            <span className="eyebrow text-ink-2">Fig. 01 - What the new site changes</span>
            <span className="eyebrow text-right text-ink-2">Four outcomes</span>
          </div>
          <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
            {outcomes.map(([num, title, body], index) => (
              <div
                key={title}
                className={`flex min-h-[244px] flex-col p-7 md:p-9 ${index < 3 ? 'border-b border-[var(--color-rule)] xl:border-b-0 xl:border-r' : ''} ${index === 0 || index === 2 ? 'md:border-r' : ''} ${index === 1 ? 'md:border-r-0' : ''} ${index === 2 ? 'md:border-b-0' : ''}`}
              >
                <span className="eyebrow text-ink-2">{num}</span>
                <h3 className="serif mt-auto pt-10 text-[38px] leading-[42px]">{title}</h3>
                <p className="pt-5 text-[13px] leading-[20px] text-ink-2">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Opportunity() {
  return (
    <section id="opportunity" className="border-b border-[var(--color-rule)] px-5 py-20 md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 02 - The opportunity" right="A new level of work" />
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24">
          <Reveal>
            <h2 className="display max-w-[820px] text-[52px] leading-[56px] md:text-[78px] md:leading-[82px] lg:text-[92px] lg:leading-[96px]">
              Make the public presentation match the quality of the work.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[520px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
            <p>
              New Line is expanding into custom homes. The website needs to make that capability clear while keeping remodeling and interiors visible as meaningful parts of the business.
            </p>
            <p className="text-ink-2">
              The current site relies on category conventions, general claims, and a gallery that gives visitors limited context. The new site will lead with real project proof, a more considered point of view, and clear information about how you work.
            </p>
            <p className="text-ink-2">
              That shift supports a premium position. The goal is to help the right clients understand the value before they compare New Line only on price.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 grid overflow-hidden border border-[var(--color-rule)] lg:mt-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-h-[340px] bg-[url('https://newlinecustominteriors.com/wp-content/uploads/2014/12/modern-rustic-contemporary-basement-cleveland.jpg')] bg-cover bg-center lg:min-h-[520px]" role="img" aria-label="New Line Custom Interiors project imagery" />
          <div className="flex flex-col justify-between gap-16 border-t border-[var(--color-rule)] p-8 md:p-12 lg:border-l lg:border-t-0 lg:p-14">
            <div>
              <span className="eyebrow text-ink-2">The shift</span>
              <blockquote className="serif max-w-[560px] pt-7 text-[38px] leading-[44px] md:text-[52px] md:leading-[58px]">
                From a broad remodeling website to a clear case for premium residential work.
              </blockquote>
            </div>
            <div className="grid gap-4 border-t border-[var(--color-rule)] pt-6 sm:grid-cols-3">
              <span className="text-[13px] leading-[20px]">Custom homes added</span>
              <span className="text-[13px] leading-[20px]">Projects explained</span>
              <span className="text-[13px] leading-[20px]">Inquiries qualified</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Website() {
  return (
    <section id="website" className="border-b border-[var(--color-rule)] bg-ink px-5 py-20 text-paper md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 03 - The website" right="Seven core pages" dark />
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-24 lg:pb-24">
          <Reveal>
            <h2 className="display max-w-[820px] text-[52px] leading-[56px] md:text-[78px] md:leading-[82px] lg:text-[92px] lg:leading-[96px]">
              One clear home for custom building, remodeling, and project proof.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[520px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-paper/65">
            <p className="text-paper">
              The website will be designed and coded specifically for New Line. It will be fast, responsive, easy to navigate, and built around the questions a qualified residential client needs answered.
            </p>
            <p>
              You will have a focused way to update projects, testimonials, and selected core content without returning to WordPress or editing code.
            </p>
          </Reveal>
        </div>

        <Reveal className="border-t border-paper/25">
          {pages.map(([num, title, body]) => (
            <div key={num} className="grid gap-4 border-b border-paper/20 py-8 md:grid-cols-[80px_0.72fr_1.28fr] md:items-center md:gap-10">
              <span className="eyebrow text-paper/55">{num}</span>
              <h3 className="serif text-[31px] leading-[36px] md:text-[38px] md:leading-[42px]">{title}</h3>
              <p className="max-w-[620px] text-[14px] leading-[22px] text-paper/60">{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Search() {
  return (
    <section id="search" className="border-b border-[var(--color-rule)] px-5 py-20 md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 04 - Search foundation" right="Local + traditional + AI-assisted" />
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <Reveal>
            <h2 className="display max-w-[760px] text-[52px] leading-[56px] md:text-[78px] md:leading-[82px] lg:text-[90px] lg:leading-[94px]">
              Make New Line easier to understand and easier to find.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[520px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
            <p className="text-ink">
              Search visibility starts with clarity. The site will state who New Line serves, where it works, what it builds, and what proves its experience in language that clients and search systems can understand.
            </p>
            <p>
              This does not promise an immediate ranking. It gives New Line a technically strong, locally relevant foundation that can compound as more projects and useful content are added.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-16 grid border-y border-[var(--color-rule)] lg:mt-24 lg:grid-cols-3">
          {searchLayers.map((item, index) => (
            <div key={item.title} className={`flex min-h-[300px] flex-col p-8 md:p-10 ${index < searchLayers.length - 1 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''}`}>
              <span className="eyebrow text-ink-2">0{index + 1}</span>
              <h3 className="serif mt-auto pt-12 text-[34px] leading-[39px]">{item.title}</h3>
              <p className="pt-5 text-[14px] leading-[22px] text-ink-2">{item.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function Scope() {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-5 py-20 md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 05 - Included work" right="One complete website" />
        <Reveal>
          <h2 className="display max-w-[960px] pb-16 text-[52px] leading-[56px] md:text-[78px] md:leading-[82px] lg:pb-24 lg:text-[94px] lg:leading-[98px]">
            Everything needed to move from the current site to a stronger public presence.
          </h2>
        </Reveal>
        <div className="grid border-y border-[var(--color-rule)] lg:grid-cols-2">
          {scope.map((item, index) => (
            <Reveal key={item.num} className={`flex min-h-[420px] flex-col p-8 md:p-12 ${index < 2 ? 'border-b border-[var(--color-rule)]' : ''} ${index % 2 === 0 ? 'lg:border-r' : ''}`}>
              <span className="eyebrow text-ink-2">{item.num}</span>
              <h3 className="serif pt-8 text-[38px] leading-[43px] md:text-[48px] md:leading-[53px]">{item.title}</h3>
              <p className="max-w-[520px] pt-5 text-[14px] leading-[22px] text-ink-2">{item.body}</p>
              <ul className="mt-auto grid gap-3 pt-10 text-[13px] leading-[20px] sm:grid-cols-2">
                {item.items.map((line) => <li key={line} className="border-t border-[var(--color-rule)] pt-3">{line}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCalculator() {
  const [projectValue, setProjectValue] = useState(250000)
  const websiteCost = 6500
  const investmentShare = useMemo(() => (websiteCost / projectValue) * 100, [projectValue])
  const revenueMultiple = useMemo(() => projectValue / websiteCost, [projectValue])

  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <section id="value" className="border-b border-[var(--color-rule)] bg-paper px-5 py-20 md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 06 - A simple value illustration" right="Transparent project math" />
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end lg:gap-20">
          <Reveal>
            <h2 className="display max-w-[720px] text-[52px] leading-[56px] md:text-[78px] md:leading-[82px] lg:text-[90px] lg:leading-[94px]">
              One right-fit project can put the website cost in perspective.
            </h2>
            <p className="mt-7 max-w-[560px] text-[15px] leading-[24px] text-ink-2">
              Use your typical project value below. This compares gross project value with the website investment. It is not a profit calculation or a promise that the website will produce a specific lead.
            </p>
          </Reveal>

          <Reveal className="border border-[var(--color-rule)] bg-paper">
            <div className="border-b border-[var(--color-rule)] p-7 md:p-10">
              <label htmlFor="project-value" className="eyebrow text-ink-2">Illustrative project value</label>
              <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <span className="display text-[64px] leading-none md:text-[78px]">{money.format(projectValue)}</span>
                <span className="text-[12px] leading-[18px] text-ink-2 sm:max-w-[180px] sm:text-right">Adjust this to reflect a typical New Line project.</span>
              </div>
              <input
                id="project-value"
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={projectValue}
                onChange={(event) => setProjectValue(Number(event.target.value))}
                className="mt-8 h-2 w-full cursor-pointer accent-[var(--color-mac)]"
              />
              <div className="mt-3 flex justify-between text-[11px] text-ink-2"><span>$10K</span><span>$1M</span></div>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="border-b border-[var(--color-rule)] p-7 md:border-b-0 md:border-r md:p-10">
                <span className="eyebrow text-ink-2">Website as share of one project</span>
                <span className="display mt-7 block text-[58px] leading-none">{investmentShare.toFixed(1)}%</span>
                <p className="mt-4 text-[13px] leading-[20px] text-ink-2">The $6,500 website is {investmentShare.toFixed(1)}% of a {money.format(projectValue)} project.</p>
              </div>
              <div className="p-7 md:p-10">
                <span className="eyebrow text-ink-2">Gross project value multiple</span>
                <span className="display mt-7 block text-[58px] leading-none">{revenueMultiple.toFixed(1)}x</span>
                <p className="mt-4 text-[13px] leading-[20px] text-ink-2">One project at this value represents {revenueMultiple.toFixed(1)} times the website investment in gross revenue.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-5 py-20 md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 07 - Investment + delivery" right="Two weeks" />
        <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <Reveal>
            <span className="eyebrow text-ink-2">Total investment</span>
            <span className="display mt-7 block text-[76px] leading-none md:text-[92px]">$6,500</span>
            <p className="mt-6 max-w-[400px] text-[15px] leading-[24px] text-ink-2">
              One complete custom website, designed, developed, prepared for search, and launched in approximately two weeks.
            </p>
          </Reveal>
          <Reveal className="border-t border-[var(--color-rule)]">
            {[
              ['50%', 'At kickoff', '$3,250'],
              ['50%', 'At launch', '$3,250'],
            ].map(([percent, label, amount]) => (
              <div key={label} className="grid gap-3 border-b border-[var(--color-rule)] py-7 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:gap-8">
                <span className="eyebrow text-ink-2">{percent}</span>
                <span className="serif text-[27px] leading-[32px]">{label}</span>
                <span className="text-[15px] font-medium sm:text-right">{amount}</span>
              </div>
            ))}
            <p className="pt-6 text-[13px] leading-[21px] text-ink-2">The final payment is due when the agreed website is launch-ready and before public launch, domain connection, and final handoff.</p>
          </Reveal>
        </div>

        <Reveal className="mt-16 border-t border-[var(--color-rule)] lg:mt-24">
          {timeline.map(([time, title, body]) => (
            <div key={time} className="grid gap-4 border-b border-[var(--color-rule)] py-8 md:grid-cols-[150px_0.72fr_1.28fr] md:items-center md:gap-10">
              <span className="eyebrow text-ink-2">{time}</span>
              <h3 className="serif text-[30px] leading-[35px]">{title}</h3>
              <p className="max-w-[620px] text-[14px] leading-[22px] text-ink-2">{body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] bg-ink px-5 py-20 text-paper md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 08 - Selected work" right="Anchovies" dark />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-24">
          <Reveal>
            <h2 className="display max-w-[800px] text-[52px] leading-[56px] md:text-[78px] md:leading-[82px] lg:text-[92px] lg:leading-[96px]">
              Websites built to make good work easier to recognize.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[500px] flex-col items-start gap-6">
            <p className="text-[15px] leading-[24px] text-paper/65">
              Anchovies combines positioning, design, copy, and custom development so the final site feels specific to the business and useful to the people it needs to reach.
            </p>
            <Button href={workHref} variant="light">View our work</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Boundaries() {
  return (
    <section className="border-b border-[var(--color-rule)] px-5 py-20 md:px-10 lg:px-[96px] lg:py-[112px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 09 - Working boundaries" right="Clear enough to move quickly" />
        <div className="border-t border-[var(--color-rule)]">
          {boundaries.map(([title, body]) => (
            <Reveal key={title} className="grid gap-4 border-b border-[var(--color-rule)] py-7 md:grid-cols-[0.72fr_1.28fr] md:gap-12">
              <h3 className="serif text-[27px] leading-[32px]">{title}</h3>
              <p className="max-w-[720px] text-[14px] leading-[22px] text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="px-5 py-20 md:px-10 lg:px-[96px] lg:py-[128px]">
      <div className="mx-auto max-w-[1280px]">
        <MetaRow left="§ 10 - Next step" right="Ready when you are" />
        <Reveal>
          <h2 className="display max-w-[1040px] text-[54px] leading-[58px] md:text-[82px] md:leading-[86px] lg:text-[106px] lg:leading-[108px]">
            Build the website around the projects New Line wants more of.
          </h2>
        </Reveal>
        <Reveal className="mt-12 grid gap-10 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1fr_0.7fr] lg:items-end lg:gap-24">
          <p className="serif max-w-[760px] text-[28px] leading-[36px] md:text-[36px] md:leading-[44px]">
            Approve the proposal by email, or schedule a short review to walk through the scope together.
          </p>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button href={acceptHref}>Start the website</Button>
            <Button href={calendarHref} variant="outline">Review together</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function NewLineCustomInteriorsProposal() {
  useEffect(() => {
    document.title = 'Anchovies x New Line Custom Interiors - Website Proposal'
  }, [])

  return (
    <div className="new-line-custom-interiors-proposal min-h-screen bg-paper text-ink">
      <ProposalNav />
      <main>
        <Hero />
        <Opportunity />
        <Website />
        <Search />
        <Scope />
        <ValueCalculator />
        <Investment />
        <SelectedWork />
        <Boundaries />
        <Closing />
      </main>
      <footer className="border-t border-[var(--color-rule)] px-5 py-8 md:px-10 lg:px-[96px]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[12px] w-auto self-start" />
          <span className="eyebrow text-ink-2">New Line Custom Interiors · August 2026</span>
        </div>
      </footer>
    </div>
  )
}
