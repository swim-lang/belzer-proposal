import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Belzer systems contract preserves the accepted proposal terms and route', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const contract = read('src/contracts/belzerSystemsContract.ts')

  assert.match(app, /belzerSystemsContract/)
  assert.match(app, /case 'belzer-systems-contract'/)
  assert.match(app, /ContractPage contract=\{belzerSystemsContract\}/)
  assert.match(manifest, /"id": "belzer-systems-contract"/)
  assert.match(manifest, /\/proposal\/belzer-systems\/contract/)

  assert.match(contract, /title: 'Belzer Firm Workflow Pilot Agreement'/)
  assert.match(contract, /name: 'Belzer Law'/)
  assert.match(contract, /contactName: 'Aaron Belzer'/)
  assert.match(contract, /fee: '\$7,900'/)
  assert.match(contract, /amount: '\$4,740'/)
  assert.match(contract, /amount: '\$1,580'/)
  assert.match(contract, /60% payment/)
  assert.match(contract, /approximately six weeks/)
  assert.match(contract, /7 to 10 business days/)
  assert.match(contract, /two structured feedback rounds/i)
  assert.match(contract, /30-day stabilization period/)
})

test('Belzer systems contract covers ownership, human review, and third-party limits', () => {
  const contract = read('src/contracts/belzerSystemsContract.ts')

  assert.match(contract, /project-specific Deliverables and work product/)
  assert.match(contract, /full payment/)
  assert.match(contract, /Google, Microsoft, Box, PracticePanther, OpenAI, Anthropic/)
  assert.match(contract, /reasonable efforts to adapt integrations within the agreed scope/)
  assert.match(contract, /cannot guarantee third-party availability or permanent compatibility/)
  assert.match(contract, /No email, client communication, external action, or suggested legal deadline/)
  assert.match(contract, /review and approval by Britt or an attorney/)
  assert.match(contract, /No recurring monthly fee to Anchovies is included/)
  assert.match(contract, /written approval/)
  assert.doesNotMatch(contract, /branding/i)
  assert.doesNotMatch(contract, /\u2014/)
})
