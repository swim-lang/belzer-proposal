import { Redis } from '@upstash/redis'

export const config = { runtime: 'edge' }

const DRAFT_KEY = 'anchovies:belzer:draft'

function redisOrNull(): Redis | null {
  try {
    // Redis.fromEnv() reads KV_REST_API_URL + KV_REST_API_TOKEN
    // (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
    if (
      !process.env.KV_REST_API_URL &&
      !process.env.UPSTASH_REDIS_REST_URL
    ) {
      return null
    }
    return Redis.fromEnv()
  } catch {
    return null
  }
}

function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'content-type': 'application/json', ...(init.headers ?? {}) },
  })
}

export default async function handler(req: Request): Promise<Response> {
  const redis = redisOrNull()

  if (req.method === 'GET') {
    if (!redis) return jsonResponse({ draft: null, configured: false }, { status: 200 })
    try {
      const draft = await redis.get(DRAFT_KEY)
      const updatedAt = await redis.get(`${DRAFT_KEY}:updatedAt`)
      return jsonResponse({ draft: draft ?? null, updatedAt: updatedAt ?? null, configured: true })
    } catch (err) {
      return jsonResponse(
        { error: 'Failed to read from store', details: String(err), configured: false },
        { status: 503 }
      )
    }
  }

  if (req.method === 'PUT') {
    const pin = req.headers.get('x-admin-pin')
    const expected = process.env.ADMIN_PIN
    if (!expected) {
      return jsonResponse(
        { error: 'ADMIN_PIN not configured on server' },
        { status: 503 }
      )
    }
    if (!pin || pin !== expected) {
      return jsonResponse({ error: 'Invalid pin' }, { status: 401 })
    }
    if (!redis) {
      return jsonResponse(
        { error: 'KV not configured on server', configured: false },
        { status: 503 }
      )
    }
    try {
      const body = await req.json()
      await redis.set(DRAFT_KEY, body)
      const ts = new Date().toISOString()
      await redis.set(`${DRAFT_KEY}:updatedAt`, ts)
      return jsonResponse({ ok: true, updatedAt: ts })
    } catch (err) {
      return jsonResponse(
        { error: 'Failed to write to store', details: String(err) },
        { status: 503 }
      )
    }
  }

  if (req.method === 'DELETE') {
    const pin = req.headers.get('x-admin-pin')
    const expected = process.env.ADMIN_PIN
    if (!pin || pin !== expected) {
      return jsonResponse({ error: 'Invalid pin' }, { status: 401 })
    }
    if (!redis) {
      return jsonResponse({ error: 'KV not configured', configured: false }, { status: 503 })
    }
    try {
      await redis.del(DRAFT_KEY)
      await redis.del(`${DRAFT_KEY}:updatedAt`)
      return jsonResponse({ ok: true })
    } catch (err) {
      return jsonResponse(
        { error: 'Failed to delete', details: String(err) },
        { status: 503 }
      )
    }
  }

  return new Response('Method not allowed', { status: 405 })
}
