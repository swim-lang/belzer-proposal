import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Off Menu web proposal and contract are registered with web-stage terms', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const proposal = read('src/OffMenuProposal.tsx')
  const contract = read('src/contracts/offMenuContract.ts')
  const fiberContract = read('src/contracts/fiberSoftChewContract.ts')

  assert.match(app, /OffMenuProposal/)
  assert.match(app, /offMenuContract/)
  assert.match(manifest, /\/proposal\/off-menu/)
  assert.match(manifest, /\/proposal\/off-menu\/contract/)

  assert.match(proposal, /Shopify Website, Launch Ads & Site Refresh/)
  assert.match(proposal, /Payment structure" right="60 \/ 40"/)
  assert.match(proposal, /\$4,650 - Project begins on receipt\./)
  assert.match(proposal, /\$3,100 - Before final handoff and store launch\./)

  assert.match(contract, /Shopify Website, Launch Ads, and Site Refresh/)
  assert.match(contract, /fee: '\$7,750'/)
  assert.match(contract, /amount: '\$4,650'/)
  assert.match(contract, /amount: '\$3,100'/)
  assert.match(contract, /Shopify strategy, design, and build/)
  assert.match(contract, /Meta ad creative kit/)
  assert.match(contract, /Personal \/ TED site refresh/)

  assert.doesNotMatch(contract, /Naming and Brand Identity Proposal/)
  assert.doesNotMatch(contract, /Brand naming/)
  assert.match(fiberContract, /Naming and Brand Identity Proposal/)
})
