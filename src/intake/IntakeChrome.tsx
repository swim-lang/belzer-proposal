import { type ReactNode } from 'react'

export function TopBar({ step, total, clientName }: { step: number; total: number; clientName: string }) {
  const pct = Math.min(100, Math.max(0, (step / total) * 100))
  return (
    <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-[var(--color-rule)]/15">
      <div className="flex items-center gap-3.5">
        <span className="block w-2 h-2 rounded-full bg-ink" />
        <span className="text-[13px] font-medium tracking-[-0.01em]">Anchovies</span>
        <span className="block w-px h-[11px] bg-[var(--color-rule)]/30" />
        <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">{clientName} · Intake</span>
      </div>
      <div className="flex items-center gap-4 flex-1 max-w-[420px] justify-end ml-4">
        <div className="relative flex-1 h-[3px] bg-[var(--color-rule)]/12 rounded-full overflow-hidden max-w-[320px]">
          <div
            className="absolute top-0 left-0 h-full transition-[width] duration-500 ease-out"
            style={{ width: `${pct}%`, backgroundColor: 'var(--color-mac)' }}
          />
        </div>
        <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2 whitespace-nowrap">
          {String(step).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

export function BottomBar({
  leftHint,
  onBack,
  onNext,
  nextLabel = 'Continue',
  nextKeyHint = 'Enter',
  nextDisabled = false,
  onSkip,
  skipLabel = 'Skip',
}: {
  leftHint?: ReactNode
  onBack?: () => void
  onNext: () => void
  nextLabel?: string
  nextKeyHint?: string
  nextDisabled?: boolean
  onSkip?: () => void
  skipLabel?: string
}) {
  return (
    <div className="flex items-center justify-between px-6 md:px-8 py-4 border-t border-[var(--color-rule)]/15 bg-paper">
      <div className="flex items-center gap-3">
        {leftHint}
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-[11px] text-ink-2 hover:text-ink transition-colors"
          >
            ← Previous
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {onSkip && (
          <button type="button" onClick={onSkip} className="text-[11px] text-ink-2 hover:text-ink transition-colors">
            {skipLabel}
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="flex items-center gap-2 px-4 md:px-5 py-2.5 rounded-full text-[13px] font-medium text-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--color-mac)' }}
          onMouseEnter={(e) => !nextDisabled && (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
          onMouseLeave={(e) => !nextDisabled && (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
        >
          <span>{nextLabel}</span>
          <span className="text-[13px]">→</span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/15">{nextKeyHint}</span>
        </button>
      </div>
    </div>
  )
}

export function KeyHint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-[var(--color-rule)]/20 rounded-full">
      {keys.map((k, i) => (
        <span key={i} className="font-mono text-[10px] text-ink-2">
          {k}
        </span>
      ))}
      <span className="text-[11px] text-ink-2">{label}</span>
    </div>
  )
}

export function SectionEyebrow({ section, kindLabel }: { section: { num: number; title: string }; kindLabel: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--color-mac)' }}>
        Section {section.num}
      </span>
      <span className="block w-1 h-1 rounded-full bg-[var(--color-rule)]/30" />
      <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">{section.title}</span>
      <span className="block w-1 h-1 rounded-full bg-[var(--color-rule)]/30" />
      <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">{kindLabel}</span>
    </div>
  )
}
