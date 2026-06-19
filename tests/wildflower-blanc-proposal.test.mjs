import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Wildflower + Blanc proposal is registered and preserves source content', () => {
  const app = read('src/App.tsx')
  const dashboard = read('src/admin/Dashboard.tsx')
  const proposal = read('src/WildflowerBlancProposal.tsx')

  assert.match(app, /WildflowerBlancProposal/)
  assert.match(app, /\/proposal\/wildflower-blanc/)
  assert.match(dashboard, /Wildflower \+ Blanc/)
  assert.match(dashboard, /\/proposal\/wildflower-blanc/)
  assert.match(proposal, /From what fills the room to the room itself\./)
  assert.match(proposal, /Two complete identities, developed as one engagement\./)
  assert.match(proposal, /\$11,900/)
  assert.match(proposal, /Forty-two artifacts/)
  assert.match(proposal, /https:\/\/pitch\.com\/v\/wildflower-blanc-rt4vmj/)
  assert.match(proposal, /Wildflower \+ Blanc/)
  assert.match(proposal, /Schedule a kickoff conversation/)
  assert.doesNotMatch(proposal, /—/)
})
