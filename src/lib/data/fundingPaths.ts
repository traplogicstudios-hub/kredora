import type { FundingPath } from '../types'

export const FUNDING_PATH_TEMPLATES: FundingPath[] = [
  {
    id: 'local-grant',
    name: 'Local Small Business Grant Readiness',
    matchLevel: 'Medium',
    whyItFits:
      'Early-stage local service business with community economic activity.',
    whatToVerify: 'City/county eligibility, location rules, revenue requirements.',
    documentsNeeded: [
      'Business license',
      'Bank statements',
      'Use-of-funds statement',
    ],
    nextStep:
      'Prepare a one-page business summary and local impact statement.',
  },
  {
    id: 'microloan',
    name: 'Microloan / Community Lender Readiness',
    matchLevel: 'High',
    whyItFits:
      'Funding goal fits early-stage growth and operational support.',
    whatToVerify: 'Credit profile, revenue history, repayment ability.',
    documentsNeeded: [
      'Revenue records',
      'Bank statements',
      'Business plan',
      'Projections',
    ],
    nextStep: 'Build a 12-month cash-flow projection.',
  },
  {
    id: 'technical-assistance',
    name: 'Technical Assistance Program Fit',
    matchLevel: 'High',
    whyItFits:
      'Business would benefit from advisor support before competitive applications.',
    whatToVerify: 'Local program availability and industry fit.',
    documentsNeeded: ['Business overview', 'Goals', 'Challenge statement'],
    nextStep:
      'Contact SBDC, chamber, or small business support program.',
  },
  {
    id: 'accelerator',
    name: 'Accelerator / Pitch Competition Readiness',
    matchLevel: 'Medium',
    whyItFits:
      'AI automation business has innovation potential and a founder story.',
    whatToVerify: 'Stage requirements, traction expectations, pitch deadlines.',
    documentsNeeded: ['Pitch deck', 'Demo', 'Traction summary'],
    nextStep: 'Build a 5-slide funding pitch.',
  },
]
