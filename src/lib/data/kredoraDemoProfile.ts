import type { FundingAssessmentProfile } from '../types'

export const EMPTY_ASSESSMENT: FundingAssessmentProfile = {
  businessName: '',
  location: '',
  industry: '',
  yearsInBusiness: 0,
  businessStage: '',
  revenueRange: '',
  fundingGoal: '',
  useOfFunds: '',
  documentsAvailable: [],
  biggestChallenge: '',
}

export const KREDORA_DEMO_PROFILE: FundingAssessmentProfile = {
  businessName: 'Autonomyx Solutions',
  location: 'Riverside, CA',
  industry: 'AI automation and tech services',
  yearsInBusiness: 1,
  businessStage: 'early_stage',
  revenueRange: '25k_100k',
  fundingGoal: '25k_50k',
  useOfFunds:
    'Software tools, marketing, contractor support, client delivery systems',
  documentsAvailable: [
    'ein',
    'business_bank_account',
    'website',
    'business_email',
  ],
  biggestChallenge:
    'Lack of financial projections and formal business documentation',
}
