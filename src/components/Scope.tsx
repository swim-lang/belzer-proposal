import { notFirst, betterFirst, scope } from '../content'
import { Reveal } from './Reveal'

export function Scope() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20 pb-16 lg:pb-20 border-b border-[var(--color-rule)]">
        <Reveal className="flex flex-col gap-8 flex-[1.4]">
          <span className="eyebrow text-ink-2">{scope.eyebrow}</span>
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[60px] md:leading-[60px] lg:text-[80px] lg:leading-[76px] tracking-[-0.022em] max-w-[860px]">
            {scope.headline}
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[480px] pt-2">
          {scope.paragraphs.map((p, i) => (
            <p key={i} className="text-[16px] leading-[26px] text-ink-2">
              {p}
            </p>
          ))}
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 pt-16 lg:pt-20">
        <Reveal className="flex flex-col gap-7 lg:pr-12 lg:border-r border-[var(--color-rule)] pb-10 lg:pb-0">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-ink-2">{scope.notFirst.label}</span>
            <span className="flex-1 h-px bg-[var(--color-rule)]" />
            <span className="serif text-ink-2 text-[14px]">×</span>
          </div>
          <h3 className="serif text-[32px] leading-[36px] md:text-[40px] md:leading-[44px] lg:text-[44px] lg:leading-[48px] tracking-[-0.018em]">
            {scope.notFirst.headline}
          </h3>
          <div>
            {notFirst.map((x, i) => (
              <div
                key={i}
                className={`py-4 border-t border-[var(--color-rule)] serif text-[18px] leading-[26px] md:text-[20px] md:leading-[28px] ${
                  i === notFirst.length - 1 ? 'border-b' : ''
                }`}
              >
                {x}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="flex flex-col gap-7 lg:pl-12 pt-10 lg:pt-0">
          <div className="flex items-center gap-3">
            <span className="eyebrow">{scope.betterFirst.label}</span>
            <span className="flex-1 h-px bg-[var(--color-rule)]" />
            <span className="serif text-[14px]">◆</span>
          </div>
          <h3 className="serif text-[32px] leading-[36px] md:text-[40px] md:leading-[44px] lg:text-[44px] lg:leading-[48px] tracking-[-0.018em]">
            {scope.betterFirst.headline}
          </h3>
          <div>
            {betterFirst.map((x, i) => (
              <div
                key={i}
                className={`py-4 border-t border-[var(--color-rule)] serif text-[18px] leading-[26px] md:text-[20px] md:leading-[28px] ${
                  i === betterFirst.length - 1 ? 'border-b' : ''
                }`}
              >
                {x}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
