import type { BusinessProfile, BusinessStructure, OpportunityGoal } from '../types'

export interface StepValidation {
  valid: boolean
  errors: Partial<Record<keyof BusinessProfile | '_form', string>>
}

// ── Step 1: Business Basics ───────────────────────────────────────────────────

export function validateStep1(profile: Partial<BusinessProfile>): StepValidation {
  const errors: StepValidation['errors'] = {}

  if (!profile.businessName?.trim()) {
    errors.businessName = 'Business name is required'
  } else if (profile.businessName.trim().length < 2) {
    errors.businessName = 'Business name must be at least 2 characters'
  }

  if (!profile.city?.trim()) {
    errors.city = 'City is required'
  }

  if (!profile.state?.trim()) {
    errors.state = 'State is required'
  }

  if (!profile.naicsCodes?.length) {
    errors.naicsCodes = 'Select at least one industry code'
  }

  if (!profile.businessStructure) {
    errors.businessStructure = 'Business structure is required'
  }

  if (profile.yearsInBusiness === undefined || profile.yearsInBusiness === null) {
    errors.yearsInBusiness = 'Years in business is required'
  } else if (profile.yearsInBusiness < 0) {
    errors.yearsInBusiness = 'Years in business cannot be negative'
  }

  if (profile.annualRevenue !== undefined && profile.annualRevenue < 0) {
    errors.annualRevenue = 'Revenue cannot be negative'
  }

  if (profile.employeeCount !== undefined && profile.employeeCount < 0) {
    errors.employeeCount = 'Employee count cannot be negative'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

// ── Step 2: Certifications & Compliance ───────────────────────────────────────
// No required fields — certifications are optional. Validates booleans are present.

export function validateStep2(profile: Partial<BusinessProfile>): StepValidation {
  const errors: StepValidation['errors'] = {}

  if (profile.hasActiveInsurance === undefined) {
    errors.hasActiveInsurance = 'Please indicate if you have active insurance'
  }
  if (profile.hasBankAccount === undefined) {
    errors.hasBankAccount = 'Please indicate if you have a business bank account'
  }
  if (profile.hasDunsOrUEI === undefined) {
    errors.hasDunsOrUEI = 'Please indicate if you are registered on SAM.gov'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

// ── Step 3: Goals ─────────────────────────────────────────────────────────────

export function validateStep3(profile: Partial<BusinessProfile>): StepValidation {
  const errors: StepValidation['errors'] = {}

  if (!profile.goals?.length) {
    errors.goals = 'Select at least one funding or contract goal'
  }

  return { valid: Object.keys(errors).length === 0, errors }
}

// ── Full Profile Completeness ─────────────────────────────────────────────────

export function isProfileComplete(profile: BusinessProfile): boolean {
  return !!(
    profile.businessName?.trim() &&
    profile.city?.trim() &&
    profile.state?.trim() &&
    profile.naicsCodes?.length &&
    profile.businessStructure &&
    profile.yearsInBusiness >= 0 &&
    profile.goals?.length &&
    profile.hasActiveInsurance !== undefined &&
    profile.hasBankAccount !== undefined &&
    profile.hasDunsOrUEI !== undefined
  )
}

// ── Field-level helpers ───────────────────────────────────────────────────────

export function isValidBusinessStructure(value: string): value is BusinessStructure {
  return ['sole_prop', 'llc', 'corporation', 's_corp', 'partnership'].includes(value)
}

export function isValidGoal(value: string): value is OpportunityGoal {
  return [
    'federal_contracts',
    'state_contracts',
    'grants',
    'supplier_diversity',
    'loans',
    'bonding',
  ].includes(value)
}

// ── Profile completeness percentage (for progress indicators) ─────────────────

export function profileCompletionPercent(profile: Partial<BusinessProfile>): number {
  const checks: boolean[] = [
    !!profile.businessName?.trim(),
    !!profile.city?.trim(),
    !!profile.state?.trim(),
    !!(profile.naicsCodes?.length),
    !!profile.businessStructure,
    profile.yearsInBusiness !== undefined,
    profile.hasActiveInsurance !== undefined,
    profile.hasBankAccount !== undefined,
    profile.hasDunsOrUEI !== undefined,
    !!(profile.goals?.length),
  ]
  const filled = checks.filter(Boolean).length
  return Math.round((filled / checks.length) * 100)
}
