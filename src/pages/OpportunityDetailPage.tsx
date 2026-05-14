import { useParams, useNavigate, Link } from 'react-router-dom'
import { ROUTES } from '../lib/constants'
import { useOpportunity } from '../hooks/useOpportunities'
import { opportunityTypeLabel, opportunityTypeBadgeColor, scoreToRingColor, cn } from '../lib/utils'
import PageShell from '../components/layout/PageShell'
import AIAnalysisBar from '../components/layout/AIAnalysisBar'

function ReadinessGauge({ score, label }: { score: number; label: string }) {
  const r = 52
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const color = scoreToRingColor(score)

  return (
    <div className="flex flex-col items-center">
      <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400 mb-3">Your Readiness</div>
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 128 128" className="absolute h-full w-full -rotate-90">
          <circle cx="64" cy="64" r={r} fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="64" cy="64" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
          />
        </svg>
        <div className="flex flex-col items-center leading-none">
          <span className="text-4xl font-bold text-slate-900">{score}</span>
          <span className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
        </div>
      </div>
    </div>
  )
}

function CategoryBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 shrink-0 text-sm text-slate-600">{label}</div>
      <div className="flex-1 overflow-hidden rounded-full bg-slate-100 h-2">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, backgroundColor: color }}
        />
      </div>
      <div className="w-16 text-right font-mono text-xs text-slate-500">{score}/100</div>
    </div>
  )
}

// Hard-coded strategic data for the Riverside County demo opportunity
const DEMO_SIGNALS = [
  'Headquartered in Riverside — local vendor preference applies',
  'NAICS 561720 is an exact match for the solicitation scope',
  'Active liability insurance meets the $1M minimum requirement',
  "Owner-operated model fits the \"small business\" evaluation criteria",
]

const DEMO_STRATEGIC_READ = `This is your highest-confidence near-term opportunity. The county explicitly favors local vendors, your NAICS aligns, and you already clear the critical insurance and tenure bars. The single biggest lift on your win probability would be filing an SBE certification application this week — even with the application pending, you can submit competitively.

Estimated effort: 6 hours of paperwork + 2 weeks of waiting.`

export default function OpportunityDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const scoredOpp = useOpportunity(id ?? '')

  if (!scoredOpp) {
    return (
      <PageShell>
        <div className="py-20 text-center text-slate-400">Opportunity not found.</div>
      </PageShell>
    )
  }

  const { opportunity: opp, score } = scoredOpp
  const match = opp.matchScore ?? 0
  const readiness = score?.overall ?? 0
  const label = score?.label ?? 'Not Ready'
  const gaps = score?.gaps ?? []
  const metReqs = score?.metRequirements ?? []
  const blocking = gaps.filter(g => g.severity === 'blocking')
  const major = gaps.filter(g => g.severity === 'major')
  const minor = gaps.filter(g => g.severity === 'minor')
  const breakdown = score?.breakdown

  const isDemoOpportunity = opp.id === 'opp-riv-county-001'
  const signals = isDemoOpportunity ? DEMO_SIGNALS : [
    `NAICS ${opp.naicsCodes[0] ?? '—'} matches this opportunity's solicitation scope`,
    `Located in ${opp.region ?? 'the target region'} for this opportunity`,
  ]

  const deadlineDate = opp.deadline ? new Date(opp.deadline) : null
  const daysLeft = deadlineDate ? Math.ceil((deadlineDate.getTime() - Date.now()) / 86400000) : null

  return (
    <PageShell>
      {/* Back link */}
      <div className="mb-5">
        <Link
          to={ROUTES.DASHBOARD}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2">
            <path d="M13 8H3M7 12l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All opportunities
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-8 items-start">
        {/* ── LEFT COLUMN ─────────────────────────────────────────────────── */}
        <div>
          {/* Type badge + source */}
          <div className="mb-3 flex items-center gap-2">
            <span className={cn('rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest', opportunityTypeBadgeColor(opp.type))}>
              {opportunityTypeLabel(opp.type)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">{opp.source}</span>
          </div>

          <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-slate-900">{opp.title}</h1>
          <p className="mb-5 text-sm leading-relaxed text-slate-500">{opp.description}</p>

          {/* Metadata grid */}
          <div className="mb-8 grid grid-cols-4 gap-4 rounded-lg border border-slate-200 bg-slate-50 px-5 py-4">
            {opp.valueLabel && (
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Value</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{opp.valueLabel}</div>
              </div>
            )}
            {deadlineDate && (
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Deadline</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {deadlineDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                {daysLeft !== null && (
                  <div className="text-xs text-amber-600 font-medium">{daysLeft} days remaining</div>
                )}
              </div>
            )}
            {opp.region && (
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Region</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">{opp.region}</div>
              </div>
            )}
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Source</div>
              <div className="mt-1 text-sm font-semibold text-slate-900">{opp.source}</div>
            </div>
          </div>

          {/* Why this matches */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-100">
                <svg viewBox="0 0 12 12" fill="none" stroke="#4f46e5" strokeWidth="2" className="h-3 w-3">
                  <polyline points="2,6 5,9 10,3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-slate-900">Why this matches you</h2>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{signals.length} signals</span>
            </div>
            <div className="space-y-2">
              {signals.map((sig, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[10px] font-medium text-slate-400 mt-0.5">0{i + 1}</span>
                  <span className="text-sm text-slate-600">{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category breakdown */}
          {breakdown && (
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-900">Category breakdown</h2>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">5 dimensions</span>
              </div>
              <div className="space-y-3">
                <CategoryBar label="Certifications" score={breakdown.certifications} color="#dc2626" />
                <CategoryBar label="Financial" score={breakdown.financial} color="#16a34a" />
                <CategoryBar label="Experience" score={breakdown.experience} color="#3b82f6" />
                <CategoryBar label="Documentation" score={breakdown.documentation} color="#3b82f6" />
                <CategoryBar label="Registration" score={breakdown.registration} color="#16a34a" />
              </div>
            </div>
          )}

          {/* Requirements & gaps */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-900">Requirements & gaps</h2>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Each item checked against your profile</span>
                <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700 ring-1 ring-inset ring-green-200">
                  {metReqs.length} met
                </span>
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700 ring-1 ring-inset ring-red-200">
                  {gaps.length} unmet
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {opp.requirements.map((req) => {
                const isMet = metReqs.includes(req.id)
                const gap = gaps.find(g => g.requirementId === req.id)
                return (
                  <div
                    key={req.id}
                    className={cn(
                      'flex items-start justify-between rounded-md border px-4 py-3',
                      isMet ? 'border-slate-200 bg-white' : 'border-slate-200 bg-white'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full',
                        isMet ? 'bg-green-100' : 'bg-slate-100'
                      )}>
                        {isMet ? (
                          <svg viewBox="0 0 12 12" fill="none" stroke="#16a34a" strokeWidth="2" className="h-2.5 w-2.5">
                            <polyline points="2,6 5,9 10,3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 12 12" fill="none" stroke="#94a3b8" strokeWidth="2" className="h-2.5 w-2.5">
                            <line x1="3" y1="3" x2="9" y2="9" strokeLinecap="round" />
                            <line x1="9" y1="3" x2="3" y2="9" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{req.label}</div>
                        <div className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                          {req.category}{req.critical ? ' · critical' : ''}
                        </div>
                      </div>
                    </div>
                    {!isMet && gap && (
                      <span className={cn(
                        'rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider',
                        gap.severity === 'blocking' ? 'bg-red-100 text-red-700' :
                        gap.severity === 'major' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      )}>
                        {gap.severity}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Readiness gauge card */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <ReadinessGauge score={readiness} label={label} />
            <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-slate-400">
              Match {match}
            </div>
            <div className="mt-4 space-y-2">
              {[
                { label: 'Blocking gaps', count: blocking.length, color: 'text-green-600' },
                { label: 'Major gaps', count: major.length, color: major.length > 0 ? 'text-amber-600' : 'text-slate-400' },
                { label: 'Minor gaps', count: minor.length, color: 'text-slate-400' },
              ].map(({ label: l, count, color }) => (
                <div key={l} className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">{l}</span>
                  <span className={`text-sm font-semibold ${color}`}>{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic read */}
          <div className="overflow-hidden rounded-lg border border-slate-800">
            <AIAnalysisBar confidence={86} label="ANALYSIS" />
            <div className="bg-slate-900 px-4 py-4">
              <div className="mb-2 text-sm font-semibold text-white">Strategic read</div>
              <p className="text-xs leading-relaxed text-slate-300 whitespace-pre-line">
                {isDemoOpportunity ? DEMO_STRATEGIC_READ :
                  `This opportunity aligns with your NAICS codes and location. Review the gap list and address any major items before submitting.`}
              </p>
            </div>
          </div>

          {/* Generate package panel */}
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-slate-400">Next Step</div>
            <h3 className="mb-2 text-base font-semibold text-slate-900">Generate your application package</h3>
            <p className="mb-4 text-xs leading-relaxed text-slate-500">
              We'll draft a cover letter, capability statement, executive summary, 60-day action plan, and a
              compliance checklist — all tailored to this opportunity. You review and edit before sending.
            </p>
            <div className="mb-4 space-y-1.5">
              {['Cover Letter', 'Capability Statement', 'Executive Summary', '60-Day Action Plan', 'Compliance Checklist'].map(doc => (
                <div key={doc} className="flex items-center gap-2 text-xs text-slate-600">
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 text-slate-400" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="2" width="10" height="12" rx="1.5" />
                    <line x1="6" y1="6" x2="10" y2="6" strokeLinecap="round" />
                    <line x1="6" y1="9" x2="10" y2="9" strokeLinecap="round" />
                  </svg>
                  {doc}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(ROUTES.APPLY(opp.id))}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-primary-600 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Generate application package
              <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-widest text-slate-400">
              Mock-safe · No guarantee of funding or award
            </p>
          </div>

          {/* Action items */}
          {gaps.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-1 font-mono text-[9px] uppercase tracking-widest text-slate-400">Action Items</div>
              <h3 className="mb-3 text-sm font-semibold text-slate-900">{gaps.length} gaps · prioritized</h3>
              <div className="space-y-3">
                {gaps.map((gap) => (
                  <div key={gap.requirementId} className="border-l-2 pl-3 border-slate-200">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={cn(
                        'rounded px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider',
                        gap.severity === 'blocking' ? 'bg-red-100 text-red-700' :
                        gap.severity === 'major' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      )}>
                        {gap.severity}
                      </span>
                      {gap.estimatedResolutionWeeks && (
                        <span className="font-mono text-[9px] text-slate-400">~{gap.estimatedResolutionWeeks}W to resolve</span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-800">{gap.label}</div>
                    <div className="text-xs text-slate-500">→ {gap.actionItem}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  )
}
