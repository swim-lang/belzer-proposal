import {readFileSync} from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
const contract=JSON.parse(readFileSync('src/contracts/corriganUsseryContract.ts','utf8').split('ContractData = ')[1])
test('Corrigan agreement preserves accepted fee and website approval milestone',()=>{
 const amount=s=>Number(s.replace(/[$,]/g,''))
 assert.equal(contract.client.name,'Corrigan & Ussery, LLC')
 assert.equal(contract.client.email,'jussery@corriganussery.com')
 assert.equal(amount(contract.fee),16999)
 assert.deepEqual(contract.paymentMilestones.map(x=>amount(x.amount)),[8499.5,4249.75,4249.75])
 assert.equal(contract.scopePhases.reduce((n,x)=>n+amount(x.price),0),16999)
 assert.match(contract.paymentMilestones[1].label,/website design approval/)
 assert.equal(contract.agencySignedDate,'November 20, 2026')
 assert.equal(contract.depositHref,undefined)
 assert.match(JSON.stringify(contract.scopePhases),/Home, The Firm, Our Team, Capabilities & Clients, and Contact/)
 assert.equal(contract.slug,'corrigan-ussery')
 const manifest=JSON.parse(readFileSync('src/proposalManifest.json','utf8'))
 assert.ok(manifest.find(x=>x.id==='corrigan-ussery-contract').paths.includes('/proposal/corrigan-ussery/contract'))
})
