import { useEffect } from 'react'

const sessions = [
  {
    number: '01', audience: 'Current LEJ cohort', title: 'Brand Foundations for a New Law Practice',
    format: '60-minute presentation and Q&A', price: 'Complimentary',
    description: 'A practical starting point for making a new practice clear, credible, and distinct without a large marketing budget.',
    topics: ['Audience and positioning', 'Explaining alternative-fee, bundled, and limited-scope services clearly', 'Naming and differentiation', 'Minimum viable identity and website'],
    takeaways: 'Launch checklist, positioning worksheet, naming/domain checklist, first-website priorities, and Q&A.',
  },
  {
    number: '02', audience: 'LEJ alumni & established participants', title: 'Brand and Website Working Session',
    format: 'Two-hour interactive group workshop', price: '$1,000',
    description: 'Turn an existing brand and website into a clear set of next steps. Includes a short pre-session questionnaire and review of submitted websites and materials.',
    topics: ['Differentiation and messaging', 'Website hierarchy, calls to action, and biographies', 'Practice-area framing and realistic niche visibility', 'Live reviews of participant work'],
    takeaways: 'Self-audit workbook, prioritized improvement framework, visibility worksheet, and a 30-day action plan.',
  },
]

export function LejProposal() {
  useEffect(() => {
    document.title = 'Anchovies × Legal Entrepreneurs for Justice | Partnership Proposal'
    const meta = document.querySelector('meta[name="description"]')
    meta?.setAttribute('content', 'A proposed LEJ partnership: practical brand education, alumni workshops, individual firm support, and a separate AI curriculum.')
  }, [])

  return (
    <main className="lej-proposal mx-auto max-w-[1200px] px-6 text-ink sm:px-10 lg:px-16">
      <header className="flex flex-wrap items-center justify-between gap-5 border-b border-ink/20 py-7">
        <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-6 w-auto" />
        <span className="eyebrow text-ink-2">LEJ partnership proposal · September 2026</span>
      </header>

      <section className="pb-14 pt-16 sm:pb-20 sm:pt-24" aria-labelledby="lej-title">
        <p className="eyebrow mb-7 text-mac">Anchovies × Legal Entrepreneurs for Justice</p>
        <h1 id="lej-title" className="display max-w-[850px] text-[48px] sm:text-[72px] lg:text-[88px]">A strong start.<br /><em>A practice of your own.</em></h1>
        <p className="mt-8 max-w-[640px] text-lg leading-relaxed text-ink-2">Practical brand and website guidance for lawyers building independent practices. Start with the essentials, then offer deeper support as their firms grow.</p>
        <p className="mt-5 text-sm text-ink-2">Prepared for Lauren Solomon, LEJ Program Manager, following our September 7 conversation.</p>
        <nav aria-label="Proposal sections" className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm underline underline-offset-4">
          <a href="#programming">Group programming</a><a href="#individual">Individual support</a><a href="#ai">AI curriculum</a><a href="#directory">Directory details</a>
        </nav>
      </section>

      <aside className="mb-16 border-y border-ink/20 py-7 sm:flex sm:gap-12">
        <p className="eyebrow shrink-0 text-mac">Our suggested start</p>
        <p className="mt-4 max-w-[730px] text-lg leading-relaxed sm:mt-0">Begin with the complimentary Brand Foundations presentation. Use participant feedback to shape the alumni workshop, and add Anchovies to the LEJ partner directory now.</p>
      </aside>

      <div id="programming" className="scroll-mt-8">
        {sessions.map(session => (
          <section key={session.number} className="grid gap-7 border-b border-ink/20 py-12 md:grid-cols-[60px_1fr]" aria-labelledby={`session-${session.number}`}>
            <span className="serif text-3xl text-mac">{session.number}</span>
            <div>
              <p className="eyebrow mb-4 text-ink-2">{session.audience}</p>
              <h2 id={`session-${session.number}`} className="display max-w-[700px] text-4xl sm:text-5xl">{session.title}</h2>
              <div className="my-6 flex flex-wrap items-center gap-x-6 gap-y-2"><strong className="text-xl font-medium text-mac">{session.price}</strong><span className="text-sm text-ink-2">{session.format}</span></div>
              <p className="max-w-[750px] leading-7 text-ink-2">{session.description}</p>
              <div className="mt-7 grid gap-7 sm:grid-cols-2">
                <div><h3 className="eyebrow mb-3">What we’ll cover</h3><ul className="list-disc space-y-2 pl-4 text-sm leading-6 text-ink-2">{session.topics.map(topic => <li key={topic}>{topic}</li>)}</ul></div>
                <div><h3 className="eyebrow mb-3">What participants take away</h3><p className="text-sm leading-6 text-ink-2">{session.takeaways}</p></div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section id="individual" className="grid scroll-mt-8 gap-7 border-b border-ink/20 py-12 md:grid-cols-[60px_1fr]" aria-labelledby="individual-title">
        <span className="serif text-3xl text-mac">03</span>
        <div>
          <p className="eyebrow mb-4 text-ink-2">LEJ participants & alumni</p>
          <h2 id="individual-title" className="display text-4xl sm:text-5xl">Individual Firm Support</h2>
          <p className="mt-6 text-lg leading-7">A complimentary 30-minute consultation to talk through where the firm is and what would help most.</p>
          <div className="mt-7 border border-ink/20 p-6 sm:p-8">
            <div className="flex flex-wrap justify-between gap-4"><h3 className="serif text-3xl">LEJ Brand Launch Review</h3><p className="text-xl text-mac">$500 <span className="block text-xs text-ink-2">Standard value $950</span></p></div>
            <p className="mt-5 text-sm leading-6 text-ink-2">Pre-review of the firm’s name, positioning, identity, website, and public profiles, followed by a 75-minute working session. Participants receive a written priority list and clear recommendations about what to handle themselves and where professional help would be valuable.</p>
            <p className="mt-4 text-sm leading-6">The $500 review fee may be credited toward an engagement of $5,000 or more initiated within 90 days.</p>
          </div>
          <h3 className="eyebrow mb-4 mt-8">If more help is useful</h3>
          <dl className="text-sm"><div className="flex flex-wrap justify-between gap-2 border-t border-ink/15 py-4"><dt>Focused strategy engagements</dt><dd>$500–$1,000</dd></div><div className="flex flex-wrap justify-between gap-2 border-t border-ink/15 py-4"><dt>Brand identity engagements</dt><dd>$2,000–$4,000</dd></div><div className="flex flex-wrap justify-between gap-2 border-t border-ink/15 py-4"><dt>Website design & development</dt><dd>Custom-scoped after the consultation</dd></div></dl>
        </div>
      </section>

      <section id="ai" className="grid scroll-mt-8 gap-7 border-b border-ink/20 py-12 md:grid-cols-[60px_1fr]" aria-labelledby="ai-title">
        <span className="serif text-3xl text-mac">04</span>
        <div>
          <p className="eyebrow mb-4 text-ink-2">A separate curriculum track</p>
          <h2 id="ai-title" className="display max-w-[700px] text-4xl sm:text-5xl">AI for the Modern Small Law Practice</h2>
          <p className="mt-6 max-w-[750px] leading-7 text-ink-2">For alumni, advanced participants, or future cohorts as ethics guidance develops. A practical look at where AI can help, where human judgment belongs, and how to test ideas carefully.</p>
          <div className="my-7 grid gap-4 sm:grid-cols-2"><div className="border border-ink/20 p-5"><h3 className="font-medium">Introductory presentation</h3><p className="mt-2 text-sm">90 minutes · Complimentary</p></div><div className="border border-ink/20 p-5"><h3 className="font-medium">Applied workshop</h3><p className="mt-2 text-sm">Two hours · $1,000</p></div></div>
          <div className="grid gap-7 sm:grid-cols-2"><div><h3 className="eyebrow mb-3">What we’ll cover</h3><p className="text-sm leading-6 text-ink-2">Non-confidential use cases, workflow mapping, voice-first thinking, public versus private systems, administrative efficiency, human review, and safe experiments.</p></div><div><h3 className="eyebrow mb-3">Applied workshop takeaways</h3><p className="text-sm leading-6 text-ink-2">Workflow opportunity map, use-case prioritization, privacy/review checklist, one mapped workflow, and a 30-day experimentation plan.</p></div></div>
          <p className="mt-7 border-l-2 border-mac pl-4 text-sm leading-6">This is not legal ethics advice and does not encourage the use of confidential information in unapproved systems.</p>
        </div>
      </section>

      <section id="directory" className="scroll-mt-8 py-14 sm:py-20" aria-labelledby="directory-title">
        <p className="eyebrow mb-4 text-mac">Ready for the partner directory</p>
        <h2 id="directory-title" className="display text-4xl sm:text-5xl">A local resource. An open door.</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5 text-sm leading-7 text-ink-2"><p>Anchovies is a Denver branding and web agency helping solo and small law firms clarify their position, develop distinctive identities, and build effective websites. Services include positioning, naming, brand identity, messaging, website design and development, and selected AI-enabled business systems.</p><p><strong className="font-medium text-ink">LEJ participant benefit:</strong> complimentary 30-minute consultation and access to the $500 LEJ Brand Launch Review. Participants may mention LEJ when scheduling.</p></div>
          <div className="text-sm leading-7"><p className="font-medium">Sean Ashlow</p><a className="block underline underline-offset-4" href="mailto:sean@anchovies.agency">sean@anchovies.agency</a><a className="block underline underline-offset-4" href="https://anchovies.agency">Anchovies website ↗</a><a className="mt-6 inline-block bg-mac px-5 py-3 text-paper hover:bg-mac-hover" href="https://cal.com/anchovies/30min?overlayCalendar=true">Book a complimentary consultation ↗</a></div>
        </div>
      </section>
      <footer className="flex flex-wrap justify-between gap-4 border-t border-ink/20 py-7 text-xs text-ink-2"><span>Anchovies × LEJ</span><span>Proposed programming · Dates coordinated together</span></footer>
    </main>
  )
}
