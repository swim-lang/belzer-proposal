import { ContentProvider } from './context/ContentContext'
import { Proposal } from './Proposal'
import { PreMeetingPage } from './PreMeetingPage'
import { QuietHome } from './QuietHome'
import { SavedFirmPage } from './SavedFirmPage'
import { HAAIProposal } from './HAAIProposal'
import { SleepGoddessProposal } from './SleepGoddessProposal'
import { Admin } from './admin/Admin'
import { Intake } from './intake/Intake'
import { createPreMeetingContent, getPreMeetingFirmNameFromURL } from './preMeetingContent'
import { kndContent } from './kndContent'

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const isIntake = pathname === '/intake' || pathname.startsWith('/intake/')
  const isLegacyBelzer = pathname === '/belzer' || pathname.startsWith('/belzer/')
  const isBelzer = pathname === '/proposal/belzer' || pathname.startsWith('/proposal/belzer/')
  const isKND = pathname === '/proposal/knd' || pathname.startsWith('/proposal/knd/')
  const isSleepGoddess =
    pathname === '/proposal/sleep-like-a-goddess' ||
    pathname.startsWith('/proposal/sleep-like-a-goddess/') ||
    pathname === '/sleep-like-a-goddess' ||
    pathname.startsWith('/sleep-like-a-goddess/')
  const isHAAI =
    pathname === '/proposal/haai' ||
    pathname.startsWith('/proposal/haai/') ||
    pathname === '/haai' ||
    pathname.startsWith('/haai/')
  const isFirmPage = pathname === '/firm' || pathname.startsWith('/firm/')
  const isPreMeeting =
    pathname === '/ai-legal-tools' ||
    pathname.startsWith('/ai-legal-tools/') ||
    pathname === '/pre-meeting' ||
    pathname.startsWith('/pre-meeting/')

  if (isAdmin) {
    return <Admin />
  }

  if (isIntake) {
    return (
      <ContentProvider syncRemote>
        <Intake />
      </ContentProvider>
    )
  }

  if (isPreMeeting) {
    return (
      <ContentProvider initialContent={createPreMeetingContent(getPreMeetingFirmNameFromURL())}>
        <PreMeetingPage />
      </ContentProvider>
    )
  }

  if (isBelzer) {
    return (
      <ContentProvider>
        <Proposal />
      </ContentProvider>
    )
  }

  if (isKND) {
    if (typeof document !== 'undefined') {
      document.title = 'Anchovies × KND Law Firm - Proposal'
    }
    return (
      <ContentProvider initialContent={kndContent}>
        <Proposal />
      </ContentProvider>
    )
  }

  if (isSleepGoddess) {
    return <SleepGoddessProposal />
  }

  if (isHAAI) {
    return <HAAIProposal />
  }

  if (isLegacyBelzer) {
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', '/proposal/belzer')
    }
    return (
      <ContentProvider>
        <Proposal />
      </ContentProvider>
    )
  }

  if (isFirmPage) {
    return <SavedFirmPage />
  }

  return <QuietHome />
}
