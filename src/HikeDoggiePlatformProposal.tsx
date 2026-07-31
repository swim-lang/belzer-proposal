import { useEffect } from 'react'
import { Reveal } from './components/Reveal'

const contractHref = '/proposal/hike-doggie-platform/contract'

const phases = [
  {
    number: '01',
    title: 'Build the source of truth',
    price: '$5,500',
    timing: 'Weeks 1 to 2',
    body: 'We extract and standardize the SOP library, then widen the source of truth to the operational context the system needs. That includes selected CRM data, sales-call records, inquiries from Typeform and similar sources, and useful links back to the tools Hike Doggie already uses.',
    outcome: 'One organized, portable operating foundation that connects the standards, activity, and context behind the work.',
    includes: [
      'SOP inventory, extraction, cleanup, and standardization',
      'A consistent SOP template with owners and cadences',
      'CRM and existing-system review',
      'Sales-call tracking and recording workflow',
      'Inquiry aggregation from Typeform and approved sources',
      'Source-of-truth structure with links to approved third-party tools',
    ],
  },
  {
    number: '02',
    title: 'Design and prove the experience',
    price: '$6,500',
    timing: 'Week 3',
    body: 'We use the real operating foundation to design a working prototype. The prototype shows how people learn, find answers, capture context, draft communications, and keep SOPs alive without turning the business into another software-management job.',
    outcome: 'A clickable, testable prototype that proves the core experience before production development begins.',
    includes: [
      'Feature and workflow decisions workshop',
      'Core trainee and operator journeys',
      'Clickable desktop and mobile prototype',
      'Voice capture opportunities',
      'Email drafting opportunities with human review',
      'Agent-supported SOP management',
    ],
  },
  {
    number: '03',
    title: 'Build the platform',
    price: '$10,000',
    timing: 'Production phase',
    body: 'We turn the approved prototype into a working web platform for desktop and mobile, with the controls Hike Doggie needs to manage content and agents. We will also prepare and submit an iPhone version for App Store review when the product is ready.',
    outcome: 'A working Hike Doggie platform that can launch as a web app regardless of Apple review, with App Store submission included as a distribution path rather than a condition of delivery.',
    includes: [
      'Responsive web platform for phone and desktop',
      'Installable mobile web experience',
      'SOP, assignment, and agent controls',
      'Email-draft and voice-capture workflows',
      'Selected data connections confirmed during discovery',
      'App Store preparation and initial submission support',
    ],
  },
]

const outcomes = [
  ['01', 'The business in one view', 'SOPs, inquiries, call context, and approved operating data become easier to find and use.'],
  ['02', 'Agents that help with the work', 'Agents help maintain SOPs, prepare email drafts, organize context, and support voice-first capture with people making the final decisions.'],
  ['03', 'A product people can use anywhere', 'The platform works on desktop and mobile. App Store distribution is pursued, but the product does not depend on Apple approval to be useful.'],
  ['04', 'A foundation that can grow', 'The first release is intentionally focused, but its structure can support future features, clients, and commercial opportunities.'],
]

const boundaries = [
  {
    title: 'Apple controls the App Store',
    body: 'We will prepare a release-ready submission and respond to the initial review. Apple controls its review timing, policies, and final acceptance. If approval is delayed or declined, the completed platform remains available as an installable web app and desktop experience.',
  },
  {
    title: 'Usage costs follow real use',
    body: 'Production AI tokens, voice transcription, hosting, storage, and third-party APIs vary with the final features and how often people use them. We will estimate those costs, set practical controls, and obtain approval before any material recurring expense begins.',
  },
  {
    title: 'Agents assist, people approve',
    body: 'The first release can prepare emails, organize information, and help manage SOPs. It will not autonomously send external communications or make consequential operating decisions without a separately approved workflow.',
  },
  {
    title: 'Connections depend on access',
    body: 'CRM, Typeform, call, and other data connections depend on available APIs, credentials, vendor terms, and usable source data. Discovery will identify the highest-value connections before the production scope is locked.',
  },
]

const payments = [
  ['Foundation and prototype', '$12,000', '$9,000 at kickoff and $3,000 at final Phase 2 delivery.'],
  ['Production platform value', '$10,000', 'Sean contributes $6,666.67 in development value. Hike Doggie contributes $3,333.33 in cash at Phase 3 kickoff.'],
  ['Hike Doggie cash commitment', '$15,333.33', 'The complete $12,000 for Phases 1 and 2, plus the $3,333.33 Phase 3 cash contribution.'],
]

function MetaRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className="eyebrow text-ink-2">{left}</span>
      <span className="eyebrow text-ink-2 sm:text-right">{right}</span>
    </div>
  )
}

function Button({ href, children, outline = false }: { href: string; children: string; outline?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 py-3 text-[13px] font-medium transition-colors whitespace-nowrap ${
        outline ? 'border border-ink text-ink hover:bg-ink hover:text-paper' : 'bg-ink text-paper hover:bg-ink-2'
      }`}
    >
      {children}
    </a>
  )
}

export function HikeDoggiePlatformProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Hike Doggie - Platform Proposal'
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = 'A staged operating foundation, prototype, and production platform proposal for Hike Doggie.'
  }, [])

  return (
    <main className="hike-doggie-proposal min-h-screen bg-paper text-ink antialiased">
      <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="block h-[14px] w-auto" />
            <span className="hidden text-[13px] text-ink-2 sm:inline"><span className="text-ink">Anchovies</span><span className="mx-2">x</span>Hike Doggie</span>
          </a>
          <a href={contractHref} className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">Review contract</a>
        </div>
      </header>

      <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
        <div className="flex flex-col gap-3 pb-16 sm:flex-row sm:justify-between lg:pb-24">
          <span className="eyebrow text-ink-2">§ 01 - Revised proposal</span>
          <span className="eyebrow text-ink-2">Prepared for Hike Doggie · July 2026</span>
        </div>
        <Reveal>
          <h1 className="display max-w-[1180px] text-[52px] leading-[54px] sm:text-[76px] sm:leading-[76px] md:text-[100px] md:leading-[96px] lg:text-[124px] lg:leading-[116px]">From working knowledge to a working platform.</h1>
        </Reveal>
        <div className="mt-16 grid gap-10 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[140px]">
          <Reveal><h2 className="serif max-w-[700px] text-[30px] leading-[38px] md:text-[40px] md:leading-[48px]">Give the team one source of truth, prove the experience, then build the product for desktop and mobile.</h2></Reveal>
          <Reveal className="flex max-w-[500px] flex-col gap-7">
            <p className="text-[15px] leading-[24px] text-ink-2">This version keeps the approved foundation and prototype intact, makes the production build concrete, and names the realities of building something new. The goal is clarity without pretending every technical or App Store variable can be known before the work begins.</p>
            <div className="flex flex-wrap gap-3"><Button href={contractHref}>Review contract</Button><Button href="#phases" outline>View the phases</Button></div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <MetaRow left="§ 02 - What this creates" right="Four practical outcomes" />
        <div className="mt-12 grid border-y border-[var(--color-rule)] md:grid-cols-2">
          {outcomes.map(([number, title, body], index) => (
            <Reveal key={title} className={`min-h-[280px] border-[var(--color-rule)] p-8 md:p-10 ${index < 2 ? 'border-b' : index === 2 ? 'border-b md:border-b-0' : ''} ${index % 2 === 0 ? 'md:border-r' : ''}`}>
              <span className="eyebrow text-ink-2">Outcome {number}</span>
              <h3 className="serif mt-8 text-[38px] leading-[42px] md:text-[44px] md:leading-[48px]">{title}</h3>
              <p className="mt-6 max-w-[520px] text-[14px] leading-[22px] text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="phases" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <MetaRow left="§ 03 - The engagement" right="Three connected phases" />
        <div className="mt-12 border-t border-[var(--color-rule)]">
          {phases.map((phase) => (
            <Reveal key={phase.number} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[150px_1fr_1fr] lg:gap-14">
              <div><span className="eyebrow text-ink-2">Phase {phase.number}</span><p className="serif mt-5 text-[28px]">{phase.price}</p><p className="mt-2 text-[12px] text-ink-2">{phase.timing}</p></div>
              <div><h3 className="display text-[44px] leading-[46px] md:text-[58px] md:leading-[58px]">{phase.title}</h3><p className="mt-7 max-w-[650px] text-[15px] leading-[24px] text-ink-2">{phase.body}</p><p className="mt-7 max-w-[650px] border-l border-ink pl-5 text-[15px] leading-[24px]"><strong>Outcome:</strong> {phase.outcome}</p></div>
              <ul className="grid content-start gap-0 border-t border-[var(--color-rule)]">
                {phase.includes.map((item) => <li key={item} className="border-b border-[var(--color-rule)] py-4 text-[13px] leading-[20px]">{item}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[140px]">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between"><span className="eyebrow text-paper/55">§ 04 - Responsible boundaries</span><span className="eyebrow text-paper/55">Clear where certainty ends</span></div>
        <Reveal><h2 className="display mt-12 max-w-[1050px] text-[48px] leading-[52px] md:text-[76px] md:leading-[76px]">A real commitment, without pretending the unknowns are not real.</h2></Reveal>
        <div className="mt-16 grid border-y border-paper/20 md:grid-cols-2">
          {boundaries.map((item, index) => (
            <Reveal key={item.title} className={`min-h-[250px] border-paper/20 p-8 md:p-10 ${index < 2 ? 'border-b' : index === 2 ? 'border-b md:border-b-0' : ''} ${index % 2 === 0 ? 'md:border-r' : ''}`}>
              <h3 className="serif text-[32px] leading-[38px]">{item.title}</h3>
              <p className="mt-6 max-w-[560px] text-[14px] leading-[23px] text-paper/65">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <MetaRow left="§ 05 - Product partnership" right="One-third each, documented properly" />
        <div className="mt-12 grid gap-12 border-y border-[var(--color-rule)] py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[120px]">
          <Reveal>
            <h2 className="display max-w-[760px] text-[48px] leading-[52px] md:text-[70px] md:leading-[70px]">Three partners. One shared product.</h2>
            <p className="mt-8 max-w-[700px] text-[16px] leading-[26px] text-ink-2">The commercial intent is equal one-third ownership among Sean Ashlow, Kath Allen, and Bill Allen for the app venture. Hike Doggie continues to own the Phase 1 and Phase 2 SOP materials created for its business. The jointly owned venture holds the production platform and its commercial product rights.</p>
          </Reveal>
          <Reveal className="flex flex-col justify-between gap-10">
            <p className="text-[15px] leading-[24px] text-ink-2">Sean contributes $6,666.67 of the $10,000 production value through product design and development. Hike Doggie contributes the remaining $3,333.33 in cash. The partners agree that ownership remains equal despite the intentionally unequal initial contributions. Recurring infrastructure and usage costs remain operating costs of the product. Before Phase 3 begins, the partners will sign a separate operating agreement covering governance, distributions, future contributions, expenses, transfers, exits, and deadlock.</p>
            <p className="border-l border-ink pl-5 text-[13px] leading-[21px]">This proposal records the intended business structure. The definitive ownership issuance belongs in the operating agreement reviewed by counsel.</p>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <MetaRow left="§ 06 - Investment" right="Three phases, one build path" />
        <Reveal className="mt-12"><p className="display text-[76px] leading-none md:text-[124px]">$22,000</p><p className="eyebrow mt-5 text-ink-2">Complete project value · $15,333.33 Hike Doggie cash commitment</p></Reveal>
        <div className="mt-14 border-t border-[var(--color-rule)]">
          {payments.map(([title, amount, body]) => (
            <Reveal key={title} className="grid gap-4 border-b border-[var(--color-rule)] py-7 md:grid-cols-[1fr_180px_1.4fr] md:gap-10">
              <h3 className="serif text-[28px] leading-[34px]">{title}</h3><p className="text-[20px] font-medium">{amount}</p><p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
        <Reveal><h2 className="display max-w-[1050px] text-[52px] leading-[56px] md:text-[84px] md:leading-[84px]">Build the operating foundation. Prove the experience. Put the product in people's hands.</h2></Reveal>
        <div className="mt-12 flex flex-wrap gap-3"><a href={contractHref} className="inline-flex min-h-11 items-center justify-center rounded-full bg-paper px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-paper/85">Review contract</a><a href="#phases" className="inline-flex min-h-11 items-center justify-center rounded-full border border-paper/30 px-5 py-3 text-[13px] font-medium text-paper transition-colors hover:bg-paper hover:text-ink">Review the phases</a></div>
      </section>
    </main>
  )
}
