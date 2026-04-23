import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'
import { UnfoldGrid } from './UnfoldGrid'

export function Hero() {
  const { hero, stages } = useContent()
  return (
    <section id="overview" className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] pt-20 md:pt-28 lg:pt-[120px] pb-16 lg:pb-24">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-16 lg:pb-24">
        <Reveal className="flex flex-col gap-1.5">
          <span className="eyebrow text-ink-2">{hero.eyebrowSection}</span>
          <span className="eyebrow">{hero.eyebrowEmphasis}</span>
        </Reveal>
        <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
          {hero.eyebrowMetaLines.map((line) => (
            <span key={line} className="eyebrow text-ink-2">
              {line}
            </span>
          ))}
        </Reveal>
      </div>

      <Reveal>
        <h1 className="display text-ink text-[44px] leading-[44px] sm:text-[64px] sm:leading-[60px] md:text-[88px] md:leading-[80px] lg:text-[112px] lg:leading-[100px] xl:text-[128px] xl:leading-[108px] tracking-[-0.025em] max-w-[1100px] pb-12 lg:pb-16">
          {hero.headlineLines[0]}
          <span className="hidden md:inline">
            <br />
          </span>
          <span className="md:inline"> {hero.headlineLines[1]}</span>
          <span className="hidden md:inline">
            <br />
          </span>
          <span className="md:inline"> {hero.headlineLines[2]}</span>
        </h1>
      </Reveal>

      <div className="border-t border-[var(--color-rule)] pt-12 flex flex-col lg:flex-row gap-10 lg:gap-20 pb-16">
        <Reveal className="flex-1 max-w-[640px]">
          <h2 className="serif text-ink text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] lg:text-[36px] lg:leading-[44px] tracking-[-0.02em]">
            {hero.subheadline}
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-6 max-w-[420px] pt-2">
          <p className="text-[15px] leading-[23px] text-ink-2">{hero.body}</p>
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('anchovies:approve'))}
              className="px-5 py-3.5 rounded-full text-[13px] font-medium transition-colors text-paper"
              style={{ backgroundColor: 'var(--color-mac)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
            >
              {hero.ctaPrimary}
            </button>
            <a
              href="#features"
              className="px-5 py-3.5 border border-[var(--color-rule)] rounded-full text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              {hero.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <UnfoldGrid className="border-t border-[var(--color-rule)] pt-12 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="eyebrow text-ink-2">{hero.figLabelLeft}</span>
            <span className="eyebrow text-ink-2">{hero.figLabelRight}</span>
          </div>
          <div className="relative">
            <div className="unfold-rule absolute top-0 left-0 right-0 h-px bg-[var(--color-rule)]" />
            <div className="unfold-rule unfold-rule-b absolute bottom-0 left-0 right-0 h-px bg-[var(--color-rule)]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
              {stages.map((s, i) => (
                <div
                  key={s.name}
                  className={`unfold-col relative flex flex-col gap-6 p-8 md:p-10 min-h-[200px] border-[var(--color-rule)] ${
                    i < stages.length - 1 ? 'xl:border-r' : ''
                  } ${i % 2 === 0 ? 'sm:border-r xl:border-r' : ''} ${
                    i < 2 ? 'sm:border-b xl:border-b-0' : ''
                  } ${i < stages.length - 1 ? 'border-b sm:border-b-0' : ''}`}
                  style={{ ['--col-index' as string]: i }}
                >
                  <span className="unfold-item eyebrow text-ink-2" style={{ ['--item-index' as string]: 0 }}>
                    {s.label}
                  </span>
                  <span
                    className="unfold-item serif font-medium text-[32px] leading-[36px] md:text-[36px] md:leading-[40px] xl:text-[44px] xl:leading-[48px] tracking-[-0.02em]"
                    style={{ ['--item-index' as string]: 1 }}
                  >
                    {s.name}
                  </span>
                  <span className="unfold-item text-[13px] leading-[20px] text-ink-2" style={{ ['--item-index' as string]: 2 }}>
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </UnfoldGrid>
      </Reveal>
    </section>
  )
}
