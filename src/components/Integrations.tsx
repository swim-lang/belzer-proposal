import { useEffect, useRef, useState } from 'react'
import { integrationsSection } from '../content'
import { Reveal } from './Reveal'

type NodePos = {
  label: string
  name: string
  style: React.CSSProperties
  line: { x: number; y: number }
  floatDelay: string
  floatDuration: string
}

const nodes: NodePos[] = [
  { label: 'Storage',         name: 'Box',                   style: { top: '20%', left: '6%' },    line: { x: 180,  y: 180 }, floatDelay: '0s',    floatDuration: '7s' },
  { label: 'Practice mgmt',   name: 'PracticePanther',       style: { top: '8%',  left: '24%' },   line: { x: 420,  y: 120 }, floatDelay: '1.2s',  floatDuration: '8.5s' },
  { label: 'Productivity',    name: 'Microsoft 365',         style: { top: '8%',  right: '24%' },  line: { x: 780,  y: 120 }, floatDelay: '2.4s',  floatDuration: '7.8s' },
  { label: 'Legal research',  name: 'Westlaw*',              style: { top: '20%', right: '6%' },   line: { x: 1020, y: 180 }, floatDelay: '0.6s',  floatDuration: '8s' },
  { label: 'Comms',           name: 'Email workflows',       style: { bottom: '20%', left: '6%' }, line: { x: 180,  y: 500 }, floatDelay: '3s',    floatDuration: '9s' },
  { label: 'Operations',      name: 'Billing / timekeeping', style: { bottom: '8%',  left: '24%' },line: { x: 420,  y: 560 }, floatDelay: '1.8s',  floatDuration: '7.4s' },
  { label: 'Storage systems', name: 'Document storage',      style: { bottom: '8%',  right: '24%' },line:{ x: 780,  y: 560 }, floatDelay: '0.3s',  floatDuration: '8.2s' },
  { label: 'Internal',        name: 'File conventions',      style: { bottom: '20%', right: '6%' },line: { x: 1020, y: 500 }, floatDelay: '2.1s',  floatDuration: '7.6s' },
]

export function Integrations() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = mapRef.current
    if (!node) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true)
      },
      { threshold: 0.25 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
      <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-20 pb-12 border-b border-[var(--color-rule)]">
        <Reveal className="flex flex-col gap-8 flex-[1.4]">
          <span className="eyebrow text-ink-2">{integrationsSection.eyebrow}</span>
          <h2 className="display text-ink text-[44px] leading-[44px] md:text-[60px] md:leading-[60px] lg:text-[80px] lg:leading-[76px] tracking-[-0.022em] max-w-[860px]">
            {integrationsSection.headline}
          </h2>
        </Reveal>
        <Reveal className="flex flex-col gap-5 flex-1 max-w-[460px]">
          <p className="text-[16px] leading-[26px] text-ink-2">{integrationsSection.intro}</p>
        </Reveal>
      </div>

      <Reveal>
        <div
          ref={mapRef}
          className={`map hidden md:block relative w-full mt-12 lg:mt-20 border border-[var(--color-rule)] bg-paper overflow-hidden h-[520px] md:h-[620px] lg:h-[680px] ${active ? 'is-active' : ''}`}
        >
          <div className="absolute top-6 left-6 eyebrow text-ink-2">{integrationsSection.figLabelLeft}</div>
          <div className="absolute top-6 right-6 eyebrow text-ink-2 hidden md:block">{integrationsSection.figLabelRight}</div>

          <svg viewBox="0 0 1200 680" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <radialGradient id="pulseGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.08" />
                <stop offset="60%" stopColor="#0A0A0A" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle className="map-pulse" cx={600} cy={340} r={120} fill="url(#pulseGrad)" />

            {nodes.map((p, i) => (
              <g key={i}>
                <line
                  className="map-line"
                  x1={600}
                  y1={340}
                  x2={p.line.x}
                  y2={p.line.y}
                  stroke="#1F1912"
                  strokeWidth={1}
                  style={{ transitionDelay: `${i * 90}ms` }}
                />
                <circle
                  className="map-dot"
                  cx={p.line.x}
                  cy={p.line.y}
                  r={3}
                  fill="#0A0A0A"
                  style={{ animationDelay: `${i * 0.7}s`, offsetPath: `path('M ${p.line.x} ${p.line.y} L 600 340')` } as React.CSSProperties}
                />
              </g>
            ))}
          </svg>

          <div className="map-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] md:w-[280px] h-[140px] md:h-[160px] bg-ink rounded-2xl p-5 md:p-6 flex flex-col justify-between z-10">
            <span className="eyebrow text-paper/66">{integrationsSection.centerLabel}</span>
            <div className="flex flex-col gap-1">
              <span className="serif text-[24px] md:text-[28px] leading-[28px] md:leading-[32px] tracking-[-0.014em] text-paper">
                {integrationsSection.centerName}
              </span>
              <span className="serif italic text-[14px] md:text-[18px] leading-[18px] md:leading-[22px] text-paper/66">
                {integrationsSection.centerTagline}
              </span>
            </div>
          </div>

          {nodes.map((p, i) => (
            <div
              key={i}
              className="map-node absolute hidden md:flex flex-col gap-1.5 w-[180px] lg:w-[200px] px-4 lg:px-5 py-3 lg:py-4 bg-paper border border-[var(--color-rule)] rounded-[10px]"
              style={{
                ...p.style,
                animationDelay: p.floatDelay,
                animationDuration: p.floatDuration,
                transitionDelay: `${i * 80 + 400}ms`,
              }}
            >
              <span className="eyebrow text-ink-2 text-[10px]">{p.label}</span>
              <span className="serif text-[18px] lg:text-[20px] text-ink">{p.name}</span>
            </div>
          ))}

          <div className="absolute bottom-6 left-6 text-[11px] text-ink-2">{integrationsSection.footnote}</div>
        </div>
      </Reveal>

      <Reveal className="md:hidden mt-10 border border-[var(--color-rule)] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-rule)]">
          <span className="eyebrow text-ink-2">{integrationsSection.figLabelLeft}</span>
        </div>
        <div className="bg-ink text-paper p-6 flex flex-col gap-1.5">
          <span className="eyebrow text-paper/66">{integrationsSection.centerLabel}</span>
          <span className="serif text-[26px] leading-[30px] tracking-[-0.014em] text-paper">
            {integrationsSection.centerName}
          </span>
          <span className="serif italic text-[16px] leading-[20px] text-paper/66">
            {integrationsSection.centerTagline}
          </span>
        </div>
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--color-rule)] bg-paper">
          <span className="serif text-ink-2 text-[18px] leading-none">↓</span>
          <span className="eyebrow text-ink-2">{integrationsSection.mobilePossibleLabel}</span>
        </div>
        {nodes.map((n, i) => (
          <div
            key={i}
            className={`flex items-baseline justify-between gap-4 px-5 py-4 ${
              i < nodes.length - 1 ? 'border-b border-[var(--color-rule)]' : ''
            }`}
          >
            <span className="serif text-[19px] leading-[26px] text-ink">{n.name}</span>
            <span className="eyebrow text-ink-2 text-[10px] text-right shrink-0">{n.label}</span>
          </div>
        ))}
        <div className="px-5 py-3 text-[11px] text-ink-2 bg-paper border-t border-[var(--color-rule)]">
          {integrationsSection.footnote}
        </div>
      </Reveal>
    </section>
  )
}
