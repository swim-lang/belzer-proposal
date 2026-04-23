import { ApproveScreen } from './components/ApproveScreen'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { WhatWeHeard } from './components/WhatWeHeard'
import { PointOfView } from './components/PointOfView'
import { DashboardPreview } from './components/DashboardPreview'
import { PhaseOne } from './components/PhaseOne'
import { Features } from './components/Features'
import { Scope } from './components/Scope'
import { Security } from './components/Security'
import { Advantage } from './components/Advantage'
import { ClientExperience } from './components/ClientExperience'
import { PhaseTwo } from './components/PhaseTwo'
import { Integrations } from './components/Integrations'
import { Ownership } from './components/Ownership'
import { NextStep } from './components/NextStep'
import { Closing } from './components/Closing'
import { Footer } from './components/Footer'

export function Proposal() {
  return (
    <main className="bg-paper text-ink">
      <Nav />
      <Hero />
      <WhatWeHeard />
      <PointOfView />
      <DashboardPreview />
      <PhaseOne />
      <Features />
      <Scope />
      <Security />
      <Advantage />
      <ClientExperience />
      <PhaseTwo />
      <Integrations />
      <Ownership />
      <NextStep />
      <Closing />
      <Footer />
      <ApproveScreen />
    </main>
  )
}
