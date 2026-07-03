import { readFileSync } from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('Wildflower + Blanc proposal is registered and preserves source content', () => {
  const app = read('src/App.tsx')
  const dashboard = read('src/admin/Dashboard.tsx')
  const proposal = read('src/WildflowerBlancProposal.tsx')
  const css = read('src/index.css')

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
  assert.match(proposal, /Schedule proposal review/)
  assert.match(proposal, /4-5 weeks/)
  assert.match(proposal, /approximately 30 days/)
  assert.match(css, /--font-serif: "ABC Gaisyr"/)
  assert.doesNotMatch(css, /family=Oswald/)
  assert.doesNotMatch(css, /\.wildflower-blanc-proposal\s*\{\s*--font-serif/)
  assert.doesNotMatch(proposal, /—/)
  assert.doesNotMatch(proposal, /Schedule kickoff/)
  assert.doesNotMatch(proposal, /Schedule a kickoff conversation/)
  assert.doesNotMatch(proposal, /10–12 weeks/)
  assert.doesNotMatch(proposal, /10 to 12 weeks/)
  assert.doesNotMatch(proposal, /Wildflower already reaches across furniture/)
  assert.doesNotMatch(proposal, /Blanc offers a different canvas/)
})

test('Wildflower + Blanc pillar borders stay consistent across breakpoints', () => {
  const proposal = read('src/WildflowerBlancProposal.tsx')

  assert.match(proposal, /const pillarBorderClasses = \[/)
  assert.match(proposal, /'border-b md:border-r xl:border-b-0'/)
  assert.match(proposal, /'border-b md:border-r-0 xl:border-r xl:border-b-0'/)
  assert.match(proposal, /'border-b md:border-r md:border-b-0 xl:border-b-0'/)
  assert.match(proposal, /'md:border-b-0'/)
})
