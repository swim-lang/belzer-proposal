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
  agencySignedDate?: string
  effectiveDate: string
  projectStart: string
  timeline: string
  fee: string
  depositHref?: string
  originalValue?: string
  accommodation?: string
  monthlyRetainer?: string
  client: ContractParty
  agency: ContractParty
  paymentMilestones: ContractPaymentMilestone[]
  revisionRounds: string[]
  scopePhases: ContractScopePhase[]
  optionalSupport: string[]
  subjectiveReviewTerms?: string
  contractOverrides?: {
    changeOrders?: string
    reviewWindow?: string
    revisionDefinition?: string
    directionChanges?: string
    reviewTitle?: string
    reviewTerms?: string
    projectContinuity?: string
    terminationForConvenience?: string
    milestonesEarned?: string
    paymentOnTermination?: string
    transferOfOwnership?: string
    workingFiles?: string
    portfolioRights?: string
  }
  sectionNine?: {
    title: string
    clauses: {
      label: string
      body: string
    }[]
  }
  additionalTerms?: {
    title: string
    body: string
  }[]
}
