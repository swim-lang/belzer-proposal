import { Reveal } from './Reveal'

export function PointOfView() {
  return (
    <section className="bg-ink text-paper border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-24 lg:py-[160px]">
      <Reveal className="flex items-start justify-between pb-8 border-b border-white/20">
        <span className="eyebrow text-paper">§ 03 — Our point of view</span>
        <span className="eyebrow text-paper">Anchovies · Philosophy</span>
      </Reveal>

      <Reveal>
        <h2 className="display text-paper text-[48px] leading-[48px] sm:text-[64px] sm:leading-[60px] md:text-[80px] md:leading-[76px] lg:text-[96px] lg:leading-[92px] tracking-[-0.024em] max-w-[1100px] py-16 lg:py-24">
          The value is that it is thoughtfully yours.
        </h2>
      </Reveal>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <Reveal className="flex flex-col gap-6 flex-1 max-w-[520px]">
          <p className="text-[16px] leading-[26px] text-paper">
            The best version of this is not a product with a thousand features. It is a focused system built around your documents, your process, your judgment, your preferences, and your way of practicing.
          </p>
          <p className="text-[16px] leading-[26px] text-paper/66">
            Off-the-shelf software has value. It can be tested, documented, and supported at scale. But it also comes with tradeoffs: features you do not need, workflows you may not want, and a roadmap you do not control.
          </p>
          <p className="text-[16px] leading-[26px] text-paper/66">
            This approach starts in a different place: what does Belzer Law actually need to do better, faster, clearer, or with less friction?
          </p>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[640px] lg:border-l border-white/20 lg:pl-12">
          <span className="eyebrow text-paper/66">Pull quote</span>
          <p className="serif italic text-[30px] leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[44px] lg:leading-[52px] tracking-[-0.012em] text-paper">
            “The tool should adapt to the firm, not the other way around.”
          </p>
        </Reveal>
      </div>
    </section>
  )
}
