import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const page = readFileSync('src/LejProposal.tsx', 'utf8')
test('LEJ includes all four tracks, exact benefit, and safeguards', () => {
  for (const text of ['Brand Foundations for a New Law Practice', 'Brand and Website Working Session', 'Individual Firm Support', 'AI for the Modern Small Law Practice', '$500', 'Standard value $950', '$5,000', '90 days', '75-minute', '30-minute', '$1,000', 'Custom-scoped after the consultation', 'not legal ethics advice', 'confidential information in unapproved systems']) assert.ok(page.includes(text), text)
  assert.ok(!page.includes('$12,000'))
  assert.ok(!page.includes('$23,000'))
})
test('LEJ route uses existing proposal gate and preserves noindex policy', () => {
  const app = readFileSync('src/App.tsx', 'utf8')
  assert.match(app, /case 'lej':\s+return withProposalGate\(<LejProposal \/>\)/)
  const manifest = JSON.parse(readFileSync('src/proposalManifest.json', 'utf8'))
  assert.equal(manifest.filter(x => x.id === 'lej').length, 1)
  assert.equal(manifest.find(x => x.id === 'lej').href, '/proposal/lej')
  assert.ok(readFileSync('vercel.json', 'utf8').includes('noindex, nofollow'))
})
