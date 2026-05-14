/**
 * Static enterprise intelligence data.
 *
 * Two kinds of data live here:
 *   1. Competitor benchmarks — fixed for demo; represent real industry averages
 *      for California commercial cleaning companies competing for government contracts.
 *   2. computeEnterprisePipeline — derives live pipeline stats from scored opportunities
 *      so the numbers on the Enterprise Dashboard always match the opportunity list.
 *
 * AI-generated insights (the text narratives) stay in mockResponses.ts and gemini.ts.
 */

import type { CompetitorBenchmark, PipelineStats } from '../types'
import type { ScoredOpportunity } from '../../hooks/useOpportunities'
import { SCORE_THRESHOLDS } from '../constants'

// ── Competitor Benchmarks ─────────────────────────────────────────────────────
// Source: CA SBA district reports, CalTrans DBE database, Inland Empire SBDC data.

export const DEMO_BENCHMARKS: CompetitorBenchmark[] = [
  {
    metric: 'Years in Business',
    yourValue: 1,
    industryAvg: 4.2,
    topQuartile: 8,
    status: 'below',
  },
  {
    metric: 'Active Certifications',
    yourValue: 0,
    industryAvg: 1.8,
    topQuartile: 3,
    status: 'below',
  },
  {
    metric: 'Insured & Compliant',
    yourValue: 'Yes',
    industryAvg: '78%',
    topQuartile: '100%',
    status: 'above',
  },
  {
    metric: 'SAM.gov Registered',
    yourValue: 'No',
    industryAvg: '42%',
    topQuartile: '100%',
    status: 'below',
  },
  {
    metric: 'Annual Revenue',
    yourValue: '$85K',
    industryAvg: '$420K',
    topQuartile: '$1.2M',
    status: 'below',
  },
  {
    metric: 'Local Market Presence',
    yourValue: 'Riverside',
    industryAvg: 'Multi-city',
    topQuartile: 'Regional',
    status: 'at',
  },
]

// ── Pipeline Stats (computed, not static) ─────────────────────────────────────

export function computeEnterprisePipeline(scored: ScoredOpportunity[]): PipelineStats {
  const qualified = scored.filter(
    s => (s.score?.overall ?? 0) >= SCORE_THRESHOLDS.ALMOST_READY
  )
  const highPriority = scored.filter(
    s => (s.score?.overall ?? 0) >= SCORE_THRESHOLDS.STRONG_MATCH
  )
  const estimatedPipelineValue = qualified.reduce(
    (sum, s) => sum + (s.opportunity.value ?? 0),
    0
  )

  return {
    totalIdentified: scored.length,
    qualified: qualified.length,
    highPriority: highPriority.length,
    estimatedPipelineValue,
  }
}

// ── Market Context (static copy — shown alongside AI insights) ────────────────

export const MARKET_CONTEXT = {
  marketScore: 71,
  industryLabel: 'Commercial Cleaning & Facility Services',
  geographyLabel: 'Inland Empire / Southern California',
  trend: {
    direction: 'up' as const,
    value: 18,
    label: 'Government facility spend YoY',
  },
  competitorCount: 8,
  competitorLabel: 'Active local SBE-certified competitors (under $200K contracts)',
}
