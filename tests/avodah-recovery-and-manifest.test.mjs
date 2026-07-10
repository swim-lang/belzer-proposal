import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const manifest = JSON.parse(read('src/proposalManifest.json'))

test('the proposal manifest is canonical, unique, and fully routed', () => {
  const app = read('src/App.tsx')
  const dashboard = read('src/admin/Dashboard.tsx')
  const ids = new Set()
  const paths = new Set()

  assert.match(app, /findProposalManifestEntry/)
  assert.match(dashboard, /proposalManifest/)

  for (const entry of manifest) {
    assert.ok(!ids.has(entry.id), `duplicate manifest id: ${entry.id}`)
    ids.add(entry.id)
    assert.ok(entry.paths.includes(entry.href), `${entry.id} must include its dashboard href in paths`)
    assert.ok(existsSync(new URL(entry.sourceFile, root)), `missing source for ${entry.id}: ${entry.sourceFile}`)
    assert.match(app, new RegExp(`case ['"]${entry.id.replace(/[.*+?^$()|[\\]\\]/g, '\\$&')}['"]`))

    for (const path of entry.paths) {
      assert.ok(!paths.has(path), `duplicate manifest path: ${path}`)
      paths.add(path)
    }
  }
})

test('all recovered sent routes are registered with the correct archive status', () => {
  const expected = new Map([
    ['/proposal/avodah', 'Active'],
    ['/proposal/homemade', 'Archived'],
    ['/proposal/little-tech-association', 'Archived'],
    ['/proposal/tamrah', 'Archived'],
    ['/proposal/path-law-group', 'Archived'],
    ['/proposal/lapinco/contract', 'Archived'],
  ])

  for (const [href, status] of expected) {
    const entry = manifest.find((item) => item.href === href)
    assert.ok(entry, `missing recovered route: ${href}`)
    assert.equal(entry.status, status)
  }
})

test('Avodah presents all package terms, research, credit, and next steps', () => {
  const proposal = read('src/AvodahProposal.tsx')

  assert.match(proposal, /Search Foundation/)
  assert.match(proposal, /Employment Search Launch/)
  assert.match(proposal, /Growth Launch/)
  assert.match(proposal, /\$4,950/)
  assert.match(proposal, /\$14,500/)
  assert.match(proposal, /\$19,500/)
  assert.match(proposal, /\$3,712\.50/)
  assert.match(proposal, /\$1,237\.50/)
  assert.match(proposal, /\$7,250/)
  assert.match(proposal, /\$3,625/)
  assert.match(proposal, /75% at kickoff/)
  assert.match(proposal, /50% at kickoff/)
  assert.match(proposal, /within 30 days of delivery/)
  assert.match(proposal, /full \$4,950 is credited/)
  assert.match(proposal, /optional and month-to-month at \$2,500/)
  assert.match(proposal, /Future practice hubs/)
  assert.match(proposal, /from \$6,500 each/)
  assert.match(proposal, /Keyword, competitor, search result, and content-gap research/)
  assert.match(proposal, /Technical and content audit of avodahlegal\.com/)
  assert.match(proposal, /vaemploymentlawyers\.com/)
  assert.match(proposal, /Avodah service hub and an educational sister site/)
  assert.match(proposal, /Path A · Avodah employment hub/)
  assert.match(proposal, /Path B · Educational sister site/)
  assert.match(proposal, /Focused naming and visual direction if the sister-site path is selected/)
  assert.match(proposal, /its own purpose, audience, content system, and user journey/)
  assert.match(proposal, /Up to eight researched launch pages/)
  assert.match(proposal, /Two attorney-reviewed content pieces per month/)
  assert.match(proposal, /mailto:sean@anchovies\.agency/)
  assert.match(proposal, /Avodah%20package%20selection/)
  assert.match(proposal, /https:\/\/cal\.com\/anchovies\/30min/)
  assert.match(proposal, /Choose a package/)
  assert.match(proposal, /Schedule a proposal review/)
  assert.doesNotMatch(proposal, /Google Business Profile/)
  assert.doesNotMatch(proposal, /Location eligibility/)
  assert.doesNotMatch(proposal, /doorwayGuidanceHref/)
  assert.doesNotMatch(proposal, /businessProfileGuidanceHref/)
  assert.doesNotMatch(proposal, /[—–]/)
  assert.doesNotMatch(proposal, /\$1,650/)
  assert.doesNotMatch(proposal, /\$12,500/)
  assert.doesNotMatch(proposal, /\$20,000/)
})

test('Path Law Group preserves the original scope and investment', () => {
  const proposal = read('src/PathLawGroupProposal.tsx')

  assert.match(proposal, /Path Law Group/)
  assert.match(proposal, /Brand Strategy/)
  assert.match(proposal, /Brand Identity/)
  assert.match(proposal, /New Website/)
  assert.match(proposal, /Handoff/)
  assert.match(proposal, /\$3,500/)
  assert.match(proposal, /\$8,500/)
  assert.match(proposal, /\$15,000/)
  assert.match(proposal, /\$500/)
  assert.match(proposal, /\$27,500/)
  assert.match(proposal, /AI-powered pathway tool/)
  assert.match(proposal, /March 25, 2026/)
})

test('the recovered Lapinco contract keeps its archived additional term', () => {
  const contract = read('src/contracts/lapincoContract.ts')
  const page = read('src/contracts/ContractPage.tsx')
  const types = read('src/contracts/types.ts')

  assert.match(contract, /fee: '\$20,000'/)
  assert.match(contract, /Breef Payment Platform/)
  assert.match(types, /additionalTerms\?/)
  assert.match(page, /contract\.additionalTerms/)
  assert.match(page, /title="Additional Terms"/)
})

test('the production deploy command verifies git, tests, and build before Vercel', () => {
  const script = read('scripts/deploy-production.mjs')
  const pkg = read('package.json')

  assert.match(pkg, /deploy:production/)
  assert.match(script, /status', '--porcelain/)
  assert.match(script, /git', \['fetch', '--quiet'\]/)
  assert.match(script, /HEAD does not match/)
  assert.match(script, /npm', \['test'\]/)
  assert.match(script, /npm', \['run', 'build'\]/)
  assert.match(script, /vercel', \['deploy', '--prod', '--yes'\]/)
})
