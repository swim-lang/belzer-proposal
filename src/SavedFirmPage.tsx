import { useEffect, useState } from 'react'
import { ContentProvider } from './context/ContentContext'
import { PreMeetingPage } from './PreMeetingPage'
import { createPreMeetingContent } from './preMeetingContent'
import { readLocalFirmPages, type FirmPage } from './firmPages'

type LoadState =
  | { kind: 'loading' }
  | { kind: 'ready'; page: FirmPage }
  | { kind: 'not-found' }

function getSlugFromPath() {
  if (typeof window === 'undefined') return ''
  const match = window.location.pathname.match(/^\/firm\/([^/]+)\/?$/)
  return match ? decodeURIComponent(match[1]) : ''
}

function QuietNotFound() {
  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <div className="flex flex-col items-center gap-5 text-center">
        <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-auto block" />
        <p className="text-[12px] leading-[18px] text-ink-2">Page not found.</p>
      </div>
    </main>
  )
}

function QuietLoading() {
  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-6">
      <img src="/logos/anchovies-wordmark.svg" alt="Anchovies" className="h-[13px] w-auto block opacity-70" />
    </main>
  )
}

export function SavedFirmPage() {
  const [state, setState] = useState<LoadState>({ kind: 'loading' })

  useEffect(() => {
    let cancelled = false
    const slug = getSlugFromPath()

    const useLocalFallback = () => {
      const localPage = readLocalFirmPages().find((page) => page.slug === slug)
      if (cancelled) return
      setState(localPage ? { kind: 'ready', page: localPage } : { kind: 'not-found' })
    }

    if (!slug) {
      setState({ kind: 'not-found' })
      return
    }

    ;(async () => {
      try {
        const res = await fetch(`/api/firm-pages?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' })
        const contentType = res.headers.get('content-type') ?? ''
        if (!contentType.includes('application/json')) {
          useLocalFallback()
          return
        }
        if (res.status === 404) {
          useLocalFallback()
          return
        }
        if (!res.ok) {
          useLocalFallback()
          return
        }
        const data = (await res.json()) as { page?: FirmPage }
        if (cancelled) return
        setState(data.page ? { kind: 'ready', page: data.page } : { kind: 'not-found' })
      } catch {
        useLocalFallback()
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  if (state.kind === 'loading') return <QuietLoading />
  if (state.kind === 'not-found') return <QuietNotFound />

  return (
    <ContentProvider initialContent={createPreMeetingContent(state.page.firmName)}>
      <PreMeetingPage />
    </ContentProvider>
  )
}
