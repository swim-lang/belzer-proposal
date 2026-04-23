import { sprintSteps, deliverables } from '../content'
import { Reveal } from './Reveal'
import { UnfoldGrid } from './UnfoldGrid'

export function PhaseOne() {
  return (
    <section id="sprint" className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex items-start justify-between pb-12 border-b border-[var(--color-rule)] gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow text-ink-2">§ 04 — Phase 1</span>
          <span className="eyebrow">Product strategy + interface design</span>
        </div>
        <div className="flex flex-col gap-1.5 items-end text-right">
          <span className="eyebrow text-ink-2">Est. 2 weeks</span>
          <span className="eyebrow text-ink-2">$6,500</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pt-12 lg:pt-16 pb-16 lg:pb-20">
        <Reveal className="flex-1">
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[60px] md:leading-[60px] lg:text-[80px] lg:leading-[80px] tracking-[-0.022em] max-w-[760px]">
            Product Strategy + Interface Design Sprint.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[480px] pt-2">
          <p className="text-[16px] leading-[26px] text-ink-2">
            Two focused weeks to turn the idea into a real product — designed, prototyped, and ready to build.
          </p>
          <p className="text-[16px] leading-[26px] text-ink-2">
            You leave the sprint with high-fidelity interface designs, a clickable prototype you can test with the team, and a development-ready handoff the first engineer can start building from on day one. Not a thought exercise — a product in motion.
          </p>
        </Reveal>
      </div>

      <Reveal>
        <UnfoldGrid className="flex flex-col gap-6 pb-16 lg:pb-20">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ink-2">Fig. 02 — Sprint process</span>
            <span className="eyebrow text-ink-2">Five steps</span>
          </div>
          <div className="relative">
            <div className="unfold-rule absolute top-0 left-0 right-0 h-px bg-[var(--color-rule)]" />
            <div className="unfold-rule unfold-rule-b absolute bottom-0 left-0 right-0 h-px bg-[var(--color-rule)]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5">
              {sprintSteps.map((s, i) => (
                <div
                  key={s.num}
                  className={`unfold-col flex flex-col gap-4 p-7 md:min-h-[200px] border-[var(--color-rule)] ${
                    i < sprintSteps.length - 1 ? 'border-b sm:border-b-0' : ''
                  } ${
                    i < sprintSteps.length - 1 ? 'xl:border-r' : ''
                  } ${i % 2 === 0 ? 'sm:border-r xl:border-r' : ''} ${
                    i < sprintSteps.length - 2 ? 'sm:border-b xl:border-b-0' : ''
                  }`}
                  style={{ ['--col-index' as string]: i }}
                >
                  <div className="unfold-item flex items-center justify-between" style={{ ['--item-index' as string]: 0 }}>
                    <span className="eyebrow text-ink-2">{s.num}</span>
                    <span className="serif text-ink-2 text-[14px]">{i === sprintSteps.length - 1 ? '◆' : '→'}</span>
                  </div>
                  <span
                    className="unfold-item serif text-[28px] leading-[32px] md:text-[30px] md:leading-[34px] xl:text-[34px] xl:leading-[36px] tracking-[-0.015em] text-ink"
                    style={{ ['--item-index' as string]: 1 }}
                  >
                    {s.name}
                  </span>
                  <span className="unfold-item text-[13px] leading-[20px] text-ink-2" style={{ ['--item-index' as string]: 2 }}>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </UnfoldGrid>
      </Reveal>

      <div id="investment" className="grid grid-cols-1 lg:grid-cols-3 border-t border-b border-[var(--color-rule)]">
        <Reveal className="lg:col-span-2 flex flex-col gap-6 py-12 lg:pr-12 lg:border-r border-[var(--color-rule)]">
          <span className="eyebrow text-ink-2">Deliverables</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {deliverables.map((d, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-3.5 py-3.5 ${i < deliverables.length - (deliverables.length % 2 === 0 ? 2 : 1) ? 'border-b border-[var(--color-rule)]' : ''}`}
              >
                <span className="eyebrow text-ink-2 w-6 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="serif text-[20px] text-ink">{d}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-8 py-12 lg:pl-12">
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-ink-2">Estimated investment</span>
            <span className="display text-ink text-[44px] leading-[44px] md:text-[56px] md:leading-[56px] tracking-[-0.018em]">
              $6.5K
            </span>
          </div>
          <div className="w-full h-px bg-[var(--color-rule)]" />
          <div className="flex flex-col gap-2.5">
            <span className="eyebrow text-ink-2">Timeline</span>
            <span className="serif text-[26px] leading-[30px] md:text-[32px] md:leading-[36px] tracking-[-0.015em] text-ink">
              ~2 weeks from kickoff.
            </span>
            <span className="text-[13px] leading-[20px] text-ink-2">
              Depending on feedback and meeting availability.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
