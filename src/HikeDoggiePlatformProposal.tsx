import { useEffect } from 'react'
import { Reveal } from './components/Reveal'

const contractHref = '/proposal/hike-doggie-platform/contract'

const phases = [
  {
    number: '01',
    title: 'Build the platform',
    price: '$10,000 value',
    timing: 'Approximately 6 to 8 weeks',
    body: 'After the separately contracted foundation and prototype are complete, we turn the approved experience into a working web platform for desktop and mobile, with the controls Hike Doggie needs to manage content and agents. We will also prepare and submit an iPhone version for App Store review when the product is ready.',
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
  ['01', 'The prototype becomes real', 'The separately approved experience becomes working production software for Hike Doggie operators and trainees.'],
  ['02', 'Agents that help with the work', 'Agents help maintain SOPs, prepare email drafts, organize context, and support voice-first capture with people making the final decisions.'],
  ['03', 'A product people can use anywhere', 'The platform works on desktop and mobile. App Store distribution is pursued, but the product does not depend on Apple approval to be useful.'],
  ['04', 'A shared commercial asset', 'The product belongs to a separate venture with equal ownership among Sean, Kath, and Bill.'],
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
  ['Production platform value', '$10,000', 'The fixed value for turning the approved prototype into the working platform.'],
  ['Sean development contribution', '$6,666.67', 'Contributed through discounted or uncompensated product design and development.'],
  ['Hike Doggie cash contribution', '$3,333.33', 'Due when the product venture documents are signed and production begins.'],
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
    if (meta) meta.content = 'A production platform and product partnership proposal for Hike Doggie.'
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
          <span className="eyebrow text-ink-2">§ 01 - Production proposal</span>
          <span className="eyebrow text-ink-2">App development + product partnership · July 2026</span>
        </div>
        <Reveal>
          <h1 className="display max-w-[1180px] text-[52px] leading-[54px] sm:text-[76px] sm:leading-[76px] md:text-[100px] md:leading-[96px] lg:text-[124px] lg:leading-[116px]">Turn the approved idea into a shared product.</h1>
        </Reveal>
        <div className="mt-16 grid gap-10 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[140px]">
          <Reveal><h2 className="serif max-w-[700px] text-[30px] leading-[38px] md:text-[40px] md:leading-[48px]">A separate production engagement for the desktop and mobile platform, paired with a simple one-third ownership structure.</h2></Reveal>
          <Reveal className="flex max-w-[500px] flex-col gap-7">
            <p className="text-[15px] leading-[24px] text-ink-2">This proposal begins only after the separate Phase 1 and Phase 2 engagement is complete and the prototype is approved. It covers production development, the product partnership, App Store realities, and the operating costs that come with a live agentic product.</p>
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
        <MetaRow left="§ 03 - The build" right="One production phase" />
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
        <MetaRow left="§ 06 - Investment" right="Production platform only" />
        <Reveal className="mt-12"><p className="display text-[76px] leading-none md:text-[124px]">$10,000</p><p className="eyebrow mt-5 text-ink-2">Project value · $3,333.33 Hike Doggie cash contribution</p></Reveal>
        <div className="mt-14 border-t border-[var(--color-rule)]">
          {payments.map(([title, amount, body]) => (
            <Reveal key={title} className="grid gap-4 border-b border-[var(--color-rule)] py-7 md:grid-cols-[1fr_180px_1.4fr] md:gap-10">
              <h3 className="serif text-[28px] leading-[34px]">{title}</h3><p className="text-[20px] font-medium">{amount}</p><p className="text-[14px] leading-[22px] text-ink-2">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]">
        <Reveal><h2 className="display max-w-[1050px] text-[52px] leading-[56px] md:text-[84px] md:leading-[84px]">When the foundation is ready, put the product in people's hands.</h2></Reveal>
        <div className="mt-12 flex flex-wrap gap-3"><a href={contractHref} className="inline-flex min-h-11 items-center justify-center rounded-full bg-paper px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-paper/85">Review contract</a><a href="#phases" className="inline-flex min-h-11 items-center justify-center rounded-full border border-paper/30 px-5 py-3 text-[13px] font-medium text-paper transition-colors hover:bg-paper hover:text-ink">Review the phases</a></div>
      </section>
    </main>
  )
}
