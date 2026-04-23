import { features, featuresSection } from '../content'
import { Reveal } from './Reveal'

export function Features() {
  return (
    <section id="features" className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 lg:pb-16 border-b border-[var(--color-rule)]">
        <Reveal className="flex flex-col gap-8 max-w-[760px]">
          <span className="eyebrow text-ink-2">{featuresSection.eyebrow}</span>
          <h2 className="display text-ink text-[56px] leading-[56px] md:text-[80px] md:leading-[76px] lg:text-[96px] lg:leading-[92px] tracking-[-0.024em]">
            {featuresSection.headline}
          </h2>
        </Reveal>
        <Reveal className="max-w-[340px] pb-2">
          <p className="text-[15px] leading-[24px] text-ink-2">{featuresSection.subheadline}</p>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const isLast = i === features.length - 1
          const baseBorder = isLast ? '' : 'border-b'
          const mdRightBorder = i % 2 === 0 ? 'md:border-r' : 'md:border-r-0'
          const mdBottomBorder = i < 4 ? 'md:border-b' : 'md:border-b-0'
          const lgRightBorder = i % 3 !== 2 ? 'lg:border-r' : 'lg:border-r-0'
          const lgBottomBorder = i < 3 ? 'lg:border-b' : 'lg:border-b-0'
          const mdPadding = i % 2 === 0 ? 'md:pr-10' : 'md:pl-10'
          const lgPadding =
            i % 3 === 0 ? 'lg:pl-0 lg:pr-10' : i % 3 === 1 ? 'lg:px-10' : 'lg:pl-10 lg:pr-0'

          return (
            <Reveal
              key={f.num}
              className={`group flex flex-col gap-5 py-10 md:min-h-[320px] border-[var(--color-rule)] transition-colors ${baseBorder} ${mdRightBorder} ${mdBottomBorder} ${lgRightBorder} ${lgBottomBorder} ${mdPadding} ${lgPadding}`}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow text-ink-2">Feature {f.num}</span>
                <span className="eyebrow text-ink-2 transition-transform group-hover:rotate-45">✦</span>
              </div>
              <h3 className="serif text-[30px] leading-[34px] md:text-[36px] md:leading-[40px] tracking-[-0.015em] text-ink">
                {f.name}
              </h3>
              <p className="text-[14px] leading-[22px] text-ink-2">{f.desc}</p>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
