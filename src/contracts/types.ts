export type ContractParty = {
  name: string
  label: string
  address?: string
  contactName?: string
  email?: string
}

export type ContractPaymentMilestone = {
  amount: string
  label: string
  body: string
}

export type ContractScopePhase = {
  label: string
  title: string
  price: string
  timing: string
  includes: string[]
  deliverable: string
}

export type ContractData = {
  slug: string
  title: string
  preparedDate: string
  effectiveDate: string
  projectStart: string
  timeline: string
  fee: string
  originalValue?: string
  accommodation?: string
  hourlyRate?: string
  client: ContractParty
  agency: ContractParty
  paymentMilestones: ContractPaymentMilestone[]
  revisionRounds: string[]
  scopePhases: ContractScopePhase[]
  optionalSupport: string[]
}
