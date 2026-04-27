import { preMeetingFitPrompt } from '../preMeetingContent'
import { Reveal } from './Reveal'

export function PreMeetingFitPrompt() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
        <Reveal className="flex flex-col gap-8 lg:w-[560px] shrink-0">
          <span className="eyebrow text-ink-2">{preMeetingFitPrompt.eyebrow}</span>
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[60px] md:leading-[60px] lg:text-[80px] lg:leading-[76px] tracking-[-0.022em]">
            {preMeetingFitPrompt.headline}
          </h2>
          <p className="text-[16px] leading-[26px] text-ink-2 max-w-[520px]">{preMeetingFitPrompt.body}</p>
        </Reveal>

        <Reveal className="flex-1 border-t border-[var(--color-rule)]">
          {preMeetingFitPrompt.questions.map((question, index) => (
            <div
              key={question}
              className={`flex items-start gap-6 py-5 ${
                index < preMeetingFitPrompt.questions.length - 1 ? 'border-b border-[var(--color-rule)]' : ''
              }`}
            >
              <span className="eyebrow text-ink-2 w-10 shrink-0 pt-0.5">
                Q–{String(index + 1).padStart(2, '0')}
              </span>
              <span className="serif text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] text-ink flex-1">
                {question}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
