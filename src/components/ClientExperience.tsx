import { internalWorkflow, clientFacing } from '../content'
import { Reveal } from './Reveal'

export function ClientExperience() {
  return (
    <section className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 pb-12 border-b border-[var(--color-rule)]">
        <Reveal className="flex flex-col gap-8 flex-[1.4]">
          <span className="eyebrow text-ink-2">§ 09 — Beyond internal efficiency</span>
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[56px] md:leading-[56px] lg:text-[72px] lg:leading-[70px] tracking-[-0.022em] max-w-[900px]">
            Clients may never see the system. They will feel the difference.
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[460px]">
          <p className="text-[16px] leading-[26px] text-ink-2">
            Some of the value may show up behind the scenes. Faster review. Cleaner organization. Better internal visibility. Fewer dropped balls.
          </p>
          <p className="text-[16px] leading-[26px] text-ink-2">
            But some of it can directly improve the client experience.
          </p>
        </Reveal>
      </div>

      <Reveal className="flex flex-col gap-6 pt-12 lg:pt-16">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-ink-2">Fig. 03 — From internal to felt</span>
          <span className="eyebrow text-ink-2">Two columns, one outcome</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_120px_1.3fr] border-t border-b border-[var(--color-rule)]">
          <div className="flex flex-col gap-5 py-10 lg:pr-12 lg:border-r border-[var(--color-rule)]">
            <span className="eyebrow text-ink-2">Internal workflow</span>
            <h3 className="serif text-[32px] leading-[36px] md:text-[40px] md:leading-[44px] tracking-[-0.018em]">
              Behind the scenes.
            </h3>
            {internalWorkflow.map((x, i) => (
              <div key={i} className="py-3.5 border-t border-[var(--color-rule)] serif text-[18px] text-ink">
                {x}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center justify-center lg:border-r border-[var(--color-rule)] py-10">
            <span className="serif text-[48px] text-ink">→</span>
          </div>
          <div className="flex flex-col gap-5 py-10 lg:pl-12">
            <span className="eyebrow">Client-facing</span>
            <h3 className="serif text-[32px] leading-[36px] md:text-[40px] md:leading-[44px] tracking-[-0.018em]">
              What the client feels.
            </h3>
            {clientFacing.map((x, i) => (
              <div key={i} className="py-3.5 border-t border-[var(--color-rule)] serif text-[18px] text-ink">
                {x}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="pt-10">
        <p className="serif italic text-[22px] leading-[30px] md:text-[28px] md:leading-[38px] tracking-[-0.008em] text-ink max-w-[720px]">
          The right system can make the firm feel more responsive, more buttoned up, and more intentional.
        </p>
      </Reveal>
    </section>
  )
}
