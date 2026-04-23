import { buildPaths } from '../content'
import { Reveal } from './Reveal'

export function PhaseTwo() {
  return (
    <section className="bg-ink text-paper border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-24 lg:py-[160px]">
      <Reveal className="flex items-start justify-between pb-8 border-b border-white/20 gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow text-paper/66">§ 10 — Phase 2</span>
          <span className="eyebrow text-paper">Build sprint</span>
        </div>
        <span className="eyebrow text-paper/66 text-right">Quoted after design sprint</span>
      </Reveal>
      <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 py-12 lg:py-20">
        <Reveal className="flex-[1.2]">
          <h2 className="display text-paper text-[64px] leading-[64px] md:text-[88px] md:leading-[84px] lg:text-[112px] lg:leading-[104px] tracking-[-0.026em]">
            Build Sprint.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[480px] pb-6">
          <p className="text-[16px] leading-[26px] text-paper/78">
            Once the design sprint is complete, we will quote the first build phase based on the chosen feature set.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] border-t border-b border-white/20">
        <Reveal className="flex flex-col gap-6 py-10 lg:pr-12 lg:border-r border-white/20">
          <span className="eyebrow text-paper/66">Possible first build directions</span>
          <div>
            {buildPaths.map((b, i) => (
              <div
                key={i}
                className={`py-4 border-t border-white/24 serif text-[20px] md:text-[22px] ${
                  i === buildPaths.length - 1 ? 'italic text-paper/66 border-b' : 'text-paper'
                }`}
              >
                {b}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="flex flex-col gap-8 py-10 lg:pl-12">
          <div className="flex flex-col gap-3">
            <span className="eyebrow text-paper/66">Estimated build range</span>
            <span className="display text-paper text-[48px] leading-[48px] md:text-[64px] md:leading-[64px] lg:text-[72px] lg:leading-[72px] tracking-[-0.02em]">
              $10K–$15K
            </span>
          </div>
          <p className="text-[14px] leading-[22px] text-paper/66">
            The range depends on final scope, integrations, model usage, security requirements, file sources, user permissions, and whether the tool is web-only or includes mobile access through TestFlight.
          </p>
          <p className="text-[12px] leading-[20px] text-paper/48 tracking-[0.02em]">
            Note — this is an estimate, not a final quote.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
