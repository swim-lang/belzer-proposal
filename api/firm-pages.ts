import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export const config = { runtime: 'edge' }

declare const process: { env: Record<string, string | undefined> }

type FirmPage = {
  id: string
  firmName: string
  slug: string
  url: string
  status: 'active'
  template: 'preMeeting'
  createdAt: string
  updatedAt: string
}

type FirmPageRow = {
  id: string
  firm_name: string
  slug: string
  url: string
  status: 'active'
  template: 'preMeeting'
  created_at: string
  updated_at: string
}

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: { 'content-type': 'application/json', ...(init.headers ?? {}) },
  })
}

function supabaseOrError(): SupabaseClient | Response {
  const url = process.env.SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_KEY

  if (!url || !key) {
    return json(
      {
        error: 'Supabase not configured',
        configured: false,
        required: ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'],
      },
      { status: 503 }
    )
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

function requireAdmin(req: Request, url: URL): Response | null {
  const pin = req.headers.get('x-admin-pin') ?? url.searchParams.get('pin')
  const expected = process.env.ADMIN_PIN
  if (!expected) return json({ error: 'ADMIN_PIN not configured' }, { status: 503 })
  if (!pin || pin !== expected) return json({ error: 'Invalid pin' }, { status: 401 })
  return null
}

function slugify(input: string): string {
  const slug = input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return slug || 'firm'
}

function rowToPage(row: FirmPageRow): FirmPage {
  return {
    id: row.id,
    firmName: row.firm_name,
    slug: row.slug,
    url: row.url,
    status: row.status,
    template: row.template,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

async function uniqueSlug(supabase: SupabaseClient, firmName: string): Promise<string> {
  const base = slugify(firmName)
  for (let i = 0; i < 100; i += 1) {
    const candidate = i === 0 ? base : `${base}-${i + 1}`
    const { data, error } = await supabase
      .from('firm_pages')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle()

    if (error) throw error
    if (!data) return candidate
  }
  return `${base}-${Math.random().toString(36).slice(2, 6)}`
}

export default async function handler(req: Request): Promise<Response> {
  const supabaseOrResponse = supabaseOrError()
  const url = new URL(req.url)

  if (supabaseOrResponse instanceof Response) return supabaseOrResponse
  const supabase = supabaseOrResponse

  if (req.method === 'GET') {
    const slug = url.searchParams.get('slug')
    if (slug) {
      const { data, error } = await supabase
        .from('firm_pages')
        .select('id, firm_name, slug, url, status, template, created_at, updated_at')
        .eq('slug', slug)
        .eq('status', 'active')
        .maybeSingle<FirmPageRow>()

      if (error) return json({ error: 'Failed to read page', details: error.message }, { status: 503 })
      if (!data) return json({ error: 'Not found' }, { status: 404 })
      return json({ page: rowToPage(data) })
    }

    const adminError = requireAdmin(req, url)
    if (adminError) return adminError

    const { data, error } = await supabase
      .from('firm_pages')
      .select('id, firm_name, slug, url, status, template, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(100)
      .returns<FirmPageRow[]>()

    if (error) return json({ error: 'Failed to list pages', details: error.message }, { status: 503 })
    return json({ pages: (data ?? []).map(rowToPage) })
  }

  if (req.method === 'POST') {
    const adminError = requireAdmin(req, url)
    if (adminError) return adminError

    let body: Record<string, unknown> | null = null
    try {
      body = (await req.json()) as Record<string, unknown>
    } catch {
      return json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const firmName = typeof body?.firmName === 'string' ? body.firmName.trim() : ''
    if (!firmName) return json({ error: 'firmName required' }, { status: 400 })

    try {
      const slug = await uniqueSlug(supabase, firmName)
      const urlPath = `/firm/${slug}`
      const { data, error } = await supabase
        .from('firm_pages')
        .insert({
          firm_name: firmName,
          slug,
          url: urlPath,
          status: 'active',
          template: 'preMeeting',
        })
        .select('id, firm_name, slug, url, status, template, created_at, updated_at')
        .single<FirmPageRow>()

      if (error) return json({ error: 'Failed to create page', details: error.message }, { status: 503 })
      return json({ page: rowToPage(data) }, { status: 201 })
    } catch (err) {
      return json({ error: 'Failed to create page', details: String(err) }, { status: 503 })
    }
  }

  return new Response('Method not allowed', { status: 405 })
}
