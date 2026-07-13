import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')

test('Avodah contract reflects the approved first two phases only', () => {
  const app = read('src/App.tsx')
  const manifest = read('src/proposalManifest.json')
  const proposal = read('src/AvodahProposal.tsx')
  const contract = read('src/contracts/avodahContract.ts')

  assert.match(app, /avodahContract/)
  assert.match(app, /case 'avodah-contract'/)
  assert.match(manifest, /\/proposal\/avodah\/contract/)
  assert.match(proposal, /const contractHref = '\/proposal\/avodah\/contract'/)
  assert.match(proposal, /Review contract/)

  assert.match(contract, /name: 'Avodah Legal'/)
  assert.match(contract, /contactName: 'Ben Johnson'/)
  assert.match(contract, /fee: '\$8,000'/)
  assert.match(contract, /title: 'Search Foundation'/)
  assert.match(contract, /price: '\$3,500'/)
  assert.match(contract, /title: 'Avodah Blog \+ Site Improvements'/)
  assert.match(contract, /price: '\$4,500'/)
  assert.match(contract, /Fifty original, research-backed articles with source notes and attorney review/)
  assert.match(contract, /Listen to this article audio experience across the library/)
  assert.match(contract, /Main Avodah Google Business Profile setup and Norfolk office addition/)
  assert.match(contract, /amount: '\$2,625'/)
  assert.match(contract, /amount: '\$875'/)
  assert.match(contract, /amount: '\$2,250'/)
  assert.match(contract, /amount: '\$1,125'/)
  assert.match(contract, /The Practice-Area Resource Site described in the proposal is not included in this Contract/)
  assert.match(contract, /Search rankings, traffic, leads, and business outcomes are not guaranteed/)
  assert.doesNotMatch(contract, /price: '\$10,500'/)
  assert.doesNotMatch(contract, /[—–]/)
})
