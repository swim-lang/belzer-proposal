import { client } from '../content'

const matters = [
  { num: '2025-0341', type: 'Litigation', name: 'Holloway v. Metro Realty', status: 'Deposition prep · Discovery open', active: true, badge: null as string | null },
  { num: '2025-0312', type: 'Estate', name: 'Matter of Vance Estate', status: 'Awaiting probate court response', active: false, badge: null },
  { num: '2025-0298', type: 'Criminal', name: 'Colorado v. Miran', status: 'Trial set · May 18', active: false, badge: '2 updates' },
  { num: '2025-0289', type: 'Regulatory', name: 'Driscoll v. First Federal', status: 'Motion filed · Awaiting ruling', active: false, badge: null },
  { num: '2025-0301', type: 'Inquiry', name: 'Westhold — SEC inquiry', status: 'Document production · 14 days', active: false, badge: null },
]

const strengths = [
  'Internal Metro email dated Jan 14 acknowledges undisclosed easement.',
  'Trust committee minutes corroborate reliance on Metro\u2019s valuation.',
  'Third-party appraisal commissioned post-sale confirms 31% gap.',
]

const weaknesses = [
  'No direct evidence of scienter from Metro\u2019s principal broker.',
  'Deposition of Margaret Wilson not yet scheduled \u2014 material witness.',
  'Trust committee\u2019s own due diligence process may be questioned.',
]

const docTypes: [string, string][] = [
  ['Pleadings', '18'],
  ['Contracts & exhibits', '54'],
  ['Correspondence', '112'],
  ['Research & notes', '63'],
]

const upcoming: [string, string, string][] = [
  ['Deposition prep · Wilson', 'Internal packet due', 'Thu · Apr 30'],
  ['Status update to client', 'Draft ready for review', 'Fri · May 1'],
  ['Motion to compel — file', 'Awaits final review', 'Mon · May 5'],
]

type Insight = { label: string; tinted?: boolean; confidence?: string; body: React.ReactNode; cta?: string; meta?: string }

const insights: Insight[] = [
  {
    label: 'Gap detected',
    tinted: true,
    confidence: 'High confidence',
    body: (
      <>Metro&apos;s document production references a Jan 14 board memo that has not been produced. Likely responsive to Request 14.</>
    ),
    cta: 'Draft motion to compel',
    meta: 'Dismiss',
  },
  {
    label: 'Related prior work',
    body: (
      <><span className="italic">Abrams v. Delco (2024)</span> used a similar reliance-based theory against an in-state brokerage. Your winning brief is in the motions bank.</>
    ),
    meta: 'Motion #MB-0147 · Won · 2024',
  },
  {
    label: 'Draft ready',
    body: 'Client status update for Mr. Holloway — covers discovery progress, upcoming deposition, and realistic timeline to summary judgment.',
    cta: 'Review + send',
    meta: 'Written in your voice',
  },
  {
    label: 'Deposition prep',
    body: '41 suggested questions for Margaret Wilson, built from her emails, calendar entries, and the 2023 valuation record.',
    meta: 'Open packet · Add your own',
  },
]

export function DashboardMock() {
  return (
    <div
      className="font-sans text-ink bg-paper flex flex-col"
      style={{ width: 1440, height: 900 }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-[var(--color-rule)] shrink-0">
        <div className="flex items-center gap-3.5">
          <span className="block w-2 h-2 rounded-full bg-ink" />
          <span className="text-[13px] font-medium tracking-[-0.01em]">{client.name}</span>
          <span className="block w-px h-[11px] bg-[var(--color-rule)]/40" />
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Case Intelligence</span>
        </div>
        <div className="flex items-center gap-2.5 px-3.5 py-2 bg-ink/[0.04] rounded-lg" style={{ width: 440 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4A4A4A" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-[13px] text-ink-2 flex-1">Search cases, motions, facts, documents…</span>
          <span className="text-[10px] tracking-[0.04em] text-ink-2 px-1.5 py-0.5 bg-paper border border-[var(--color-rule)]/20 rounded">⌘K</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="block w-1.5 h-1.5 rounded-full dash-pulse" style={{ backgroundColor: 'var(--color-mac)' }} />
            <span className="text-[12px]">3 new insights</span>
          </div>
          <div className="w-7 h-7 rounded-full bg-ink text-paper flex items-center justify-center text-[11px] font-medium">AB</div>
        </div>
      </div>

      {/* Main */}
      <div className="flex flex-1 min-h-0">
        {/* Left rail */}
        <aside className="w-[280px] shrink-0 flex flex-col border-r border-[var(--color-rule)]">
          <div className="flex items-center justify-between px-5 pt-5 pb-3.5">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Active matters</span>
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">5</span>
          </div>
          <div className="mx-5 mb-4 px-3.5 py-2.5 border border-dashed border-[var(--color-rule)]/35 rounded-lg flex items-center justify-center gap-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#4A4A4A" strokeWidth={2}>
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span className="text-[12px] text-ink-2">New matter</span>
          </div>
          {matters.map((m, i) => (
            <div
              key={m.num}
              className={`relative flex flex-col gap-1.5 px-5 py-3.5 ${i === 0 ? 'border-t border-[var(--color-rule)]' : ''} ${i < matters.length - 1 ? 'border-b border-[var(--color-rule)]/20' : ''} ${m.active ? 'bg-ink/[0.04]' : ''}`}
            >
              {m.active && <span className="absolute top-0 bottom-0 left-0 w-0.5" style={{ backgroundColor: 'var(--color-mac)' }} />}
              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.11em] uppercase text-ink-2">{m.num} · {m.type}</span>
                {m.active && <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />}
                {m.badge && <span className="text-[10px] tracking-[0.04em]" style={{ color: 'var(--color-mac)' }}>{m.badge}</span>}
              </div>
              <span className="serif text-[17px] leading-[21px] tracking-[-0.01em]">{m.name}</span>
              <span className="text-[11px] text-ink-2 leading-4">{m.status}</span>
            </div>
          ))}
        </aside>

        {/* Center */}
        <section className="flex-1 flex flex-col min-w-0">
          {/* Case header */}
          <div className="flex flex-col gap-[18px] px-8 pt-6 pb-5 border-b border-[var(--color-rule)]">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Matters</span>
              <span className="text-[11px] text-ink-2">/</span>
              <span className="text-[11px] tracking-[0.12em] uppercase">2025-0341</span>
            </div>
            <div className="flex items-end justify-between gap-4">
              <h1 className="serif text-[44px] leading-[48px] tracking-[-0.02em]" style={{ margin: 0 }}>
                Holloway v. Metro Realty Partners
              </h1>
              <div className="flex items-center gap-2.5">
                <div className="px-3 py-1.5 border border-[var(--color-rule)] rounded-full text-[11px]">Ask about this case</div>
                <div className="px-3 py-1.5 bg-ink text-paper rounded-full text-[11px]">Open case file</div>
              </div>
            </div>
            <div className="flex items-center gap-8">
              {[
                ['Client', 'Holloway Family Trust'],
                ['Filed', 'March 12, 2026'],
                ['Lead', client.leadName],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-[10px] tracking-[0.11em] uppercase text-ink-2">{label}</span>
                  <span className="text-[13px]">{value}</span>
                </div>
              ))}
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] tracking-[0.11em] uppercase text-ink-2">Status</span>
                <span className="flex items-center gap-1.5">
                  <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
                  <span className="text-[13px]">Active · Discovery</span>
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-7 px-8 border-b border-[var(--color-rule)]" style={{ height: 44 }}>
            <div className="flex items-center h-full px-0.5 border-b-2 border-ink text-[12px] font-medium">Overview</div>
            <div className="flex items-center gap-2 text-[12px] text-ink-2">Documents <span className="text-[10px] px-1.5 py-[1px] bg-ink/[0.06] rounded-[10px] text-ink-2">247</span></div>
            <div className="text-[12px] text-ink-2">Motions</div>
            <div className="text-[12px] text-ink-2">Facts</div>
            <div className="flex items-center gap-1.5 text-[12px] text-ink-2">Gaps <span className="block w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} /></div>
            <div className="text-[12px] text-ink-2">Timeline</div>
            <div className="text-[12px] text-ink-2">Communications</div>
          </div>

          {/* Overview body */}
          <div className="flex-1 flex gap-6 p-6 min-h-0">
            <div className="flex-1 flex flex-col gap-5 min-w-0">
              {/* Summary card */}
              <div className="flex flex-col gap-3 px-[22px] py-5 bg-white border border-[var(--color-rule)]/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Case summary</span>
                  <span className="text-[10px] tracking-[0.04em] text-ink-2">Drafted from 247 documents · 2h ago</span>
                </div>
                <p className="serif text-[18px] leading-[26px] tracking-[-0.005em] m-0">
                  The Holloway Family Trust contends that Metro Realty Partners materially misrepresented the 2023 valuation of the North Denver parcel, resulting in a forced sale at below-market value. Key dispute centers on timing of disclosures and the chain of communication between the Metro brokerage and the trust&apos;s investment committee.
                </p>
              </div>
              {/* S/W split */}
              <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-3 px-[18px] py-4 bg-white border border-[var(--color-rule)]/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Strengths</span>
                    <span className="text-[10px] text-ink-2">4</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {strengths.map((t, i) => (
                      <div key={i} className="flex gap-2.5">
                        <span className="w-1 shrink-0 bg-ink rounded-sm" />
                        <span className="serif text-[14px] leading-[18px]">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-3 px-[18px] py-4 bg-white border border-[var(--color-rule)]/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Weaknesses</span>
                    <span className="text-[10px] text-ink-2">3</span>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {weaknesses.map((t, i) => (
                      <div key={i} className="flex gap-2.5">
                        <span className="w-1 shrink-0 bg-[var(--color-rule)]/35 rounded-sm" />
                        <span className="serif text-[14px] leading-[18px]">{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary col */}
            <div className="w-[280px] shrink-0 flex flex-col gap-5">
              {/* Docs card */}
              <div className="flex flex-col gap-3 px-[18px] py-4 bg-white border border-[var(--color-rule)]/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Documents</span>
                  <span className="text-[10px] text-ink-2">247 · 6 new</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="serif text-[36px] leading-[38px] tracking-[-0.02em]">247</span>
                  <span className="text-[11px] text-ink-2">items indexed</span>
                </div>
                <div className="flex flex-col gap-2 pt-1.5 border-t border-[var(--color-rule)]/14">
                  {docTypes.map(([label, num]) => (
                    <div key={label} className="flex justify-between gap-2.5">
                      <span className="text-[12px]">{label}</span>
                      <span className="text-[12px] text-ink-2">{num}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Upcoming */}
              <div className="flex flex-col gap-2.5 px-[18px] py-4 bg-white border border-[var(--color-rule)]/20 rounded-xl">
                <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Upcoming</span>
                <div className="flex flex-col gap-2.5">
                  {upcoming.map(([title, note, date], i) => (
                    <div key={i} className={`flex justify-between ${i < upcoming.length - 1 ? 'pb-2.5 border-b border-[var(--color-rule)]/12' : ''}`}>
                      <div className="flex flex-col gap-0.5">
                        <span className="serif text-[14px] leading-[18px]">{title}</span>
                        <span className="text-[11px] text-ink-2">{note}</span>
                      </div>
                      <span className="text-[11px] whitespace-nowrap">{date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right rail */}
        <aside className="w-[340px] shrink-0 flex flex-col border-l border-[var(--color-rule)]">
          <div className="flex items-center justify-between px-6 pt-5 pb-3.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Intelligence</span>
              <span className="block w-[5px] h-[5px] rounded-full dash-pulse" style={{ backgroundColor: 'var(--color-mac)' }} />
            </div>
            <span className="text-[10px] tracking-[0.04em] text-ink-2">Updated 8 min ago</span>
          </div>
          <div className="px-6 pb-3.5">
            <p className="serif italic text-[14px] leading-5 text-ink-2 m-0">Observations from your 247 documents, Metro&apos;s production, and prior {client.shortName} matters.</p>
          </div>
          {insights.map((ins, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2.5 px-6 py-4 ${i === 0 ? 'border-t border-[var(--color-rule)]' : ''} ${i < insights.length - 1 ? 'border-b border-[var(--color-rule)]/20' : ''}`}
              style={ins.tinted ? { backgroundColor: 'rgba(30, 63, 229, 0.035)' } : {}}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {ins.tinted && <span className="block w-[5px] h-[5px] rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />}
                  <span className="text-[10px] tracking-[0.12em] uppercase" style={{ color: ins.tinted ? 'var(--color-mac)' : '#4A4A4A' }}>{ins.label}</span>
                </div>
                {ins.confidence && <span className="text-[10px] tracking-[0.04em] text-ink-2">{ins.confidence}</span>}
              </div>
              <p className="serif text-[15px] leading-5 tracking-[-0.005em] m-0">{ins.body}</p>
              {ins.cta && (
                <div className="flex items-center gap-2.5 pt-1">
                  <div
                    className="px-2.5 py-1.5 rounded-full text-[11px]"
                    style={ins.tinted
                      ? { border: '1px solid var(--color-mac)', color: 'var(--color-mac)' }
                      : { border: '1px solid #0A0A0A', color: '#0A0A0A' }}
                  >
                    {ins.cta}
                  </div>
                  {ins.meta && <span className="text-[10px] text-ink-2">{ins.meta}</span>}
                </div>
              )}
              {!ins.cta && ins.meta && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] text-ink-2">{ins.meta}</span>
                </div>
              )}
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
