import { Redis } from '@upstash/redis'

export const config = { runtime: 'edge' }

const INDEX_KEY = 'anchovies:belzer:intake:index'
const ITEM_PREFIX = 'anchovies:belzer:intake:item:'

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
    if (!redis) {
      // Accept but warn — intake page handles 503 and shows thank-you anyway
      return json({ error: 'KV not configured', configured: false }, { status: 503 })
    }
    let body: Record<string, unknown> | null = null
    try {
      body = (await req.json()) as Record<string, unknown>
    } catch {
      return json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (!body || typeof body !== 'object') return json({ error: 'Invalid body' }, { status: 400 })
    const id = newId()
    const submission = { id, ...body }
    try {
      await redis.set(`${ITEM_PREFIX}${id}`, submission)
      // Append to index (newest-first by storing as list with LPUSH + TRIM for safety)
      await redis.lpush(INDEX_KEY, id)
      await redis.ltrim(INDEX_KEY, 0, 499) // keep most recent 500
      return json({ ok: true, id })
    } catch (err) {
      return json({ error: 'Failed to persist', details: String(err) }, { status: 503 })
    }
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
