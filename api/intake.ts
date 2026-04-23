import { Redis } from '@upstash/redis'
import { renderEmail } from './_email'

export const config = { runtime: 'edge' }

const INDEX_KEY = 'anchovies:belzer:intake:index'
const ITEM_PREFIX = 'anchovies:belzer:intake:item:'

async function sendViaResend(input: {
  from: string
  to: string
  replyTo?: string
  subject: string
  html: string
  text: string
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY
  if (!key) return { ok: false, error: 'RESEND_API_KEY not configured' }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        reply_to: input.replyTo,
        subject: input.subject,
        html: input.html,
        text: input.text,
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

export default async function handler(req: Request): Promise<Response> {
  const redis = redisOrNull()
  const url = new URL(req.url)

  if (req.method === 'POST') {
    let body: Record<string, unknown> | null = null
    try {
      body = (await req.json()) as Record<string, unknown>
    } catch {
      return json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, { status: 400 })

    const id = newId()
    const submission = { id, ...body }

    // 1. Persist to KV if configured
    let saved = false
    if (redis) {
      try {
        await redis.set(`${ITEM_PREFIX}${id}`, submission)
        await redis.lpush(INDEX_KEY, id)
        await redis.ltrim(INDEX_KEY, 0, 499)
        saved = true
      } catch {
        /* continue; email may still succeed */
      }
    }

    // 2. Send emails if Resend is configured
    const agencyEmail = (body.agencyEmail as string | undefined) ?? process.env.AGENCY_EMAIL ?? 'alexis@anchovies.agency'
    const contactEmail = body.contactEmail as string | undefined
    const contactName = body.contactName as string | undefined
    const clientName = (body.client as string | undefined) ?? 'Client'
    const FROM = process.env.EMAIL_FROM ?? 'Anchovies <onboarding@resend.dev>'

    const emailed: { agency?: boolean; client?: boolean; error?: string } = {}

    // Agency copy (always)
    {
      const payload = renderEmail({
        id,
        client: clientName,
        agencyName: 'Anchovies',
        contactName,
        contactEmail,
        startedAt: (body.startedAt as string) ?? new Date().toISOString(),
        submittedAt: (body.submittedAt as string) ?? new Date().toISOString(),
        durationSeconds: (body.durationSeconds as number) ?? 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        answers: (body.answers as any) ?? {},
        recipient: 'agency',
      })
      const r = await sendViaResend({
        from: FROM,
        to: agencyEmail,
        replyTo: contactEmail,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      })
      emailed.agency = r.ok
      if (!r.ok) emailed.error = r.error
    }

    // Client copy (if they gave us an email)
    if (contactEmail) {
      const payload = renderEmail({
        id,
        client: clientName,
        agencyName: 'Anchovies',
        contactName,
        contactEmail,
        startedAt: (body.startedAt as string) ?? new Date().toISOString(),
        submittedAt: (body.submittedAt as string) ?? new Date().toISOString(),
        durationSeconds: (body.durationSeconds as number) ?? 0,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        answers: (body.answers as any) ?? {},
        recipient: 'client',
      })
      const r = await sendViaResend({
        from: FROM,
        to: contactEmail,
        replyTo: agencyEmail,
        subject: payload.subject,
        html: payload.html,
        text: payload.text,
      })
      emailed.client = r.ok
      if (!r.ok && !emailed.error) emailed.error = r.error
    }

    // Report back — if nothing persisted AND nothing emailed, return 503 so the
    // client shows a "saved locally" warning. Otherwise 200.
    const anySuccess = saved || emailed.agency || emailed.client
    if (!anySuccess) {
      return json(
        { error: 'No backend configured', configured: { kv: !!redis, resend: !!process.env.RESEND_API_KEY } },
        { status: 503 }
      )
    }
    return json({ ok: true, id, saved, emailed })
  }

  // GET — admin-gated: list index (or single by ?id=)
  if (req.method === 'GET') {
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
        return json({ submission: item })
      }
      const ids = (await redis.lrange(INDEX_KEY, 0, 100)) as string[]
      if (!ids.length) return json({ submissions: [] })
      const pipeline = redis.pipeline()
      for (const sid of ids) pipeline.get(`${ITEM_PREFIX}${sid}`)
      const items = (await pipeline.exec()) as (Record<string, unknown> | null)[]
      const submissions = items.filter((x): x is Record<string, unknown> => !!x)
      return json({ submissions })
    } catch (err) {
      return json({ error: 'Failed to read', details: String(err) }, { status: 503 })
    }
  }

  if (req.method === 'DELETE') {
    const pin = req.headers.get('x-admin-pin')
    const expected = process.env.ADMIN_PIN
    if (!pin || pin !== expected) return json({ error: 'Invalid pin' }, { status: 401 })
    if (!redis) return json({ error: 'KV not configured' }, { status: 503 })
    const id = url.searchParams.get('id')
    if (!id) return json({ error: 'id required' }, { status: 400 })
    try {
      await redis.del(`${ITEM_PREFIX}${id}`)
      await redis.lrem(INDEX_KEY, 0, id)
      return json({ ok: true })
    } catch (err) {
      return json({ error: 'Failed to delete', details: String(err) }, { status: 503 })
    }
  }

  return new Response('Method not allowed', { status: 405 })
}
