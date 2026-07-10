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
type Phase = {
  num: string
  title: string
  body: string
  outcome: string
  includes: string[]
  listLabel?: string
}
type WorkLink = {
  name: string
  href: string
  category: string
}
type OptionalPhase = {
  label: string
  title: string
  price: string
  body: string
  items: string[]
  note: string
}

const navSections: Array<{ id: string; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'heard', label: 'What We Heard' },
  { id: 'opportunity', label: 'Opportunity' },
  { id: 'work', label: 'Work' },
  { id: 'goals', label: 'Goals' },
  { id: 'approach', label: 'Approach' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
  { id: 'next', label: 'Launch' },
]

const pillars: LabelPair[] = [
  ['Identity', 'A sharpened brand system: more precise, more useful, more differentiated.'],
  ['Site', 'A focused launch website: streamlined, strong, and flexible.'],
  ['Story', 'A clear case for founders, policymakers, and press in the first few seconds.'],
  ['Release', 'A publishing system for the public moments still ahead this summer.'],
]

const heardSignals: DetailRow[] = [
  ['Audience', 'Speak to two worlds at once: startup founders and Washington decision-makers', 'The site needs to land for both audiences with one clear voice.'],
  ['Visual', 'Stand apart from the conventional DC trade association look', "Familiar visual cues won't signal that LTA is a new kind of organization."],
  ['Voice', 'Feel digital-native, current, and connected to the technology community', 'The site should look like it was built by the world it represents.'],
  ['Weight', 'Carry enough seriousness for Hill offices, press, and coalition work', 'Startup energy with the credibility of a serious policy actor.'],
  ['Starting point', 'The existing identity has useful instincts: triangle, delta, workshop energy', 'A real starting point. The work is making it more intentional and easier to use.'],
  ['Craft', 'Avoid the visual sameness that AI-generated design can quickly create', 'Specific choices, made on purpose and shaped for the organization.'],
  ['Window', 'Late June is meaningful: it opens a sequence of public tentpoles before August', 'Launch with momentum that carries through the summer.'],
  ['Scale', 'The site can begin focused, then grow as releases, polling, and briefs arrive', 'A launch site today; a publishing system as LTA expands.'],
]

const selectedWork: WorkLink[] = [
  { name: 'Avodah Legal', href: 'https://www.avodahlegal.com/', category: 'Legal website' },
  { name: 'Lex Politica', href: 'https://lexpolitica.com/', category: 'Policy website' },
  { name: 'Political Law Group', href: 'https://tplg-homepage.vercel.app/', category: 'Legal website' },
  { name: 'ERC', href: 'https://erc.com/', category: 'Institutional website' },
  { name: 'Heartwood', href: 'https://swim-lang.github.io/heartwood/', category: 'Health and wellness' },
  { name: 'Perlavi', href: 'https://perlavi.vercel.app/', category: 'Nonprofit website' },
  { name: 'Wild Hare Floral', href: 'https://wildharefloral.co/', category: 'Brand website' },
  { name: 'Duo', href: 'https://goduo.co/', category: 'Product website' },
  { name: 'Runway Botox', href: 'https://runwaybotox.framer.website/', category: 'Healthcare website' },
  { name: '206 Architects', href: 'https://206architects.com/', category: 'Architecture website' },
]

const goals: GoalRow[] = [
  ['G/01', 'Brand', 'A sharper brand system for launch', 'Refine the existing identity into a cleaner, more functional, more launch-ready system: the mark, lockups, color, typography, and the core visual rules the website and first wave of materials need to feel made on purpose.', 'A precise, useful, differentiated system ready to ship.'],
  ['G/02', 'Site', 'A focused website built for the launch window', 'Streamlined, strong, flexible. Introduce the organization, make the case for little tech, provide a way to join, and create a publishing path for future polling, briefs, statements, and news.', 'Built quickly enough to ship in late June; structured enough to grow.'],
  ['G/03', 'Story', 'A clear story for founders, policymakers, and press', "Shape the core website copy, hierarchy, CTA language, and launch narrative so design and language do the same work. LTA's message is strong; the site organizes it so clarity hits in the first few seconds.", 'One legible message for each audience, in their language.'],
  ['G/04', 'Releases', 'A system for future releases', 'A simple publishing structure for polling, amicus briefs, policy statements, and campaign moments so LTA can keep adding content after launch without reinventing the site each time.', 'Designed once; reusable across every tentpole through August and beyond.'],
]

const phases: Phase[] = [
  {
    num: '01',
    title: 'Rapid brand and website alignment',
    body: 'A focused sprint to align on brand, launch goals, audiences, website structure, and the late June path. This gives the work a shared direction before design and build move quickly.',
    outcome: 'A clear direction summary and launch plan',
    includes: ['Stakeholder kickoff', 'Review of current brand materials', 'Competitive visual scan', 'Audience and launch goal discussion', 'Brand system recommendations', 'Website structure planning', 'Homepage story direction', 'Launch priorities and timeline alignment'],
  },
  {
    num: '02',
    title: 'Brand refinement system',
    body: 'Refine the identity so it can support the website and launch materials with more clarity, consistency, and visual power.',
    outcome: 'A refined launch-ready brand system + light brand guide',
    includes: ['Logo refinement', 'Primary and secondary lockup direction', 'Little Tech vs. Little Tech Association usage', 'Color palette refinement', 'Typography recommendations', 'Graphic motif / visual system', 'CTA styling + social/profile direction', 'Light brand guide'],
  },
  {
    num: '03',
    title: 'Website strategy and copy direction',
    body: 'Shape the site around what users need to understand and do: founders, members, policy offices, press, and supporters.',
    outcome: 'A clear content structure and copy framework',
    includes: ['Website architecture', 'Homepage narrative', 'Core copy direction', 'CTA language', 'Audience path planning', 'Founder / member path', 'Policy / press path', 'Release template planning'],
  },
  {
    num: '04',
    title: 'Website design and build',
    body: 'Design and build the launch website. Current, sharp, and energetic enough for the public moment while staying clear enough for policy and press.',
    outcome: 'A live launch site with the refined brand and content system',
    includes: ['Desktop + mobile design', 'Homepage design and build', 'Core interior page design and build', 'Updates / releases template', 'Membership or contact CTA flow', 'Responsive build', 'Foundational SEO + basic analytics', 'Launch QA'],
  },
  {
    num: '05',
    title: 'Motion and launch polish',
    body: 'Motion can help the site feel sharper and more digital-native when it supports meaning. We keep it restrained, useful, and launch-ready.',
    outcome: 'Light motion moments built into the site with restraint',
    listLabel: 'Interaction areas',
    includes: ['Homepage hero', 'Logo / mark behavior', 'Section transitions', 'CTA moments', 'Release cards', 'Issue / priority modules', 'Data or polling reveal modules', 'Light motion documentation'],
  },
  {
    num: '06',
    title: 'Launch handoff and support',
    body: 'We support the final launch process so the site is ready for the public window and organized for what comes next.',
    outcome: 'A launch-ready site, organized assets, and a clean support window',
    includes: ['Final QA', 'Responsive testing', 'Basic browser testing', 'Analytics check', 'Launch coordination', 'Light documentation', 'Handoff of logo and web assets', 'One post-launch support window'],
  },
]

const deliverables: DeliverableRow[] = [
  ['Brand and website direction summary', 'A short, decisive document that aligns everyone on the launch direction.', 'Strategy'],
  ['Creative direction moodboard + competitive scan', 'Mood, palette, and visual references against the policy-org landscape.', 'Strategy'],
  ['Logo refinement and lockup direction', 'Refined mark with primary, secondary, and usage rules.', 'Brand'],
  ['Color palette and typography system', 'The visual backbone of every LTA touchpoint.', 'Brand'],
  ['Graphic motif / visual system', 'A signature visual idea that differentiates LTA in the policy space.', 'Brand'],
  ['Light brand guide', 'A practical reference for the team and outside collaborators.', 'Brand'],
  ['Website architecture and copy direction', 'Homepage narrative, page structure, and CTA language.', 'Story'],
  ['Desktop website design', 'Every page designed for the device most policy and press users will see first.', 'Design'],
  ['Mobile website design', 'The same pages, designed for the device founders and press read on the move.', 'Design'],
  ['Homepage build', 'The first surface of LTA, built and ready.', 'Build'],
  ['Core interior page builds', 'About, Issues, Membership, Updates, Contact: built and live.', 'Build'],
  ['Updates / releases template', 'The publishing path for every tentpole that follows the launch.', 'Build'],
  ['Membership or contact CTA flow', 'A simple, on-brand way to capture interest and intent.', 'Build'],
  ['Light motion and interaction', 'Restrained motion that makes the site feel current and intentional.', 'Motion'],
  ['Launch handoff: assets, SEO, analytics, support window', 'Foundational SEO, basic analytics, asset exports, and a post-launch support window.', 'Handoff'],
]

const timeline: TimelineRow[] = [
  ['Week 01', 'Brand & website alignment', ['Kickoff', 'Review current brand materials', 'Competitive visual scan', 'Website structure', 'Creative direction', 'Brand refinement direction']],
  ['Week 02', 'Refinement & homepage', ['Logo refinement', 'Color and typography system', 'Homepage copy direction', 'Homepage design', 'Core visual system']],
  ['Week 03', 'Build & interior pages', ['Homepage build', 'Interior page designs', 'Updates / releases template', 'Membership or contact CTA flow', 'Mobile design', 'Motion moments']],
  ['Week 04', 'Refinement, QA & launch', ['Final refinements', 'Responsive QA', 'Analytics and SEO setup', 'Launch coordination', 'Asset handoff', 'Post-launch support window']],
]

const investmentLines: DetailRow[] = [
  ['Brand & website alignment', '$3,000', 'Kickoff, brand review, competitive scan, audience discussion, launch planning, creative direction, and website structure.'],
  ['Brand refinement', '$4,500', 'Logo refinement, lockups, color, typography, visual language, CTA styling, social/profile direction, and light brand guide.'],
  ['Strategy & copy direction', '$3,500', 'Website architecture, homepage narrative, core copy direction, CTA language, audience paths, and release template planning.'],
  ['Design, build, motion & launch', '$8,500', 'Desktop and mobile design, homepage build, core interior pages, releases template, light motion, responsive build, SEO, analytics, QA, and launch support.'],
]

const optionalPhases: OptionalPhase[] = [
  {
    label: 'Optional · Per release',
    title: 'Tentpole release support',
    price: '$3,500 / release',
    body: 'After launch, LTA will have several public moments. Each can be supported with design and web work tailored to the moment: polling, amicus, statement, or campaign.',
    items: ['Polling, amicus brief, or policy statement page', 'Social and press graphics', 'Email or announcement graphics', 'Simple paid media creative', 'Release-specific visual treatment', 'Page publishing support'],
    note: 'Used as needed without locking the organization into a monthly retainer.',
  },
  {
    label: 'Optional · Post-launch',
    title: 'Site expansion phase',
    price: 'Custom estimate',
    body: 'Once the first version is live, we can expand the site based on what the organization needs next, scoped after the launch site is live and the first few tentpoles begin.',
    items: ['Member resources / coalition directory', 'Research library', 'Policy issue pages', 'Newsroom and media center', 'Event pages, press kit, partner pages', 'Campaign pages'],
    note: 'Estimate confirmed once the launch site is live and the first tentpoles begin.',
  },
]

const paymentStructure: DetailRow[] = [
  ['50%', 'Due at kickoff', 'Sprint begins on receipt.'],
  ['25%', 'Due after homepage + brand direction', 'After the homepage and brand direction presentation.'],
  ['25%', 'Due before launch', 'Before the site goes live for the late June window.'],
]

const whyMatters: LabelPair[] = [
  ['A sharper public identity', 'Made on purpose, ready for launch'],
  ['A website built for immediate launch', 'Live in late June, structured to grow'],
  ['A clearer message for founders, policymakers, press, and supporters', 'Each audience served with clarity'],
  ['A release structure for future public moments', 'Polling, briefs, statements ready to ship'],
  ['A visual system that stands apart in the policy space', 'Recognizable inside crowded coverage'],
  ['A foundation that can expand after launch', 'Scopes added as the organization scales'],
  ['A digital presence with the energy of a new kind of trade association', "Different from the room it's entering"],
]

const futureOpportunities: string[] = [
  'Post-launch release support',
  'Expanded policy pages',
  'Polling and research pages',
  'Press kit design',
  'Social and paid media creative',
  'Launch campaign graphics',
  'Member presentation materials',
  'Event materials',
  'Coalition graphics',
  'Motion assets',
  'Ongoing website expansion',
  'Future brand evolution',
]

const nextSteps: NextStepRow[] = [
  ['01', 'Confirm and kick off', 'Confirm direction, lock the launch window, and schedule a 60-minute kickoff with the founding stakeholders.', 'Within 48 hours'],
  ['02', 'Sprint', 'Four weeks of focused work. Refine the brand, structure the site, design and build the launch experience.', 'Weeks 1-4'],
  ['03', 'Launch', 'Late June, with a publishing system ready for the polling, briefs, and statements still ahead this summer.', 'Late June + a post-launch support window'],
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

function LittleTechNav() {
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
          <span className="eyebrow text-ink-2">Prepared for Luther Lowe · Harrison Godfrey</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Launch sprint · v1</span>
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
              Little Tech Association
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
              Begin sprint
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
          <span className="eyebrow text-ink">Brand Refinement & Launch Website</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          <span className="eyebrow text-ink-2">Prepared for Luther Lowe · Harrison Godfrey</span>
          <span className="eyebrow text-ink-2">By Anchovies</span>
        </Reveal>
      </div>
      <Reveal>
        <h1 className="display max-w-[1180px] pb-12 text-[54px] leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[120px] lg:leading-[104px]">
          A launch identity for little tech to show up with power.
        </h1>
      </Reveal>
      <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
        <Reveal className="max-w-[640px] flex-1">
          <h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">
            A focused four-week sprint to refine the identity, build the launch site, and give Little Tech Association a digital home ready for the late June window.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[420px] flex-col gap-7">
          <p className="text-[15px] leading-[23px] text-ink-2">
            LTA is entering the world with a strong name, a sharp point of view, and a timely reason to exist. This phase makes sure the first surface moves at the same speed.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <AnchorButton>{'Begin the sprint ->'}</AnchorButton>
            <AnchorButton href={workSectionHref} variant="outline">
              View our work
            </AnchorButton>
          </div>
        </Reveal>
      </div>
      <Reveal className="pt-12">
        <MetaRow left="Fig. 01 - What this sprint shapes" right="Four sections" />
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
      <MetaRow left="§ 02 - What we heard" right="Two worlds, one voice" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[700px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[78px] md:leading-[78px]">
            A strong name. A sharp point of view. A timely reason to exist.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>"Little Tech" has immediate meaning, contrast, and recall. It lets the organization stand opposite the scale of big tech while staying accessible to founders, policymakers, press, and the public.</p>
          <p className="text-ink">The work now is making the surface match the substance.</p>
        </Reveal>
      </div>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 02 - What stood out from our conversation" right="Eight notes" />
        <div className="mt-8">
          {heardSignals.map(([tag, title, body], index) => (
            <div key={title} className="grid gap-5/20 border-b border-[var(--color-rule)]/20 py-7 md:grid-cols-[74px_1.2fr_1fr_110px] md:gap-8">
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
      <MetaRow left="§ 03 - The opportunity" right="Built for day one" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            A trade association website has to build trust quickly. This one also has to signal that something new is happening.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>A founder should think: this is built for companies like mine.</p>
          <p>A policy office should think: this is organized, credible, and worth engaging.</p>
          <p>A reporter should think: this is a new voice in the technology policy conversation.</p>
          <p className="text-ink">A supporter should think: there is energy here, and the organization is ready to move.</p>
        </Reveal>
      </div>
    </section>
  )
}

function SelectedWork() {
  return (
    <section id="work" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 04 - Selected work" right="Live sites" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] pt-14 lg:grid-cols-[1.1fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Brand and website work.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[430px] flex-col gap-5 pt-2 text-[15px] leading-[24px] text-ink-2">
          <p>A diversified collection across legal, policy, institutional, nonprofit, product, health, wellness, and brand systems.</p>
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
                className="group min-h-[190px]/20 border-b border-[var(--color-rule)]/20 p-8 transition-colors hover:bg-ink hover:text-paper md:border-r md:[&:nth-child(2n)]:border-r-0"
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
      <MetaRow left="§ 05 - The room LTA is entering" right="Where it stands apart" dark />
      <div className="mt-12 grid gap-12 border-t border-paper/20 pt-16 lg:grid-cols-[1.5fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="serif max-w-[900px] text-[52px] italic leading-[58px] tracking-[-0.024em] md:text-[88px] md:leading-[92px]">
            "This should enter the room with something different."
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[390px] flex-col gap-6 pt-5 text-[15px] leading-[24px] text-paper/70">
          <p>The policy space is crowded with sites that look interchangeable. LTA has a chance to enter the room with a presence that earns attention from founders and credibility from Washington in the same breath.</p>
          <p>This sprint is about making sure that first surface lands with weight.</p>
        </Reveal>
      </div>
    </section>
  )
}

function PhaseGoals() {
  return (
    <section id="goals" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 06 - What this phase creates" right="Four outcomes" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Strong enough for launch. Flexible enough for the next wave.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          Four outcomes shape this sprint. Each is meant to land with the late June window and keep working through the summer rhythm of releases and tentpoles still ahead.
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {goals.map(([num, label, title, body, outcome]) => (
          <Reveal key={num} className="grid gap-8 border-b border-[var(--color-rule)]/20 py-10 lg:grid-cols-[160px_1.3fr_360px] lg:gap-14">
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
      <MetaRow left="§ 07 - Our approach" right="Six phases, four weeks" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Alignment, refinement, design, build: paced for the June window.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          Six tightly sequenced phases. Each is a meaningful deliverable, and together they move the organization from proposal to public launch.
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
              <span className="inline-flex rounded-full bg-ink/5 px-4 py-2 text-[12px] font-medium leading-[16px]">Outcome - {phase.outcome}</span>
            </div>
            <div className="pt-2">
              <span className="eyebrow mb-4 block text-ink-2">{phase.listLabel ?? 'Includes'}</span>
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
      <MetaRow left="§ 08 - Final deliverables" right="Everything LTA walks away with" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            A launch system, line by line.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A clear picture of what's included. Each item is something your team can use, reference, publish, or build from.
        </Reveal>
      </div>
      <Reveal className="border-t border-[var(--color-rule)]">
        {deliverables.map(([title, body, category], index) => (
          <div key={title} className="grid gap-5/20 border-b border-[var(--color-rule)]/20 py-6 md:grid-cols-[74px_1fr_1fr_120px] md:gap-8">
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
      <MetaRow left="§ 09 - Timeline" right="Four weeks · late June launch" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
            Kickoff to launch in four weeks.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          Designed around a late June launch window. Assumes fast feedback, clear stakeholder availability, and a focused initial site scope.
        </Reveal>
      </div>
      <Reveal className="grid md:grid-cols-2 xl:grid-cols-4">
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
      <MetaRow left="§ 10 - Investment" right="Launch sprint · full scope" />
      <div className="grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.4fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display text-[78px] leading-[82px] tracking-[-0.035em] sm:text-[120px] sm:leading-[116px] md:text-[150px] md:leading-[140px]">
            $19,500
          </h2>
          <span className="eyebrow mt-6 block text-ink-2">Total · Four weeks · Launch sprint</span>
        </Reveal>
        <Reveal className="flex max-w-[470px] flex-col gap-5 pt-4 text-[15px] leading-[24px]">
          <p>This covers brand refinement, website strategy and copy direction, the full design and build of the launch site, light motion, foundational SEO and analytics, and launch support.</p>
          <p className="text-ink-2">Optional add-ons below can be added as the summer unfolds: tentpole release support and post-launch site expansion.</p>
        </Reveal>
      </div>
      <Reveal className="grid md:grid-cols-2 xl:grid-cols-4">
        {investmentLines.map(([title, price, body], index) => (
          <div key={title} className={`flex min-h-[260px] flex-col gap-4 border-[var(--color-rule)]/20 p-8 ${index < investmentLines.length - 1 ? 'border-b md:border-r xl:border-b-0' : ''} ${index === 1 ? 'xl:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">{title}</span>
            <span className="serif text-[32px] leading-[36px]">{price}</span>
            <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="pt-20">
        <MetaRow left="Fig. 02 - Optional add-ons" right="As needed" />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {optionalPhases.map((phase) => (
            <div key={phase.title} className="border border-[var(--color-rule)] p-7 md:p-10">
              <span className="eyebrow text-ink-2">{phase.label}</span>
              <h3 className="serif mt-4 text-[36px] leading-[42px] tracking-[-0.018em]">{phase.title}</h3>
              <div className="serif mt-5 text-[46px] leading-[48px] tracking-[-0.02em]">{phase.price}</div>
              <p className="mt-5 text-[13px] leading-[20px] text-ink-2">{phase.body}</p>
              <div className="mt-6">
                <InlineList items={phase.items} />
              </div>
              <p className="mt-6/20 pt-5 text-[13px] leading-[20px] text-ink-2">{phase.note}</p>
            </div>
          ))}
        </div>
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

function WhyThisMatters() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="§ 11 - Why this is the right phase" right="What LTA walks away with" />
      <Reveal className="border-t border-[var(--color-rule)]">
        <h2 className="display mt-12 max-w-[1120px] py-16 text-[46px] leading-[50px] tracking-[-0.024em] md:text-[72px] md:leading-[74px]">
          This sprint gives LTA the foundation it needs for the first public chapter.
        </h2>
      </Reveal>
      <Reveal className="border-t border-[var(--color-rule)]">
        {whyMatters.map(([title, body]) => (
          <div key={title} className="grid gap-5/20 border-b border-[var(--color-rule)]/20 py-8 md:grid-cols-[120px_1fr_280px] md:items-center md:gap-8">
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
      <MetaRow left="§ 12 - Future opportunities" right="Beyond launch" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[44px] leading-[48px] tracking-[-0.024em] md:text-[60px] md:leading-[64px]">
            After launch, we can continue supporting LTA as needed.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A partnership designed to grow with the organization. Each future scope can be added when the next public moment calls for it.
        </Reveal>
      </div>
      <Reveal className="grid md:grid-cols-2 xl:grid-cols-4">
        {futureOpportunities.map((item, index) => (
          <div key={item} className="min-h-[150px]/20 p-8 md:border-r xl:[&:nth-child(4n)]:border-r-0">
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
      <MetaRow left="§ 13 - Next step" right="From alignment to live site" />
      <div className="mt-12 grid gap-12 border-t border-[var(--color-rule)] py-16 lg:grid-cols-[1.2fr_420px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[760px] text-[44px] leading-[48px] tracking-[-0.024em] md:text-[60px] md:leading-[64px]">
            If this direction feels aligned, we can begin immediately.
          </h2>
        </Reveal>
        <Reveal className="max-w-[420px] pt-2 text-[15px] leading-[24px] text-ink-2">
          A kickoff session, a sprint, a launch. Three steps from this proposal to a public LTA that lands with weight.
        </Reveal>
      </div>
      <Reveal>
        {nextSteps.map(([num, title, body, timing]) => (
          <div key={num} className="grid gap-8/20 border-b border-[var(--color-rule)]/20 py-10 lg:grid-cols-[120px_1.2fr_320px] lg:gap-14">
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
      <MetaRow left="§ 14 - In closing" right="Where this lands" dark />
      <Reveal>
        <h2 className="display max-w-[1200px] border-t border-paper/20 py-16 text-[52px] leading-[56px] tracking-[-0.024em] md:text-[94px] md:leading-[92px] lg:text-[116px] lg:leading-[110px]">
          Enter the room with power.
        </h2>
      </Reveal>
      <div className="grid gap-10 pt-4 lg:grid-cols-[520px_380px] lg:gap-20">
        <Reveal>
          <p className="text-[15px] leading-[24px] text-paper/70">
            By the end of four weeks, Little Tech Association has the identity and digital surface it needs to move: sharp enough for founders, credible enough for Washington, energetic enough to signal that something new is happening.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-4">
          <span className="eyebrow text-paper/60">Begin</span>
          <div>
            <AnchorButton variant="light">{'Begin the kickoff ->'}</AnchorButton>
          </div>
          <p className="text-[13px] leading-[20px] text-paper/60">$19,500 · Four weeks · Launch sprint</p>
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
        <span className="eyebrow">Prepared for Luther Lowe · Harrison Godfrey</span>
      </div>
      <div className="flex flex-wrap items-center gap-5">
        <span className="eyebrow">May 2026</span>
        <span className="eyebrow text-ink">Proposal · v1</span>
      </div>
    </footer>
  )
}

export function LittleTechAssociationProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Little Tech Association - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', 'A brand refinement and launch website proposal for Little Tech Association from Anchovies.')
    }
  }, [])

  return (
    <main className="little-tech-association-proposal bg-paper text-ink">
      <LittleTechNav />
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
