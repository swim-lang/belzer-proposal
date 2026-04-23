import { useEffect } from 'react'

export function IntakeIntro({ clientName, onStart }: { clientName: string; onStart: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onStart()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onStart])

  return (
    <div className="flex-1 flex flex-col justify-center items-start px-6 md:px-12 lg:px-[120px] gap-10 max-w-[900px]">
      <div className="flex items-center gap-2.5">
        <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
        <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">
          {clientName} · AI Tool Intake
        </span>
      </div>
      <h1 className="serif text-[48px] leading-[52px] md:text-[72px] md:leading-[76px] lg:text-[88px] lg:leading-[92px] tracking-[-0.022em]">
        Thanks for moving forward.
      </h1>
      <div className="flex flex-col gap-4 max-w-[640px]">
        <p className="text-[16px] md:text-[17px] leading-[26px] md:leading-[27px] text-ink-2">
          This short intake will help us understand where the first sprint should focus. The goal is
          not to define the entire future tool in one sitting — just to identify the most useful first
          version, the systems it may need to touch, and the workflows that would create the most
          immediate value.
        </p>
        <p className="text-[14px] md:text-[15px] leading-[22px] md:leading-[23px] text-ink-2">
          Most questions are multiple choice. Use &ldquo;Other&rdquo; whenever something doesn&rsquo;t
          fit neatly.
        </p>
      </div>
      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={onStart}
          className="flex items-center gap-3 px-6 py-4 rounded-full text-[14px] font-medium text-paper transition-colors"
          style={{ backgroundColor: 'var(--color-mac)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
        >
          <span>Begin intake</span>
          <span>→</span>
        </button>
        <span className="text-[12px] text-ink-2">
          or press{' '}
          <span className="font-mono text-[11px] px-1.5 py-0.5 bg-ink/[0.06] rounded">Enter</span>
        </span>
      </div>
    </div>
  )
}
