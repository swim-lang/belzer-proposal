import { Redis } from '@upstash/redis'

export const config = { runtime: 'edge' }

const INDEX_KEY = 'anchovies:contracts:events:index'
const ITEM_PREFIX = 'anchovies:contracts:events:item:'

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

async function sendViaResend(event: ContractEvent): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, error: 'RESEND_API_KEY not configured' }

  const agencyEmail = process.env.AGENCY_EMAIL ?? 'alexis@anchovies.agency'
  const from = process.env.EMAIL_FROM ?? 'Anchovies <onboarding@resend.dev>'
  const subject = `Contract event: ${event.contractSlug} ${event.eventType}`
  const rows = [
    ['Event', event.eventType],
    ['Contract', event.contractSlug],
    ['Occurred', event.occurredAt],
    ['IP', event.ip],
    ['Signer', event.signerName || '-'],
    ['Title', event.signerTitle || '-'],
    ['Signed date', event.signedDate || '-'],
    ['Submitted', event.submittedAt || '-'],
    ['Consent accepted', event.consentAccepted ? 'Yes' : event.eventType === 'contract_signed' ? 'No' : '-'],
    ['Signature method', event.signatureMethod || '-'],
    [
      'Signature',
      event.signatureMethod === 'drawn'
        ? event.drawnSignatureDataUrl
          ? 'Drawn signature captured'
          : '-'
        : event.typedSignature || '-',
    ],
    ['Generated PDF', event.generatedAt || '-'],
    ['Signed copy saved', event.signedDocumentHtml ? 'Yes' : '-'],
    ['Page', event.pageUrl],
    ['Referer', event.referer || '-'],
    ['User agent', event.userAgent || '-'],
  ]

  const html = `
    <div style="font-family:Arial,sans-serif;color:#111;line-height:1.45">
      <h1 style="font-size:20px;margin:0 0 16px">Genesi contract event</h1>
      <table style="border-collapse:collapse;width:100%;max-width:760px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #ddd;padding:8px;font-weight:700;width:140px">${label}</td>
                <td style="border:1px solid #ddd;padding:8px">${value}</td>
              </tr>
            `
          )
          .join('')}
      </table>
    </div>
  `
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [agencyEmail],
        subject,
        html,
        text,
      }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      return { ok: false, error: `Resend ${res.status}: ${body.slice(0, 200)}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: String(err) }
  }
}

function redisOrNull(): Redis | null {
  try {
    if (!process.env.KV_REST_API_URL && !process.env.UPSTASH_REDIS_REST_URL) return null
    return Redis.fromEnv()
  } catch {
    return null
  }
}

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'content-type': 'application/json', ...(init.headers ?? {}) },
  })
}

function newId(): string {
  const ts = Date.now().toString(36)
  const rand = Math.random().toString(36).slice(2, 8)
  return `${ts}-${rand}`
}

function getIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return req.headers.get('x-real-ip') ?? req.headers.get('cf-connecting-ip') ?? 'unknown'
}

export default async function handler(req: Request): Promise<Response> {
  const redis = redisOrNull()

  if (req.method === 'GET') {
    const url = new URL(req.url)
    const pin = req.headers.get('x-admin-pin') ?? url.searchParams.get('pin')
    const expected = process.env.ADMIN_PIN
    if (!expected) return json({ error: 'ADMIN_PIN not configured' }, { status: 503 })
    if (!pin || pin !== expected) return json({ error: 'Invalid pin' }, { status: 401 })
    if (!redis) return json({ error: 'KV not configured', configured: false }, { status: 503 })

    const id = url.searchParams.get('id')
    try {
      if (id) {
        const item = await redis.get(`${ITEM_PREFIX}${id}`)
        if (!item) return json({ error: 'Not found' }, { status: 404 })
        return json({ event: item })
      }

      const ids = (await redis.lrange(INDEX_KEY, 0, 100)) as string[]
      if (!ids.length) return json({ events: [] })
      const pipeline = redis.pipeline()
      for (const eventId of ids) pipeline.get(`${ITEM_PREFIX}${eventId}`)
      const items = (await pipeline.exec()) as (Record<string, unknown> | null)[]
      return json({ events: items.filter((item): item is Record<string, unknown> => !!item) })
    } catch (err) {
      return json({ error: 'Failed to read contract events', details: String(err) }, { status: 503 })
    }
  }

  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  let body: Record<string, unknown> | null = null
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const contractSlug = typeof body?.contractSlug === 'string' ? body.contractSlug : ''
  const eventType = typeof body?.eventType === 'string' ? body.eventType : ''
  if (!contractSlug || !eventType) return json({ error: 'contractSlug and eventType required' }, { status: 400 })

  const id = newId()
  const event: ContractEvent = {
    id,
    contractSlug,
    eventType,
    occurredAt: new Date().toISOString(),
    ip: getIp(req),
    userAgent: req.headers.get('user-agent') ?? '',
    referer: req.headers.get('referer') ?? '',
    pageUrl: typeof body.pageUrl === 'string' ? body.pageUrl : '',
    signerName: typeof body.signerName === 'string' ? body.signerName : '',
    signerTitle: typeof body.signerTitle === 'string' ? body.signerTitle : '',
    signedDate: typeof body.signedDate === 'string' ? body.signedDate : '',
    submittedAt: typeof body.submittedAt === 'string' ? body.submittedAt : '',
    consentAccepted: body.consentAccepted === true,
    signatureMethod: typeof body.signatureMethod === 'string' ? body.signatureMethod : '',
    typedSignature: typeof body.typedSignature === 'string' ? body.typedSignature : '',
    drawnSignatureDataUrl: typeof body.drawnSignatureDataUrl === 'string' ? body.drawnSignatureDataUrl : '',
    generatedAt: typeof body.generatedAt === 'string' ? body.generatedAt : '',
    signedDocumentHtml: typeof body.signedDocumentHtml === 'string' ? body.signedDocumentHtml : '',
  }

  try {
    if (redis) {
      await redis.set(`${ITEM_PREFIX}${id}`, event)
      await redis.lpush(INDEX_KEY, id)
      await redis.ltrim(INDEX_KEY, 0, 499)
      return json({ ok: true, id, saved: true, emailed: false })
    }

    const emailed = await sendViaResend(event)
    if (emailed.ok) return json({ ok: true, id, saved: false, emailed: true })

    console.log('contract-event', event)
    return json({ ok: true, id, saved: false, emailed: false, logged: true, emailError: emailed.error })
  } catch (err) {
    const emailed = await sendViaResend(event)
    if (emailed.ok) return json({ ok: true, id, saved: false, emailed: true, storeError: String(err) })

    console.log('contract-event', event)
    return json({ ok: true, id, saved: false, emailed: false, logged: true, storeError: String(err), emailError: emailed.error })
  }
}
