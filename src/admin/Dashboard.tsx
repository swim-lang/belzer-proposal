import { useEffect, useState, type FormEvent } from 'react'
import { absolutePageUrl, createLocalFirmPage, readLocalFirmPages, slugifyFirmName, type FirmPage } from '../firmPages'
import { useContent, useContentControl } from '../context/ContentContext'
import type { Submission } from '../intake/types'
import { navigate } from './AdminChrome'
import { kndContent } from '../kndContent'

type Proposal = {
  id: string
  name: string
  tagline: string
  status: 'Active' | 'Draft' | 'Archived'
  href: string
  editable?: boolean
  intakeHref?: string
  lastEdited?: string | null
  submissionCount?: number
}

function formatRelative(iso?: string | null): string {
  if (!iso) return '—'
  const then = Date.parse(iso)
  if (!Number.isFinite(then)) return '—'
  const diff = Date.now() - then
  const mins = Math.round(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs} hr ago`
  const days = Math.round(hrs / 24)
  if (days < 30) return `${days} d ago`
  return new Date(iso).toLocaleDateString()
}

export function Dashboard() {
  const { client, proposal } = useContent()
  const { pin, syncStatus } = useContentControl()
  const [submissions, setSubmissions] = useState<Submission[] | null>(null)
  const [loadErr, setLoadErr] = useState<string | null>(null)
  const [firmName, setFirmName] = useState('Example Law')
  const [firmPages, setFirmPages] = useState<FirmPage[]>(() => readLocalFirmPages())
  const [pageErr, setPageErr] = useState<string | null>(null)
  const [creatingPage, setCreatingPage] = useState(false)
  const [createStatus, setCreateStatus] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      if (!pin) {
        setSubmissions([])
        return
      }
      try {
        const res = await fetch('/api/intake', { headers: { 'x-admin-pin': pin }, cache: 'no-store' })
        if (res.status === 503) {
          setLoadErr('Shared store not configured yet')
          setSubmissions([])
          return
        }
        if (!res.ok) {
          setLoadErr(`Couldn't fetch submissions (HTTP ${res.status})`)
          setSubmissions([])
          return
        }
        const data = (await res.json()) as { submissions: Submission[] }
        setSubmissions(data.submissions ?? [])
      } catch {
        // Most common case in dev: Vite returns the .ts source for /api/intake
        // because serverless functions only run in Vercel. Don't alarm the user.
        setSubmissions([])
      }
    })()
  }, [pin])

  useEffect(() => {
    ;(async () => {
      if (!pin) {
        setFirmPages(readLocalFirmPages())
        return
      }
      try {
        const res = await fetch('/api/firm-pages', { headers: { 'x-admin-pin': pin }, cache: 'no-store' })
        const contentType = res.headers.get('content-type') ?? ''
        if (!contentType.includes('application/json')) {
          setPageErr('Supabase firm-page API is not available in this local preview. Use a Vercel preview or production deploy to test saved backend pages.')
          setFirmPages(readLocalFirmPages())
          return
        }
        if (res.status === 503) {
          setPageErr('Supabase firm-page backend is not configured yet. Add the Supabase env vars in Vercel before sending saved links.')
          setFirmPages(readLocalFirmPages())
          return
        }
        if (!res.ok) {
          setPageErr(`Couldn't fetch saved pages (HTTP ${res.status})`)
          setFirmPages(readLocalFirmPages())
          return
        }
        const data = (await res.json()) as { pages: FirmPage[] }
        setPageErr(null)
        setFirmPages(data.pages ?? [])
      } catch {
        setPageErr('Supabase firm-page API is not available in this local preview. Use a Vercel preview or production deploy to test saved backend pages.')
        setFirmPages(readLocalFirmPages())
      }
    })()
  }, [pin])

  const lastEdited =
    syncStatus.kind === 'saved'
      ? syncStatus.updatedAt
      : syncStatus.kind === 'ready'
      ? syncStatus.updatedAt
      : null

  const proposals: Proposal[] = [
    {
      id: proposal.id || 'belzer',
      name: client.name,
      tagline: `${proposal.kind} · ${client.location}`,
      status: 'Active',
      href: `/proposal/${proposal.id || 'belzer'}`,
      editable: true,
      intakeHref: '/intake',
      lastEdited,
      submissionCount: submissions?.filter((s) => (s.client || '') === client.name).length ?? undefined,
    },
    {
      id: kndContent.proposal.id,
      name: kndContent.client.name,
      tagline: `${kndContent.proposal.kind} · ${kndContent.client.location}`,
      status: 'Active',
      href: '/proposal/knd',
    },
    {
      id: 'sleep-like-a-goddess',
      name: 'Sleep Like a Goddess',
      tagline: 'Brand system refinement · May 2026',
      status: 'Active',
      href: '/proposal/sleep-like-a-goddess',
    },
    {
      id: 'soft-hours',
      name: 'Soft Hours',
      tagline: 'Shopify completion · June 2026',
      status: 'Active',
      href: '/proposal/soft-hours',
    },
    {
      id: 'humanaai',
      name: 'HumanaAI',
      tagline: 'Brand, site, deck, and app concept · May 2026',
      status: 'Active',
      href: '/proposal/humanaai',
    },
    {
      id: 'lapinco',
      name: 'Lapinco',
      tagline: 'Brand, messaging, site, and portal readiness · May 2026',
      status: 'Active',
      href: '/proposal/lapinco',
    },
    {
      id: 'baps-charities',
      name: 'BAPS Charities',
      tagline: 'Website system and donation experience · May 2026',
      status: 'Active',
      href: '/proposal/baps-charities',
    },
    {
      id: 'soup-to-software',
      name: 'Soup to Software',
      tagline: 'Strategy, identity, narrative, and site · May 2026',
      status: 'Active',
      href: '/proposal/soup-to-software',
    },
    {
      id: 'fiber-soft-chew',
      name: 'Fiber Soft Chew',
      tagline: 'Naming and brand identity · May 2026',
      status: 'Active',
      href: '/proposal/fiber-soft-chew',
    },
    {
      id: 'gary-springstead',
      name: 'Gary Springstead',
      tagline: 'Brand, identity, narrative, and website · June 2026',
      status: 'Active',
      href: '/proposal/gary-springstead',
    },
    {
      id: 'wildflower-blanc',
      name: 'Wildflower + Blanc',
      tagline: 'Dual brand identity · June 2026',
      status: 'Active',
      href: '/proposal/wildflower-blanc',
    },
  ]

  const recent = (submissions ?? []).slice(0, 5)
  const trimmedFirm = firmName.trim()
  const previewPath = `/firm/${slugifyFirmName(trimmedFirm || 'Example Law')}`

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(absolutePageUrl(url))
      setCopyStatus('Copied')
      window.setTimeout(() => setCopyStatus(null), 1800)
    } catch {
      setCopyStatus('Copy failed')
    }
  }

  const createFirmPage = async (event: FormEvent) => {
    event.preventDefault()
    const name = firmName.trim()
    if (!name || creatingPage) return

    setCreatingPage(true)
    setCreateStatus(null)
    try {
      const res = await fetch('/api/firm-pages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(pin ? { 'x-admin-pin': pin } : {}),
        },
        body: JSON.stringify({ firmName: name }),
      })
      const contentType = res.headers.get('content-type') ?? ''
      if (!contentType.includes('application/json')) throw new Error('Backend unavailable in local preview')
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = (await res.json()) as { page: FirmPage }
      setFirmPages((pages) => [data.page, ...pages.filter((page) => page.id !== data.page.id)])
      setPageErr(null)
      setCreateStatus(`Created ${data.page.url}`)
    } catch {
      const page = createLocalFirmPage(name)
      setFirmPages(readLocalFirmPages())
      setPageErr('Local preview page created for UI testing. Production firm pages will save to Supabase once the Vercel env vars are configured.')
      setCreateStatus(`Created preview ${page.url}`)
    } finally {
      setCreatingPage(false)
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-10 md:py-14 flex flex-col gap-14">
        {/* Hero row */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Good to see you, Sean</span>
          </div>
          <h1 className="serif text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] tracking-[-0.02em]">
            {proposals.length} live proposal{proposals.length === 1 ? '' : 's'} in your workspace.
          </h1>
          <p className="text-[14px] leading-[22px] text-ink-2 max-w-[560px]">
            Open live proposals, create pre-meeting firm pages, or jump straight to the latest submissions.
          </p>
        </div>

        {/* Proposals */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">All proposals</span>
            <button
              type="button"
              disabled
              title="Coming soon — duplicating from template"
              className="px-3 py-1.5 border border-dashed border-[var(--color-rule)]/30 rounded-full text-[11px] text-ink-2/60 cursor-not-allowed"
            >
              + New proposal
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposals.map((p) => (
              <div
                key={p.id}
                className="flex flex-col justify-between gap-6 p-5 md:p-6 bg-white border border-[var(--color-rule)]/20 rounded-[14px] transition-colors hover:border-ink"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">
                      {p.id}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(30, 63, 229, 0.08)',
                        color: 'var(--color-mac)',
                      }}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h3 className="serif text-[26px] md:text-[30px] leading-[32px] md:leading-[36px] tracking-[-0.015em]">
                    {p.name}
                  </h3>
                  <p className="text-[12px] leading-[18px] text-ink-2">{p.tagline}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--color-rule)]/15">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Submissions</span>
                      <span className="serif text-[20px] leading-[24px]">
                        {p.submissionCount ?? '—'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Last edited</span>
                      <span className="text-[13px]">{formatRelative(p.lastEdited)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.editable ? (
                      <button
                        type="button"
                        onClick={() => navigate('editor')}
                        className="px-3 py-1.5 rounded-full text-[12px] font-medium text-paper transition-colors"
                        style={{ backgroundColor: 'var(--color-mac)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
                      >
                        Open editor →
                      </button>
                    ) : null}
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-[var(--color-rule)]/25 hover:border-ink rounded-full text-[12px] text-ink-2 hover:text-ink transition-colors"
                    >
                      Open live site ↗
                    </a>
                    {p.intakeHref ? (
                      <a
                        href={p.intakeHref}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 border border-[var(--color-rule)]/25 hover:border-ink rounded-full text-[12px] text-ink-2 hover:text-ink transition-colors"
                      >
                        Open intake ↗
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pre-meeting saved pages */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Create pre-meeting firm page</span>
            <span className="text-[11px] text-ink-2">Saved URL</span>
          </div>
          <form
            onSubmit={createFirmPage}
            className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-4 p-5 md:p-6 bg-white border border-[var(--color-rule)]/20 rounded-[14px]"
          >
            <label className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Firm name</span>
              <input
                type="text"
                value={firmName}
                onChange={(e) => setFirmName(e.target.value)}
                placeholder="Example Law"
                className="serif text-[20px] px-4 py-3 bg-paper border border-[var(--color-rule)]/25 focus:border-ink outline-none rounded-[10px] transition-colors"
              />
            </label>
            <div className="flex flex-col gap-3 min-w-0">
              <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">Next URL</span>
              <div className="px-4 py-3 bg-paper border border-[var(--color-rule)]/20 rounded-[10px] text-[12px] leading-[18px] text-ink-2 break-all">
                {absolutePageUrl(previewPath)}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="submit"
                  disabled={!trimmedFirm || creatingPage}
                  className="px-3 py-1.5 rounded-full text-[12px] font-medium text-paper transition-colors disabled:opacity-45 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--color-mac)' }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-mac)'
                  }}
                >
                  {creatingPage ? 'Creating…' : 'Create saved page'}
                </button>
                {createStatus && <span className="text-[11px] text-ink-2">{createStatus}</span>}
              </div>
            </div>
          </form>

          {pageErr && (
            <div className="text-[12px] text-[#8a5a00] p-3 border border-[#8a5a00]/25 rounded-md bg-[#8a5a00]/5">
              {pageErr}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Saved pre-meeting pages</span>
              {copyStatus && <span className="text-[11px] text-ink-2">{copyStatus}</span>}
            </div>
            {firmPages.length === 0 ? (
              <div className="text-[12px] text-ink-2 p-4 border border-dashed border-[var(--color-rule)]/25 rounded-md">
                No saved pre-meeting pages yet. Create one above to generate a shareable firm URL.
              </div>
            ) : (
              <div className="flex flex-col border-t border-[var(--color-rule)]/15">
                {firmPages.map((page, index) => (
                  <div
                    key={page.id}
                    className={`flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-3 py-4 ${
                      index < firmPages.length - 1 ? 'border-b border-[var(--color-rule)]/15' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="serif text-[22px] leading-[26px]">{page.firmName}</span>
                        <span className="text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-full bg-ink/[0.04] text-ink-2">
                          {page.status}
                        </span>
                      </div>
                      <span className="text-[11px] leading-[16px] text-ink-2 break-all">
                        {absolutePageUrl(page.url)}
                      </span>
                      <span className="text-[10px] tracking-[0.08em] uppercase text-ink-2/70">
                        Created {formatRelative(page.createdAt)} · Updated {formatRelative(page.updatedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-full text-[12px] font-medium text-paper transition-colors"
                        style={{ backgroundColor: 'var(--color-mac)' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
                      >
                        Open page ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => copyUrl(page.url)}
                        className="px-3 py-1.5 border border-[var(--color-rule)]/25 hover:border-ink rounded-full text-[12px] text-ink-2 hover:text-ink transition-colors"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Recent submissions */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Recent submissions</span>
            <button
              type="button"
              onClick={() => navigate('submissions')}
              className="text-[12px] text-ink-2 hover:text-ink transition-colors"
            >
              View all →
            </button>
          </div>
          {loadErr && (
            <div className="text-[12px] text-[#b94a48] p-3 border border-[#b94a48]/30 rounded-md bg-[#b94a48]/5">
              {loadErr}
            </div>
          )}
          {submissions && submissions.length === 0 && !loadErr && (
            <div className="text-[12px] text-ink-2 p-4 border border-dashed border-[var(--color-rule)]/25 rounded-md">
              No submissions yet. When someone completes{' '}
              <code className="font-mono text-[11px]">/intake</code>, they'll show up here.
            </div>
          )}
          {recent.length > 0 && (
            <div className="flex flex-col border-t border-[var(--color-rule)]/15">
              {recent.map((s, i) => {
                const name = (s.contactName as string | undefined) || 'Anonymous'
                const email = (s.contactEmail as string | undefined) || ''
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => navigate('submissions')}
                    className={`text-left flex items-center justify-between gap-4 px-3 py-3 hover:bg-ink/[0.03] transition-colors ${
                      i < recent.length - 1 ? 'border-b border-[var(--color-rule)]/15' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[14px] truncate">{name}</span>
                      <span className="text-[11px] text-ink-2 truncate">
                        {s.client}
                        {email ? ` · ${email}` : ''}
                      </span>
                    </div>
                    <span className="text-[11px] text-ink-2 whitespace-nowrap">
                      {formatRelative(s.submittedAt)}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
