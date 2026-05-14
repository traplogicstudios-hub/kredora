import { useMemo } from 'react'
import { useAppStore, selectScores } from '../store/appStore'
import { OPPORTUNITIES } from '../lib/data/opportunities'
import { computeEnterprisePipeline } from '../lib/data/enterpriseData'
import type { Opportunity, OpportunityType, ReadinessScore } from '../lib/types'

export interface ScoredOpportunity {
  opportunity: Opportunity
  score: ReadinessScore | undefined
}

interface FilterOptions {
  type?: OpportunityType | 'all'
  minScore?: number
  maxScore?: number
  searchQuery?: string
}

export function useOpportunities(filters: FilterOptions = {}) {
  const scores = useAppStore(selectScores)
  const recomputeScores = useAppStore(s => s.recomputeScores)

  const allScored = useMemo<ScoredOpportunity[]>(
    () => OPPORTUNITIES.map(opp => ({ opportunity: opp, score: scores.get(opp.id) })),
    [scores]
  )

  const filtered = useMemo<ScoredOpportunity[]>(() => {
    return allScored.filter(({ opportunity, score }) => {
      if (filters.type && filters.type !== 'all' && opportunity.type !== filters.type) return false
      if (filters.minScore !== undefined && (score?.overall ?? 0) < filters.minScore) return false
      if (filters.maxScore !== undefined && (score?.overall ?? 100) > filters.maxScore) return false
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase()
        const haystack = [opportunity.title, opportunity.source, ...opportunity.tags].join(' ').toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [allScored, filters.type, filters.minScore, filters.maxScore, filters.searchQuery])

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => (b.score?.overall ?? 0) - (a.score?.overall ?? 0)),
    [filtered]
  )

  const pipelineStats = useMemo(() => computeEnterprisePipeline(allScored), [allScored])

  return { opportunities: sorted, pipelineStats, recomputeScores, total: allScored.length }
}

export function useOpportunity(id: string): ScoredOpportunity | undefined {
  const scores = useAppStore(selectScores)
  return useMemo(() => {
    const opportunity = OPPORTUNITIES.find(o => o.id === id)
    if (!opportunity) return undefined
    return { opportunity, score: scores.get(id) }
  }, [id, scores])
}
