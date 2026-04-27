import { useEffect } from 'react'

export function QuietHome() {
  useEffect(() => {
    document.title = 'Anchovies'
  }, [])

  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-auto block" />
    </main>
  )
}
