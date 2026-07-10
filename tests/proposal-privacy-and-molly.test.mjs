import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Molly proposal and contract are restored with original terms', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const proposal = read('src/MollyEngelsProposal.tsx')
  const contract = read('src/contracts/mollyEngelsContract.ts')

  assert.match(app, /MollyEngelsProposal/)
  assert.match(app, /mollyEngelsContract/)
  assert.match(manifest, /\/proposal\/molly/)
  assert.match(manifest, /\/proposal\/molly\/contract/)

  assert.match(proposal, /\$1,950/)
  assert.match(proposal, /50%/)
  assert.match(proposal, /25%/)
  assert.match(contract, /fee: '\$1,950'/)
  assert.match(contract, /amount: '\$975'/)
  assert.match(contract, /amount: '\$487\.50'/)
})

test('proposal routes are password-gated and robots-protected', () => {
  const app = read('src/App.tsx')
  const gate = read('src/components/ProposalGate.tsx')
  const html = read('index.html')
  const robots = read('public/robots.txt')
  const vercel = read('vercel.json')

  assert.match(app, /withProposalGate/)
  assert.match(app, /<ProposalGate>/)
  assert.match(gate, /swimdifferent/)
  assert.match(gate, /sessionStorage/)
  assert.match(gate, /Enter your password/)
  assert.match(gate, /\/logos\/anchovies-mark\.svg/)

  assert.match(html, /<meta name="robots" content="noindex, nofollow" \/>/)
  assert.match(robots, /User-agent: \*/)
  assert.match(robots, /Disallow: \//)
  assert.match(vercel, /X-Robots-Tag/)
  assert.match(vercel, /noindex, nofollow/)
})
