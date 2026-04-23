import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'

export function PointOfView() {
  const { pointOfView } = useContent()
  return (
    <section className="bg-ink text-paper border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-24 lg:py-[160px]">
      <Reveal className="flex items-start justify-between pb-8 border-b border-white/20">
        <span className="eyebrow text-paper">{pointOfView.eyebrow}</span>
        <span className="eyebrow text-paper">{pointOfView.metaRight}</span>
      </Reveal>

      <Reveal>
        <h2 className="display text-paper text-[48px] leading-[48px] sm:text-[64px] sm:leading-[60px] md:text-[80px] md:leading-[76px] lg:text-[96px] lg:leading-[92px] tracking-[-0.024em] max-w-[1100px] py-16 lg:py-24">
          {pointOfView.headline}
        </h2>
      </Reveal>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        <Reveal className="flex flex-col gap-6 flex-1 max-w-[520px]">
          <p className="text-[16px] leading-[26px] text-paper">{pointOfView.paragraphs[0]}</p>
          <p className="text-[16px] leading-[26px] text-paper/66">{pointOfView.paragraphs[1]}</p>
          <p className="text-[16px] leading-[26px] text-paper/66">{pointOfView.paragraphs[2]}</p>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[640px] lg:border-l border-white/20 lg:pl-12">
          <span className="eyebrow text-paper/66">{pointOfView.pullQuoteLabel}</span>
          <p className="serif italic text-[30px] leading-[36px] md:text-[36px] md:leading-[44px] lg:text-[44px] lg:leading-[52px] tracking-[-0.012em] text-paper">
            {pointOfView.pullQuote}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
