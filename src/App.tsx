import { ContentProvider } from './context/ContentContext'
import { Proposal } from './Proposal'
import { Admin } from './admin/Admin'

export default function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')

  if (isAdmin) {
    // Admin mounts its own editable ContentProvider internally (after auth gate)
    return <Admin />
  }

  return (
    <ContentProvider>
      <Proposal />
    </ContentProvider>
  )
}
