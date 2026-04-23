import { useEffect } from 'react'
import type { MultiQ } from './questions'
import type { MultiAnswer } from './types'
import { SectionEyebrow } from './IntakeChrome'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function QuestionMulti({
  q,
  answer,
  onAnswer,
  pipedOptions,
}: {
  q: MultiQ
  answer: MultiAnswer
  onAnswer: (a: MultiAnswer) => void
  pipedOptions?: string[]
}) {
  const options = pipedOptions ?? q.options
  const allOptions = [...options, ...(q.includeOther ? ['__other__'] : [])]

  const toggle = (opt: string) => {
    const already = answer.selected.includes(opt)
    if (already) {
      onAnswer({ ...answer, selected: answer.selected.filter((x) => x !== opt) })
      return
    }
    if (q.maxSelect && answer.selected.length >= q.maxSelect) return
    onAnswer({ ...answer, selected: [...answer.selected, opt] })
  }

  // Keyboard: letter keys toggle options
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const k = e.key.toUpperCase()
      const idx = LETTERS.indexOf(k)
      if (idx < 0 || idx >= allOptions.length) return
      e.preventDefault()
      const opt = allOptions[idx]
      if (opt === '__other__') return // let user focus the field manually
      toggle(opt)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer, allOptions])

  const selectedCount = answer.selected.length + (answer.other ? 1 : 0)

  return (
    <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-[120px] pt-10 lg:pt-14 pb-10 gap-8 lg:gap-10 overflow-auto">
      <SectionEyebrow
        section={q.section}
        kindLabel={q.maxSelect ? `Pick up to ${q.maxSelect}` : 'Multi-select'}
      />
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
      <div className="lg:w-[420px] shrink-0 flex flex-col gap-5">
        <h1 className="serif text-[32px] leading-[38px] md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px] tracking-[-0.016em]">
          {q.title}
        </h1>
        {q.subtitle && <p className="text-[14px] leading-[22px] text-ink-2">{q.subtitle}</p>}
        <div className="flex items-center gap-3 pt-1">
          <span
            className="px-2.5 py-1 rounded-full text-[11px]"
            style={{ backgroundColor: 'rgba(30, 63, 229, 0.08)', color: 'var(--color-mac)' }}
          >
            {q.maxSelect ? `Up to ${q.maxSelect}` : 'Multi-select'}
          </span>
          <span className="text-[11px] text-ink-2">
            {selectedCount} selected{q.maxSelect ? ` / ${q.maxSelect}` : ''}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2.5 max-w-[640px]">
        {options.map((opt, i) => {
          const selected = answer.selected.includes(opt)
          const atMax = q.maxSelect != null && !selected && answer.selected.length >= q.maxSelect
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              disabled={atMax}
              className="text-left flex items-center gap-3.5 px-5 py-3.5 rounded-[10px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                backgroundColor: selected ? 'rgba(30, 63, 229, 0.06)' : '#FFFFFF',
                border: selected ? '1.5px solid var(--color-mac)' : '1px solid rgba(31, 25, 18, 0.2)',
              }}
            >
              <span
                className="flex items-center justify-center w-[22px] h-[22px] rounded text-[11px] font-medium shrink-0"
                style={{
                  backgroundColor: selected ? '#FFFFFF' : 'var(--color-paper)',
                  border: selected ? '1px solid var(--color-mac)' : '1px solid rgba(31, 25, 18, 0.2)',
                  color: selected ? 'var(--color-mac)' : 'var(--color-ink-2)',
                }}
              >
                {LETTERS[i]}
              </span>
              <span className="serif text-[18px] md:text-[20px] flex-1">{opt}</span>
              <span
                className="w-[18px] h-[18px] rounded flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: selected ? 'var(--color-mac)' : 'transparent',
                  border: selected ? '1.5px solid var(--color-mac)' : '1.5px solid rgba(31, 25, 18, 0.3)',
                }}
              >
                {selected && (
                  <svg width={10} height={10} viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 10L8 14L16 6"
                      stroke="#F6F5F1"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          )
        })}
        {q.includeOther && (
          <OtherInput
            letter={LETTERS[options.length]}
            value={answer.other ?? ''}
            onChange={(v) => onAnswer({ ...answer, other: v || undefined })}
          />
        )}
      </div>
      </div>
    </div>
  )
}

export function OtherInput({
  letter,
  value,
  onChange,
}: {
  letter: string
  value: string
  onChange: (v: string) => void
}) {
  const active = value.trim().length > 0
  return (
    <div
      className="flex items-center gap-3.5 px-5 py-3 rounded-[10px] transition-all"
      style={{
        backgroundColor: active ? 'rgba(30, 63, 229, 0.06)' : '#FFFFFF',
        border: active ? '1.5px solid var(--color-mac)' : '1px solid rgba(31, 25, 18, 0.2)',
      }}
    >
      <span
        className="flex items-center justify-center w-[22px] h-[22px] rounded text-[11px] font-medium shrink-0"
        style={{
          backgroundColor: active ? '#FFFFFF' : 'var(--color-paper)',
          border: active ? '1px solid var(--color-mac)' : '1px solid rgba(31, 25, 18, 0.2)',
          color: active ? 'var(--color-mac)' : 'var(--color-ink-2)',
        }}
      >
        {letter}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Other — type a response"
        className="serif text-[18px] md:text-[20px] flex-1 bg-transparent outline-none placeholder:italic placeholder:text-ink-2/60"
      />
    </div>
  )
}
