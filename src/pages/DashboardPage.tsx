import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../lib/constants'
import { useOpportunities } from '../hooks/useOpportunities'
import { useProfile } from '../hooks/useProfile'
import {
  cn, formatCurrency, formatDeadline,
  opportunityTypeLabel, opportunityTypeBadgeColor,
} from '../lib/utils'
import type { OpportunityType } from '../lib/types'
import PageShell from '../components/layout/PageShell'
import AIAnalysisBar from '../components/layout/AIAnalysisBar'

type SortKey = 'match' | 'readiness' | 'deadline'
type FilterType = OpportunityType | 'all'

const TYPE_FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'State Contract', value: 'state_contract' },
  { label: 'Federal Contract', value: 'federal_contract' },
  { label: 'Grant', value: 'grant' },
  { label: 'Supplier Diversity', value: 'supplier_diversity' },
  { label: 'Loan', value: 'loan' },
  { label: 'Bonding', value: 'bond' },
]

function ReadinessBadge({ score, label }: { score: number; label: string }) {
  const colors =
    score >= 80 ? 'bg-green-50 text-green-700 ring-green-200' :
    score >= 60 ? 'bg-lime-50 text-lime-700 ring-lime-200' :
    score >= 40 ? 'bg-amber-50 text-amber-700 ring-amber-200' :
    'bg-red-50 text-red-700 ring-red-200'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${colors}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {score} {label.toLowerCase().replace(' ', ' ')}
    </span>
  )
}

function ScoreRing({ score }: { score: number }) {
  const r = 28
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color =
    score >= 80 ? '#16a34a' :
    score >= 60 ? '#65a30d' :
    score >= 40 ? '#d97706' : '#dc2626'

  return (
    <div className="relative flex h-16 w-16 items-center justify-center">
      <svg viewBox="0 0 72 72" className="absolute h-full w-full -rotate-90">
        <circle cx="36" cy="36" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5" />
        <circle
          cx="36" cy="36" r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="flex flex-col items-center leading-none">
        <span className="text-base font-bold text-slate-900">{score}</span>
        <span className="font-mono text-[8px] uppercase tracking-wider text-slate-400">avg</span>
      </div>
    </div>
  )
}

const ALL_RECOMMENDED_ACTIONS = [
  'File California SBE certification',
  'Generate and review capability statement',
  'Collect 2 more client references',
  'Register on the local vendor portal',
  'Review and submit Riverside County package before deadline',
] as const

export default function DashboardPage() {
  const navigate = useNavigate()
  const { profile } = useProfile()
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [sortKey, setSortKey] = useState<SortKey>('match')
  const [allActionsOpen, setAllActionsOpen] = useState(false)

  const { opportunities, pipelineStats } = useOpportunities({
    type: activeFilter === 'all' ? undefined : activeFilter,
  })

  const sorted = useMemo(() => {
    return [...opportunities].sort((a, b) => {
      if (sortKey === 'match') return (b.opportunity.matchScore ?? 0) - (a.opportunity.matchScore ?? 0)
      if (sortKey === 'readiness') return (b.score?.overall ?? 0) - (a.score?.overall ?? 0)
      if (sortKey === 'deadline') {
        const da = a.opportunity.deadline ?? '9999'
        const db = b.opportunity.deadline ?? '9999'
        return da < db ? -1 : 1
      }
      return 0
    })
  }, [opportunities, sortKey])

  const strongMatches = useMemo(
    () => opportunities.filter(o => (o.opportunity.matchScore ?? 0) >= 80).length,
    [opportunities]
  )
  const readyToApply = useMemo(
    () => opportunities.filter(o => (o.score?.overall ?? 0) >= 60).length,
    [opportunities]
  )
  const avgReadiness = useMemo(() => {
    if (!opportunities.length) return 0
    return Math.round(opportunities.reduce((s, o) => s + (o.score?.overall ?? 0), 0) / opportunities.length)
  }, [opportunities])

  // type counts for filter tabs
  const typeCounts = useMemo(() => {
    const all = opportunities
    const counts: Partial<Record<FilterType, number>> = { all: all.length }
    for (const t of ['state_contract','federal_contract','grant','supplier_diversity','loan','bond'] as OpportunityType[]) {
      counts[t] = all.filter(o => o.opportunity.type === t).length
    }
    return counts
  }, [opportunities])

  return (
    <PageShell>
      {/* Breadcrumb + heading */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            Opportunities · {profile.businessName || 'Your Business'}
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            <span>{sorted.length} opportunities matched.</span>{' '}
            <span className="text-slate-400">{strongMatches} look like strong fits.</span>
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Sorted by match strength. Each opportunity is scored against the real requirements published by the issuing source.
            Open one to see your readiness gaps and generate an application package.
          </p>
        </div>
        <button
          onClick={() => navigate(ROUTES.ONBOARD)}
          className="shrink-0 flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
            <path d="M8 1v14M1 8h14" strokeLinecap="round" />
          </svg>
          Edit profile
        </button>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-6 gap-4">
        {[
          { label: 'Opportunities Identified', value: sorted.length, sub: 'across 6 funding categories' },
          { label: 'Strong Matches (80+)', value: strongMatches, sub: 'match score', accent: 'text-primary-600' },
          { label: 'Ready to Apply (60+)', value: readyToApply, sub: 'readiness score', accent: 'text-score-almost' },
          {
            label: 'Pipeline Value',
            value: formatCurrency(pipelineStats.estimatedPipelineValue),
            sub: 'if you win the qualified set'
          },
        ].map((stat) => (
          <div key={stat.label} className="col-span-1 rounded-lg border border-slate-200 bg-white p-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{stat.label}</div>
            <div className={`mt-1 text-2xl font-bold tracking-tight ${stat.accent ?? 'text-slate-900'}`}>
              {stat.value}
            </div>
            <div className="text-xs text-slate-400">{stat.sub}</div>
          </div>
        ))}
        {/* Avg readiness ring */}
        <div className="col-span-2 flex items-center justify-between rounded-lg border border-slate-200 bg-white px-5 py-4">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Your Avg Readiness</div>
            <div className="mt-1 text-xs text-slate-500">across all matched opportunities</div>
          </div>
          <ScoreRing score={avgReadiness} />
        </div>
      </div>

      {/* AI Recommendation Panel */}
      <div className="mb-6 overflow-hidden rounded-lg border border-slate-800">
        <AIAnalysisBar confidence={89} label="ANALYSIS" />
        <div className="bg-slate-900 px-5 py-4">
          <div className="mb-2 text-sm font-semibold text-white">Your highest-leverage move this week</div>
          <p className="mb-4 text-sm leading-relaxed text-slate-300">
            Start with <span className="font-semibold text-white">Riverside County Public Facilities</span> (match 92, readiness 75) and the{' '}
            <span className="font-semibold text-white">City of Riverside Recovery Grant</span> (match 95, readiness 88). Both are local,
            both reward what you already have. Then, while those are in flight, file your California SBE certification —
            it unlocks preference points on 5 more state contracts in your matched set within 30–60 days.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(ROUTES.OPPORTUNITY('opp-riv-county-001'))}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-primary-500 transition-colors"
            >
              Open top match
              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setAllActionsOpen(true)}
              className="rounded-md border border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 transition-colors"
            >
              See all recommended actions
            </button>
          </div>
        </div>
      </div>

      {/* Filter + sort bar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {TYPE_FILTERS.map(f => {
            const count = typeCounts[f.value] ?? 0
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={cn(
                  'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  activeFilter === f.value
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {f.label}
                {count > 0 && (
                  <span className={cn(
                    'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                    activeFilter === f.value ? 'bg-white text-slate-900' : 'bg-slate-200 text-slate-600'
                  )}>{count}</span>
                )}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Sort by</span>
          {(['match', 'readiness', 'deadline'] as SortKey[]).map(k => (
            <button
              key={k}
              onClick={() => setSortKey(k)}
              className={cn(
                'px-2 py-1 text-xs font-medium capitalize transition-colors',
                sortKey === k ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity list */}
      <div className="space-y-3">
        {sorted.map(({ opportunity: opp, score }) => {
          const match = opp.matchScore ?? 0
          const readiness = score?.overall ?? 0
          const readinessLabel = score?.label ?? 'Not Ready'
          const gapCounts = {
            blocking: score?.gaps?.filter(g => g.severity === 'blocking').length ?? 0,
            major: score?.gaps?.filter(g => g.severity === 'major').length ?? 0,
          }
          const deadline = formatDeadline(opp.deadline)
          const isUrgent = opp.deadline && new Date(opp.deadline).getTime() - Date.now() < 30 * 24 * 3600 * 1000

          return (
            <div
              key={opp.id}
              className="rounded-lg border border-slate-200 bg-white px-5 py-4 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Eyebrow */}
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className={cn('rounded px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-widest', opportunityTypeBadgeColor(opp.type))}>
                      {opportunityTypeLabel(opp.type)}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                      {opp.source}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-1 text-base font-semibold text-slate-900">{opp.title}</h3>

                  {/* Description */}
                  <p className="mb-2.5 text-sm leading-relaxed text-slate-500 line-clamp-2">{opp.description}</p>

                  {/* Tags */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {opp.tags.map(tag => (
                      <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    {opp.valueLabel && (
                      <span className="font-medium text-slate-700">{opp.valueLabel}</span>
                    )}
                    {opp.deadline && (
                      <span className={cn('flex items-center gap-1', isUrgent ? 'font-semibold text-amber-600' : '')}>
                        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6" /><path d="M8 5v3.5l2 2" strokeLinecap="round" />
                        </svg>
                        {deadline}
                        {opp.deadline && <span className="text-slate-400"> · {new Date(opp.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>}
                      </span>
                    )}
                    {!opp.deadline && (
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="8" cy="8" r="6" /><path d="M8 5v3.5l2 2" strokeLinecap="round" />
                        </svg>
                        Rolling
                      </span>
                    )}
                    {opp.region && (
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.5">
                          <path d="M8 8.5a2 2 0 100-4 2 2 0 000 4z" /><path d="M8 14s-4.5-4.5-4.5-7a4.5 4.5 0 019 0C12.5 9.5 8 14 8 14z" />
                        </svg>
                        {opp.region}
                      </span>
                    )}
                    {gapCounts.blocking > 0 && (
                      <span className="font-medium text-red-500">
                        {gapCounts.blocking} blocking
                      </span>
                    )}
                    {gapCounts.major > 0 && (
                      <span className="font-medium text-amber-500">
                        {gapCounts.blocking > 0 ? '·' : ''} {gapCounts.major} major
                      </span>
                    )}
                  </div>
                </div>

                {/* Scores + CTA */}
                <div className="flex shrink-0 flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Match {match}</div>
                    <ReadinessBadge score={readiness} label={readinessLabel} />
                  </div>
                  <button
                    onClick={() => navigate(ROUTES.OPPORTUNITY(opp.id))}
                    className="flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition-colors"
                  >
                    View breakdown
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {allActionsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="all-recommended-actions-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50"
            aria-label="Close dialog"
            onClick={() => setAllActionsOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <h2 id="all-recommended-actions-title" className="text-lg font-semibold text-slate-900">
                All recommended actions
              </h2>
              <button
                type="button"
                onClick={() => setAllActionsOpen(false)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <svg viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              {ALL_RECOMMENDED_ACTIONS.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              These actions are prioritized by readiness lift and application urgency.
            </p>
            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setAllActionsOpen(false)}
                className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  )
}
