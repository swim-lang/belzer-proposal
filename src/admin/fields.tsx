import { useContentControl } from '../context/ContentContext'
import { type ReactNode } from 'react'

// ——— Section wrapper ———
export function Section({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-[var(--color-rule)]/20">
      <summary className="cursor-pointer list-none py-4 flex items-center justify-between text-[12px] tracking-[0.12em] uppercase text-ink-2 hover:text-ink transition-colors">
        <span>{title}</span>
        <span className="text-[14px] text-ink-2 group-open:rotate-45 transition-transform">+</span>
      </summary>
      <div className="pb-6 flex flex-col gap-4">{children}</div>
    </details>
  )
}

// ——— Get/set helper via dotted path ———
function getByPath(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc == null || typeof acc !== 'object') return undefined
    return (acc as Record<string, unknown>)[key]
  }, obj)
}

// ——— Text input bound to a content path ———
export function TextField({
  path,
  label,
  multiline = false,
  mono = false,
}: {
  path: string
  label: string
  multiline?: boolean
  mono?: boolean
}) {
  const { content, updateField } = useContentControl()
  const value = String(getByPath(content, path) ?? '')

  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateField(path, e.target.value),
    className:
      'w-full bg-paper border border-[var(--color-rule)]/20 focus:border-ink px-3 py-2 text-[13px] text-ink rounded-md outline-none transition-colors ' +
      (mono ? 'font-mono' : ''),
  }

  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] tracking-[0.04em] text-ink-2">{label}</span>
      {multiline ? (
        <textarea {...common} rows={4} />
      ) : (
        <input type="text" {...common} />
      )}
    </label>
  )
}

// ——— Array of strings editor ———
export function ArrayField({ path, label }: { path: string; label: string }) {
  const { content, updateField } = useContentControl()
  const arr = (getByPath(content, path) as string[]) ?? []

  const setItem = (i: number, v: string) => {
    const next = [...arr]
    next[i] = v
    updateField(path, next)
  }
  const remove = (i: number) => updateField(path, arr.filter((_, idx) => idx !== i))
  const add = () => updateField(path, [...arr, ''])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-[0.04em] text-ink-2">{label}</span>
        <button
          type="button"
          onClick={add}
          className="text-[11px] text-ink-2 hover:text-ink transition-colors"
        >
          + Add
        </button>
      </div>
      {arr.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-[10px] text-ink-2 w-6 shrink-0 pt-2.5">
            {String(i + 1).padStart(2, '0')}
          </span>
          <textarea
            value={item}
            onChange={(e) => setItem(i, e.target.value)}
            rows={1}
            className="flex-1 bg-paper border border-[var(--color-rule)]/20 focus:border-ink px-3 py-2 text-[13px] text-ink rounded-md outline-none transition-colors resize-none"
            style={{ minHeight: 36 }}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="text-[11px] text-ink-2 hover:text-ink transition-colors pt-2.5 shrink-0"
            aria-label="Remove"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

// ——— Array of objects with named string fields ———
export function ObjectArrayField({
  path,
  label,
  fields,
  emptyItem,
}: {
  path: string
  label: string
  fields: { key: string; label: string; multiline?: boolean }[]
  emptyItem: Record<string, string>
}) {
  const { content, updateField } = useContentControl()
  const arr = (getByPath(content, path) as Record<string, string>[]) ?? []

  const setField = (i: number, key: string, value: string) => {
    const next = arr.map((it, idx) => (idx === i ? { ...it, [key]: value } : it))
    updateField(path, next)
  }
  const remove = (i: number) => updateField(path, arr.filter((_, idx) => idx !== i))
  const add = () => updateField(path, [...arr, { ...emptyItem }])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] tracking-[0.04em] text-ink-2">{label}</span>
        <button
          type="button"
          onClick={add}
          className="text-[11px] text-ink-2 hover:text-ink transition-colors"
        >
          + Add
        </button>
      </div>
      {arr.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 p-3 border border-[var(--color-rule)]/15 rounded-md">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-ink-2">#{String(i + 1).padStart(2, '0')}</span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-[11px] text-ink-2 hover:text-ink transition-colors"
            >
              Remove
            </button>
          </div>
          {fields.map((f) => (
            <label key={f.key} className="flex flex-col gap-1">
              <span className="text-[10px] text-ink-2">{f.label}</span>
              {f.multiline ? (
                <textarea
                  value={item[f.key] ?? ''}
                  onChange={(e) => setField(i, f.key, e.target.value)}
                  rows={2}
                  className="bg-paper border border-[var(--color-rule)]/20 focus:border-ink px-2.5 py-1.5 text-[12px] text-ink rounded outline-none transition-colors resize-none"
                />
              ) : (
                <input
                  type="text"
                  value={item[f.key] ?? ''}
                  onChange={(e) => setField(i, f.key, e.target.value)}
                  className="bg-paper border border-[var(--color-rule)]/20 focus:border-ink px-2.5 py-1.5 text-[12px] text-ink rounded outline-none transition-colors"
                />
              )}
            </label>
          ))}
        </div>
      ))}
    </div>
  )
}
