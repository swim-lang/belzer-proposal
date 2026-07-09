import { useEffect, useState, type FormEvent, type ReactNode } from 'react'

const PROPOSAL_PASSWORD = 'swimdifferent'
const STORAGE_KEY = 'anchovies_proposals_unlocked'

export function ProposalGate({ children }: { children: ReactNode }) {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(STORAGE_KEY) === 'true')
    } catch {
      setUnlocked(false)
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password.trim().toLowerCase() !== PROPOSAL_PASSWORD) {
      setError('That password did not work. Try again.')
      return
    }

    try {
      window.sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      /* A private browser can still view the proposal after this submit. */
    }
    setError('')
    setUnlocked(true)
  }

  if (unlocked) {
    return <>{children}</>
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6 py-12 text-ink">
      <section className="w-full max-w-[420px] border border-ink/15 bg-paper px-7 py-8 shadow-[0_28px_80px_rgba(10,10,10,0.08)] sm:px-9 sm:py-10">
        <div className="mb-10 flex items-center justify-between gap-6">
          <img src="/logos/anchovies-mark.svg" alt="Anchovies" className="h-[18px] w-auto" />
          <span className="eyebrow text-ink-2">Private proposal</span>
        </div>

        <div className="space-y-4">
          <h1 className="serif text-[48px] leading-[0.94] tracking-normal text-ink sm:text-[58px]">
            Enter your password
          </h1>
          <p className="max-w-[320px] text-sm leading-6 text-ink-2">
            This proposal workspace is private. Use the password shared by Anchovies to continue.
          </p>
        </div>

        <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              autoFocus
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setError('')
              }}
              placeholder="Password"
              className="w-full rounded-none border border-ink/25 bg-transparent px-4 py-4 text-base outline-none transition-colors placeholder:text-ink-2/50 focus:border-ink"
            />
          </label>
          {error ? <p className="text-sm leading-5 text-[#A43122]">{error}</p> : null}
          <button
            type="submit"
            className="w-full bg-ink px-5 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink-2"
          >
            View proposal
          </button>
        </form>
      </section>
    </main>
  )
}
