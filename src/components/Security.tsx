import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'

export function Security() {
  const { securityConsiderations, security } = useContent()
  return (
    <section id="security" className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 pb-12 border-b border-[var(--color-rule)]">
        <Reveal className="flex flex-col gap-8 flex-[1.4]">
          <span className="eyebrow text-ink-2">{security.eyebrow}</span>
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[60px] md:leading-[60px] lg:text-[80px] lg:leading-[76px] tracking-[-0.022em]">
            {security.headline}
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[460px]">
          <p className="text-[16px] leading-[26px] text-ink-2">{security.intro}</p>
        </Reveal>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pt-12 lg:pt-16">
        <Reveal className="flex-1 max-w-[280px]">
          <span className="eyebrow text-ink-2">{security.considerationsLabel}</span>
        </Reveal>
        <Reveal className="flex-[2.4] flex flex-col">
          {securityConsiderations.map((s, i) => (
            <div
              key={i}
              className={`flex items-baseline gap-7 py-5 border-t border-[var(--color-rule)] ${
                i === securityConsiderations.length - 1 ? 'border-b' : ''
              }`}
            >
              <span className="eyebrow text-ink-2 w-10 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <span className="serif text-[20px] leading-[28px] md:text-[22px] md:leading-[30px] text-ink">
                {s}
              </span>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal className="pt-16 lg:pt-20 flex justify-center">
        <p className="serif italic text-[24px] leading-[32px] md:text-[28px] md:leading-[36px] lg:text-[32px] lg:leading-[40px] tracking-[-0.012em] text-ink text-center max-w-[760px]">
          {security.closingQuote}
        </p>
      </Reveal>
    </section>
  )
}
