import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'
import { DashboardMock } from './DashboardMock'

export function DashboardPreview() {
  const { dashboardPreview } = useContent()
  return (
    <section
      id="preview"
      className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px] flex flex-col items-center gap-12"
    >
      <Reveal className="flex flex-col items-center gap-6 max-w-[640px] text-center">
        <span className="eyebrow text-ink-2">{dashboardPreview.eyebrow}</span>
        <h2 className="display text-ink text-[36px] leading-[38px] md:text-[48px] md:leading-[50px] lg:text-[56px] lg:leading-[58px] tracking-[-0.022em]">
          {dashboardPreview.headline}
        </h2>
        <p className="text-[15px] leading-[24px] text-ink-2 max-w-[520px]">{dashboardPreview.subheadline}</p>
      </Reveal>

      <Reveal className="w-full flex justify-center">
        <div
          className="dashboard-frame w-full max-w-[880px] border border-[var(--color-rule)] rounded-xl overflow-hidden bg-paper"
          style={{ boxShadow: '0 30px 60px -40px rgba(10, 10, 10, 0.18)' }}
        >
          {/* Browser chrome */}
          <div
            className="flex items-center justify-between gap-4 px-4 py-2.5 border-b bg-ink/[0.04]"
            style={{ borderColor: 'rgba(31, 25, 18, 0.4)' }}
          >
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="block w-[9px] h-[9px] rounded-full bg-ink/20" />
              <span className="block w-[9px] h-[9px] rounded-full bg-ink/20" />
              <span className="block w-[9px] h-[9px] rounded-full bg-ink/20" />
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1 border rounded-full flex-1 max-w-[360px]"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(31, 25, 18, 0.18)' }}
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4A4A4A" strokeWidth={2}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span className="text-[10.5px] text-ink-2">{dashboardPreview.urlBar}</span>
            </div>
            <span className="eyebrow text-ink-2 text-[9px]">{dashboardPreview.chromeBadge}</span>
          </div>
          <div className="relative w-full overflow-hidden bg-paper" style={{ height: 'clamp(360px, 58vw, 560px)' }}>
            <div className="absolute top-0 left-0 origin-top-left" style={{ width: 1440, height: 900 }}>
              <DashboardMock />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="text-[12px] leading-[18px] text-ink-2 text-center max-w-[560px]">{dashboardPreview.footnote}</p>
      </Reveal>
    </section>
  )
}
