import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { defaultContent, type Content } from '../content'

const STORAGE_KEY = 'anchovies-admin-content-v1'
const API_DRAFT = '/api/draft'

export type SyncStatus =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ready'; updatedAt: string | null; remote: boolean }
  | { kind: 'saving' }
  | { kind: 'saved'; updatedAt: string }
  | { kind: 'offline' }
  | { kind: 'error'; message: string }

type ContentControl = {
  content: Content
  setContent: (c: Content) => void
  updateField: (path: string, value: unknown) => void
  reset: () => Promise<void>
  exportJSON: () => string
  renameAcrossContent: (replacements: { from: string; to: string }[]) => number
  syncStatus: SyncStatus
  pullLatest: () => Promise<void>
  pin: string | null
}

const ContentContext = createContext<ContentControl | null>(null)

function deepClone<T>(v: T): T {
  if (typeof structuredClone === 'function') return structuredClone(v)
  return JSON.parse(JSON.stringify(v)) as T
}

function deepMerge<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
  const out = deepClone(base) as Record<string, unknown>
  for (const key of Object.keys(override)) {
    const b = out[key]
    const o = (override as Record<string, unknown>)[key]
    if (b && o && typeof b === 'object' && typeof o === 'object' && !Array.isArray(b) && !Array.isArray(o)) {
      out[key] = deepMerge(b as Record<string, unknown>, o as Record<string, unknown>)
    } else if (o !== undefined) {
      out[key] = o
    }
  }
  return out as T
}

function loadFromStorage(): Content | null {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<Content>
    return deepMerge(defaultContent, parsed)
  } catch {
    return null
  }
}

function getPinFromURL(): string | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search).get('pin')
  return p || null
}

export function ContentProvider({
  children,
  editable = false,
}: {
  children: ReactNode
  editable?: boolean
}) {
  const [content, setContentState] = useState<Content>(() =>
    editable ? loadFromStorage() ?? defaultContent : defaultContent
  )
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ kind: editable ? 'loading' : 'idle' })
  const pin = getPinFromURL()
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInitialLoad = useRef(true)

  // Pull the remote draft on mount (editable providers only)
  useEffect(() => {
    if (!editable) return
    let cancelled = false
    ;(async () => {
      setSyncStatus({ kind: 'loading' })
      try {
        const res = await fetch(API_DRAFT, { cache: 'no-store' })
        if (!res.ok) {
          if (cancelled) return
          setSyncStatus({ kind: 'offline' })
          return
        }
        const data = (await res.json()) as {
          draft: Partial<Content> | null
          updatedAt: string | null
          configured: boolean
        }
        if (cancelled) return
        if (!data.configured) {
          setSyncStatus({ kind: 'offline' })
          return
        }
        if (data.draft) {
          setContentState(deepMerge(defaultContent, data.draft))
        }
        setSyncStatus({ kind: 'ready', updatedAt: data.updatedAt, remote: true })
      } catch {
        if (cancelled) return
        setSyncStatus({ kind: 'offline' })
      } finally {
        // Allow subsequent edits to trigger saves
        setTimeout(() => {
          isInitialLoad.current = false
        }, 100)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [editable])

  // Persist locally + push remotely on change
  useEffect(() => {
    if (!editable) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch {
      /* noop */
    }
    if (isInitialLoad.current) return

    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(async () => {
      if (!pin) {
        setSyncStatus((s) => (s.kind === 'offline' ? s : { kind: 'error', message: 'Missing ?pin in URL — remote save disabled.' }))
        return
      }
      setSyncStatus({ kind: 'saving' })
      try {
        const res = await fetch(API_DRAFT, {
          method: 'PUT',
          headers: { 'content-type': 'application/json', 'x-admin-pin': pin },
          body: JSON.stringify(content),
        })
        if (res.status === 401) {
          setSyncStatus({ kind: 'error', message: 'PIN rejected by server' })
          return
        }
        if (res.status === 503) {
          setSyncStatus({ kind: 'offline' })
          return
        }
        if (!res.ok) {
          const text = await res.text().catch(() => '')
          setSyncStatus({ kind: 'error', message: text || `HTTP ${res.status}` })
          return
        }
        const data = (await res.json()) as { ok: boolean; updatedAt: string }
        setSyncStatus({ kind: 'saved', updatedAt: data.updatedAt })
      } catch (err) {
        setSyncStatus({ kind: 'error', message: String(err) })
      }
    }, 650)

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [content, editable, pin])

  const updateField = (path: string, value: unknown) => {
    setContentState((prev) => {
      const next = deepClone(prev) as Record<string, unknown>
      const keys = path.split('.')
      let target: Record<string, unknown> = next
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i]
        if (target[k] == null) target[k] = {}
        target = target[k] as Record<string, unknown>
      }
      target[keys[keys.length - 1]] = value
      return next as unknown as Content
    })
  }

  const reset = async () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
    setContentState(defaultContent)
    if (editable && pin) {
      try {
        await fetch(API_DRAFT, { method: 'DELETE', headers: { 'x-admin-pin': pin } })
      } catch {
        /* noop */
      }
    }
    setSyncStatus({ kind: 'ready', updatedAt: null, remote: true })
  }

  const pullLatest = async () => {
    setSyncStatus({ kind: 'loading' })
    try {
      const res = await fetch(API_DRAFT, { cache: 'no-store' })
      if (!res.ok) {
        setSyncStatus({ kind: 'offline' })
        return
      }
      const data = (await res.json()) as { draft: Partial<Content> | null; updatedAt: string | null; configured: boolean }
      if (!data.configured) {
        setSyncStatus({ kind: 'offline' })
        return
      }
      if (data.draft) {
        setContentState(deepMerge(defaultContent, data.draft))
      } else {
        setContentState(defaultContent)
      }
      setSyncStatus({ kind: 'ready', updatedAt: data.updatedAt, remote: true })
    } catch {
      setSyncStatus({ kind: 'offline' })
    }
  }

  const exportJSON = () => JSON.stringify(content, null, 2)

  const setContent = (c: Content) => setContentState(c)

  const renameAcrossContent = (replacements: { from: string; to: string }[]): number => {
    let count = 0
    const applyToString = (s: string): string => {
      let out = s
      for (const { from, to } of replacements) {
        if (!from || from === to) continue
        if (out.includes(from)) {
          count += out.split(from).length - 1
          out = out.split(from).join(to)
        }
      }
      return out
    }
    const walk = (v: unknown): unknown => {
      if (typeof v === 'string') return applyToString(v)
      if (Array.isArray(v)) return v.map(walk)
      if (v && typeof v === 'object') {
        const out: Record<string, unknown> = {}
        for (const k of Object.keys(v)) out[k] = walk((v as Record<string, unknown>)[k])
        return out
      }
      return v
    }
    setContentState((prev) => walk(prev) as Content)
    return count
  }

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        updateField,
        reset,
        exportJSON,
        renameAcrossContent,
        syncStatus,
        pullLatest,
        pin,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent(): Content {
  const ctx = useContext(ContentContext)
  return ctx ? ctx.content : defaultContent
}

export function useContentControl(): ContentControl {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContentControl must be used within ContentProvider')
  return ctx
}
