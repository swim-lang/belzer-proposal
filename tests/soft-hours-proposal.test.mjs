import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Soft Hours proposal is registered as Shopify completion scope', () => {
  const app = read('src/App.tsx')
  const dashboard = read('src/admin/Dashboard.tsx')
  const proposal = read('src/SoftHoursProposal.tsx')

  assert.match(app, /SoftHoursProposal/)
  assert.match(app, /\/proposal\/soft-hours/)
  assert.match(dashboard, /Soft Hours/)
  assert.match(dashboard, /\/proposal\/soft-hours/)
  assert.match(proposal, /Prepared for Soft Hours/)
  assert.match(proposal, /Shopify Website Completion/)
  assert.match(proposal, /focused sprint to finish the Soft Hours Shopify store/)
  assert.match(proposal, /\$2,850/)
  assert.match(proposal, /Shopify completion sprint/)
  assert.match(proposal, /Previous brand proposal/)
  assert.doesNotMatch(proposal, /Off Menu/)
  assert.doesNotMatch(proposal, /\$7,750/)
  assert.doesNotMatch(proposal, /Meta ad creative kit/)
  assert.doesNotMatch(proposal, /Personal \/ TED site refresh/)
})
