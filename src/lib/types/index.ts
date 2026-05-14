export type Certification =
  | 'MBE'
  | 'WBE'
  | 'DBE'
  | 'SDVOSB'
  | 'HUBZone'
  | 'SBA_8a'
  | 'SBE'
  | 'LGBTBE'
  | 'AABE'

export type OpportunityGoal =
  | 'federal_contracts'
  | 'state_contracts'
  | 'grants'
  | 'supplier_diversity'
  | 'loans'
  | 'bonding'

export type BusinessStructure =
  | 'sole_prop'
  | 'llc'
  | 'corporation'
  | 's_corp'
  | 'partnership'

export interface BusinessProfile {
  id: string
  businessName: string
  ein?: string
  uei?: string
  naicsCodes: string[]
  state: string
  city: string
  yearsInBusiness: number
  annualRevenue?: number
  employeeCount?: number
  certifications: Certification[]
  businessStructure: BusinessStructure
  goals: OpportunityGoal[]
  hasActiveInsurance: boolean
  hasBankAccount: boolean
  hasDunsOrUEI: boolean
  businessDescription?: string
}

export type OpportunityType =
  | 'federal_contract'
  | 'state_contract'
  | 'grant'
  | 'supplier_diversity'
  | 'loan'
  | 'bond'

export type RequirementCategory =
  | 'certification'
  | 'financial'
  | 'experience'
  | 'documentation'
  | 'registration'

export interface Requirement {
  id: string
  category: RequirementCategory
  label: string
  critical: boolean
  description?: string
}

export interface Opportunity {
  id: string
  title: string
  type: OpportunityType
  source: string
  value?: number
  valueLabel?: string
  deadline?: string
  naicsCodes: string[]
  requirements: Requirement[]
  description: string
  eligibilityNotes?: string
  tags: string[]
  region?: string
  matchScore?: number
}

export type ReadinessLabel =
  | 'Not Ready'
  | 'Needs Work'
  | 'Almost Ready'
  | 'Strong Match'

export interface ReadinessBreakdown {
  certifications: number
  financial: number
  experience: number
  documentation: number
  registration: number
}

export type GapSeverity = 'blocking' | 'major' | 'minor'

export interface Gap {
  requirementId: string
  label: string
  category: RequirementCategory
  severity: GapSeverity
  actionItem: string
  estimatedResolutionWeeks?: number
}

export interface ReadinessScore {
  opportunityId: string
  overall: number
  label: ReadinessLabel
  breakdown: ReadinessBreakdown
  metRequirements: string[]
  gaps: Gap[]
  strengths: string[]
}

export type DocumentType =
  | 'cover_letter'
  | 'capability_statement'
  | 'executive_summary'
  | 'gap_action_plan'
  | 'compliance_checklist'

export type GenerationStatus = 'idle' | 'generating' | 'ready' | 'error'

export interface GeneratedDocument {
  id: string
  type: DocumentType
  title: string
  content: string
  wordCount: number
  isAIGenerated: boolean
}

export interface ApplicationPackage {
  id: string
  opportunityId: string
  generatedAt: string
  status: GenerationStatus
  documents: GeneratedDocument[]
}

export interface PipelineStats {
  totalIdentified: number
  qualified: number
  highPriority: number
  estimatedPipelineValue: number
}

export type InsightCategory =
  | 'market_trend'
  | 'competitor'
  | 'readiness_gap'
  | 'quick_win'
  | 'strategic'

export interface EnterpriseInsight {
  id: string
  category: InsightCategory
  title: string
  body: string
  metric?: string
  priority: 'high' | 'medium' | 'low'
}

export interface CompetitorBenchmark {
  metric: string
  yourValue: number | string
  industryAvg: number | string
  topQuartile: number | string
  status: 'above' | 'at' | 'below'
}

export interface EnterpriseDashboard {
  generatedAt: string
  marketOpportunityScore: number
  pipelineStats: PipelineStats
  insights: EnterpriseInsight[]
  benchmarks: CompetitorBenchmark[]
  topOpportunityIds: string[]
}
