import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workHref = 'https://anchovies.agency/work'

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'scope', label: 'Scope' },
  { id: 'website', label: 'Website' },
  { id: 'technology', label: 'Technology' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
]

const principles = [
  [
    '01',
    'Attraction',
    'Build a firm people want to know more about without relying on conventional legal promotion.',
  ],
  [
    '02',
    'Principles',
    'Create an institution with a point of view that can remain larger than any one personality.',
  ],
  [
    '03',
    'Courage',
    'Give form to the willingness to begin before every answer, case, or source of funding is certain.',
  ],
  [
    '04',
    'Capacity',
    'Make a young firm feel credible enough to pursue consequential work, collaborators, funding, and talent.',
  ],
]

const audiences = [
  [
    'Co-counsel and referring firms',
    'A clear reason to trust the firm with ambitious, complex, or unusually structured matters.',
  ],
  [
    'Opposing counsel',
    'An immediate sense that the firm is serious, prepared, and built for consequential litigation.',
  ],
  [
    'Litigation and impact funders',
    'A concise account of the work, the model, the opportunity, and the people capable of delivering it.',
  ],
  [
    'Attorneys and law students',
    'A meaningful alternative to the usual law-firm career path, with strong work and a more humane culture.',
  ],
  [
    'Community organizations',
    'A partner that understands the human stakes behind complex litigation and collective action.',
  ],
]

const phases = [
  {
    number: '01',
    label: 'Immediate launch',
    title: 'Temporary Website',
    price: 'Included',
    timing: 'Week one',
    summary:
      'Create the clean public presence you need while the identity and complete website are being developed.',
    outcome:
      'A polished one-page website that supports compliance, early outreach, and immediate credibility.',
    includes: [
      'One-page responsive website',
      'Approved working presentation of the firm',
      'Concise firm introduction',
      'Contact information',
      'Privacy policy page',
      'Domain connection and launch',
    ],
  },
  {
    number: '02',
    label: 'Brand foundation',
    title: 'Brand Strategy + Identity',
    price: '$6,950',
    timing: 'Approximately 3 weeks',
    summary:
      'Define what the firm stands for, how it should be understood, and how that belief system becomes a distinctive public identity.',
    outcome:
      'A complete brand and message system for the website, funding conversations, recruiting, outreach, and future firm materials.',
    includes: [
      'Founder and team discovery',
      'Audience and market framing',
      'Core positioning and central brand idea',
      'Mission, value proposition, and key proof points',
      'Message framework and tone direction',
      'Primary logo or wordmark and supporting mark',
      'Typography, color, and graphic system',
      'Foundational brand guide',
      'Business card, letterhead, and email signature direction',
    ],
  },
  {
    number: '03',
    label: 'Complete digital presence',
    title: 'Website Design + Development',
    price: '$6,950',
    timing: 'Approximately 3 additional weeks',
    summary:
      'Turn the approved brand and message into a custom digital platform that supports the firm now and its future growth.',
    outcome:
      'A responsive seven-page website that helps the right people understand the firm quickly and gives the team practical control over routine updates.',
    includes: [
      'Seven-page website architecture',
      'Conversion-conscious website copywriting',
      'Custom desktop, tablet, and mobile design',
      'Custom React and TypeScript development',
      'Supabase-backed content and data layer where appropriate',
      'Lightweight custom admin for routine content edits',
      'Team, insights, and selected-work content systems',
      'Contact pathways and inquiry routing',
      'Foundational accessibility, performance, and on-page SEO',
      'Analytics, indexing, browser QA, launch, and handoff',
    ],
  },
]

const pages = [
  [
    '01',
    'Home',
    'The firm in one clear view: what it is here to do, why it is credible, and where a visitor should go next.',
  ],
  [
    '02',
    'Mission + Model',
    'The belief system behind the firm, its approach to consequential work, and the principles that shape how it operates.',
  ],
  [
    '03',
    'Cases + Initiatives',
    'A flexible place for active areas of focus, potential impact work, and matters the firm is prepared to explore.',
  ],
  [
    '04',
    'Capabilities',
    'A practical account of litigation experience, collaboration models, and the kinds of problems the firm can take on.',
  ],
  [
    '05',
    'Team + Culture',
    'The people behind the work and a credible picture of the humane, ambitious environment Max wants to build.',
  ],
  [
    '06',
    'Insights',
    'A publishing system for ideas, updates, research, and future points of view.',
  ],
  [
    '07',
    'Contact',
    'Clear paths for co-counsel, funders, recruits, organizations, and other relevant inquiries.',
  ],
]

const technology = [
  [
    'Custom application',
    'The website will be designed and coded from the ground up for this firm, its audiences, and its future needs.',
  ],
  [
    'GitHub',
    'The source code will live in version control, creating a clear history and a portable codebase the firm owns.',
  ],
  [
    'Vercel',
    'Deployment, previews, performance, and production hosting will run through a modern release workflow.',
  ],
  [
    'Supabase',
    'Structured content, form data, and future account or product needs can use a secure managed backend where appropriate.',
  ],
  [
    'Editable content',
    'A focused admin layer will let the team update routine text, people, insights, and selected items without editing code.',
  ],
  [
    'Agent-assisted development',
    'We use coding agents to move faster. Anchovies directs the design, architecture, review, and final delivery.',
  ],
]

const timeline = [
  [
    'Week 01',
    'Immediate launch + discovery',
    'Confirm the working name and essentials, begin discovery, and launch the temporary website once required legal copy and contact details are approved.',
  ],
  [
    'Weeks 02-03',
    'Strategy, messaging + identity',
    'Define the central idea, message system, visual identity, and the language the firm can reuse across recruiting, funding, and outreach.',
  ],
  [
    'Week 04',
    'Website architecture + design',
    'Approve the seven-page structure, core copy, homepage, and primary design system.',
  ],
  [
    'Weeks 05-06',
    'Development + launch',
    'Build the custom website and admin controls, complete responsive QA, connect analytics and domains, and launch.',
  ],
]

const work = [
  {
    name: 'Avodah Legal',
    kind: 'Law firm website',
    href: 'https://www.avodahlegal.com/',
    note: 'A confident legal platform built around an uncommon firm model and a clear point of view.',
  },
  {
    name: 'Lex Politica',
    kind: 'Law firm website',
    href: 'https://lexpolitica.com/',
    note: 'A distinctive identity and editorial website that moves beyond the visual habits of the legal category.',
  },
  {
    name: 'Sid Weber Law',
    kind: 'Law firm website',
    href: 'https://sidweberlaw.com/',
    note: 'A focused litigation website with a clear voice, strong editorial structure, and an assured public presence.',
  },
  {
    name: 'Maven Advocacy',
    kind: 'Legal advocacy website',
    href: 'https://mavenadvocacy.com/',
    note: 'A sharp advocacy platform that organizes complex work into a confident, accessible digital experience.',
  },
  {
    name: 'Belzer Law Firm',
    kind: 'Law firm website',
    href: 'https://belzerlawfirm.com/',
    note: 'A distinctive business litigation website built around the firm’s personality, experience, and client relationships.',
  },
  {
    name: 'Brand identity work',
    kind: 'Selected work',
    href: 'https://pitch.com/v/anchovies-press-zwdsbn',
    note: 'A broader view of how Anchovies translates strategy, personality, and culture into ownable brand systems.',
  },
]

const recognition = [
  {
    title: 'Best Law Firm Websites 2023',
    href: 'https://lawyerist.com/news/best-law-firm-websites-2023-2/',
  },
  {
    title: '2025 Award: Good vs. Great',
    href: 'https://lawyerist.com/news/good-vs-great-what-best-law-firm-websites-get-right/',
  },
  {
    title: 'Best Law Firm Websites 2026',
    href: 'https://lawyerist.com/news/best-law-firm-websites-2026/',
  },
]

const boundaries = [
  [
    'Working name',
    'The firm name and URL will be finalized after naming, trademark, domain, and professional-responsibility review by the firm and its counsel.',
  ],
  [
    'Temporary website',
    'The temporary site is included at no additional project fee with the complete engagement. Launch timing begins after the working name, legal details, privacy language, and contact information are approved.',
  ],
  [
    'Content editing',
    'The custom admin will support defined routine updates to text, people, insights, and selected content. New layouts and functionality remain development work.',
  ],
  [
    'Future software',
    'Future AI products, client portals, licensed tools, user accounts, and software integrations will be scoped separately. The technical foundation will give those opportunities a practical starting point.',
  ],
  [
    'Legal review',
    'The firm reviews names, claims, biographies, case descriptions, advertising language, privacy terms, and professional-responsibility requirements before publication.',
  ],
  [
    'Added scope',
    'Paid media, photography production, complex animations, ongoing content, product development, premium services, and material work beyond the approved scope are quoted separately.',
  ],
]

function AnchorButton({
  children,
  href,
  variant = 'primary',
}: {
  children: string
  href: string
  variant?: 'primary' | 'outline' | 'light'
}) {
  const external = href.startsWith('http')
  const classes =
    variant === 'light'
      ? 'bg-paper text-ink hover:bg-white'
      : variant === 'outline'
        ? 'border border-mac text-mac hover:bg-mac hover:text-white'
        : 'bg-mac text-white hover:bg-mac-hover'

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`inline-flex min-h-[46px] items-center justify-center rounded-full px-5 py-3 text-center text-[13px] font-medium transition-colors ${classes}`}
    >
      {children}
    </a>
  )
}

function MetaRow({
  left,
  right,
  dark = false,
}: {
  left: string
  right: string
  dark?: boolean
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-8">
      <span className={`eyebrow ${dark ? 'text-paper/55' : 'text-ink-2'}`}>
        {left}
      </span>
      <span
        className={`eyebrow sm:text-right ${dark ? 'text-paper/55' : 'text-ink-2'}`}
      >
        {right}
      </span>
    </div>
  )
}

function ProposalNav() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const sections = navSections
      .map(({ id }) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
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
          <img
            src="/logos/anchovies-wordmark.svg"
            alt="Anchovies"
            className="block h-[11px] w-auto"
          />
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Max + team</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Brand + website proposal</span>
          <span className="eyebrow">August 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-5 px-6 py-4 md:px-16">
          <a href="#overview" className="flex min-w-0 items-center gap-3">
            <img
              src="/logos/anchovies-mark.svg"
              alt="Anchovies"
              className="block h-[14px] w-auto"
            />
            <span className="truncate text-[13px] text-ink-2">
              <span className="text-ink">Anchovies</span> x New Firm
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={
                  active === section.id
                    ? 'text-ink'
                    : 'transition-colors hover:text-ink'
                }
              >
                {section.label}
              </a>
            ))}
          </nav>
          <AnchorButton href={calendarHref}>Schedule a review</AnchorButton>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section
      id="overview"
      className="border-b border-[var(--color-rule)] px-6 pb-20 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-[120px] lg:pt-[120px]"
    >
      <MetaRow
        left="§ 01 - Proposal"
        right="Brand strategy · Identity · Website"
      />
      <Reveal>
        <h1 className="display max-w-[1200px] py-16 text-[54px] leading-[54px] sm:text-[76px] sm:leading-[72px] md:text-[98px] md:leading-[92px] lg:text-[126px] lg:leading-[114px]">
          A firm designed to take on work others will not.
        </h1>
      </Reveal>
      <div className="grid gap-10 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[30px] leading-[39px] md:text-[38px] md:leading-[47px]">
            A brand, message system, and custom website for a litigation firm
            built around consequential work, independent thinking, and a more
            humane way to practice.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[500px] flex-col gap-6">
          <p className="text-[15px] leading-[24px] text-ink-2">
            You are still shaping the firm, its case mix, and its future
            products. This foundation will turn your ideas into a clear
            institution, support the immediate launch, and remain flexible as
            cases, collaborators, funding, talent, and future products develop.
          </p>
          <p className="text-[12px] leading-[19px] text-ink-2">
            Firm name remains provisional pending confirmation and legal
            clearance.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <AnchorButton href={calendarHref}>
              Schedule a proposal review
            </AnchorButton>
            <AnchorButton href="#work" variant="outline">
              View our work
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="pt-20 lg:pt-28">
        <div className="flex items-center justify-between gap-6 pb-7">
          <span className="eyebrow text-ink-2">
            Fig. 01 - What the firm can stand for
          </span>
          <span className="eyebrow text-right text-ink-2">Four signals</span>
        </div>
        <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {principles.map(([number, title, body], index) => (
            <div
              key={title}
              className={`flex min-h-[250px] flex-col p-8 md:p-10 ${index < 3 ? 'border-b border-[var(--color-rule)] xl:border-b-0 xl:border-r' : ''} ${index === 0 || index === 2 ? 'md:border-r' : ''} ${index === 1 ? 'md:border-r-0' : ''} ${index === 2 ? 'md:border-b-0' : ''}`}
            >
              <span className="eyebrow text-ink-2">{number}</span>
              <h3 className="serif mt-10 min-h-[42px] text-[38px] leading-[42px]">
                {title}
              </h3>
              <p className="pt-5 text-[13px] leading-[20px] text-ink-2">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Opportunity() {
  return (
    <section
      id="opportunity"
      className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[140px]"
    >
      <MetaRow
        left="§ 02 - Opportunity"
        right="Attraction rather than promotion"
        dark
      />
      <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[820px] text-[52px] leading-[54px] md:text-[76px] md:leading-[76px] lg:text-[94px] lg:leading-[92px]">
            Give form to the belief before the institution is fully built.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[520px] flex-col gap-6 pt-1 text-[15px] leading-[24px] text-paper/65">
          <p className="text-paper">
            You already have the fuel: serious litigation ambitions, a
            willingness to pursue work others avoid, and a clear desire to build
            a firm that treats people differently.
          </p>
          <p>
            The need is form. The brand should distill those ideas into language
            and design that other firms, funders, future employees, opponents,
            and community partners can understand quickly and repeat accurately.
          </p>
          <p>
            The website will create confidence for the people whose belief can
            help the firm grow. It will make the organization feel coherent,
            prepared, and capable of becoming much larger than its founder.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid border-y border-paper/20 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="flex min-h-[300px] flex-col justify-between border-b border-paper/20 p-9 lg:border-b-0 lg:border-r lg:p-12">
          <span className="eyebrow text-paper/45">The central shift</span>
          <p className="serif text-[34px] italic leading-[43px] md:text-[43px] md:leading-[52px]">
            Principles before personalities.
          </p>
        </div>
        <div>
          {audiences.map(([title, body], index) => (
            <div
              key={title}
              className={`grid gap-3 p-7 md:grid-cols-[0.75fr_1.25fr] md:gap-10 md:p-8 ${index < audiences.length - 1 ? 'border-b border-paper/15' : ''}`}
            >
              <span className="serif text-[24px] leading-[30px]">{title}</span>
              <span className="text-[13px] leading-[20px] text-paper/55">
                {body}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Scope() {
  return (
    <section
      id="scope"
      className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]"
    >
      <MetaRow left="§ 03 - Scope" right="Three clear parts" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_440px] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[820px] text-[50px] leading-[52px] md:text-[76px] md:leading-[76px]">
            Temporary website. Brand strategy and identity. Full website.
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            The temporary website gets you online in week one. Brand strategy
            and identity establish the message and visual system. Website design
            and development turn that approved system into the complete
            seven-page platform. The full engagement is $13,900.
          </p>
        </Reveal>
      </div>
      <div className="grid border-y border-[var(--color-rule)] lg:grid-cols-3">
        {phases.map((phase, index) => (
          <Reveal
            key={phase.number}
            className={`flex flex-col p-8 sm:p-10 lg:p-9 xl:p-11 ${index < phases.length - 1 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''}`}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <span className="eyebrow text-ink-2">Phase {phase.number}</span>
                <span className="mt-3 block text-[12px] text-mac">
                  {phase.label}
                </span>
              </div>
              <span className="eyebrow text-right text-ink-2">
                {phase.timing}
              </span>
            </div>
            <h3 className="serif min-h-[116px] pt-10 text-[38px] leading-[44px] xl:text-[44px] xl:leading-[49px]">
              {phase.title}
            </h3>
            <span className="display pt-4 text-[52px] leading-[58px] xl:text-[60px] xl:leading-[64px]">
              {phase.price}
            </span>
            <p className="border-b border-[var(--color-rule)] py-7 text-[15px] leading-[24px] text-ink-2">
              {phase.summary}
            </p>
            <div className="border-b border-[var(--color-rule)] py-7">
              <span className="eyebrow text-ink-2">Outcome</span>
              <p className="serif mt-4 text-[25px] leading-[33px]">
                {phase.outcome}
              </p>
            </div>
            <span className="eyebrow pt-7 text-ink-2">Included</span>
            <div className="mt-5 grid gap-3">
              {phase.includes.map((item) => (
                <div key={item} className="grid grid-cols-[14px_1fr] gap-3">
                  <span className="mt-[9px] h-px bg-[var(--color-rule)]" />
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

function Website() {
  return (
    <section
      id="website"
      className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]"
    >
      <MetaRow left="§ 04 - Website" right="Seven core pages + privacy" />
      <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[820px] text-[50px] leading-[52px] md:text-[76px] md:leading-[76px]">
            A public home for the firm you are building.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[500px] flex-col gap-5 text-[15px] leading-[24px] text-ink-2">
          <p>
            The proposed architecture gives the firm room to explain its model,
            establish credibility, attract collaborators and talent, publish
            ideas, and introduce future initiatives through one clear system.
          </p>
          <p>
            The final page names and hierarchy will be confirmed during
            discovery. The privacy page and required policy language sit outside
            the seven core narrative pages.
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {pages.map(([number, title, body]) => (
          <Reveal
            key={number}
            className="grid gap-4 border-b border-[var(--color-rule)] py-8 md:grid-cols-[76px_0.72fr_1.28fr] md:items-center md:gap-10"
          >
            <span className="eyebrow text-ink-2">{number}</span>
            <h3 className="serif text-[29px] leading-[35px] md:text-[34px] md:leading-[40px]">
              {title}
            </h3>
            <p className="max-w-[660px] text-[13px] leading-[20px] text-ink-2">
              {body}
            </p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12 grid border border-mac md:grid-cols-[0.72fr_1.28fr]">
        <div className="flex min-h-[250px] flex-col justify-between bg-mac p-8 text-white md:p-10">
          <span className="eyebrow text-white/65">Week one</span>
          <h3 className="serif text-[38px] leading-[44px]">
            Immediate launch page
          </h3>
        </div>
        <div className="flex flex-col justify-center gap-5 p-8 md:p-10 lg:p-14">
          <p className="serif text-[28px] leading-[36px]">
            A clean, credible bridge while the full identity and website are
            being built.
          </p>
          <p className="max-w-[700px] text-[14px] leading-[22px] text-ink-2">
            The temporary site will include the approved firm name or working
            presentation, a concise introduction, contact information, and a
            privacy policy. It is included at no additional project fee with the
            complete engagement.
          </p>
        </div>
      </Reveal>
    </section>
  )
}

function Technology() {
  return (
    <section
      id="technology"
      className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[140px]"
    >
      <MetaRow
        left="§ 05 - Technical foundation"
        right="Custom code · Practical ownership"
        dark
      />
      <div className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[830px] text-[50px] leading-[52px] md:text-[76px] md:leading-[76px]">
            The technology behind your website.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[520px] flex-col gap-5 text-[15px] leading-[24px] text-paper/65">
          <p className="text-paper">
            You may eventually publish tools, license software, or create more
            advanced digital experiences. This custom foundation supports the
            firm website now and gives the team a practical starting point for
            those future opportunities.
          </p>
          <p>
            We will create a custom codebase with a focused content-management
            layer, clear ownership, and a modern deployment workflow. Asher can
            review the technical approach before development begins.
          </p>
        </Reveal>
      </div>
      <Reveal className="grid gap-px border-y border-paper/20 bg-paper/20 md:grid-cols-2 lg:grid-cols-3">
        {technology.map(([title, body], index) => (
          <div key={title} className="min-h-[230px] bg-ink p-8 md:p-10">
            <span className="eyebrow text-paper/45">0{index + 1}</span>
            <h3 className="serif pt-8 text-[30px] leading-[36px]">{title}</h3>
            <p className="pt-5 text-[13px] leading-[20px] text-paper/55">
              {body}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Timeline() {
  return (
    <section
      id="timeline"
      className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]"
    >
      <MetaRow left="§ 06 - Timeline" right="Approximately six weeks" />
      <Reveal>
        <h2 className="display max-w-[900px] py-16 text-[50px] leading-[52px] md:text-[76px] md:leading-[76px]">
          Immediate momentum, then one connected path to launch.
        </h2>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {timeline.map(([when, title, body]) => (
          <Reveal
            key={when}
            className="grid gap-4 border-b border-[var(--color-rule)] py-9 md:grid-cols-[170px_0.75fr_1.25fr] md:items-start md:gap-10"
          >
            <span className="eyebrow text-mac">{when}</span>
            <h3 className="serif text-[28px] leading-[34px]">{title}</h3>
            <p className="max-w-[660px] text-[14px] leading-[22px] text-ink-2">
              {body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Investment() {
  return (
    <section
      id="investment"
      className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]"
    >
      <MetaRow left="§ 07 - Investment" right="Scope + payment schedule" />
      <div className="grid gap-12 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <span className="eyebrow text-mac">Complete engagement</span>
          <h2 className="display pt-5 text-[72px] leading-[76px] sm:text-[94px] sm:leading-[96px] md:text-[118px] md:leading-[114px]">
            $13,900
          </h2>
          <p className="serif max-w-[720px] pt-7 text-[30px] leading-[39px]">
            Temporary Website, Brand Strategy + Identity, and Website Design +
            Development.
          </p>
        </Reveal>
        <Reveal className="border-y border-[var(--color-rule)]">
          <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[var(--color-rule)] py-7">
            <div>
              <span className="eyebrow text-ink-2">Temporary Website</span>
              <p className="mt-3 text-[14px] leading-[22px]">
                One-page responsive launch site, contact information, privacy
                policy, domain connection, and launch.
              </p>
            </div>
            <span className="serif text-[30px]">Included</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-6 border-b border-[var(--color-rule)] py-7">
            <div>
              <span className="eyebrow text-ink-2">
                Brand Strategy + Identity
              </span>
              <p className="mt-3 text-[14px] leading-[22px]">
                Positioning, messaging, visual identity, brand guide, and
                essential firm applications.
              </p>
            </div>
            <span className="serif text-[30px]">$6,950</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-6 py-7">
            <div>
              <span className="eyebrow text-ink-2">
                Website Design + Development
              </span>
              <p className="mt-3 text-[14px] leading-[22px]">
                Seven-page custom website, copywriting, responsive design,
                development, editing controls, QA, launch, and handoff.
              </p>
            </div>
            <span className="serif text-[30px]">$6,950</span>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-8">
        <MetaRow left="Payment schedule" right="50% · 25% · 25%" />
        <div className="mt-8 grid border-y border-[var(--color-rule)] lg:grid-cols-3">
          {[
            [
              '50% at kickoff',
              '$6,950',
              'Reserves the project window and begins the temporary website, discovery, strategy, and identity.',
            ],
            [
              '25% after brand approval',
              '$3,475',
              'Due after the primary brand direction is approved and before full website production.',
            ],
            [
              '25% before launch',
              '$3,475',
              'Due before the complete website launches and final files are handed over.',
            ],
          ].map(([label, amount, body], index) => (
            <div
              key={label}
              className={`p-8 md:p-10 ${index < 2 ? 'border-b border-[var(--color-rule)] lg:border-b-0 lg:border-r' : ''}`}
            >
              <span className="eyebrow text-ink-2">{label}</span>
              <span className="display mt-6 block text-[54px] leading-[58px]">
                {amount}
              </span>
              <p className="mt-6 text-[14px] leading-[22px] text-ink-2">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Work() {
  return (
    <section
      id="work"
      className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]"
    >
      <MetaRow left="§ 08 - Our work" right="Legal brands + websites" />
      <div className="grid gap-10 py-16 lg:grid-cols-[1fr_420px] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[820px] text-[50px] leading-[52px] md:text-[76px] md:leading-[76px]">
            Different firms should look and sound different.
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-[15px] leading-[24px] text-ink-2">
            Our legal work is built from the specific people, ambition,
            audience, and culture behind each firm. These references show how
            that thinking can lead to very different expressions.
          </p>
        </Reveal>
      </div>
      <div className="grid gap-px border-y border-[var(--color-rule)] bg-[var(--color-rule)] lg:grid-cols-3">
        {work.map((item) => (
          <Reveal
            key={item.name}
            className="flex min-h-[320px] flex-col bg-paper p-8 md:p-10"
          >
            <span className="eyebrow text-ink-2">{item.kind}</span>
            <h3 className="serif pt-10 text-[38px] leading-[44px]">
              {item.name}
            </h3>
            <p className="pt-5 text-[14px] leading-[22px] text-ink-2">
              {item.note}
            </p>
            <div className="mt-auto pt-10">
              <AnchorButton href={item.href} variant="outline">
                View project
              </AnchorButton>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="pt-10">
        <AnchorButton href={workHref}>View all work</AnchorButton>
      </Reveal>
      <Reveal className="mt-16 border-t border-[var(--color-rule)]">
        <div className="flex flex-col justify-between gap-3 border-b border-[var(--color-rule)] py-5 sm:flex-row sm:items-center">
          <span className="eyebrow text-ink-2">Lawyerist recognition</span>
          <span className="eyebrow text-ink-2">2023 · 2025 · 2026</span>
        </div>
        {recognition.map((item, index) => (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className={`group grid gap-4 py-7 md:grid-cols-[80px_1fr_auto] md:items-center ${index < recognition.length - 1 ? 'border-b border-[var(--color-rule)]' : ''}`}
          >
            <span className="eyebrow text-ink-2">0{index + 1}</span>
            <span className="serif text-[27px] leading-[34px]">
              {item.title}
            </span>
            <span className="text-[13px] text-mac group-hover:underline">
              Read on Lawyerist
            </span>
          </a>
        ))}
      </Reveal>
    </section>
  )
}

function Boundaries() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
      <MetaRow left="§ 09 - Boundaries" right="Clarity before kickoff" />
      <div className="grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[700px] text-[50px] leading-[52px] md:text-[72px] md:leading-[72px]">
            Enough structure to move quickly.
          </h2>
        </Reveal>
        <div className="border-t border-[var(--color-rule)]">
          {boundaries.map(([title, body]) => (
            <Reveal
              key={title}
              className="grid gap-3 border-b border-[var(--color-rule)] py-7 md:grid-cols-[180px_1fr] md:gap-10"
            >
              <span className="serif text-[23px] leading-[29px]">{title}</span>
              <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section className="px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
      <MetaRow left="§ 10 - Next step" right="Proposal review" />
      <Reveal className="mt-16 border border-[var(--color-rule)] p-8 md:p-12 lg:p-16">
        <div className="grid gap-10 border-b border-[var(--color-rule)] pb-12 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-20">
          <h2 className="display max-w-[820px] text-[50px] leading-[52px] md:text-[76px] md:leading-[76px]">
            Review the complete launch together.
          </h2>
          <div className="lg:text-right">
            <span className="display block text-[68px] leading-[72px]">
              $13,900
            </span>
            <span className="text-[13px] text-ink-2">
              Approximately six weeks
            </span>
          </div>
        </div>
        <div className="grid gap-10 pt-10 lg:grid-cols-[1fr_420px] lg:gap-20">
          <p className="max-w-[720px] text-[15px] leading-[24px] text-ink-2">
            Bring Asher's technical questions and any updates on the firm name.
            We can review the temporary website, brand strategy and identity,
            complete website, timing, and payment schedule together.
          </p>
          <div className="flex flex-wrap items-start gap-3 lg:justify-end">
            <AnchorButton href={calendarHref}>
              Schedule a proposal review
            </AnchorButton>
            <AnchorButton href={workHref} variant="outline">
              View our work
            </AnchorButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

export function MaxNewFirmProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Max - Brand + Website Proposal'
  }, [])

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-mac selection:text-white">
      <ProposalNav />
      <main>
        <Hero />
        <Opportunity />
        <Scope />
        <Website />
        <Technology />
        <Timeline />
        <Investment />
        <Work />
        <Boundaries />
        <NextStep />
      </main>
    </div>
  )
}
