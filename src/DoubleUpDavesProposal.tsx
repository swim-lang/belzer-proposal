import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const chooseHref =
  'mailto:sean@anchovies.agency?subject=Double%20Up%20Daves%20proposal&body=Hi%20Sean%2C%0A%0AI%27d%20like%20to%20move%20forward%20with%20the%20following%20Double%20Up%20Daves%20proposal%20direction%3A%0A%0A%5B%20%5D%20Website%20Foundation%20-%20%242%2C400%0A%5B%20%5D%20Brand%20%2B%20Website%20-%20%243%2C900%0A%5B%20%5D%20Brand%20%2B%20Website%20%2B%20SEO%20-%20%244%2C500%0A%5B%20%5D%20Complete%20Launch%20-%20%245%2C000%0A%0AThanks!'

type ScopeItem = {
  num: string
  label: string
  title: string
  price: string
  body: string
  outcome: string
  includes: string[]
}

const navSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'website', label: 'Website' },
  { id: 'scope', label: 'Scope' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
]

const signals = [
  ['01', 'Personal', 'Put Dave, his knowledge, and the way he treats people at the center.'],
  ['02', 'Useful', 'Make it easy to understand what he buys, sells, refurbishes, and can source.'],
  ['03', 'Flexible', 'Build a system that can grow as the offer moves beyond phones and laptops.'],
  ['04', 'Findable', 'Create clear paths for people searching for a particular device or service.'],
]

const finderRows = [
  ['Phones', 'Apple, Samsung, Google, and more', 'Buy, sell, trade'],
  ['Computers', 'Laptops, tablets, and accessories', 'Ask Dave'],
  ['Home tech', 'TVs, audio, wearables, and connected devices', 'Often available'],
  ['Repair', 'Diagnostics, direct repair, and trusted partner support', 'Get help'],
  ['Hard to find', 'Older, unusual, and vintage electronics', 'Dave can source'],
]

const pages = [
  ['01', 'Home', 'A clear introduction to Dave, the offer, and the fastest next step.'],
  ['02', 'Buy, Sell, Trade & Repair', 'A simple explanation of the ways customers can work with Dave, including direct and partner-supported repair.'],
  ['03', 'Device Finder', 'A searchable, filterable catalog of devices and categories Dave works with.'],
  ['04', 'About Dave', 'The experience, relationships, and personality behind the business.'],
  ['05', 'Contact', 'A direct inquiry path for selling, sourcing, trading, or asking a question.'],
]

const scopeItems: ScopeItem[] = [
  {
    num: '01',
    label: 'Foundation',
    title: 'Website Foundation',
    price: '$2,400',
    body: 'A focused five-page website that turns the current offer into a clearer, more persuasive, and more searchable experience.',
    outcome: 'A responsive website that helps more people find Double Up Daves, understand the value, and take a useful next step.',
    includes: [
      'Website structure and content strategy',
      'Conversion-focused copywriting across five pages',
      'Value proposition, outcomes, and offer language',
      'Responsive website design and development',
      'Founder-led story and trust signals',
      'Offer consultation as the business evolves',
      'Repair and partner-supported service framing',
      'Device Finder with up to 30 priority entries',
      'Search, category, brand, and use-case filters',
      'Photography direction and priority shot list',
      'Foundational on-page SEO',
      'Inquiry forms and calls to action',
      'Analytics, Search Console basics, QA, and launch',
    ],
  },
  {
    num: '02',
    label: 'Recommended',
    title: 'Brand Identity Sprint',
    price: '+$1,500',
    body: 'A compact identity sprint that moves the brand beyond familiar tech imagery and builds recognition around Dave himself.',
    outcome: 'A warmer, more distinctive identity that can support a higher-touch, more premium position without losing accessibility.',
    includes: [
      'Focused positioning and creative direction',
      'Primary logo or wordmark',
      'Supporting mark',
      'Color and typography system',
      'Simple graphic language',
      'Social profile assets',
      'Light brand guide',
      'Final logo exports',
    ],
  },
  {
    num: '03',
    label: 'Optional',
    title: 'SEO Expansion',
    price: '+$600',
    body: 'A deeper search pass that uses real demand to decide which devices, categories, and questions deserve dedicated attention.',
    outcome: 'A broader and more intentional search footprint without pretending every listed device is sitting in stock.',
    includes: [
      'Keyword and device opportunity scan',
      'Up to 30 additional researched catalog entries',
      'Local and service keyword map',
      'Optimized metadata and internal linking',
      'FAQ and structured data recommendations',
      'Search Console indexing check',
      'Brief measurement plan',
    ],
  },
  {
    num: '04',
    label: 'Optional',
    title: 'Social Starter Kit',
    price: '+$500',
    body: 'A small set of editable social templates that gives Dave a consistent way to show what is new, sold, wanted, or worth knowing.',
    outcome: 'A practical launch system Dave can keep using without ongoing agency management.',
    includes: [
      'Six editable Canva templates',
      'New arrival and recently sold posts',
      'Trade-in and sourcing request posts',
      'Testimonial format',
      'Behind-the-scenes and Dave-led posts',
      'Avatar, profile assets, and usage notes',
    ],
  },
]

const options = [
  ['Website only', 'A sharper digital foundation and Device Finder.', '$2,400', '2 weeks'],
  ['Brand + website', 'The strongest place to start.', '$3,900', '4 weeks'],
  ['Brand + website + SEO', 'A stronger identity with a broader search footprint.', '$4,500', '4 weeks'],
  ['Complete launch', 'Brand, website, SEO expansion, and social templates.', '$5,000', '4 weeks'],
]

const boundaries = [
  ['Inventory', 'The Device Finder describes what Dave works with or can source. It does not claim every item is currently in stock.'],
  ['Commerce', 'A shopping cart, checkout, live inventory sync, and custom marketplace functionality are not included in this phase.'],
  ['Content', 'Dave confirms product facts, service details, availability, and final business information before launch.'],
  ['Photography', 'Creative direction and a practical shot list are included. Photography production is not included.'],
  ['Extensions', 'Ongoing SEO, social management, paid media, extra product entry, custom apps, hosting, and premium software can be scoped separately.'],
  ['Performance', 'The work creates a stronger foundation for discovery and conversion, but specific rankings and business results cannot be guaranteed.'],
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
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 md:flex">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[11px] w-auto" />
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Prepared for Double Up Daves</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Brand + website proposal</span>
          <span className="eyebrow">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline"><span className="text-ink">Anchovies</span> x Double Up Daves</span>
          </a>
          <nav className="hidden items-center gap-6 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <AnchorButton href={chooseHref}>Choose a direction</AnchorButton>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
      <div className="flex flex-col gap-5 pb-16 md:flex-row md:items-start md:justify-between lg:pb-24">
        <Reveal className="flex flex-col gap-1.5">
          <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
          <span className="eyebrow">Brand identity + website</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Prepared for Double Up Daves</span>
          <span className="eyebrow text-ink-2">By Anchovies</span>
        </Reveal>
      </div>

      <Reveal>
        <h1 className="display max-w-[1200px] pb-12 text-[54px] leading-[54px] sm:text-[76px] sm:leading-[72px] md:text-[94px] md:leading-[88px] lg:pb-16 lg:text-[116px] lg:leading-[106px] xl:text-[136px] xl:leading-[122px]">
          Tech is the work.
          <br />
          Trust is the brand.
        </h1>
      </Reveal>

      <div className="grid gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
        <Reveal>
          <h2 className="serif max-w-[720px] text-[28px] leading-[36px] md:text-[34px] md:leading-[42px] lg:text-[40px] lg:leading-[48px]">
            A more personal identity and a useful website for buying, selling, trading, and finding the electronics people are already looking for.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[480px] flex-col gap-6">
          <p className="text-[15px] leading-[24px] text-ink-2">
            Dave is building toward making this his full-time work. The foundation should support that ambition, stay flexible as the offer evolves, and keep his knowledge and relationships at the center.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <AnchorButton href={chooseHref}>Choose a direction</AnchorButton>
            <AnchorButton href="#website" variant="outline">See the website</AnchorButton>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="flex items-center justify-between gap-8 pb-7">
          <span className="eyebrow text-ink-2">Fig. 01 - What the next version needs</span>
          <span className="eyebrow text-right text-ink-2">Four signals</span>
        </div>
        <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {signals.map(([num, title, body], index) => (
            <div
              key={title}
              className={`flex min-h-[230px] flex-col p-8 md:p-10 ${index < 3 ? 'border-b border-[var(--color-rule)] xl:border-b-0 xl:border-r' : ''} ${index === 0 || index === 2 ? 'md:border-r' : ''} ${index === 1 ? 'md:border-r-0' : ''} ${index === 2 ? 'md:border-b-0' : ''}`}
            >
              <span className="eyebrow text-ink-2">{num}</span>
              <h3 className="serif mt-auto pt-10 text-[36px] leading-[40px] md:text-[42px] md:leading-[46px]">{title}</h3>
              <p className="pt-5 text-[13px] leading-[20px] text-ink-2">{body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Opportunity() {
  return (
    <section id="opportunity" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 02 - The opportunity" right="Build around the person" />
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[800px] text-[52px] leading-[52px] md:text-[78px] md:leading-[74px] lg:text-[96px] lg:leading-[90px]">
            Let people know Dave before they ever meet him.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[500px] flex-col gap-5 pt-2 text-[15px] leading-[24px]">
          <p>
            The current identity signals electronics immediately. The larger opportunity is to signal why someone should work with Double Up Daves instead of any other electronics seller.
          </p>
          <p className="text-ink-2">
            Dave's advantage is human: experience, resourcefulness, patience, drive, honest guidance, and the kind of in-person relationship that feels increasingly rare. The brand can feel a little old school without feeling dated, and knowledgeable without becoming cold.
          </p>
          <p className="text-ink-2">
            That same idea creates room for the business to evolve. Phones and laptops can sit beside home electronics, unusual finds, trade-ins, direct or partner-supported repairs, and a boutique sourcing service without requiring another reinvention.
          </p>
          <p className="text-ink-2">
            A more considered brand and buying experience also gives Dave room to become the higher-touch option in the category. He does not need to win by being cheapest. He can win by being more helpful, more trustworthy, and easier to work with.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-16 grid border-y border-[var(--color-rule)] lg:mt-24 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="flex min-h-[360px] items-center justify-center border-b border-[var(--color-rule)] p-12 lg:border-b-0 lg:border-r">
          <div className="flex flex-col items-center gap-6 text-center">
            <img src="/client-logos/double-up-daves.png" alt="Current Double Up Daves logo" className="h-40 w-40 object-contain mix-blend-multiply md:h-48 md:w-48" />
            <span className="eyebrow text-ink-2">Current starting point</span>
          </div>
        </div>
        <div className="flex min-h-[360px] flex-col justify-between gap-12 p-8 md:p-12 lg:p-16">
          <span className="eyebrow text-ink-2">The shift</span>
          <blockquote className="serif max-w-[700px] text-[38px] leading-[44px] md:text-[52px] md:leading-[58px]">
            Move from a symbol of the category to a brand only Dave could own.
          </blockquote>
          <div className="grid gap-4 border-t border-[rgba(31,25,18,0.25)] pt-6 sm:grid-cols-3">
            <span className="text-[13px] leading-[20px]">Less generic tech</span>
            <span className="text-[13px] leading-[20px]">More personality</span>
            <span className="text-[13px] leading-[20px]">More room to grow</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

function Website() {
  return (
    <section id="website" className="border-b border-[var(--color-rule)] bg-ink px-6 py-20 text-paper md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 03 - Website concept" right="Five pages + Device Finder" dark />
      <div className="grid gap-12 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:pb-24">
        <Reveal>
          <h2 className="display max-w-[820px] text-[52px] leading-[52px] md:text-[78px] md:leading-[74px] lg:text-[96px] lg:leading-[90px]">
            A useful front door, not a static brochure.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[500px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-paper/65">
          <p className="text-paper">
            The website should help people quickly answer three questions: Can Dave help with this device? Why is his service worth choosing? What should I do next?
          </p>
          <p>
            The Device Finder creates a flexible, search-friendly catalog of the products and categories Dave works with. Persuasive copy, clear outcomes, and conversion-focused pathways help turn that attention into inquiries without implying every item is live inventory.
          </p>
        </Reveal>
      </div>

      <Reveal className="grid border border-paper/25 lg:grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col justify-between gap-12 border-b border-paper/25 p-8 md:p-12 lg:border-b-0 lg:border-r lg:p-14">
          <div>
            <span className="eyebrow text-paper/50">Device Finder</span>
            <h3 className="serif max-w-[440px] pt-6 text-[40px] leading-[46px] md:text-[52px] md:leading-[58px]">Find it, trade it, or ask Dave to source it.</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Category', 'Brand', 'Use case', 'Availability'].map((filter) => (
              <span key={filter} className="rounded-full border border-paper/25 px-4 py-2 text-[11px] text-paper/70">{filter}</span>
            ))}
          </div>
        </div>
        <div>
          {finderRows.map(([category, detail, status], index) => (
            <div key={category} className={`grid gap-3 p-7 md:grid-cols-[0.7fr_1.4fr_0.7fr] md:items-center md:gap-8 md:p-9 ${index < finderRows.length - 1 ? 'border-b border-paper/20' : ''}`}>
              <span className="serif text-[25px] leading-[30px]">{category}</span>
              <span className="text-[13px] leading-[20px] text-paper/55">{detail}</span>
              <span className="eyebrow text-paper/70 md:text-right">{status}</span>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 border-t border-paper/25 lg:mt-24">
        {pages.map(([num, title, body]) => (
          <Reveal key={num} className="grid gap-4 border-b border-paper/20 py-8 md:grid-cols-[80px_0.8fr_1.2fr] md:items-center md:gap-10">
            <span className="eyebrow text-paper/45">{num}</span>
            <h3 className="serif text-[30px] leading-[36px] md:text-[34px] md:leading-[40px]">{title}</h3>
            <p className="max-w-[560px] text-[13px] leading-[20px] text-paper/55">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Scope() {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 04 - Scope" right="One foundation + flexible additions" />
      <div className="grid gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24 lg:pb-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[52px] leading-[52px] md:text-[78px] md:leading-[74px] lg:text-[96px] lg:leading-[90px]">
            Start where the business needs it most.
          </h2>
        </Reveal>
        <Reveal className="max-w-[500px] pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            The website can stand on its own. The brand sprint is the recommended addition because it gives every page, photograph, social post, and future service a more ownable foundation.
          </p>
        </Reveal>
      </div>

      {scopeItems.map((item) => (
        <Reveal key={item.num} className="grid gap-8 border-t border-[var(--color-rule)] py-12 md:grid-cols-[90px_1fr] md:gap-12 lg:grid-cols-[90px_1.05fr_0.95fr] lg:gap-16 lg:py-16">
          <div>
            <span className="serif block text-[56px] leading-[56px] md:text-[64px] md:leading-[64px]">{item.num}</span>
            <span className={`eyebrow mt-4 inline-block ${item.label === 'Recommended' ? 'text-mac' : 'text-ink-2'}`}>{item.label}</span>
          </div>
          <div className="max-w-[580px]">
            <div className="flex flex-col gap-3 pb-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <h3 className="serif text-[34px] leading-[40px] md:text-[40px] md:leading-[46px]">{item.title}</h3>
              <span className="serif shrink-0 text-[30px] leading-[34px] text-mac">{item.price}</span>
            </div>
            <p className="pb-6 text-[15px] leading-[24px] text-ink-2">{item.body}</p>
            <div className="border-l-2 border-mac pl-4">
              <span className="eyebrow mb-2 block text-ink-2">Outcome</span>
              <p className="text-[13px] leading-[20px]">{item.outcome}</p>
            </div>
          </div>
          <div className="max-w-[420px] md:col-start-2 lg:col-start-auto">
            <span className="eyebrow mb-5 block text-ink-2">Includes</span>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {item.includes.map((included) => (
                <div key={included} className="flex items-baseline gap-3">
                  <span className="h-px w-3 shrink-0 translate-y-[-4px] bg-ink" />
                  <span className="text-[13px] leading-[20px]">{included}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  )
}

function Timeline() {
  const weeks = [
    ['Week 01', 'Listen and organize', 'Confirm the offer, audiences, site structure, product categories, content, and creative direction.'],
    ['Week 02', 'Design the foundation', 'Complete the brand direction when selected, then design the core website and Device Finder experience.'],
    ['Week 03', 'Build and populate', 'Develop the responsive website and add the initial priority device and category entries.'],
    ['Week 04', 'Polish and launch', 'Complete content, selected add-ons, responsive QA, search basics, handoff, and launch.'],
  ]

  return (
    <section id="timeline" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 05 - Timeline" right="Two to four weeks" />
      <div className="grid gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24 lg:pb-20">
        <Reveal>
          <h2 className="display max-w-[820px] text-[52px] leading-[52px] md:text-[78px] md:leading-[74px] lg:text-[96px] lg:leading-[90px]">
            Quick enough to build momentum. Flexible enough to get it right.
          </h2>
        </Reveal>
        <Reveal className="max-w-[500px] pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>The Website Foundation can be completed in about two weeks once content and access are ready. The recommended brand and website path is planned across four weeks.</p>
        </Reveal>
      </div>
      <div className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
        {weeks.map(([week, title, body], index) => (
          <Reveal key={week} className={`flex min-h-[280px] flex-col p-8 md:p-10 ${index < 3 ? 'border-b border-[var(--color-rule)] xl:border-b-0 xl:border-r' : ''} ${index === 0 || index === 2 ? 'md:border-r' : ''} ${index === 2 ? 'md:border-b-0' : ''}`}>
            <span className="eyebrow text-ink-2">{week}</span>
            <h3 className="serif mt-auto pt-10 text-[30px] leading-[36px] md:text-[34px] md:leading-[40px]">{title}</h3>
            <p className="pt-5 text-[13px] leading-[20px] text-ink-2">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 06 - Investment" right="Four ways to begin" />
      <div className="grid gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24 lg:pb-20">
        <Reveal>
          <h2 className="display max-w-[780px] text-[52px] leading-[52px] md:text-[78px] md:leading-[74px] lg:text-[96px] lg:leading-[90px]">
            Choose the right-sized launch.
          </h2>
        </Reveal>
        <Reveal className="max-w-[500px] pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">Every option starts with the five-page website. Brand + website is our recommendation because differentiation matters most while the business is still taking shape.</p>
        </Reveal>
      </div>

      <div className="border-t border-[var(--color-rule)]">
        {options.map(([title, body, total, timing], index) => (
          <Reveal key={title} className={`grid gap-5 border-b border-[var(--color-rule)] py-9 md:grid-cols-[64px_1fr_150px_110px] md:items-center md:gap-8 ${index === 1 ? 'bg-mac px-6 text-white md:px-8' : ''}`}>
            <span className={`eyebrow ${index === 1 ? 'text-white/65' : 'text-ink-2'}`}>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="serif text-[30px] leading-[36px] md:text-[34px] md:leading-[40px]">{title}</h3>
                {index === 1 ? <span className="rounded-full border border-white/35 px-3 py-1 text-[10px] uppercase tracking-[0.12em]">Recommended</span> : null}
              </div>
              <p className={`pt-2 text-[13px] leading-[20px] ${index === 1 ? 'text-white/70' : 'text-ink-2'}`}>{body}</p>
            </div>
            <span className="serif text-[38px] leading-[42px] md:text-right">{total}</span>
            <span className={`eyebrow md:text-right ${index === 1 ? 'text-white/65' : 'text-ink-2'}`}>{timing}</span>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 grid gap-8 border-y border-[var(--color-rule)] py-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-16">
        <div>
          <span className="eyebrow block text-ink-2">Payment structure</span>
          <span className="serif mt-3 block text-[42px] leading-[46px]">50% / 50%</span>
        </div>
        <p className="max-w-[660px] text-[15px] leading-[24px] text-ink-2">Fifty percent of the selected scope is due to schedule and begin. The remaining fifty percent is due when the selected scope is complete, before final launch or handoff.</p>
      </Reveal>
    </section>
  )
}

function Boundaries() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 07 - Working boundaries" right="A focused first phase" />
      <div className="grid gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[760px] text-[52px] leading-[52px] md:text-[78px] md:leading-[74px] lg:text-[96px] lg:leading-[90px]">
            Clear enough to move fast.
          </h2>
        </Reveal>
        <Reveal className="max-w-[500px] pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">The initial engagement is built to create a strong launch without turning the first phase into a custom commerce platform.</p>
        </Reveal>
      </div>
      <div className="grid border-t border-[var(--color-rule)] md:grid-cols-2">
        {boundaries.map(([title, body], index) => (
          <Reveal key={title} className={`min-h-[190px] border-b border-[var(--color-rule)] py-8 md:p-9 ${index % 2 === 0 ? 'md:border-r md:pl-0' : ''}`}>
            <span className="eyebrow text-ink-2">{String(index + 1).padStart(2, '0')} / {title}</span>
            <p className="max-w-[560px] pt-6 text-[15px] leading-[24px]">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function NextStep() {
  return (
    <section className="bg-ink px-6 py-20 text-paper md:px-16 lg:px-[120px] lg:py-[120px]">
      <MetaRow left="§ 08 - Next step" right="Choose a direction" dark />
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-24">
        <Reveal>
          <h2 className="display max-w-[880px] text-[54px] leading-[54px] md:text-[82px] md:leading-[78px] lg:text-[104px] lg:leading-[96px]">
            Build the kind of electronics business people remember by name.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[500px] flex-col gap-6">
          <p className="text-[15px] leading-[24px] text-paper/65">Choose the scope that fits this stage. We will confirm the direction, send a simple agreement and first invoice, then schedule the work.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <AnchorButton href={chooseHref}>Choose a direction</AnchorButton>
            <AnchorButton href={calendarHref} variant="light">Schedule a proposal review</AnchorButton>
          </div>
        </Reveal>
      </div>
      <div className="mt-20 flex flex-col gap-5 border-t border-paper/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[11px] w-auto self-start brightness-0 invert sm:self-auto" />
        <span className="eyebrow text-paper/45">Prepared July 2026 - Valid for 30 days</span>
      </div>
    </section>
  )
}

export function DoubleUpDavesProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Double Up Daves - Proposal'
  }, [])

  return (
    <main className="double-up-daves-proposal min-h-screen overflow-x-hidden bg-paper text-ink">
      <ProposalNav />
      <Hero />
      <Opportunity />
      <Website />
      <Scope />
      <Timeline />
      <Investment />
      <Boundaries />
      <NextStep />
    </main>
  )
}
