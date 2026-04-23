import { useEffect } from 'react'
import type { RatingQ } from './questions'
import type { RatingAnswer } from './types'
import { SectionEyebrow } from './IntakeChrome'

export function QuestionRating({
  q,
  answer,
  onAnswer,
}: {
  q: RatingQ
  answer: RatingAnswer
  onAnswer: (a: RatingAnswer) => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const n = parseInt(e.key, 10)
      if (!Number.isFinite(n) || n < 1 || n > q.scale) return
      e.preventDefault()
      onAnswer({ type: 'rating', value: n })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, q.scale, onAnswer])

  const tiles = Array.from({ length: q.scale }, (_, i) => i + 1)

  return (
    <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-[120px] pt-10 lg:pt-14 pb-10 gap-10 lg:gap-14">
      <SectionEyebrow section={q.section} kindLabel={`1 – ${q.scale}`} />
      <div className="flex-1 flex flex-col items-center justify-center gap-14 text-center">
      <div className="flex flex-col items-center gap-5 max-w-[820px]">
        <h1 className="serif text-[36px] leading-[42px] md:text-[48px] md:leading-[54px] lg:text-[56px] lg:leading-[60px] tracking-[-0.02em]">
          {q.title}
        </h1>
        {q.subtitle && <p className="text-[15px] leading-[23px] text-ink-2 max-w-[560px]">{q.subtitle}</p>}
      </div>

      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 w-full max-w-[520px] justify-center">
          {tiles.map((n) => {
            const selected = answer.value === n
            return (
              <button
                key={n}
                type="button"
                onClick={() => onAnswer({ type: 'rating', value: n })}
                className="flex flex-col items-center gap-2 sm:gap-2.5 transition-transform hover:-translate-y-0.5 flex-1 max-w-[88px]"
              >
                <span
                  className="flex items-center justify-center transition-all w-full aspect-square rating-tile"
                  style={{
                    borderRadius: 14,
                    backgroundColor: selected ? 'var(--color-mac)' : '#FFFFFF',
                    border: selected ? '1.5px solid var(--color-mac)' : '1px solid rgba(31, 25, 18, 0.2)',
                    color: selected ? 'var(--color-paper)' : 'var(--color-ink)',
                    fontFamily: 'var(--font-serif)',
                    boxShadow: selected ? '0 10px 30px -15px rgba(30, 63, 229, 0.5)' : 'none',
                  }}
                >
                  {n}
                </span>
                <span
                  className="text-[10px] sm:text-[11px] min-h-[16px] text-center leading-tight"
                  style={{
                    color: selected ? 'var(--color-mac)' : 'var(--color-ink-2)',
                    fontWeight: selected ? 500 : 400,
                  }}
                >
                  {q.tickLabels?.[n - 1] ?? (selected ? 'Pick' : '')}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex items-center justify-between w-full max-w-[420px] gap-3 pt-2 px-2">
          <span className="text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-ink-2">{q.minLabel}</span>
          <span className="flex-1 h-px bg-[var(--color-rule)]/20" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-ink-2">{q.maxLabel}</span>
        </div>
      </div>
      </div>
    </div>
  )
}
