import type {
  Certification,
  OpportunityGoal,
  OpportunityType,
  BusinessStructure,
  RequirementCategory,
  GapSeverity,
  InsightCategory,
} from '../types'

// ── Routes ────────────────────────────────────────────────────────────────────

export const ROUTES = {
  LANDING: '/',
  ONBOARD: '/onboard',
  DASHBOARD: '/dashboard',
  OPPORTUNITY: (id: string) => `/opportunity/${id}`,
  APPLY: (id: string) => `/apply/${id}`,
  ENTERPRISE: '/enterprise',
} as const

// ── NAICS Codes ───────────────────────────────────────────────────────────────

export const NAICS_OPTIONS: { code: string; label: string }[] = [
  { code: '561720', label: '561720 — Janitorial Services' },
  { code: '561740', label: '561740 — Carpet & Upholstery Cleaning' },
  { code: '561790', label: '561790 — Other Building & Dwellings Services' },
  { code: '561110', label: '561110 — Office Administrative Services' },
  { code: '562119', label: '562119 — Other Waste Collection' },
  { code: '812310', label: '812310 — Coin-Operated Laundries & Drycleaners' },
  { code: '238910', label: '238910 — Site Preparation Contractors' },
  { code: '236220', label: '236220 — Commercial & Institutional Building Construction' },
]

// ── Certifications ────────────────────────────────────────────────────────────

export const CERTIFICATION_LABELS: Record<Certification, string> = {
  MBE: 'MBE — Minority Business Enterprise',
  WBE: 'WBE — Women-Owned Business Enterprise',
  DBE: 'DBE — Disadvantaged Business Enterprise',
  SDVOSB: 'SDVOSB — Service-Disabled Veteran-Owned Small Business',
  HUBZone: 'HUBZone — Historically Underutilized Business Zone',
  SBA_8a: 'SBA 8(a) — Small Disadvantaged Business',
  SBE: 'SBE — Small Business Enterprise (California)',
  LGBTBE: 'LGBTBE — LGBT Business Enterprise',
  AABE: 'AABE — African American Business Enterprise',
}

export const CERTIFICATIONS: Certification[] = [
  'SBE',
  'MBE',
  'WBE',
  'DBE',
  'SDVOSB',
  'HUBZone',
  'SBA_8a',
  'LGBTBE',
  'AABE',
]

// ── Business Goals ────────────────────────────────────────────────────────────

export const GOAL_LABELS: Record<OpportunityGoal, string> = {
  federal_contracts: 'Federal Government Contracts',
  state_contracts: 'State & Local Government Contracts',
  grants: 'Business Grants',
  supplier_diversity: 'Corporate Supplier Diversity Programs',
  loans: 'SBA & Business Loans',
  bonding: 'Contract Bonding',
}

export const GOALS: OpportunityGoal[] = [
  'state_contracts',
  'federal_contracts',
  'grants',
  'supplier_diversity',
  'loans',
  'bonding',
]

// ── Business Structure ────────────────────────────────────────────────────────

export const BUSINESS_STRUCTURE_LABELS: Record<BusinessStructure, string> = {
  sole_prop: 'Sole Proprietorship',
  llc: 'Limited Liability Company (LLC)',
  corporation: 'C-Corporation',
  s_corp: 'S-Corporation',
  partnership: 'Partnership',
}

export const BUSINESS_STRUCTURES: BusinessStructure[] = [
  'sole_prop',
  'llc',
  's_corp',
  'corporation',
  'partnership',
]

// ── Opportunity Types ─────────────────────────────────────────────────────────

export const OPPORTUNITY_TYPE_LABELS: Record<OpportunityType, string> = {
  federal_contract: 'Federal Contract',
  state_contract: 'State & Local Contract',
  grant: 'Grant',
  supplier_diversity: 'Supplier Diversity',
  loan: 'SBA Loan',
  bond: 'Bonding Program',
}

export const OPPORTUNITY_TYPES: OpportunityType[] = [
  'state_contract',
  'federal_contract',
  'grant',
  'supplier_diversity',
  'loan',
  'bond',
]

// ── Requirement Categories ────────────────────────────────────────────────────

export const REQUIREMENT_CATEGORY_LABELS: Record<RequirementCategory, string> = {
  certification: 'Certifications',
  financial: 'Financial',
  experience: 'Experience',
  documentation: 'Documentation',
  registration: 'Registration',
}

// ── Gap Severity ──────────────────────────────────────────────────────────────

export const GAP_SEVERITY_LABELS: Record<GapSeverity, string> = {
  blocking: 'Blocking',
  major: 'Major Gap',
  minor: 'Minor Gap',
}

export const GAP_SEVERITY_ORDER: Record<GapSeverity, number> = {
  blocking: 0,
  major: 1,
  minor: 2,
}

// ── Insight Categories ────────────────────────────────────────────────────────

export const INSIGHT_CATEGORY_LABELS: Record<InsightCategory, string> = {
  market_trend: 'Market Trend',
  competitor: 'Competitive Intelligence',
  readiness_gap: 'Readiness Gap',
  quick_win: 'Quick Win',
  strategic: 'Strategic Insight',
}

// ── Scoring Thresholds ────────────────────────────────────────────────────────

export const SCORE_THRESHOLDS = {
  STRONG_MATCH: 80,
  ALMOST_READY: 60,
  NEEDS_WORK: 40,
} as const

// ── Score Labels & Display ────────────────────────────────────────────────────

export const SCORE_LABEL_MAP = {
  STRONG_MATCH: 'Strong Match',
  ALMOST_READY: 'Almost Ready',
  NEEDS_WORK: 'Needs Work',
  NOT_READY: 'Not Ready',
} as const

// ── Document Type Labels ──────────────────────────────────────────────────────

export const DOCUMENT_TYPE_LABELS = {
  cover_letter: 'Cover Letter',
  capability_statement: 'Capability Statement',
  executive_summary: 'Executive Summary',
  gap_action_plan: '60-Day Action Plan',
  compliance_checklist: 'Compliance Checklist',
} as const

// ── US States (for profile form) ──────────────────────────────────────────────

export const US_STATES: { code: string; name: string }[] = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'District of Columbia' },
]

// ── Pipeline Stats Display ────────────────────────────────────────────────────

export const PIPELINE_LABELS = {
  TOTAL: 'Opportunities Identified',
  QUALIFIED: 'Qualified (60+ score)',
  HIGH_PRIORITY: 'High Priority (80+ score)',
  PIPELINE_VALUE: 'Estimated Pipeline Value',
} as const
