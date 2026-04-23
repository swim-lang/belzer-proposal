import { useEffect, useState } from 'react'
import { nav, navSections } from '../content'

export function Nav() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const sections = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="hidden md:flex items-center justify-between px-16 py-4 border-b border-[var(--color-rule)] eyebrow text-ink">
        <div className="flex items-center gap-5">
          <img src="/logos/anchovies-wordmark.svg" alt={nav.brandName} className="h-[11px] w-auto block" />
          <span className="block w-px h-[10px] bg-[var(--color-rule)]" />
          <span className="text-ink-2">{nav.topMetaLeft}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-ink-2">{nav.topMetaRight[0]}</span>
          <span>{nav.topMetaRight[1]}</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 backdrop-blur-sm bg-paper/90 border-b border-[var(--color-rule)]">
        <div className="flex items-center justify-between px-6 md:px-16 py-4">
          <a href="#overview" className="flex items-center gap-3 group">
            <img src="/logos/anchovies-mark.svg" alt={nav.brandName} className="h-[14px] w-auto block" />
            <span className="hidden sm:inline text-[13px] text-ink-2 tracking-[-0.01em]">
              <span className="text-ink">{nav.brandPair.split(' × ')[0]}</span>
              <span className="mx-2">×</span>
              {nav.brandPair.split(' × ')[1]}
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-7 text-[12px] text-ink-2">
            {navSections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={`transition-colors hover:text-ink ${active === s.id ? 'text-ink' : ''}`}>
                {s.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('anchovies:approve'))}
            className="px-4 py-2 rounded-full text-[12px] font-medium text-paper transition-colors"
            style={{ backgroundColor: 'var(--color-mac)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
          >
            {nav.ctaApprove}
          </button>
        </div>
      </div>
    </>
  )
}
