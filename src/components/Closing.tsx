import { Reveal } from './Reveal'

export function Closing() {
  return (
    <section className="bg-ink text-paper px-6 md:px-16 lg:px-[120px] py-24 lg:py-[160px]">
      <Reveal className="flex items-center justify-between pb-8 border-b border-white/20 gap-6">
        <span className="eyebrow text-paper/66">§ 14 — Closing</span>
        <span className="eyebrow text-paper/66 text-right">A smarter tool for a sharper firm</span>
      </Reveal>

      <Reveal>
        <h2 className="display text-paper text-[56px] leading-[56px] md:text-[80px] md:leading-[78px] lg:text-[104px] lg:leading-[100px] tracking-[-0.026em] max-w-[1200px] py-12 lg:py-20">
          Everything is possible. The work is deciding what is worth building first.
        </h2>
      </Reveal>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <Reveal className="flex-1 max-w-[560px] flex flex-col gap-5">
          <p className="text-[16px] leading-[26px] text-paper/78">
            The constraints have changed. Things that used to require major software budgets, long timelines, or highly specialized teams are now much more reachable.
          </p>
          <p className="text-[16px] leading-[26px] text-paper/78">
            That does not mean everything should be built at once.
          </p>
        </Reveal>
        <Reveal className="flex-1 max-w-[560px] flex flex-col gap-4">
          <span className="eyebrow text-paper/66">The best path</span>
          <div>
            <div className="py-4 border-t border-white/24 serif italic text-[22px] leading-[30px] md:text-[28px] md:leading-[36px] text-paper">
              Solve one meaningful problem,
            </div>
            <div className="py-4 border-t border-white/24 serif italic text-[22px] leading-[30px] md:text-[28px] md:leading-[36px] text-paper">
              learn from real use,
            </div>
            <div className="py-4 border-t border-b border-white/24 serif italic text-[22px] leading-[30px] md:text-[28px] md:leading-[36px] text-paper">
              then build from there.
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="pt-12 lg:pt-16 mt-12 lg:mt-16 border-t border-white/20">
        <p className="serif text-[40px] leading-[44px] md:text-[52px] md:leading-[56px] lg:text-[64px] lg:leading-[68px] tracking-[-0.018em] text-paper">
          A smarter tool for a sharper firm.
        </p>
      </Reveal>
    </section>
  )
}
