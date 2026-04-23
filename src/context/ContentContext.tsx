import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { defaultContent, type Content } from '../content'

const STORAGE_KEY = 'anchovies-admin-content-v1'

type ContentControl = {
  content: Content
  setContent: (c: Content) => void
  updateField: (path: string, value: unknown) => void
  reset: () => void
  exportJSON: () => string
  renameAcrossContent: (replacements: { from: string; to: string }[]) => number
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

function loadFromStorage(): Content {
  try {
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (!raw) return defaultContent
    const parsed = JSON.parse(raw) as Partial<Content>
    return deepMerge(defaultContent, parsed)
  } catch {
    return defaultContent
  }
}

export function ContentProvider({
  children,
  editable = false,
}: {
  children: ReactNode
  editable?: boolean
}) {
  const [content, setContentState] = useState<Content>(() =>
    editable ? loadFromStorage() : defaultContent
  )

  useEffect(() => {
    if (!editable) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
    } catch {
      /* noop */
    }
  }, [content, editable])

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

  const reset = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* noop */
    }
    setContentState(defaultContent)
  }

  const exportJSON = () => JSON.stringify(content, null, 2)

  const setContent = (c: Content) => setContentState(c)

  // Walks the content tree, replacing string occurrences.
  // Pairs are applied in order, so pass the longest `from` values first
  // (e.g. "Belzer Law" before "Belzer") to avoid clobbering partial matches.
  const renameAcrossContent = (replacements: { from: string; to: string }[]): number => {
    let count = 0
    const applyToString = (s: string): string => {
      let out = s
      for (const { from, to } of replacements) {
        if (!from || from === to) continue
        if (out.includes(from)) {
          count += (out.split(from).length - 1)
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
      value={{ content, setContent, updateField, reset, exportJSON, renameAcrossContent }}
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
