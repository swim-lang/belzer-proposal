import { useEffect, useMemo, useState } from 'react'
import { useContentControl } from '../context/ContentContext'

type ContractEvent = {
  id: string
  contractSlug: string
  eventType: string
  occurredAt: string
  ip: string
  userAgent: string
  referer: string
  pageUrl: string
  signerName: string
  signerTitle: string
  signedDate: string
  submittedAt: string
  consentAccepted: boolean
  signatureMethod: string
  typedSignature: string
  drawnSignatureDataUrl: string
  generatedAt: string
  signedDocumentHtml: string
}

function formatDate(iso?: string): string {
  if (!iso) return '-'
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

function downloadText(text: string, filename: string, type = 'text/plain') {
  const blob = new Blob([text], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

async function downloadSignedPdf(event: ContractEvent) {
  const response = await fetch('/api/signed-contract-pdf', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      contractSlug: event.contractSlug,
      signedDocumentHtml: event.signedDocumentHtml,
    }),
  })
  if (!response.ok) throw new Error(`PDF generation failed with ${response.status}`)
  const url = URL.createObjectURL(await response.blob())
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `${event.contractSlug}-signed-contract.pdf`
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000)
}

function signedCopyDocument(event: ContractEvent): string {
  const body = event.signedDocumentHtml || `
    <article>
      <h1>Signed contract record</h1>
      <p><strong>Contract:</strong> ${event.contractSlug}</p>
      <p><strong>Signer:</strong> ${event.signerName}</p>
      <p><strong>Title:</strong> ${event.signerTitle}</p>
      <p><strong>Signed date:</strong> ${event.signedDate}</p>
      <p><strong>Submitted:</strong> ${event.submittedAt || event.occurredAt}</p>
      <p><strong>Signature method:</strong> ${event.signatureMethod}</p>
      ${event.drawnSignatureDataUrl ? `<img src="${event.drawnSignatureDataUrl}" alt="Client signature" style="max-width:260px;border-bottom:1px solid #111;padding-bottom:8px" />` : `<p style="font-family:Georgia,serif;font-size:32px">${event.typedSignature}</p>`}
    </article>
  `
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Signed Contract - ${event.contractSlug} - ${event.id}</title>
    <style>
      body { margin: 0; padding: 40px; background: #fff; color: #0a0a0a; font-family: Helvetica, Arial, sans-serif; }
      article { max-width: 860px; margin: 0 auto; font-size: 14px; line-height: 1.55; }
      h1, h2, h3 { font-family: Georgia, serif; font-weight: 400; }
      .contract-document { box-shadow: none !important; padding: 0 !important; }
      .signature-line { min-height: 52px; border-bottom: 1px solid #111; margin: 18px 0 10px; }
      .signature-script { display: flex; align-items: flex-end; font-family: Georgia, serif; font-size: 32px; line-height: 1; }
      .client-drawn-signature, .agency-signature-line img { width: min(260px, 100%); max-height: 52px; object-fit: contain; object-position: left bottom; }
      @media print { body { padding: 0.55in; } article { max-width: none; font-size: 9.6pt; line-height: 1.38; } }
    </style>
  </head>
  <body>${body}</body>
</html>`
}

function ContractEventDetail({
  event,
  onClose,
}: {
  event: ContractEvent
  onClose: () => void
}) {
  const html = signedCopyDocument(event)
  const [pdfError, setPdfError] = useState('')
  const [pdfLoading, setPdfLoading] = useState(false)
  const openSignedCopy = () => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
  }

  return (
    <div className="fixed inset-0 z-[120] flex bg-ink/50 backdrop-blur-[2px]">
      <button type="button" onClick={onClose} className="flex-1" aria-label="Close contract event" />
      <div className="h-full w-full max-w-[760px] overflow-auto border-l border-[var(--color-rule)] bg-paper">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-[var(--color-rule)]/20 bg-paper px-6 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] uppercase tracking-[0.12em] text-ink-2">Contract record</span>
            <span className="text-[13px] font-medium">{event.contractSlug} · {event.eventType}</span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {event.signedDocumentHtml && (
              <button
                type="button"
                disabled={pdfLoading}
                onClick={async () => {
                  setPdfLoading(true)
                  setPdfError('')
                  try {
                    await downloadSignedPdf(event)
                  } catch {
                    setPdfError('Could not generate PDF.')
                  } finally {
                    setPdfLoading(false)
                  }
                }}
                className="rounded-full border border-[var(--color-rule)]/30 px-3 py-1.5 text-[11px] text-ink-2 transition-colors hover:border-ink hover:text-ink disabled:cursor-wait disabled:opacity-50"
              >
                {pdfLoading ? 'Preparing PDF...' : 'Download signed PDF'}
              </button>
            )}
            <button type="button" onClick={openSignedCopy} className="rounded-full border border-[var(--color-rule)]/30 px-3 py-1.5 text-[11px] text-ink-2 transition-colors hover:border-ink hover:text-ink">
              Open signed copy
            </button>
            <button
              type="button"
              onClick={() => downloadText(html, `contract-${event.contractSlug}-${event.id}.html`, 'text/html')}
              className="rounded-full border border-[var(--color-rule)]/30 px-3 py-1.5 text-[11px] text-ink-2 transition-colors hover:border-ink hover:text-ink"
            >
              Download copy
            </button>
            <button type="button" onClick={onClose} className="text-[11px] text-ink-2 transition-colors hover:text-ink">
              Close x
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6 px-6 py-5">
          {pdfError && <p className="text-[12px] text-red-700">{pdfError}</p>}
          <section className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12px]">
            <span className="text-ink-2">ID</span>
            <span className="font-mono break-all">{event.id}</span>
            <span className="text-ink-2">Occurred</span>
            <span>{formatDate(event.occurredAt)}</span>
            <span className="text-ink-2">Submitted</span>
            <span>{formatDate(event.submittedAt)}</span>
            <span className="text-ink-2">Generated PDF</span>
            <span>{formatDate(event.generatedAt)}</span>
            <span className="text-ink-2">Signer</span>
            <span>{event.signerName || '-'}</span>
            <span className="text-ink-2">Title</span>
            <span>{event.signerTitle || '-'}</span>
            <span className="text-ink-2">Signed date</span>
            <span>{event.signedDate || '-'}</span>
            <span className="text-ink-2">Consent</span>
            <span>{event.consentAccepted ? 'Accepted' : '-'}</span>
            <span className="text-ink-2">IP</span>
            <span>{event.ip || '-'}</span>
            <span className="text-ink-2">Page</span>
            <span className="break-all">{event.pageUrl || '-'}</span>
          </section>

          <section className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.12em] text-ink-2">Signature</span>
            <div className="border border-[var(--color-rule)]/20 bg-white p-5">
              {event.signatureMethod === 'drawn' && event.drawnSignatureDataUrl ? (
                <img src={event.drawnSignatureDataUrl} alt={`${event.signerName} signature`} className="max-h-[90px] max-w-[320px] object-contain object-left" />
              ) : (
                <span className="serif text-[36px] leading-none">{event.typedSignature || '-'}</span>
              )}
            </div>
          </section>

          <button
            type="button"
            onClick={() => downloadText(JSON.stringify(event, null, 2), `contract-event-${event.id}.json`, 'application/json')}
            className="self-start rounded-full border border-[var(--color-rule)]/30 px-3 py-1.5 text-[11px] text-ink-2 transition-colors hover:border-ink hover:text-ink"
          >
            Download JSON
          </button>
        </div>
      </div>
    </div>
  )
}

export function ContractEventsView() {
  const { pin } = useContentControl()
  const [events, setEvents] = useState<ContractEvent[]>([])
  const [open, setOpen] = useState<ContractEvent | null>(null)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const load = async () => {
    if (!pin) {
      setErr('Not signed in.')
      return
    }
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch('/api/contract-events', { headers: { 'x-admin-pin': pin }, cache: 'no-store' })
      if (res.status === 401) {
        setErr('PIN rejected by server.')
        setEvents([])
        return
      }
      if (res.status === 503) {
        setErr('Contract backend is not configured yet. Add Supabase, KV/Upstash, and ADMIN_PIN in Vercel to save retrievable signed records.')
        setEvents([])
        return
      }
      if (!res.ok) {
        setErr(`Could not fetch contract records (HTTP ${res.status}).`)
        setEvents([])
        return
      }
      const data = (await res.json()) as { events: ContractEvent[] }
      setEvents(data.events ?? [])
    } catch {
      setErr('Contract records are only available from a Vercel preview or production deploy with the backend configured.')
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin])

  const signedCopies = useMemo(
    () => events.filter((event) => event.eventType === 'signed_pdf_generated' || event.eventType === 'contract_signed'),
    [events]
  )

  return (
    <div className="flex-1 overflow-auto">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-8 px-6 py-10 md:px-10 md:py-14">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--color-mac)' }} />
            <span className="text-[11px] uppercase tracking-[0.12em] text-ink-2">Contract signatures</span>
          </div>
          <h1 className="serif text-[40px] leading-[44px] tracking-[-0.02em] md:text-[56px] md:leading-[60px]">
            Signed contract records.
          </h1>
          <p className="max-w-[620px] text-[14px] leading-[22px] text-ink-2">
            Signed agreements and generated PDF snapshots land here once the contract backend is configured.
          </p>
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.12em] text-ink-2">
              {loading ? 'Loading...' : `${signedCopies.length} record${signedCopies.length === 1 ? '' : 's'}`}
            </span>
            <button type="button" onClick={load} className="text-[12px] text-ink-2 transition-colors hover:text-ink">
              Refresh
            </button>
          </div>

          {err && (
            <div className="rounded-md border border-[#b94a48]/30 bg-[#b94a48]/5 p-3 text-[12px] text-[#b94a48]">
              {err}
            </div>
          )}

          {!err && signedCopies.length === 0 && (
            <div className="rounded-md border border-dashed border-[var(--color-rule)]/30 p-4 text-[12px] text-ink-2">
              No signed contract records yet.
            </div>
          )}

          <div className="flex flex-col border-t border-[var(--color-rule)]/15">
            {signedCopies.map((event, index) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setOpen(event)}
                className={`flex flex-col gap-1.5 px-3 py-4 text-left transition-colors hover:bg-ink/[0.03] ${
                  index < signedCopies.length - 1 ? 'border-b border-[var(--color-rule)]/15' : ''
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="serif text-[20px] leading-[24px]">
                    {event.signerName || 'Unknown signer'}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.12em] text-ink-2">
                    {event.eventType.replaceAll('_', ' ')}
                  </span>
                </div>
                <span className="text-[12px] leading-[18px] text-ink-2">
                  {event.contractSlug} · {event.signerTitle || 'No title'} · {formatDate(event.generatedAt || event.submittedAt || event.occurredAt)}
                </span>
                <span className="font-mono text-[10px] text-ink-2">{event.id}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
      {open && <ContractEventDetail event={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
