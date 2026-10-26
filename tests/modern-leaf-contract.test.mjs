import {readFileSync} from 'node:fs'
import test from 'node:test'
import assert from 'node:assert/strict'
const contract=JSON.parse(readFileSync('src/contracts/modernLeafContract.ts','utf8').split('ContractData = ')[1])
test('Modern Leaf agreement matches approved pricing, signature date, and exploratory extras',()=>{
 const amount=s=>Number(s.replace(/[$,]/g,''))
 assert.equal(amount(contract.fee),19900)
 assert.deepEqual(contract.paymentMilestones.map(x=>amount(x.amount)),[9950,4975,4975])
 assert.equal(contract.scopePhases.filter(x=>x.price.startsWith('$')).reduce((n,x)=>n+amount(x.price),0),19900)
 assert.equal(contract.agencySignedDate,'October 26, 2026')
 assert.equal(contract.depositHref,undefined)
 assert.match(contract.additionalTerms[0].body,/determined together during discovery/)
 assert.equal(contract.slug,'modern-leaf')
 const manifest=JSON.parse(readFileSync('src/proposalManifest.json','utf8'))
 assert.ok(manifest.find(x=>x.id==='modern-leaf-contract').paths.includes('/proposal/modern-leaf/contract'))
})
