import { useEffect } from 'react'
import { Reveal } from './components/Reveal'

const contractHref = '/proposal/hike-doggie-foundation/contract'

const outcomes = [
  ['01', 'One source of truth', 'SOPs, calls, inquiries, and approved operating context become easier to find, understand, and use.'],
  ['02', 'A complete SOP foundation', 'The existing library is extracted, cleaned up, standardized, assigned, and placed in a format Hike Doggie owns.'],
  ['03', 'The experience made tangible', 'A clickable prototype shows how operators can learn, capture context, draft communications, and keep SOPs current.'],
  ['04', 'A responsible build decision', 'The prototype gives everyone something concrete to test before committing to production development.'],
]

const phases = [
  {
    number: '01',
    title: 'Build the source of truth',
    price: '$5,500',
    timing: 'Weeks 1 to 2',
    body: 'We extract and standardize the SOP library, then widen the source of truth to include the operating context the system needs. We will review selected CRM data, establish sales-call tracking, and organize inquiries from Typeform and other approved sources where access and export methods permit.',
    outcome: 'One organized, portable operating foundation that connects Hike Doggie standards with the context behind the work.',
    includes: [
      'SOP inventory, extraction, cleanup, and de-duplication',
      'One consistent SOP template with owners and cadences',
      'Full approved SOP library reformatted to the standard',
      'CRM and existing-system review',
      'Sales-call recording and tracking workflow',
      'Initial inquiry aggregation from Typeform and approved sources',
      'Source-of-truth structure with links to retained tools',
      'Baseline measurement definitions',
    ],
  },
  {
    number: '02',
    title: 'Design and prove the experience',
    price: '$6,500',
    timing: 'Week 3',
    body: 'Using the real SOP library and operating context, we design the core training and operator experience. The prototype will demonstrate how people learn, find answers, capture context by voice, prepare email drafts, and use agents to help organize and maintain SOPs.',
    outcome: 'A clickable desktop and mobile prototype that Hike Doggie can test before deciding whether to authorize a production app.',
    includes: [
      'Feature and workflow decisions workshop',
      'Core trainee and operator journeys',
      'Desktop and mobile screen design',
      'Real Hike Doggie content inside the experience',
      'Voice-capture workflow concepts',
      'Email drafting with human review',
      'Agent-supported SOP management concepts',
      'Clickable prototype, walkthrough, and editable source files',
    ],
  },
]

function MetaRow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className="eyebrow text-ink-2">{left}</span>
      <span className="eyebrow text-ink-2 sm:text-right">{right}</span>
    </div>
  )
}

export function HikeDoggieFoundationProposal() {
  useEffect(() => {
    document.title = 'Anchovies x Hike Doggie - Foundation Proposal'
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = 'A focused SOP foundation and training prototype proposal for Hike Doggie.'
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
        <div className="flex flex-col gap-3 pb-16 sm:flex-row sm:justify-between lg:pb-24"><span className="eyebrow text-ink-2">§ 01 - Proposal</span><span className="eyebrow text-ink-2">Phase 1 + Phase 2 · July 2026</span></div>
        <Reveal><h1 className="display max-w-[1180px] text-[52px] leading-[54px] sm:text-[76px] sm:leading-[76px] md:text-[100px] md:leading-[96px] lg:text-[124px] lg:leading-[116px]">Build the foundation. Prove the experience.</h1></Reveal>
        <div className="mt-16 grid gap-10 border-t border-[var(--color-rule)] pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[140px]">
          <Reveal><h2 className="serif max-w-[700px] text-[30px] leading-[38px] md:text-[40px] md:leading-[48px]">Three focused weeks to organize the knowledge, capture the context, and turn the product direction into something the team can test.</h2></Reveal>
          <Reveal className="flex max-w-[500px] flex-col gap-7"><p className="text-[15px] leading-[24px] text-ink-2">This engagement stands on its own. It gives Hike Doggie the operating foundation and prototype it is ready to begin now. Production app development and the separate product partnership remain their own decision and agreement.</p><div className="flex flex-wrap gap-3"><a href={contractHref} className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-paper">Review contract</a><a href="#phases" className="inline-flex min-h-11 items-center justify-center rounded-full border border-ink px-5 py-3 text-[13px] font-medium text-ink">View the scope</a></div></Reveal>
        </div>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <MetaRow left="§ 02 - What this creates" right="Four clear outcomes" />
        <div className="mt-12 grid border-y border-[var(--color-rule)] md:grid-cols-2">
          {outcomes.map(([number, title, body], index) => <Reveal key={title} className={`min-h-[270px] border-[var(--color-rule)] p-8 md:p-10 ${index < 2 ? 'border-b' : index === 2 ? 'border-b md:border-b-0' : ''} ${index % 2 === 0 ? 'md:border-r' : ''}`}><span className="eyebrow text-ink-2">Outcome {number}</span><h3 className="serif mt-8 text-[38px] leading-[42px] md:text-[44px] md:leading-[48px]">{title}</h3><p className="mt-6 text-[14px] leading-[22px] text-ink-2">{body}</p></Reveal>)}
        </div>
      </section>

      <section id="phases" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <MetaRow left="§ 03 - The work" right="Two connected phases" />
        <div className="mt-12 border-t border-[var(--color-rule)]">
          {phases.map((phase) => <Reveal key={phase.number} className="grid gap-8 border-b border-[var(--color-rule)] py-12 lg:grid-cols-[150px_1fr_1fr] lg:gap-14"><div><span className="eyebrow text-ink-2">Phase {phase.number}</span><p className="serif mt-5 text-[28px]">{phase.price}</p><p className="mt-2 text-[12px] text-ink-2">{phase.timing}</p></div><div><h3 className="display text-[44px] leading-[46px] md:text-[58px] md:leading-[58px]">{phase.title}</h3><p className="mt-7 text-[15px] leading-[24px] text-ink-2">{phase.body}</p><p className="mt-7 border-l border-ink pl-5 text-[15px] leading-[24px]"><strong>Outcome:</strong> {phase.outcome}</p></div><ul className="grid content-start border-t border-[var(--color-rule)]">{phase.includes.map((item) => <li key={item} className="border-b border-[var(--color-rule)] py-4 text-[13px] leading-[20px]">{item}</li>)}</ul></Reveal>)}
        </div>
      </section>

      <section className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[140px]">
        <MetaRow left="§ 04 - Investment" right="Ready to begin" />
        <Reveal className="mt-12"><p className="display text-[76px] leading-none md:text-[124px]">$12,000</p><p className="eyebrow mt-5 text-ink-2">Phase 1 + Phase 2 · approximately three weeks</p></Reveal>
        <div className="mt-14 grid border-y border-[var(--color-rule)] md:grid-cols-2"><Reveal className="border-b border-[var(--color-rule)] p-8 md:border-b-0 md:border-r md:p-10"><span className="eyebrow text-ink-2">75% at kickoff</span><p className="serif mt-5 text-[42px]">$9,000</p><p className="mt-5 text-[14px] leading-[22px] text-ink-2">Reserves the working window and covers the front-loaded extraction, organization, standardization, research, and prototype preparation.</p></Reveal><Reveal className="p-8 md:p-10"><span className="eyebrow text-ink-2">25% at Phase 2 delivery</span><p className="serif mt-5 text-[42px]">$3,000</p><p className="mt-5 text-[14px] leading-[22px] text-ink-2">Due when the clickable prototype, walkthrough, editable files, and handoff are delivered.</p></Reveal></div>
      </section>

      <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[150px]"><Reveal><h2 className="display max-w-[1050px] text-[52px] leading-[56px] md:text-[84px] md:leading-[84px]">Start with the work everyone is ready to begin.</h2></Reveal><a href={contractHref} className="mt-12 inline-flex min-h-11 items-center justify-center rounded-full bg-paper px-5 py-3 text-[13px] font-medium text-ink">Review and sign the contract</a></section>
    </main>
  )
}
