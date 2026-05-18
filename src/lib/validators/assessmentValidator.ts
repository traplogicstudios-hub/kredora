import type { FundingAssessmentProfile } from '../types'

export interface AssessmentValidation {
  valid: boolean
  errors: Partial<Record<keyof FundingAssessmentProfile, string>>
}

export function validateAssessment(
  assessment: Partial<FundingAssessmentProfile>
): AssessmentValidation {
  const errors: AssessmentValidation['errors'] = {}

  if (!assessment.businessName?.trim()) {
    errors.businessName = 'Business name is required'
  }

  if (!assessment.location?.trim()) {
    errors.location = 'Location is required'
  }

  if (!assessment.industry?.trim()) {
    errors.industry = 'Industry is required'
  }

  if (
    assessment.yearsInBusiness === undefined ||
    assessment.yearsInBusiness === null ||
    assessment.yearsInBusiness < 0
  ) {
    errors.yearsInBusiness = 'Years in business is required'
  }

  if (!assessment.businessStage) {
    errors.businessStage = 'Business stage is required'
  }

  if (!assessment.revenueRange) {
    errors.revenueRange = 'Revenue range is required'
  }

  if (!assessment.fundingGoal) {
    errors.fundingGoal = 'Funding goal is required'
  }

  if (!assessment.useOfFunds?.trim()) {
    errors.useOfFunds = 'Use of funds is required'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

export function isAssessmentComplete(
  assessment: FundingAssessmentProfile
): boolean {
  return validateAssessment(assessment).valid
}
