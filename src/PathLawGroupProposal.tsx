import { useEffect, useState } from 'react'
import { Reveal } from './components/Reveal'

type NumberedItem = [string, string]
type Service = {
  label: string
  title: string
  price: string
  body: string
  includes: string[]
}

const navSections = [
  { id: 'context', label: 'Context' },
  { id: 'goals', label: 'Goals' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'services', label: 'Services' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'investment', label: 'Investment' },
]

const goals: NumberedItem[] = [
  ['01', "Develop a clear brand strategy foundation that sharpens Path's positioning, point of view, audience, and overall opportunity."],
  ['02', 'Create a distinct visual identity system, including logo, typography, color, and supporting design elements.'],
  ['03', 'Establish a bigger brand idea and world that gives the identity more meaning, cohesion, and flexibility moving forward.'],
  ['04', 'Build practical brand standards and core collateral so the system can be used consistently across touchpoints.'],
  ['05', 'Design and build a premium new website in Framer that better reflects the firm, improves clarity, and supports conversion.'],
  ['06', 'Integrate a forward-thinking AI-powered pathway tool into the website to create a more useful, differentiated, and modern first interaction.'],
]

const outcomes: NumberedItem[] = [
  ['01', 'Path will be positioned more clearly and more distinctively, helping the firm stand apart in a crowded category and earn stronger first-impression trust with prospective clients.'],
  ['02', 'A more elevated brand and website should increase confidence at the point of inquiry, leading to better-fit leads, stronger consultation intent, and a smoother path from interest to engagement.'],
  ['03', 'By clarifying who Path is for and how it is different, the firm will be better equipped to attract higher-value cases and the caliber of client that already aligns with its strengths.'],
  ['04', 'A stronger, more memorable brand should improve word-of-mouth and referral potential within the communities clients are already part of, where reputation compounds and trust travels.'],
  ['05', 'With a more thoughtful digital experience, including the AI-powered pathway tool, Path can create a smarter first touchpoint that educates prospects, reduces friction, and makes the website work harder as a business asset.'],
  ['06', 'Taken together, this work creates a foundation for stronger brand equity, a more premium market perception, and a business that feels more scalable, intentional, and built for long-term growth.'],
]

const services: Service[] = [
  {
    label: 'A',
    title: 'Brand Strategy',
    price: '$3,500',
    body: "We will begin with a focused strategy phase designed to sharpen the thinking already in motion and turn it into a more actionable foundation. The goal is not to overcomplicate things, but to create enough clarity and intention to guide the rest of the engagement.",
    includes: [
      'Kickoff workshop and discovery session',
      'Review of existing internal thinking and current brand materials',
      'Light market and competitor research',
      'Audience and opportunity framing',
      'Clarification of what Path does, how it does it, why it matters, and who it serves',
      'Brand pillars and differentiation points',
      'Big idea development and world-building direction',
      'Tone of voice foundations',
      'Messaging and positioning recommendations',
      'Strategy presentation for internal alignment',
    ],
  },
  {
    label: 'B',
    title: 'Brand Identity',
    price: '$8,500',
    body: 'Once we are aligned on strategy, we will translate that foundation into a visual identity system that feels distinct, premium, and practical. The goal is to create something that feels intentional and ownable, while also being flexible enough to support the firm across real-world touchpoints.',
    includes: [
      'One primary visual identity direction',
      'Primary logo or wordmark system',
      'Secondary lockups and supporting marks, as needed',
      'Color palette',
      'Typography system',
      'Supporting graphic language and motifs',
      'Art direction guidance for photography and imagery',
      'Business card design',
      'Letterhead design',
      'Email signature direction',
      'Social media starter templates',
      'One branded document or one-pager template',
      'Brand mockups to show the system in use',
      'Brand standards guide',
      'Refinement rounds',
    ],
  },
  {
    label: 'C',
    title: 'New Website',
    price: '$15,000',
    body: 'The above will bring the new brand to life digitally through a refined and premium website experience built in Framer. The focus is on clarity, conversion, and ease of use, while also creating a more elevated digital presence that better reflects the sophistication of the firm. As part of this, we will incorporate a custom AI-powered pathway tool directly into the site, giving prospective clients a more useful first interaction by helping them better understand likely pathways, readiness, or next steps before they ever reach out.',
    includes: [
      'Website strategy workshop',
      'Revised sitemap and content plan',
      'Up to 10 core page designs and templates',
      'Copywriting for core website pages',
      'Framer design and development',
      'Fully responsive design across desktop, tablet, and mobile',
      'CMS setup for key repeatable content',
      'Motion and interaction design',
      'SEO fundamentals and metadata setup',
      'Contact and consultation flow refinement',
      'Custom AI-powered pathway tool integrated into the website experience',
      'QA and launch support',
    ],
  },
  {
    label: 'D',
    title: 'Handoff',
    price: '$500',
    body: 'The final phase is about organizing the work cleanly and making sure your team has what it needs to move forward with confidence.',
    includes: [
      'Final organization and delivery of brand assets',
      'Website handoff and CMS training session',
      'Launch checklist and post-launch guidance',
      'Recorded walkthrough or training notes for future reference',
    ],
  },
]

const timeline = [
  ['Mar 25 to Apr 3', 'Brand Strategy', 'Align on the opportunity, sharpen the positioning, and establish the strategic and verbal foundation for the work ahead.'],
  ['Apr 6 to Apr 17', 'Brand Identity', 'Build the visual system, explore how it lives in the real world, and refine it into a practical brand toolkit.'],
  ['Apr 13 to May 4', 'New Website', 'Restructure the website, write the core content, design the experience, build the site in Framer, and integrate the AI-powered pathway tool.'],
  ['May 4 to May 6', 'Handoff', 'Organize assets, train your team, and prepare everything for a smooth launch and handoff.'],
]

const nextSteps = [
  'Sign contract',
  'Deposit invoice',
  'Kickoff meeting',
  'Strategy sprint begins',
]

function MetaRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className="eyebrow text-ink-2">{left}</span>
      <span className="eyebrow text-ink-2 sm:text-right">{right}</span>
    </div>
  )
}

function PathNav() {
  const [active, setActive] = useState('context')

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
          <span className="eyebrow text-ink-2">Prepared for Path Law Group</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">Archived proposal</span>
          <span className="eyebrow">March 25, 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#context" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline">
              <span className="text-ink">Anchovies</span>
              <span className="mx-2">x</span>
              Path Law Group
            </span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={active === section.id ? 'text-ink' : 'transition-colors hover:text-ink'}>
                {section.label}
              </a>
            ))}
          </nav>
          <span className="eyebrow border border-[var(--color-rule)] px-3 py-2 text-ink-2">Archived</span>
        </div>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section id="context" className="border-b border-[var(--color-rule)] px-6 pb-20 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-[140px] lg:pt-[120px]">
      <MetaRow left="Proposal" right="Path Law Group · March 25, 2026" />
      <Reveal>
        <h1 className="display max-w-[1100px] py-16 text-[58px] leading-[62px] sm:text-[82px] sm:leading-[84px] md:text-[112px] md:leading-[108px]">
          Path Law Group
        </h1>
      </Reveal>
      <Reveal className="grid border-y border-[var(--color-rule)] md:grid-cols-4">
        {[
          ['Client', 'Path Law Group'],
          ['Date', '2026-03-25'],
          ['Launch', '2026-05-06'],
          ['Investment', '$27,500'],
        ].map(([label, value], index) => (
          <div key={label} className={`flex min-h-[120px] flex-col justify-between gap-5 p-6 ${index < 3 ? 'border-b border-[var(--color-rule)] md:border-b-0 md:border-r' : ''}`}>
            <span className="eyebrow text-ink-2">{label}</span>
            <span className="serif text-[25px] leading-[30px]">{value}</span>
          </div>
        ))}
      </Reveal>
      <div className="grid gap-12 pt-20 lg:grid-cols-[420px_1fr] lg:gap-24">
        <Reveal>
          <span className="eyebrow text-ink-2">Why this matters now</span>
          <h2 className="display mt-8 text-[48px] leading-[52px] md:text-[64px] md:leading-[66px]">
            Path is at an important inflection point.
          </h2>
        </Reveal>
        <Reveal className="flex max-w-[720px] flex-col gap-6 text-[15px] leading-[25px] text-ink-2">
          <p>Path is at an important inflection point. Not because the firm simply needs a new look, but because it is working toward greater alignment between what it believes, how it serves, and how that experience is felt from the outside.</p>
          <p>What stood out in our conversation is that you are thinking about brand in a more holistic way than most firms do. You are not treating it as surface-level marketing. You are thinking about how it shows up in the website, the intake experience, client communications, future automation, and the overall emotional tone of the relationship.</p>
          <p>For a firm like Path, this matters. Your clients are making life-changing decisions, often in moments of uncertainty, and they need to feel clarity, trust, and care from the very beginning. At the same time, your audience is discerning. These are often highly accomplished individuals who are used to thoughtful brands, strong digital experiences, and a high level of professionalism.</p>
          <p>There is also a real opportunity to differentiate. Most firms in this space still communicate like traditional law firms first, and human brands second. Path has the chance to build something more sophisticated, more intentional, and more emotionally intelligent, while still feeling credible and clear.</p>
        </Reveal>
      </div>
    </section>
  )
}

function NumberedSection({ id, label, title, items }: { id: string; label: string; title: string; items: NumberedItem[] }) {
  return (
    <section id={id} className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left={label} right={`${items.length} priorities`} />
      <Reveal>
        <h2 className="display max-w-[900px] py-14 text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">{title}</h2>
      </Reveal>
      <Reveal className="border-t border-[var(--color-rule)]">
        {items.map(([number, body]) => (
          <div key={number} className="grid gap-5 border-b border-[var(--color-rule)] py-7 md:grid-cols-[76px_1fr] md:gap-10">
            <span className="eyebrow pt-1 text-ink-2">{number}</span>
            <p className="serif max-w-[980px] text-[23px] leading-[31px]">{body}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[150px]">
      <MetaRow left="Services" right="Four phases" />
      <div className="mt-16 border-t border-[var(--color-rule)]">
        {services.map((service) => (
          <Reveal key={service.label} className="grid gap-10 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[90px_1fr_360px] lg:gap-14">
            <span className="display text-[76px] leading-none">{service.label}</span>
            <div className="max-w-[620px]">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="serif text-[38px] leading-[44px]">{service.title}</h3>
                <span className="eyebrow text-ink-2">{service.price}</span>
              </div>
              <p className="mt-6 text-[15px] leading-[24px] text-ink-2">{service.body}</p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow mb-2 text-ink-2">Includes</span>
              {service.includes.map((item) => (
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
      <MetaRow left="Scope summary" right="March 25 to May 6" />
      <Reveal>
        <h2 className="display max-w-[760px] py-14 text-[48px] leading-[52px] md:text-[72px] md:leading-[74px]">A complete brand and digital foundation.</h2>
      </Reveal>
      <Reveal className="border-y border-[var(--color-rule)]">
        {timeline.map(([when, phase, body], index) => (
          <div key={phase} className={`grid gap-4 py-7 md:grid-cols-[190px_250px_1fr] md:gap-8 ${index < timeline.length - 1 ? 'border-b border-[var(--color-rule)]' : ''}`}>
            <span className="eyebrow pt-2 text-ink-2">{when}</span>
            <span className="serif text-[25px] leading-[31px]">{phase}</span>
            <p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-16 grid border-y border-[var(--color-rule)] md:grid-cols-[1fr_280px]">
        <div className="p-8 md:p-12">
          <span className="eyebrow text-ink-2">Brand, identity, and digital experience</span>
          <h3 className="display mt-8 text-[48px] leading-[52px] md:text-[70px] md:leading-[72px]">Original investment</h3>
        </div>
        <div className="flex items-end border-t border-[var(--color-rule)] p-8 md:border-l md:border-t-0 md:p-12">
          <span className="display text-[58px] leading-none md:text-[72px]">$27,500</span>
        </div>
      </Reveal>
    </section>
  )
}

function Investment() {
  return (
    <section id="investment" className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
        <span className="eyebrow text-paper/55">Investment</span>
        <span className="eyebrow text-paper/55">Archived original</span>
      </div>
      <Reveal className="grid gap-12 py-16 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <span className="eyebrow text-paper/55">Brand, identity, and digital experience</span>
          <h2 className="display mt-8 text-[72px] leading-[76px] sm:text-[92px] sm:leading-[94px] md:text-[118px] md:leading-[114px]">$27,500</h2>
        </div>
        <p className="serif text-[27px] italic leading-[37px] text-paper/80">A strategy, identity, website, and handoff built to move Path forward with confidence.</p>
      </Reveal>
      <Reveal className="border-t border-paper/20 pt-12">
        <span className="eyebrow text-paper/55">Next steps</span>
        <div className="mt-8 grid gap-0 border-y border-paper/20 md:grid-cols-2">
          {nextSteps.map((step, index) => (
            <div key={step} className="grid min-h-[100px] grid-cols-[52px_1fr] items-center gap-4 border-b border-paper/20 p-5 md:border-r">
              <span className="eyebrow text-paper/45">{String(index + 1).padStart(2, '0')}</span>
              <span className="serif text-[24px] leading-[30px]">{step}</span>
            </div>
          ))}
        </div>
      </Reveal>
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
        <span className="eyebrow">Prepared for Path Law Group</span>
      </div>
      <span className="eyebrow">March 25, 2026 · Archived proposal</span>
    </footer>
  )
}

export function PathLawGroupProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Path Law Group - Proposal'
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', 'An archived brand identity and digital experience proposal for Path Law Group from Anchovies.')
  }, [])

  return (
    <main className="path-law-group-proposal bg-paper text-ink">
      <PathNav />
      <Hero />
      <NumberedSection id="goals" label="Goals" title="What the work is designed to accomplish." items={goals} />
      <NumberedSection id="outcomes" label="Outcomes" title="What this foundation makes possible." items={outcomes} />
      <Services />
      <Timeline />
      <Investment />
      <Footer />
    </main>
  )
}
