import { Reveal } from './Reveal'

export function Advantage() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-24 lg:py-[160px]">
      <Reveal className="flex items-start justify-between pb-8 border-b border-[var(--color-rule)] gap-6">
        <span className="eyebrow text-ink-2">§ 08 — Strategic advantage</span>
        <span className="eyebrow text-ink-2">Smaller · Sharper · More human</span>
      </Reveal>
      <Reveal>
        <h2 className="display text-ink text-[48px] leading-[48px] md:text-[72px] md:leading-[70px] lg:text-[96px] lg:leading-[92px] tracking-[-0.024em] max-w-[1200px] py-12 lg:py-20">
          AI can help a smaller firm feel even more capable.
        </h2>
      </Reveal>
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12 lg:pb-16">
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[520px]">
          <p className="text-[16px] leading-[26px] text-ink-2">
            A smaller firm can already offer something many larger firms struggle with: direct attention, lower overhead, clearer communication, and a more personal experience.
          </p>
          <p className="text-[16px] leading-[26px] text-ink-2">
            The right internal tools can strengthen that advantage.
          </p>
          <p className="text-[16px] leading-[26px] text-ink">
            AI should not replace the human value of the firm. It should remove more of the repetitive work so the team can spend more time on judgment, strategy, communication, and the parts of the work clients actually feel.
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-8 flex-1 max-w-[560px] lg:pl-12 lg:border-l border-[var(--color-rule)]">
          <span className="eyebrow text-ink-2">Pull quote</span>
          <p className="serif italic text-[30px] leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[44px] lg:leading-[52px] tracking-[-0.012em] text-ink">
            “Use AI to remove the friction, not the humanity.”
          </p>
        </Reveal>
      </div>
      <Reveal className="pt-12 border-t border-[var(--color-rule)] flex flex-wrap items-center justify-center gap-4 md:gap-7">
        <span className="serif text-[26px] md:text-[36px] lg:text-[44px] tracking-[-0.015em]">Less friction</span>
        <span className="serif text-[26px] md:text-[36px] lg:text-[44px] text-ink-2">+</span>
        <span className="serif text-[26px] md:text-[36px] lg:text-[44px] tracking-[-0.015em]">more judgment</span>
        <span className="serif text-[26px] md:text-[36px] lg:text-[44px] text-ink-2">=</span>
        <span className="serif italic text-[26px] md:text-[36px] lg:text-[44px] tracking-[-0.015em]">better client experience</span>
      </Reveal>
    </section>
  )
}
