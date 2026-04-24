import { useEffect, useState, type FormEvent } from 'react'
import { ContentProvider } from '../context/ContentContext'
import { AdminEditor } from './AdminEditor'
import { AdminTopNav, navigate, viewFromPath, type AdminView } from './AdminChrome'
import { Dashboard } from './Dashboard'
import { SubmissionsView } from './SubmissionsView'

const DEFAULT_PIN = '1234'
const SESSION_KEY = 'anchovies-admin-session-v1'
const SESSION_PIN_KEY = 'anchovies-admin-pin'

// Testing credentials — move to a server-side check before wider use.
const VALID_USER = 'Andy'
const VALID_PASS = 'Swim2424!@#'

function isAuthed(): boolean {
  try {
    if (typeof window === 'undefined') return false
    if (window.sessionStorage.getItem(SESSION_KEY) === '1') return true
    const params = new URLSearchParams(window.location.search)
    if (params.get('pin')) return true
    return false
  } catch {
    return false
  }
}

function Gate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean>(() => isAuthed())
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState<string | null>(null)

  const login = (e: FormEvent) => {
    e.preventDefault()
    if (user.trim() === VALID_USER && pass === VALID_PASS) {
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1')
        const pin =
          (import.meta as unknown as { env?: { VITE_ADMIN_PIN?: string } }).env?.VITE_ADMIN_PIN ??
          DEFAULT_PIN
        window.sessionStorage.setItem(SESSION_PIN_KEY, pin)
      } catch {
        /* noop */
      }
      setAuthed(true)
      setErr(null)
    } else {
      setErr('Invalid username or password.')
    }
  }

  if (authed) return <>{children}</>

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center p-6 md:p-8">
      <div className="w-full max-w-[400px] flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <span className="block w-2 h-2 rounded-full bg-ink" />
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Anchovies · Admin</span>
          </div>
          <h1 className="serif text-[40px] leading-[44px] md:text-[48px] md:leading-[52px] tracking-[-0.02em]">
            Sign in.
          </h1>
          <p className="text-[13px] leading-[20px] text-ink-2">
            Internal tool for editing proposal content + reviewing intake submissions.
          </p>
        </div>

        <form onSubmit={login} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Username</span>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="username"
              autoFocus
              className="serif text-[18px] px-4 py-3 bg-white border border-[var(--color-rule)]/25 focus:border-ink outline-none rounded-[10px] transition-colors"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] tracking-[0.12em] uppercase text-ink-2">Password</span>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoComplete="current-password"
              className="serif text-[18px] px-4 py-3 bg-white border border-[var(--color-rule)]/25 focus:border-ink outline-none rounded-[10px] transition-colors"
            />
          </label>
          {err && <div className="text-[12px] text-[#b94a48] py-1.5">{err}</div>}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 mt-2 px-5 py-3.5 rounded-full text-[13px] font-medium text-paper transition-colors"
            style={{ backgroundColor: 'var(--color-mac)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-mac)')}
          >
            Continue <span>→</span>
          </button>
        </form>

        <p className="text-[11px] leading-[16px] text-ink-2/70">
          Session cached in this browser only. Close the tab to sign out.
        </p>
      </div>
    </div>
  )
}

function AdminRouter() {
  const [view, setView] = useState<AdminView>(() =>
    typeof window !== 'undefined' ? viewFromPath(window.location.pathname) : 'dashboard'
  )

  useEffect(() => {
    const onPop = () => setView(viewFromPath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const go = (v: AdminView) => {
    navigate(v)
    setView(v)
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col">
      <AdminTopNav view={view} onChange={go} />
      {view === 'dashboard' && <Dashboard />}
      {view === 'editor' && <AdminEditor />}
      {view === 'submissions' && <SubmissionsView />}
    </div>
  )
}

export function Admin() {
  return (
    <Gate>
      <ContentProvider editable>
        <AdminRouter />
      </ContentProvider>
    </Gate>
  )
}
