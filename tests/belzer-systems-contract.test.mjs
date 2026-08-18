import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Belzer systems contract matches the accepted pilot', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const contract = read('src/contracts/belzerSystemsContract.ts')

  assert.match(app, /belzerSystemsContract/)
  assert.match(app, /belzer-systems-contract/)
  assert.match(manifest, /\/proposal\/belzer-systems\/contract/)
  assert.match(manifest, /Firm workflow pilot agreement · \$7,900/)

  assert.match(contract, /title: 'Firm Workflow Pilot Agreement'/)
  assert.match(contract, /fee: '\$7,900'/)
  assert.match(contract, /amount: '\$4,740'/)
  assert.match(contract, /amount: '\$1,580'/)
  assert.match(contract, /approximately six weeks/)
  assert.match(contract, /7 to 10 business days/)
  assert.match(contract, /30 days of stabilization support/)
  assert.match(contract, /project-specific source code, configurations, documentation/)
  assert.match(contract, /outages, policy or API changes, access restrictions, discontinued features/)
  assert.match(contract, /cannot guarantee third-party availability or permanent compatibility/)
  assert.match(contract, /No recurring monthly fee to Anchovies is included/)
  assert.match(contract, /No client communication, external action, or legal deadline will be sent or published/)
  assert.doesNotMatch(contract, /\u2014/)
})
