import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { useContent } from '../context/ContentContext'
import { Reveal } from './Reveal'

type NodeVariant = {
  label: string
  name: string
}

type NodeSlot = {
  variants: NodeVariant[]
  style: CSSProperties
  line: { x: number; y: number }
  floatDelay: string
  floatDuration: string
}

const defaultNodes: NodeSlot[] = [
  {
    variants: [{ label: 'Storage', name: 'Box' }],
    style: { top: '27%', left: '6%' },
    line: { x: 180, y: 230 },
    floatDelay: '0s',
    floatDuration: '7s',
  },
  {
    variants: [
      { label: 'Practice mgmt', name: 'PracticePanther' },
      { label: 'Practice Mgmt', name: 'Clio / MyCase / Filevine' },
    ],
    style: { top: '8%', left: '24%' },
    line: { x: 420, y: 120 },
    floatDelay: '1.2s',
    floatDuration: '8.5s',
  },
  {
    variants: [
      { label: 'Productivity', name: 'Microsoft 365' },
      { label: 'Signatures + PDFs', name: 'DocuSign / Adobe Acrobat' },
    ],
    style: { top: '8%', right: '24%' },
    line: { x: 780, y: 120 },
    floatDelay: '2.4s',
    floatDuration: '7.8s',
  },
  {
    variants: [
      { label: 'Legal research', name: 'Westlaw*' },
      { label: 'Legal Research', name: 'LexisNexis' },
    ],
    style: { top: '27%', right: '6%' },
    line: { x: 1020, y: 230 },
    floatDelay: '0.6s',
    floatDuration: '8s',
  },
  {
    variants: [{ label: 'Comms', name: 'Email workflows' }],
    style: { bottom: '27%', left: '6%' },
    line: { x: 180, y: 450 },
    floatDelay: '3s',
    floatDuration: '9s',
  },
  {
    variants: [
      { label: 'Operations', name: 'Billing / timekeeping' },
      { label: 'Payments + Accounting', name: 'LawPay / QuickBooks' },
    ],
    style: { bottom: '8%', left: '24%' },
    line: { x: 420, y: 560 },
    floatDelay: '1.8s',
    floatDuration: '7.4s',
  },
  {
    variants: [
      { label: 'Storage systems', name: 'Document storage' },
      { label: 'Document Mgmt', name: 'NetDocuments / iManage' },
    ],
    style: { bottom: '8%', right: '24%' },
    line: { x: 780, y: 560 },
    floatDelay: '0.3s',
    floatDuration: '8.2s',
  },
  {
    variants: [
      { label: 'Internal', name: 'File conventions' },
      { label: 'eDiscovery', name: 'Relativity / Everlaw / DISCO' },
    ],
    style: { bottom: '27%', right: '6%' },
    line: { x: 1020, y: 450 },
    floatDelay: '2.1s',
    floatDuration: '7.6s',
  },
]

export function Integrations() {
  const { integrationsSection } = useContent()
  const nodes =
    'mapNodes' in integrationsSection && Array.isArray(integrationsSection.mapNodes)
      ? (integrationsSection.mapNodes as NodeSlot[])
      : defaultNodes
  const rotatingNodeIndexes = useMemo(
    () => nodes.flatMap((node, index) => (node.variants.length > 1 ? [index] : [])),
    [nodes]
  )
  const defaultVariantIndexes = useMemo(() => nodes.map(() => 0), [nodes])
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mobileMapRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [variantIndexes, setVariantIndexes] = useState(defaultVariantIndexes)

  useEffect(() => {
    const observedNodes = [mapRef.current, mobileMapRef.current].filter(Boolean) as HTMLDivElement[]
    if (observedNodes.length === 0) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(true)
      },
      { threshold: 0.25 }
    )
    observedNodes.forEach((node) => obs.observe(node))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncMotionPreference = () => setReduceMotion(query.matches)

    syncMotionPreference()
    query.addEventListener('change', syncMotionPreference)
    return () => query.removeEventListener('change', syncMotionPreference)
  }, [])

  useEffect(() => {
    if (reduceMotion) {
      setVariantIndexes(defaultVariantIndexes)
      return
    }

    if (!active || rotatingNodeIndexes.length === 0) return

    let slot = 0
    const interval = window.setInterval(() => {
      const nodeIndex = rotatingNodeIndexes[slot]

      setVariantIndexes((current) =>
        current.map((variantIndex, index) =>
          index === nodeIndex ? (variantIndex + 1) % nodes[index].variants.length : variantIndex
        )
      )

      slot = (slot + 1) % rotatingNodeIndexes.length
    }, 2400)

    return () => window.clearInterval(interval)
  }, [active, defaultVariantIndexes, nodes, reduceMotion, rotatingNodeIndexes])

  const getVariant = (node: NodeSlot, index: number) => node.variants[variantIndexes[index] ?? 0] ?? node.variants[0]

  return (
    <section id="systems" className="border-b border-[var(--color-rule)] px-6 md:px-16 lg:px-[120px] py-20 lg:py-[120px]">
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
                  style={{ animationDelay: `${i * 0.7}s`, offsetPath: `path('M ${p.line.x} ${p.line.y} L 600 340')` } as CSSProperties}
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

          {nodes.map((p, i) => {
            const variant = getVariant(p, i)

            return (
              <div
                key={i}
                className="map-node absolute hidden md:flex w-[180px] lg:w-[200px] min-h-[92px] lg:min-h-[98px] px-4 lg:px-5 py-3 lg:py-4 bg-paper border border-[var(--color-rule)] rounded-[10px]"
                style={{
                  ...p.style,
                  animationDelay: p.floatDelay,
                  animationDuration: p.floatDuration,
                  transitionDelay: `${i * 80 + 400}ms`,
                }}
              >
                <div key={`${i}-${variantIndexes[i]}`} className="map-node-inner flex w-full flex-col justify-center gap-1.5">
                  <span className="eyebrow text-ink-2 text-[10px] leading-[14px]">{variant.label}</span>
                  <span className="serif text-[18px] lg:text-[20px] leading-[22px] lg:leading-[24px] text-ink">{variant.name}</span>
                </div>
              </div>
            )
          })}

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
        <div ref={mobileMapRef}>
          {nodes.map((n, i) => {
            const variant = getVariant(n, i)

            return (
              <div
                key={i}
                className={`flex items-baseline justify-between gap-4 px-5 py-4 ${
                  i < nodes.length - 1 ? 'border-b border-[var(--color-rule)]' : ''
                }`}
              >
                <div key={`${i}-${variantIndexes[i]}`} className="mobile-map-row-content flex w-full items-baseline justify-between gap-4">
                  <span className="serif text-[19px] leading-[26px] text-ink">{variant.name}</span>
                  <span className="eyebrow text-ink-2 text-[10px] leading-[14px] text-right shrink-0">{variant.label}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="px-5 py-3 text-[11px] text-ink-2 bg-paper border-t border-[var(--color-rule)]">
          {integrationsSection.footnote}
        </div>
      </Reveal>
    </section>
  )
}
