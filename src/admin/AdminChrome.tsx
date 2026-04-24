import { useContentControl } from '../context/ContentContext'

export type AdminView = 'dashboard' | 'editor' | 'submissions'

export function signOut() {
  try {
    window.sessionStorage.removeItem('anchovies-admin-session-v1')
    window.sessionStorage.removeItem('anchovies-admin-pin')
  } catch {
    /* noop */
  }
  window.location.href = '/admin'
}

export function navigate(view: AdminView) {
  const path = view === 'dashboard' ? '/admin' : `/admin/${view}`
  if (window.location.pathname !== path) {
    window.history.pushState({ view }, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }
}

export function viewFromPath(path: string): AdminView {
  if (path === '/admin/editor' || path.startsWith('/admin/editor/')) return 'editor'
  if (path === '/admin/submissions' || path.startsWith('/admin/submissions/')) return 'submissions'
  return 'dashboard'
}

export function AdminTopNav({ view, onChange }: { view: AdminView; onChange: (v: AdminView) => void }) {
  const items: { key: AdminView; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'editor', label: 'Editor' },
    { key: 'submissions', label: 'Submissions' },
  ]
  return (
    <header className="flex items-center justify-between px-5 md:px-8 py-4 border-b border-[var(--color-rule)]/20 bg-paper sticky top-0 z-30">
      <button
        type="button"
        onClick={() => onChange('dashboard')}
        className="flex items-center gap-3"
      >
        <span className="block w-2 h-2 rounded-full bg-ink" />
        <span className="text-[13px] font-medium tracking-[-0.01em]">Anchovies</span>
        <span className="block w-px h-[11px] bg-[var(--color-rule)]/30" />
        <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Admin</span>
      </button>
      <nav className="flex items-center gap-1">
        {items.map((it) => {
          const active = view === it.key
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onChange(it.key)}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors"
              style={{
                color: active ? 'var(--color-ink)' : 'var(--color-ink-2)',
                backgroundColor: active ? 'rgba(10, 10, 10, 0.06)' : 'transparent',
              }}
            >
              {it.label}
            </button>
          )
        })}
      </nav>
      <button
        type="button"
        onClick={signOut}
        className="text-[11px] text-ink-2 hover:text-ink transition-colors"
      >
        Sign out
      </button>
    </header>
  )
}

export function SyncBadge() {
  const { syncStatus, pullLatest } = useContentControl()
  let tone: string
  let dot: string
  let label: string
  let hint: string | null = null
  switch (syncStatus.kind) {
    case 'loading':
      tone = 'text-ink-2'
      dot = '#4A4A4A'
      label = 'Connecting…'
      break
    case 'ready':
      tone = 'text-ink-2'
      dot = '#1E3FE5'
      label = syncStatus.remote ? 'Shared · Synced' : 'Local only'
      hint = syncStatus.updatedAt ? `Updated ${new Date(syncStatus.updatedAt).toLocaleString()}` : null
      break
    case 'saving':
      tone = 'text-ink-2'
      dot = '#1E3FE5'
      label = 'Saving…'
      break
    case 'saved':
      tone = 'text-ink'
      dot = '#1E3FE5'
      label = 'Saved'
      hint = `Updated ${new Date(syncStatus.updatedAt).toLocaleTimeString()}`
      break
    case 'offline':
      tone = 'text-ink-2'
      dot = '#4A4A4A'
      label = 'Offline · Local only'
      hint = 'Shared store not configured'
      break
    case 'error':
      tone = 'text-ink'
      dot = '#b94a48'
      label = 'Error'
      hint = syncStatus.message
      break
    default:
      tone = 'text-ink-2'
      dot = '#4A4A4A'
      label = ''
  }
  return (
    <div className="flex items-center gap-2" title={hint ?? undefined}>
      <span className="block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dot }} />
      <span className={`text-[11px] ${tone}`}>{label}</span>
      <button
        type="button"
        onClick={pullLatest}
        className="text-[10px] text-ink-2 hover:text-ink transition-colors"
        title="Pull latest draft from server"
      >
        ↻
      </button>
    </div>
  )
}
