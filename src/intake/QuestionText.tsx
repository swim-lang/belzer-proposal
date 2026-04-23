import type { TextQ } from './questions'
import type { TextAnswer } from './types'
import { SectionEyebrow } from './IntakeChrome'

export function QuestionText({
  q,
  answer,
  onAnswer,
}: {
  q: TextQ
  answer: TextAnswer
  onAnswer: (a: TextAnswer) => void
}) {
  const val = answer.value
  const max = q.maxLength ?? 2000
  return (
    <div className="flex-1 flex flex-col px-6 md:px-12 lg:px-[120px] pt-10 lg:pt-14 pb-10 gap-8 max-w-[960px] overflow-auto">
      <SectionEyebrow section={q.section} kindLabel={q.optional ? 'Optional' : 'Short answer'} />
      <div className="flex flex-col gap-5">
        <h1 className="serif text-[36px] leading-[42px] md:text-[48px] md:leading-[54px] lg:text-[56px] lg:leading-[60px] tracking-[-0.02em]">
          {q.title}
        </h1>
        {q.subtitle && <p className="text-[15px] leading-[23px] text-ink-2 max-w-[640px]">{q.subtitle}</p>}
      </div>
      <div
        className="flex flex-col gap-2.5 px-6 py-5 bg-white border rounded-[14px] min-h-[220px]"
        style={{ borderColor: 'rgba(31, 25, 18, 0.2)' }}
      >
        {q.multiline ? (
          <textarea
            value={val}
            onChange={(e) => onAnswer({ type: 'text', value: e.target.value.slice(0, max) })}
            placeholder={q.placeholder}
            rows={6}
            className="serif text-[18px] md:text-[22px] leading-[28px] md:leading-[32px] bg-transparent outline-none resize-none placeholder:italic placeholder:text-ink-2/45"
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={(e) => onAnswer({ type: 'text', value: e.target.value.slice(0, max) })}
            placeholder={q.placeholder}
            className="serif text-[20px] md:text-[24px] bg-transparent outline-none placeholder:italic placeholder:text-ink-2/45"
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {q.multiline && (
            <span className="px-2.5 py-1 bg-ink/[0.04] rounded-full text-[11px] text-ink-2">
              Shift + Enter for new line
            </span>
          )}
          <span className="text-[11px] text-ink-2">
            {val.length} / {max.toLocaleString()}
          </span>
        </div>
        <span className="text-[11px] text-ink-2">{q.optional ? 'Optional' : 'Required'}</span>
      </div>
    </div>
  )
}
