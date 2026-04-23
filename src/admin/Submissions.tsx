import { useEffect, useMemo, useState } from 'react'
import { questions } from '../intake/questions'
import type { Answer, Submission } from '../intake/types'

function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

function formatAnswer(a: Answer | undefined): string {
  if (!a) return '—'
  switch (a.type) {
    case 'multi': {
      const parts = [...a.selected]
      if (a.other?.trim()) parts.push(`Other: ${a.other.trim()}`)
      return parts.length ? parts.join(' · ') : '—'
    }
    case 'single': {
      const v = a.selected ?? (a.other?.trim() ? `Other: ${a.other.trim()}` : null)
      const fu = a.followUp?.trim() ? ` — ${a.followUp.trim()}` : ''
      return (v ?? '—') + fu
    }
    case 'rating':
      return a.value != null ? `${a.value} / 5` : '—'
    case 'text':
      return a.value.trim() || '—'
  }
}

function downloadJSON(obj: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function toCSV(subs: Submission[]): string {
  const cols = ['id', 'client', 'startedAt', 'submittedAt', 'durationSeconds', ...questions.map((q) => q.id)]
  const header = [...cols, 'qLabels'].slice(0, -1).join(',')
  const escape = (s: string) => {
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  const rows: string[] = [header]
  for (const s of subs) {
    const answers = (s.answers || {}) as Record<string, Answer>
    const row = [
      s.id,
      s.client,
      s.startedAt,
      s.submittedAt,
      String(s.durationSeconds ?? ''),
      ...questions.map((q) => formatAnswer(answers[q.id])),
    ]
    rows.push(row.map((v) => escape(String(v ?? ''))).join(','))
  }
  return rows.join('\n')
}

function downloadCSV(subs: Submission[], filename: string) {
  const blob = new Blob([toCSV(subs)], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function SubmissionDetail({
  sub,
  onClose,
}: {
  sub: Submission
  onClose: () => void
}) {
  const answers = (sub.answers || {}) as Record<string, Answer>
  return (
    <div className="fixed inset-0 z-[120] bg-ink/50 backdrop-blur-[2px] flex">
      <div
        onClick={onClose}
        className="flex-1"
        aria-hidden
      />
      <div className="w-full max-w-[720px] h-full bg-paper border-l border-[var(--color-rule)] overflow-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-6 py-4 border-b border-[var(--color-rule)]/20 bg-paper">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Submission</span>
            <span className="text-[13px] font-medium">{sub.client}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => downloadJSON(sub, `intake-${sub.id}.json`)}
              className="px-3 py-1.5 text-[11px] border border-[var(--color-rule)]/30 hover:border-ink rounded-full text-ink-2 hover:text-ink transition-colors"
            >
              Download JSON
            </button>
            <button type="button" onClick={onClose} className="text-[11px] text-ink-2 hover:text-ink transition-colors">
              Close ×
            </button>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-1 border-b border-[var(--color-rule)]/20">
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Meta</span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1 text-[12px]">
            <span className="text-ink-2">ID</span>
            <span className="font-mono">{sub.id}</span>
            <span className="text-ink-2">Started</span>
            <span>{formatDate(sub.startedAt)}</span>
            <span className="text-ink-2">Submitted</span>
            <span>{formatDate(sub.submittedAt)}</span>
            <span className="text-ink-2">Duration</span>
            <span>
              {Math.floor((sub.durationSeconds ?? 0) / 60)}m{' '}
              {String((sub.durationSeconds ?? 0) % 60).padStart(2, '0')}s
            </span>
          </div>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5">
          {questions.map((q) => (
            <div key={q.id} className="flex flex-col gap-1.5">
              <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">
                {q.id.toUpperCase()} · Section {q.section.num}
              </span>
              <span className="serif text-[17px] leading-[22px]">{q.title}</span>
              <span className="text-[13px] leading-[20px] text-ink whitespace-pre-wrap">
                {formatAnswer(answers[q.id])}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SubmissionsPanel({ pin }: { pin: string | null }) {
  const [loading, setLoading] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[] | null>(null)
  const [err, setErr] = useState<string | null>(null)
  const [open, setOpen] = useState<Submission | null>(null)

  const load = async () => {
    if (!pin) {
      setErr('Missing ?pin in URL.')
      return
    }
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch('/api/intake', { headers: { 'x-admin-pin': pin }, cache: 'no-store' })
      if (res.status === 401) {
        setErr('PIN rejected by server.')
        return
      }
      if (res.status === 503) {
        setErr('Backend not configured (KV + ADMIN_PIN).')
        setSubmissions([])
        return
      }
      if (!res.ok) {
        setErr(`HTTP ${res.status}`)
        return
      }
      const data = (await res.json()) as { submissions: Submission[] }
      setSubmissions(data.submissions ?? [])
    } catch (e) {
      setErr(String(e))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin])

  const sampleAnswer = (sub: Submission): string => {
    const answers = (sub.answers || {}) as Record<string, Answer>
    const q6 = answers['q6']
    if (q6 && q6.type === 'single' && q6.selected) return q6.selected
    return '—'
  }

  const hasAny = useMemo(() => (submissions?.length ?? 0) > 0, [submissions])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">
            {loading ? 'Loading…' : submissions ? `${submissions.length} submission${submissions.length === 1 ? '' : 's'}` : '—'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={load}
            className="px-2 py-1 text-[10px] text-ink-2 hover:text-ink transition-colors"
            title="Refresh"
          >
            ↻
          </button>
          <button
            type="button"
            disabled={!hasAny}
            onClick={() => submissions && downloadJSON(submissions, `intake-all-${Date.now()}.json`)}
            className="px-3 py-1.5 text-[11px] border border-[var(--color-rule)]/30 hover:border-ink rounded-full text-ink-2 hover:text-ink transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Export JSON
          </button>
          <button
            type="button"
            disabled={!hasAny}
            onClick={() => submissions && downloadCSV(submissions, `intake-all-${Date.now()}.csv`)}
            className="px-3 py-1.5 text-[11px] rounded-full text-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'var(--color-mac)' }}
          >
            Export CSV
          </button>
        </div>
      </div>

      {err && (
        <div className="text-[12px] text-[#b94a48] p-3 border border-[#b94a48]/30 rounded-md bg-[#b94a48]/5">
          {err}
        </div>
      )}

      {submissions && submissions.length === 0 && !err && (
        <div className="text-[12px] text-ink-2 p-4 border border-dashed border-[var(--color-rule)]/30 rounded-md">
          No submissions yet. The <code className="font-mono text-[11px]">/intake</code> form posts here
          when someone completes it.
        </div>
      )}

      <div className="flex flex-col">
        {submissions?.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setOpen(s)}
            className={`text-left flex flex-col gap-1.5 px-3 py-3 hover:bg-ink/[0.03] transition-colors ${
              i < submissions.length - 1 ? 'border-b border-[var(--color-rule)]/15' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] tracking-[0.04em] text-ink">
                {formatDate(s.submittedAt)}
              </span>
              <span className="text-[10px] tracking-[0.12em] uppercase text-ink-2">
                {Math.floor((s.durationSeconds ?? 0) / 60)}m{' '}
                {String((s.durationSeconds ?? 0) % 60).padStart(2, '0')}s
              </span>
            </div>
            <span className="serif text-[15px] leading-[20px] text-ink line-clamp-2">
              {sampleAnswer(s)}
            </span>
            <span className="font-mono text-[10px] text-ink-2">{s.id}</span>
          </button>
        ))}
      </div>

      {open && <SubmissionDetail sub={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
