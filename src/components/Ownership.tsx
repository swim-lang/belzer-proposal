import { ownershipShape } from '../content'
import { Reveal } from './Reveal'

export function Ownership() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-24 lg:py-[160px]">
      <Reveal className="flex items-start justify-between pb-8 border-b border-[var(--color-rule)] gap-6">
        <span className="eyebrow text-ink-2">§ 12 — Why custom matters</span>
        <span className="eyebrow text-ink-2">Ownership · Flexibility</span>
      </Reveal>
      <Reveal>
        <h2 className="display text-ink text-[48px] leading-[48px] md:text-[72px] md:leading-[70px] lg:text-[96px] lg:leading-[92px] tracking-[-0.024em] max-w-[1200px] py-12 lg:py-16">
          This can become proprietary to the way Belzer Law works.
        </h2>
      </Reveal>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pt-8">
        <Reveal className="flex-1 max-w-[520px] flex flex-col gap-5">
          <p className="text-[16px] leading-[26px] text-ink-2">
            One of the most interesting parts of this approach is that the system can reflect the firm’s actual thinking.
          </p>
          <div className="flex flex-col gap-1.5 py-4 border-t border-b border-[var(--color-rule)]">
            <span className="serif italic text-[18px] leading-[26px] md:text-[20px] md:leading-[28px]">Not just generic legal AI.</span>
            <span className="serif italic text-[18px] leading-[26px] md:text-[20px] md:leading-[28px]">Not just a chatbot.</span>
            <span className="serif italic text-[18px] leading-[26px] md:text-[20px] md:leading-[28px]">Not just another subscription.</span>
          </div>
          <p className="text-[16px] leading-[26px] text-ink">
            Over time, that becomes more valuable because it is not just software. It is the firm’s process made visible.
          </p>
        </Reveal>
        <Reveal className="flex-1 max-w-[640px] flex flex-col gap-4">
          <span className="eyebrow text-ink-2">A tool shaped around —</span>
          <div>
            {ownershipShape.map((x, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-6 py-4 border-t border-[var(--color-rule)] ${
                  i === ownershipShape.length - 1 ? 'border-b' : ''
                }`}
              >
                <span className="eyebrow text-ink-2 w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="serif text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] text-ink">
                  {x}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <Reveal className="pt-12 lg:pt-16 mt-12 lg:mt-16 border-t border-[var(--color-rule)]">
        <p className="serif italic text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] lg:text-[72px] lg:leading-[76px] tracking-[-0.02em] max-w-[1100px]">
          “Your process is the product.”
        </p>
      </Reveal>
    </section>
  )
}
