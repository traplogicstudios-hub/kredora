import type { FundingReadinessReport } from '../types'
import { FUNDING_PATH_TEMPLATES } from './fundingPaths'

export const MOCK_READINESS_REPORT: FundingReadinessReport = {
  overallScore: 68,
  scoreBreakdown: {
    businessFoundation: 82,
    documentationReadiness: 54,
    revenueClarity: 61,
    fundingFit: 73,
    applicationPreparedness: 49,
  },
  aiSummary:
    'Autonomyx Solutions has a strong business foundation with active operations, a business bank account, website, and clear service category. The biggest readiness gaps are financial projections, revenue documentation, grant narrative materials, and a clear use-of-funds statement.',
  fundingPaths: FUNDING_PATH_TEMPLATES,
  gapAnalysis: {
    completed: [
      'EIN',
      'Business bank account',
      'Business email',
      'Website',
      'Clear business category',
    ],
    needsWork: [
      'Financial projections',
      'Grant narrative',
      'Revenue documentation',
      'Use-of-funds statement',
      'Formal business plan',
      'Business credit profile',
    ],
    riskFlags: [
      'Competitive grant applications may be weak without financial projections.',
      'Revenue documentation should be organized before loan or grant review.',
      'Use-of-funds statement needs to be specific and measurable.',
    ],
  },
  advisorNotes:
    'This business is not blocked from pursuing funding, but it should complete readiness materials before applying to competitive grants. The best immediate path is microloan readiness, technical assistance, and local small business programs while preparing stronger financial documentation.',
  entrepreneurSummary:
    'Your business has a strong foundation, but you are not fully application-ready yet. Before applying for competitive funding, focus on organizing your revenue records, writing a clear use-of-funds statement, preparing basic financial projections, and creating a short business story that explains your impact.',
}
