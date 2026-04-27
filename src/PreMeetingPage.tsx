import { useEffect } from 'react'
import { Closing } from './components/Closing'
import { ClientExperience } from './components/ClientExperience'
import { DashboardPreview } from './components/DashboardPreview'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Integrations } from './components/Integrations'
import { Nav } from './components/Nav'
import { NextStep } from './components/NextStep'
import { Ownership } from './components/Ownership'
import { PointOfView } from './components/PointOfView'
import { PreMeetingComparison } from './components/PreMeetingComparison'
import { PreMeetingFitPrompt } from './components/PreMeetingFitPrompt'
import { Scope } from './components/Scope'
import { useContent } from './context/ContentContext'

export function PreMeetingPage() {
  const { client } = useContent()

  useEffect(() => {
    document.title = `Anchovies × ${client.name} — Pre-meeting Overview`
  }, [client.name])

  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <PointOfView />
      <DashboardPreview />
      <PreMeetingComparison />
      <Features />
      <Integrations />
      <Ownership />
      <NextStep />
      <Scope />
      <ClientExperience />
      <PreMeetingFitPrompt />
      <Closing />
      <Footer />
    </main>
  )
}
