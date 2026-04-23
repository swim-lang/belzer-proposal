import { useEffect } from 'react'
import type { SingleQ } from './questions'
import type { SingleAnswer } from './types'
import { SectionEyebrow } from './IntakeChrome'
import { OtherInput } from './QuestionMulti'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function QuestionSingle({
  q,
  answer,
  onAnswer,
  pipedOptions,
}: {
  q: SingleQ
  answer: SingleAnswer
  onAnswer: (a: SingleAnswer) => void
  pipedOptions?: string[]
}) {
  const options = pipedOptions ?? q.options

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      const k = e.key.toUpperCase()
      const idx = LETTERS.indexOf(k)
      if (idx < 0 || idx >= options.length) return
      e.preventDefault()
      onAnswer({ ...answer, selected: options[idx] })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [answer, options, onAnswer])

  const showFollowUp = q.followUp && answer.selected === q.followUp.triggerValue

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-10 lg:gap-16 px-6 md:px-12 lg:px-[120px] pt-12 lg:pt-16 pb-10 overflow-auto">
      <div className="lg:w-[420px] shrink-0 flex flex-col gap-5">
        <SectionEyebrow section={q.section} kindLabel="Pick one" />
        <h1 className="serif text-[32px] leading-[38px] md:text-[40px] md:leading-[46px] lg:text-[44px] lg:leading-[50px] tracking-[-0.016em]">
          {q.title}
        </h1>
        {q.subtitle && <p className="text-[14px] leading-[22px] text-ink-2">{q.subtitle}</p>}
        <div className="flex items-center gap-3 pt-1">
          <span className="px-2.5 py-1 rounded-full text-[11px] bg-ink/[0.06] text-ink">Pick one</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2.5 max-w-[640px]">
        {options.length === 0 && (
          <div
            className="px-5 py-5 rounded-[10px] border border-dashed text-ink-2 text-[14px] leading-[22px]"
            style={{ borderColor: 'rgba(31, 25, 18, 0.25)' }}
          >
            Nothing to pick yet — {q.pipeFrom ? 'select answers above first.' : 'please go back.'}
          </div>
        )}
        {options.map((opt, i) => {
          const selected = answer.selected === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onAnswer({ ...answer, selected: opt, followUp: showFollowUp ? answer.followUp : undefined })}
              className="text-left flex items-center gap-3.5 px-5 py-4 rounded-[10px] transition-all"
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
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0"
                style={{
                  border: selected ? '1.5px solid var(--color-mac)' : '1.5px solid rgba(31, 25, 18, 0.3)',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {selected && <span className="block w-[10px] h-[10px] rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />}
              </span>
            </button>
          )
        })}
        {q.includeOther && options.length > 0 && (
          <OtherInput
            letter={LETTERS[options.length]}
            value={answer.other ?? ''}
            onChange={(v) => onAnswer({ ...answer, other: v || undefined, selected: v ? '__other__' : answer.selected })}
          />
        )}
        {showFollowUp && q.followUp && (
          <div
            className="mt-4 flex flex-col gap-2 px-5 py-4 rounded-[10px]"
            style={{ border: '1px solid rgba(30, 63, 229, 0.3)', backgroundColor: 'rgba(30, 63, 229, 0.04)' }}
          >
            <label className="text-[11px] tracking-[0.12em] uppercase text-ink-2">{q.followUp.label}</label>
            <textarea
              value={answer.followUp ?? ''}
              onChange={(e) => onAnswer({ ...answer, followUp: e.target.value })}
              placeholder={q.followUp.placeholder}
              rows={2}
              className="serif text-[16px] md:text-[18px] leading-[24px] bg-transparent outline-none resize-none placeholder:italic placeholder:text-ink-2/60"
            />
          </div>
        )}
      </div>
    </div>
  )
}
