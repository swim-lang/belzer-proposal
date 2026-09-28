import { useEffect, type ReactNode } from 'react'

const calendarHref = 'https://cal.com/anchovies/30min?overlayCalendar=true'
const approvalHref = `mailto:sean@anchovies.agency?subject=${encodeURIComponent('M. Bouvier Law + Anchovies: let’s get started')}&body=${encodeURIComponent('Hi Sean,\n\nI’m excited to move forward with the M. Bouvier Law proposal. Please send over the agreement and kickoff invoice so we can get started.\n\nThanks!')}`

const sections = [
  ['goals', 'Goals'], ['scope', 'Scope'], ['process', 'Process'],
  ['work', 'Selected Work'], ['timeline', 'Timeline'], ['investment', 'Investment'], ['next', 'Next Steps'],
]
const scope = [
  {
    title: 'Brand identity',
    intro: 'A distinctive identity for M. Bouvier Law that feels professional, personal, and true to you, with the everyday materials to put it to work.',
    items: ['A focused discovery conversation and visual moodboard to align on your story, taste, and the clients you want to serve', 'Primary logo, secondary lockup, and a supporting monogram or mark where appropriate', 'Typography, color palette, and a supporting graphic language', 'One developed creative direction shown across the website and printed materials, followed by refinement together', 'Print-ready business card design and editable letterhead and client correspondence template', 'One email signature, social profile image and cover, and three reusable social post templates', 'A concise brand guide covering logo, type, color, layout, and image use', 'Organized vector, print, and web logo files, plus editable templates'],
    note: 'Discovery is part of the design process. We are working with M. Bouvier Law as the name; naming and a separate brand strategy engagement are not included. Printing and paid asset licenses are separate.',
  },
  {
    title: 'Nine-page website',
    intro: 'A custom website that makes your experience easy to understand and helps the right people feel comfortable reaching out.',
    items: ['A nine-page structure, with clear paths for criminal defense, family law, and mediation', 'Concise copywriting for all nine pages, based on your interview, background, and approved service information', 'Custom desktop and mobile design, followed by responsive development', 'A firm introduction and approach that show who clients will work with directly', 'An Insights listing and reusable article template; ongoing article writing is separate', 'A contact form routed to your email, clear phone and email links, and a confirmation message', 'Foundational search setup: page titles, descriptions, headings, sitemap, and indexing', 'Analytics and Search Console setup using firm-owned accounts', 'Browser, mobile, form, and basic accessibility checks before launch', 'Domain connection, launch support, and a walkthrough for routine content updates'],
    note: 'You review credentials, services, and legal content before launch and provide approved privacy and disclaimer wording. Hosting, domains, photography production, ongoing SEO, paid advertising, client portals, payment systems, and custom integrations are separate.',
  },
]
const pages = [
  ['Home', 'Introduce the practice, your personal service, and the main ways you can help.'],
  ['About the Firm', 'Introduce the firm, its values, and the experience behind its personal approach to client service.'],
  ['Criminal Defense', 'Explain your criminal defense work and help visitors understand the next step.'],
  ['Family Law', 'Describe the family matters you take on and your approach to resolving them.'],
  ['Mediation', 'Explain the mediation process and who it may be right for.'],
  ['Working Together', 'Set expectations for direct communication, the first conversation, and working with you.'],
  ['Insights', 'A place to share helpful perspectives and firm updates, with an editable article template for future publishing.'],
  ['FAQs', 'Answer practical questions about getting started, communication, and fit.'],
  ['Contact', 'Make it easy to call, email, or send an initial inquiry.'],
]
const phases = [
  ['01', 'Discovery & moodboard', 'Talk through your story, experience, preferred cases, and visual taste. Agree on the page outline and gather the information we need.'],
  ['02', 'Identity & refinement', 'Present one developed identity with examples of it in use. Refine it with your feedback until the direction feels right.'],
  ['03', 'Website & materials', 'Write and design the nine pages, build the responsive site, and prepare your stationery and digital templates.'],
  ['04', 'Launch & handoff', 'Review the content together, test the site and contact form, connect the domain, and hand over the files and guidance.'],
]
const investment = [
  { label: 'Brand identity & everyday materials', amount: 4000 },
  { label: 'Nine-page website, copy & launch', amount: 5900 },
]
const total = investment.reduce((sum, item) => sum + item.amount, 0)
const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
const payments = [
  { percent: 50, label: 'At kickoff', detail: 'To reserve the project and begin discovery.' },
  { percent: 25, label: 'At identity approval', detail: 'After the identity presentation and approval.' },
  { percent: 25, label: 'Before final handoff', detail: 'Before final files are delivered and the website launches.' },
]

function Section({ id, number, title, children, dark = false }: { id: string; number: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-32 border-b border-[var(--color-rule)] px-6 py-20 md:px-16 lg:px-[120px] lg:py-[120px] ${dark ? 'bg-ink text-paper' : ''}`}>
    <div className="flex items-center justify-between gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/60' : 'text-ink-2'}`}>§ {number} · {title}</span>
      <span className={`eyebrow hidden sm:block ${dark ? 'text-paper/60' : 'text-ink-2'}`}>Anchovies × M. Bouvier Law</span>
    </div>
    <h2 id={`${id}-title`} className="display mb-12 mt-10 text-[48px] md:text-[72px]">{title}</h2>
    {children}
  </section>
}

export function MBouvierProposal() {
  useEffect(() => {
    document.title = 'Anchovies × M. Bouvier Law · Proposal'
    document.querySelector('meta[name="description"]')?.setAttribute('content', 'Brand identity and a nine-page website for M. Bouvier Law.')
  }, [])

  return <div className="bg-paper text-ink">
    <a href="#overview" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip to proposal</a>
    <header className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-6 py-4 md:px-16">
        <a href="#overview" aria-label="M. Bouvier Law proposal overview" className="flex items-center gap-3"><img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto" /><span className="hidden text-[13px] sm:inline">Anchovies × M. Bouvier Law</span></a>
        <a href="#investment" className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium transition-colors hover:bg-ink hover:text-paper">View investment</a>
      </div>
      <nav aria-label="Proposal sections" className="flex gap-6 overflow-x-auto border-t border-ink/10 px-6 py-3 text-[12px] text-ink-2 md:px-16">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 hover:text-ink">{label}</a>)}
      </nav>
    </header>
    <main>
      <section id="overview" className="scroll-mt-32 border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24">
        <div className="mb-14 flex flex-col justify-between gap-4 sm:flex-row"><span className="eyebrow text-ink-2">Brand identity · Website</span><span className="eyebrow text-ink-2">Prepared for Meaghan Bouvier</span></div>
        <h1 className="display max-w-[1100px] pb-12 text-[56px] tracking-[-0.028em] sm:text-[80px] md:text-[104px] lg:text-[128px]">Brand & website proposal.</h1>
        <div className="grid gap-10 border-t border-[var(--color-rule)] pt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <p className="serif max-w-[680px] text-[28px] leading-[1.3] md:text-[36px]">A professional first impression. A practice that feels like you.</p>
          <div className="space-y-6"><p className="text-[15px] leading-6 text-ink-2">You want a small, personal practice where clients work directly with you. We’ll create a distinctive identity and a focused website that show your experience, communicate your care, and help the right people take the next step.</p><div className="flex flex-wrap gap-x-8 gap-y-3"><span className="eyebrow">{money(total)} · Fixed project fee</span><span className="eyebrow">5–7 week target</span></div></div>
        </div>
      </section>

      <Section id="goals" number="01" title="Goals">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ['Build trust from the start', 'Give a new firm an established, credible presence. Show your experience and attention to detail without making the practice feel distant or impersonal.'],
            ['Attract the right inquiries', 'Help people looking for attentive, direct legal support recognize a good fit. Make your areas of focus clear without presenting the firm as a catch-all practice.'],
            ['Make reaching out easier', 'Give referrals and prospective clients a clear picture of who you are, how you work, and what happens next, with an easy way to contact you.'],
          ].map(([title, body], i) => <div key={title} className="border-t border-[var(--color-rule)] pt-6"><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-5 mt-6 text-[30px] leading-tight">{title}</h3><p className="text-[15px] leading-6 text-ink-2">{body}</p></div>)}
        </div>
      </Section>

      <section aria-labelledby="outcome-title" className="border-b border-[var(--color-rule)] px-6 py-16 md:px-16 lg:px-[120px] lg:py-20">
        <h2 id="outcome-title" className="eyebrow mb-7 text-ink-2">The outcome</h2>
        <p className="serif max-w-[1050px] text-[34px] leading-[1.25] md:text-[48px]">A firm you’re proud to introduce, with a clear, credible presence that supports better-fit inquiries and lasting client relationships.</p>
      </section>

      <Section id="scope" number="02" title="Scope">
        <p className="mb-12 max-w-[680px] text-[17px] leading-7 text-ink-2">Two connected areas of work: an identity you can use every day and a website ready to introduce your practice.</p>
        {scope.map((group, i) => <div key={group.title} className="grid gap-8 border-t border-[var(--color-rule)] py-10 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div><span className="eyebrow text-ink-2">0{i + 1}</span><h3 className="serif mb-5 mt-4 text-[34px] leading-tight md:text-[40px]">{group.title}</h3><p className="max-w-[430px] text-[15px] leading-6 text-ink-2">{group.intro}</p></div>
          <div><ul className="space-y-4">{group.items.map(item => <li key={item} className="flex gap-4 text-[15px] leading-6"><span aria-hidden="true" className="text-ink-2">↗</span><span>{item}</span></li>)}</ul><p className="mt-8 border-t border-ink/15 pt-5 text-[13px] leading-6 text-ink-2">{group.note}</p></div>
        </div>)}
        <div className="mt-10 border-t border-[var(--color-rule)] pt-10">
          <h3 className="serif mb-5 text-[34px]">Proposed website pages</h3>
          <p className="mb-8 max-w-[760px] text-[15px] leading-6 text-ink-2">A starting outline based on our conversation. We’ll confirm the service labels and page priorities with you before writing. Pages can be exchanged within the nine-page scope.</p>
          <div className="grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">{pages.map(([title, body], i) => <div key={title} className="border-t border-[var(--color-rule)] py-6"><span className="eyebrow text-ink-2">0{i + 1}</span><h4 className="serif mb-3 mt-4 text-[26px]">{title}</h4><p className="text-[14px] leading-6 text-ink-2">{body}</p></div>)}</div>
          <p className="mt-6 text-[13px] leading-6 text-ink-2">Privacy and disclaimer text can sit within these pages or a shared footer panel. Separate legal pages or additional service pages can be exchanged within the nine pages or quoted separately.</p>
        </div>
      </Section>

      <Section id="process" number="03" title="Process" dark>
        <p className="mb-12 max-w-[760px] font-normal text-[24px] leading-[1.4] text-paper/85">We agree on the direction together, then develop one complete creative solution. Your feedback shapes the refinements.</p>
        <div className="grid gap-10 md:grid-cols-2">{phases.map(([n, title, body]) => <div key={n} className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">{n}</span><h3 className="serif mb-4 mt-5 text-[34px]">{title}</h3><p className="max-w-[500px] text-[15px] leading-6 text-paper/75">{body}</p></div>)}</div>
      </Section>

      <Section id="work" number="04" title="Selected Work">
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="serif text-[30px] leading-[1.3]">You’ve seen the work. Now let’s make something that feels like you.</p>
          <div><p className="mb-6 text-[15px] leading-6 text-ink-2">Thank you for taking the time to explore our portfolio. We’ll bring the same care and personal attention to M. Bouvier Law.</p><a href="https://anchovies.agency/" target="_blank" rel="noreferrer" className="inline-block border-b border-ink py-3 text-[15px] hover:text-ink-2">View our work ↗</a></div>
        </div>
      </Section>

      <Section id="timeline" number="05" title="Timeline">
        <div className="mb-12 grid gap-6 lg:grid-cols-2"><p className="serif text-[36px]">Approximately 5–7 weeks.</p><p className="max-w-[550px] text-[15px] leading-6 text-ink-2">A target from kickoff to handoff, with overlapping work where practical. We’ll confirm the start date and schedule together. Timely feedback, approved copy, and access to your domain and selected photography help keep the work moving.</p></div>
        {[
          ['Week 1', 'Discovery & direction', 'Your story, visual moodboard, approved page outline, and content gathering.'],
          ['Weeks 2–3', 'Brand identity', 'Creative presentation, refinement, and initial website copy.'],
          ['Weeks 3–6', 'Website & materials', 'Website design and development, stationery, email signature, and social assets.'],
          ['Weeks 5–7', 'Testing & launch', 'Content approval, mobile and form testing, domain connection, and handoff.'],
        ].map(([time, title, body]) => <div key={time} className="grid gap-3 border-t border-[var(--color-rule)] py-7 md:grid-cols-[120px_1fr_1.5fr] md:gap-8"><span className="eyebrow text-ink-2">{time}</span><h3 className="serif text-[25px]">{title}</h3><p className="text-[14px] leading-6 text-ink-2">{body}</p></div>)}
      </Section>

      <Section id="investment" number="06" title="Investment" dark>
        <p className="display mb-5 text-[76px] md:text-[112px]">{money(total)}</p><p className="mb-12 max-w-[650px] text-[16px] leading-7 text-paper/75">One fixed project fee for the identity, everyday materials, nine-page website, copywriting, and launch support described above.</p>
        {investment.map(item => <div key={item.label} className="flex items-start justify-between gap-6 border-t border-paper/25 py-6 text-[16px]"><span>{item.label}</span><span className="shrink-0 tabular-nums">{money(item.amount)}</span></div>)}
        <div className="mt-12 grid gap-8 md:grid-cols-3">{payments.map(payment => <div key={payment.percent + payment.label} className="border-t border-paper/25 pt-6"><span className="eyebrow text-paper/60">{payment.percent}% · {payment.label}</span><p className="serif my-4 text-[40px]">{money(total * payment.percent / 100)}</p><p className="text-[14px] leading-6 text-paper/75">{payment.detail}</p></div>)}</div>
        <p className="mt-12 max-w-[900px] border-t border-paper/25 pt-6 text-[13px] leading-6 text-paper/70">Third-party costs, including hosting, domains, paid licenses, photography, and printing, are separate and will be identified before purchase. Additional work or changes to the agreed scope will be priced and approved before proceeding.</p>
      </Section>

      <Section id="next" number="07" title="Next Steps">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="serif mb-6 text-[32px] leading-[1.3]">Ready when you are.</p>
            <p className="max-w-[530px] text-[15px] leading-7 text-ink-2">If this feels right, let us know and we’ll prepare the agreement and kickoff invoice. If you’d like to talk it through first, choose a time for us to review the proposal together.</p>
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <a href={approvalHref} className="inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-4 text-center text-[14px] font-medium text-paper transition-colors hover:bg-ink-2 sm:w-auto">Let’s get started</a>
            <a href={calendarHref} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full border border-ink px-6 py-4 text-center text-[14px] font-medium transition-colors hover:bg-ink hover:text-paper sm:w-auto">Review the proposal together</a>
          </div>
        </div>
      </Section>
    </main>
    <footer className="flex flex-col justify-between gap-5 px-6 py-10 md:flex-row md:px-16 lg:px-[120px]"><img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-fit" /><span className="eyebrow text-ink-2">Prepared for M. Bouvier Law · September 2026</span><a href="#overview" className="text-[12px]">Back to top ↑</a></footer>
  </div>
}
