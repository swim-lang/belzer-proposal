export function IntakeComplete({
  clientName,
  agencyEmail,
  durationSeconds,
  onReview,
  onBack,
}: {
  clientName: string
  agencyEmail: string
  durationSeconds: number
  onReview: () => void
  onBack: () => void
}) {
  const mins = Math.floor(durationSeconds / 60)
  const secs = durationSeconds % 60
  const dur = `${mins} min ${String(secs).padStart(2, '0')} s`

  const firstName = agencyEmail.split('@')[0]
  const alexis = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  return (
    <div className="flex-1 flex flex-col bg-ink text-paper min-h-screen">
      <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/15">
        <div className="flex items-center gap-3.5">
          <span className="block w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
          <span className="text-[13px] font-medium tracking-[-0.01em]">Anchovies</span>
          <span className="block w-px h-[11px] bg-white/30" />
          <span className="text-[11px] tracking-[0.12em] uppercase text-paper/60">{clientName} · Intake</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
          <span className="text-[11px] tracking-[0.12em] uppercase text-paper/60">Submitted · {dur}</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row px-6 md:px-12 lg:px-[120px] py-12 lg:py-16 gap-10 lg:gap-20">
        <div className="flex-[1.2] flex flex-col gap-7 max-w-[720px]">
          <div className="flex items-center gap-2.5">
            <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
            <span className="text-[11px] tracking-[0.12em] uppercase text-paper/70">Intake received</span>
          </div>
          <h1 className="serif text-[72px] leading-[76px] md:text-[96px] md:leading-[96px] tracking-[-0.022em]">
            We&rsquo;ve got it.
          </h1>
          <p className="text-[16px] md:text-[17px] leading-[26px] md:leading-[27px] text-paper/80 max-w-[540px]">
            This goes straight to {alexis}. We&rsquo;ll review your answers, pull relevant threads from
            the proposal, and come back within a day with a proposed time for the strategy session.
          </p>
          <p className="text-[13px] md:text-[14px] leading-[22px] text-paper/60 max-w-[540px]">
            You&rsquo;ll get a copy of your responses in your inbox in a moment. If anything changes or
            you want to add context later, reply to it — it comes from {alexis} directly.
          </p>
          <div className="flex items-center gap-3 pt-3">
            <button
              type="button"
              onClick={onReview}
              className="px-5 py-3 rounded-full border border-white/25 text-[12px] text-paper hover:border-white/60 transition-colors"
            >
              View your answers
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-3 rounded-full text-[12px] text-paper transition-colors"
              style={{ backgroundColor: 'var(--color-mac)' }}
            >
              Back to proposal →
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col max-w-[420px] border-t border-white/15">
          {[
            { n: 'Step 01', t: 'We review your answers', b: "Today or tomorrow. We'll flag anything worth clarifying before kickoff." },
            { n: 'Step 02', t: 'Kickoff scheduled', b: 'A short proposal of times with whoever you selected to include.' },
            { n: 'Step 03', t: 'Two weeks, one focused sprint', b: 'High-fidelity designs, a clickable prototype, and a development-ready handoff.' },
          ].map((s, i, arr) => (
            <div
              key={s.n}
              className="flex gap-6 py-5"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.15)' : undefined }}
            >
              <span className="text-[10px] tracking-[0.12em] uppercase text-paper/55 w-[52px] shrink-0 pt-1">
                {s.n}
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="serif text-[20px] md:text-[22px] leading-[28px]">{s.t}</span>
                <span className="text-[13px] leading-[20px] text-paper/65">{s.b}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
