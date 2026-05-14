import type { BusinessProfile } from '../types'

export const DEMO_PROFILE: BusinessProfile = {
  id: 'prime-clean-001',
  businessName: 'Prime Clean Solutions',
  naicsCodes: ['561720', '561740'],
  state: 'CA',
  city: 'Riverside',
  yearsInBusiness: 1,
  annualRevenue: 85000,
  employeeCount: 4,
  certifications: [],
  businessStructure: 'llc',
  goals: ['state_contracts', 'grants', 'supplier_diversity', 'bonding'],
  hasActiveInsurance: true,
  hasBankAccount: true,
  hasDunsOrUEI: false,
  businessDescription:
    'Prime Clean Solutions is a professional commercial cleaning company based in Riverside, CA. We specialize in janitorial services, post-construction cleanup, and facility maintenance for commercial and government properties. Founded in 2024, we bring reliability, attention to detail, and competitive pricing to every contract.',
}

export const EMPTY_PROFILE: BusinessProfile = {
  id: '',
  businessName: '',
  naicsCodes: [],
  state: '',
  city: '',
  yearsInBusiness: 0,
  certifications: [],
  businessStructure: 'llc',
  goals: [],
  hasActiveInsurance: false,
  hasBankAccount: false,
  hasDunsOrUEI: false,
}
