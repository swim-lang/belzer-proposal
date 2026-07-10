import manifest from './proposalManifest.json'

export type ProposalManifestEntry = {
  id: string
  name: string
  tagline: string
  status: 'Active' | 'Draft' | 'Archived'
  href: string
  paths: string[]
  sourceFile: string
  kind: 'proposal' | 'contract'
  showInDashboard: boolean
}

export const proposalManifest = manifest as ProposalManifestEntry[]

export function findProposalManifestEntry(pathname: string) {
  let bestMatch: { entry: ProposalManifestEntry; pathLength: number } | null = null

  for (const entry of proposalManifest) {
    for (const path of entry.paths) {
      if (pathname !== path && !pathname.startsWith(`${path}/`)) continue
      if (!bestMatch || path.length > bestMatch.pathLength) {
        bestMatch = { entry, pathLength: path.length }
      }
    }
  }

  return bestMatch?.entry ?? null
}
