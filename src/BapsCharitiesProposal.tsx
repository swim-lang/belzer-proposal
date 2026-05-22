import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const workSectionHref = '#work'

type LabelPair = [string, string]
type DetailRow = [string, string, string]
type GoalRow = [string, string, string, string, string]
type DeliverableRow = [string, string, string]
type TimelineRow = [string, string, string[]]
type NextStepRow = [string, string, string, string]
type WorkLink = {
  name: string
  href: string
  category: string
}
type Phase = {
  num: string
  title: string
  body: string
  outcome: string
  includes: string[]
}

const navSections: Array<{ id: string; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'work', label: 'Work' },
  { id: 'approach', label: 'Approach' },
  { id: 'deliverables', label: 'Deliverables' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Next Step' },
]

const pillars: LabelPair[] = [
  ['Strategy', 'Architecture and user paths that organize a large, global organization.'],
  ['System', 'A modern visual language that elevates the brand without losing legacy.'],
  ['Donate', 'A seamless donation and event participation experience across the site.'],
  ['Handoff', 'A clean Figma handoff your internal dev team can build from with confidence.'],
]

const heardSignals: DetailRow[] = [
  ['Scale', 'A global organization with the US site as one important hub', 'The work spans countries, languages, and decades - the digital experience should reflect that scale.'],
  ['Breadth', 'Work spans humanitarian relief, education, health, service, and disaster response', 'The breadth of activity needs a structure that helps each area find its audience.'],
  ['Surface', "The website is one of the organization's most important public-facing assets", "For donors, partners, and beneficiaries, it's often the first point of contact."],
  ['Gap', 'The current WordPress site makes the organization feel smaller than it is', "A site that doesn't yet match the scale and credibility of the work behind it."],
  ['Voice', 'A clearer message, stronger hierarchy, and a better way to express the spirit of service', 'Editorial structure to carry the depth of the mission, not just describe it.'],
  ['Events', 'Events and walkathons create major operational needs around registration and donation', 'A meaningful chunk of activity flows through participation paths that deserve real design.'],
  ['CMS', 'Local teams need a better way to contribute content across centers and countries', 'Templates that local contributors can use confidently without designing each page from scratch.'],
  ['Build', 'An internal development team that can build - focus our role on strategy, structure, and design', 'A clean Figma handoff your team can implement, not a black-box build.'],
  ['Donations', 'The donation and payment experience is a major opportunity to reduce vendor reliance', 'A more seamless donor experience - and potentially a way out of a costly third-party system.'],
]

const opportunityLines: string[] = [
  'Help donors understand the depth and credibility of the organization.',
  'Help volunteers find events and opportunities more easily.',
  'Let local centers share activity with a consistent structure.',
  'Give national and global teams confidence in managing content.',
  'Help partners and institutions understand the scale of the work.',
  'Reduce reliance on costly third-party donation systems.',
  'Let the dev team build from a system instead of solving each page from scratch.',
]

const goals: GoalRow[] = [
  ['G/01', 'Architecture', 'A clearer website architecture', 'Before we design screens, we organize navigation, key user paths, page templates, content hierarchy, and the relationship between global, national, local, event, and project content.', 'Easier to use for the people visiting it - easier to maintain for the teams behind it.'],
  ['G/02', 'System', 'A modern visual design system', "A new visual system that feels credible, warm, global, and service-led - elevating the digital experience while respecting the organization's identity, legacy, and cultural context.", 'Clear, generous, human, and trustworthy - without losing the spirit of service.'],
  ['G/03', 'Donation & events', 'A better donation and event experience', "Donation and event registration should feel easier, more seamless, and more connected to the larger site experience. We'll design the UX direction for donation and event participation paths inside this engagement.", 'Designed user paths now; technical migration scoped separately once the current setup is understood.'],
  ['G/04', 'Templates', 'A CMS-friendly template system', 'Flexible templates for events, projects, news, reports, locations, and activity categories - so local and global teams can publish without every page requiring custom design decisions.', 'A system that grows as new content is added, run by the people closest to it.'],
  ['G/05', 'Handoff', 'A Figma handoff the dev team can build from', 'Responsive designs, components, page templates, design system rules, motion prototypes, and UX guidance - packaged for your internal development team with clear handoff documentation.', 'Smooth handoff, reduced ambiguity, and confident implementation.'],
]

const selectedWork: WorkLink[] = [
  { name: 'Perlavi', href: 'https://perlavi.vercel.app/', category: 'Nonprofit reference' },
  { name: 'Safavi', href: 'https://safavi.org/', category: 'Nonprofit reference' },
  { name: 'ERC', href: 'https://erc.com/', category: 'Institutional website' },
  { name: 'Wild Hare Floral', href: 'https://wildharefloral.co/', category: 'Brand website' },
  { name: 'Duo', href: 'https://goduo.co/', category: 'Product website' },
  { name: 'Runway Botox', href: 'https://runwaybotox.framer.website/', category: 'Healthcare website' },
  { name: '206 Architects', href: 'https://206architects.com/', category: 'Architecture website' },
  { name: 'Sid Weber Law', href: 'https://sidweberlaw.com/', category: 'Professional services website' },
]

const sitemapBreakdown: LabelPair[] = [
  ['Global / utility', '11'],
  ['Activities, projects, programs', '41'],
  ['News categories', '4'],
  ['Reports category', '1'],
  ['Country / center entries', '168'],
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Discovery, strategy, and content direction',
    body: 'A focused discovery and audit phase to understand the organization, the current website, stakeholder priorities, donation and event flows, and what the development team needs for handoff.',
    outcome: 'A strategy document, content direction, and creative direction for the website system',
    includes: ['Stakeholder discovery', 'Audit of current website', 'Public sitemap and page-type review', 'Audience and user path review', 'Donation and event flow review', 'Content hierarchy review', 'Homepage message direction', 'Key page copy direction', 'CTA and donor language direction', 'CMS and publishing needs', 'Visual direction moodboard'],
  },
  {
    num: '02',
    title: 'Information architecture & UX system',
    body: 'We create the structural foundation of the redesigned site: how users move through it, how content is grouped, how calls to action work, and how the system supports global and local content.',
    outcome: 'A clear UX system the design and dev team can build from',
    includes: ['Navigation structure', 'Homepage structure', 'User paths', 'Project landing, project detail, news, reports', 'Events landing, event detail, walkathon path', 'Donation path concept', 'Country / center page template', 'Component library, CTA system, media treatment'],
  },
  {
    num: '03',
    title: 'Visual design system and page templates',
    body: 'We translate the strategy and UX into a full visual system: desktop and mobile designs, core page templates, component rules, media treatments, and a design language that can scale across the organization.',
    outcome: 'A responsive visual system for the website and CMS templates',
    includes: ['Homepage design', 'Core visual system', 'Page template design', 'Component library', 'Desktop and mobile system', 'Accessibility-aware considerations', 'CTA and donation design patterns'],
  },
  {
    num: '04',
    title: 'Motion and interaction prototypes',
    body: 'Motion can help the site feel more alive, more modern, and easier to navigate. We create motion prototypes for moments where movement supports clarity and emotion.',
    outcome: 'Motion prototypes documented inside the Figma file',
    includes: ['Homepage hero', 'Impact statistics', 'Volunteer and beneficiary stories', 'Event and walkathon discovery', 'Donation path moments', 'Country / center selection', 'Section and page transitions'],
  },
  {
    num: '05',
    title: 'Donation and event experience design',
    body: 'We design the donor and event participation experience as part of the website system: how a visitor finds an event, registers, donates, selects a location, understands the beneficiary, and receives confirmation.',
    outcome: 'A designed donation and event experience for implementation',
    includes: ['Donation flow UX', 'Event registration UX', 'Walkathon participation path', 'Find-an-event flow', 'Local beneficiary information structure', 'Confirmation page direction', 'Responsive donation experience'],
  },
  {
    num: '06',
    title: 'Figma handoff and development support',
    body: 'We package the design system clearly for the internal development team, with documentation, a meeting, and design QA during early implementation.',
    outcome: 'A clean Figma handoff and supporting documentation',
    includes: ['Organized Figma file', 'Desktop and mobile layouts', 'Component library', 'Design system rules and template docs', 'Motion prototypes', 'Developer handoff meeting + Q&A', 'Design QA during early implementation'],
  },
]

const deliverables: DeliverableRow[] = [
  ['Website audit summary', "A clear read of what's working, what's not, and what to carry forward.", 'Strategy'],
  ['Recommended site architecture', 'The map that organizes global, national, local, event, and project content.', 'Strategy'],
  ['User path recommendations', 'How donors, volunteers, partners, and beneficiaries move through the system.', 'Strategy'],
  ['Creative direction moodboard', 'Mood, palette, and visual references the design system is built from.', 'Strategy'],
  ['Navigation and homepage structure', 'The first surfaces a visitor meets - designed for clarity and weight.', 'UX'],
  ['Donation and event flow direction', 'Participation paths designed as part of the website system, not bolted on.', 'UX'],
  ['CMS-friendly template structure', 'Templates local and global teams can publish from without designing each page.', 'UX'],
  ['Responsive visual design system', 'One coherent visual language across desktop, tablet, and mobile.', 'System'],
  ['Homepage and About / Mission designs', 'Two pages that carry the first impression of the organization.', 'Design'],
  ['What We Do, activity, and project page templates', "The breadth of the work, organized so it's easy to follow.", 'Design'],
  ['Events landing and event detail templates', 'Events designed to invite participation, not just announce it.', 'Design'],
  ['Walkathon and registration path concept', 'A clearer path from interest to participation.', 'Design'],
  ['Donation path concept', 'A more seamless donor experience inside the site itself.', 'Design'],
  ['News, article, and reports designs', "Editorial templates that make the organization's reporting easy to read.", 'Design'],
  ['Country / center page template', 'A consistent home for each location to live in.', 'Design'],
  ['Contact and search / utility direction', 'The smaller surfaces, designed with the same care as the main pages.', 'Design'],
  ['Component library and motion prototypes', 'The reusable system, with interaction prototypes for development.', 'System'],
  ['Figma handoff file + developer notes', 'The full handoff your dev team can build directly from.', 'Handoff'],
]

const timeline: TimelineRow[] = [
  ['Phase 01 · Weeks 1-2', 'Discovery & audit', ['Stakeholder discovery', 'Website audit', 'Sitemap and content review', 'Donation and event flow review', 'Creative direction moodboard', 'Website strategy summary']],
  ['Phase 02 · Weeks 3-4', 'Architecture & UX', ['Navigation structure', 'User paths', 'Wireframe-level UX direction', 'Donation and event experience structure', 'CMS template planning']],
  ['Phase 03 · Weeks 5-7', 'Visual design', ['Homepage design', 'Core visual system', 'Page template design', 'Component library', 'Desktop and mobile system', 'Motion prototypes']],
  ['Phase 04 · Weeks 8-10', 'Templates & handoff', ['Template refinement', 'Donation & event flow refinement', 'Responsive design refinements', 'Figma organization', 'Developer handoff notes & meeting', 'Early implementation QA support']],
]

const investmentLines: DetailRow[] = [
  ['Discovery & strategy', '$7,500', 'Stakeholder discovery, website audit, sitemap and user path review, donation & event flow review, creative direction, and website strategy summary.'],
  ['IA & UX system', '$8,500', 'Navigation structure, user paths, wireframe-level UX direction, donation and event structure, and CMS template planning.'],
  ['Design system & templates', '$21,000', 'Full Figma design system, desktop and mobile designs, core page templates, component library, CTA system, and accessibility-aware considerations.'],
  ['Motion & handoff', '$6,500', 'Motion prototypes, interaction direction, Figma organization, developer handoff documentation and meeting, and early implementation design QA.'],
]

const optionalIncludes: string[] = ['Review of the current donation and registration system', 'Payment gateway recommendation', 'Donation flow structure', 'Event registration flow structure', 'Walkathon participation flow', 'Donor confirmation and receipt flow', 'Admin and reporting requirements', 'Data and migration review', 'Security and permissions considerations', 'Integration plan for the internal dev team', 'Figma designs for key donation and event screens', 'Implementation support and QA guidance']
const optionalDeliverables: string[] = ['Recommended replacement approach', 'Donation and event registration UX flow', 'Key Figma screens for donation and registration', 'Admin and reporting requirements summary', 'Payment gateway and integration recommendations', 'Migration considerations', 'Development handoff notes', 'QA checklist and launch support guidance']

const whyMatters: LabelPair[] = [
  ['A clearer digital presence', 'First impression that matches the work'],
  ['A stronger first impression for donors and partners', 'Credibility carried through the entire site'],
  ['A better structure for events, projects, reports, and news', 'Each area gets the room to be itself'],
  ['A more intuitive path for donations and walkathon participation', 'The flow people deserve when they want to give time or money'],
  ['A CMS-friendly system for local and global contributors', 'Local teams empowered without designing each page'],
  ['A visual design system the development team can build from', 'Decisions made once, applied everywhere'],
  ['A foundation that can reduce vendor dependency over time', 'Less reliance on costly third-party systems'],
]

const futureOpportunities: string[] = [
  'Donation portal implementation support',
  'Design QA during development',
  'CMS training and contributor publishing guides',
  'Content strategy',
  'Impact report design',
  'Event and walkathon campaign templates',
  'Email design system',
  'Donor journey design',
  'AI-assisted internal training tools',
  'AI-readable content and metadata systems',
  'Implementation review and creative direction during build',
  'Ongoing design partnership',
]

const nextSteps: NextStepRow[] = [
  ['01', 'Meet with the key stakeholders', 'A working session with the people whose voices should shape the direction: board, internal team, development team.', 'Within the week'],
  ['02', 'Confirm the first priority', 'Decide whether to begin with the full website design system or the donation portal first. Both paths lead to the same place - the order is yours.', 'A single decision'],
  ['03', 'Review technical details', 'Your development team shares the current setup, CMS, payment provider, and integration points. We get on the same page before discovery begins.', 'In parallel with kickoff'],
  ['04', 'Begin discovery', 'Map the website structure and start building a design system worthy of generations of service.', 'Week 1 of the engagement'],
]

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

function BapsNav() {
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
          <span className="eyebrow text-ink-2">Prepared for BAPS Charities</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Website System & Donation Experience</span>
          <span className="eyebrow">May 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] tracking-[-0.01em] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              BAPS Charities
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
              Begin project
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
          <span className="eyebrow text-ink-2">§ 01 - Proposal</span>
          <span className="eyebrow text-ink">Website System & Donation Experience</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Prepared for BAPS Charities</span>
          <span className="eyebrow text-ink-2">By Anchovies</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1180px] pb-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[120px] lg:leading-[104px]">
          A digital home worthy of generations of service.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            A website system designed to express the scale, clarity, and care of BAPS Charities - delivered as a comprehensive Figma handoff for your internal development team.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            BAPS Charities already has the story, the scale, and the community behind it. This phase gives that work a digital presence with the same level of clarity, care, and credibility.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Begin the project ->'}</AnchorButton>
            <AnchorButton href={workSectionHref} variant="outline">
              View our work
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)] pt-12">
        <MetaRow left="Fig. 01 - What this phase shapes" right="Four sections" />
        <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
          {pillars.map(([title, body], index) => (
            <div key={title} className={`flex min-h-[250px] flex-col gap-6 border-[var(--color-rule)] p-8 ${index < pillars.length - 1 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
              <span className="eyebrow text-ink-2">Section {String(index + 1).padStart(2, '0')}</span>
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
      <MetaRow left="§ 02 - What we heard" right="Legacy and engagement" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[700px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[78px] md:leading-[78px]">
            BAPS Charities has two powerful advantages: legacy and engagement.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>This is a generational organization. People are not simply volunteering once and moving on. Families participate across years, decades, and generations.</p>
          <p>Volunteers show up weekly, sometimes daily, outside of their professional lives to serve their communities.</p>
          <p className="text-ink">The website should help people feel that immediately.</p>
        </Reveal>
      </div>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 02 - What stood out from our conversation" right="Nine notes" />
        <div className="mt-8 border-t border-[var(--color-rule)]">
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
      <MetaRow left="§ 03 - The opportunity" right="What a stronger website unlocks" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.1fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[680px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            A nonprofit website has to do several jobs at once.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>It has to inspire trust. Explain the mission. Move people toward action. Organize a lot of content. Support events, donations, reports, and media.</p>
          <p className="text-ink">For BAPS Charities, the impact is already significant. The digital experience should make that impact easier to see, easier to navigate, and easier to support.</p>
        </Reveal>
      </div>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 03 - A stronger website can help" right="Seven outcomes" />
        <div className="mt-8 border-t border-[var(--color-rule)]">
          {opportunityLines.map((line, index) => (
            <div key={line} className="grid gap-5 border-b border-[var(--color-rule)]/20 py-6 md:grid-cols-[96px_1fr] md:gap-8">
              <span className="serif text-[28px] leading-[28px] tracking-[-0.018em]">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-[18px] font-medium leading-[26px] tracking-[-0.01em]">{line}</h3>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 - Selected web work" right="Live websites" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.1fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            A few live references, built for the web.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>These references can be reviewed directly as live websites, with real navigation, interaction, and responsive behavior in view.</p>
          <p className="text-ink">The first two are especially relevant nonprofit references.</p>
        </Reveal>
      </div>
      <Reveal className="pt-20">
        <div className="grid border-t border-[var(--color-rule)] md:grid-cols-2">
          {selectedWork.map((item, index) => {
            const domain = new URL(item.href).hostname.replace(/^www\./, '')

            return (
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
                      <span>{domain}</span>
                      <span>Open site -&gt;</span>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}

function DarkInterlude() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[160px]">
      <MetaRow left="§ 05 - Why this matters" right="A spirit, not just a site" dark />
      <div className="grid gap-12 border-t border-paper/20 pt-16 lg:grid-cols-[1.5fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[900px] text-[52px] italic leading-[58px] tracking-[-0.024em] md:text-[88px] md:leading-[92px]">
            "Service is the substance."
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[390px] flex-col gap-6 pt-5 text-[15px] leading-[24px] text-paper/70">
          <p>BAPS Charities is a generational organization. Volunteers show up weekly, sometimes daily, alongside their professional lives.</p>
          <p>This phase is about making that depth easier to recognize - for new visitors, longtime donors, and the partners still ahead.</p>
        </Reveal>
      </div>
    </section>
  )
}

function PhaseGoals() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 06 - What this phase creates" right="Five outcomes" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            A foundation the team can build from for years.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          Five outcomes shape this engagement. Each one stands on its own - together, they create a website system that grows with the organization rather than fighting it.
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {goals.map(([num, label, title, body, outcome]) => (
          <Reveal key={num} className="grid gap-8 border-b border-[var(--color-rule)] py-10 lg:grid-cols-[160px_1.3fr_360px] lg:gap-14">
            <div>
              <span className="serif block text-[54px] leading-[54px] tracking-[-0.02em]">{num}</span>
              <span className="eyebrow mt-4 block text-ink-2">{label}</span>
            </div>
            <div className="max-w-[590px]">
              <h3 className="serif pb-4 text-[34px] leading-[40px] tracking-[-0.016em]">{title}</h3>
              <p className="text-[15px] leading-[24px] text-ink-2">{body}</p>
            </div>
            <div className="max-w-[360px] pt-2">
              <span className="eyebrow text-ink-2">Outcome</span>
              <p className="mt-4 text-[13px] leading-[20px]">{outcome}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Approach() {
  return (
    <section id="approach" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 07 - Our approach" right="Six phases, in order" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Six phases, from discovery through development support.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          Each phase carries the work forward - and each one stands as a meaningful deliverable in its own right. We move in sequence, but the value compounds.
        </Reveal>
      </div>
      <Reveal className="mb-10 border border-[var(--color-rule)] bg-ink/5 p-7 md:p-10 lg:p-12">
        <MetaRow left="Fig. A - Site size · public sitemap" right="Counted, not estimated" />
        <div className="grid gap-10 pt-8 lg:grid-cols-[250px_1fr_280px] lg:gap-16">
          <div>
            <div className="serif text-[92px] leading-[86px] tracking-[-0.03em] md:text-[120px] md:leading-[108px]">~225</div>
            <span className="eyebrow mt-5 block text-ink-2">Distinct content entries</span>
          </div>
          <div className="flex max-w-[560px] flex-col gap-4 text-[15px] leading-[24px]">
            <p>The current website is a large content system, not a small brochure site.</p>
            <p className="text-ink-2">Based on the public sitemap, we counted roughly 225 distinct content entries, including approximately 168 country and center entries alone.</p>
            <p className="text-ink-2">The design needs a flexible system that can hold global content, local activity, event registration, donation paths, reports, news, and center-level publishing with consistency.</p>
          </div>
          <div className="flex flex-col gap-3 border-t border-[var(--color-rule)]/20 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <span className="eyebrow text-ink-2">Breakdown</span>
            {sitemapBreakdown.map(([label, count]) => (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <span className="text-[13px] leading-[20px] text-ink-2">{label}</span>
                <span className="serif text-[20px] leading-[24px]">{count}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-7 border-t border-[var(--color-rule)]/20 pt-4 text-[12px] italic leading-[18px] text-ink-2">
          Counted from the public sitemap. Does not include hidden admin pages, payment flows, donor data, or internal tools - those will be confirmed during discovery.
        </p>
      </Reveal>
      <div className="border-t border-[var(--color-rule)]">
        {phases.map((phase) => (
          <Reveal key={phase.num} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[120px_1.2fr_360px] lg:gap-14">
            <div>
              <span className="serif block text-[58px] leading-[58px] tracking-[-0.02em]">{phase.num}</span>
              <span className="eyebrow mt-4 block text-ink-2">Phase</span>
            </div>
            <div className="max-w-[640px]">
              <h3 className="serif pb-5 text-[34px] leading-[40px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="pb-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
              <span className="inline-flex rounded-full bg-ink/5 px-4 py-2 text-[12px] font-medium leading-[16px]">Outcome - {phase.outcome}</span>
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
      <MetaRow left="§ 08 - Final deliverables" right="Everything BAPS walks away with" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            A website system, line by line.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A clear picture of what's included. Each item is a deliverable your team can find inside the final Figma file or accompanying documentation.
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
      <MetaRow left="§ 09 - Timeline" right="Eight to ten weeks · four phases" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            From discovery to handoff in eight to ten weeks.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          This timeline covers design, UX, motion prototypes, and Figma handoff. Development timeline depends on the internal dev team's schedule, CMS decisions, payment provider decisions, and implementation complexity.
        </Reveal>
      </div>
      <Reveal className="grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
        {timeline.map(([when, title, items], index) => (
          <div key={when} className={`flex min-h-[360px] flex-col gap-6 border-[var(--color-rule)]/25 p-8 ${index < timeline.length - 1 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
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
      <MetaRow left="§ 10 - Investment" right="Design engagement · full scope" />
      <div className="grid gap-12 py-16 lg:grid-cols-[1.4fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display text-[78px] leading-[82px] tracking-[-0.035em] sm:text-[120px] sm:leading-[116px] md:text-[150px] md:leading-[140px]">
            $42,500
          </h2>
          <span className="eyebrow mt-6 block text-ink-2">Total · Eight to ten weeks · Design engagement</span>
        </Reveal>
        <Reveal className="flex max-w-[470px] flex-col gap-5 pt-4 text-[15px] leading-[24px]">
          <p>This investment covers discovery, information architecture, the full visual design system, donation and event experience design, motion prototypes, and a comprehensive Figma handoff for your internal development team.</p>
          <p className="text-ink-2">The technical transition away from the current payment provider is scoped separately below - it depends on the current setup, donor data, payment processor, and reporting needs.</p>
        </Reveal>
      </div>
      <Reveal className="grid border-t border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
        {investmentLines.map(([title, price, body], index) => (
          <div key={title} className={`flex min-h-[260px] flex-col gap-4 border-[var(--color-rule)]/20 p-8 ${index < investmentLines.length - 1 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">{title}</span>
            <span className="serif text-[32px] leading-[36px]">{price}</span>
            <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 04 - Optional phase" right="A focused replacement for the current vendor setup" />
        <div className="mt-8 border border-[var(--color-rule)]">
          <div className="grid gap-8 border-b border-[var(--color-rule)]/20 p-7 md:p-10 lg:grid-cols-[1fr_360px] lg:p-12">
            <div className="max-w-[740px]">
              <span className="eyebrow text-ink-2">Optional phase</span>
              <h3 className="serif mt-4 text-[36px] leading-[42px] tracking-[-0.018em] md:text-[48px] md:leading-[52px]">
                Donation and Event Registration System Replacement
              </h3>
              <p className="mt-5 text-[15px] leading-[24px] text-ink-2">
                The donation and event registration experience appears to be one of the clearest opportunities for operational improvement and long-term savings. This can begin before the full website redesign if the board wants to address the current payment vendor first.
              </p>
            </div>
            <div className="flex flex-col gap-4 lg:items-end lg:text-right">
              <span className="eyebrow text-ink-2">Estimated investment</span>
              <span className="serif text-[48px] leading-[52px] tracking-[-0.02em] md:text-[68px] md:leading-[68px]">$5,500-$7,500</span>
              <p className="max-w-[280px] text-[12px] leading-[18px] text-ink-2">Pending technical access and migration requirements.</p>
            </div>
          </div>
          <div className="grid gap-0 border-b border-[var(--color-rule)]/20 lg:grid-cols-2">
            <div className="border-b border-[var(--color-rule)]/20 p-7 md:p-10 lg:border-b-0 lg:border-r lg:p-12">
              <span className="eyebrow mb-5 block text-ink-2">What this phase includes</span>
              <InlineList items={optionalIncludes} />
            </div>
            <div className="p-7 md:p-10 lg:p-12">
              <span className="eyebrow mb-5 block text-ink-2">Deliverables</span>
              <InlineList items={optionalDeliverables} />
            </div>
          </div>
          <div className="grid gap-5 bg-ink/5 p-7 md:grid-cols-[140px_1fr] md:p-8 lg:px-12">
            <span className="eyebrow text-ink-2">Pricing note</span>
            <p className="text-[13px] leading-[20px] text-ink-2">
              The estimate assumes the internal development team will handle core implementation. If historical donor data migration, CRM integration, complex reporting, recurring donations, multi-country payment logic, or custom admin tools are required, we'll confirm the final cost after reviewing the current setup.
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 05 - Payment structure" right="50 · 25 · 25" />
        <div className="mt-8 grid border-y border-[var(--color-rule)] md:grid-cols-3">
          {[
            ['50%', 'Due at kickoff', 'Engagement begins on receipt.'],
            ['25%', 'Due after UX & visual direction', 'After the architecture and visual direction presentation.'],
            ['25%', 'Due before final Figma handoff', 'Before final delivery and developer handoff meeting.'],
          ].map(([amount, title, body], index) => (
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

function WhyThisMatters() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 11 - Why this is the right first phase" right="What BAPS gets out of this phase" />
      <Reveal>
        <h2 className="display max-w-[1120px] border-t border-[var(--color-rule)] py-16 text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
          BAPS Charities has the legacy, reach, and volunteer energy of a global organization. The website should make that easier to see.
        </h2>
      </Reveal>
      <Reveal className="border-t border-[var(--color-rule)]">
        {whyMatters.map(([title, body]) => (
          <div key={title} className="grid gap-5 border-b border-[var(--color-rule)]/20 py-8 md:grid-cols-[120px_1fr_280px] md:items-center md:gap-8">
            <span className="eyebrow text-ink-2">Access</span>
            <h3 className="serif text-[30px] leading-[36px] tracking-[-0.014em] md:text-[34px] md:leading-[40px]">{title}</h3>
            <p className="text-[13px] leading-[20px] text-ink-2 md:text-right">{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function FutureOpportunities() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 12 - Future opportunities" right="Beyond this phase" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[44px] leading-[48px] tracking-[-0.024em] md:text-[60px] md:leading-[64px]">
            After this phase, we can continue supporting BAPS Charities as needed.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A relationship designed to grow alongside the organization - not a single deliverable handed off and forgotten. The next chapter is yours to choose.
        </Reveal>
      </div>
      <Reveal className="grid border-t border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
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
      <MetaRow left="§ 13 - Next step" right="From alignment to action" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[44px] leading-[48px] tracking-[-0.024em] md:text-[60px] md:leading-[64px]">
            If this direction feels aligned, the next step is simple.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          Four steps from this proposal to a design system worthy of the service already happening across the organization.
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)]">
        {nextSteps.map(([num, title, body, timing]) => (
          <div key={num} className="grid gap-8 border-b border-[var(--color-rule)]/20 py-10 lg:grid-cols-[120px_1.2fr_320px] lg:gap-14">
            <span className="serif text-[56px] leading-[56px] tracking-[-0.02em]">{num}</span>
            <div className="max-w-[650px]">
              <h3 className="serif pb-4 text-[34px] leading-[40px] tracking-[-0.016em]">{title}</h3>
              <p className="text-[15px] leading-[24px] text-ink-2">{body}</p>
            </div>
            <span className="eyebrow pt-3 text-ink-2">{timing}</span>
          </div>
        ))}
      </Reveal>
      <Reveal className="flex flex-wrap gap-4 pt-10">
        <AnchorButton>{'Begin the kickoff ->'}</AnchorButton>
        <AnchorButton href={workSectionHref} variant="outline">
          View our work
        </AnchorButton>
      </Reveal>
    </section>
  )
}

function Closing() {
  return (
    <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[170px]">
      <MetaRow left="§ 14 - In closing" right="Where this leads" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] border-t border-paper/20 py-16 text-[52px] leading-[56px] tracking-[-0.024em] md:text-[94px] md:leading-[92px] lg:text-[116px] lg:leading-[110px]">
          A foundation worthy of generations of service.
        </h2>
      </Reveal>
      <div className="grid gap-10 pt-4 lg:grid-cols-[520px_380px] lg:gap-20">
        <Reveal>
          <p className="text-[15px] leading-[24px] text-paper/70">
            By the end of ten weeks, BAPS Charities has the website system it needs to move - credible enough for the donor reading at home, structured enough for the local team in the field, generous enough for the volunteer who shows up week after week.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-4">
          <span className="eyebrow text-paper/60">Begin</span>
          <div>
            <AnchorButton variant="light">{'Begin the kickoff ->'}</AnchorButton>
          </div>
          <p className="text-[13px] leading-[20px] text-paper/60">$42,500 · Eight to ten weeks · Full website design system</p>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-5 border-t border-[var(--color-rule)] bg-paper px-6 py-8 text-ink-2 md:flex-row md:items-center md:justify-between md:px-16 lg:px-[120px]">
      <div className="flex items-center gap-5">
        <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
        <span className="eyebrow text-ink">Anchovies</span>
        <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
        <span className="eyebrow">Prepared for BAPS Charities</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">May 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function BapsCharitiesProposal() {
  useEffect(() => {
    document.title = 'Anchovies x BAPS Charities - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A website system and donation experience proposal for BAPS Charities from Anchovies.')
    }
  }, [])

  return (
    <main className="baps-charities-proposal bg-paper text-ink">
      <BapsNav />
      <Hero />
      <WhatWeHeard />
      <Opportunity />
      <SelectedWork />
      <DarkInterlude />
      <PhaseGoals />
      <Approach />
      <Deliverables />
      <Timeline />
      <Investment />
      <WhyThisMatters />
      <FutureOpportunities />
      <NextStep />
      <Closing />
      <Footer />
    </main>
  )
}
