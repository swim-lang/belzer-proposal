import { nextSteps, nextStepSection } from '../content'
import { Reveal } from './Reveal'

export function NextStep() {
  return (
    <section id="next" className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <Reveal className="flex items-start justify-between pb-8 border-b border-[var(--color-rule)] gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow text-ink-2">{nextStepSection.eyebrowSection}</span>
          <span className="eyebrow">{nextStepSection.eyebrowEmphasis}</span>
        </div>
        <span className="eyebrow text-ink-2">{nextStepSection.metaRight}</span>
      </Reveal>

      <Reveal className="mt-12 border border-[var(--color-rule)] rounded-2xl overflow-hidden bg-paper">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 p-8 md:p-12 lg:p-16 lg:items-end border-b border-[var(--color-rule)]">
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[64px] md:leading-[60px] lg:text-[96px] lg:leading-[92px] tracking-[-0.024em] flex-[1.5]">
            {nextStepSection.headline}
          </h2>
          <div className="flex flex-col gap-5 flex-1 max-w-[420px] pb-3">
            {nextStepSection.bodyParagraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-[26px] text-ink-2">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div className="p-8 md:p-12 lg:px-16 lg:py-12 border-b border-[var(--color-rule)]">
          <div className="pb-6">
            <span className="eyebrow text-ink-2">{nextStepSection.stepsLabel}</span>
          </div>
          {nextSteps.map((s, i) => (
            <div
              key={i}
              className={`flex items-baseline gap-8 py-5 border-t border-[var(--color-rule)] ${
                i === nextSteps.length - 1 ? 'border-b' : ''
              }`}
            >
              <span className="eyebrow text-ink-2 w-8 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="serif text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] text-ink">{s}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 p-8 md:p-12 lg:px-16 lg:py-10">
          <div className="flex gap-10 md:gap-20">
            <div className="flex flex-col gap-1.5">
              <span className="eyebrow text-ink-2">{nextStepSection.investmentLabel}</span>
              <span className="serif text-[28px] md:text-[36px] leading-[32px] md:leading-[38px] tracking-[-0.018em]">
                {nextStepSection.investmentValue}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="eyebrow text-ink-2">{nextStepSection.timelineLabel}</span>
              <span className="serif text-[28px] md:text-[36px] leading-[32px] md:leading-[38px] tracking-[-0.018em]">
                {nextStepSection.timelineValue}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('anchovies:approve'))}
              className="px-6 py-4 rounded-full text-[14px] font-medium text-paper transition-colors"
              style={{ backgroundColor: 'var(--color-mac)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
            >
              {nextStepSection.ctaPrimary}
            </button>
            <a
              href="#"
              className="px-6 py-4 border border-[var(--color-rule)] rounded-full text-[14px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {nextStepSection.ctaSecondary}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
