import { useEffect, useState } from 'react'
import { useContent } from '../context/ContentContext'

export function ApproveScreen() {
  const { approveScreen } = useContent()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('anchovies:approve', handler)
    return () => window.removeEventListener('anchovies:approve', handler)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`approve-screen fixed inset-0 z-[100] ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div className="approve-backdrop absolute inset-0 bg-ink" />
      <div className="approve-panel absolute inset-0 flex flex-col overflow-auto text-paper">
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-[120px] py-6 border-b border-white/15">
          <div className="flex items-center gap-3">
            <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[14px] w-auto block invert" />
            <span className="text-[12px] tracking-[-0.01em] text-paper/70">
              <span className="text-paper">Anchovies</span>
              <span className="mx-2">×</span>
              {approveScreen.preparedForValue.split(' · ')[0]}
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="eyebrow text-paper/70 hover:text-paper transition-colors flex items-center gap-2"
            aria-label="Close"
          >
            <span>Close</span>
            <span aria-hidden>×</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col px-6 md:px-16 lg:px-[120px] py-16 lg:py-24 gap-16 lg:gap-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/15">
            <div className="flex flex-col gap-5">
              <div className="approve-mark flex items-center gap-3">
                <span className="inline-block w-[10px] h-[10px] rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
                <span className="eyebrow text-paper/70">{approveScreen.eyebrow}</span>
              </div>
              <h1 className="approve-headline display text-paper text-[56px] leading-[56px] sm:text-[72px] sm:leading-[70px] md:text-[96px] md:leading-[92px] lg:text-[128px] lg:leading-[116px] tracking-[-0.025em]">
                {approveScreen.headline}
              </h1>
            </div>
            <div className="approve-meta flex flex-col gap-2 max-w-[340px]">
              <span className="eyebrow text-paper/70">{approveScreen.confirmationLabel}</span>
              <p className="text-[14px] leading-[22px] text-paper/80">{approveScreen.confirmationBody}</p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            <div className="approve-intro flex flex-col gap-5 max-w-[520px] flex-1">
              <span className="eyebrow text-paper/70">{approveScreen.introLabel}</span>
              <p className="serif text-[22px] leading-[30px] md:text-[26px] md:leading-[36px] tracking-[-0.008em] text-paper">
                {approveScreen.introBody}
              </p>
              <p className="text-[14px] leading-[22px] text-paper/70">{approveScreen.introNote}</p>
            </div>

            <div className="flex-1 flex flex-col border-t border-white/15">
              {approveScreen.steps.map((step, i) => (
                <div
                  key={i}
                  className="approve-step flex flex-col md:flex-row gap-3 md:gap-10 py-6 border-b border-white/15"
                  style={{ ['--step-index' as string]: i }}
                >
                  <span className="eyebrow text-paper/60 md:w-[80px] shrink-0">{step.label}</span>
                  <div className="flex flex-col gap-2">
                    <span className="serif text-[24px] leading-[30px] md:text-[28px] md:leading-[34px] tracking-[-0.012em] text-paper">
                      {step.title}
                    </span>
                    <span className="text-[14px] leading-[22px] text-paper/70">{step.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="approve-footer flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-white/15">
            <div className="flex items-center gap-4">
              <span className="eyebrow text-paper/60">{approveScreen.preparedForLabel}</span>
              <span className="text-[14px] text-paper">{approveScreen.preparedForValue}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-3 rounded-full border border-white/30 text-[13px] font-medium text-paper/80 hover:text-paper hover:border-white/60 transition-colors"
              >
                {approveScreen.ctaBack}
              </button>
              <a
                href={approveScreen.mailTo}
                className="px-5 py-3 rounded-full text-[13px] font-medium text-paper transition-colors"
                style={{ backgroundColor: 'var(--color-mac)' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
              >
                {approveScreen.ctaReach}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
