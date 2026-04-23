import { ContentProvider } from './context/ContentContext'
import { Proposal } from './Proposal'
import { Admin } from './admin/Admin'
import { Intake } from './intake/Intake'

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  const isIntake = pathname === '/intake' || pathname.startsWith('/intake/')

  if (isAdmin) {
    return <Admin />
  }

  if (isIntake) {
    return (
      <ContentProvider>
        <Intake />
      </ContentProvider>
    )
  }

  return (
    <ContentProvider>
      <Proposal />
    </ContentProvider>
  )
}
