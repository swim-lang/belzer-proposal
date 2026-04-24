import { useEffect, useState } from 'react'
import { useContent, useContentControl } from '../context/ContentContext'
import type { Submission } from '../intake/types'
import { navigate } from './AdminChrome'

type Proposal = {
  id: string
  name: string
  tagline: string
  status: 'Active' | 'Draft' | 'Archived'
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

  const lastEdited =
    syncStatus.kind === 'saved'
      ? syncStatus.updatedAt
      : syncStatus.kind === 'ready'
      ? syncStatus.updatedAt
      : null

  // Single-client for now. Designed to accept more entries later.
  const proposals: Proposal[] = [
    {
      id: proposal.id || 'belzer',
      name: client.name,
      tagline: `${proposal.kind} · ${client.location}`,
      status: 'Active',
      lastEdited,
      submissionCount: submissions?.filter((s) => (s.client || '') === client.name).length ?? undefined,
    },
  ]

  const recent = (submissions ?? []).slice(0, 5)

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[1080px] mx-auto px-6 md:px-10 py-10 md:py-14 flex flex-col gap-14">
        {/* Hero row */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Good to see you, Andy</span>
          </div>
          <h1 className="serif text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] tracking-[-0.02em]">
            {submissions
              ? submissions.length === 0
                ? 'No intake submissions yet.'
                : `${submissions.length} intake submission${submissions.length === 1 ? '' : 's'} across your proposals.`
              : 'Loading your proposals…'}
          </h1>
          <p className="text-[14px] leading-[22px] text-ink-2 max-w-[520px]">
            Open a proposal to edit its content and see the live preview, or jump straight to the latest submissions.
          </p>
        </div>

        {/* Proposals */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Proposals</span>
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
                    <a
                      href="/"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-[var(--color-rule)]/25 hover:border-ink rounded-full text-[12px] text-ink-2 hover:text-ink transition-colors"
                    >
                      Open live site ↗
                    </a>
                    <a
                      href="/intake"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border border-[var(--color-rule)]/25 hover:border-ink rounded-full text-[12px] text-ink-2 hover:text-ink transition-colors"
                    >
                      Open intake ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
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
