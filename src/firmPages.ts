export type FirmPage = {
  id: string
  firmName: string
  slug: string
  url: string
  status: 'active'
  template: 'preMeeting'
  createdAt: string
  updatedAt: string
}

const LOCAL_KEY = 'anchovies-firm-pages-preview-v1'

export function firmPageUrl(slug: string) {
  return `/firm/${slug}`
}

export function absolutePageUrl(path: string) {
  if (typeof window === 'undefined') return path
  return `${window.location.origin}${path}`
}

export function slugifyFirmName(input: string) {
  const slug = input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return slug || 'firm'
}

export function readLocalFirmPages(): FirmPage[] {
  try {
    if (typeof window === 'undefined') return []
    const raw = window.localStorage.getItem(LOCAL_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isFirmPage)
  } catch {
    return []
  }
}

export function writeLocalFirmPages(pages: FirmPage[]) {
  try {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(pages))
  } catch {
    /* local preview is best-effort only */
  }
}

export function createLocalFirmPage(firmName: string): FirmPage {
  const pages = readLocalFirmPages()
  const base = slugifyFirmName(firmName)
  const existing = new Set(pages.map((page) => page.slug))
  let slug = base
  let index = 2
  while (existing.has(slug)) {
    slug = `${base}-${index}`
    index += 1
  }

  const now = new Date().toISOString()
  const page: FirmPage = {
    id: `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    firmName,
    slug,
    url: firmPageUrl(slug),
    status: 'active',
    template: 'preMeeting',
    createdAt: now,
    updatedAt: now,
  }
  writeLocalFirmPages([page, ...pages])
  return page
}

function isFirmPage(value: unknown): value is FirmPage {
  if (!value || typeof value !== 'object') return false
  const page = value as Record<string, unknown>
  return (
    typeof page.id === 'string' &&
    typeof page.firmName === 'string' &&
    typeof page.slug === 'string' &&
    typeof page.url === 'string' &&
    page.status === 'active' &&
    page.template === 'preMeeting' &&
    typeof page.createdAt === 'string' &&
    typeof page.updatedAt === 'string'
  )
}
