import { useEffect, useRef, useState } from 'react'
import { Reveal } from './components/Reveal'

const fullProposalHref = '/proposal/hike-doggie'

const navSections = [
  { id: 'problem', label: 'Problem' },
  { id: 'method', label: 'The Fix' },
  { id: 'roi', label: 'ROI' },
  { id: 'risk', label: 'Risk' },
  { id: 'measure', label: 'Measurement' },
  { id: 'decision', label: 'Decision' },
]

const problemCards = [
  {
    num: '01',
    label: 'Speed',
    title: 'Eight weeks to train a zee.',
    body: 'Eight weeks before a new franchisee runs their operating day. The revenue clock starts late, and everyone feels it.',
  },
  {
    num: '02',
    label: 'Proof',
    title: 'Standards are narrated, not proven.',
    body: 'Zees read the operating system on a laptop. Nothing verifies they can actually run it.',
  },
  {
    num: '03',
    label: 'Support',
    title: 'Field consultants carry the load.',
    body: '$50,000 a year per 20 to 30 zees, plus site visits that average $1,200 each.',
  },
  {
    num: '04',
    label: 'Ramp',
    title: 'First months underperform.',
    body: '$500 first-month revenue against a $2,000 goal. Slow to breakeven, slow to cashflow positive.',
  },
]

const roiTiles = [
  [
    'Faster ramp',
    '~$3,000 per zee',
    'Six extra earning weeks at the $2,000 per month target is roughly $3,000 of revenue per zee that currently never happens. Royalties start sooner too.',
  ],
  [
    'Site visits',
    '10 visits',
    'Ten avoided site visits at $1,200 each pay for Phases 1 and 2 outright.',
  ],
  [
    'Consultant load',
    '~$25,000 per year',
    'Halving field consultant burden across a 25 zee cohort returns roughly $25,000 every year, against $2,000 per zee today.',
  ],
  [
    'Reuse',
    'Build once',
    'Hike Doggie validates it. Loyalty Brands reuses it. Every later brand inherits the system without paying to rebuild it.',
  ],
]

const riskRows = [
  {
    num: '01',
    label: 'Governance',
    title: 'Stage-gated spend.',
    body: 'Approval today covers $12,000. The build, an estimated $8k to $20k, returns to this board priced by a working prototype. Advisory is month to month, cancel anytime.',
  },
  {
    num: '02',
    label: 'Partner',
    title: 'Twelve years with this vendor.',
    body: 'A proven working relationship is why the cost and the timeline to beta are this competitive, and why the risk is not what it would be with a stranger.',
  },
  {
    num: '03',
    label: 'Sequence',
    title: 'Pilot first, pitch later.',
    body: 'Hike Doggie tests and validates before anything is shown to other brands. No external presentation until it demonstrably works.',
  },
  {
    num: '04',
    label: 'Ownership',
    title: 'Owned outright.',
    body: 'The SOP library, the system, the build: Hike Doggie property, reusable across brands, licensed to no one.',
  },
]

const measurements = [
  ['M / 01', 'Training days per zee', 'From day one to running the operating day'],
  ['M / 02', 'SOP completion rate', 'Started, finished, and proven'],
  ['M / 03', 'First-month revenue', 'Against the $500 baseline'],
  ['M / 04', 'Time to $2,000 per month', 'The number John watches'],
  ['M / 05', 'Consultant hours per zee', 'Field burden, before and after'],
  ['M / 06', 'Site visits per zee', 'At $1,200 a visit'],
]

const timelineCols = [
  ['Week 01', 'SOP extraction', ['Everything out of Delight Tree', 'Inventory and cleanup', 'Baseline stats captured']],
  ['Week 02', 'SOP standard', ['Every SOP reformatted', 'Owners and cadences', 'One provable standard']],
  ['Week 03', 'Prototype', ['Feature decisions', 'Working prototype', 'Firm build quote']],
] as const

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node || inView) return
    const cleanup = () => {
      obs.disconnect()
      window.removeEventListener('scroll', check)
    }
    const check = () => {
      const rect = node.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        setInView(true)
        cleanup()
      }
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            cleanup()
          }
        }
      },
      { threshold },
    )
    obs.observe(node)
    window.addEventListener('scroll', check, { passive: true })
    check()
    return cleanup
  }, [threshold, inView])
  return { ref, inView }
}

function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1600,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.6)
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(to * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration])
  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

function TrainingCompression() {
  const { ref, inView } = useInView<HTMLDivElement>(0.5)
  return (
    <div ref={ref} className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-ink-2">Training today</span>
          <span className="serif text-[21px] leading-none">8 weeks</span>
        </div>
        <div className="h-[14px] w-full border border-[var(--color-rule)]">
          <div
            className="h-full bg-ink-2/60"
            style={{ width: inView ? '100%' : '0%', transition: 'width 1400ms cubic-bezier(0.22, 1, 0.36, 1)' }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="eyebrow text-ink-2">With the app</span>
          <span className="serif text-[21px] leading-none">1 to 2 weeks</span>
        </div>
        <div className="h-[14px] w-full border border-[var(--color-rule)]">
          <div
            className="h-full bg-ink"
            style={{ width: inView ? '19%' : '0%', transition: 'width 1400ms cubic-bezier(0.22, 1, 0.36, 1) 500ms' }}
          />
        </div>
      </div>
      <p className="text-[13px] leading-[20px] text-ink-2">
        Six weeks handed back to every zee, every cohort. That is time spent earning instead of reading.
      </p>
    </div>
  )
}

function RevenueRamp() {
  const { ref, inView } = useInView<HTMLDivElement>(0.5)
  const drawStyle = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: inView ? 0 : 1,
    transition: `stroke-dashoffset 1600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  })
  return (
    <div ref={ref} className="flex flex-col gap-5">
      <svg viewBox="0 0 520 240" fill="none" className="w-full">
        <line x1="40" y1="10" x2="40" y2="200" stroke="var(--color-rule)" strokeWidth="1" />
        <line x1="40" y1="200" x2="510" y2="200" stroke="var(--color-rule)" strokeWidth="1" />
        <text x="30" y="205" textAnchor="end" fill="var(--color-ink-2)" fontSize="11">$0</text>
        <text x="30" y="128" textAnchor="end" fill="var(--color-ink-2)" fontSize="11">$1k</text>
        <text x="30" y="52" textAnchor="end" fill="var(--color-ink-2)" fontSize="11">$2k</text>
        <text x="100" y="222" textAnchor="middle" fill="var(--color-ink-2)" fontSize="11">Month 1</text>
        <text x="230" y="222" textAnchor="middle" fill="var(--color-ink-2)" fontSize="11">Month 2</text>
        <text x="360" y="222" textAnchor="middle" fill="var(--color-ink-2)" fontSize="11">Month 3</text>
        <text x="490" y="222" textAnchor="middle" fill="var(--color-ink-2)" fontSize="11">Month 4</text>
        <path
          d="M100 162 L230 155 L360 145 L490 132"
          stroke="var(--color-ink-2)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          pathLength={1}
          style={drawStyle(0)}
        />
        <path
          d="M100 124 L230 48 L360 38 L490 24"
          stroke="var(--color-ink)"
          strokeWidth="2.5"
          pathLength={1}
          style={drawStyle(400)}
        />
        <circle cx="100" cy="162" r="3" fill="var(--color-ink-2)" opacity={inView ? 1 : 0} style={{ transition: 'opacity 400ms ease 200ms' }} />
        <circle cx="100" cy="124" r="3.5" fill="var(--color-ink)" opacity={inView ? 1 : 0} style={{ transition: 'opacity 400ms ease 600ms' }} />
        <circle cx="490" cy="24" r="3.5" fill="var(--color-ink)" opacity={inView ? 1 : 0} style={{ transition: 'opacity 400ms ease 1900ms' }} />
        <text x="104" y="178" fill="var(--color-ink-2)" fontSize="11" opacity={inView ? 1 : 0} style={{ transition: 'opacity 500ms ease 700ms' }}>
          Today: $500 first month
        </text>
        <text x="356" y="26" fill="var(--color-ink)" fontSize="12" fontWeight="600" textAnchor="end" opacity={inView ? 1 : 0} style={{ transition: 'opacity 500ms ease 1900ms' }}>
          Target: $2,000+ and growing
        </text>
      </svg>
      <p className="text-[13px] leading-[20px] text-ink-2">
        The ramp the board is funding: trained faster, earning sooner, growing month over month.
      </p>
    </div>
  )
}

function MetaRow({ left, right, dark = false }: { left: string; right: string; dark?: boolean }) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:gap-6">
      <span className={`eyebrow ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{left}</span>
      <span className={`eyebrow sm:text-right ${dark ? 'text-paper/55' : 'text-ink-2'}`}>{right}</span>
    </div>
  )
}

function fourCardBorderClass(index: number, total: number) {
  return [
    index < total - 2 ? 'border-b' : 'border-b md:border-b-0',
    index % 2 === 0 ? 'md:border-r' : 'md:border-r-0',
    index < total - 1 ? 'xl:border-r' : 'xl:border-r-0',
    'xl:border-b-0',
  ].join(' ')
}

function BoardNav() {
  const [active, setActive] = useState('problem')
  useEffect(() => {
    const sections = navSections.map((section) => document.getElementById(section.id)).filter((el): el is HTMLElement => !!el)
    if (!sections.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.2, 0.5, 0.75], rootMargin: '-38% 0px -52% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header>
      <div className="hidden items-center justify-between border-b border-[var(--color-rule)] px-16 py-4 text-ink md:flex">
        <div className="flex items-center gap-5">
          <span className="eyebrow font-medium text-ink">Hike Doggie</span>
          <span className="block h-[10px] w-px bg-[var(--color-rule)]" />
          <span className="eyebrow text-ink-2">Board overview</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="eyebrow text-ink-2">SOP Training App · Phases 1 and 2</span>
          <span className="eyebrow">July 2026</span>
        </div>
      </div>
      <div className="sticky top-0 z-40 border-b border-[var(--color-rule)] bg-paper/95 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-6 px-6 py-4 md:px-16">
          <a href="#overview" className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-ink">Hike Doggie</span>
            <span className="hidden text-[13px] text-ink-2 sm:inline">Board overview</span>
          </a>
          <nav className="hidden items-center gap-5 text-[12px] text-ink-2 xl:flex">
            {navSections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`transition-colors hover:text-ink ${active === section.id ? 'text-ink' : ''}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <a href={fullProposalHref} className="rounded-full border border-ink px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
            Full proposal
          </a>
        </div>
      </div>
    </header>
  )
}

export function HikeDoggieBoardOverview() {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Hike Doggie - Board Overview'
      const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
      if (meta) {
        meta.content = 'Board overview for the Hike Doggie SOP Training App: ROI, risk, measurement, and the decision requested.'
      }
    }
  }, [])

  return (
    <main className="hike-doggie-board min-h-screen bg-paper text-ink antialiased">
      <BoardNav />

      <section id="overview" className="border-b border-[var(--color-rule)] px-6 pb-16 pt-20 md:px-16 md:pt-28 lg:px-[120px] lg:pb-24 lg:pt-[110px]">
        <div className="flex flex-col gap-6 pb-14 md:flex-row md:items-start md:justify-between lg:pb-20">
          <Reveal className="flex flex-col gap-1.5">
            <span className="eyebrow text-ink-2">§ 01 - Board overview</span>
            <span className="eyebrow text-ink-2">SOP Training App</span>
          </Reveal>
          <Reveal className="flex flex-col gap-1.5 md:items-end md:text-right">
            <span className="eyebrow text-ink-2">Prepared for the Hike Doggie board</span>
            <span className="eyebrow text-ink-2">July 2026</span>
          </Reveal>
        </div>
        <Reveal>
          <h1 className="display max-w-[1180px] pb-12 text-[48px] leading-[52px] sm:text-[72px] sm:leading-[72px] md:text-[92px] md:leading-[90px] lg:pb-14 lg:text-[110px] lg:leading-[104px]">
            Zees earning in week two, not week nine.
          </h1>
        </Reveal>
        <div className="flex flex-col gap-10 border-t border-[var(--color-rule)] pb-14 pt-12 lg:flex-row lg:gap-[140px]">
          <Reveal className="max-w-[650px] flex-1">
            <h2 className="serif text-[28px] leading-[36px] md:text-[36px] md:leading-[44px]">
              Approve Phases 1 and 2: three weeks to transform our SOPs and put a working prototype in front of this board. Every dollar after that is a separate decision, priced by the prototype you will see.
            </h2>
          </Reveal>
          <Reveal className="flex max-w-[440px] flex-col gap-7">
            <p className="text-[15px] leading-[23px] text-ink-2">
              Zees trained in days instead of weeks, proven on our operating system, earning sooner. Piloted on Hike Doggie first, owned outright, and reusable across Loyalty Brands when it works.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#roi" className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-[13px] font-medium text-paper transition-colors hover:bg-ink-2 whitespace-nowrap">
                {'See the return ->'}
              </a>
              <a href={fullProposalHref} className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--color-rule)] px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
                Read the full proposal
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal className="border-t border-[var(--color-rule)] pt-12">
          <MetaRow left="Fig. 01 - The headline numbers" right="Watch them add up" />
          <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
            <div className={`flex min-h-[190px] flex-col justify-between gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(0, 4)}`}>
              <span className="eyebrow text-ink-2">Ask today</span>
              <div className="flex flex-col gap-2">
                <span className="serif text-[44px] leading-none"><CountUp to={12000} prefix="$" /></span>
                <p className="text-[13px] leading-[20px] text-ink-2">Phases 1 and 2, all in. Under the board threshold, brought to you anyway.</p>
              </div>
            </div>
            <div className={`flex min-h-[190px] flex-col justify-between gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(1, 4)}`}>
              <span className="eyebrow text-ink-2">Timeline</span>
              <div className="flex flex-col gap-2">
                <span className="serif text-[44px] leading-none"><CountUp to={3} /> weeks</span>
                <p className="text-[13px] leading-[20px] text-ink-2">SOPs done in two, working prototype in hand by the third.</p>
              </div>
            </div>
            <div className={`flex min-h-[190px] flex-col justify-between gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(2, 4)}`}>
              <span className="eyebrow text-ink-2">Zee ramp target</span>
              <div className="flex flex-col gap-2">
                <span className="serif text-[44px] leading-none"><CountUp to={2000} prefix="$" suffix="+" /></span>
                <p className="text-[13px] leading-[20px] text-ink-2">First-month revenue target, up from roughly $500 today.</p>
              </div>
            </div>
            <div className={`flex min-h-[190px] flex-col justify-between gap-6 border-[var(--color-rule)] p-8 ${fourCardBorderClass(3, 4)}`}>
              <span className="eyebrow text-ink-2">Field cost in play</span>
              <div className="flex flex-col gap-2">
                <span className="serif text-[44px] leading-none"><CountUp to={50000} prefix="$" /></span>
                <p className="text-[13px] leading-[20px] text-ink-2">Annual field consultant cost per 20 to 30 zees the app is built to reduce.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="problem" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[130px]">
        <MetaRow left="§ 02 - What problem does this solve" right="The board's question, answered first" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <h2 className="display max-w-[650px] text-[44px] leading-[48px] md:text-[64px] md:leading-[66px]">
              Training is slow, laptop-bound, and unproven.
            </h2>
            <div className="flex max-w-[500px] flex-col gap-6 text-[15px] leading-[24px] text-ink-2">
              <p>Every week a zee spends in training is a week they are not earning, a week the brand carries them, and a week the field team fills the gap.</p>
              <p>The cost is real and it repeats with every new franchisee we sign.</p>
            </div>
          </Reveal>
          <Reveal className="grid gap-0 border-t border-[var(--color-rule)] sm:grid-cols-2">
            {problemCards.map((note, index) => (
              <article key={note.num} className={`flex min-h-[240px] flex-col justify-between gap-8 border-[var(--color-rule)] p-7 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index < problemCards.length - 2 ? 'border-b' : 'border-b sm:border-b-0'}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow text-ink-2">P / {note.num}</span>
                  <span className="eyebrow text-ink-2">{note.label}</span>
                </div>
                <div className="flex flex-col gap-4">
                  <h3 className="serif text-[24px] leading-[29px]">{note.title}</h3>
                  <p className="text-[13px] leading-[20px] text-ink-2">{note.body}</p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="method" className="border-b border-[var(--color-rule)] bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[130px]">
        <MetaRow left="§ 03 - The fix" right="Learn · Practice · Prove" dark />
        <Reveal>
          <h2 className="display max-w-[1180px] py-14 text-[44px] leading-[50px] md:text-[68px] md:leading-[72px] lg:text-[84px] lg:leading-[86px]">
            SOPs become an app. Zees learn, practice, and prove.
          </h2>
        </Reveal>
        <div className="grid gap-0 border-t border-paper/20 md:grid-cols-3">
          <Reveal className="flex flex-col gap-5 border-b border-paper/20 p-8 md:border-b-0 md:border-r">
            <span className="eyebrow text-paper/55">Step 01</span>
            <h3 className="serif text-[30px] leading-[36px]">Learn</h3>
            <p className="text-[14px] leading-[22px] text-paper/70">
              The operating system delivered on their phone in small, contextual pieces. Mobile beats the laptop for pace, completion, and habit.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-5 border-b border-paper/20 p-8 md:border-b-0 md:border-r">
            <span className="eyebrow text-paper/55">Step 02</span>
            <h3 className="serif text-[30px] leading-[36px]">Practice</h3>
            <p className="text-[14px] leading-[22px] text-paper/70">
              Real tasks with real tools, the way adults actually learn: by doing. An AI coach plans each day and adapts to each zee.
            </p>
          </Reveal>
          <Reveal className="flex flex-col gap-5 p-8">
            <span className="eyebrow text-paper/55">Step 03</span>
            <h3 className="serif text-[30px] leading-[36px]">Prove</h3>
            <p className="text-[14px] leading-[22px] text-paper/70">
              Tested until the standard is demonstrated, not assumed. Zees graduate when the brand can trust the result.
            </p>
          </Reveal>
        </div>
        <Reveal className="border-t border-paper/20 pt-10">
          <p className="serif max-w-[900px] text-[22px] leading-[32px] text-paper/82 md:text-[27px] md:leading-[38px]">
            The outcome the board actually wants: zees who follow the operating system because the system taught them, tested them, and passed them.
          </p>
        </Reveal>
      </section>

      <section id="roi" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[130px]">
        <MetaRow left="§ 04 - The return" right="Dollarized, checkable math" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[700px] text-[44px] leading-[48px] md:text-[64px] md:leading-[66px]">
              The math the board can check.
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] text-[15px] leading-[24px] text-ink-2">
            Nothing here requires trust in a vendor. Each figure below comes from our own numbers: the training calendar, the field budget, and the revenue goal already set for new zees.
          </Reveal>
        </div>
        <div className="grid gap-10 border-y border-[var(--color-rule)] py-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <MetaRow left="Fig. 02 - Training time" right="8 weeks to 1-2" />
            <div className="pt-8">
              <TrainingCompression />
            </div>
          </Reveal>
          <Reveal>
            <MetaRow left="Fig. 03 - Zee revenue ramp" right="First four months" />
            <div className="pt-8">
              <RevenueRamp />
            </div>
          </Reveal>
        </div>
        <Reveal className="pt-12">
          <MetaRow left="Fig. 04 - Where the dollars come from" right="Four sources" />
          <div className="mt-6 grid border-y border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-4">
            {roiTiles.map(([label, stat, body], index) => (
              <div key={label} className={`flex min-h-[240px] flex-col justify-between gap-6 border-[var(--color-rule)] p-7 ${fourCardBorderClass(index, roiTiles.length)}`}>
                <span className="eyebrow text-ink-2">{label}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="serif text-[30px] leading-[34px]">{stat}</h3>
                  <p className="text-[13px] leading-[20px] text-ink-2">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal className="mt-10 flex flex-col gap-2 border border-[var(--color-rule)] p-7">
          <span className="eyebrow text-ink-2">Read this before quoting the numbers</span>
          <p className="max-w-[900px] text-[15px] leading-[24px] text-ink">
            These are targets, not promises. Baseline stats are captured before work begins, the same numbers are measured after, and the results come back to this board. We judge against yesterday, not against the pitch.
          </p>
        </Reveal>
      </section>

      <section id="risk" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[130px]">
        <MetaRow left="§ 05 - Risk, contained" right="Four containment walls" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[700px] text-[44px] leading-[48px] md:text-[64px] md:leading-[66px]">
              Built so a cautious yes is still a yes.
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] text-[15px] leading-[24px] text-ink-2">
            The budget is tight and the operating agreement is clear. This structure respects both: small steps, each one reviewed, nothing bought sight unseen.
          </Reveal>
        </div>
        <Reveal className="grid gap-0 border-t border-[var(--color-rule)] sm:grid-cols-2">
          {riskRows.map((note, index) => (
            <article key={note.num} className={`flex min-h-[230px] flex-col justify-between gap-8 border-[var(--color-rule)] p-7 ${index % 2 === 0 ? 'sm:border-r' : ''} ${index < riskRows.length - 2 ? 'border-b' : 'border-b sm:border-b-0'}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow text-ink-2">R / {note.num}</span>
                <span className="eyebrow text-ink-2">{note.label}</span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="serif text-[24px] leading-[29px]">{note.title}</h3>
                <p className="text-[13px] leading-[20px] text-ink-2">{note.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <section id="measure" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[130px]">
        <MetaRow left="§ 06 - How we will know" right="Baseline now, measured after" />
        <div className="grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <h2 className="display max-w-[700px] text-[44px] leading-[48px] md:text-[64px] md:leading-[66px]">
              Six numbers, reported back to this board.
            </h2>
          </Reveal>
          <Reveal className="max-w-[520px] text-[15px] leading-[24px] text-ink-2">
            Baseline franchisee stats are collected in week one, before anything changes. The same six numbers get measured after implementation. The comparison is the verdict.
          </Reveal>
        </div>
        <Reveal className="grid border-t border-l border-[var(--color-rule)] md:grid-cols-2 xl:grid-cols-3">
          {measurements.map(([num, title, body]) => (
            <article key={num} className="min-h-[170px] border-r border-b border-[var(--color-rule)] p-7">
              <span className="eyebrow text-ink-2">{num}</span>
              <h3 className="serif mt-6 text-[24px] leading-[29px]">{title}</h3>
              <p className="mt-3 text-[13px] leading-[20px] text-ink-2">{body}</p>
            </article>
          ))}
        </Reveal>
      </section>

      <section id="decision" className="border-b border-[var(--color-rule)] px-6 py-24 md:px-16 lg:px-[120px] lg:py-[130px]">
        <MetaRow left="§ 07 - Timeline and decision" right="Three weeks to the next checkpoint" />
        <Reveal className="grid border-t border-l border-[var(--color-rule)] mt-16 md:grid-cols-4">
          {timelineCols.map(([week, title, items]) => (
            <article key={week} className="min-h-[250px] border-r border-b border-[var(--color-rule)] p-7">
              <span className="eyebrow text-ink-2">{week}</span>
              <h3 className="serif mt-5 text-[26px] leading-[31px]">{title}</h3>
              <div className="mt-6 flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item} className="border-t border-ink/15 pt-3 text-[13px] leading-[19px] text-ink-2">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          ))}
          <article className="min-h-[250px] border-r border-b border-[var(--color-rule)] bg-ink p-7 text-paper">
            <span className="eyebrow text-paper/55">Then</span>
            <h3 className="serif mt-5 text-[26px] leading-[31px]">Board checkpoint</h3>
            <p className="mt-6 text-[13px] leading-[20px] text-paper/70">
              Prototype demo to this board. The build decision gets made with the thing in hand and a firm quote beside it.
            </p>
          </article>
        </Reveal>
      </section>

      <section className="bg-ink px-6 py-24 text-paper md:px-16 lg:px-[120px] lg:py-[130px]">
        <MetaRow left="§ 08 - Decision requested" right="Phases 1 and 2" dark />
        <Reveal className="border-t border-paper/20 pt-14">
          <h2 className="display max-w-[1180px] text-[46px] leading-[52px] md:text-[80px] md:leading-[84px] lg:text-[104px] lg:leading-[102px]">
            Approve Phases 1 and 2.
          </h2>
        </Reveal>
        <div className="grid gap-10 pt-14 lg:grid-cols-[1fr_400px]">
          <Reveal className="max-w-[560px] text-[15px] leading-[24px] text-paper/70">
            $12,000. Three weeks. Baseline captured before, results measured after, and every later dollar gated by this board. If the prototype does not earn the next phase, it does not get it.
          </Reveal>
          <Reveal className="flex flex-col gap-4">
            <span className="eyebrow text-paper/55">For the full detail</span>
            <a href={fullProposalHref} className="inline-flex min-h-11 items-center justify-center rounded-full bg-paper px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-paper/85 whitespace-nowrap">
              {'Read the full proposal ->'}
            </a>
            <p className="text-[13px] leading-[20px] text-paper/60">Scope, deliverables, timeline, and investment, line by line.</p>
          </Reveal>
        </div>
      </section>

      <footer className="flex flex-col gap-4 border-t border-[var(--color-rule)] px-6 py-6 md:flex-row md:items-center md:justify-between md:px-16">
        <div className="flex flex-wrap items-center gap-4">
          <span className="eyebrow font-medium text-ink">Hike Doggie</span>
          <span className="hidden h-[10px] w-px bg-[var(--color-rule)] sm:block" />
          <span className="eyebrow text-ink-2">Board overview · SOP Training App</span>
          <span className="eyebrow text-ink-2">v1 - July 2026</span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span className="eyebrow text-ink-2">Prepared with Anchovies</span>
          <span className="eyebrow text-ink-2">Confidential</span>
          <span className="eyebrow text-ink">- end -</span>
        </div>
      </footer>
    </main>
  )
}
