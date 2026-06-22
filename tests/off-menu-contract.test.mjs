import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Off Menu contract is registered from the Fiber Soft Chew proposal scope', () => {
  const app = read('src/App.tsx')
  const contract = read('src/contracts/offMenuContract.ts')
  const proposal = read('src/FiberSoftChewProposal.tsx')

  assert.match(app, /offMenuContract/)
  assert.match(app, /\/proposal\/off-menu\/contract/)
  assert.match(app, /\/proposal\/off-menu/)
  assert.match(app, /<ContractPage contract=\{offMenuContract\} \/>/)

  assert.match(contract, /slug: 'off-menu'/)
  assert.match(contract, /name: 'Off Menu'/)
  assert.match(contract, /title: 'Naming and Brand Identity Proposal'/)
  assert.match(contract, /fee: '\$5,850'/)
  assert.match(contract, /timeline: '3 to 4 weeks'/)
  assert.match(contract, /amount: '\$3,510'/)
  assert.match(contract, /amount: '\$2,340'/)
  assert.doesNotMatch(contract, /amount: '\$2,925'/)
  assert.match(contract, /Brand naming/)
  assert.match(contract, /Brand identity system/)
  assert.match(contract, /Packaging direction and mockups/)
  assert.match(contract, /Social and launch idea/)
  assert.match(contract, /Harikrishna Patel/)

  assert.match(proposal, /\/proposal\/off-menu\/contract/)
  assert.match(proposal, /\['60%', 'Due at kickoff'/)
  assert.match(proposal, /\['40%', 'Due before final handoff'/)
  assert.doesNotMatch(proposal, /\['50%', 'Due at kickoff'/)
})
