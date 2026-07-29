import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const proposal = readFileSync(new URL('../src/HikeDoggieProposal.tsx', import.meta.url), 'utf8')

test('Hike Doggie proposal preserves the selected Phase 1 and 2 quote', () => {
  assert.match(proposal, /const PRICE_SOP_FOUNDATION = '\$5,500'/)
  assert.match(proposal, /const PRICE_PROTOTYPE = '\$6,500'/)
  assert.match(proposal, /const PRICE_TOTAL = '\$12,000'/)
  assert.match(proposal, /const PRICE_ADVISORY = '\$1,500\/mo'/)
})

test('Hike Doggie proposal includes the 75 and 25 payment schedule', () => {
  assert.match(proposal, /const PRICE_KICKOFF = '\$9,000'/)
  assert.match(proposal, /const PRICE_FINAL = '\$3,000'/)
  assert.match(proposal, /75%/)
  assert.match(proposal, /25%/)
  assert.match(proposal, /Due at kickoff/)
  assert.match(proposal, /Due at final Phase 2 delivery/)
})

test('Hike Doggie timeline accounts for client approvals', () => {
  assert.match(proposal, /depends on timely access, decisions, feedback, and approvals from Hike Doggie/)
  assert.match(proposal, /Client-side delays move the delivery dates accordingly/)
})
