import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { mBouvierContract as contract } from '../src/contracts/mBouvierContract.ts'
const proposal=readFileSync(new URL('../src/MBouvierProposal.tsx',import.meta.url),'utf8')
const money=s=>Number(s.replace(/[^0-9.]/g,''))
test('M. Bouvier agreement preserves approved pricing, deliverables, and payment triggers',()=>{
 assert.equal(money(contract.fee),9900)
 assert.deepEqual(contract.paymentMilestones.map(p=>money(p.amount)),[4950,2475,2475])
 assert.equal(contract.paymentMilestones.reduce((s,p)=>s+money(p.amount),0),money(contract.fee))
 assert.deepEqual(contract.scopePhases.map(p=>money(p.price)),[4000,5900])
 for(const phase of contract.scopePhases)for(const item of phase.includes)assert.ok(proposal.includes(item),item)
 assert.match(contract.paymentMilestones[1].label,/identity approval/)
 assert.match(contract.contractOverrides.milestonesEarned,/not due before the Client approves/)
 assert.match(contract.additionalTerms[0].body,/Home, About the Firm, Criminal Defense, Family Law, Mediation, Working Together, Insights, FAQs, and Contact/)
})
test('M. Bouvier requires a saved receipt and leaves agency signature unset and uses the verified invoice',()=>{
 assert.equal(contract.agencySignaturePending,true)
 assert.equal(contract.requireSavedSubmission,true)
 assert.equal(contract.agencySignedDate,undefined)
 assert.ok(contract.depositHref.includes('2624248677186782877/9515bd4215d34381973f6796afe72418'))
 assert.equal(contract.draftOnly,undefined)
 assert.equal(contract.client.name,'M. Bouvier Law')
})
