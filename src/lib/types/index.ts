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

// ── Kredora funding readiness (new demo flow) ─────────────────────────────────

export type BusinessStage =
  | 'pre_revenue'
  | 'early_stage'
  | 'growth'
  | 'established'

export type RevenueRange =
  | '0_25k'
  | '25k_100k'
  | '100k_500k'
  | '500k_plus'

export type FundingGoalRange =
  | 'under_25k'
  | '25k_50k'
  | '50k_150k'
  | '150k_plus'

export type FundingMatchLevel = 'High' | 'Medium' | 'Low'

export type FundingDocumentId =
  | 'ein'
  | 'business_bank_account'
  | 'website'
  | 'business_email'
  | 'business_license'
  | 'financial_projections'
  | 'business_plan'
  | 'revenue_records'
  | 'use_of_funds_statement'
  | 'grant_narrative'

export interface FundingAssessmentProfile {
  businessName: string
  location: string
  industry: string
  yearsInBusiness: number
  businessStage: BusinessStage | ''
  revenueRange: RevenueRange | ''
  fundingGoal: FundingGoalRange | ''
  useOfFunds: string
  documentsAvailable: FundingDocumentId[]
  biggestChallenge: string
}

export interface ScoreBreakdown {
  businessFoundation: number
  documentationReadiness: number
  revenueClarity: number
  fundingFit: number
  applicationPreparedness: number
}

export interface FundingPath {
  id: string
  name: string
  matchLevel: FundingMatchLevel
  whyItFits: string
  whatToVerify: string
  documentsNeeded: string[]
  nextStep: string
}

export interface GapAnalysis {
  completed: string[]
  needsWork: string[]
  riskFlags: string[]
}

export interface FundingReadinessReport {
  overallScore: number
  scoreBreakdown: ScoreBreakdown
  aiSummary: string
  fundingPaths: FundingPath[]
  gapAnalysis: GapAnalysis
  advisorNotes: string
  entrepreneurSummary: string
}
