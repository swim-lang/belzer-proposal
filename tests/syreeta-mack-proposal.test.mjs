import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const app = read('src/App.tsx')
const manifest = read('src/proposalManifest.json')
const proposal = read('src/SyreetaMackProposal.tsx')

test('registers the protected Syreeta Mack proposal route', () => {
  assert.match(app, /SyreetaMackProposal/)
  assert.match(app, /case 'syreeta-mack'/)
  assert.match(manifest, /"href": "\/proposal\/syreeta-mack"/)
  assert.match(manifest, /"sourceFile": "src\/SyreetaMackProposal\.tsx"/)
})

test('preserves the approved total and transparent phase pricing', () => {
  for (const price of ['$500', '$1,600', '$1,650', '$3,750']) {
    assert.match(proposal, new RegExp(price.replace('$', '\\$').replace(',', ',')))
  }
  assert.match(proposal, /50%/)
  assert.match(proposal, /25%/)
  assert.match(proposal, /\$1,875/)
  assert.match(proposal, /\$937\.50/)
  assert.match(proposal, /title: 'Launch Toolkit',[\s\S]*price: 'Included'/)
})

test('includes strategy, identity, website, social, and print scope', () => {
  for (const term of [
    'Brand Strategy + Positioning',
    'Visual Identity + Brand World',
    'Website Strategy, Design + Development',
    'Launch Toolkit',
    'Light category and audience review',
    'Brand positioning statement',
    'One unifying creative idea',
    'Five-page website architecture',
    'Four flexible social post templates',
    'Business card',
    'One-page capabilities sheet',
    'Event flyer or announcement template',
  ]) {
    assert.match(proposal, new RegExp(term.replaceAll('+', '\\+')))
  }
})

test('defines the five-page website and three-to-four-week delivery', () => {
  for (const page of ['Home', 'Work', 'Services', 'About', 'Contact']) {
    assert.match(proposal, new RegExp(`'${page}'`))
  }
  assert.match(proposal, /Approximately three to four weeks/)
  assert.match(proposal, /Schedule a proposal review/)
  assert.match(proposal, /Accept proposal/)
  assert.match(proposal, /mailto:sean@anchovies\.agency\?subject=Syreeta%20Mack%20Proposal%20Acceptance/)
})

test('links the selected relevant work and broader archive', () => {
  for (const url of [
    'https://arc88studio.com/',
    'https://runway.haus/',
    'https://swim-lang.github.io/molly-engels/',
    'https://goduo.co/',
    'https://lexpolitica.com/',
    'https://off-menu-mauve.vercel.app/',
  ]) {
    assert.ok(proposal.includes(url), `missing selected website: ${url}`)
  }
  assert.match(proposal, /Portfolio website · Beta/)
  assert.match(proposal, /Ecommerce website · Beta/)
  assert.match(proposal, /https:\/\/anchovies\.agency\/work/)
})

test('contains no em dashes', () => {
  assert.equal(proposal.includes('—'), false)
})
