import { preMeetingComparison } from '../preMeetingContent'
import { Reveal } from './Reveal'

export function PreMeetingComparison() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 pb-12 border-b border-[var(--color-rule)]">
        <Reveal className="flex flex-col gap-8 flex-[1.2]">
          <span className="eyebrow text-ink-2">{preMeetingComparison.eyebrow}</span>
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[60px] md:leading-[60px] lg:text-[80px] lg:leading-[76px] tracking-[-0.022em] max-w-[820px]">
            {preMeetingComparison.headline}
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[480px]">
          {preMeetingComparison.bodyParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-[16px] leading-[26px] text-ink-2">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 lg:pt-16">
        <Reveal className="flex flex-col gap-7 lg:pr-12 lg:border-r border-[var(--color-rule)] pb-10 lg:pb-0">
          <span className="eyebrow text-ink-2">{preMeetingComparison.leftTitle}</span>
          <div>
            {preMeetingComparison.leftItems.map((item, index) => (
              <div
                key={item}
                className={`py-4 border-t border-[var(--color-rule)] serif text-[20px] leading-[28px] ${
                  index === preMeetingComparison.leftItems.length - 1 ? 'border-b' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-7 lg:pl-12 pt-10 lg:pt-0">
          <span className="eyebrow">{preMeetingComparison.rightTitle}</span>
          <div>
            {preMeetingComparison.rightItems.map((item, index) => (
              <div
                key={item}
                className={`py-4 border-t border-[var(--color-rule)] serif text-[20px] leading-[28px] ${
                  index === preMeetingComparison.rightItems.length - 1 ? 'border-b' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className="pt-12 lg:pt-16 mt-12 lg:mt-16 border-t border-[var(--color-rule)]">
        <p className="serif italic text-[32px] leading-[38px] md:text-[44px] md:leading-[50px] lg:text-[56px] lg:leading-[62px] tracking-[-0.018em] max-w-[1000px]">
          {preMeetingComparison.pullQuote}
        </p>
      </Reveal>
    </section>
  )
}
