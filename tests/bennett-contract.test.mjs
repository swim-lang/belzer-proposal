import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('Bennett contract preserves proposal economics, scope and unsigned review state', () => {
  const data = readFileSync('src/contracts/bennettContract.ts', 'utf8')
  for (const expected of ['$39,500', '$19,750', '$9,875', '$3,000', '$13,000', '$14,000', '$6,500', '5 to 7 weeks', 'Missoula', 'associated agency travel', 'draftOnly: true', 'identity presentation and approval']) assert.ok(data.includes(expected), expected)
  assert.equal((data.match(/amount: '\$9,875'/g) || []).length, 2)
  assert.equal(19750 + 9875 + 9875, 39500)
  assert.equal(3000 + 3000 + 13000 + 14000 + 6500, 39500)
  assert.ok(!data.includes('agencySignedDate:'))
  assert.ok(!data.includes('depositHref:'))
  const page = readFileSync('src/contracts/ContractPage.tsx', 'utf8')
  assert.ok(page.includes('if (contract.draftOnly || !canSubmit'))
  assert.ok(page.includes('!isPrintMode && !contract.draftOnly'))
  assert.ok(page.includes('!contract.draftOnly && <img'))
})
