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

test('Avodah presents the required research and two cumulative build layers', () => {
  const proposal = read('src/AvodahProposal.tsx')

  assert.match(proposal, /Search Foundation/)
  assert.match(proposal, /Avodah Blog \+ Site Improvements/)
  assert.match(proposal, /Practice-Area Resource Site/)
  assert.match(proposal, /\$3,500/)
  assert.match(proposal, /\$5,000/)
  assert.match(proposal, /\$11,000/)
  assert.match(proposal, /\$8,500/)
  assert.match(proposal, /\$14,500/)
  assert.match(proposal, /\$19,500/)
  assert.match(proposal, /\$2,625/)
  assert.match(proposal, /\$875/)
  assert.match(proposal, /\$2,500/)
  assert.match(proposal, /\$1,250/)
  assert.match(proposal, /\$5,500/)
  assert.match(proposal, /\$2,750/)
  assert.match(proposal, /75% at kickoff/)
  assert.match(proposal, /50% at implementation kickoff/)
  assert.match(proposal, /50% at site kickoff/)
  assert.match(proposal, /Search Foundation is required/)
  assert.match(proposal, /complete program is \$19,500/)
  assert.match(proposal, /Keyword, competitor, search result, and content-gap research across employment, traffic and criminal, and corporate work/)
  assert.match(proposal, /Technical and content audit of avodahlegal\.com/)
  assert.match(proposal, /vaemploymentlawyers\.com/)
  assert.match(proposal, /first-party data/)
  assert.match(proposal, /Branded-search and audience architecture that protects Avodah as the primary firm experience/)
  assert.match(proposal, /Google Search, AI search, YouTube, and LinkedIn opportunity map/)
  assert.match(proposal, /Layer A · Avodah blog \+ improvements/)
  assert.match(proposal, /Layer B · Primary sister-site build/)
  assert.match(proposal, /A newly designed and developed blog that does not exist on the current Avodah site today/)
  assert.match(proposal, /Blog strategy, responsive design, Framer development, CMS, and article templates/)
  assert.match(proposal, /Fifty original, attorney-reviewed articles with source notes/)
  assert.match(proposal, /Fifty original, attorney-reviewed practice-area articles with source notes/)
  assert.match(proposal, /Listen to this article audio experience across the library/)
  assert.match(proposal, /Searchable and filterable knowledge library and CMS/)
  assert.match(proposal, /Twenty-five original, research-backed cornerstone guides with source notes and attorney review/)
  assert.match(proposal, /Twenty-five original cornerstone guides and answers/)
  assert.match(proposal, /Seven adaptable core pages: Home, Start Here, Common Problems, Rights and Options, Guides and Answers, Resource Directory, and About and Get Help/)
  assert.match(proposal, /Up to seventy-five curated government, nonprofit, and authoritative resources with summaries and topic tags/)
  assert.match(proposal, /Plain-language glossary of up to one hundred terms for the selected practice area/)
  assert.match(proposal, /Six practical checklists and decision guides/)
  assert.match(proposal, /Reusable practice-area design and CMS system with room for each future site to vary/)
  assert.match(proposal, /Main Avodah Google Business Profile setup and Norfolk office addition once details are supplied/)
  assert.match(proposal, /Avodah-owned shared marketing account setup for platform access/)
  assert.match(proposal, /Consumer-practice content will not take over the main navigation, homepage message, or premium-client journey/)
  assert.match(proposal, /mailto:sean@anchovies\.agency/)
  assert.match(proposal, /Avodah%20program%20selection/)
  assert.match(proposal, /https:\/\/cal\.com\/anchovies\/30min/)
  assert.match(proposal, /Choose a direction/)
  assert.match(proposal, /Schedule a proposal review/)
  assert.match(proposal, /Google Business Profile/)
  assert.doesNotMatch(proposal, /Location eligibility/)
  assert.doesNotMatch(proposal, /doorwayGuidanceHref/)
  assert.doesNotMatch(proposal, /businessProfileGuidanceHref/)
  assert.doesNotMatch(proposal, /[—–]/)
  assert.doesNotMatch(proposal, /\$1,650/)
  assert.doesNotMatch(proposal, /Employment Search Launch/)
  assert.doesNotMatch(proposal, /Growth Launch/)
  assert.doesNotMatch(proposal, /Avodah Knowledge Library/)
  assert.doesNotMatch(proposal, /\$7,000/)
  assert.doesNotMatch(proposal, /\$9,000/)
  assert.doesNotMatch(proposal, /\$10,500/)
  assert.doesNotMatch(proposal, /\$12,500/)
  assert.doesNotMatch(proposal, /full \$4,950 is credited/)
  assert.doesNotMatch(proposal, /Two attorney-reviewed content pieces per month/)
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
