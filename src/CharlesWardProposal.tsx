import { useEffect, type ReactNode } from 'react'
import { Reveal } from './components/Reveal'
import { charlesWardProposals } from './charlesWardProposalData'
import './corrigan-ussery.css'
import './charles-ward.css'

type ProposalKey = keyof typeof charlesWardProposals
type ProposalData = (typeof charlesWardProposals)[ProposalKey]
const sectionClass = 'border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]'
const titleClass = 'display text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]'
const bodyClass = 'text-[15px] leading-[24px] text-ink-2'
function Button({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
 return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className={`inline-flex max-w-full items-center justify-center rounded-full px-5 py-3.5 text-center text-[13px] font-medium transition-colors ${outline ? 'border border-[var(--color-rule)] text-ink hover:bg-ink hover:text-paper' : 'bg-ink text-paper hover:bg-ink-2'}`}>{children}</a>
}
export function CharlesWardProposal({ proposal }: { proposal: ProposalKey }) {
 const data = charlesWardProposals[proposal]
 const formatPrice = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
 const feedback = `mailto:sean@anchovies.agency?subject=${encodeURIComponent(`${data.name} proposal thoughts`)}`
 useEffect(() => {
  document.title = `Anchovies × ${data.name} · ${data.kind}`
  document.querySelector('meta[name="description"]')?.setAttribute('content', data.subhead)
  const observer = new IntersectionObserver(entries => entries.forEach(e => e.target.classList.toggle('is-active', e.isIntersecting)), { threshold: .45 })
  document.querySelectorAll('.charles-ward-template .cu-milestone').forEach(el => observer.observe(el))
  return () => observer.disconnect()
 }, [data])
 return <main className="genesi-proposal corrigan-template charles-ward-template bg-paper text-ink">
  <a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
  <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
   <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 py-4 md:px-16">
    <a href="#overview" className="flex items-center gap-3" aria-label={`${data.name} proposal overview`}><img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="block h-[18px] w-auto"/><span className="text-[13px] text-ink-2">× {data.name}</span></a>
    <nav aria-label="Proposal sections" className="flex flex-wrap gap-x-5 gap-y-2 text-[12px]">{['Outcomes','Scope','Timeline','Investment'].map(label => <a key={label} className="hover:underline" href={`#${label.toLowerCase()}`}>{label}</a>)}</nav>
    <div className="hidden gap-3 xl:flex"><Button href="https://anchovies.agency/book" outline>Review together</Button><Button href={feedback}>Share feedback</Button></div>
   </div>
  </header>
  <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[120px]">
   <div className="flex flex-wrap justify-between gap-4 pb-16 text-[13px] text-ink-2 lg:pb-24"><span>{data.kind}</span><span>November 23, 2026</span></div>
   <Reveal><h1 className="display max-w-[1200px] pb-12 text-[46px] leading-[46px] min-[360px]:text-[54px] min-[360px]:leading-[52px] tracking-[-0.028em] sm:text-[76px] sm:leading-[70px] md:text-[98px] md:leading-[88px] lg:pb-16 lg:text-[96px] lg:leading-[96px]">{data.headline}</h1></Reveal>
   <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-16 pt-12 lg:flex-row lg:gap-[140px]">
    <Reveal className="max-w-[640px] flex-1"><h2 className="serif text-[30px] leading-[38px] tracking-[-0.02em] md:text-[36px] md:leading-[44px]">{data.subhead}</h2></Reveal>
    <Reveal className="max-w-[420px]"><p className={bodyClass}>{data.intro}</p></Reveal>
   </div>
   <Reveal className="pt-4"><div className="cu-pillars">{data.pillars.map(p => <div key={p.title} className="cu-pillar"><h3 className="serif text-[40px] leading-[44px] tracking-[-0.018em]">{p.title}</h3><p className="text-[13px] leading-[20px] text-ink-2">{p.body}</p></div>)}</div></Reveal>
  </section>
  <section id="outcomes" className={sectionClass}>
   <h2 className="text-[15px] font-medium">Outcomes</h2>
   <div className="grid gap-16 pt-16 xl:grid-cols-2 lg:gap-20"><Reveal><h3 className={titleClass}>{data.outcome}</h3><p className="max-w-[420px] pt-8 text-[13px] leading-[22px] text-ink-2">These are the goals the work is designed to support. We will use them to guide decisions and evaluate the result together.</p></Reveal>
   <div className="grid gap-10">{data.outcomes.map(([title, body]) => <Reveal key={title}><h3 className="serif pb-4 text-[30px] leading-[36px]">{title}</h3><p className={bodyClass}>{body}</p></Reveal>)}</div></div>
  </section>
  <Approach data={data}/>
  {data.pages.length > 0 && <section id="pages" className={sectionClass}><Reveal><h2 className={titleClass}>The three-page plan.</h2><p className={`${bodyClass} max-w-[640px] pt-6 pb-12`}>A compact site with a clear role for each page. We will confirm the organization together at kickoff.</p></Reveal><ol>{data.pages.map(([title, body]) => <li key={title} className="grid gap-3 border-t border-[var(--color-rule)] py-7 md:grid-cols-[260px_1fr] md:gap-10"><h3 className="serif text-[24px] leading-[30px]">{title}</h3><p className={bodyClass}>{body}</p></li>)}</ol></section>}
  <section id="work" className={sectionClass}><Reveal className="grid gap-10 lg:grid-cols-2"><h2 className={titleClass}>Our work.</h2><div><p className={`${bodyClass} max-w-[520px] pb-8`}>Explore our brand identity and website work, with filters to find the projects most relevant to you.</p><Button href="https://anchovies.agency/work" outline>Explore our work ↗</Button></div></Reveal></section>
  <section id="timeline" className={sectionClass}><h2 className="text-[15px] font-medium">Timeline</h2><Reveal><h3 className={`${titleClass} max-w-[900px] py-16`}>{data.timelineTitle}</h3></Reveal>
   <Reveal><ol className="cu-timeline">{data.timeline.map(([when, title, body], index) => <li key={title} className="cu-milestone"><span className="cu-timeline-dot" aria-hidden="true">{String(index + 1).padStart(2,'0')}</span><p className="text-[13px] text-ink-2">{when}</p><h3 className="serif mt-5 text-[30px] leading-[36px]">{title}</h3><p className="mt-4 text-[14px] leading-[24px] text-ink-2">{body}</p></li>)}</ol></Reveal><p className="max-w-[960px] pt-12 text-[13px] leading-[22px] text-ink-2">{data.timing}</p>
  </section>
  <section id="investment" className={`${sectionClass} bg-ink text-paper`}><h2 className={titleClass}>Investment</h2><Reveal className="py-12"><p className="display text-[64px] leading-[70px] md:text-[96px] md:leading-[100px]">{formatPrice(data.fee)}</p><p className="max-w-[780px] pt-6 text-[16px] leading-[26px] text-paper/75">{data.investment}</p></Reveal>
   <Reveal className="mt-6"><h3 className="mb-6 text-[15px] font-medium">Payment structure</h3><div className="cu-payments grid grid-cols-2 gap-8">{[['At kickoff',formatPrice(data.fee / 2)],[proposal === 'pilates-loft' ? 'Before launch & handoff' : 'Before final handoff',formatPrice(data.fee / 2)]].map(([title, amount]) => <div key={title} className="border-t border-paper/20 pt-6"><span className="display text-[48px] leading-[52px] md:text-[64px] md:leading-[68px]">50%</span><h4 className="serif pt-3 text-[20px] leading-[26px]">{title}</h4><p className="pt-3 text-[15px] text-paper/70">{amount}</p></div>)}</div></Reveal>
  </section>
  <section id="next" className={sectionClass}><h2 className="text-[15px] font-medium">Next Steps</h2><Reveal className="mt-12"><h3 className="display max-w-[1000px] text-[48px] leading-[52px] tracking-[-0.026em] md:text-[80px] md:leading-[80px]">{data.closing}</h3><div className="max-w-[760px] space-y-5 pt-8 text-[16px] leading-[26px] text-ink-2"><p>{data.closingBody}</p><p>We would love to hear your thoughts. Share your feedback or book a call to walk through the proposal together. From there, we will confirm the scope, agree on a start date, and prepare the agreement.</p></div><div className="flex flex-wrap gap-4 pt-8"><Button href={feedback}>Share your feedback</Button><Button href="https://anchovies.agency/book" outline>Review the proposal together</Button></div></Reveal></section>
  <footer className="flex flex-col gap-5 px-6 py-8 text-[13px] text-ink-2 md:flex-row md:justify-between md:px-16 lg:px-[120px]"><span>Sean Ashlow · Anchovies · sean@anchovies.agency</span><span>{data.name} · November 23, 2026</span></footer>
 </main>
}
function Approach({ data }: { data: ProposalData }) {
  return (
    <section id="scope" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[160px]">
      <h2 className="text-[15px] font-medium">Scope</h2>
      <div className="grid gap-10 py-16 xl:grid-cols-[1.2fr_460px] lg:gap-20">
        <Reveal>
          <h2 className="display max-w-[720px] text-[48px] leading-[52px] tracking-[-0.024em] md:text-[72px] md:leading-[72px]">
            {data.scopeTitle}
          </h2>
        </Reveal>
        <Reveal className="pt-2">
          <p className="text-[15px] leading-[24px] text-ink-2">
            {data.scopeIntro}
          </p>
        </Reveal>
      </div>
      <div className="border-t border-[var(--color-rule)]">
        {data.engagement.map((phase, index) => (
          <Reveal key={phase.title} className="grid gap-8 border-b border-[var(--color-rule)] py-10 xl:grid-cols-[90px_1fr_360px] lg:gap-12">
            <div>
              <span className="serif block text-[56px] leading-[56px] tracking-[-0.02em]">{String(index + 1).padStart(2, '0')}</span>

            </div>
            <div className="max-w-[620px]">
              <h3 className="serif pb-5 text-[34px] leading-[40px] tracking-[-0.016em]">{phase.title}</h3>
              <p className="pb-5 text-[15px] leading-[24px] text-ink-2">{phase.body}</p>
              <p className="text-[13px] leading-[20px] text-ink-2">{phase.note}</p>
            </div>
            <div className="flex flex-col gap-3 pt-2">

              {phase.includes.map((item) => (
                <div key={item} className="flex items-baseline gap-3">
                  <span className="h-px w-[10px] shrink-0 bg-[var(--color-rule)]" />
                  <span className="text-[14px] leading-[22px]">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

